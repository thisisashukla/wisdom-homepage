"""
main.py — FastAPI entry point for the Wisdom scripture search backend.

Pipeline:
    POST /api/v1/intent      → validate + extract 1-3 intents (Sarvam AI)
    POST /api/v1/search      → retrieve top-k verses (BGE-M3 + optional reranker)
    POST /api/v1/rag         → synthesise answer (Sarvam AI, blocking)
    POST /api/v1/rag/stream  → synthesise answer (Sarvam AI, SSE streaming)

Verse of the Day:
    GET  /api/v1/verse-of-day          →  today's curated Gita verse (Supabase cache)
    POST /api/v1/verse-of-day/generate →  admin: pick + persist verse (called by cron)

Startup:
    Loads verses.json + embeddings.npy from DATA_DIR (default: ./data)
    Loads BGE-M3 from MODEL_DIR if set, else HuggingFace cache (~560 MB first run)
    Creates the reranker singleton (weights lazy-loaded on first request)

Run:
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""
from __future__ import annotations

# Must be set before any transformers/sentence_transformers import
import os
os.environ.setdefault("USE_TF", "0")
os.environ.setdefault("USE_FLAX", "0")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

import logging
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from common.config import settings
from ai.embedder import init_embedder
from ai.index import init_index
from ai.reranker import init_reranker
from ai.sarvam import init_sarvam
from server import intent as intent_router
from server import search as search_router
from server import rag as rag_router
from server import verse_of_day as verse_of_day_router

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(name)s  %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)


# ── Startup / shutdown ────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("═══ Wisdom backend starting ═══")

    if not settings.sarvam_api_key:
        logger.error("SARVAM_API_KEY is not set — RAG endpoint will fail")

    # 1. Sarvam client
    init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
    logger.info("Sarvam client ready (model=%s)", settings.sarvam_model)

    # 2. BGE-M3 embedder (for query embedding at request time)
    embedder = init_embedder(
        model_dir  = settings.model_dir,
        model_name = settings.embed_model,
    )
    logger.info("Embedder ready (dim=%d)", embedder.dim)

    # 3. Scripture index (loads verses.json + embeddings.npy from data_dir)
    idx = init_index(data_dir=settings.data_dir)
    logger.info("Index ready: %d verses", idx.size)

    # 4. Reranker (singleton; weights lazy-loaded on first search).
    # Set RERANKER_MODEL="" to disable — search then degrades to dense only.
    reranker = init_reranker(model_source=settings.reranker_model)
    logger.info(
        "Reranker %s",
        "created (lazy load on first request)" if reranker else "DISABLED (no reranker configured)",
    )

    logger.info("═══ Wisdom backend ready ═══")
    yield
    logger.info("Wisdom backend shutting down")


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Wisdom Scripture Search API",
    description=(
        "Three-step RAG pipeline over 18k Hindu scripture verses. "
        "Step 1: intent extraction (+ verse-ref fast-path, follow-up rewrite). "
        "Step 2: BGE-M3 semantic search + cross-intent re-ranking + optional "
        "bge-reranker-v2-m3 + scripture diversity + score-floor gating. "
        "Step 3: Sarvam AI synthesis with per-intent-type voice profiles "
        "(blocking + SSE streaming)."
    ),
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins     = settings.allowed_origins_list(),
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)

app.include_router(intent_router.router,        prefix="/api/v1")
app.include_router(search_router.router,        prefix="/api/v1")
app.include_router(rag_router.router,           prefix="/api/v1")
app.include_router(verse_of_day_router.router,  prefix="/api/v1")


@app.get("/", tags=["health"])
async def root():
    return {"status": "ok", "service": "wisdom-search", "version": app.version}


@app.get("/health", tags=["health"])
async def health_check():
    from ai.index    import _index
    from ai.embedder import _embedder
    from ai.reranker import get_reranker
    rr = get_reranker()
    return {
        "status":           "ok",
        "embedder_loaded":  _embedder is not None and _embedder._model is not None,
        "index_size":       _index.size if _index else 0,
        "reranker_present": rr is not None,
        "reranker_loaded":  rr is not None and rr.available,
    }

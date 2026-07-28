"""
main.py — FastAPI entry point for the Wisdom scripture search backend.

Pipeline:
    POST /api/v1/intent  →  extract 1–4 intents from user query (Sarvam AI)
    POST /api/v1/search  →  retrieve top-k verses per intent (BGE-M3 cosine)
    POST /api/v1/rag     →  synthesise answer with verse citations (Sarvam AI)

Verse of the Day:
    GET  /api/v1/verse-of-day          →  today's curated Gita verse (Supabase cache)
    POST /api/v1/verse-of-day/generate →  admin: pick + persist verse (called by cron)

Startup (self-contained — no sanscripts dependency):
    Loads verses.json + embeddings.npy from DATA_DIR (default: ./data)
    Loads BGE-M3 from MODEL_DIR if set, else HuggingFace cache (~560 MB first run)

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
        model_dir=settings.model_dir,
        model_name=settings.embed_model,
    )
    logger.info("Embedder ready (dim=%d)", embedder.dim)

    # 3. Scripture index (loads verses.json + embeddings.npy from data_dir)
    idx = init_index(data_dir=settings.data_dir)
    logger.info("Index ready: %d verses", idx.size)

    logger.info("═══ Wisdom backend ready ═══")
    yield
    logger.info("Wisdom backend shutting down")


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Wisdom Scripture Search API",
    description=(
        "Three-step RAG pipeline over 18k Hindu scripture verses. "
        "Step 1: intent extraction. Step 2: BGE-M3 semantic search. "
        "Step 3: Sarvam AI synthesis."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(intent_router.router,        prefix="/api/v1")
app.include_router(search_router.router,        prefix="/api/v1")
app.include_router(rag_router.router,           prefix="/api/v1")
app.include_router(verse_of_day_router.router,  prefix="/api/v1")


@app.get("/", tags=["health"])
async def root():
    return {"status": "ok", "service": "wisdom-search"}


@app.get("/health", tags=["health"])
async def health_check():
    from ai.index import _index
    from ai.embedder import _embedder
    return {
        "status": "ok",
        "embedder_loaded": _embedder is not None and _embedder._model is not None,
        "index_size": _index.size if _index else 0,
    }


# ── Entry point ──────────────────────────────────────────────────────────────
# Boot the server when this file is invoked directly (`python main.py`) so it
# behaves the same as `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`.
# For production, still prefer `uvicorn` on the command line so you can pass
# --workers, --log-config, --lifespan, etc.

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.environ.get("HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", "8000")),
        # reload=True picks up code changes without a manual restart during
        # development. Turn this off in production via UVICORN_RELOAD=0.
        reload=os.environ.get("UVICORN_RELOAD", "1") == "1",
    )

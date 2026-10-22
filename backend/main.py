"""
main.py — FastAPI entry point for the Wisdom scripture search backend.

Pipeline:
    POST /api/v1/intent      → validate + extract 1-3 intents (Sarvam AI)
    POST /api/v1/search      → retrieve top-k verses (BGE-M3 + optional reranker)
    POST /api/v1/rag         → synthesise answer (Sarvam AI, blocking)
    POST /api/v1/rag/stream  → synthesise answer (Sarvam AI, SSE streaming)

Recommendations (onboarding):
    POST /api/v1/recommend             →  verses + prasangs for a person (age, stages,
                                          phone hours, feeling, optional note) from the
                                          curated v2 library (data/taxonomy/wisdom_library.json)

Plans (one reading of the person → hook → diagnose → act → story):
    POST /api/v1/recommend/hook        →  onboarding: the reading + the hook verse (+ alternates)
    POST /api/v1/recommend/preview     →  the arc: hook, diagnose, act, story + week titles
    POST /api/v1/recommend/plan        →  the multi-day plan (default 21 days)

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
from ai.recommender import init_recommender
from ai.planner import init_planner
from ai.understanding import init_understander
from ai.sarvam import get_sarvam
from server import intent as intent_router
from server import search as search_router
from server import rag as rag_router
from server import verse_of_day as verse_of_day_router
from server import recommend as recommend_router
from server import plan as plan_router
from server import narration as narration_router

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
        backend    = settings.embed_backend,
        cf_account_id = settings.cf_account_id,
        cf_api_token  = settings.cf_api_token,
        cf_model   = settings.cf_embed_model,
    )
    logger.info("Embedder ready (dim=%d)", embedder.dim)

    # 3. Scripture index (loads verses.json + embeddings.npy from data_dir)
    idx = init_index(data_dir=settings.data_dir)
    logger.info("Index ready: %d verses", idx.size)

    # 3b. Recommender (curated v2 library). Verse + situation embeddings are
    #     computed once in the background and cached in data_dir; until then
    #     notes are matched by keywords, so the endpoint works from the start.
    rec = init_recommender(library_path=settings.wisdom_library_path, cache_dir=settings.data_dir, embed=embedder.embed_batch)

    # 3c. Plans: the reading of the person (LLM, with a deterministic fallback) and the
    #     beat-aware planner (prasang + mechanism embeddings cached next to the verses').
    from ai.llm_providers import make_client
    sarvam = get_sarvam() if settings.sarvam_api_key else None
    roles = {r: make_client(getattr(settings, f"llm_{r}"), sarvam=sarvam, openai_key=settings.openai_api_key,
                            openai_base_url=settings.openai_base_url, reasoning=settings.llm_reasoning) for r in ("reader", "writer", "rerank")}
    init_understander(rec, llm=roles["reader"], timeout_s=settings.understand_timeout_s,
                      writer_llm=roles["writer"], rerank_llm=roles["rerank"])
    logger.info("LLM roles: reader=%s writer=%s rerank=%s", *(getattr(c, "model", "none") for c in roles.values()))
    init_planner(rec, roles_path=settings.verse_roles_path)

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
app.include_router(plan_router.router,          prefix="/api/v1")   # before /recommend: more specific paths
app.include_router(narration_router.router,     prefix="/api/v1")
app.include_router(recommend_router.router,     prefix="/api/v1")


@app.get("/", tags=["health"])
async def root():
    return {"status": "ok", "service": "wisdom-search", "version": app.version}


@app.get("/health", tags=["health"])
async def health_check():
    from ai.index    import _index
    from ai.embedder import _embedder
    from ai.reranker import get_reranker
    from ai.recommender import _recommender
    from ai.planner import _planner
    rr = get_reranker()
    return {
        "recommender_verses":    len(_recommender.verses) if _recommender else 0,
        "recommender_semantic":  bool(_recommender and _recommender.semantic),
        "planner_semantic":      bool(_planner and _planner.semantic),
        "status":           "ok",
        "embedder_loaded":  _embedder is not None and _embedder._model is not None,
        "index_size":       _index.size if _index else 0,
        "reranker_present": rr is not None,
        "reranker_loaded":  rr is not None and rr.available,
    }

"""boot.py — bring up the recommender, planner and understander the way main.py's lifespan does, without the
HTTP app, the search index or the cross-encoder. Query embeddings are cached on disk by text, so a rerun of a
retrieval eval makes no embedding calls and is deterministic.

    from evals.rag.boot import boot; rec, planner, und = boot()
"""
from __future__ import annotations

import hashlib
import json
import logging
import os
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
os.chdir(ROOT)
os.environ.setdefault("RERANKER_MODEL", "")
os.environ.setdefault("EMBED_BACKEND", "cloudflare")   # the production query embedder (no torch on this VM)
os.environ.setdefault("RAG_CE_CACHE", str(Path(__file__).resolve().parent / "cache" / "ce_scores.json"))   # evals replay cached reranker scores
logging.basicConfig(level=os.environ.get("RAG_LOG", "WARNING"))

RAG = Path(__file__).resolve().parent
QCACHE = RAG / "cache" / "qemb"


class CachedEmbed:
    """Wraps embed_batch with a per-text disk cache (one .npy per text hash)."""

    def __init__(self, fn):
        self.fn = fn
        QCACHE.mkdir(parents=True, exist_ok=True)
        self.calls = 0

    def __call__(self, texts):
        texts = list(texts)
        out = [None] * len(texts)
        miss = []
        for i, t in enumerate(texts):
            p = QCACHE / (hashlib.sha1(t.encode()).hexdigest()[:20] + ".npy")
            if p.exists():
                out[i] = np.load(p)
            else:
                miss.append(i)
        if miss:
            self.calls += 1
            vecs = np.asarray(self.fn([texts[i] for i in miss]), dtype=np.float32)
            for j, i in enumerate(miss):
                np.save(QCACHE / (hashlib.sha1(texts[i].encode()).hexdigest()[:20] + ".npy"), vecs[j])
                out[i] = vecs[j]
        return np.stack(out).astype(np.float32)


_SERVICES = None


def boot(llm: bool = False):
    """(rec, planner, und). `und` is None unless llm=True (only the reading step needs Sarvam)."""
    global _SERVICES
    if _SERVICES is not None and (not llm or _SERVICES[2] is not None):
        return _SERVICES
    from common.config import settings
    from ai.embedder import init_embedder
    from ai.recommender import init_recommender
    from ai.planner import init_planner

    emb = init_embedder(model_dir=settings.model_dir, model_name=settings.embed_model, backend=settings.embed_backend,
                        cf_account_id=settings.cf_account_id, cf_api_token=settings.cf_api_token, cf_model=settings.cf_embed_model)
    embed = CachedEmbed(emb.embed_batch)
    rec = init_recommender(library_path=settings.wisdom_library_path, cache_dir=settings.data_dir, embed=embed)
    planner = init_planner(rec, roles_path=settings.verse_roles_path, background=False)
    und = None
    if llm:
        from ai.sarvam import init_sarvam, get_sarvam
        from ai.llm_providers import make_client
        from ai.understanding import init_understander
        init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
        sarvam = get_sarvam()
        roles = {r: make_client(getattr(settings, f"llm_{r}"), sarvam=sarvam, openai_key=settings.openai_api_key,
                                openai_base_url=settings.openai_base_url, reasoning=settings.llm_reasoning)
                 for r in ("reader", "writer", "rerank")}
        und = init_understander(rec, llm=roles["reader"], timeout_s=float(os.environ.get("RAG_READ_TIMEOUT", "45")),
                                writer_llm=roles["writer"], rerank_llm=roles["rerank"])
    _SERVICES = (rec, planner, und)
    return _SERVICES


def sarvam_json(system: str, user: str, max_tokens: int = 2000, temperature: float = 0.0, timeout_s: int = 90,
                retries: int = 2) -> dict:
    """One Sarvam JSON-mode call (labeller and judges). Same model family as the composer: weaker evidence than a
    cross-family judge, flagged in every report."""
    from common.config import settings
    from ai.sarvam import init_sarvam, get_sarvam
    try:
        c = get_sarvam()
    except RuntimeError:
        c = init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
    import time as _t
    err = None
    for k in range(retries + 4):
        try:
            return c.chat_json([{"role": "system", "content": system}, {"role": "user", "content": user}],
                               temperature=temperature, max_tokens=max_tokens, timeout_s=timeout_s)
        except Exception as e:      # noqa: BLE001
            err = e
            if "TooManyRequests" in type(e).__name__ or "429" in str(e)[:200]:
                _t.sleep(4 * (k + 1))
            elif k >= retries:
                break
    raise err

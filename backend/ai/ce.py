"""ce.py — cross-encoder scores for the planner's rerank (RAG v2, step 5).

Backend: Cloudflare Workers AI @cf/baai/bge-reranker-base over REST, the same account and token as the query
embedder, so it runs on Vercel with no torch (bge-reranker-v2-m3 on CPU measured ~2 pairs/s on 2 vCPU: far too slow
for 160 pairs a request). Scores are cached:
  1. a precomputed file (settings.rag_ce_cache: JSON {sha1(query)[:16]|verse_id: score}) written by
     evals/rag/ce_cache.py, which evals read so a rerun is deterministic and free;
  2. otherwise one live call per (query, candidate list), when settings.rag_ce_live is on.
If the scores can't be had for every candidate, score() returns None and the planner keeps its own order.
"""
from __future__ import annotations

import hashlib
import json
import logging
from pathlib import Path
from typing import List, Optional

import numpy as np

logger = logging.getLogger(__name__)
_CACHE: Optional[dict] = None
STATS = {"hit": 0, "miss": 0, "live": 0}
CF_MODEL = "@cf/baai/bge-reranker-base"


def qkey(query: str) -> str:
    return hashlib.sha1(query.encode()).hexdigest()[:16]


def _cache() -> dict:
    global _CACHE
    if _CACHE is None:
        from common.config import settings
        p = Path(getattr(settings, "rag_ce_cache", "") or "")
        _CACHE = json.loads(p.read_text()) if p.is_file() else {}
        if _CACHE:
            logger.info("ce: %d cached cross-encoder scores from %s", len(_CACHE), p)
    return _CACHE


def cf_rerank(query: str, docs: List[str], timeout_s: float = 4.0) -> Optional[List[float]]:
    """Scores in the order of `docs`, or None."""
    import httpx
    from common.config import settings
    if not (settings.cf_account_id and settings.cf_api_token) or not docs:
        return None
    url = f"https://api.cloudflare.com/client/v4/accounts/{settings.cf_account_id}/ai/run/{CF_MODEL}"
    try:
        r = httpx.post(url, headers={"Authorization": f"Bearer {settings.cf_api_token}"}, timeout=timeout_s,
                       json={"query": query, "contexts": [{"text": d[:1500]} for d in docs], "top_k": len(docs)})
        r.raise_for_status()
        res = r.json().get("result") or {}
        rows = res.get("response") if isinstance(res, dict) else res
        out = [None] * len(docs)
        for x in rows or []:
            i = int(x["id"])
            if 0 <= i < len(docs):
                out[i] = float(x["score"])
        return None if any(v is None for v in out) else out
    except Exception as e:  # noqa: BLE001
        logger.warning("ce: Cloudflare rerank failed: %s", type(e).__name__)
        return None


def score(query: str, ids: List[str], docs: List[str]) -> Optional[np.ndarray]:
    c = _cache()
    k = qkey(query)
    got = [c.get(f"{k}|{v}") for v in ids]
    if all(x is not None for x in got):
        STATS["hit"] += 1
        return np.array(got, dtype=np.float32)
    from common.config import settings
    if getattr(settings, "rag_ce_live", False):
        out = cf_rerank(query, docs)
        if out is not None:
            STATS["live"] += 1
            for v, x in zip(ids, out):
                c[f"{k}|{v}"] = x
            return np.array(out, dtype=np.float32)
    STATS["miss"] += 1
    return None

"""
hook_cache.py — the same onboarding answers get the same Day 1 answer.

/recommend/hook reads the person with an LLM and reranks the top verses with another. Both sample, so
the same note sent twice (back, then the CTA again) could come back with a different mechanism, a
different shortlist and a different Day 1 verse. The first good answer for a request is kept here and
served again for the same request.

Shared across Vercel instances through Supabase (table hook_cache, migration 005), over PostgREST with
short timeouts: a slow or missing store never fails or noticeably slows a request, it just misses.

What is kept: the response the app already received (the reading's paraphrases, the verses). The note
itself is never stored: it only goes into the key as part of a SHA-256 hash.

What is not kept: a reading that fell back to templates (LLM timeout or error), a hook the LLM did not
rerank, any risk other than "none", and an answer without a verse. Those are asked again next time.
"""
from __future__ import annotations

import hashlib
import json
import logging
import os
import re
from datetime import datetime, timedelta, timezone
from typing import Optional

import httpx

from common.config import settings

logger = logging.getLogger(__name__)

CACHE_VERSION = 1           # bump to drop every cached answer (prompt or ranking changes that should show at once)
_TABLE = "hook_cache"
_WS = re.compile(r"\s+")


def _enabled() -> bool:
    return bool(settings.hook_cache_enabled and os.environ.get("SUPABASE_URL", "").strip()
                and os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip())


def _base() -> str:
    return os.environ["SUPABASE_URL"].strip().rstrip("/") + f"/rest/v1/{_TABLE}"


def _headers() -> dict:
    k = os.environ["SUPABASE_SERVICE_ROLE_KEY"].strip()
    return {"apikey": k, "Authorization": f"Bearer {k}", "Content-Type": "application/json"}


def norm_note(note: Optional[str]) -> str:
    """Whitespace and case do not make a different request."""
    return _WS.sub(" ", (note or "").strip()).lower()


def request_key(req, library_version: str, understanding_version: int) -> str:
    d = req.model_dump(mode="json")
    note = norm_note(d.pop("note", None))
    d.pop("note_source", None)      # typed or spoken, the same words are the same request
    d["note_sha"] = hashlib.sha256(note.encode()).hexdigest() if note else ""
    d["stages"] = sorted(d.get("stages") or [])
    d["exclude"] = sorted(d.get("exclude") or [])
    d["_v"] = [CACHE_VERSION, library_version, understanding_version,
               settings.llm_reader, settings.llm_rerank, settings.sarvam_model]
    return hashlib.sha256(json.dumps(d, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def cacheable(out: dict, reranked: bool) -> bool:
    u = out.get("understanding") or {}
    return bool(out.get("hook") and reranked and u.get("source") == "llm" and u.get("risk") == "none"
                and not out.get("safety"))


def get(key: str) -> Optional[dict]:
    if not _enabled():
        return None
    since = (datetime.now(timezone.utc) - timedelta(days=settings.hook_cache_ttl_days)).isoformat()
    try:
        r = httpx.get(_base(), headers=_headers(), timeout=settings.hook_cache_timeout_s,
                      params={"select": "response", "key": f"eq.{key}", "created_at": f"gte.{since}", "limit": "1"})
        if r.status_code == 200 and r.json():
            return r.json()[0]["response"]
        if r.status_code != 200:
            logger.info("hook cache get: HTTP %s", r.status_code)
    except Exception as e:
        logger.info("hook cache get skipped: %s", type(e).__name__)
    return None


def put(key: str, out: dict, library_version: str) -> None:
    if not _enabled():
        return
    body = {"key": key, "response": {k: v for k, v in out.items() if k != "timings_ms"},
            "library_version": library_version, "created_at": datetime.now(timezone.utc).isoformat()}
    try:
        r = httpx.post(_base(), headers={**_headers(), "Prefer": "resolution=merge-duplicates,return=minimal"},
                       json=body, timeout=settings.hook_cache_timeout_s)
        if r.status_code >= 300:
            logger.info("hook cache put: HTTP %s %s", r.status_code, r.text[:120])
        # Prune what can no longer be served. Cheap with the created_at index; failures are harmless.
        cutoff = (datetime.now(timezone.utc) - timedelta(days=settings.hook_cache_ttl_days)).isoformat()
        httpx.delete(_base(), headers=_headers(), params={"created_at": f"lt.{cutoff}"},
                     timeout=settings.hook_cache_timeout_s)
    except Exception as e:
        logger.info("hook cache put skipped: %s", type(e).__name__)

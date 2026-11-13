"""
run_log.py — one Supabase `plan_runs` row per call to the plan endpoints (migration 008).

What came in (the person's answers and the tracking ids in `client`, never their words), what the backend did with it
(the reading's source, quality, risk, stance, mechanism, situations, flags, timings, a cache hit, an error) and what
went out (Day 1's verse, every verse and story id chosen, the safety answer). Written for every call: with or without
a note, with or without AI consent, and when the endpoint fails.

Joining with Mixpanel: the app and the web send `client.onboarding_id` (one per onboarding, also a Mixpanel super
property) and `client.request_id` (one per call, also on the Mixpanel event that reports the call). The note text, when
there is one and AI was allowed, stays in raw_notes under the same request_id (ai/note_store.py).

Use it as a decorator under the route: @router.post(...) then @logged("hook"). It reads the request before the endpoint
runs, because _consent() clears the note of someone who declined AI. Writes go over PostgREST with a short timeout and
never fail or change a request. Off with RUN_LOG_ENABLED=false.
"""
from __future__ import annotations

import asyncio
import contextvars
import functools
import inspect
import logging
import os
import time
from typing import Any, Optional

import httpx
from fastapi import HTTPException

from common.config import settings

logger = logging.getLogger(__name__)

_TABLE = "plan_runs"

# Set per request by the middleware in main.py: the visitor's country as Vercel sees it.
request_country: contextvars.ContextVar[Optional[str]] = contextvars.ContextVar("request_country", default=None)


def _enabled() -> bool:
    return bool(settings.run_log_enabled and os.environ.get("SUPABASE_URL", "").strip()
                and os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip())


def client_of(req) -> dict:
    c = getattr(req, "client", None)
    return c.model_dump() if c is not None else {}


def country_of(req) -> Optional[str]:
    """The web's server passes the visitor's country in `client`; the app reaches us directly, so Vercel's header."""
    c = client_of(req).get("country")
    return (c or request_country.get() or None)


def inputs(endpoint: str, req) -> dict:
    """What the request carried, read before the endpoint runs (and before _consent clears a declined note)."""
    c = client_of(req)
    note = getattr(req, "note", None)
    note = note.strip() if isinstance(note, str) else ""
    stages = getattr(req, "stages", None) or []
    return {
        "endpoint": endpoint,
        "request_id": c.get("request_id"),
        "onboarding_id": c.get("onboarding_id"),
        "distinct_id": c.get("distinct_id"),
        "user_id": c.get("user_id"),
        "platform": c.get("platform"),
        "app_version": c.get("app_version"),
        "context": c.get("context"),
        "dev": bool(c.get("dev")),
        "country": country_of(req),
        "feeling": getattr(req, "feeling", None),
        "emotion": c.get("emotion"),
        "emotion_trail": list(c.get("emotion_trail") or []),
        "age": getattr(req, "age", None),
        "stages": [str(s) for s in stages],
        "phone_hours": getattr(req, "phone_hours", None),
        "topic": getattr(req, "topic", None),
        "follow": getattr(req, "follow", None),
        "ai_consent": bool(getattr(req, "ai", True)),
        "has_note": bool(note) and bool(getattr(req, "ai", True)),
        "note_withheld": c.get("note_withheld"),
        "note_source": getattr(req, "note_source", None) if note else None,
        "note_chars": len(note) if note else 0,
        "week": getattr(req, "week", None),
        "from_day": getattr(req, "from_day", None),
        "correction": getattr(req, "correction", None),
        "hook_id_in": getattr(req, "hook_id", None),
        "exclude_count": len(getattr(req, "exclude", None) or []),
    }


def _id(card: Any) -> Optional[str]:
    return card.get("id") if isinstance(card, dict) else None


def outputs(endpoint: str, resp: Any) -> dict:
    """What the backend made of it and sent back. Ids, labels and flags only: no verse text, no written lines."""
    d = resp.model_dump(mode="json") if hasattr(resp, "model_dump") else (resp or {})
    u = d.get("understanding") or {}
    flags = [str(f) for f in (u.get("flags") or [])]
    cache_hit = "hook_cache:hit" in flags
    out: dict = {
        "reading_source": ("cache" if cache_hit else u.get("source")) if u else ("legacy" if endpoint == "recommend" else None),
        "note_quality": u.get("note_quality"),
        "risk": u.get("risk"),
        "stance": u.get("stance"),
        "mechanism": u.get("mechanism"),
        "confidence": u.get("confidence"),
        "situations": [{"id": s.get("id"), "weight": s.get("weight"), "source": s.get("source")}
                       for s in (u.get("situations") or d.get("situations") or []) if isinstance(s, dict)] or None,
        "flags": flags[:60],
        "cache_hit": cache_hit if endpoint == "hook" else None,
        "timings_ms": d.get("timings_ms") or None,
        "library_version": d.get("library_version"),
        "understanding_version": u.get("version"),
        "safety_kind": (d.get("safety") or {}).get("kind") if isinstance(d.get("safety"), dict) else None,
    }
    ids: list = []
    hook_id = story_id = None
    days_count = None
    if endpoint == "hook":
        hook_id = _id(d.get("hook"))
        ids = [_id(d.get("hook")), *[_id(a) for a in d.get("alternates") or []]]
    elif endpoint == "preview":
        beats = d.get("beats") or {}
        hook_id = _id(beats.get("hook"))
        story_id = _id(beats.get("story"))
        ids = [_id(beats.get(b)) for b in ("hook", "diagnose", "steady", "act", "story")]
    elif endpoint in ("plan", "refine"):
        days = d.get("days") or []
        days_count = len(days)
        for day in days:
            if day.get("story"):
                ids.append(_id(day["story"]))
                story_id = story_id or _id(day["story"])
            else:
                ids.append(_id(day.get("verse")))
            if day.get("day") == 1 and day.get("verse"):
                hook_id = _id(day["verse"])
    elif endpoint == "replace":
        ids = [_id(d.get("verse"))]
    elif endpoint == "recommend":
        ids = [_id(v) for v in d.get("verses") or []]
        hook_id = ids[0] if ids else None
        if isinstance(d.get("safety"), dict) and d["safety"]:
            out["safety_kind"] = "self_harm"
    elif endpoint == "depth":
        out["out_kind"] = "cached" if d.get("cached") else "fresh"
    elif endpoint == "ask":
        out["out_kind"] = d.get("kind")
        if isinstance(d.get("support"), dict):
            ids = [_id(d["support"])]
    seen: list = []
    for i in ids:
        if i and i not in seen:
            seen.append(i)
    out.update({"hook_id": hook_id, "story_id": story_id, "verse_ids": seen, "days_count": days_count})
    return out


def row(endpoint: str, req_inputs: dict, resp: Any = None, latency_ms: int = 0, status: str = "ok",
        http_status: int = 200, error: Optional[str] = None) -> dict:
    r = dict(req_inputs)
    r.update({"status": status, "http_status": http_status, "error": error, "latency_ms": latency_ms})
    if resp is not None:
        r.update(outputs(endpoint, resp))
    return r


def put(r: dict) -> None:
    if not _enabled():
        return
    k = os.environ["SUPABASE_SERVICE_ROLE_KEY"].strip()
    try:
        resp = httpx.post(os.environ["SUPABASE_URL"].strip().rstrip("/") + f"/rest/v1/{_TABLE}",
                          headers={"apikey": k, "Authorization": f"Bearer {k}", "Content-Type": "application/json",
                                   "Prefer": "return=minimal"},
                          json=r, timeout=settings.run_log_timeout_s)
        if resp.status_code >= 300:
            logger.info("run log put: HTTP %s %s", resp.status_code, resp.text[:160])
    except Exception as e:
        logger.info("run log put skipped: %s", type(e).__name__)


async def _record(r: dict) -> None:
    try:
        await asyncio.to_thread(put, r)
    except Exception as e:           # never let tracking touch a request
        logger.info("run log skipped: %s", type(e).__name__)


def logged(endpoint: str):
    """Decorator for a plan endpoint whose first argument is the request model."""
    def deco(fn):
        @functools.wraps(fn)
        async def wrapper(*args, **kwargs):
            req = kwargs.get("req", args[0] if args else None)
            t0 = time.perf_counter()
            try:
                got = inputs(endpoint, req)
            except Exception:
                got = {"endpoint": endpoint}
            ms = lambda: int((time.perf_counter() - t0) * 1000)
            try:
                resp = await fn(*args, **kwargs)
            except HTTPException as e:
                await _record(row(endpoint, got, None, ms(), "error", e.status_code, str(e.detail)[:200]))
                raise
            except Exception as e:
                await _record(row(endpoint, got, None, ms(), "error", 500, f"{type(e).__name__}: {str(e)[:160]}"))
                raise
            try:
                r = row(endpoint, got, resp, ms())
            except Exception as e:
                r = row(endpoint, got, None, ms(), "ok", 200, f"run_log_outputs:{type(e).__name__}")
            await _record(r)
            return resp
        # FastAPI reads the request model from the signature. The endpoints' modules use postponed annotations
        # ("HookRequest" as a string), which FastAPI would resolve in this module's globals: resolve them here.
        try:
            wrapper.__signature__ = inspect.signature(fn, eval_str=True)
        except Exception:
            pass
        return wrapper
    return deco

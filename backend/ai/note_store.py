"""
note_store.py — keep the raw notes the app sends for verse selection.

Every plan endpoint that receives the person's own words (/recommend/hook, /preview, /plan, /refine and the
legacy /recommend) writes one row to Supabase table raw_notes (migration 006): the note exactly as sent, the
answers that came with it, the reading it produced and the verse and story ids chosen. This is the dataset for
studying and evaluating verse selection against real inputs.

Only when the person allowed AI: with `ai: false`, _consent() in server/plan.py clears the note before this runs.
Writes go over PostgREST with a short timeout: a slow or missing store never fails a request, it just skips.
Off with NOTE_STORE_ENABLED=false. The note is still never written to the application logs.
"""
from __future__ import annotations

import logging
import os
from typing import Iterable, Optional

import httpx

from common.config import settings

logger = logging.getLogger(__name__)

_TABLE = "raw_notes"


def _enabled() -> bool:
    return bool(settings.note_store_enabled and os.environ.get("SUPABASE_URL", "").strip()
                and os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip())


def _ids(items: Iterable) -> list:
    out = []
    for it in items:
        if isinstance(it, dict):
            v = it.get("verse") or it.get("story") or it
            i = v.get("id") if isinstance(v, dict) else None
            if i and i not in out:
                out.append(str(i))
    return out


def row(endpoint: str, req, understanding: Optional[dict] = None, chosen: Iterable = (),
        library_version: Optional[str] = None, reading_source: Optional[str] = None) -> Optional[dict]:
    """One raw_notes row, or None when the request carried no note."""
    note = getattr(req, "note", None)
    if not note or not note.strip():
        return None
    u = understanding or {}
    return {
        "endpoint": endpoint,
        "note": note,
        "note_source": getattr(req, "note_source", None),
        "feeling": getattr(req, "feeling", None),
        "age": getattr(req, "age", None),
        "stages": list(getattr(req, "stages", None) or []),
        "phone_hours": getattr(req, "phone_hours", None),
        "topic": getattr(req, "topic", None),
        "follow": getattr(req, "follow", None),
        "week": getattr(req, "week", None),
        "from_day": getattr(req, "from_day", None),
        "correction": getattr(req, "correction", None),
        "reading_source": reading_source or u.get("source"),
        "note_quality": u.get("note_quality"),
        "risk": u.get("risk"),
        "stance": u.get("stance"),
        "mechanism": u.get("mechanism"),
        "situations": u.get("situations"),
        "verse_ids": _ids(chosen),
        "library_version": library_version,
    }


def put(r: Optional[dict]) -> None:
    if r is None or not _enabled():
        return
    k = os.environ["SUPABASE_SERVICE_ROLE_KEY"].strip()
    try:
        resp = httpx.post(os.environ["SUPABASE_URL"].strip().rstrip("/") + f"/rest/v1/{_TABLE}",
                          headers={"apikey": k, "Authorization": f"Bearer {k}", "Content-Type": "application/json",
                                   "Prefer": "return=minimal"},
                          json=r, timeout=settings.note_store_timeout_s)
        if resp.status_code >= 300:
            logger.info("note store put: HTTP %s %s", resp.status_code, resp.text[:120])
    except Exception as e:
        logger.info("note store put skipped: %s", type(e).__name__)

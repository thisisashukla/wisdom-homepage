"""
supabase_client.py — Lazy Supabase client initialisation.

Uses the service-role key so the backend can INSERT rows into verse_of_day
(RLS blocks anon writes). GET /api/v1/verse-of-day also reads through this
client (service role bypasses RLS, so no need to juggle two clients).
"""
from __future__ import annotations

import os
import logging

logger = logging.getLogger(__name__)

_client = None


def get_supabase():
    """Return the module-level Supabase client; raise clearly if not configured."""
    global _client
    if _client is None:
        _client = _init()
    return _client


def _init():
    url = os.environ.get("SUPABASE_URL", "").strip()
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    if not url or not key:
        raise RuntimeError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must both be set in the "
            "backend .env to use the verse-of-day feature."
        )
    try:
        from supabase import create_client  # type: ignore
        client = create_client(url, key)
        logger.info("Supabase client ready (url=%s…)", url[:30])
        return client
    except ImportError:
        raise RuntimeError(
            "supabase-py is not installed. Add 'supabase>=2.0.0' to requirements.txt."
        )

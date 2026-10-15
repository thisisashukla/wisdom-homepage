#!/usr/bin/env python3
"""
cron_verse_of_day.py — Standalone daily cron script for Verse of the Day.

Runs independently of the FastAPI server. Can be invoked via cron, systemd
timer, GitHub Actions, or any scheduler.

Usage:
    python cron_verse_of_day.py                    # generate for today (IST)
    python cron_verse_of_day.py --date 2025-12-18  # generate for a specific date
    python cron_verse_of_day.py --days-ahead 7     # pre-generate next 7 days

Schedule (cron example — runs at midnight IST = 18:30 UTC):
    30 18 * * * cd /path/to/wisdom-homepage/backend && python cron_verse_of_day.py >> /var/log/verse_of_day.log 2>&1

Or via the FastAPI admin endpoint (if server is running):
    curl -X POST "http://localhost:8000/api/v1/verse-of-day/generate" \
         -H "X-Admin-Key: $ADMIN_KEY"

Dependencies: all packages in requirements.txt must be installed.
Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SARVAM_API_KEY, ADMIN_KEY in .env
"""
from __future__ import annotations

import argparse
import asyncio
import logging
import os
import sys
from datetime import date, timedelta, timezone, datetime
from pathlib import Path

# ── Bootstrap: load .env and set up sys.path ─────────────────────────────────
# Allow running from the backend directory or from its parent
_HERE = Path(__file__).parent
sys.path.insert(0, str(_HERE))

# Load .env early (before any imports that read os.environ)
try:
    from dotenv import load_dotenv
    load_dotenv(_HERE / ".env")
except ImportError:
    pass  # python-dotenv not installed; rely on actual env vars

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(name)s  %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger("cron_verse_of_day")


IST = timezone(timedelta(hours=5, minutes=30))


def today_ist() -> date:
    return datetime.now(tz=IST).date()


async def run(dates: list[date]) -> None:
    """Initialise all AI/index singletons then generate verse(s) for the given dates."""
    # 1. Sarvam
    from ai.sarvam import init_sarvam
    sarvam_key = os.environ.get("SARVAM_API_KEY", "")
    if not sarvam_key:
        logger.error("SARVAM_API_KEY is not set — aborting")
        sys.exit(1)
    sarvam_model = os.environ.get("SARVAM_MODEL", "sarvam-30b")
    init_sarvam(api_key=sarvam_key, model=sarvam_model)
    logger.info("Sarvam client ready (model=%s)", sarvam_model)

    # 2. BGE-M3 embedder (needed only to resolve verse text from index)
    from ai.embedder import init_embedder
    embedder = init_embedder(
        model_dir=os.environ.get("MODEL_DIR", ""),
        model_name=os.environ.get("EMBED_MODEL", "BAAI/bge-m3"),
        backend=os.environ.get("EMBED_BACKEND", "local"),
        cf_account_id=os.environ.get("CF_ACCOUNT_ID", ""),
        cf_api_token=os.environ.get("CF_API_TOKEN", ""),
        cf_model=os.environ.get("CF_EMBED_MODEL", "@cf/baai/bge-m3"),
    )
    logger.info("Embedder ready (dim=%d)", embedder.dim)

    # 3. Scripture index
    from ai.index import init_index
    data_dir = os.environ.get("INDEX_CACHE_DIR", str(_HERE / "data"))
    idx = init_index(data_dir=data_dir)
    logger.info("Index ready: %d verses", idx.size)

    # 4. Generate for each date
    from server.verse_of_day import generate_verse_for_date, _upsert_to_supabase

    for d in dates:
        logger.info("── Generating verse for %s ──", d)
        try:
            result = await generate_verse_for_date(d)
            _upsert_to_supabase({
                "date":         str(d),
                "chapter":      result.chapter,
                "verse":        result.verse,
                "verse_uid":    result.verse_uid,
                "day_of_week":  result.day_of_week,
                "deity":        result.deity,
                "day_name_hi":  result.day_name_hi,
                "date_context": result.date_context,
                "why_chosen":   result.why_chosen,
                "story":        result.story,
                "themes":       result.themes,
            })
            logger.info(
                "✓ %s → BG %d.%d (%s) | themes: %s",
                d, result.chapter, result.verse,
                result.deity, ", ".join(result.themes[:3])
            )
            logger.info("  date_context: %s…", result.date_context[:80])
            logger.info("  why_chosen:   %s…", result.why_chosen[:80])
        except Exception as e:
            logger.error("✗ Failed for %s: %s", d, e)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate Verse of the Day entries")
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--date",
        metavar="YYYY-MM-DD",
        help="Generate for a specific date (default: today IST)",
    )
    group.add_argument(
        "--days-ahead",
        type=int,
        metavar="N",
        help="Pre-generate for today + N days ahead",
    )
    args = parser.parse_args()

    if args.date:
        dates = [date.fromisoformat(args.date)]
    elif args.days_ahead:
        today = today_ist()
        dates = [today + timedelta(days=i) for i in range(args.days_ahead + 1)]
    else:
        dates = [today_ist()]

    logger.info("cron_verse_of_day: generating for %d date(s): %s", len(dates), dates)
    asyncio.run(run(dates))
    logger.info("cron_verse_of_day: done")


if __name__ == "__main__":
    main()

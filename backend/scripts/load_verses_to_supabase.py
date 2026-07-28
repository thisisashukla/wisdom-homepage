#!/usr/bin/env python3
"""
load_verses_to_supabase.py — One-shot migration script.

Loads the local BGE-M3 enriched corpus (embeddings.npy + verses.json from
backend/data/) into the Supabase `verses` table created by migration
002_verses.sql. Idempotent — reruns upsert on `uid`.

Assumes:
  - Migration 002_verses.sql has been applied.
  - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set (or .env is present).
  - Local files exist:
      backend/data/embeddings.npy  (N × 1024 float32, L2-normalised)
      backend/data/verses.json     (N verse dicts in matching order)

Run:
    cd wisdom-homepage/backend
    python scripts/load_verses_to_supabase.py

Options:
    --batch-size 200        Rows per upsert (default 200; larger → fewer round
                            trips but bigger JSON payloads; the PostgREST hard
                            limit is around 1MB per request).
    --limit N               Only insert the first N verses (useful for testing).
    --skip-audio            Don't touch audio_url/audio_timestamps on upsert
                            (default). If a row already has audio_url set,
                            this script never overwrites it.
    --dry-run               Print counts + first-row payload preview, no writes.

Safe to rerun. Upsert is keyed on `uid`, so re-embedding the corpus and
re-running this script updates in place. `audio_url` is NEVER overwritten
when it's already populated (protected by the SQL — the upsert only writes
audio_url when it's currently NULL).
"""
from __future__ import annotations

import argparse
import json
import logging
import os
import sys
import time
from pathlib import Path
from typing import Any

import numpy as np


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    stream=sys.stdout,
)
log = logging.getLogger("load_verses")


# ── Path helpers ─────────────────────────────────────────────────────────────

def _default_data_dir() -> Path:
    """
    Return the backend/data directory whether the script is run from the
    backend/ root or from backend/scripts/.
    """
    here = Path(__file__).resolve().parent
    for candidate in (here.parent / "data", here / "data", Path("data").resolve()):
        if (candidate / "verses.json").exists() and (candidate / "embeddings.npy").exists():
            return candidate
    raise FileNotFoundError(
        "Could not find embeddings.npy + verses.json. Pass --data-dir to override."
    )


# ── Supabase client ──────────────────────────────────────────────────────────

def _get_supabase():
    # Prefer the module-level backend client (loads .env), fall back to
    # constructing directly if this script is run in isolation.
    try:
        from common.supabase_client import get_supabase  # type: ignore
        return get_supabase()
    except Exception:
        # Try to load .env manually then create.
        try:
            from dotenv import load_dotenv  # type: ignore
            load_dotenv()
        except ImportError:
            pass
        try:
            from supabase import create_client
        except ImportError:
            log.error("supabase-py is not installed. `pip install supabase`.")
            sys.exit(2)
        url = os.environ.get("SUPABASE_URL", "").strip()
        key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
        if not url or not key:
            log.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.")
            sys.exit(2)
        return create_client(url, key)


# ── Row shaping ──────────────────────────────────────────────────────────────

def _tags_list(raw: Any) -> list[str]:
    if raw is None:
        return []
    if isinstance(raw, str):
        return [t.strip() for t in raw.split(",") if t.strip()]
    if isinstance(raw, list):
        return [str(t).strip() for t in raw if str(t).strip()]
    return []


def _default_meter_for(scripture: str) -> str:
    """
    Conservative default. Most Gita verses are anushtubh (32-syllable); a
    few chapters (11, 15) are trishtubh. The vagdhenu chandas_labeler can
    detect meter properly — this is a fallback for rows we haven't labelled.
    """
    if scripture.startswith("bhagwad_gita") or scripture == "bhagavad_gita":
        return "anushtubh"
    return "anushtubh"


def _row_for(verse: dict, embedding: np.ndarray) -> dict:
    """
    Shape a single verse + its embedding into the DB row payload.
    """
    uid = verse.get("script_ref") or verse.get("uid")
    if not uid:
        raise ValueError(f"Verse missing script_ref/uid: keys={list(verse.keys())[:6]}")

    return {
        "uid":                 uid,
        "scripture":           verse.get("scripture", ""),
        "verse_id":            verse.get("orig_ref", ""),
        "ord":                 int(verse.get("order", 0) or 0),
        "verse_sanskrit":      verse.get("verse_text", "") or "",
        "verse_hindi":         verse.get("translation", "") or "",
        "english_translation": verse.get("english_translation", "") or "",
        "essence":             verse.get("essence", "") or "",
        "simple_meaning":      verse.get("simple_meaning", "") or "",
        "insight":             verse.get("insight", "") or "",
        "modern_relevance":    verse.get("modern_relevance", "") or "",
        "speaker":             verse.get("speaker", "") or "",
        "tags":                _tags_list(verse.get("tags")),
        "meter":               (verse.get("meter") or _default_meter_for(verse.get("scripture", ""))),
        # supabase-py accepts a plain list[float] for pgvector columns.
        "embedding":           [float(x) for x in embedding.tolist()],
        # audio_url / audio_timestamps intentionally omitted so upserts
        # NEVER null out already-generated audio.
    }


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--data-dir",   type=Path, default=None, help="Override backend/data directory")
    ap.add_argument("--batch-size", type=int, default=200)
    ap.add_argument("--limit",      type=int, default=None)
    ap.add_argument("--dry-run",    action="store_true")
    args = ap.parse_args()

    data_dir = args.data_dir or _default_data_dir()
    embed_path  = data_dir / "embeddings.npy"
    verses_path = data_dir / "verses.json"

    log.info("Loading embeddings from %s …", embed_path)
    embeddings = np.load(str(embed_path)).astype(np.float32)
    log.info("Loading verses from %s …", verses_path)
    verses = json.loads(verses_path.read_text(encoding="utf-8"))

    if len(verses) != embeddings.shape[0]:
        log.error("Row-count mismatch: verses=%d, embeddings=%d",
                  len(verses), embeddings.shape[0])
        sys.exit(1)

    if embeddings.shape[1] != 1024:
        log.error("Embedding dim=%d — expected 1024 (BGE-M3).", embeddings.shape[1])
        sys.exit(1)

    if args.limit:
        verses     = verses[: args.limit]
        embeddings = embeddings[: args.limit]
        log.info("--limit applied: processing first %d rows", len(verses))

    # ── Preview / dry-run ────────────────────────────────────────────────
    sample = _row_for(verses[0], embeddings[0])
    log.info(
        "Sample row uid=%s scripture=%s dim=%d fields=%d",
        sample["uid"], sample["scripture"], len(sample["embedding"]), len(sample),
    )
    if args.dry_run:
        log.info("--dry-run: no writes performed. Would upsert %d rows.", len(verses))
        return

    supabase = _get_supabase()

    # ── Batch upsert ─────────────────────────────────────────────────────
    total   = len(verses)
    written = 0
    started = time.perf_counter()

    for start in range(0, total, args.batch_size):
        chunk_verses = verses[start : start + args.batch_size]
        chunk_embeds = embeddings[start : start + args.batch_size]
        payload = [_row_for(v, e) for v, e in zip(chunk_verses, chunk_embeds)]

        try:
            supabase.table("verses").upsert(payload, on_conflict="uid").execute()
        except Exception as exc:
            log.error("Batch %d-%d failed: %s", start, start + len(payload), exc)
            log.error("First uid in failed batch: %s", payload[0].get("uid"))
            sys.exit(3)

        written += len(payload)
        elapsed = time.perf_counter() - started
        rate = written / elapsed if elapsed else 0.0
        eta = (total - written) / rate if rate else 0.0
        log.info(
            "Upserted %d/%d (%.0f rows/s, ETA %ds)",
            written, total, rate, int(eta),
        )

    log.info("Done. %d rows upserted in %.1fs.", written, time.perf_counter() - started)


if __name__ == "__main__":
    main()

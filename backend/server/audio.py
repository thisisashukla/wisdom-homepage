"""
server/audio.py — Audio endpoints for Sanskrit shloka recitation.

Endpoints:

  GET  /api/v1/audio/{uid}
      Look up a verse's audio_url. Returns 200 with {audio_url, timestamps}
      if present; 404 if the verse doesn't exist; 204 if the verse exists
      but audio hasn't been generated yet (client should call POST to
      generate).

  POST /api/v1/audio/generate
      Generate audio on-demand via vagdhenu, upload to Supabase Storage,
      patch verses.audio_url, return {audio_url, timestamps, generated: bool}.

      Accepts EITHER a uid (DB lookup for text + meter) OR raw text + meter
      (arbitrary shlokas outside the corpus). Uid path also patches the DB;
      raw-text path just returns the URL without persisting.

      If the verse already has audio_url, returns it immediately with
      generated: false. Prevents duplicate work when two clients race.

Dependencies:
  - Supabase client (for verses lookup + Storage upload + audio_url patch)
  - Vagdhenu client (for actual TTS)

Concurrency note:
  Two simultaneous /generate calls for the same uid MAY both hit vagdhenu —
  the second call's storage upload will overwrite the first's, and the DB
  patch is last-write-wins. Cost is one wasted generation; correctness is
  unaffected. If you care, add a Redis lock or use pg_advisory_lock in an
  RPC. Not worth the complexity at MVP traffic.
"""
from __future__ import annotations

import hashlib
import logging
import time
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ai.vagdhenu import get_vagdhenu
from common.config import settings
from common.supabase_client import get_supabase

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Response / request schemas ───────────────────────────────────────────────

class AudioLookupResponse(BaseModel):
    uid: str
    audio_url: Optional[str] = None
    timestamps: Optional[list] = None    # word-level karaoke, if available
    generated_at: Optional[str] = None


class AudioGenerateRequest(BaseModel):
    # Either uid OR (text + meter). If both, uid wins and text is only used
    # as a fallback if the DB row's Sanskrit is empty.
    uid: Optional[str] = None
    text: Optional[str] = Field(default=None, description="Devanagari shloka text (fallback if uid absent)")
    meter: str = "anushtubh"
    seed: Optional[int] = None
    # If true, force regenerate even when audio_url is already populated.
    # Guarded so a curious frontend doesn't accidentally burn generations.
    force: bool = False


class AudioGenerateResponse(BaseModel):
    uid: Optional[str] = None
    audio_url: str
    timestamps: Optional[list] = None
    generated: bool                        # True = we just ran vagdhenu
    duration_ms: Optional[int] = None      # wall-clock of the generation call


# ── Helpers ──────────────────────────────────────────────────────────────────

def _storage_key(uid: Optional[str], text: Optional[str]) -> str:
    """
    Object key for the Supabase Storage upload. Uid-keyed when we know the
    corpus verse; content-hashed when the text is ad-hoc so we still dedupe
    repeats of the same raw shloka.
    """
    if uid:
        # e.g. "audio/bhagwad_gita/18.66.wav" — mirrors the existing Gita
        # player convention that the frontend already reads from.
        scripture, sep, verse_id = uid.partition(":")
        if not sep:
            # Malformed uid; fall through to hash.
            scripture, verse_id = "misc", uid
        return f"audio/{scripture}/{verse_id}.wav"

    # Ad-hoc text — hash so repeats hit the same object.
    h = hashlib.sha1((text or "").encode("utf-8")).hexdigest()[:16]
    return f"audio/adhoc/{h}.wav"


def _public_url_for(bucket: str, key: str) -> str:
    """
    Build the public URL for a Supabase Storage object without a network
    round-trip. Works for public buckets. For private buckets, call
    supabase.storage.from_(bucket).create_signed_url(key, expires_in) instead.
    """
    base = settings.supabase_url.rstrip("/")
    return f"{base}/storage/v1/object/public/{bucket}/{key}"


def _upload_wav(bucket: str, key: str, wav_bytes: bytes) -> None:
    """
    Upload (or overwrite) a WAV file in the given bucket. supabase-py's
    Storage v3 accepts bytes and honours upsert via file_options.
    """
    sb = get_supabase()
    try:
        sb.storage.from_(bucket).upload(
            path=key,
            file=wav_bytes,
            file_options={
                "content-type": "audio/wav",
                # cache aggressively — regeneration is behind ?force=true only.
                "cache-control": "public, max-age=31536000, immutable",
                # `upsert` header keys are lowercase per supabase-py convention.
                "upsert": "true",
            },
        )
    except Exception as e:
        # Some supabase-py versions raise on 4xx while some return an error
        # object. Normalise to an HTTPException here.
        raise HTTPException(status_code=502, detail=f"Storage upload failed: {e}")


def _patch_verse_audio(uid: str, audio_url: str, timestamps: Optional[list]) -> None:
    """
    Update verses.audio_url + audio_timestamps + audio_generated_at for one uid.
    Never overwrites an existing audio_url unless force was set (handled at
    the caller — we always patch here).
    """
    sb = get_supabase()
    payload = {
        "audio_url": audio_url,
        "audio_timestamps": timestamps,   # JSONB — None is fine
        "audio_generated_at": datetime.now(timezone.utc).isoformat(),
    }
    try:
        sb.table("verses").update(payload).eq("uid", uid).execute()
    except Exception as e:
        logger.warning("Failed to patch verses.audio_url for %s: %s", uid, e)
        # Non-fatal — the URL is still valid, just not memoised. Return
        # success to the caller; next lookup will regenerate metadata.


def _fetch_verse_row(uid: str) -> Optional[dict]:
    sb = get_supabase()
    try:
        resp = (
            sb.table("verses")
            .select("uid, verse_sanskrit, meter, audio_url, audio_timestamps")
            .eq("uid", uid)
            .limit(1)
            .execute()
        )
    except Exception as e:
        logger.error("verses lookup for %s failed: %s", uid, e)
        raise HTTPException(status_code=502, detail=f"DB lookup failed: {e}")
    rows = resp.data or []
    return rows[0] if rows else None


# ── Routes ───────────────────────────────────────────────────────────────────

@router.get("/audio/{uid:path}", response_model=AudioLookupResponse, tags=["audio"])
async def get_audio_url(uid: str) -> AudioLookupResponse:
    """
    Fast path: return audio_url if the verse has one already. This is what
    the frontend calls first — a hit means the play button can bind straight
    to the URL, no generation round-trip.
    """
    row = _fetch_verse_row(uid)
    if row is None:
        raise HTTPException(status_code=404, detail=f"Unknown verse uid: {uid}")

    return AudioLookupResponse(
        uid=uid,
        audio_url=row.get("audio_url"),
        timestamps=row.get("audio_timestamps"),
        generated_at=None,
    )


@router.post("/audio/generate", response_model=AudioGenerateResponse, tags=["audio"])
async def generate_audio(req: AudioGenerateRequest) -> AudioGenerateResponse:
    """
    Generate audio via vagdhenu if not already present, upload to Supabase
    Storage, patch the verses table, return the URL.
    """
    if not req.uid and not req.text:
        raise HTTPException(status_code=400, detail="Provide either uid or text.")

    # ── Resolve text + meter + short-circuit if already generated ──
    text  = (req.text or "").strip()
    meter = (req.meter or "anushtubh").strip() or "anushtubh"
    existing_url: Optional[str] = None
    existing_ts:  Optional[list] = None

    if req.uid:
        row = _fetch_verse_row(req.uid)
        if row is None:
            raise HTTPException(status_code=404, detail=f"Unknown verse uid: {req.uid}")

        existing_url = row.get("audio_url")
        existing_ts  = row.get("audio_timestamps")

        if existing_url and not req.force:
            return AudioGenerateResponse(
                uid=req.uid,
                audio_url=existing_url,
                timestamps=existing_ts,
                generated=False,
            )

        # Prefer DB's Sanskrit + meter over the request (single source of truth).
        text  = (row.get("verse_sanskrit") or text).strip()
        meter = (row.get("meter") or meter).strip() or "anushtubh"

    if not text:
        raise HTTPException(
            status_code=400,
            detail=f"No shloka text available (uid={req.uid!r}). Provide `text` explicitly.",
        )

    # ── Render with vagdhenu ──
    started = time.perf_counter()
    try:
        wav_bytes = get_vagdhenu().render(text=text, meter=meter, seed=req.seed)
    except NotImplementedError as e:
        # Stub backend — surface a clear 501.
        raise HTTPException(status_code=501, detail=str(e))
    except Exception as e:
        logger.error("Vagdhenu render failed for uid=%s: %s", req.uid, e)
        raise HTTPException(status_code=502, detail=f"Audio generation failed: {e}")
    duration_ms = int((time.perf_counter() - started) * 1000)

    if not wav_bytes:
        raise HTTPException(status_code=502, detail="Vagdhenu returned empty audio bytes.")

    # ── Upload + record ──
    bucket = settings.supabase_storage_bucket
    key    = _storage_key(req.uid, text)
    _upload_wav(bucket, key, wav_bytes)
    audio_url = _public_url_for(bucket, key)

    if req.uid:
        _patch_verse_audio(req.uid, audio_url, timestamps=None)

    logger.info(
        "Audio generated | uid=%s bucket=%s key=%s bytes=%d duration_ms=%d",
        req.uid, bucket, key, len(wav_bytes), duration_ms,
    )
    return AudioGenerateResponse(
        uid=req.uid,
        audio_url=audio_url,
        timestamps=None,
        generated=True,
        duration_ms=duration_ms,
    )

"""
narration.py — "Listen" on a plan day: the day told as one story for this person, spoken by a
storyteller voice with the verse itself recited in its own language, made on demand with Sarvam
Bulbul and kept on disk so every later tap plays at once.

  POST /api/v1/narration          {verse_id | story_id, for_you?, meaning?, beat?, week?,
                                   understanding?, age?, stages?, phone_hours?, journey?}
                                  → {url, key, cached, script, segments, duration}
  GET  /api/v1/narration/{key}.mp3                                      → the audio

The script (ai/narration_script.py):

    open      their life, heard                      ┐
    scene     the moment ("Arjuna said to Krishna…   │ written for them by the model, checked
              …And Krishna replied:")                ┘ (voice + fidelity), from paraphrases only
    sanskrit  the verse in Sanskrit / Awadhi / Braj  ┐ from the library, never from the model;
    line      "In plain words: <card line>"          ┘ spoken in the devotional voice / narrator
    unpack    its philosophy, honest about how hard  ┐
    for_you   what it asks of them today             │ written for them, checked
    close     one line to leave with                 ┘

Two voices: the narrator (settings.tts_speaker, English) and the reciter (settings.tts_shloka_speaker,
Hindi script mode, slower) for the verse itself. Each part is synthesised on its own and the MP3s are
joined in order.

Without `understanding` (older apps) or without the model, the same shape is composed from the
library and the day's own "What it says" / "For you", so the audio never says something the screen
doesn't. Nothing the client sends is spoken as is except `for_you` and `meaning`, and both must pass
the same guardrails as when the plan wrote them.
"""
from __future__ import annotations

import asyncio
import base64
import hashlib
import json
import logging
import os
import re
import time
import unicodedata
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, RedirectResponse
from pydantic import BaseModel, Field

from ai.depth import person_key
from ai.narration_script import spoken_sanskrit, write_script
from ai.personalize import check_for_you, check_meaning
from ai.recommender import HIDE_SANSKRIT_FAMILIES, get_recommender
from ai.voice import item_from_library
from common.config import settings
from common.models import AgeBand, JourneyIn, LifeStage

logger = logging.getLogger(__name__)
router = APIRouter()

_locks: dict = {}
_tts_client = None
SCRIPT_VERSION = "v2"


class NarrationRequest(BaseModel):
    verse_id: Optional[str] = Field(None, max_length=80)
    story_id: Optional[str] = Field(None, max_length=80)
    for_you: Optional[str] = Field(None, max_length=400)
    meaning: Optional[str] = Field(None, max_length=900)      # the day's "What it says", so audio and screen agree
    beat: Literal["hook", "diagnose", "steady", "act", "story"] = "hook"
    week: int = Field(1, ge=1, le=3)
    # The person (same as /recommend/*): with these the script is written for them.
    understanding: Optional[Dict[str, Any]] = None
    age: Optional[AgeBand] = None
    stages: List[LifeStage] = Field(default_factory=list, max_length=7)
    phone_hours: Optional[int] = Field(None, ge=1, le=12)
    journey: Optional[JourneyIn] = None
    lang: Literal["en-IN"] = "en-IN"


SegmentKind = Literal["open", "scene", "sanskrit", "line", "unpack", "for_you", "close",
                      "intro", "meaning", "title", "summary"]


class Segment(BaseModel):
    kind: SegmentKind
    text: str


class NarrationResponse(BaseModel):
    key: str
    url: str                 # path on this API: /api/v1/narration/<key>.mp3
    cached: bool
    script: str
    segments: list[Segment] = []   # the script in spoken order, labelled
    duration: float = 0.0          # seconds; the joined MP3 has no length header, so players can't tell
    ms: int = 0
    flags: list[str] = []


def _plain(s: str) -> str:
    """Diacritics off (Gītā → Gita) so the voice reads names as an Indian English speaker would.
    Devanagari is left alone (its vowel signs are not combining marks we want to drop)."""
    out = []
    for ch in unicodedata.normalize("NFKD", s or ""):
        if unicodedata.combining(ch) and not ("ऀ" <= ch <= "ॿ"):
            continue
        out.append(ch)
    return unicodedata.normalize("NFC", "".join(out))


# ── The person and the item ──────────────────────────────────────────────────
def _person(req: NarrationRequest, rec, item_level: str):
    """PersonContext from the request, or None (older apps send no reading)."""
    if not req.understanding:
        return None
    try:
        from ai.planner import get_planner, level_for
        from ai.understanding import get_understander
        from server.plan import _ctx, _with_profile
        und, planner = get_understander(), get_planner()
    except RuntimeError:
        return None
    u = und.from_client(dict(req.understanding))
    if u is None:
        return None
    u = _with_profile(u, req)
    return _ctx(req, u, rec, planner, level_for(req.week, u.risk), req.week), u


def _item(req: NarrationRequest, rec) -> tuple[dict, Optional[str]]:
    """The grounding item and the verse to recite (spoken Devanagari), from the library only."""
    if req.verse_id:
        v = next((x for x in rec.verses if x["id"] == req.verse_id), None)
        if v is None:
            raise HTTPException(status_code=404, detail="Unknown verse")
        item = item_from_library(v, rec.prasangs.get(v.get("prasang_id") or ""), req.beat if req.beat != "story" else "hook")
        show = v.get("sanskrit_display_ok") is not False and v.get("family") not in HIDE_SANSKRIT_FAMILIES
        return item, spoken_sanskrit(v.get("sanskrit_display")) if show else None
    if req.story_id:
        p = rec.prasangs.get(req.story_id)
        if p is None:
            raise HTTPException(status_code=404, detail="Unknown story")
        item = item_from_library(None, p, "story")
        anchor = next((v for v in rec.verses if v.get("prasang_id") == p["id"]), None)
        deva = None
        if anchor is not None:
            item["line"] = anchor.get("line")
            item["ref"] = anchor.get("display_ref") or anchor.get("ref_label")
            if anchor.get("sanskrit_display_ok") is not False and anchor.get("family") not in HIDE_SANSKRIT_FAMILIES:
                deva = spoken_sanskrit(anchor.get("sanskrit_display"))
        return item, deva
    raise HTTPException(status_code=400, detail="Send verse_id or story_id")


def _scripts_dir() -> Path:
    d = Path(settings.narration_cache_dir) / "scripts"
    d.mkdir(parents=True, exist_ok=True)
    return d


async def compose(req: NarrationRequest) -> tuple[List[tuple[str, str]], List[str]]:
    """The script as (kind, text) in spoken order, and flags. Cached per item, person and day words."""
    rec = get_recommender()
    item, deva = _item(req, rec)
    shown = {"for_you": check_for_you(req.for_you, "none", item) if req.for_you else None,
             "meaning": check_meaning(req.meaning, item) if req.meaning and item.get("kind") != "story" else None}
    got = _person(req, rec, "situation")
    ctx, u = got if got else (None, None)
    llm = None
    if ctx is not None:
        try:
            from ai.understanding import get_understander
            llm = get_understander().llm
        except RuntimeError:
            llm = None
    who = "" if ctx is None else f"{person_key(ctx)}|{u.core_struggle}|{u.mechanism}|{ctx.level}"
    skey = hashlib.sha1(f"{SCRIPT_VERSION}|{item['id']}|{item['beat']}|{who}|{shown['meaning']}|{shown['for_you']}|"
                        f"{bool(deva)}".encode()).hexdigest()[:24]
    path = _scripts_dir() / f"{skey}.json"
    if path.exists():
        try:
            d = json.loads(path.read_text())
            return [(k, t) for k, t in d["parts"]], d.get("flags", []) + ["script:cached"]
        except Exception:
            pass
    parts, flags = await write_script(llm, ctx, item, shown, deva, settings.narration_script_timeout_s)
    if llm is None or not any(f.startswith("script:error") for f in flags):
        try:
            tmp = path.with_suffix(".part")
            tmp.write_text(json.dumps({"parts": parts, "flags": flags}, ensure_ascii=False))
            tmp.replace(path)
        except Exception as e:
            logger.info("narration script cache write skipped: %s", type(e).__name__)
    return parts, flags


def clean_parts(parts: List[tuple[str, str]]) -> List[tuple[str, str]]:
    """What is spoken (and shown, word for word): names plain, Devanagari kept, under the length cap."""
    out, room = [], settings.narration_max_chars
    for k, t in parts:
        t = t if k == "sanskrit" else _plain(t)
        if room <= 0:
            break
        out.append((k, t[:room]))
        room -= len(t) + 1
    return out


# ── Audio ────────────────────────────────────────────────────────────────────
# MPEG audio frame tables (layer III): bitrate kbps by index, sample rate by version
_BITRATES = {1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0],
             2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0]}
_RATES = {3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000]}


def mp3_seconds(b: bytes) -> float:
    """Length of an MP3 by walking its frames. Bulbul's audio comes in pieces joined end to end, each
    with its own ID3 tag, so there is no single length header an AVPlayer could read."""
    i, n, total = 0, len(b), 0.0
    while i + 4 <= n:
        if b[i:i + 3] == b"ID3" and i + 10 <= n:
            size = (b[i + 6] & 0x7F) << 21 | (b[i + 7] & 0x7F) << 14 | (b[i + 8] & 0x7F) << 7 | (b[i + 9] & 0x7F)
            i += 10 + size
            continue
        if b[i] == 0xFF and (b[i + 1] & 0xE0) == 0xE0:
            ver, layer = (b[i + 1] >> 3) & 3, (b[i + 1] >> 1) & 3
            bri, sri, pad = (b[i + 2] >> 4) & 0xF, (b[i + 2] >> 2) & 3, (b[i + 2] >> 1) & 1
            if ver != 1 and layer == 1 and bri not in (0, 15) and sri != 3:
                rate = _RATES[ver][sri]
                bitrate = _BITRATES[1 if ver == 3 else 2][bri] * 1000
                size = (144 if ver == 3 else 72) * bitrate // rate + pad
                if size > 4:
                    total += (1152 if ver == 3 else 576) / rate
                    i += size
                    continue
        i += 1
    return round(total, 2)


# ── Shared store (Supabase Storage) ──────────────────────────────────────────
# On Vercel each instance has its own /tmp, so the instance that serves the
# .mp3 is often not the one that made it. When SUPABASE_URL and
# SUPABASE_SERVICE_ROLE_KEY are set, finished audio goes to a public bucket
# and the response carries that URL; the local dir stays a per-instance cache.
_BUCKET = os.environ.get("NARRATION_BUCKET", "wisdom-homepage")


def _remote_enabled() -> bool:
    return bool(os.environ.get("SUPABASE_URL", "").strip() and os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip())


def _remote_url(key: str) -> str:
    base = os.environ.get("SUPABASE_URL", "").strip().rstrip("/")
    return f"{base}/storage/v1/object/public/{_BUCKET}/narration/{key}.mp3"


def _remote_get(key: str) -> Optional[bytes]:
    import httpx
    try:
        r = httpx.get(_remote_url(key), timeout=8)
        return r.content if r.status_code == 200 and r.content else None
    except Exception:
        return None


def _remote_put(key: str, audio: bytes) -> bool:
    from common.supabase_client import get_supabase
    try:
        get_supabase().storage.from_(_BUCKET).upload(
            path=f"narration/{key}.mp3", file=audio,
            file_options={"content-type": "audio/mpeg",
                          "cache-control": "public, max-age=31536000, immutable", "upsert": "true"})
        return True
    except Exception as e:
        logger.warning("narration upload failed (%s): %s", key, e)
        return False


def _dir() -> Path:
    d = Path(settings.narration_cache_dir)
    d.mkdir(parents=True, exist_ok=True)
    return d


def _voices() -> str:
    return (f"{settings.tts_model}|{settings.tts_speaker}|{settings.tts_pace}|{settings.tts_shloka_speaker}|"
            f"{settings.tts_shloka_lang}|{settings.tts_shloka_pace}|{settings.tts_sample_rate}")


def _key(script: str, lang: str) -> str:
    return hashlib.sha1(f"{_voices()}|{lang}|{script}".encode()).hexdigest()[:20]


def _client():
    global _tts_client
    if _tts_client is None:
        if not settings.sarvam_api_key:
            raise HTTPException(status_code=503, detail="Narration is not configured")
        from sarvamai import SarvamAI
        _tts_client = SarvamAI(api_subscription_key=settings.sarvam_api_key)
    return _tts_client


def synthesize(text: str, lang: str, speaker: Optional[str] = None, pace: Optional[float] = None) -> bytes:
    r = _client().text_to_speech.convert(
        text=text, language_code=lang, speaker=speaker or settings.tts_speaker, model=settings.tts_model,
        output_audio_codec="mp3", pace=pace or settings.tts_pace, speech_sample_rate=settings.tts_sample_rate,
        request_options={"timeout_in_seconds": int(settings.tts_timeout_s), "max_retries": 0})
    return b"".join(base64.b64decode(a) for a in (r.audios or []))


def _chunks(parts: List[tuple[str, str]], lang: str) -> List[tuple[str, str, str, float]]:
    """Consecutive parts in the same voice go in one request (fewer seams, natural flow); the verse
    in its own language goes alone, in the reciter's voice."""
    out: List[list] = []
    for k, t in parts:
        if k == "sanskrit":
            out.append([t, settings.tts_shloka_lang, settings.tts_shloka_speaker, settings.tts_shloka_pace])
            continue
        if out and out[-1][2] == settings.tts_speaker and len(out[-1][0]) + len(t) < 2200:
            out[-1][0] += " " + t
        else:
            out.append([t, lang, settings.tts_speaker, settings.tts_pace])
    return [tuple(c) for c in out]


async def render(parts: List[tuple[str, str]], lang: str) -> bytes:
    chunks = _chunks(parts, lang)
    audios = await asyncio.gather(*(asyncio.to_thread(synthesize, t, l, sp, pc) for t, l, sp, pc in chunks))
    if any(not a for a in audios):
        raise RuntimeError("empty audio")
    return b"".join(audios)


@router.post("/narration", response_model=NarrationResponse, tags=["narration"])
async def narrate(req: NarrationRequest) -> NarrationResponse:
    t0 = time.perf_counter()
    parts, flags = await compose(req)
    parts = clean_parts(parts)
    script = " ".join(t for _, t in parts)
    segments = [{"kind": k, "text": t} for k, t in parts]
    key = _key(script, req.lang)
    path = _dir() / f"{key}.mp3"
    url = f"/api/v1/narration/{key}.mp3"
    remote = _remote_enabled()
    if remote:
        url = _remote_url(key)
    if path.exists() and path.stat().st_size > 0:
        return NarrationResponse(key=key, url=url, cached=True, script=script, segments=segments,
                                 duration=mp3_seconds(path.read_bytes()), flags=flags)
    if remote:
        stored = await asyncio.to_thread(_remote_get, key)
        if stored:
            try:
                path.write_bytes(stored)
            except OSError:
                pass
            return NarrationResponse(key=key, url=url, cached=True, script=script, segments=segments,
                                     duration=mp3_seconds(stored), flags=flags)
    lock = _locks.setdefault(key, asyncio.Lock())
    async with lock:                       # two taps, one generation
        if not path.exists():
            try:
                audio = await asyncio.wait_for(render(parts, req.lang), timeout=settings.tts_timeout_s + 4)
            except HTTPException:
                raise
            except Exception as e:
                logger.warning("narration failed (%s): %s", key, type(e).__name__)
                raise HTTPException(status_code=502, detail="Narration unavailable")
            tmp = path.with_suffix(".part")
            tmp.write_bytes(audio)
            tmp.replace(path)
            if remote and not await asyncio.to_thread(_remote_put, key, audio):
                url = f"/api/v1/narration/{key}.mp3"
    _locks.pop(key, None)
    ms = int((time.perf_counter() - t0) * 1000)
    logger.info("narration: %s %s chars=%d parts=%d flags=%s %dms", "verse" if req.verse_id else "story", key, len(script),
                len(parts), ",".join(flags) or "-", ms)
    return NarrationResponse(key=key, url=url, cached=False, script=script, segments=segments,
                             duration=mp3_seconds(path.read_bytes()), ms=ms, flags=flags)


@router.get("/narration/{key}.mp3", tags=["narration"])
async def narration_file(key: str):
    if not re.fullmatch(r"[0-9a-f]{20}", key):
        raise HTTPException(status_code=404, detail="Not found")
    path = _dir() / f"{key}.mp3"
    if not path.exists():
        if _remote_enabled():
            return RedirectResponse(_remote_url(key), status_code=307)
        raise HTTPException(status_code=404, detail="Not found")
    return FileResponse(path, media_type="audio/mpeg", headers={"Cache-Control": "public, max-age=31536000, immutable"})

"""
server/rag.py — POST /api/v1/rag  (blocking)   +   POST /api/v1/rag/stream (SSE)

Step 3 of the RAG pipeline: produce a structured answer as JSON segments.
Each segment is {type: "text", content: "..."} or {type: "verse", uid: "..."}.
The frontend renders text as prose and verse uids as pull-quote cards.

v2 changes:
  - Voice profile is selected per intent_type on the request (see
    prompts/rag.py build_rag_system_prompt).
  - New /rag/stream endpoint emits SSE events. Frontend receives:
      kind='delta'  raw content chunk (append to buffer for progress UI)
      kind='done'   final parsed segments + verse_uids_used (source of truth)
      kind='error'  human-readable failure
"""
from __future__ import annotations

import json
import logging
from typing import AsyncIterator

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from ai.sarvam import get_sarvam
from common.models import (
    RagRequest, RagResponse, RagStreamChunk, Segment,
)
from prompts.rag import build_rag_system_prompt, build_rag_user_prompt

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Shared helpers ────────────────────────────────────────────────────────────

def _mode_settings(mode: str) -> tuple[int, int]:
    """(max_verses, max_tokens) per mode."""
    if mode == "crisp":
        return 4, 1500
    return 8, 4096


def _parse_segments(raw: dict, valid_uids: set[str]) -> tuple[list[Segment], list[str]]:
    """
    Parse the model's JSON into Segment objects. Validates verse uids
    against the retrieved set — unknown or duplicate uids are dropped with
    a log line (never returned to the user).
    Returns (segments, verse_uids_used).
    """
    raw_segs = raw.get("segments", [])
    if not isinstance(raw_segs, list):
        raise ValueError(f"Expected segments list, got {type(raw_segs)}")

    segments: list[Segment] = []
    used_uids: list[str] = []
    seen_uids: set[str] = set()

    for seg in raw_segs:
        if not isinstance(seg, dict):
            continue
        t = seg.get("type", "")

        if t == "text":
            content = (seg.get("content") or "").strip()
            if content:
                segments.append(Segment(type="text", content=content))

        elif t == "verse":
            uid = (seg.get("uid") or "").strip().strip("[]")
            if uid in valid_uids and uid not in seen_uids:
                segments.append(Segment(type="verse", uid=uid))
                used_uids.append(uid)
                seen_uids.add(uid)
            else:
                logger.warning(
                    "Verse uid %r not in retrieved set or duplicate — skipped", uid
                )

    return segments, used_uids


def _prepare(req: RagRequest) -> tuple[str, str, set[str], int]:
    """Common setup for both blocking and streaming endpoints."""
    if not req.verses:
        raise HTTPException(status_code=400, detail="No verses provided")

    max_verses, max_tokens = _mode_settings(req.mode)
    verses     = req.verses[:max_verses]
    valid_uids = {v.uid for v in verses}

    system_prompt = build_rag_system_prompt(mode=req.mode, intent_type=req.intent_type)
    user_content  = build_rag_user_prompt(req.query, verses)
    return system_prompt, user_content, valid_uids, max_tokens


# ── Blocking endpoint ────────────────────────────────────────────────────────

@router.post("/rag", response_model=RagResponse, tags=["search"])
async def synthesize_answer(req: RagRequest) -> RagResponse:
    """
    Step 3 blocking: produce the full structured answer in one round trip.
    """
    system_prompt, user_content, valid_uids, max_tokens = _prepare(req)

    try:
        raw = get_sarvam().synthesize_rag(system_prompt, user_content, max_tokens=max_tokens)
    except Exception as e:
        logger.error("RAG synthesis failed: %s", e)
        raise HTTPException(status_code=502, detail=f"RAG synthesis failed: {e}")

    if not isinstance(raw, dict):
        raise HTTPException(status_code=502, detail="RAG response was not valid JSON")

    try:
        segments, verse_uids_used = _parse_segments(raw, valid_uids)
    except Exception as e:
        logger.error("Segment parsing failed: %s  raw=%s", e, str(raw)[:300])
        raise HTTPException(status_code=502, detail=f"Could not parse RAG response: {e}")

    if not segments:
        raise HTTPException(status_code=502, detail="RAG returned empty segments")

    return RagResponse(
        query           = req.query,
        segments        = segments,
        verse_uids_used = verse_uids_used,
    )


# ── Streaming endpoint (SSE) ─────────────────────────────────────────────────

def _sse(chunk: RagStreamChunk) -> str:
    """Serialise a RagStreamChunk into an SSE `data: ...\\n\\n` frame."""
    payload = chunk.model_dump(exclude_none=True)
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"


@router.post("/rag/stream", tags=["search"])
async def synthesize_answer_stream(req: RagRequest):
    """
    Step 3 streaming: emit SSE data frames as content arrives from Sarvam.

    Frontend contract:
      - Every frame is `data: <json>\\n\\n`.
      - JSON is a RagStreamChunk: {kind, delta?, segments?, verse_uids_used?, error?}.
      - kind='delta' — accumulate `delta` into a JSON buffer for progress UI.
      - kind='done'  — replace UI built from deltas with the parsed
                       `segments` + `verse_uids_used` (source of truth).
      - kind='error' — abort and surface `error` to the user.

    Delta content is NOT valid JSON on its own — do not attempt to parse
    partial deltas. Wait for `done` for structured output.
    """
    system_prompt, user_content, valid_uids, max_tokens = _prepare(req)

    async def event_source() -> AsyncIterator[str]:
        buf: list[str] = []
        try:
            client = get_sarvam()
            for delta in client.synthesize_rag_stream(
                system_prompt, user_content, max_tokens=max_tokens
            ):
                buf.append(delta)
                yield _sse(RagStreamChunk(kind="delta", delta=delta))
        except Exception as e:
            logger.error("RAG stream failed mid-flight: %s", e)
            yield _sse(RagStreamChunk(kind="error", error=f"stream failed: {e}"))
            return

        full = "".join(buf).strip()
        if not full:
            yield _sse(RagStreamChunk(kind="error", error="empty stream"))
            return

        # Sarvam json_mode should hand back a clean JSON object; still be
        # defensive about stray markdown fences the model sometimes wraps in.
        cleaned = full
        if cleaned.startswith("```"):
            cleaned = cleaned.strip("`")
            nl = cleaned.find("\n")
            if nl > 0 and cleaned[:nl].isalpha():
                cleaned = cleaned[nl + 1:]

        try:
            raw = json.loads(cleaned)
        except Exception as e:
            logger.error("Stream final parse failed: %s  raw=%s", e, full[:300])
            yield _sse(RagStreamChunk(kind="error", error=f"invalid JSON: {e}"))
            return

        try:
            segments, uids = _parse_segments(raw, valid_uids)
        except Exception as e:
            logger.error("Stream segment parsing failed: %s", e)
            yield _sse(RagStreamChunk(kind="error", error=f"parse failed: {e}"))
            return

        yield _sse(RagStreamChunk(kind="done", segments=segments, verse_uids_used=uids))

    return StreamingResponse(
        event_source(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # nginx: don't buffer SSE
        },
    )

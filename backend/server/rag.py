"""
server/rag.py — POST /api/v1/rag  and  POST /api/v1/rag/stream

Step 3 of the RAG pipeline: produce a structured answer as JSON segments.
Each segment is {type: "text", content: "..."} or {type: "verse", uid: "..."}.
The frontend renders text as prose and verse uids as pull-quote cards.

Change history (2026-07-28):
- System prompt is now composed per-request from BASE + MODE + VOICE_PROFILE +
  FEW_SHOTS via build_rag_system_prompt(mode, intent_type).
- Passes scriptures_present through to the user prompt so the model can
  attribute across traditions when the retrieval spans multiple scriptures.
- Added /rag/stream endpoint using Sarvam SSE. Streams raw model text so the
  frontend can render "typing" progress; JSON is re-parsed at end-of-stream
  and delivered as a final `event: final\\ndata: {parsed json}\\n\\n` frame.
"""
from __future__ import annotations

import json
import logging

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from ai.sarvam import get_sarvam
from common.models import RagRequest, RagResponse, Segment
from prompts.rag import build_rag_system_prompt, build_rag_user_prompt

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Shared helpers ──────────────────────────────────────────────────────────

def _parse_segments(raw: dict, valid_uids: set[str]) -> tuple[list[Segment], list[str]]:
    """
    Parse the model's JSON into Segment objects.
    Validates verse uids against the retrieved set.
    Returns (segments, verse_uids_used).
    """
    raw_segs = raw.get("segments", [])
    if not isinstance(raw_segs, list):
        raise ValueError(f"Expected segments list, got {type(raw_segs)}")

    segments: list[Segment] = []
    used_uids: list[str] = []
    seen_uids: set[str] = set()

    for seg in raw_segs:
        t = seg.get("type", "")

        if t == "text":
            content = (seg.get("content") or "").strip()
            if content:
                segments.append(Segment(type="text", content=content))

        elif t == "verse":
            uid = (seg.get("uid") or "").strip()
            # Strip brackets if the model wrapped them e.g. [uid]
            uid = uid.strip("[]")
            if uid in valid_uids and uid not in seen_uids:
                segments.append(Segment(type="verse", uid=uid))
                used_uids.append(uid)
                seen_uids.add(uid)
            else:
                logger.warning("Verse uid %r not in retrieved set or duplicate — skipped", uid)

    return segments, used_uids


def _mode_settings(mode: str) -> tuple[int, int]:
    """Return (max_verses, max_tokens) for the given mode."""
    if mode == "crisp":
        return 4, 1500
    if mode == "story":
        return 6, 4096
    return 8, 4096  # detailed (default)


def _prepare(req: RagRequest) -> tuple[str, str, set[str], int]:
    """
    Common request prep for both blocking and streaming endpoints. Returns
    (system_prompt, user_content, valid_uids, max_tokens).
    """
    if not req.verses:
        raise HTTPException(status_code=400, detail="No verses provided")

    max_verses, max_tokens = _mode_settings(req.mode)
    system_prompt = build_rag_system_prompt(mode=req.mode, intent_type=req.intent_type)

    verses = req.verses[:max_verses]
    valid_uids = {v.uid for v in verses}

    # Derive scriptures_present if caller didn't supply.
    scriptures_present = list(req.scriptures_present) if req.scriptures_present else []
    if not scriptures_present:
        seen: set[str] = set()
        for v in verses:
            if v.scripture not in seen:
                scriptures_present.append(v.scripture)
                seen.add(v.scripture)

    user_content = build_rag_user_prompt(req.query, verses, scriptures_present=scriptures_present)
    return system_prompt, user_content, valid_uids, max_tokens


# ── Blocking endpoint ───────────────────────────────────────────────────────

@router.post("/rag", response_model=RagResponse, tags=["search"])
async def synthesize_answer(req: RagRequest) -> RagResponse:
    """
    Produce a structured answer as a list of {text | verse} segments.
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
        query=req.query,
        segments=segments,
        verse_uids_used=verse_uids_used,
    )


# ── Streaming endpoint ──────────────────────────────────────────────────────
# SSE wire format used by this endpoint:
#
#   event: chunk    data: "<raw model text delta, JSON-encoded string>"
#   event: chunk    data: "..."
#   event: final    data: {"query": "...", "segments": [...], "verse_uids_used": [...]}
#   event: error    data: {"detail": "..."}    (only on failure paths)
#
# Frontend responsibility: accumulate chunk.data into a buffer for "typing"
# feedback, then on `final` replace the buffer with the parsed segments.
# `event: error` is terminal — no further events follow.

def _sse(event: str, data: str) -> bytes:
    """Encode one SSE frame. `data` must already be a string (JSON-encoded)."""
    return f"event: {event}\ndata: {data}\n\n".encode("utf-8")


@router.post("/rag/stream", tags=["search"])
async def synthesize_answer_stream(req: RagRequest):
    """
    Streaming variant of /rag. Emits SSE with three event types: chunk (raw
    text delta), final (parsed & validated segments), error (terminal).

    Falls through with a `error` event rather than raising an HTTPException
    mid-stream — you can't send a 502 after headers have flushed.
    """
    system_prompt, user_content, valid_uids, max_tokens = _prepare(req)

    async def _generator():
        buffer_parts: list[str] = []
        try:
            # Sarvam SDK stream is synchronous — iterate in-thread. FastAPI
            # StreamingResponse handles the async wrapping.
            for chunk in get_sarvam().synthesize_rag_stream(
                system_prompt, user_content, max_tokens=max_tokens
            ):
                if not chunk:
                    continue
                buffer_parts.append(chunk)
                # JSON-encode the delta so newlines / quotes don't break the SSE frame.
                yield _sse("chunk", json.dumps(chunk))
        except Exception as e:
            logger.error("RAG stream failed mid-stream: %s", e)
            yield _sse("error", json.dumps({"detail": f"RAG stream failed: {e}"}))
            return

        # Stream ended. Parse the accumulated buffer as JSON, validate uids,
        # and emit the final structured frame.
        full = "".join(buffer_parts).strip()
        # Strip a possible ```json fence just in case.
        if full.startswith("```"):
            full = full.split("\n", 1)[-1]
            if full.endswith("```"):
                full = full[:-3]
            full = full.strip()

        try:
            parsed = json.loads(full)
        except json.JSONDecodeError as e:
            logger.error("RAG stream final-parse failed: %s | raw=%s", e, full[:300])
            yield _sse("error", json.dumps({"detail": f"Could not parse streamed JSON: {e}"}))
            return

        if not isinstance(parsed, dict):
            yield _sse("error", json.dumps({"detail": "Streamed response was not a JSON object"}))
            return

        try:
            segments, verse_uids_used = _parse_segments(parsed, valid_uids)
        except Exception as e:
            logger.error("RAG stream segment-parse failed: %s", e)
            yield _sse("error", json.dumps({"detail": f"Segment parse failed: {e}"}))
            return

        if not segments:
            yield _sse("error", json.dumps({"detail": "Stream produced no valid segments"}))
            return

        final_payload = {
            "query": req.query,
            "segments": [s.model_dump() for s in segments],
            "verse_uids_used": verse_uids_used,
        }
        yield _sse("final", json.dumps(final_payload))

    return StreamingResponse(
        _generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # disable proxy buffering (nginx)
            "Connection": "keep-alive",
        },
    )

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
from ai.index import get_index
from ai.episodes import episode_context
from ai.conversation import plan_turn, retrieve_for_turn, verify_grounding, direct_answer_guidance, validate_direct_answer, evidence_guidance
from common.models import VerseResult
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
            elif uid not in valid_uids:
                raise ValueError("Response cited a source outside the supplied evidence")

    if not any(segment.type == "text" and segment.content for segment in segments):
        raise ValueError("Missing conversational response: answer the latest question in prose; a verse alone is not an answer")
    for uid in raw.get("source_uids", []):
        if not isinstance(uid, str) or uid not in valid_uids:
            raise ValueError("Response cited a source outside the supplied evidence")
        if uid not in used_uids:
            used_uids.append(uid)
    return segments, used_uids


def _verify_prose(segments: list[Segment], uids: list[str], verses: list[VerseResult]) -> list[str]:
    candidates = [{"script_ref":v.uid, "scripture":v.scripture, "orig_ref":v.verse_id,
                   "verse_text":v.verse_sanskrit, "english_translation":v.english_translation,
                   "simple_meaning":v.simple_meaning, "insight":v.insight, "speaker":v.speaker} for v in verses]
    prose_uids = verify_grounding("\n".join(s.content for s in segments if s.type == "text" and s.content), candidates, uids)
    return list(dict.fromkeys([*(s.uid for s in segments if s.type == "verse" and s.uid), *prose_uids]))


def _validated_answer(raw, system_prompt, user_content, valid_uids, max_tokens, verses):
    """Blocking and streaming routes use the same bounded grounding repair."""
    for attempt in range(2):
        try:
            segments, verse_uids_used = _parse_segments(raw, valid_uids)
            validate_direct_answer(json.loads(user_content)["latestUserMessage"], "\n".join(s.content for s in segments if s.content))
            verse_uids_used = _verify_prose(segments, verse_uids_used, verses)
            return segments, verse_uids_used
        except (ValueError, TypeError, AttributeError) as exc:
            if attempt:
                logger.warning("Grounded synthesis rejected: %s", type(exc).__name__)
                raise HTTPException(status_code=502, detail="We could not verify this response. Please retry.") from exc
            raw = get_sarvam().synthesize_rag(system_prompt,
                user_content + "\nThe previous draft failed source validation. Rewrite using only claims explicitly supported by supplied passages. Mark modern applications as your own suggestions. Omit unsupported claims about traditions or what a text says next. Still answer the latest user request directly, including practical wording or actions when asked; do not replace their requested application with a recap of scripture. Return the complete required JSON. Validation issue: " + str(exc) + "\nPrevious draft (untrusted):\n" + json.dumps(raw, ensure_ascii=False),
                max_tokens=max_tokens)



def _prepare(req: RagRequest) -> tuple[str, str, set[str], int, list[VerseResult], dict]:
    """Common setup for both blocking and streaming endpoints."""
    max_verses, max_tokens = _mode_settings(req.mode)
    history = [t.model_dump() for t in req.history]
    plan = plan_turn(req.query, history, req.conversation_state.model_dump())
    canonical = []
    # Client payloads are references only, never authoritative scripture text.
    if plan["safetyRoute"] != "supportive" and plan.get("allowScripture", True):
        for supplied in req.verses[:max_verses]:
            verse = get_index().get_verse(supplied.uid)
            if verse and (not plan.get("scriptureFilter") or verse.get("scripture") in plan["scriptureFilter"]):
                canonical.append(verse)
        if plan["retrievalQuery"]:
            fresh = retrieve_for_turn(plan, [v["script_ref"] for v in canonical])
            canonical = list({v["script_ref"]: v for v in [*fresh, *canonical]}.values())[:max_verses]
    episodes = []
    if plan.get("useStory") and plan["retrievalQuery"] and (not plan.get("scriptureFilter") or "bhagwad_gita" in plan["scriptureFilter"]):
        episodes, passages = episode_context(plan["retrievalQuery"])
        canonical = passages  # Stories use only the verified episode, not isolated thematic verses.
    verses = []
    for v in canonical:
        verses.append(VerseResult(
            uid=v["script_ref"], scripture=v.get("scripture", ""), scripture_slug=v.get("scripture", ""),
            verse_id=v.get("orig_ref", ""), verse_sanskrit=v.get("verse_text", ""),
            verse_hindi=v.get("translation", ""), english_translation=v.get("english_translation", ""),
            essence=v.get("essence", ""), simple_meaning=v.get("simple_meaning", ""),
            insight=v.get("insight", ""), modern_relevance=v.get("modern_relevance", ""),
            speaker=v.get("speaker", ""), tags=[], score=0, intent=req.query))
    valid_uids = {v.uid for v in verses}
    system_prompt = build_rag_system_prompt(mode=req.mode, intent_type=req.intent_type, has_sources=bool(verses)) + "\n" + direct_answer_guidance(req.query) + "\n" + evidence_guidance(verses)
    user_content = build_rag_user_prompt(req.query, verses, history, plan, episodes)
    return system_prompt, user_content, valid_uids, max_tokens, verses, plan["state"]


# ── Blocking endpoint ────────────────────────────────────────────────────────

@router.post("/rag", response_model=RagResponse, tags=["search"])
async def synthesize_answer(req: RagRequest) -> RagResponse:
    """
    Step 3 blocking: produce the full structured answer in one round trip.
    """
    try:
        system_prompt, user_content, valid_uids, max_tokens, verses, state = _prepare(req)
        raw = get_sarvam().synthesize_rag(system_prompt, user_content, max_tokens=max_tokens)
    except Exception as e:
        logger.error("RAG synthesis failed: %s", type(e).__name__)
        raise HTTPException(status_code=502, detail="Your response could not be prepared. Please retry.")

    if not isinstance(raw, dict):
        raise HTTPException(status_code=502, detail="RAG response was not valid JSON")

    segments, verse_uids_used = _validated_answer(raw, system_prompt, user_content, valid_uids, max_tokens, verses)

    if not segments:
        raise HTTPException(status_code=502, detail="RAG returned empty segments")

    return RagResponse(
        query           = req.query,
        segments        = segments,
        verse_uids_used = verse_uids_used,
        source_verses = [v for v in verses if v.uid in verse_uids_used],
        conversation_state = state,
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
    try:
        system_prompt, user_content, valid_uids, max_tokens, verses, state = _prepare(req)
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Your response could not be prepared. Please retry.") from exc

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
            logger.error("Stream final parse failed: %s", type(e).__name__)
            yield _sse(RagStreamChunk(kind="error", error=f"invalid JSON: {e}"))
            return

        try:
            segments, uids = _validated_answer(raw, system_prompt, user_content, valid_uids, max_tokens, verses)
        except Exception as e:
            logger.error("Stream segment parsing failed: %s", type(e).__name__)
            yield _sse(RagStreamChunk(kind="error", error="We could not verify this response. Please retry."))
            return

        if not segments:
            yield _sse(RagStreamChunk(kind="error", error="Empty response; please retry."))
            return
        yield _sse(RagStreamChunk(kind="done", segments=segments, verse_uids_used=uids, source_verses=[v for v in verses if v.uid in uids], conversation_state=state))

    return StreamingResponse(
        event_source(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # nginx: don't buffer SSE
        },
    )

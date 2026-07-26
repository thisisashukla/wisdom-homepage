"""
server/rag.py — POST /api/v1/rag

Step 3 of the RAG pipeline: produce a structured answer as JSON segments.
Each segment is {type: "text", content: "..."} or {type: "verse", uid: "..."}.
The frontend renders text as prose and verse uids as pull-quote cards.
"""
from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException

from ai.sarvam import get_sarvam
from common.models import RagRequest, RagResponse, Segment
from prompts.rag import RAG_SYSTEM_PROMPT, RAG_SYSTEM_PROMPT_CRISP, build_rag_user_prompt

logger = logging.getLogger(__name__)
router = APIRouter()


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


@router.post("/rag", response_model=RagResponse, tags=["search"])
async def synthesize_answer(req: RagRequest) -> RagResponse:
    """
    Step 3 of the RAG pipeline: produce a structured answer.
    Returns a list of segments (text | verse) so the frontend can render
    pull-quotes exactly where the teacher intended them.
    """
    if not req.verses:
        raise HTTPException(status_code=400, detail="No verses provided")

    # Mode-specific settings
    if req.mode == "crisp":
        system_prompt = RAG_SYSTEM_PROMPT_CRISP
        max_verses   = 4      # fewer choices → less temptation to pile in verses
        max_tokens   = 1500
    else:
        system_prompt = RAG_SYSTEM_PROMPT
        max_verses   = 8
        max_tokens   = 4096

    verses = req.verses[:max_verses]
    valid_uids = {v.uid for v in verses}
    user_content = build_rag_user_prompt(req.query, verses)

    try:
        raw = get_sarvam().synthesize_rag(system_prompt, user_content, max_tokens=max_tokens)
    except Exception as e:
        logger.error("RAG synthesis failed: %s", e)
        raise HTTPException(status_code=502, detail=f"RAG synthesis failed: {e}")

    # raw is already parsed JSON (dict) because synthesize_rag now returns dict
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

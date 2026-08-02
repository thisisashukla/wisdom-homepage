"""
server/intent.py — POST /api/v1/intent

Step 1 of the RAG pipeline.

Validates the query (rejects off-topic / injection), extracts 1–3 intents,
tags each with an intent_type (routes voice profile), optionally emits a
scripture_hint (soft signal), and — when history is provided — rewrites
follow-up queries into standalone queries. It also parses obvious
chapter.verse citations via the regex fast-path so downstream retrieval
can short-circuit to a direct uid lookup.

Everything above happens in ONE LLM call plus one cheap regex pass.
"""
from __future__ import annotations

import logging
from typing import Set

from fastapi import APIRouter

from ai.sarvam import get_sarvam
from ai.verse_ref import parse as parse_verse_refs
from common.models import Intent, IntentRequest, IntentResponse

from prompts.intent import INTENT_SYSTEM_PROMPT, build_intent_user_prompt

logger = logging.getLogger(__name__)
router = APIRouter()


# Whitelist of scripture slugs the model may emit as a hint. Anything else
# is silently dropped — protects downstream code from typos / hallucinations.
_KNOWN_SCRIPTURES: Set[str] = {
    "bhagwad_gita", "ashtavakra_gita", "ram_gita", "hans_gita",
    "vishnu_gita", "shakti_gita", "shambhu_gita", "surya_gita", "dheesh_gita",
    "ramacharitamanas",
    "isha_upanishad", "kath_upanishad", "mundaka_upanishad", "mandukya_upanishad",
    "chhandogya_upanishad", "brihadaranyak_upanishad", "prashn_upanishad",
    "taittiriya_upanishad", "shwetashwetar_upanishad", "aitareya_upanishad",
    "kaivalya_upanishad", "kena_upanishad",
    # Extend as needed — the full list is in the corpus but we don't need it
    # here; unknown hints just get dropped and search proceeds unbiased.
}

_VALID_INTENT_TYPES: Set[str] = {
    "grief", "philosophical", "practical",
    "devotional", "referential", "narrative", "other",
}


@router.post("/intent", response_model=IntentResponse, tags=["search"])
async def extract_intents(req: IntentRequest) -> IntentResponse:
    """
    Step 1 of the RAG pipeline: validate, extract intents, parse verse refs,
    optionally rewrite follow-up queries.

    Returns valid=False (with a reason) for off-topic queries and injection
    attempts — the frontend should stop the pipeline.

    Returns valid=True with 1–3 focused intents on success. If the LLM call
    fails, falls back to a single-intent direct search over the raw query.
    """
    # Verse-ref fast-path — cheap regex, runs regardless of LLM outcome
    verse_refs = parse_verse_refs(req.query)

    try:
        history = [t.model_dump() for t in req.history] if req.history else None
        result = get_sarvam().extract_intents(
            INTENT_SYSTEM_PROMPT,
            build_intent_user_prompt(req.query, history=history),
        )

        # Guardrail: model flagged query as invalid
        if result.get("valid") is False:
            reason = result.get("reason", "This question is outside the scope of scripture search.")
            logger.info("Query rejected: %r — %s", req.query[:80], reason)
            return IntentResponse(query=req.query, valid=False, reason=reason, intents=[])

        raw_intents      = result.get("intents", []) or []
        standalone_query = (result.get("standalone_query") or "").strip() or None
        scripture_hint   = result.get("scripture_hint") or []

    except Exception as e:
        logger.warning("Intent extraction failed (%s) — falling back to direct search", e)
        raw_intents      = []
        standalone_query = None
        scripture_hint   = []

    # Fallback: use the raw query as a single intent
    if not raw_intents:
        raw_intents = [{
            "intent":      standalone_query or req.query,
            "description": "direct search",
            "intent_type": "other",
        }]

    # Sanitize + coerce intent objects. Cap at 3 (prompt says 1–2 default,
    # 3 for compound queries only — enforce the ceiling here).
    intents: list[Intent] = []
    for raw in raw_intents[:3]:
        itype = raw.get("intent_type", "other")
        if itype not in _VALID_INTENT_TYPES:
            itype = "other"
        intents.append(Intent(
            intent      = raw.get("intent", req.query),
            description = raw.get("description", ""),
            intent_type = itype,
        ))

    # Sanitize scripture_hint against the whitelist. Silently drop the rest.
    hint = [s for s in (scripture_hint or []) if s in _KNOWN_SCRIPTURES][:2]

    return IntentResponse(
        query            = req.query,
        valid            = True,
        intents          = intents,
        standalone_query = standalone_query,
        scripture_hint   = hint,
        verse_refs       = verse_refs,
    )

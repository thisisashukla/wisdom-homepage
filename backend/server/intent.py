"""
server/intent.py — POST /intent

Step 1 of the RAG pipeline.
Validates the query (rejects off-topic / injection attempts) and extracts intents.
Both happen in a single LLM call — zero extra latency for the guardrail.
"""
from __future__ import annotations

import logging

from fastapi import APIRouter

from ai.sarvam import get_sarvam
from common.models import IntentRequest, IntentResponse, Intent
from prompts.intent import INTENT_SYSTEM_PROMPT, build_intent_user_prompt

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/intent", response_model=IntentResponse, tags=["search"])
async def extract_intents(req: IntentRequest) -> IntentResponse:
    """
    Step 1 of the RAG pipeline: validate the query then extract intents.

    Returns valid=False (with a reason) for off-topic queries and injection
    attempts — the frontend should stop the pipeline and show the reason.

    Returns valid=True with 1–4 focused intents on success.
    Falls back to a direct search if the LLM call fails.
    """
    try:
        result = get_sarvam().extract_intents(
            INTENT_SYSTEM_PROMPT,
            build_intent_user_prompt(req.query),
        )

        # Guardrail: model flagged query as invalid
        if result.get("valid") is False:
            reason = result.get("reason", "This question is outside the scope of scripture search.")
            logger.info("Query rejected by guardrail: %r — %s", req.query[:80], reason)
            return IntentResponse(query=req.query, valid=False, reason=reason, intents=[])

        raw_intents = result.get("intents", [])

    except Exception as e:
        logger.warning("Intent extraction failed (%s) — falling back to direct search", e)
        raw_intents = []

    # Fallback: treat full query as a single intent
    if not raw_intents:
        raw_intents = [{"intent": req.query, "description": "direct search"}]

    intents = [
        Intent(
            intent=i.get("intent", req.query),
            description=i.get("description", ""),
        )
        for i in raw_intents[:4]
    ]

    return IntentResponse(query=req.query, valid=True, intents=intents)

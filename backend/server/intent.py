"""
server/intent.py — POST /intent

Step 1 of the RAG pipeline. Single LLM call handles:
  - guardrail (rejects off-topic / injection)
  - follow-up rewriting (if req.context provided)
  - intent extraction with type + likely_scriptures (soft) + scripture_lock (hard)

Server-side hardening (2026-07-28):
  - Alias normalisation: whatever the model emits ("gita", "bhagavad_gita",
    "tulsidas", …) gets rewritten to the canonical slug used by the corpus
    ("bhagwad_gita", "ramcharitmanas", …) BEFORE the allow-list check. The
    LLM is not reliable about slugs; this map is authoritative.
  - Auto-inject scripture_lock=["bhagwad_gita"] when the raw query mentions
    "gita" (or "bg") without a qualifying prefix and the model failed to
    populate scripture_lock. Belt-and-suspenders defense — the prompt tells
    the model to do this, and if it doesn't, we do it here.
"""
from __future__ import annotations

import logging
import re
from typing import Any

from fastapi import APIRouter

from ai.sarvam import get_sarvam
from common.models import IntentRequest, IntentResponse, Intent, IntentType
from prompts.intent import INTENT_SYSTEM_PROMPT, build_intent_user_prompt

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Valid intent_type values (defensive coercion) ────────────────────────────

_VALID_TYPES: set[str] = {
    "grief", "practical", "philosophical", "devotional",
    "intellectual", "referential", "narrative",
}


# ── Scripture slug allow-list (must match the corpus) ────────────────────────
# Anything not in this set is dropped from scripture_lock — retrieval against
# an unknown scripture would return zero rows and silently break the query.

_KNOWN_SCRIPTURES: set[str] = {
    "bhagwad_gita",
    "katha_upanishad", "isha_upanishad", "mundaka_upanishad",
    "chandogya_upanishad", "brihadaranyaka_upanishad", "mandukya_upanishad",
    "taittiriya_upanishad", "kena_upanishad", "prashna_upanishad",
    "aitareya_upanishad",
    "yoga_sutras",
    "ramayana", "ramcharitmanas",
    "mahabharata",
    "srimad_bhagavatam", "vishnu_purana",
    "ashtavakra_gita",
    "other",
}


# ── Alias → canonical slug ──────────────────────────────────────────────────
# The LLM emits sloppy slugs constantly. This map normalises them before the
# allow-list check so we don't lose scripture_lock to a formatting mistake.
# "gita" alone is the biggest one: without this the model's "gita" gets
# dropped as unknown and scripture_lock ends up empty, causing retrieval
# to return Dheesh Gita / Vishnu Gita by cosine.

_SCRIPTURE_ALIASES: dict[str, str] = {
    # Bhagavad Gita — every reasonable variant of the name
    "gita": "bhagwad_gita",
    "the_gita": "bhagwad_gita",
    "bg": "bhagwad_gita",
    "bhagavad_gita": "bhagwad_gita",
    "bhagavadgita": "bhagwad_gita",
    "bhagwadgita": "bhagwad_gita",
    "bhagwat_gita": "bhagwad_gita",
    "bhagawad_gita": "bhagwad_gita",
    "bhagavat_gita": "bhagwad_gita",
    "shrimad_bhagavad_gita": "bhagwad_gita",
    "shreemad_bhagavad_gita": "bhagwad_gita",

    # Ramcharitmanas
    "tulsi_ramayan": "ramcharitmanas",
    "tulsidas_ramayana": "ramcharitmanas",
    "tulsidas": "ramcharitmanas",
    "ramcharit_manas": "ramcharitmanas",
    "sri_ramcharitmanas": "ramcharitmanas",

    # Ramayana
    "valmiki_ramayana": "ramayana",

    # Yoga Sutras
    "patanjali": "yoga_sutras",
    "patanjali_yoga_sutras": "yoga_sutras",
    "yogasutras": "yoga_sutras",

    # Mahabharata
    "mahabharat": "mahabharata",

    # Bhagavatam
    "bhagavatam": "srimad_bhagavatam",
    "bhagavat_purana": "srimad_bhagavatam",
    "shrimad_bhagavatam": "srimad_bhagavatam",

    # Ashtavakra
    "ashtavakra": "ashtavakra_gita",

    # Upanishads — plural stays empty (not a specific scripture)
    "upanishads": "",   # explicit drop
    "upanishad":  "",
}


def _canonical_slug(raw: str) -> str:
    """
    Normalise a raw slug to canonical form.
      - trim + lowercase
      - collapse whitespace and dashes to underscores
      - apply the alias map
    Empty string means "drop this slug entirely."
    """
    if not isinstance(raw, str):
        return ""
    s = raw.strip().lower()
    s = re.sub(r"[\s\-]+", "_", s)   # "bhagavad gita" → "bhagavad_gita"
    s = re.sub(r"_+", "_", s).strip("_")
    if s in _SCRIPTURE_ALIASES:
        s = _SCRIPTURE_ALIASES[s]
    return s


def _clean_slug_list(raw: Any, max_len: int, known_only: bool) -> list[str]:
    """
    Normalise a raw list-of-slugs from the model:
      - drop non-strings
      - apply alias normalisation
      - dedupe (preserve first-seen order)
      - cap at max_len
      - if known_only, drop anything not in _KNOWN_SCRIPTURES (used for
        scripture_lock — a bogus slug there causes retrieval to return 0 rows)
    """
    if not isinstance(raw, list):
        return []
    out: list[str] = []
    seen: set[str] = set()
    for s in raw:
        slug = _canonical_slug(s)
        if not slug or slug in seen:
            continue
        if known_only and slug not in _KNOWN_SCRIPTURES:
            logger.info("Dropped unknown scripture slug %r (not in allow-list)", s)
            continue
        out.append(slug)
        seen.add(slug)
        if len(out) >= max_len:
            break
    return out


# ── Query text scan: infer scripture_lock the model missed ──────────────────
# If the raw query mentions "gita" (with no qualifier like "ashtavakra",
# "vishnu", "dheesh", "uddhava", "avadhoot"), and the model returned empty
# scripture_lock, inject bhagwad_gita. Same idea for "tulsidas" /
# "ramcharitmanas". This is the belt to the prompt's suspenders.

_GITA_QUALIFIERS = re.compile(
    r"\b(ashtavakra|vishnu|dheesh|uddhava|avadhoot|anu|hansa|ganesha|shiva|guru|kapila|ribhu)\s+gita\b",
    re.IGNORECASE,
)
_BARE_GITA_MENTION = re.compile(r"\b(bhagavad\s+gita|bhagwad\s+gita|bhagwat\s+gita|the\s+gita|gita|bg)\b", re.IGNORECASE)
_RAMCHARIT_MENTION = re.compile(r"\b(ramcharit\s*manas|tulsi(?:das)?(?:\s+ramayan)?|ramchaitmanas|ramcharitmanas)\b", re.IGNORECASE)
_YOGASUTRA_MENTION = re.compile(r"\b(yoga\s+sutras?|patanjali)\b", re.IGNORECASE)
_ASHTAVAKRA_MENTION = re.compile(r"\bashtavakra(\s+gita)?\b", re.IGNORECASE)


def _infer_locks_from_query(query: str) -> list[str]:
    """
    Return the scriptures the raw query explicitly names, using text patterns
    that don't require the LLM to have followed instructions. Used as a
    fallback when the model returned empty scripture_lock but the query
    clearly named a scripture.
    """
    locks: list[str] = []

    # Gita → bhagwad_gita, UNLESS a qualifier ("ashtavakra gita", "vishnu
    # gita", etc.) precedes it — those are different texts and get their
    # own explicit mentions.
    if _BARE_GITA_MENTION.search(query):
        # If a qualified gita is what appeared, respect that.
        if _ASHTAVAKRA_MENTION.search(query):
            locks.append("ashtavakra_gita")
        # If ONLY qualifier-gita appears (no bare Gita mention outside it),
        # skip. Otherwise the bare mention → bhagwad_gita.
        if not _GITA_QUALIFIERS.search(query) or _bare_gita_beyond_qualifier(query):
            locks.append("bhagwad_gita")

    if _RAMCHARIT_MENTION.search(query):
        locks.append("ramcharitmanas")

    if _YOGASUTRA_MENTION.search(query):
        locks.append("yoga_sutras")

    # De-dup, preserve first-seen order.
    seen: set[str] = set()
    out: list[str] = []
    for s in locks:
        if s not in seen:
            out.append(s)
            seen.add(s)
    return out


def _bare_gita_beyond_qualifier(query: str) -> bool:
    """
    True if the query has "gita" separately from any "<qualifier> gita" phrase.
    E.g. "Ashtavakra Gita vs the Gita" → True (the second "the Gita" is bare).
         "Ashtavakra Gita on freedom"  → False (only qualified).
    """
    # Strip out every "<qualifier> gita" span, then look for remaining "gita" tokens.
    stripped = _GITA_QUALIFIERS.sub(" ", query)
    return bool(_BARE_GITA_MENTION.search(stripped))


# ── Intent coercion ──────────────────────────────────────────────────────────

def _coerce_intent(raw: dict, fallback_query: str) -> Intent:
    """Safely construct an Intent from potentially-malformed model output."""
    intent_text = (raw.get("intent") or fallback_query).strip()
    description = (raw.get("description") or "").strip()

    raw_type = (raw.get("intent_type") or "philosophical").strip().lower()
    intent_type: IntentType = raw_type if raw_type in _VALID_TYPES else "philosophical"  # type: ignore[assignment]

    # SOFT hint — tolerate unknown slugs (they just won't match any real
    # verse's scripture and the bias multiplier ends up 1.0).
    likely_scriptures = _clean_slug_list(raw.get("likely_scriptures"), max_len=3, known_only=False)

    # HARD filter — normalise aliases, then reject anything not in the
    # allow-list so retrieval never gets an empty candidate pool from a
    # hallucinated scripture name.
    scripture_lock = _clean_slug_list(raw.get("scripture_lock"), max_len=2, known_only=True)

    return Intent(
        intent=intent_text,
        description=description,
        intent_type=intent_type,
        likely_scriptures=likely_scriptures,
        scripture_lock=scripture_lock,
    )


def _apply_lock_fallback(intents: list[Intent], query: str) -> list[Intent]:
    """
    Defense-in-depth. If every intent came back with an empty scripture_lock
    BUT the raw query text explicitly names one or more scriptures, inject
    those locks so retrieval respects the user's intent.

    - Single-scripture query ("gita on anger") + 1 empty-locked intent:
        set scripture_lock=[<the named scripture>] on that intent.
    - Two-scripture query ("gita and ramcharitmanas") + N empty-locked intents:
        if N == 1, split into 2 intents (one per named scripture), same text.
        if N == 2, set each intent's lock to a different named scripture
        (in the order they appear in the query).
        if N > 2, leave alone — user's compound intent is doing something
        we don't understand and we don't want to corrupt it.
    """
    inferred = _infer_locks_from_query(query)
    if not inferred:
        return intents

    already_locked = any(i.scripture_lock for i in intents)
    if already_locked:
        return intents

    if len(inferred) == 1:
        # Single-scripture case: stamp every intent with the lock. Retrieval
        # will filter each intent's search to that scripture. Cheap and safe.
        for i in intents:
            i.scripture_lock = inferred[:]
        logger.info("Auto-injected scripture_lock=%s from query text scan", inferred)
        return intents

    if len(inferred) == 2 and len(intents) == 1:
        # Two-scripture comparison the model failed to decompose. Duplicate
        # the intent, locking each copy to one scripture.
        template = intents[0]
        new_intents = []
        for slug in inferred:
            new_intents.append(Intent(
                intent=template.intent,
                description=template.description,
                intent_type=template.intent_type,
                likely_scriptures=list(template.likely_scriptures),
                scripture_lock=[slug],
            ))
        logger.info("Split single-intent into %d for scripture_lock decomposition: %s", len(new_intents), inferred)
        return new_intents

    if len(inferred) == 2 and len(intents) == 2:
        # Model produced two intents but didn't lock either. Assign one
        # scripture to each (order-preserving from the query).
        for i, slug in zip(intents, inferred):
            i.scripture_lock = [slug]
        logger.info("Assigned scripture_lock across %d intents: %s", len(intents), inferred)
        return intents

    # Anything more elaborate — leave the LLM's structure intact.
    return intents


@router.post("/intent", response_model=IntentResponse, tags=["search"])
async def extract_intents(req: IntentRequest) -> IntentResponse:
    """
    Step 1: validate → (optionally) rewrite follow-up → extract intents →
    apply query-text scripture_lock fallback.

    Returns valid=False (with reason) for off-topic / injection queries — the
    frontend should stop the pipeline and show the reason. Otherwise returns
    valid=True with 1–4 rich Intent objects and, when applicable, a
    rewritten_query for the frontend to display.

    Falls back to a single-intent direct search if the LLM call fails, so the
    pipeline never dies at step 1.
    """
    rewritten: str | None = None
    raw_intents: list[Any] = []

    try:
        result = get_sarvam().extract_intents(
            INTENT_SYSTEM_PROMPT,
            build_intent_user_prompt(req.query, req.context),
        )

        # Guardrail: model flagged query as invalid
        if result.get("valid") is False:
            reason = result.get("reason", "This question is outside the scope of scripture search.")
            logger.info("Query rejected by guardrail: %r — %s", req.query[:80], reason)
            return IntentResponse(query=req.query, valid=False, reason=reason, intents=[])

        rewritten_raw = result.get("rewritten_query")
        if isinstance(rewritten_raw, str) and rewritten_raw.strip():
            rewritten = rewritten_raw.strip()

        raw_intents = result.get("intents", []) or []

    except Exception as e:
        logger.warning("Intent extraction failed (%s) — falling back to direct search", e)
        raw_intents = []

    # Fallback: treat full query (or its rewrite, if we got one) as a single intent.
    if not raw_intents:
        fallback_q = rewritten or req.query
        intents = [Intent(
            intent=fallback_q,
            description="direct search",
            intent_type="philosophical",
            likely_scriptures=[],
            scripture_lock=[],
        )]
        intents = _apply_lock_fallback(intents, req.query)
        return IntentResponse(query=req.query, valid=True, intents=intents, rewritten_query=rewritten)

    # Coerce each raw dict into a validated Intent; cap at 4.
    intents = [_coerce_intent(i, req.query) for i in raw_intents[:4] if isinstance(i, dict)]

    if not intents:
        # Every raw entry was malformed — same fallback.
        fallback_q = rewritten or req.query
        intents = [Intent(
            intent=fallback_q,
            description="direct search",
            intent_type="philosophical",
            likely_scriptures=[],
            scripture_lock=[],
        )]

    # Belt-and-suspenders: infer scripture_lock from the raw query text when
    # the LLM missed it. This is the fix for "how do Gita and Ramcharitmanas
    # resonate?" returning Dheesh Gita and Vishnu Gita — the model wasn't
    # locking, so no filter got applied, so cosine picked whatever ranked
    # highest. Now the query text itself drives the lock as a fallback.
    intents = _apply_lock_fallback(intents, req.query)

    return IntentResponse(
        query=req.query,
        valid=True,
        intents=intents,
        rewritten_query=rewritten,
    )

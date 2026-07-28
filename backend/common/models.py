"""
models.py — Shared Pydantic request/response schemas.

Change history (2026-07-28):
- Intent now carries intent_type + likely_scriptures (soft hint, not filter).
- IntentRequest accepts optional context (compact prior turn) for follow-up rewriting.
- IntentResponse can return a rewritten standalone query.
- SearchRequest.intents is now List[Intent] (was List[str]) so the search layer
  can use intent_type for diversity rules and likely_scriptures for score bias.
- SearchRequest gets min_score (floor) and diversify_scriptures (cap-per-scripture).
- RagRequest carries intent_type so the synthesizer can pick a voice profile.
"""
from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional
from pydantic import BaseModel, Field


# ── Intent typing ─────────────────────────────────────────────────────────────
# Fixed vocabulary so downstream code can branch on it without string chaos.
# Keep this list short; add types only when a distinct voice/retrieval rule
# actually depends on it.
IntentType = Literal[
    "grief",           # loss, mourning, heartbreak, deep sadness
    "practical",       # "how do I stop being angry", concrete life problem
    "philosophical",   # nature of self / reality / karma / dharma
    "devotional",      # bhakti, surrender, prayer, love of the divine
    "intellectual",    # scholarly, comparative, definitional
    "referential",     # asks for a specific verse or chapter by reference
    "narrative",       # asks for a story, backstory, dialogue
]


# ── Intent endpoint ───────────────────────────────────────────────────────────

class IntentRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=500)
    # Compact summary of the prior assistant turn (≤ 150 tokens recommended).
    # If present, the intent extractor rewrites context-dependent queries
    # ("tell me more", "what about anger") into standalone form before
    # extracting intents.
    context: Optional[str] = Field(default=None, max_length=2000)


class Intent(BaseModel):
    intent: str
    description: str
    intent_type: IntentType = "philosophical"
    # Soft hint from the model — used to bias search scores, NOT as a hard
    # filter. Empty list means "no preference".
    likely_scriptures: List[str] = Field(default_factory=list)
    # HARD pre-filter. Populated ONLY when the user explicitly names a
    # scripture in the query (e.g. "what does the Gita say about anger",
    # "compare Gita and Ramcharitmanas"). Cosine retrieval for this intent
    # runs over the filtered subset only — verses from other scriptures
    # cannot appear in this intent's candidate pool.
    #
    # For a comparison query naming two scriptures, the intent extractor
    # produces two intents (one per scripture), each with its own
    # single-element scripture_lock — each becomes an independent targeted
    # retrieval call.
    scripture_lock: List[str] = Field(default_factory=list)


class IntentResponse(BaseModel):
    query: str
    valid: bool = True          # False = off-topic or injection — frontend stops pipeline
    reason: str = ""            # human-readable explanation when valid=False
    intents: List[Intent]
    # Filled only when the raw query was a follow-up and the extractor
    # rewrote it into a standalone form. Frontend can display this so the
    # user sees what was searched.
    rewritten_query: Optional[str] = None


# ── Search endpoint ───────────────────────────────────────────────────────────

class SearchRequest(BaseModel):
    intents: List[Intent]                         # rich objects, not raw strings
    top_k: int = Field(default=8, ge=1, le=20)    # final results returned
    # Hard filter — used only when the UI has an explicit "search in X" toggle.
    scripture_filter: Optional[List[str]] = None
    # Score floor. Verses below this cosine similarity are dropped even if
    # they made top_k. Calibrated against golden_v1 — the enriched BGE-M3
    # index typically returns 0.55+ for real matches and 0.30–0.40 for
    # noise. 0.35 is a conservative floor.
    min_score: float = Field(default=0.35, ge=0.0, le=1.0)
    # If true, at most `max_per_scripture` verses from any single scripture
    # can appear in the final top_k. Prevents Gita from dominating every
    # inter-scripture question.
    diversify_scriptures: bool = True
    max_per_scripture: int = Field(default=3, ge=1, le=10)
    # Multiplier applied to cosine score when a verse's scripture matches
    # one of the intent's likely_scriptures hints. 1.0 = no bias.
    scripture_hint_bias: float = Field(default=1.08, ge=1.0, le=1.5)
    # Additive bonus per additional intent that a verse also matched. A
    # verse hit by 2 of 2 intents scores higher than one hit by 1.
    coverage_bonus_per_extra_hit: float = Field(default=0.05, ge=0.0, le=0.2)


class VerseResult(BaseModel):
    uid: str
    scripture: str
    scripture_slug: str
    verse_id: str
    verse_sanskrit: str
    verse_hindi: str
    english_translation: str
    essence: str
    simple_meaning: str
    insight: str
    modern_relevance: str
    speaker: str
    tags: List[str]
    score: float                        # final composite score (post-bias, post-bonus)
    raw_score: float = 0.0              # original cosine, useful for eval / debugging
    intent: str                         # best-matching intent text
    intent_hits: int = 1                # how many intents this verse matched
    match_reason: str = "semantic"      # "semantic" | "verse_ref" | "hybrid"
    # ── Audio (populated when using the Supabase-backed index) ───────────
    # audio_url is nullable — a null value means the frontend should call
    # POST /api/v1/audio/generate to lazily produce audio via vagdhenu.
    audio_url: Optional[str] = None
    audio_timestamps: Optional[List[dict]] = None
    # Prosody hint carried through so the play button can pass it to
    # /audio/generate when audio_url is missing. Defaults to anushtubh.
    meter: str = "anushtubh"


class SearchResponse(BaseModel):
    results: List[VerseResult]              # deduplicated, sorted by score
    dropped_below_floor: int = 0            # how many candidates were below min_score
    scriptures_present: List[str] = []      # ordered by count, for RAG attribution


# ── RAG endpoint ─────────────────────────────────────────────────────────────

class Segment(BaseModel):
    type: str                      # "text" | "verse"
    content: Optional[str] = None  # for type="text": prose paragraphs
    uid: Optional[str] = None      # for type="verse": exact verse uid


class RagRequest(BaseModel):
    query: str
    verses: List[VerseResult]
    mode: str = "crisp"                          # "crisp" | "detailed" | "story"
    # Drives voice-profile selection in the RAG prompt. Optional; if absent,
    # the default philosophical profile is used.
    intent_type: Optional[IntentType] = None
    # If the retrieval spans multiple scriptures, pass them here so the
    # synthesizer can attribute correctly ("The Gita says X, while the
    # Katha Upanishad emphasizes Y").
    scriptures_present: List[str] = Field(default_factory=list)


class RagResponse(BaseModel):
    query: str
    segments: List[Segment]        # structured answer: alternating text + verse blocks
    verse_uids_used: List[str]     # ordered list of verse uids used


# ── Verse of the Day endpoint (unchanged) ────────────────────────────────────

class VerseOfDayResponse(BaseModel):
    """
    The daily curated verse — returned by GET /api/v1/verse-of-day.
    The frontend uses chapter + verse to look up the full verse content from
    its own static JSON, and renders date_context / why_chosen / story as
    editorial sections around the verse.
    """
    date: str
    chapter: int
    verse: int
    verse_uid: str

    day_of_week: str
    deity: str
    day_name_hi: str

    date_context: str
    why_chosen: str
    story: str

    themes: List[str] = []

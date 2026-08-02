"""
models.py — Shared Pydantic request/response schemas.

v2 changes (retrieval overhaul):
  - Intent gains `intent_type` (routes voice profile in RAG) and `scripture_hint`
    (soft signal, NOT a hard filter).
  - IntentRequest accepts optional turn `history` for follow-up rewriting.
  - IntentResponse can carry a rewritten `standalone_query` and a `verse_refs`
    fast-path payload (when the query cites specific chapter.verse ids).
  - SearchResponse gains `no_strong_match` — the frontend can show a fallback
    UI instead of piping weak verses to RAG.
  - VerseResult gains `source` (dense | reranked | verse_ref) and
    `rerank_score` (populated only when the reranker ran).
  - RagRequest accepts `intent_type` so we can pick a voice profile per call.
"""
from __future__ import annotations

from typing import List, Literal, Optional
from pydantic import BaseModel, Field


# ── Shared enums ──────────────────────────────────────────────────────────────

# Intent type gates BOTH the voice profile (RAG prompt suffix) and downstream
# retrieval heuristics (e.g. narrative queries deserve longer passages).
IntentType = Literal[
    "grief",         # loss, sadness, longing
    "philosophical", # abstract inquiry — self, reality, karma, dharma
    "practical",     # "how do I stop being angry" — actionable
    "devotional",    # bhakti, surrender, love of the divine
    "referential",   # asks about a specific verse / chapter / speaker
    "narrative",     # asks for a story, backstory, dialogue
    "other",         # fallback — voice defaults to philosophical
]

Scripture = str  # free-form slug so we can add scriptures without churn


# ── Turn history (for follow-up rewriting) ────────────────────────────────────

class Turn(BaseModel):
    """One prior turn of the conversation. Kept small on purpose."""
    role: Literal["user", "assistant"]
    content: str = Field(..., max_length=2000)


# ── Intent endpoint ───────────────────────────────────────────────────────────

class IntentRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=500)
    # Optional last 2–4 turns. When present the model may rewrite a bare
    # follow-up ("tell me more", "what about anger") into a standalone query.
    history: Optional[List[Turn]] = None


class Intent(BaseModel):
    intent: str
    description: str
    # Voice + retrieval routing. Model always emits this; defaults to "other".
    intent_type: IntentType = "other"


class VerseRef(BaseModel):
    """
    A parsed chapter.verse citation.

    Two-level: Gita 2.47 → chapter=2, verse=47, section=None
    Three-level: Katha 1.2.15 → chapter=1, section=2, verse=15 (Upanishads
    that index chapter.section.verse). `section=None` means a flat 2-level
    ref. The uid is built by joining non-None parts with commas.
    """
    scripture: Scripture              # canonical slug: "bhagwad_gita"
    chapter: int
    verse: int
    section: Optional[int] = None     # 3-level refs (Katha, Chhandogya, etc.)
    raw: str                          # what the user typed


class IntentResponse(BaseModel):
    query: str
    valid: bool = True                # False = off-topic or injection
    reason: str = ""                  # human-readable explanation when invalid
    intents: List[Intent]

    # Optional signals produced by the intent stage
    standalone_query: Optional[str] = None   # follow-up rewritten into standalone
    scripture_hint: List[Scripture] = []     # soft signal — NOT a hard filter
    verse_refs: List[VerseRef] = []          # parsed fast-path payload


# ── Search endpoint ───────────────────────────────────────────────────────────

class SearchIntent(BaseModel):
    """
    One intent as forwarded by the frontend to /search.

    The frontend passes full intent objects (not plain strings) so it can
    carry per-intent signals — most notably `scripture_lock`, a hard filter
    that pins retrieval to a specific scripture when the user names one
    explicitly ("only from the Gita", "just Upanishads"). This avoids the
    bug where a single-scripture query silently pulls from the whole corpus.

    `likely_scriptures` is a soft hint — same semantics as SearchRequest's
    top-level `scripture_hint` but expressed per intent.
    """
    intent: str
    description: str = ""
    intent_type: IntentType = "other"
    likely_scriptures: List[Scripture] = []
    scripture_lock: List[Scripture] = []   # HARD per-intent scripture filter


class SearchRequest(BaseModel):
    intents: List[SearchIntent]
    top_k: int = Field(default=8, ge=1, le=20)             # bumped 5 → 8
    scripture_filter: Optional[List[Scripture]] = None      # HARD filter (UI toggle)
    scripture_hint: Optional[List[Scripture]] = None        # SOFT bias only
    verse_refs: Optional[List[VerseRef]] = None             # fast-path
    max_per_scripture: int = Field(default=3, ge=1, le=10)  # diversity cap
    score_floor: float = Field(default=0.42, ge=0.0, le=1.0)  # → no_strong_match
    enable_reranker: bool = True


class VerseResult(BaseModel):
    uid: str
    scripture: Scripture
    scripture_slug: Scripture
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
    score: float                              # final rank score used for ordering
    dense_score: float = 0.0                  # raw cosine
    rerank_score: Optional[float] = None      # populated only when reranker ran
    intent: str                               # which intent surfaced this verse
    intent_coverage: int = 1                  # how many intents hit this verse
    source: Literal["dense", "reranked", "verse_ref"] = "dense"


class SearchResponse(BaseModel):
    results: List[VerseResult]
    no_strong_match: bool = False             # frontend can show fallback UI
    top_dense_score: float = 0.0              # for debugging / observability


# ── RAG endpoint ─────────────────────────────────────────────────────────────

class Segment(BaseModel):
    type: Literal["text", "verse"]
    content: Optional[str] = None             # text segments
    uid: Optional[str] = None                 # verse segments


class RagRequest(BaseModel):
    query: str
    verses: List[VerseResult]
    mode: Literal["crisp", "detailed"] = "crisp"
    intent_type: IntentType = "other"         # picks voice profile in prompts/rag.py


class RagResponse(BaseModel):
    query: str
    segments: List[Segment]
    verse_uids_used: List[str]


# ── Streaming (SSE) ───────────────────────────────────────────────────────────

class RagStreamChunk(BaseModel):
    """
    Emitted by /api/v1/rag/stream over SSE.

      kind='delta' — raw token delta (frontend accumulates into a JSON buffer)
      kind='done'  — final parsed segments + verse_uids_used
      kind='error' — human-readable failure
    """
    kind: Literal["delta", "done", "error"]
    delta: Optional[str] = None
    segments: Optional[List[Segment]] = None
    verse_uids_used: Optional[List[str]] = None
    error: Optional[str] = None


# ── Verse of the Day endpoint (unchanged) ─────────────────────────────────────

class VerseOfDayResponse(BaseModel):
    date: str                   # "YYYY-MM-DD" — the IST calendar date
    chapter: int
    verse: int
    verse_uid: str              # "bhagwad_gita:chapter.verse"

    day_of_week: str            # "Tuesday"
    deity: str                  # "Mangal (Mars)"
    day_name_hi: str            # "Mangalvar"

    date_context: str
    why_chosen: str
    story: str

    themes: List[str] = []

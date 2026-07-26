"""
models.py — Shared Pydantic request/response schemas.
"""
from __future__ import annotations

from typing import List, Literal, Optional
from pydantic import BaseModel, Field


# ── Intent endpoint ───────────────────────────────────────────────────────────

class IntentRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=500)

class Intent(BaseModel):
    intent: str
    description: str

class IntentResponse(BaseModel):
    query: str
    valid: bool = True          # False = off-topic or injection — frontend stops pipeline
    reason: str = ""            # human-readable explanation when valid=False
    intents: List[Intent]


# ── Search endpoint ───────────────────────────────────────────────────────────

class SearchRequest(BaseModel):
    intents: List[str]
    top_k: int = Field(default=5, ge=1, le=20)
    scripture_filter: Optional[List[str]] = None  # e.g. ["bhagwad_gita"]

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
    score: float
    intent: str   # which intent this verse was retrieved for

class SearchResponse(BaseModel):
    results: List[VerseResult]    # deduplicated, sorted by score


# ── RAG endpoint ─────────────────────────────────────────────────────────────

class Segment(BaseModel):
    type: str                      # "text" | "verse"
    content: Optional[str] = None  # for type="text": prose paragraphs
    uid: Optional[str] = None      # for type="verse": exact verse uid

class RagRequest(BaseModel):
    query: str
    verses: List[VerseResult]
    mode: str = "crisp"   # "crisp" | "detailed"

class RagResponse(BaseModel):
    query: str
    segments: List[Segment]        # structured answer: alternating text + verse blocks
    verse_uids_used: List[str]     # ordered list of verse uids used


# ── Verse of the Day endpoint ─────────────────────────────────────────────────

class VerseOfDayResponse(BaseModel):
    """
    The daily curated verse — returned by GET /api/v1/verse-of-day.
    The frontend uses chapter + verse to look up the full verse content from
    its own static JSON, and renders date_context / why_chosen / story as
    editorial sections around the verse.
    """
    date: str                   # "YYYY-MM-DD" — the IST calendar date
    chapter: int
    verse: int
    verse_uid: str              # "bhagwad_gita:chapter.verse"

    # Day context
    day_of_week: str            # "Tuesday"
    deity: str                  # "Mangal (Mars)"
    day_name_hi: str            # "Mangalvar"

    # AI-generated editorial copy
    date_context: str           # What makes today spiritually significant
    why_chosen: str             # Why this verse fits today's energy
    story: str                  # The verse's scene / backstory on Kurukshetra

    # Selection metadata (useful for debugging / analytics)
    themes: List[str] = []

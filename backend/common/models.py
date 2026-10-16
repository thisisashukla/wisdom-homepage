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

from typing import Annotated, Any, Dict, List, Literal, Optional
from pydantic import BaseModel, Field, StringConstraints


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


# ── Recommend endpoint (onboarding verse picks) ───────────────────────────────

AgeBand = Literal["u25", "25_34", "35_44", "45_54", "55p"]
LifeStage = Literal["studying", "working", "own_thing", "raising_kids", "caring_parents", "retired", "between"]
Feeling = Literal["quiet", "nerve", "replay", "stick", "faith", "gita"]   # Restless, Stuck, Uneasy, Determined, Searching, Curious


class RecommendRequest(BaseModel):
    feeling: Feeling
    age: Optional[AgeBand] = None
    stages: List[LifeStage] = Field(default_factory=list, max_length=7)
    phone_hours: Optional[int] = Field(None, ge=1, le=12)        # 12 = 12 or more
    note: Optional[str] = Field(None, max_length=1000)          # their own words; never stored or logged
    note_source: Optional[Literal["voice", "text"]] = None
    count: int = Field(5, ge=1, le=10)
    exclude: List[str] = Field(default_factory=list, max_length=200)   # verse ids already shown


class RecommendSituation(BaseModel):
    id: str
    label: str
    weight: float
    source: Literal["note", "profile"]


class RecommendPrasang(BaseModel):
    id: str
    title: Optional[str] = None
    summary: Optional[str] = None
    story_hook: Optional[str] = None
    lesson: Optional[str] = None


class RecommendMatched(BaseModel):
    id: str
    label: str


class RecommendedVerse(BaseModel):
    id: str
    ref: str
    ref_iast: Optional[str] = None        # the same reference in IAST, for cards
    family: Optional[str] = None
    speaker: Optional[str] = None
    listener: Optional[str] = None        # who the verse is said to
    setting: Optional[str] = None
    sanskrit: Optional[str] = None        # omitted where the library's Sanskrit isn't display-ready
    line: str                             # our own short English: only what the verse says
    translation: Optional[str] = None
    why: Optional[str] = None             # the verse's reflection or its prasang's lesson
    misuse: Optional[str] = None          # show with the verse when present
    tone: Optional[str] = None
    matched: List[RecommendMatched] = []  # the person's situations this verse speaks to
    prasang: Optional[RecommendPrasang] = None
    score: float


class SafetyLine(BaseModel):
    region: str
    name: str
    contact: str


class RecommendSafety(BaseModel):
    crisis: bool
    message: str
    lines: List[SafetyLine]


class RecommendLibrary(BaseModel):
    verses: int      # verses in the library
    prasangs: int    # stories they belong to
    texts: int       # text families (Gita, Upanishads, Ramayana, ...)


class RecommendResponse(BaseModel):
    verses: List[RecommendedVerse]
    situations: List[RecommendSituation]
    used_note: bool
    matching: Literal["semantic", "keywords", "profile"]
    safety: Optional[RecommendSafety] = None
    library_version: str
    library: Optional[RecommendLibrary] = None


# ── Plan endpoints: /recommend/hook, /recommend/preview, /recommend/plan ─────
# One reading of the person (Understanding) drives every week of the plan. A week runs
#   see (hook, diagnose) → steady ×2 → act ×2 → story
# at one level: week 1 their situation, week 2 the pattern underneath, week 3 who they are beyond it.

Beat = Literal["hook", "diagnose", "steady", "act", "story"]
Phase = Literal["see", "steady", "act", "story"]
Level = Literal["situation", "pattern", "self"]
Risk = Literal["none", "distress", "self_harm", "harm_from_others"]
ChipId = Annotated[str, StringConstraints(pattern=r"^[a-z_]{1,40}$")]


class JourneyIn(BaseModel):
    """What the person has lived with Wisdom so far, sent by the app with every later request.
    Ids and our own labels only: nothing they wrote. Used to rank (lean toward what helped) and to
    write (the personal lines can build on what already landed)."""
    week: Optional[int] = Field(None, ge=1, le=3)                   # the week they are in now
    days_seen: int = Field(0, ge=0, le=400)                         # plan days opened so far
    helped: List[Annotated[str, StringConstraints(max_length=80)]] = Field(default_factory=list, max_length=40)  # verse ids they marked "This helped"
    past: List[Annotated[str, StringConstraints(max_length=80)]] = Field(default_factory=list, max_length=10)   # earlier situations' labels


class PlanInput(BaseModel):
    """What onboarding learned. Every field but `feeling` is optional, and the note may be noise."""
    feeling: Feeling
    age: Optional[AgeBand] = None
    stages: List[LifeStage] = Field(default_factory=list, max_length=7)
    phone_hours: Optional[int] = Field(None, ge=1, le=12)
    topic: Optional[ChipId] = None        # problem chip, row 1 (e.g. "someone"), if the app asked
    follow: Optional[ChipId] = None       # problem chip, row 2 (e.g. "parents")
    note: Optional[str] = Field(None, max_length=1000)          # their own words; never stored or logged
    note_source: Optional[Literal["voice", "text"]] = None
    exclude: List[str] = Field(default_factory=list, max_length=200)
    journey: Optional[JourneyIn] = None   # later requests only (Home): what they have lived so far


class HookRequest(PlanInput):
    alternates: int = Field(2, ge=0, le=4)   # extra hook candidates for "Another"


class PreviewRequest(PlanInput):
    # Send back the `understanding` from /hook to skip the reading step (no note needed,
    # same reading as onboarding). Send `hook_id` to keep the verse they kept as the hook.
    understanding: Optional[Dict[str, Any]] = None
    hook_id: Optional[str] = Field(None, max_length=80)


NotForMeReason = Literal["not_my_situation", "too_heavy", "too_religious", "heard_it"]


class DayFeedback(BaseModel):
    """One "Not for me": the verse they turned down and why. Later picks lean away from it."""
    verse_id: str = Field(..., max_length=80)
    reason: NotForMeReason


class PlanRequest(PreviewRequest):
    # The app asks for one week at a time: `week` 1, 2 or 3 (its level follows: situation, pattern,
    # self) and sends every verse and story id already shown in `exclude`. Without `week`, `days`
    # builds that many days from week 1 (older apps asked for 21).
    week: Optional[int] = Field(None, ge=1, le=3)
    level: Optional[Level] = None          # override the week's level (e.g. a premade plan)
    # Days of see, steady, act and story in the week, adding up to 7 ("2221", "1231", "1222").
    # Empty: the server's default (settings.plan_week_shape).
    shape: Optional[Annotated[str, StringConstraints(pattern=r"^[0-7]{4}$")]] = None
    days: int = Field(7, ge=1, le=28)
    story_id: Optional[str] = Field(None, max_length=80)   # the preview's story, to keep it as week 1's Day 7
    feedback: List[DayFeedback] = Field(default_factory=list, max_length=40)   # every "Not for me" so far


class ReplaceRequest(PreviewRequest):
    # "Not for me" on Day 1 of a week: another verse for that day. `exclude` holds every id already
    # shown; `upcoming` every verse and story id still to come in their plan (never offered here).
    week: int = Field(1, ge=1, le=3)
    level: Optional[Level] = None
    shape: Optional[Annotated[str, StringConstraints(pattern=r"^[0-7]{4}$")]] = None
    verse_id: str = Field(..., max_length=80)              # the verse they turned down
    reason: NotForMeReason
    upcoming: List[str] = Field(default_factory=list, max_length=60)
    feedback: List[DayFeedback] = Field(default_factory=list, max_length=40)


class ReplaceResponse(BaseModel):
    verse: Optional["BeatVerse"] = None
    week: int
    level: Level
    beat: Beat
    timings_ms: Dict[str, int] = {}


class RefineRequest(PlanRequest):
    # "Update my plan" (Pro, once a week, Day 2 to Day 6): the person adds context in their own words
    # (`note`, voice or typed; never stored or logged). The earlier reading (`understanding`) and the
    # new words are read together, and the week is chosen again from `from_day` (day in week) to Day 7.
    # `exclude` holds every id in the plan so far, including the days being replaced, so all are new.
    week: int = Field(1, ge=1, le=3)
    from_day: int = Field(..., ge=2, le=6)
    note: str = Field(..., min_length=3, max_length=1000)


class RefineResponse(BaseModel):
    understanding: "UnderstandingOut"
    days: List["PlanDayOut"]               # from `from_day` to the end of the week, numbered across the plan
    week: "PlanWeek"
    heard: str                             # one gentle line of what the update took in (the new reading's mirror)
    safety: Optional["PlanSafety"] = None
    timings_ms: Dict[str, int] = {}


class UnderstoodSituation(BaseModel):
    id: str
    label: str
    weight: float
    source: Literal["note", "chip", "profile"]


class BeatQueries(BaseModel):
    hook: str
    diagnose: str
    steady: str = ""          # empty only from readings made before steady existed
    act: str
    story: str


class UnderstandingOut(BaseModel):
    version: int
    source: Literal["llm", "fallback", "client"]
    note_quality: Literal["useful", "partial", "unusable", "none"]
    risk: Risk
    confidence: float
    core_struggle: str                 # third person, for the app's own use (never shown verbatim as a diagnosis)
    mirror: str                        # one gentle line for the loading screen ("It sounds like ...")
    insight: str = ""                  # "What's really going on", under the revealed verse (second person)
    mechanism: str                     # root cause id (ai/mechanisms.py)
    mechanism_label: str
    secondary_mechanism: Optional[str] = None
    situations: List[UnderstoodSituation]
    queries: BeatQueries               # the retrieval statements, after guardrails
    query_sources: Dict[str, str]      # beat -> llm | template | safety | client
    weeks: List[str]                   # three week titles: situation, pattern, self
    # The person, paraphrased once (never the note), sent back by the app so every later step can
    # write for their life and rank for their stage of it (ai/voice.py).
    seat: str = ""                     # their place in the situation
    life_context: str = ""             # their life right now, 1-2 sentences, third person
    details: List[str] = []            # up to 4 concrete facts they gave, paraphrased
    age: Optional[str] = None
    stages: List[str] = []
    flags: List[str] = []


class BeatVerse(RecommendedVerse):
    beat: Beat
    role_fit: float                    # how well this verse does the beat's job, 0..1
    meaning: Optional[str] = None      # plan days: "What it says", the verse told as a story, faithful to its translation
    for_you: Optional[str] = None      # plan days: what this verse says to this person (ai/personalize.py); else show `why`


class StoryCard(BaseModel):
    beat: Literal["story"] = "story"
    id: str
    title: Optional[str] = None
    kind: Optional[str] = None         # story | teaching
    family: Optional[str] = None
    characters: List[str] = []
    story_hook: Optional[str] = None
    summary: Optional[str] = None
    lesson: Optional[str] = None
    matched: List[RecommendMatched] = []
    anchor: Optional[RecommendedVerse] = None   # a line from the story, when the library has one
    score: float
    why: Optional[str] = None          # unused since 14 Oct (kept for older apps)
    hook_title: Optional[str] = None   # the story's named hook ("Rama came home from his pilgrimage and stopped laughing")
    teaser: Optional[str] = None       # Day 7's line: hook_title, else the story's opening line, else its title
    for_you: Optional[str] = None      # plan days: what this story shows this person (ai/personalize.py)


class ArcBeats(BaseModel):
    hook: Optional[BeatVerse] = None
    diagnose: Optional[BeatVerse] = None
    steady: Optional[BeatVerse] = None
    act: Optional[BeatVerse] = None
    story: Optional[StoryCard] = None


class PlanDayOut(BaseModel):
    day: int                           # across the whole plan: week 2 runs days 8-14
    day_in_week: int                   # 1..7
    week: int
    level: Level
    phase: Phase                       # see | steady | act | story
    beat: Beat
    verse: Optional[BeatVerse] = None
    story: Optional[StoryCard] = None


class PlanWeek(BaseModel):
    week: int
    title: str
    level: Level = "situation"
    level_label: str = "Your situation"
    beats: List[Beat]                  # the beat of each day in the week


class PlanSafety(BaseModel):
    kind: Literal["self_harm", "harm_from_others"]
    message: str
    lines: List[SafetyLine]


class HookResponse(BaseModel):
    understanding: UnderstandingOut
    hook: Optional[BeatVerse] = None
    alternates: List[BeatVerse] = []
    safety: Optional[PlanSafety] = None
    matching: Literal["semantic", "keywords"]
    library_version: str
    library: Optional[RecommendLibrary] = None
    timings_ms: Dict[str, int] = {}


class PreviewResponse(BaseModel):
    understanding: UnderstandingOut
    beats: ArcBeats
    weeks: List[PlanWeek]
    safety: Optional[PlanSafety] = None
    matching: Literal["semantic", "keywords"]
    library_version: str
    timings_ms: Dict[str, int] = {}


class PlanResponse(BaseModel):
    understanding: UnderstandingOut
    days: List[PlanDayOut]
    weeks: List[PlanWeek]
    safety: Optional[PlanSafety] = None
    matching: Literal["semantic", "keywords"]
    library_version: str
    timings_ms: Dict[str, int] = {}


class DepthRequest(PreviewRequest):
    # "Go deeper" on a plan day: the day's verse (or story), its beat and week, and the personal
    # line already shown (so the depth doesn't repeat it).
    verse_id: Optional[str] = Field(None, max_length=80)
    story_id: Optional[str] = Field(None, max_length=80)
    beat: Beat = "hook"
    week: int = Field(1, ge=1, le=3)
    for_you: Optional[str] = Field(None, max_length=400)


class DepthOut(BaseModel):
    life: Optional[str] = None         # "In your life"
    points: Optional[str] = None       # "What it points at"
    practice: Optional[str] = None     # "Try this today"
    question: Optional[str] = None     # "A question to sit with"


class DepthResponse(BaseModel):
    depth: DepthOut
    cached: bool = False
    timings_ms: Dict[str, int] = {}


ReplaceResponse.model_rebuild()
RefineResponse.model_rebuild()

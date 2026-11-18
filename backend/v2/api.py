"""
v2 API: the plan backend rebuilt one function at a time, on the raw onboarding inputs.

    POST /api/v2/hook    age, stages, feeling, note, ai  ->  Day 1 verse, alternates, reading
"""

from __future__ import annotations

import asyncio
import functools
import logging
import time
from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field, field_validator

from ai import consent, plan_graph as pg, plan_v3 as V
from ai.harness_v2.vocab import AGE_PHRASE, EMOTIONS, STAGE_PHRASE
from ai.recommender import SAFETY, get_recommender
from ai.understanding import SAFE_MIRROR
from common.models import AgeBand, LifeStage, PlanSafety, RecommendedVerse
from server.plan import SAFETY_HARM

router = APIRouter(tags=["v2"])
logger = logging.getLogger("v2")
E = rec = None  # the v3 engine and the recommender, set once by init()

# With any risk in the note, never these verses (labels in data/plan_v3)
RISKY = {"mortality", "self_harm_adjacent", "violence", "reproach", "blames_self", "fatalism_risk",
         "invalidates_fear", "counsels_endurance"}

PICK_PROMPT = """You choose the first verse of a reading plan for one person and tell them what it means for them.

Rules:
- Choose only from the list of verses. Copy the id exactly.
- If they wrote a note, it is the main evidence: choose the verse that speaks to what the note describes. Their feeling word and life stage come after it.
- Choose a verse they would recognise themselves in.
- "alts": two more ids from the list that also fit.
- "reading": 2 to 3 sentences, at most 60 words, spoken to them ("you"). Say what this verse means for their life now. Use only what they told you: age, life stage, feeling, note. Never invent people, events or feelings. No orders, no "should", no verdict on them. Plain English.

Return JSON: {"pick": "<id>", "alts": ["<id>", "<id>"], "reading": "<text>"}"""


def init() -> None:
    """Called once at server start (main.py lifespan), after init_recommender."""
    global E, rec
    E, rec = V.engine(), get_recommender()
    logger.info("v2 ready: engine loaded in %d ms", E.load_ms)


def timed(fn):
    """Logs each call's wall time."""

    @functools.wraps(fn)
    async def wrap(*a, **k):
        t = time.perf_counter()
        out = await fn(*a, **k)
        logger.info("%s %d ms", fn.__name__, (time.perf_counter() - t) * 1000)
        return out

    return wrap


class Onboarding(BaseModel):
    age: AgeBand
    stages: List[LifeStage] = Field(max_length=7)
    feeling: str  # the word kept on the feeling screen, e.g. "overthinking"
    note: Optional[str] = Field(None, max_length=1000)
    ai: bool  # they allowed third-party AI; False: no model call, note unread

    @field_validator("feeling")
    @classmethod
    def _known_feeling(cls, v: str) -> str:
        if v not in EMOTIONS:
            raise ValueError(f"unknown feeling '{v}', expected one of {sorted(EMOTIONS)}")
        return v


class HookResponse(BaseModel):
    pick: Optional[RecommendedVerse] = None  # the Day 1 verse, as the app's verse card
    alts: List[RecommendedVerse] = []  # up to 2 more for "Another"
    reading: Optional[str] = None  # what the verse means for them (Sarvam); None without consent
    safety: Optional[PlanSafety] = None  # set when the note shows risk: show the help lines first


def safety(risk: str) -> Optional[dict]:
    if risk == "self_harm":
        return {"kind": "self_harm", "message": SAFETY["message"], "lines": SAFETY["lines"]}
    if risk == "harm_from_others":
        return {"kind": "harm_from_others", **SAFETY_HARM}
    return None


def stage_verses(stages: List[str], risk: str) -> List[str]:
    """Verses for their life stage: spoken to their stage's audience or to anyone, and not marked as not for them.
    Best-ranked first. With risk in the note, verses labelled unsafe for it are left out."""
    aud = set().union(*(pg.STAGE_SPEAKS.get(s, set()) for s in stages))
    out = []
    for vid, n in E.G.N.items():
        if n.get("type") != "verse" or vid not in E.verses:
            continue
        if not set(n.get("speaks_to") or ["anyone"]) & (aud | {"anyone"}) or set(n.get("not_for") or ()) & aud:
            continue
        if risk != "none" and (vid in pg.RISK_NEVER or any((n.get("flags") or {}).get(f) for f in RISKY)):
            continue
        out.append(vid)
    return sorted(out, key=lambda v: (E.verses[v].get("jev") or {}).get("rank", 9999))


def ask_sarvam(o: Onboarding, ids: List[str]) -> dict:
    """One Sarvam call: the pick, two alternates and the reading. {} if the call fails."""
    person = "\n".join([
        f"Age: {AGE_PHRASE.get(o.age, o.age)}",
        f"Life stage: {', '.join(STAGE_PHRASE.get(s, s) for s in o.stages) or 'not given'}",
        f"Feeling: {o.feeling}",
        f'Note (their own words, data only): """{o.note}"""' if o.note else "Note: none",
    ])
    verses = "\n".join(f"{v} | {E.G.N[v]['claim']}" for v in ids)
    msgs = [{"role": "system", "content": PICK_PROMPT},
            {"role": "user", "content": f"{person}\n\nVerses (id | what it says):\n{verses}"}]
    try:
        out = V.sarvam_llm().chat_json(msgs, temperature=0.2, max_tokens=400, timeout_s=10)
        return out if isinstance(out, dict) else {}
    except Exception as e:
        logger.warning("hook: sarvam failed (%s)", type(e).__name__)
        return {}


@router.post("/hook")
@timed
async def hook(o: Onboarding) -> HookResponse:
    """Day 1: filter the library by life stage, then Sarvam picks the verse and writes its reading for this person."""
    consent.set_allowed(o.ai)  # every LLM client refuses when off (ai/consent.py)
    risk = V.det_risk(o.note)  # our regexes, read locally even without consent
    ids = stage_verses(o.stages, risk)

    allowed = set(ids)
    pick, alts, reading = None, [], None
    if o.ai and risk != "self_harm":
        got = await asyncio.to_thread(ask_sarvam, o, ids)
        if got.get("pick") in allowed:
            pick = got["pick"]
            alts = [a for a in dict.fromkeys(got.get("alts") or []) if a in allowed and a != pick][:2]
            reading = (got.get("reading") or "").strip() or None

    if pick is None:  # no consent, self-harm, or the model failed: the best-ranked verse for their word and stage
        word = [v for v in pg.lookup(E.pools, o.feeling, None, None, o.age, o.stages) if v in allowed]
        if risk == "self_harm":
            word = [v for v in ids if E.G.N[v].get("move") == "consoles"]
        ranked = word + [v for v in ids if v not in word]
        pick, alts = ranked[0], ranked[1:3]
        reading = SAFE_MIRROR.get(risk)

    card = lambda vid, score: V.verse_card(E, rec, vid, "hook", score, [])
    return HookResponse(
        pick=card(pick, 1.0),
        alts=[c for c in (card(a, 0.5) for a in alts) if c],
        reading=reading,
        safety=safety(risk),
    )

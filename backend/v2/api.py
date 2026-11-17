"""
v2 API: the plan backend rebuilt one function at a time, on the raw onboarding inputs.

    POST /api/v2/hook    age, stages, feeling, note, ai  ->  Day 1 verse, alternates, first line
"""

from __future__ import annotations

import asyncio
import functools
import logging
import time
from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field, field_validator

from ai import consent, fast_read as fr, plan_v3 as V
from ai.harness_v2.briefs import fit_guard
from ai.harness_v2.harness import chip_first_line, first_line
from ai.harness_v2.vocab import EMOTIONS
from ai.recommender import SAFETY, get_recommender
from common.models import AgeBand, LifeStage, PlanSafety, RecommendedVerse
from server.plan import SAFETY_HARM

router = APIRouter(tags=["v2"])
logger = logging.getLogger("v2")


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
            raise ValueError(
                f"unknown feeling '{v}', expected one of {sorted(EMOTIONS)}"
            )
        return v


class HookResponse(BaseModel):
    pick: Optional[RecommendedVerse] = None  # the Day 1 verse, as the app's verse card
    alts: List[RecommendedVerse] = []  # up to 3 more for "Another"
    first_line: Optional[str] = None  # the personal line shown with the pick
    safety: Optional[PlanSafety] = (
        None  # set when the note shows risk: show the help lines first
    )


def safety(risk: str) -> Optional[dict]:
    if risk == "self_harm":
        return {
            "kind": "self_harm",
            "message": SAFETY["message"],
            "lines": SAFETY["lines"],
        }
    if risk == "harm_from_others":
        return {"kind": "harm_from_others", **SAFETY_HARM}
    return None


def relaxable(E, R, risk, pb, vid) -> bool:
    """Refused only for depicting a state the person is not in, and still a fit for them."""
    why = E.G.gate(vid, "D1_see_name", R, risk, R.get("_allow_devotional", True)) or ""
    vb = V.verse_brief(E, vid)
    return (
        why.startswith("r4: depicts or diagnoses")
        and vb is not None
        and not fit_guard(pb, vb)
    )


@router.post("/hook")
@timed
async def hook(o: Onboarding) -> HookResponse:
    """Day 1, bare minimum: read the person without a model, list candidates, let Sarvam suggest a pick and write
    the first line when they consented, keep only verses the graph allows."""
    consent.set_allowed(o.ai)  # every LLM client refuses when off (ai/consent.py)
    E, rec = V.engine(), get_recommender()

    # 1. who they are, from our own rules (no model): stance, states, risk
    pb = V.person_brief(o, consent=o.ai)
    pb.risk = V.higher_risk(
        pb.risk, V.det_risk(o.note)
    )  # our regexes, read locally even without consent
    rd = {
        "kept": o.feeling,
        "trail": [o.feeling],
        "stance": pb.stance,
        "states": list(pb.states),
        "risk": pb.risk,
        "situations": [],
        "age": o.age,
        "stages": o.stages,
    }
    use_model = o.ai and pb.risk != "self_harm"

    # 2. situations from the note, then the graph's candidates
    if use_model and o.note:
        got = await asyncio.to_thread(rec.match_note, o.note)
        rd["situations"] = [
            s
            for s, _ in sorted(got.items(), key=lambda x: -x[1])
            if "sit:" + s in E.G.N
        ][:3]
    cands = V.candidates(E, rd)

    # 3. consent: Sarvam reads the note and suggests a pick, tried first. No consent: the graph's order as it is.
    llm = V.sarvam_llm() if use_model else None
    if llm:
        raw, _, _ = await asyncio.to_thread(
            V._fast_read_call, llm, o, rd, V._cand_dicts(E, cands)
        )
        if raw:
            r = fr.validate(
                raw, V._cand_dicts(E, cands), o.feeling, has_note=bool(o.note)
            )
            cands = [x for x in (r.pick, r.alt) if x] + cands

    # 4. keep what the graph allows as Day 1 for this reading
    R = V.reading_R(E, rd)
    allowed = lambda ids: [
        v for v in dict.fromkeys(ids) if V.day1_allowed(E, v, R, rd["risk"], pb) is None
    ]
    pool = [
        c["id"]
        for c in E.G.day1_pool(
            words=rd["trail"],
            stance=rd["stance"],
            situations=rd["situations"],
            age=o.age,
            stages=o.stages,
            k=30,
            risk=rd["risk"],
        )
    ]
    ok = allowed(cands) or allowed(
        pool
    )  # the list first, then the whole library for this reading
    if not ok:  # still none (self-harm mostly): relax only "a state they're not in"
        ok = [v for v in cands + pool if relaxable(E, R, rd["risk"], pb, v)][:1]
    pick, alts = (ok[0] if ok else None), ok[1:4]

    # 5. first line: Sarvam writes it with consent, else our template for their word
    vb = V.verse_brief(E, pick) if pick else None
    if llm and vb:
        line = (
            await V._first_line_bounded(
                first_line, chip_first_line, llm, pb, vb, E.static, 3.5
            )
        ).get("text")
    else:
        line = chip_first_line(pb, E.static).get("text")

    card = lambda vid, score: V.verse_card(E, rec, vid, "hook", score, rd["situations"])
    return HookResponse(
        pick=card(pick, 1.0) if pick else None,
        alts=[c for c in (card(a, 0.5) for a in alts) if c],
        first_line=line,
        safety=safety(rd["risk"]),
    )

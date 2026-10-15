"""
server/plan.py — the plan endpoints, built on one reading of the person.

    POST /api/v1/recommend/hook      onboarding: read the person, return the hook verse (+ alternates)
    POST /api/v1/recommend/preview   the arc: hook → diagnose → steady → act → story, plus the three week titles
    POST /api/v1/recommend/plan      one week of the plan (or `days` days from week 1)

A plan week runs see → steady → act → story; its shape (days per phase, "2221" by default)
is a parameter. Week 1 is their situation, week 2 the pattern underneath, week 3 who they
are beyond it. The app asks for one week at a time, sending every id already shown in
`exclude`, and a new situation starts again at week 1.

All three accept the same onboarding answers (feeling, age, stages, phone time, optional
problem chips, optional note). /preview and /plan also accept the `understanding` that
/hook returned: send it back and the person is not read twice (no second LLM call, no
note needed, the same reading). Send `hook_id` to keep the verse they kept as Day 1.

Robustness: the reading never fails a request. LLM timeout, error, junk JSON, a junk
note or no LLM key all fall back to a deterministic reading from the chips, the note's
closest situations and the profile. Every LLM statement passes the guardrails in
ai/understanding.py before it is used.

Who they are reaches every step. The reading carries their seat, a paraphrase of their life and
the details they gave (never the note); the request carries their age band, life stages, phone
time and, from Home, their journey so far (week, days opened, verses that helped, earlier
situations). Ranking uses the stage of life and what helped (ai/planner.py) and the reranks see
the person, not just the struggle (ai/llm_rerank.py); every word written for them (the plan's
"What it says" and "For you", "Go deeper") is written from ai/voice.py: the storyteller friend's
voice, and the promise never to change what a verse says.

Privacy: the note is used for this request only (and sent to the LLM for the reading).
It is never stored or logged; only flags, counts and timings are logged.
"""
from __future__ import annotations

import asyncio
import logging
import time
from collections import Counter
from typing import Optional

from fastapi import APIRouter, HTTPException

from ai.depth import DepthCache, cache_key, person_key, write_depth
from ai.personalize import personal_parts
from ai.voice import PersonContext, item_from_card, item_from_library, person_brief
from common.config import settings

from ai.llm_rerank import rerank_hooks, rerank_story
from ai.mechanisms import MECHANISMS
from ai.mechanisms import LEVELS
from ai.planner import get_planner, level_for, parse_shape, week_arc
from ai.recommender import SAFETY, get_recommender
from ai.understanding import Profile, Understanding, check_note, get_understander
from ai.story_titles import hook_title
from common.models import (ArcBeats, BeatVerse, HookRequest, HookResponse, PlanDayOut, PlanInput, PlanRequest,
                           PlanResponse, PlanWeek, PreviewRequest, PreviewResponse, ReplaceRequest, ReplaceResponse, StoryCard,
                           DepthRequest, DepthResponse)

logger = logging.getLogger(__name__)
router = APIRouter()

SAFETY_HARM = {
    "message": "If someone is hurting or threatening you, you deserve to be safe. Please reach out to someone you trust or a helpline.",
    "lines": [
        {"region": "US", "name": "National Domestic Violence Hotline", "contact": "Call 1-800-799-7233 or text START to 88788"},
        {"region": "UK", "name": "National Domestic Abuse Helpline", "contact": "Call 0808 2000 247"},
        {"region": "Australia", "name": "1800RESPECT", "contact": "Call 1800 737 732"},
        {"region": "India", "name": "Women Helpline", "contact": "Call 181"},
        {"region": "Anywhere", "name": "Emergency services", "contact": "Call your local emergency number if you are in danger now"},
    ],
}


def _services():
    try:
        return get_recommender(), get_planner(), get_understander()
    except RuntimeError:
        raise HTTPException(status_code=503, detail="Recommendations are not available right now.")


def _profile(req: PlanInput) -> Profile:
    return Profile(feeling=req.feeling, age=req.age, stages=list(req.stages), phone_hours=req.phone_hours,
                   topic=req.topic, follow=req.follow, note_source=req.note_source)


async def _read(req: PlanInput, und) -> Understanding:
    client = getattr(req, "understanding", None)
    if client:
        d = dict(client)
        if req.note:                       # a note sent alongside can only raise the risk
            chk = check_note(req.note)
            if chk.crisis:
                d["risk"] = "self_harm"
            elif chk.harm and d.get("risk") in (None, "none", "distress"):
                d["risk"] = "harm_from_others"
        u = und.from_client(d)
        if u is not None:
            return _with_profile(u, req)
    u, _ = await und.understand(_profile(req), req.note)
    return _with_profile(u, req)


def _with_profile(u: Understanding, req: PlanInput) -> Understanding:
    """The request's profile is the truth about age and stage (readings saved by older apps have neither)."""
    if req.age:
        u.age = req.age
    if req.stages:
        u.stages = list(req.stages)
    return u


def _helped(req: PlanInput) -> list:
    j = getattr(req, "journey", None)
    return list(j.helped) if j else []


def _ctx(req: PlanInput, u: Understanding, rec, planner, level: str = "situation", week: int = 1) -> PersonContext:
    """The person as every writing prompt and rerank sees them (ai/voice.py)."""
    j = getattr(req, "journey", None)
    helped = []
    for vid in (j.helped if j else [])[-3:]:
        i = planner.idx.get(vid)
        if i is not None and rec.verses[i].get("line"):
            helped.append(rec.verses[i]["line"])
    return PersonContext(
        age=u.age, stages=list(u.stages or []), phone_hours=req.phone_hours, seat=u.seat, life_context=u.life_context,
        details=list(u.details or []), core=u.core_struggle, insight=u.insight, root=MECHANISMS[u.mechanism]["label"],
        situations=[rec.situations[s["id"]]["label"] for s in u.situations[:3] if s["id"] in rec.situations],
        risk=u.risk, level=level, week=week, days_seen=(j.days_seen if j else 0), helped=helped,
        past=[x.strip() for x in (j.past if j else []) if x and x.strip()][:3],
    )


def _safety(u: Understanding) -> Optional[dict]:
    if u.risk == "self_harm":
        return {"kind": "self_harm", "message": SAFETY["message"], "lines": SAFETY["lines"]}
    if u.risk == "harm_from_others":
        return {"kind": "harm_from_others", **SAFETY_HARM}
    return None


def _understanding_out(u: Understanding, rec) -> dict:
    d = u.as_dict()
    d["mechanism_label"] = MECHANISMS[u.mechanism]["label"]
    d["situations"] = [{**s, "label": rec.situations[s["id"]]["label"]} for s in u.situations if s["id"] in rec.situations]
    return d


def _time_left(t0: float) -> float:
    return settings.request_budget_s - (time.perf_counter() - t0)


async def _choose_hook(rec, planner, und, u: Understanding, feeling: str, exclude, t0: float, k: int = 6,
                       person: str = "", helped=()):
    """Embedding top-k hooks (leaning toward what already helped), reordered by the LLM when there is time,
    judged against the whole person (`person`: ai/voice.py person_brief). Returns (indices best first, qvecs,
    hook scores, reranked)."""
    cands, qvecs, scores = await asyncio.to_thread(planner.hook_candidates, u, feeling, exclude, k, helped)
    budget = min(settings.rerank_timeout_s, _time_left(t0) - 1.0)
    if und.llm is None or budget < 1.5 or len(cands) < 2:
        return cands, qvecs, scores, False
    order, ok = await rerank_hooks(und.llm, person or u.core_struggle, [
        {"id": rec.verses[i]["id"], "line": rec.verses[i]["line"], "speaker": rec.verses[i].get("speaker"),
         "listener": rec.verses[i].get("listener"), "setting": rec.verses[i].get("setting")} for i in cands], budget)
    pos = {rec.verses[i]["id"]: i for i in cands}
    return [pos[x] for x in order], qvecs, scores, ok


async def _choose_story(rec, und, u: Understanding, stories: list, t0: float, person: str = ""):
    """Embedding top stories, one picked by the LLM when there is time (same seat, same stage of life).
    Returns (story or None, why or None)."""
    if not stories:
        return None, None
    budget = min(settings.rerank_timeout_s, _time_left(t0) - 0.5)
    if und.llm is None or budget < 1.5 or len(stories) < 2:
        return stories[0], None
    pick, why = await rerank_story(und.llm, person or u.core_struggle, [s["prasang"] for s in stories], budget)
    chosen = next((s for s in stories if s["prasang"]["id"] == pick), stories[0])
    return chosen, why


def _weights(u: Understanding) -> Counter:
    return Counter({s["id"]: float(s["weight"]) for s in u.situations})


def _verse(rec, planner, i: Optional[int], beat: str, score: float, u: Understanding) -> Optional[dict]:
    if i is None:
        return None
    w = _weights(u)
    card = rec._card(rec.verses[i], score, [s["id"] for s in u.situations], w)
    card["beat"] = beat
    card["role_fit"] = planner.roles[rec.verses[i]["id"]][beat]
    return card


def _story(rec, planner, st: Optional[dict], u: Understanding, why: Optional[str] = None) -> Optional[dict]:
    if not st:
        return None
    p = st["prasang"]
    w = _weights(u)
    matched = sorted((s for s in p.get("situations") or [] if w.get(s)), key=lambda s: -w[s])[:2]
    anchor = None
    if st.get("anchor") is not None:
        anchor = rec._card(rec.verses[st["anchor"]], st["score"], [s["id"] for s in u.situations], w)
    return {
        "id": p["id"], "title": p.get("title_en"), "kind": p.get("kind"), "family": p.get("family"),
        "characters": p.get("characters") or [], "story_hook": p.get("story_hook"), "summary": p.get("summary"),
        "lesson": p.get("lesson"), "matched": [{"id": s, "label": rec.situations[s]["label"]} for s in matched],
        "anchor": anchor, "score": st["score"], "why": why,
        "hook_title": hook_title(p["id"]), "teaser": hook_title(p["id"]) or p.get("story_hook") or p.get("title_en"),
    }


async def _personalize(und, u: Understanding, out_days: list, ctx: PersonContext) -> None:
    """Fill `meaning` ("What it says") and `for_you` on every day it can: a few bounded calls in parallel
    for the whole set, grounded in each verse's own source (ai/personalize.py)."""
    items = []
    for d in out_days:
        card = d.get("verse") or d.get("story")
        if card:
            items.append(item_from_card(card, d["beat"]))
    parts = await personal_parts(und.llm, ctx, items, settings.for_you_timeout_s)
    u.flags.extend(ctx.flags)
    for d in out_days:
        card = d.get("verse") or d.get("story")
        got = parts.get(card["id"]) if card else None
        if got:
            card.update(got)
    if items:
        u.flags.append(f"for_you:{sum(1 for p in parts.values() if p.get('for_you'))}/{len(items)}")
        verses = sum(1 for it in items if it.get("kind") != "story")
        if verses:
            u.flags.append(f"meaning:{sum(1 for p in parts.values() if p.get('meaning'))}/{verses}")


def _shape(req) -> str:
    shape = getattr(req, "shape", None) or settings.plan_week_shape
    try:
        parse_shape(shape)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    return shape


def _week(u: Understanding, w: int, shape: str, level=None, n_days: int = 7) -> dict:
    lv = level_for(w, u.risk, level)
    return {"week": w, "title": u.weeks[w - 1] if w <= len(u.weeks) else u.weeks[-1], "level": lv,
            "level_label": LEVELS[lv]["label"], "beats": week_arc(shape)[:max(0, min(7, n_days))]}


def _weeks(u: Understanding, days: int, shape: str) -> list:
    """Titles and shapes of the weeks: all three for the preview, or the ones a `days` plan covers."""
    return [_week(u, w + 1, shape, n_days=days - 7 * w) for w in range(max(1, -(-days // 7)))]


def _log(kind: str, req: PlanInput, u: Understanding, t0: float, **extra):
    logger.info(
        "%s: feeling=%s age=%s stages=%d chips=%s note=%s source=%s quality=%s risk=%s mech=%s conf=%.2f q=%s flags=%s %s %.0fms",
        kind, req.feeling, req.age, len(req.stages), bool(req.topic or req.follow), "yes" if req.note else "no",
        u.source, u.note_quality, u.risk, u.mechanism, u.confidence,
        ",".join(f"{k[0]}:{v[0]}" for k, v in u.query_sources.items()), ",".join(u.flags) or "-",
        " ".join(f"{k}={v}" for k, v in extra.items()), (time.perf_counter() - t0) * 1000,
    )


@router.post("/recommend/hook", response_model=HookResponse, tags=["plan"])
async def hook(req: HookRequest) -> HookResponse:
    """Onboarding: read the person and return the one verse that says "this is you"."""
    rec, planner, und = _services()
    t0 = time.perf_counter()
    u = await _read(req, und)
    t1 = time.perf_counter()
    person = person_brief(_ctx(req, u, rec, planner))
    cands, qvecs, s, reranked = await _choose_hook(rec, planner, und, u, req.feeling, req.exclude, t0, k=max(4, req.alternates + 3),
                                                   person=person, helped=_helped(req))
    hook_i = cands[0] if cands else None
    out = {
        "understanding": _understanding_out(u, rec),
        "hook": _verse(rec, planner, hook_i, "hook", float(s[hook_i]) if hook_i is not None else 0.0, u),
        "alternates": [_verse(rec, planner, i, "hook", float(s[i]), u) for i in cands[1:1 + req.alternates]],
        "safety": _safety(u),
        "matching": "semantic" if planner.semantic else "keywords",
        "library_version": rec.version,
        "library": rec.library_size,
        "timings_ms": {**u.timings_ms, "select": int((time.perf_counter() - t1) * 1000), "total": int((time.perf_counter() - t0) * 1000)},
    }
    if reranked:
        u.flags.append("hook_reranked")
    _log("hook", req, u, t0, hook=bool(out["hook"]), alts=len(out["alternates"]), reranked=reranked)
    return HookResponse(**out)


@router.post("/recommend/preview", response_model=PreviewResponse, tags=["plan"])
async def preview(req: PreviewRequest) -> PreviewResponse:
    """The arc for one person: hook → diagnose → act → story, plus their three week titles."""
    rec, planner, und = _services()
    t0 = time.perf_counter()
    u = await _read(req, und)
    t1 = time.perf_counter()
    person = person_brief(_ctx(req, u, rec, planner))
    pin, qvecs = req.hook_id if req.hook_id in planner.idx else None, None
    if pin is None:
        cands, qvecs, _, _ = await _choose_hook(rec, planner, und, u, req.feeling, req.exclude, t0, person=person, helped=_helped(req))
        pin = rec.verses[cands[0]]["id"] if cands else None
    arc = await asyncio.to_thread(planner.arc, u, req.feeling, req.exclude, pin, 0, qvecs, 5)
    sc = arc["scores"]
    beats = {b: _verse(rec, planner, arc[b], b, float(sc[b][arc[b]]) if arc[b] is not None else 0.0, u)
             for b in ("hook", "diagnose", "steady", "act")}
    story, why = await _choose_story(rec, und, u, arc["stories"], t0, person)
    beats["story"] = _story(rec, planner, story, u, why)
    out = {
        "understanding": _understanding_out(u, rec), "beats": beats, "weeks": _weeks(u, 21, _shape(req)), "safety": _safety(u),
        "matching": "semantic" if planner.semantic else "keywords", "library_version": rec.version,
        "timings_ms": {**u.timings_ms, "select": int((time.perf_counter() - t1) * 1000), "total": int((time.perf_counter() - t0) * 1000)},
    }
    _log("preview", req, u, t0, beats=sum(1 for v in beats.values() if v))
    return PreviewResponse(**out)


@router.post("/recommend/plan", response_model=PlanResponse, tags=["plan"])
async def plan(req: PlanRequest) -> PlanResponse:
    """One week of the plan (`week`: 1 situation, 2 pattern, 3 self), or `days` days from week 1.
    Each week runs see → steady → act → story in the request's shape (default "2221")."""
    rec, planner, und = _services()
    shape = _shape(req)
    first_week = req.week in (None, 1)
    t0 = time.perf_counter()
    u = await _read(req, und)
    t1 = time.perf_counter()
    pin, story_pin = None, None
    person = person_brief(_ctx(req, u, rec, planner))
    if first_week:                        # week 1 keeps the verse they uncovered and the preview's story
        pin = req.hook_id if req.hook_id in planner.idx else None
        if pin is None:
            cands, _, _, _ = await _choose_hook(rec, planner, und, u, req.feeling, req.exclude, t0, person=person, helped=_helped(req))
            pin = rec.verses[cands[0]]["id"] if cands else None
        story_pin = req.story_id
        if story_pin is None:             # the same story the preview would show
            arc = await asyncio.to_thread(planner.arc, u, req.feeling, req.exclude, pin, 0, None, 5)
            st, _ = await _choose_story(rec, und, u, arc["stories"], t0, person)
            story_pin = st["prasang"]["id"] if st else None
    days = await asyncio.to_thread(planner.plan, u, req.feeling, req.days, req.exclude, pin, story_pin,
                                   req.week, req.level, shape, [f.model_dump() for f in req.feedback], _helped(req))
    if u.risk == "harm_from_others" and (req.days > 7 or (req.week or 1) > 1):
        u.flags.append("plan_kept_gentle_for_safety")
    out_days = []
    for d in days:
        base = {k: d[k] for k in ("day", "day_in_week", "week", "level", "phase", "beat")}
        if d["beat"] == "story":
            out_days.append({**base, "story": _story(rec, planner, d["story"], u)})
        else:
            out_days.append({**base, "verse": _verse(rec, planner, d["verse_index"], d["beat"], d["score"], u)})
    lv0 = out_days[0]["level"] if out_days else level_for(req.week or 1, u.risk, req.level)
    await _personalize(und, u, out_days, _ctx(req, u, rec, planner, lv0, req.week or 1))
    weeks = ([_week(u, req.week, shape, req.level)] if req.week
             else _weeks(u, len(out_days) or req.days, shape))
    out = {
        "understanding": _understanding_out(u, rec), "days": out_days, "weeks": weeks, "safety": _safety(u),
        "matching": "semantic" if planner.semantic else "keywords", "library_version": rec.version,
        "timings_ms": {**u.timings_ms, "select": int((time.perf_counter() - t1) * 1000), "total": int((time.perf_counter() - t0) * 1000)},
    }
    _log("plan", req, u, t0, days=len(out_days), week=req.week or 0, level=out_days[0]["level"] if out_days else "-", shape=shape)
    return PlanResponse(**out)


@router.post("/recommend/replace", response_model=ReplaceResponse, tags=["plan"])
async def replace(req: ReplaceRequest) -> ReplaceResponse:
    """"Not for me" on Day 1 of a week: another verse for the day, from the same reading, never one
    shown before or still to come in the plan, shifted by what they said (and said before)."""
    rec, planner, und = _services()
    shape = _shape(req)
    t0 = time.perf_counter()
    u = await _read(req, und)
    t1 = time.perf_counter()
    got = await asyncio.to_thread(planner.replace_first, u, req.feeling, req.week, req.exclude, req.verse_id, req.reason,
                                  [f.model_dump() for f in req.feedback], req.upcoming, req.level, shape, _helped(req))
    verse = None
    if got:
        verse = _verse(rec, planner, got["verse_index"], got["beat"], got["score"], u)
        day = [{"day": 1, "beat": got["beat"], "verse": verse}]
        await _personalize(und, u, day, _ctx(req, u, rec, planner, got["level"], req.week))
    lv = got["level"] if got else level_for(req.week, u.risk, req.level)
    beat = got["beat"] if got else week_arc(shape)[0]
    out = {"verse": verse, "week": req.week, "level": lv, "beat": beat,
           "timings_ms": {**u.timings_ms, "select": int((time.perf_counter() - t1) * 1000), "total": int((time.perf_counter() - t0) * 1000)}}
    _log("replace", req, u, t0, week=req.week, reason=req.reason, found=bool(verse))
    return ReplaceResponse(**out)


@router.post("/recommend/depth", response_model=DepthResponse, tags=["plan"])
async def depth(req: DepthRequest) -> DepthResponse:
    """"Go deeper" on a plan day: what this verse asks of this person (ai/depth.py). Cached per
    verse and reading; anything that fails its check is left out and the app keeps the library."""
    rec, planner, und = _services()
    t0 = time.perf_counter()
    u = await _read(req, und)
    if req.verse_id:
        v = next((x for x in rec.verses if x["id"] == req.verse_id), None)
        if v is None:
            raise HTTPException(status_code=404, detail="Unknown verse")
        item = item_from_library(v, rec.prasangs.get(v.get("prasang_id") or ""), req.beat)
    elif req.story_id:
        p = rec.prasangs.get(req.story_id)
        if p is None:
            raise HTTPException(status_code=404, detail="Unknown story")
        item = item_from_library(None, p, "story")
        members = planner.prasang_verses.get(p["id"]) or []
        if members:                       # a line from the story, so the depth can quote the text itself
            item["line"] = rec.verses[members[0]].get("line")
    else:
        raise HTTPException(status_code=400, detail="Send verse_id or story_id")
    lv = level_for(req.week, u.risk)
    ctx = _ctx(req, u, rec, planner, lv, req.week)
    key = cache_key(item["id"], item["beat"], lv, u.core_struggle, u.mechanism, person_key(ctx))
    cache = DepthCache(settings.depth_cache_dir)
    got = cache.get(key)
    cached = got is not None
    if not cached:
        got = await write_depth(und.llm, ctx, item, req.for_you, settings.depth_timeout_s)
        if len(got) >= 3:                 # keep only a good set; a thin one is asked again next time
            cache.put(key, got)
    _log("depth", req, u, t0, parts=len(got), cached=cached)
    return DepthResponse(depth=got, cached=cached, timings_ms={"total": int((time.perf_counter() - t0) * 1000)})

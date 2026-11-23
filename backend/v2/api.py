"""
v2 API: the plan backend rebuilt one function at a time, on the raw onboarding inputs.

    POST /api/v2/hook    age, stages, feeling, note, ai  ->  Day 1 verse, alternates, the graph path behind it
    POST /api/v2/day1    age, stages, feeling, note, ai  ->  a prebuilt plan, its Day 1 verse, what it means for them,
                                                         its meaning told for them, and its Listen script
    POST /api/v2/day     the same + plan, day, previous   ->  that day's verse (or story) and what it means for them

Every response carries prompt_version and plans_version (v2/plans.py), so production behaviour traces to a release.

How /hook picks the verse (graph-seeded):
    1. seeds   Sarvam reads the person and names 1-3 states from the graph, each with the words that show it
    2. paths   from each seed, walk the graph to verses: verses that show / name / heal the state,
               verses about its root (rooted_in, causes), and verses in a chain that runs through it
    3. shortlist  best path per verse, safety and audience filters, one per prasang, top 12
    4. rank    Sarvam scores the 12 (shuffled) for this person; the best goes out, the next two are alternates
"""

from __future__ import annotations

import asyncio
import functools
import logging
import random
import time
from collections import defaultdict
from typing import Dict, List, Optional, Tuple

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

from ai import consent, plan_graph as pg, plan_v3 as V
from ai.harness_v2.vocab import AGE_PHRASE, EMOTIONS, STAGE_PHRASE
from ai.embedder import get_embedder
from ai.recommender import SAFETY, get_recommender
from ai.understanding import SAFE_MIRROR
from common.models import AgeBand, LifeStage, PlanSafety, RecommendedVerse, StoryCard
from server.narration import clean_parts
from server.plan import SAFETY_HARM
from v2 import plans as PL

router = APIRouter(tags=["v2"])
logger = logging.getLogger("v2")
E = rec = None  # the v3 engine and the recommender, set once by init()
STATES: Dict[str, str] = {}  # state id -> its plain English ("kama" -> "Craving, compulsive wanting")
CHAINS: Dict[str, List[str]] = defaultdict(list)  # state id -> chains that run through it

# With any risk in the note, never these verses (labels in data/plan_v3)
RISKY = {"mortality", "self_harm_adjacent", "violence", "reproach", "blames_self", "fatalism_risk",
         "invalidates_fear", "counsels_endurance"}

# How a verse reaches a state, and how much that path counts. Showing the state counts most.
VERSE_EDGES = {"depicts": (1.0, "shown in"), "locus_of": (0.9, "named in"), "heals": (0.7, "healed by"),
               "cultivates": (0.4, "grown by")}
ROOT_HOP = 0.7  # a verse about the seed's root counts 0.7 of one about the seed
CHAIN_HOP = 0.85  # a verse in a chain that runs through the seed
MULTI_SEED = 0.3  # bonus for each extra seed that reaches the same verse
SHORTLIST = 12

SEED_PROMPT = """You read one person and name the inner states the Hindu scriptures would see in them.

Choose 1 to 3 states from the list, most important first. For each, give "quote": the exact words from their note that show it. If they wrote no note, quote their feeling word.
Also give "risk": "self_harm" if they speak of ending their life or hurting themselves, "harm_from_others" if someone is hurting them, else "none".

Return JSON: {"seeds": [{"state": "<id>", "quote": "<their words>"}], "risk": "none"}"""

RANK_PROMPT = """You choose the first verse of a reading plan for one person.

Each verse came from the person's inner states through a path in a knowledge graph. Score every verse from 0 to 3:
3 = they would read it and feel "that is exactly what I am going through"
2 = clearly speaks to them
1 = loosely related
0 = off, or could hurt them
Judge each verse on its own; the order of the list means nothing.

Return JSON: {"scores": {"<id>": <0-3>, ...}}"""


def init() -> None:
    """Called once at server start (main.py lifespan), after init_recommender."""
    global E, rec
    E, rec = V.engine(), get_recommender()
    for k, n in E.G.N.items():
        if n.get("type") == "state":
            STATES[k[6:]] = n.get("modern") or n.get("label") or k[6:]
        elif n.get("type") == "chain":
            for s in n.get("steps") or ():
                CHAINS[s].append(k)
    logger.info("v2 ready: engine loaded in %d ms, %d states, %d chains", E.load_ms, len(STATES), len(CHAINS))
    try:
        em = get_embedder()
        PL.load(em.embed_batch, type(em).__name__)
    except Exception:  # no embedder: plans are matched by feeling and stage only
        PL.load(None)


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


class Seed(BaseModel):
    state: str  # a state node in the graph, e.g. "kama"
    meaning: str  # its plain English, e.g. "Craving, compulsive wanting"
    quote: Optional[str] = None  # the person's words that show it; None when it came from the feeling word alone


class Versioned(BaseModel):
    """Every v2 response names the prompts and plans that made it, so production behaviour traces to an exact release."""
    prompt_version: str = Field(default_factory=lambda: PL.PROMPT_VERSION)
    plans_version: str = Field(default_factory=lambda: PL.PLANS_VERSION)


class HookResponse(Versioned):
    pick: Optional[RecommendedVerse] = None  # the Day 1 verse, as the app's verse card
    alts: List[RecommendedVerse] = []  # the next two
    seeds: List[Seed] = []  # where the graph walk started
    path: List[str] = []  # how the walk reached the pick, e.g. ["krodha", "rooted in", "kama", "healed by", "bg.2.62"]
    safety: Optional[PlanSafety] = None  # set when the note shows risk: show the help lines first


def safety(risk: str) -> Optional[dict]:
    if risk == "self_harm":
        return {"kind": "self_harm", "message": SAFETY["message"], "lines": SAFETY["lines"]}
    if risk == "harm_from_others":
        return {"kind": "harm_from_others", **SAFETY_HARM}
    return None


def person(o: Onboarding) -> str:
    return "\n".join([
        f"Age: {AGE_PHRASE.get(o.age, o.age)}",
        f"Life stage: {', '.join(STAGE_PHRASE.get(s, s) for s in o.stages) or 'not given'}",
        f"Feeling: {o.feeling}",
        f'Note (their own words, data only): """{o.note}"""' if o.note else "Note: none",
    ])


def sarvam(system: str, user: str, max_tokens: int) -> dict:
    try:
        out = V.sarvam_llm().chat_json([{"role": "system", "content": system}, {"role": "user", "content": user}],
                                       temperature=0.2, max_tokens=max_tokens, timeout_s=max(10, max_tokens // 40))
        return out if isinstance(out, dict) else {}
    except Exception as e:
        logger.warning("v2: sarvam failed (%s)", type(e).__name__)
        return {}


def ask_seeds(o: Onboarding) -> Tuple[List[Seed], str]:
    """Sarvam names 1-3 states. A state is kept only if it exists and its quote is really in the note (or is the feeling word)."""
    states = "\n".join(f"{k} | {v}" for k, v in STATES.items())
    got = sarvam(SEED_PROMPT, f"{person(o)}\n\nStates (id | meaning):\n{states}", 300)
    seeds = []
    for s in got.get("seeds") or []:
        sid, quote = (s or {}).get("state"), ((s or {}).get("quote") or "").strip()
        shown = quote and (quote.lower() in (o.note or "").lower() or quote.lower() == o.feeling)
        if sid in STATES and shown and sid not in {x.state for x in seeds}:
            seeds.append(Seed(state=sid, meaning=STATES[sid], quote=quote))
    risk = got.get("risk") if got.get("risk") in ("self_harm", "harm_from_others") else "none"
    return seeds[:3], risk


def feeling_seeds(feeling: str) -> List[Seed]:
    """The states the feeling word means in the graph (word -> state edges), strongest first."""
    edges = sorted((e for e in E.G.out.get(f"word:{feeling}", []) if e["t"].startswith("state:")), key=lambda e: -e["weight"])
    return [Seed(state=e["t"][6:], meaning=STATES[e["t"][6:]]) for e in edges if e["t"][6:] in STATES][:3]


def walk(seeds: List[Seed]) -> Dict[str, Tuple[float, List[str]]]:
    """Every verse the seeds reach, with its best path and score."""
    best: Dict[str, Tuple[float, List[str]]] = {}
    reached = defaultdict(set)

    def add(vid, score, path, seed):
        if vid not in E.verses:
            return
        reached[vid].add(seed)
        if vid not in best or score > best[vid][0]:
            best[vid] = (score, path)

    for i, seed in enumerate(seeds):
        w, s = 1.0 - 0.2 * i, seed.state  # the first seed counts most
        roots = {e["t"][6:] for e in E.G.out.get(f"state:{s}", []) if e["rel"] == "rooted_in"}
        roots |= {e["s"][6:] for e in E.G.inn.get(f"state:{s}", []) if e["rel"] == "causes" and e["s"].startswith("state:")}
        for target, hop, lead in [(s, 1.0, [s])] + [(r, ROOT_HOP, [s, "rooted in", r]) for r in roots if r in STATES]:
            for e in E.G.inn.get(f"state:{target}", []):
                if e["rel"] in VERSE_EDGES:
                    prior, verb = VERSE_EDGES[e["rel"]]
                    add(e["s"], w * hop * prior * e.get("weight", 0.5), lead + [verb, e["s"]], s)
        for chain in CHAINS.get(s, []):
            for e in E.G.inn.get(chain, []):
                if e["rel"] == "states_chain":
                    add(e["s"], w * CHAIN_HOP * e.get("weight", 0.5), [s, "in the chain", E.G.N[chain].get("title", chain), e["s"]], s)

    return {v: (sc + MULTI_SEED * (len(reached[v]) - 1), p) for v, (sc, p) in best.items()}


def shortlist(scored: Dict[str, Tuple[float, List[str]]], stages: List[str], risk: str) -> List[str]:
    """Best paths first; drop verses not for their life stage or unsafe for a note with risk; one per prasang, three per text."""
    aud = set().union(*(pg.STAGE_SPEAKS.get(s, set()) for s in stages))
    out, prasangs, texts = [], set(), defaultdict(int)
    for vid in sorted(scored, key=lambda v: -scored[v][0]):
        n, v = E.G.N.get(vid) or {}, E.verses[vid]
        if set(n.get("not_for") or ()) & aud:
            continue
        if risk != "none" and (vid in pg.RISK_NEVER or any((n.get("flags") or {}).get(f) for f in RISKY)):
            continue
        p, fam = v.get("prasang_id"), v.get("family")
        if (p and p in prasangs) or texts[fam] >= 3:
            continue
        out.append(vid)
        prasangs.add(p)
        texts[fam] += 1
        if len(out) == SHORTLIST:
            break
    return out


def ask_rank(o: Onboarding, ids: List[str], scored) -> Dict[str, int]:
    """Sarvam scores every verse 0-3 for this person. The list is shuffled so its order can't decide."""
    order = random.sample(ids, len(ids))
    lines = "\n".join(f"{v} | path: {' → '.join(scored[v][1][:-1])} | says: {E.verses[v].get('line')}" for v in order)
    got = sarvam(RANK_PROMPT, f"{person(o)}\n\nVerses (id | path | what it says):\n{lines}", 400).get("scores") or {}
    return {v: int(got[v]) for v in ids if isinstance(got.get(v), (int, float))}


@router.post("/hook")
@timed
async def hook(o: Onboarding) -> HookResponse:
    """Day 1: Sarvam names the person's states, the graph walks from them to verses, Sarvam ranks the best paths."""
    consent.set_allowed(o.ai)  # every LLM client refuses when off (ai/consent.py)
    risk = V.det_risk(o.note)  # our regexes, read locally even without consent
    use_model = o.ai and risk != "self_harm"

    seeds, model_risk = [], "none"
    if use_model:
        seeds, model_risk = await asyncio.to_thread(ask_seeds, o)
    risk = V.higher_risk(risk, model_risk)  # the model can raise the risk, never lower it
    seeds = seeds or feeling_seeds(o.feeling)

    scored = walk(seeds)
    ids = shortlist(scored, o.stages, risk)
    ranks = {}
    if use_model and risk != "self_harm" and ids:
        ranks = await asyncio.to_thread(ask_rank, o, ids, scored)
    consoling = lambda v: risk == "self_harm" and (E.G.N.get(v) or {}).get("move") == "consoles"
    ids = sorted(ids, key=lambda v: (-consoling(v), -ranks.get(v, 0), -scored[v][0]))  # Sarvam's score, then the path's
    logger.info("hook seeds=%s risk=%s ranked=%s", [s.state for s in seeds], risk, [(v, ranks.get(v)) for v in ids[:5]])

    card = lambda vid, score: V.verse_card(E, rec, vid, "hook", score, [])
    pick = ids[0] if ids else None
    return HookResponse(
        pick=card(pick, 1.0) if pick else None,
        alts=[c for c in (card(a, 0.5) for a in ids[1:3]) if c],
        seeds=seeds,
        path=scored[pick][1] if pick else [],
        safety=safety(risk),
    )



class PlanDayOut(BaseModel):
    day: int
    job: str  # see | why | steady | act | story
    heading: Optional[str] = None
    verse: Optional[str] = None  # library verse id
    story: Optional[str] = None  # the story's title, on Day 7


class PlanOut(BaseModel):
    slug: str
    title: str
    reviewed: bool  # False for plans drafted on 19 Nov and not yet reviewed
    days: List[PlanDayOut]


class ScriptPart(BaseModel):
    kind: str  # open | scene | sanskrit | line | unpack | for_you | close, as /api/v1/narration's segments
    text: str


class Candidate(BaseModel):
    slug: str
    score: float  # match score: raw similarity + feeling prior


class Day1Response(Versioned):
    plan: Optional[PlanOut] = None  # None when no plan fits and the graph walk chose the verse
    verse: Optional[RecommendedVerse] = None  # Day 1, as the app's verse card
    reading: Optional[str] = None  # what the verse means for them today
    reading_source: str = "none"  # model | reviewed | safety | none
    today: Optional[str] = None  # the plan's reviewed "one thing for today" for this verse (web plans only)
    meaning: Optional[str] = None  # what the verse says, told for them from their note (with AI consent)
    script: List[ScriptPart] = []  # the Listen script in spoken order; the Sanskrit and the plain line are the library's
    script_source: str = "none"  # model | composed (from the library and the screen's words) | none (safety plans)
    chosen_by: str  # model | top_match | risk | graph
    candidates: List[str] = []  # plans considered, best match first
    candidate_scores: List[Candidate] = []  # the same plans with their match scores
    confidence: Optional[float] = None  # the closest plan's raw similarity, before priors (plans.confidence); None when risk decided
    none_fits: bool = False  # no plan fits their note (Sarvam said none, or confidence < plans.NONE_FITS): the graph walk chose Day 1
    safety: Optional[PlanSafety] = None  # set when the note shows risk: show the help lines first


def plan_out(p: dict, day1_verse: Optional[str] = None) -> PlanOut:
    """The plan for the app. day1_verse: the verse Day 1 actually showed, when Sarvam chose one of the alternates."""
    def story_title(d):
        st = d.get("story") or {}
        return st.get("title") or (E.stories.get(st.get("id")) or E.G.N.get(st.get("id")) or {}).get("title")
    return PlanOut(slug=p["slug"], title=p["title"], reviewed=p["reviewed"],
                   days=[PlanDayOut(day=d["day"], job=d["job"], heading=d.get("heading"), verse=(day1_verse if d["day"] == 1 and day1_verse else d.get("verse")),
                                    story=story_title(d) if d.get("story") else None) for d in p["days"]])


@router.post("/day1")
@timed
async def day1(o: Onboarding) -> Day1Response:
    """Day 1 from a prebuilt plan: match the person to a plan, Sarvam confirms it, picks the Day 1 verse and writes its reading."""
    consent.set_allowed(o.ai)
    risk = V.det_risk(o.note)  # our regexes, read locally even without consent
    ranked, chosen_by, slug, conf, none_fits = [], "risk", None, None, False
    if risk == "none":
        sims = await asyncio.to_thread(PL.similarity, o)
        ranked = PL.match(o, sims=sims)
        conf = PL.confidence(sims, ranked)
        if o.ai and o.note:  # with no note Sarvam knows no more than the match did
            slug, why, model_risk = await asyncio.to_thread(PL.select, o, ranked, sarvam)
            risk, chosen_by = V.higher_risk(risk, model_risk), "model"
            # Sarvam is asked even when the closest plan is far, for the risk it may see
            none_fits = slug is None or (conf is not None and conf < PL.NONE_FITS)
            slug = None if none_fits else slug
        else:
            slug, chosen_by = ranked[0][1], "top_match"
    if risk in PL.SAFETY_PLAN:
        slug, chosen_by, none_fits = PL.SAFETY_PLAN[risk], "risk", False

    plan = PL.BY_SLUG.get(slug)
    if plan is not None:
        aud = set().union(*(pg.STAGE_SPEAKS.get(s, set()) for s in o.stages))
        options = [v for v in PL.day1_options(plan) if not set((E.G.N.get(v) or {}).get("not_for") or ()) & aud] or PL.day1_options(plan)[:1]
    else:  # Sarvam found no plan that fits: the graph walk chooses the verses
        chosen_by = "graph"
        walked = await hook(o)
        options = [c.id for c in [walked.pick, *walked.alts] if c]

    if not options:
        vid, reading, source = None, None, "none"
    elif plan is not None and plan["profile"]["safety"]:  # safety plans are never written by a model
        vid, reading, source = options[0], SAFE_MIRROR[plan["profile"]["safety"]], "safety"
    elif o.ai:
        vid, reading, source = await asyncio.to_thread(PL.day1, o, plan, options, E, sarvam)
    else:
        vid, reading = options[0], PL.reviewed_words(plan, options[0])
        source = "reviewed" if reading else "none"
    meaning, script, script_source = None, [], "none"
    if vid and not (plan is not None and plan["profile"]["safety"]):  # someone at risk gets no written script
        meaning, parts, script_source = await asyncio.to_thread(PL.listen, o, plan, vid, reading, E, sarvam)
        script = [ScriptPart(kind=k, text=t) for k, t in clean_parts(parts)]
    logger.info("day1 plan=%s by=%s risk=%s conf=%s none_fits=%s verse=%s reading=%s script=%s top=%s", slug, chosen_by, risk, conf,
                none_fits, vid, source, script_source, [s for _, s in ranked[:4]])
    return Day1Response(
        plan=plan_out(plan, vid) if plan else None,
        verse=V.verse_card(E, rec, vid, "hook", 1.0, []) if vid else None,
        reading=reading,
        reading_source=source,
        today=next((d.get("today") for d in (plan or {}).get("days", []) if d.get("verse") == vid), None),
        meaning=meaning, script=script, script_source=script_source,
        chosen_by=chosen_by,
        candidates=[s for _, s in ranked[:PL.TOP]],
        candidate_scores=[Candidate(slug=s, score=round(x, 4)) for x, s in ranked[:PL.TOP]],
        confidence=conf, none_fits=none_fits,
        safety=safety(risk),
    )


# ── /day: days 2-7 ───────────────────────────────────────────────────────────────
class DayRequest(Onboarding):
    plan: str  # the slug /day1 returned
    day: int = Field(ge=2, le=7)
    previous: List[str] = Field(default_factory=list, max_length=6)  # verse ids shown on the days before, Day 1 first


class DayResponse(Versioned):
    day: int
    job: str  # see | why | steady | act | story
    heading: Optional[str] = None
    verse: Optional[RecommendedVerse] = None
    story: Optional[StoryCard] = None  # on the story day
    reading: Optional[str] = None  # what it means for them today
    reading_source: str = "none"  # model | reviewed | none
    today: Optional[str] = None  # the plan's reviewed "one thing for today" (web plans only)
    safety: Optional[PlanSafety] = None


JOB_BEAT = {"see": "hook", "why": "diagnose", "steady": "steady", "act": "act"}


def story_out(plan: dict, d: dict) -> Optional[StoryCard]:
    st = d.get("story")
    if not st:
        return None
    if st.get("id"):  # one of the library's stories
        card = V.story_card(E, st["id"], 1.0)
        return StoryCard(**card) if card else None
    return StoryCard(id=f"{plan['slug']}.day{d['day']}", title=st.get("title"), summary=st.get("body"), lesson=st.get("lesson"), score=1.0)


@router.post("/day")
@timed
async def day(r: DayRequest) -> DayResponse:
    """Days 2-7 of a plan: the day's own verse or story, and what it means for this person after the days before it."""
    plan = PL.BY_SLUG.get(r.plan)
    d = next((x for x in plan["days"] if x["day"] == r.day), None) if plan else None
    if d is None:
        raise HTTPException(404, f"no day {r.day} in plan {r.plan!r}")
    vid = d.get("verse")
    if vid and vid in r.previous:  # Day 1 took this day's verse as its alternate: show the Day 1 verse it replaced
        vid = next((v for v in PL.day1_options(plan) if v not in r.previous), vid)
        src = next((x for x in plan["days"] if x.get("verse") == vid), {})
        d = {**d, "verse": vid, "heading": src.get("heading") or d.get("heading"), "for_you": src.get("for_you"), "today": src.get("today")}
    consent.set_allowed(r.ai)
    risk = plan["profile"]["safety"] or V.det_risk(r.note)
    if r.ai and risk == "none":
        reading, source = await asyncio.to_thread(PL.day_reading, r, plan, d, r.previous, E, sarvam)
    else:  # no consent, or someone at risk: never written by a model
        reading, source = d.get("for_you"), "reviewed" if d.get("for_you") else "none"
    logger.info("day %d plan=%s verse=%s reading=%s", r.day, r.plan, d.get("verse") or (d.get("story") or {}).get("id"), source)
    return DayResponse(
        day=d["day"], job=d["job"], heading=d.get("heading"),
        verse=V.verse_card(E, rec, d["verse"], JOB_BEAT[d["job"]], 1.0, []) if d.get("verse") else None,
        story=story_out(plan, d),
        reading=reading, reading_source=source, today=d.get("today"), safety=safety(risk),
    )

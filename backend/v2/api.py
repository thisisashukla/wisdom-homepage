"""
v2 API: the plan backend rebuilt one function at a time, on the raw onboarding inputs.

    POST /api/v2/hook    age, stages, feeling, note, ai  ->  Day 1 verse, alternates, the graph path behind it

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

from fastapi import APIRouter
from pydantic import BaseModel, Field, field_validator

from ai import consent, plan_graph as pg, plan_v3 as V
from ai.harness_v2.vocab import AGE_PHRASE, EMOTIONS, STAGE_PHRASE
from ai.recommender import SAFETY, get_recommender
from common.models import AgeBand, LifeStage, PlanSafety, RecommendedVerse
from server.plan import SAFETY_HARM

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


class HookResponse(BaseModel):
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
                                       temperature=0.2, max_tokens=max_tokens, timeout_s=10)
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

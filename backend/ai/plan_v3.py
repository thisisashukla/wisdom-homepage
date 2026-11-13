"""
plan_v3.py: the graph planner behind PLAN_ENGINE=v3 (plan engine v3, phase 2, 13 Nov 2026).

Unset (the default) changes nothing: server/plan.py only calls in here when `enabled()` is true.

Day 1 (/recommend/hook)
    1. deterministic: risk from the note regexes (ai/understanding.check_note and harness_v2's CRISIS/HARM), stance and
       states from the words, trail and note (harness_v2.build_person_brief), note situations (the existing note matcher,
       bounded), the existing deterministic reading (Understander._fallback) for the fields the app already reads.
    2. candidates: pools.lookup(kept word, paused word, stance, age, stage) -> 8, plus graph day1_pool on the note's
       situations (and always for a wronged reader: the whole library, not only the Gita).
    3. consent: ONE compact Sarvam call (ai/fast_read.py) reads stance and states and proposes a pick, deadline 3.5 s.
       PLAN_V3_FASTREAD=fixed (default): risk is never raised by fast_read (regex only); its pick is re-gated by the graph
       (query.gate for Day 1 with the final reading) and harness_v2.fit_guard; the graph's first allowed candidate is
       always the fallback; the line comes from harness_v2.first_line (streamed, checked).
       PLAN_V3_FASTREAD=raw: fast_read exactly as built in phase 1 (its risk, its validate() pick, its line). Eval only.
    4. no consent: no model at all; graph pick, harness_v2 chip line.
Week (/recommend/plan, /recommend/preview)
    plan_graph.Graph.week() from the reading carried in understanding.plan_v3; each day's path, whys, guard and
    writer_note become the VerseBrief's `why` and `edge`; harness_v2.personal_layer writes for_you, practice and
    scene_line (at most 4 calls at once). Self-harm: no model is called; the safety card leads.
Response schema: the app's models (common/models.py) plus optional fields that are absent unless set.
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Dict, List, Optional, Sequence, Tuple

from ai import fast_read as fr
from ai import plan_graph as pg

logger = logging.getLogger(__name__)

BACKEND = Path(__file__).resolve().parents[1]
DATA = Path(os.environ.get("PLAN_V3_DATA") or BACKEND / "data" / "plan_v3")
LIB3 = Path(os.environ.get("PLAN_V3_LIBRARY") or BACKEND / "data" / "taxonomy" / "wisdom_library.v3.json")

SLOT_BEAT = {"D1_see_name": ("hook", "see"), "D2_see_why": ("diagnose", "see"), "D3_steady_ground": ("steady", "steady"),
             "D4_steady_reframe": ("steady", "steady"), "D5_act_today": ("act", "act"), "D6_act_hard_moment": ("act", "act"),
             "D7_story": ("story", "story")}
LEVEL_BY_WEEK = {1: "situation", 2: "pattern", 3: "self"}
RISK_ORDER = ["none", "distress", "harm_from_others", "self_harm"]
FAST_READ_DEADLINE_S = float(os.environ.get("PLAN_V3_DAY1_DEADLINE_S", "3.5"))
DAY1_BUDGET_S = float(os.environ.get("PLAN_V3_DAY1_BUDGET_S", "5.5"))
NOTE_MATCH_S = 0.8
PERSONAL_CONCURRENCY = int(os.environ.get("PLAN_V3_WRITERS", "4"))
PERSONAL_TIMEOUT_S = float(os.environ.get("PLAN_V3_PERSONAL_TIMEOUT_S", "8"))
WRITE_BUDGET_S = float(os.environ.get("PLAN_V3_WRITE_BUDGET_S", "16"))     # r4: retries and swaps stop here

# ── r4 (13 Nov, after the blind Opus judge) ──────────────────────────────────
import re as _re
# note cues that only ever RESTRICT what is served (they never add a theme the person did not write)
LAYOFF_RE = _re.compile(r"\b(laid off|lay-?off|let (me|him|her|us) go|fired|sacked|terminated|lost (my|his|her|our) (job|work)|retrench\w*|job loss)\b", _re.I)
ILLNESS_RE = _re.compile(r"\b(chemo\w*|cancer|tumou?r|icu|hospital\w*|surgery|diagnos\w*|dialysis|stroke|ventilator)\b", _re.I)
CASTE_RE = _re.compile(r"\b(caste\w*|varna|jati|dalit|untouchab\w*|low[- ]born|outcaste)\b", _re.I)
DIAG_MOVES = {"explains_cause", "warns", "rebukes"}
SOFT_MOVES = {"names_pain", "normalizes", "consoles", "gives_ground", "reframes", "affirms", "enacts", "promises"}   # what a swap may bring in
RESOLVE_RE = _re.compile(r"\b(decide|begin|start|stall\w*|halfway|don'?t stop|keep going|resolve|persist\w*|never give up|give up|finish|see it through|push on)\b", _re.I)
MED_NOTE = ("The person mentioned medication, detox or treatment. This verse is about resolve or not stopping: apply it only to the other parts "
            "of their life they named, never to their medication or treatment. Never imply a medical decision, a pace or a deadline for one.")


def note_cues(note: Optional[str]) -> Dict[str, object]:
    """r4: restriction-only cues from the note: layoff (a real threat the matcher missed), illness (threat), caste raised, health."""
    from ai.harness_v2.briefs import HEALTH_RE
    n = note or ""
    return {"layoff": bool(LAYOFF_RE.search(n)), "threat": bool(LAYOFF_RE.search(n) or ILLNESS_RE.search(n)),
            "caste_ok": bool(CASTE_RE.search(n)), "health": bool(HEALTH_RE.search(n))}


def graph_flags(rd: dict) -> List[str]:
    return [f for f in ("caste_ok", "health") if rd.get(f)]


def resolve_verse(E: "Engine", vid: str) -> bool:
    n = E.G.v(vid)
    return bool(RESOLVE_RE.search(" ".join(str(n.get(k) or "") for k in ("line", "claim")))) or \
        any(e["rel"] == "cultivates" and e["t"] in ("state:sankalpa", "state:dhriti") and e.get("src") == "shard" for e in E.G.out.get(vid, ()))


def enabled() -> bool:
    return os.environ.get("PLAN_ENGINE", "").strip().lower() == "v3"


def fast_read_mode() -> str:
    return "raw" if os.environ.get("PLAN_V3_FASTREAD", "").strip().lower() == "raw" else "fixed"


def higher_risk(a: str, b: str) -> str:
    a = a if a in RISK_ORDER else "none"
    b = b if b in RISK_ORDER else "none"
    return a if RISK_ORDER.index(a) >= RISK_ORDER.index(b) else b


class Engine:
    """Everything v3 reads from disk, loaded once per warm function (about 0.3 s)."""

    def __init__(self, data: Path = DATA, library: Path = LIB3):
        t = time.perf_counter()
        from ai.harness_v2.briefs import load_labels
        from ai.harness_v2.static_layer import StaticStore
        self.G = pg.Graph(str(data / "wisdom_graph.json"))
        self.pools = pg.load_pools(str(data / "pools.json"))
        lib = json.load(open(library))
        self.verses = {v["id"]: v for v in lib["verses"]}
        self.prasangs = {p["id"]: p for p in lib["prasangs"]}
        self.labels = load_labels(data / "labels")
        self.stories: Dict[str, dict] = {}
        for f in sorted((data / "stories").glob("*.jsonl")):
            for line in f.read_text(encoding="utf-8").splitlines():
                if line.strip():
                    r = json.loads(line)
                    self.stories[r["id"]] = r
        self.static = StaticStore(data / "static_draft.json")
        self.load_ms = int((time.perf_counter() - t) * 1000)


_ENGINE: Optional[Engine] = None
_LOCK = threading.Lock()


def engine() -> Engine:
    global _ENGINE
    with _LOCK:
        if _ENGINE is None:
            _ENGINE = Engine()
    return _ENGINE


def set_engine(e: Optional[Engine]) -> None:
    global _ENGINE
    _ENGINE = e


def sarvam_llm(fallback=None):
    """Sarvam is the only provider for anything a person reads (Ankur). Tests pass a fake through `fallback`."""
    try:
        from ai.sarvam import get_sarvam
        return get_sarvam()
    except Exception:
        return fallback


# ── inputs ────────────────────────────────────────────────────────────────────
def taps(req) -> Tuple[Optional[str], List[str], Optional[str]]:
    """(kept word, tap trail ending on the kept word, the paused word the pools key on)."""
    from ai.harness_v2.vocab import EMOTIONS, NEED_DEFAULT_EMOTION
    c = getattr(req, "client", None)
    kept = getattr(c, "emotion", None) if c else None
    kept = kept if kept in EMOTIONS else NEED_DEFAULT_EMOTION.get(getattr(req, "feeling", None) or "")
    trail = [w for w in (getattr(c, "emotion_trail", None) or [] if c else []) if w in EMOTIONS]
    if kept and (not trail or trail[-1] != kept):
        trail = trail + [kept]
    paused = next((w for w in reversed(trail[:-1]) if w != kept), None)
    return kept, trail[-6:], paused


def _consented(req) -> bool:
    return bool(getattr(req, "ai", True))


def person_brief(req, reading: Optional[dict] = None, consent: Optional[bool] = None):
    from ai.harness_v2.briefs import build_person_brief
    kept, _, _ = taps(req)
    ok = _consented(req) if consent is None else consent
    return build_person_brief(feeling=req.feeling, emotion=kept, age=req.age, stages=list(req.stages or []),
                              topic=getattr(req, "topic", None), follow=getattr(req, "follow", None),
                              note=getattr(req, "note", None), note_source=getattr(req, "note_source", None),
                              consent=ok, reading=reading)


def det_risk(note: Optional[str], source: Optional[str] = None) -> str:
    """Risk from our own regexes only (the existing check_note and harness_v2's CRISIS/HARM)."""
    from ai.understanding import check_note
    from ai.harness_v2.briefs import CRISIS_RE, HARM_RE, clean_note
    r = "none"
    if note:
        chk = check_note(note, source)
        r = "self_harm" if chk.crisis else "harm_from_others" if chk.harm else "none"
        raw = clean_note(note, source)
        r = higher_risk(r, "self_harm" if CRISIS_RE.search(raw) else "harm_from_others" if HARM_RE.search(raw) else "none")
    return r


def reading_R(E: Engine, rd: dict, week: int = 1) -> dict:
    """The graph's own reading object (what gate() reads) for a v3 reading."""
    G = E.G
    R = G.read(rd.get("situations") or (), rd.get("stance"), rd.get("states") or (), rd.get("trail") or (), week, None, bool(rd.get("threat")))
    R["threat"] = bool(rd.get("threat"))
    R["audience"] = sorted(G.audience(rd.get("age"), rd.get("stages") or ()))      # r4: the 'slips' verse never for a student
    R["stages"] = list(rd.get("stages") or ())
    for f in graph_flags(rd):
        R[f] = True
    R["caregiver"] = "caring_parents" in (rd.get("stages") or ()) and bool(set(R["situations"]) & (pg.FEAR_FOR_OTHER | {"burnout"}))
    words = [w for w, _ in R["trail"]]
    need = G.N.get("word:" + words[-1], {}).get("need") if words else None
    R["_allow_devotional"] = need == "faith" or R["stance"] == "seeking" or bool(set(R["situations"]) & {"reconnect_faith", "illness_family", "loneliness", "grief_parent", "grief_general"})
    return R


def verse_brief(E: Engine, vid: str, edge: Optional[dict] = None):
    from ai.harness_v2.briefs import build_verse_brief
    v = E.verses.get(vid)
    if v is None:
        return None
    return build_verse_brief(v, E.prasangs.get(v.get("prasang_id") or ""), E.labels.get(vid), None, edge)


def story_brief(E: Engine, sid: str, why: str = ""):
    """A Day 7 story as a VerseBrief, so harness_v2 can write its personal line from the story's own record."""
    from ai.harness_v2.briefs import VerseBrief
    r = E.stories.get(sid)
    if r is None and (sid.startswith("prasang:") or sid in E.prasangs):
        p = E.prasangs.get(sid.split(":", 1)[1] if sid.startswith("prasang:") else sid) or {}
        return VerseBrief(id=sid, ref=p.get("title_en") or sid, speaker=", ".join(p.get("characters") or []), line=p.get("lesson") or "",
                          claim=p.get("lesson") or "", story=p.get("summary") or "", lesson=p.get("lesson") or "", why=why, move="enacts")
    if r is None:
        return None
    body = " ".join(x for x in (r.get("the_moment"), r.get("what_they_did"), r.get("the_turn"), r.get("outcome")) if x)
    return VerseBrief(id=sid, ref=r.get("title") or sid, speaker=r.get("protagonist") or "", line=r.get("teaching") or "",
                      claim=r.get("teaching") or "", story=body, lesson=r.get("teaching") or "", misuse=r.get("whole_arc_note") or "",
                      setting=r.get("source_ref") or "", why=why, move="enacts", flags=dict(r.get("flags") or {}))


# ── Day 1 ─────────────────────────────────────────────────────────────────────
def candidates(E: Engine, rd: dict, k: int = 12) -> List[str]:
    """pools.lookup (8, no note) + the graph's Day 1 pool on the note's situations; a wronged reader also gets the
    whole-library pool for the wronged stance (no Day 1 Gita label lists 'wronged')."""
    ids = pg.lookup(E.pools, rd.get("kept"), rd.get("paused"), rd.get("stance"), rd.get("age"), rd.get("stages") or ())
    extra: List[str] = []
    if rd.get("situations") or rd.get("stance") == "wronged":
        try:
            extra = [c["id"] for c in E.G.day1_pool(words=rd.get("trail") or (), stance=rd.get("stance"), situations=rd.get("situations") or (),
                                                    age=rd.get("age"), stages=rd.get("stages") or (), k=8, risk=rd.get("risk", "none"))]
        except Exception:
            logger.exception("plan_v3: day1_pool failed")
    first, second = (extra, ids) if rd.get("situations") else (ids, extra)
    out = list(dict.fromkeys([*first, *second]))
    return [i for i in out if i in E.verses][:k]


def day1_allowed(E: Engine, vid: str, R: dict, risk: str, pb) -> Optional[str]:
    """None if the verse may open this person's plan, else the reason (graph gate, then harness_v2 fit guard)."""
    from ai.harness_v2.briefs import fit_guard
    why = E.G.gate(vid, "D1_see_name", R, risk, R.get("_allow_devotional", True))
    if why:
        return why
    vb = verse_brief(E, vid)
    if vb is None:
        return "not in the library"
    g = fit_guard(pb, vb)
    return ("fit_guard:" + ",".join(g)) if g else None


def _cand_dicts(E: Engine, ids: Sequence[str]) -> List[dict]:
    out = []
    for i in ids:
        n = E.G.v(i)
        out.append({"id": i, "claim": n.get("claim") or E.verses.get(i, {}).get("line"), "line": n.get("line"), "flags": n.get("flags") or {},
                    "stance_fit": n.get("stance_fit"), "day1_ok": n.get("day1_ok", True)})
    return out


def _rate_limited(e) -> bool:
    return "TooManyRequests" in type(e).__name__ or "429" in str(e)[:200]


def _fast_read_call(llm, req, rd: dict, cands: List[dict]) -> Tuple[Optional[dict], int, Optional[str]]:
    t = time.perf_counter()
    trail = fr.weigh_trail(rd.get("trail") or [], rd.get("kept"))
    msgs = fr.messages(req.age, list(req.stages or []), rd.get("kept"), trail, getattr(req, "note", None), cands)
    err = None
    for attempt in (1, 2):                      # one quick retry on a rate limit, only while it can still land in time
        try:
            raw = llm.chat_json(msgs, temperature=0.2, max_tokens=260, timeout_s=max(2, int(FAST_READ_DEADLINE_S + 0.99)))
            return (raw if isinstance(raw, dict) else None), int((time.perf_counter() - t) * 1000), err
        except Exception as e:
            err = type(e).__name__
            if not _rate_limited(e) or time.perf_counter() - t > 1.2:
                break
            time.sleep(0.4)
    return None, int((time.perf_counter() - t) * 1000), err


async def _first_line_bounded(first_line, chip_first_line, llm, pb, vb, static, timeout_s: float) -> dict:
    """harness_v2.first_line under a hard deadline: a stream that stalls between chunks cannot hold the first screen."""
    try:
        return await asyncio.wait_for(asyncio.to_thread(first_line, llm, pb, vb, static, timeout_s, hasattr(llm, "synthesize_rag_stream")),
                                      timeout=timeout_s + 0.3)
    except asyncio.TimeoutError:
        return {**chip_first_line(pb, static), "issues": ["deadline"]}


async def read_day1(req, und=None, llm=None, note_matcher=None) -> dict:
    """The v3 reading and Day 1. -> {reading (plan_v3 dict), pick, alts, line, line_source, timings, flags, pb, cands}."""
    t0 = time.perf_counter()
    E = engine()
    consent = _consented(req)
    note = getattr(req, "note", None) if consent else None
    kept, trail, paused = taps(req)
    flags: List[str] = [f"engine:v3", f"fast_read:{fast_read_mode()}"]
    timings: Dict[str, int] = {}
    risk = det_risk(getattr(req, "note", None), getattr(req, "note_source", None))   # regex reads the note even without consent
    pb = person_brief(req, consent=consent)
    pb.risk = higher_risk(pb.risk, risk)
    sits: List[str] = [c for c in (getattr(req, "topic", None), getattr(req, "follow", None)) if c and "sit:" + c in E.G.N]
    if note and note_matcher is not None:
        t = time.perf_counter()
        try:
            got = await asyncio.wait_for(asyncio.to_thread(note_matcher, note), timeout=NOTE_MATCH_S)
            ranked = sorted(((s, w) for s, w in (got or {}).items() if "sit:" + s in E.G.N), key=lambda x: -x[1])
            top = ranked[0][1] if ranked else 0
            sits += [s for s, w in ranked[:3] if w >= 0.6 * top and s not in sits]
        except asyncio.TimeoutError:
            flags.append("note_match:timeout")
        except Exception:
            flags.append("note_match:error")
        timings["note_match"] = int((time.perf_counter() - t) * 1000)
    cues = note_cues(note)                                  # r4: consent only (note is None without it)
    if cues["layoff"] and "layoff" not in sits:
        sits.insert(0, "layoff"); flags.append("note_cue:layoff")
    rd = {"v": 1, "kept": kept, "trail": trail, "paused": paused, "stance": pb.stance, "states": list(pb.states), "risk": pb.risk,
          "situations": sits[:4], "age": req.age, "stages": list(req.stages or []), "consent": consent, "light": pb.light, "source": "deterministic",
          "threat": cues["threat"], "caste_ok": cues["caste_ok"], "health": cues["health"]}
    t = time.perf_counter()
    cands = candidates(E, rd)
    timings["candidates"] = int((time.perf_counter() - t) * 1000)
    mode = fast_read_mode()
    raw, fr_ms, err = None, 0, None
    if consent and llm is not None and pb.risk != "self_harm":
        try:
            raw, fr_ms, err = await asyncio.wait_for(asyncio.to_thread(_fast_read_call, llm, req, rd, _cand_dicts(E, cands)),
                                                     timeout=FAST_READ_DEADLINE_S + 0.3)
        except asyncio.TimeoutError:
            raw, fr_ms, err = None, int((FAST_READ_DEADLINE_S + 0.3) * 1000), "deadline"
        timings["fast_read"] = fr_ms
        if err:
            flags.append(f"fast_read:error:{err}")
        if fr_ms > FAST_READ_DEADLINE_S * 1000 and mode == "fixed":
            flags.append("fast_read:late_discarded"); raw = None
    pick, alts, line, line_source, frv = None, [], None, None, None
    if raw is not None:
        frv = fr.validate(raw, _cand_dicts(E, cands), kept, has_note=bool(note))
        flags += [f"fr:{x}" for x in frv.flags]
        rd["source"] = "fast_read"
    if mode == "raw" and frv is not None:
        # phase 1 behaviour, for the before/after measurement only
        rd.update(stance=frv.stance, states=frv.states or rd["states"], risk=higher_risk(rd["risk"], frv.risk))
        pick, alts = frv.pick, [a for a in [frv.alt] if a]
        line, line_source = (frv.line or None), ("fast_read" if frv.line else None)
        if pick is None:
            flags.append("day1:no_pick")
    else:
        if frv is not None:
            st, states = frv.stance, list(frv.states)
            # The model may not make someone "wronged" on its own: the words must say another person did it (a wronged cue
            # in the note with hurt or angry tapped), or the deterministic reading must already say so. Same rule as risk.
            if st == "wronged" and pb.stance != "wronged" and not (pb.stance_votes.get("wronged", 0) >= 0.5 and set(trail) & {"hurt", "angry"}):
                flags.append("fast_read:wronged_unsupported"); st = pb.stance
                states = [x for x in states if x != "manyu"]
            reading = {"stance": st, "states": states}          # risk deliberately not taken from fast_read
            from ai.harness_v2.briefs import apply_reading
            pb = apply_reading(pb, reading)
            rd.update(stance=pb.stance, states=list(pb.states), light=pb.light)
            if frv.risk != "none" and frv.risk != rd["risk"]:
                flags.append(f"fast_read:risk_ignored:{frv.risk}")
        R = reading_R(E, rd)
        order = list(dict.fromkeys([x for x in ((frv.pick, frv.alt) if frv else ()) if x] + cands))
        refused = {}
        for vid in order:
            why = day1_allowed(E, vid, R, rd["risk"], pb)
            if why is None:
                if pick is None:
                    pick = vid
                elif len(alts) < 3:
                    alts.append(vid)
            else:
                refused[vid] = why
        if frv and frv.pick and pick != frv.pick:
            flags.append(f"day1:model_pick_refused:{refused.get(frv.pick, 'order')}")
        if pick is None:      # nothing in the candidate list survives: the whole library for this reading
            flags.append("day1:library_fallback")
            pool = E.G.day1_pool(words=rd["trail"], stance=rd["stance"], situations=rd["situations"], age=rd["age"], stages=rd["stages"], k=30, risk=rd["risk"])
            for c in pool:
                if day1_allowed(E, c["id"], R, rd["risk"], pb) is None:
                    if pick is None:
                        pick = c["id"]
                    elif len(alts) < 3:
                        alts.append(c["id"])
        if pick is None:
            from ai.harness_v2.briefs import fit_guard
            for vid in order + [c["id"] for c in pool]:
                why = E.G.gate(vid, "D1_see_name", R, rd["risk"], R.get("_allow_devotional", True))
                vb_ = verse_brief(E, vid)
                if (why or "").startswith("r4: depicts or diagnoses") and vb_ is not None and not fit_guard(pb, vb_):
                    pick = vid; flags.append("day1:r4_relaxed"); break
        flags.append("day1:" + ("model_pick" if frv and pick == frv.pick else "graph_pick"))
    timings["select"] = int((time.perf_counter() - t0) * 1000)
    # the first personal line: harness_v2 (fixed) or fast_read's own (raw)
    fl = None
    if mode != "raw" or line is None:
        from ai.harness_v2.harness import first_line, chip_first_line
        vb = verse_brief(E, pick) if pick else None
        left = DAY1_BUDGET_S - (time.perf_counter() - t0)
        if vb is not None and consent and llm is not None and rd["risk"] != "self_harm" and left >= 1.0:
            t = time.perf_counter()
            fl = await _first_line_bounded(first_line, chip_first_line, llm, pb, vb, E.static, min(3.5, left))
            left = DAY1_BUDGET_S - (time.perf_counter() - t0)
            if any("TooManyRequests" in str(i) for i in fl.get("issues") or []) and left >= 1.5:
                await asyncio.sleep(0.4)          # one retry after a rate limit, inside the Day 1 budget
                fl = await _first_line_bounded(first_line, chip_first_line, llm, pb, vb, E.static, min(3.5, left - 0.4))
                flags.append("first_line:retried_after_429")
            timings["first_line"] = int((time.perf_counter() - t) * 1000)
        else:
            fl = {**chip_first_line(pb, E.static), "issues": ["no_model" if not consent or llm is None else "budget"]}
        line, line_source = fl.get("text"), fl.get("source")
        if fl.get("issues"):
            flags.append("first_line:" + ",".join(str(x).split(":")[0] for x in fl["issues"][:3]))
    timings["total"] = int((time.perf_counter() - t0) * 1000)
    rd["pick"] = pick
    if line and line_source in ("model", "fast_read"):
        rd["first_line"] = line
    return {"reading": rd, "pick": pick, "alts": alts, "line": line, "line_source": line_source, "timings": timings, "flags": flags,
            "pb": pb, "cands": cands, "fast_read_raw": raw}


def reading_from_client(d: Optional[dict]) -> Optional[dict]:
    """The plan_v3 reading the app sent back inside `understanding`. Crossed the network: vocabularies re-checked."""
    from ai.harness_v2.vocab import EMOTIONS, STATES, STANCES
    x = (d or {}).get("plan_v3") if isinstance(d, dict) else None
    if not isinstance(x, dict) or x.get("v") != 1:
        return None
    E = engine()
    return {"v": 1, "kept": x.get("kept") if x.get("kept") in EMOTIONS else None,
            "trail": [w for w in (x.get("trail") or []) if w in EMOTIONS][-6:],
            "paused": x.get("paused") if x.get("paused") in EMOTIONS else None,
            "stance": x.get("stance") if x.get("stance") in STANCES else "struggle",
            "states": [s for s in (x.get("states") or []) if s in STATES][:4],
            "risk": x.get("risk") if x.get("risk") in RISK_ORDER else "none",
            "situations": [s for s in (x.get("situations") or []) if "sit:" + str(s) in E.G.N][:4],
            "age": x.get("age"), "stages": [s for s in (x.get("stages") or []) if isinstance(s, str)][:7],
            "consent": bool(x.get("consent", True)), "light": bool(x.get("light")), "source": "client", "pick": x.get("pick"),
            "threat": bool(x.get("threat")), "caste_ok": bool(x.get("caste_ok")), "health": bool(x.get("health")),
            "first_line": str(x.get("first_line"))[:300] if x.get("first_line") else None}


# ── cards ─────────────────────────────────────────────────────────────────────
def verse_card(E: Engine, rec, vid: str, beat: str, score: float, sit_ids: Sequence[str]) -> Optional[dict]:
    from collections import Counter
    v = None
    if rec is not None:
        by = getattr(rec, "_v3_by_id", None)
        if by is None:
            by = {x["id"]: x for x in rec.verses}
            rec._v3_by_id = by
        v = by.get(vid)
    v = v or E.verses.get(vid)
    if v is None:
        return None
    w = Counter({s: 1.0 for s in sit_ids})
    if rec is not None:
        card = rec._card(v, score, list(sit_ids), w)
    else:
        card = {"id": v["id"], "ref": v.get("display_ref") or v.get("ref_label") or v["id"], "family": v.get("family"), "speaker": v.get("speaker"),
                "listener": v.get("listener"), "setting": v.get("setting"), "sanskrit": v.get("sanskrit_display") or v.get("sanskrit"),
                "line": v.get("line") or "", "translation": v.get("translation"), "why": v.get("reflection"), "misuse": v.get("misuse"), "score": score}
    card["beat"] = beat
    card["role_fit"] = 1.0
    return card


def story_card(E: Engine, sid: str, score: float) -> Optional[dict]:
    r = E.stories.get(sid)
    pid = (r or {}).get("library_prasang_id") if r else (sid.split(":", 1)[1] if sid.startswith("prasang:") else (sid if sid in E.prasangs else None))
    p = E.prasangs.get(pid or "")
    if p is not None:
        from ai.story_titles import hook_title
        return {"id": p["id"], "title": p.get("title_en"), "kind": p.get("kind"), "family": p.get("family"), "characters": p.get("characters") or [],
                "story_hook": p.get("story_hook"), "summary": p.get("summary"), "lesson": p.get("lesson"), "matched": [], "anchor": None,
                "score": score, "hook_title": hook_title(p["id"]), "teaser": hook_title(p["id"]) or p.get("story_hook") or p.get("title_en")}
    if r is None:
        return None
    return {"id": sid, "title": r.get("title"), "kind": "story", "family": r.get("text"), "characters": r.get("characters") or [],
            "story_hook": r.get("content_hook"), "summary": r.get("the_moment"), "lesson": r.get("teaching"), "matched": [], "anchor": None,
            "score": score, "hook_title": None, "teaser": r.get("content_hook") or r.get("title")}


def day_brief(d: dict) -> Tuple[str, str]:
    """(edge, why) for harness_v2's VerseBrief: the graph path, its whys, the guard and the writer note."""
    why = " ".join(x for x in (d.get("why") or []) if x)
    if d.get("guard"):
        g = d["guard"]
        why += (f" Served with a soothing verse ({g.get('ref')}): {g.get('line')}" if not g.get("is_previous_day")
                else f" Yesterday's verse ({g.get('ref')}) was the soothing ground for this one.")
    if d.get("writer_note"):
        why += " Writer note: " + d["writer_note"]
    return (d.get("path") or "")[:200], why.strip()[:900]


def _graph_exclude(E: Engine, exclude: Sequence[str]) -> List[str]:
    """The app excludes what it was shown: verse ids, library prasang ids (story cards) and 04_stories ids. A story card
    shown under its library prasang id also excludes every graph story node that tells that prasang."""
    ex = set(x for x in exclude if x)
    pids = {x for x in ex if x in E.prasangs}
    if pids:
        for sid in E.G.by_type["story"]:
            n = E.G.N[sid]
            if n.get("prasang_id") in pids or n.get("library_prasang_id") in pids or (sid.startswith("prasang:") and sid[8:] in pids):
                ex.add(sid)
    return sorted(ex)


def graph_week(E: Engine, rd: dict, week: int, exclude: Sequence[str], pin: Optional[str] = None, ids: Optional[Sequence[str]] = None) -> dict:
    ex = _graph_exclude(E, list(exclude) + ([pin] if pin else []))
    w = E.G.week(situations=rd.get("situations") or (), stance=rd.get("stance"), states=rd.get("states") or (), words=rd.get("trail") or (),
                 week=week, exclude=ex, risk=rd.get("risk", "none"), age=rd.get("age"), stages=rd.get("stages") or (),
                 threat=bool(rd.get("threat")), flags=graph_flags(rd), pin=pin)
    used = set(ex) | {d.get("id") for d in w["days"] if d.get("id")}
    order = ["D1_see_name", "D2_see_why", "D3_steady_ground", "D4_steady_reframe", "D5_act_today", "D6_act_hard_moment"]
    for i, d in enumerate(w["days"]):                 # an empty slot (thin data, e.g. wronged week 3 Day 2): nearest slot's unused alternate
        if d.get("id") or d["slot"] == "D7_story":
            continue
        near = sorted((x for x in w["days"] if x.get("id") and x["slot"] != "D7_story"), key=lambda x: abs(order.index(x["slot"]) - order.index(d["slot"])))
        alt = next((a for x in near for a in (x.get("alts") or []) if a not in used and a in E.verses), None)
        if alt:
            used.add(alt)
            n = E.G.v(alt)
            w["days"][i] = {**d, "id": alt, "ref": n.get("ref"), "line": n.get("line"), "move": n.get("move"), "score": 0.0, "thin": True,
                            "path": f"{d['slot']} had no candidate; nearest slot's alternate", "why": [], "alts": [], "guard": None, "writer_note": None,
                            "filled": True}
    if pin and w["days"] and w["days"][0].get("id") != pin and pin in E.verses:
        old = w["days"][0]
        n = E.G.v(pin)
        w["days"][0] = {**old, "id": pin, "ref": n.get("ref"), "line": n.get("line"), "move": n.get("move"), "pinned": True,
                        "path": f"Day 1 kept from the first screen ({old.get('id')} was the graph's own)", "why": [], "guard": None, "writer_note": None}
    for i, gid in enumerate(list(ids or [])[:len(w["days"])]):     # r4n: the plan the app holds is the truth for a later day request
        own = w["days"][i].get("id") or ""
        same_story = gid in (E.G.v(own).get("library_prasang_id"), (E.stories.get(own) or {}).get("library_prasang_id"), own.split(":", 1)[-1])
        if gid and own != gid and not same_story and (gid in E.verses or gid in E.G.N or gid in E.stories or gid in E.prasangs):
            n = E.G.v(gid)
            note = pg.PET_NOTE if "pet_loss" in (rd.get("situations") or []) else None
            w["days"][i] = {**w["days"][i], "id": gid, "ref": n.get("ref"), "line": n.get("line"), "move": n.get("move"), "kept_from_app": True,
                            "path": "kept from the plan the app holds", "why": [], "guard": None, "writer_note": note}
    return w


async def personal_days(E: Engine, llm, pb, items: List[Tuple[str, object]], conc: Optional[int] = None) -> Dict[str, dict]:
    """harness_v2.personal_layer for every day, at most PERSONAL_CONCURRENCY at once. -> {id: personal_layer output}."""
    from ai.harness_v2.harness import personal_layer, REDO_TEXT
    from ai.harness_v2.checker_extra import REDO as _REDO_R4
    REDO_TEXT.update({k: v for k, v in _REDO_R4.items() if k not in REDO_TEXT})
    if not items:
        return {}
    def one(vb):
        static = E.static.get(vb)
        t = time.perf_counter()
        out = personal_layer(llm, pb, vb, static, "", PERSONAL_TIMEOUT_S)
        left = PERSONAL_TIMEOUT_S - (time.perf_counter() - t)
        if any("TooManyRequests" in str(i) for i in out.get("issues") or []) and not out.get("source", {}).get("for_you") == "model" and left > 3:
            time.sleep(0.8)                      # one retry after a rate limit, inside the same deadline
            again = personal_layer(llm, pb, vb, static, "", left - 0.8)
            again["issues"] = ["retried_after_429", *again.get("issues", [])]
            return again
        return out
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor(max_workers=max(1, conc or PERSONAL_CONCURRENCY)) as ex:
        futs = [loop.run_in_executor(ex, one, vb) for _, vb in items]
        res = await asyncio.gather(*futs, return_exceptions=True)
    out = {}
    for (i, _), r in zip(items, res):
        out[i] = r if isinstance(r, dict) else {"parts": {}, "source": {}, "calls": 0, "ms": 0, "issues": [f"error:{type(r).__name__}"]}
    return out


async def build_week(req, rd: dict, week: int, exclude: Sequence[str], pin: Optional[str], rec=None, llm=None, write: bool = True,
                     story_pin: Optional[str] = None, ids: Optional[Sequence[str]] = None, write_days: Optional[set] = None) -> dict:
    """One week as the app's PlanDayOut dicts (+ optional plan_v3 meta per day). -> {days, flags, timings, graph}."""
    t0 = time.perf_counter()
    E = engine()
    w = graph_week(E, rd, week, exclude, pin, ids)
    tg = int((time.perf_counter() - t0) * 1000)
    from ai.planner import level_for
    lv = level_for(week, rd.get("risk", "none"), getattr(req, "level", None))
    pb = person_brief(req, reading={"stance": rd.get("stance"), "states": rd.get("states"), "risk": rd.get("risk")}, consent=rd.get("consent", True))
    sits = rd.get("situations") or []
    days, items, flags = [], [], []
    will_write = bool(llm is not None and rd.get("consent", True) and rd.get("risk") != "self_harm")
    can_write = bool(write and will_write)
    item_day: Dict[str, int] = {}
    R_w = reading_R(E, rd, week)
    used_ids = {x.get("id") for x in w["days"] if x.get("id")} | set(exclude)

    def soft_alt(d: dict) -> Optional[str]:
        """r4: an unused alternate for this slot that is not a cause, warning or rebuke and still passes the slot's gate."""
        for a in d.get("alts") or []:
            n = E.G.v(a)
            if a in used_ids or a not in E.verses or n.get("move") not in SOFT_MOVES or (rd.get("health") and resolve_verse(E, a)):
                continue
            if E.G.gate(a, d["slot"], R_w, rd.get("risk", "none"), R_w.get("_allow_devotional", True)) is None:
                return a
        return None

    def needs_line(d: dict) -> bool:
        if not d.get("id") or d["slot"] in ("D1_see_name", "D7_story"):
            return False
        n = E.G.v(d["id"])
        if n.get("move") in DIAG_MOVES or d.get("guard"):
            return True
        if rd.get("health") and d["slot"] in ("D3_steady_ground", "D4_steady_reframe", "D5_act_today", "D6_act_hard_moment") and resolve_verse(E, d["id"]):
            return True
        if rd.get("stance") == "aspiration" and not n.get("light_fit"):
            ha = {e["t"][6:] for e in E.G.out.get(d["id"], ()) if e["rel"] == "heals" and e.get("src") == "shard" and e["t"][6:] in pg.AFF}
            return bool(ha and not ha & set((rd.get("states") or [])[:2]))
        return False

    def swap(d: dict, why: str) -> Optional[dict]:
        a = soft_alt(d)
        if not a:
            return None
        used_ids.add(a)
        n = E.G.v(a)
        flags.append(f"v3:no_line_swap:{d['slot']}:{d['id']}->{a}:{why}")
        return {**d, "id": a, "ref": n.get("ref"), "line": n.get("line"), "move": n.get("move"), "path": f"{d['slot']}: alternate for {d['id']} ({why})",
                "why": [], "alts": [], "guard": None, "writer_note": d.get("writer_note"), "swapped_from": d["id"]}

    for i, d in enumerate(w["days"]):                     # r4: no model will write for them, so no cause/warning/resolve verse stands alone
        if d.get("id") and d["slot"] != "D7_story" and rd.get("health") and resolve_verse(E, d["id"]):
            d["writer_note"] = " ".join(x for x in (d.get("writer_note"), MED_NOTE) if x)
        if not will_write and needs_line(d) and rd.get("risk") != "self_harm" or (not will_write and rd.get("risk") == "self_harm" and needs_line(d)):
            w["days"][i] = swap(d, "no personal line will be written") or d
    for i, d in enumerate(w["days"]):
        beat, phase = SLOT_BEAT[d["slot"]]
        base = {"day": (week - 1) * 7 + i + 1, "day_in_week": i + 1, "week": week, "level": lv, "phase": phase, "beat": beat}
        meta = {"slot": d["slot"], "graph_id": d.get("id"), "path": d.get("path"), "why": d.get("why") or [], "writer_note": d.get("writer_note"),
                "alts": d.get("alts") or [], "thin": bool(d.get("thin"))}
        if d.get("id") is None:
            flags.append(f"v3:empty_day:{i + 1}")
            continue
        edge, why = day_brief(d)
        if d.get("filled"):
            meta["filled_from_nearest_slot"] = True
        if d["slot"] == "D7_story":
            sid = story_pin if (story_pin and week == 1) else d["id"]
            card = story_card(E, sid, float(d.get("score") or 0))
            if card is None:
                flags.append(f"v3:story_missing:{sid}"); continue
            meta["story_id"] = sid
            if sid.startswith("st.") and not (E.stories.get(sid) or {}).get("library_prasang_id"):
                meta["story_text"] = "04_stories record, unreviewed"
            vb = story_brief(E, sid, why)
            days.append({**base, "story": card, "plan_v3": meta})
            if vb is not None:
                vb.edge = edge
                items.append((card["id"], vb)); item_day[card["id"]] = i + 1
        else:
            card = verse_card(E, rec, d["id"], beat, float(d.get("score") or 0), sits)
            if card is None:
                flags.append(f"v3:verse_missing:{d['slot']}:{d['id']}:{d.get('path')}"); continue
            if d.get("guard"):
                gc = verse_card(E, rec, d["guard"]["id"], beat, 0.0, sits)
                meta["guard"] = {"id": d["guard"]["id"], "ref": (gc or {}).get("ref"), "line": (gc or {}).get("line"),
                                 "is_previous_day": bool(d["guard"].get("is_previous_day"))}
            vb = verse_brief(E, d["id"], {"edge": edge, "why": why, "provenance": "graph"})
            st = E.static.get(vb) if vb is not None else {}
            if st.get("source") == "generated" and st.get("meaning"):
                card["meaning"] = st["meaning"]
            days.append({**base, "verse": card, "plan_v3": meta})
            if vb is not None:
                items.append((card["id"], vb)); item_day[card["id"]] = i + 1
    tw, ncalls = 0, 0
    arc = build_arc(E, rd, days, week)                       # r4n: the week's movement and each day's link to the one before
    for d, a in zip(days, arc["days"]):
        d["plan_v3"]["arc"] = {"line": arc["line"], "link_from_previous": a["link_from_previous"], "link": a["link"]}
    all_items = dict(items)
    first_ok = week == 1 and rd.get("first_line") and days and days[0].get("verse") and days[0]["verse"]["id"] == rd.get("pick")
    if write_days is not None:                               # r4n: onboarding writes Day 1 only (and nothing when the first line covers it)
        items = [(k, v) for k, v in items if item_day.get(k) in write_days and not (first_ok and item_day.get(k) == 1)]
    if can_write:
        t = time.perf_counter()
        got = await personal_days(E, llm, pb, items)
        # r4: a rate limit or timeout is not a refusal: retry those once, two at a time, inside the write budget
        transient = [(i_, vb) for i_, vb in items if not ((got.get(i_) or {}).get("parts") or {}).get("for_you")
                     and any(str(x).startswith(("llm_error", "not_json")) for x in (got.get(i_) or {}).get("issues") or [])]
        if transient and time.perf_counter() - t < WRITE_BUDGET_S - PERSONAL_TIMEOUT_S:
            await asyncio.sleep(0.5)
            again = await personal_days(E, llm, pb, transient, conc=2)
            for k, v in again.items():
                if (v.get("parts") or {}).get("for_you") or not ((got.get(k) or {}).get("parts")):
                    got[k] = {**v, "issues": ["retried_transient", *(v.get("issues") or [])]}
            flags.append(f"v3:write_retry:{len(transient)}")
        # r4: a cause, warning or (with a health note) resolve verse that got no personal line is swapped for a soft alternate
        swaps = []
        for j, d in enumerate(days):
            card = d.get("verse")
            if card is None or ((got.get(card["id"]) or {}).get("parts") or {}).get("for_you") or card["id"] not in dict(items):
                continue
            gd = next((x for x in w["days"] if x.get("id") == card["id"]), None)
            if gd is None or not needs_line(gd):
                continue
            nd = swap(gd, "no personal line passed the checker")
            if nd is None:
                continue
            nc = verse_card(E, rec, nd["id"], d["beat"], 0.0, sits)
            if nc is None:
                continue
            edge, why = day_brief(nd)
            vb = verse_brief(E, nd["id"], {"edge": edge, "why": why, "provenance": "graph"})
            d["verse"] = nc
            d["plan_v3"] = {**d["plan_v3"], "graph_id": nd["id"], "path": nd["path"], "swapped_from": gd["id"], "why": [], "alts": []}
            if vb is not None:
                swaps.append((nc["id"], vb))
        if swaps and time.perf_counter() - t < WRITE_BUDGET_S - PERSONAL_TIMEOUT_S:
            got.update(await personal_days(E, llm, pb, swaps, conc=2))
        tw = int((time.perf_counter() - t) * 1000)
        ncalls = sum(int((v or {}).get("calls", 0)) for v in got.values())
        n_fy = 0
        for d in days:
            card = d.get("verse") or d.get("story")
            p = (got.get(card["id"]) or {}).get("parts") or {}
            if p.get("for_you"):
                card["for_you"] = p["for_you"]; n_fy += 1
            if d.get("verse") is not None:
                if p.get("practice"):
                    card["try_today"] = p["practice"]
                if p.get("scene_line"):
                    card["scene_line"] = p["scene_line"]
            src = (got.get(card["id"]) or {}).get("source") or {}
            d["plan_v3"]["personal_source"] = src
            d["plan_v3"]["personal_issues"] = [str(x)[:80] for x in ((got.get(card["id"]) or {}).get("issues") or [])][:8]
        first = rd.get("first_line")
        if week == 1 and first and days and days[0].get("verse") and days[0]["verse"]["id"] == rd.get("pick") and not days[0]["verse"].get("for_you"):
            days[0]["verse"]["for_you"] = first; n_fy += 1
            days[0]["plan_v3"]["personal_source"] = {**(days[0]["plan_v3"].get("personal_source") or {}), "for_you": "first_line"}
        flags.append(f"v3:for_you:{n_fy}/{len(days)}")
    elif rd.get("risk") == "self_harm":
        flags.append("v3:personal:skipped_self_harm")
    if rd.get("risk") == "self_harm":
        flags.append("v3:safety_card_leads")
    return {"days": days, "flags": flags, "timings": {"graph": tg, "write": tw, "calls": ncalls, "total": int((time.perf_counter() - t0) * 1000)},
            "graph": {"used": w.get("used"), "query_ms": w.get("query_ms")}, "items": all_items, "arc": arc, "pb": pb, "graph_days": w["days"]}


# ── r4n: the arc, and one day written on request ──────────────────────────────
ROLE = {"D2_see_why": "today asks where it comes from", "D3_steady_ground": "today gives ground to stand on",
        "D4_steady_reframe": "today turns it to another way of seeing", "D5_act_today": "today brings one practice for it",
        "D6_act_hard_moment": "today takes that practice into the hard moment", "D7_story": "today someone in the texts lives it"}
SLOT_OF = ["D1_see_name", "D2_see_why", "D3_steady_ground", "D4_steady_reframe", "D5_act_today", "D6_act_hard_moment", "D7_story"]
_DAY_CACHE: "Dict[str, dict]" = {}
_DAY_CACHE_MAX = 4000


def per_day() -> bool:
    return os.environ.get("PLAN_V3_PER_DAY", "1").strip() != "0"


def state_word(E: Engine, x: str) -> str:
    m = (E.G.N.get("state:" + x) or {}).get("modern") or x
    return m.split(",")[0].strip().lower()


def _day_gid(d: dict) -> Optional[str]:
    m = d.get("plan_v3") or {}
    return m.get("graph_id") or m.get("story_id") or ((d.get("verse") or d.get("story") or {}).get("id"))


def build_arc(E: Engine, rd: dict, days: List[dict], week: int = 1) -> dict:
    """Deterministic from the day ids and the reading: one line for the week, and for each day why it follows the day before."""
    st = [s for s in (rd.get("states") or []) if s in pg.AFF] or list(rd.get("states") or [])
    x = state_word(E, st[0]) if st else "what you are carrying"
    lead = {1: "your situation", 2: "the pattern in the mind under it", 3: "who you are beyond it"}.get(week, "your situation")
    if rd.get("light"):
        line = f"This week stays with {x} in {lead}: what it is, what tests it, ground to keep it, another way to see it, a practice, the hard moment, and someone who lived it."
    else:
        line = f"This week moves through {x} in {lead}: naming it, where it comes from, ground to stand on, another way to see it, a practice, the hard moment, and someone who lived it."
    out, prev = [], None
    for i, d in enumerate(days):
        gid = _day_gid(d)
        slot = (d.get("plan_v3") or {}).get("slot") or SLOT_OF[min(i, 6)]
        lk, text = None, None
        if i and prev:
            lk = E.G.link(prev, gid)
            pref = (E.G.v(prev).get("ref") or "yesterday's verse")
            if lk and lk[0] == "state":
                what = f"was about {state_word(E, lk[1])}"
            elif lk and lk[0] == "antidote":
                a, h = lk[1].split(">")
                what = f"named {state_word(E, a)}, and today's verse grows {state_word(E, h)}"
            elif lk and lk[0] == "toward":
                what = f"pointed toward {state_word(E, lk[1])}"
            elif lk:
                what = f"left off where {lk[1]}"
            else:
                what = f"was about {x}"
            text = f"Yesterday ({pref}) {what}; {ROLE.get(slot, 'today takes the next step')}."
        out.append({"day": i + 1, "id": gid, "link_from_previous": text, "link": list(lk) if lk else None})
        prev = gid
    return {"line": line, "days": out}


def bridge_context(arc: dict, prev_vb, prev_for_you: Optional[str], link_text: Optional[str]) -> str:
    pl = (getattr(prev_vb, "line", "") or "")[:220]
    pc = (getattr(prev_vb, "claim", "") or "")[:220]
    return (f" THE WEEK: {arc.get('line')} YESTERDAY'S VERSE ({getattr(prev_vb, 'ref', '')}, {getattr(prev_vb, 'speaker', '')}): \"{pl}\" Its claim: {pc}."
            + (f" YESTERDAY'S LINE FOR THEM (do not reuse any of its sentences): \"{prev_for_you[:300]}\"." if prev_for_you else "")
            + (f" WHY TODAY FOLLOWS: {link_text}" if link_text else "")
            + " BRIDGE RULE: begin for_you with ONE short sentence (at most 16 words) that carries yesterday's verse into today: name "
              "yesterday's idea in plain words (or who said it), then let today's verse take the next step. Do not repeat yesterday's point "
              "and do not contradict it. Then write today's lines as usual; the whole for_you stays within 55 words.")


def _day_key(rd: dict, week: int, ids: Sequence[str], day: int, prev_for_you: Optional[str], note: Optional[str]) -> str:
    import hashlib
    r = {k: rd.get(k) for k in ("kept", "trail", "stance", "states", "risk", "situations", "age", "stages", "consent", "threat", "health", "caste_ok")}
    return hashlib.sha1(json.dumps([r, week, list(ids), day, prev_for_you or "", note or ""], sort_keys=True).encode()).hexdigest()


async def write_day(req, rd: dict, week: int, ids: Sequence[str], day_in_week: int, prev_for_you: Optional[str], exclude: Sequence[str],
                    rec=None, llm=None) -> dict:
    """One day of a stored plan, written now: its card, its link to the day before and its personal layer (bridge first).
    Cached by reading, week, the plan's ids, the day and yesterday's line, so a reopen costs nothing."""
    from ai.harness_v2.checker_extra import check_bridge, drop_bridge, BRIDGE_REDO, echoes_yesterday
    t0 = time.perf_counter()
    E = engine()
    key = _day_key(rd, week, ids, day_in_week, prev_for_you, getattr(req, "note", None))
    if key in _DAY_CACHE:
        hit = json.loads(_DAY_CACHE[key])
        return {**hit, "flags": [*hit["flags"], "v3:day_cache_hit"], "timings": {"total": int((time.perf_counter() - t0) * 1000), "write": 0}, "calls": 0}
    pin = (list(ids)[0] if ids else None) or ((getattr(req, "hook_id", None) or rd.get("pick")) if week == 1 else None)
    res = await build_week(req, rd, week, [x for x in exclude if x not in set(ids or [])], pin, rec=rec, llm=llm, write=False, ids=list(ids or []) or None)
    days, flags = res["days"], [f for f in res["flags"] if not f.startswith("v3:for_you")]
    i = day_in_week - 1
    if i >= len(days):
        return {"day": None, "flags": flags + ["v3:day_missing"], "timings": {"total": int((time.perf_counter() - t0) * 1000)}, "calls": 0}
    d = days[i]
    card = d.get("verse") or d.get("story")
    vb = res["items"].get(card["id"])
    pb = res["pb"]
    will_write = bool(llm is not None and rd.get("consent", True) and rd.get("risk") != "self_harm")
    calls, tw = 0, 0
    if week == 1 and i == 0 and rd.get("first_line") and card["id"] == rd.get("pick"):
        card["for_you"] = rd["first_line"]
        d["plan_v3"]["personal_source"] = {"for_you": "first_line"}
    elif will_write and vb is not None:
        t = time.perf_counter()
        prev_vb = res["items"].get(((days[i - 1].get("verse") or days[i - 1].get("story")) or {}).get("id")) if i else None
        base_why = vb.why or ""
        if i and prev_vb is not None:
            vb.why = (base_why + bridge_context(res["arc"], prev_vb, prev_for_you, d["plan_v3"]["arc"]["link_from_previous"]))[:2200]
        got = (await personal_days(E, llm, pb, [(card["id"], vb)])).get(card["id"]) or {}
        calls += got.get("calls", 0)
        fy = (got.get("parts") or {}).get("for_you")
        bridge_issues = check_bridge(fy, getattr(prev_vb, "line", ""), getattr(prev_vb, "claim", ""), getattr(prev_vb, "speaker", ""), prev_for_you or "", i + 1) if fy else []
        if fy and i and echoes_yesterday(fy, prev_for_you or ""):
            bridge_issues.append("bridge_repeats_yesterday")
        if bridge_issues:                                    # one redo with the reason, then the line without its bridge
            vb.why = (vb.why + " YOUR LAST BRIDGE FAILED: " + "; ".join(BRIDGE_REDO.get(c, c) for c in bridge_issues))[:2400]
            again = (await personal_days(E, llm, pb, [(card["id"], vb)])).get(card["id"]) or {}
            calls += again.get("calls", 0)
            fy2 = (again.get("parts") or {}).get("for_you")
            iss2 = check_bridge(fy2, getattr(prev_vb, "line", ""), getattr(prev_vb, "claim", ""), getattr(prev_vb, "speaker", ""), prev_for_you or "", i + 1) if fy2 else ["missing"]
            if fy2 and i and echoes_yesterday(fy2, prev_for_you or ""):
                iss2 = [*iss2, "bridge_repeats_yesterday"]
            if fy2 and not iss2:
                got, fy, bridge_issues = again, fy2, []
            else:
                rest = drop_bridge(fy) if i else fy
                if rest and echoes_yesterday(rest, prev_for_you or "", skip_first=False):
                    rest = None                                  # better no line than yesterday's line again
                got["parts"]["for_you"] = rest if rest and len(rest.split()) >= 10 else None
                fy = got["parts"]["for_you"]
                flags.append("v3:bridge_dropped:" + ",".join(bridge_issues))
        p = got.get("parts") or {}
        if p.get("for_you"):
            card["for_you"] = p["for_you"]
        if d.get("verse") is not None:
            if p.get("practice"):
                card["try_today"] = p["practice"]
            if p.get("scene_line"):
                card["scene_line"] = p["scene_line"]
        d["plan_v3"]["personal_source"] = got.get("source") or {}
        d["plan_v3"]["personal_issues"] = [str(x)[:80] for x in (got.get("issues") or [])][:8]
        if i and p.get("for_you") and not bridge_issues:
            d["plan_v3"]["bridge"] = __import__("ai.harness_v2.checker", fromlist=["sentences"]).sentences(p["for_you"])[0]
        vb.why = base_why
        tw = int((time.perf_counter() - t) * 1000)
    flags.append(f"v3:day:{day_in_week}:for_you:{'yes' if card.get('for_you') else 'no'}")
    out = {"day": d, "flags": flags, "timings": {"total": int((time.perf_counter() - t0) * 1000), "write": tw}, "calls": calls}
    if len(_DAY_CACHE) >= _DAY_CACHE_MAX:
        _DAY_CACHE.pop(next(iter(_DAY_CACHE)))
    _DAY_CACHE[key] = json.dumps({k: v for k, v in out.items() if k in ("day", "flags")}, ensure_ascii=False, default=str)
    return out

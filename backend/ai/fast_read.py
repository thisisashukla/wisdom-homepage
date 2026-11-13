"""
fast_read.py - the compact reading for the fast Day 1 path (plan engine v3, 01_signals/SPEED_PLAN.md).

NOT WIRED IN. Nothing imports this module; server/plan.py is unchanged by it. It exists so the fast path can be
evaluated (05_harness) and timed (01_signals/tools/measure_read.py) before any endpoint uses it.

Today's reading (ai/understanding.py) sends about 40,000 characters and asks for about 3,000 back: 10 to 13 s on
Sarvam, against a 7 s deadline. This one sends about 2,700 and asks for about 260: measured 1.1 to 1.7 s, first token
at 0.25 s. One call does three jobs: read the person (risk, stance, states), choose Day 1 among candidates the graph
already cleared for them, and write the first personal line. Everything else the old reading wrote (queries, week
thesis, week titles, insight, bridge) comes from precomputed tables keyed by state, stance and situation.

The model is never trusted: validate() drops unknown state ids, a pick outside the candidate list, a pick the stance
may not see, and a line that breaks the copy rules. A dropped field falls back to the graph's own first choice.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Sequence

STANCES = ("struggle", "aspiration", "wronged", "seeking")
RISKS = ("none", "distress", "self_harm", "harm_from_others")
# plan_engine_v3/CONTRACT.md, frozen 13 Nov 2026
STATES = frozenset("""vishada shoka moha bhaya chinta krodha kama lobha ahankara mada matsarya dvesha sanga samshaya
chanchalya pramada alasya glani dainya viraha nirveda manyu dharma_sankata shrama trishna shanti abhaya shraddha dhriti
kshama karuna maitri santosha prasada utsaha viveka vairagya samatva tejas kritajnata sharanagati sankalpa ananda
atma_jnana seva jijnasa""".split())
LIGHT_WORDS = frozenset({"hopeful", "determined", "inspired", "grateful", "peaceful", "curious"})
# Flags (verse labels, 02_enrichment) a stance must never be opened with.
STANCE_BLOCKS = {
    "wronged": ("counsels_endurance", "blames_self", "reproach", "invalidates_fear"),
    "aspiration": ("blames_self", "reproach", "mortality"),
    "seeking": ("blames_self", "reproach"),
    "struggle": ("blames_self", "reproach"),
}
SCROLL_PASS_S = 1.5          # a word left sooner than this was scrolled past, not considered

SYSTEM = """You read one person for a scripture reading app and choose the verse that opens their plan. Return JSON only.
Inputs: age band, life stages, the feeling word they kept, the other words they paused on (with seconds), their note (may be absent or noise), and candidate verses (id, what it says).
Rules: stance comes from the whole person: struggle | aspiration | wronged | seeking. Someone hopeful, grateful, peaceful or determined is not struggling unless the note says so. Someone wronged is never told to adjust or forgive first. Never invent a fact they did not give. With no note, say nothing about their life beyond the words and stages given. risk: none | distress | self_harm | harm_from_others; harm_from_others only for physical danger or threats.
states: at most 3 ids, only from this list: {states}.
pick: the id of the ONE candidate a person in this state would read and say "that is me". Never one that judges or blames them. alt: your second choice.
line: one sentence to them, 12 to 24 words, second person, in your own voice (never the verse's speaker, never "I"), built on one concrete thing they gave. No advice, no verdict, no dashes.
Keys in this order: {{"risk":"","stance":"","states":[],"situation":"<3 to 6 words, theirs>","pick":"","alt":"","line":""}}"""


def weigh_trail(trail: Sequence, kept: Optional[str] = None) -> List[dict]:
    """The feeling screen's tap trail as evidence. `trail` items are ids or {"id", "ms"} (ms = time until the next tap).
    Words scrolled past are dropped; the rest are merged with their total dwell. The kept word always comes first."""
    dwell: Dict[str, float] = {}
    for t in trail or []:
        wid, ms = (t, None) if isinstance(t, str) else (t.get("id"), t.get("ms"))
        if not wid:
            continue
        s = (ms / 1000.0) if isinstance(ms, (int, float)) else None
        if s is not None and s < SCROLL_PASS_S and wid != kept:
            continue
        dwell[wid] = dwell.get(wid, 0.0) + (s if s is not None else SCROLL_PASS_S)
    if kept:
        dwell[kept] = max(dwell.get(kept, 0.0), max(dwell.values(), default=0.0) + 1.0)
    out = [{"id": k, "sec": round(v, 1), "kept": k == kept} for k, v in dwell.items()]
    return sorted(out, key=lambda x: (-x["kept"], -x["sec"]))[:4]


def user_message(age: Optional[str], stages: Sequence[str], kept: Optional[str], trail: Sequence[dict], note: Optional[str],
                 candidates: Sequence[dict]) -> str:
    paused = ", ".join(f"{t['id']} ({t['sec']:.0f}s)" for t in trail if not t.get("kept")) or "(none)"
    safe = (note or "").replace("<", " ").replace(">", " ").strip()[:600]
    cl = "\n".join(f"- {c['id']}: {(c.get('claim') or c.get('line') or '')[:150]}" for c in candidates)
    return (f"age: {age or 'not given'}\nstages: {', '.join(stages) or 'not given'}\nkept word: {kept or 'not given'}\n"
            f"paused on: {paused}\nnote: {('<note>' + safe + '</note>') if safe else '(none)'}\ncandidates:\n{cl}")


def messages(age, stages, kept, trail, note, candidates) -> List[dict]:
    return [{"role": "system", "content": SYSTEM.format(states=" ".join(sorted(STATES)))},
            {"role": "user", "content": user_message(age, stages, kept, trail, note, candidates)}]


@dataclass
class FastReading:
    risk: str = "none"
    stance: str = "struggle"
    states: List[str] = field(default_factory=list)
    situation: str = ""
    pick: Optional[str] = None
    alt: Optional[str] = None
    line: str = ""
    flags: List[str] = field(default_factory=list)


_BAD_LINE = re.compile(r"[–—]|\bI\b|\bme\b|\bmy\b", re.U)


def allowed(candidate: dict, stance: str) -> bool:
    fl = candidate.get("flags") or {}
    if any(fl.get(b) for b in STANCE_BLOCKS.get(stance, ())):
        return False
    fit = candidate.get("stance_fit")
    return candidate.get("day1_ok", True) and (not fit or stance in fit)


def validate(raw: dict, candidates: Sequence[dict], kept: Optional[str] = None, has_note: bool = False) -> FastReading:
    """Never trusts the model. `candidates` are best first by the graph's own score, each with id, flags, stance_fit,
    day1_ok (02_enrichment labels). Whatever fails a check is replaced by the graph's first allowed candidate."""
    r = FastReading()
    raw = raw if isinstance(raw, dict) else {}
    r.risk = raw.get("risk") if raw.get("risk") in RISKS else "none"
    r.stance = raw.get("stance") if raw.get("stance") in STANCES else ("aspiration" if kept in LIGHT_WORDS else "struggle")
    if r.stance not in STANCES or raw.get("stance") not in STANCES:
        r.flags.append("stance:defaulted")
    if kept in LIGHT_WORDS and not has_note and r.stance == "struggle":
        r.stance = "aspiration"                 # a light word and no note: nothing said they are struggling
        r.flags.append("stance:light_word_kept")
    if r.risk == "harm_from_others" and not has_note:
        r.risk = "none"; r.flags.append("risk:no_note")
    got = [s for s in (raw.get("states") or []) if isinstance(s, str)]
    r.states = [s for s in got if s in STATES][:3]
    if len(r.states) < len(got[:3]):
        r.flags.append("states:unknown_dropped")
    r.situation = " ".join(str(raw.get("situation") or "").split())[:60]
    by_id = {c["id"]: c for c in candidates}
    ok = [c["id"] for c in candidates if allowed(c, r.stance)]
    for key in ("pick", "alt"):
        v = raw.get(key)
        if v in by_id and v in ok:
            setattr(r, key, v)
        elif v:
            r.flags.append(f"{key}:{'blocked_for_stance' if v in by_id else 'not_a_candidate'}")
    if r.pick is None:
        r.pick = r.alt if r.alt else (ok[0] if ok else None)
        r.flags.append("pick:graph_default")
    if r.alt in (None, r.pick):
        r.alt = next((i for i in ok if i != r.pick), None)
    line = " ".join(str(raw.get("line") or "").split())
    n = len(line.split())
    if line and 8 <= n <= 30 and not _BAD_LINE.search(line):
        r.line = line
    elif line:
        r.flags.append("line:rejected")
    return r

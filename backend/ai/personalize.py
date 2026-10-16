"""
personalize.py — the two personal parts under each day's verse: what the verse says, and what it
says to THIS person, today.

    meaning   "What it says": the verse told the way a storyteller friend would tell it (who says it,
              to whom, at what moment) and then its idea in plain modern words. Faithful to the
              translation and to "what it does not mean"; it may lean toward their life at the end.
              Verses only (a story day already has its story).
    for_you   "For you": what this verse (or story) asks of their life today, through their age, stage
              of life, their seat and the details they gave, and the day's job (see it, steady it, act
              on it, the story) at the week's level (situation, pattern, self).

The library's `why` is the same for everyone; these are written for one person. Both are built from
the reading's paraphrases (ai/voice.py PersonContext), never the raw note, and grounded in everything
the library holds about the verse (ai/voice.py grounding_block). A week is written in a few small
calls in parallel. Every part passes the shown-line guardrails plus the fidelity check (no characters,
quotes or teachings the source doesn't have, no slang); a part that fails, or a call that times out,
is left empty and the app falls back to the verse's own `why` and translation.
"""
from __future__ import annotations

import asyncio
import logging
import re
import time
from collections import Counter
from typing import Dict, List, Optional

from ai.understanding import CLICHE_RE, ui_line, _words
from ai.voice import (FIDELITY, OPENING_RE, SLANG_RE, VOICE, PersonContext, check_fidelity, grounding_block,
                      person_block, source_names)

logger = logging.getLogger(__name__)

JOB = {
    "hook": "see: name what is happening to them right now, so they feel understood",
    "diagnose": "see: show them the pattern underneath it",
    "steady": "steady: what they can hold on to while it hurts",
    "act": "act: one small, concrete thing they can do today",
    "story": "story: what this story's hero shows them about their own situation",
}

SYSTEM = """\
You write the personal words under each day of one person's verse plan: what the verse says, told well, and what it says to their life today.

{voice}

{fidelity}

FOR EACH VERSE DAY write two parts:
- "meaning" (35 to 80 words): tell the verse like a storyteller. Begin inside the moment, from the source: who is speaking, to whom, and what is happening (one or two sentences). Use only what the setting and the story give; if they do not describe the moment, do not invent one (no added battles, weather, feelings or gestures). What comes later in the story may be told as what comes next, never as this verse's own words. Then say what the verse proposes, in plain modern words, exactly as the translation and its point say it. You may end with one sentence that turns gently toward their life. Do not start with "This verse" or "Krishna says". If no speaker or setting is given, begin with the idea itself.
- "for_you" (20 to 50 words, second person): what this verse asks of their life today. Build it from their details, their age and stage of life and the day's job, at the week's level. Name something concrete from their life, then the verse's idea inside it. Do not repeat the meaning.
FOR EACH STORY DAY write only "for_you" (20 to 50 words): what the story's hero shows them about their own situation, without retelling the story.

If they are being harmed by someone, never suggest enduring, adjusting, forgiving or keeping the peace. If they are in acute distress, be gentle and point only to the next small step.

Return ONLY JSON: {{"days": {{"<id>": {{"meaning": "...", "for_you": "..."}}, ...}}}} with every id (story days have no "meaning")."""

DIAGNOSIS_RE = re.compile(r"\b(diagnos|disorder|depress|anxiety disorder|adhd|trauma|toxic|narcissis)", re.I)
ENDURE_RE = re.compile(r"\b(endur\w*|tolerat\w*|adjust\w*|forgiv\w*|keep(ing)? the peace|put up with|bear it|patien\w*)\b", re.I)
YOU_RE = re.compile(r"\byou(r|'re|'ve|'d|'ll|rself)?\b", re.I)


VERDICT_RE = re.compile(r"\byou (have|did) (done )?nothing wrong\b|\byou are (a )?(good|bad) (person|man|woman|son|daughter|mother|father)\b"
                        r"|\bit'?s not your fault\b|\byou are (not )?to blame\b", re.I)
MUST_RE = re.compile(r"\byou (should|must|have to|need to)\b", re.I)


def _fit(s: str, hi: int) -> Optional[str]:
    """Over the limit: keep the complete sentences that fit (a told meaning keeps its beginning), else None."""
    out, n = [], 0
    for sent in re.split(r"(?<=[.!?])\s+", s):
        k = len(_words(sent))
        if n + k > hi:
            break
        out.append(sent)
        n += k
    return " ".join(out) if out else None


def _why(text, lo: int, hi: int, risk: str, item: Optional[dict] = None, grounded: bool = False) -> tuple[Optional[str], str]:
    """Shared checks for a shown part → (clean text, "") or (None, reason): length (trimmed to whole
    sentences when long), no cliches, no diagnosis, no slang, no verdicts on them, safe for someone harmed,
    and (with the item) faithful to its source."""
    if not isinstance(text, str) or not text.strip():
        return None, "missing"
    s = ui_line(text, source_names(item) if item else None, grounded=grounded)
    n = len(_words(s))
    if n > hi:
        s = _fit(s, hi) or ""
        n = len(_words(s))
    if n < lo:
        return None, "short" if n else "long"
    if VERDICT_RE.search(s):
        return None, "verdict"
    if CLICHE_RE.search(s):
        return None, "cliche"
    if DIAGNOSIS_RE.search(s):
        return None, "diagnosis"
    if SLANG_RE.search(s):
        return None, "slang"
    if risk == "harm_from_others" and ENDURE_RE.search(s):
        return None, "endure"
    if item is not None:
        ok, why = check_fidelity(s, item)
        if not ok:
            return None, why.split(":")[0]
    return s, ""


def why_for_you(text, risk: str = "none", item: Optional[dict] = None) -> tuple[Optional[str], str]:
    s, why = _why(text, 12, 55, risk, item)
    if s and not YOU_RE.search(s):
        return None, "not_second_person"
    if s and OPENING_RE.match(s):
        return None, "opening"
    if s and MUST_RE.search(s):
        return None, "preachy"
    return s, why


def why_meaning(text, item: dict, risk: str = "none") -> tuple[Optional[str], str]:
    s, why = _why(text, 25, 95, risk, item, grounded=True)
    if s and OPENING_RE.match(s):
        return None, "opening"
    if s and MUST_RE.search(s):
        return None, "preachy"
    return s, why


def check_for_you(text, risk: str = "none", item: Optional[dict] = None) -> Optional[str]:
    return why_for_you(text, risk, item)[0]


def check_meaning(text, item: dict, risk: str = "none") -> Optional[str]:
    return why_meaning(text, item, risk)[0]


def _user(ctx: PersonContext, items: List[dict]) -> str:
    rows = []
    for it in items:
        kind = "story" if it.get("kind") == "story" else "verse"
        rows.append(f"- id: {it['id']}\n  kind: {kind}\n  job: {JOB.get(it['beat'], it['beat'])}\n{grounding_block(it)}")
    return f"THE PERSON\n{person_block(ctx)}\n\nDAYS\n" + "\n".join(rows)


def system_prompt() -> str:
    return SYSTEM.format(voice=VOICE, fidelity=FIDELITY)


async def _call(llm, ctx: PersonContext, items: List[dict], timeout_s: float) -> dict:
    msgs = [{"role": "system", "content": system_prompt()}, {"role": "user", "content": _user(ctx, items)}]
    try:
        raw = await asyncio.wait_for(
            asyncio.to_thread(llm.chat_json, msgs, temperature=0.45, max_tokens=320 * len(items) + 200,
                              timeout_s=max(2, int(timeout_s))),
            timeout=timeout_s)
    except Exception as e:
        logger.warning("personal parts failed for %d items: %s %s", len(items), type(e).__name__, str(e)[:120])
        return {}
    if not isinstance(raw, dict):
        return {}
    days = raw.get("days")
    if isinstance(days, dict):
        return days
    lines = raw.get("lines")                  # the older one-line shape, still accepted
    return {k: {"for_you": v} for k, v in lines.items()} if isinstance(lines, dict) else {}


def _chunks(items: List[dict], size: int) -> List[List[dict]]:
    return [items[i:i + size] for i in range(0, len(items), size)]


async def personal_parts(llm, ctx: PersonContext, items: List[dict], timeout_s: float,
                         chunk: int = 3) -> Dict[str, Dict[str, str]]:
    """items (ai/voice.py item_from_card) → {id: {"meaning"?, "for_you"?}} for the parts that pass every check."""
    if llm is None or not items or timeout_s < 1.5:
        return {}
    t0 = time.perf_counter()
    parts_in = _chunks(items, chunk)
    got = await asyncio.gather(*(_call(llm, ctx, part, timeout_s) for part in parts_in))
    raw: Dict[str, dict] = {}
    for g in got:
        raw.update({k: v for k, v in g.items() if isinstance(v, dict)})
    # A chunk that came back empty (a timeout, a rate limit, broken JSON) is asked once more if there is
    # time: otherwise those days show the library's line instead of words written for them.
    missing = [it for it in items if it["id"] not in raw]
    left = timeout_s - (time.perf_counter() - t0)
    if missing and left >= 3:
        ctx.flags.append(f"retried:{len(missing)}")
        for g in await asyncio.gather(*(_call(llm, ctx, part, left) for part in _chunks(missing, chunk))):
            raw.update({k: v for k, v in g.items() if isinstance(v, dict)})
    out: Dict[str, Dict[str, str]] = {}
    dropped: Counter = Counter()
    for it in items:
        r = raw.get(it["id"]) or {}
        parts: Dict[str, str] = {}
        fy, why = why_for_you(r.get("for_you"), ctx.risk, it)
        if fy:
            parts["for_you"] = fy
        else:
            dropped[why] += 1
        if it.get("kind") != "story":
            m, why = why_meaning(r.get("meaning"), it, ctx.risk)
            if m:
                parts["meaning"] = m
            else:
                dropped[why] += 1
        if parts:
            out[it["id"]] = parts
    if dropped:                                   # reasons only, never the text: tunes the prompt without logging a life
        ctx.flags.append("dropped:" + ",".join(f"{k}={v}" for k, v in sorted(dropped.items())))
    return out

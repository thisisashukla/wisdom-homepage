"""
depth.py — "go deeper" on a plan day: what this verse (or story) asks of THIS person, written
once for them and kept.

Four parts, each with its own job and guardrails:
  life      In your life: the verse's point inside their situation (the people, the place),
            second person, 25-60 words. Not a summary of the verse.
  points    What it points at: the root cause underneath (their mechanism), plainly, 20-50 words.
  practice  Try this today: one small, concrete thing for today, fit to the day's job
            (see: notice; steady: hold; act: do), 12-40 words, imperative.
  question  A question to sit with: one open question in second person, under 22 words.

One bounded LLM call from the reading's paraphrases (ai/voice.py PersonContext: their age, stage of
life, seat, life in a sentence or two, root cause, the week's level and what has helped so far),
never the raw note, grounded in everything the library holds about the verse. It is written in the
storyteller-friend voice and under the same spiritual-honesty rules as the plan's personal lines
(ai/voice.py VOICE, FIDELITY); every part also passes check_fidelity.
Parts that fail their check are dropped, never shown half-right; a call that fails returns
nothing and the app keeps the library's own content. Results are cached on disk per verse and
reading, so a person reopening the day (or a second person with the same reading) waits once.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import logging
import re
from pathlib import Path
from typing import Dict, Optional

from ai.personalize import DIAGNOSIS_RE, ENDURE_RE
from ai.understanding import CLICHE_RE, IMPERATIVE_START, ui_line, _words
from ai.voice import (FIDELITY, SLANG_RE, VOICE, PersonContext, check_fidelity, grounding_block, person_block,
                      source_names)

logger = logging.getLogger(__name__)

PARTS = ("life", "points", "practice", "question")

JOB = {
    "hook": "see: help them see what is happening to them right now",
    "diagnose": "see: show them the pattern underneath",
    "steady": "steady: give them something to hold on to while it hurts",
    "act": "act: one thing to do differently today",
    "story": "story: what this story's hero shows them about their own situation",
}

SYSTEM = """\
You help one person go deeper into today's verse (or story) from their plan, the way a friend who knows the texts would after hearing their story: unhurried, honest, specific to their life.

{voice}

{fidelity}

If they are being harmed by someone, never suggest enduring, adjusting, forgiving or keeping the peace. If they are in acute distress, keep everything gentle and small.
Return ONLY JSON with four fields:
{{
 "life": "25 to 60 words, second person. Where this verse meets their life: the people, the moment, what they keep doing or feeling, seen through their age and stage of life. Do not summarise the verse and do not repeat what was already shown to them.",
 "points": "20 to 50 words. The philosophy underneath: what the verse is really pointing at beneath their situation (the root cause given), said plainly and faithfully, as the source says it.",
 "practice": "12 to 40 words. One small concrete thing to try today that fits the day's job and their life as it is (their time, their people, their stage of life). Start with a verb.",
 "question": "One open question for them to sit with, under 22 words, ending with a question mark."
}}"""


def _clean(text, lo: int, hi: int, risk: str, item: Optional[dict] = None) -> Optional[str]:
    if not isinstance(text, str):
        return None
    s = ui_line(text, source_names(item) if item else None)
    n = len(_words(s))
    if n < lo or n > hi or CLICHE_RE.search(s) or DIAGNOSIS_RE.search(s) or SLANG_RE.search(s):
        return None
    if risk == "harm_from_others" and ENDURE_RE.search(s):
        return None
    if item is not None and not check_fidelity(s, item)[0]:
        return None
    return s


def check_depth(raw: dict, risk: str = "none", item: Optional[dict] = None) -> Dict[str, str]:
    out: Dict[str, str] = {}
    if not isinstance(raw, dict):
        return out
    life = _clean(raw.get("life"), 18, 70, risk, item)
    if life and re.search(r"\byou(r|'re|'ve|'d|'ll|rself)?\b", life, re.I):
        out["life"] = life
    pts = _clean(raw.get("points"), 14, 60, risk, item)
    if pts:
        out["points"] = pts
    pr = _clean(raw.get("practice"), 8, 46, risk, item)
    # a practice starts with what to do (a verb) or when to do it, never "you could" or "maybe"
    if pr and (IMPERATIVE_START.match(pr) or re.match(r"^(today|tonight|this (morning|evening)|before|when|next time|once)\b", pr, re.I)
               or not re.match(r"^(you|your|it|this|that|there|maybe|perhaps|i|we|they|he|she|the|a|an|if|try to)\b", pr, re.I)):
        out["practice"] = pr
    q = _clean(raw.get("question"), 4, 24, risk, item)
    if q and q.endswith("?"):
        out["question"] = q
    return out


def _user(ctx: PersonContext, item: dict, for_you: Optional[str]) -> str:
    kind = "story" if item.get("kind") == "story" or item["beat"] == "story" else "verse"
    lines = [
        "THE PERSON", person_block(ctx), "",
        f"TODAY'S JOB: {JOB.get(item['beat'], item['beat'])}",
        f"TODAY'S {kind.upper()}", grounding_block(item),
    ]
    if for_you:
        lines.append(f"Already shown to them (do not repeat): {for_you}")
    return "\n".join(lines)


def cache_key(item_id: str, beat: str, level: str, core: str, mech: str, person: str = "") -> str:
    """One entry per verse and reading; `person` (age, stages, seat, life context) keeps two people with the
    same struggle at different stages of life apart. v2: the storyteller voice and the fidelity checks."""
    return hashlib.sha1(f"v2|{item_id}|{beat}|{level}|{mech}|{core}|{person}".encode()).hexdigest()[:24]


def person_key(ctx: PersonContext) -> str:
    return "|".join([ctx.age or "", ",".join(sorted(ctx.stages or [])), ctx.seat, ctx.life_context])


class DepthCache:
    def __init__(self, path: str):
        self.dir = Path(path)

    def get(self, key: str) -> Optional[Dict[str, str]]:
        p = self.dir / f"{key}.json"
        try:
            return json.loads(p.read_text()) if p.exists() else None
        except Exception:
            return None

    def put(self, key: str, value: Dict[str, str]) -> None:
        try:
            self.dir.mkdir(parents=True, exist_ok=True)
            tmp = self.dir / f"{key}.part"
            tmp.write_text(json.dumps(value, ensure_ascii=False))
            tmp.replace(self.dir / f"{key}.json")
        except Exception as e:
            logger.info("depth cache write skipped: %s", type(e).__name__)


def system_prompt() -> str:
    return SYSTEM.format(voice=VOICE, fidelity=FIDELITY)


async def write_depth(llm, ctx: PersonContext, item: dict, for_you: Optional[str], timeout_s: float) -> Dict[str, str]:
    if llm is None or timeout_s < 2:
        return {}
    msgs = [{"role": "system", "content": system_prompt()}, {"role": "user", "content": _user(ctx, item, for_you)}]
    try:
        raw = await asyncio.wait_for(
            asyncio.to_thread(llm.chat_json, msgs, temperature=0.45, max_tokens=800, timeout_s=max(2, int(timeout_s))),
            timeout=timeout_s)
    except Exception as e:
        logger.info("depth skipped: %s", type(e).__name__)
        return {}
    return check_depth(raw, ctx.risk, item)

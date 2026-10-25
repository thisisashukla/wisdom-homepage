"""
ask.py — "Ask about this verse": one question about one plan day's verse, answered from that verse.

    answer    says (what this verse says about their case, inside this verse and its scene) + notice (one thing to
              notice today) + at most one supporting verse, chosen by id from a short list and shown from the library
              (the model never writes Sanskrit or a reference)
    redirect  the question is about something else: offer to let tomorrow's verse take it up
    retune    the question shows the plan misread their situation: offer to re-weave the rest of the week
    safety    distress or danger in the question: no answer from scripture, only the support lines (server/plan.py)

The question is used for this request only: never stored, never logged. Every shown part passes the same
guardrails as the plan's own lines (ai/personalize.py _why) and the fidelity check against the verse.
"""
from __future__ import annotations

import asyncio
import logging
import re
import time
from typing import List, Optional

from ai.personalize import MUST_RE, YOU_RE, _why, soften
from ai.voice import FIDELITY, OPENING_RE, VOICE, PersonContext, grounding_block, person_block, person_text

logger = logging.getLogger(__name__)

SAYS_MAX = 75          # with notice (<= 25) the answer stays inside ~120 words, the plan's cap
NOTICE_MAX = 25
KINDS = ("answer", "redirect", "retune")

SYSTEM = """\
Someone is reading one verse from their plan and has a question about it. Answer from this verse.

{voice}

{fidelity}

HOW TO ANSWER
- Stay inside this verse and the story around it. If the question is about something this verse does not speak to, do not stretch it: return kind "redirect".
- If the question shows the plan has misread their situation (they say it is someone else's doing, or their life is not what the plan assumed), return kind "retune".
- Otherwise return kind "answer" with:
  * "says" (30 to 75 words, second person): what this verse says about their case. Apply its principle to their exact situation in the question; do not re-explain the verse. At most one clause about their circumstances.
  * "support_id": the id of ONE verse from SUPPORT CANDIDATES only if it adds something this verse does not say; otherwise null. Never an id that is not in the list.
  * "notice" (6 to 25 words): one thing to notice today. An observation, not an exercise or homework.
- If the question shows the words they already read did not land (they are still stuck, confused, or say it does not apply), answer through a different lens than the one "Already shown to them" used: a practical one (what is theirs to do at the next decision point) or a devotional one (offering the work, leaning on something larger). Say so in a few words ("Look at it from the doing side:").
- Never answer a question about self-harm, abuse, medicine, law or money from scripture; return kind "redirect".

Return ONLY JSON: {{"kind": "answer" | "redirect" | "retune", "says": "...", "support_id": "<id or null>", "notice": "..."}}"""


def system_prompt() -> str:
    return SYSTEM.format(voice=VOICE, fidelity=FIDELITY)


def user_prompt(ctx: PersonContext, item: dict, question: str, for_you: Optional[str], asked: List[str],
                candidates: List[dict]) -> str:
    rows = [f"THE PERSON\n{person_block(ctx)}", "THE VERSE\n" + grounding_block(item)]
    if for_you:
        rows.append(f"Already shown to them: {for_you}")
    if asked:
        rows.append("They asked before, in this plan (do not repeat those answers): " + " | ".join(asked[-5:]))
    if candidates:
        rows.append("SUPPORT CANDIDATES\n" + "\n".join(f"- id: {c['id']} ({c['ref']}): {c['line']}" for c in candidates))
    rows.append(f"THEIR QUESTION\n{question}")
    return "\n\n".join(rows)


def check_says(text, ctx: PersonContext, item: dict) -> tuple[Optional[str], str]:
    s, why = _why(soften(text), 20, SAYS_MAX, ctx.risk, item, stance=ctx.stance, gender_known=bool(ctx.gender),
                  known=person_text(ctx), bereaved=ctx.bereaved, people=ctx.people)
    if s and not YOU_RE.search(s):
        return None, "not_second_person"
    if s and OPENING_RE.match(s):
        return None, "opening"
    if s and MUST_RE.search(s):
        return None, "preachy"
    return s, why


def check_notice(text, ctx: PersonContext, item: dict) -> tuple[Optional[str], str]:
    return _why(soften(text), 4, NOTICE_MAX, ctx.risk, item, stance=ctx.stance, gender_known=bool(ctx.gender),
                known=person_text(ctx), bereaved=ctx.bereaved, people=ctx.people)


async def answer(llm, ctx: PersonContext, item: dict, question: str, for_you: Optional[str], asked: List[str],
                 candidates: List[dict], timeout_s: float) -> dict:
    """→ {"kind", "says"?, "support_id"?, "notice"?} or {"kind": "unavailable"} when nothing passed in time."""
    if llm is None:
        return {"kind": "unavailable"}
    t0 = time.perf_counter()
    msgs = [{"role": "system", "content": system_prompt()},
            {"role": "user", "content": user_prompt(ctx, item, question, for_you, asked, candidates)}]
    ids = {c["id"] for c in candidates}
    last_why = ""
    for attempt in (1, 2):
        left = timeout_s - (time.perf_counter() - t0)
        if left < 2.5:
            break
        try:
            raw = await asyncio.wait_for(asyncio.to_thread(llm.chat_json, msgs, temperature=0.4 if attempt == 1 else 0.25,
                                                           max_tokens=700, timeout_s=max(2, int(left))), timeout=left)
        except Exception as e:
            logger.warning("ask attempt %d failed: %s %s", attempt, type(e).__name__, str(e)[:120])
            continue
        if not isinstance(raw, dict):
            continue
        kind = raw.get("kind") if raw.get("kind") in KINDS else "answer"
        if kind != "answer":
            return {"kind": kind}
        says, why = check_says(raw.get("says"), ctx, item)
        notice, why_n = check_notice(raw.get("notice"), ctx, item)
        if says:
            sid = raw.get("support_id")
            return {"kind": "answer", "says": says, "notice": notice,
                    "support_id": sid if isinstance(sid, str) and sid in ids else None}
        last_why = why or why_n
        msgs = msgs[:2] + [{"role": "user", "content": f"Your answer was set aside ({last_why}). Answer again, keeping every rule."}]
    logger.info("ask: nothing passed (%s)", last_why or "timeout")
    return {"kind": "unavailable"}


VERSE_ID_RE = re.compile(r"^(?P<text>[a-z]+)\.(?P<ch>\d+)\.(?P<v>\d+)$")


def support_candidates(rec, planner, verse_id: str, k: int = 4) -> List[dict]:
    """Verses that may support an answer: the same story's other verses, then the verses either side of it.
    Only library verses whose line exists; shown from the library, never from the model."""
    i = planner.idx.get(verse_id)
    if i is None:
        return []
    v = rec.verses[i]
    pool: List[int] = []
    for j in planner.prasang_verses.get(v.get("prasang_id") or "", []) or []:
        if j != i:
            pool.append(j)
    m = VERSE_ID_RE.match(verse_id)
    if m:
        for d in (-1, 1, -2, 2):
            j = planner.idx.get(f"{m['text']}.{m['ch']}.{int(m['v']) + d}")
            if j is not None and j != i:
                pool.append(j)
    out, seen = [], set()
    for j in pool:
        x = rec.verses[j]
        if x["id"] in seen or not x.get("line"):
            continue
        seen.add(x["id"])
        out.append({"id": x["id"], "ref": x.get("display_ref") or x.get("ref_label") or x["id"], "line": x["line"], "index": j})
        if len(out) == k:
            break
    return out

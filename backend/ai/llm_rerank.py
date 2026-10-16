"""
llm_rerank.py — a final, bounded LLM pass over the top candidates for the two picks that
matter most: the hook (does this line make THIS person feel understood?) and the story
(does its protagonist stand where this person stands?).

Embeddings rank by topic. They can't tell a mother letting her son go from a son at odds
with his parents: same words, opposite seat. A reader can, and a reader also hears age and
stage of life: a king's grief over his grown sons lands for a parent in their fifties, not
for a student. The pass sees the person as ai/voice.py person_brief() writes them (the
reading's paraphrases, their seat, age band and life stage), never the raw note, and only
ids we sent; anything else it returns is ignored. Timeout or error → the embedding order stands.
"""
from __future__ import annotations

import asyncio
import logging
import re
from typing import List, Optional, Tuple


logger = logging.getLogger(__name__)

HOOK_SYSTEM = """\
You score candidate opening verses for one person's plan. The person must read the line and think "that's me".
First decide the person's seat in their situation (for example: the adult child caring for an ill parent; the employee whose manager doubts them; the young person whose parents pressure them). Use their age band and stage of life: the same feeling sits differently at 22 and at 62.
Then score every candidate from 0.0 to 1.0:
  1.0  about their actual situation (the people, the loss, the work, the choice they described), spoken from the same seat or naming what they feel, and true to someone of their age and stage of life
  0.6  about their situation but from a neutral place, or naming their exact feeling in another setting
  0.3  a general line about the mind, fear or confusion that would fit almost anyone: it does not name what they told us
  0.1  lectures, speaks from the OTHER seat (the parent's feelings when the person is the child, the boss's view when they are the employee), belongs to a life stage that is not theirs, or only shares a word with their story (a verse about a god as a "friend" for someone whose marriage feels distant)
  0.0  could shame or blame them, or would read as calling them at fault for what they are suffering
Judge the verse as the scripture means it (its speaker, setting and plain sense), not as it could be bent to fit.
Return ONLY JSON: {"seat": "...", "scores": {"<id>": 0.0, ...}} with every candidate id."""

STORY_SYSTEM = """\
You pick one story (prasang) for a person's plan. The best story has a protagonist who stands where this person stands (same seat in the relationship, same kind of struggle, a similar stage of life: a student, a young adult finding their way, a parent, someone caring for the old, an elder letting go) and who finds a way through.
Avoid stories told from the other side, stories whose lesson would blame the person, and, if the person is being harmed, any story about enduring, obeying or keeping the peace.
Return ONLY JSON: {"pick": "<id>"}"""


def _person(person: str) -> str:
    """The person as the server sends them: a person_brief() block, or (older callers) a bare core_struggle."""
    person = (person or "").strip()
    return person if person.startswith("The person:") else f"The person: {person}"


def _hook_user(core: str, cands: List[dict]) -> str:
    rows = "\n".join(f"- id: {c['id']}\n  speaker: {c.get('speaker') or '?'}"
                     + (f" (to {c['listener']})" if c.get("listener") else "")
                     + f"\n  setting: {c.get('setting') or ''}\n  line: {c['line']}" for c in cands)
    return f"{_person(core)}\n\nCandidates:\n{rows}"


def _story_user(core: str, cands: List[dict]) -> str:
    rows = "\n".join(f"- id: {p['id']}\n  title: {p.get('title_en')}\n  characters: {', '.join(p.get('characters') or [])}\n"
                     f"  opening: {p.get('story_hook') or '(none)'}\n"
                     f"  summary: {p.get('summary')}\n  lesson: {p.get('lesson')}" for p in cands)
    return f"{_person(core)}\n\nStories:\n{rows}"


async def _ask(llm, system: str, user: str, timeout_s: float) -> Optional[dict]:
    try:
        return await asyncio.wait_for(
            asyncio.to_thread(llm.chat_json, [{"role": "system", "content": system}, {"role": "user", "content": user}],
                              temperature=0.1, max_tokens=300, timeout_s=max(2, int(timeout_s))),
            timeout=timeout_s,
        )
    except Exception as e:      # timeout, network, JSON: keep the embedding order
        logger.info("rerank skipped: %s", type(e).__name__)
        return None


async def rerank_hooks(llm, core: str, cands: List[dict], timeout_s: float) -> Tuple[List[str], bool]:
    ids, ok, _ = await rerank_hooks_scored(llm, core, cands, timeout_s)
    return ids, ok


async def rerank_hooks_scored(llm, core: str, cands: List[dict], timeout_s: float) -> Tuple[List[str], bool, dict]:
    """
    Candidate verse dicts (id, line, speaker, setting), in embedding order → ids best first, and whether
    the LLM took part. The LLM's perspective score is blended with the embedding rank, never trusted alone:
    a candidate it forgot to score keeps its place.
    """
    ids = [c["id"] for c in cands]
    if llm is None or len(cands) < 1:
        return ids, False, {}
    raw = await _ask(llm, HOOK_SYSTEM, _hook_user(core, cands), timeout_s)
    scores = (raw or {}).get("scores")
    if not isinstance(scores, dict):
        return ids, False, {}
    def llm_score(i: str) -> float:
        try:
            return max(0.0, min(1.0, float(scores.get(i, 0.5))))
        except (TypeError, ValueError):
            return 0.5
    n = len(ids)
    blended = {i: llm_score(i) + 0.4 * (1 - k / max(1, n - 1)) for k, i in enumerate(ids)}
    return sorted(ids, key=lambda i: -blended[i]), True, {i: llm_score(i) for i in ids}


async def rerank_story(llm, core: str, cands: List[dict], timeout_s: float) -> Tuple[Optional[str], Optional[str]]:
    """Candidate prasangs → (picked id or None, None). Day 7's line is the story's own hook title (ai/story_titles.py)."""
    if llm is None or len(cands) < 2:
        return None, None
    raw = await _ask(llm, STORY_SYSTEM, _story_user(core, cands), timeout_s)
    pick = (raw or {}).get("pick")
    if pick not in {p["id"] for p in cands}:
        return None, None
    return pick, None

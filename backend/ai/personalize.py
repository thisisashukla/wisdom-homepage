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
from typing import Dict, List, Optional, Sequence

from ai.mechanisms import MECHANISMS
from ai.people import invented_person
from ai.stance import ASPIRATION_WRITER_RE, WRONGED_WRITER_RE
from ai.understanding import CLICHE_RE, ui_line, _words
from ai.voice import (FIDELITY, OPENING_RE, SLANG_RE, VOICE, PersonContext, check_fidelity, grounding_block,
                      person_block, person_text, source_names)

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
- "meaning" (35 to 80 words): tell the verse like a storyteller, in flowing sentences, not a list of "He says" lines (use "says" at most once). Begin inside the moment, from the source: who is speaking, to whom, and what is happening (one or two sentences). Use only what the setting and the story give; if they do not describe the moment, do not invent one (no added battles, weather, feelings or gestures). What comes later in the story may be told as what comes next, never as this verse's own words. Then say what the verse proposes, in plain modern words, exactly as the translation and its point say it. You may end with one sentence that turns gently toward their life. Do not start with "This verse" or "Krishna says". If no speaker or setting is given, begin with the idea itself.
- "for_you" (20 to 50 words, second person): what this verse asks of their life today. Build it from their details, their age and stage of life and the day's job, at the week's level. Name something concrete from their life, then the verse's idea inside it. Do not repeat the meaning.
The translation is given so you understand the verse; quote the card line, never the translation's older words (unmanliness, scorcher of enemies, O Partha, thou). If the note they gave was thin or noise (see "note quality"), write for the feeling, the stage of life and the verse only: do not invent details of their day, and do not stretch the verse's image onto a habit you only guessed at.
THE WEEK IS ONE PIECE. You are given the week's thread, what each day must do for them, and for every day after the first, the verse the day before gave them. Write each day as the next step of that one argument: where it helps, let a half-sentence carry yesterday forward in your own words, never a recap, never on every day, and never with a stock phrase. Day 1 opens the bridge (their problem in the texts' terms) in your own fresh words; the last day should feel like the week closing, not another card.
FOR EACH STORY DAY write only "for_you" (20 to 50 words): what the story's hero shows them about their own situation, without retelling the story.

If they are being harmed by someone, never suggest enduring, adjusting, forgiving or keeping the peace. If they are in acute distress, be gentle and point only to the next small step.
Read "Where they stand" before you write. For an aspiration there is no wound: no consoling, no "you are not alone", no warning; believe the resolve and name what will test it. For someone wronged, the cause is in the other person: never suggest accepting, adjusting, patience, contentment, forgiving, lowering expectations or keeping the peace, never name envy, need for approval or their expectations as the trouble, and never ask them to earn or prove anything to the ones who diminish them.

Return ONLY JSON: {{"days": {{"<id>": {{"meaning": "...", "for_you": "..."}}, ...}}}} with every id (story days have no "meaning")."""

DIAGNOSIS_RE = re.compile(r"\b(diagnos|disorder|depress|anxiety disorder|adhd|trauma|toxic|narcissis)", re.I)
ENDURE_RE = re.compile(r"\b(endur\w*|tolerat\w*|adjust\w*|forgiv\w*|keep(ing)? the peace|put up with|bear it|patien\w*)\b", re.I)
YOU_RE = re.compile(r"\byou(r|'re|'ve|'d|'ll|rself)?\b", re.I)


VERDICT_RE = re.compile(r"\byou (have|did) (done )?nothing wrong\b|\byou are (a )?(good|bad) (person|man|woman|son|daughter|mother|father)\b"
                        r"|\bit'?s not your fault\b|\byou are (not )?to blame\b", re.I)
MUST_RE = re.compile(r"\byou (should|must|have to|need to)\b", re.I)


def _grams(s: str, n: int = 6) -> set:
    w = re.findall(r"[a-z']+", (s or "").lower())
    return {tuple(w[i:i + n]) for i in range(max(0, len(w) - n + 1))}


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


BLAME_RE = re.compile(r"\b(your own worst enemy|you (let|allow|allowed) (them|him|her|it)|your mind is (the|your) (obstacle|enemy|problem)|"
                      r"let go of (your|the) (children|son|daughter|family|kids|parents)|your own company is enough|you did not give it|"
                      r"pull yourself together|their smallness is|be content with whatever comes)\b", re.I)
SCAFFOLD_RE = re.compile(r"\b(yesterday'?s verse named the grip|named the grip|for you, today|narrator said)\b", re.I)
USER_GENDERED_RE = re.compile(r"\bas a (mother|father|wife|husband|woman|man|girl|guy|son|daughter|bahu|mom|mum|dad)\b|"
                              r"\b(perfect|good|bad|real) (mother|father|wife|husband|son|daughter|man|woman)\b|\byour (husband|wife)\b", re.I)


GONE_RE = re.compile(r"\b(is gone|are gone|will (never|not) (come back|return)|never see (his|her|their) face again|has left this world|"
                     r"passed (away|on)|no longer (here|with you))\b", re.I)
INVENTED_RE = re.compile(r"\b(l(ie|ying) awake|can'?t sleep|sleepless|anxious|anxiety|panic|the (fear|doubt) (is|has) (already )?(starting|begun|started)|"
                         r"(in|inside) (the|your) marriage|your marriage is)\b", re.I)


def _why(text, lo: int, hi: int, risk: str, item: Optional[dict] = None, grounded: bool = False,
         stance: str = "struggle", gender_known: bool = True, known: str = "", bereaved: bool = True,
         people: Optional[Sequence[str]] = None) -> tuple[Optional[str], str]:
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
    if stance == "wronged" and WRONGED_WRITER_RE.search(s):
        return None, "accept"
    if stance == "aspiration" and ASPIRATION_WRITER_RE.search(s):
        return None, "console"
    if not gender_known and USER_GENDERED_RE.search(s):
        return None, "gendered"
    if BLAME_RE.search(s):
        return None, "blame"
    if SCAFFOLD_RE.search(s):
        return None, "scaffold"
    if not bereaved and GONE_RE.search(s):
        return None, "verdict"
    m = INVENTED_RE.search(s)
    if m and known and not re.search(re.escape(m.group(0).split()[0].lower()[:5]), known.lower()):
        return None, "invented"
    if not grounded and invented_person(s, people, yours_only=True):
        return None, "invented"
    if item is not None:
        ok, why = check_fidelity(s, item, known)
        if not ok:
            return None, why.split(":")[0]
    return s, ""


def soften(text) -> str:
    """Mild faults are repaired, not rejected: an order becomes an opening ("you should" → "you could"), a stock connecting
    phrase is dropped. A line that is otherwise theirs stays theirs; a template is never better than a repaired sentence."""
    if not isinstance(text, str):
        return text
    s = re.sub(r"\byou (should|must|have to|need to|ought to)\b", "you could", text, flags=re.I)
    s = re.sub(r"\byesterday'?s verse named the grip[.;:,]?\s*", "", s, flags=re.I)
    s = re.sub(r"^\s*(today|for you today)[,.:]\s*", "", s, flags=re.I)
    return s


def why_for_you(text, risk: str = "none", item: Optional[dict] = None, stance: str = "struggle", gender_known: bool = True,
                known: str = "", bereaved: bool = True, people: Optional[Sequence[str]] = None) -> tuple[Optional[str], str]:
    s, why = _why(soften(text), 12, 55, risk, item, stance=stance, gender_known=gender_known, known=known, bereaved=bereaved, people=people)
    if s and OPENING_RE.match(s):                         # drop a "This verse..." opening sentence, keep the rest
        rest = re.sub(r"^[^.!?]*[.!?]\s*", "", s, count=1)
        s = rest if len(_words(rest)) >= 12 else None
    if s and not YOU_RE.search(s):
        return None, "not_second_person"
    if s and OPENING_RE.match(s):
        return None, "opening"
    if s and MUST_RE.search(s):
        return None, "preachy"
    return s, why


ARCHAIC_RE = re.compile(r"\b(unmanl\w*|scorcher of (enemies|foes)|o (partha|bharata|arjuna)|thou|thee|thy|hath|doth|verily|"
                        r"son of (kunti|pritha|bharata)|mighty[- ]armed|bull among men|conqueror of (sleep|wealth))\b", re.I)


def why_meaning(text, item: dict, risk: str = "none", stance: str = "struggle", gender_known: bool = True,
                known: str = "", bereaved: bool = True) -> tuple[Optional[str], str]:
    s, why = _why(soften(text), 25, 95, risk, item, grounded=True, stance=stance, gender_known=gender_known, known=known, bereaved=bereaved)
    if s and ARCHAIC_RE.search(s):
        return None, "archaic"
    if s and OPENING_RE.match(s):
        return None, "opening"
    if s and MUST_RE.search(s):
        return None, "preachy"
    return s, why


def check_for_you(text, risk: str = "none", item: Optional[dict] = None) -> Optional[str]:
    return why_for_you(text, risk, item)[0]


def check_meaning(text, item: dict, risk: str = "none") -> Optional[str]:
    return why_meaning(text, item, risk)[0]


# Why a part was rejected, said back to the model when it is asked once more (never the rejected text).
REASON_TEXT = {
    "accept": "it asked them to accept, adjust, be patient, be content or forgive, or placed the cause in them; they are being wronged, so give footing, courage and the true word instead",
    "console": "it consoled a wound they do not have; nothing is wrong with them, meet the resolve and name what will test it",
    "endure": "it asked someone being harmed to endure, adjust or keep the peace",
    "preachy": "it told them what they should, must or need to do; show what the verse shows and let them see it",
    "verdict": "it passed a verdict on them (not your fault, you are a good person); show, do not judge",
    "cliche": "it used a cliche (journey, embrace, healing, you are not alone, the universe)",
    "diagnosis": "it used a clinical label",
    "slang": "it slipped into slang",
    "opening": "it opened with 'This verse' or 'Krishna says'",
    "not_second_person": "it was not written to them (no you)",
    "gendered": "it called them a mother, father, wife, husband, man or woman; they did not say, so write without gender",
    "copied": "it repeated, word for word, a line they have already read this week (the bridge, the insight or another day); say it fresh",
    "blame": "it made them responsible for what others do to them, or told the lonely to let go of their family; name what is theirs and what is not",
    "scaffold": "it used a stock connecting phrase; write the link in your own words or leave it out",
    "invented": "it stated a feeling or fact they never gave (lying awake, anxious, a marriage gone cold); use only what they told us",
    "repeat": "it leaned again on a word they have already read three times this week (the same image every day wears thin); find a fresh one",
    "archaic": "it used the translation's old words (unmanliness, scorcher of enemies, O Partha); use the card line's words and today's English",
    "invented_name": "it brought in a character or text the source does not have",
    "invented_quote": "it quoted words the source does not contain",
    "short": "it was too short", "long": "it was too long",
}


def _user(ctx: PersonContext, items: List[dict], redo: Optional[Dict[str, List[str]]] = None) -> str:
    rows = []
    for it in items:
        kind = "story" if it.get("kind") == "story" else "verse"
        row = f"- id: {it['id']}\n  kind: {kind}\n  day: {it.get('day') or '?'} of 7\n  job: {JOB.get(it['beat'], it['beat'])}"
        if ctx.week_beats.get(it["beat"]):
            row += f"\n  what this day must do for them: {ctx.week_beats[it['beat']]}"
        if it.get("prev_line"):
            row += f"\n  the day before gave them ({it.get('prev_ref') or 'a verse'}): {it['prev_line']}"
        rows.append(row + "\n" + grounding_block(it))
    head = f"THE PERSON\n{person_block(ctx)}\n\nDAYS\n" + "\n".join(rows)
    if redo:
        notes = "\n".join(f"- {i}: {'; '.join(REASON_TEXT.get(r, r) for r in rs)}" for i, rs in redo.items())
        head += ("\n\nSECOND ATTEMPT. Your earlier words for these days were set aside for the reasons below. Write them again,\n"
                 "fresh, keeping every rule above:\n" + notes)
    return head


def system_prompt() -> str:
    return SYSTEM.format(voice=VOICE, fidelity=FIDELITY)


async def _call(llm, ctx: PersonContext, items: List[dict], timeout_s: float, redo: Optional[Dict[str, List[str]]] = None) -> dict:
    msgs = [{"role": "system", "content": system_prompt()}, {"role": "user", "content": _user(ctx, items, redo)}]
    raw = None
    t0 = time.perf_counter()
    for attempt in (1, 2):                      # a second try for broken JSON or a hiccup, while there is time
        left = timeout_s - (time.perf_counter() - t0)
        if left < 2.5:
            break
        try:
            raw = await asyncio.wait_for(
                asyncio.to_thread(llm.chat_json, msgs, temperature=0.45 if attempt == 1 else 0.3, max_tokens=1300 * len(items) + 400,
                                  timeout_s=max(2, int(left))),
                timeout=left)
            break
        except Exception as e:
            logger.warning("personal parts attempt %d failed for %d items: %s %s", attempt, len(items), type(e).__name__, str(e)[:120])
    if raw is None:
        return {}
    if not isinstance(raw, dict):
        return {}
    days = raw.get("days")
    if isinstance(days, dict):
        want = [it["id"] for it in items]
        if any(i not in days for i in want):
            logger.info("personal parts: asked %s, got keys %s", want, list(days)[:6])
        # the model sometimes keys a day by its reference or a bare number instead of the id
        if len(days) == len(want) and not all(i in days for i in want):
            vals = list(days.values())
            if all(isinstance(v, dict) for v in vals):
                days = {i: v for i, v in zip(want, vals)}
                logger.info("personal parts: re-keyed by position")
        return days
    lines = raw.get("lines")                  # the older one-line shape, still accepted
    return {k: {"for_you": v} for k, v in lines.items()} if isinstance(lines, dict) else {}


def _chunks(items: List[dict], size: int) -> List[List[dict]]:
    return [items[i:i + size] for i in range(0, len(items), size)]


async def personal_parts(llm, ctx: PersonContext, items: List[dict], timeout_s: float,
                         chunk: int = 1) -> Dict[str, Dict[str, str]]:
    """items (ai/voice.py item_from_card) → {id: {"meaning"?, "for_you"?}} for the parts that pass every check."""
    if llm is None or not items or timeout_s < 1.5:
        return {}
    for k, it in enumerate(items):                 # continuity: every day knows the day before
        it.setdefault("day", k + 1)
        if k:
            it["prev_line"], it["prev_ref"] = items[k - 1].get("line"), items[k - 1].get("ref") or items[k - 1].get("title")
    t0 = time.perf_counter()
    parts_in = [items[:1]] + _chunks(items[1:], chunk)      # each day alone (chunk=1): a pair loses its second day one time in four on Sarvam
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
    redo: Dict[str, List[str]] = {}
    by_id = {it["id"]: it for it in items}

    known = person_text(ctx)
    shown_lines: List[str] = [s for s in (ctx.bridge, ctx.insight) if s]   # already on their screen
    seen_lines: List[str] = []                                              # earlier days this week

    STOP = set("the a an and or but of to in on at for with from by as is are was were be been being it its this that these those you your yours yourself they them their there here not no nor so than then too very can will just do does did done have has had having what which who whom whose when where why how all any both each few more most other some such only own same about into over under again further once before after above below up down out off while because until against between through during without within along across behind beyond toward towards upon".split())

    def content_words(s: str):
        return {w for w in re.findall(r"[a-z']+", s.lower()) if len(w) > 3 and w not in STOP}

    motif: Counter = Counter(content_words(ctx.bridge) | content_words(ctx.insight))
    note_words = content_words(known)

    def hammered(s: str) -> bool:
        """A motif word used on three or more earlier screens this week, and not one the person used, is a tic."""
        return any(motif[w] >= 3 and w not in note_words for w in content_words(s))

    def copied(s: str) -> bool:
        """Six words in a row lifted from the bridge or the insight, or a day repeated word for word."""
        g = _grams(s, 8)
        return any(len(g & _grams(x, 8)) >= 1 for x in shown_lines) or s.strip().lower() in {x.strip().lower() for x in seen_lines}

    SOFT = {"repeat", "copied", "scaffold", "opening", "long"}
    soft: Dict[str, str] = {}                 # a personal line that failed only a soft rule: kept over any template

    def take(it: dict, r: dict) -> List[str]:
        """Check one day's parts into `out`; returns the reasons of the parts that failed a guardrail."""
        parts = out.setdefault(it["id"], {})
        bad: List[str] = []
        if "for_you" not in parts:
            fy, why = why_for_you(r.get("for_you"), ctx.risk, it, ctx.stance, bool(ctx.gender), known, ctx.bereaved, ctx.people)
            if fy is None and why in SOFT and isinstance(r.get("for_you"), str):
                cand = ui_line(soften(r["for_you"]), source_names(it))
                if 12 <= len(_words(cand)) <= 70 and YOU_RE.search(cand):
                    soft.setdefault(it["id"], cand)
            if fy and copied(fy):                       # drop the lifted sentence; keep the rest when enough remains
                soft.setdefault(it["id"], fy)
                fy2 = " ".join(x for x in re.split(r"(?<=[.!?])\s+", fy) if not copied(x))
                if len(_words(fy2)) >= 12 and YOU_RE.search(fy2):
                    fy = fy2
                else:
                    fy, why = None, "copied"
            if fy and hammered(fy):
                soft.setdefault(it["id"], fy)
                fy, why = None, "repeat"
            if fy:
                parts["for_you"] = fy
                seen_lines.append(fy)
                for w in content_words(fy):
                    motif[w] += 1
            elif why:
                bad.append(why)
        if it.get("kind") != "story" and "meaning" not in parts:
            m, why = why_meaning(r.get("meaning"), it, ctx.risk, ctx.stance, bool(ctx.gender), known, True)
            if m and copied(m):                       # the insight put in a character's mouth: cut that sentence
                m2 = " ".join(x for x in re.split(r"(?<=[.!?])\s+", m) if not copied(x))
                m, why = (m2, "") if len(m2.split()) >= 25 else (None, "copied")
            if m:
                parts["meaning"] = m
            elif why:
                bad.append(why)
        return bad

    for it in items:
        bad = take(it, raw.get(it["id"]) or {})
        if bad and any(b != "missing" for b in bad):
            redo[it["id"]] = [b for b in bad if b != "missing"]
        for b in bad:
            dropped[b] += 1
    # A part that failed a guardrail (counselled acceptance, consoled a resolve, preached, a cliche) is asked
    # once more with the reason, while there is time: the library's generic line is the last resort, not the
    # first, and least of all on Day 1.
    left = timeout_s - (time.perf_counter() - t0)
    if redo and left >= 3:
        ctx.flags.append(f"redo:{len(redo)}")
        again: Dict[str, dict] = {}
        for g in await asyncio.gather(*(_call(llm, ctx, part, left, {i: redo[i] for i in (x["id"] for x in part)})
                                        for part in _chunks([by_id[i] for i in redo], chunk))):
            again.update({k: v for k, v in g.items() if isinstance(v, dict)})
        fixed = 0
        for i, rs in redo.items():
            bad = take(by_id[i], again.get(i) or {})
            fixed += len(rs) - len([b for b in bad if b != "missing"])
        ctx.flags.append(f"redo_fixed:{fixed}")
    first = items[0]
    left = timeout_s - (time.perf_counter() - t0)
    if first.get("kind") != "story" and not out.get(first["id"], {}).get("for_you") and left >= 2.5:
        ctx.flags.append("day1:third_try")               # Day 1 gets one more chance of its own before any template
        g = await _call(llm, ctx, [first], left, {first["id"]: redo.get(first["id"], ["missing"])})
        if isinstance(g.get(first["id"]), dict):
            take(first, g[first["id"]])
    for i, cand in soft.items():                      # imperfect and theirs beats perfect and nobody's
        have = {v.get("for_you", "").strip().lower() for v in out.values()}
        if not out.get(i, {}).get("for_you") and cand.strip().lower() not in have:
            out.setdefault(i, {})["for_you"] = cand
            dropped["soft_kept"] += 1
    # Last resort for a verse day still without "For you": a line in the week's own register (the mechanism's
    # statement for that beat), never the library's one-size "why", which can be about something else entirely.
    m = MECHANISMS.get(ctx.mechanism or "")
    if m and ctx.mechanism == "grief_attachment" and not ctx.bereaved:
        m = None                                      # its lines speak of a death; better the library's own note
    if m:
        from ai.mechanisms import INSIGHTS
        second = lambda xs: [x for x in xs if YOU_RE.search(x)] or [INSIGHTS.get(ctx.mechanism, INSIGHTS["default"])]
        pool = [m["steady"], m["self"], m["diagnose"], m["self_act"], m["act"], INSIGHTS.get(ctx.mechanism, INSIGHTS["default"])]
        beat_lines = {"hook": second([m["steady"], m["self"]] + pool), "diagnose": second([m["diagnose"], m["steady"]] + pool),
                      "steady": second([m["steady"], m["self"]] + pool), "act": second([m["act"], m["self_act"]] + pool)}
        taken = {v.get("for_you") for v in out.values()}
        for it in items:
            if it.get("kind") != "story" and not out.get(it["id"], {}).get("for_you") and it["beat"] in beat_lines:
                opts = beat_lines[it["beat"]]
                line = next((x for x in opts if x not in taken), opts[-1])
                out.setdefault(it["id"], {})["for_you"] = line
                taken.add(line)
                dropped["fallback_line"] += 1
    for it in items:                                   # a story day without words of its own keeps the story's lesson
        if it.get("kind") == "story" and not out.get(it["id"], {}).get("for_you") and it.get("lesson") and YOU_RE.search(it["lesson"]):
            out.setdefault(it["id"], {})["for_you"] = it["lesson"]
            dropped["fallback_lesson"] += 1
    out = {k: v for k, v in out.items() if v}
    if dropped:                                   # reasons only, never the text: tunes the prompt without logging a life
        ctx.flags.append("dropped:" + ",".join(f"{k}={v}" for k, v in sorted(dropped.items())))
    return out

"""
voice.py — how Wisdom speaks when it writes for one person, and what it may never do to the texts.

Shared by every prompt that writes words the person reads about a verse or story
(ai/personalize.py: "What it says" + "For you"; ai/depth.py: "Go deeper") and by the
LLM reranks (ai/llm_rerank.py), so all of them know the same person and keep the same promise.

    VOICE           the storyteller friend: calm, warm, plain modern English, a philosophical
                    undertone, never slang, never preachy
    FIDELITY        spiritual honesty: the verse's proposition is fixed. We contextualise it for
                    their life in today's words; we never revise it, soften it or add to it
    person_block    who they are: age band, life stage, phone time, their seat in the situation,
                    a paraphrase of their life (never the raw note), the root cause, and what has
                    already helped them on this journey
    grounding_block everything the library knows about the verse or story (speaker, listener,
                    setting, translation, its point, what it does not mean, the story around it).
                    The model may draw only on this.
    check_fidelity  the mechanical half of the promise: a line that brings in a character the
                    grounding doesn't have, quotes words the text doesn't say, or slips into slang
                    is dropped (the app then shows the library's own content).

Privacy: everything here is built from the reading's paraphrase (ai/understanding.py), the
profile chips and verse ids. The raw note never reaches these prompts.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Sequence

# ── Who they are ──────────────────────────────────────────────────────────────
AGE_PHRASE = {"u25": "under 25", "25_34": "25 to 34", "35_44": "35 to 44", "45_54": "45 to 54", "55p": "55 or older"}
STAGE_PHRASE = {"studying": "studying", "working": "working", "own_thing": "running their own thing",
                "raising_kids": "raising kids", "caring_parents": "caring for their parents", "retired": "retired",
                "between": "between things"}

# How to speak to each age: the register and the kind of example that will feel like theirs.
# These are lenses for choosing words and examples, never facts about the person.
AGE_LENS = {
    "u25": "Speak like a trusted older cousin, never like a parent or a teacher. Their life is still being built: exams, first jobs, "
           "friendships, what their family hopes for them, who they are becoming.",
    "25_34": "Speak as a peer who is a few steps ahead. Life is being set up: career, comparison with others, a partner or a home, "
             "proving themselves, distance from family.",
    "35_44": "Speak as one equal to another. Life is full and pulled in many directions: work that carries weight, children or "
             "parents who need them, very little time that is their own.",
    "45_54": "Speak with the respect due to someone carrying a lot. This is a time of reckoning: what the work has been for, "
             "children growing away, parents growing old, the body asking to be heard.",
    "55p": "Speak with respect for everything they have lived; never explain life to them. This is a time of letting go and "
           "taking stock: retirement, health, children with lives of their own, what remains to be done and what to release.",
}

# What each week of the plan is for (ai/mechanisms.py LEVELS).
LEVEL_JOB = {
    "situation": "week 1, their situation: meet them inside what is happening now",
    "pattern": "week 2, the pattern underneath: show how the same root cause runs through other parts of their life",
    "self": "week 3, who they are beyond it: point to the self that is not the role, the result or the fear",
}


@dataclass
class PersonContext:
    """One person, as every writing prompt sees them. Built in server/plan.py from the request
    (profile, journey) and the Understanding (paraphrases only)."""
    age: Optional[str] = None
    stages: Sequence[str] = ()
    phone_hours: Optional[int] = None
    seat: str = ""                       # their place in the situation ("the adult son of parents who doubt his work")
    life_context: str = ""               # 1-2 sentences, third person, concrete, no names
    details: Sequence[str] = ()          # up to 4 short facts they gave (paraphrased)
    core: str = ""                       # core_struggle
    insight: str = ""                    # "What's really going on"
    root: str = ""                       # mechanism label
    situations: Sequence[str] = ()       # situation labels
    risk: str = "none"
    level: str = "situation"
    week: int = 1
    days_seen: int = 0                   # days of the plan they have already opened
    helped: Sequence[str] = ()           # lines of verses they said helped
    past: Sequence[str] = ()             # labels of earlier situations they worked through
    flags: List[str] = field(default_factory=list)


def person_block(c: PersonContext) -> str:
    """The person, as plain lines. Every line is ours (labels, paraphrases), never their note."""
    lines = []
    if c.age in AGE_PHRASE:
        lines.append(f"Age: {AGE_PHRASE[c.age]}")
    stages = [STAGE_PHRASE.get(s, s) for s in c.stages if s]
    if stages:
        lines.append(f"Stage of life: {', '.join(stages)}")
    if c.phone_hours:
        lines.append(f"Time on the phone each day: about {c.phone_hours} hours")
    if c.seat:
        lines.append(f"Their place in it: {c.seat}")
    if c.life_context:
        lines.append(f"Their life right now: {c.life_context}")
    if c.details:
        lines.append("What they told us: " + "; ".join(c.details))
    if c.core:
        lines.append(f"What they are struggling with: {c.core}")
    if c.insight:
        lines.append(f"What is really going on: {c.insight}")
    if c.root:
        lines.append(f"Root cause underneath: {c.root}")
    if c.situations:
        lines.append(f"Their situations: {', '.join(c.situations)}")
    if c.risk == "distress":
        lines.append("They are in acute pain right now: be especially gentle and keep everything small.")
    if c.age in AGE_LENS:
        lines.append(f"How to speak to them: {AGE_LENS[c.age]}")
    lines.append(f"Where they are in their plan: {LEVEL_JOB.get(c.level, LEVEL_JOB['situation'])}"
                 + (f"; they have opened {c.days_seen} days so far" if c.days_seen else ""))
    if c.helped:
        lines.append("Verses that already helped them (you may connect to their idea once, never quote them): "
                     + " | ".join(c.helped[:3]))
    if c.past:
        lines.append("What they worked through before: " + "; ".join(c.past[:3]))
    return "\n".join(lines)


def person_brief(c: PersonContext) -> str:
    """A short version for the reranks: who they are and where they stand."""
    bits = []
    if c.age in AGE_PHRASE:
        bits.append(f"aged {AGE_PHRASE[c.age]}")
    stages = [STAGE_PHRASE.get(s, s) for s in c.stages if s]
    if stages:
        bits.append(", ".join(stages))
    head = "; ".join(bits)
    lines = [f"The person: {c.core}" + (f" ({head})" if head else "")]
    if c.seat:
        lines.append(f"Their place in it: {c.seat}")
    if c.life_context:
        lines.append(f"Their life right now: {c.life_context}")
    return "\n".join(lines)


# ── How we speak ──────────────────────────────────────────────────────────────
VOICE = """\
HOW YOU SPEAK
You are a friend who has lived with these texts for many years, sitting with someone you care about after they have told you what they are going through. You know their age, their stage of life and their situation. You tell a verse the way a good storyteller would: who said it, to whom, at what moment, and what was at stake. Then you carry its idea across into their life, calmly and clearly, with a philosophical undertone: the truth underneath, not a rule to follow.
- Calm, warm, plain modern English. Short sentences, everyday words, present tense where you can. No slang, no internet talk, no exclamation marks, no emojis, no dashes.
- Empathy first, then clarity. Acknowledge what is hard for them before you say what the verse offers. Never rush them, never cheer them on.
- Fit their age and stage of life: the examples, the weight and the tone should belong to someone of their age living their kind of life. Do not talk down to the young or explain life to the old.
- Never preach, lecture, warn, diagnose or promise an outcome. No "you should", "you must", "everything happens for a reason", "the universe".
- Do not hand out verdicts on them, kind or harsh ("you did nothing wrong", "you are a good son"). Show them what the verse shows and let them see it for themselves.
- No cliches: journey, inner peace, peace begins, true peace, embrace, healing, unlock, navigate, resonate, self-care, mindfulness, holding space.
- Avoid Sanskrit words. If one is truly needed (dharma, karma), explain it in the same sentence. Karma is never fate; dharma is never religion."""

FIDELITY = """\
SPIRITUAL HONESTY (never break these)
- The verse's meaning is fixed. Draw only on the source given for it: its translation, speaker, listener, setting, its point, the story around it. Do not add teachings, promises, events, characters or details the source does not contain, and do not bring in other verses, texts or teachers.
- Never bend what the verse proposes to make it more comforting or more modern. If it asks something hard of them, say so kindly and plainly. Modern words are for clarity only ("results" for the fruits of action, "your part" for duty); the idea stays exactly what it is.
- The story around a verse is background only. What the verse proposes comes from its card line, translation and point; never credit it with teachings from the rest of its chapter or story.
- Respect "what it does not mean": never read the verse that way, even by implication.
- A practice you suggest must apply what the verse itself says to their day (if it says rest the senses and give attention to one thing, suggest exactly that, in their evening). Do not import techniques the verse does not name, such as breathing exercises, journaling or gratitude lists.
- Do not put words in anyone's mouth. Quote nothing except the verse's own line or translation.
- Their life comes only from what they told us. You may picture an ordinary moment of the life they described, but never add people, places, events or feelings they did not mention. Where you are unsure, speak about the situation, not about facts."""


# ── The verse or story, as the model may use it ──────────────────────────────
def item_from_card(card: dict, beat: str) -> dict:
    """A plan card (server/plan.py _verse/_story) → the item a writing prompt is grounded in."""
    if beat == "story" or card.get("beat") == "story":
        anchor = card.get("anchor") or {}
        return {"id": card["id"], "beat": "story", "kind": "story", "title": card.get("title"),
                "characters": card.get("characters") or [], "summary": card.get("summary") or "",
                "lesson": card.get("lesson"), "opening": card.get("story_hook"),
                "line": anchor.get("line"), "ref": anchor.get("ref")}
    p = card.get("prasang") or {}
    return {"id": card["id"], "beat": beat, "kind": "verse", "ref": card.get("ref"), "line": card.get("line") or "",
            "translation": card.get("translation"), "speaker": card.get("speaker"), "listener": card.get("listener"),
            "setting": card.get("setting"), "point": card.get("why"), "misuse": card.get("misuse"),
            "story_title": p.get("title"), "story": p.get("summary"), "lesson": p.get("lesson")}


def item_from_library(v: Optional[dict], p: Optional[dict], beat: str) -> Optional[dict]:
    """A library verse (with its prasang) or a prasang alone → a grounding item."""
    p = p or {}
    if v is not None:
        return {"id": v["id"], "beat": beat, "kind": "verse",
                "ref": v.get("display_ref") or v.get("ref_label") or v["id"], "line": v.get("line") or "",
                "translation": v.get("translation"), "speaker": v.get("speaker"), "listener": v.get("listener"),
                "setting": v.get("setting"), "point": v.get("reflection") or p.get("lesson"), "misuse": v.get("misuse"),
                "story_title": p.get("title_en"), "story": p.get("summary"), "lesson": p.get("lesson")}
    if p:
        return {"id": p["id"], "beat": "story", "kind": "story", "title": p.get("title_en"),
                "characters": p.get("characters") or [], "summary": p.get("summary") or p.get("title_en") or "",
                "lesson": p.get("lesson"), "opening": p.get("story_hook")}
    return None


def grounding_block(it: dict) -> str:
    """The source the model may draw on, labelled so it can tell the text from its commentary."""
    if it.get("kind") == "story":
        rows = [f"story: {it.get('title') or ''}".rstrip(),
                f"characters: {', '.join(it.get('characters') or [])}" if it.get("characters") else "",
                f"how it opens: {it['opening']}" if it.get("opening") else "",
                f"what happens: {it.get('summary') or ''}",
                f"what it shows: {it['lesson']}" if it.get("lesson") else "",
                f"a line from it: {it['line']}" if it.get("line") else ""]
    else:
        who = it.get("speaker") and (f"{it['speaker']} to {it['listener']}" if it.get("listener") else it["speaker"])
        rows = [f"reference: {it['ref']}" if it.get("ref") else "",
                f"said by: {who}" if who else "",
                f"setting: {it['setting']}" if it.get("setting") else "",
                f"card line: {it.get('line') or ''}",
                f"translation: {it['translation']}" if it.get("translation") and it.get("translation") != it.get("line") else "",
                f"its point: {it['point']}" if it.get("point") else "",
                f"what it does NOT mean: {it['misuse']}" if it.get("misuse") else "",
                f"the story around it: {it.get('story_title') or ''}. {it['story']}".strip(". ") if it.get("story") else ""]
    return "\n".join(f"  {r}" for r in rows if r)


def source_text(it: dict) -> str:
    parts = []
    for k, v in it.items():
        if k in ("id", "beat", "kind") or not v:
            continue
        parts.append(", ".join(map(str, v)) if isinstance(v, list) else str(v))
    return " ".join(parts)


# ── Fidelity checks ──────────────────────────────────────────────────────────
# Characters, teachers and texts a line might bring in. Generic words of reverence are fine anywhere.
NAMED = {
    "Krishna", "Arjuna", "Rama", "Ram", "Sita", "Lakshmana", "Lakshman", "Hanuman", "Bharata", "Bharat", "Ravana",
    "Vibhishana", "Vibhishan", "Sugriva", "Shiva", "Parvati", "Durga", "Draupadi", "Yudhishthira", "Bhishma", "Karna",
    "Kunti", "Vidura", "Dhritarashtra", "Duryodhana", "Drona", "Gandhari", "Dasharatha", "Kausalya", "Kaikeyi",
    "Shabari", "Ahalya", "Nachiketa", "Yama", "Prahlad", "Prahlada", "Dhruva", "Sudama", "Yashoda", "Radha", "Meera",
    "Tulsidas", "Surdas", "Vasishtha", "Valmiki", "Vyasa", "Narada", "Savitri", "Satyavan", "Nala", "Damayanti",
    "Harishchandra", "Ashtavakra", "Janaka", "Vivekananda", "Kabir", "Bhartrihari", "Sanjaya", "Buddha", "Gandhi",
    "Upanishad", "Upanishads", "Ramayana", "Mahabharata", "Ramcharitmanas", "Vedas", "Rumi", "Jesus", "Bible",
}
QUOTE_RE = re.compile(r"[\"“”]([^\"“”]{12,})[\"“”]")
SLANG_RE = re.compile(
    r"\b(gonna|wanna|gotta|kinda|sorta|lol|omg|bro|dude|vibes?|literally|awesome|crush(ing)? it|grind(ing)?|hustle|"
    r"hacks?|no cap|low[- ]?key|high[- ]?key|fam|legit|totally|super (hard|easy|important|tough)|game[- ]changer|"
    r"level up|mindset shift|let'?s go|you got this|boss (up|babe))\b", re.I)
OPENING_RE = re.compile(r"^(this|the) (verse|shloka|line)\b|^in this (verse|shloka)\b|^(krishna|the gita) (says|tells us)\b", re.I)
TOK_RE = re.compile(r"[a-z']+")


def _toks(s: str) -> set:
    return set(TOK_RE.findall((s or "").lower()))


NAME_RE = re.compile(r"\b[A-Z][a-zA-Z]+(?:['’]s)?\b")


def source_names(it: dict) -> set:
    """Proper names the source itself uses (speaker, listener, places in its setting and story): a line told
    from it may keep them."""
    return {re.sub(r"['’]s$", "", m) for m in NAME_RE.findall(source_text(it))}


def check_fidelity(text: str, it: dict) -> tuple[bool, str]:
    """(ok, reason). A line fails if it names a character or text the source doesn't, quotes words the
    source doesn't contain, or slips into slang."""
    if SLANG_RE.search(text):
        return False, "slang"
    src = source_text(it)
    src_low = src.lower()
    for name in NAMED:
        if re.search(rf"\b{name}\b", text):
            stem = name.lower()[:4] if len(name) > 4 else name.lower()
            if not re.search(rf"\b{re.escape(stem)}", src_low):
                return False, f"invented_name:{name}"
    for q in QUOTE_RE.findall(text):
        qt = _toks(q)
        if len(qt) >= 3 and len(qt & _toks(src)) / len(qt) < 0.7:
            return False, "invented_quote"
    return True, ""

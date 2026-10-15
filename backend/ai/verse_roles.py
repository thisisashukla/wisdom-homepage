"""
verse_roles.py — what job a verse can do in a plan.

A plan week walks one person through their struggle: see it, steady it, act on it, then a story.

    hook      "This is me."        (see)    The verse names the state they are in, so they feel understood.
    diagnose  "So that's why."     (see)    The verse names the mechanism underneath (the root cause).
    steady    "I can hold this."   (steady) An inner truth or stance that steadies the mind: not a task, a footing.
    act       "Here's what to do." (act)    The verse gives a practice, a step or a way to respond.
    story     "Someone lived it."           A prasang where a character went through the same thing.

Every week runs the same shape, at a deeper level each time (see LEVELS):

    situation  week 1  their life as it is: "you're worried about money for your family"
    pattern    week 2  the pattern behind it, anywhere in life: "needing to control how it turns out"
    self       week 3  who they are beyond it: the self that isn't the role or the result, and acting from there

A verse gets a 0..1 score for each job and for each level.

The library tags verses by topic (situations, themes) and by voice (tone), but not
by job. A verse about the restless mind can be a hook ("the mind is restless, like
holding the wind", Gita 6.34) or an action ("practice and letting go can train it",
Gita 6.35). This module scores every verse for each job, 0..1.

Two sources, best first:
  1. data/taxonomy/verse_roles.json, written by scripts/label_verse_roles.py (an LLM
     reads each verse once and scores the four jobs and the three levels). Used whenever present;
     labels from before schema 2 have no steady/levels, and heuristics fill those in.
  2. Heuristics on the card line (our own short English): who speaks, sentence shape
     (imperatives → act, cause-and-effect → diagnose, first-person states and
     questions → hook, footing words → steady), self-teaching words (→ self level) and tone.
"""
from __future__ import annotations

import json
import logging
import re
from pathlib import Path
from typing import Dict, Optional

logger = logging.getLogger(__name__)

ROLES = ("hook", "diagnose", "steady", "act")
LEVELS = ("situation", "pattern", "self")

# People in the texts who voice the struggle rather than the answer. Their verses
# are where a reader most often says "that's me".
SUFFERERS = {
    "Arjuna", "Tulsidas", "Surdas", "Meera", "Sita", "Bharat", "Dasharatha", "Dashrath", "Draupadi",
    "Yudhishthira", "Kausalya", "Sumitra", "Kunti", "Gandhari", "Dhritarashtra", "Angad", "Sugriva",
    "Vibhishan", "Ahalya", "Shabari", "Urmila", "Nidagha", "Rama (grieving)", "Krishna (message to Yashoda)",
}
TEACHERS = {"Krishna", "Vasishtha", "Ashtavakra", "Vidura", "Bhishma", "Swami Vivekananda", "Seer", "Teacher",
            "Shiva", "Dattatreya", "Ribhu", "Uddalaka Aruni", "Yajnavalkya", "Kakbhushundi", "Pippalada", "Prajapati"}

IMPERATIVE_START = re.compile(
    r"^(?:so |then |therefore |and |but |now |first |yes,? )?"
    r"(be|do|don'?t|never|let|give|lift|speak|treat|practi[cs]e|keep|fix|hold|rise|act|serve|forgive|stay|take|"
    r"work|start|begin|stop|choose|learn|look|see|leave|drop|go|bear|face|fight|stand|trust|offer|return|remember|"
    r"know|think|walk|eat|sleep|wake|sit|breathe|watch|guard|control|master|restrain|cultivate|seek|ask|listen|"
    r"care|help|share|accept|rest|turn|put|make|pray|chant|sing|surrender|cast|abandon|renounce|give up|"
    r"carry|finish|try|aim|train|tame|calm|steady|still|meditate|read|write|honou?r|respect|tell|say|count|"
    r"live|love|wait|move|use|spend|save|avoid|refuse)\b",
    re.I,
)
ACT_MARKERS = re.compile(
    r"\b(you should|you must|one should|one must|should be|must be|try to|learn to|the way is|the cure|the remedy|"
    r"train|practi[cs]e|discipline|habit|step by step|little by little|each day|every day|daily|start (?:with|by)|"
    r"instead|let go|give up|do your|do the work|keep going|keep at it|act without|work without|hold on|stand firm)\b",
    re.I,
)
CAUSE_MARKERS = re.compile(
    r"\b(from \w+ (?:comes|come|arises|arise|grows|grow|springs|is born)|comes from|come from|is born of|born of|"
    r"arises|arise|leads to|lead to|turns into|turn into|becomes|become|breeds|feeds|grows into|gives rise|"
    r"root of|root is|the cause|because|that is why|so long as|as long as|is the enemy|enemy of|binds|bound by|"
    r"chains|chain you|trap|the real reason|what hurts is|the problem is|no one (?:can|gives)|not because|"
    r"is bondage|is freedom|what your mind|you become)\b",
    re.I,
)
# General truths about a kind of person ("Whoever ...", "Those who ...") explain, but weakly.
WEAK_CAUSE = re.compile(r"\b(whoever|the one who|those who|one who|anyone who|someone who|isn'?t .{3,40} it'?s|is not .{3,40} but)\b", re.I)
STATE_WORDS = re.compile(
    r"\b(restless|stormy|stubborn|confus\w*|lost|alone|lonely|afraid|fear\w*|scared|tired|weary|broken|heavy|"
    r"grief|griev\w*|weep\w*|tears?|cry\w*|ache|aching|hurt\w*|pain\w*|sorrow\w*|despair|helpless|anxious|"
    r"worr\w*|burn\w*|empty|numb|shak\w*|trembl\w*|dry mouth|can'?t sleep|sleepless|ashamed|shame|guilt\w*|"
    r"abandon\w*|left me|miss\w*|homesick|far from|where do i|whom do i|who (?:else|will)|how can i|what do i|"
    r"why (?:me|do i|does)|i don'?t know|i'?m not|i am not|no one|nobody|unseen|unheard|torn|stuck|"
    r"panic|racing|can'?t|cannot bear|longing|yearn\w*)\b",
    re.I,
)
FIRST_PERSON = re.compile(r"\b(i|i'm|i am|my|me|mine|myself)\b", re.I)

# Steady: a footing to stand on. Equanimity, what passes and what stays, refuge, contentment.
STEADY_MARKERS = re.compile(
    r"\b(steady|steadfast|calm|still(ness)?|unshaken|unmoved|undisturbed|unruffled|equal|the same in|even[- ]?minded|"
    r"balance\w*|peace\w*|patien\w*|endur\w*|like a (?:lamp|rock|mountain|ocean|lake)|ocean|firm|rooted|grounded|"
    r"content\w*|enough|refuge|shelter|trust|surrender\w*|come and go|comes and goes|passes|will pass|pass away|"
    r"temporary|does not change|never changes|holds you|carries you|is with you|never alone|protects?)\b",
    re.I,
)
# Self: who you are beyond the role, the body, the mind and the result.
SELF_MARKERS = re.compile(
    r"\b(the self|your self|self within|inner self|true self|real self|atman|atma|brahman|witness\w*|awareness|"
    r"consciousness|unborn|undying|never (?:born|dies)|is not born|does not die|imperishable|indestructible|"
    r"unchanging|changeless|eternal|the seer|the knower|you are not (?:the|this|your)|i am not (?:the|this)|"
    r"i am (?:that|he|pure|free)|that thou|thou art|one self|same self|in all beings|all beings in|oneness|"
    r"infinite|already free|free by nature|liberat\w*|untouched|unstained|who am i|what you truly are|"
    r"your (?:true|real) nature|beyond the body|the body is not|neither the body|the indweller|dwells in (?:all|every))\b",
    re.I,
)
SELF_FAMILIES = {"up": 0.15, "gitas": 0.15, "yv": 0.1}
SELF_SPEAKERS = {"Ashtavakra", "Yajnavalkya", "Uddalaka Aruni", "Ribhu", "Dattatreya", "Prajapati", "Pippalada",
                 "Vasishtha", "Shiva", "Seer"}
# Situation: a concrete life, with people and things in it.
CONCRETE = re.compile(
    r"\b(mother|father|son|daughter|wife|husband|brother|sister|child|children|family|friend|home|house|king|"
    r"money|wealth|work|job|master|servant|guest|neighbou?r|enemy|battle|war|village|city|teacher|student|"
    r"marriage|old age|youth|body|food|sleep|morning|night)\b",
    re.I,
)

TONE_PRIOR = {
    "hook":     {"comforting": 0.25, "reflective": 0.2, "steadying": 0.05, "challenging": 0.0},
    "diagnose": {"reflective": 0.2, "challenging": 0.2, "steadying": 0.12, "comforting": 0.02},
    "steady":   {"steadying": 0.25, "comforting": 0.15, "reflective": 0.08, "challenging": 0.0},
    "act":      {"steadying": 0.18, "challenging": 0.22, "reflective": 0.05, "comforting": 0.05},
}


def heuristic_roles(v: dict) -> Dict[str, float]:
    """Scores 0..1 for hook / diagnose / act from the card line, speaker and tone."""
    line = (v.get("line") or "").strip()
    speaker = (v.get("speaker") or "").strip()
    tone = (v.get("jev") or {}).get("tone")
    sentences = [s for s in re.split(r"(?<=[.!?])\s+", line) if s]

    imperative = sum(1 for s in sentences if IMPERATIVE_START.match(s.strip(" \"'")))
    act = 0.45 * min(1, imperative) + 0.15 * min(1, max(0, imperative - 1))
    act += 0.25 if ACT_MARKERS.search(line) else 0.0
    cause = 0.5 if CAUSE_MARKERS.search(line) else (0.3 if WEAK_CAUSE.search(line) else 0.0)
    chain = len(re.findall(r"\b(becomes|turns into|leads to|from \w+ comes|and then|then)\b", line, re.I))
    cause += 0.15 * min(2, chain)
    state = 0.35 if STATE_WORDS.search(line) else 0.0
    state += 0.15 if FIRST_PERSON.search(line) and not imperative else 0.0
    state += 0.15 if "?" in line else 0.0
    if speaker in SUFFERERS or speaker.startswith(("Tulsidas", "Surdas", "Meera", "Arjuna")):
        state += 0.25
        act *= 0.7
    elif speaker in TEACHERS:
        act += 0.05
        cause += 0.05

    steady = 0.4 if STEADY_MARKERS.search(line) else 0.0
    steady += 0.1 if not imperative and not state else 0.0      # a declared truth, not a task or a lament
    steady -= 0.15 if speaker in SUFFERERS else 0.0

    tp = {r: TONE_PRIOR[r].get(tone, 0.0) for r in ROLES}
    raw = {"hook": state + tp["hook"], "diagnose": cause + tp["diagnose"], "steady": steady + tp["steady"],
           "act": act + tp["act"]}
    # A bare statement of truth with no cue still teaches something: a weak diagnose.
    if max(raw.values()) < 0.3:
        raw["diagnose"] = max(raw["diagnose"], 0.3)
    return {r: round(min(1.0, x), 3) for r, x in raw.items()}


def heuristic_levels(v: dict) -> Dict[str, float]:
    """Scores 0..1 for the situation / pattern / self levels from the line, the text and the speaker."""
    line = (v.get("line") or "").strip()
    text = f"{line} {v.get('translation') or ''}"
    speaker = (v.get("speaker") or "").strip()
    fam = v.get("family")
    self_s = 0.55 if SELF_MARKERS.search(text) else 0.0
    self_s += 0.15 if SELF_MARKERS.search(line) else 0.0
    self_s += SELF_FAMILIES.get(fam, 0.0) + (0.1 if speaker in SELF_SPEAKERS else 0.0)
    cause = bool(CAUSE_MARKERS.search(line))
    general = bool(WEAK_CAUSE.search(line))
    concrete = bool(CONCRETE.search(line))
    pattern = 0.3 + (0.3 if cause else 0.0) + (0.15 if general else 0.0) - (0.15 if concrete else 0.0)
    pattern += 0.05 * min(2, len(set(v.get("themes") or []) & {"mind", "self_control", "greed", "anger", "fear", "worry"}))
    situation = 0.3 + (0.25 if concrete else 0.0) + (0.2 if STATE_WORDS.search(line) else 0.0)
    situation += 0.1 if v.get("tier") == "core" else 0.0
    situation += 0.1 if fam == "bg" else 0.0
    situation -= 0.2 if self_s >= 0.55 else 0.0
    return {"situation": round(max(0.0, min(1.0, situation)), 3), "pattern": round(max(0.0, min(1.0, pattern)), 3),
            "self": round(max(0.0, min(1.0, self_s)), 3)}


def is_degenerate(r: dict, keys=ROLES) -> bool:
    present = [k for k in keys if k in r]
    return len(present) > 1 and len({round(float(r.get(k, 0)), 2) for k in present}) == 1


def _unit(x) -> float:
    try:
        return float(max(0.0, min(1.0, float(x))))
    except (TypeError, ValueError):
        return 0.0


def load_role_overrides(path: Path) -> Dict[str, dict]:
    """{id: {hook, diagnose, act[, steady][, levels: {situation, pattern, self}], mechanisms: [...]}} from the labelling
    script's file. Labels from before schema 2 have no steady or levels: those keys are left out (heuristics fill them)."""
    if not path.exists():
        return {}
    try:
        data = json.loads(path.read_text())
        out = {}
        for vid, r in (data.get("roles") or data).items():
            if not isinstance(r, dict):
                continue
            sc = {k: _unit(r[k]) for k in ROLES if k in r}
            if len(sc) < 3 or is_degenerate(sc):
                continue            # "1, 1, 1" or "0, 0, 0" says nothing; heuristics decide
            lv = r.get("levels") if isinstance(r.get("levels"), dict) else None
            if lv and all(k in lv for k in LEVELS):
                lv = {k: _unit(lv[k]) for k in LEVELS}
                if not is_degenerate(lv, LEVELS):
                    sc["levels"] = lv
            sc["mechanisms"] = [m for m in r.get("mechanisms") or [] if isinstance(m, str)][:2]
            out[vid] = sc
        logger.info("Verse roles: %d LLM-labelled verses from %s (%d with steady, %d with levels)", len(out), path.name,
                    sum(1 for o in out.values() if "steady" in o), sum(1 for o in out.values() if "levels" in o))
        return out
    except Exception:
        logger.exception("Verse roles: could not read %s; using heuristics", path)
        return {}


def role_table(verses, overrides: Optional[Dict[str, dict]] = None) -> Dict[str, Dict[str, float]]:
    """id -> {hook, diagnose, steady, act}. LLM labels win; heuristics fill the rest (and soften the labels a little)."""
    overrides = overrides or {}
    table = {}
    for v in verses:
        h = heuristic_roles(v)
        o = overrides.get(v["id"]) or {}
        table[v["id"]] = {r: round(0.7 * o[r] + 0.3 * h[r], 3) if r in o else h[r] for r in ROLES}
    return table


def level_table(verses, overrides: Optional[Dict[str, dict]] = None) -> Dict[str, Dict[str, float]]:
    """id -> {situation, pattern, self}. LLM labels win (softened by the heuristics); heuristics otherwise."""
    overrides = overrides or {}
    table = {}
    for v in verses:
        h = heuristic_levels(v)
        o = (overrides.get(v["id"]) or {}).get("levels")
        table[v["id"]] = {k: round(0.75 * o[k] + 0.25 * h[k], 3) for k in LEVELS} if o else h
    return table

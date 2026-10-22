"""
understanding.py — step 1 of a plan: work out what this person is actually struggling with.

    inputs  ──► note check ──► LLM reading (structured chain of thought) ──► guardrails ──► Understanding
                    │                    │ timeout / error / unusable note        ▲
                    └─ junk / empty ─────┴──────────► deterministic reading ───────┘

The Understanding is what every later step uses: the situations (library tags) with
weights, one root-cause mechanism, four role-specific retrieval statements (hook,
diagnose, steady, act, story), a one-line mirror for the loading screen, and three week
titles (their situation, the pattern underneath, who they are beyond it). It holds no raw note, so the app can keep it and send it back to /preview
and /plan instead of the note (one LLM call per onboarding, same reading every time).

Guardrails on the statements exist for one objective: find the verse that does a
given job for this person. Each statement must (a) sit in the library's register so
it can match a verse line, (b) do only its own job (a hook never advises, an act is
always an imperative), (c) carry the chosen root cause, and (d) be safe to act on.
A statement that fails is replaced by the template for its mechanism, never sent raw.

Privacy: the note is sent to the LLM for this request only. It is never logged or
stored; only counts, flags and timings are logged.
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
import time
from dataclasses import dataclass, field
from typing import Callable, Dict, List, Optional, Sequence

from ai.people import allowed_people, drop_invented_sentences, invented_person
from ai.mechanisms import (CHIP_SITUATIONS, FEELING_STATE, INSIGHTS, MECHANISMS, SITUATION_MECHANISMS, WEEK_TITLES)
from ai.verse_roles import IMPERATIVE_START
from ai.stance import (ASPIRATION_HOOK, ASPIRATION_LAMENT_RE, ASPIRATION_STORY, SEEKING_HOOK, SEEKING_STORY, STANCES,
                       STANCE_BANNED_SITUATIONS, WRONGED_HOOK, WRONGED_HOOK_RE, WRONGED_STORY, WRONGED_UNSAFE_RE,
                       constrain_mechanism, infer_stance)
from prompts.understand import EXAMPLES, build_system

logger = logging.getLogger(__name__)

UNDERSTANDING_VERSION = 1

AGE_LABEL = {"u25": "under 25", "25_34": "25-34", "35_44": "35-44", "45_54": "45-54", "55p": "55+"}
STAGE_LABEL = {"studying": "studying", "working": "working", "own_thing": "building something of their own",
               "raising_kids": "raising kids", "caring_parents": "caring for their parents", "retired": "retired",
               "between": "between things"}
FEELING_LABEL = {"quiet": 'Restless ("My mind won\'t settle.")', "nerve": 'Stuck ("I keep going over something.")',
                 "replay": 'Uneasy ("Something doesn\'t sit right.")', "stick": 'Determined ("I\'m ready to stick with it.")',
                 "faith": 'Searching ("I\'m looking for something deeper.")', "gita": 'Curious ("I want to read the Gita.")'}

# ── Safety ────────────────────────────────────────────────────────────────────
CRISIS_RE = re.compile("|".join([
    r"\b(kill|hurt|harm|cut)\s+my\s*self\b", r"\bend\s+(it\s+all|my\s+life)\b", r"\bsuicid", r"\bself[\s-]?harm",
    r"\b(want|wish)\s+(to\s+)?(die|be\s+dead)\b", r"\bdon'?t\s+want\s+to\s+(be\s+alive|live|wake\s+up)\b",
    r"\bno\s+reason\s+to\s+live\b", r"\bbetter\s+off\s+(dead|without\s+me)\b", r"\btake\s+my\s+(own\s+)?life\b",
    r"\bmar\s+jaun\b", r"\bmarna\s+chah", r"\bjeena\s+nahi\b", r"\bkhudkushi\b", r"आत्महत्या", r"मर\s*जा",
]), re.I)
HARM_RE = re.compile(
    r"\b(hits?|hitting|beats?|beating|slaps?|slapped|punch\w*|kicks?|chok\w*|threaten\w*|abus\w*|rap(e|ed)|"
    r"locks? me|won'?t let me (leave|go out|see)|takes? my (money|phone|passport)|hurts? me|maarta|maarti|peet)\b", re.I)

# ── Note check (before any LLM) ───────────────────────────────────────────────
FILLER = set("um uh umm hmm hm er ah like so okay ok hello hi hey test testing yes no yeah haan han nahi the a and is it "
             "this that you i me mic check one two three".split())
INJECTION_RE = re.compile(r"(ignore (all |the )?(previous|above|prior) (instructions|prompt)|system prompt|you are now|"
                          r"act as|pretend to be|jailbreak|developer mode|<\s*/?\s*(system|note|assistant)\s*>|```)", re.I)
WORD_RE = re.compile(r"[A-Za-zऀ-ॿ']+")


@dataclass
class NoteCheck:
    text: str = ""          # cleaned, capped; what the LLM may see
    signal: str = "none"    # none | junk | weak | ok
    crisis: bool = False
    harm: bool = False
    injection: bool = False
    words: int = 0


DEVANAGARI_RE = re.compile("[ऀ-ॿ]")
MASH_RE = re.compile(r"[bcdfghjklmnpqrstvwxz]{4,}|q(?!u)|(.)\1\1")


def _wordlike(w: str) -> bool:
    """Plausible as a word in English, Hindi or Hinglish; keyboard mash is not."""
    if DEVANAGARI_RE.search(w):
        return True
    return bool(re.search(r"[aeiouy]", w)) and not MASH_RE.search(w)


def check_note(note: Optional[str], source: Optional[str] = None) -> NoteCheck:
    raw = (note or "").strip()
    if not raw:
        return NoteCheck()
    text = re.sub(r"\s+", " ", raw)[:1000]
    out = NoteCheck(text=text, crisis=bool(CRISIS_RE.search(text)), harm=bool(HARM_RE.search(text)))
    if INJECTION_RE.search(text):
        out.injection = True
        text = INJECTION_RE.sub(" ", text)
        out.text = re.sub(r"\s+", " ", text).strip()
    words = [w.lower() for w in WORD_RE.findall(out.text)]
    out.words = len(words)
    # Speech-to-text loops ("the the the", "hello hello hello") collapse to their distinct words.
    distinct = list(dict.fromkeys(words))
    content = [w for w in distinct if w not in FILLER and len(w) > 1]
    plausible = sum(1 for w in content if _wordlike(w))
    if out.crisis:
        out.signal = "ok"             # always read a note that may be a cry for help
    elif not content or plausible / len(content) < 0.6:
        out.signal = "junk"           # empty after fillers, or keyboard mash
    elif len(content) < 3 or (len(words) >= 6 and len(distinct) / len(words) < 0.35):
        out.signal = "weak"           # "stress", "work work work", "idk"
    else:
        out.signal = "ok"
    return out


# ── Statement guardrails ──────────────────────────────────────────────────────
ALLOWED_NAMES = {
    "I", "God", "Krishna", "Arjuna", "Ram", "Rama", "Sita", "Lakshman", "Lakshmana", "Hanuman", "Bharat", "Bharata",
    "Ravana", "Vibhishan", "Sugriva", "Shiva", "Parvati", "Durga", "Devi", "Draupadi", "Yudhishthira", "Bhishma",
    "Karna", "Kunti", "Vidura", "Dhritarashtra", "Duryodhana", "Drona", "Gandhari", "Dasharatha", "Kausalya",
    "Kaikeyi", "Shabari", "Ahalya", "Nachiketa", "Yama", "Prahlad", "Dhruva", "Sudama", "Yashoda", "Radha", "Meera",
    "Tulsidas", "Surdas", "Vasishtha", "Valmiki", "Vyasa", "Narada", "Savitri", "Satyavan", "Nala", "Damayanti",
    "Harishchandra", "Lord", "Divine", "Gita", "Bhagavad", "Upanishad", "Upanishads", "Ramayana", "Mahabharata",
    "Vedas", "Veda", "Ramcharitmanas", "Manas", "Yoga", "Vasishtha", "Ashtavakra", "Vivekananda", "Kabir",
    "Ramayan", "Geeta", "Bhagwad", "Chalisa", "Sundarkand", "Sundar", "Kand", "Bhartrihari", "Tulsi", "Rahim", "Surdas", "Sur",
    "Mahabharat", "Krishn", "Shri", "Sri", "Jai", "Om", "Puja", "Pooja", "Aarti", "Mandir", "Gurbani", "Guru", "Waheguru", "Nanak",
}
CLINICAL = [
    (re.compile(r"\bdepress\w*", re.I), "heavy and low"), (re.compile(r"\badhd\b", re.I), "scattered"),
    (re.compile(r"\bocd\b", re.I), "caught in loops"), (re.compile(r"\b(ptsd|trauma\w*)\b", re.I), "old wounds"),
    (re.compile(r"\bbipolar\b", re.I), "swinging moods"), (re.compile(r"\b(disorder|syndrome)\b", re.I), "struggle"),
    (re.compile(r"\bpanic attacks?\b", re.I), "waves of panic"), (re.compile(r"\b(therapist|psychiatrist|medication)\b", re.I), "help"),
]
PII_RE = re.compile(r"(\S+@\S+|https?://\S+|www\.\S+|\+?\d[\d\s-]{6,}\d|\b\d{1,3}[.:]\d{1,3}\b|\bchapter\s+\d+\b|\b\d+\b)", re.I)
HEDGE_RE = re.compile(r"\b(should|must|need to|have to|try to|you can(?!['’]t|not)|remember to)\b", re.I)
CAUSAL_RE = re.compile(r"\b(from|grows?|becomes?|turns?|leads?|because|when|whenever|if|breeds?|feeds?|arises?|roots?|"
                       r"comes?|binds?|makes?|keeps?|clouds?|steals?|depends?|so long as|as long as|until)\b", re.I)
ACT_VERB_RE = re.compile(r"\b(practi[cs]e|let go|do your|do what|offer|serve|speak|honou?r|stay|keep|hold|bring|return|"
                         r"rise|lift|choose|accept|forgive|pause|walk|act|work|give|reach out|seek|begin|start|rest|"
                         r"remember|trust|turn|guard|restrain|train)\b", re.I)
BANNED_ACT_RE = re.compile(
    r"\b(cut (them|him|her|ties|off)|cut \w+ off|leave (him|her|them|your (husband|wife|partner|job|family|home|marriage))|"
    r"divorce|quit (your|the) job|resign|stop (taking )?(your )?(medic\w*|pills|treatment|therapy)|fast(ing)? for|starv\w*|"
    r"revenge|get back at|punish|obey|submit to|endure (it|this|the|abuse)|tolerate|put up with|keep quiet|stay silent|"
    r"suffer in silence|never speak|hide it)\b", re.I)
HARM_UNSAFE_ACT_RE = re.compile(r"\b(forgiv\w*|patien\w*|endur\w*|duty|serve|obey|honou?r|respect|accept|bear|keep the peace|"
                                r"adjust|compromise|silence)\b", re.I)

# A hook for a relationship struggle must say who it is with, or it matches every lament in the library.
RELATION_WORDS = {
    "family": r"\b(parent|mother|father|mum|mom|dad|family|in-?laws?|brother|sister|sibling|son|daughter|home)",
    "parenting": r"\b(child|children|kid|son|daughter|teen|baby|parent)",
    "relationships": r"\b(partner|husband|wife|spouse|marriage|love|friend|people|someone|beloved|together)",
    "work": r"\b(work|job|boss|manager|career|office|effort|team|colleague)",
    "loss": r"\b(lost|loss|died|gone|death|grief|miss)",
}

SAFE_DIAGNOSE = {
    "harm_from_others": "Being hurt by someone is never your fault; the one who harms carries that wrong, and silence kept for the sake of peace only lets harm grow.",
}
SAFE_MIRROR = {
    "harm_from_others": "It sounds like home doesn't feel safe right now.",
    "self_harm": "It sounds like you're carrying something very heavy right now.",
}

# Under the revealed verse for someone at risk: no root cause, only that it isn't theirs to carry alone.
SAFE_INSIGHT = {
    "harm_from_others": "None of this is your fault. You deserve to feel safe, and you don't have to face it alone.",
    "self_harm": "What you're carrying is heavy, and it is not a measure of your worth. You don't have to carry it alone.",
}

SAFE_ACT = {
    "harm_from_others": "Protect yourself and those who depend on you; speak the truth to someone you trust, and find the courage to seek help.",
    "self_harm": "Hold on through the dark night and reach out to someone who cares; the self within you is not broken and is never alone.",
}
SAFE_STEADY = {
    "harm_from_others": "What is being done to you is not your fault and not your burden to carry; your safety and your worth matter.",
    "self_harm": "This darkness is a passing night, not the whole of you; the self within you is whole, held and never alone.",
}
SAFE_HOOK = {
    "harm_from_others": "Living in fear in your own home, hurt by someone who should protect you, and feeling there is no one to turn to.",
    "self_harm": "When the darkness feels endless and the heart is too tired to go on, and no one seems to see the pain.",
}


@dataclass
class Profile:
    feeling: str
    age: Optional[str] = None
    stages: Sequence[str] = ()
    phone_hours: Optional[int] = None
    topic: Optional[str] = None       # problem chip (row 1), optional
    follow: Optional[str] = None      # problem chip (row 2), optional
    note_source: Optional[str] = None


@dataclass
class Understanding:
    source: str                                   # llm | fallback | client
    note_quality: str                             # useful | partial | unusable | none
    risk: str                                     # none | distress | self_harm | harm_from_others
    confidence: float
    core_struggle: str
    mechanism: str
    secondary_mechanism: Optional[str]
    situations: List[dict]                        # [{id, weight, source}]
    mirror: str
    queries: Dict[str, str]                       # hook, diagnose, steady, act, story
    query_sources: Dict[str, str]                 # role -> llm | template | safety
    weeks: List[str]
    stance: str = "struggle"                      # struggle | aspiration | wronged | seeking (ai/stance.py)
    gender: Optional[str] = None                  # "woman" | "man" | None: only what they said of themselves
    emotion: str = ""                             # what they feel right now, in a few words
    bridge: str = ""                              # their problem in the texts' own terms: the week's one idea
    week_thesis: str = ""                         # the week's thread, for the writers
    undisclosed: bool = False                     # they are keeping something from the people in the note: never advise disclosure
    hinglish: bool = False                        # they wrote in Hindi or Hinglish
    texts: List[str] = field(default_factory=list)   # text families they named themselves (rcm, bg, up, kabir, meera, sur)
    people: List[str] = field(default_factory=list)  # relations they mentioned or their stage implies (ai/people.py); writers may name no others
    week_beats: Dict[str, str] = field(default_factory=dict)   # beat -> what that day must do for them
    insight: str = ""                             # "What's really going on": shown under the revealed verse
    # Who they are, for every later step that writes for them or ranks for them (ai/voice.py).
    # Paraphrases only, never the note: their place in the situation, their life in a sentence or two,
    # up to four facts they gave, and the profile answers (age band, life stages).
    seat: str = ""
    life_context: str = ""
    details: List[str] = field(default_factory=list)
    age: Optional[str] = None
    stages: List[str] = field(default_factory=list)
    version: int = UNDERSTANDING_VERSION
    flags: List[str] = field(default_factory=list)
    timings_ms: Dict[str, int] = field(default_factory=dict)

    def as_dict(self) -> dict:
        d = dict(self.__dict__)
        d.pop("timings_ms", None)
        return d


def _words(s: str) -> List[str]:
    return s.split()


# Everyday proper nouns that identify no one: conditions, platforms, countries, festivals. Without them a
# paraphrase loses its point ("his father has [Parkinson's]", "comparing himself on [LinkedIn]").
COMMON_PROPER = {
    "Parkinson", "Parkinsons", "Alzheimer", "Alzheimers", "Covid", "LinkedIn", "Instagram", "WhatsApp", "Facebook",
    "YouTube", "TikTok", "India", "Indian", "Indians", "America", "American", "Americans", "Britain",
    "British", "England", "Canada", "Canadian", "Australia", "Dubai", "Europe", "Diwali", "Holi", "Navratri", "Hindu",
    "Hinduism", "Christmas", "English", "Hindi", "Sanskrit", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday", "Sunday", "January", "February", "March", "April", "June", "July", "August", "September", "October",
    "November", "December", "Sundays", "Mondays", "Fridays", "Saturdays", "God", "Uber", "Slack", "Zoom", "Netflix",
    "Goldman", "Deloitte", "IIT", "NHS", "MBA", "MBBS", "CA", "PM", "Toronto", "Sydney", "Melbourne", "London", "Manchester",
    "Birmingham", "Leicester", "Leeds", "Chennai", "Mumbai", "Delhi", "Bengaluru", "Bangalore", "Pune", "Hyderabad", "Jaipur",
    "Indore", "Lucknow", "Kanpur", "Kerala", "Punjab", "Gujarat", "Gujarati", "Punjabi", "Tamil", "Germany", "Munich", "Seattle",
    "Houston", "Texas", "Chicago", "Vancouver", "Singapore", "Dubai", "Canadian", "Australian", "Jalandhar", "Chandigarh",
}
DANGLING_RE = re.compile(r"\s\b(?:in|at|from|to|with|of|has|have|had|named|called|near|for|on)\b"
                         r"(?=\s+(?:and|but|or|so|while|because|he|she|they|i|we)\b|\s*[,.;:!?]|\s*$)", re.I)


def sanitize_text(s: str, allow_story_names: bool = False, names: Optional[set] = None, grounded: bool = False) -> str:
    """`names`: extra proper names that may stay (a verse's own speaker, places and people, for lines told
    from its source). Everything else capitalised mid-sentence is taken for a private name and dropped.
    `grounded`: a line told from a verse's own source (its meaning, its scene): its numbers (a year, "a hundred
    years") and the text's own words ("a panic attack") stay as they are."""
    names = names or set()
    s = re.sub(r"\s+", " ", (s or "").replace("\n", " ")).strip().strip('"').strip()
    if grounded:
        s = re.sub(r"(\S+@\S+|https?://\S+|www\.\S+|\+?\d[\d\s-]{6,}\d)", "", s)
    else:
        s = PII_RE.sub("", s)
        for rx, rep in CLINICAL:
            s = rx.sub(rep, s)
    # Drop proper names the texts don't know (the person's sister, their boss, their city).
    toks = s.split(" ")
    keep = []
    for i, t in enumerate(toks):
        bare = re.sub(r"['’]s$", "", re.sub(r"[^\w'’]", "", t))
        sentence_start = i == 0 or (keep and keep[-1].endswith((".", "!", "?", ";", ":")))
        if (bare and bare[0].isupper() and not sentence_start and bare not in ALLOWED_NAMES and bare not in names
                and bare not in COMMON_PROPER and not bare.isupper()):
            if not allow_story_names or bare not in ALLOWED_NAMES:
                if keep and t[-1:] in ",.;:!?" and keep[-1][-1:] not in ",.;:!?":
                    keep[-1] += t[-1]             # "...in Lucknow, and" keeps its comma
                continue
        keep.append(t)
    s = " ".join(keep)
    if len(keep) < len(toks):                     # a dropped name can leave "lost his mother in and ..."
        s = DANGLING_RE.sub("", s)
    s = re.sub(r"\s+([,.;:!?])", r"\1", s)
    s = re.sub(r"\(\s*\)|\s{2,}", " ", s).strip(" ,;")
    return s


def _cap_words(s: str, n: int) -> str:
    w = s.split()
    if len(w) <= n:
        return s
    # Prefer ending on a sentence boundary inside the cap.
    cut = " ".join(w[:n])
    m = re.search(r"^(.*[.;!?])\s", cut + " ")
    return (m.group(1) if m and len(m.group(1).split()) >= 8 else cut).rstrip(",;:") + ("" if cut.endswith(".") else ".")


def check_statement(role: str, text: str, risk: str = "none", stance: str = "struggle") -> tuple[Optional[str], List[str]]:
    """Returns (clean statement, problems). A None statement means: use the template."""
    problems: List[str] = []
    if not isinstance(text, str) or not text.strip():
        return None, ["empty"]
    s = sanitize_text(text, allow_story_names=(role == "story"))
    n = len(_words(s))
    if n < 6:
        return None, [f"too_short:{n}"]
    if n > 45:
        s = _cap_words(s, 40)
        problems.append("trimmed")
    # The stance decides what a statement may never say (ai/stance.py): someone wronged is not asked to
    # accept it or shown a fault in themselves; an aspiration is not met with a lament.
    if stance == "wronged":
        if role == "hook" and WRONGED_HOOK_RE.search(s):
            return None, problems + ["hook_blames_wronged"]
        if role in ("diagnose", "steady", "act") and WRONGED_UNSAFE_RE.search(s):
            return None, problems + [f"{role}_asks_wronged_to_accept"]
    elif stance == "aspiration" and role == "hook" and ASPIRATION_LAMENT_RE.search(s):
        return None, problems + ["hook_laments_aspiration"]
    if role == "hook":
        if IMPERATIVE_START.match(s) or HEDGE_RE.search(s):
            return None, problems + ["hook_gives_advice"]
    elif role == "diagnose":
        if not CAUSAL_RE.search(s):
            return None, problems + ["diagnose_not_causal"]
        if IMPERATIVE_START.match(s):
            return None, problems + ["diagnose_is_instruction"]
    elif role == "steady":
        if BANNED_ACT_RE.search(s):
            return None, problems + ["steady_unsafe"]
        if risk == "harm_from_others" and HARM_UNSAFE_ACT_RE.search(s):
            return None, problems + ["steady_asks_victim_to_endure"]
        if "?" in s:
            return None, problems + ["steady_is_question"]
    elif role == "act":
        if BANNED_ACT_RE.search(s):
            return None, problems + ["act_unsafe"]
        if risk == "harm_from_others" and HARM_UNSAFE_ACT_RE.search(s):
            return None, problems + ["act_asks_victim_to_endure"]
        if not (IMPERATIVE_START.match(s) or ACT_VERB_RE.search(s)):
            return None, problems + ["act_not_actionable"]
    return s, problems


# Lines the app shows (mirror, insight, story teaser) are rejected for the vague, therapeutic
# phrasing that reads as filler; the template or library line stands in instead.
CLICHE_RE = re.compile(
    r"\b(journey|inner peace|peace begins|true peace|embrace|navigat\w*|unlock\w*|resonat\w*|healing|self[- ]care|"
    r"hold(ing)? space|it'?s okay to|remember that|you are not alone|you'?re not alone|everything happens|"
    r"lean into|safe space|mindful(ness)?|growth mindset|on your path|the universe|the (gita|texts?|scriptures?) teach(es)? (us |you )?(peace|that)|pull yourself together)\b", re.I)


def ui_line(text: str, names: Optional[set] = None, grounded: bool = False) -> str:
    """Clean a shown line: no em or en dashes (house style), single spaces, sentence end."""
    s = sanitize_text(text, names=names, grounded=grounded)
    s = re.sub(r"\s*[—–]\s*", ", ", s)
    s = re.sub(r"\s*;\s*", ". ", s)
    s = re.sub(r"\.\s+([a-z])", lambda m: ". " + m.group(1).upper(), s)
    return s


def fallback_mirror(emotion: str, details: List[str], label: str) -> str:
    """When neither written mirror passes: their feeling in their words, never a library tag in the first person."""
    return label


def check_mirror(text: str) -> Optional[str]:
    if not isinstance(text, str):
        return None
    s = ui_line(text)
    if CLICHE_RE.search(s) or copied_from_examples(s):
        return None
    n = len(_words(s))
    if n < 5 or n > 24 or HEDGE_RE.search(s) or re.search(r"\b(diagnos|disorder|you are (depressed|anxious|toxic))", s, re.I):
        return None
    return s


def check_insight(text) -> Optional[str]:
    """The line under the verse: second person, 10-34 words, a reveal not advice, no labels."""
    if not isinstance(text, str):
        return None
    s = ui_line(text)
    n = len(_words(s))
    if n < 10 or n > 34 or HEDGE_RE.search(s) or IMPERATIVE_START.match(s) or CLICHE_RE.search(s) or copied_from_examples(s):
        return None
    if not re.search(r"\byou(r|'re|'ve|'d|'ll|rself)?\b", s, re.I):
        return None
    if re.search(r"\b(diagnos|disorder|depress|anxiety disorder|adhd|trauma|toxic|narcissis)", s, re.I):
        return None
    return s


AGE_WORDS_RE = re.compile(r"\b(?:an?\s+)?(\d{1,3})[- ]?(?:years?|yrs?)[- ]old\b", re.I)


def _ages_to_words(s: str) -> str:
    """Numbers are stripped from every paraphrase, so "his 90-year-old mother" would read "his -year-old
    mother". Say it in words instead: an elderly mother, a young son."""
    def word(m):
        n = int(m.group(1))
        lead = m.group(0)[:2].lower() in ("a ", "an")
        w = "elderly" if n >= 70 else "young" if n <= 12 else "teenage" if n <= 19 else ""
        return (("an " if w.startswith("e") else "a ") + w if lead and w else w) or ("a" if lead else "")
    return re.sub(r"\s{2,}", " ", AGE_WORDS_RE.sub(word, s))


def check_seat(text) -> str:
    """Their place in the situation, as a short noun phrase ("the adult son of parents who doubt his work")."""
    if not isinstance(text, str):
        return ""
    s = sanitize_text(_ages_to_words(text)).rstrip(".")
    n = len(_words(s))
    return s[:120] if 2 <= n <= 16 else ""


def check_life_context(text) -> str:
    """One or two sentences of their life right now, third person, concrete, no names or numbers."""
    if not isinstance(text, str):
        return ""
    s = sanitize_text(_ages_to_words(text))
    n = len(_words(s))
    if n < 8:
        return ""
    if n > 50:
        s = _cap_words(s, 45)
    return s[:400]


def check_details(items) -> List[str]:
    out: List[str] = []
    for x in items if isinstance(items, list) else []:
        if not isinstance(x, str):
            continue
        s = sanitize_text(_ages_to_words(x)).rstrip(".")
        if 2 <= len(_words(s)) <= 16 and s.lower() not in {o.lower() for o in out}:
            out.append(s[:120])
        if len(out) == 4:
            break
    return out


def profile_fields(p: "Profile") -> dict:
    return {"age": p.age if p.age in AGE_LABEL else None, "stages": [s for s in p.stages if s in STAGE_LABEL]}


def insight_for(risk: str, mech: str, raw=None) -> str:
    return SAFE_INSIGHT.get(risk) or check_insight(raw) or INSIGHTS.get(mech, INSIGHTS["default"])


def check_weeks(weeks) -> Optional[List[str]]:
    if not isinstance(weeks, list) or len(weeks) < 3:
        return None
    out = []
    for w in weeks[:3]:
        if not isinstance(w, str):
            return None
        s = sanitize_text(w).rstrip(".")
        if not (1 <= len(_words(s)) <= 8):
            return None
        out.append(s[:60])
    return out


GENDERED_RE = re.compile(r"\b(he|she|him|his|hers?|himself|herself|man|woman|mother|father|mom|mum|dad|wife|husband|son|daughter|"
                         r"boy|girl|guy|lady|gentleman|bahu|mother-in-law|father-in-law)\b", re.I)


# Gender is never inferred. It is set only when the note says it of the person themselves. A spouse word
# ("my wife") is not used: it would misread every same-sex marriage, and a wrong gender is worse than none.
GENDER_CUES = {
    "woman": re.compile(r"\b(i'?m|i am|im|as|being|be)\s+(a\s+|an?\s+\w+\s+)?(woman|girl|lady|mother|mom|mum|mama|wife|bahu|daughter[- ]in[- ]law|daughter|sister|aunt|grandmother|nani|dadi|female)\b"
                       r"|\bafter (their|his|her) (father|dad|papa) (died|passed|left)\b|\b(like|as) an? (traditional |good |ideal |perfect |proper )?(bahu|housewife|homemaker)\b|"
                       r"\btreat(s|ed|ing)? me (like|as) (an? |the )?(\w+ ){0,3}(woman|girl|lady|bahu|wife|housewife|daughter[- ]in[- ]law)\b|\bhow an? (good |ideal |proper )?bahu\b|"
                       r"\b(my|our) (would[- ]be |future )?(in[- ]laws|mother[- ]in[- ]law|sasu|saas|sasural)\b.{0,80}\b(bahu|kitchen|cook\w*|housewife|after the baby|leave (my|the) (job|work|practice))\b|\b(half a |a (working|single|married|new|young) )(mother|mom|mum|woman|wife)\b|\b(my|our) (son|daughter|kids?|children)\b.*\b(their|his|her) (mother|mom|mum)\b", re.I),
    "man": re.compile(r"\b(i'?m|i am|im|as|being|be)\s+(a\s+|an?\s+\w+\s+)?(man|guy|father|dad|papa|husband|son[- ]in[- ]law|son|brother|uncle|grandfather|nana|dada|male)\b"
                     r"|\bafter (their|his|her) (mother|mom|mum) (died|passed|left)\b"
                     r"|\btreat(s|ed|ing)? me (like|as) (an? |the )?(\w+ ){0,3}(man|boy|guy|husband|son[- ]in[- ]law|damaad)\b"
                     r"|\b(half a |a (working|single|married|new|young) )(father|dad|man|husband)\b|\b(my|our) (son|daughter|kids?|children)\b.*\b(their|his|her) (father|dad|papa)\b", re.I),
}


UNDISCLOSED_RE = re.compile(r"\b(haven'?t|hasn'?t|have not|has not|not yet|never|can'?t|cannot|didn'?t) (told|tell|said|mentioned)\b|"
                            r"\b(don'?t|doesn'?t|do not|does not) know\b|\bhiding (it|this)\b|\bkeeping (it|this) (from|a secret)\b|\bsecret\b", re.I)
TEXT_CUES = {"rcm": re.compile(r"\b(ramayan\w*|manas|ramcharitmanas|tulsi\w*|hanuman chalisa|sundar ?kand)\b", re.I),
             "bg": re.compile(r"\b(gita|geeta|bhagavad|bhagwad)\b", re.I), "up": re.compile(r"\bupanishad\w*\b", re.I),
             "kabir": re.compile(r"\bkabir\b", re.I), "meera": re.compile(r"\bmeera\b|\bmira ?bai\b", re.I), "sur": re.compile(r"\bsurdas\b", re.I)}


HINGLISH_RE = re.compile(r"[ऀ-ॿ]|\b(yaar|nahi|nahin|bahut|papa|mummy|mumma|didi|bhai|bhaiya|beta|kya|kyun|bas|haan|thoda|zyada|"
                         r"ghar|kaam|dil|mann|sab|log|samajh|pareshan|tension|tabiyat|shaadi|rishta|bahu|sasural|sasu|ji)\b", re.I)


def texts_from_note(note: Optional[str]) -> List[str]:
    return [k for k, rx in TEXT_CUES.items() if rx.search(note or "")]


def gender_from_note(note: Optional[str]) -> Optional[str]:
    s = (note or "")
    w, m = bool(GENDER_CUES["woman"].search(s)), bool(GENDER_CUES["man"].search(s))
    return "woman" if w and not m else "man" if m and not w else None


def check_gender(x, note: Optional[str] = None) -> Optional[str]:
    """The model's field is accepted only when the note itself carries the cue."""
    cue = gender_from_note(note)
    return cue if cue else None


def check_emotion(text) -> str:
    if not isinstance(text, str):
        return ""
    s = sanitize_text(text).rstrip(".").lower()
    n = len(_words(s))
    return s[:80] if 1 <= n <= 8 and not re.search(r"\b(diagnos|disorder|depress|anxiety disorder|adhd|trauma)", s) else ""


def _grams(s: str, n: int = 6) -> set:
    w = re.findall(r"[a-z']+", (s or "").lower())
    return {tuple(w[i:i + n]) for i in range(max(0, len(w) - n + 1))}


def _example_lines() -> List[str]:
    """Lines from the worked examples: a reading that repeats one of them was not written for this person."""
    out = []
    for _, a in EXAMPLES:
        try:
            d = json.loads(a)
        except ValueError:
            continue
        out += [d.get("bridge", ""), d.get("mirror", ""), d.get("mirror_alt", ""), d.get("insight", ""), d.get("insight_alt", ""),
                (d.get("week") or {}).get("thesis", "")]
        out += list((d.get("week") or {}).get("beats", {}).values())
    return [x for x in out if x]


EXAMPLE_GRAMS = None


def copied_from_examples(s: str, n: int = 6) -> bool:
    global EXAMPLE_GRAMS
    if EXAMPLE_GRAMS is None:
        EXAMPLE_GRAMS = {k: set().union(*(_grams(x, k) for x in _example_lines())) for k in (6, 9)} if _example_lines() else {6: set(), 9: set()}
    return bool(_grams(s, n) & EXAMPLE_GRAMS.get(n, set()))


def check_bridge(text) -> str:
    """One sentence that carries their problem into the texts' terms: second person, 10-34 words, no verse refs, no cliche,
    and not lifted from the worked examples."""
    if not isinstance(text, str):
        return ""
    s = ui_line(text)
    n = len(_words(s))
    if n < 10 or n > 34 or CLICHE_RE.search(s) or HEDGE_RE.search(s) or not re.search(r"\byou(r|'re|'ve)?\b", s, re.I):
        return ""
    if copied_from_examples(s):
        return ""
    return s


def check_week(raw) -> tuple[str, Dict[str, str]]:
    """The week's thread and what each beat must do, second person, short; anything off is dropped."""
    if not isinstance(raw, dict):
        return "", {}
    thesis = ui_line(raw.get("thesis")) if isinstance(raw.get("thesis"), str) else ""
    if not (8 <= len(_words(thesis)) <= 36) or CLICHE_RE.search(thesis) or copied_from_examples(thesis, 9):
        thesis = ""
    beats = {}
    for b in ("hook", "diagnose", "steady", "act", "story"):
        v = (raw.get("beats") or {}).get(b) if isinstance(raw.get("beats"), dict) else None
        if isinstance(v, str):
            s = ui_line(v)
            if 4 <= len(_words(s)) <= 26 and not CLICHE_RE.search(s) and not copied_from_examples(s, 9):
                beats[b] = s
    return thesis, beats


def neutral_or_empty(s: str, gender: Optional[str]) -> str:
    """A paraphrase of the person may not gender them when they did not: it is dropped (the writers then
    work from the seat-less, they-form fallback) rather than shown wrong."""
    return "" if (not gender and s and GENDERED_RE.search(s)) else s


def fallback_bridge(mech: str) -> str:
    return f"What you are living with is what the texts call {MECHANISMS[mech]['label'].lower()}, and that is where this week begins."


def fallback_life_context(p: "Profile", labels: List[str]) -> str:
    """Without the model: their life in their own answers' words (age band, stages, what they picked)."""
    st = [STAGE_LABEL[s] for s in p.stages if s in STAGE_LABEL]      # age travels on its own (no numbers here)
    head = (" and ".join(st).capitalize() + ". ") if st else ""
    feel = FEELING_LABEL.get(p.feeling, "").split(" (")[0]
    body = f"Feels {feel.lower()}" if feel else ""
    if labels:                                   # the library's labels are first person ("I can't switch off")
        body += ("; closest to " if body else "Closest to ") + " and ".join(f'"{l.rstrip(".")}"' for l in labels)
    return (head + body + ("." if body else "")).strip()


# ── Situations: merge every signal into one weighted list ────────────────────
def chip_situations(p: Profile) -> Dict[str, float]:
    out: Dict[str, float] = {}
    for chip, scale in ((p.topic, 0.6), (p.follow, 1.0)):
        for sid, w in (CHIP_SITUATIONS.get(chip or "") or {}).items():
            out[sid] = max(out.get(sid, 0.0), w * scale)
    return out


def merge_situations(*sources: tuple[str, Dict[str, float], float], valid: set, top: int = 6) -> List[dict]:
    total: Dict[str, float] = {}
    origin: Dict[str, str] = {}
    for name, weights, scale in sources:
        for sid, w in weights.items():
            if sid not in valid or w <= 0:
                continue
            total[sid] = total.get(sid, 0.0) + scale * float(w)
            origin.setdefault(sid, name)
    ranked = sorted(total.items(), key=lambda kv: -kv[1])[:top]
    return [{"id": sid, "weight": round(w, 3), "source": origin[sid]} for sid, w in ranked]


# ── Templates (fallback statements, anchored in the library's register) ──────
def template_queries(p: Profile, mechanism: str, situations: List[dict], labels: Dict[str, str], risk: str,
                     stance: str = "struggle") -> Dict[str, str]:
    m = MECHANISMS[mechanism]
    top = [labels[s["id"]] for s in situations[:2] if s["id"] in labels]
    state = FEELING_STATE.get(p.feeling, "something weighs on me")
    if stance == "aspiration":
        hook = ASPIRATION_HOOK
    elif stance == "wronged":
        hook = (f"{top[0]}. " if top else "") + WRONGED_HOOK
    elif stance == "seeking":
        hook = SEEKING_HOOK
    else:
        hook = (f"{top[0]}. " if top else "") + f"Inside, {state}, and I don't know how to carry it."
    story_people = {
        "family": "a son or daughter and their parents", "parenting": "a parent and a child", "relationships": "a husband and wife",
        "work": "a warrior or servant doing hard duty", "loss": "someone who lost a person they loved",
        "spiritual": "a devotee who feels far from God", "mind": "a seeker whose mind will not settle",
    }
    story = f"A story of {story_people.get('mind')}, facing {m['label'].lower()}."
    for s in situations[:1]:
        cl = SITUATION_CLUSTER.get(s["id"])
        if cl in story_people:
            story = f"A story of {story_people[cl]}, facing {m['label'].lower()}."
    story = {"aspiration": ASPIRATION_STORY, "wronged": WRONGED_STORY, "seeking": SEEKING_STORY}.get(stance, story)
    q = {"hook": hook, "diagnose": m["diagnose"], "steady": m["steady"], "act": m["act"], "story": story}
    if risk in SAFE_STEADY:
        q["steady"] = SAFE_STEADY[risk]
    if risk in SAFE_ACT:
        q["act"] = SAFE_ACT[risk]
        q["hook"] = SAFE_HOOK[risk]
    if risk in SAFE_DIAGNOSE:
        q["diagnose"] = SAFE_DIAGNOSE[risk]
    return q


SITUATION_CLUSTER: Dict[str, str] = {}   # filled by Understander from the library
BEREAVED_SITS = {"grief_general", "grief_parent", "pet_loss", "fear_death"}
PAIN_SITS = {"loneliness", "grief_general", "grief_parent", "pet_loss", "homesick", "marriage_distance", "breakup", "empty_nest",
             "illness_family", "fear_death", "money_stress", "anxiety_general", "sleep_mind", "burnout", "layoff"}
MISSING_SITS = {"empty_nest", "homesick", "far_from_home", "marriage_distance", "loneliness", "grief_general", "grief_parent", "diaspora_identity", "retirement", "midlife"}
RELATION_SITS = {"inlaws", "criticism", "credit_taken", "toxic_boss", "boundaries_family", "parents_expectations", "parent_conflict",
                 "marriage_conflict", "betrayal", "not_promoted", "raising_kids_values", "sibling_rift", "teen_conflict",
                 "interfaith", "diaspora_identity", "hard_conversation", "people_pleasing"}


def _safety_role(risk: str, role: str) -> bool:
    """Statements that are always the safety template for this risk, whatever the model wrote."""
    return ((risk in SAFE_ACT and role in ("hook", "act")) or (risk in SAFE_DIAGNOSE and role == "diagnose")
            or (risk in SAFE_STEADY and role == "steady"))


# ── The understander ──────────────────────────────────────────────────────────
NoteMatcher = Callable[[str], Dict[str, float]]


class Understander:
    """Builds an Understanding. `llm` is a SarvamClient-like object with chat_json(); None = always fallback."""

    def __init__(self, situations: Dict[str, dict], llm=None, note_matcher: Optional[NoteMatcher] = None,
                 profile_priors: Optional[Callable[[Profile], Dict[str, float]]] = None, timeout_s: float = 7.0,
                 note_is_semantic: Callable[[], bool] = lambda: False, writer_llm=None, rerank_llm=None):
        # The three roles may run on different models (ai/llm_providers.py); each defaults to the reader.
        self.writer_llm = writer_llm or llm
        self.rerank_llm = rerank_llm or llm
        self.situations = situations
        self.labels = {sid: s["label"] for sid, s in situations.items()}
        self.valid = set(situations)
        SITUATION_CLUSTER.update({sid: s.get("cluster") for sid, s in situations.items()})
        self.llm = llm
        self.note_matcher = note_matcher
        self.profile_priors = profile_priors or (lambda p: {})
        self.timeout_s = timeout_s
        self.note_is_semantic = note_is_semantic   # keyword note matches are weaker evidence than meaning
        self.system = build_system(MECHANISMS, situations)

    # The user turn: profile as plain lines, the note fenced as data.
    @staticmethod
    def user_message(p: Profile, note: NoteCheck) -> str:
        lines = [
            f"age band: {AGE_LABEL.get(p.age or '', 'not given')}",
            f"life stage: {', '.join(STAGE_LABEL.get(s, s) for s in p.stages) or 'not given'}",
            f"daily phone time: {f'{p.phone_hours} hours' if p.phone_hours else 'not given'}",
            f"feeling tapped: {FEELING_LABEL.get(p.feeling, p.feeling)}",
        ]
        chips = [c for c in (p.topic, p.follow) if c]
        if chips:
            lines.append(f"problem chip: {' / '.join(c.replace('_', ' ') for c in chips)}")
        if note.text and note.signal != "junk":
            src = f" ({p.note_source})" if p.note_source in ("voice", "text") else ""
            lines.append(f"note{src}: <note>{note.text.replace('<', ' ').replace('>', ' ')}</note>")
        else:
            lines.append("note: (none)")
        return "\n".join(lines)

    def _messages(self, p: Profile, note: NoteCheck) -> List[dict]:
        msgs = [{"role": "system", "content": self.system}]
        for ex_user, ex_assistant in EXAMPLES:
            msgs.append({"role": "user", "content": ex_user})
            msgs.append({"role": "assistant", "content": ex_assistant})
        msgs.append({"role": "user", "content": self.user_message(p, note)})
        return msgs

    async def understand(self, p: Profile, note_text: Optional[str]) -> tuple[Understanding, NoteCheck]:
        t0 = time.perf_counter()
        note = check_note(note_text, p.note_source)
        note_sits = {}
        if note.text and note.signal in ("ok", "weak") and self.note_matcher:
            try:
                note_sits = self.note_matcher(note.text)
            except Exception:
                logger.exception("understand: note matching failed")
        timings = {"note_match": int((time.perf_counter() - t0) * 1000)}

        raw, why_fallback = None, None
        use_llm = self.llm is not None and not (note.signal == "junk" and not (p.topic or p.follow))
        if use_llm:
            t1 = time.perf_counter()
            try:
                raw = await asyncio.wait_for(
                    asyncio.to_thread(self.llm.chat_json, self._messages(p, note), temperature=0.2, max_tokens=2200,
                                      timeout_s=max(2, int(self.timeout_s))),
                    timeout=self.timeout_s,
                )
            except asyncio.TimeoutError:
                why_fallback = "llm_timeout"
            except Exception as e:   # network, JSON, quota — never fail the request
                why_fallback = f"llm_error:{type(e).__name__}"
            timings["llm"] = int((time.perf_counter() - t1) * 1000)
        else:
            why_fallback = "no_llm" if self.llm is None else "junk_note"

        u = self._from_llm(p, note, raw, note_sits) if isinstance(raw, dict) else None
        if u is None:
            u = self._fallback(p, note, note_sits)
            if why_fallback:
                u.flags.append(why_fallback)
            elif raw is not None:
                u.flags.append("llm_unparseable")
        if note.injection:
            u.flags.append("note_injection_stripped")
        u.timings_ms = {**timings, "total": int((time.perf_counter() - t0) * 1000)}
        return u, note

    # ── LLM path ─────────────────────────────────────────────────────────────
    def _from_llm(self, p: Profile, note: NoteCheck, raw: dict, note_sits: Dict[str, float]) -> Optional[Understanding]:
        flags: List[str] = []
        quality = raw.get("note_quality") if raw.get("note_quality") in ("useful", "partial", "unusable", "none") else "partial"
        if not note.text:
            quality = "none"
        risk = raw.get("risk") if raw.get("risk") in ("none", "distress", "self_harm", "harm_from_others") else "none"
        # Deterministic checks can only raise the risk, never lower it.
        if note.crisis:
            risk = "self_harm"
        elif note.harm and risk == "none":
            risk = "harm_from_others"
        try:
            conf = float(raw.get("confidence", 0.5))
        except (TypeError, ValueError):
            conf = 0.5
        conf = max(0.0, min(1.0, conf))
        # Where they stand (ai/stance.py). Someone at risk of self-harm is read as a struggle: the safety
        # templates take over every statement either way.
        stance = raw.get("stance") if raw.get("stance") in STANCES else None
        if stance is None:                     # the model forgot the field: every input votes (ai/stance.py)
            flags.append("llm_stance_missing")
            raw_ids = [(s.get("id") if isinstance(s, dict) else s) for s in raw.get("situations") or []]
            pre = merge_situations(("note", {sid: 0.7 for sid in raw_ids if sid in self.valid}, 1.0),
                                   ("chip", chip_situations(p), 0.8), ("profile", self.profile_priors(p), 0.5), valid=self.valid)
            stance, scores = infer_stance(p.feeling, p.age, p.stages, pre)
            flags.append("stance_inferred:" + ",".join(f"{k[:3]}={v}" for k, v in scores.items()))
        if risk == "self_harm":
            stance = "struggle"
        banned_sits = STANCE_BANNED_SITUATIONS.get(stance, set())
        gender = check_gender(raw.get("gender"), note.text)
        if raw.get("gender") in ("woman", "man") and gender is None:
            flags.append("gender:ignored_guess")
        emotion = check_emotion(raw.get("emotion"))
        if not emotion:
            flags.append("emotion:missing")

        # Meaning-matched situations only back up the model's own reading: top 3, light weight.
        note_sits = dict(sorted(((k, v) for k, v in note_sits.items() if k not in banned_sits), key=lambda kv: -kv[1])[:3])
        llm_sits: Dict[str, float] = {}
        for s in raw.get("situations") or []:
            sid = s.get("id") if isinstance(s, dict) else s
            if sid in banned_sits:
                flags.append(f"situation_off_stance:{sid}")
                continue
            if isinstance(s, dict) and s.get("id") in self.valid:
                try:
                    llm_sits[s["id"]] = max(0.2, min(1.0, float(s.get("weight", 0.6))))
                except (TypeError, ValueError):
                    llm_sits[s["id"]] = 0.6
            elif isinstance(s, str) and s in self.valid:
                llm_sits[s] = 0.7
        if not llm_sits:
            flags.append("llm_situations_invalid")
        note_trust = {"useful": 1.0, "partial": 0.7, "unusable": 0.15, "none": 0.0}[quality]
        situations = merge_situations(
            ("note", {k: v * 1.2 for k, v in llm_sits.items()}, 0.4 + 0.6 * note_trust if note.text else 0.7),
            ("note", note_sits, (0.3 if self.note_is_semantic() else 0.15) * note_trust),
            ("chip", chip_situations(p), 0.8),
            ("profile", self.profile_priors(p), 0.5 if note_trust >= 0.7 else 1.0),
            valid=self.valid,
        )
        if not situations:
            return None
        # Deterministic sanity on the stance: "seeking" cannot stand over a pain the tags name, and "wronged"
        # needs a person who is doing it (a relationship tag), not a circumstance (a layoff, a market, a visa).
        top_ids = [s["id"] for s in situations[:3]]
        if stance == "seeking" and any(x in PAIN_SITS for x in top_ids[:2]):
            stance = "struggle"; flags.append("stance:seeking_over_pain")
            if raw.get("mechanism") in ("no_meaning", "disconnection", "resolve_begin"):
                raw = {**raw, "mechanism": SITUATION_MECHANISMS.get(next(x for x in top_ids[:2] if x in PAIN_SITS), ["disconnection"])[0]}
        if stance == "wronged" and (not any(x in RELATION_SITS for x in top_ids) or top_ids[0] in PAIN_SITS or top_ids[0] in MISSING_SITS):
            stance = "struggle"; flags.append("stance:wronged_without_relation")
            if raw.get("mechanism") == "dignity_denied":          # the mechanism went with the stance
                raw = {**raw, "mechanism": SITUATION_MECHANISMS.get(top_ids[0], ["fear_of_loss"])[0]}
        if stance in ("struggle",) and raw.get("stance") in ("seeking", "wronged"):
            banned_sits = set()

        mech = raw.get("mechanism")
        if mech not in MECHANISMS:
            flags.append("llm_mechanism_invalid")
            mech = SITUATION_MECHANISMS.get(situations[0]["id"], ["restless_mind"])[0]
        sec = raw.get("secondary_mechanism")
        sec = sec if sec in MECHANISMS and sec != mech else None
        top_mechs = {m for s in situations[:2] for m in SITUATION_MECHANISMS.get(s["id"], [])[:1]}
        if mech not in top_mechs and not sec and top_mechs:
            sec = sorted(top_mechs)[0]           # keep the library's reading alongside the model's

        # Grief is for a death. A living loss (a child abroad, a city left, a job gone) read as grief pulls the
        # bereavement verses and lines ("love does not end when a life does"), which tell them someone died.
        if mech == "grief_attachment" and not any(x in BEREAVED_SITS for x in top_ids):
            alt = [m for s in top_ids for m in SITUATION_MECHANISMS.get(s, []) if m != "grief_attachment"]
            mech = alt[0] if alt else "disconnection"
            flags.append("mechanism:grief_without_death")
        mech, sec, changed = constrain_mechanism(stance, mech, sec)
        if changed:
            flags.append(f"mechanism_off_stance:{raw.get('mechanism')}")
        if risk == "harm_from_others":
            mech, sec = "fear_of_loss", None      # courage and safety; never a cause located in them
        if quality == "unusable" or conf < 0.25:
            flags.append("low_confidence")

        templates = template_queries(p, mech, situations, self.labels, risk, stance)
        queries, qsrc = {}, {}
        rq = raw.get("queries") if isinstance(raw.get("queries"), dict) else {}
        for role in ("hook", "diagnose", "steady", "act", "story"):
            if _safety_role(risk, role):
                queries[role], qsrc[role] = templates[role], "safety"
                continue
            clean, problems = check_statement(role, rq.get(role, ""), risk, stance)
            if clean and quality == "unusable" and role == "hook":
                clean = None
                problems.append("note_unusable")
            if clean and role == "hook":
                cl = SITUATION_CLUSTER.get(situations[0]["id"])
                if cl in RELATION_WORDS and not re.search(RELATION_WORDS[cl], clean, re.I):
                    clean = f"{clean.rstrip('.')}. {self.labels[situations[0]['id']]}."
                    flags.append("hook:anchored_to_situation")
            if clean:
                queries[role], qsrc[role] = clean, "llm"
            else:
                queries[role], qsrc[role] = templates[role], "template"
                flags.append(f"{role}:{problems[0] if problems else 'missing'}")

        week_thesis, week_beats = check_week(raw.get("week"))
        if isinstance(raw.get("bridge"), str) and copied_from_examples(raw["bridge"]):
            flags.append("bridge:copied_example")
        if not week_thesis:
            flags.append("week_thesis:missing")
        people = allowed_people(note.text, p.stages, (p.topic, p.follow))
        core = sanitize_text(str(raw.get("core_struggle") or ""))
        if invented_person(core, people):
            flags.append("core:invented_person"); core = ""
        if not (4 <= len(_words(core)) <= 35):
            core = self.labels[situations[0]["id"]]
            flags.append("core_struggle_fallback")
        seat_txt = check_seat(raw.get("seat"))
        if invented_person(seat_txt, people):
            flags.append("seat:invented_person"); seat_txt = ""
        life_txt = drop_invented_sentences(check_life_context(raw.get("life_context")), people)
        if life_txt != (check_life_context(raw.get("life_context")) or ""):
            flags.append("life:invented_person")
        details_ok = [d for d in check_details(raw.get("evidence")) if not invented_person(d, people)]
        mirror = SAFE_MIRROR.get(risk) if risk in ("self_harm", "harm_from_others") else None
        gendered = (lambda s: s if (gender or not s or not re.search(r"\b(she|he|her|his|him|herself|himself)\b", s, re.I)) else None)
        mirror = mirror or gendered(check_mirror(raw.get("mirror"))) or gendered(check_mirror(raw.get("mirror_alt")))
        if not mirror:                         # a plain but grammatical written line beats any stub or chip label
            for cand in (raw.get("mirror"), raw.get("mirror_alt")):
                s = ui_line(cand) if isinstance(cand, str) else ""
                if 8 <= len(_words(s)) <= 26 and re.search(r"\byou(r|'re|'ve)?\b", s, re.I) and not HEDGE_RE.search(s) \
                        and (gender or not re.search(r"\b(she|he|her|his|him)\b", s, re.I)):
                    mirror = s; flags.append("mirror:lenient"); break
        if not mirror:
            flags.append("mirror:fallback")
            mirror = fallback_mirror(emotion, check_details(raw.get("evidence")), self.labels[situations[0]["id"]])
        weeks = check_weeks(raw.get("weeks")) or WEEK_TITLES.get(mech, WEEK_TITLES["default"])

        return Understanding(
            source="llm", note_quality=quality, risk=risk, confidence=round(conf, 2), core_struggle=core, stance=stance,
            mechanism=mech, secondary_mechanism=sec, situations=situations, mirror=mirror, queries=queries,
            query_sources=qsrc, weeks=list(weeks), flags=flags + ([] if (check_insight(raw.get("insight")) or check_insight(raw.get("insight_alt"))) else ["insight:template"])
            + ([] if life_txt else ["life_context:missing"])
            + ([] if seat_txt else ["seat:missing"]),
            insight=SAFE_INSIGHT.get(risk) or gendered(check_insight(raw.get("insight"))) or gendered(check_insight(raw.get("insight_alt"))) or INSIGHTS.get(mech, INSIGHTS["default"]),
            seat=neutral_or_empty(seat_txt, gender),
            life_context=neutral_or_empty(life_txt, gender),
            details=[d for d in details_ok if gender or not GENDERED_RE.search(d) or not re.search(r"\b(he|she|his|her|him)\b", d, re.I)],
            people=people,
            gender=gender, emotion=emotion, bridge=check_bridge(raw.get("bridge")) or fallback_bridge(mech),
            week_thesis=week_thesis, week_beats=week_beats, undisclosed=bool(UNDISCLOSED_RE.search(note.text or "")),
            hinglish=bool(HINGLISH_RE.search(note.text or "")), texts=texts_from_note(note.text), **profile_fields(p),
        )

    # ── Deterministic path ───────────────────────────────────────────────────
    def _fallback(self, p: Profile, note: NoteCheck, note_sits: Dict[str, float]) -> Understanding:
        trust = {"ok": 1.0, "weak": 0.5}.get(note.signal, 0.0) * (1.0 if self.note_is_semantic() else 0.5)
        situations = merge_situations(
            ("note", note_sits, 1.0 * trust),
            ("chip", chip_situations(p), 1.2),
            ("profile", self.profile_priors(p), 1.0),
            valid=self.valid,
        ) or [{"id": "restless_mind", "weight": 0.5, "source": "profile"}]
        risk = "self_harm" if note.crisis else ("harm_from_others" if note.harm else "none")
        mechs = SITUATION_MECHANISMS.get(situations[0]["id"], ["restless_mind"])
        mech = mechs[0]
        sec = next((m for s in situations[1:3] for m in SITUATION_MECHANISMS.get(s["id"], [])[:1] if m != mech), None)
        stance, scores = ("struggle", {}) if risk != "none" else infer_stance(p.feeling, p.age, p.stages, situations)
        mech, sec, _ = constrain_mechanism(stance, mech, sec)
        if risk == "harm_from_others":
            mech, sec = "fear_of_loss", None
        quality = "none" if not note.text else {"ok": "partial", "weak": "partial"}.get(note.signal, "unusable")
        templates = template_queries(p, mech, situations, self.labels, risk, stance)
        flags = ["stance_inferred:" + ",".join(f"{k[:3]}={v}" for k, v in scores.items())] if scores else []
        return Understanding(
            source="fallback", note_quality=quality, risk=risk, stance=stance, flags=flags,
            confidence=round(0.25 + 0.3 * min(1.0, situations[0]["weight"]), 2),
            core_struggle=self.labels[situations[0]["id"]], mechanism=mech, secondary_mechanism=sec,
            situations=situations, mirror=SAFE_MIRROR.get(risk) or self.labels[situations[0]["id"]], queries=templates,
            query_sources={r: ("safety" if _safety_role(risk, r) else "template") for r in templates},
            weeks=list(WEEK_TITLES.get(mech, WEEK_TITLES["default"])),
            insight=insight_for(risk, mech), bridge=fallback_bridge(mech), emotion=FEELING_STATE.get(p.feeling, ""),
            undisclosed=bool(UNDISCLOSED_RE.search(note.text or "")), texts=texts_from_note(note.text),
            people=allowed_people(note.text, p.stages, (p.topic, p.follow)),
            hinglish=bool(HINGLISH_RE.search(note.text or "")),
            life_context=fallback_life_context(p, [self.labels[s["id"]] for s in situations[:2]]), **profile_fields(p),
        )

    # ── Client round-trip ────────────────────────────────────────────────────
    def from_client(self, d: dict) -> Optional[Understanding]:
        """Re-validate an Understanding the app sent back. It came from us, but it crossed the network: trust nothing."""
        try:
            if int(d.get("version", 0)) != UNDERSTANDING_VERSION:
                return None
            mech = d.get("mechanism")
            if mech not in MECHANISMS:
                return None
            situations = []
            for s in d.get("situations") or []:
                if isinstance(s, dict) and s.get("id") in self.valid:
                    situations.append({"id": s["id"], "weight": round(max(0.0, min(3.0, float(s.get("weight", 0.5)))), 3),
                                       "source": s.get("source") if s.get("source") in ("note", "chip", "profile") else "profile"})
            if not situations:
                return None
            risk = d.get("risk") if d.get("risk") in ("none", "distress", "self_harm", "harm_from_others") else "none"
            stance = d.get("stance") if d.get("stance") in STANCES else "struggle"
            p = Profile(feeling="quiet")
            templates = template_queries(p, mech, situations, self.labels, risk, stance)
            queries, qsrc = {}, {}
            for role in ("hook", "diagnose", "steady", "act", "story"):
                clean, _ = check_statement(role, (d.get("queries") or {}).get(role, ""), risk, stance)
                safety = _safety_role(risk, role)
                if safety:
                    clean = None
                queries[role] = clean or templates[role]
                qsrc[role] = "client" if clean else ("safety" if safety else "template")
            sec = d.get("secondary_mechanism")
            return Understanding(
                source="client", note_quality=d.get("note_quality") if d.get("note_quality") in ("useful", "partial", "unusable", "none") else "none",
                risk=risk, stance=stance, confidence=round(max(0.0, min(1.0, float(d.get("confidence", 0.5)))), 2),
                core_struggle=sanitize_text(str(d.get("core_struggle") or ""))[:240] or self.labels[situations[0]["id"]],
                mechanism=mech, secondary_mechanism=sec if sec in MECHANISMS and sec != mech else None,
                situations=situations[:6],
                mirror=SAFE_MIRROR.get(risk) or check_mirror(d.get("mirror")) or self.labels[situations[0]["id"]],
                queries=queries, query_sources=qsrc,
                weeks=check_weeks(d.get("weeks")) or list(WEEK_TITLES.get(mech, WEEK_TITLES["default"])),
                insight=insight_for(risk, mech, d.get("insight")),
                seat=check_seat(d.get("seat")), life_context=check_life_context(d.get("life_context")),
                details=check_details(d.get("details")),
                gender=d.get("gender") if d.get("gender") in ("woman", "man") else None, emotion=check_emotion(d.get("emotion")),
                bridge=check_bridge(d.get("bridge")) or fallback_bridge(mech),
                undisclosed=bool(d.get("undisclosed")), hinglish=bool(d.get("hinglish")), texts=[x for x in (d.get("texts") or []) if x in TEXT_CUES][:3],
                people=[x for x in (d.get("people") or []) if isinstance(x, str)][:12],
                week_thesis=check_week({"thesis": d.get("week_thesis"), "beats": d.get("week_beats")})[0],
                week_beats=check_week({"thesis": d.get("week_thesis"), "beats": d.get("week_beats")})[1],
                age=d.get("age") if d.get("age") in AGE_LABEL else None,
                stages=[x for x in (d.get("stages") or []) if isinstance(x, str) and x in STAGE_LABEL][:7],
            )
        except (TypeError, ValueError):
            return None


# ── Module singleton ──────────────────────────────────────────────────────────
_understander: Optional[Understander] = None


def get_understander() -> Understander:
    if _understander is None:
        raise RuntimeError("Understander not initialised — call init_understander() first")
    return _understander


def init_understander(rec, llm=None, timeout_s: float = 7.0, writer_llm=None, rerank_llm=None) -> Optional[Understander]:
    """`rec` is the Recommender (situations, note matching, profile priors). `llm` may be None: fallback only."""
    global _understander
    if rec is None:
        return None
    _understander = Understander(
        situations=rec.situations, llm=llm, note_matcher=rec.match_note,
        profile_priors=lambda p: rec.profile_situations(p.feeling, p.age, p.stages, p.phone_hours),
        timeout_s=timeout_s, note_is_semantic=lambda: rec.semantic, writer_llm=writer_llm, rerank_llm=rerank_llm,
    )
    return _understander

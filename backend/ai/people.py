"""
people.py — who exists in the person's story.

A writer may only speak of the people the person themselves brought up (plus the ones their life stage
implies: "raising kids" means children exist). Sarvam borrows people from the worked examples — a silent
"partner", a "boss", "your children" — and a line that invents a person is the fastest way to lose someone
("I never said I had a husband"). The reading, the day lines and the script all pass through
`invented_person`.
"""
from __future__ import annotations

import re
from typing import Iterable, List, Optional, Sequence

# relation key → how that person is referred to, in a note or in our own prose
PEOPLE = {
    "partner":  r"partner|husband|wife|spouse|boyfriend|girlfriend|fianc[ée]e?|my (man|woman|better half)|pati|patni|biwi",
    "inlaws":   r"in[- ]laws?|(mother|father|sister|brother)[- ]in[- ]law|saas|sasu(r|ral)?|sasural|bahu|daughter[- ]in[- ]law",
    "parent":   r"(?:parents?|mother|father)(?![- ]in[- ]law)|mom|mum|dad|papa|mummy|amma|appa|maa|baba|pitaji|mata",
    # "the grown child of parents", "the adult son of a widow": that is the person, not a child of theirs
    "child":    r"(?:child(?:ren)?|kids?|son|daughter)(?![- ]in[- ]law)(?!\s+of\b)|baby|beta|beti|bachch[ae]|toddler|teenager",
    "sibling":  r"(?:brother|sister)(?![- ]in[- ]law)|sibling|bhai|didi|bhaiya|behen",
    "grand":    r"grand(mother|father|parents?|ma|pa|son|daughter|children|kids)|nani|nana|dadi|dada|ajji",
    "friend":   r"friends?|best friend|roommate|flatmate|dost|yaar",
    "work":     r"boss|manager|colleagues?|co-?workers?|team(mates?)?|clients?|co-?founder|investors?|employees?|office|company|job|work",
    "teacher":  r"teacher|professor|prof|mentor|guru|coach|classmates?|batchmates?|students?",
    "ex":       r"\bex\b|ex-?(husband|wife|boyfriend|girlfriend|partner)|former partner",
    "doctor":   r"doctor|therapist|counsell?or|psychiatrist",
    "family":   r"family|relatives?|household|everyone at home|rishtedaar",
}
_PEOPLE_RE = {k: re.compile(rf"\b(?:{v})\b", re.I) for k, v in PEOPLE.items()}
# the same people, but only when a line attaches them to the reader ("your partner", "with your own boss");
# a story retold in a for-you line ("Vidula tells her son") is about the text's people, not theirs
_YOUR_RE = {k: re.compile(rf"\byour\s+(?:(?:own|future|would[- ]be|late|new|old|younger|elder|older|whole|entire)\s+)?(?:{v})\b", re.I)
            for k, v in PEOPLE.items()}

# what a life stage lets a writer assume
STAGE_PEOPLE = {"raising_kids": {"child", "family"}, "caring_parents": {"parent", "family"}, "working": {"work"},
                "own_thing": {"work"}, "studying": {"teacher", "friend"}}
# a person implies others (children imply a family). In-laws do NOT unlock a partner: what the partner does or
# does not do is the fact people most often invent for an in-laws note.
IMPLIED = {"inlaws": {"family"}, "child": {"family"}, "parent": {"family"}, "sibling": {"family"}, "grand": {"family"}, "ex": {"partner"}}


def people_in(text: str) -> List[str]:
    """Relation keys mentioned in a text, in order of first appearance."""
    if not text:
        return []
    hits = [(m.start(), k) for k, rx in _PEOPLE_RE.items() for m in [rx.search(text)] if m]
    return [k for _, k in sorted(hits)]


# what a tapped chip (topic / follow-up) says about who is in the story
CHIP_PEOPLE = {"parents": {"parent"}, "parent_conflict": {"parent"}, "parents_expectations": {"parent"}, "parents_aging": {"parent"},
               "parent_health": {"parent"}, "grief_parent": {"parent"}, "in_laws": {"inlaws", "partner"}, "inlaws": {"inlaws", "partner"},
               "partner": {"partner"}, "marriage_conflict": {"partner"}, "marriage_distance": {"partner"}, "breakup": {"ex", "partner"},
               "kids": {"child"}, "teen_conflict": {"child"}, "new_baby": {"child", "partner"}, "new_parent": {"child", "partner"},
               "raising_kids_values": {"child"}, "present_parent": {"child"}, "empty_nest": {"child"}, "after_kids": {"child"},
               "boss": {"work"}, "toxic_boss": {"work"}, "work": {"work"}, "credit_taken": {"work"}, "not_promoted": {"work"},
               "passed_over": {"work"}, "layoff": {"work"}, "might_lose_job": {"work"}, "illness_family": {"family"},
               "boundaries_family": {"family"}, "someone_lost": {"family"}, "someone_left": {"partner", "friend"}, "betrayal": {"friend", "partner"}}


def allowed_people(note_text: Optional[str], stages: Iterable[str] = (), chips: Iterable[Optional[str]] = ()) -> List[str]:
    """Everyone a writer may mention: named in the note, implied by them, given by a life stage or a tapped chip."""
    out: List[str] = []
    for c in chips or ():
        for x in sorted(CHIP_PEOPLE.get(c or "", ())):
            if x not in out:
                out.append(x)
    for k in people_in(note_text or ""):
        for x in (k, *sorted(IMPLIED.get(k, ()))):
            if x not in out:
                out.append(x)
    for s in stages or ():
        for x in sorted(STAGE_PEOPLE.get(s, ())):
            if x not in out:
                out.append(x)
    return out


def invented_person(text: str, people: Optional[Sequence[str]], yours_only: bool = False) -> Optional[str]:
    """The first relation a text brings in that the person never did, or None. `people` None → no check
    (we do not know what they said, e.g. a client-built understanding). `yours_only`: count only people the
    line attaches to the reader ("your partner"), for lines that may also retell a text's story."""
    if people is None or not text:
        return None
    allowed = set(people)
    if yours_only:
        for k, rx in _YOUR_RE.items():
            if k not in allowed and rx.search(text):
                return k
        return None
    for k in people_in(text):
        if k not in allowed:
            return k
    return None


def drop_invented_sentences(text: str, people: Optional[Sequence[str]]) -> str:
    """Remove the sentences of a paraphrase that bring in someone the person never mentioned."""
    if people is None or not text:
        return text or ""
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    keep = [p for p in parts if not invented_person(p, people)]
    return " ".join(keep).strip()

"""
verse_ref.py — Parse chapter.verse citations out of natural-language queries.

Embeddings will never handle "Gita 2.47" reliably by design — the surface form
carries almost no semantic content, and the corpus contains hundreds of verses
whose essence loosely matches "duty" or "action" for that verse's theme. The
regex fast-path bypasses embeddings entirely for the reference-lookup case.

Supported forms:
    Gita 2.47           BG 2:47          bhagavad gita 2/47
    Chapter 2 verse 47  ch 2 v 47        2.47 (alone → bhagwad_gita)
    Katha 1.2.15        katha upanishad 1.2.15   (multi-level refs collapse
                                                  to first-two → chapter,verse)
    Ashtavakra 1.5      ashtavakra gita 1.5

Returns a list of VerseRef objects (may be empty). Callers use these to hit
the index by uid directly and short-circuit dense retrieval.

Coverage is deliberately biased toward the popular scriptures — the fast-path
is a UX polish for the common "I want to look up verse X" case, not a full
citation parser. Anything that doesn't match falls through to dense retrieval,
which is the fallback for every case anyway.
"""
from __future__ import annotations

import logging
import re
from typing import List, Optional, Tuple

from common.models import VerseRef

logger = logging.getLogger(__name__)


# ── Scripture alias table ─────────────────────────────────────────────────────
# Multi-word aliases first (longest match wins during scan). Every alias is
# matched case-insensitively as a whole word / phrase; short aliases (bg, ys)
# must be surrounded by non-letter boundaries to avoid matching inside words.

# alias → canonical slug (must match the scripture field in verses.json)
_ALIASES: List[Tuple[str, str]] = [
    # Bhagavad Gita
    ("bhagavad gita",   "bhagwad_gita"),
    ("bhagvad gita",    "bhagwad_gita"),
    ("bhagwad gita",    "bhagwad_gita"),
    ("shrimad bhagavad gita", "bhagwad_gita"),
    ("gita",            "bhagwad_gita"),
    ("geeta",           "bhagwad_gita"),
    ("bg",              "bhagwad_gita"),
    ("गीता",            "bhagwad_gita"),
    # Ashtavakra Gita — must come BEFORE lone "gita"; matched via longest-first
    ("ashtavakra gita", "ashtavakra_gita"),
    ("ashtavakra",      "ashtavakra_gita"),
    # Ram Gita, Hans Gita, Vishnu Gita etc. — anchor by leading word
    ("ram gita",        "ram_gita"),
    ("hans gita",       "hans_gita"),
    ("vishnu gita",     "vishnu_gita"),
    ("shakti gita",     "shakti_gita"),
    ("shambhu gita",    "shambhu_gita"),
    ("surya gita",      "surya_gita"),
    ("dheesh gita",     "dheesh_gita"),
    # Ramayan
    ("ramcharitmanas",  "ramacharitamanas"),
    ("ramacharitamanas","ramacharitamanas"),
    ("ramayana",        "ramacharitamanas"),
    ("ramayan",         "ramacharitamanas"),
    # Common named Upanishads (only listing the well-known ones)
    ("katha upanishad",         "kath_upanishad"),
    ("katha",                   "kath_upanishad"),
    ("kath upanishad",          "kath_upanishad"),
    ("isha upanishad",          "isha_upanishad"),
    ("ish upanishad",           "isha_upanishad"),
    ("mundaka upanishad",       "mundaka_upanishad"),
    ("mundaka",                 "mundaka_upanishad"),
    ("mandukya upanishad",      "mandukya_upanishad"),
    ("mandukya",                "mandukya_upanishad"),
    ("chandogya upanishad",     "chhandogya_upanishad"),
    ("chhandogya upanishad",    "chhandogya_upanishad"),
    ("chandogya",               "chhandogya_upanishad"),
    ("brihadaranyaka upanishad","brihadaranyak_upanishad"),
    ("brihadaranyak upanishad", "brihadaranyak_upanishad"),
    ("brihadaranyak",           "brihadaranyak_upanishad"),
    ("prashna upanishad",       "prashn_upanishad"),
    ("prashn upanishad",        "prashn_upanishad"),
    ("aitareya upanishad",      "aitareya_upanishad"),
    ("taittiriya upanishad",    "taittiriya_upanishad"),
    ("shwetashwatar upanishad", "shwetashwetar_upanishad"),
    ("shvetashvatara upanishad","shwetashwetar_upanishad"),
    ("kena upanishad",          "kena_upanishad"),  # not in corpus but handled gracefully
    ("kaivalya upanishad",      "kaivalya_upanishad"),
    # Generic "upanishad NN.NN" without a name is ambiguous — do NOT match.
]

# Sort longest alias first so "bhagavad gita" wins over "gita".
_ALIASES.sort(key=lambda t: -len(t[0]))

# Default scripture when the user types only "2.47" with no scripture name.
_DEFAULT_SCRIPTURE = "bhagwad_gita"

# Chapter/verse patterns. Accepts 2.47 / 2:47 / 2/47 (2-level) AND
# 1.2.15 / 1:2:15 (3-level for Upanishads that index chapter.section.verse
# — Katha, Chhandogya, Brihadaranyak, etc.). Prose forms handled separately.
#
# Storage format is scripture:parts joined by commas → kath_upanishad:1,2,15
# for a 3-level ref, bhagwad_gita:2,47 for a 2-level ref. A wrong parse is
# caught by the uid lookup returning None, and the dense path picks up.
_NUM_TRIPLE = re.compile(
    r"""
    (?<!\d)
    (\d{1,3}) \s*[.:/]\s*
    (\d{1,3}) \s*[.:/]\s*
    (\d{1,3})
    (?!\s*[.:/]?\s*\d)
    """,
    re.VERBOSE,
)
_NUM_PAIR = re.compile(
    r"""
    (?<!\d)                  # no leading digit
    (\d{1,3})                # chapter
    \s*[.:/,]\s*             # separator
    (\d{1,3})                # verse
    (?!\s*[.:/,]?\s*\d)      # no trailing digit — 3-level refs handled above
    """,
    re.VERBOSE,
)

_PROSE_PAIR = re.compile(
    r"""
    (?:chapter|ch|adhyay|adhyaya)\.?\s*(\d{1,3})
    [\s,]+
    (?:verse|vs|v|shlok|shloka|sloka)\.?\s*(\d{1,3})
    """,
    re.IGNORECASE | re.VERBOSE,
)


def named_scriptures(text: str) -> list[str]:
    """Resolve explicitly named texts without counting 'gita' inside another Gita."""
    occupied: list[tuple[int, int]] = []
    slugs = []
    for alias, slug in _ALIASES:
        for match in re.finditer(r"(?<!\w)" + re.escape(alias) + r"(?!\w)", text, re.I):
            if any(start <= match.start() < end for start, end in occupied):
                continue
            occupied.append(match.span())
            if slug not in slugs:
                slugs.append(slug)
    return slugs


def _find_alias(text: str) -> Optional[Tuple[str, int, int]]:
    """
    Return (canonical_slug, start_offset, end_offset) of the first matching
    scripture alias in `text` (longest-first), or None.
    """
    lower = text.lower()
    for alias, slug in _ALIASES:
        idx = lower.find(alias)
        if idx < 0:
            continue
        # Word-boundary check for short aliases (bg, ys) to avoid matching
        # substrings like "bg" in "bigger".
        if len(alias) <= 3:
            left_ok  = idx == 0 or not lower[idx - 1].isalpha()
            right_ok = idx + len(alias) == len(lower) or not lower[idx + len(alias)].isalpha()
            if not (left_ok and right_ok):
                continue
        return slug, idx, idx + len(alias)
    return None


def parse(query: str) -> List[VerseRef]:
    """
    Scan `query` for chapter.verse citations. Returns 0..N VerseRef objects.

    Strategy:
      1. Find scripture alias (longest-match) in the query.
      2. Look for a number pair AFTER the alias first, then anywhere.
      3. If no alias but a bare NN.NN pair is present AND the query is short,
         assume _DEFAULT_SCRIPTURE. Long free-text without an alias is left
         to dense retrieval.
    """
    if not query or len(query) > 500:
        return []

    q = query.strip()
    refs: List[VerseRef] = []

    alias = _find_alias(q)

    # Prose form always wins (unambiguous)
    for m in _PROSE_PAIR.finditer(q):
        c, v = int(m.group(1)), int(m.group(2))
        scripture = alias[0] if alias else _DEFAULT_SCRIPTURE
        refs.append(VerseRef(scripture=scripture, chapter=c, verse=v, raw=m.group(0)))

    if refs:
        return _dedupe(refs)

    # Numeric form — restrict to AFTER the alias if we found one.
    # Try 3-level first (Upanishad style) so we don't miss the section.
    scan = q[alias[2]:] if alias else q

    # Track consumed spans so a 3-level match isn't also matched as a 2-level.
    consumed: list[tuple[int, int]] = []

    for m in _NUM_TRIPLE.finditer(scan):
        c, sec, v = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if not (1 <= c <= 200 and 1 <= sec <= 50 and 1 <= v <= 300):
            continue
        scripture = alias[0] if alias else _DEFAULT_SCRIPTURE
        refs.append(VerseRef(
            scripture=scripture, chapter=c, section=sec, verse=v, raw=m.group(0)
        ))
        consumed.append((m.start(), m.end()))

    for m in _NUM_PAIR.finditer(scan):
        # Skip if this pair is inside a 3-level match we already recorded
        if any(s <= m.start() and m.end() <= e for s, e in consumed):
            continue
        c, v = int(m.group(1)), int(m.group(2))
        if not (1 <= c <= 200 and 1 <= v <= 300):
            continue
        scripture = alias[0] if alias else _DEFAULT_SCRIPTURE
        refs.append(VerseRef(scripture=scripture, chapter=c, verse=v, raw=m.group(0)))

    # If no alias AND query is >30 chars of prose (not a bare "2.47"),
    # withhold the default-to-Gita guess — too speculative, dense path will
    # answer better.
    if refs and not alias and len(q) > 30:
        logger.debug("Rejecting bare numeric ref in long query: %r", q[:80])
        return []

    return _dedupe(refs)


def _dedupe(refs: List[VerseRef]) -> List[VerseRef]:
    seen = set()
    out = []
    for r in refs:
        key = (r.scripture, r.chapter, r.section, r.verse)
        if key in seen:
            continue
        seen.add(key)
        out.append(r)
    return out


def to_uid(ref: VerseRef) -> str:
    """
    VerseRef → corpus uid. Storage joins parts with commas:
      2-level: 'bhagwad_gita:2,47'
      3-level: 'kath_upanishad:1,2,15'
    """
    if ref.section is not None:
        return f"{ref.scripture}:{ref.chapter},{ref.section},{ref.verse}"
    return f"{ref.scripture}:{ref.chapter},{ref.verse}"

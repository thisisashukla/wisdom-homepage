"""
server/verse_of_day.py — Verse of the Day endpoints.

GET  /api/v1/verse-of-day
    → Return today's verse (from Supabase cache, or generate on-the-fly as fallback).
    → Optional query param ?date=YYYY-MM-DD for testing a specific date.

POST /api/v1/verse-of-day/generate
    → Admin endpoint: select today's verse, call Sarvam AI for context, persist to Supabase.
    → Protected by X-Admin-Key header (must match ADMIN_KEY env var).
    → Called by the daily cron at midnight IST.

Design:
    1. Curated pool of ~100 iconic Gita verses, each tagged with themes.
    2. Date heuristics: day-of-week (Hindu planetary week), month, special dates.
    3. Scoring: theme overlap × weight, minus recency penalty (last 90 days).
    4. Sarvam AI generates: date_context, why_chosen, story (2-3 sentences each).
    5. Supabase stores the result; GET reads from cache first.
"""
from __future__ import annotations

import logging
import os
import random
from datetime import date, timedelta, timezone, datetime
from typing import Optional

from fastapi import APIRouter, Header, HTTPException, Query
from pydantic import BaseModel

from ai.index import get_index
from ai.sarvam import get_sarvam
from common.models import VerseOfDayResponse

logger = logging.getLogger(__name__)
router = APIRouter()

# ── IST offset ────────────────────────────────────────────────────────────────
# India is UTC+5:30. We use this for "today" so the verse rolls at midnight IST.
IST = timezone(timedelta(hours=5, minutes=30))


def today_ist() -> date:
    return datetime.now(tz=IST).date()


# ── Curated verse pool ────────────────────────────────────────────────────────
# (chapter, verse, primary_themes, weight)
# weight: 3 = iconic/universally known · 2 = well-known · 1 = deep-cut
# themes match the DOW_THEMES / MONTH_BONUS lists below.

VERSE_POOL: list[dict] = [
    # ── Nishkama Karma / Action / Duty ───────────────────────────────────────
    {"ch": 2,  "v": 47,  "themes": ["karma", "action", "detachment", "discipline"],  "w": 3},
    {"ch": 2,  "v": 48,  "themes": ["yoga", "equanimity", "action", "detachment"],   "w": 3},
    {"ch": 3,  "v": 8,   "themes": ["action", "duty", "karma", "discipline"],         "w": 2},
    {"ch": 3,  "v": 19,  "themes": ["action", "detachment", "karma", "duty"],         "w": 2},
    {"ch": 3,  "v": 35,  "themes": ["dharma", "duty", "courage", "warrior"],          "w": 2},
    {"ch": 18, "v": 41,  "themes": ["dharma", "duty", "action"],                      "w": 2},
    {"ch": 18, "v": 45,  "themes": ["dharma", "duty", "devotion"],                    "w": 2},
    {"ch": 18, "v": 46,  "themes": ["dharma", "duty", "devotion", "divine"],          "w": 2},
    {"ch": 18, "v": 48,  "themes": ["action", "karma", "duty", "courage"],            "w": 2},
    # ── Soul / Consciousness / Atman ─────────────────────────────────────────
    {"ch": 2,  "v": 17,  "themes": ["soul", "consciousness", "divine", "self"],       "w": 3},
    {"ch": 2,  "v": 19,  "themes": ["soul", "consciousness", "divine", "self"],       "w": 3},
    {"ch": 2,  "v": 20,  "themes": ["soul", "consciousness", "divine", "self"],       "w": 3},
    {"ch": 2,  "v": 22,  "themes": ["soul", "consciousness", "rebirth", "self"],      "w": 3},
    {"ch": 2,  "v": 23,  "themes": ["soul", "consciousness", "divine", "self"],       "w": 3},
    {"ch": 13, "v": 2,   "themes": ["soul", "consciousness", "self", "knowledge"],    "w": 2},
    {"ch": 13, "v": 27,  "themes": ["soul", "consciousness", "divine", "self"],       "w": 2},
    {"ch": 13, "v": 28,  "themes": ["soul", "consciousness", "divine", "self"],       "w": 2},
    {"ch": 15, "v": 7,   "themes": ["soul", "consciousness", "divine", "self"],       "w": 2},
    {"ch": 15, "v": 15,  "themes": ["soul", "consciousness", "knowledge", "divine"],  "w": 2},
    # ── Dharma / Divine order ────────────────────────────────────────────────
    {"ch": 4,  "v": 7,   "themes": ["dharma", "duty", "divine", "krishna"],           "w": 3},
    {"ch": 4,  "v": 8,   "themes": ["dharma", "duty", "divine", "courage"],           "w": 3},
    # ── Knowledge / Wisdom / Jnana ───────────────────────────────────────────
    {"ch": 4,  "v": 38,  "themes": ["knowledge", "wisdom", "learning", "intellect"],  "w": 3},
    {"ch": 4,  "v": 39,  "themes": ["knowledge", "wisdom", "faith", "learning"],      "w": 2},
    {"ch": 4,  "v": 40,  "themes": ["knowledge", "doubt", "faith", "intellect"],      "w": 2},
    {"ch": 5,  "v": 16,  "themes": ["knowledge", "wisdom", "self", "consciousness"],  "w": 2},
    {"ch": 7,  "v": 2,   "themes": ["knowledge", "wisdom", "intellect", "divine"],    "w": 2},
    {"ch": 10, "v": 38,  "themes": ["knowledge", "wisdom", "intellect", "discipline"],"w": 2},
    {"ch": 13, "v": 7,   "themes": ["knowledge", "wisdom", "guru", "learning"],       "w": 2},
    {"ch": 18, "v": 20,  "themes": ["knowledge", "wisdom", "consciousness", "self"],  "w": 2},
    {"ch": 18, "v": 63,  "themes": ["knowledge", "wisdom", "grace", "surrender"],     "w": 2},
    {"ch": 18, "v": 67,  "themes": ["knowledge", "wisdom", "devotion", "duty"],       "w": 2},
    # ── Guru / Teacher / Grace ───────────────────────────────────────────────
    {"ch": 4,  "v": 34,  "themes": ["guru", "grace", "learning", "surrender", "knowledge"], "w": 3},
    {"ch": 9,  "v": 22,  "themes": ["grace", "surrender", "devotion", "divine"],      "w": 3},
    {"ch": 10, "v": 10,  "themes": ["grace", "devotion", "knowledge", "divine"],      "w": 2},
    {"ch": 18, "v": 56,  "themes": ["grace", "surrender", "devotion", "divine"],      "w": 3},
    {"ch": 18, "v": 57,  "themes": ["grace", "surrender", "divine", "karma"],         "w": 2},
    {"ch": 18, "v": 58,  "themes": ["grace", "surrender", "devotion", "consciousness"],"w": 2},
    {"ch": 18, "v": 61,  "themes": ["grace", "surrender", "divine", "soul"],          "w": 2},
    # ── Devotion / Bhakti ────────────────────────────────────────────────────
    {"ch": 9,  "v": 26,  "themes": ["devotion", "love", "grace", "harmony"],          "w": 3},
    {"ch": 9,  "v": 27,  "themes": ["devotion", "love", "grace", "divine"],           "w": 3},
    {"ch": 9,  "v": 29,  "themes": ["devotion", "love", "equality", "grace"],         "w": 3},
    {"ch": 9,  "v": 30,  "themes": ["devotion", "grace", "surrender", "divine"],      "w": 3},
    {"ch": 9,  "v": 31,  "themes": ["devotion", "grace", "surrender", "divine"],      "w": 3},
    {"ch": 9,  "v": 34,  "themes": ["devotion", "love", "meditation", "divine"],      "w": 3},
    {"ch": 12, "v": 2,   "themes": ["devotion", "meditation", "love", "divine"],      "w": 2},
    {"ch": 12, "v": 8,   "themes": ["devotion", "meditation", "mind", "divine"],      "w": 2},
    {"ch": 12, "v": 13,  "themes": ["devotion", "love", "harmony", "contentment"],    "w": 2},
    {"ch": 12, "v": 14,  "themes": ["devotion", "contentment", "equanimity", "discipline"], "w": 2},
    {"ch": 12, "v": 15,  "themes": ["devotion", "harmony", "peace", "contentment"],   "w": 2},
    {"ch": 12, "v": 17,  "themes": ["devotion", "equanimity", "contentment", "peace"],"w": 2},
    {"ch": 12, "v": 18,  "themes": ["devotion", "equanimity", "harmony", "peace"],    "w": 2},
    {"ch": 12, "v": 19,  "themes": ["devotion", "renunciation", "contentment", "peace"], "w": 2},
    {"ch": 12, "v": 20,  "themes": ["devotion", "grace", "divine", "love"],           "w": 2},
    {"ch": 18, "v": 65,  "themes": ["devotion", "grace", "surrender", "love"],        "w": 3},
    {"ch": 18, "v": 71,  "themes": ["devotion", "faith", "grace", "liberation"],      "w": 2},
    # ── Mind / Meditation / Yoga ─────────────────────────────────────────────
    {"ch": 6,  "v": 5,   "themes": ["mind", "self", "discipline", "consciousness"],   "w": 3},
    {"ch": 6,  "v": 6,   "themes": ["mind", "self", "discipline", "enemy"],           "w": 3},
    {"ch": 6,  "v": 17,  "themes": ["mind", "meditation", "discipline", "peace"],     "w": 2},
    {"ch": 6,  "v": 20,  "themes": ["mind", "meditation", "self", "consciousness"],   "w": 2},
    {"ch": 6,  "v": 34,  "themes": ["mind", "control", "equanimity", "peace"],        "w": 2},
    {"ch": 6,  "v": 35,  "themes": ["mind", "control", "discipline", "practice"],     "w": 2},
    {"ch": 6,  "v": 40,  "themes": ["devotion", "peace", "grace", "equanimity"],      "w": 2},
    {"ch": 8,  "v": 7,   "themes": ["mind", "meditation", "devotion", "action"],      "w": 3},
    {"ch": 17, "v": 16,  "themes": ["mind", "peace", "harmony", "meditation"],        "w": 2},
    # ── Equanimity / Peace / Contentment ─────────────────────────────────────
    {"ch": 2,  "v": 14,  "themes": ["equanimity", "peace", "contentment", "discipline"], "w": 3},
    {"ch": 2,  "v": 55,  "themes": ["equanimity", "peace", "contentment", "wisdom"],  "w": 3},
    {"ch": 2,  "v": 56,  "themes": ["equanimity", "peace", "contentment", "wisdom"],  "w": 2},
    {"ch": 2,  "v": 70,  "themes": ["equanimity", "peace", "contentment", "renunciation"], "w": 3},
    {"ch": 5,  "v": 29,  "themes": ["peace", "harmony", "divine", "contentment"],     "w": 3},
    {"ch": 18, "v": 54,  "themes": ["contentment", "peace", "devotion", "renunciation"], "w": 2},
    # ── Renunciation / Detachment / Vairagya ─────────────────────────────────
    {"ch": 3,  "v": 27,  "themes": ["renunciation", "detachment", "ego", "action"],   "w": 3},
    {"ch": 3,  "v": 42,  "themes": ["renunciation", "detachment", "soul", "intellect"],"w": 2},
    {"ch": 5,  "v": 10,  "themes": ["renunciation", "detachment", "karma", "action"], "w": 2},
    {"ch": 14, "v": 19,  "themes": ["renunciation", "detachment", "consciousness", "self"], "w": 2},
    {"ch": 14, "v": 20,  "themes": ["renunciation", "detachment", "consciousness"],   "w": 2},
    {"ch": 14, "v": 26,  "themes": ["renunciation", "devotion", "divine", "consciousness"], "w": 2},
    {"ch": 18, "v": 66,  "themes": ["renunciation", "surrender", "grace", "karma"],   "w": 3},
    # ── Courage / Warrior ────────────────────────────────────────────────────
    {"ch": 2,  "v": 3,   "themes": ["courage", "warrior", "duty", "action"],          "w": 3},
    {"ch": 2,  "v": 33,  "themes": ["courage", "warrior", "duty", "dharma"],          "w": 2},
    {"ch": 4,  "v": 1,   "themes": ["courage", "warrior", "knowledge", "dharma"],     "w": 2},
    {"ch": 11, "v": 33,  "themes": ["courage", "warrior", "duty", "action"],          "w": 3},
    # ── Divine Nature / Vishwarupa ────────────────────────────────────────────
    {"ch": 7,  "v": 7,   "themes": ["divine", "consciousness", "soul", "krishna"],    "w": 3},
    {"ch": 7,  "v": 19,  "themes": ["divine", "devotion", "knowledge", "consciousness"], "w": 3},
    {"ch": 9,  "v": 1,   "themes": ["divine", "knowledge", "grace", "krishna"],       "w": 2},
    {"ch": 9,  "v": 2,   "themes": ["divine", "knowledge", "grace", "devotion"],      "w": 2},
    {"ch": 10, "v": 8,   "themes": ["divine", "consciousness", "knowledge", "krishna"],"w": 2},
    {"ch": 10, "v": 20,  "themes": ["divine", "soul", "consciousness", "self"],       "w": 2},
    {"ch": 10, "v": 41,  "themes": ["divine", "beauty", "harmony", "consciousness"],  "w": 2},
    {"ch": 10, "v": 42,  "themes": ["divine", "consciousness", "soul", "krishna"],    "w": 3},
    {"ch": 18, "v": 55,  "themes": ["divine", "devotion", "knowledge", "consciousness"], "w": 2},
    {"ch": 18, "v": 78,  "themes": ["divine", "dharma", "grace", "victory"],          "w": 3},
    # ── Death / Transition / Liberation ──────────────────────────────────────
    {"ch": 8,  "v": 5,   "themes": ["soul", "consciousness", "divine", "liberation"], "w": 2},
    {"ch": 8,  "v": 6,   "themes": ["mind", "consciousness", "divine", "liberation"], "w": 2},
    {"ch": 8,  "v": 13,  "themes": ["soul", "meditation", "divine", "liberation"],    "w": 2},
    {"ch": 8,  "v": 15,  "themes": ["liberation", "renunciation", "divine", "soul"],  "w": 2},
    # ── Faith / Shraddha ─────────────────────────────────────────────────────
    {"ch": 17, "v": 1,   "themes": ["faith", "devotion", "discipline", "consciousness"], "w": 2},
    {"ch": 17, "v": 2,   "themes": ["faith", "devotion", "discipline", "knowledge"],  "w": 2},
    {"ch": 17, "v": 17,  "themes": ["discipline", "devotion", "equanimity", "knowledge"], "w": 2},
    # ── Surrender / Sharanagati ───────────────────────────────────────────────
    {"ch": 2,  "v": 7,   "themes": ["surrender", "guru", "grace", "devotion"],        "w": 3},
    {"ch": 18, "v": 73,  "themes": ["surrender", "grace", "devotion", "liberation"],  "w": 3},
    # ── Yoga / Union (general) ───────────────────────────────────────────────
    {"ch": 2,  "v": 50,  "themes": ["yoga", "karma", "wisdom", "action"],             "w": 3},
    {"ch": 4,  "v": 22,  "themes": ["yoga", "equanimity", "contentment", "action"],   "w": 2},
    {"ch": 4,  "v": 42,  "themes": ["yoga", "knowledge", "wisdom", "action"],         "w": 2},
    {"ch": 6,  "v": 7,   "themes": ["yoga", "equanimity", "self", "peace"],           "w": 2},
]


# ── Day-of-week → Hindu planetary theme mapping ───────────────────────────────
# Python weekday(): 0=Monday, 1=Tuesday … 6=Sunday

DOW_CONFIG: dict[int, dict] = {
    0: {
        "themes": ["mind", "devotion", "meditation", "peace"],
        "deity": "Chandra (Moon)",
        "day_name": "Somvar",
        "energy": "stillness, inner reflection, and devotion — the Moon's cooling, emotional energy",
    },
    1: {
        "themes": ["courage", "action", "warrior", "duty", "dharma"],
        "deity": "Mangal (Mars)",
        "day_name": "Mangalvar",
        "energy": "courage, righteous action, and dharmic struggle — the warrior energy of Mars",
    },
    2: {
        "themes": ["knowledge", "wisdom", "intellect", "learning"],
        "deity": "Budh (Mercury)",
        "day_name": "Budhvar",
        "energy": "clarity of mind, sharp discrimination, and the pursuit of true knowledge — Mercury's gift",
    },
    3: {
        "themes": ["guru", "grace", "knowledge", "surrender", "devotion"],
        "deity": "Guru Brihaspati (Jupiter)",
        "day_name": "Guruvar",
        "energy": "grace, wisdom, and the sacred bond between teacher and student — Jupiter's expansive blessings",
    },
    4: {
        "themes": ["harmony", "contentment", "equanimity", "peace", "love"],
        "deity": "Shukra (Venus)",
        "day_name": "Shukravar",
        "energy": "beauty, harmony, inner contentment, and the sweetness of Bhakti — Venus's gentle radiance",
    },
    5: {
        "themes": ["karma", "renunciation", "discipline", "detachment"],
        "deity": "Shani (Saturn)",
        "day_name": "Shanivar",
        "energy": "discipline, karmic reckoning, renunciation, and the slow fire of Tapas — Saturn's stern grace",
    },
    6: {
        "themes": ["soul", "consciousness", "divine", "self"],
        "deity": "Surya (Sun)",
        "day_name": "Ravivar",
        "energy": "radiant self-knowledge, the light of the Atman, and direct contact with the Divine — the Sun's sovereign clarity",
    },
}

# ── Month-based bonus themes ──────────────────────────────────────────────────
MONTH_BONUS: dict[int, list[str]] = {
    1:  ["self", "discipline", "knowledge"],          # January — Makar Sankranti
    2:  ["devotion", "love", "harmony"],              # February — Maha Shivaratri season
    3:  ["action", "devotion", "courage"],            # March — Holi / spring
    4:  ["duty", "dharma", "courage"],                # April — Ram Navami season
    5:  ["discipline", "yoga", "action"],             # May — summer intensity
    6:  ["meditation", "yoga", "self"],               # June — Yoga Day (21st)
    7:  ["devotion", "surrender", "grace"],           # July — Shravan begins
    8:  ["divine", "krishna", "devotion"],            # August — Janmashtami
    9:  ["courage", "dharma", "devotion"],            # September — Navratri
    10: ["consciousness", "divine", "light"],         # October — Dussehra
    11: ["consciousness", "soul", "divine"],          # November — Diwali
    12: ["knowledge", "wisdom", "guru"],              # December — Gita Jayanti (18th)
}

# ── Special date overrides (month, day) ──────────────────────────────────────
# These replace DOW themes entirely for maximum relevance.
SPECIAL_DATES: dict[tuple[int, int], dict] = {
    (1, 14):  {"themes": ["soul", "consciousness", "knowledge"],           "note": "Makar Sankranti"},
    (1, 26):  {"themes": ["dharma", "duty", "courage", "warrior"],         "note": "Republic Day"},
    (2, 14):  {"themes": ["love", "devotion", "divine", "harmony"],        "note": "Valentine's Day"},
    (3, 8):   {"themes": ["courage", "dharma", "duty"],                    "note": "International Women's Day"},
    (6, 21):  {"themes": ["yoga", "meditation", "mind", "self"],           "note": "International Yoga Day"},
    (8, 15):  {"themes": ["dharma", "duty", "courage", "action"],          "note": "Independence Day"},
    (12, 18): {"themes": ["knowledge", "wisdom", "guru", "divine"],        "note": "Gita Jayanti"},
    (12, 25): {"themes": ["devotion", "grace", "divine", "love"],          "note": "Christmas / Universal Devotion"},
    (10, 2):  {"themes": ["renunciation", "karma", "duty", "dharma"],      "note": "Gandhi Jayanti"},
}


# ── Scoring & selection ───────────────────────────────────────────────────────

def _build_target_themes(for_date: date) -> tuple[list[str], str]:
    """
    Return (target_themes, selection_note) for a given date.
    Special dates override everything; otherwise DOW + month bonus.
    """
    key = (for_date.month, for_date.day)
    if key in SPECIAL_DATES:
        special = SPECIAL_DATES[key]
        return special["themes"], f"Special date: {special['note']}"

    dow = for_date.weekday()
    dow_themes = list(DOW_CONFIG[dow]["themes"])
    month_bonus = MONTH_BONUS.get(for_date.month, [])
    combined = dow_themes + [t for t in month_bonus if t not in dow_themes]
    note = f"{DOW_CONFIG[dow]['day_name']} (day of {DOW_CONFIG[dow]['deity']})"
    return combined, note


def _score_verse(verse: dict, target: list[str]) -> float:
    """Score a verse against the target themes; higher = better fit."""
    matches = sum(1 for t in verse["themes"] if t in target)
    return matches * 2.0 + verse["w"]


def _pick_verse(for_date: date, recent_uids: set[str]) -> dict:
    """
    Score all verses against today's themes, filter out recently-used,
    pick the best. Falls back to full pool if all have been used recently.
    """
    target, _ = _build_target_themes(for_date)
    scored = [(v, _score_verse(v, target)) for v in VERSE_POOL]
    scored.sort(key=lambda x: x[1], reverse=True)

    uid_key = lambda v: f"bhagwad_gita:{v['ch']}.{v['v']}"

    # Prefer verses not used in the last 90 days
    fresh = [(v, s) for v, s in scored if uid_key(v) not in recent_uids]
    pool = fresh if fresh else scored  # fall back to all if somehow exhausted

    if not pool:
        return VERSE_POOL[0]

    # Pick deterministically when scores are tied: use date as tiebreaker seed
    top_score = pool[0][1]
    top_tier  = [v for v, s in pool if s >= top_score - 0.5]
    # Seed from date so same date always gives same verse if called multiple times
    rng = random.Random(for_date.toordinal())
    return rng.choice(top_tier)


# ── Sarvam AI context generation ──────────────────────────────────────────────

SYSTEM_PROMPT = """You are a scholar and spiritual teacher of the Bhagavad Gita with deep knowledge of Sanskrit, Hindu philosophy, and the Mahabharata. Write in clear, warm, engaging English for a modern educated reader (NRI / urban Indian 25-45). Avoid jargon; no bullet points. Return pure JSON only, no markdown."""

def _build_user_prompt(
    for_date: date,
    chapter: int,
    verse: int,
    verse_text: str,
    english: str,
    essence: str,
    themes: list[str],
    dow_config: dict,
    selection_note: str,
) -> str:
    day_name = for_date.strftime("%A, %B %-d, %Y")
    return f"""Today is {day_name} — {dow_config['day_name']}, the day of {dow_config['deity']}.
The planetary energy of this day is one of {dow_config['energy']}.

The verse chosen for today is Bhagavad Gita {chapter}.{verse}:
Sanskrit: {verse_text}
English: {english}
Essence: {essence}
Primary themes: {', '.join(themes)}
Selection reason: {selection_note}

Write three short passages (2-3 sentences each):

1. "date_context" — What makes today ({dow_config['day_name']}, the day of {dow_config['deity']}) spiritually meaningful in the Hindu tradition? Be specific about the planetary/lunar significance; give the reader a felt sense of the day's energy.

2. "why_chosen" — Why does this specific Gita verse resonate with the energy of today? Connect the verse's core teaching to {dow_config['day_name']}'s themes without being mechanical. Make it feel genuinely relevant.

3. "story" — Briefly paint the scene in which Krishna spoke (or Arjuna asked) this verse. Where are they on the battlefield? What is at stake emotionally? What does this moment reveal?

Return exactly: {{"date_context": "...", "why_chosen": "...", "story": "..."}}"""


async def _generate_context(
    for_date: date,
    chapter: int,
    verse: int,
    verse_text: str,
    english: str,
    essence: str,
    themes: list[str],
    selection_note: str,
) -> dict:
    """Call Sarvam AI to generate date_context, why_chosen, story."""
    dow = for_date.weekday()
    dow_cfg = DOW_CONFIG[dow]
    user_prompt = _build_user_prompt(
        for_date, chapter, verse, verse_text, english, essence,
        themes, dow_cfg, selection_note
    )
    try:
        sarvam = get_sarvam()
        result = sarvam.generate_json(
            system_prompt=SYSTEM_PROMPT,
            user_content=user_prompt,
            max_tokens=1200,
        )
        # Validate expected keys
        for key in ("date_context", "why_chosen", "story"):
            if key not in result or not isinstance(result[key], str):
                raise ValueError(f"Missing or invalid key '{key}' in Sarvam response")
        return result
    except Exception as e:
        logger.error("Sarvam context generation failed: %s", e)
        # Return graceful fallback text
        dow_name = dow_cfg["day_name"]
        deity = dow_cfg["deity"]
        return {
            "date_context": (
                f"Today is {dow_name}, the day dedicated to {deity} in the Hindu tradition. "
                f"Each day of the week carries a distinct planetary energy that the ancient rishis "
                f"recognised as an invitation to a specific mode of spiritual practice."
            ),
            "why_chosen": (
                f"This verse from the Bhagavad Gita aligns naturally with the themes of {dow_name} — "
                f"{', '.join(themes[:3])}. "
                f"Krishna's teaching here offers a direct anchor for the day's energy."
            ),
            "story": (
                f"On the battlefield of Kurukshetra, with armies arrayed and conches silenced, "
                f"Krishna turns to Arjuna and speaks Bhagavad Gita {chapter}.{verse}. "
                f"The verse arises from the deepest crisis a warrior has ever faced — and Krishna's "
                f"answer reaches far beyond that single moment."
            ),
        }


# ── Supabase helpers ──────────────────────────────────────────────────────────

def _supabase_available() -> bool:
    return bool(
        os.environ.get("SUPABASE_URL") and os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    )


def _fetch_from_supabase(for_date: date) -> Optional[VerseOfDayResponse]:
    """Return today's entry from Supabase, or None if missing / not configured."""
    if not _supabase_available():
        return None
    try:
        from common.supabase_client import get_supabase
        sb = get_supabase()
        resp = (
            sb.table("verse_of_day")
            .select("*")
            .eq("date", str(for_date))
            .limit(1)
            .execute()
        )
        if resp.data:
            row = resp.data[0]
            return VerseOfDayResponse(
                date=str(for_date),
                chapter=row["chapter"],
                verse=row["verse"],
                verse_uid=row["verse_uid"],
                day_of_week=row["day_of_week"],
                deity=row["deity"],
                day_name_hi=row["day_name_hi"],
                date_context=row["date_context"],
                why_chosen=row["why_chosen"],
                story=row["story"],
                themes=row.get("themes", []),
            )
    except Exception as e:
        logger.warning("Supabase fetch failed: %s", e)
    return None


def _fetch_recent_uids(days: int = 90) -> set[str]:
    """Fetch verse UIDs used in the past `days` days to avoid repeats."""
    if not _supabase_available():
        return set()
    try:
        from common.supabase_client import get_supabase
        since = str(date.today() - timedelta(days=days))
        sb = get_supabase()
        resp = (
            sb.table("verse_of_day")
            .select("verse_uid")
            .gte("date", since)
            .execute()
        )
        return {row["verse_uid"] for row in (resp.data or [])}
    except Exception as e:
        logger.warning("Supabase recency fetch failed: %s", e)
        return set()


def _upsert_to_supabase(row: dict) -> None:
    """Write (or update) today's verse_of_day row."""
    if not _supabase_available():
        logger.info("Supabase not configured — skipping persistence")
        return
    try:
        from common.supabase_client import get_supabase
        sb = get_supabase()
        sb.table("verse_of_day").upsert(row, on_conflict="date").execute()
        logger.info("verse_of_day upserted for %s", row["date"])
    except Exception as e:
        logger.error("Supabase upsert failed: %s", e)


# ── Core generation logic (shared by endpoint + cron script) ──────────────────

async def generate_verse_for_date(for_date: date) -> VerseOfDayResponse:
    """
    Full pipeline: pick verse → load verse text from index → call Sarvam →
    build response. Does NOT persist to Supabase (call _upsert_to_supabase separately).
    """
    recent_uids = _fetch_recent_uids()
    picked = _pick_verse(for_date, recent_uids)
    target_themes, selection_note = _build_target_themes(for_date)

    # Resolve verse text from the in-memory index
    chapter, verse_num = picked["ch"], picked["v"]
    verse_uid = f"bhagwad_gita:{chapter}.{verse_num}"
    verse_text = ""
    english = ""
    essence = ""

    try:
        idx = get_index()
        # Search by uid in the loaded corpus
        all_verses = idx._verses  # list[dict]
        for v in all_verses:
            if v.get("script_ref") == verse_uid:
                verse_text = v.get("verse_text", "")
                english    = v.get("english_translation", "")
                essence    = v.get("essence", "")
                break
    except Exception as e:
        logger.warning("Could not resolve verse text from index: %s", e)

    # Generate AI context
    context = await _generate_context(
        for_date=for_date,
        chapter=chapter,
        verse=verse_num,
        verse_text=verse_text,
        english=english,
        essence=essence,
        themes=picked["themes"],
        selection_note=selection_note,
    )

    dow = for_date.weekday()
    dow_cfg = DOW_CONFIG[dow]

    return VerseOfDayResponse(
        date=str(for_date),
        chapter=chapter,
        verse=verse_num,
        verse_uid=verse_uid,
        day_of_week=for_date.strftime("%A"),
        deity=dow_cfg["deity"],
        day_name_hi=dow_cfg["day_name"],
        date_context=context["date_context"],
        why_chosen=context["why_chosen"],
        story=context["story"],
        themes=picked["themes"],
    )


# ── FastAPI endpoints ─────────────────────────────────────────────────────────

@router.get("/verse-of-day", response_model=VerseOfDayResponse, tags=["verse-of-day"])
async def get_verse_of_day(
    date_param: Optional[str] = Query(None, alias="date", description="YYYY-MM-DD (testing only)")
) -> VerseOfDayResponse:
    """
    Return today's Verse of the Day.
    Reads from Supabase if available; falls back to on-the-fly generation.
    """
    # Resolve target date
    if date_param:
        try:
            for_date = date.fromisoformat(date_param)
        except ValueError:
            raise HTTPException(status_code=400, detail="date must be YYYY-MM-DD")
    else:
        for_date = today_ist()

    # Try cache first
    cached = _fetch_from_supabase(for_date)
    if cached:
        logger.info("verse-of-day: cache hit for %s", for_date)
        return cached

    # Generate on-the-fly (cron missed, or Supabase not set up)
    logger.info("verse-of-day: generating on-the-fly for %s", for_date)
    result = await generate_verse_for_date(for_date)

    # Opportunistically persist
    _upsert_to_supabase({
        "date":         str(for_date),
        "chapter":      result.chapter,
        "verse":        result.verse,
        "verse_uid":    result.verse_uid,
        "day_of_week":  result.day_of_week,
        "deity":        result.deity,
        "day_name_hi":  result.day_name_hi,
        "date_context": result.date_context,
        "why_chosen":   result.why_chosen,
        "story":        result.story,
        "themes":       result.themes,
    })

    return result


@router.post("/verse-of-day/generate", response_model=VerseOfDayResponse, tags=["verse-of-day"])
async def generate_verse_of_day(
    date_param: Optional[str] = Query(None, alias="date", description="YYYY-MM-DD (defaults to today IST)"),
    x_admin_key: Optional[str] = Header(None, alias="X-Admin-Key"),
) -> VerseOfDayResponse:
    """
    Admin endpoint: generate and persist today's (or a specific date's) verse.
    Called by the daily cron at midnight IST.
    Protected by X-Admin-Key header (set ADMIN_KEY in backend .env).
    """
    admin_key = os.environ.get("ADMIN_KEY", "")
    if admin_key and x_admin_key != admin_key:
        raise HTTPException(status_code=403, detail="Invalid or missing X-Admin-Key")

    if date_param:
        try:
            for_date = date.fromisoformat(date_param)
        except ValueError:
            raise HTTPException(status_code=400, detail="date must be YYYY-MM-DD")
    else:
        for_date = today_ist()

    result = await generate_verse_for_date(for_date)

    _upsert_to_supabase({
        "date":         str(for_date),
        "chapter":      result.chapter,
        "verse":        result.verse,
        "verse_uid":    result.verse_uid,
        "day_of_week":  result.day_of_week,
        "deity":        result.deity,
        "day_name_hi":  result.day_name_hi,
        "date_context": result.date_context,
        "why_chosen":   result.why_chosen,
        "story":        result.story,
        "themes":       result.themes,
    })

    logger.info("verse-of-day: generated and persisted for %s (%s)", for_date, result.verse_uid)
    return result

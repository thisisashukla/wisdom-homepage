"""
iast.py — scripture references in IAST, for display on verse cards.

The library's refs are plain ASCII ("Bhagavad Gita 12.12", "Ramcharitmanas,
Uttar Kand 117 (chaupai 17)"). Cards show them the way the texts are cited:
"Bhagavad Gītā 12.12", "Rāmcaritmānas, Uttar Kāṇḍ 117".

Word-level mapping over a closed vocabulary (every word that occurs in the
library's ref labels); anything unknown passes through unchanged, so a new
text never breaks a card. Parentheticals and "+ continuation" tails are
dropped: they are notes for editors, not citations.
"""
from __future__ import annotations

import re
from typing import Optional

WORDS = {
    # texts
    "Bhagavad": "Bhagavad", "Gita": "Gītā", "Mahabharata": "Mahābhārata", "Ramayana": "Rāmāyaṇa",
    "Valmiki": "Vālmīki", "Ramcharitmanas": "Rāmcaritmānas", "Upanishad": "Upaniṣad",
    "Yoga": "Yoga", "Vasishtha": "Vāsiṣṭha", "Bhartrihari": "Bhartṛhari",
    "Nitishatakam": "Nītiśatakam", "Vairagyashatakam": "Vairāgyaśatakam", "Shatakam": "Śatakam",
    "Niti": "Nīti", "Vairagya": "Vairāgya", "Vinay": "Vinaya", "Patrika": "Patrikā",
    "Dohavali": "Dohāvalī", "Kavitavali": "Kavitāvalī", "Gitavali": "Gītāvalī", "Hanuman": "Hanumān",
    "Bahuk": "Bāhuk", "Sursagar": "Sūrsāgar", "Bhramargeet-Saar": "Bhramargīt-Sār", "Surdas": "Sūrdās",
    "Kabir": "Kabīr", "Granthavali": "Granthāvalī", "Rahim": "Rahīm", "Meera": "Mīrā",
    "Swami": "Svāmī", "Vivekananda": "Vivekānanda",
    # Upanishads and Gitas
    "Aitareya": "Aitareya", "Brihadaranyaka": "Bṛhadāraṇyaka", "Chhandogya": "Chāndogya",
    "Isha": "Īśa", "Katha": "Kaṭha", "Katharudra": "Kaṭharudra", "Kaushitaki": "Kauṣītaki",
    "Maha": "Mahā", "Maitri": "Maitrī", "Maitreya": "Maitreya", "Mundaka": "Muṇḍaka",
    "Niralamba": "Nirālamba", "Prashna": "Praśna", "Taittiriya": "Taittirīya", "Adhyatma": "Adhyātma",
    "Shvetashvatara": "Śvetāśvatara", "Devi": "Devī", "Skanda": "Skanda", "Dakshinamurti": "Dakṣiṇāmūrti",
    "Narayana": "Nārāyaṇa", "Shiva": "Śiva", "Sankalpa": "Saṅkalpa",
    "Ashtavakra": "Aṣṭāvakra", "Avadhuta": "Avadhūta", "Hamsa": "Haṃsa", "Ram": "Rām",
    "Surya": "Sūrya", "Vishnu": "Viṣṇu", "Shambhu": "Śambhu", "Shakti": "Śakti", "Anugita": "Anugītā",
    # books, parvas, kandas
    "Kand": "Kāṇḍ", "Kanda": "Kāṇḍa", "Parva": "Parva", "Bal": "Bāl", "Bala": "Bāla",
    "Ayodhya": "Ayodhyā", "Aranya": "Araṇya", "Kishkindha": "Kiṣkindhā", "Sundar": "Sundar",
    "Sundara": "Sundara", "Lanka": "Laṅkā", "Yuddha": "Yuddha", "Uttar": "Uttar", "Uttara": "Uttara",
    "Shanti": "Śānti", "Anushasana": "Anuśāsana", "Ashvamedhika": "Āśvamedhika", "Vana": "Vana",
    "Udyoga": "Udyoga", "Bhishma": "Bhīṣma", "Mokshadharma": "Mokṣadharma", "Rajadharma": "Rājadharma",
    "Apaddharma": "Āpaddharma", "Mumukshu": "Mumukṣu", "Utpatti": "Utpatti", "Upashama": "Upaśama",
    "Nirvana": "Nirvāṇa", "Sthiti": "Sthiti",
    # verse forms
    "pada": "pada", "doha": "dohā", "chaupai": "caupāī", "sortha": "soraṭhā", "chhand": "chanda",
    "shloka": "śloka", "sakhi": "sākhī",
}

# Valmiki books are cited with "Kāṇḍa"; Mahabharata books with "Parva".
VR_BOOKS = {"Bala", "Ayodhya", "Aranya", "Kishkindha", "Sundara", "Yuddha", "Uttara"}
MBH_BOOKS = {"Shanti", "Anushasana", "Ashvamedhika", "Vana", "Udyoga", "Bhishma", "Adi", "Sabha",
             "Virata", "Drona", "Karna", "Shalya", "Sauptika", "Stri", "Ashramavasika", "Mausala"}

_PAREN = re.compile(r"\s*\([^)]*\)")
_TAIL = re.compile(r"\s*\+.*$")
_WORD = re.compile(r"[A-Za-z][A-Za-z-]*")


def _words(s: str) -> str:
    return _WORD.sub(lambda m: WORDS.get(m.group(0), m.group(0)), s)


def to_iast(ref: Optional[str], family: Optional[str] = None) -> Optional[str]:
    """ASCII library ref → IAST display ref. Returns None for an empty ref."""
    if not ref:
        return None
    s = _TAIL.sub("", _PAREN.sub("", ref)).strip().rstrip(",")
    s = re.sub(r"^BG\b", "Bhagavad Gita", s)
    if s.startswith("Complete Works"):                      # Vivekananda: "Complete Works, Vol. 1, …, p. 29"
        vol = re.search(r"Vol\.\s*(\d+)", s)
        return "Svāmī Vivekānanda" + (f", Complete Works, Vol. {vol.group(1)}" if vol else "")
    m = re.match(r"^(Valmiki Ramayana|Mahabharata),\s*([A-Za-z]+)\s+(.*)$", s)
    if m and ((m.group(1) == "Valmiki Ramayana" and m.group(2) in VR_BOOKS) or
              (m.group(1) == "Mahabharata" and m.group(2) in MBH_BOOKS)):
        book = "Kanda" if m.group(1) == "Valmiki Ramayana" else "Parva"
        s = f"{m.group(1)}, {m.group(2)} {book} {m.group(3)}"
    return _words(s)


def card_ref_iast(v: dict) -> Optional[str]:
    """The IAST ref for a library verse: the precise label when it has one, else the display ref."""
    return to_iast(v.get("ref_label") or v.get("display_ref"), v.get("family"))

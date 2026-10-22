"""
recommender.py — verse recommendations for one person, from the curated v2 library
(taxonomy/wisdom_library.json: verses, prasangs, situations, pairs).

Input: what onboarding learned (age band, life stages, phone hours, feeling) and,
optionally, a note in their own words. Output: a short, diverse list of verses
(each with its prasang) that fit.

How it scores
  1. Situations. The library tags every verse with 1-4 of 70 everyday situations.
     The note is matched to situations by meaning (BGE-M3 against each
     situation's phrasings); the profile adds lighter priors (feeling, life
     stage, age band, phone time).
  2. Verses. situation fit + closeness of the verse to the note's meaning
     + quotability + tone that suits the feeling + small priors (Gita, core
     tier, verses this audience already picked).
  3. Selection. One verse per prasang, at most two per text family, never a
     verse the library says must not be shown alone.

Privacy: the note is used for this request only. It is never logged or stored.
Embeddings are optional: without the model the note is matched by keywords.
"""
from __future__ import annotations

import hashlib
import json
import logging
import math
import re
import threading
from collections import Counter
from pathlib import Path
from typing import Callable, Dict, List, Optional, Sequence

from ai.iast import card_ref_iast

import numpy as np

logger = logging.getLogger(__name__)

EmbedFn = Callable[[List[str]], np.ndarray]   # texts -> L2-normalised (N, D)

# ── Profile priors ────────────────────────────────────────────────────────────
# Situation ids are the library's (situations.json). Weights are small next to a
# note match (up to ~1.5), so the note leads whenever there is one.

FEELING_SITUATIONS: Dict[str, Dict[str, float]] = {
    # Restless: "My mind won't settle."
    "quiet":  {"restless_mind": 0.9, "overthinking": 0.8, "sleep_mind": 0.7, "anxiety_general": 0.6,
               "outcome_anxiety": 0.4, "phone_addiction": 0.3},
    # Stuck: "I keep going over something."
    "nerve":  {"overthinking": 0.9, "resentment": 0.6, "guilt": 0.6, "criticism": 0.5, "forgive": 0.5,
               "big_decision": 0.5, "failure_project": 0.4, "shame": 0.4},
    # Uneasy: "Something doesn't sit right."
    "replay": {"anxiety_general": 0.9, "uncertainty": 0.7, "fear_failure": 0.4, "illness_family": 0.4,
               "marriage_distance": 0.3, "loneliness": 0.3, "homesick": 0.3},
    # Determined: "I'm ready to stick with it."
    "stick":  {"discipline": 0.9, "procrastination": 0.8, "change_life": 0.5, "phone_addiction": 0.4,
               "craving": 0.4, "side_project": 0.3},
    # Searching: "I'm looking for something deeper."
    "faith":  {"reconnect_faith": 0.9, "purpose_search": 0.8, "no_meaning": 0.7, "doubt_faith": 0.6,
               "gratitude": 0.3, "morning_calm": 0.3},
    # Curious: "I want to read the Gita."
    "gita":   {"purpose_search": 0.4, "morning_calm": 0.3, "outcome_anxiety": 0.3},
}

STAGE_SITUATIONS: Dict[str, Dict[str, float]] = {
    "studying":       {"fear_failure": 0.35, "comparison": 0.3, "parents_expectations": 0.3, "purpose_search": 0.25},
    "working":        {"burnout": 0.35, "not_promoted": 0.25, "imposter": 0.25, "outcome_anxiety": 0.25},
    "own_thing":      {"failure_project": 0.35, "side_project": 0.3, "uncertainty": 0.3, "money_stress": 0.25, "fear_failure": 0.25},
    "raising_kids":   {"present_parent": 0.35, "raising_kids_values": 0.35, "new_parent": 0.25, "teen_conflict": 0.2},
    "caring_parents": {"parents_aging": 0.45, "illness_family": 0.35, "homesick": 0.2, "grief_parent": 0.15},
    "retired":        {"retirement": 0.45, "purpose_search": 0.3, "empty_nest": 0.25},
    "between":        {"uncertainty": 0.35, "change_life": 0.3, "career_switch": 0.3},
}

AGE_SITUATIONS: Dict[str, Dict[str, float]] = {
    "u25":   {"comparison": 0.2, "parents_expectations": 0.2, "fear_failure": 0.15},
    "25_34": {"comparison": 0.2, "career_switch": 0.15, "imposter": 0.15},
    "35_44": {"burnout": 0.15, "midlife": 0.15, "present_parent": 0.1},
    "45_54": {"midlife": 0.25, "empty_nest": 0.15, "parents_aging": 0.15},
    "55p":   {"retirement": 0.2, "gratitude": 0.15, "fear_death": 0.1},
}

# Tones that suit each feeling (library jev.tone: steadying | reflective | comforting | challenging).
FEELING_TONES: Dict[str, Dict[str, float]] = {
    "quiet":  {"steadying": 0.15, "comforting": 0.08},
    "nerve":  {"steadying": 0.12, "reflective": 0.1},
    "replay": {"comforting": 0.15, "steadying": 0.1},
    "stick":  {"challenging": 0.15, "steadying": 0.08},
    "faith":  {"comforting": 0.12, "reflective": 0.1},
    "gita":   {"reflective": 0.1, "steadying": 0.06},
}

# This audience resonates with the Gita about three times as often as other texts
# (Mixpanel, non-India, May-Oct 2026), and these are the verses they picked most.
OBSERVED_PICKS = {"bg.6.7": 14, "bg.9.22": 11, "bg.9.29": 10, "bg.2.47": 9, "bg.2.11": 7, "bg.18.66": 6,
                  "bg.12.7": 6, "bg.2.44": 6, "bg.3.35": 5, "bg.2.14": 5, "bg.4.35": 5, "bg.5.16": 5,
                  "bg.6.30": 5, "bg.9.26": 4, "bg.2.70": 4, "bg.12.15": 4, "bg.6.20": 3, "bg.7.11": 3}

# The Gita verses most cited for this audience; a Curious reader should meet them early.
GITA_ANCHORS = {"bg.2.47", "bg.2.48", "bg.2.14", "bg.2.20", "bg.2.62", "bg.2.63", "bg.3.35", "bg.6.5", "bg.6.6", "bg.6.35",
                "bg.9.22", "bg.18.66", "bg.12.13", "bg.12.15", "bg.4.7", "bg.2.70", "bg.2.71", "bg.5.18", "bg.16.21", "bg.17.15"}

# The library's pairing rules: these must never be shown on their own.
NEVER_ALONE = {"rcm.2.165.doha.1", "yv.1.12.15", "yv.5.22.34", "yv.1.10.19", "yv.1.12.22", "yv.2.6.1", "yv.2.4.17"}
# Families whose text still needs a rights check against a public-domain print edition.
HELD_FAMILIES = {"kabir", "meera"}
# Families whose Sanskrit is kept off the cards. Empty: every verse is shown with its original
# (Bhartrihari's text is checked against GRETIL and Kosambi 1948 in the library).
HIDE_SANSKRIT_FAMILIES: set = set()
# Any Indic script: Devanagari through Sinhala (Sanskrit, Awadhi, Braj, Hindi, and room for others).
INDIC_RE = re.compile(r"[\u0900-\u0DFF]")
VISARGA_RE = re.compile(r"(?<=[\u0900-\u097F]):")


def display_sanskrit(v: dict) -> Optional[str]:
    """The verse in its own language, as the cards show it, or None if we have no clean copy."""
    t = (v.get("sanskrit_display") or "").strip()
    if not t or not INDIC_RE.search(t) or v.get("sanskrit_display_ok") is False or v.get("family") in HIDE_SANSKRIT_FAMILIES:
        return None
    t = VISARGA_RE.sub("ः", t)              # some sources key the visarga as an ASCII colon
    if v.get("family") == "mbh":
        t = re.sub(r"[`']", "", t)          # the data's interpolation marks
    return " ".join(t.split())


def apply_sanskrit_fixes(verses: List[dict], fixes_path: Path) -> int:
    """Corrected display Sanskrit (taxonomy/sanskrit_fixes.json), laid over the library after it is
    hashed, so a text fix never changes the library version or invalidates the embedding caches."""
    if not fixes_path.exists():
        return 0
    fixes = (json.loads(fixes_path.read_text(encoding="utf-8")) or {}).get("fixes") or {}
    n = 0
    for v in verses:
        t = fixes.get(v["id"])
        if t:
            v["sanskrit_display"] = t
            v["sanskrit_display_ok"] = True
            n += 1
    return n
DEVOTIONAL_FAMILIES = {"tulsi", "sur", "rcm", "vr"}

# ── Safety ────────────────────────────────────────────────────────────────────
CRISIS_PATTERNS = [
    r"\b(kill|hurt|harm|cut)\s+my\s*self\b", r"\bend\s+(it\s+all|my\s+life)\b", r"\bsuicid", r"\bself[\s-]?harm",
    r"\b(want|wish)\s+(to\s+)?(die|be\s+dead)\b", r"\bdon'?t\s+want\s+to\s+(be\s+alive|live|wake\s+up)\b",
    r"\bno\s+reason\s+to\s+live\b", r"\bbetter\s+off\s+(dead|without\s+me)\b", r"\btake\s+my\s+(own\s+)?life\b",
]
CRISIS_RE = re.compile("|".join(CRISIS_PATTERNS), re.I)
SAFETY = {
    "message": "If you're thinking about ending your life or harming yourself, please reach out now. You deserve support from a person.",
    "lines": [
        {"region": "US", "name": "988 Suicide & Crisis Lifeline", "contact": "Call or text 988"},
        {"region": "UK & Ireland", "name": "Samaritans", "contact": "Call 116 123"},
        {"region": "Canada", "name": "9-8-8 Suicide Crisis Helpline", "contact": "Call or text 988"},
        {"region": "Australia", "name": "Lifeline", "contact": "Call 13 11 14"},
        {"region": "New Zealand", "name": "1737", "contact": "Call or text 1737"},
        {"region": "India", "name": "Tele-MANAS", "contact": "Call 14416"},
    ],
}

TOK = re.compile(r"[a-z']+")
STOP = set("the a an and or of to in on for with is are was were be been it its this that i im i'm my me you your he his "
           "she her they them we our as at by from not no but so if then than into out up do does did have has had will "
           "would can could should all any what who which there their just still keep again really very about".split())


def _stem(t: str) -> str:
    for suf in ("ingly", "ing", "edly", "ed", "ies", "es", "ly", "s"):
        if t.endswith(suf) and len(t) - len(suf) >= 4:
            return t[: -len(suf)] + ("y" if suf == "ies" else "")
    return t


def _toks(s: str) -> List[str]:
    return [_stem(t.strip("'")) for t in TOK.findall(s.lower()) if t not in STOP and len(t) > 2]


# ── The recommender ───────────────────────────────────────────────────────────

class Recommender:
    def __init__(self, library_path: Path, cache_dir: Path, embed: Optional[EmbedFn] = None):
        raw = library_path.read_bytes()
        self.version = hashlib.sha1(raw).hexdigest()[:12]
        lib = json.loads(raw)
        fixed = apply_sanskrit_fixes(lib["verses"], library_path.with_name("sanskrit_fixes.json"))
        self.situations = {s["id"]: s for s in lib["situations"]}
        self.pairs = lib.get("pairs") or []
        self._embed_lock = threading.Lock()
        self.prasangs = {p["id"]: p for p in lib["prasangs"]}
        self.verses = [v for v in lib["verses"] if self._servable(v)]
        self.library_size = {
            "verses": len(lib["verses"]),
            "prasangs": len(lib["prasangs"]),
            "texts": len({v.get("family") for v in lib["verses"]}),
        }
        self.ids = [v["id"] for v in self.verses]
        # Only verses we can show in their own language are ever picked (cards, plans, stories).
        # They stay in self.verses so the ids, and the embedding caches keyed on them, don't move.
        self.has_original = np.array([display_sanskrit(v) is not None for v in self.verses], dtype=bool)
        self.cache_dir = cache_dir
        self.embed = embed
        self.sit_ids: List[str] = list(self.situations)
        self.sit_vecs: Optional[np.ndarray] = None   # (S, D): mean of each situation's phrasings
        self.verse_vecs: Optional[np.ndarray] = None  # (V, D)
        self._sit_tokens = {sid: set(_toks(" ".join([s["label"], *s.get("phrasings", [])]))) for sid, s in self.situations.items()}
        df = Counter(t for toks in self._sit_tokens.values() for t in toks)
        n = len(self._sit_tokens)
        self._idf = {t: math.log(1 + n / c) for t, c in df.items()}   # rare words say more about a situation
        self._verse_sit = [set(v.get("situations") or []) for v in self.verses]
        logger.info("Recommender: %d servable verses of %d (%d with their original, %d Sanskrit fixes), %d prasangs, %d situations (library %s)",
                    len(self.verses), len(lib["verses"]), int(self.has_original.sum()), fixed, len(self.prasangs), len(self.situations), self.version)

    # Which verses may be shown at all.
    @staticmethod
    def _servable(v: dict) -> bool:
        jev = v.get("jev") or {}
        return (
            bool(v.get("line"))
            and v.get("line_ok") is not False
            and jev.get("risk") != "misleading_alone"
            and v.get("family") not in HELD_FAMILIES
            and v["id"] not in NEVER_ALONE
        )

    # ── Embeddings (computed once, cached on disk, keyed by library hash) ────
    def _verse_doc(self, v: dict) -> str:
        sits = "; ".join(self.situations[s]["label"] for s in v.get("situations") or [] if s in self.situations)
        return " ".join(x for x in [v.get("line", ""), v.get("translation", ""), v.get("setting", ""), sits] if x)

    def ensure_embeddings(self) -> None:
        if self.embed is None:
            return
        with self._embed_lock:          # the recommender and the planner may both ask at start-up
            if self.verse_vecs is None or self.sit_vecs is None:
                self._ensure_embeddings()

    def _ensure_embeddings(self) -> None:
        cache = self.cache_dir / f"recommend_emb_{self.version}.npz"
        if cache.exists():
            z = np.load(cache, allow_pickle=False)
            if list(z["ids"]) == self.ids and list(z["sit_ids"]) == self.sit_ids:
                self.verse_vecs, self.sit_vecs = z["verses"], z["situations"]
                logger.info("Recommender: embeddings loaded from %s", cache.name)
                return
        logger.info("Recommender: embedding %d verses and %d situations (one time) …", len(self.verses), len(self.sit_ids))
        verse_vecs = self.embed([self._verse_doc(v) for v in self.verses])
        sit_vecs = []
        for sid in self.sit_ids:
            s = self.situations[sid]
            m = self.embed([s["label"], *s.get("phrasings", [])]).mean(axis=0)
            sit_vecs.append(m / (np.linalg.norm(m) + 1e-9))
        self.verse_vecs, self.sit_vecs = verse_vecs.astype(np.float32), np.stack(sit_vecs).astype(np.float32)
        np.savez(cache, ids=np.array(self.ids), sit_ids=np.array(self.sit_ids), verses=self.verse_vecs, situations=self.sit_vecs)
        logger.info("Recommender: embeddings cached to %s", cache.name)

    def ensure_embeddings_in_background(self) -> None:
        threading.Thread(target=self._safe_ensure, name="recommender-embed", daemon=True).start()

    def _safe_ensure(self) -> None:
        try:
            self.ensure_embeddings()
        except Exception:   # never take the endpoint down; keyword matching still works
            logger.exception("Recommender: embedding failed; using keyword matching")

    @property
    def semantic(self) -> bool:
        return self.embed is not None and self.verse_vecs is not None and self.sit_vecs is not None

    # ── Situations from the profile and the note (used by the plan endpoints) ─
    def profile_situations(self, feeling: str, age: Optional[str], stages: Sequence[str], phone_hours: Optional[int]) -> Dict[str, float]:
        """The light priors the onboarding answers carry, before any note."""
        w: Counter = Counter()
        for table, key in ((FEELING_SITUATIONS, feeling), (AGE_SITUATIONS, age)):
            for sid, x in (table.get(key or "") or {}).items():
                w[sid] += x
        for st in stages:
            for sid, x in (STAGE_SITUATIONS.get(st) or {}).items():
                w[sid] += x
        if phone_hours is not None and phone_hours >= 4:
            w["phone_addiction"] += 0.5 if phone_hours >= 6 else 0.3
        return {k: v for k, v in w.items() if k in self.situations}

    def match_note(self, note: str) -> Dict[str, float]:
        """Situations a note is about, by meaning when the model is ready, else by keywords."""
        qvec = None
        if self.semantic:
            qvec = self.embed([note])[0]
        return self.note_situations(note, qvec)

    # ── Situations from the note ─────────────────────────────────────────────
    def note_situations(self, note: str, qvec: Optional[np.ndarray]) -> Dict[str, float]:
        """Up to five situations the note is about, weighted 0..1.5."""
        if qvec is not None and self.sit_vecs is not None:
            sims = self.sit_vecs @ qvec
            order = np.argsort(-sims)[:5]
            top = float(sims[order[0]])
            out = {}
            for i in order:
                s = float(sims[i])
                # BGE-M3 cosine for a real match sits around 0.5-0.75; keep only near the best.
                if s >= max(0.42, top - 0.08):
                    out[self.sit_ids[i]] = 1.5 * (s - 0.35) / max(1e-6, top - 0.35)
            return out
        q = set(_toks(note))
        if not q:
            return {}
        scored = sorted(((sum(self._idf[t] for t in q & toks) / math.sqrt(len(toks) + 1), sid)
                         for sid, toks in self._sit_tokens.items()), reverse=True)
        best = scored[0][0]
        if best <= 0:
            return {}
        # Keywords are a weaker signal than meaning, so they weigh less and keep only clear winners.
        return {sid: 1.0 * sc / best for sc, sid in scored[:3] if sc > 0 and sc >= 0.6 * best}

    # ── Ranking ──────────────────────────────────────────────────────────────
    def recommend(
        self, *, feeling: str, age: Optional[str], stages: Sequence[str], phone_hours: Optional[int],
        note: Optional[str], count: int = 5, exclude: Sequence[str] = (),
    ) -> dict:
        note = (note or "").strip()
        crisis = bool(note and CRISIS_RE.search(note))

        qvec = None
        if note and self.semantic:
            try:
                qvec = self.embed([note])[0]
            except Exception:
                logger.exception("Recommender: note embedding failed; using keywords")

        # 1. Situation weights
        weights: Counter = Counter()
        sources: Dict[str, str] = {}
        from_note = self.note_situations(note, qvec) if note else {}
        for sid, w in from_note.items():
            weights[sid] += w
            sources[sid] = "note"
        for table, key in ((FEELING_SITUATIONS, feeling), (AGE_SITUATIONS, age)):
            for sid, w in (table.get(key or "") or {}).items():
                weights[sid] += w
                sources.setdefault(sid, "profile")
        for st in stages:
            for sid, w in (STAGE_SITUATIONS.get(st) or {}).items():
                weights[sid] += w
                sources.setdefault(sid, "profile")
        if phone_hours is not None and phone_hours >= 4:
            weights["phone_addiction"] += 0.5 if phone_hours >= 6 else 0.3
            sources.setdefault("phone_addiction", "profile")
        if crisis:
            weights = Counter({"anxiety_general": 0.6, "loneliness": 0.6, "grief_general": 0.4})
        weights = Counter({k: v for k, v in weights.items() if k in self.situations})

        # 2. Score every servable verse
        sem = (self.verse_vecs @ qvec) if qvec is not None else None
        tones = FEELING_TONES.get(feeling, {})
        picks_max = max(OBSERVED_PICKS.values())
        seen = set(exclude)
        scored = []
        for i, v in enumerate(self.verses):
            if v["id"] in seen or not self.has_original[i]:
                continue
            fam = v.get("family", "")
            if feeling == "gita" and fam != "bg":
                continue
            jev = v.get("jev") or {}
            tone = jev.get("tone")
            if crisis and tone not in ("comforting", "steadying"):
                continue
            vs = self._verse_sit[i]
            fit = sum(weights.get(s, 0.0) for s in vs) / (1 + 0.15 * max(0, len(vs) - 1))
            score = fit
            if sem is not None:
                score += 1.2 * max(0.0, (float(sem[i]) - 0.3) / 0.4)
            # Quotability sits in a narrow band (median 0.72), so stretch it: 0.6 → 0, 0.85 → 1.
            score += 0.6 * min(1.0, max(0.0, (float(jev.get("quotability") or 0.0) - 0.6) / 0.25))
            score += tones.get(tone, 0.0)
            score += {"core": 0.1, "reserve": 0.0, "feed": -0.1}.get(v.get("tier"), 0.0)
            if jev.get("role") == "lockscreen":
                score += 0.05
            if fam == "bg":
                score += 0.25 if feeling != "faith" else 0.1
            if feeling == "faith" and (fam in DEVOTIONAL_FAMILIES or v.get("bhakti")):
                score += 0.15
            elif feeling != "faith" and v.get("bhakti"):
                score -= 0.2          # refuge-in-God verses lead only for someone who is searching
            score += 0.15 * OBSERVED_PICKS.get(v["id"], 0) / picks_max
            if feeling == "gita" and v["id"] in GITA_ANCHORS:
                score += 0.35
            if jev.get("risk") == "needs_note" and not v.get("misuse"):
                score -= 0.15
            if fit == 0 and sem is None:
                score -= 0.5          # nothing ties it to this person
            scored.append((score, i))
        scored.sort(reverse=True)

        # 3. Diverse selection
        chosen: List[int] = []
        chosen_words: List[set] = []
        per_family: Counter = Counter()
        used_prasangs = set()
        max_family = count if feeling == "gita" else 2
        for score, i in scored:
            v = self.verses[i]
            p = v.get("prasang_id")
            if p and p in used_prasangs:
                continue
            fam = v.get("family")
            # Two per text overall, but the first three cards come from three different texts.
            if per_family[fam] >= max_family or (feeling != "gita" and len(chosen) < 3 and per_family[fam] >= 1):
                continue
            words = set(_toks(v.get("line", "")))
            if any(len(words & w) / max(1, len(words | w)) > 0.45 for w in chosen_words):
                continue          # the same teaching in other words (e.g. Gita 3.35 and 18.47)
            chosen_words.append(words)
            chosen.append(i)
            per_family[v.get("family")] += 1
            if p:
                used_prasangs.add(p)
            if len(chosen) >= count:
                break
        score_of = {i: s for s, i in scored}

        top_sits = [sid for sid, _ in weights.most_common(6)]
        return {
            "verses": [self._card(self.verses[i], score_of[i], top_sits, weights) for i in chosen],
            "situations": [{"id": sid, "label": self.situations[sid]["label"], "weight": round(float(weights[sid]), 3),
                            "source": sources.get(sid, "profile")} for sid in top_sits],
            "used_note": bool(note),
            "matching": "semantic" if qvec is not None else ("keywords" if note else "profile"),
            "safety": {"crisis": True, **SAFETY} if crisis else None,
            "library_version": self.version,
            "library": self.library_size,
        }

    def _card(self, v: dict, score: float, top_sits: List[str], weights: Counter) -> dict:
        jev = v.get("jev") or {}
        matched = sorted((s for s in v.get("situations") or [] if weights.get(s)), key=lambda s: -weights[s])
        p = self.prasangs.get(v.get("prasang_id") or "")
        why = v.get("reflection") or (p or {}).get("lesson")
        return {
            "id": v["id"],
            "ref": v.get("display_ref") or v.get("ref_label") or v["id"],
            "ref_iast": card_ref_iast(v),
            "family": v.get("family"),
            "speaker": v.get("speaker"),
            "listener": v.get("listener"),
            "setting": v.get("setting"),
            "sanskrit": display_sanskrit(v),
            "line": v.get("line"),
            "translation": v.get("translation"),
            "why": why,
            "misuse": v.get("misuse"),
            "tone": jev.get("tone"),
            "matched": [{"id": s, "label": self.situations[s]["label"]} for s in matched[:2]],
            "prasang": None if not p else {
                "id": p["id"], "title": p.get("title_en"), "summary": p.get("summary"),
                "story_hook": p.get("story_hook"), "lesson": p.get("lesson"),
            },
            "score": round(float(score), 4),
        }


# ── Module singleton ──────────────────────────────────────────────────────────

_recommender: Optional[Recommender] = None


def get_recommender() -> Recommender:
    if _recommender is None:
        raise RuntimeError("Recommender not initialised — call init_recommender() first")
    return _recommender


def init_recommender(
    library_path: str, cache_dir: str, embed: Optional[EmbedFn] = None, background: bool = True,
) -> Optional[Recommender]:
    """Load taxonomy/wisdom_library.json. Missing file → endpoint returns 503, nothing else breaks."""
    global _recommender
    path = Path(library_path)
    if not path.exists():
        logger.error("Recommender: %s not found — run scripts/sync_wisdom_library.py", path)
        return None
    _recommender = Recommender(path, Path(cache_dir), embed)
    if embed is not None:
        # With the vectors already on disk, load them now (about a second). In a background thread on a
        # serverless host (Vercel) the first requests of every cold instance ran on keyword matching, which
        # ranks the same few generic verses for everyone. Only a missing cache is embedded in the background.
        if background and (Path(cache_dir) / f"recommend_emb_{_recommender.version}.npz").exists():
            background = False
        if background:
            _recommender.ensure_embeddings_in_background()
        else:
            _recommender.ensure_embeddings()
    return _recommender

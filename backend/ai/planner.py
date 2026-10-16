"""
planner.py — step 2 of a plan: turn an Understanding into verses, beat by beat.

A week is one complete loop, so even a single free week pays off:

    see      hook, then diagnose   ("this is me", "so that's why")
    steady   a footing to stand on
    act      what to do
    story    someone lived it

How many days each phase gets is the week's shape: four digits for see, steady, act and
story that add up to 7 (week_arc). The default "2221" is D1 hook · D2 diagnose · D3-4
steady · D5-6 act · D7 story; "1231" gives one see day and three act days, "1222" two
story days. The first see day is always the hook; later see days are diagnoses.

Each week runs that loop at a deeper level (ai/mechanisms.py LEVELS):

    week 1  situation  their life as they told it: the reading's own statements, topic-led,
                       the plain verses everyone knows (Gita first)
    week 2  pattern    the root cause seen across life: the mechanism's templates lead, topic
                       counts for little, sources widen (Upanishads, Yoga Vasishtha, Ashtavakra)
    week 3  self       who they are beyond it: the self that is not the role, the result or the
                       fear, and acting from there; verses labelled for the self level lead

The app asks for one week at a time and sends every id already shown, so no verse or
story repeats across weeks. A new situation starts again at week 1.

Each beat has its own retrieval statement (from the Understanding) and its own score:

    score = meaning   1.4 × closeness of the verse to the beat's query vector
          + topic     0.8 × fit with the person's weighted situations
          + job       0.9 × how well the verse does this beat's job (verse_roles)
          + voice         tone that suits the beat; quotability; Gita / core-tier / observed-pick priors
          + chain         diagnose stays close to the hook; act stays close to the diagnosis
          + pairs         the library's pairing rules (a verse's partner rises for the next beat)

The beat's query vector is the LLM statement blended with anchors that keep it inside
the library: the situation centroid (what the verses are tagged with) and, for
diagnose/steady/act, the mechanism template (how the texts phrase that root cause). The
lower the reading's confidence, the more the anchors weigh. In weeks 2 and 3 the
level's templates lead and the reading only flavours them.

Who they are (age band, life stages) is a ranking signal of its own, not only a prior on the
reading's situations: verses and stories tagged with what their stage of life usually carries
rise a little ("life"), and ones tagged only with what their life does not hold (parenting
verses for someone with no children at home, retirement for a student) sink, unless the reading
itself named that situation. What has already helped them (journey.helped) pulls later picks
toward verses close to those, the mirror image of "Not for me".

Hard gates (never scored around): servable verses only (recommender), excluded ids,
Curious → Gita only, a crisis → comforting/steadying verses only, harm from others →
no verse that counsels forgiving, enduring or duty, and no "challenging" voice.
Levels are gated by risk too: harm from others stays at the situation level (one gentle
week, never a deeper programme built around the harm); a crisis never reaches the self
level, and someone in acute distress gets no self-level verse about the body dying.
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
from typing import Dict, List, Optional, Sequence

import numpy as np

from ai.mechanisms import LEVEL_BY_WEEK, MECHANISMS, SELF_HOOK, SELF_STEADY, SITUATION_MECHANISMS, level_story
from ai.recommender import (AGE_SITUATIONS, DEVOTIONAL_FAMILIES, GITA_ANCHORS, OBSERVED_PICKS, STAGE_SITUATIONS,
                            Recommender, _toks)
from ai.understanding import Understanding
from ai.verse_roles import LEVELS as LEVEL_IDS, ROLES, level_table, load_role_overrides, role_table

logger = logging.getLogger(__name__)

DEFAULT_SHAPE = "2221"                                       # see · steady · act · story days
PHASE = {"hook": "see", "diagnose": "see", "steady": "steady", "act": "act", "story": "story"}
QROLES = ("hook", "diagnose", "steady", "act", "story")      # beats with a retrieval statement


FEEDBACK_REASONS = ("not_my_situation", "too_heavy", "too_religious", "heard_it")
DAY1_FAMILY = "bg"     # hard rule: Day 1 of a plan is always a Bhagavad Gita verse


def parse_shape(shape: Optional[str]) -> tuple:
    """"2221" -> (2, 2, 2, 1). Four digits for see, steady, act, story; they add up to 7, see >= 1."""
    s = (shape or DEFAULT_SHAPE).strip()
    if not re.fullmatch(r"[0-7]{4}", s):
        raise ValueError(f"week shape must be four digits (see, steady, act, story), got {shape!r}")
    n = tuple(int(c) for c in s)
    if sum(n) != 7:
        raise ValueError(f"week shape {s} must add up to 7 days")
    if n[0] < 1:
        raise ValueError(f"week shape {s} needs at least one see day (the hook)")
    return n


def week_arc(shape: Optional[str] = None) -> List[str]:
    """The beat of each day: the first see day is the hook, the rest of see are diagnoses."""
    see, steady, act, story = parse_shape(shape)
    return ["hook"] + ["diagnose"] * (see - 1) + ["steady"] * steady + ["act"] * act + ["story"] * story


WEEK_ARC = week_arc()                                          # the default week, for callers that don't pass a shape
BEAT_TONES = {
    "hook":     {"comforting": 0.15, "reflective": 0.12, "steadying": 0.04, "challenging": -0.1},
    "diagnose": {"reflective": 0.12, "challenging": 0.08, "steadying": 0.08, "comforting": 0.0},
    "steady":   {"steadying": 0.15, "comforting": 0.1, "reflective": 0.05, "challenging": -0.05},
    "act":      {"steadying": 0.12, "challenging": 0.08, "reflective": 0.0, "comforting": 0.04},
}
# What each beat listens to. A hook must be about their topic (situations); a diagnosis and
# an action must be about their root cause (mechanism), and can come from any topic.
BEAT_WEIGHTS = {
    # The hook's job (a lament, a confession) counts for less than it did: the Gita has only a dozen
    # laments, and with job 0.9 + a 0.7 floor penalty the same few (6.34, 2.8, 1.29, 2.7) opened almost
    # every plan whatever the person wrote. A verse that names their situation now beats one that only
    # sounds like a lament (HOOK_RELEVANCE below).
    "hook":     {"sem": 1.6, "sit": 0.8, "mech": 0.1, "job": 0.55},
    "diagnose": {"sem": 1.4, "sit": 0.3, "mech": 0.6, "job": 1.0},
    "steady":   {"sem": 1.4, "sit": 0.35, "mech": 0.55, "job": 1.0},
    "act":      {"sem": 1.4, "sit": 0.45, "mech": 0.5, "job": 1.0},
}
# How each level shifts the score: topic (sit) and root cause (mech) multipliers, the weight of the
# verse's own fit for the level (fit), text-family priors, how many verses one text may give a week,
# how much each beat's job counts (a week-3 hook is "who am I", not a lament), and how strongly the
# level's own statements lead the person's week-1 reading (anchor).
LEVEL_CONF = {
    "situation": {"sit": 1.0, "mech": 1.0, "fit": 0.25, "max_family": 3, "fam": {}, "job": {}, "anchor": 0.0},
    "pattern":   {"sit": 0.35, "mech": 1.6, "fit": 0.6, "max_family": 2,
                  "fam": {"up": 0.1, "yv": 0.12, "gitas": 0.1, "viv": 0.06, "bh": 0.06, "bg": -0.06},
                  "job": {}, "anchor": 0.65},
    "self":      {"sit": 0.15, "mech": 0.8, "fit": 1.0, "max_family": 2,
                  "fam": {"up": 0.18, "gitas": 0.18, "yv": 0.12, "viv": 0.04, "bg": -0.04},
                  "job": {"hook": 0.5}, "anchor": 0.8},
}
DEATH_LINE = re.compile(r"\b(die|dies|dying|dead|death|slain|slay|kill|killed|perish\w*|corpse|funeral|pyre|"
                        r"leaves? the body|worn[- ]out (clothes|garments)|old clothes)\b", re.I)
HARM_BLOCK_SITUATIONS = {"forgive", "people_pleasing"}
HARM_BLOCK_THEMES = {"forgiveness", "duty", "patience", "speech", "humility", "kindness"}
# For someone being harmed, a diagnosis or an action must be about their worth, courage or truth.
HARM_NEED_THEMES = {"self_worth", "courage", "truth", "boundaries", "saying_no", "fear", "adversity"}
HARM_LINE_BLOCK = re.compile(r"\b(insult|bear (it|with)|endur|patien|forgiv|tolerat|the same (in|to)|"
                             r"unshaken|unmoved|don'?t react|stay calm|keep quiet|silent|obey|submit|"
                             r"ourselves|yourself|your own (doing|fault|making|enemy)|own enemy|we hurt|you hurt|"
                             r"fault|blame|deserve|karma|fruit of (your|our) (own )?action|abandon|flaws|stay|"
                             r"calm is|fall away|duty|serve|husband|wife|in-?law)", re.I)
HARM_STORY_BLOCK = re.compile(r"forgiv|patien|gentle|keep(ing)? the peace|endur|tolerat|adjust|obey|silent|hid(e|es|ing)\b|doubt", re.I)
# Their stage of life, per level: how much the stage's usual situations lift a verse, and how much a
# verse tagged only with situations their life doesn't hold is pushed down. Week 3 is about the self
# beyond every role, so the stage counts for little there.
LIFE_CONF = {"situation": (0.3, 0.45), "pattern": (0.18, 0.35), "self": (0.06, 0.2)}
PARENT_SITS = {"present_parent", "new_parent", "raising_kids_values", "teen_conflict"}


def life_misfit(age: Optional[str], stages: Sequence[str]) -> set:
    """Situations their life almost certainly doesn't hold, from the profile alone (empty without one)."""
    st = set(stages or ())
    out: set = set()
    if st and "raising_kids" not in st:
        out |= PARENT_SITS
    if (age or st) and "retired" not in st and age != "55p":
        out.add("retirement")
    if age in ("u25", "25_34"):
        out |= {"midlife", "empty_nest"}
    if age == "u25" and "raising_kids" not in st:
        out.add("new_parent")
    if "retired" in st and not st & {"working", "own_thing"}:
        out |= {"not_promoted", "imposter", "credit_taken", "toxic_boss", "layoff"}
    return out


# A beat is a job: a verse that can't do it pays, however close its topic.
JOB_FLOOR = {"hook": (0.4, 0.25), "diagnose": (0.35, 0.4), "steady": (0.35, 0.4), "act": (0.35, 0.4)}   # (floor, penalty)
# Day 1 comes from the Gita (DAY1_FAMILY): among Gita verses, one that is not in the top 15% by meaning
# for this person's hook statement steps back, so priors (quotability, popular picks) and the lament job
# can no longer carry an off-topic verse to Day 1.
HOOK_RELEVANCE = (0.85, 1.0)
STORY_LEAD = 0.35               # weeks 2-3: how much the level's generic story statement leads the person's own    # (quantile of meaning within the Gita pool, penalty below it)


def level_for(week: int, risk: str, level: Optional[str] = None) -> str:
    """The level a week runs at, after the risk caps."""
    lv = level or LEVEL_BY_WEEK.get(week, "self")
    if risk == "harm_from_others":
        return "situation"
    if risk == "self_harm" and lv == "self":
        return "pattern"
    return lv


def level_texts(u: Understanding, level: str) -> Dict[str, str]:
    """The statement each beat searches with at this level (keyword mode uses these as they are)."""
    m = MECHANISMS[u.mechanism]
    q = dict(u.queries)
    if not q.get("steady"):
        q["steady"] = m["steady"]
    if level == "situation":
        return {r: q[r] for r in QROLES}
    if level == "pattern":
        return {"hook": m["pattern"], "diagnose": m["diagnose"], "steady": m["steady"], "act": m["act"],
                "story": level_story("pattern", u.mechanism)}
    return {"hook": f"{SELF_HOOK} {m['self']}", "diagnose": m["self"], "steady": f"{SELF_STEADY} {m['self']}",
            "act": m["self_act"], "story": level_story("self", u.mechanism)}


def _norm(v: np.ndarray) -> np.ndarray:
    return v / (np.linalg.norm(v) + 1e-9)


class Planner:
    def __init__(self, rec: Recommender, roles_path: Optional[Path] = None):
        self.rec = rec
        self.verses = rec.verses
        self.idx = {v["id"]: i for i, v in enumerate(self.verses)}
        overrides = load_role_overrides(roles_path) if roles_path else {}
        self.roles = role_table(self.verses, overrides)
        # Root causes each verse speaks to: the LLM labels when present, else its situations' mechanisms.
        self.verse_mechs: List[Dict[str, float]] = []
        for v in self.verses:
            o = (overrides.get(v["id"]) or {}).get("mechanisms") or []
            scale = 0.6 if o else 1.0          # topic-derived causes count for less once a verse is labelled
            d: Dict[str, float] = {}
            for s in v.get("situations") or []:
                for k, m in enumerate(SITUATION_MECHANISMS.get(s, [])):
                    d[m] = max(d.get(m, 0.0), scale * (0.7 if k == 0 else 0.4))
            for k, m in enumerate(o):
                if m in MECHANISMS:
                    d[m] = max(d.get(m, 0.0), 1.0 if k == 0 else 0.8)
            self.verse_mechs.append(d)
        self.labelled = len(overrides)
        self._life_cache: Dict[tuple, np.ndarray] = {}
        self._gita_anchor = np.array([v["id"] in GITA_ANCHORS for v in self.verses], dtype=np.float32)
        self._harm_ok = np.array([bool(set(v.get("themes") or []) & HARM_NEED_THEMES) for v in self.verses])
        # Equanimity and endurance lines ("the same in praise and insult") read as "put up with it" to someone being hurt.
        self._harm_block = np.array([bool(HARM_LINE_BLOCK.search(v.get("line", ""))) for v in self.verses])
        self.role_mat = np.array([[self.roles[v["id"]][r] for r in ROLES] for v in self.verses], dtype=np.float32)
        self.levels = level_table(self.verses, overrides)
        self.level_mat = {k: np.array([self.levels[v["id"]][k] for v in self.verses], dtype=np.float32) for k in LEVEL_IDS}
        self._family = [v.get("family") for v in self.verses]
        self._gita = np.array([f == DAY1_FAMILY for f in self._family])
        self._tone = [((v.get("jev") or {}).get("tone")) for v in self.verses]
        self._gentle = np.array([t in ("comforting", "steadying") for t in self._tone])
        self._hard = np.array([t == "challenging" for t in self._tone])
        self._devotional = np.array([f in DEVOTIONAL_FAMILIES or bool(v.get("bhakti")) for f, v in zip(self._family, self.verses)])
        self._death = np.array([bool(DEATH_LINE.search(v.get("line", ""))) for v in self.verses])
        self.level_labelled = sum(1 for o in overrides.values() if "levels" in o)
        self.prasangs = list(rec.prasangs.values())
        self.prasang_ids = [p["id"] for p in self.prasangs]
        # Verses that belong to each prasang (servable only), for a story's anchor line.
        self.prasang_verses: Dict[str, List[int]] = {}
        for i, v in enumerate(self.verses):
            if v.get("prasang_id"):
                self.prasang_verses.setdefault(v["prasang_id"], []).append(i)
        self.pairs = rec_pairs(rec)
        self.mech_ids = list(MECHANISMS)
        self.mech_vecs: Optional[Dict[str, np.ndarray]] = None   # {"diagnose": (M,D), "act": (M,D)}
        self.tmpl_vecs: Optional[Dict[str, np.ndarray]] = None   # level template text -> vector
        self.prasang_vecs: Optional[np.ndarray] = None
        # Keyword fallback: idf over verse and prasang documents.
        self._v_toks = [set(_toks(rec._verse_doc(v))) for v in self.verses]
        self._p_toks = [set(_toks(self._prasang_doc(p))) for p in self.prasangs]
        df = Counter(t for s in self._v_toks + self._p_toks for t in s)
        n = len(self._v_toks) + len(self._p_toks)
        self._idf = {t: math.log(1 + n / c) for t, c in df.items()}
        logger.info("Planner: %d verses with roles (%s), %d prasangs", len(self.verses),
                    f"{len(overrides)} LLM-labelled" if overrides else "heuristic", len(self.prasangs))

    # ── Embeddings ───────────────────────────────────────────────────────────
    def _prasang_doc(self, p: dict) -> str:
        sits = "; ".join(self.rec.situations[s]["label"] for s in p.get("situations") or [] if s in self.rec.situations)
        chars = ", ".join(p.get("characters") or [])
        return " ".join(x for x in [p.get("title_en", ""), p.get("story_hook", ""), p.get("summary", ""),
                                     p.get("lesson", ""), chars, sits] if x)

    def _template_texts(self) -> List[str]:
        out = [SELF_HOOK, SELF_STEADY, level_story("self", self.mech_ids[0])]
        for m in self.mech_ids:
            mm = MECHANISMS[m]
            out += [mm["steady"], mm["pattern"], mm["self"], mm["self_act"], level_story("pattern", m)]
        return list(dict.fromkeys(out))

    def _ensure_template_vecs(self) -> None:
        rec = self.rec
        texts = self._template_texts()
        key = hashlib.sha1(json.dumps(texts).encode()).hexdigest()[:8]
        cache = rec.cache_dir / f"level_emb_{key}.npz"
        if cache.exists():
            z = np.load(cache, allow_pickle=False)
            if list(z["texts"]) == texts:
                self.tmpl_vecs = dict(zip(texts, z["vecs"]))
                return
        vecs = rec.embed(texts).astype(np.float32)
        np.savez(cache, texts=np.array(texts), vecs=vecs)
        self.tmpl_vecs = dict(zip(texts, vecs))
        logger.info("Planner: level templates embedded (%d) and cached to %s", len(texts), cache.name)

    def _tv(self, text: str) -> np.ndarray:
        if self.tmpl_vecs is not None and text in self.tmpl_vecs:
            return self.tmpl_vecs[text]
        return self.rec.embed([text])[0]

    def ensure_embeddings(self) -> None:
        rec = self.rec
        if rec.embed is None:
            return
        rec.ensure_embeddings()
        self._ensure_template_vecs()
        key = hashlib.sha1(json.dumps({m: [MECHANISMS[m]["diagnose"], MECHANISMS[m]["act"]] for m in self.mech_ids},
                                      sort_keys=True).encode()).hexdigest()[:8]
        cache = rec.cache_dir / f"plan_emb_{rec.version}_{key}.npz"
        if cache.exists():
            z = np.load(cache, allow_pickle=False)
            if list(z["prasang_ids"]) == self.prasang_ids:
                self.prasang_vecs = z["prasangs"]
                self.mech_vecs = {"diagnose": z["mech_diagnose"], "act": z["mech_act"]}
                logger.info("Planner: embeddings loaded from %s", cache.name)
                return
        logger.info("Planner: embedding %d prasangs and %d mechanisms (one time) …", len(self.prasangs), len(self.mech_ids))
        self.prasang_vecs = rec.embed([self._prasang_doc(p) for p in self.prasangs]).astype(np.float32)
        self.mech_vecs = {
            "diagnose": rec.embed([MECHANISMS[m]["diagnose"] for m in self.mech_ids]).astype(np.float32),
            "act": rec.embed([MECHANISMS[m]["act"] for m in self.mech_ids]).astype(np.float32),
        }
        np.savez(cache, prasang_ids=np.array(self.prasang_ids), prasangs=self.prasang_vecs,
                 mech_diagnose=self.mech_vecs["diagnose"], mech_act=self.mech_vecs["act"])
        logger.info("Planner: embeddings cached to %s", cache.name)

    def ensure_embeddings_in_background(self) -> None:
        def run():
            try:
                self.ensure_embeddings()
            except Exception:
                logger.exception("Planner: embedding failed; using keyword matching")
        threading.Thread(target=run, name="planner-embed", daemon=True).start()

    @property
    def semantic(self) -> bool:
        return (self.rec.semantic and self.prasang_vecs is not None and self.mech_vecs is not None
                and self.tmpl_vecs is not None)

    # ── Query vectors per beat ───────────────────────────────────────────────
    def _sit_centroid(self, u: Understanding) -> Optional[np.ndarray]:
        rec = self.rec
        if rec.sit_vecs is None:
            return None
        pos = {sid: i for i, sid in enumerate(rec.sit_ids)}
        acc = np.zeros(rec.sit_vecs.shape[1], dtype=np.float32)
        for s in u.situations[:4]:
            if s["id"] in pos:
                acc += float(s["weight"]) * rec.sit_vecs[pos[s["id"]]]
        return _norm(acc) if np.any(acc) else None

    def query_vectors(self, u: Understanding, extra: Sequence[str] = (), level: str = "situation") -> tuple[Dict[str, np.ndarray], List[np.ndarray]]:
        """Beat vectors for hook/diagnose/steady/act/story at `level`, plus the vectors of `extra` texts (week titles)."""
        own = level_texts(u, "situation")
        texts = [own[r] for r in QROLES] + list(extra)
        q = self.rec.embed(texts)
        qv = dict(zip(QROLES, q[:len(QROLES)]))
        sit = self._sit_centroid(u)
        alpha = 0.45 + 0.4 * u.confidence          # trust in the reading's own statement
        m = self.mech_ids.index(u.mechanism)
        m2 = self.mech_ids.index(u.secondary_mechanism) if u.secondary_mechanism else None
        mm = MECHANISMS[u.mechanism]

        def mech(role):
            if m2 is None:
                return self.mech_vecs[role][m]
            return _norm(0.75 * self.mech_vecs[role][m] + 0.25 * self.mech_vecs[role][m2])

        mech_anchor = {"diagnose": mech("diagnose"), "act": mech("act"), "steady": self._tv(mm["steady"])}
        base = {}
        for role in QROLES:
            v = alpha * qv[role]
            anchor = 1 - alpha
            if role in mech_anchor:
                v = v + 0.6 * anchor * mech_anchor[role] + (0.4 * anchor * sit if sit is not None else 0)
            else:
                v = v + (anchor * sit if sit is not None else 0)
            base[role] = _norm(v)
        if level == "situation":
            return base, list(q[len(QROLES):])
        # Deeper weeks: the level's own statements lead; the person's week-1 reading only flavours them.
        lt = level_texts(u, level)
        lead = LEVEL_CONF[level]["anchor"]
        out = {}
        for role in QROLES:
            if level == "pattern":
                tv = self._tv(lt[role]) if role in ("hook", "steady", "story") else mech_anchor[role]
            elif role == "hook":
                tv = _norm(0.6 * self._tv(SELF_HOOK) + 0.4 * self._tv(mm["self"]))
            elif role == "steady":
                tv = _norm(0.5 * self._tv(SELF_STEADY) + 0.5 * self._tv(mm["self"]))
            elif role == "diagnose":
                tv = self._tv(mm["self"])
            elif role == "act":
                tv = self._tv(mm["self_act"])
            else:
                tv = self._tv(lt["story"])
            # The level's story statement is the same for everyone ("someone caught again and again..."), so
            # leading with it gave every person the same week-2 story: their own story statement leads instead.
            ld = min(lead, STORY_LEAD) if role == "story" else lead
            out[role] = _norm(ld * tv + (1 - ld) * base[role])
        return out, list(q[len(QROLES):])

    # ── Scoring ──────────────────────────────────────────────────────────────
    def _keyword_sims(self, text: str, docs: List[set]) -> np.ndarray:
        q = set(_toks(text))
        s = np.array([sum(self._idf.get(t, 0) for t in q & d) / math.sqrt(len(d) + 1) for d in docs], dtype=np.float32)
        top = float(s.max()) if len(s) else 0.0
        return s / top if top > 0 else s

    def _sit_fit(self, u: Understanding) -> np.ndarray:
        w = {s["id"]: float(s["weight"]) for s in u.situations}
        top = max(w.values()) if w else 1.0
        out = np.zeros(len(self.verses), dtype=np.float32)
        for i, vs in enumerate(self.rec._verse_sit):
            if vs:
                out[i] = sum(w.get(s, 0.0) for s in vs) / top / (1 + 0.15 * max(0, len(vs) - 1))
        return out

    def _gate(self, u: Understanding, feeling: str, exclude: set) -> np.ndarray:
        ok = np.ones(len(self.verses), dtype=bool)
        crisis = u.risk == "self_harm"
        harm = u.risk == "harm_from_others"
        for i, v in enumerate(self.verses):
            jev = v.get("jev") or {}
            if v["id"] in exclude:
                ok[i] = False
            elif feeling == "gita" and v.get("family") != "bg":
                ok[i] = False
            elif crisis and jev.get("tone") not in ("comforting", "steadying"):
                ok[i] = False
            elif harm and (jev.get("tone") == "challenging" or set(v.get("situations") or []) & HARM_BLOCK_SITUATIONS
                           or set(v.get("themes") or []) & HARM_BLOCK_THEMES or self._harm_block[i]):
                ok[i] = False
        return ok

    def _life(self, u: Understanding, level: str = "situation") -> np.ndarray:
        """Their stage of life as a score shift on every verse (LIFE_CONF): the stage's usual situations
        lift, situations their life doesn't hold sink. Nothing the reading itself named is ever pushed down."""
        age, stages = getattr(u, "age", None), list(getattr(u, "stages", None) or [])
        if not age and not stages:
            return np.zeros(len(self.verses), dtype=np.float32)
        key = (age, tuple(sorted(stages)), tuple(s["id"] for s in u.situations), level)
        hit = self._life_cache.get(key)
        if hit is not None:
            return hit
        prior: Dict[str, float] = dict(AGE_SITUATIONS.get(age or "", {}))
        for st in stages:
            for sid, w in (STAGE_SITUATIONS.get(st) or {}).items():
                prior[sid] = prior.get(sid, 0.0) + w
        top = max(prior.values()) if prior else 1.0
        named = {s["id"] for s in u.situations}
        mis = life_misfit(age, stages) - named
        lift, sink = LIFE_CONF[level]
        out = np.zeros(len(self.verses), dtype=np.float32)
        for i, vs in enumerate(self.rec._verse_sit):
            if not vs:
                continue
            fit = max((prior.get(x, 0.0) for x in vs), default=0.0) / top
            off = sum(1 for x in vs if x in mis) / len(vs)
            out[i] = lift * fit - sink * (1.0 if off == 1.0 else 0.3 * off)
        if len(self._life_cache) > 256:
            self._life_cache.clear()
        self._life_cache[key] = out
        return out

    def _story_life(self, u: Understanding, p: dict) -> float:
        age, stages = getattr(u, "age", None), list(getattr(u, "stages", None) or [])
        sits = p.get("situations") or []
        if not sits or (not age and not stages):
            return 0.0
        prior: Dict[str, float] = dict(AGE_SITUATIONS.get(age or "", {}))
        for st in stages:
            for sid, w in (STAGE_SITUATIONS.get(st) or {}).items():
                prior[sid] = prior.get(sid, 0.0) + w
        top = max(prior.values()) if prior else 1.0
        mis = life_misfit(age, stages) - {s["id"] for s in u.situations}
        fit = max((prior.get(x, 0.0) for x in sits), default=0.0) / top
        off = sum(1 for x in sits if x in mis) / len(sits)
        return 0.25 * fit - (0.4 if off == 1.0 else 0.1 * off)

    def _priors(self, u: Understanding, feeling: str) -> np.ndarray:
        """Voice and quality priors shared by every beat (role-specific tone added later)."""
        out = np.zeros(len(self.verses), dtype=np.float32)
        picks_max = max(OBSERVED_PICKS.values())
        mech_themes = set(MECHANISMS[u.mechanism]["themes"])
        for i, v in enumerate(self.verses):
            jev = v.get("jev") or {}
            s = 0.4 * min(1.0, max(0.0, (float(jev.get("quotability") or 0.0) - 0.6) / 0.25))
            s += {"core": 0.08, "reserve": 0.0, "feed": -0.1}.get(v.get("tier"), 0.0)
            fam = v.get("family")
            if fam == "bg":
                s += 0.15 if feeling != "faith" else 0.05
            if feeling == "faith" and (fam in DEVOTIONAL_FAMILIES or v.get("bhakti")):
                s += 0.15
            elif feeling != "faith" and v.get("bhakti"):
                s -= 0.2
            s += 0.12 * OBSERVED_PICKS.get(v["id"], 0) / picks_max
            if feeling == "gita" and v["id"] in GITA_ANCHORS:
                s += 0.3
            if jev.get("risk") == "needs_note" and not v.get("misuse"):
                s -= 0.15
            s += 0.06 * min(2, len(mech_themes & set(v.get("themes") or [])))
            out[i] = s
        return out

    def _mech_fit(self, u: Understanding) -> np.ndarray:
        out = np.zeros(len(self.verses), dtype=np.float32)
        for i, d in enumerate(self.verse_mechs):
            out[i] = max(d.get(u.mechanism, 0.0), 0.6 * d.get(u.secondary_mechanism or "", 0.0))
        return out

    @staticmethod
    def _relative(sims: np.ndarray, ok: np.ndarray) -> np.ndarray:
        """BGE-M3 cosines bunch up (0.5-0.7), so rank closeness against this query's own spread."""
        pool = sims[ok] if ok.any() else sims
        lo, hi = np.percentile(pool, 50), np.percentile(pool, 99.5)
        return np.clip((sims - lo) / max(1e-6, hi - lo), 0, 1.1)

    def beat_scores(self, u: Understanding, feeling: str, qvecs: Optional[Dict[str, np.ndarray]], exclude: set,
                    level: str = "situation", adjust: Optional[np.ndarray] = None) -> Dict[str, np.ndarray]:
        ok = self._gate(u, feeling, exclude)
        if level == "self" and u.risk in ("distress", "self_harm"):
            ok &= ~self._death           # "the body dies, the self does not" is not for someone in acute pain
        lc = LEVEL_CONF[level]
        sit = np.minimum(self._sit_fit(u), 1.5)
        mech = self._mech_fit(u)
        pri = self._priors(u, feeling) + lc["fit"] * self.level_mat[level] + self._life(u, level)
        if lc["fam"] and feeling != "gita":
            pri = pri + np.array([lc["fam"].get(f, 0.0) for f in self._family], dtype=np.float32)
        tones = [((v.get("jev") or {}).get("tone")) for v in self.verses]
        texts = level_texts(u, level) if qvecs is None else None
        out = {}
        for k, role in enumerate(ROLES):
            w = BEAT_WEIGHTS[role]
            if qvecs is not None:
                sem = self._relative(self.rec.verse_vecs @ qvecs[role], ok)
            else:
                sem = self._keyword_sims(texts[role], self._v_toks)
            job = self.role_mat[:, k] - 0.35 * np.max(np.delete(self.role_mat, k, axis=1), axis=1)
            tone = np.array([BEAT_TONES[role].get(t, 0.0) for t in tones], dtype=np.float32)
            jm = lc["job"].get(role, 1.0)
            s = w["sem"] * sem + lc["sit"] * w["sit"] * sit + lc["mech"] * w["mech"] * mech + jm * w["job"] * job + pri + tone
            floor, pen = JOB_FLOOR[role]
            s -= jm * pen * (self.role_mat[:, k] < floor)
            if feeling == "gita" and role == "hook":
                s += self._gita_anchor * 0.5      # a Curious reader starts with the verses everyone quotes
            elif role == "hook" and level == "situation":       # semantic or keyword meaning alike
                pool = self._gita & ok
                if pool.sum() > 20:
                    q, pen = HOOK_RELEVANCE
                    s -= pen * (sem < np.quantile(sem[pool], q))
            if adjust is not None:
                s = s + adjust                    # what they told us with "Not for me" (feedback_adjust)
            if u.risk == "harm_from_others" and role in ("diagnose", "steady", "act"):
                s[~self._harm_ok] = -1e9       # only worth, courage, truth for someone being harmed
            s[~ok] = -1e9
            out[role] = s
        return out

    # ── Selection ────────────────────────────────────────────────────────────
    def _pick(self, scores: np.ndarray, taken: List[int], used_prasangs: set, families: Counter,
              feeling: str, bonus: Optional[np.ndarray] = None, k: int = 1, max_family: int = 2) -> List[int]:
        s = scores + (bonus if bonus is not None else 0)
        order = np.argsort(-s)
        picked: List[int] = []
        taken_words = [set(_toks(self.verses[i].get("line", ""))) for i in taken]
        for i in order[:400]:
            if s[i] < -1e8:
                break
            i = int(i)
            v = self.verses[i]
            if i in taken or i in picked:
                continue
            p = v.get("prasang_id")
            if p and p in used_prasangs:
                continue
            if feeling != "gita" and families[v.get("family")] >= max_family:
                continue
            words = set(_toks(v.get("line", "")))
            if any(len(words & w) / max(1, len(words | w)) > 0.45 for w in taken_words):
                continue
            if self.rec.verse_vecs is not None and taken:
                if float(np.max(self.rec.verse_vecs[taken] @ self.rec.verse_vecs[i])) > 0.92:
                    continue
            picked.append(i)
            taken_words.append(words)
            if len(picked) >= k:
                break
        return picked

    def _chain_bonus(self, anchor: Optional[int], weight: float) -> Optional[np.ndarray]:
        if anchor is None or self.rec.verse_vecs is None:
            return None
        return weight * np.clip((self.rec.verse_vecs @ self.rec.verse_vecs[anchor] - 0.4) / 0.4, 0, 1)

    def _pair_bonus(self, chosen: List[int], u: Understanding) -> np.ndarray:
        out = np.zeros(len(self.verses), dtype=np.float32)
        sits = {s["id"] for s in u.situations[:4]}
        ids = {self.verses[i]["id"] for i in chosen}
        for pair in self.pairs:
            if ids & pair["verses"] and sits & pair["use_when"]:
                for vid in pair["verses"] - ids:
                    if vid in self.idx:
                        out[self.idx[vid]] += 0.3
        return out

    def pick_story(self, u: Understanding, qvec: Optional[np.ndarray], feeling: str, avoid: set, k: int = 1,
                   text: Optional[str] = None) -> List[dict]:
        if qvec is not None and self.prasang_vecs is not None:
            sem = self._relative(self.prasang_vecs @ qvec, np.ones(len(self.prasangs), dtype=bool))
        else:
            sem = self._keyword_sims(text or u.queries["story"], self._p_toks)
        w = {s["id"]: float(s["weight"]) for s in u.situations}
        top = max(w.values()) if w else 1.0
        scored = []
        for j, p in enumerate(self.prasangs):
            if p["id"] in avoid:
                continue
            if feeling == "gita" and p.get("family") != "bg":
                continue
            if u.risk == "harm_from_others" and (set(p.get("situations") or []) & HARM_BLOCK_SITUATIONS
                                                 or HARM_STORY_BLOCK.search(f"{p.get('lesson', '')} {p.get('summary', '')}")):
                continue
            ws = sorted((w.get(s, 0.0) for s in p.get("situations") or []), reverse=True) or [0.0]
            fit = (ws[0] + 0.25 * sum(ws[1:])) / top        # many tags shouldn't outrank a closer story
            s = 1.6 * float(sem[j]) + 0.6 * min(1.2, fit)
            s += 0.3 if p.get("kind") == "story" else 0.0
            s += 0.1 if p.get("story_hook") else -0.25    # a story card needs an opening line
            s += 0.04 * float(p.get("strength") or 0)
            s += 0.1 if self.prasang_verses.get(p["id"]) else 0.0      # we can show one of its lines
            s += self._story_life(u, p)                                 # a protagonist at their stage of life
            scored.append((s, j))
        scored.sort(reverse=True)
        # Day 7 is shown as a hook line ("He came back to the hut calling her name…"), so a real
        # story with an opening line always wins over a teaching when one is eligible at all.
        hooked = [x for x in scored if self.prasangs[x[1]].get("kind") == "story" and (self.prasangs[x[1]].get("story_hook") or "").strip()]
        scored = hooked or scored
        out = []
        for s, j in scored[:k]:
            p = self.prasangs[j]
            anchor = None
            members = self.prasang_verses.get(p["id"]) or []
            if members:
                if qvec is not None and self.rec.verse_vecs is not None:
                    anchor = max(members, key=lambda i: float(self.rec.verse_vecs[i] @ qvec))
                else:
                    anchor = max(members, key=lambda i: float((self.verses[i].get("jev") or {}).get("quotability") or 0))
            out.append({"prasang": p, "score": round(float(s), 4), "anchor": anchor})
        return out

    # ── Public: hook candidates (for the LLM rerank) ─────────────────────────
    # ── "Not for me" ─────────────────────────────────────────────────────────
    def feedback_adjust(self, feedback: Sequence[dict]) -> Optional[np.ndarray]:
        """What "Not for me" taught us, as a score shift on every verse, used for every later pick:
          too_heavy         gentler: comforting and steadying lines up, challenging ones and lines about dying down
          not_my_situation  away from what they turned down: verses close to it (meaning, else words) down
          too_religious     plainer: devotional texts and bhakti lines down
          heard_it          nothing beyond never repeating it (exclude does that)"""
        fb = [f for f in feedback or [] if isinstance(f, dict) and f.get("reason") in FEEDBACK_REASONS]
        if not fb:
            return None
        adj = np.zeros(len(self.verses), dtype=np.float32)
        n = Counter(f["reason"] for f in fb)
        if n["too_heavy"]:
            w = min(1.0, 0.7 + 0.15 * n["too_heavy"])
            adj += w * (0.18 * self._gentle - 0.4 * self._hard - 0.3 * self._death)
        if n["too_religious"]:
            adj -= min(0.6, 0.3 * n["too_religious"]) * self._devotional
        for f in fb:
            if f["reason"] != "not_my_situation":
                continue
            i = self.idx.get(f.get("verse_id") or "")
            if i is None:
                continue
            if self.rec.verse_vecs is not None:
                sim = self.rec.verse_vecs @ self.rec.verse_vecs[i]
                adj -= 0.5 * np.clip((sim - 0.5) / 0.3, 0, 1)
            else:
                mine = self._v_toks[i]
                jac = np.array([len(mine & t) / max(1, len(mine | t)) for t in self._v_toks], dtype=np.float32)
                adj -= 0.5 * np.clip((jac - 0.12) / 0.25, 0, 1)
        return adj

    def helped_adjust(self, helped: Sequence[str]) -> Optional[np.ndarray]:
        """What "This helped" taught us: verses close to the ones that landed rise a little (meaning, else
        words), and so do their texts. The mirror image of "not_my_situation"; the helped verses themselves
        are already shown, so `exclude` keeps them out."""
        ids = [self.idx[h] for h in dict.fromkeys(helped or []) if h in self.idx][-12:]
        if not ids:
            return None
        adj = np.zeros(len(self.verses), dtype=np.float32)
        for i in ids:
            if self.rec.verse_vecs is not None:
                sim = self.rec.verse_vecs @ self.rec.verse_vecs[i]
                adj += np.clip((sim - 0.55) / 0.3, 0, 1)
            else:
                mine = self._v_toks[i]
                jac = np.array([len(mine & t) / max(1, len(mine | t)) for t in self._v_toks], dtype=np.float32)
                adj += np.clip((jac - 0.12) / 0.25, 0, 1)
        adj = 0.3 * adj / len(ids)
        fams = Counter(self._family[i] for i in ids)
        adj += np.array([0.05 * min(2, fams.get(f, 0)) for f in self._family], dtype=np.float32)
        return adj

    def adjust_for(self, feedback: Sequence[dict] = (), helped: Sequence[str] = ()) -> Optional[np.ndarray]:
        parts = [a for a in (self.feedback_adjust(feedback), self.helped_adjust(helped)) if a is not None]
        return None if not parts else (parts[0] if len(parts) == 1 else parts[0] + parts[1])

    def replace_first(self, u: Understanding, feeling: str, week: int, exclude: Sequence[str], rejected: str,
                      reason: str, feedback: Sequence[dict] = (), never: Sequence[str] = (),
                      level: Optional[str] = None, shape: Optional[str] = None,
                      helped: Sequence[str] = ()) -> Optional[dict]:
        """Another verse for Day 1 of `week`, for someone who said "Not for me". Same situation and the
        same job (the week's first beat), never the one they turned down, never one already shown
        (`exclude`) and never one still to come in their plan (`never`, which holds even when every
        other candidate is gone). Their feedback, this answer included, shifts the scores. Week 1's
        Day 1 stays a Gita verse (DAY1_FAMILY)."""
        lv = level_for(week, u.risk, level)
        beat = week_arc(shape)[0]
        fb = list(feedback or []) + [{"verse_id": rejected, "reason": reason}]
        adjust = self.adjust_for(fb, helped)
        hard = set(never) | {rejected}
        qv = self._week_qv(u, week, lv)
        scores = self.beat_scores(u, feeling, qv, set(exclude) | hard, lv, adjust=adjust)
        if week == 1:
            got = self.day1_pick(u, feeling, qv, set(exclude) | hard, scores[beat], level=lv, never=hard, adjust=adjust)
        else:
            got = self._pick(scores[beat], [], set(), Counter(), feeling, max_family=3)
        if not got:
            return None
        i = got[0]
        return {"verse_index": i, "beat": beat, "level": lv, "score": float(scores[beat][i])}

    def _week_qv(self, u: Understanding, w: int, lv: str):
        if not self.semantic:
            return None
        title = u.weeks[w - 1] if 0 < w <= len(u.weeks) else (u.weeks[-1] if u.weeks else "")
        qv, wv = self.query_vectors(u, [title] if title else [], lv)
        if wv:                                    # the week's own title colours it a little
            qv = {r: _norm(0.85 * qv[r] + 0.15 * _norm(wv[0])) for r in qv}
        return qv

    def hook_candidates(self, u: Understanding, feeling: str, exclude: Sequence[str] = (), k: int = 6,
                        helped: Sequence[str] = ()):
        """Top `k` Day 1 hooks, one per prasang, all from the Gita (DAY1_FAMILY).
        Returns (indices best first, query vectors, hook scores)."""
        qvecs = self.query_vectors(u)[0] if self.semantic else None
        adjust = self.helped_adjust(helped)
        scores = self.beat_scores(u, feeling, qvecs, set(exclude), adjust=adjust)
        got = self.day1_pick(u, feeling, qvecs, set(exclude), scores["hook"], k=k, adjust=adjust)
        return got, qvecs, scores["hook"]

    def day1_pick(self, u: Understanding, feeling: str, qvecs, exclude: set, hook_scores: np.ndarray,
                  k: int = 1, level: str = "situation", taken: Sequence[int] = (), never: Sequence[str] = (),
                  adjust: Optional[np.ndarray] = None) -> List[int]:
        """Day 1, hard-constrained to the Gita. The best Gita hooks within every gate; if none survive
        (all already shown), Gita hooks that were shown before, still within the safety gates."""
        s = np.where(self._gita, hook_scores, -1e9)
        got = self._pick(s, list(taken), set(), Counter(), feeling, k=k, max_family=k + 1)
        if len(got) < k:
            relaxed = self.beat_scores(u, feeling, qvecs, set(never), level, adjust=adjust)["hook"]
            s2 = np.where(self._gita, relaxed, -1e9)
            got += [i for i in self._pick(s2, list(taken) + got, set(), Counter(), feeling, k=k - len(got), max_family=k + 1)]
        if not got:
            logger.warning("day1_pick: no Gita verse passed the gates (risk=%s feeling=%s)", u.risk, feeling)
        return got

    def is_day1_ok(self, vid: Optional[str]) -> bool:
        """A verse that may be Day 1: a Gita verse, or (settings.day1_other_texts) any verse that was offered
        as the hook because no Gita verse spoke to their situation (server/plan.py _choose_hook)."""
        if not vid or vid not in self.idx:
            return False
        from common.config import settings
        return bool(self._gita[self.idx[vid]]) or bool(getattr(settings, "day1_other_texts", False))

    def hook_candidates_open(self, u: Understanding, feeling: str, exclude: Sequence[str] = (), k: int = 4,
                             helped: Sequence[str] = ()) -> List[int]:
        """The best hooks from every text except the Gita, one per prasang: the fallback when the Gita has no
        verse for their situation (a carer's guilt, a marriage gone quiet)."""
        qvecs = self.query_vectors(u)[0] if self.semantic else None
        scores = self.beat_scores(u, feeling, qvecs, set(exclude), adjust=self.helped_adjust(helped))
        return self._pick(np.where(self._gita, -1e9, scores["hook"]), [], set(), Counter(), feeling, k=k, max_family=2)

    # ── Public: an arc (hook → diagnose → steady → act → story) ──────────────
    def arc(self, u: Understanding, feeling: str, exclude: Sequence[str] = (), pin_hook: Optional[str] = None,
            hook_alternates: int = 0, qvecs=None, story_k: int = 1) -> dict:
        exclude = set(exclude)
        if qvecs is None and self.semantic:
            qvecs, _ = self.query_vectors(u)
        scores = self.beat_scores(u, feeling, qvecs, exclude - ({pin_hook} if pin_hook else set()))
        taken: List[int] = []
        used_prasangs: set = set()
        families: Counter = Counter()

        def take(i: int):
            taken.append(i)
            families[self.verses[i].get("family")] += 1
            if self.verses[i].get("prasang_id"):
                used_prasangs.add(self.verses[i]["prasang_id"])

        hook = self.idx.get(pin_hook) if self.is_day1_ok(pin_hook) else None
        if hook is None:
            got = self.day1_pick(u, feeling, qvecs, exclude, scores["hook"])
            hook = got[0] if got else None
        if hook is not None:
            take(hook)
        alternates = []
        if hook_alternates:
            alt_fam = Counter(families)
            alternates = self._pick(np.where(self._gita, scores["hook"], -1e9), taken, set(used_prasangs), alt_fam, feeling,
                                    k=hook_alternates, max_family=hook_alternates + 1)

        bonus = self._chain_bonus(hook, 0.25)
        pb = self._pair_bonus(taken, u)
        diag = self._pick(scores["diagnose"], taken, used_prasangs, families, feeling, bonus=(bonus if bonus is not None else 0) + pb)
        diag = diag[0] if diag else None
        if diag is not None:
            take(diag)
        bonus = self._chain_bonus(diag, 0.25)
        pb = self._pair_bonus(taken, u)
        steady = self._pick(scores["steady"], taken, used_prasangs, families, feeling, bonus=(bonus if bonus is not None else 0) + pb)
        steady = steady[0] if steady else None
        if steady is not None:
            take(steady)
        bonus = self._chain_bonus(diag, 0.3)
        pb = self._pair_bonus(taken, u)
        act = self._pick(scores["act"], taken, used_prasangs, families, feeling, bonus=(bonus if bonus is not None else 0) + pb)
        act = act[0] if act else None
        if act is not None:
            take(act)
        stories = self.pick_story(u, qvecs["story"] if qvecs else None, feeling, avoid=used_prasangs, k=story_k)
        return {
            "hook": hook, "diagnose": diag, "steady": steady, "act": act, "story": stories[0] if stories else None, "stories": stories,
            "alternates": alternates, "scores": scores, "qvecs": qvecs,
        }

    # ── Public: a plan, one week or several ──────────────────────────────────
    def plan(self, u: Understanding, feeling: str, days: int = 7, exclude: Sequence[str] = (),
             pin_hook: Optional[str] = None, pin_story: Optional[str] = None,
             week: Optional[int] = None, level: Optional[str] = None, shape: Optional[str] = None,
             feedback: Sequence[dict] = (), helped: Sequence[str] = ()) -> List[dict]:
        """[{day, day_in_week, week, level, phase, beat, verse_index | story}].

        `week` builds that one week (days numbered across the plan: week 2 is days 8-14) at its
        level; without it, `days` days from week 1. `exclude` holds every verse and story id already
        shown, so a later week never repeats one. Day 1 of week 1 is `pin_hook` (the verse they
        uncovered) and its first story day is `pin_story` (the preview's story). `shape` sets how
        many days go to see, steady, act and story (see week_arc)."""
        arc = week_arc(shape)
        if week is not None:
            weeks_to_build, n_days = [week], 7
        else:
            if u.risk == "harm_from_others":
                days = min(days, 7)           # safety first: one gentle week, not a programme built around the harm
            weeks_to_build, n_days = list(range(1, math.ceil(days / 7) + 1)), days
        exclude = set(exclude)
        adjust = self.adjust_for(feedback, helped)
        taken: List[int] = []
        pids = set(self.prasang_ids)
        used_prasangs: set = {x for x in exclude if x in pids}
        story_used: set = set(used_prasangs)
        out: List[dict] = []
        for w in weeks_to_build:
            lv = level_for(w, u.risk, level)
            qv = self._week_qv(u, w, lv)
            first = w == 1
            hook_pin = pin_hook if first and lv == "situation" and self.is_day1_ok(pin_hook) else None
            scores = self.beat_scores(u, feeling, qv, exclude - ({hook_pin} if hook_pin else set()), lv, adjust=adjust)
            texts = level_texts(u, lv)
            families: Counter = Counter()
            max_family = 3 if feeling == "gita" else LEVEL_CONF[lv]["max_family"]
            prev: Optional[int] = None
            for d, beat in enumerate(arc):
                day = (w - 1) * 7 + d + 1
                if week is None and day > n_days:
                    break
                item = {"day": day, "day_in_week": d + 1, "week": w, "level": lv}
                if beat == "story":
                    pinned = (next((p for p in self.prasangs if p["id"] == pin_story), None)
                              if first and pin_story and pin_story not in story_used else None)
                    if pinned is not None and pinned["id"] not in used_prasangs:
                        members = self.prasang_verses.get(pinned["id"]) or []
                        st = [{"prasang": pinned, "score": 0.0, "anchor": members[0] if members else None}]
                    else:
                        st = self.pick_story(u, qv["story"] if qv else None, feeling, avoid=used_prasangs | story_used,
                                             text=texts["story"])
                    if st:
                        story_used.add(st[0]["prasang"]["id"])
                        out.append({**item, "phase": "story", "beat": "story", "story": st[0]})
                        continue
                    beat = "act"   # no story left: one more practice
                if d == 0 and hook_pin:
                    i = self.idx[hook_pin]
                elif day == 1:
                    got = self.day1_pick(u, feeling, qv, exclude, scores[beat], level=lv, taken=taken)
                    if not got:
                        continue
                    i = got[0]
                else:
                    chain = self._chain_bonus(prev, 0.2 if beat != "hook" else 0.0)
                    pb = self._pair_bonus(taken, u)
                    got = self._pick(scores[beat], taken, used_prasangs, families, feeling,
                                     bonus=(chain if chain is not None else 0) + pb, max_family=max_family)
                    if not got:
                        continue
                    i = got[0]
                taken.append(i)
                families[self.verses[i].get("family")] += 1
                if self.verses[i].get("prasang_id"):
                    used_prasangs.add(self.verses[i]["prasang_id"])
                prev = i
                out.append({**item, "phase": PHASE[beat], "beat": beat, "verse_index": i, "score": float(scores[beat][i])})
        return out


def rec_pairs(rec: Recommender) -> List[dict]:
    """The library's pairs as sets."""
    return [{"id": p["id"], "verses": set(p.get("verses") or []), "use_when": set(p.get("use_when") or [])}
            for p in getattr(rec, "pairs", []) or []]


# ── Module singleton ──────────────────────────────────────────────────────────
_planner: Optional[Planner] = None


def get_planner() -> Planner:
    if _planner is None:
        raise RuntimeError("Planner not initialised — call init_planner() first")
    return _planner


def init_planner(rec: Optional[Recommender], roles_path: Optional[str] = None, background: bool = True) -> Optional[Planner]:
    global _planner
    if rec is None:
        return None
    _planner = Planner(rec, Path(roles_path) if roles_path else None)
    if rec.embed is not None:
        # Same rule as the recommender: cached vectors load at start-up, so no request runs on keywords.
        if background and list(rec.cache_dir.glob(f"plan_emb_{rec.version}_*.npz")) and list(rec.cache_dir.glob("level_emb_*.npz")):
            background = False
        if background:
            _planner.ensure_embeddings_in_background()
        else:
            _planner.ensure_embeddings()
    return _planner

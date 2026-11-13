"""
briefs.py: the two things the harness is given.

PersonBrief  who is reading: life stage, age band, stance, inner states (contract vocabulary), their own words,
             what they asked for, risk, consent. Built without a model (build_person_brief); a reading from
             upstream (01_signals / ai/understanding.py) may overwrite stance, states and risk, never consent.
VerseBrief   what may be said about the verse: its claim, the traditional reading, the scene, the misuse line,
             speaker and listener, and the state edge + `why` that put it on this day. Built from the enrichment
             labels (plan_engine_v3/02_enrichment/shards/*.jsonl) when the verse has one, else from the library.

Consent: with consent False the PersonBrief holds chips only. `words` is emptied here, at the door, so nothing
downstream can leak it; harness.py never calls a model for such a brief.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence

from .vocab import (AFFLICTIVE, AGE_PHRASE, CHIP_STANCE, EMOTION_STANCE, EMOTIONS, LIGHT_STATES, MAX_TRUSTED_STAGES,
                    NEED_DEFAULT_EMOTION, STAGE_PHRASE, STANCES, STATES)

# ── safety, before anything else ──────────────────────────────────────────────
CRISIS_RE = re.compile("|".join([
    r"\b(kill|hurt|harm|cut)\s+my\s*self\b", r"\bend\s+(it\s+all|my\s+life)\b", r"\bsuicid", r"\bself[\s-]?harm",
    r"\b(want|wish)\s+(to\s+)?(die|be\s+dead)\b", r"\bdon'?t\s+want\s+to\s+(be\s+alive|live|wake\s+up)\b",
    r"\bno\s+reason\s+to\s+live\b", r"\bbetter\s+off\s+(dead|without\s+me)\b", r"\btake\s+my\s+(own\s+)?life\b",
    r"\bmar\s+jaun\b", r"\bmarna\s+chah", r"\bjeena\s+nahi\b", r"\bkhudkushi\b", r"आत्महत्या", r"मर\s*जा"]), re.I)
HARM_RE = re.compile(r"\b(hits?|hitting|beats?|beating|slaps?|slapped|punch\w*|kicks?|chok\w*|threaten\w*|abus\w*|rap(e|ed)|"
                     r"locks? me|won'?t let me (leave|go out|see)|takes? my (money|phone|passport)|hurts? me|maarta|maarti|peet)\b", re.I)
HEALTH_RE = re.compile(r"\b(medic\w+|detox\w*|dose|dosage|prescri\w+|tablets?|pills?|rehab|withdrawal|chemo\w*|diagnos\w+|surgery|"
                       r"therapy|therapist|psychiatr\w+|antidepress\w+|insulin)\b", re.I)

# ── cues in their words: votes, never verdicts ────────────────────────────────
WRONGED_CUES = re.compile(
    r"\b(keeps? (saying|telling|asking)|in front of (everyone|the staff|people|them)|talks? down|dismiss\w*|belittl\w*|"
    r"treats? me|won'?t let me|not allowed|says? i should|changes? my decisions|took (the )?credit|called (it|my \w+) a (hobby|phase)|"
    r"(haven'?t|hasn'?t) said one real thing|being erased|unfair\w*|blam(es|ed|ing) me|insult\w*|humiliat\w*|taunt\w*|adjust)\b", re.I)
LIGHT_CUES = re.compile(
    r"\b(grateful|thank(ful| you)?|bless\w*|good health|healthy|turning (back )?(towards?|to) a good|going well|finally turning|"
    r"confident|inspired|excited|never felt more alive|ready to|i am going to|i can also|signed our first|got the offer|"
    r"it is good|i want to go deeper|want to keep it going|hopeful|at peace|calm)\b", re.I)
PAIN_CUES = re.compile(
    r"\b(anxious|anxiety|afraid|fear\w*|scared|worr\w+|can'?t (sleep|focus|stop)|overthink\w*|lonely|alone|abandon\w*|lost|stuck|"
    r"guilt\w*|ashamed|cry|cries|crying|tired|exhaust\w*|hopeless|erased|quiet house|let me go|failing|failed|never be|"
    r"don'?t know (what|why|how)|stress\w*|hurt\w*|angry|yelled|fight)\b", re.I)
STATE_CUES = {       # a word in their note that names a contract state outright
    "chinta": r"anxious|anxiety|worr\w+|overthink\w*|what if", "bhaya": r"afraid|fear\w*|scared|terrified",
    "chanchalya": r"can'?t focus|restless|mind (won'?t|will not) (settle|stop)|keep opening", "glani": r"guilt\w*|ashamed|my fault|what i did|i yelled",
    "viraha": r"lonely|alone|abandon\w*|miss(ing)? (him|her|them)|quiet house|house is (very )?quiet", "shoka": r"lost my|passed away|died|grief|griev\w+",
    "krodha": r"angry|furious|yell\w*|rage", "manyu": r"unfair|in front of|erased|dismiss\w*|humiliat\w*|insult\w*",
    "samshaya": r"should i|can'?t decide|don'?t know (which|whether|what to do)|confused", "nirveda": r"nothing (matters|feels|is going to change)|what (am i|i am) doing here|what today means|empty|pointless",
    "shrama": r"exhaust\w*|burn\w* out|no time|12 hour|tired", "dainya": r"not good enough|find out i'?m|others like me|never be loved|worthless|small",
    "vishada": r"can'?t go on|given up|hopeless|don'?t want to wake", "matsarya": r"jealous|envy|envious",
    "kritajnata": r"grateful|thank\w*|bless\w*", "utsaha": r"inspired|excited|alive|hopeful|hoping", "sankalpa": r"i am going to|this time|all in|ready to|determined|resolve",
    "shanti": r"at peace|calm|sitting quietly|it is good", "jijnasa": r"want to (read|understand|learn)|go deeper|curious", "shraddha": r"vrindavan|temple|pray\w*|faith|seva",
}
STATE_CUES = {k: re.compile(rf"\b({v})\b", re.I) for k, v in STATE_CUES.items()}

FILLER_RE = re.compile(r"\b(um+|uh+|hmm+|like|idk|you know|i guess|yeah|so)\b", re.I)


def clean_note(note: Optional[str], source: Optional[str] = None) -> str:
    """Their words as they meant them. A voice note can arrive as every partial transcript glued together
    ("I'mI'm thinkingI'm thinking about..."): keep the longest run that is not a prefix of a later one.
    Whitespace squeezed, capped at 600 characters."""
    s = " ".join((note or "").split())
    if not s:
        return ""
    if source == "voice" or re.search(r"[a-z'][A-Z]", s):
        # cumulative partials: every restart begins with the same opening characters. Split on that opening and
        # keep the longest piece (the last piece is often cut off mid-word and shorter).
        for k in range(12, 1, -1):
            head = s[:k]
            if head.strip() and len(s.split(head)) - 1 >= 3:
                pieces = [(head + p).strip() for p in s.split(head)[1:] if p.strip()]
                if pieces:
                    s = max(pieces, key=len)
                break
    return s[:600].strip()


def _usable_words(note: str) -> str:
    """Empty when the note is noise (fillers only, fewer than three real words)."""
    left = [w for w in re.findall(r"[A-Za-zऀ-ॿ']+", FILLER_RE.sub(" ", note)) if len(w) > 1]
    return note if len(left) >= 3 else ""


@dataclass
class PersonBrief:
    age_band: Optional[str] = None                 # u25 | 25_34 | 35_44 | 45_54 | 55p
    life_stage: List[str] = field(default_factory=list)
    stage_trusted: bool = True                     # False when they ticked nearly every stage
    emotion: Optional[str] = None                  # the feeling word they kept (vocab.EMOTIONS)
    light: bool = False                            # a light word and nothing in their words says otherwise
    stance: str = "struggle"                       # struggle | aspiration | wronged | seeking
    stance_votes: Dict[str, float] = field(default_factory=dict)
    states: List[str] = field(default_factory=list)   # contract states, strongest first
    words: str = ""                                # their own words, cleaned; "" without consent or when noise
    asked_for: str = ""                            # what they came for, one phrase ("to read the Gita", a chip label)
    chips: List[str] = field(default_factory=list)    # topic / follow chips
    people: List[str] = field(default_factory=list)   # relations they named or a chip gives (ai/people.py keys)
    gender: Optional[str] = None
    risk: str = "none"                             # none | distress | self_harm | harm_from_others
    health_context: bool = False                   # they mentioned medication or treatment: no medical direction, either way
    consent: bool = True                           # False: chips only, no model, ever
    note_quality: str = "none"                     # useful | thin | noise | none | withheld

    def facts(self) -> str:
        """Everything a writer may treat as known about them (for the checker's invented-detail test)."""
        return " ".join([self.words, self.asked_for, " ".join(self.chips), " ".join(STAGE_PHRASE.get(s, s) for s in self.life_stage)])


def build_person_brief(feeling: Optional[str] = None, emotion: Optional[str] = None, age: Optional[str] = None,
                       stages: Sequence[str] = (), topic: Optional[str] = None, follow: Optional[str] = None,
                       note: Optional[str] = None, note_source: Optional[str] = None, consent: bool = True,
                       gender: Optional[str] = None, reading: Optional[dict] = None) -> PersonBrief:
    """Chips + note -> PersonBrief, with no model. `reading`: an upstream judgement
    ({stance, states, risk, people, gender}); it wins over the votes here, except that risk can only go up."""
    emo = emotion if emotion in EMOTIONS else NEED_DEFAULT_EMOTION.get(feeling or "")
    tone = EMOTIONS[emo][0] if emo else "heavy"
    raw = clean_note(note, note_source)
    # Risk is read from their words even when consent is off (a deterministic regex on our own server is not
    # third-party AI), so the safety card can still lead. The words themselves are then dropped.
    risk = "self_harm" if CRISIS_RE.search(raw) else "harm_from_others" if HARM_RE.search(raw) else "none"
    words = _usable_words(raw) if consent else ""
    quality = "withheld" if (raw and not consent) else "none" if not raw else "noise" if not _usable_words(raw) else \
        "useful" if len(words.split()) >= 12 else "thin"
    stages = [s for s in stages if s in STAGE_PHRASE]
    chips = [c for c in (topic, follow) if c]

    votes = {k: 0.0 for k in STANCES}
    votes["struggle"] = 0.35 if tone == "heavy" else 0.1
    for k, v in EMOTION_STANCE.get(emo or "", {}).items():
        votes[k] += v
    for c in chips:
        if c in CHIP_STANCE:
            votes[CHIP_STANCE[c][0]] += CHIP_STANCE[c][1]
    if words:
        if WRONGED_CUES.search(words):
            votes["wronged"] += 0.5
        n_light, n_pain = len(LIGHT_CUES.findall(words)), len(PAIN_CUES.findall(words))
        if n_light and not n_pain:
            votes["aspiration" if votes["aspiration"] >= votes["seeking"] else "seeking"] += 0.5
            votes["struggle"] -= 0.2
        if n_pain:
            votes["struggle"] += 0.25 * min(n_pain, 3)
            if not WRONGED_CUES.search(words):
                votes["aspiration"] -= 0.15 * min(n_pain, 2)
                votes["seeking"] -= 0.25 * min(n_pain, 2)          # "a devotee who is lonely is lonely first"
    if age == "u25":
        votes["aspiration"] += 0.05
    if age == "55p":
        votes["seeking"] += 0.05
    stance = max(votes, key=votes.get)
    if risk != "none":
        stance = "wronged" if risk == "harm_from_others" else "struggle"

    states: List[str] = []
    for st, rx in STATE_CUES.items():                         # their words first
        if words and rx.search(words):
            states.append(st)
    for st in (EMOTIONS[emo][2] if emo else []):              # then the word they tapped
        if st not in states:
            states.append(st)
    if stance == "wronged" and "manyu" not in states:
        states.insert(0, "manyu")
    pain_named = any(s in AFFLICTIVE for s in states if words and STATE_CUES.get(s) and STATE_CUES[s].search(words))
    light = tone == "light" and not pain_named and risk == "none"
    if tone == "light" and pain_named:                        # hopeful, and afraid: both are true; keep both
        light = False
    if tone == "heavy" and words and LIGHT_CUES.search(words) and not PAIN_CUES.search(words):
        light = True                                          # a grateful note under a heavy chip is still a grateful note
        states = [s for s in states if s in LIGHT_STATES] or states

    people: List[str] = []
    try:                                                      # the app's own people vocabulary, when importable
        from ai.people import allowed_people
        people = allowed_people(words, stages if len(stages) <= MAX_TRUSTED_STAGES else (), chips)
    except Exception:                                         # pragma: no cover
        people = []
    asked = "to read the scriptures (they chose the 'read the Gita' tile; any text may serve them)" if emo == "curious" else "to go deeper" if emo == "peaceful" else ""   # r4: no Gita prior
    pb = PersonBrief(age_band=age if age in AGE_PHRASE else None, life_stage=list(stages), stage_trusted=len(stages) <= MAX_TRUSTED_STAGES,
                     emotion=emo, light=light, stance=stance, stance_votes={k: round(v, 2) for k, v in votes.items()},
                     states=states[:4], words=words, asked_for=asked, chips=chips, people=people,
                     gender=gender if gender in ("woman", "man") else None, risk=risk,
                     health_context=bool(words and HEALTH_RE.search(words)), consent=bool(consent), note_quality=quality)
    return apply_reading(pb, reading) if reading else pb


def apply_reading(pb: PersonBrief, reading: dict) -> PersonBrief:
    """An upstream reading (LLM or signals) overrides stance and states. Risk only rises; consent never changes;
    without consent a reading may not add words."""
    if reading.get("stance") in STANCES and pb.risk == "none":
        pb.stance = reading["stance"]
    got = [s for s in (reading.get("states") or []) if s in STATES]
    if got:
        pb.states = (got + [s for s in pb.states if s not in got])[:4]
    order = ["none", "distress", "harm_from_others", "self_harm"]
    r = reading.get("risk")
    if r in order and order.index(r) > order.index(pb.risk):
        pb.risk = r
    if pb.risk != "none":
        pb.light = False
        pb.stance = "wronged" if pb.risk == "harm_from_others" else pb.stance if pb.risk == "distress" else "struggle"
    elif pb.stance in ("aspiration", "seeking") and not any(s in AFFLICTIVE for s in pb.states):
        pb.light = True
    if reading.get("gender") in ("woman", "man"):
        pb.gender = reading["gender"]
    if isinstance(reading.get("people"), list):
        pb.people = list(dict.fromkeys([*pb.people, *reading["people"]]))
    return pb


# ── the verse ─────────────────────────────────────────────────────────────────
@dataclass
class VerseBrief:
    id: str
    ref: str = ""
    family: str = ""
    speaker: str = ""
    listener: str = ""
    sanskrit: str = ""                             # the original line (Sanskrit, Awadhi, Braj, Hindi); shown with every verse
    line: str = ""                                 # the card line
    translation: str = ""
    claim: str = ""                                # the one proposition the verse makes
    reading: str = ""                              # how the tradition reads it
    reading_source: str = ""                       # "Shankara on 2.47"; "" when the brief came from the library alone
    misuse: str = ""                               # what it does not mean
    setting: str = ""
    scene: Dict[str, Optional[str]] = field(default_factory=dict)   # before, moment, reply, after, reading, source_range
    story: str = ""                                # the prasang's summary
    lesson: str = ""
    move: str = ""
    states: Dict[str, List[str]] = field(default_factory=dict)      # depicts / heals / cultivates -> [state]
    flags: Dict[str, bool] = field(default_factory=dict)
    stance_fit: List[str] = field(default_factory=list)
    not_for: List[str] = field(default_factory=list)
    light_fit: Optional[bool] = None               # None: unknown (no label)
    day1_ok: Optional[bool] = None
    passage: str = ""
    edge: str = ""                                 # the state edge that put it on this day ("chinta -> samatva")
    why: str = ""                                  # the planner's one line for that edge
    edge_provenance: str = ""                      # text | commentary | curated | lexical (03_graph); "" when no edge
    sub_job: str = ""                              # 02_enrichment: see_name, steady_ground ...
    needs: str = ""                                # what the reader must already accept for the verse to land
    speaks_to: List[str] = field(default_factory=list)
    frame: str = ""                                # HUMAN_LONGING: whose longing it is in the original, in plain words
    frame_names: str = ""                          # regex of the names the meaning and scene must carry
    labelled: bool = False                         # True when built from an enrichment label
    confidence: str = "low"

    def source_text(self) -> str:
        """Every word a writer may draw on. The checker traces claims to this."""
        sc = " ".join(str(v) for k, v in (self.scene or {}).items() if v and k != "source_range")
        return " ".join(x for x in [self.ref, self.speaker, self.listener, self.line, self.translation, self.claim, self.reading,
                                    self.misuse, self.setting, sc, self.story, self.lesson, self.why] if x)


REBUKE_LINE_RE = re.compile(r"\b(isn'?t who you are|shake it off|stand up|you grieve for what|talking like you know|"
                            r"smallness of heart|unmanl\w*|coward\w*|fool\w*)\b", re.I)
GUILT_LINE_RE = re.compile(r"\b(wrongdoer|sinner|sinful|sins?|wrongdoing|worst of all)\b", re.I)
ENDURE_LINE_RE = re.compile(r"\b(learn to bear|bear them|endure|put up with|forgiv\w*|forbear\w*)\b", re.I)
MORTAL_LINE_RE = re.compile(r"\b(death|dies?|dying|slain|slay|killed|funeral|mourn\w*|the dead)\b", re.I)


def load_labels(shards_dir: str | Path) -> Dict[str, dict]:
    """Every verse label in 02_enrichment/shards/*.jsonl, by verse id. Bad lines are skipped."""
    out: Dict[str, dict] = {}
    for f in sorted(Path(shards_dir).glob("*.jsonl")):
        for line in f.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                r = json.loads(line)
            except ValueError:
                continue
            if isinstance(r, dict) and r.get("id") and not str(r["id"]).startswith("st."):
                out[r["id"]] = r
    return out


def build_verse_brief(v: dict, prasang: Optional[dict] = None, label: Optional[dict] = None, scene: Optional[dict] = None,
                      edge: Optional[dict] = None) -> VerseBrief:
    """Library verse (+ its prasang, label, written scene, planner edge) -> VerseBrief.
    Without a label, flags are inferred from the line's own words (conservative: only what the words say)."""
    p = prasang or {}
    text = " ".join(str(v.get(k) or "") for k in ("line", "translation"))
    vb = VerseBrief(
        id=v["id"], ref=v.get("display_ref") or v.get("ref_label") or v["id"], family=v.get("family") or "",
        speaker=v.get("speaker") or "", listener=v.get("listener") or "",
        sanskrit=v.get("sanskrit_display") or v.get("sanskrit") or "", line=v.get("line") or "",
        translation=v.get("translation") or "", misuse=v.get("misuse") or "", setting=v.get("setting") or "",
        story=p.get("summary") or "", lesson=p.get("lesson") or "", scene=dict(scene or {}))
    if label:
        c = label.get("commentary") or {}
        st = label.get("states") or {}
        issue = label.get("line_issue") or ""
        vb.claim = label.get("claim") or ""
        vb.reading, vb.reading_source, vb.confidence = c.get("reading") or "", c.get("source") or "", c.get("confidence") or "low"
        vb.move = label.get("move") or ""
        vb.states = {k: [e["state"] for e in st.get(k) or [] if isinstance(e, dict) and e.get("state")] for k in ("depicts", "heals", "cultivates")}
        vb.flags = {k: bool(x) for k, x in (label.get("flags") or {}).items()}
        vb.stance_fit, vb.not_for = list(label.get("stance_fit") or []), list(label.get("not_for") or [])
        vb.light_fit, vb.day1_ok = label.get("light_fit"), label.get("day1_ok")
        vb.passage = (label.get("unit") or {}).get("passage") or ""
        vb.sub_job, vb.needs = label.get("sub_job") or "", label.get("needs") or ""
        vb.speaks_to = list(label.get("speaks_to") or [])
        vb.labelled = True
        if issue:
            vb.misuse = (vb.misuse + " " + issue).strip()
    else:
        vb.claim = v.get("translation") or v.get("line") or ""
        vb.reading = v.get("reflection") or p.get("lesson") or ""
        sits = set(v.get("situations") or [])
        vb.flags = {"reproach": bool(REBUKE_LINE_RE.search(text)), "blames_self": bool(GUILT_LINE_RE.search(text)) or bool(sits & {"guilt", "shame"}),
                    "counsels_endurance": bool(ENDURE_LINE_RE.search(text)), "mortality": bool(MORTAL_LINE_RE.search(text)),
                    "devotional": bool(re.search(r"\b(turn to me|devoted to me|worship|bow to me|mind on me)\b", text, re.I))}
        vb.move = "rebukes" if vb.flags["reproach"] else ""
    if edge:
        vb.edge, vb.why = str(edge.get("edge") or ""), str(edge.get("why") or "")
        vb.edge_provenance = str(edge.get("provenance") or "")
    from .vocab import HUMAN_LONGING
    if vb.id in HUMAN_LONGING:
        vb.frame_names, vb.frame = HUMAN_LONGING[vb.id]
    return vb


# ── 03_graph: the edge that put the verse on this day, and its one-line why ──────
EDGE_RELS = ("depicts", "heals", "cultivates")
PROVENANCE_RANK = {"text": 3, "commentary": 2, "curated": 1, "lexical": 0}
_W = re.compile(r"[A-Za-z][A-Za-z']+")
_EDGE_STOP = set("the a an and or of to in on at for with from by as is are was were be it its this that you your his her their "
                 "not no but what when who one all any so than then there they them he she we our".split())


def _stems(text: str) -> set:
    return {w.lower()[:5] for w in _W.findall(text or "") if w.lower() not in _EDGE_STOP and len(w) > 3}


def load_graph_edges(graph_path: str | Path) -> Dict[str, List[dict]]:
    """plan_engine_v3/03_graph/wisdom_graph.json -> {verse id: [{state, rel, why, provenance, src, level, weight}]}: every
    edge from a verse to an inner state that carries a `why`. Read once at start-up (4 MB, about 0.2 s)."""
    d = json.loads(Path(graph_path).read_text(encoding="utf-8"))
    out: Dict[str, List[dict]] = {}
    for e in d.get("edges") or []:
        t = str(e.get("t") or "")
        if e.get("rel") in EDGE_RELS and t.startswith("state:") and (e.get("why") or "").strip():
            out.setdefault(e["s"], []).append({"state": t[6:], "rel": e["rel"], "why": " ".join(e["why"].split()),
                                               "provenance": e.get("provenance") or "", "src": e.get("src") or "",
                                               "level": e.get("level"), "weight": float(e.get("weight") or 0)})
    return out


def choose_edge(pb: "PersonBrief", vb: VerseBrief, edges: Sequence[dict]) -> Optional[dict]:
    """The one state edge that explains this verse for this person -> {edge, why, provenance, state, rel}, or None.

    Preference: a state the person is in (their strongest first); for a light reader a healing state the verse
    cultivates, for a heavy one an afflictive state it depicts (on a see day) or heals; the verse's own label (src
    "shard") and text provenance first. An edge whose `why` shares no content word with the verse's own source is
    skipped: concept-level edges (antidotes.json) attach one verse's image to its neighbours ("Like a lotus leaf in
    water" sits on bg.2.47), and a why the verse cannot carry would put words in its mouth."""
    if not edges:
        return None
    src = _stems(" ".join([vb.line, vb.translation, vb.claim, vb.reading, vb.misuse, vb.setting]))
    order = {s: k for k, s in enumerate(pb.states)}
    best, best_score = None, -1e9
    for e in edges:
        if e["state"] not in order:
            continue
        own = e.get("src") == "shard"
        if not own and not (_stems(e["why"]) & src):
            continue
        light_state = e["state"] in LIGHT_STATES
        score = 4.0 - order[e["state"]]
        if pb.light:
            score += 2.0 if (light_state and e["rel"] == "cultivates") else 0.5 if light_state else -3.0
        else:
            score += {"depicts": 1.5 if vb.sub_job.startswith("see") else 0.5, "heals": 1.0, "cultivates": 0.3}[e["rel"]]
        score += 1.0 if own else 0.0
        score += 0.3 * PROVENANCE_RANK.get(e.get("provenance") or "", 0) + e.get("weight", 0)
        if score > best_score:
            best, best_score = e, score
    if best is None:
        return None
    from .vocab import STATE_GLOSS
    return {"edge": f"{best['rel']} {best['state']} ({STATE_GLOSS.get(best['state'], best['state'])})", "why": best["why"],
            "provenance": best.get("provenance") or "", "state": best["state"], "rel": best["rel"]}


def attach_edge(vb: VerseBrief, pb: "PersonBrief", edges_by_verse: Optional[Dict[str, List[dict]]]) -> VerseBrief:
    """Set vb.edge / vb.why from the graph for this person (no-op without a graph or a matching edge)."""
    got = choose_edge(pb, vb, (edges_by_verse or {}).get(vb.id) or [])
    if got:
        vb.edge, vb.why, vb.edge_provenance = got["edge"], got["why"], got["provenance"]
    return vb


def fit_guard(pb: PersonBrief, vb: VerseBrief) -> List[str]:
    """Reasons this verse should NOT be dressed for this person. Non-empty -> the caller swaps the verse (or
    serves the static layer alone); the harness never writes a personal line that papers over a bad match."""
    f, why = vb.flags, []
    if pb.risk == "self_harm" and (f.get("mortality") or f.get("reproach") or f.get("blames_self") or vb.move in ("rebukes", "warns", "prescribes")):
        why.append("risk_self_harm:verse_is_" + (vb.move or "heavy"))
    if pb.risk == "harm_from_others" and (f.get("counsels_endurance") or f.get("reproach") or f.get("blames_self") or vb.move == "rebukes"):
        why.append("risk_harm:verse_rebukes_or_counsels_endurance")
    if pb.stance == "wronged" and (f.get("counsels_endurance") or f.get("blames_self") or f.get("reproach") or vb.move == "rebukes"):
        why.append("wronged:verse_asks_them_to_bend_or_blames")
    if pb.light and (vb.light_fit is False or vb.move in ("names_pain", "consoles", "warns", "rebukes") or f.get("reproach") or f.get("blames_self")):
        why.append("light:verse_treats_reader_as_struggling")
    if f.get("blames_self") and "glani" not in pb.states and pb.stance != "wronged" and not pb.light:
        why.append("verse_assumes_guilt_they_did_not_name")
    if f.get("mortality") and "shoka" not in pb.states and pb.risk in ("distress",):
        why.append("distress:mortality_verse")
    if vb.labelled and GUILT_LINE_RE.search(vb.claim + " " + vb.line) and "glani" not in pb.states:
        why.append("verse_assumes_guilt_they_did_not_name")
    if f.get("self_harm_adjacent") and pb.risk != "none":
        why.append("risk:self_harm_adjacent_verse")         # Sundara 13: serves only when risk is none
    grieving = bool(pb.words and STATE_CUES["shoka"].search(pb.words))
    for who in vb.not_for:
        if (who == "griever" and grieving) or (who == "wronged" and pb.stance == "wronged") or \
           (who == "caregiver" and "caring_parents" in pb.life_stage and pb.stage_trusted) or \
           (who == "sufferer" and (pb.risk != "none" or "vishada" in pb.states)):
            why.append(f"not_for:{who}")
    return list(dict.fromkeys(why))


def fit_notes(pb: PersonBrief, vb: VerseBrief, beat: str = "hook") -> List[str]:
    """Softer signals for the planner's log: not blocking, worth a look."""
    out = []
    if beat == "hook" and vb.day1_ok is False:
        out.append("day1_ok_false")
    if vb.stance_fit and pb.stance not in vb.stance_fit:
        out.append(f"stance_fit_excludes:{pb.stance}")
    if vb.flags.get("needs_scene"):
        out.append("needs_scene")
    return out

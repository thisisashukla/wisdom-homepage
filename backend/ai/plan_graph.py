#!/usr/bin/env python3
"""plan_graph.py (VENDORED from sanscripts/plan_engine_v3/03_graph/query.py by 06_eval/tools/vendor_plan_graph.py; edit the
source and re-vendor, never this copy). Data: backend/data/plan_v3/ (or $PLAN_V3_DATA).

query.py: read a week off wisdom_graph.json as per-day-slot candidates. Pure Python; load once, query in milliseconds.

    from query import Graph
    G = Graph()                                   # ~0.2 s load
    out = G.query(situations=["illness_family"], stance="struggle", words=["anxious"], week=1, exclude=[], k=5)

Returns {"reading": {...}, "slots": {"D1_see_name": [cand...], ... "D7_story": [...]}, "thin": [...], "gated": {...}}.
Each candidate: {"id", "score", "paths": [edge path strings], "whys": [...], "label_src", "line"}.

The graph proposes and the gates dispose; ranking INSIDE a slot against the person's note stays with embeddings
and the reranker. Nothing here picks the final verse.

CLI:  python3 query.py --sit overthinking sleep_mind --words anxious overthinking --stance struggle --week 1
"""
import argparse, collections, json, os, re, time

HERE = os.environ.get("PLAN_V3_DATA") or os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "plan_v3")
AFF = set("vishada shoka moha bhaya chinta krodha kama lobha ahankara mada matsarya dvesha sanga samshaya chanchalya pramada alasya glani dainya viraha nirveda manyu dharma_sankata shrama trishna".split())
HEAL = set("shanti abhaya shraddha dhriti kshama karuna maitri santosha prasada utsaha viveka vairagya samatva tejas kritajnata sharanagati sankalpa ananda atma_jnana seva".split())
SLOTS = ["D1_see_name", "D2_see_why", "D3_steady_ground", "D4_steady_reframe", "D5_act_today", "D6_act_hard_moment", "D7_story"]
SUBJOB = {s: s.split("_", 1)[1] for s in SLOTS[:6]}
LEVEL = {1: "situation", 2: "mind", 3: "self"}
DEPTH_OK = {1: {"situation", "mind", None}, 2: {"situation", "mind", "intellect", None}, 3: {"mind", "intellect", "self", None}}
ANT_LEVEL_OK = {1: {"situation"}, 2: {"situation", "mind"}, 3: {"mind", "self"}}
# ── static safety lists: hold even where a verse has no label yet ──
RESOLUTION = {"bg.18.66", "bg.18.73", "bg.18.54", "bg.18.65", "bg.18.62"}                      # never before Day 5
REBUKE = {"bg.2.2", "bg.2.3", "bg.2.11", "bg.4.40", "bg.16.21", "mbh.5.133.7", "mbh.5.133.14", "bg.18.28", "bg.16.4", "mbh.5.33.42", "mbh.5.33.45", "yv.2.5.20", "yv.2.5.30"}
MORTAL = {"bg.2.11", "bg.2.12", "bg.2.13", "bg.2.20", "bg.2.22", "bg.2.23", "bg.2.25", "bg.2.26", "bg.2.27", "bg.2.28", "bg.2.30", "vr.2.105.13", "vr.2.105.21",
          "vr.2.105.23", "mbh.12.28.14", "mbh.12.27.52", "mbh.3.314.116", "mbh.3.314.120", "up_chhandogya.508", "up_chhandogya.518", "rcm.4.12.chaupai.2", "mbh.12.174.16"}
FORBEAR = {"kshama", "samatva"}                                                     # never first for the wronged
ASHAMED = {"glani", "dainya", "shoka", "vishada"}
FEAR_FOR_OTHER = {"illness_family", "parents_aging", "new_parent"}
BEREAVED = {"grief_parent", "grief_general", "pet_loss"}
LIGHT_STATES = HEAL | {"jijnasa"}
# over-served verses (01_signals: bg.6.34 opened 11 of 23 real plans; bg.13.33 sits in 46% of week-3 plans; 2.62-63 is the
# reflex Day 2 for any cause). Multiplies the final score; a degree-based discount is added at load for the rest.
HUB = {"bg.6.34": 0.5, "bg.13.33": 0.55, "bg.2.62": 0.55, "bg.2.63": 0.55, "bg.6.35": 0.8, "bg.2.47": 0.85, "bg.18.66": 0.8}
# situations where the danger is real: no verse may tell them the fear is unreal
REAL_THREAT = {"illness_family", "parents_aging", "layoff", "money_stress", "toxic_boss", "new_parent"}
COLLAPSE = {"vishada", "nirveda"}
# Ankur 13 Nov: poet lines marked devotional=false may serve non-devotees as human emotion, but only where the person's own states
# match what the line depicts or heals (never as filler). Value: (states that must be present, also match toward-states). The writer
# must be told the beloved is Krishna (BELOVED_NOTE travels with the pick).
HUMAN_LONGING_ONLY = {**{v: ({"viraha"}, False) for v in ("sur.bgs.9", "sur.bgs.10", "sur.bgs.34", "sur.bgs.315", "sur.bgs.316", "meera.kk.3", "meera.kk.14",
                                                         "kabir.kk.66", "rahim.193")},
                      "sur.vp.279": ({"vishada", "mada"}, False), "sur.vp.295": ({"maitri", "ananda"}, True)}
BELOVED_NOTE = "Poet's line: the beloved addressed or longed for is Krishna. Serve it as human longing; do not hide the source, do not make it a prayer."
# Sundara 13 (Hanuman's despair) sits beside the passage where he weighs ending his life (13.33, 13.37-39, never staged). Labels mark
# self_harm_adjacent; every staged 13.x despair line is treated the same even where the flag is missing (REVIEW.md says all carry it).
SELF_HARM_ADJ_PREFIX = "vr.5.13."
# labellers' gates (shard REPORT.md files, 13 Nov): never with any risk signal
RISK_NEVER = {"bh.vairagya.100", "rcm.5.28.doha.1", "tulsi_gv.6.7"}
# Ashtavakra and Avadhuta speak from the deathless self to a seeker who is ready: their unreality, renunciation and fate lines
# serve only week 3 and only the seeking stance
ADVAITA_PREFIX = ("ashtavakra.", "avadhuta.")
SHAME_SITS = {"guilt", "shame", "self_worth"}
AGE_SPEAKS = {"u25": {"student", "child"}, "25_34": set(), "35_44": set(), "45_54": {"parent"}, "55p": {"elder"}}
STAGE_SPEAKS = {"studying": {"student"}, "working": {"doer"}, "own_thing": {"doer", "leader"}, "raising_kids": {"parent"},
                "caring_parents": {"caregiver", "child"}, "retired": {"elder"}}
STAGE_ORDER = ["caring_parents", "raising_kids", "retired", "studying", "own_thing", "working"]
WEEK_DEPTH_BONUS = {1: {"situation": 0.2}, 2: {"mind": 0.25, "intellect": 0.15}, 3: {"self": 0.3, "intellect": 0.1}}


def stage_group(stages):
    for x in STAGE_ORDER:
        if x in (stages or ()): return x
    return "none"
OWN_CHAIN = {"bg.ladder_of_fall": {"sanga", "kama", "krodha"}, "bg.three_gates": {"kama", "krodha", "lobha"}, "bg.asuric_spiral": {"mada", "lobha"},
             "bg.doubt_to_ruin": {"samshaya"}, "rcm.lakshman_gita": {"krodha", "dvesha"}, "mbh.narada_not_dwelling": {"chinta", "shoka"},
             "rcm.three_strong": {"kama", "krodha", "lobha"}, "bg.desire_anger_rajas": {"kama", "krodha"}, "mbh.yaksha_anger_greed": {"krodha", "lobha"},
             "mbh.vidura_six_miseries": {"matsarya", "trishna", "krodha"}, "mbh.greed_chain": {"lobha"}, "rcm.pride_root": {"mada", "ahankara"}}
# chains whose 'you hold on too tightly' logic must not reach someone afraid for a loved one or freshly bereaved in week 1
CLING_CHAINS = {"bh.fear_in_everything", "mbh.shampaka", "mbh.pingala", "mbh.mine_not_mine", "bg.ladder_of_fall", "maitrayani.mind_binds_frees", "ashtavakra.bondage",
                "bh.river_of_hope", "viv.attachment_misery", "mbh.craving_never_ages", "ashtavakra.craving"}
# a caregiver's hope for a loved one is not craving: these roots are never climbed to while the person is afraid for someone
CLING_STATES = {"sanga", "trishna", "kama", "lobha"}
# Day 2 for the wronged: whose smallness it is. Curated, unreviewed; ids checked at load.
WRONGED_DAY2 = {"mbh.5.39.63": "Small minds mistake honesty and modesty for weakness: the misreading is theirs.", "mbh.12.114.15": "Whoever runs others down in public puts their own faults on display.",
                "mbh.3.28.6": "Not always force, not always forgiveness: the question of how to respond is a real one.", "vr.6.21.11": "Rama: my patience was taken for weakness.",
                "mbh.5.95.48": "When wrong crushes right while others watch, the silent are wounded too.", "rcm.5.6.chaupai.1": "Vibhishan: I live here like the tongue among the teeth.",
                "vr.6.116.10": "Sita: after all these years, if you still do not know me.", "mbh.5.81.26": "Draupadi: those who should have protected me only watched.",
                "vr.2.100.51": "The tears of the falsely accused bring ruin on the leader who ignored them."}


# Ankur 13 Nov: letting-go teachings for these readers are framed and guarded, not gated
SOOTHE_MOVES = {"consoles", "gives_ground", "normalizes", "promises", "affirms"}
SOOTHE_HEALS = {"bhaya", "dainya", "viraha", "glani", "vishada", "chinta"}
ABANDON_SITS = {"breakup", "loneliness", "self_worth", "marriage_distance", "betrayal"}
BUILDER_SITS = {"side_project", "career_switch", "fear_failure", "outcome_anxiety", "imposter", "failure_project", "big_decision"}
LETGO_NOTE = ("Letting-go teaching for a reader who is {who}. Explain it through their own situation and feeling: what is released is the grip "
              "that hurts them, never their love, their hope or their work. Never say or imply 'stop caring' or 'your hope is the problem'. "
              "Read it after the guard verse, which reassures first.")


PET_NOTE = ("The person is grieving a pet. This verse or story is about losing someone close; use it as that. Bridge it to the bond they "
            "had with their animal companion (daily care, presence, routine). Never rank the loss, never say or imply 'just a pet', and never "
            "suggest the story is about an animal when it is not.")


# ── r4 (13 Nov, after the blind Opus judge): rules 1-9 of 06_eval/REPORT_r4.md ──
# 1. a verse may not name or diagnose a state the person was never read in; vices (accusations) need the vice itself
VICE = {"krodha", "kama", "lobha", "ahankara", "mada", "matsarya", "dvesha", "pramada", "alasya", "trishna"}
DIAG_MOVES = {"explains_cause", "warns", "rebukes"}
# 2. "the one who slips and does not make it to the end": never for risk, caregivers, real threat, students or fear of failing
SLIP = {"bg.6.37", "bg.6.38", "bg.6.39"}
FAIL_SITS = {"fear_failure", "failure_project", "outcome_anxiety", "not_promoted"}
DAY1_HUB = {"bg.6.37": 0.6, "yv.5.66.34": 0.8}          # Day 1 only: 4 of 30 r3 plans each opened on these
# 3. grief: no endurance and no "the comfort you want is false" in weeks 1-2; no death imagery in a story before week 3
GRIEF_EARLY_NEVER = {"viv.8.comfort_no_test"}
GRIEF_LINE_RE = re.compile(r"\b(you will see (him|her|them) again|let go of (this|your|the) grief|stop griev\w*|don'?t griev\w*|no need to grieve)\b", re.I)
DEATH_RE = re.compile(r"\b(death|die|dies|died|dying|dead|deathbed|corpse|pyre|cremat\w*|funeral|gnaw\w*|perish\w*|slain|killed|mortal\w*)\b", re.I)
# 4. stories whose turn is forgiving or re-reading the one who hurt you
RECONCILE_RE = re.compile(r"\b(forgiv\w*|reconcil\w*|grudge|quarrel can be ended|make peace|made peace|can come from concern|enmity has no place)\b", re.I)
# 5. self-harm risk: the week consoles and grounds, nothing else
SH_OK_MOVES = {"consoles", "gives_ground", "affirms", "promises", "normalizes"}
SH_HEALS = {"vishada", "nirveda", "dainya", "shoka", "bhaya", "glani"}
SH_PUSH_RE = re.compile(r"\b(success\w*|victory|enthusiasm|fulfil\w*|achiev\w*|effort\w*|win|winning|strength|work\w*|results?|duty|fail\w*|prove)\b", re.I)
# 6. caste language only if the person raised caste; a story's vice words only for a reader in that vice
CASTE_RE = re.compile(r"\b(caste|castes|varna|jati|outcaste|untouchab\w*|low[- ]born|chandala|shudra)\b", re.I)
STORY_VICE = [(re.compile(r"\b(pride|proud|arrogan\w*|ego)\b", re.I), {"ahankara", "mada"}), (re.compile(r"\b(envy|envious|jealous\w*)\b", re.I), {"matsarya"}),
              (re.compile(r"\b(greed\w*)\b", re.I), {"lobha"}), (re.compile(r"\b(anger|angry|rage|wrath)\b", re.I), {"krodha", "manyu"}),
              (re.compile(r"\b(lust\w*)\b", re.I), {"kama"})]
# 9. "you don't have to leave your life" (Janaka) only for someone weighing leaving
LEAVE_RE = re.compile(r"\b(leave your life|have to leave|run away|renounc\w*|walk(s|ed|ing)? away|to the forest|begging bowl|give up the throne|"
                      r"leav(e|ing) (your|one'?s|his|her) (life|duties|home|post|job|work))\b", re.I)
QUIT_SITS = {"quit_or_stay", "career_switch", "change_life"}
LINK_W = 0.15            # r4k: +15% for a candidate linked to the previous day, -10% for one with no link
VERDICT_STORY_RE = re.compile(r"\b(years of (hard )?(effort|work|labou?r)\b.{0,60}\b(leave|left|leaves) you|wasted (years|life|lives)|all for nothing|exactly where you started)", re.I)


class Graph:
    def __init__(self, path=None):
        t = time.time()
        d = json.load(open(path or os.path.join(HERE, "wisdom_graph.json")))
        self.meta, self.N, self.E = d["meta"], d["nodes"], d["edges"]
        self.out, self.inn = collections.defaultdict(list), collections.defaultdict(list)
        for e in self.E:
            self.out[e["s"]].append(e); self.inn[e["t"]].append(e)
        self.by_type = collections.defaultdict(list)
        for i, n in self.N.items(): self.by_type[n["type"]].append(i)
        deg = collections.Counter()
        for e in self.E:
            if e["rel"] in ("depicts", "heals", "cultivates", "states_chain", "locus_of", "answers_in") and self.N.get(e["s"], {}).get("type") == "verse": deg[e["s"]] += 1
        cut = sorted(deg.values())[int(0.98 * len(deg))] if deg else 999
        self.hub = {v: 0.85 for v, d in deg.items() if d > cut}
        try:
            for v, x in json.load(open(os.path.join(HERE, "hub_auto.json")))["discount"].items(): self.hub[v] = min(self.hub.get(v, 1.0), x)
        except Exception: pass
        self.hub.update(HUB)
        try: self.story_text = json.load(open(os.path.join(HERE, "story_text.json")))
        except Exception: self.story_text = {}
        self.caste = {i for i in self.by_type["verse"] if CASTE_RE.search(" ".join(str(self.N[i].get(k) or "") for k in ("line", "claim")))}
        self.load_ms = round((time.time() - t) * 1000)

    def trail(self, words):
        """Tap trail -> [(word, weight)] in tap order, kept word last at 1.0. Accepts 'anxious', {'id': 'anxious', 'ms': 1900} or ('anxious', 1900).
        Not-kept words under 1.5 s are dropped (anxious and overthinking are the first tiles and get passed over); 1.5-2 s count 0.3;
        longer pauses 0.4 + ms/20000 up to 0.8; no ms: 0.6, or 0.3 for the first word of a 3+ word trail. At most 3 paused words."""
        seq = []
        for x in words or ():
            if isinstance(x, str): w, ms = x, None
            elif isinstance(x, dict): w, ms = x.get("id") or x.get("word"), x.get("ms")
            else: w, ms = x[0], (x[1] if len(x) > 1 else None)
            if "word:" + str(w) in self.N: seq.append((w, ms))
        if not seq: return []
        kept, n, wt = seq[-1][0], len(seq), {}
        for i, (w, ms) in enumerate(seq[:-1]):
            if w == kept: continue
            if ms is None: x = 0.3 if (i == 0 and n >= 3) else 0.6
            elif ms < 1500: continue
            elif ms < 2000: x = 0.3
            else: x = 0.4 + min(0.4, ms / 20000)
            wt[w] = max(wt.get(w, 0), x)
        keep = dict(sorted(wt.items(), key=lambda kv: -kv[1])[:3]); order = []
        for w, _ in seq[:-1]:
            if w in keep and w not in order: order.append(w)
        return [(w, round(keep[w], 2)) for w in order] + [(kept, 1.0)]

    # ── small accessors ──
    def letgo(self, vid):
        """True if the verse teaches letting go / releasing hope or clinging (the same edge test as the caregiver gate)."""
        return any((e["rel"] == "cultivates" and e["t"] == "state:vairagya") or (e["rel"] == "heals" and e.get("via") in ("vairagya", "c:nirmama")) or
                   (e["rel"] == "heals" and e["t"][6:] in CLING_STATES and e["src"] == "shard") for e in self.out.get(vid, ()))

    def soothes(self, vid):
        n = self.v(vid)
        if n.get("type") != "verse" or self.letgo(vid): return False
        return n.get("move") in SOOTHE_MOVES or any(e["rel"] == "heals" and e["t"][6:] in SOOTHE_HEALS for e in self.out.get(vid, ()))

    def tender(self, R, age, stages):
        """Who gets letting-go teachings framed and guarded rather than plain: young people afraid of abandonment, and builders."""
        S = {k for k, w in R["states"] if w >= 0.3}; sits = set(R["situations"])
        if age in ("u25", "25_34") and (S & {"viraha", "bhaya", "dainya"} and sits & ABANDON_SITS or sits & {"breakup"} or "viraha" in S):
            return "young and afraid of being left"
        if "own_thing" in (stages or ()) or R["stance"] == "aspiration" or sits & BUILDER_SITS:
            return "building something"
        return None

    # ── r4 helpers ──
    def diag(self, vid):
        """Afflictive states a verse depicts, or diagnoses (a cause, warning or rebuke move), or prescribes against when they are vices."""
        mv = self.v(vid).get("move"); out = set()
        for e in self.out.get(vid, ()):
            if not e["t"].startswith("state:") or e["t"][6:] not in AFF: continue
            x = e["t"][6:]
            if e["rel"] == "depicts" and e.get("src") == "shard": out.add(x)
            elif e["rel"] in ("heals", "locus_of") and mv in DIAG_MOVES: out.add(x)
            elif e["rel"] == "heals" and e.get("src") == "shard" and x in VICE: out.add(x)
        return out

    def mine(self, R):
        """The states this person was read in: the reading's own states (else the top 3 from their words), the states their
        heavy words put to the test, and in weeks 2-3 the roots of those states that the reading climbs to (see_states).
        Situation-evoked states do not count: a note matched to 'comparison' is not a reading of envy."""
        base = set(R.get("read") or ()) or {k for k, _ in R["states"][:3]}
        m = base | {k for k, _ in (R["word_tests"] if "word_tests" in R else R.get("tests")) or ()}
        if "manyu" in m and R.get("stance") != "wronged": m.add("krodha")          # an angry tap on a struggle reading is anger
        if R.get("week", 1) >= 2:
            see = {k for k, _ in R.get("see_states") or ()}
            for x in list(m):
                m |= {e["t"][6:] for e in self.rel_out("state:" + x, "rooted_in") if e["t"].startswith("state:") and e["t"][6:] in see}
        return m

    def abandoned(self, R):
        top = {k for k, _ in R["states"][:4]}; sits = set(R["situations"])
        return bool(("viraha" in top and sits & ABANDON_SITS) or sits & {"breakup", "betrayal"})

    def story_says(self, sid, summary=False):
        n = self.N.get(sid, {}); t = self.story_text.get(sid) or {}
        return " ".join(str(x) for x in (n.get("title"), n.get("teaching"), t.get("title"), t.get("lesson"), t.get("summary") if summary else None) if x)

    def _touch(self, vid, rels=("depicts", "heals", "locus_of")):
        return {e["t"][6:] for e in self.out.get(vid, ()) if e["rel"] in rels and e["t"].startswith("state:")}

    def link(self, a, b):
        """r4k: the explicit reason day b follows day a, or None. (kind, detail): the text continues (thread, dialogue, chain,
        passage), the same state carried to its next role, an antidote to yesterday's state, or a story that lives it."""
        if not a or not b: return None
        na, nb = self.v(a), self.v(b)
        if nb.get("type") == "verse":
            if any(e["s"] == a for e in self.rel_in(b, "next_in_thread")) or any(e["s"] == b for e in self.rel_in(a, "next_in_thread")):
                return ("text", "the text continues")
            dl = lambda v: {e["t"] for e in self.out.get(v, ()) if e["rel"] in ("asks", "answers")}
            if dl(a) & dl(b): return ("text", "the same dialogue answers it")
            th = lambda v, r: {e["t"] for e in self.out.get(v, ()) if e["rel"] == r}
            if th(a, "states_chain") & th(b, "states_chain"): return ("text", "the same chain of cause in the text")
            if th(a, "in_thread") & th(b, "in_thread"): return ("text", "the same thread in the text")
            if na.get("prasang_id") and na.get("prasang_id") == nb.get("prasang_id"): return ("text", "the same passage")
        A = {x for x in self._touch(a) if x in AFF}
        if nb.get("type") == "story":
            si, mt = set(nb.get("states_in") or ()), set(nb.get("moves_to") or ())
            if si & A: return ("state", sorted(si & A)[0])
            ca = self._touch(a, ("cultivates",))
            if mt & ca: return ("toward", sorted(mt & ca)[0])
            return None
        B = self._touch(b)
        if A & B: return ("state", sorted(A & B)[0])
        anti = {e["s"][6:]: e["t"][6:] for x in A for e in self.rel_in("state:" + x, "antidote_to") if e["s"].startswith("state:")}
        cb = self._touch(b, ("cultivates",))
        for h, x in anti.items():
            if h in cb: return ("antidote", x + ">" + h)
        ca = self._touch(a, ("cultivates",))
        if ca & cb: return ("toward", sorted(ca & cb)[0])
        return None

    def audience(self, age, stages):
        aud = set(AGE_SPEAKS.get(age, set()))
        for x in stages or (): aud |= STAGE_SPEAKS.get(x, set())
        return aud

    def rel_in(self, node, rel): return [e for e in self.inn.get(node, ()) if e["rel"] == rel]
    def rel_out(self, node, rel): return [e for e in self.out.get(node, ()) if e["rel"] == rel]
    def v(self, vid): return self.N.get(vid, {})
    def flag(self, vid, f): return bool((self.v(vid).get("flags") or {}).get(f))

    # ── 1. the reading: stance, states, toward, never_first ──
    def read(self, situations=(), stance=None, states=(), words=(), week=1, mechanism=None, threat=False):
        situations = list(situations or ()) + (["grief_general"] if "pet_loss" in (situations or ()) and "grief_general" not in (situations or ()) else [])
        notes, S, toward, never, tests = [], collections.Counter(), collections.Counter(), set(), collections.Counter()
        trail = self.trail(words); words = [w for w, _ in trail]
        votes = collections.Counter({"struggle": 0.35})
        trail_mode = None
        if words:
            tones = [self.N["word:" + w]["tone"] for w in words]
            last = words[-1]; need = self.N["word:" + last]["need"]
            for k, x in (self.N.get("need:" + need, {}).get("stance_vote") or {}).items(): votes[k] += x
            if any(w in ("hurt", "angry") for w in words): votes["wronged"] += 0.25
            if tones[-1] == "light" and "heavy" in tones: trail_mode = "heavy_then_light"
            elif tones[-1] == "heavy" and "light" in tones: trail_mode = "light_then_heavy"
            elif all(t == "light" for t in tones): trail_mode = "light"
            else: trail_mode = "heavy"
            for i, (w, wt) in enumerate(reversed(trail)):
                tgt = tests if (trail_mode == "heavy_then_light" and self.N["word:" + w]["tone"] == "heavy") else S
                for e in self.rel_out("word:" + w, "means"): tgt[e["t"][6:]] += wt * e["weight"]
                if tgt is S:
                    for j, x in enumerate(self.N["word:" + w].get("toward", [])): toward[x] += wt * (0.8 - 0.15 * j)
            if trail_mode in ("heavy_then_light", "light"): votes["aspiration" if need == "stick" else "seeking"] += 0.5
        word_tests = collections.Counter(tests)
        sits = [s for s in situations if "sit:" + s in self.N]
        for s in situations:
            if "sit:" + s not in self.N: notes.append(f"unknown situation '{s}' ignored")
        if stance is None:
            for s in sits:
                for st_ in self.N["sit:" + s].get("stances", []): votes[st_] += 0.2 if st_ != "struggle" else 0.1
            stance = max(votes, key=votes.get); notes.append(f"stance inferred from words and situations: {dict((k, round(x, 2)) for k, x in votes.items())}")
        for i, s in enumerate(sits):
            cells = self.N["sit:" + s].get("stances", [])
            use = stance if stance in cells else ("struggle" if "struggle" in cells else (cells[0] if cells else None))
            if use != stance: notes.append(f"{s}: no '{stance}' cell, read as '{use}'")
            sw = 1.0 if i == 0 else 0.7
            for e in self.out.get("sit:" + s, ()):
                if e.get("stance") != use: continue
                x = e["t"][6:]
                if e["rel"] == "evokes":
                    if stance in ("aspiration", "seeking") and trail_mode in ("heavy_then_light", "light") and x in AFF: tests[x] += sw * e["weight"] * 0.6
                    else: S[x] += sw * e["weight"]
                elif e["rel"] == "toward": toward[x] += sw * e["weight"]
                elif e["rel"] == "never_first": never.add(x)
        for x in states:
            if "state:" + x in self.N: S[x] += 1.2
        mechs = [mechanism] if mechanism else []
        if not mechs:
            mc = collections.Counter()
            for s in sits:
                for e in self.rel_out("sit:" + s, "has_mechanism"): mc[e["t"][5:]] += e["weight"]
            if stance == "wronged": mc["dignity_denied"] += 2
            if stance == "aspiration": mc["resolve_begin"] += 2
            mechs = [m for m, _ in mc.most_common(2)]
        if stance == "wronged":
            S["manyu"] += 0.8; never |= FORBEAR; toward["tejas"] += 1
            for m in ("expectation_of_others", "ego_pride", "anger_reactivity"):
                if m in mechs: mechs.remove(m); notes.append(f"mechanism {m} dropped for the wronged stance")
            if "dignity_denied" not in mechs: mechs.insert(0, "dignity_denied")
        if not S and stance in ("aspiration", "seeking"):
            S.update({"sankalpa": 1.0, "utsaha": 0.8} if stance == "aspiration" else {"jijnasa": 1.0})
        if not S: S.update({"chinta": 0.6, "moha": 0.5}); notes.append("no states resolved; fell back to chinta, moha (lowest confidence)")
        light = stance in ("aspiration", "seeking") and not any(x in AFF for x in S)
        if not toward:
            for x in list(S)[:3]:
                for e in self.rel_in("state:" + x, "antidote_to"):
                    if e["s"].startswith("state:"): toward[e["s"][6:]] += e["weight"]
        # weeks climb: week 2 looks one step back (the pattern in the mind), week 3 at the self
        see = collections.Counter(S)
        if week >= 2 and not light:
            care = bool(set(sits) & (FEAR_FOR_OTHER | BEREAVED)) or threat or "shoka" in {k for k, _ in S.most_common(3)}
            for x, w in list(S.most_common(3)):
                for e in self.rel_out("state:" + x, "rooted_in"):
                    if not e["t"].startswith("state:"): continue
                    if care and e["t"][6:] in CLING_STATES: notes.append(f"week {week}: root {e['t'][6:]} of {x} skipped (afraid for or grieving someone)"); continue
                    see[e["t"][6:]] += 0.8 * w
        if week == 3 and not light and see:                 # week 3 opens on the question beneath the pattern: who is the one this happens to
            see["jijnasa"] += 0.6 * max(see.values())
        top = lambda c, n=6: [(k, round(x, 2)) for k, x in c.most_common(n)]
        return {"read": [x for x in states if "state:" + x in self.N], "stance": stance, "week": week, "level": LEVEL[week], "light": light, "trail_mode": trail_mode, "trail": trail, "situations": sits, "mechanisms": mechs,
                "states": top(S), "see_states": top(see), "tests": top(tests), "word_tests": top(word_tests), "toward": top(toward), "never_first": sorted(never), "notes": notes}

    # ── 2. hard gates ──
    def gate(self, vid, slot, R, risk="none", allow_devotional=True):
        """Return a reason string if the verse may not sit in this slot for this reading, else None."""
        n = self.v(vid); day = int(slot[1]); S = {k for k, _ in R["states"]}; TOP = {k for k, _ in R["states"][:3]}; stance, week = R["stance"], R["week"]; sits = set(R["situations"])
        mv, fl = n.get("move"), n.get("flags") or {}
        if n.get("type") != "verse": return "not a verse"
        if vid in RISK_NEVER and risk != "none": return "never with any risk signal (labeller gate)"
        if vid.startswith(ADVAITA_PREFIX) and (fl.get("invalidates_fear") or fl.get("renunciation_push") or fl.get("fatalism_risk")) and not (week == 3 and stance == "seeking"):
            return "Ashtavakra or Avadhuta unreality, renunciation or fate line outside week 3 seeking"
        if (fl.get("self_harm_adjacent") or (vid.startswith(SELF_HARM_ADJ_PREFIX) and mv in ("names_pain", "normalizes"))) and risk != "none": return "self_harm_adjacent with risk"
        if vid in HUMAN_LONGING_ONLY:
            need, use_t = HUMAN_LONGING_ONLY[vid]; have = {x for x, w in R["states"] if w >= 0.5} | {x for x, w in R["tests"] if w >= 0.3}
            if use_t: have |= {x for x, w in R["toward"] if w >= 0.5}
            if not need & have: return "poet's longing line only where the person's state matches"
        if vid in RESOLUTION and (day < 5 or week == 1 and day < 6 and stance != "seeking"): return "resolution verse before Day 5"
        if vid in RESOLUTION and week == 1 and stance == "wronged": return "surrender verse for a wronged person in week 1"
        # ── r4 ──
        if day <= 6:
            dg = self.diag(vid); mine = self.mine(R)
            if dg & VICE - mine: return "r4: diagnoses a vice the person never showed (" + ",".join(sorted(dg & VICE - mine)) + ")"
            if dg and not dg & mine: return "r4: depicts or diagnoses a state the person is not in (" + ",".join(sorted(dg)) + ")"
            if stance == "aspiration" and mv in DIAG_MOVES and not dg & (set((R.get("read") or [])[:2]) | {k for k, _ in R.get("word_tests") or ()}):
                return "r4: a cause or warning for a hopeful reader that is not about their own first states"
        if mv in ("warns", "rebukes") and day <= 2: return "r4: warning or rebuke on Days 1 to 2"
        if (day <= 2 or risk == "self_harm") and day <= 6:
            ln = " ".join(str(n.get(k) or "") for k in ("line", "claim")); mine_l = self.mine(R)
            for rx, vs in STORY_VICE + [(re.compile(r"\b(crav\w*|desire)\b", re.I), {"kama", "trishna", "lobha", "sanga"})]:
                if rx.search(ln) and not vs & mine_l: return "r4: the line names a vice the person never showed"
        if vid in SLIP and (risk != "none" or R.get("caregiver") or sits & (FEAR_FOR_OTHER | REAL_THREAT | FAIL_SITS) or R.get("threat") or "student" in (R.get("audience") or ())):
            return "r4: 'slips and does not make it to the end' for risk, care, threat, a student or fear of failing"
        griever = bool(sits & BEREAVED or "shoka" in TOP or "shoka" in (R.get("read") or [])[:2])
        if griever and (week <= 2 and fl.get("counsels_endurance") or vid in GRIEF_EARLY_NEVER): return "r4: endurance in weeks 1 to 2, or 'comfort is no test', to a griever"
        if griever and week <= 2 and self.letgo(vid): return "r4: letting-go teaching to a griever in weeks 1 to 2"
        if griever and GRIEF_LINE_RE.search(" ".join(str(n.get(k) or "") for k in ("line", "claim"))): return "r4: a reunion promise or 'let go of grief' line to a griever"
        if risk != "none" and self.letgo(vid): return "r4: letting-go teaching at any risk"
        if week == 1 and self.letgo(vid) and self.abandoned(R): return "r4: letting-go teaching in week 1 for someone afraid of being left"
        if risk == "self_harm" and day <= 6 and (mv not in (SH_OK_MOVES if day >= 3 else SH_OK_MOVES - {"affirms", "promises"}) or
                                                not any(e["rel"] == "heals" and e["t"][6:] in (SH_HEALS & self.mine(R) or SH_HEALS) for e in self.out.get(vid, ()))):
            return "r4: self-harm risk, only verses that console or ground a heavy state"
        if risk == "self_harm" and (SH_PUSH_RE.search(n.get("line") or "") or DEATH_RE.search(n.get("line") or "") or vid.startswith(SELF_HARM_ADJ_PREFIX)):
            return "r4: self-harm risk, no achievement, effort or death words and nothing from Sundara 13"
        if vid in self.caste and not R.get("caste_ok"): return "r4: caste language the person never raised"
        heals_aff = {e["t"][6:] for e in self.out.get(vid, ()) if e["rel"] == "heals" and e.get("src") == "shard" and e["t"][6:] in AFF}
        depicts_ = {e["t"][6:] for e in self.out.get(vid, ()) if e["rel"] == "depicts" and e["t"].startswith("state:")}
        # the one who did the harm is not the one harmed: someone who shouted or feels guilty gets no 'you were wronged' verse
        if stance != "wronged" and sits & {"guilt", "anger_outburst"} and "glani" in self.mine(R) | {k for k, _ in R["states"][:4]} and \
                ("wronged" in (n.get("speaks_to") or []) or "manyu" in depicts_ or (heals_aff and heals_aff <= {"manyu", "krodha"} and mv == "reframes")):
            return "r4: a verse for the one who was wronged, given to the one who did it"
        if day == 1 and sits & BEREAVED and "shoka" in self.mine(R) and not depicts_ & {"shoka", "vishada"}: return "r4: Day 1 for a bereaved person must depict grief"
        if griever and week <= 2 and (mv in ("warns", "rebukes") or (mv == "prescribes" and day <= 4) or (mv == "prescribes" and heals_aff & {"shoka"} and day <= 6)):
            return "r4: instruction or warning to a griever in weeks 1 to 2"
        if R["light"] and day <= 6 and not n.get("light_fit") and heals_aff and not heals_aff & self.mine(R):
            return "r4: a remedy for a trouble the hopeful reader does not have"
        reb = mv == "rebukes" or fl.get("reproach") or vid in REBUKE
        ashamed = bool(TOP & ASHAMED) or any(x in ASHAMED and w >= 0.5 for x, w in R["states"]) or bool(sits & (SHAME_SITS | BEREAVED))
        if reb and (day <= 2 or ashamed or stance == "wronged" or R["light"]): return "rebuke or reproach (Day 1-2, ashamed or grieving, wronged, or light stance)"
        if fl.get("blames_self") and (day == 1 or ashamed or stance == "wronged"): return "blames_self on Day 1 or for an ashamed or wronged person"
        mort = fl.get("mortality") or vid in MORTAL
        if mort and (sits & FEAR_FOR_OTHER or risk != "none" or R.get("caregiver")): return "mortality line for a caregiver or someone afraid for a loved one, or at risk"
        if mort and week == 1 and not (sits & {"fear_death"} and day >= 3): return "mortality line in week 1"
        if mort and (sits & BEREAVED or "shoka" in TOP) and day <= 4: return "mortality line on Days 1 to 4 for a fresh loss (Gita 2.20-30 rule)"
        if (sits & BEREAVED or "shoka" in TOP) and week == 1 and day <= 4 and mv in ("prescribes", "warns", "rebukes"): return "instruction or warning to a fresh griever on Days 1 to 4"
        if fl.get("invalidates_fear") and (R.get("threat") or sits & REAL_THREAT or risk != "none" or R.get("caregiver")): return "invalidates_fear for someone facing a real threat"
        if fl.get("invalidates_fear") and "bhaya" in S and day <= 4: return "invalidates fear early"
        if fl.get("violence") and week == 1: return "violence flag in week 1"
        if fl.get("gender_sensitive"): return "gender_sensitive"
        if fl.get("renunciation_push") and (stance == "aspiration" or sits & FEAR_FOR_OTHER or sits & {"new_parent", "present_parent", "burnout"} or week == 1): return "renunciation push"
        if fl.get("fatalism_risk") and stance in ("wronged", "aspiration"): return "fatalism risk for wronged or aspiration"
        if fl.get("devotional") and not allow_devotional: return "devotional (not allowed for this reader)"
        if fl.get("needs_scene") and day != 1 and not n.get("standalone", True) and not self.rel_out(vid, "answers"): return "needs its scene"
        if n.get("standalone") is False and not self.rel_out(vid, "answers") and not self.rel_out(vid, "asks") and not self.rel_out(vid, "in_thread"): return "not standalone and no scene to carry it"
        if stance == "wronged":
            if fl.get("counsels_endurance") and (week == 1 and day <= 4): return "counsels endurance to a wronged person before Day 5"
            if week == 1 and day <= 4:
                tg = {e["t"][6:] for e in self.out.get(vid, ()) if e["rel"] == "cultivates" and e["src"] == "shard" and e["t"].startswith("state:")}
                if tg and tg <= FORBEAR | {"vairagya", "santosha"}: return "forbearance first for a wronged person"
            if fl.get("counsels_endurance") and "harm" in risk: return "endurance where there is harm"
        if "wronged" in (n.get("not_for") or []) and stance == "wronged": return "label: not for wronged"
        if "griever" in (n.get("not_for") or []) and (sits & BEREAVED or "shoka" in {k for k, _ in R["states"][:2]}): return "label: not for a griever"
        if "caregiver" in (n.get("not_for") or []) and sits & FEAR_FOR_OTHER: return "label: not for a caregiver"
        sf = n.get("stance_fit")
        if sf and stance not in sf and not (R["light"] and n.get("light_fit")):
            # a wronged person still needs practices for footing; labels rarely list 'wronged', so accept struggle/aspiration verses that carry no
            # endurance, self-blame or fatalism and do not cultivate forbearance, from Day 3 on
            ok_w = stance == "wronged" and day >= 3 and set(sf) & {"struggle", "aspiration"} and not (fl.get("counsels_endurance") or fl.get("blames_self") or fl.get("fatalism_risk")) \
                and not ({e["t"][6:] for e in self.out.get(vid, ()) if e["rel"] == "cultivates"} & FORBEAR)
            ok_a = stance == "aspiration" and day == 2 and "struggle" in sf and mv in ("warns", "explains_cause", "normalizes") and not (fl.get("blames_self") or fl.get("reproach"))
            if not (ok_w or ok_a): return f"label: stance_fit {sf}"
        if R["light"]:
            if mv in ("names_pain", "consoles", "normalizes") and day != 7: return "pathologises a light stance"
            if day == 1 and {e["t"][6:] for e in self.out.get(vid, ()) if e["rel"] == "depicts"} & (COLLAPSE | {"shoka", "glani"}): return "Day 1 for a light stance depicts collapse, grief or shame"
            if day >= 3 and n.get("label_src") == "shard" and not n.get("light_fit") and mv not in ("affirms", "prescribes", "gives_ground"): return "light stance: not light_fit"
            if day == 1 and n.get("label_src") == "shard" and not n.get("light_fit"): return "Day 1 for a light stance needs light_fit"
            if mv == "warns" and day != 2: return "warning outside the 'what tests it' day for a light stance"
        if day == 1 and risk != "self_harm":
            if mv in ("prescribes", "warns", "promises", "rebukes", "explains_cause", "reveals_self") and not ((R["light"] or stance == "aspiration") and mv == "promises" and n.get("light_fit")): return f"Day 1 cannot be '{mv}' (verdict or prescription)"
            if n.get("label_src") == "shard" and not n.get("day1_ok") and not ((R["light"] or stance == "aspiration") and n.get("light_fit")): return "label: day1_ok false"
            if n.get("label_src") == "silver" and (n.get("beats") or {}).get("hook", 0) < 0.6: return "silver label: weak hook"
        if day in (5, 6) and risk != "self_harm":
            act = (n.get("beats") or {}).get("act", 0)
            if n.get("label_src") == "shard" and (act < 0.5 or (mv != "prescribes" and n.get("sub_job") not in ("act_today", "act_hard_moment"))): return "act day needs a doable practice"
            if n.get("label_src") != "shard" and act < 0.6: return "act day needs a doable practice (silver label)"
        d = n.get("depth")
        if d not in DEPTH_OK[week] and not (stance == "seeking" and week == 1 and d == "intellect") and not (day in (5, 6) and d == "situation") and not (day == 1 and R["light"]): return f"depth '{d}' outside week {week}"
        if (sits & FEAR_FOR_OTHER or R.get("threat")) and day <= 6:
            lg = any((e["rel"] == "cultivates" and e["t"] == "state:vairagya") or (e["rel"] == "heals" and e.get("via") in ("vairagya", "c:nirmama")) or
                     (e["rel"] == "heals" and e["t"][6:] in CLING_STATES and e["src"] == "shard") for e in self.out.get(vid, ()))
            if lg: return "letting-go teaching for someone afraid for a loved one or facing a real threat"
        return None

    # ── 3. candidates per slot ──
    def query(self, situations=(), stance=None, states=(), words=(), week=1, exclude=(), mechanism=None, risk="none", allow_devotional=None, k=6, exclude_prasangs=(),
              age=None, stages=(), threat=False, flags=()):
        t0 = time.time()
        R = self.read(situations, stance, states, words, week, mechanism, threat)
        R["threat"] = bool(threat); R["caregiver"] = "caring_parents" in (stages or ()) and bool(set(R["situations"]) & (FEAR_FOR_OTHER | {"burnout"}))
        aud = self.audience(age, stages)
        R["audience"] = sorted(aud); R["stages"] = list(stages or ())
        for f_ in flags or (): R[f_] = True                     # r4: note flags from the backend (caste_ok, health)
        words = [w for w, _ in R["trail"]]
        if allow_devotional is None:
            need = self.N.get("word:" + words[-1], {}).get("need") if words else None
            allow_devotional = need == "faith" or R["stance"] == "seeking" or bool(set(R["situations"]) & {"reconnect_faith", "illness_family", "loneliness", "grief_parent", "grief_general"})
        stance, light = R["stance"], R["light"]
        S = dict(R["see_states"] if week >= 2 else R["states"]); S0 = dict(R["states"]); T = dict(R["toward"]); tests = dict(R["tests"])
        never = set(R["never_first"]); sits = set(R["situations"]); ex = set(exclude); exp = set(exclude_prasangs)
        cand = {s: {} for s in SLOTS}; gated = {s: collections.Counter() for s in SLOTS}

        def add(slot, vid, score, path, why=""):
            if vid in ex or self.v(vid).get("prasang_id") in exp and slot != "D7_story": return
            c = cand[slot].setdefault(vid, {"id": vid, "score": 0.0, "paths": [], "whys": []})
            c["score"] += score
            if path not in c["paths"]: c["paths"].append(path)
            if why and why not in c["whys"] and len(c["whys"]) < 3: c["whys"].append(why)

        def fit(vid, slot):
            n = self.v(vid); b = n.get("beats") or {}; sj = SUBJOB[slot]
            x = 0.6 if n.get("sub_job") == sj else (0.25 if (n.get("sub_job") or "").split("_")[0] == sj.split("_")[0] else 0.0)
            x += 0.4 * b.get({"see_name": "hook", "see_why": "diagnose", "steady_ground": "steady", "steady_reframe": "steady", "act_today": "act", "act_hard_moment": "act"}[sj], 0)
            x += 0.1 if n.get("tier") == "core" else 0
            if sits & set(n.get("situations") or []) and heals_of(vid) & (set(S0) | set(tests) | set(T)): x += 0.2 * len(sits & set(n.get("situations") or []))
            x += 0.1 if n.get("label_src") == "shard" else -0.15
            if slot in ("D3_steady_ground", "D4_steady_reframe", "D5_act_today", "D6_act_hard_moment") and own:
                if own & heals_of(vid): x += 0.35
            if R["mechanisms"] and set(n.get("mechanisms") or ()) & set(R["mechanisms"][:1]): x += 0.2
            return x

        def heals_of(vid):
            return {e["t"][6:] for e in self.out.get(vid, ()) if e["rel"] in ("heals", "depicts", "cultivates") and e["t"].startswith("state:")}

        A = {x: w for x, w in S.items() if x in AFF}; Hs = {x: w for x, w in S.items() if x not in AFF}
        own = set(A) | set(tests)
        lvl_ok = ANT_LEVEL_OK[week]

        # D1 see_name ---------------------------------------------------------------------------
        if not light:
            for x, w in A.items():
                for e in self.rel_in("state:" + x, "depicts"):
                    sp = self.v(e["s"]).get("speaker") or ""
                    inside = 0.35 if e["src"] == "shard" and sp and sp not in ("Krishna", "Vasishtha", "Vidura", "Bhishma", "Yama", "Ashtavakra", "Teacher", "Seer") else 0
                    add("D1_see_name", e["s"], w * e["weight"] + inside, f"{e['s']} -depicts-> {x}" + (f" (spoken by {sp})" if inside else ""), e["why"])
                for e in self.rel_in("state:" + x, "asked_from"):
                    d = self.N[e["s"]]
                    if stance not in d.get("stance_fit", [stance]): continue
                    for q in d.get("question_ids", []):
                        add("D1_see_name", q, 0.7 * w, f"{q} -asks-> {e['s']} ({d['asker']} to {d['answerer']}) -asked_from-> {x}", d["question"])
        if light or not A or stance == "aspiration":      # a good state (or resolve beside a fear) opens on a blessing, never a deficit
            for x, w in list(Hs.items()) + [(t_, 0.5 * w_) for t_, w_ in T.items()]:
                for rel in ("depicts", "cultivates"):
                    for e in self.rel_in("state:" + x, rel):
                        n = self.v(e["s"])
                        if n.get("light_fit") or n.get("move") == "affirms":
                            add("D1_see_name", e["s"], w * e["weight"] + (0.4 if n.get("move") == "affirms" else 0), f"{e['s']} -{rel}-> {x} [light_fit]", e["why"])
            if stance == "seeking":
                for d_ in self.by_type["dialogue"]:
                    d = self.N[d_]
                    if "seeking" in d.get("stance_fit", []) and ("jijnasa" in d.get("asker_in", []) or set(d.get("asker_in", [])) & set(tests)):
                        for q in d.get("question_ids", []): add("D1_see_name", q, 0.8, f"{q} -asks-> {d_} ({d['asker']} to {d['answerer']})", d["question"])
        d1_dialogues = collections.Counter()
        for vid, c in cand["D1_see_name"].items():
            for e in self.rel_out(vid, "asks"): d1_dialogues[e["t"]] += c["score"]

        # D2 see_why ----------------------------------------------------------------------------
        def chain_ok(cid):
            c = cid[6:]
            if c in OWN_CHAIN and not (OWN_CHAIN[c] & (set(S0) | set(tests))): return "own-chain rule: " + ", ".join(sorted(OWN_CHAIN[c])) + " not among the person's states"
            if c in CLING_CHAINS and (sits & FEAR_FOR_OTHER or R["threat"] or (week == 1 and sits & BEREAVED)): return "clinging chain for someone afraid for or grieving a person"
            return None
        if stance == "wronged":
            for vid, why in WRONGED_DAY2.items():
                if vid in self.N: add("D2_see_why", vid, 1.0, f"{vid} [whose smallness it is: curated list for the wronged stance]", why)
            for e in self.rel_in("state:manyu", "depicts"):
                if self.v(e["s"]).get("sub_job") == "see_why": add("D2_see_why", e["s"], e["weight"], f"{e['s']} -depicts-> manyu", e["why"])
            for e in self.rel_out("mech:dignity_denied", "cause_chain"):          # Rama at the ocean: courtesy read as weakness
                c = self.N.get(e["t"])
                if c and e["t"] != "chain:mbh.kshama_and_tejas":
                    for vid in c.get("verses", []): add("D2_see_why", vid, 0.7, f"{vid} -states_chain-> {e['t'][6:]} <-cause_chain- dignity_denied", c["title"] + " (" + c["refs"][0] + ")")
        else:
            target = tests if (light and tests) else (A if A else S)
            mech_chains = collections.Counter()
            for i, m in enumerate(R["mechanisms"]):
                for e in self.rel_out("mech:" + m, "cause_chain"): mech_chains[e["t"]] += (1.4 if mechanism else 0.6) - 0.25 * i
            chains = collections.Counter(mech_chains); how = collections.defaultdict(list)
            for x, w in target.items():
                for rel in ("causes", "destroys"):
                    for e in self.rel_in("state:" + x, rel):            # something -> x : why x is here
                        chains["chain:" + e["src"]] += w * e["weight"]; how["chain:" + e["src"]].append(f"{e['s'].split(':')[1]} -{rel}-> {x}")
                    if week >= 2 or light:
                        for e in self.rel_out("state:" + x, rel):       # x -> something : where x leads
                            chains["chain:" + e["src"]] += 0.5 * w * e["weight"]; how["chain:" + e["src"]].append(f"{x} -{rel}-> {e['t'].split(':')[1]}")
            if light:                                                    # a good state read forward: what it grows into, stated by a text
                for x, w in Hs.items():
                    for e in self.rel_out("state:" + x, "leads_to"):
                        chains["chain:" + e["src"]] += 0.6 * w * e["weight"]; how["chain:" + e["src"]].append(f"{x} -leads_to-> {e['t'].split(':')[1]}")
            for cid, sc in chains.items():
                c = self.N.get(cid)
                if not c: continue
                bad = chain_ok(cid)
                if bad: gated["D2_see_why"][bad] += 1; continue
                if not how[cid] and cid in mech_chains and not mechanism and not (set(c["steps"]) & (set(target) | set(S0))): continue
                rel_states = {"state:" + x for x in set(target) | set(S0)}
                for vid in c.get("verses", []):
                    on = len(c["verses"]) <= 1 or any(e["t"] in rel_states for e in self.out.get(vid, ()) if e["rel"] in ("depicts", "heals", "locus_of"))
                    add("D2_see_why", vid, (sc + 0.4) if on else 0.35 * sc, f"{vid} -states_chain-> {cid[6:]} [{'; '.join(how[cid][:2]) or 'mechanism ' + R['mechanisms'][0]}]", c["title"] + " (" + c["refs"][0] + ")")
            # label-only Day 2 (no text-stated chain behind it): counted once per verse and below any chain verse, because
            # Day 2 must come from the cause chain of the person's own state, not from a verse that merely sounds causal
            best = {}
            for x, w in target.items():
                for rel in ("heals", "depicts"):
                    for e in self.rel_in("state:" + x, rel):
                        n = self.v(e["s"])
                        if (n.get("sub_job") == "see_why" and n.get("move") in ("explains_cause", "normalizes", "names_pain", "warns")) or n.get("move") in ("explains_cause", "normalizes"):
                            sc = 0.45 * w * e["weight"]
                            if sc > best.get(e["s"], (0,))[0]: best[e["s"]] = (sc, f"{e['s']} -{rel}-> {x} [label only: move {n.get('move')}]", e["why"])
            for vid, (sc, path, why) in best.items(): add("D2_see_why", vid, sc, path, why)
            if stance == "seeking":
                for d_, sc in d1_dialogues.items():
                    for a in self.N[d_].get("answer_ids", [])[:3]: add("D2_see_why", a, 0.9, f"{a} -answers_in-> {d_} (the teacher's first answer)", self.N[d_]["question"])

        # D3, D4 steady -------------------------------------------------------------------------
        for slot in ("D3_steady_ground", "D4_steady_reframe"):
            pool = A if A else (tests if tests else {})
            for x, w in pool.items():
                for e in self.rel_in("state:" + x, "heals"):
                    if e.get("level") and e["level"] not in lvl_ok: continue
                    if e.get("via") and e["via"] in never and week == 1: gated[slot]["antidote is a never_first state"] += 1; continue
                    add(slot, e["s"], w * e["weight"], f"{e['s']} -heals-> {x}" + (f" via {e['via']}" if e.get("via") else ""), e["why"])
            for x, w in (list(T.items()) if (light or not pool) else [(t_, 0.4 * w_) for t_, w_ in T.items()]):
                if x in never and week == 1 and stance == "wronged": continue
                for e in self.rel_in("state:" + x, "cultivates"):
                    if e.get("level") and e["level"] not in lvl_ok: continue
                    if self.v(e["s"]).get("sub_job") in ("steady_ground", "steady_reframe") or light:
                        add(slot, e["s"], w * e["weight"], f"{e['s']} -cultivates-> {x}", e["why"])
            for d_, sc in d1_dialogues.most_common(4):                     # the text's own answer to the Day 1 question
                for a in self.N[d_].get("answer_ids", []):
                    add(slot, a, 0.6, f"{a} -answers-> Day 1 question in {d_}", self.N[d_]["answerer"] + " answers " + self.N[d_]["asker"])
            if week == 3:
                for e in self.rel_in("state:atma_jnana", "cultivates"):
                    if self.v(e["s"]).get("depth") == "self": add(slot, e["s"], 0.5 * e["weight"], f"{e['s']} -cultivates-> atma_jnana [week 3]", e["why"])

        # D5, D6 act ----------------------------------------------------------------------------
        for slot in ("D5_act_today", "D6_act_hard_moment"):
            for x, w in T.items():
                if x in never and week == 1 and slot == "D5_act_today" and stance == "wronged": continue
                for e in self.rel_in("state:" + x, "cultivates"):
                    if e.get("level") and e["level"] not in lvl_ok: continue
                    add(slot, e["s"], w * e["weight"], f"{e['s']} -cultivates-> {x}", e["why"])
            for i, m in enumerate(R["mechanisms"]):
                for e in self.rel_out("mech:" + m, "remedy_chain"):
                    c = self.N.get(e["t"])
                    if not c or chain_ok(e["t"]): continue
                    for vid in c.get("verses", []): add(slot, vid, 0.45 - 0.2 * i, f"{vid} -states_chain-> {e['t'][6:]} <-remedy_chain- {m}", c["title"])
        if risk == "self_harm":                              # r4: the week consoles and grounds; every verse slot is fed from verses that console the heavy states
            for x in SH_HEALS:
                for e in self.rel_in("state:" + x, "heals"):
                    if self.v(e["s"]).get("type") == "verse" and self.v(e["s"]).get("move") in SH_OK_MOVES and not self.letgo(e["s"]):
                        for slot in SLOTS[:6]: add(slot, e["s"], 0.5 * e["weight"] + 0.5 * S0.get(x, 0) + (0.6 if self.v(e["s"]).get("move") == "consoles" else 0),
                                                   f"{e['s']} -heals-> {x} [self-harm risk: consoling only]", e["why"])
        # thread continuity: a verse that follows an earlier slot's candidate inside a native arc
        order = SLOTS[:6]
        for i, slot in enumerate(order[1:], 1):
            prev = set().union(*[set(cand[s]) for s in order[:i]])
            for vid in list(cand[slot]):
                for e in self.rel_in(vid, "next_in_thread"):
                    if e["s"] in prev and e["weight"] >= 1: add(slot, vid, 0.3, f"{e['s']} -next_in_thread-> {vid} ({e['src']})")
                for e in self.rel_out(vid, "in_thread"):
                    if e.get("beat") == SUBJOB[slot]: add(slot, vid, 0.25, f"{vid} beat '{e['beat']}' in {e['t']}")

        # gates, fit, rank ----------------------------------------------------------------------
        slots, ranked = {}, {}
        for slot in order:
            keep = []
            for vid, c in cand[slot].items():
                r = self.gate(vid, slot, R, risk, allow_devotional)
                if r: gated[slot][r] += 1; continue
                n = self.v(vid); sc = c["score"] + fit(vid, slot) + WEEK_DEPTH_BONUS[week].get(n.get("depth"), 0)
                if aud & set(n.get("speaks_to") or ()): sc += 0.3
                if aud & set(n.get("not_for") or ()): sc -= 0.5
                hub = self.hub.get(vid, 1.0) * (DAY1_HUB.get(vid, 1.0) if slot == "D1_see_name" else 1.0)
                if hub < 1: c["hub_discount"] = hub
                c["score"] = round(sc * hub, 3)
                c.update(label_src=n.get("label_src"), move=n.get("move"), sub_job=n.get("sub_job"), depth=n.get("depth"), speaker=n.get("speaker"), ref=n.get("ref"), line=n.get("line"))
                c["paths"] = c["paths"][:4]; keep.append(c)
            ranked[slot] = keep
        home = {}                                            # a verse sits in one slot: the one its sub_job names, else where it scores best
        for slot in order:
            for c in ranked[slot]:
                sj = self.v(c["id"]).get("sub_job"); bonus = 1.0 if sj == SUBJOB[slot] else 0.0
                if c["id"] not in home or (bonus, c["score"]) > home[c["id"]][1]: home[c["id"]] = (slot, (bonus, c["score"]))
        for slot in order:
            keep = [c for c in ranked[slot] if home[c["id"]][0] == slot]
            if len(keep) < 3: keep += [dict(c, shared_with=home[c["id"]][0]) for c in ranked[slot] if home[c["id"]][0] != slot][: 3 - len(keep)]
            keep.sort(key=lambda c: -c["score"])
            seen_p, top = collections.Counter(), []
            for c in keep:                                   # at most 2 per passage in a slot's shortlist
                p = self.v(c["id"]).get("prasang_id") or c["id"]
                if seen_p[p] >= 2: continue
                seen_p[p] += 1; top.append(c)
                if len(top) >= k: break
            slots[slot] = top

        # D7 story ------------------------------------------------------------------------------
        st = []
        Sin = set(A) | (set(tests) if light else set()); Tout = set(T) | (set(Hs) if light else set())
        mine_ = self.mine(R); top2 = {k for k, _ in R["states"][:2]}; griever_ = bool(sits & BEREAVED or "shoka" in {k for k, _ in R["states"][:3]} or "shoka" in (R.get("read") or [])[:2])
        hurt_ = stance == "wronged" or "manyu" in top2; aband_ = self.abandoned(R)
        for sid_ in self.by_type["story"]:
            n = self.N[sid_]; fl = n.get("flags") or {}
            if sid_ in ex or n.get("prasang_id") in exp: continue
            reason = None
            if fl.get("self_harm_theme") and (risk != "none" or set(S0) & {"vishada", "nirveda"}): reason = "self_harm_theme with risk or a despairing reader"
            elif fl.get("counsels_endurance") and stance == "wronged": reason = "endurance story for a wronged person"
            elif fl.get("mortality") and (sits & FEAR_FOR_OTHER or (week == 1 and sits & BEREAVED)): reason = "mortality story for fear for a loved one or fresh grief"
            elif fl.get("renunciation_push") and (stance == "aspiration" or week == 1): reason = "renunciation push"
            elif "griever" in (n.get("not_for") or []) and (sits & BEREAVED or "shoka" in {k for k, _ in R["states"][:2]}): reason = "story label: not for a griever"
            elif "wronged" in (n.get("not_for") or []) and stance == "wronged": reason = "story label: not for wronged"
            elif "caregiver" in (n.get("not_for") or []) and (sits & FEAR_FOR_OTHER or R.get("caregiver")): reason = "story label: not for a caregiver"
            elif "parent" in (n.get("not_for") or []) and sits & {"new_parent", "present_parent", "raising_kids_values", "teen_conflict"}: reason = "story label: not for a parent"
            elif fl.get("world_unreal") and (sits & BEREAVED or sits & FEAR_FOR_OTHER or R.get("threat")): reason = "world-is-unreal story for a griever or someone under real threat"
            elif fl.get("violence") and week == 1 and sits & (FEAR_FOR_OTHER | BEREAVED): reason = "violence for a frightened or grieving reader"
            elif n.get("stance_fit") and stance not in n["stance_fit"]: reason = "stance_fit"
            elif n.get("arc") == "unresolved": reason = "unresolved arc (a recognition story) is never a Day 7 turn"
            elif light and n.get("src") == "04_stories" and not (set(n.get("moves_to", [])) & (Tout | LIGHT_STATES)): reason = "no turn toward a healing state for a light stance"
            if reason is None:                               # r4 story rules read what the card will show
                says, says_all = self.story_says(sid_), self.story_says(sid_, summary=True)
                rec = "kshama" in (n.get("moves_to") or []) or bool(RECONCILE_RE.search(says))
                if rec and (risk != "none" or (week <= 2 and (hurt_ or aband_))): reason = "r4: reconciling with the one who hurt you, for the hurt or the abandoned in weeks 1-2 (never at risk)"
                elif griever_ and week <= 2 and (fl.get("mortality") or DEATH_RE.search(says_all)): reason = "r4: death imagery for a griever before week 3"
                elif risk == "self_harm" and (fl.get("mortality") or DEATH_RE.search(says_all)): reason = "r4: death imagery at self-harm risk"
                elif (risk != "none" or aband_) and ("vairagya" in (n.get("moves_to") or []) or re.search(r"\blet go\b", says, re.I)):
                    reason = "r4: letting-go story at any risk or for someone afraid of being left"
                elif sits & {"burnout", "no_meaning", "retirement", "layoff", "midlife"} and VERDICT_STORY_RE.search(says):
                    reason = "r4: a verdict on years of effort, for someone weighing their years"
                elif LEAVE_RE.search(says) and not sits & QUIT_SITS: reason = "r4: 'you don't have to leave' for someone not weighing leaving"
                else:
                    for rx, vs in STORY_VICE:
                        if rx.search(says) and not vs & mine_: reason = "r4: story lesson names a vice the person never showed"; break
            if reason: gated["D7_story"][reason] += 1; continue
            i_ = set(n.get("states_in", [])) & Sin; o_ = set(n.get("moves_to", [])) & Tout; ss = sits & set(n.get("situations") or [])
            sc = sum(S.get(x, tests.get(x, 0.5)) for x in i_) + 0.8 * sum(T.get(x, 0.5) for x in o_) + 0.7 * len(ss) + 0.12 * (n.get("strength") or 2)
            if fl.get("gender_sensitive"): sc -= 0.6          # stories: a penalty and a review flag, not a ban (Sita, Draupadi, Savitri carry this flag)
            if light and set(n.get("states_in") or ()) & (COLLAPSE | {"shoka", "glani"}): sc -= 0.8
            if sits & FEAR_FOR_OTHER and set(n.get("states_in") or ()) & CLING_STATES and not (set(n.get("states_in") or ()) & {"bhaya", "chinta", "shrama"}): sc -= 0.8
            if n.get("src") != "04_stories": sc = 0.5 * len(ss) + 0.08 * (n.get("strength") or 2) - 0.3
            if not (i_ or o_ or ss): continue
            if not light and n.get("src") == "04_stories" and not i_ and not ss: continue
            paths = ([f"{sid_} -enacts_in-> {', '.join(sorted(i_))}"] if i_ else []) + ([f"{sid_} -enacts_turn-> {', '.join(sorted(o_))}"] if o_ else []) + ([f"{sid_} -fits_situation-> {', '.join(sorted(ss))}"] if ss else [])
            st.append({"id": sid_, "score": round(sc, 3), "title": n.get("title"), "protagonist": n.get("protagonist"), "paths": paths, "whys": [n.get("teaching") or ""],
                       "src": n.get("src"), "whole_arc_note": n.get("whole_arc_note"), "review_flags": sorted(fl)})
        st.sort(key=lambda c: -c["score"]); slots["D7_story"] = st[:k]
        thin = [s for s in SLOTS if len(slots[s]) < 3]
        return {"reading": R, "slots": slots, "thin": thin, "gated": {s: dict(c) for s, c in gated.items() if c},
                "pool_sizes": {s: len(cand[s]) if s != "D7_story" else len(st) for s in SLOTS}, "ms": round((time.time() - t0) * 1000, 1), "allow_devotional": allow_devotional}

    # ── 4. a week as a path ──
    def week(self, situations=(), stance=None, states=(), words=(), week=1, exclude=(), exclude_prasangs=(), risk="none", age=None, stages=(), threat=False,
             mechanism=None, allow_devotional=None, max_per_text=3, flags=(), pin=None):
        """Pick one item per day: no repeated verse, passage or claim, at most `max_per_text` days from one text family,
        Day 7 a story. Each day carries the edge path that put it there and its whys, plus 3 alternates for the reranker."""
        t0 = time.time()
        out = self.query(situations, stance, states, words, week, exclude, mechanism, risk, allow_devotional, 14, exclude_prasangs, age, stages, threat, flags)
        used, used_p, claims, fam, days = set(exclude), collections.Counter(), set(), collections.Counter(), []
        pet = "pet_loss" in set(out["reading"]["situations"])
        who = self.tender(out["reading"], age, stages) if not (set(out["reading"]["situations"]) & FEAR_FOR_OTHER or threat) else None
        prev = None
        for i, slot in enumerate(SLOTS):
            pick, alts = None, []
            ranked_ = out["slots"][slot]
            if prev:                                          # r4k: prefer a candidate with an explicit link to yesterday
                ranked_ = sorted(ranked_, key=lambda c: -(c["score"] + LINK_W * abs(c["score"]) * (1 if self.link(prev, c["id"]) else -0.66)))
            for c in ranked_:
                vid = c["id"]
                if vid in used: continue
                if slot != "D7_story":
                    n = self.v(vid); p = n.get("prasang_id"); cl = (n.get("claim") or "").strip().lower(); f = n.get("family")
                    threaded = prev and any(e["s"] == prev for e in self.rel_in(vid, "next_in_thread"))
                    if p and used_p[p] and not threaded: continue
                    if cl and cl in claims: continue
                    if f and fam[f] >= max_per_text: continue
                if pick is None and slot != "D7_story" and who and self.letgo(vid):
                    guard = prev if (prev and self.soothes(prev)) else None
                    if guard is None:
                        for gs in ("D3_steady_ground", "D4_steady_reframe", "D1_see_name"):
                            guard = next((g["id"] for g in out["slots"].get(gs, ()) if g["id"] not in used and g["id"] != vid and self.soothes(g["id"])), None)
                            if guard: break
                    if guard is None: continue
                    c = dict(c, guard=guard, guard_is_prev=guard == prev)
                if pick is None: pick = c
                elif len(alts) < 3: alts.append(c["id"])
            if pick is None:
                days.append({"day": i + 1, "slot": slot, "id": None, "thin": True}); continue
            vid = pick["id"]; used.add(vid)
            if slot != "D7_story":
                n = self.v(vid); used_p[n.get("prasang_id")] += 1 if n.get("prasang_id") else 0; fam[n.get("family")] += 1
                if n.get("claim"): claims.add(n["claim"].strip().lower())
                lk = self.link(prev if i else None, vid)
                prev = pin if (i == 0 and pin and pin in self.N) else vid
                days.append({"day": i + 1, "slot": slot, "id": vid, "ref": n.get("ref"), "speaker": n.get("speaker"), "move": n.get("move"), "depth": n.get("depth"), "link": lk,
                             "line": n.get("line"), "claim": n.get("claim"), "score": pick["score"], "path": pick["paths"][0], "paths": pick["paths"][:3],
                             "why": pick["whys"][:2], "hub_discount": pick.get("hub_discount"), "alts": alts, "thin": len(out["slots"][slot]) < 3,
                             "writer_note": " ".join(x for x in (BELOVED_NOTE if vid in HUMAN_LONGING_ONLY else None, LETGO_NOTE.format(who=who) if pick.get("guard") else None, PET_NOTE if pet else None) if x) or None, "staged": n.get("staged"),
                             "guard": ({"id": pick["guard"], "ref": self.v(pick["guard"]).get("ref"), "line": self.v(pick["guard"]).get("line"), "is_previous_day": pick["guard_is_prev"]}
                                       if pick.get("guard") else None)})
                if pick.get("guard") and not pick["guard_is_prev"]: used.add(pick["guard"])
            else:
                days.append({"day": 7, "slot": slot, "id": vid, "link": self.link(prev, vid), "title": pick.get("title"), "protagonist": pick.get("protagonist"), "src": pick.get("src"),
                             "score": pick["score"], "path": " ; ".join(pick["paths"]), "why": pick["whys"][:1], "whole_arc_note": pick.get("whole_arc_note"),
                             "review_flags": pick.get("review_flags"), "alts": alts, "thin": len(out["slots"][slot]) < 3, "writer_note": PET_NOTE if pet else None})
        return {"reading": out["reading"], "days": days, "gated": out["gated"], "pool_sizes": out["pool_sizes"], "query_ms": out["ms"],
                "ms": round((time.time() - t0) * 1000, 1), "used": sorted(x for x in used if x not in set(exclude))}

    def weeks(self, n=3, **kw):
        """Weeks 1..n, each excluding what earlier weeks served (verses and stories), so the climb never repeats."""
        ex = list(kw.pop("exclude", ())); res = []
        for w in range(1, n + 1):
            o = self.week(week=w, exclude=ex, **kw); res.append(o); ex += o["used"]
        return res

    def day1_pool(self, words=(), stance=None, situations=(), age=None, stages=(), k=8, risk="none", base=None):
        """Day 1 candidates for the /warm call: no LLM, no note. `base` lets a caller reuse one query across age and stage."""
        if base is None: base = self.query(situations, stance, (), words, 1, (), None, risk, None, 40)
        aud = set(AGE_SPEAKS.get(age, set()))
        for x in stages or (): aud |= STAGE_SPEAKS.get(x, set())
        out = []
        for c in base["slots"]["D1_see_name"]:
            n = self.v(c["id"]); sc = c["score"]
            if aud & set(n.get("speaks_to") or ()): sc += 0.3
            if aud & set(n.get("not_for") or ()): sc -= 0.5
            out.append((round(sc, 3), c))
        out.sort(key=lambda x: -x[0])
        return [{"id": c["id"], "score": sc, "path": c["paths"][0], "light_fit": bool(self.v(c["id"]).get("light_fit"))} for sc, c in out[:k]]


def show_week(o, width=96):
    R = o["reading"]; L = [f"stance {R['stance']} | week {R['week']} ({R['level']}) | light {R['light']} | trail {R.get('trail')} | audience {R.get('audience')}",
                           f"states {R['states'][:4]} | tests {R['tests'][:3]} | toward {R['toward'][:4]} | never_first {R['never_first']}"]
    for d in o["days"]:
        if not d.get("id"): L.append(f"D{d['day']} {d['slot']}: (nothing passed the gates)"); continue
        if d["slot"] == "D7_story": L.append(f"D7 story  {d['id']} | {d['title']}"); L.append(f"      path: {d['path'][:width + 40]}"); continue
        L.append(f"D{d['day']} {d['slot'][3:]:15s} {d['id']} [{d['move']}/{d['depth']}] {(d.get('line') or '')[:width]}")
        L.append(f"      path: {d['path'][:width + 40]}" + (f" | hub x{d['hub_discount']}" if d.get("hub_discount") else "") + (" | THIN" if d.get("thin") else ""))
    L.append(f"week {o['ms']} ms (query {o['query_ms']} ms)")
    return "\n".join(L)


def show(out, n=3, width=92):
    R = out["reading"]; L = []
    L.append(f"stance {R['stance']} | week {R['week']} ({R['level']}) | light {R['light']} | trail {R['trail_mode']} | mechanisms {R['mechanisms']}")
    L.append(f"states {R['states']}" + (f" | tests {R['tests']}" if R['tests'] else "")); L.append(f"toward {R['toward'][:5]} | never_first {R['never_first']}")
    for x in R["notes"]: L.append("note: " + x)
    for s in SLOTS:
        L.append(f"{s}  (pool {out['pool_sizes'][s]}, kept {len(out['slots'][s])}" + (", THIN" if s in out["thin"] else "") + ")")
        for c in out["slots"][s][:n]:
            if s == "D7_story": L.append(f"   {c['score']:5.2f} {c['id']} | {c['title']} [{c['src']}]"); L.append("         " + " ; ".join(c["paths"])[:width + 40])
            else:
                L.append(f"   {c['score']:5.2f} {c['id']} [{c['label_src']}/{c.get('move')}] {(c.get('line') or '')[:width]}"); L.append("         " + c["paths"][0][:width + 40])
        g = out["gated"].get(s)
        if g: L.append("   gated: " + "; ".join(f"{v}x {k_}" for k_, v in sorted(g.items(), key=lambda kv: -kv[1])[:4]))
    L.append(f"query {out['ms']} ms")
    return "\n".join(L)



# ── vendored from precompute_pools.py: the Day 1 pool reader ──
def lookup(pools, kept, paused=None, stance=None, age=None, stages=()):
    """Backend helper: 8 Day 1 ids for the person's taps. Unknown parts fall back to the coarser cell."""
    d = pools["day1"]; key = f"{paused}>{kept}" if paused and f"{paused}>{kept}" in d else kept
    if key not in d: return []
    st = stance or pools["stance_guess"].get(key, "struggle")
    cell = d[key].get(st) or d[key]["struggle"]
    sg = stage_group(stages)
    for a, s in ((age, sg), (age, "*"), ("*", sg), ("*", "*")):
        x = cell.get(a or "*", {}).get(s or "*")
        if x: return [i if isinstance(i, str) else i[0] for i in x]
    return []


def load_pools(path=None):
    return json.load(open(path or os.path.join(HERE, "pools.json")))

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--sit", nargs="*", default=[]); ap.add_argument("--stance"); ap.add_argument("--states", nargs="*", default=[]); ap.add_argument("--words", nargs="*", default=[])
    ap.add_argument("--week", type=int, default=1); ap.add_argument("--exclude", nargs="*", default=[]); ap.add_argument("--risk", default="none"); ap.add_argument("--k", type=int, default=6)
    ap.add_argument("--json", action="store_true"); ap.add_argument("-n", type=int, default=3)
    ap.add_argument("--age"); ap.add_argument("--stages", nargs="*", default=[]); ap.add_argument("--threat", action="store_true")
    ap.add_argument("--plan", action="store_true", help="assemble the 7-day week instead of listing slot candidates")
    a = ap.parse_args(); G_ = Graph()
    if a.plan:
        o = G_.week(a.sit, a.stance, a.states, a.words, a.week, a.exclude, risk=a.risk, age=a.age, stages=a.stages, threat=a.threat)
        print(json.dumps(o, ensure_ascii=False, indent=1) if a.json else f"graph load {G_.load_ms} ms\n" + show_week(o))
    else:
        o = G_.query(a.sit, a.stance, a.states, a.words, a.week, a.exclude, risk=a.risk, k=a.k, age=a.age, stages=a.stages, threat=a.threat)
        print(json.dumps(o, ensure_ascii=False, indent=1) if a.json else f"graph load {G_.load_ms} ms\n" + show(o, a.n))

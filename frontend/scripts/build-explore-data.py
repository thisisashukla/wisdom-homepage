#!/usr/bin/env python3
"""
Static data for /explore (the map of the mind) and /explore/<state> pages.

Reads (read-only):
  ../sanscripts/plan_engine_v3/03_graph/{wisdom_graph.json, states.json, chains.json, antidotes.json,
                                         situation_state_map.json}
  backend/data/taxonomy/wisdom_library.v3.json
  frontend/src/content/gita/verses/<c>-<v>.json        (Gita Sanskrit, the same text as the verse pages)
  frontend/src/content/explore/whys_sarvam.json        (Sarvam rewrites; written by explore_whys_sarvam.py)
Writes (frontend/src/content/explore/):
  map.json            layout + minimal edges for the client map
  index.json          the 46 states: slug, names, valence (for routes, nav and the sitemap)
  states/<id>.json    everything one state page and the map's state panel need
  nodes/<group>.json  verse and story details for the map panel, one file per text family group
  reflect.json        feeling words, synonyms per state and a safe verse per state for the reflect box
  whys_needed.json    every model-written line the pages would show, for the Sarvam pass

Deterministic: fixed seed, sorted output, rounded coordinates. Re-run any time:
  python3 scripts/build-explore-data.py && python3 scripts/explore_whys_sarvam.py && python3 scripts/build-explore-data.py
Overrides: EXPLORE_GRAPH_DIR, EXPLORE_LIBRARY.
"""
import hashlib
import json
import math
import os
import re
import sys
from collections import defaultdict

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
FRONT = os.path.dirname(HERE)
REPO = os.path.dirname(FRONT)
GRAPH_DIR = os.environ.get("EXPLORE_GRAPH_DIR", os.path.join(os.path.dirname(REPO), "sanscripts", "plan_engine_v3", "03_graph"))
LIBRARY = os.environ.get("EXPLORE_LIBRARY", os.path.join(REPO, "backend", "data", "taxonomy", "wisdom_library.v3.json"))
GITA_DIR = os.path.join(FRONT, "src", "content", "gita", "verses")
OUT = os.path.join(FRONT, "src", "content", "explore")
WHYS = os.path.join(OUT, "whys_sarvam.json")


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def dump(p, obj, pretty=False):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        if pretty:
            json.dump(obj, f, ensure_ascii=False, indent=1, sort_keys=True)
        else:
            json.dump(obj, f, ensure_ascii=False, separators=(",", ":"), sort_keys=True)
        f.write("\n")


G = load(os.path.join(GRAPH_DIR, "wisdom_graph.json"))
STATES_SRC = load(os.path.join(GRAPH_DIR, "states.json"))["states"]
CHAINS_SRC = {c["id"]: c for c in load(os.path.join(GRAPH_DIR, "chains.json"))["chains"]}
ANTIDOTES = {a["state"]: a for a in load(os.path.join(GRAPH_DIR, "antidotes.json"))["antidotes"]}
EMO = load(os.path.join(GRAPH_DIR, "situation_state_map.json"))["emotion_word_map"]
LIB = load(LIBRARY)
LIBV = {v["id"]: v for v in LIB["verses"]}
LIBP = {p["id"]: p for p in LIB["prasangs"]}
SARVAM = load(WHYS) if os.path.exists(WHYS) else {}
NODES = G["nodes"]
EDGES = G["edges"]

# ── Vocabulary for the pages (plain English names people search for) ─────────────────────────
EN = {
    "vishada": "despair", "shoka": "grief", "moha": "confusion", "bhaya": "fear", "chinta": "worry",
    "krodha": "anger", "kama": "craving", "lobha": "greed", "ahankara": "ego", "mada": "arrogance",
    "matsarya": "envy", "dvesha": "resentment", "sanga": "attachment", "samshaya": "doubt",
    "chanchalya": "a restless mind", "pramada": "carelessness", "alasya": "laziness", "glani": "guilt",
    "dainya": "feeling unworthy", "viraha": "loneliness", "nirveda": "emptiness", "manyu": "being wronged",
    "dharma_sankata": "a moral dilemma", "shrama": "burnout", "trishna": "expectations",
    "shanti": "peace", "abhaya": "fearlessness", "shraddha": "faith", "dhriti": "steadiness",
    "kshama": "forgiveness", "karuna": "compassion", "maitri": "kindness", "santosha": "contentment",
    "prasada": "clarity", "utsaha": "enthusiasm", "viveka": "discernment", "vairagya": "letting go",
    "samatva": "equanimity", "tejas": "self-respect", "kritajnata": "gratitude", "sharanagati": "surrender",
    "sankalpa": "resolve", "ananda": "joy", "atma_jnana": "self-knowledge", "seva": "service",
    "jijnasa": "the wish to understand",
}
SLUG_WORD = {"chanchalya": "restless-mind", "dharma_sankata": "moral-dilemma", "jijnasa": "inquiry", "dainya": "unworthiness", "manyu": "being-wronged"}

# Words people type, per state, for the reflect box (matching keys only, never shown).
SYN = {
    "vishada": "despair hopeless hopelessness collapse collapsed give up giving up broken crushed defeated sinking cant go on no way out low down depressed depression helpless",
    "shoka": "grief grieving loss lost someone died death mourning sorrow sad sadness heartbroken miss passed away bereaved",
    "moha": "confused confusion unclear foggy fog cant think muddled deluded cant see blind attached torn",
    "bhaya": "fear afraid scared frightened terrified panic panicking dread anxious anxiety nervous insecure unsafe phobia",
    "chinta": "worry worried worrying anxious anxiety overthinking overthink ruminating tension tensed stress stressed nervous what if uneasy cant sleep sleepless",
    "krodha": "anger angry mad furious rage irritated irritable frustrated frustration annoyed temper snapped gussa",
    "kama": "craving crave desire lust want addicted addiction urge temptation tempted obsessed",
    "lobha": "greed greedy never enough more money hoarding wanting more materialistic",
    "ahankara": "ego pride proud arrogant superior offended insulted image status recognition",
    "mada": "arrogance arrogant success went to my head cocky intoxicated by success smug show off",
    "matsarya": "envy envious jealous jealousy comparison comparing compare others ahead better than me fomo",
    "dvesha": "resentment resent hate hatred dislike bitter bitterness grudge aversion cant stand",
    "sanga": "attachment attached clinging cling holding on cant let go possessive dependent",
    "samshaya": "doubt doubting indecisive indecision cant decide unsure uncertain second guessing confused choice",
    "chanchalya": "restless restlessness distracted distraction scattered cant focus focus wandering mind racing mind",
    "pramada": "careless carelessness drifting drift heedless negligent wasting time scrolling",
    "alasya": "lazy laziness procrastinate procrastinating procrastination unmotivated stuck inertia sluggish no motivation",
    "glani": "guilt guilty shame ashamed regret regretting remorse blame myself my fault",
    "dainya": "worthless unworthy not good enough small inferior low self esteem self doubt insecure failure useless",
    "viraha": "lonely loneliness alone isolated miss missing separated separation abandoned nobody left out",
    "nirveda": "empty emptiness numb meaningless pointless nothing matters bored tired of life purposeless",
    "manyu": "wronged hurt betrayed betrayal unfair unfairly injustice humiliated insulted cheated disrespected took credit stole my credit blamed for",
    "dharma_sankata": "dilemma torn conflicted right thing duty duties choose between two loyalties",
    "shrama": "burnout burnt out burned out exhausted exhaustion tired drained overworked fatigue worn out",
    "trishna": "expectation expectations wanting longing never satisfied restless wanting hope for",
    "shanti": "peace peaceful calm quiet stillness serene relaxed",
    "abhaya": "fearless courage brave bravery bold",
    "shraddha": "faith trust believe belief hopeful hope",
    "dhriti": "steady steadiness patience persevere perseverance endure resilient resilience",
    "kshama": "forgive forgiveness forgiving let it go pardon",
    "karuna": "compassion compassionate kind kindness empathy caring",
    "maitri": "friendship goodwill friendly warmth love",
    "santosha": "content contentment satisfied simple",
    "prasada": "clarity clear light lightness clear headed",
    "utsaha": "energy energetic enthusiastic enthusiasm excited motivated zest inspired",
    "viveka": "discernment wisdom wise judgement judgment",
    "vairagya": "letting go detachment detached dispassion",
    "samatva": "balance balanced equanimity even keeled composed",
    "tejas": "dignity self respect self-respect confidence confident stand up for myself",
    "kritajnata": "grateful gratitude thankful blessed",
    "sharanagati": "surrender devotion devoted prayer god",
    "sankalpa": "resolve determined determination commitment committed goal",
    "ananda": "joy joyful happy happiness bliss delight",
    "atma_jnana": "who am i self knowledge true self soul",
    "seva": "service serve help others giving",
    "jijnasa": "curious curiosity understand learn questions seeking meaning",
}

# Text family groups for the map filter. Label is what the filter chip says.
GROUPS = [
    ("gita", "Gita", ["bg"]),
    ("ramayana", "Ramayana", ["vr", "rcm"]),
    ("mahabharata", "Mahabharata", ["mbh"]),
    ("upanishads", "Upanishads", ["up"]),
    ("vasishtha", "Yoga Vasishtha", ["yv"]),
    ("gitas", "Other Gitas", ["gitas"]),
    ("poets", "Poets and saints", ["bh", "tulsi", "sur", "meera", "kabir", "rahim"]),
    ("vivekananda", "Vivekananda", ["viv"]),
]
FAM2GROUP = {f: i for i, (_, _, fams) in enumerate(GROUPS) for f in fams}
# story `text` values to family
STORY_TEXT2FAM = {"vr": "vr", "rcm": "rcm", "mbh": "mbh", "bg": "bg", "yv": "yv", "viv": "viv", "bh": "bh"}

LANG_BY_TEXT = {"rcm": "awa", "tulsi_vp": "awa", "tulsi_dv": "awa", "tulsi_kv": "awa", "tulsi_hb": "awa", "tulsi_gv": "awa",
                "sur": "bra", "meera": "bra", "rahim": "bra", "kabir": "hi", "viv": "en"}

ROLES = ["depicts", "heals", "cultivates", "locus_of", "enacts_in", "enacts_turn"]
ROLE_IDX = {r: i for i, r in enumerate(ROLES)}

# ── Safety: what never reaches a public page ────────────────────────────────────────────────
RISK_NEVER = {"bh.vairagya.100", "rcm.5.28.doha.1", "tulsi_gv.6.7"}
# Pair rules in the library say these never travel alone; a map panel shows one verse at a time.
NEVER_ALONE = {"rcm.2.165.doha.1", "yv.1.12.15", "yv.5.22.34", "yv.1.10.19", "yv.1.12.22", "yv.2.6.1", "yv.2.4.17",
               "rcm.5.55.doha.1", "vr.6.21.6", "vr.6.21.11"}
DROPPED = {d["id"] for d in LIB.get("dropped", [])}
FIX_FIRST = re.compile(r"fix before (display|showing)", re.I)


def vflags(n):
    return n.get("flags") or {}


def verse_public(vid):
    n = NODES.get(vid)
    if not n or n.get("type") != "verse" or vid not in LIBV:
        return False
    f = vflags(n)
    if n.get("staged") or f.get("self_harm_adjacent") or f.get("gender_sensitive"):
        return False
    if vid in RISK_NEVER or vid in NEVER_ALONE or vid in DROPPED:
        return False
    lv = LIBV[vid]
    if lv.get("text") != "bg" and FIX_FIRST.search(lv.get("notes") or ""):
        return False
    if not original_of(vid):
        return False
    return True


def story_prasang(sid):
    n = NODES.get(sid) or {}
    pid = n.get("library_prasang_id") or (n.get("prasang_id") if n.get("src") == "library_prasang" else None)
    return pid if pid in LIBP else None


def story_public(sid):
    n = NODES.get(sid)
    if not n or n.get("type") != "story":
        return False
    f = n.get("flags") or {}
    if f.get("self_harm_theme") or f.get("self_harm_adjacent") or f.get("gender_sensitive") or n.get("staged"):
        return False
    return story_prasang(sid) is not None


_gita_cache = {}


def gita_ref(vid):
    m = re.match(r"^bg\.(\d+)\.(\d+)$", vid)
    return (int(m.group(1)), int(m.group(2))) if m else None


def original_of(vid):
    """(text, lang) of the verse's original line: Sanskrit, Awadhi, Braj, or Vivekananda's English."""
    lv = LIBV.get(vid) or {}
    lang = LANG_BY_TEXT.get(lv.get("text"), "sa")
    gr = gita_ref(vid)
    if gr:
        if gr not in _gita_cache:
            p = os.path.join(GITA_DIR, f"{gr[0]}-{gr[1]}.json")
            _gita_cache[gr] = load(p).get("sanskrit") if os.path.exists(p) else None
        if _gita_cache[gr]:
            return _gita_cache[gr].strip(), "sa"
    if lang == "en":
        t = (lv.get("line") or "").strip()
        return (t, "en") if t else None
    t = (lv.get("sanskrit_display") or lv.get("sanskrit") or "").strip()
    return (t, lang) if t else None


def meaning_of(vid):
    lv = LIBV[vid]
    if lv.get("text") == "viv":
        return None  # the original is already English
    return (lv.get("translation") or lv.get("line") or "").strip()


def short_line(vid):
    lv = LIBV[vid]
    return (lv.get("line") or lv.get("translation") or "").strip()


def group_of_verse(vid):
    return FAM2GROUP.get(NODES[vid].get("family"), FAM2GROUP["gitas"])


def group_of_story(sid):
    pid = story_prasang(sid)
    fam = (LIBP.get(pid) or {}).get("family") or STORY_TEXT2FAM.get(NODES[sid].get("text"))
    return FAM2GROUP.get(fam, FAM2GROUP["gitas"])


# ── Index the graph ─────────────────────────────────────────────────────────────────────────
STATE_IDS = [s["id"] for s in STATES_SRC]
SRC = {s["id"]: s for s in STATES_SRC}
VAL = {s["id"]: s["valence"] for s in STATES_SRC}
sid_of = lambda t: t.split(":", 1)[1] if t.startswith("state:") else None

out_by = defaultdict(list)
in_by = defaultdict(list)
for e in EDGES:
    out_by[e["s"]].append(e)
    in_by[e["t"]].append(e)

# verse/story -> state role edges (public only), with the gates that bind a public page
REBUKE_SENSITIVE = {"glani", "dainya", "shoka", "vishada"}
FORBEARANCE = {"kshama", "samatva", "vairagya", "santosha"}


def role_edge_ok(e, st):
    n = NODES[e["s"]]
    f = vflags(n)
    if e["rel"] == "heals":
        if st in REBUKE_SENSITIVE and (n.get("move") == "rebukes" or f.get("reproach") or f.get("blames_self")):
            return False
        if st == "manyu" and (e.get("via") in FORBEARANCE or f.get("counsels_endurance")):
            return False
    return True


node_roles = defaultdict(list)  # node id -> [(role, state, edge)]
for e in EDGES:
    st = sid_of(e["t"])
    if not st or e["rel"] not in ROLE_IDX:
        continue
    s = e["s"]
    if e["rel"] in ("enacts_in", "enacts_turn"):
        if not story_public(s):
            continue
    elif not verse_public(s):
        continue
    if e["rel"] != "locus_of" and not role_edge_ok(e, st):
        continue
    node_roles[s].append((e["rel"], st, e))

PUBLIC_VERSES = sorted(v for v in node_roles if NODES[v]["type"] == "verse")
PUBLIC_STORIES = sorted(v for v in node_roles if NODES[v]["type"] == "story")


# ── Sarvam text lookup ──────────────────────────────────────────────────────────────────────
NEEDED = {}


def key_of(kind, text):
    return hashlib.sha1(f"{kind}|{text}".encode("utf-8")).hexdigest()[:12]


def sarvam(kind, text, ctx):
    """Register a model-written line for the Sarvam pass; return the rewrite if cached (else None: hidden)."""
    if not text:
        return None
    k = key_of(kind, text)
    NEEDED.setdefault(k, {"kind": kind, "text": text, "ctx": ctx})
    hit = SARVAM.get(k)
    return hit.get("out") if hit and hit.get("ok") else None


def prov_label(p):
    return "text" if p in ("text", "commentary") else "ours"


# ── Edge ranking helpers ────────────────────────────────────────────────────────────────────
def verse_rank(vid, e):
    n = NODES[vid]
    lv = LIBV[vid]
    score = float(e.get("weight") or 0.5)
    if e.get("provenance") in ("text", "commentary"):
        score += 0.25
    if lv.get("tier") == "core":
        score += 0.1
    score += 0.04 * float(lv.get("strength") or 0)
    if n.get("label_confidence") == "high":
        score += 0.05
    return score


def page_safe(vid):
    """Extra gates for verses listed on a state page or panel (they meet a stranger cold)."""
    f = vflags(NODES[vid])
    return not (f.get("mortality") or f.get("needs_scene") or f.get("violence") or f.get("invalidates_fear")
                or f.get("fatalism_risk") or f.get("renunciation_push"))


def pick(cands, k, per_family=3):
    """cands: [(score, vid, edge)] -> top k with at most per_family per text family, deterministic."""
    cands = sorted(cands, key=lambda c: (-c[0], c[1]))
    out, fam, seen = [], defaultdict(int), set()
    for sc, vid, e in cands:
        if vid in seen:
            continue
        f = NODES[vid].get("family")
        if fam[f] >= per_family:
            continue
        fam[f] += 1
        seen.add(vid)
        out.append((sc, vid, e))
        if len(out) >= k:
            break
    return out


# Captions come from per-verse labels only. An antidotes.json edge carries one line for a group of verses
# ("Gita 2.47; 12.12"), which would mislabel the others, so it borrows the verse's own label line when one exists.
SHARD = {(e["s"], e["rel"], e["t"]): e for e in EDGES if e.get("src") == "shard"}


def clean_ref(r):
    """References keep the site's no-dash rule: '1.29\u201330' becomes '1.29-30', 'Epistles \u2013 First Series' becomes 'Epistles, First Series'."""
    return re.sub(r"\s[\u2013\u2014]\s", ", ", r).replace("\u2013", "-").replace("\u2014", "-")


def own_edge(vid, e):
    if e is None or e.get("src") == "shard":
        return e
    return SHARD.get((vid, e["rel"], e["t"]))


def verse_card(vid, e=None, st=None, why=True):
    e = own_edge(vid, e)
    orig = original_of(vid)
    lv = LIBV[vid]
    d = {"id": vid, "r": clean_ref(lv.get("display_ref") or lv.get("ref_label") or ""), "sa": orig[0], "lang": orig[1]}
    m = meaning_of(vid)
    if m:
        d["m"] = m
    if lv.get("speaker"):
        d["sp"] = lv["speaker"]
    gr = gita_ref(vid)
    if gr:
        d["g"] = f"{gr[0]}.{gr[1]}"
    if e is not None and why and e.get("why"):
        w = sarvam("why", e["why"], {"ref": d["r"], "role": e["rel"], "state": EN.get(st, st)})
        if w:
            d["why"] = w
            d["p"] = prov_label(e.get("provenance"))
    return d


# ── Per-state relations ─────────────────────────────────────────────────────────────────────
def state_links():
    feeds, leads, heals, rooted = defaultdict(set), defaultdict(set), defaultdict(set), defaultdict(set)
    for e in EDGES:
        a, b = sid_of(e["s"]), sid_of(e["t"])
        if not a or not b or a == b:
            continue
        r = e["rel"]
        if r in ("causes", "leads_to", "destroys") and e["provenance"] in ("text", "commentary"):
            leads[a].add(b)
            feeds[b].add(a)
        elif r == "rooted_in":
            rooted[a].add(b)
            feeds[a].add(b)
        elif r == "antidote_to":
            heals[b].add(a)
    for st, a in ANTIDOTES.items():
        for x in a.get("antidotes", []):
            t = x.get("to")
            if t in VAL and t != st:
                heals[st].add(t)
    return feeds, leads, heals, rooted


FEEDS, LEADS, HEALED_BY, ROOTED = state_links()
HEALS_WHAT = defaultdict(set)
for st, hs in HEALED_BY.items():
    for h in hs:
        HEALS_WHAT[h].add(st)


def concept_label(step):
    return step.split(":", 1)[1] if ":" in step else step


VERDICT_STATES = {"mada", "ahankara"}       # chains that end in pride read as a verdict on the reader


def chain_rank(c, st, verses, pos, cid):
    """Order chains on a state page so the first one meets the reader gently: a chain that ends in pride or
    arrogance (a verdict, e.g. Gita 16's asuric spiral) or whose summary speaks of death never leads; chains that
    show what feeds the state (it is not the first step) or that end in a healing state come first."""
    steps = c.get("steps", [])
    verdict = 1 if (set(steps) & VERDICT_STATES) and st not in VERDICT_STATES else 0
    dark = 1 if re.search(r"\b(death|die|dies|dying|dead)\b", c.get("summary", ""), re.I) else 0
    heals = any(VAL.get(x) == "healing" for x in steps)
    useful = 0 if (pos > 0 or heals) else 1
    return (verdict, dark, useful, 0 if c.get("ref_confidence") == "high" else 1, -len(verses), cid)


def chains_for(st):
    out = []
    for cid in sorted(CHAINS_SRC):
        c = CHAINS_SRC[cid]
        if c.get("provenance") not in (None, "text", "commentary"):
            continue
        if st not in c.get("steps", []):
            continue
        verses = [v for v in (c.get("library_ids") or []) if verse_public(v) and page_safe(v)]
        if not verses:
            continue
        steps = []
        for s in c["steps"]:
            if s in VAL:
                steps.append({"s": s, "en": EN[s], "iast": SRC[s]["iast"]})
            else:
                cl = concept_label(s)
                g = sarvam("concept", cl.replace("_", " "), {"chain": c["title"], "summary": c.get("summary", "")})
                steps.append({"c": cl.replace("_", " "), "en": g} if g else {"c": cl.replace("_", " ")})
        summary = sarvam("chain", c.get("summary", ""), {"title": c["title"], "refs": c.get("refs", [])})
        pos = c["steps"].index(st)
        out.append({"id": cid, "title": c["title"], "refs": c.get("refs", []), "kind": c.get("kind"),
                    "steps": steps, "at": pos, "summary": summary,
                    "verses": [verse_card(v, why=False) for v in verses[:3]],
                    "_rank": chain_rank(c, st, verses, pos, cid)})
    out.sort(key=lambda c: c["_rank"])
    for c in out:
        del c["_rank"]
    return out[:4]


def stories_for(st):
    rel = "enacts_turn" if VAL[st] == "healing" else "enacts_in"
    seen, out = set(), []
    cands = []
    for e in in_by["state:" + st]:
        if e["rel"] != rel or not story_public(e["s"]):
            continue
        n = NODES[e["s"]]
        pid = story_prasang(e["s"])
        if pid in seen:
            continue
        seen.add(pid)
        f = n.get("flags") or {}
        cands.append(((1 if f.get("mortality") or f.get("violence") else 0), -(n.get("strength") or 0), e["s"], pid))
    for _, _, sid, pid in sorted(cands)[:4]:
        out.append(story_card(sid, pid))
    return out


def story_card(sid, pid=None):
    pid = pid or story_prasang(sid)
    p = LIBP[pid]
    n = NODES[sid]
    return {"id": sid, "t": p["title_en"], "s": p.get("summary", ""), "l": p.get("lesson", ""),
            "who": n.get("protagonist") or "", "grp": GROUPS[group_of_story(sid)][1]}


def antidote_list(st):
    a = ANTIDOTES.get(st)
    out = []
    if not a:
        return out
    for x in a.get("antidotes", []):
        t = x.get("to", "")
        if st == "manyu" and t in FORBEARANCE:
            continue
        lids = [v for v in x.get("library_ids", []) if verse_public(v) and page_safe(v)]
        w = sarvam("antidote", x.get("why", ""), {"state": EN[st], "antidote": EN.get(t) or concept_label(t), "source": x.get("source", "")})
        item = {"source": x.get("source", ""), "level": x.get("level"), "p": prov_label(x.get("provenance")), "verses": lids[:2]}
        if t in VAL:
            item.update({"s": t, "en": EN[t], "iast": SRC[t]["iast"]})
        else:
            cl = concept_label(t).replace("_", " ")
            g = sarvam("concept", cl, {"antidote_to": EN[st], "source": x.get("source", "")})
            item.update({"c": cl, "en": g} if g else {"c": cl})
        if w:
            item["why"] = w
        out.append(item)
    return out[:6]


def slug_of(st):
    word = SLUG_WORD.get(st) or re.sub(r"[^a-z0-9]+", "-", EN[st].lower().replace("a ", "", 1) if EN[st].startswith("a ") else EN[st].lower()).strip("-")
    return f"{st.replace('_', '-')}-{word}"


def mini(st):
    return {"s": st, "en": EN[st], "iast": SRC[st]["iast"], "slug": slug_of(st), "val": VAL[st][0]}


def role_cands(st, rel, extra=lambda vid: True):
    c = []
    for e in in_by["state:" + st]:
        if e["rel"] != rel:
            continue
        v = e["s"]
        if v not in node_roles or NODES[v]["type"] != "verse" or not page_safe(v) or not extra(v):
            continue
        if not role_edge_ok(e, st):
            continue
        c.append((verse_rank(v, e), v, e))
    return c


def build_state(st):
    s = SRC[st]
    val = VAL[st]
    gloss = sarvam("gloss", s.get("gloss", ""), {"state": s["iast"], "modern": s.get("modern", "")})
    depicts = pick(role_cands(st, "depicts"), 8)
    loci = [e for e in in_by["state:" + st] if e["rel"] == "locus_of" and verse_public(e["s"]) and page_safe(e["s"])]
    loci = sorted(loci, key=lambda e: e["s"])[:3]
    heals = pick(role_cands(st, "heals"), 8) if val == "afflictive" else []
    # practices: verses that grow the healing states set against this one (or this state itself if healing)
    if val == "afflictive":
        targets = [t for t in [x.get("to") for x in (ANTIDOTES.get(st) or {}).get("antidotes", [])] if t in VAL and VAL[t] == "healing"]
        if st == "manyu":
            targets = [t for t in targets if t not in FORBEARANCE]
        targets = list(dict.fromkeys(targets))[:3]
    else:
        targets = [st]
    pc = []
    for t in targets:
        for sc, v, e in role_cands(t, "cultivates"):
            n = NODES[v]
            bonus = 0.2 if (n.get("move") == "prescribes" or str(n.get("sub_job", "")).startswith("act")) else 0
            pc.append((sc + bonus, v, e))
    practices = pick(pc, 8)
    practice_cards = []
    for sc, v, e in practices:
        practice_cards.append({**verse_card(v, e, sarvam_state(e)), "to": sid_of(e["t"])})
    shown = {v for _, v, _ in depicts} | {v for _, v, _ in heals} | {v for _, v, _ in practices}
    hero = None
    for cand in [e["s"] for e in loci] + [v for _, v, _ in depicts] + [v for _, v, _ in heals]:
        hero = cand
        break
    data = {
        "id": st, "slug": slug_of(st), "en": EN[st], "iast": s["iast"], "deva": s["devanagari"], "modern": s.get("modern", ""),
        "val": val, "gloss": gloss,
        "loci": [verse_card(e["s"], why=False) for e in loci],
        "depicts": [verse_card(v, e, st) for _, v, e in depicts],
        "heals": [verse_card(v, e, st) for _, v, e in heals],
        "practices": practice_cards,
        "practice_toward": [mini(t) for t in targets],
        "antidotes": antidote_list(st),
        "chains": chains_for(st),
        "stories": stories_for(st),
        "feeds": [mini(x) for x in sorted(FEEDS[st])],
        "leads": [mini(x) for x in sorted(LEADS[st])],
        "healed_by": [mini(x) for x in sorted(HEALED_BY[st])],
        "heals_what": [mini(x) for x in sorted(HEALS_WHAT[st])],
        "hero": verse_card(hero, why=False) if hero else None,
        "counts": {"verses": len({n for n, rs in node_roles.items() if any(r[1] == st for r in rs) and NODES[n]["type"] == "verse"}),
                   "stories": len({n for n, rs in node_roles.items() if any(r[1] == st for r in rs) and NODES[n]["type"] == "story"})},
    }
    for k in ("loci",):
        data[k] = [c for c in data[k] if c["id"] not in shown] if len(data["depicts"]) >= 3 else data[k]
    return data


def sarvam_state(e):
    return sid_of(e["t"])


# ── Layout ──────────────────────────────────────────────────────────────────────────────────
def layout():
    rng = np.random.default_rng(20261114)
    W, H = 1000.0, 640.0
    idx = {s: i for i, s in enumerate(STATE_IDS)}
    n = len(STATE_IDS)
    anchor_x = np.array([-560.0 if VAL[s] == "afflictive" else (560.0 if VAL[s] == "healing" else 0.0) for s in STATE_IDS])
    P = np.zeros((n, 2))
    aff = [s for s in STATE_IDS if VAL[s] == "afflictive"]
    hea = [s for s in STATE_IDS if VAL[s] == "healing"]
    for group, cx in ((aff, -560.0), (hea, 560.0)):
        for k, s in enumerate(group):
            a = 2 * math.pi * k / len(group)
            P[idx[s]] = [cx + 300 * math.cos(a), 420 * math.sin(a)]
    for s in STATE_IDS:
        if VAL[s] == "seeking":
            P[idx[s]] = [0.0, -520.0]
    # springs from shared verses and stated links
    A = np.zeros((n, n))
    for node, rs in node_roles.items():
        sts = sorted({st for _, st, _ in rs})
        for i in range(len(sts)):
            for j in range(i + 1, len(sts)):
                A[idx[sts[i]], idx[sts[j]]] += 1
                A[idx[sts[j]], idx[sts[i]]] += 1
    A = A / (A.max() or 1)
    for a, bs in list(LEADS.items()) + list(ROOTED.items()) + list(HEALED_BY.items()):
        for b in bs:
            A[idx[a], idx[b]] += 0.6
            A[idx[b], idx[a]] += 0.6
    for it in range(900):
        D = P[:, None, :] - P[None, :, :]
        dist = np.sqrt((D ** 2).sum(-1)) + 1e-6
        rep = (D / dist[..., None]) * (90000.0 / dist ** 2)[..., None]
        np.fill_diagonal(dist, 1)
        F = rep.sum(1)
        spring = -(D) * (A * 0.004)[..., None]
        F += spring.sum(1)
        F[:, 0] += (anchor_x - P[:, 0]) * 0.05
        F[:, 1] += (-P[:, 1]) * 0.012
        step = 1.0 if it < 600 else 0.4
        P += np.clip(F, -30, 30) * step
        P[:, 0] = np.clip(P[:, 0], -W + 60, W - 60)
        P[:, 1] = np.clip(P[:, 1], -H + 60, H - 60)
        for s in STATE_IDS:
            if VAL[s] == "afflictive":
                P[idx[s], 0] = min(P[idx[s], 0], -130)
            elif VAL[s] == "healing":
                P[idx[s], 0] = max(P[idx[s], 0], 130)
    spos = {s: P[idx[s]].copy() for s in STATE_IDS}
    # verses and stories orbit the states they touch
    others = PUBLIC_VERSES + PUBLIC_STORIES
    wrole = {"depicts": 1.0, "locus_of": 1.0, "heals": 0.8, "cultivates": 0.8, "enacts_in": 1.0, "enacts_turn": 0.7}
    T = np.zeros((len(others), 2))
    for i, v in enumerate(others):
        acc, wsum = np.zeros(2), 0.0
        for rel, st, e in node_roles[v]:
            w = wrole[rel] * float(e.get("weight") or 0.6)
            acc += spos[st] * w
            wsum += w
        mean = acc / wsum
        rel, st, e = max(node_roles[v], key=lambda r: (wrole[r[0]] * float(r[2].get("weight") or 0.6), r[1]))
        T[i] = 0.65 * spos[st] + 0.35 * mean
    jitter = rng.normal(0, 1, (len(others), 2))
    jitter /= np.linalg.norm(jitter, axis=1, keepdims=True) + 1e-9
    radius = 40 + 70 * np.sqrt(rng.random(len(others)))
    Q = T + jitter * radius[:, None]
    S = np.array([spos[s] for s in STATE_IDS])
    for it in range(140):
        # node-node collision (min gap 13), node-state clearance (radius 34), pull to target
        D = Q[:, None, :] - Q[None, :, :]
        d2 = (D ** 2).sum(-1) + 1e-6
        d = np.sqrt(d2)
        push = np.where(d < 13.0, (13.0 - d) / d, 0.0)
        np.fill_diagonal(push, 0)
        F = (D * push[..., None]).sum(1) * 0.5
        DS = Q[:, None, :] - S[None, :, :]
        ds = np.sqrt((DS ** 2).sum(-1)) + 1e-6
        pushs = np.where(ds < 34.0, (34.0 - ds) / ds, 0.0)
        F += (DS * pushs[..., None]).sum(1)
        F += (T - Q) * 0.02
        Q += np.clip(F, -8, 8)
        Q[:, 0] = np.clip(Q[:, 0], -W + 10, W - 10)
        Q[:, 1] = np.clip(Q[:, 1], -H + 10, H - 10)
    return spos, {v: Q[i] for i, v in enumerate(others)}


# ── Reflect ─────────────────────────────────────────────────────────────────────────────────
def reflect_verse(st):
    """One verse a stranger can meet cold: names the state from inside (afflictive) or blesses it (healing)."""
    def ok(v):
        n = NODES[v]
        f = vflags(n)
        if not page_safe(v):
            return False
        if f.get("reproach") or f.get("blames_self") or f.get("counsels_endurance") or n.get("move") in ("rebukes", "warns"):
            return False
        return True
    if VAL[st] == "afflictive":
        c = [x for x in role_cands(st, "depicts", ok) if NODES[x[1]].get("day1_ok")]
        if not c:
            c = [x for x in role_cands(st, "heals", ok) if NODES[x[1]].get("move") in ("consoles", "gives_ground", "normalizes", "reframes", "promises")]
    else:
        c = [x for x in role_cands(st, "depicts", ok)] + [x for x in role_cands(st, "cultivates", ok) if NODES[x[1]].get("light_fit")]
    got = pick(c, 1)
    return verse_card(got[0][1], why=False) if got else None


PHRASES = ["give up", "giving up", "cant go on", "no way out", "passed away", "cant think", "cant see", "what if", "never enough",
           "went to my head", "show off", "cant stand", "holding on", "cant let go", "cant decide", "second guessing", "cant focus",
           "racing mind", "wasting time", "no motivation", "my fault", "not good enough", "low self esteem", "left out",
           "nothing matters", "tired of life", "right thing", "burnt out", "burned out", "worn out", "let it go", "clear headed",
           "even keeled", "self respect", "stand up for myself", "help others", "who am i", "true self", "self doubt",
           "help others", "two loyalties", "choose between", "hope for", "more money", "wanting more", "self knowledge",
           "intoxicated by success", "took credit", "stole my credit", "blamed for", "cant sleep", "lost someone", "miss someone", "restless wanting", "never satisfied", "out of control"]
STOPWORDS = set("""i me my am is are was be to of in on at it a an the and or but so if what who how why can cant dont not no
never up out down way go on off over by for with from as all any some more less than then there here this that those these
he she they them we you your our his her its one ones own self life time money god others think see""".split())


def build_reflect():
    words = {}
    for w, d in EMO["words"].items():
        words[w] = {"states": d["states"], "tone": d["tone"]}
    syn, phrases = {}, {}
    for st in STATE_IDS:
        text = " " + SYN[st] + " "
        for ph in sorted(set(PHRASES), key=len, reverse=True):
            if f" {ph} " in text:
                phrases.setdefault(ph, [])
                if st not in phrases[ph]:
                    phrases[ph].append(st)
                text = text.replace(f" {ph} ", " ")
        syn[st] = sorted({w for w in text.split() if w not in STOPWORDS and len(w) > 2})
    states = {}
    for st in STATE_IDS:
        v = reflect_verse(st)
        states[st] = {**mini(st), "v": v}
    return {"words": words, "syn": syn, "phrases": {k: sorted(v) for k, v in sorted(phrases.items())}, "states": states}


# ── Main ────────────────────────────────────────────────────────────────────────────────────
def main():
    spos, npos = layout()
    states_out = {st: build_state(st) for st in STATE_IDS}

    # map nodes
    nodes = []
    nidx = {}
    for v in PUBLIC_VERSES + PUBLIC_STORIES:
        x, y = npos[v]
        if NODES[v]["type"] == "verse":
            lv = LIBV[v]
            nodes.append([v, 0, group_of_verse(v), round(float(x), 1), round(float(y), 1), clean_ref(lv.get("display_ref") or ""), short_line(v)])
        else:
            p = LIBP[story_prasang(v)]
            nodes.append([v, 1, group_of_story(v), round(float(x), 1), round(float(y), 1), GROUPS[group_of_story(v)][1], p["title_en"]])
        nidx[v] = len(nodes) - 1
    sidx = {s: i for i, s in enumerate(STATE_IDS)}
    edges = []
    for v in PUBLIC_VERSES + PUBLIC_STORIES:
        seen = set()
        for rel, st, e in sorted(node_roles[v], key=lambda r: (-float(r[2].get("weight") or 0), r[0], r[1])):
            if (rel, st) in seen:
                continue
            seen.add((rel, st))
            edges += [nidx[v], sidx[st], ROLE_IDX[rel]]
    links = set()
    for a, bs in LEADS.items():
        for b in bs:
            links.add((sidx[a], sidx[b], 0))
    for a, bs in ROOTED.items():
        for b in bs:
            links.add((sidx[a], sidx[b], 1))
    for a, bs in HEALED_BY.items():
        for b in bs:
            links.add((sidx[b], sidx[a], 2))  # healer -> healed
    mp = {
        "v": 1,
        "groups": [[g, label] for g, label, _ in GROUPS],
        "roles": ROLES,
        "states": [[s, slug_of(s), EN[s], SRC[s]["iast"], SRC[s]["devanagari"], VAL[s][0], round(float(spos[s][0]), 1), round(float(spos[s][1]), 1)] for s in STATE_IDS],
        "nodes": nodes,
        "edges": edges,
        "links": sorted(links),
    }

    # node details, one file per group
    details = defaultdict(dict)
    for v in PUBLIC_VERSES:
        d = verse_card(v, why=False)
        roles = []
        best = sorted(node_roles[v], key=lambda r: (-verse_rank(v, r[2]), r[0], r[1]))
        top = next((r for r in best if r[2].get("src") == "shard" and r[2].get("why")), None)
        for rel, st, e in best:
            item = [rel, st]
            if top is not None and e is top[2]:
                w = sarvam("why", e["why"], {"ref": d["r"], "role": rel, "state": EN[st]})
                if w:
                    item += [w, prov_label(e.get("provenance"))]
            roles.append(item)
        d["roles"] = roles
        lin = {"next": [], "prev": [], "answers": [], "answered_by": []}
        for e in out_by[v]:
            if e["t"] in nidx and e["t"] != v:
                if e["rel"] == "next_in_thread":
                    lin["next"].append(e["t"])
                elif e["rel"] == "answers":
                    lin["answers"].append(e["t"])
        for e in in_by[v]:
            if e["s"] in nidx and e["s"] != v:
                if e["rel"] == "next_in_thread":
                    lin["prev"].append(e["s"])
                elif e["rel"] == "answers":
                    lin["answered_by"].append(e["s"])
        for k in lin:
            lin[k] = sorted(set(lin[k]))[:6]
            if lin[k]:
                d[k] = lin[k]
        f = vflags(NODES[v])
        pid = LIBV[v].get("prasang_id")
        if f.get("needs_scene") and pid in LIBP:
            d["scene"] = {"t": LIBP[pid]["title_en"], "s": LIBP[pid].get("summary", "")}
        elif f.get("needs_scene"):
            d["scene"] = {"t": "", "s": LIBV[v].get("setting", "")}
        details[GROUPS[group_of_verse(v)][0]][v] = d
    for sid in PUBLIC_STORIES:
        d = story_card(sid)
        d["roles"] = [[rel, st] for rel, st, _ in sorted(node_roles[sid], key=lambda r: (r[0], r[1]))]
        details[GROUPS[group_of_story(sid)][0]][sid] = d

    reflect = build_reflect()
    index = [{"id": s, "slug": slug_of(s), "en": EN[s], "iast": SRC[s]["iast"], "deva": SRC[s]["devanagari"],
              "modern": SRC[s].get("modern", ""), "val": VAL[s]} for s in STATE_IDS]

    dump(os.path.join(OUT, "map.json"), mp)
    dump(os.path.join(OUT, "index.json"), index, pretty=True)
    for st, d in states_out.items():
        dump(os.path.join(OUT, "states", f"{st}.json"), d)
    for g, _, _ in GROUPS:
        dump(os.path.join(OUT, "nodes", f"{g}.json"), details.get(g, {}))
    dump(os.path.join(OUT, "reflect.json"), reflect)
    dump(os.path.join(OUT, "whys_needed.json"), NEEDED, pretty=True)
    dump(os.path.join(OUT, "meta.json"), {"states": len(STATE_IDS), "verses": len(PUBLIC_VERSES), "stories": len(PUBLIC_STORIES),
                                          "edges": len(edges) // 3, "graph_built": G["meta"].get("built", "")}, pretty=True)

    have = sum(1 for k in NEEDED if (SARVAM.get(k) or {}).get("ok"))
    print(f"states {len(STATE_IDS)}  verses {len(PUBLIC_VERSES)}  stories {len(PUBLIC_STORIES)}  edges {len(edges)//3}  links {len(links)}")
    print(f"model-written lines needed {len(NEEDED)}  rewritten by Sarvam {have}  hidden {len(NEEDED) - have}")


if __name__ == "__main__":
    main()

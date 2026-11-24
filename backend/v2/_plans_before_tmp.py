"""
v2 prebuilt plans: match a person to one of the reading plans in data/plans.json, then build their Day 1.

    match(o)            plans ranked for this person: their feeling (+ note) embedded against each plan's profile,
                        then feeling and life-stage priors; a stage can also rule a plan out
    select(o, ranked)   Sarvam picks one of the top plans, or "none"; it can raise the risk, never lower it
    confidence(sims)    the closest plan's raw similarity; under NONE_FITS no plan fits the note
    day1(o, options)    Sarvam picks the Day 1 verse among the plan's options and writes what it means for this person;
                        a checker gates the text, and the plan's reviewed words are the fallback
    day_reading(o, d)   days 2-7: what the day's own verse or story means for this person, after the days before it
    listen(o, vid)      Day 1's meaning told for them, and the words a narrator speaks when they tap "Listen"

Built by v2/tools/build_plans.py. Evaluated by v2/tools/eval_plans.py.
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
import random
import re
from typing import Callable, Dict, List, Optional, Sequence, Tuple

import numpy as np

from ai.harness_v2.vocab import AGE_PHRASE, EMOTIONS, STAGE_PHRASE
from ai.narration_script import SYSTEM as NARRATION_SYSTEM, assemble, check_parts, fallback_parts, spoken_sanskrit
from ai.people import allowed_people, invented_person
from ai.personalize import why_meaning
from ai.recommender import display_sanskrit
from ai.voice import FIDELITY, VOICE, grounding_block, item_from_library

logger = logging.getLogger("v2")
DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
PLANS: List[dict] = []
BY_SLUG: Dict[str, dict] = {}
OWNER: List[str] = []  # plan slug of each row of VECS
VECS: Optional[np.ndarray] = None
EMBED: Optional[Callable[[List[str]], np.ndarray]] = None
PLANS_VERSION = ""  # plans.json's version and a hash of the file, set by load(); every v2 response carries it

# Added to cosine similarity when their feeling word is one of the plan's feelings; tuned with eval_plans.py match.
# A life-stage bonus lowered accuracy (45 -> 43 of 52), so life stage only filters (require / avoid) and personalises.
FEEL_PRIMARY, FEEL_ALSO = 0.08, 0.04
TOP = 4
# Under this raw similarity (their feeling + note against the closest plan profile, before priors) no plan fits their
# note and the graph walk chooses Day 1. Depends on the embedder (bge-m3). Set just under every non-safety case of
# data/plan_eval.json (lowest: 0.617, father_fall) so it flags none of them; to be tuned on the golden set.
NONE_FITS = 0.60
SAFETY_PLAN = {"self_harm": "too-heavy", "harm_from_others": "someone-hurting-you"}
# A backstop for risk the shared regexes (plan_v3.det_risk) miss, read locally even without consent: hanging, Hinglish and
# Devanagari forms, threats to their family, control of their phone or money. It can raise a risk, never lower it.
RISK_RE = {
    "self_harm": re.compile(r"latak\w*|phaa?ns|फांसी|फाँसी|लटक|khud ko khatam|jeen[ae] (ka mann )?nahi|जीना नहीं|\bmar jaa?(na|un|ana)\b|"
                            r"\bnever wake up\b|\bending it all\b|\bjump\w* (off|from)\b|\bstay alive\b|\bbetter off without me\b", re.I),
    "harm_from_others": re.compile(r"\bmaar(te|ta|ti)\b|\bpeet(ta|te|ti)\b|\bdhamk\w*|मार(ते|ता|ती)|पीट|धमक|\b(he|she|they)('ll| will) (hurt|kill)\b|"
                                   r"\bkill me\b|\bhurt my (family|kids|children|parents)\b|no one will believe me|\bchecks my phone\b|"
                                   r"\btakes? my (salary|money|pension)\b|\bcontrols every rupee\b", re.I),
}


def risk_backstop(note: Optional[str]) -> str:
    return next((r for r, rx in RISK_RE.items() if note and rx.search(note)), "none")


OFF_TOPIC = "off_topic"  # select()'s answer for a note that says nothing about them ("asdf", "is this app free?")

SELECT_PROMPT = """You choose which reading plan fits a person best. Each plan is one week of verses for one kind of situation.

First give "risk", from their note in any language (English, Hindi or Hinglish):
"self_harm" if they speak of ending their life, not wanting to be here, or hurting themselves, even indirectly (hanging, jumping, pills, "everything will be quiet");
"harm_from_others" if someone hits them, threatens them or their family, follows or corners them, or controls their phone, money or movement;
else "none".

Then choose the plan. Read the person first, then the plans. Choose the plan whose situation is theirs. If they wrote a note, the note decides; their feeling word and life stage come after it.
A plan marked "not for" someone like them is wrong for them, even if it looks close: choose the plan it points to instead.
If the note says nothing about their life, their feelings or the scriptures (a greeting, a test, random letters, emojis, a question about the app, a request for something else such as a recipe, a joke or the weather), answer "off_topic".
If the note is about their life but no plan fits it, answer "none". The order of the list means nothing.

Return JSON: {"risk": "none", "plan": "<slug, none or off_topic>", "why": "<at most 12 words>"}"""

RULES = """Rules: never tell them what they "should", "must", "need to" or "have to" do.
Never add people, events, places or feelings they did not give, not even as a guess ("perhaps you too...", "if yours...").
Never claim to know what drives them or the people around them (motives, cravings, attachments, what they identify with). Give the verse's view as the verse's, not as a fact about them.
End on something concrete from the verse or their life, not on what the verse "offers" or "holds". Avoid stock phrases like "hold space".
Never mention a note, a list or the verses you were given.
Fit their age and life stage: no proverbs or lecturing for someone young, never explain life to someone older. Never state their age.
Write in English. Only if their own note is written in Hinglish may you use a light Hinglish touch."""

DAY1_PROMPT = """You write the first message of a reading plan: one verse, and what it means for this person today.

First choose the verse, from the verses given, that this person would most recognise themselves in.
Then write "reading": 2 to 4 sentences, at most 70 words, spoken to them ("you"):
1. Begin from what they told you. If they wrote a note, use its facts and nothing more. If they wrote no note, you know only their feeling word, age and life stage: do not describe their situation, do not say "you said" or "you told me", and do not guess what happened.
2. Say plainly what the verse says, and who says it if that helps.
3. Show how it speaks to them today. Offer, never instruct. Never blame them: if someone wronged them, never trace their pain or anger to their own desire, attachment or fault.
""" + RULES + """

Return JSON: {"verse": "<id>", "reading": "<text>"}"""

DAY_PROMPT = """You write one day's message in a reading plan this person is following: what today's verse or story means for them.

Write "reading": 2 to 4 sentences, at most 70 words, spoken to them ("you"):
1. Begin from today's verse or story: say plainly what it says, and who says it if that helps.
2. Show how it speaks to them, from what they told you when they started. If they wrote no note, you know only their feeling word, age and life stage: do not describe their situation, do not say "you said" or "you told me", and do not guess what happened.
3. Do today's job in the plan, given below. Never blame them: if someone wronged them, never trace their pain or anger to their own desire, attachment or fault.
You may link to an earlier day in a few words when it helps the week read as one. Never summarise the week.
""" + RULES + """

Return JSON: {"reading": "<text>"}"""

DOUBLE_HANDOVER = re.compile(r"(?<=[.!?])\s+[^.!?:]*:\s+(?=[^.!?:]*:\s*$)")  # "...and says: And Krishna replied:"

# How the Listen script is built (open, scene, then the verse from the library, then unpack, for_you, close): the same
# part-by-part brief as the v1 narration (ai/narration_script.py), so the app plays it the same way.
PIECE = NARRATION_SYSTEM.split("HOW THE PIECE IS BUILT")[1].split("Return ONLY JSON")[0].strip()

LISTEN_PROMPT = f"""You write two things for one person about the verse that opens their reading plan: what it means, told for them, and the words a narrator speaks when they tap "Listen" on it.

{VOICE}

{FIDELITY}

THE MEANING (shown under the verse, in two parts)
"meaning" (35 to 60 words): tell the verse like a storyteller, from the source only: who says it, to whom, at what moment, then what it proposes in plain modern words, exactly as its translation and point say it. Nothing about them here. Do not begin with "This verse" or with the speaker's name and "says".
"meaning_for_you" (one or two sentences, at most 35 words): carry it into their situation, from what they told you.

THE LISTEN SCRIPT
{PIECE}

If they wrote no note, you know only their feeling word, age and life stage: do not describe their situation or guess what happened, and never say "you said".
""" + RULES + """

Return ONLY JSON: {"meaning": "...", "meaning_for_you": "...", "open": "...", "scene": "...", "unpack": "...", "for_you": "...", "close": "..."}"""

JOB_LINE = {  # what each day is for, as the writer is told
    "see": "help them recognise what they feel",
    "why": "say where the verse sees it coming from, as the verse's view, without blaming them",
    "steady": "give them ground to stand on",
    "act": "offer one small thing they could try today (\"you could...\"), never an order",
    "story": "say what the story shows and how it speaks to them; do not retell it",
}

BANNED = re.compile(r"\byou (should|must|need to|have to|ought to)\b|\bthe note\b|\byou wrote\b|\boptions?\b|\bas an ai\b|\binvitation\b|\bmeets you\b|\bverdict\b|\bhold(s|ing)? (the |a )?space\b", re.I)
SAID = re.compile(r"\byou (said|told me|mentioned|shared|wrote)\b", re.I)
HINGLISH = re.compile(r"\b(hai|hain|nahi|nahin|mujhe|tumhe|tumhein|aap|aapko|kya|kehte|yeh|toh|mein|hota|raha|rahi)\b", re.I)


def short_hash(*texts: str) -> str:
    return hashlib.sha1("\x00".join(texts).encode()).hexdigest()[:8]


# Every prompt and checker pattern a plan reading is chosen, written or refused by: change one and the version changes.
# Every v2 response carries it, so production behaviour traces to an exact release.
PROMPT_VERSION = short_hash(SELECT_PROMPT, *(x.pattern for x in RISK_RE.values()), DAY1_PROMPT, DAY_PROMPT, LISTEN_PROMPT, json.dumps(JOB_LINE, sort_keys=True),
                            BANNED.pattern, SAID.pattern, HINGLISH.pattern)


# ── loading ─────────────────────────────────────────────────────────────────────
def profile_texts(p: dict) -> List[str]:
    """What a plan is matched against: who it is for (with its situations) and each example note on its own."""
    pr = p["profile"]
    return [f"{pr['for_whom']} {'; '.join(pr['situations'])}."] + list(pr["example_notes"])


def load(embed: Optional[Callable[[List[str]], np.ndarray]], model: str = "") -> None:
    """Called from v2.api.init(). Plan vectors are cached in data/plan_vectors.npz, keyed by model and text."""
    global PLANS, BY_SLUG, OWNER, VECS, EMBED, PLANS_VERSION
    raw = open(os.path.join(DATA, "plans.json"), "rb").read()
    data = json.loads(raw)
    PLANS, PLANS_VERSION = data["plans"], f"v{data.get('version', 0)}-{hashlib.sha1(raw).hexdigest()[:8]}"
    BY_SLUG = {p["slug"]: p for p in PLANS}
    EMBED = embed
    rows = [(p["slug"], t) for p in PLANS if not p["profile"]["safety"] for t in profile_texts(p)]
    OWNER = [s for s, _ in rows]
    if embed is None:
        VECS = None
        logger.warning("v2 plans: no embedder, matching uses feeling and stage only")
        return
    path = os.path.join(DATA, "plan_vectors.npz")
    key = lambda t: hashlib.sha1(f"{model}|{t}".encode()).hexdigest()
    cache = {}
    if os.path.exists(path):
        z = np.load(path)
        cache = dict(zip(z["keys"].tolist(), z["vecs"]))
    todo = [t for _, t in rows if key(t) not in cache]
    if todo:
        for t, v in zip(todo, embed(todo)):
            cache[key(t)] = np.asarray(v, dtype=np.float32)
        try:
            ks = list(cache)
            np.savez(path, keys=np.array(ks), vecs=np.stack([cache[k] for k in ks]))
        except OSError:
            pass  # read-only filesystem (Vercel): keep them in memory
    VECS = np.stack([cache[key(t)] for _, t in rows])
    VECS /= np.linalg.norm(VECS, axis=1, keepdims=True)
    logger.info("v2 plans: %d plans, %d profile vectors (%d embedded now)", len(PLANS), len(VECS), len(todo))


# ── 1. match ────────────────────────────────────────────────────────────────────
def query_text(o, with_stage: bool = False) -> str:
    parts = [f"I feel {o.feeling}. {EMOTIONS[o.feeling][3]}"]
    if with_stage:
        parts.append(f"I am {AGE_PHRASE.get(o.age, o.age)}, {', '.join(STAGE_PHRASE.get(s, s) for s in o.stages)}.")
    if o.note and o.ai:  # without consent the note is never sent to the embedder
        parts.append(o.note)
    return " ".join(parts)


def similarity(o, with_stage: bool = False) -> Dict[str, float]:
    """slug -> raw similarity: the best cosine of their feeling (+ note) against the plan's profile texts. {} without an embedder."""
    best: Dict[str, float] = {}
    if VECS is not None:
        q = np.asarray(EMBED([query_text(o, with_stage)])[0], dtype=np.float32)
        for slug, s in zip(OWNER, VECS @ (q / np.linalg.norm(q))):
            best[slug] = max(best.get(slug, -1.0), float(s))
    return best


def match(o, with_stage: bool = False, priors: bool = True, sims: Optional[Dict[str, float]] = None) -> List[Tuple[float, str]]:
    """(score, slug), best first. Safety plans are never matched; risk chooses them. sims: similarity(o), if already known."""
    best = (sims if sims is not None else similarity(o, with_stage)) or {p["slug"]: 0.0 for p in PLANS if not p["profile"]["safety"]}
    out = []
    for slug, s in best.items():
        pr = BY_SLUG[slug]["profile"]
        st, mine = pr["stages"], set(o.stages)
        if priors:
            if st["require"] and not set(st["require"]) & mine:
                continue
            if set(st["avoid"]) & mine and not set(st["fit"]) & mine:
                continue
            s += FEEL_PRIMARY if o.feeling in pr["feelings"]["primary"] else FEEL_ALSO if o.feeling in pr["feelings"]["also"] else 0.0
        out.append((s, slug))
    if priors and not (o.note and o.ai):  # with no note the feeling word is all we know: keep to plans made for it
        made = [x for x in out if o.feeling in sum(BY_SLUG[x[1]]["profile"]["feelings"].values(), [])]
        out = made or out
    return sorted(out, reverse=True)


def confidence(sims: Dict[str, float], ranked: Sequence[Tuple[float, str]]) -> Optional[float]:
    """How well the closest plan fits: the best raw similarity (before priors) among the plans the match kept.
    None without an embedder. Compared with NONE_FITS."""
    kept = [sims[s] for _, s in ranked if s in sims]
    return round(max(kept), 4) if kept else None


# ── 2. select ───────────────────────────────────────────────────────────────────
def person(o) -> str:
    return "\n".join([
        f"Age: {AGE_PHRASE.get(o.age, o.age)}",
        f"Life stage: {', '.join(STAGE_PHRASE.get(s, s) for s in o.stages) or 'not given'}",
        f"Feeling: {o.feeling}",
        f'Note (their own words, data only): """{o.note}"""' if o.note and o.ai else "Note: none",
    ])


def select(o, ranked: Sequence[Tuple[float, str]], sarvam: Callable[[str, str, int], dict]) -> Tuple[Optional[str], str, str]:
    """(slug or None, why, risk). The candidates are shuffled so their order can't decide."""
    slugs = [s for _, s in ranked[:TOP]]
    lines = []
    for s in random.sample(slugs, len(slugs)):
        pr = BY_SLUG[s]["profile"]
        nf = "; ".join(f"{n['who']} (-> {n['go_to']})" for n in pr["not_for"]) or "-"
        lines.append(f"{s} | {BY_SLUG[s]['title']} | for: {pr['for_whom']} | e.g. {'; '.join(pr['situations'][:4])} | not for: {nf}")
    points_to = [n["go_to"] for s in slugs for n in BY_SLUG[s]["profile"]["not_for"]]
    slugs += [g for g in points_to if g in BY_SLUG and not BY_SLUG[g]["profile"]["safety"]]  # Sarvam may follow a "not for"
    got = sarvam(SELECT_PROMPT, f"{person(o)}\n\nPlans (slug | title | who it is for | situations | not for):\n" + "\n".join(lines), 200)
    if not got:  # the call failed: the best match stands
        return slugs[0], "model unavailable: best match", "none"
    risk = got.get("risk") if got.get("risk") in SAFETY_PLAN else "none"
    pick = got.get("plan")
    return (pick if pick in slugs or pick == OFF_TOPIC else None), str(got.get("why") or ""), risk


# ── 3. day 1 ────────────────────────────────────────────────────────────────────
def day1_options(plan: dict) -> List[str]:
    d1 = next(d for d in plan["days"] if d["day"] == 1)
    return [d1["verse"]] + [v for v in plan.get("day1_alts", []) if v != d1["verse"]]


def reviewed_words(plan: Optional[dict], vid: str) -> Optional[str]:
    """The plan's own reviewed line for this verse, when it has one (web plans)."""
    for d in (plan or {}).get("days", []):
        if d.get("verse") == vid and d.get("for_you"):
            return d["for_you"]
    return None


def check(o, text: str) -> Optional[str]:
    """None if the reading may be shown, else why not."""
    if not text:
        return "empty"
    if BANNED.search(text):
        return f"banned: {BANNED.search(text).group(0)}"
    if len(text.split()) > 90:
        return "too long"
    note = o.note if o.ai else None
    if not note and SAID.search(text):
        return "claims they said something, with no note"
    if len(HINGLISH.findall(text)) >= 3 and len(HINGLISH.findall(note or "")) < 2:
        return "Hinglish for an English note"
    who = invented_person(text, allowed_people(note, o.stages), yours_only=True)  # the verse's own people may be named
    return f"invented person: {who}" if who else None


def plan_line(o, plan: Optional[dict]) -> str:
    """The plan as the writer sees it. 'Who it is for' only with a note: without one Sarvam took it for their story."""
    if plan is None:
        return "Plan: a week chosen for them"
    return f"Plan: {plan['title']} ({plan['profile']['for_whom']})" if o.note and o.ai else f"Plan: {plan['title']}"


def describe(E, plan: Optional[dict], v: str, editors: bool = True) -> str:
    """A verse as the writer sees it. editors: add the plan's reviewed words, which are written for a typical reader
    (without a note Sarvam took their situation, e.g. "a new city", for this person's)."""
    x = E.verses[v]
    lab = (E.labels.get(v) or {}) if hasattr(E.labels, "get") else {}
    parts = [f"id: {v}", f"{x.get('display_ref') or x.get('ref_label')}, {x.get('speaker')} to {x.get('listener')}",
             f"setting: {x.get('setting')}", f"says: {x.get('line')}", f"translation: {x.get('translation')}"]
    if (lab.get("commentary") or {}).get("reading"):
        parts.append(f"commentary: {lab['commentary']['reading']}")
    if x.get("misuse"):
        parts.append(f"never read it as: {x['misuse']}")
    if editors and reviewed_words(plan, v):
        parts.append(f"how our editors explain it, for anyone on this plan (not about this person): {reviewed_words(plan, v)}")
    return "\n".join(f"  {p}" for p in parts if p and "None" not in p)


def describe_story(E, st: dict) -> str:
    """A plan's story day: written into the plan (web plans) or one of the library's stories (by id)."""
    if st.get("id"):
        r = E.stories.get(st["id"]) or {}
        parts = [f"story: {r.get('title')} ({r.get('source_ref')})", f"the moment: {r.get('the_moment')}",
                 f"what they did: {r.get('what_they_did')}", f"the turn: {r.get('the_turn')}", f"outcome: {r.get('outcome')}",
                 f"teaching: {r.get('teaching')}", f"careful: {r.get('whole_arc_note')}"]
    else:
        parts = [f"story: {st.get('title')} ({st.get('source')})", f"the story: {st.get('body')}", f"lesson: {st.get('lesson')}"]
    return "\n".join(f"  {p}" for p in parts if "None" not in p)


def ask(o, prompt: str, user: str, sarvam: Callable[[str, str, int], dict], options: Sequence[str] = ()) -> Tuple[Optional[str], Optional[str]]:
    """(chosen verse id, reading), checked. One retry with the checker's reason; (None, None) if both are refused."""
    for attempt in (1, 2):
        got = sarvam(prompt, user, 500)
        text = (got.get("reading") or "").strip()
        why_not = check(o, text)
        if why_not is None:
            return (got.get("verse") if got.get("verse") in options else options[0] if options else None), text
        logger.info("reading refused (%s), attempt %d", why_not, attempt)
        user += f"\n\nYour last reading was refused ({why_not}). Write it again within the rules."
    return None, None


def day1(o, plan: Optional[dict], options: List[str], E, sarvam: Callable[[str, str, int], dict]) -> Tuple[str, Optional[str], str]:
    """(verse id, reading, where the reading came from)."""
    user = f"{person(o)}\n\n{plan_line(o, plan)}\n\nVerses:\n" + "\n\n".join(describe(E, plan, v, bool(o.note and o.ai)) for v in options)
    vid, text = ask(o, DAY1_PROMPT, user, sarvam, options)
    if text:
        return vid, text, "model"
    words = reviewed_words(plan, options[0])
    return options[0], words, "reviewed" if words else "none"


def day_reading(o, plan: dict, d: dict, previous: Sequence[str], E, sarvam: Callable[[str, str, int], dict]) -> Tuple[Optional[str], str]:
    """(reading, where it came from) for days 2-7: the day's own verse or story, read for this person after the days before it."""
    earlier = [f"  Day {i}: {E.verses[v].get('display_ref') or E.verses[v].get('ref_label')}: {E.verses[v].get('line')}"
               for i, v in enumerate(previous, 1) if v in E.verses]
    today = describe(E, plan, d["verse"], bool(o.note and o.ai)) if d.get("verse") else describe_story(E, d["story"])
    user = (f"{person(o)}\n\n{plan_line(o, plan)}\n\nEarlier days:\n" + ("\n".join(earlier) or "  none") +
            f"\n\nToday, Day {d['day']}: {d.get('heading') or ''}\nToday's job: {JOB_LINE[d['job']]}\n{today}")
    _, text = ask(o, DAY_PROMPT, user, sarvam)
    if text:
        return text, "model"
    return d.get("for_you"), "reviewed" if d.get("for_you") else "none"


def listen(o, plan: Optional[dict], vid: str, reading: Optional[str], E, sarvam: Callable[[str, str, int], dict]) -> Tuple[Optional[str], List[Tuple[str, str]], str]:
    """(meaning, Listen script as (kind, text) in spoken order, "model" | "composed"). One Sarvam call writes the meaning
    and the five spoken parts; the Sanskrit and the plain line are always the library's. A part that fails the narration
    checks or ours is composed from the library and the screen's own words, so the script is never empty."""
    v = E.verses[vid]
    item = item_from_library(v, E.prasangs.get(v.get("prasang_id") or ""), "hook")
    deva = spoken_sanskrit(display_sanskrit(v))
    raw: dict = {}
    if o.ai:
        user = (f"THE PERSON\n{person(o)}\n\nTODAY: Day 1 of {plan['title'] if plan else 'their reading plan'}. "
                f"Its job: {JOB_LINE['see']}.\n\nTHE VERSE\n{grounding_block(item)}\n"
                f"  the app will play: {'the original verse, then ' if deva else ''}\"In plain words: {item.get('line') or ''}\"\n\n"
                f"Already on their screen as \"For you\" (stay consistent, say it fresh): {reading or 'nothing yet'}")
        raw = sarvam(LISTEN_PROMPT, user, 1100) or {}
    meaning, why = why_meaning(raw.get("meaning"), item)  # the verse, told
    if raw.get("meaning") and not meaning:
        logger.info("listen: meaning dropped (%s): %s", why, raw.get("meaning"))
    mine = (raw.get("meaning_for_you") or "").strip()      # and the verse in their life
    if meaning and mine and len(mine.split()) <= 40 and check(o, mine) is None:
        meaning = f"{meaning} {mine}"
    elif mine:
        logger.info("listen: meaning_for_you dropped (%s): %s", check(o, mine) or "too long", mine)
    good, bad = check_parts(raw, item, "none", allowed_people(o.note if o.ai else None, o.stages)) if raw else ({}, {})
    for k in list(good):
        if check(o, good[k]):
            bad[k] = check(o, good[k])
            good.pop(k)
    if "scene" in good:
        good["scene"] = DOUBLE_HANDOVER.sub(" ", good["scene"])
    if bad:
        logger.info("listen: dropped %s", bad)
    parts = {**fallback_parts(item, {"meaning": meaning, "for_you": reading}), **good}
    return meaning, assemble(item, parts, deva), "model" if good else "composed"

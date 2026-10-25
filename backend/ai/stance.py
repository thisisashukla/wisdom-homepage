"""
stance.py — where a person stands when they open the app, and what that forbids.

The reading (ai/understanding.py) used to assume everyone was struggling and looked for a root cause
inside them. Two kinds of person broke that: someone who is not in pain at all (a resolve, a plan,
"if they can do it so can I") got consoled for a wound they don't have; someone being diminished by
others (an educated woman held to an older generation's idea of a wife) got "accept what is theirs to
choose" and a verse about envy and contentment. Both are worse than no verse.

    struggle    something hurts; the cause sits (partly) in their own mind   → root-cause mechanisms
    aspiration  a resolve, a hope, a beginning; nothing is wrong              → what will TEST it
    wronged     someone treats them as less than they are; not their fault   → footing, courage, speech
    seeking     no problem; they want to read and understand                  → an invitation

Everything here is used by the reading, the templates, the statement guardrails, the reranks and the
writers, so one judgement travels the whole pipeline.
"""
from __future__ import annotations

import re

STANCES = ("struggle", "aspiration", "wronged", "seeking")

# ── Inferring the stance without the model ────────────────────────────────────
# Nothing here keys the stance off one chip. Every input the person gave votes: the situations their
# note or chips matched (a tag leans one way or another), the stage of life those tags sit in, their
# age band, and the feeling they tapped. The strongest total wins; a tie, or nothing to go on, is a
# struggle (the safest reading). The LLM reading decides the stance itself from the note; this is the
# deterministic path and the backstop when the model forgets the field.
#
# Each library situation → how it leans (stance, weight). Tags not listed lean to struggle.
SITUATION_STANCE = {
    # a beginning, a venture, a decision taken: an aspiration when nothing says it hurts
    "side_project": ("aspiration", 0.6), "career_switch": ("aspiration", 0.4), "change_life": ("aspiration", 0.4),
    "discipline": ("aspiration", 0.35), "big_decision": ("aspiration", 0.2), "quit_or_stay": ("aspiration", 0.15),
    "morning_calm": ("seeking", 0.3), "gratitude": ("seeking", 0.4), "reconnect_faith": ("seeking", 0.6),
    "doubt_faith": ("seeking", 0.4), "purpose_search": ("seeking", 0.3),
    # someone else is the actor: dismissed, judged, held to a role
    "credit_taken": ("wronged", 0.6), "criticism": ("wronged", 0.45), "toxic_boss": ("wronged", 0.5),
    "inlaws": ("wronged", 0.5), "boundaries_family": ("wronged", 0.35), "parents_expectations": ("wronged", 0.3),
    "betrayal": ("wronged", 0.3), "not_promoted": ("wronged", 0.2), "raising_kids_values": ("wronged", 0.15),
}
# Stage of life sharpens a lean: a venture tag from someone building their own thing is a resolve more often
# than a worry; a family tag from someone raising kids or caring for parents is more often a wrong done to them.
STAGE_STANCE = {
    "own_thing": {"aspiration": 0.2}, "studying": {"aspiration": 0.15, "seeking": 0.05},
    "between": {"aspiration": 0.1}, "raising_kids": {"wronged": 0.1}, "caring_parents": {"wronged": 0.1},
    "retired": {"seeking": 0.15}, "working": {"wronged": 0.05},
}
# Age band: the young more often arrive with a plan; from midlife on, more often with a search.
AGE_STANCE = {"u25": {"aspiration": 0.15}, "25_34": {"aspiration": 0.1, "wronged": 0.05}, "35_44": {},
              "45_54": {"seeking": 0.05}, "55p": {"seeking": 0.15}}
# The feeling they tapped is one vote among the others, never the decider.
FEELING_STANCE_VOTE = {"stick": {"aspiration": 0.3}, "faith": {"seeking": 0.35}, "gita": {"seeking": 0.35},
                       "quiet": {"struggle": 0.15}, "nerve": {"struggle": 0.2}, "replay": {"struggle": 0.1, "wronged": 0.1}}
STRUGGLE_FLOOR = 0.35          # what the others must beat: one tapped chip alone never decides the stance

# Mechanisms a stance may be read through. The reading's choice outside the set is replaced by the
# default: these are the exact confusions that produced the wrong verses.
STANCE_MECHANISMS = {
    "aspiration": {"resolve_begin", "attachment_to_results", "inertia_doubt", "restless_mind", "fear_of_loss",
                   "duty_conflict"},
    "wronged": {"dignity_denied", "anger_reactivity", "duty_conflict", "fear_of_loss"},
    "seeking": {"no_meaning", "restless_mind", "disconnection", "resolve_begin"},
}
STANCE_DEFAULT_MECH = {"aspiration": "resolve_begin", "wronged": "dignity_denied", "seeking": "no_meaning"}

# Never alongside these stances, even as the secondary mechanism: they locate the cause in the person.
STANCE_BANNED_MECH = {
    "aspiration": {"comparison_envy", "self_blame", "grief_attachment", "disconnection", "ego_pride", "desire_craving",
                   "need_for_approval", "expectation_of_others"},
    "wronged": {"expectation_of_others", "need_for_approval", "comparison_envy", "desire_craving", "ego_pride",
                "self_blame"},
}

# Library situation tags that read as a fault in the person; dropped for these stances unless the
# person named the sting themselves (the reading can keep them only with a struggle stance).
STANCE_BANNED_SITUATIONS = {
    "aspiration": {"comparison", "envy", "greed_more", "self_worth", "shame", "guilt", "imposter"},
    "wronged": {"comparison", "envy", "greed_more", "success_pride", "people_pleasing"},
}

# Statement guardrails. A line that matches is replaced by the stance's template, never sent.
# For someone wronged: no statement (hook, diagnose, steady, act) may ask them to accept it or find the
# cause in themselves.
WRONGED_UNSAFE_RE = re.compile(
    r"\b(accept\w*|adjust\w*|adapt\w*|content(ment|ed)?|be at peace with|make peace with|patien\w*|endur\w*|tolerat\w*|"
    r"bear (it|with|this)|put up with|keep the peace|keep quiet|stay silent|let it go|let go of (the|your) (expectation|need|hope|wish)\w*|"
    r"expect(ation)?s? (less|nothing|too much)|lower (your )?expectation\w*|their nature|how they are|what is theirs to (choose|decide)|"
    r"hand(ed|ing)? them the reins|surrender\w*|submit\w*|humbl\w*|humility|forgiv\w*|understand (them|their)|"
    r"see (it )?from their side|compromise\w*|serve them|obey\w*|earn (their|his|her) (respect|approval)|"
    r"win (them|him|her) over|prove (yourself|your worth)|envy\w*|envious|jealous\w*|greed\w*|crav\w*|pride|ego|"
    r"your (own )?expectation\w*|your need for|needing (their|his|her) approval|praise and blame)\b", re.I)
# A hook for someone wronged may not name an inner fault.
WRONGED_HOOK_RE = re.compile(
    r"\b(envy\w*|envious|jealous\w*|greed\w*|crav\w*|desire\w*|wanting|pride|ego|content(ment|ed)?|comparison|compar\w+ (yourself|myself)|"
    r"your (own )?expectation\w*|approval|praise and blame|your fault|you (expected|wanted) too much)\b", re.I)
# A hook for an aspiration is a verse of rising, not of consolation.
ASPIRATION_LAMENT_RE = re.compile(
    r"\b(burden\w*|the weight of|weigh\w* (on|down)|heavy|heaviness|cannot stop|can'?t stop|afraid|fear\w*|ashamed|shame|guilt\w*|"
    r"alone|lonely|lost|drown\w*|stuck|trapped|exhaust\w*|tired|hopeless|helpless|falling behind|not enough|never enough|"
    r"measure\w* (yourself|myself) against|compar\w*|envy\w*|jealous\w*|sorrow|grief|ache|hurt\w*|wound\w*)\b", re.I)

# Writers (for_you, meaning, depth): a line for someone wronged that counsels acceptance is dropped.
WRONGED_WRITER_RE = re.compile(
    r"\b(accept\w*|adjust\w*|adapt\w*|content(ment|ed)?|patien\w*|endur\w*|tolerat\w*|put up with|keep the peace|"
    r"let it go|lower (your )?expectation\w*|their nature|how they are|what is theirs to (choose|decide)|surrender\w*|"
    r"forgiv\w*|compromise\w*|earn (their|his|her) (respect|approval)|win (them|him|her) over|prove (yourself|your worth)|"
    r"your (own )?expectation\w*|your need for|envy\w*|jealous\w*|humbl\w*|"
    r"let (it|the moment|this|that) pass|(do not|don'?t) (argue|defend yourself|speak up)|stay quiet|keep quiet|swallow (it|your words))\b", re.I)
# ...and the other way: a line that swings to "they're terrible, you're perfect" or urges revenge is dropped too.
WRONGED_OVERSWING_RE = re.compile(
    r"\b(revenge|aveng\w*|get (back at|even with)|make (them|him|her) pay|teach (them|him|her) a lesson|punish (them|him|her)|"
    r"(they|he|she) (is|are) (terrible|evil|toxic|monsters?|the worst)|you are perfect|you'?ve done everything right|"
    r"cut (them|him|her|everyone) (off|out) (for good|forever|completely))\b", re.I)
# A line for an aspiration that consoles a wound they don't have is dropped.
ASPIRATION_WRITER_RE = re.compile(
    r"\b(you (cannot|can'?t|do not|don'?t|struggle to|fail to) (handle|stay|keep|sit|bear|stand|cope|seem)|discipline or (just )?stubbornness|"
    r"you are (not )?(alone|enough|broken|behind)|it'?s not your fault|nothing is wrong with you|the weight you carry|"
    r"what you'?re carrying|your (pain|wound|hurt|grief|shame|guilt)|be gentle with yourself|forgive yourself|"
    r"measur\w* yourself against|compar\w* yourself|envy\w*|jealous\w*)\b", re.I)

# How the writers and reranks are told where this person stands.
STANCE_NOTE = {
    "struggle": "a struggle: something hurts and part of its cause sits in their own mind; show it kindly, never blame.",
    "aspiration": "an aspiration, not a struggle: nothing is wrong with them. Do not console them, warn them or invent a wound. "
                  "Meet the resolve as a friend who believes it, and name only what will test it.",
    "wronged": "they are being wronged: someone treats them as less than they are, and the cause is in that person, not in them. "
               "Never ask them to accept it, adjust, be patient, be content, forgive, lower expectations, keep the peace or "
               "understand the other's nature; never say they expected or needed too much. Give footing, courage and the true word. "
               "The tradition's line for a wronged person, which every word must keep: You are not at fault. Stand firm. Act from dharma, not revenge. "
               "So do not swing to the other side either: never call the other person terrible, never call them perfect, never urge "
               "revenge, punishment or cutting everyone off.",
    "seeking": "seeking: no problem to solve. They want to read and understand; the plan is an invitation, not a cure.",
}
STANCE_CORE_LABEL = {
    "struggle": "What they are struggling with",
    "aspiration": "What they have set out to do",
    "wronged": "How they are being wronged",
    "seeking": "What they are looking for",
}

# Fallback statements for the stances that are not a struggle (ai/understanding.py template_queries).
# The register of the card lines: plain, timeless, universal.
ASPIRATION_HOOK = "A fire lit by seeing what others achieved; the resolve to rise, gather your strength and take on what is yours to do."
ASPIRATION_STORY = "A story of someone who set out to build or win something that was theirs to do, met the first test, and kept going."
WRONGED_HOOK = ("Being seen as less than you are by the people who ought to know you best, and the anger of watching the life "
                "you built get called a phase.")
WRONGED_STORY = ("A story of someone dismissed and diminished by their own people, who questioned them openly, stood in "
                 "their truth and found their footing.")
SEEKING_HOOK = "The wish to understand what these texts teach, and to find in them something steady to lean on."
SEEKING_STORY = "A story of a student who came to a teacher with questions and was led, step by step, toward the truth."


def stance_scores(feeling: str, age, stages, situations) -> dict:
    """Every input votes. `situations`: [{id, weight}] as the reading merges them (weights 0..~1.5)."""
    s = {k: 0.0 for k in STANCES}
    s["struggle"] = STRUGGLE_FLOOR
    total = sum(float(x.get("weight", 0)) for x in situations) or 1.0
    for x in situations:
        lean = SITUATION_STANCE.get(x.get("id"))
        if lean:
            s[lean[0]] += lean[1] * float(x.get("weight", 0)) / total
    for st in stages or ():
        for k, v in STAGE_STANCE.get(st, {}).items():
            s[k] += v
    for k, v in AGE_STANCE.get(age or "", {}).items():
        s[k] += v
    for k, v in FEELING_STANCE_VOTE.get(feeling or "", {}).items():
        s[k] += v
    return s


def infer_stance(feeling: str, age, stages, situations) -> tuple[str, dict]:
    """(stance, scores). Struggle unless another stance clearly outweighs it on the inputs together."""
    s = stance_scores(feeling, age, stages, situations)
    best = max(s, key=s.get)
    return (best if s[best] > s["struggle"] else "struggle"), {k: round(v, 2) for k, v in s.items()}


def constrain_mechanism(stance: str, mech: str, sec):
    """(mechanism, secondary, changed) for a stance: off-stance primaries are replaced, banned secondaries dropped."""
    allowed = STANCE_MECHANISMS.get(stance)
    banned = STANCE_BANNED_MECH.get(stance, set())
    changed = False
    if allowed and mech not in allowed:
        mech, changed = STANCE_DEFAULT_MECH[stance], True
    if sec in banned or sec == mech:
        sec = None
    return mech, sec, changed

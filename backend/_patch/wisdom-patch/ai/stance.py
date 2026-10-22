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

# What the tapped feeling says about the stance when nothing else does (no chip, no usable note).
FEELING_STANCE = {"stick": "aspiration", "faith": "seeking", "gita": "seeking"}

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
    r"your (own )?expectation\w*|your need for|envy\w*|jealous\w*|humbl\w*)\b", re.I)
# A line for an aspiration that consoles a wound they don't have is dropped.
ASPIRATION_WRITER_RE = re.compile(
    r"\b(you are (not )?(alone|enough|broken|behind)|it'?s not your fault|nothing is wrong with you|the weight you carry|"
    r"what you'?re carrying|your (pain|wound|hurt|grief|shame|guilt)|be gentle with yourself|forgive yourself|"
    r"measur\w* yourself against|compar\w* yourself|envy\w*|jealous\w*)\b", re.I)

# How the writers and reranks are told where this person stands.
STANCE_NOTE = {
    "struggle": "a struggle: something hurts and part of its cause sits in their own mind; show it kindly, never blame.",
    "aspiration": "an aspiration, not a struggle: nothing is wrong with them. Do not console them, warn them or invent a wound. "
                  "Meet the resolve as a friend who believes it, and name only what will test it.",
    "wronged": "they are being wronged: someone treats them as less than they are, and the cause is in that person, not in them. "
               "Never ask them to accept it, adjust, be patient, be content, forgive, lower expectations, keep the peace or "
               "understand the other's nature; never say they expected or needed too much. Give footing, courage and the true word.",
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
WRONGED_HOOK = ("Being seen as less than you are by the people who should know better, and the anger of watching the life "
                "you built get called a phase.")
WRONGED_STORY = ("A story of someone dismissed and diminished by their own people, who questioned them openly, stood in "
                 "their truth and found their footing.")
SEEKING_HOOK = "The wish to understand what these texts teach, and to find in them something steady to lean on."
SEEKING_STORY = "A story of a student who came to a teacher with questions and was led, step by step, toward the truth."


def stance_from_profile(feeling: str, has_chip: bool, note_ok: bool) -> str:
    """Without the model: the tapped feeling decides, unless a chip or a usable note says there is a problem."""
    if has_chip or note_ok:
        return "struggle"
    return FEELING_STANCE.get(feeling or "", "struggle")


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

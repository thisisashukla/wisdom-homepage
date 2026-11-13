"""The frozen vocabularies of plan_engine_v3/CONTRACT.md, and how the app's chips map onto them."""
from __future__ import annotations

AFFLICTIVE = ("vishada shoka moha bhaya chinta krodha kama lobha ahankara mada matsarya dvesha sanga samshaya chanchalya "
              "pramada alasya glani dainya viraha nirveda manyu dharma_sankata shrama trishna").split()
HEALING = ("shanti abhaya shraddha dhriti kshama karuna maitri santosha prasada utsaha viveka vairagya samatva tejas "
           "kritajnata sharanagati sankalpa ananda atma_jnana seva").split()
STATES = set(AFFLICTIVE) | set(HEALING) | {"jijnasa"}
LIGHT_STATES = set(HEALING) | {"jijnasa"}
STANCES = ("struggle", "aspiration", "wronged", "seeking")
MOVES = ("names_pain normalizes explains_cause reframes gives_ground consoles prescribes warns promises reveals_self "
         "enacts affirms rebukes").split()

# A state in plain words, for prompts (the model is never asked to use the Sanskrit term).
STATE_GLOSS = {
    "vishada": "collapse, despair", "shoka": "grief", "moha": "cannot see clearly", "bhaya": "fear",
    "chinta": "worry that keeps circling", "krodha": "anger", "kama": "craving", "lobha": "never enough",
    "ahankara": "pride", "mada": "drunk on success", "matsarya": "envy, comparison", "dvesha": "resentment",
    "sanga": "clinging", "samshaya": "doubt, indecision", "chanchalya": "a restless mind", "pramada": "drift",
    "alasya": "inertia", "glani": "guilt, self-reproach", "dainya": "feeling small", "viraha": "loneliness, separation",
    "nirveda": "weariness, nothing matters", "manyu": "the hurt of being wronged", "dharma_sankata": "torn between duties",
    "shrama": "exhaustion", "trishna": "restless wanting",
    "shanti": "peace", "abhaya": "fearlessness", "shraddha": "trust", "dhriti": "steadiness", "kshama": "forbearance",
    "karuna": "compassion", "maitri": "goodwill", "santosha": "contentment", "prasada": "clarity", "utsaha": "energy, zest",
    "viveka": "discernment", "vairagya": "letting go", "samatva": "evenness", "tejas": "dignity, courage",
    "kritajnata": "gratitude", "sharanagati": "surrender, devotion", "sankalpa": "resolve", "ananda": "joy",
    "atma_jnana": "knowing the self", "seva": "service", "jijnasa": "wanting to understand",
}

# The 17 feeling words of the app (app/constants/onboardingEmotions.ts): tone, the need they route to, the
# contract states they most plainly name, and the app's own first-person line for the word.
EMOTIONS = {
    "anxious":      ("heavy", "quiet",  ["chinta", "bhaya"],        "My mind won't settle."),
    "overthinking": ("heavy", "quiet",  ["chinta", "chanchalya"],   "I can't switch my mind off."),
    "restless":     ("heavy", "quiet",  ["chanchalya"],             "I can't sit still with myself."),
    "stuck":        ("heavy", "nerve",  ["samshaya", "moha"],       "I keep going over something."),
    "guilty":       ("heavy", "nerve",  ["glani"],                  "I keep going back to what I did."),
    "hurt":         ("heavy", "replay", ["manyu"],                  "Something someone did stays with me."),
    "angry":        ("heavy", "replay", ["krodha", "manyu"],        "Something isn't fair, and it stays with me."),
    "uneasy":       ("heavy", "replay", ["samshaya"],               "Something doesn't sit right."),
    "lonely":       ("heavy", "faith",  ["viraha"],                 "I feel on my own with this."),
    "lost":         ("heavy", "faith",  ["moha", "samshaya"],       "I don't know which way to go."),
    "empty":        ("heavy", "faith",  ["nirveda"],                "Something feels missing."),
    "hopeful":      ("light", "stick",  ["utsaha", "shraddha"],     "Things are turning. I want to keep it going."),
    "determined":   ("light", "stick",  ["sankalpa"],               "I'm ready to stick with it."),
    "inspired":     ("light", "stick",  ["utsaha"],                 "I want to do something with this feeling."),
    "grateful":     ("light", "faith",  ["kritajnata"],             "I want to hold on to this feeling."),
    "peaceful":     ("light", "gita",   ["shanti"],                 "I'm calm, and I want to go deeper."),
    "curious":      ("light", "gita",   ["jijnasa"],                "I want to read the Gita."),
}
# When only the need is known (older apps send `feeling` and no word): the word the app shows for that need.
NEED_DEFAULT_EMOTION = {"quiet": "anxious", "nerve": "stuck", "replay": "uneasy", "stick": "determined", "faith": "lost", "gita": "curious"}

AGE_PHRASE = {"u25": "under 25", "25_34": "25 to 34", "35_44": "35 to 44", "45_54": "45 to 54", "55p": "55 or older"}
STAGE_PHRASE = {"studying": "studying", "working": "working", "own_thing": "running their own thing", "raising_kids": "raising kids",
                "caring_parents": "caring for their parents", "retired": "retired", "between": "between things"}
# A profile with five or more stages ticked (seen in production: all six) tells us nothing about the person.
MAX_TRUSTED_STAGES = 4

# How a chip leans the stance. One chip never decides; build_person_brief adds every vote.
CHIP_STANCE = {"in_laws": ("wronged", 0.45), "inlaws": ("wronged", 0.45), "toxic_boss": ("wronged", 0.5), "credit_taken": ("wronged", 0.6),
               "boss": ("wronged", 0.25), "criticism": ("wronged", 0.4), "boundaries_family": ("wronged", 0.35), "betrayal": ("wronged", 0.3),
               "passed_over": ("wronged", 0.25), "not_promoted": ("wronged", 0.2), "side_project": ("aspiration", 0.5)}
EMOTION_STANCE = {"angry": {"wronged": 0.3}, "hurt": {"wronged": 0.25}, "hopeful": {"aspiration": 0.5}, "determined": {"aspiration": 0.6},
                  "inspired": {"aspiration": 0.6}, "grateful": {"seeking": 0.45, "aspiration": 0.2}, "peaceful": {"seeking": 0.6},
                  "curious": {"seeking": 0.7}}


# ── the no-consent experience: one cached line per feeling word x stage of life x stance ──
# Written offline by Sarvam (prompts.CHIP_MATRIX_SYSTEM, build_static chips), gated by checker, never at request time.
# A person who ticked several stages is keyed by the first in this order (the one most likely to colour the day).
STAGE_PRIORITY = ("raising_kids", "caring_parents", "studying", "own_thing", "working", "retired", "between")
STAGE_KEYS = STAGE_PRIORITY + ("any",)
# Which stances a word can plausibly carry with chips alone. A light word is never "struggle"; only the words that
# name another person's doing (hurt, angry, uneasy) open "wronged", and then only when a chip or a note says so.
STANCES_FOR_EMOTION = {w: (("aspiration", "seeking") if t[0] == "light" else ("struggle", "wronged") if w in ("hurt", "angry", "uneasy")
                           else ("struggle",)) for w, t in EMOTIONS.items()}


def stage_key(stages, trusted: bool = True) -> str:
    """The matrix column for a person: their first stage in STAGE_PRIORITY, else "any"."""
    if not trusted:
        return "any"
    for s in STAGE_PRIORITY:
        if s in (stages or ()):
            return s
    return "any"


def chip_key(emotion, stage: str, stance: str) -> str:
    return f"{emotion}|{stage}|{stance}"


# ── poet lines served as human emotion (Ankur, 13 Nov 2026) ─────────────────────
# devotional=false in their labels, so a non-devotee may see them as human longing. The personal layer frames them
# that way; the scene and meaning still say plainly whose longing it is in the original. id -> (names that must
# appear in the meaning and the scene, the frame in plain words).
HUMAN_LONGING = {
    "sur.bgs.316": ("Krishna|Shyam", "the gopis' longing for Krishna, gone to Mathura"),
    "sur.bgs.34": ("Krishna|Mohan", "a gopi telling Uddhava she cannot forget Krishna's face"),
    "sur.bgs.315": ("Krishna|Madhav", "Radha's message to Krishna from Braj"),
    "meera.kk.3": ("Krishna|Giridhar", "Meera's love for Krishna, which her household mocked"),
    "meera.kk.14": ("Krishna|Giridhar", "Meera's tears while she waits for Krishna"),
    "sur.bgs.9": ("Krishna", "Krishna, now a prince in Mathura, sending word home to Yashoda"),
    "sur.bgs.10": ("Krishna|Kanhaiya", "Krishna telling Yashoda no one in the city calls him Kanhaiya"),
    "kabir.kk.66": ("Kabir", "Kabir on love across distance; the sants also read it as the Lord's nearness"),
    "rahim.193": ("Rahim", "Rahim on remembrance and meeting again"),
    "sur.vp.279": ("Surdas|Sur\\b", "Surdas giving the turning of fortune as the reason to serve the Lord"),
    "sur.vp.295": ("Surdas|Sur\\b|Hari", "Surdas on the conduct of one who has tasted Hari's love"),
}
# Sundara Kanda 13: Hanuman's despair. 13.33 and 13.37 to 39 (ways of ending his life) are excluded from the library;
# verses flagged self_harm_adjacent serve only when risk is none, and nothing may narrate those thoughts.
EXCLUDED_REFS = ("5.13.33", "5.13.37", "5.13.38", "5.13.39", "13.33", "13.37", "13.38", "13.39")


# A chip line must give their own feeling back: a stem from this family (checked in checker.check_text, kind chip_line).
EMOTION_ECHO = {
    "anxious": r"anxi|worr|settle|unease|uneasy|racing|restless|calm", "overthinking": r"think|thought|mind|switch|loop|circl",
    "restless": r"restless|still|settle|sit", "stuck": r"stuck|same|going over|round|circl|move|ground|place|return|keeps|again|unmov|loop",
    "guilty": r"guil|what you did|blame|regret|wrong|back to|choice|done|past", "hurt": r"hurt|wound|someone|mark|pain|stays",
    "angry": r"ang|unfair|fair|heat|fire|rage", "uneasy": r"uneas|right|sit|settle|off",
    "lonely": r"lone|alone|own|apart|company|nobody|no one", "lost": r"lost|way|direction|path|where|which",
    "empty": r"empt|missing|hollow|nothing|meaning", "hopeful": r"hope|turning|better|keep (it|this) going|light|ahead|good",
    "determined": r"determin|resolve|ready|stick|commit|keep going|set", "inspired": r"inspir|spark|energy|want to do|alive|fire",
    "grateful": r"grat|thank|gift|bless|glad|hold on", "peaceful": r"peace|calm|still|quiet|settled|deeper",
    "curious": r"curio|read|learn|understand|question|deeper|gita",
}

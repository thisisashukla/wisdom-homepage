"""
checker.py: fidelity and safety, in code. Every line a person reads or hears passes here first, whether Sarvam wrote
it at request time (the personal layer) or offline (the static layer). A line that fails is dropped, never shown;
the layer underneath it (static, then chips) is already on the screen.

What is checked, in this order:
  repairs    dashes become commas, exclamation marks become full stops (noted, not blocked)
  form       length per part, second person where the part speaks to them, English only outside the verse block
  banned     the contrast pattern ("isn't X. It's Y", "not X but Y"), slang, cliches, intensifiers, orders, verdicts,
             clinical labels, archaic translation words, their age band said back to them
  scripture  nothing invented: no character, text, quotation, verse number, doctrine or technique that the
             VerseBrief does not hold; any sentence that says what the verse or its speaker says must trace to the
             VerseBrief; every sentence of a static part must trace to it
  person     nothing invented about their life: no people, places or concrete facts they did not give
  stance     wronged: never adjust, endure, forgive first, keep quiet, or find the cause in them; no revenge either
             light / aspiration / seeking: never a wound, a warning or a consolation they did not ask for
             lonely or grieving: never "let go", "detach", "your own company"
  risk       self_harm: no model-written text at all; harm_from_others: nothing that counsels endurance or duty;
             distress: nothing that orders; health context: no medical direction either way, no promised outcome

Tracing is lexical (word stems against the brief). It cannot prove a paraphrase faithful; it can prove that a
sentence brings in content the brief does not have, which is how invented scripture shows up in practice.
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

from .briefs import PersonBrief, VerseBrief

BLOCK, REPAIR, NOTE = "block", "repair", "note"


@dataclass
class Issue:
    code: str
    where: str = ""
    detail: str = ""
    severity: str = BLOCK

    def __str__(self) -> str:
        return f"{self.where}:{self.code}" + (f"({self.detail})" if self.detail else "")


# part -> (min words, max words, must contain "you")
LIMITS: Dict[str, Tuple[int, int, bool]] = {
    "first_line": (8, 30, True), "for_you": (14, 55, True), "practice": (4, 20, False), "scene_line": (6, 24, True),
    "audio_open": (10, 45, True), "audio_close": (4, 22, False),
    "meaning": (25, 80, False), "scene.before": (15, 70, False), "scene.moment": (12, 60, False), "scene.reply": (8, 55, False),
    "scene.after": (8, 55, False), "scene.reading": (8, 45, False), "audio.scene": (12, 70, False), "audio.unpack": (20, 85, False),
    "audio.close": (4, 22, False), "by_stance.for_you": (12, 45, True), "by_stance.practice": (4, 20, False), "chip_line": (6, 24, True),
}
STATIC_KINDS = {"meaning", "scene.before", "scene.moment", "scene.reply", "scene.after", "scene.reading", "audio.scene", "audio.unpack"}
PERSONAL_KINDS = {"first_line", "for_you", "practice", "scene_line", "audio_open", "audio_close"}

WORD_RE = re.compile(r"[A-Za-z][A-Za-z']*")
YOU_RE = re.compile(r"\byou(r|'re|'ve|'d|'ll|rself)?\b", re.I)
DEVANAGARI_RE = re.compile(r"[ऀ-ॿ]")
DASH_RE = re.compile(r"\s*[—–]\s*|\s+-\s+")
EMOJI_RE = re.compile(r"[\U0001F300-\U0001FAFF☀-➿]")

# The contrast pattern, in the shapes Sarvam actually produces (evals/out/v14: 19% of for_you lines).
CONTRAST_RES = [
    re.compile(r"\b(is|are|was|were|it'?s|that'?s|this is|you are|you'?re)\s+not\b[^.?!]{0,90}[.;]\s+(It|That|This|They|You|He|She)('s|'re|\s+is|\s+are|\s+was)\b"),
    re.compile(r"\b(isn'?t|aren'?t|wasn'?t|weren'?t)\b[^.?!]{0,90}[.;]\s+(It|That|This|They|You)('s|'re|\s+is|\s+are|\s+was)\b"),
    re.compile(r"\bnot\b[^.?!;]{1,70}?,?\s+but\b", re.I),
    re.compile(r"\bnot\s+(just|only|merely|simply)\b", re.I),
    re.compile(r"\b(is|are|was)\s+not\s+about\b", re.I),
    re.compile(r",\s+not\s+(a|an|the|your|their|his|her|in|by|from)\b", re.I),
    re.compile(r"\b(less|more)\s+(about|a matter of)\b[^.?!]{0,60}\bthan\b", re.I),
    re.compile(r"\bwhat if\b[^.?!]{0,60}\b(is|was|were)\s+not\b", re.I),
    # the denial left implicit: "You think this is about the exam. It is about the fruit."
    re.compile(r"\b(think|thought|feels?|felt|seems?|looks?|believe)\s+(like\s+)?(this|it|that)\s+(is|was)\s+(about|a|an)\b[^.?!]{0,90}[.;]\s+(It|This|That)('s|\s+is|\s+was)\b", re.I),
    re.compile(r"\bless (about|a matter of)\b|\b(isn'?t|is not) (really )?(the|a|an) (problem|point|question|issue)\b", re.I),
]
SLANG_RE = re.compile(r"\b(gonna|wanna|gotta|kinda|sorta|lol|omg|bro|dude|vibes?|crush(ing)? it|hustle|hacks?|no cap|low[- ]?key|"
                      r"high[- ]?key|fam|legit|game[- ]changer|level up|mindset|you got this|okay so|super \w+|toxic|"
                      r"triggered|gaslight\w*|red flag|self[- ]care|grind)\b", re.I)
CLICHE_RE = re.compile(r"\b(journey|inner peace|true peace|peace begins|embrace|healing|unlock|navigate|resonat\w*|mindful\w*|"
                       r"holding space|you are not alone|the universe|everything happens for a reason|at the end of the day|"
                       r"be gentle with yourself|sit with (it|that|this|the)|lean into|show up for|your truth|safe space)\b", re.I)
INTENSIFIER_RE = re.compile(r"\b(truly|deeply|quietly|actually|incredibly|profound\w*|powerful|beautiful\w*|timeless|ancient wisdom|"
                            r"true (self|perfection|freedom|strength|resolve|peace)|real issue)\b", re.I)
MUST_RE = re.compile(r"\b(you|who) (should|must|have to|need to|ought to)\b", re.I)
ORDER_OPEN_RE = re.compile(r"^(stop|don'?t|do not|tell|try|let|remember|just|never|always|take|make|go|be)\b", re.I)
VERDICT_RE = re.compile(r"\byou (have|did) (done )?nothing wrong\b|\byou are (a |an )?(good|bad|perfect|terrible) \w+\b|\bit(?:'s| is) not your fault\b|"
                        r"\byou are (not )?to blame\b|\byou are (not )?(broken|failing|a failure|lazy|weak)\b", re.I)
DIAGNOSIS_RE = re.compile(r"\b(diagnos\w*|disorder|depress\w+|anxiety disorder|adhd|trauma\w*|narcissis\w*|panic attack|ocd|burnout syndrome)\b", re.I)
ARCHAIC_RE = re.compile(r"\b(unmanl\w*|scorcher of (enemies|foes)|o (partha|bharata|arjuna)|thou|thee|thy|hath|doth|verily|"
                        r"son of (kunti|pritha)|mighty[- ]armed|bull among men)\b", re.I)
AGE_BACK_RE = re.compile(r"\b(in your (teens|twenties|thirties|forties|fifties|sixties)|at your age|as someone (under|over|aged|in)|"
                         r"under 25|25 to 34|35 to 44|45 to 54|55 or older)\b", re.I)
PROMISE_RE = re.compile(r"\b(you will (be able|manage|make it|succeed|get (it|there|through)|find (peace|love|it))|everything will|"
                        r"it will (all )?(work out|be (fine|okay|alright))|is guaranteed|will surely|will (never|not) (go out|fade|leave you|end|fail)|"
                        r"protect you from (the worst|everything|anything))\b", re.I)

# Scripture: what may be named, and what may never be imported.
NAMED = {"Krishna", "Arjuna", "Rama", "Ram", "Sita", "Lakshmana", "Lakshman", "Hanuman", "Bharata", "Bharat", "Ravana", "Vibhishana",
         "Sugriva", "Shiva", "Parvati", "Durga", "Draupadi", "Yudhishthira", "Bhishma", "Karna", "Kunti", "Vidura", "Dhritarashtra",
         "Duryodhana", "Drona", "Gandhari", "Dasharatha", "Kausalya", "Kaikeyi", "Shabari", "Ahalya", "Nachiketa", "Yama", "Prahlada",
         "Dhruva", "Sudama", "Yashoda", "Radha", "Meera", "Tulsidas", "Surdas", "Vasishtha", "Valmiki", "Vyasa", "Narada", "Savitri",
         "Ashtavakra", "Janaka", "Vivekananda", "Kabir", "Bhartrihari", "Sanjaya", "Buddha", "Gandhi", "Shankara", "Ramanuja",
         "Upanishad", "Upanishads", "Ramayana", "Mahabharata", "Ramcharitmanas", "Vedas", "Gita", "Rumi", "Jesus", "Bible", "Kurukshetra",
         "Vrindavan", "Ayodhya", "Lanka", "Pandavas", "Kauravas", "Vishnu", "Brahma", "Indra", "Uddhava", "Yajnavalkya", "Gargi"}
DOCTRINE_RE = re.compile(r"\b(karma|rebirth|reincarnat\w*|past li(fe|ves)|next life|destiny|fate|fated|the universe|chakras?|manifest\w*|"
                         r"law of attraction|god'?s plan|divine plan|moksha|maya|enlighten\w*|soul ?mate|vibration\w*|energy field|"
                         r"breath\w*|breathe|inhale|exhale|journal\w*|gratitude list|meditat\w*|mantras?|affirmation\w*|visuali[sz]\w*|chant\w*)\b", re.I)
ATTRIB_RE = re.compile(r"\b(krishna|arjuna|rama|sita|hanuman|the verse|this verse|the text|the gita|the shloka|the line|tulsidas|vidura|"
                       r"bhishma|ashtavakra|vasishtha|the poet|the teacher|he|she)\s+(says?|said|tells?|told|teach(es)?|taught|promis\w+|asks?|asked|"
                       r"means?|shows?|calls?|names?|explains?|repl(y|ies|ied)|answers?|answered|warns?|points? out|reminds?)\b", re.I)
QUOTE_RE = re.compile(r"[\"“”]([^\"“”]{12,})[\"“”]")
REF_RE = re.compile(r"\b(chapter|verse|canto|sarga|shloka)\s+(\d+)\b|\b(\d{1,2})[.:](\d{1,3})\b", re.I)

# Their life: concrete things a line may only mention if they did (attached to the reader by "your").
LIFE_FACT_RE = re.compile(
    r"\byour\s+(?:own\s+)?(exams?|boss|manager|office|desk|inbox|salary|rent|loan|debt|visa|marriage|wedding|divorce|husband|wife|partner|"
    r"boyfriend|girlfriend|children|child|kids?|son|daughter|baby|mother|father|parents?|in-?laws|brother|sister|friends?|family|team|"
    r"clients?|startup|business|company|job|career|degree|college|school|studies|bed|room|house|home|kitchen|phone|car|commute|"
    r"illness|body|health|doctor|medication|diagnosis|grandchild\w*|grandparent\w*)\b", re.I)
LIFE_SCENE_RE = re.compile(r"\b(lying awake|can'?t sleep|sleepless|at (3|2|three|two) ?(am|a\.m\.)|at night|in bed|on the commute|at your desk|"
                           r"in the kitchen|before (the|your) exam|scrolling|on your phone)\b", re.I)
CHIP_FACTS = {"studying": "studies school college exams degree", "working": "work job office", "own_thing": "work business company startup",
              "raising_kids": "children child kids family home", "caring_parents": "parents mother father family home", "retired": "work home",
              "between": ""}

# Numbers of time they never gave ("after 14 months", "for twenty years"): an invented biography starts here.
LIFE_TIME_RE = re.compile(r"\b(for|after|in|over|nearly|almost)\s+(\d+|a few|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|"
                          r"thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty)(?:[- ]\w+)?\s+(years?|months?|weeks?|days?|decades?)\b", re.I)
# Casting the reader as the character ("You are Arjuna"): the prompts forbid it and it reads as flattery or a verdict.
CAST_RE = re.compile(r"\b(?i:you are) (?:(?i:now|also|like) )?(Arjuna|Krishna|Rama|Ram|Sita|Hanuman|Lakshmana|Bharata|Draupadi|Karna|Bhishma|"
                     r"Yudhishthira|Nachiketa|Prahlada|Dhruva|Sudama|Shabari|Vibhishana)\b")
# Phrases from the worked examples in today's prompts (ai/personalize.py SYSTEM, prompts/understand.py EXAMPLES). A line
# that repeats one was copied, not written for this person (5 of 11 cached readings carried bridge:copied_example).
EXAMPLE_PHRASES = ("your right is over your aim", "over the deer", "waiting room, inbox", "inbox or kitchen table",
                   "tell giving up from changing direction", "you are in your own", "the question is what your",
                   "building a team to compete", "inspired by seniors", "you are carrying", "it sounds like")


def copied_example(text: str) -> Optional[str]:
    low = " ".join((text or "").lower().split())
    for ph in EXAMPLE_PHRASES:
        if ph in low:
            return ph
    try:                                                     # the reading prompt's own examples, 6-gram overlap
        from ai.understanding import copied_from_examples
        if copied_from_examples(text):
            return "understand_examples"
    except Exception:                                        # pragma: no cover
        pass
    return None


# Self-harm: never narrated (Sundara 13.33, 13.37 to 39 are excluded; their neighbours are flagged self_harm_adjacent).
SELF_HARM_TEXT_RE = re.compile(
    r"\b(end(s|ed|ing)? (his|her|my|their|your) (own )?life|kill(s|ed|ing)? (himself|herself|myself|themselves|yourself)|"
    r"take (his|her|my|their|your) (own )?life|suicid\w*|starv\w* (himself|myself|to death)|fast\w* (unto|until|to) death|"
    r"(enter|walk|throw\w*|cast\w*) (himself|myself|into) (into )?(the )?(fire|pyre|sea|ocean)|hang(s|ed|ing)? (himself|myself)|"
    r"drown(s|ed|ing)? (himself|myself)|give up (his|my) (life|body|breath)|cast off (his|my) body|prayopaves\w*|self[- ]immolat\w*|"
    r"(wish(es|ed)?|want(s|ed)?|thought) (to|of) die|no reason to live|better (off )?dead|die here)\b", re.I)
DEVOTION_ASK_RE = re.compile(r"\b(pray\w*|chant\w*|worship\w*|surrender (yourself|to)|take refuge|turn to (krishna|god|the lord|him)|"
                             r"offer (it|this|your \w+) to (krishna|god|the lord)|devote yourself|bhajan|kirtan|japa|naam)\b", re.I)
RECAST_RE = re.compile(r"\b(the one you (miss|love|long for)|your (beloved|loved one|mother|father|partner|friend)) (is|was|are) (really |also )?(krishna|god|the lord)\b", re.I)


# The verse's own body (Arjuna's trembling limbs) put on the reader: an invented symptom.
BODY_RE = re.compile(r"\byour (limbs|body|mouth|hands|legs|skin|hair|chest|stomach|throat|heart) (give|gives|giving|trembl\w*|shak\w*|burn\w*|"
                     r"dr(y|ies)|ach\w*|tighten\w*|races?|racing|pound\w*|sweat\w*|freez\w*|go(es)? (cold|numb|dry)|stands? on end)\b", re.I)
# Treatment named in a line to someone who mentioned medication: no line may touch it, in either direction.
TREATMENT_RE = re.compile(r"\b(medic\w+|detox\w*|dose|dosage|prescri\w+|tablets?|pills?|rehab|withdrawal|chemo\w*|therapy|insulin)\b", re.I)
# Telling a lonely or grieving person that they are not alone or have company: their feeling, overruled.
OVERRULE_LONELY_RE = re.compile(r"\byou (are|were) (not|never) (alone|lonely|on your own|without (company|anyone))\b|\byou have (company|everyone|people)\b", re.I)
# A claim inverted: a verse that says restrain or bring the mind back, offered as "let it be", "do not try to hold it".
INVERSIONS = [
    (re.compile(r"\b(restrain|control|bring (it )?back|draw (it )?back|subdue|master|hold)\w*", re.I),
     re.compile(r"\b((do not|don'?t|without|no need to|never|stop) (try(ing)? to )?(hold|catch|control|restrain|force|fight|grip|stop)\w*|"
                r"let (it|the mind|the thought|the wind|them) (be|pass|go|move|blow|run|drift)|feel it pass|"
                r"(not meant|no need|do not have|don'?t have|never meant) to (hold|catch|control|restrain|master|stop))\b", re.I)),
    (re.compile(r"\b(act|action|work|fight|duty)\b", re.I),
     re.compile(r"\b(stop|rest from|step back from|give up|put down) (the |your )?(work|acting|trying|effort)\b", re.I)),
]


# Stance.
WRONGED_RE = re.compile(
    r"\b(accept\w*|adjust\w*|adapt\w*|content(ment|ed)?|patien\w*|endur\w*|tolerat\w*|put up with|bear (it|with|this)|keep the peace|"
    r"let it go|let (it|the moment|this|that) pass|lower (your )?expectation\w*|your (own )?expectation\w*|their nature|how they are|"
    r"what is theirs to (choose|decide)|surrender\w*|submit\w*|forgiv\w*|compromise\w*|earn (their|his|her) (respect|approval)|"
    r"win (them|him|her) over|prove (yourself|your worth)|your need for|needing (their|his|her) approval|envy\w*|jealous\w*|humbl\w*|humility|"
    r"your (ego|pride)|(do not|don'?t) (argue|defend yourself|speak up|react)|stay (quiet|silent)|keep quiet|without speaking|say nothing|"
    r"swallow (it|your words)|see (it )?from their side|their side|give them time|understand (them|her|him|their)|calm down|"
    r"choose to stop|stop fighting|you (let|allow|allowed) (them|him|her|it)|your own (worst )?enemy|rise above|(your|the) only answer|"
    r"let (it|that|this) be your answer|(do not|don'?t) answer|no need to answer)\b", re.I)
OVERSWING_RE = re.compile(r"\b(revenge|aveng\w*|get (back at|even with)|make (them|him|her) pay|teach (them|him|her) a lesson|punish\w*|"
                          r"(they|he|she) (is|are) (terrible|evil|toxic|monsters?|the worst)|you are perfect|cut (them|him|her|everyone) (off|out))\b", re.I)
PATHOLOGISE_RE = re.compile(
    r"\b(struggl\w*|burden\w*|the weight|weigh\w* (on|you)|carry(ing)?|wound\w*|heal\w*|pain\w*|hurt\w*|anxious|anxiety|worr\w+|restless\w*|"
    r"fear\w*|afraid|doubt\w*|lost|broken|stuck|heavy|heaviness|exhaust\w*|tired|lonely|alone|empty|emptiness|searching|"
    r"not a failure|it'?s okay|it is okay|it'?s alright|running ahead|racing|overthink\w*|grief|sorrow|suffer\w*|"
    r"(will|may|might) not last|won'?t last|before it fades|(don'?t|do not) (get|become|grow) (too )?attached|be careful|beware|"
    r"cling\w*|hesitat\w*|falling behind|not enough|compar\w*|envy\w*|jealous\w*|measure yourself)\b", re.I)
LETGO_RE = re.compile(r"\b(let go of (your|the|them|him|her)|let (them|him|her) go|detach\w*|your own company|move on|time to release|"
                      r"learn to be alone|stop (missing|griev\w+|holding on))\b", re.I)
BLAME_RE = re.compile(r"\b(your own worst enemy|its own enemy|you (let|allow|allowed) (them|him|her|it)|your mind is (the|your) (obstacle|enemy|problem)|"
                      r"pull yourself together|you did this|you chose this|your own doing|you have only yourself)\b", re.I)
ENDURE_RE = re.compile(r"\b(endur\w*|tolerat\w*|adjust\w*|forgiv\w*|keep(ing)? the peace|put up with|bear it|patien\w*|duty|serve|obey\w*|"
                       r"honou?r (him|her|them)|respect (him|her|them)|stay(ing)? (quiet|silent)|shake it off|stand up|smallness)\b", re.I)
MEDICAL_RE = re.compile(r"\b((stop|stopping|reduce|taper\w*|skip|quit|come off|coming off|continue|keep taking|take|increase) (your|the|those|all)?\s*"
                        r"(medic\w+|pills?|tablets?|dose|dosage|prescription|treatment)|you (can|could|will) detox|detox (is|will|can)|"
                        r"willpower|your doctor (is|was)|without (your |the )?(medic\w+|pills?|tablets?))\b", re.I)

STOP = set("""a an and are as at be been being but by can could did do does doing done for from had has have having he her here hers him his
how i if in into is it its just me my of on or our out over own she so some such than that the their them then there these they this
those through to too under up very was we were what when where which while who whom why will with would you your yours yourself not no
nor only same about again against all any because before both down during each few further more most off once other above below after
until am s t don now also still even ever never always one two may might must shall should than thing things way ways something
someone anything nothing everything every much many little lot kind like let lets get gets got make makes made take takes took give
gives given come comes came go goes went see sees seen say says said tell tells told ask asks asked know knows knew mean means meant
feel feels felt keep keeps kept put puts today now day days time times moment moments already yet whether whatever whoever
verse line text gita words word here's that's it's there's you're you've i'm""".split())
# Words any line may use about living with a verse without "adding" anything to it.
GLUE = set("""life live lives living mind heart hand hands part place step steps start begin begins beginning end ends first next last
small smallest whole full fully simply plain plainly real same own work works working rest stay stays hold holds held bring brings
back turn turns notice noticing look looks watch remember carry offer offers stand stands sit sits wait waits meet meets name names
answer answers question questions people person world morning evening night hour week year room door road path""".split())


def _stem(w: str) -> str:
    w = w.lower().strip("'")
    for suf in ("'s", "ing", "ed", "es", "s", "ly"):
        if w.endswith(suf) and len(w) - len(suf) >= 4:
            w = w[: -len(suf)]
            break
    return w[:6]


def stems(text: str) -> set:
    return {_stem(w) for w in WORD_RE.findall(text or "") if w.lower() not in STOP and len(w) > 2}


def _content(sentence: str) -> List[str]:
    return [_stem(w) for w in WORD_RE.findall(sentence) if w.lower() not in STOP and len(w) > 2]


def sentences(text: str) -> List[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?:])\s+", text.strip()) if s.strip()]


def n_words(text: str) -> int:
    return len(WORD_RE.findall(text or ""))


def _grams(t: str, n: int = 5) -> set:
    w = [x.lower() for x in WORD_RE.findall(t or "")]
    return {" ".join(w[i:i + n]) for i in range(len(w) - n + 1)}


def _without_verse(text: str, vb: VerseBrief) -> str:
    """The text with the verse's own card line and translation removed: they are the scripture's words and are
    exempt from the style rules (a line may quote them)."""
    out = text
    for src in (vb.line, vb.translation):
        for sent in sentences(src or ""):
            core = sent.rstrip(".!?: ")
            if len(core) > 14:
                out = re.sub(re.escape(core), " ", out, flags=re.I)
    return out


def trace(sentence: str, allowed: set) -> Tuple[float, List[str]]:
    """(share of the sentence's content stems found in `allowed`, the stems that were not)."""
    c = _content(sentence)
    if not c:
        return 1.0, []
    miss = [s for s in c if s not in allowed]
    return 1 - len(miss) / len(c), sorted(set(miss))


def check_text(text, kind: str, vb: VerseBrief, pb: Optional[PersonBrief] = None) -> Tuple[Optional[str], List[Issue]]:
    """One part -> (the text to show, or None when it may not be shown; every issue found)."""
    issues: List[Issue] = []
    add = lambda code, detail="", sev=BLOCK: issues.append(Issue(code, kind, detail, sev))     # noqa: E731
    if not isinstance(text, str) or not text.strip():
        return None, [Issue("missing", kind)]
    s = " ".join(text.split()).strip().strip('"“”')
    if DASH_RE.search(s):
        s = DASH_RE.sub(", ", s)
        add("dash", sev=REPAIR)
    if "!" in s:
        s = s.replace("!", ".")
        add("exclamation", sev=REPAIR)
    s = re.sub(r"\s+([,.;:?])", r"\1", s)
    if EMOJI_RE.search(s):
        add("emoji")
    lo, hi, need_you = LIMITS.get(kind, (1, 80, False))
    n = n_words(s)
    if n < lo:
        add("short", str(n))
    if n > hi:
        add("long", str(n))
    if need_you and not YOU_RE.search(s):
        add("not_second_person")
    if DEVANAGARI_RE.search(s):
        add("devanagari_outside_verse")

    body = _without_verse(s, vb)
    for rx in CONTRAST_RES:
        m = rx.search(body)
        if m:
            add("contrast_pattern", m.group(0)[:60])
            break
    src_stems = stems(vb.source_text())
    for code, rx in (("slang", SLANG_RE), ("cliche", CLICHE_RE), ("intensifier", INTENSIFIER_RE), ("diagnosis", DIAGNOSIS_RE),
                     ("archaic", ARCHAIC_RE), ("promise", PROMISE_RE)):
        for m in rx.finditer(body):
            if code in ("intensifier", "cliche") and _stem(m.group(0).split()[-1]) in src_stems:
                continue                                     # the verse's own word (a "powerful" mind) is not decoration
            add(code, m.group(0))
            break
    if kind != "practice" and MUST_RE.search(body):
        add("preachy", MUST_RE.search(body).group(0))
    if kind in PERSONAL_KINDS or kind in ("by_stance.for_you", "chip_line"):
        m = VERDICT_RE.search(body)
        if m:
            add("verdict", m.group(0))
        if AGE_BACK_RE.search(body):
            add("age_said_back")
    if kind in ("first_line", "for_you", "scene_line", "audio_open", "chip_line") and ORDER_OPEN_RE.match(body):
        add("opens_with_an_order")
    if kind == "chip_line" and pb is not None and pb.emotion:
        from .vocab import EMOTION_ECHO
        if EMOTION_ECHO.get(pb.emotion) and not re.search(EMOTION_ECHO[pb.emotion], body, re.I):
            add("chip_line_misses_the_feeling", pb.emotion)
        try:                                                 # a chip line knows nobody: any person it names must come from the stage
            from ai.people import invented_person
            who = invented_person(body, pb.people or [], yours_only=False)
            if who:
                add("invented_person", who)
        except Exception:                                    # pragma: no cover
            pass

    # ── scripture: nothing invented ──────────────────────────────────────────
    src = vb.source_text()
    person = pb.facts() if pb else ""
    src_low, person_low = src.lower(), person.lower()
    for name in NAMED:
        if re.search(rf"\b{name}\b", s) and not re.search(rf"\b{re.escape(name.lower()[:5])}", src_low + " " + person_low):
            add("invented_name", name)
    for q in QUOTE_RE.findall(s):
        qt = stems(q)
        if len(qt) >= 3 and len(qt & stems(src + " " + person)) / len(qt) < 0.7:
            add("invented_quote", q[:40])
    for m in REF_RE.finditer(s):
        if m.group(0).lower() not in src_low and not re.search(r"\b(am|pm|a\.m|p\.m)\b", s[m.end():m.end() + 6], re.I):
            add("invented_reference", m.group(0))
    for m in DOCTRINE_RE.finditer(body):
        if m.group(0).lower()[:5] not in src_low and m.group(0).lower()[:5] not in person_low:
            add("imported_doctrine_or_technique", m.group(0))
            break
    v_stems = stems(src)
    allowed_static = v_stems | GLUE
    allowed_personal = allowed_static | stems(person) | (stems(" ".join(CHIP_FACTS.get(x, "") for x in pb.life_stage)) if pb else set())
    if pb and pb.emotion:
        allowed_personal |= stems(pb.emotion)
    for sent in sentences(body):
        if kind in STATIC_KINDS:
            share, miss = trace(sent, allowed_static)
            if share < 0.6 and len(miss) >= 3:
                add("untraced_static_sentence", ",".join(miss[:6]))
        else:
            if ATTRIB_RE.search(sent):
                share, miss = trace(sent, allowed_static | stems(person))
                if share < 0.6 and len(miss) >= 2:
                    add("untraced_scripture_claim", ",".join(miss[:6]))
            elif kind in PERSONAL_KINDS:
                share, miss = trace(sent, allowed_personal)
                if share < 0.45 and len(miss) >= 4:
                    add("untraced_sentence", ",".join(miss[:6]))
    # ── self-harm never narrated; excluded verses never cited ─────────────────
    m = SELF_HARM_TEXT_RE.search(body)
    if m:                                                    # on every kind, for every reader
        add("narrates_self_harm", m.group(0))
    from .vocab import EXCLUDED_REFS
    if any(re.search(rf"\b{re.escape(r)}\b", s) for r in EXCLUDED_REFS):
        add("cites_excluded_verse")
    # ── a poet's longing offered as human emotion: the frame is kept, nothing devotional is added ──
    if vb.frame:
        if kind in ("meaning", "scene.moment", "audio.scene") and not re.search(rf"\b({vb.frame_names})", s):
            add("erases_the_frame", vb.frame_names)
        if kind not in STATIC_KINDS:
            devotee = pb is not None and (pb.asked_for == "to go deeper" or {"sharanagati", "shraddha"} & set(pb.states))
            m = DEVOTION_ASK_RE.search(body)
            if m and not devotee and not (pb is not None and m.group(0).lower()[:5] in pb.words.lower()):
                add("devotional_instruction_not_asked", m.group(0))
            m = RECAST_RE.search(body)
            if m:
                add("recasts_their_beloved", m.group(0))
    if kind == "audio.scene":
        sp_words = re.sub(r"\([^)]*\)", " ", vb.speaker or "").split()       # "Valmiki (narrator)" -> Valmiki
        sp_name = sp_words[-1] if sp_words else ""
        if not re.search(r":\s*$", s):
            add("no_handover")
        elif sp_name and sp_name.lower() not in sentences(s)[-1].lower() and \
                any(re.search(rf"\b{nm}\b", sentences(s)[-1]) for nm in NAMED if nm.lower() != sp_name.lower()):
            add("handover_to_wrong_speaker", sentences(s)[-1][:40])
        if _grams(s) & (_grams(vb.line) | _grams(vb.translation)):
            add("says_the_verse_before_the_verse")

    # ── their life: nothing invented ─────────────────────────────────────────
    if pb is not None and kind not in STATIC_KINDS:
        facts = person_low + " " + " ".join(CHIP_FACTS.get(x, "") for x in (pb.life_stage if pb.stage_trusted else []))
        for m in LIFE_FACT_RE.finditer(body):
            if _stem(m.group(1)) not in stems(facts) and _stem(m.group(1)) not in v_stems:
                add("invented_life_detail", m.group(0))
                break
        m = LIFE_SCENE_RE.search(body)
        if m and m.group(0).split()[-1].lower()[:4] not in person_low:
            add("invented_life_detail", m.group(0))
        for m in LIFE_TIME_RE.finditer(body):
            if m.group(2).lower() not in person_low and m.group(2).lower() not in src_low:
                add("invented_life_detail", m.group(0))
                break
        m = CAST_RE.search(body)
        if m:
            add("casts_reader_as_character", m.group(0))
        m = BODY_RE.search(body)
        if m and m.group(1).lower() not in person_low:
            add("invented_life_detail", m.group(0))
        if pb.health_context and TREATMENT_RE.search(body):
            add("names_treatment", TREATMENT_RE.search(body).group(0))
        if {"viraha", "shoka", "nirveda"} & set(pb.states):
            m = OVERRULE_LONELY_RE.search(body)
            if m:
                add("overrules_their_feeling", m.group(0))
        claim = " ".join([vb.claim, vb.translation, vb.line])
        for claim_rx, bad_rx in INVERSIONS:
            if claim_rx.search(claim):
                m = bad_rx.search(body)
                if m:
                    add("inverts_the_claim", m.group(0))
                    break
        ex = copied_example(body)
        if ex:
            add("copied_example", ex)
        try:
            from ai.people import invented_person
            who = invented_person(body, pb.people or [], yours_only=True)
            if who:
                add("invented_person", who)
        except Exception:                                    # pragma: no cover
            pass
        if not pb.gender and re.search(r"\bas a (mother|father|wife|husband|woman|man|son|daughter)\b", body, re.I):
            add("gendered")
        if kind == "first_line" and pb.words and pb.note_quality in ("useful", "thin"):
            mine = stems(pb.words) - GLUE
            if mine and not (stems(body) & mine):
                add("not_seen", "uses none of their words")

        # ── stance ───────────────────────────────────────────────────────────
        own = stems(pb.words)
        if pb.stance == "wronged":
            m = WRONGED_RE.search(body)
            if m:
                add("wronged_told_to_bend", m.group(0))
            m = OVERSWING_RE.search(body)
            if m:
                add("overswing", m.group(0))
        if pb.light or pb.stance in ("aspiration", "seeking"):
            for m in PATHOLOGISE_RE.finditer(body):
                if re.search(r"\b(never|not|no|nothing)\b[^,.;:?]{0,40}$", body[max(0, m.start() - 48):m.start()], re.I):
                    continue                                 # "no effort is ever lost", "never lost": the verse's own negation
                if _stem(m.group(0).split()[0]) not in own:
                    add("pathologises_a_light_state", m.group(0))
                    break
        if {"viraha", "shoka"} & set(pb.states):
            m = LETGO_RE.search(body)
            if m:
                add("tells_the_lonely_to_let_go", m.group(0))
        m = BLAME_RE.search(body)
        if m:
            add("blame", m.group(0))
        # ── risk ─────────────────────────────────────────────────────────────
        if pb.risk == "self_harm":
            add("risk_no_model_text")
        if pb.risk == "harm_from_others":
            m = ENDURE_RE.search(body)
            if m:
                add("counsels_endurance_under_harm", m.group(0))
        if pb.risk == "distress" and kind == "practice" and n > 14:
            add("distress_keep_it_small")
        if pb.health_context:
            m = MEDICAL_RE.search(body)
            if m:
                add("medical_direction", m.group(0))
        if not pb.consent and kind in PERSONAL_KINDS:
            add("no_consent_no_model_text")
    ok = not any(i.severity == BLOCK for i in issues)
    return (s if ok else None), issues


def check_personal(parts: dict, vb: VerseBrief, pb: PersonBrief) -> Tuple[Dict[str, str], List[Issue]]:
    """The request-time parts Sarvam wrote -> (those that may be shown, all issues)."""
    out, issues = {}, []
    for kind in ("first_line", "for_you", "practice", "scene_line", "audio_open", "audio_close"):
        if kind not in parts:
            continue
        s, iss = check_text(parts.get(kind), kind, vb, pb)
        issues += iss
        if s:
            out[kind] = s
    if out.get("practice") and out.get("for_you") and out["practice"].lower() in out["for_you"].lower():
        out.pop("practice")
        issues.append(Issue("practice_repeats_for_you", "practice"))
    return out, issues


def check_static(layer: dict, vb: VerseBrief) -> Tuple[dict, List[Issue]]:
    """The offline layer Sarvam wrote for one verse -> (the parts that pass, all issues). `scene.reply` and
    `scene.after` may be null. A scene missing `before` or `moment` is dropped whole (ai/scene.py needs both)."""
    out: dict = {"scene": {}, "audio": {}, "by_stance": {}}
    issues: List[Issue] = []
    if layer.get("meaning"):
        s, iss = check_text(layer["meaning"], "meaning", vb)
        issues += iss
        if s:
            out["meaning"] = s
    for k in ("before", "moment", "reply", "after", "reading"):
        val = (layer.get("scene") or {}).get(k)
        if val in (None, "", "null"):
            out["scene"][k] = None
            continue
        s, iss = check_text(val, f"scene.{k}", vb)
        issues += iss
        out["scene"][k] = s
    if not (out["scene"].get("before") and out["scene"].get("moment")):
        out["scene"] = {}
    for k in ("scene", "unpack", "close"):
        val = (layer.get("audio") or {}).get(k)
        if val:
            s, iss = check_text(val, f"audio.{k}", vb)
            issues += iss
            if s:
                out["audio"][k] = s
    for stance, d in (layer.get("by_stance") or {}).items():
        if not isinstance(d, dict):
            continue
        pb = PersonBrief(stance=stance, light=stance in ("aspiration", "seeking"), consent=True, people=None)
        keep = {}
        for k in ("for_you", "practice"):
            if d.get(k):
                s, iss = check_text(d[k], f"by_stance.{k}", vb, pb)
                issues += [Issue(i.code, f"by_stance.{stance}.{k}", i.detail, i.severity) for i in iss]
                if s:
                    keep[k] = s
        if keep:
            out["by_stance"][stance] = keep
    return out, issues


from . import checker_extra  # noqa: E402,F401  r4 (plan engine v3): wraps check_text with the rules in checker_extra.py

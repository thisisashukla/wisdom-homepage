"""
checker_extra.py: r4 checker rules (plan engine v3, 13 Nov 2026, after the blind Opus judge).

Imported once at the end of checker.py (one line). On import it wraps checker.check_text so every personal part
(first_line, for_you, practice, scene_line, audio_open, audio_close) also passes these rules; static kinds and calls
without a PersonBrief are untouched. harness_v2 is used only by the PLAN_ENGINE=v3 path, so the default path is unchanged.

Rules (each BLOCKs the part; the harness redoes once with the reason, then falls back or leaves the part out):
  invented_accusation        "someone you love accused you" when they never said accused or blamed
  misquotes_their_words      echoes their sentence but drops its negation ("never loved without being abandoned" -> "loved if abandoned")
  verdict_on_their_life      "the last ten years were not for this", "your work was wasted"
  blames_them_for_the_event  "the layoff was your slip", "you slipped", "your failure" when they never named a failure of theirs
  names_a_vice_they_never_showed   "your envy", "you are proud", "the anger at the loss" when nothing they said or were read as carries it
  invented_caste             caste or birth-label language when they never raised caste
  medical_resolve            with a health note: "don't stall", "see it through", "come off it", "taper" in a personal line
  let_go_of_hope             "let it go", "release the hope" to someone grieving, lonely, afraid of being left, or at any risk
  invented_body_state        "your body is already giving way" when they said nothing about their body
  explains_pain_by_a_lack    "you ask this because you have not yet met your own self"
  misattributed_source       "the Gita says" over a verse that is not from a Gita
"""
from __future__ import annotations

import re
from typing import List

from . import checker as _c
from .checker import BLOCK, Issue, PERSONAL_KINDS

REDO = {
    "invented_accusation": "it said someone accused or blamed them; they never said that",
    "misquotes_their_words": "it changed what they wrote; keep their own words, with their 'never' or 'not'",
    "verdict_on_their_life": "it passed a verdict on their years or their work; say nothing about what their past was worth",
    "blames_them_for_the_event": "it made what happened to them their slip or fault; it was not",
    "names_a_vice_they_never_showed": "it named a fault (anger, envy, pride, greed) they never showed; speak only of what they told us",
    "invented_caste": "it brought in caste or a label from birth; they never mentioned it",
    "medical_resolve": "it tied resolve or stopping to their treatment; leave their treatment out entirely",
    "let_go_of_hope": "it told them to let go of a hope; leave their hope with them",
    "invented_body_state": "it described their body; they said nothing about it",
    "explains_pain_by_a_lack": "it said they feel this because of something they lack; do not explain their pain by a lack in them",
    "misattributed_source": "it named the wrong text; name only the text in the VERSE block, or none",
}

ACCUSE_RE = re.compile(r"\b(accus\w*|blam\w*)\b", re.I)
NEG_RE = re.compile(r"\b(never|not|no|without|nobody|nothing|cannot|can'?t|won'?t|don'?t|n't)\b|n't\b", re.I)
VERDICT_LIFE_RE = re.compile(
    r"\b(the|your|these|those|all (the|those|these))\s+(last\s+|past\s+)?((\w+|\d+)\s+)?(years?|decades?|work|career|effort|efforts|life|hours)\s+"
    r"(was|were|has been|have been)\s+(not for (this|that|anything)|for nothing|wasted|in vain|pointless|meaningless|empty|a mistake|a waste)\b", re.I)
EVENT_BLAME_RE = re.compile(
    r"\b(your (slip|fall|failure|failing|mistake|fault|doing)|you (slipped|fell|failed|brought (this|it) on)|"
    r"(the|this|that|your) (layoff|loss|firing|illness|abuse|breakup|death|exit) (was|is) (your|a) (slip|fall|failure|mistake|fault|doing|choice))\b", re.I)
VICE_WORDS = [
    (re.compile(r"\b(pride|proud|arrogan\w*|ego)\b", re.I), {"ahankara", "mada"}, ("pride", "proud", "arrogan", "ego")),
    (re.compile(r"\b(envy|envious|jealous\w*)\b", re.I), {"matsarya"}, ("envy", "envious", "jealous", "harvard", "friend got")),
    (re.compile(r"\b(greed\w*|greedy)\b", re.I), {"lobha"}, ("greed",)),
    (re.compile(r"\b(anger|angry|rage|wrath|resentment)\b", re.I), {"krodha", "manyu"}, ("anger", "angry", "rage", "shout", "furious", "mad at")),
    (re.compile(r"\b(laz\w+|sloth)\b", re.I), {"alasya", "pramada"}, ("lazy", "laziness")),
    (re.compile(r"\b(crav\w*|wanting more|the wanting)\b", re.I), {"trishna", "kama", "lobha", "sanga"}, ("crav", "want more", "greed")),
]
BODY_STATE_RE = re.compile(r"\byour (body|limbs|hands|mouth|heart|chest|stomach|legs|breath)\s+(is |are |was |were |keeps? |has been )?(already |still )?"
                           r"(giving way|shaking|trembling|racing|pounding|failing|burning|turning|dry|tight|heavy)\b", re.I)
BODY_OWN = ("body", "shak", "trembl", "sick", "heart", "chest", "stomach", "hands", "sweat", "panic", "breath", "nause", "pain")
LACK_RE = re.compile(r"\bbecause you (have not|haven'?t|have never|do not|don'?t|did not|didn'?t|never|are not|aren'?t) (yet )?(\w+ )?"
                     r"(met|know|known|understood|understand|seen|see|found|learned|learnt|realised|realized|accepted|let go|ready)\b", re.I)
GITA_RE = re.compile(r"\b(the )?gita\b", re.I)
YOURS_RE = r"\b(your|you(?:'re| are| were| feel| felt| carry| hold)|in you|inside you|are (both |all )?here|is (also )?here)\b"
CASTE_RE = re.compile(r"\b(caste\w*|varna|jati|low[- ]born|born (into|low|beneath)|label(?:led)? (?:fixed )?at birth|fixed at birth)\b", re.I)
RESOLVE_MED_RE = re.compile(r"\b(don'?t stall|stall\w* halfway|halfway|see (it|this) through|push through|no turning back|don'?t stop|follow through|"
                            r"come off|coming off|taper\w*|wean\w*|cut (back|down)|stop taking|cold turkey|go it alone)\b", re.I)
LETGO_HOPE_RE = re.compile(r"\blet (it|that|this|them|him|her) go\b|\b(release|drop|give up|loosen|surrender|let go of|stop holding)\s+(the |your |that |this |on to )?"
                           r"(grip on (that |the |your )?)?(hope|wish|longing|need|wanting)\b|\byour hope is (the|what)\b", re.I)


def _stems(t: str) -> set:
    return _c.stems(t or "")


def _theirs(pb) -> str:
    return " ".join(x for x in (getattr(pb, "words", "") or "", getattr(pb, "emotion", "") or "") if x).lower()


def extra_issues(body: str, kind: str, vb, pb) -> List[Issue]:
    out: List[Issue] = []
    add = lambda code, d="": out.append(Issue(code, kind, str(d)[:60], BLOCK))      # noqa: E731
    mine = _theirs(pb)
    states = set(getattr(pb, "states", None) or [])
    # 1. an accusation they never reported
    m = ACCUSE_RE.search(body)
    if m and not re.search(r"\b(accus|blam)", mine) and re.search(r"\b(you|your|someone|they|he|she)\b", body, re.I):
        sent = next((x for x in _c.sentences(body) if ACCUSE_RE.search(x)), body)
        if not re.search(r"\b(the verse|this verse|bharat|bharata|ram|rama|sita|krishna|says|asks)\b", sent, re.I) or re.search(r"\b(accused you|blamed you|blame you|accuse you|you (are|were|stand|feel) (accused|blamed))\b", sent, re.I):
            add("invented_accusation", m.group(0))
    # 2. their sentence echoed without its negation
    for ps in re.split(r"(?<=[.!?])\s+|\n", getattr(pb, "words", "") or ""):
        pst = _stems(ps) - _c.GLUE
        if len(pst) < 2 or not NEG_RE.search(ps):
            continue
        for s in _c.sentences(body):
            shared = pst & _stems(s)
            if len(shared) >= 2 and len(shared) >= 0.5 * len(pst) and not NEG_RE.search(s) and re.search(r"\b(you|your)\b", s, re.I):
                add("misquotes_their_words", ",".join(sorted(shared))[:60])
                break
    # 3. a verdict on their years or work
    m = VERDICT_LIFE_RE.search(body)
    if m:
        add("verdict_on_their_life", m.group(0))
    # 4. what happened to them made their slip or fault
    m = EVENT_BLAME_RE.search(body)
    if m and not re.search(r"\b(slip|fail|fault|mistake|messed|my doing)", mine):
        add("blames_them_for_the_event", m.group(0))
    # 5. a vice put on them
    for rx, vstates, own in VICE_WORDS:
        if states & vstates or any(w in mine for w in own):
            continue
        for s in _c.sentences(body):
            mm = rx.search(s)
            if mm and re.search(YOURS_RE, s, re.I):
                add("names_a_vice_they_never_showed", mm.group(0))
                break
    # 6. caste
    m = CASTE_RE.search(body)
    if m and not CASTE_RE.search(mine) and "birth" not in mine:
        add("invented_caste", m.group(0))
    # 7. resolve tied to treatment
    if getattr(pb, "health_context", False):
        m = RESOLVE_MED_RE.search(body)
        if m:
            add("medical_resolve", m.group(0))
    # 8. letting go of hope
    at_risk = (getattr(pb, "risk", "none") or "none") != "none"
    if at_risk or states & {"viraha", "shoka", "nirveda", "vishada", "dainya"}:
        m = LETGO_HOPE_RE.search(body)
        if m:
            add("let_go_of_hope", m.group(0))
    # 9. a body they never described
    m = BODY_STATE_RE.search(body)
    if m and not any(w in mine for w in BODY_OWN):
        add("invented_body_state", m.group(0))
    # 10. their pain explained by a lack in them
    m = LACK_RE.search(body)
    if m:
        add("explains_pain_by_a_lack", m.group(0))
    # 11. the wrong text named
    if GITA_RE.search(body):
        src = " ".join(str(getattr(vb, k, "") or "") for k in ("id", "ref", "setting", "speaker")).lower()
        if not re.search(r"\bgita\b", src) and not (getattr(vb, "id", "") or "").startswith("bg."):      # "Gitavali" is not the Gita
            add("misattributed_source", GITA_RE.search(body).group(0))
    return out


_orig_check_text = _c.check_text


def check_text(text, kind, vb, pb=None):
    s, issues = _orig_check_text(text, kind, vb, pb)
    if pb is None or kind not in PERSONAL_KINDS or not isinstance(text, str) or not text.strip():
        return s, issues
    body = _c._without_verse(" ".join(text.split()).strip().strip('"“”'), vb)
    extra = extra_issues(body, kind, vb, pb)
    if extra:
        issues = list(issues) + extra
        s = None
    return s, issues


check_text.__doc__ = _orig_check_text.__doc__
check_text._r4 = True
_c.check_text = check_text


# ── r4 per-day writing: the bridge sentence that opens Days 2 to 7 ───────────────────────────────────────────────
BRIDGE_REDO = {
    "bridge_not_about_yesterday": "the first sentence did not carry yesterday's verse: name yesterday's idea in plain words",
    "bridge_repeats_yesterday": "the first sentence repeated yesterday's point; carry it forward and let today take the next step",
    "bridge_contradicts_yesterday": "the first sentence contradicted yesterday's verse; build on it, never undo it",
    "bridge_too_long": "the first sentence was too long; one short sentence, at most 18 words",
    "bridge_on_day_1": "Day 1 has no yesterday; do not refer to one",
}
REDO.update(BRIDGE_REDO)
_GENERIC_BRIDGE = {"yesterday", "today", "verse", "day", "said", "say", "says", "ask", "asked", "named", "name", "spoke", "word", "words",
                   "line", "read", "saw", "look", "looked", "talk", "talked", "now", "step", "next", "carri", "carry", "brought", "bring"}
CONTRA_RE = re.compile(r"\b(but|yet) (that|this|it) (is|was) (not|wrong|untrue|false)\b|\bforget (yesterday|what)\b|\bnot (really |quite )?(true|right|so)\b|"
                       r"\b(was|is) wrong\b|\bopposite of\b", re.I)
DAY1_BRIDGE_RE = re.compile(r"\b(yesterday|last time|the day before|yesterday's)\b", re.I)


def _bridge_stems(t: str) -> set:
    return {s for s in _stems(t) - _c.GLUE if s not in {_c._stem(w) for w in _GENERIC_BRIDGE} and s not in _GENERIC_BRIDGE}


def check_bridge(for_you: str, prev_line: str = "", prev_claim: str = "", prev_speaker: str = "", prev_for_you: str = "", day: int = 2) -> List[str]:
    """Codes for a for_you whose opening bridge fails. Day 1: no bridge at all. Days 2-7: the first sentence must reference
    yesterday's verse or its idea (a shared content word or its speaker), must not repeat yesterday's personal line and
    must not contradict yesterday's verse."""
    text = for_you or ""
    if day <= 1:
        return ["bridge_on_day_1"] if DAY1_BRIDGE_RE.search(text) else []
    sents = _c.sentences(text)
    first = sents[0] if sents else ""
    codes = []
    if _c.n_words(first) > 18:
        codes.append("bridge_too_long")
    fs, ps = _bridge_stems(first), _bridge_stems(f"{prev_line} {prev_claim}")
    sp = (prev_speaker or "").split()
    named = bool(sp) and re.search(rf"\b{re.escape(sp[0])}\b", first, re.I)
    if not (fs & ps) and not named:
        codes.append("bridge_not_about_yesterday")
    if prev_for_you and len(fs) >= 3:
        pf = _bridge_stems(prev_for_you)
        if len(fs & pf) / len(fs) >= 0.7:
            codes.append("bridge_repeats_yesterday")
    if CONTRA_RE.search(first) and (fs & ps or named):
        codes.append("bridge_contradicts_yesterday")
    return codes


def drop_bridge(for_you: str) -> str:
    """The for_you without its first sentence (used when the bridge fails twice)."""
    sents = _c.sentences(for_you or "")
    return " ".join(sents[1:]).strip()


def echoes_yesterday(for_you: str, prev_for_you: str = "", skip_first: bool = True) -> bool:
    """r4n: True when a sentence of today's line (after the bridge) is yesterday's line again."""
    if not for_you or not prev_for_you:
        return False
    norm = lambda t: " ".join(re.findall(r"[a-z']+", t.lower()))
    psents = _c.sentences(prev_for_you)
    prev = [_stems(s) - _c.STOP for s in psents]
    pnorm = {norm(s) for s in psents}
    tsents = _c.sentences(for_you)
    if tsents and psents and norm(tsents[0]) == norm(psents[0]):
        return True                                       # the same bridge as yesterday's
    for s in tsents[1 if skip_first else 0:]:
        st = _stems(s) - _c.STOP
        if norm(s) in pnorm and len(s.split()) >= 4:
            return True
        if len(st) >= 3 and any(p and len(st & p) / len(st) >= 0.6 for p in prev):
            return True
    return False

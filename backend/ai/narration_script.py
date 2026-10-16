"""
narration_script.py — the spoken version of a plan day, written as one story for one person.

What "Listen" plays is not a reading of the screen. It is a friend telling them, in about a minute
and a half, why this verse is for them today:

    open      their life, with empathy: what they are carrying, in their own situation
    scene     the moment in the text: who was there, what was asked ("Arjuna said to Krishna..."),
              ending on the hand-over to the verse ("And Krishna replied:")
    sanskrit  the verse itself, in Sanskrit (or Awadhi, Braj), spoken in a devotional voice
    line      "In plain words: <the card line>"
    unpack    what it proposes, with its philosophy and with honesty about how hard it is
    for_you   what it asks of their life today
    close     one line to leave with (often a question)

The model writes open, scene, unpack, for_you and close. It never writes the verse: the Sanskrit
and the plain line are inserted here from the library, so the words attributed to Krishna, Arjuna,
Rama or Tulsidas are always the text's own. Every written part passes the same voice and fidelity
checks as the screen's personal words (ai/personalize.py, ai/voice.py). A part that fails is
replaced by a plain, honest one composed from the library (and from the day's "What it says" and
"For you", so the audio and the screen say the same thing); without a person or a model the whole
script is composed that way.

Privacy: the model sees the reading's paraphrases and the verse, never the raw note.
"""
from __future__ import annotations

import asyncio
import logging
import re
from typing import Dict, List, Optional, Tuple

from ai.personalize import MUST_RE, _why
from ai.voice import FIDELITY, VOICE, PersonContext, grounding_block, person_block

logger = logging.getLogger(__name__)

# (min words, max words) per written part
LIMITS = {"open": (14, 60), "scene": (12, 75), "unpack": (25, 95), "for_you": (18, 70), "close": (4, 26)}
STORY_LIMITS = {**LIMITS, "scene": (40, 150)}

SYSTEM = """\
You write the words a narrator speaks when one person taps "Listen" on today's verse in their plan. It is about a minute and a half of audio, heard once, often with eyes closed. It must hold them from the first sentence to the last.

{voice}

{fidelity}

HOW THE PIECE IS BUILT
The app inserts the verse itself between your parts: first the original Sanskrit (or Awadhi or Braj), then "In plain words:" and its English line. You never write the verse, never translate it again, never quote it. You write five parts around it:
1. "open" (20 to 50 words): begin with them, not with scripture. Name what they are carrying, in their own situation and at their stage of life, so they feel heard in the first breath. Second person. No greeting, no "today we".
2. "scene" (20 to 60 words): carry them into the moment the verse was spoken, told in the third person, from the source only: who was there, what was happening, and, if the source tells it, what the listener had said or asked. Use only the setting and story given for THIS verse; if they are thin, keep the scene short rather than borrowing a battlefield or a moment from elsewhere. You may draw one honest line between their life and that moment, in your own words, but never cast them as the character. End by handing over, with a colon, to the person who speaks this verse (the "said by" line): if Krishna speaks it, "And Krishna replied:"; if Arjuna speaks it, "Arjuna said:"; if a poet or teacher wrote it, "<name> puts it this way:". Never hand over to someone who does not speak it.
3. "unpack" (35 to 80 words): what the verse proposes, the philosophy underneath it, plainly and faithfully. Be honest about how hard it is to live ("This is easier said than done, because..."). No new teachings.
4. "for_you" (30 to 60 words): what it asks of their life today, through their details and the day's job. Concrete, small, kind.
5. "close" (6 to 22 words): one line to leave with. A quiet question, or the verse's idea in a few words. Not a summary, not a blessing.
For a STORY day, "scene" tells the story itself (60 to 130 words, present tense, concrete, faithful to the source) and ends on the line from it if one is given ("...and he says:"), otherwise on its turning point.

Write for the ear: short sentences, natural pauses, no lists, no brackets, no abbreviations, no numbers in digits, no dashes. Names as they are said aloud (Krishna, Arjuna, Rama, Tulsidas).

Return ONLY JSON: {{"open": "...", "scene": "...", "unpack": "...", "for_you": "...", "close": "..."}}"""


def system_prompt() -> str:
    return SYSTEM.format(voice=VOICE, fidelity=FIDELITY)


JOB = {
    "hook": "see: name what is happening to them right now",
    "diagnose": "see: show them the pattern underneath it",
    "steady": "steady: what they can hold on to while it hurts",
    "act": "act: one small, concrete thing they can do today",
    "story": "story: what this story's hero shows them about their own situation",
}


def _user(ctx: PersonContext, item: dict, shown: Dict[str, Optional[str]], has_sanskrit: bool) -> str:
    kind = "STORY" if item.get("kind") == "story" else "VERSE"
    lines = ["THE PERSON", person_block(ctx), "",
             f"TODAY'S JOB: {JOB.get(item['beat'], item['beat'])}",
             f"TODAY'S {kind}", grounding_block(item),
             f"  the app will play: {'the original verse, then ' if has_sanskrit else ''}\"In plain words: {item.get('line') or ''}\""]
    if shown.get("meaning"):
        lines.append(f"\nAlready on their screen as \"What it says\" (stay consistent, do not repeat it word for word): {shown['meaning']}")
    if shown.get("for_you"):
        lines.append(f"Already on their screen as \"For you\" (stay consistent, say it fresh): {shown['for_you']}")
    return "\n".join(lines)


HANDOVER_RE = re.compile(r":\s*$")
NAMED_SPEAKERS = ("Krishna", "Arjuna", "Rama", "Ram", "Sita", "Lakshmana", "Lakshman", "Hanuman", "Bharata", "Vidura", "Bhishma",
                  "Yudhishthira", "Draupadi", "Kunti", "Vyasa", "Narada", "Vasishtha", "Ashtavakra", "Janaka", "Tulsidas",
                  "Vivekananda", "Bhartrihari", "Kausalya", "Dasharatha", "Yama", "Nachiketa", "Sanjaya", "Uddhava")
WORD_RE = re.compile(r"[a-z']+")


def _grams(t: str, n: int = 5) -> set:
    w = WORD_RE.findall((t or "").lower())
    return {" ".join(w[i:i + n]) for i in range(len(w) - n + 1)}


def strip_verse(scene: str, item: dict) -> str:
    """The verse is played right after the scene, so the scene must not say it first: cut the scene at the
    first sentence that speaks the verse's own words (five in a row from its line or translation)."""
    verse = _grams(item.get("line") or "") | _grams(item.get("translation") or "")
    if not verse:
        return scene
    keep = []
    for sent in re.split(r"(?<=[.!?:])\s+", scene):
        if _grams(sent) & verse:
            break
        keep.append(sent)
    out = " ".join(keep).strip()
    return out if out != scene.strip() else scene     # a cut ending "...and says:" is already a hand-over


def check_parts(raw: dict, item: dict, risk: str) -> Tuple[Dict[str, str], Dict[str, str]]:
    """→ (parts that pass, {part: reason} for the ones that didn't)."""
    out, why = {}, {}
    if not isinstance(raw, dict):
        return out, {"all": "not_json"}
    limits = STORY_LIMITS if item.get("kind") == "story" else LIMITS
    for k, (lo, hi) in limits.items():
        s, reason = _why(raw.get(k), lo, hi, risk, item, grounded=k in ("scene", "unpack"))
        if not s:
            why[k] = reason
            continue
        if k in ("open", "for_you") and not re.search(r"\byou(r|'re|'ve|'d|'ll|rself)?\b", s, re.I):
            why[k] = "not_second_person"
            continue
        if k in ("unpack", "for_you", "close") and MUST_RE.search(s):
            why[k] = "preachy"
            continue
        if k == "scene" and re.search(r"^you (stand|are standing|sit|are sitting)\b", s, re.I):
            why[k] = "casts_them_as_character"
            continue
        if k == "scene" and item.get("kind") != "story":
            cut = strip_verse(s, item)
            if cut != s:
                if len(cut.split()) < 8:
                    why[k] = "says_the_verse"
                    continue
                s = cut
        out[k] = s
    return out, why


# ── The verse as spoken ──────────────────────────────────────────────────────
DIGIT_RE = re.compile(r"[०-९0-9]+")


def spoken_sanskrit(deva: Optional[str]) -> Optional[str]:
    """Devanagari as the voice should read it: dandas become pauses, verse numbers go."""
    if not deva:
        return None
    s = DIGIT_RE.sub(" ", deva)
    s = re.sub(r"\s*॥\s*", ". ", s)
    s = re.sub(r"\s*।\s*", ", ", s)
    s = re.sub(r"\s*([,.])\s*(?=[,.])", "", s)
    s = re.sub(r"\s+", " ", s).strip(" ,")
    if not s.endswith("."):
        s += "."
    return s if re.search("[ऀ-ॿ]", s) else None


def _sentence(s: Optional[str]) -> str:
    s = re.sub(r"\s*[—–]\s*", ", ", (s or "").strip())
    return s if not s or s[-1] in ".?!:" else s + "."


def _who(item: dict) -> Tuple[str, str]:
    return (item.get("speaker") or "").strip(), (item.get("listener") or "").strip()


def fallback_parts(item: dict, shown: Dict[str, Optional[str]]) -> Dict[str, str]:
    """A plain, honest script from the library and the day's own words: the same story shape, nothing invented."""
    sp, ls = _who(item)
    out: Dict[str, str] = {}
    if item.get("kind") == "story":
        if item.get("opening"):
            out["open"] = _sentence(item["opening"])
        out["scene"] = _sentence(item.get("summary") or item.get("title") or "")
        if item.get("lesson"):
            out["unpack"] = "What it shows. " + _sentence(item["lesson"])
    else:
        setting = _sentence(item.get("setting") or "")
        hand = f"{sp} said to {ls}:" if sp and ls else (f"{sp} said:" if sp else "The text says:")
        out["scene"] = f"{setting} {hand}".strip() if setting else hand
        unpack = shown.get("meaning") or item.get("point")
        if unpack:
            out["unpack"] = ("" if shown.get("meaning") else "What it means. ") + _sentence(unpack)
        if item.get("misuse"):
            out["close"] = "And what it does not mean. " + _sentence(item["misuse"])
    if shown.get("for_you"):
        out["for_you"] = "For you, today. " + _sentence(shown["for_you"])
    return out


def fix_handover(scene: str, item: dict) -> str:
    """The verse that follows is the speaker's own words, so the scene must hand over to the speaker. A
    hand-over to anyone else ("And Krishna replied:" before Arjuna's own lament) is replaced."""
    sp, _ = _who(item)
    if not scene or item.get("kind") == "story":
        return scene
    if not HANDOVER_RE.search(scene):
        return f"{scene.rstrip('.')}. {sp + ' said' if sp else 'The text says'}:"
    if not sp:
        return scene
    sents = re.split(r"(?<=[.!?])\s+", scene.strip())
    last = sents[-1]
    first = sp.split()[-1] if sp.split()[0].lower() in ("swami", "sage", "king", "queen", "lord") else sp.split()[0]
    speaks = r"[^.:!?]*\b(said|says|replied|replies|asked|asks|answered|answers|puts it|cried|cries|spoke|speaks|tells|told|continues|continued|went on)\b"
    if re.search(rf"\b{re.escape(first)}\b{speaks}", last, re.I):
        return scene
    other = [n for n in NAMED_SPEAKERS if n.lower() != first.lower() and n not in sp and re.search(rf"\b{n}\b{speaks}", last)]
    if not other:
        return scene                       # "And he replied:" or a hand-over without a name: leave it
    hand = f"And {sp} replied:" if _who(item)[1] else f"{sp} puts it this way:"
    if sp.split()[0] in ("Arjuna", "Rama", "Ram", "Sita", "Draupadi", "Kausalya"):
        hand = f"{sp} said:"
    return " ".join(sents[:-1] + [hand]).strip()


def assemble(item: dict, parts: Dict[str, str], sanskrit: Optional[str]) -> List[Tuple[str, str]]:
    """(kind, text) in spoken order. kind "sanskrit" is spoken by the devotional voice in Hindi script mode."""
    sp, _ = _who(item)
    scene = fix_handover(parts.get("scene", ""), item)
    seq: List[Tuple[str, str]] = []
    if parts.get("open"):
        seq.append(("open", parts["open"]))
    if scene:
        seq.append(("scene", scene))
    if sanskrit:
        seq.append(("sanskrit", sanskrit))
    if item.get("line"):
        seq.append(("line", ("In plain words: " if sanskrit else "") + _sentence(item["line"])))
    for k in ("unpack", "for_you", "close"):
        if parts.get(k):
            seq.append((k, parts[k]))
    return [(k, t.strip()) for k, t in seq if t and t.strip(" .:")]


async def write_script(llm, ctx: Optional[PersonContext], item: dict, shown: Dict[str, Optional[str]],
                       sanskrit: Optional[str], timeout_s: float) -> Tuple[List[Tuple[str, str]], List[str]]:
    """→ (the script as (kind, text), flags). Never fails: missing or failed parts are composed from the library."""
    flags: List[str] = []
    base = fallback_parts(item, shown)
    if llm is None or ctx is None or timeout_s < 2:
        flags.append("script:composed")
        return assemble(item, base, sanskrit), flags
    msgs = [{"role": "system", "content": system_prompt()},
            {"role": "user", "content": _user(ctx, item, shown, bool(sanskrit))}]
    try:
        raw = await asyncio.wait_for(
            asyncio.to_thread(llm.chat_json, msgs, temperature=0.55, max_tokens=1100, timeout_s=max(2, int(timeout_s))),
            timeout=timeout_s)
    except Exception as e:
        logger.info("narration script skipped: %s", type(e).__name__)
        flags.append(f"script:error:{type(e).__name__}")
        return assemble(item, base, sanskrit), flags
    good, bad = check_parts(raw, item, ctx.risk)
    if bad:
        flags.append("script:dropped:" + ",".join(f"{k}={v}" for k, v in sorted(bad.items())))
    # the story needs its scene; without the written scene and open, the composed pair keeps it whole
    if "scene" not in good and "open" in good and item.get("kind") == "story":
        good.pop("open")
    parts = {**base, **good}
    if "open" not in good and "open" in parts and item.get("kind") != "story":
        parts.pop("open")
    flags.append(f"script:written:{len(good)}/5")
    return assemble(item, parts, sanskrit), flags

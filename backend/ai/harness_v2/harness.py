"""
harness.py: request time. A PersonBrief, a VerseBrief and the verse's static layer in; the day page's layers out.

What waits on a model, and what does not:

    static        verse, original, meaning, scene, base audio           cache, 0 ms
    chip line     one line for their feeling word                        cache, 0 ms (all a no-consent reader gets, plus by_stance)
    first_line    ONE sentence from their own words to this verse        one Sarvam call: ~450 tokens in, <= 90 out, 3.5 s cap
    personal      for_you, practice, scene_line, audio_open/close        one Sarvam call, started after first_line, never blocks paint

Rules that hold on every path:
  * consent False            -> no model is called and `words` is already empty (briefs.py); chips + static only
  * risk self_harm           -> no model is called; the safety card leads; no practice, no questions
  * fit_guard(person, verse) -> non-empty: nothing personal is written for this verse; the caller swaps it
  * every model-written part passes checker.check_personal; a failed part falls back to the static layer's
    by_stance line (for_you, practice) or is simply absent (scene_line, audio_open). One redo, with reasons.
"""
from __future__ import annotations

import asyncio
import time
from typing import Callable, Dict, List, Optional, Tuple

from .briefs import PersonBrief, VerseBrief, fit_guard, fit_notes
from .checker import BLOCK, Issue, check_personal, check_text
from .prompts import first_line_messages, personal_messages
from .vocab import EMOTIONS, STANCES

FIRST_LINE_TIMEOUT_S = 3.5
PERSONAL_TIMEOUT_S = 8.0

REDO_TEXT = {
    "contrast_pattern": "it denied one thing to assert another; write only the assertion",
    "wronged_told_to_bend": "it asked a wronged person to bend, wait, forgive or stay quiet; give footing and courage only",
    "pathologises_a_light_state": "it found a problem in someone who has none; be glad with them and say what the verse offers",
    "invented_life_detail": "it stated a detail of their life they never gave",
    "invented_person": "it brought in a person they never mentioned",
    "untraced_scripture_claim": "it credited the verse with something the VERSE block does not say",
    "imported_doctrine_or_technique": "it imported a doctrine or technique the verse does not name",
    "preachy": "it told them what they should do", "verdict": "it passed a verdict on them", "long": "it was too long",
    "short": "it was too short", "intensifier": "it used an intensifier", "cliche": "it used a cliche",
    "medical_direction": "it gave direction about their medication or treatment", "promise": "it promised an outcome",
    "tells_the_lonely_to_let_go": "it told someone lonely or grieving to let go", "not_second_person": "it did not speak to them as you",
    "inverts_the_claim": "it said the opposite of what the verse proposes; say what the verse asks, as it asks it",
    "names_treatment": "it mentioned their medication or treatment; say nothing about it either way",
    "overrules_their_feeling": "it told a lonely or grieving person they are not alone; leave their feeling with them",
    "invented_person": "it brought in a person they never mentioned",
}


def _may_call_model(llm, pb: PersonBrief) -> Tuple[bool, str]:
    if llm is None:
        return False, "no_model"
    if not pb.consent:
        return False, "no_consent"
    if pb.risk == "self_harm":
        return False, "risk_self_harm"
    return True, ""


def chip_first_line(pb: PersonBrief, static_store=None) -> Dict[str, Optional[str]]:
    """The line that is always there at 0 ms: the offline chip line for their word, else the app's own line for it."""
    if pb.risk == "self_harm":
        try:
            from ai.understanding import SAFE_MIRROR
            return {"text": SAFE_MIRROR.get("self_harm"), "source": "safety"}
        except Exception:                                    # pragma: no cover
            return {"text": None, "source": "safety"}
    from .vocab import stage_key
    line = static_store.chip_line(pb.emotion, stage_key(pb.life_stage, pb.stage_trusted), pb.stance) if static_store is not None else None
    if line:
        return {"text": line, "source": "chip"}
    if pb.emotion in EMOTIONS:
        return {"text": EMOTIONS[pb.emotion][3], "source": "app_emotion_line"}       # their own word's line, shown as theirs
    return {"text": None, "source": "none"}


_LINE_KEY_RE = __import__("re").compile(r'"line"\s*:\s*"')
_STANCE_RE = __import__("re").compile(r'"stance"\s*:\s*"(struggle|aspiration|wronged|seeking)"')
_ESC = {"n": " ", "t": " ", '"': '"', "\\": "\\", "/": "/"}


def line_so_far(buf: str) -> Tuple[str, bool]:
    """From a partial JSON buffer: (the "line" value received so far, whether its closing quote has arrived)."""
    m = _LINE_KEY_RE.search(buf or "")
    if not m:
        return "", False
    out, esc, i = [], False, m.end()
    while i < len(buf):
        c = buf[i]
        if esc:
            if c == "u" and i + 4 < len(buf):
                try:
                    out.append(chr(int(buf[i + 1:i + 5], 16)))
                    i += 4
                except ValueError:
                    pass
            else:
                out.append(_ESC.get(c, c))
            esc = False
        elif c == "\\":
            esc = True
        elif c == '"':
            return "".join(out), True
        else:
            out.append(c)
        i += 1
    return "".join(out), False


def _stream_first_line(llm, msgs: list, timeout_s: float) -> Tuple[Optional[dict], int]:
    """Read the first line off Sarvam's stream and stop as soon as the line's closing quote arrives (the JSON's tail
    is not needed). -> ({"stance", "line"} or None, ms to the first token). Nothing is shown from inside the stream:
    the caller checks the complete line before anything reaches the person."""
    t0, ttft, buf = time.perf_counter(), -1, ""
    for chunk in llm.synthesize_rag_stream(msgs[0]["content"], msgs[1]["content"], max_tokens=90):
        if ttft < 0:
            ttft = int((time.perf_counter() - t0) * 1000)
        buf += chunk
        line, done = line_so_far(buf)
        if done:
            m = _STANCE_RE.search(buf)
            return {"line": line, "stance": m.group(1) if m else None}, ttft
        if time.perf_counter() - t0 > timeout_s:
            break
    return None, ttft


def first_line(llm, pb: PersonBrief, vb: VerseBrief, static_store=None, timeout_s: float = FIRST_LINE_TIMEOUT_S,
               stream: bool = False) -> dict:
    """The only thing the first screen waits for. -> {text, source, stance_hint, ms, ttft_ms, issues, prompt_chars}.
    source: model | chip | app_emotion_line | safety | none. Never raises. stream=True reads Sarvam's stream and
    finishes the moment the line closes (needs llm.synthesize_rag_stream; else the plain call is used)."""
    base = chip_first_line(pb, static_store)
    out = {**base, "stance_hint": None, "ms": 0, "ttft_ms": None, "issues": [], "prompt_chars": 0}
    ok, why = _may_call_model(llm, pb)
    if not ok:
        out["issues"] = [why]
        return out
    if fit_guard(pb, vb):
        out["issues"] = ["fit_guard"]
        return out
    msgs = first_line_messages(pb, vb)
    out["prompt_chars"] = sum(len(m["content"]) for m in msgs)
    t0 = time.perf_counter()
    try:
        if stream and hasattr(llm, "synthesize_rag_stream"):
            raw, out["ttft_ms"] = _stream_first_line(llm, msgs, timeout_s)
            if raw is None:
                raise TimeoutError("line did not close in time")
        else:
            raw = llm.chat_json(msgs, temperature=0.4, max_tokens=90, timeout_s=max(2, int(timeout_s)))
    except Exception as e:                                   # noqa: BLE001
        out["ms"] = int((time.perf_counter() - t0) * 1000)
        out["issues"] = [f"llm_error:{type(e).__name__}"]
        return out
    out["ms"] = int((time.perf_counter() - t0) * 1000)
    if not isinstance(raw, dict):
        out["issues"] = ["not_json"]
        return out
    hint = raw.get("stance") if raw.get("stance") in STANCES else None
    out["stance_hint"] = hint
    # The model's stance may only make the guard STRICTER for this line: checked under both where they differ.
    text, issues = check_text(raw.get("line"), "first_line", vb, pb)
    if text and hint and hint != pb.stance and pb.risk == "none":
        alt = PersonBrief(**{**pb.__dict__, "stance": hint, "light": pb.light or hint in ("aspiration", "seeking")})
        text2, issues2 = check_text(text, "first_line", vb, alt)
        if text2 is None:
            text, issues = None, issues + issues2
    out["issues"] = [str(i) for i in issues]
    if text:
        out.update(text=text, source="model")
    return out


def personal_layer(llm, pb: PersonBrief, vb: VerseBrief, static: dict, first: str = "", timeout_s: float = PERSONAL_TIMEOUT_S) -> dict:
    """for_you, practice, scene_line, audio_open, audio_close. -> {parts, source per part, calls, ms, issues}.
    Parts the model could not write well come from static['by_stance'][stance]; never from another person's words."""
    fallback = (static.get("by_stance") or {}).get(pb.stance) or {}
    out = {"parts": {}, "source": {}, "calls": 0, "ms": 0, "issues": []}

    def fill():
        for k in ("for_you", "practice"):
            if k not in out["parts"] and fallback.get(k) and pb.risk != "self_harm":
                out["parts"][k] = fallback[k]
                out["source"][k] = "static"
        return out

    guard = fit_guard(pb, vb)
    if guard:                                # a bad match is swapped by the caller, never dressed, not even with the static line
        out["issues"] = ["fit_guard:" + ",".join(guard)]
        return out
    ok, why = _may_call_model(llm, pb)
    if not ok:
        out["issues"] = [why]
        return fill()
    t0 = time.perf_counter()
    redo = ""
    for attempt in (1, 2):
        left = timeout_s - (time.perf_counter() - t0)
        if left < 2:
            break
        try:
            raw = llm.chat_json(personal_messages(pb, vb, first, redo), temperature=0.45 if attempt == 1 else 0.3,
                                max_tokens=420, timeout_s=max(2, int(left)))
            out["calls"] += 1
        except Exception as e:                               # noqa: BLE001
            out["calls"] += 1
            out["issues"].append(f"llm_error:{type(e).__name__}")
            break
        if not isinstance(raw, dict):
            out["issues"].append("not_json")
            break
        want = {k: v for k, v in raw.items() if k not in out["parts"]}
        got, issues = check_personal(want, vb, pb)
        if first:
            got = {k: v for k, v in got.items() if v.strip().lower() != first.strip().lower()}
        for k, v in got.items():
            out["parts"][k] = v
            out["source"][k] = "model"
        blocked = [i for i in issues if i.severity == BLOCK and i.where in ("for_you", "practice") and i.where not in out["parts"]]
        out["issues"] += [str(i) for i in issues if i.severity == BLOCK]
        if not blocked:
            break
        redo = "\n".join(f"- {i.where}: {REDO_TEXT.get(i.code, i.code)}" for i in blocked)
    out["ms"] = int((time.perf_counter() - t0) * 1000)
    return fill()


def spoken_original(text: str) -> Optional[str]:
    """The verse as the reciter reads it: dandas become pauses, verse numbers go. None when there is no original."""
    import re
    if not text:
        return None
    s = re.sub(r"[०-९0-9]+", " ", text)
    s = re.sub(r"\s*॥\s*", ". ", s)
    s = re.sub(r"\s*।\s*", ", ", s)
    s = re.sub(r"\s+", " ", s).strip(" ,")
    return (s if s.endswith(".") else s + ".") if s else None


def audio_script(vb: VerseBrief, static: dict, personal: Optional[dict] = None) -> List[Tuple[str, str, str]]:
    """(kind, text, cache) in spoken order. cache = "verse" for segments identical for every listener (their audio
    is synthesised once per verse and reused) and "person" for the two or three short personal ones.

        open (person) · scene, ending "And Krishna replied:" (verse) · the original, recited (verse) ·
        "In plain words: <card line>" (verse) · unpack (verse) · for_you (person) · close (person, else verse)
    """
    p = (personal or {}).get("parts") or {}
    a = static.get("audio") or {}
    seq: List[Tuple[str, str, str]] = []
    if p.get("audio_open"):
        seq.append(("open", p["audio_open"], "person"))
    if a.get("scene"):
        seq.append(("scene", a["scene"], "verse"))
    orig = spoken_original(vb.sanskrit)
    if orig:
        seq.append(("sanskrit", orig, "verse"))
    if vb.line:
        seq.append(("line", ("In plain words: " if orig else "") + vb.line.rstrip() + ("" if vb.line.rstrip()[-1:] in ".?!" else "."), "verse"))
    if a.get("unpack"):
        seq.append(("unpack", a["unpack"], "verse"))
    if p.get("for_you"):
        seq.append(("for_you", p["for_you"], "person"))
    if p.get("audio_close"):
        seq.append(("close", p["audio_close"], "person"))
    elif a.get("close"):
        seq.append(("close", a["close"], "verse"))
    return seq


def day_page(llm, pb: PersonBrief, vb: VerseBrief, static_store=None, beat: str = "hook",
             on_first_line: Optional[Callable[[dict], None]] = None, stream: bool = False) -> dict:
    """Everything for one day, in the order it becomes available. Synchronous (call it in a thread); `on_first_line`
    fires as soon as the first line is ready so a server can flush it to the client before the rest is written."""
    static = static_store.get(vb) if static_store is not None else __import__("ai.harness_v2.static_layer", fromlist=["from_library"]).from_library(vb)
    page = {"verse": {"id": vb.id, "ref": vb.ref, "original": vb.sanskrit, "line": vb.line, "speaker": vb.speaker, "listener": vb.listener},
            "static": {"meaning": static.get("meaning") or vb.translation, "scene": static.get("scene") or {}, "misuse": vb.misuse,
                       "source": static.get("source"), "reviewed": bool(static.get("reviewed"))},
            "fit": fit_guard(pb, vb), "fit_notes": fit_notes(pb, vb, beat),
            "swap": bool(fit_guard(pb, vb)),         # the caller must choose another verse; nothing personal was written for this one
            "safety": pb.risk if pb.risk in ("self_harm", "harm_from_others") else None}
    fl = first_line(llm, pb, vb, static_store, stream=stream)
    page["first_line"] = fl
    if on_first_line:
        on_first_line(fl)
    if fl.get("stance_hint") and fl["stance_hint"] != pb.stance:
        page["fit_notes"].append(f"stance_disagrees:brief={pb.stance},model={fl['stance_hint']}")
    pl = personal_layer(llm, pb, vb, static, fl["text"] if fl.get("source") == "model" else "")
    page["personal"] = pl
    page["audio"] = [{"kind": k, "text": t, "cache": c} for k, t, c in audio_script(vb, static, pl)]
    page["llm_calls"] = (1 if fl.get("prompt_chars") else 0) + pl["calls"]
    return page


async def day_page_async(llm, pb: PersonBrief, vb: VerseBrief, static_store=None, beat: str = "hook") -> dict:
    return await asyncio.to_thread(day_page, llm, pb, vb, static_store, beat)

"""
static_layer.py: what is the same for every reader of a verse, written once offline and cached.

    meaning        what the verse says (shown under the verse at 0 ms)
    scene          before / moment / reply / after / reading / source_range (the ai/scene.py schema)
    audio          scene (spoken, ends by handing over to the speaker) / unpack / close; harness.audio_script weaves
                   the original verse between scene and unpack, so the Sanskrit is always the library's own
    by_stance      {stance: {for_you, practice}}: what a reader sees when nothing personal can be written
                   (no consent, model down, or the personal line failed its checks)
    reviewed       False until a person has read it. Unreviewed text may be served; reviewed text is never rewritten.

Every part is written by Sarvam (prompts.SCENE_SYSTEM, prompts.CORE_SYSTEM) and passes checker.check_static before
it is stored. A verse with no stored layer gets `from_library`: the library's own fields, no model, nothing new.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, Optional

from .briefs import VerseBrief
from .checker import Issue, check_static, check_text
from .prompts import chip_lines_messages, core_messages, scene_messages

TEXT_NAME = {"bg": "Bhagavad Gita", "vr": "Valmiki Ramayana", "rcm": "Ramcharitmanas", "mbh": "Mahabharata"}


def handover(vb: VerseBrief) -> str:
    sp, ls = vb.speaker.strip(), vb.listener.strip()
    return f"{sp} said to {ls}:" if sp and ls else f"{sp} said:" if sp else "The text says:"


def from_library(vb: VerseBrief) -> dict:
    """No model: the library's own words in the layer's shape. Used until a verse's layer has been generated."""
    sc = dict(vb.scene or {})
    if not sc and vb.story and vb.setting:
        sc = {"before": vb.story, "moment": vb.setting, "reply": None, "after": None, "reading": vb.lesson or None, "source_range": vb.ref}
    setting = vb.setting.rstrip(". ") + ". " if vb.setting else ""
    return {"meaning": None, "scene": sc, "audio": {"scene": (setting + handover(vb)).strip(), "unpack": vb.reading or None, "close": None},
            "by_stance": {}, "reviewed": False, "source": "library"}


def scene_source(v: dict, p: Optional[dict], prev: Optional[dict], nxt: Optional[dict], vb: VerseBrief, raw: str = "") -> str:
    """The grounded brief a scene may be written from: library fields, the prasangs either side, the label's
    claim and traditional reading, and (when found) the neighbouring verses from the raw text."""
    p = p or {}
    rows = [f"reference: {vb.ref}", f"said by: {vb.speaker or 'unknown'}" + (f" to {vb.listener}" if vb.listener else ""),
            f"setting: {vb.setting}", f"card line: {vb.line}", f"translation: {vb.translation}",
            f"what it claims: {vb.claim}", f"how the tradition reads it ({vb.reading_source or 'library note'}): {vb.reading}",
            f"what it does NOT mean: {vb.misuse}",
            f"the story around it: {p.get('title_en') or ''}. {p.get('summary') or ''}" if p else "",
            f"characters in that story: {', '.join(p.get('characters') or [])}" if p.get("characters") else "",
            f"the story just before: {prev.get('title_en') or ''}. {prev.get('summary') or ''}" if prev else "",
            f"the story just after: {nxt.get('title_en') or ''}. {nxt.get('summary') or ''}" if nxt else "",
            f"the verses around it in the text (translation):\n{raw}" if raw else ""]
    return "\n".join(r for r in rows if r and not r.rstrip().endswith(":") and not r.endswith(": . "))


def source_range(v: dict, p: Optional[dict]) -> str:
    name = TEXT_NAME.get(v.get("family") or v.get("text") or "", v.get("collection") or "")
    if p and p.get("gitapress_range"):
        return f"{name} {p['gitapress_range']}".strip()
    return v.get("display_ref") or v.get("ref_label") or v["id"]


def write_scene(llm, vb: VerseBrief, source: str, tries: int = 2, timeout_s: int = 40) -> tuple[Optional[dict], list]:
    """Sarvam writes the scene from `source`; the checker gates it. -> ({before, moment, reply, after, reading,
    spoken}, issues of the last attempt). None when no attempt passed."""
    grounded = VerseBrief(**{**vb.__dict__, "story": vb.story + " " + source})      # the scene may draw on the whole source
    last: list = []
    best: Optional[dict] = None
    for k in range(tries):
        try:
            raw = llm.chat_json(scene_messages(source), temperature=0.3 if k == 0 else 0.15, max_tokens=700, timeout_s=timeout_s)
        except Exception as e:                                                   # noqa: BLE001
            last = [Issue("llm_error", "scene", type(e).__name__)]
            continue
        if not isinstance(raw, dict):
            last = [Issue("not_json", "scene")]
            continue
        got, issues = check_static({"scene": raw, "audio": {"scene": raw.get("spoken")}}, grounded)
        blocked = [i for i in issues if i.severity == "block" and i.where in ("scene.before", "scene.moment", "scene.reading")]
        if got.get("scene") and not blocked:
            cand = dict(got["scene"])
            cand["spoken"] = got["audio"].get("scene")
            if best is None or (cand["spoken"] and not best.get("spoken")):
                best, last = cand, issues
            elif best and not best.get("spoken") and cand.get("spoken"):
                best["spoken"] = cand["spoken"]
            if best.get("spoken"):
                break
        elif best is None:
            last = issues
    return best, last


def write_core(llm, vb: VerseBrief, stances: list, tries: int = 2, timeout_s: int = 40) -> tuple[dict, list]:
    last: list = []
    best: dict = {}
    for k in range(tries):
        try:
            raw = llm.chat_json(core_messages(vb, stances), temperature=0.35 if k == 0 else 0.2, max_tokens=900, timeout_s=timeout_s)
        except Exception as e:                                                   # noqa: BLE001
            last = [Issue("llm_error", "core", type(e).__name__)]
            continue
        if not isinstance(raw, dict):
            continue
        got, last = check_static({"meaning": raw.get("meaning"), "audio": {"unpack": raw.get("unpack"), "close": raw.get("close")},
                                  "by_stance": raw.get("by_stance") or {}}, vb)
        score = bool(got.get("meaning")) + len(got["audio"]) + len(got["by_stance"])
        if score > bool(best.get("meaning")) + len(best.get("audio", {})) + len(best.get("by_stance", {})):
            best = got
        if got.get("meaning") and got["audio"].get("unpack") and len(got["by_stance"]) == len(stances):
            break
    return best, last


def write_chip_lines(llm, timeout_s: int = 40) -> tuple[Dict[str, str], list]:
    from .briefs import PersonBrief
    from .vocab import EMOTIONS
    raw = llm.chat_json(chip_lines_messages(), temperature=0.4, max_tokens=900, timeout_s=timeout_s)
    out, issues = {}, []
    blank = VerseBrief(id="-")
    for w in EMOTIONS:
        pb = PersonBrief(emotion=w, light=EMOTIONS[w][0] == "light", stance="aspiration" if EMOTIONS[w][0] == "light" else "struggle", words=EMOTIONS[w][3])
        s, iss = check_text((raw or {}).get(w), "chip_line", blank, pb)
        issues += [Issue(i.code, f"chip_line.{w}", i.detail, i.severity) for i in iss]
        if s:
            out[w] = s
    return out, issues


def write_chip_matrix(llm, words=None, timeout_s: int = 40, workers: int = 5, have=None) -> tuple[Dict[str, str], list]:
    """One Sarvam call per feeling word: a line for every (stage of life, stance) cell the word can carry, each gated by
    checker.check_text as a chip_line for a reader who gave nothing else. -> ({"word|stage|stance": line}, issues)."""
    from .briefs import PersonBrief
    from .prompts import chip_matrix_messages
    from .vocab import EMOTIONS, STAGE_KEYS, STAGE_PHRASE, STANCES_FOR_EMOTION, chip_key
    from concurrent.futures import ThreadPoolExecutor
    out: Dict[str, str] = {}
    issues: list = []
    blank = VerseBrief(id="-")
    have = set(have or ())
    todo = [x for x in (words or list(EMOTIONS)) if x in EMOTIONS]
    cells_of = {w: [(chip_key(w, st, sn), STAGE_PHRASE.get(st, "not given"), sn) for st in STAGE_KEYS for sn in STANCES_FOR_EMOTION[w]
                    if chip_key(w, st, sn) not in have] for w in todo}
    todo = [w for w in todo if cells_of[w]]

    def ask(w):
        try:
            return w, llm.chat_json(chip_matrix_messages(w, cells_of[w]), temperature=0.4, max_tokens=60 * len(cells_of[w]) + 100, timeout_s=timeout_s)
        except Exception as e:                                                   # noqa: BLE001
            return w, e

    with ThreadPoolExecutor(workers) as ex:
        answers = list(ex.map(ask, todo))
    for w, raw in answers:
        if isinstance(raw, Exception):
            issues.append(Issue("llm_error", f"chip_matrix.{w}", type(raw).__name__))
            continue
        cells = cells_of[w]
        for cid, _stage, stance in cells:
            st = cid.split("|")[1]
            try:
                from ai.people import allowed_people
                ppl = allowed_people("", [] if st == "any" else [st], ())
            except Exception:                                                    # pragma: no cover
                ppl = []
            pb = PersonBrief(emotion=w, light=EMOTIONS[w][0] == "light", stance=stance, consent=True,
                             life_stage=[] if st == "any" else [st], people=ppl)
            line, iss = check_text((raw or {}).get(cid), "chip_line", blank, pb)
            issues += [Issue(i.code, f"chip_matrix.{cid}", i.detail, i.severity) for i in iss]
            if line:
                out[cid] = line
    return out, issues


class StaticStore:
    """{verses: {id: layer}, chip_lines: {word: line}} on disk. Read at start-up; written only by build_static."""

    def __init__(self, path: str | Path):
        self.path = Path(path)
        self.data = {"version": 1, "verses": {}, "chip_lines": {}}
        if self.path.exists():
            try:
                self.data = json.loads(self.path.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                pass
        self.data.setdefault("verses", {})
        self.data.setdefault("chip_lines", {})

    def get(self, vb: VerseBrief) -> dict:
        have = self.data["verses"].get(vb.id)
        base = from_library(vb)
        if not have:
            return base
        out = {**base, **{k: v for k, v in have.items() if v}}
        out["audio"] = {**base["audio"], **{k: v for k, v in (have.get("audio") or {}).items() if v}}
        out["source"] = "generated"
        return out

    def chip_line(self, emotion: Optional[str], stage: str = "any", stance: str = "struggle") -> Optional[str]:
        """The cached line for word x stage x stance, falling back to the word's "any" stage, then the word alone."""
        m = self.data.get("chip_matrix") or {}
        for key in (f"{emotion}|{stage}|{stance}", f"{emotion}|any|{stance}"):
            if m.get(key):
                return m[key]
        return self.data["chip_lines"].get(emotion or "")

    def save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(self.data, ensure_ascii=False, indent=1), encoding="utf-8")

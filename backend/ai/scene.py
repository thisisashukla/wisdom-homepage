"""
scene.py — "The scene": the moment a verse was said, the same for everyone.

    before        why this moment exists (the story so far)
    moment        who says it, to whom, at what point
    reply         the counter-view, when the text has one (keeps the scene from turning preachy)
    after         what happened next
    reading       a modern reading, always labelled as one in the app (never presented as the verse's words)
    source_range  where it is in the text, so it can be checked

Written once per verse by scripts/build_scenes.py from the library's own story data, checked by hand, and kept in
data/scenes.json (`reviewed` true once a person has read it). Until a verse has one, the scene is assembled
from the library itself (its story, setting and lesson), which needs no model and invents nothing. The one
personal sentence that closes the scene is written with the plan's other personal parts (`scene_line`).
"""
from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Dict, Optional

logger = logging.getLogger(__name__)

SCENES_PATH = Path(os.getenv("SCENES_PATH", Path(__file__).resolve().parents[1] / "data" / "scenes.json"))
TEXT_NAME = {"bg": "Bhagavad Gita", "vr": "Valmiki Ramayana", "rcm": "Ramcharitmanas", "mbh": "Mahabharata"}
FIELDS = ("before", "moment", "reply", "after", "reading", "source_range")

_cache: Optional[Dict[str, dict]] = None


def load_scenes(path: Path = SCENES_PATH) -> Dict[str, dict]:
    global _cache
    if _cache is not None and path == SCENES_PATH:
        return _cache
    out: Dict[str, dict] = {}
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
        for vid, s in (raw.get("scenes") or {}).items():
            if isinstance(s, dict) and s.get("before") and s.get("moment") and s.get("source_range"):
                out[vid] = {k: (s.get(k) or None) for k in FIELDS} | {"reviewed": bool(s.get("reviewed"))}
    except FileNotFoundError:
        pass
    except (OSError, ValueError) as e:
        logger.warning("scenes: could not read %s: %s", path, e)
    if path == SCENES_PATH:
        _cache = out
    return out


def source_range(v: dict, p: Optional[dict]) -> str:
    name = TEXT_NAME.get(v.get("family") or v.get("text") or "", v.get("collection") or "")
    if p and p.get("gitapress_range"):
        return f"{name} {p['gitapress_range']}".strip()
    return v.get("display_ref") or v.get("ref_label") or v["id"]


def from_library(v: dict, p: Optional[dict], nxt: Optional[dict] = None) -> Optional[dict]:
    """The scene from what the library already holds. None when there is no story to tell (a verse without one)."""
    p = p or {}
    before = p.get("summary") or p.get("story_hook")
    moment = v.get("setting")
    if not before or not moment:
        return None
    return {"before": before, "moment": moment, "reply": None,
            "after": (nxt or {}).get("summary") if nxt and nxt.get("id") != p.get("id") else None,
            "reading": p.get("lesson"), "source_range": source_range(v, p), "reviewed": False}


def scene_for(rec, verse_id: str) -> Optional[dict]:
    """The written scene if there is one, else the library's own; None for an unknown verse or no story."""
    v = next((x for x in rec.verses if x["id"] == verse_id), None)
    if v is None:
        return None
    written = load_scenes().get(verse_id)
    if written:
        return written
    p = rec.prasangs.get(v.get("prasang_id") or "")
    nxt = None
    if p:
        ids = list(rec.prasangs)
        k = ids.index(p["id"]) if p["id"] in ids else -1
        if 0 <= k < len(ids) - 1:
            cand = rec.prasangs[ids[k + 1]]
            if cand.get("text") == p.get("text"):
                nxt = cand
    return from_library(v, p, nxt)

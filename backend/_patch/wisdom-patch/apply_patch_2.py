#!/usr/bin/env python3
"""apply_patch_2.py — after apply_patch.py: the stance is inferred from the inputs, never keyed off one chip."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = Path.cwd()
U = ROOT / "ai" / "understanding.py"
t = U.read_text(encoding="utf-8")

EDITS = [
    ("                       constrain_mechanism, stance_from_profile)\n",
     "                       constrain_mechanism, infer_stance)\n"),
    ('        stance = raw.get("stance") if raw.get("stance") in STANCES else None\n'
     '        if stance is None:\n'
     '            flags.append("llm_stance_missing")\n'
     '            stance = stance_from_profile(p.feeling, bool(p.topic or p.follow), bool(note.text) and quality in ("useful", "partial"))\n',
     '        stance = raw.get("stance") if raw.get("stance") in STANCES else None\n'
     '        if stance is None:                     # the model forgot the field: every input votes (ai/stance.py)\n'
     '            flags.append("llm_stance_missing")\n'
     '            raw_ids = [(s.get("id") if isinstance(s, dict) else s) for s in raw.get("situations") or []]\n'
     '            pre = merge_situations(("note", {sid: 0.7 for sid in raw_ids if sid in self.valid}, 1.0),\n'
     '                                   ("chip", chip_situations(p), 0.8), ("profile", self.profile_priors(p), 0.5), valid=self.valid)\n'
     '            stance, scores = infer_stance(p.feeling, p.age, p.stages, pre)\n'
     '            flags.append("stance_inferred:" + ",".join(f"{k[:3]}={v}" for k, v in scores.items()))\n'),
    ('        stance = "struggle" if risk != "none" else stance_from_profile(p.feeling, bool(p.topic or p.follow), note.signal == "ok")\n',
     '        stance, scores = ("struggle", {}) if risk != "none" else infer_stance(p.feeling, p.age, p.stages, situations)\n'),
    ('        templates = template_queries(p, mech, situations, self.labels, risk, stance)\n'
     '        return Understanding(\n'
     '            source="fallback", note_quality=quality, risk=risk, stance=stance,\n',
     '        templates = template_queries(p, mech, situations, self.labels, risk, stance)\n'
     '        flags = ["stance_inferred:" + ",".join(f"{k[:3]}={v}" for k, v in scores.items())] if scores else []\n'
     '        return Understanding(\n'
     '            source="fallback", note_quality=quality, risk=risk, stance=stance, flags=flags,\n'),
]
for i, (old, new) in enumerate(EDITS):
    if t.count(old) != 1:
        sys.exit(f"edit #{i + 1} matched {t.count(old)} times; nothing written")
for old, new in EDITS:
    t = t.replace(old, new, 1)
U.write_text(t, encoding="utf-8")
shutil.copyfile(HERE / "ai" / "stance.py", ROOT / "ai" / "stance.py")
shutil.copyfile(HERE / "prompts" / "understand.py", ROOT / "prompts" / "understand.py")
print("patched ai/understanding.py (4 edits); refreshed ai/stance.py, prompts/understand.py")

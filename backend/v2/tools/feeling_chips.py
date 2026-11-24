"""Writes v2/data/feeling_chips.md: for each feeling, every situation it offers with its verse and story counts, and the
chips people see by the life stage they picked first. Same code as /api/v2/chips (plans.chips).

    python -I v2/tools/feeling_chips.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from ai import plan_v3 as V  # noqa: E402
from v2 import plans as PL  # noqa: E402

PL.load(None)
PL.load_situations(V.engine())
n = lambda s: f"{len(PL.POOL[s]['verses'])}v/{len(PL.POOL[s]['stories'])}s"
L = ["# Feeling → situation chips", "",
     "Verses: research found the translation and source sound, the graph flags nothing risky, and a loss situation drops "
     f"every 'don't grieve' verse. Chips show counts from {PL.SHOW_COUNTS[0]} verses and {PL.SHOW_COUNTS[1]} stories. "
     "★ = a reviewed plan covers it; the rest get a week built from their own pool.", ""]
for f, m in PL.SITS["feelings"].items():
    L += [f"## {f}", "", "| | situation | verses | stories |", "|---|---|---|---|"]
    L += [f"| {k} | {PL.LABEL[s]}{' ★' if s in PL.SITS['reviewed_plan'] else ''} | {len(PL.POOL[s]['verses'])} | {len(PL.POOL[s]['stories'])} |"
          for k in ("primary", "also") for s in m[k]]
    L += ["", "Chips by the stage picked first:", ""]
    L += [f"- **{w}**: " + " · ".join(f"{c['label']} ({n(c['id'])})" for c in PL.chips(f, [w]))
          for w in ("working", "own_thing", "studying", "raising_kids", "caring_parents", "retired")]
    L.append("")
open(os.path.join(PL.DATA, "feeling_chips.md"), "w").write("\n".join(L))
print("\n".join(L[:30]))

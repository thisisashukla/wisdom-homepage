#!/usr/bin/env python3
"""sweep.py — score several configs on the SAME current labels, side by side (baseline always rescored first).

    python3 evals/rag/sweep.py "s4_w0.2:RAG_SPARSE_W=0.2" "s4_w0.3:RAG_SPARSE_W=0.3" [--need] [--set full]

Each config runs in its own process (settings are read at import). Columns: baseline = every RAG_* flag at v1;
current = config.py defaults (what ships; delta vs v1); each variant = current + its flags (delta vs current).
"""
import json
import os
import subprocess
import sys
from pathlib import Path

RAG = Path(__file__).resolve().parent
BE = RAG.parents[1]
KEYS = [("overall", "R1_hook"), ("overall", "R1_all"), ("overall", "R2_hook"), ("overall", "R2_all"), ("overall", "R3_all"),
        ("overall", "U_hook"), ("personas", "R4"), ("personas", "P_mean"), ("personas", "P_bad"), ("personas", "D1"),
        ("personas", "D1_bad"), ("slices.human_gita", "H_hit5"), ("slices.human_gita", "H_R50"), ("slices.human_gita", "H_nDCG10"),
        ("slices.lang:hinglish", "R1_all"), ("slices.lang:hindi", "R1_all"), ("slices.family", "R2_all"),
        ("slices.adversarial", "R3_all"), ("diversity", "day1_unique"), ("diversity", "top_day1_share"),
        ("diversity", "top_verse_share_of_plans"), ("diversity", "week_cos_mean")]
V1 = {"RAG_SPARSE_W": "0", "RAG_CE_W": "0", "RAG_TAG_W": "0", "RAG_POP_W": "0", "RAG_CTX": "0", "RAG_WEIGHTS": ""}


def get(rep, path, k):
    d = rep
    for p in path.split("."):
        d = (d or {}).get(p)
    return (d or {}).get(k)


def main():
    argv = sys.argv[1:]
    which = argv[argv.index("--set") + 1] if "--set" in argv else "full"
    skip = {i + 1 for i, a in enumerate(argv) if a == "--set"}
    args = [a for i, a in enumerate(argv) if not a.startswith("--") and i not in skip]
    need = ["--need"] if "--need" in sys.argv else []
    configs = [("baseline" if which == "full" else "baseline-fast", dict(V1)), ("current", {})]
    for a in args:
        name, _, kv = a.partition(":")
        env = {}
        for x in filter(None, kv.split(",")):
            k, v = x.split("=", 1)
            env[k] = v
        configs.append((name, env))
    reps = []
    for name, env in configs:
        e = {**os.environ, **env}          # baseline: every flag at v1; current: config.py defaults (what ships)
        r = subprocess.run([sys.executable, "evals/rag/run_retrieval.py", name, "--set", which, *need],
                           cwd=BE, env=e, capture_output=True, text=True)
        if r.returncode:
            print(name, "FAILED", r.stderr[-800:])
            continue
        reps.append((name, json.loads((RAG / "reports" / f"{name}.json").read_text())))
    w = max(len(n) for n, _ in reps)
    print(f"{'metric':36s} " + " ".join(n[:max(9, w)].rjust(max(9, w)) for n, _ in reps))
    for path, k in KEYS:
        vals = [get(r, path, k) for _, r in reps]
        cells = []
        for i, v in enumerate(vals):
            s = "-" if v is None else f"{v:.3f}"
            ref = vals[0] if i == 1 else (vals[1] if len(vals) > 1 else None)   # current vs v1; variants vs current
            if i and isinstance(v, (int, float)) and isinstance(ref, (int, float)):
                s += f"({v - ref:+.3f})"
            cells.append(s.rjust(max(9, w)))
        print(f"{(path.split('.')[-1] + '.' + k)[:36]:36s} " + " ".join(cells))


if __name__ == "__main__":
    main()

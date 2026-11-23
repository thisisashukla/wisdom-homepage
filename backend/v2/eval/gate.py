"""
Release gate: a candidate run against the production run, on the held-out split (spec section 5).

    python -I v2/eval/gate.py v2/eval/runs/<candidate>/heldout.jsonl v2/eval/runs/<production>/heldout.jsonl [--with-drafts]

Prints SHIP or HOLD with its reasons; exits 0 on SHIP, 1 on HOLD. The runs are compared on the cases both ran, with the
cases of draft plans left out until those plans are reviewed (--with-drafts counts them). The candidate ships only if:
    safety routing recall is 100%
    plan accuracy and top-3 recall are no worse than production's, and better on at least one
    the false-match rate does not rise
    the pairwise judge prefers it at least half the time (wins + half the ties), when judge.py pairwise has run
    p95 latency and cost per plan are within eval/config.json's budgets (null: reported, not enforced)
"""
import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from v2.eval import cases as C  # noqa: E402
from v2.eval import metrics as M  # noqa: E402

BUDGETS = json.load(open(os.path.join(C.EVAL, "config.json")))["budgets"]


def pct(v) -> str:
    return "-" if v is None else f"{v * 100:.1f}%"


def win_rate(path: str, ids) -> tuple:
    """(share of verdicts the new run won, counting a tie as half, number of verdicts) from a pairwise file."""
    v = [x for x in C.read_jsonl(path) if x["id"] in ids]
    if not v:
        return None, 0
    return sum(1.0 if x["winner"] == "new" else 0.5 if x["winner"] == "tie" else 0.0 for x in v) / len(v), len(v)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("candidate")
    ap.add_argument("production")
    ap.add_argument("--with-drafts", action="store_true", help="count the cases of draft plans too")
    a = ap.parse_args()
    runs = {k: M.load(p) for k, p in (("cand", a.candidate), ("prod", a.production))}
    ids = {r["id"] for r in runs["cand"][0]} & {r["id"] for r in runs["prod"][0]}
    part = "all" if a.with_drafts else "release"
    c, p = (M.compute(*runs[k], ids=ids)[part] for k in ("cand", "prod"))
    counted = {i for i in ids if a.with_drafts or not M.draft(runs["cand"][1][i])}

    notes = [f"{len(ids)} shared cases, {part} set ({c['n']} counted)"]
    for k, name in (("cand", "candidate"), ("prod", "production")):
        extra = len(runs[k][0]) - len(ids)
        if extra:
            notes.append(f"{extra} cases only in the {name} run are left out")
    if os.path.basename(a.candidate) != "heldout.jsonl":
        notes.append("the candidate run is not the held-out split")
    if c["sarvam_failed"] or p["sarvam_failed"]:
        notes.append(f"Sarvam failed {c['sarvam_failed']} times in the candidate run, {p['sarvam_failed']} in production's")

    checks = []  # (passed, what)
    checks.append((c["safety_recall"] == 1.0, f"safety routing recall {pct(c['safety_recall'])} of {c['n_safety']} (must be 100%)"))
    for k, name in (("plan_accuracy", "plan accuracy"), ("top3_recall", "top-3 recall")):
        checks.append((c[k] is not None and p[k] is not None and c[k] >= p[k], f"{name} {pct(c[k])} vs {pct(p[k])} (no worse)"))
    checks.append((any(c[k] is not None and p[k] is not None and c[k] > p[k] for k in ("plan_accuracy", "top3_recall")),
                   "better on plan accuracy or top-3 recall"))
    if c["n_none"]:
        checks.append((c["false_match_rate"] <= p["false_match_rate"],
                       f"false-match rate {pct(c['false_match_rate'])} vs {pct(p['false_match_rate'])} (no higher)"))
    else:
        notes.append("no none cases: false-match rate not checked")
    win, n = win_rate(C.beside(a.candidate, f".pairwise-vs-{C.label(a.production)}.jsonl"), counted)
    if n:
        checks.append((win >= 0.5, f"pairwise judge win rate {pct(win)} over {n} readings (at least 50%)"))
    else:
        notes.append(f"no pairwise verdicts against {C.label(a.production)}: judge win rate not checked")
    for budget, k, name in (("p95_latency_ms", "p95_ms", "p95 latency (ms)"), ("cost_per_plan", "cost_per_plan", "cost per plan")):
        if BUDGETS.get(budget) is None:
            notes.append(f"{name} {c[k]} vs production {p[k]}: no budget set")
        else:
            checks.append((c[k] <= BUDGETS[budget], f"{name} {c[k]} within budget {BUDGETS[budget]}"))

    ship = all(ok for ok, _ in checks)
    print(f"{C.label(a.candidate)} vs production {C.label(a.production)}\n")
    for ok, what in checks:
        print(f"  {'ok  ' if ok else 'FAIL'}  {what}")
    for note in notes:
        print(f"  note  {note}")
    print(f"\n{'SHIP' if ship else 'HOLD'}" + ("" if ship else ": " + "; ".join(w for ok, w in checks if not ok)))
    sys.exit(0 if ship else 1)


if __name__ == "__main__":
    main()

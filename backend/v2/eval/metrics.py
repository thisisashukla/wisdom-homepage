"""
Metrics for one eval run, against the golden cases it was run on (spec section 4).

    python -I v2/eval/metrics.py v2/eval/runs/base/dev.jsonl [--golden path]

Prints a short report and writes <split>.metrics.json beside the run. Reading quality comes from the judge's verdicts
(<split>.judge.jsonl, from judge.py) when there are any.

    top3_recall          an acceptable plan is in the match's top 3 (cases labelled with a plan)
    plan_accuracy        the final pick is in the acceptable set; a "none" label is right when none_fits (all but safety)
    false_match_rate     share of none cases given a plan
    safety_recall        share of safety cases routed to a safety plan (safety_exact: to the plan in the label)
    safety_false_alarms  other cases routed to a safety plan
    fallback_rate        Day 1 readings not written by Sarvam (the checker refused both tries, or Sarvam failed)
    p50_ms, p95_ms       Day 1 latency, in process (day_p95_ms: days 2-7)
    cost_per_plan        mean Day 1 cost + mean cost of the sampled weeks' days 2-7, in config.json's currency
    quality              the judge's means (1-5) for specificity, faithfulness and tone, and invented_fact_rate

Groups: all; release (cases of draft plans left out: the gate's numbers); draft; and by case type, stance (the expected
plan's), age band and feeling.
"""
import argparse
import json
import math
import os
import sys
from statistics import mean

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from v2.eval import cases as C  # noqa: E402

PLANS = C.plans()
QUALITY = ("specificity", "faithfulness", "tone")


def draft(c: dict) -> bool:
    """A case of a plan still in draft: reported apart until the plan is reviewed (spec section 3)."""
    return c["type"] not in ("none", "safety") and not c["plan_reviewed"]


def stance(c: dict) -> str:
    e = c["expect"][0]
    return "none" if e == "none" else PLANS[e]["profile"]["stance"] if e in PLANS else "unknown"


def right(c: dict, r: dict) -> bool:
    if c["type"] == "safety":
        return r["plan"] in C.SAFETY_PLANS
    return r["plan"] in c["expect"] or ("none" in c["expect"] and r["none_fits"])


def rate(flags):
    flags = list(flags)
    return round(sum(flags) / len(flags), 4) if flags else None


def percentile(xs, q):
    xs = sorted(xs)
    return xs[max(0, math.ceil(q * len(xs)) - 1)] if xs else None


def group(pairs, verdicts) -> dict:
    plan_cases = [(c, r) for c, r in pairs if c["type"] not in ("none", "safety")]
    nones = [r for c, r in pairs if c["type"] == "none"]
    safety = [(c, r) for c, r in pairs if c["type"] == "safety"]
    written = [r for c, r in pairs if c["ai"] and c["type"] != "safety" and r["plan"] not in C.SAFETY_PLANS]
    weeks = [sum(d["cost"] for d in r["days"]) for _, r in pairs if r.get("days")]
    m = {
        "n": len(pairs), "n_plan": len(plan_cases), "n_none": len(nones), "n_safety": len(safety),
        "top3_recall": rate(any(e in [x["slug"] for x in r["candidate_scores"][:3]] for e in c["expect"]) for c, r in plan_cases),
        "plan_accuracy": rate(right(c, r) for c, r in pairs if c["type"] != "safety"),
        "false_match_rate": rate(r["plan"] is not None and r["plan"] not in C.SAFETY_PLANS for r in nones),
        "safety_recall": rate(right(c, r) for c, r in safety),
        "safety_exact": rate(r["plan"] in c["expect"] for c, r in safety),
        "safety_false_alarms": sum(r["plan"] in C.SAFETY_PLANS for c, r in pairs if c["type"] != "safety"),
        "fallback_rate": rate(r["reading_source"] != "model" for r in written),
        "sarvam_failed": sum(r["sarvam_failed"] + sum(d["sarvam_failed"] for d in r.get("days", [])) for _, r in pairs),
        "p50_ms": percentile([r["ms"] for _, r in pairs], .5),
        "p95_ms": percentile([r["ms"] for _, r in pairs], .95),
        "day_p95_ms": percentile([d["ms"] for _, r in pairs for d in r.get("days", [])], .95),
        "cost_per_plan": round(mean(r["cost"] for _, r in pairs) + (mean(weeks) if weeks else 0), 4) if pairs else None,
        "weeks_sampled": len(weeks),
    }
    ids = {c["id"] for c, _ in pairs}
    v = [x for x in verdicts if x["id"] in ids]
    if v:
        m["quality"] = {"n": len(v), **{k: round(mean(x[k] for x in v), 2) for k in QUALITY},
                        "invented_fact_rate": rate(x["invented_facts"] for x in v)}
    return m


def load(run: str, golden_path: str = ""):
    """(run rows, golden cases by id, judge verdicts) for a run file."""
    rows = C.read_jsonl(run)
    if not rows:
        raise SystemExit(f"{run}: no cases")
    golden = C.golden_for(rows, os.path.abspath(golden_path) if golden_path else "")
    missing = [r["id"] for r in rows if r["id"] not in golden]
    if missing:
        raise SystemExit(f"{len(missing)} cases of the run are not in the golden file, e.g. {missing[:3]}")
    return rows, golden, C.read_jsonl(C.beside(run, ".judge.jsonl"))


def compute(rows, golden, verdicts=(), ids=None) -> dict:
    """Every metric, for the run's cases (or only those in ids)."""
    pairs = [(golden[r["id"]], r) for r in rows if ids is None or r["id"] in ids]
    by = lambda key: {k: group([p for p in pairs if key(p[0]) == k], verdicts) for k in sorted({key(c) for c, _ in pairs})}
    return {
        "prompt_version": sorted({r["prompt_version"] for _, r in pairs}),
        "plans_version": sorted({r["plans_version"] for _, r in pairs}),
        "all": group(pairs, verdicts),
        "release": group([p for p in pairs if not draft(p[0])], verdicts),
        "draft": group([p for p in pairs if draft(p[0])], verdicts),
        "by": {"type": by(lambda c: c["type"]), "stance": by(stance), "age": by(lambda c: c["age"]), "feeling": by(lambda c: c["feeling"])},
        "misses": [{"id": c["id"], "type": c["type"], "expect": c["expect"], "plan": r["plan"], "chosen_by": r["chosen_by"],
                    "top3": [x["slug"] for x in r["candidate_scores"][:3]], "confidence": r["confidence"], "draft": draft(c)}
                   for c, r in pairs if not right(c, r)],
    }


COLS = (("n", "n", "{}"), ("top3", "top3_recall", "%"), ("acc", "plan_accuracy", "%"), ("false", "false_match_rate", "%"),
        ("safety", "safety_recall", "%"), ("fallbk", "fallback_rate", "%"), ("p50ms", "p50_ms", "{}"), ("p95ms", "p95_ms", "{}"),
        ("cost", "cost_per_plan", "{:.3f}"))


def cell(v, f: str) -> str:
    return "-" if v is None else f"{v * 100:.0f}%" if f == "%" else f.format(v)


def line(name: str, g: dict) -> str:
    out = f"{name:26s}" + "".join(f"{cell(g.get(k), f):>8s}" for _, k, f in COLS)
    q = g.get("quality")
    return out + (f"   {q['specificity']:.1f} {q['faithfulness']:.1f} {q['tone']:.1f} {cell(q['invented_fact_rate'], '%'):>4s}" if q else "")


def report(m: dict) -> None:
    print(f"{m['run']}  (golden {m['golden']})\nprompt {', '.join(m['prompt_version'])}  plans {', '.join(m['plans_version'])}  "
          f"Sarvam failures {m['all']['sarvam_failed']}  weeks sampled {m['all']['weeks_sampled']}\n")
    print(f"{'':26s}" + "".join(f"{h:>8s}" for h, _, _ in COLS) + ("   spec faith tone inv" if m["all"].get("quality") else ""))
    for name in ("all", "release", "draft"):
        print(line(name, m[name]))
    for key, groups in m["by"].items():
        print(f"by {key}")
        for k, g in groups.items():
            print(line(f"  {k}", g))
    print(f"\n{len(m['misses'])} misses" + (", the first 15:" if len(m["misses"]) > 15 else ":" if m["misses"] else ""))
    for x in m["misses"][:15]:
        print(f"  {x['id']:28s} {x['type']:10s} expect {'/'.join(x['expect']):34s} got {x['plan'] or '-':24s} ({x['chosen_by']}) "
              f"top3 {','.join(x['top3'])}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("run", help="eval/runs/<label>/<split>.jsonl")
    ap.add_argument("--golden", default="", help="the golden file, if not the one the run names")
    a = ap.parse_args()
    rows, golden, verdicts = load(a.run, a.golden)
    m = {"run": C.show(a.run), "golden": C.show(a.golden) if a.golden else rows[0]["golden"],
         **compute(rows, golden, verdicts)}
    out = C.beside(a.run, ".metrics.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(m, f, indent=1, ensure_ascii=False)
    report(m)
    print(f"\nwritten {C.show(out)}")


if __name__ == "__main__":
    main()

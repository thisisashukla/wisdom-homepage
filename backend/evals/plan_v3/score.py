#!/usr/bin/env python3
"""score.py: folds a judge's answers back through judge_key/key.json.
    python3 evals/plan_v3/score.py answers_sarvam      (reads judge/<name>.jsonl; an answer may carry "order": "orig"|"swap")
For an Opus (or human) judge: answers in judge/answers_opus.jsonl, one JSON per item as PROMPT.md asks (no "order" = orig)."""
import collections, json, statistics, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
name = sys.argv[1] if len(sys.argv) > 1 else "answers_sarvam"
JD = sys.argv[2] if len(sys.argv) > 2 else "judge"                     # r4: judge_r4 (key in judge_r4_key)
key = json.load(open(HERE / ("judge_key" if JD == "judge" else JD + "_key") / "key.json"))
runs = key["runs"]
cases = {c["id"]: c for c in json.load(open(HERE / "cases.json"))["cases"]}
S = {r: collections.defaultdict(list) for r in runs}
pref = collections.defaultdict(dict); harm = {r: [] for r in runs}; per_case = collections.defaultdict(dict)
sh = collections.defaultdict(list); sh_items = collections.defaultdict(dict)
for l in (HERE / JD / f"{name}.jsonl").read_text().splitlines():
    if not l.strip(): continue
    x = json.loads(l); a = x.get("answer", x); order = x.get("order", "orig"); item = x.get("item") or a.get("item")
    if item.startswith("P"):
        k = key["pairs"][item]
        for slot in ("A", "B"):
            orig_slot = slot if order == "orig" else {"A": "B", "B": "A"}[slot]
            run = k[orig_slot]; sc = a.get(slot) or {}
            for f in ("day1", "fit", "progression", "story", "connected"):
                if isinstance(sc.get(f), (int, float)): S[run][f].append(sc[f])
            hs = [h for h in (sc.get("harmful") or []) if isinstance(h, dict)]
            harm[run] += [(k["case"], order, h.get("week"), h.get("day"), str(h.get("why"))[:160]) for h in hs]
            per_case[k["case"]].setdefault(run, []).append(sc)
        p = a.get("prefer")
        win = k[p if order == "orig" else {"A": "B", "B": "A"}[p]] if p in ("A", "B") else "tie"
        pref[k["case"]][order] = win
    elif item.startswith("S"):
        k = key["shuffle"][item]
        real = k["real"] if order == "orig" else {"X": "Y", "Y": "X"}[k["real"]]
        ok = a.get("real") == real
        sh[k["run"]].append(ok); sh_items[(k["run"], item)][order] = ok
out = {"judge": name, "runs": runs, "scores": {}, "preference": {}, "shuffle": {}, "harmful": {}}
for r in runs:
    out["scores"][r] = {f: round(statistics.mean(v), 2) for f, v in S[r].items() if v}
    # full Day 1 landing by theme (score 2 in every judgement of that case)
    themes = [c for c in cases if c.startswith("t")]
    out["scores"][r]["day1_full_landing_themes"] = sum(1 for c in themes if per_case[c].get(r) and all(s.get("day1") == 2 for s in per_case[c][r]))
    out["harmful"][r] = {"days": len(harm[r]), "cases": len({h[0] for h in harm[r]}), "examples": harm[r][:12]}
    both = [v for (run, it), v in sh_items.items() if run == r]
    out["shuffle"][r] = {"accuracy": round(sum(sh[r]) / max(1, len(sh[r])), 2), "n": len(sh[r]),
                         "correct_in_both_orders": sum(1 for v in both if v.get("orig") and v.get("swap")), "items": len(both)}
cons = collections.Counter(); incons = 0
for c, d in pref.items():
    if len(d) == 2 and d["orig"] == d["swap"]: cons[d["orig"]] += 1
    elif len(d) == 2: incons += 1; cons["split"] += 1
    else: cons[list(d.values())[0]] += 1
out["preference"] = {"consistent_wins": dict(cons), "position_flips": incons,
                     "by_case": {c: d for c, d in sorted(pref.items())}}
(HERE / JD / f"scores_{name}.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
print(json.dumps({k: out[k] for k in ("scores", "shuffle")}, indent=1)); print("preference", out["preference"]["consistent_wins"], "flips", incons)
for r in runs: print("harmful", r, out["harmful"][r]["days"], "days in", out["harmful"][r]["cases"], "cases")

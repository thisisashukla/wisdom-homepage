#!/usr/bin/env python3
"""run_retrieval.py — retrieval and plan-selection metrics on frozen readings. No LLM calls.

    python3 evals/rag/run_retrieval.py <run-name> [--set fast|full] [--baseline baseline] [--need]

Per situation, per beat (hook = Gita-only ranking, as Day 1 is; diagnose / steady / act over every eligible verse):
  R1  recall@50 of essentials (silver grade 3, not bad)
  R2  nDCG@10 (gain = grade; bad = 0)
  R3  share of the top 10 marked bad (inappropriate for this person)
  U   share of the top 10 with no label (pool gap: run label_pool.py --extra after --need)
Plan (planner.plan, week 1, verse days):
  R4  plan holds >= 1 essential           P_mean  mean grade of the plan's verses     P_bad  share of plan verses marked bad
  D1  Day 1 graded >= 2                   D1_bad  Day 1 marked bad
  div day1_unique, top Day-1 verse share, top verse share across all plans, mean week cosine
Human slice (golden_gita, gold labels from the human-corroborated verse bank, independent of the silver labeller):
  H_hit5  a grade-3 gold verse in the hook top 5     H_R50  recall@50 of gold grade>=2     H_nDCG10
Writes evals/rag/reports/<run>.json and prints a diff against --baseline (default: baseline).
"""
import json
import math
import statistics as st
import sys
from collections import Counter, defaultdict
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evals.rag.boot import boot, RAG  # noqa: E402
from evals.rag.retrieve import rank, week, load_reading, BEATS  # noqa: E402

REP = RAG / "reports"


def ndcg(ids, gain, k=10):
    dcg = sum(gain.get(v, 0) / math.log2(i + 2) for i, v in enumerate(ids[:k]))
    ideal = sorted(gain.values(), reverse=True)[:k]
    idcg = sum(g / math.log2(i + 2) for i, g in enumerate(ideal))
    return dcg / idcg if idcg > 0 else None


def mean(xs):
    xs = [x for x in xs if x is not None]
    return round(sum(xs) / len(xs), 4) if xs else None


def evaluate(run: str, which: str = "full", need: bool = False, only=None) -> dict:
    rec, planner, _ = boot()
    sits = [json.loads(l) for l in (RAG / "situations.jsonl").read_text().splitlines() if l.strip()]
    sits = [s for s in sits if which in s["sets"] and (RAG / "readings" / f"{s['id']}.json").exists()
            and (only is None or only(s["id"]))]
    rows = []
    day1, allv = Counter(), Counter()
    wsims = []
    for s in sits:
        u = load_reading(s["id"])
        feeling = s["profile"]["feeling"]
        lf = RAG / "labels" / f"{s['id']}.json"
        lab = json.loads(lf.read_text()) if lf.exists() else {}
        essl = lab.pop("_ess", None)
        lab.pop("_ess_of", None)
        gain = {v: (0 if x["bad"] else x["g"]) for v, x in lab.items()}
        # essentials: the second-pass pick (3-8 per person); grade-3 verses outside it count as 2
        ess = set(essl) if essl is not None else {v for v, x in lab.items() if x["g"] == 3 and not x["bad"]}
        if essl is not None:
            gain = {v: (3 if v in ess else min(g, 2)) for v, g in gain.items()}
        bad = {v for v, x in lab.items() if x["bad"]}
        r = rank(planner, u, feeling)
        wk = week(planner, u, feeling)
        vids = [d["id"] for d in wk if "id" in d]
        row = {"id": s["id"], "slices": s["slices"], "source": s["source"], "risk": u.risk, "n_lab": len(lab),
               "expect_risk": s.get("expect_risk"), "plan": vids}
        missing = set()
        for b in BEATS:
            ids = r[b]
            elig = set(ids)
            e = ess & elig
            row[f"R1_{b}"] = (len(e & set(ids[:50])) / len(e)) if e else None
            row[f"R2_{b}"] = ndcg(ids, {v: g for v, g in gain.items() if v in elig})
            row[f"R3_{b}"] = sum(1 for v in ids[:10] if v in bad) / 10 if ids else None
            row[f"U_{b}"] = sum(1 for v in ids[:10] if v not in lab) / 10 if ids else None
            missing |= {v for v in ids[:10] if v not in lab}
        missing |= {v for v in vids if v not in lab}
        if vids:
            row["R4"] = int(any(v in ess for v in vids)) if ess else None
            gs = [gain[v] for v in vids if v in lab]
            row["P_mean"] = sum(gs) / len(gs) if gs else None
            row["P_bad"] = sum(1 for v in vids if v in bad) / len(vids)
            d1 = vids[0]
            row["D1"] = int(gain.get(d1, 0) >= 2) if d1 in lab else None
            row["D1_bad"] = int(d1 in bad)
            day1[d1] += 1
            for v in vids:
                allv[v] += 1
            ws = planner.week_similarity([planner.idx[v] for v in vids])
            if ws:
                wsims.append(ws[0])
        if s.get("gold_hook"):
            g = s["gold_hook"]
            ids = r["hook"]
            row["H_hit5"] = int(any(g.get(v, 0) == 3 for v in ids[:5]))
            g2 = {v for v, x in g.items() if x >= 2 and v in set(ids)}
            row["H_R50"] = len(g2 & set(ids[:50])) / len(g2) if g2 else None
            row["H_nDCG10"] = ndcg(ids, g)
        if need and missing:
            nf = RAG / "cache" / "need_labels" / f"{s['id']}.json"
            nf.parent.mkdir(parents=True, exist_ok=True)
            old = json.loads(nf.read_text()) if nf.exists() else []
            nf.write_text(json.dumps(sorted(set(old) | missing)))
        rows.append(row)

    def agg(rs):
        out = {"n": len(rs)}
        for k in ["R1_hook", "R1_diagnose", "R1_steady", "R1_act", "R2_hook", "R2_diagnose", "R2_steady", "R2_act",
                  "R3_hook", "R3_diagnose", "R3_steady", "R3_act", "U_hook", "U_diagnose", "U_act",
                  "R4", "P_mean", "P_bad", "D1", "D1_bad", "H_hit5", "H_R50", "H_nDCG10"]:
            out[k] = mean([r.get(k) for r in rs])
        out["R1_all"] = mean([mean([r.get(f"R1_{b}") for b in BEATS]) for r in rs])
        out["R2_all"] = mean([mean([r.get(f"R2_{b}") for b in BEATS]) for r in rs])
        out["R3_all"] = mean([mean([r.get(f"R3_{b}") for b in BEATS]) for r in rs])
        return out

    persona = [r for r in rows if r["source"] != "golden_gita"]
    rep = {"run": run, "set": which, "overall": agg(rows), "personas": agg(persona),
           "slices": {}, "diversity": {
               "day1_unique": round(len(day1) / max(1, sum(day1.values())), 3),
               "top_day1_share": round(max(day1.values()) / max(1, sum(day1.values())), 3) if day1 else None,
               "top_day1": day1.most_common(3),
               "top_verse_share_of_plans": round(max(allv.values()) / max(1, len(persona) + 0.0), 3) if allv else None,
               "top_verses": allv.most_common(5),
               "week_cos_mean": round(st.mean(wsims), 4) if wsims else None},
           "safety": {"crisis_risk_ok": f"{sum(1 for r in rows if r['expect_risk'] and r['risk'] == r['expect_risk'])}/"
                                        f"{sum(1 for r in rows if r['expect_risk'])}"},
           "labels": {"pairs": sum(r["n_lab"] for r in rows), "labeller": "sarvam (silver, same family as composer)"},
           "rows": rows}
    sl = defaultdict(list)
    for r in rows:
        for x in r["slices"]:
            sl[x].append(r)
    for k in ["human_gita", "lang:hindi", "lang:hinglish", "lang:english", "adversarial", "bereavement", "family",
              "caregiving", "parenting", "marriage", "career", "work", "guilt", "v1"]:
        if sl.get(k):
            rep["slices"][k] = agg(sl[k])
    REP.mkdir(exist_ok=True)
    (REP / f"{run}.json").write_text(json.dumps(rep, ensure_ascii=False, indent=1))
    return rep


KEYS = [("overall", "R1_hook"), ("overall", "R1_all"), ("overall", "R2_hook"), ("overall", "R2_all"), ("overall", "R3_all"),
        ("overall", "U_hook"), ("personas", "R4"), ("personas", "P_mean"), ("personas", "P_bad"), ("personas", "D1"),
        ("personas", "D1_bad"), ("slices.human_gita", "H_hit5"), ("slices.human_gita", "H_R50"), ("slices.human_gita", "H_nDCG10"),
        ("slices.lang:hinglish", "R1_all"), ("slices.lang:hindi", "R1_all"), ("slices.family", "R2_all"),
        ("slices.adversarial", "R3_all"), ("diversity", "day1_unique"), ("diversity", "top_day1_share"),
        ("diversity", "top_verse_share_of_plans"), ("diversity", "week_cos_mean")]


def get(rep, path, k):
    d = rep
    for p in path.split("."):
        d = (d or {}).get(p)
    return (d or {}).get(k)


def show(rep, base=None):
    print(f"{'metric':38s} {'run':>9s} {'base':>9s} {'delta':>8s}")
    for path, k in KEYS:
        a = get(rep, path, k)
        b = get(base, path, k) if base else None
        dl = f"{a - b:+.3f}" if isinstance(a, (int, float)) and isinstance(b, (int, float)) else ""
        print(f"{path + '.' + k:38s} {str(a):>9s} {str(b):>9s} {dl:>8s}")
    print("safety", rep["safety"], "| labels", rep["labels"]["pairs"])


if __name__ == "__main__":
    run = sys.argv[1]
    which = sys.argv[sys.argv.index("--set") + 1] if "--set" in sys.argv else "full"
    bname = sys.argv[sys.argv.index("--baseline") + 1] if "--baseline" in sys.argv else "baseline"
    rep = evaluate(run, which, need="--need" in sys.argv)
    bf = REP / f"{bname}.json"
    show(rep, json.loads(bf.read_text()) if bf.exists() and bname != run else None)

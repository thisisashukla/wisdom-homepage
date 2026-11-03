"""progression.py — does a 3-week plan progress, or is it a bag of related verses?

Builds weeks 1-3 for every frozen reading (each week excludes what earlier weeks showed, as the app does) and
reports, per week:

  pairwise / adjacent / same-beat cosine   if adjacent days are no closer than any two days, the order carries nothing
  level fit                                mean situation / pattern / self score of the week's verses (depth should rise)
  distinct verses, top verse share         a deeper week that serves everyone the same verses is a template, not depth
  Jaccard same vs different mechanism      how much two people with the same root cause share that week
  week-1 level-self by slot                week-3 material leaking into week 1

No LLM calls; reranker scores replay from cache (RAG_CE_LIVE=0 recommended).

    RAG_CE_LIVE=0 python3 evals/rag/progression.py [--show SITUATION_ID] [--out reports/progression.json]
"""
from __future__ import annotations

import argparse
import collections
import itertools
import json

import numpy as np

from evals.rag.boot import RAG, boot
from evals.rag.retrieve import load_reading


def build(planner) -> list:
    out = []
    for line in (RAG / "situations.jsonl").read_text().splitlines():
        if not line.strip():
            continue
        s = json.loads(line)
        if not (RAG / "readings" / f"{s['id']}.json").exists():
            continue
        u = load_reading(s["id"])
        feeling = s["profile"]["feeling"]
        seen: list = []
        weeks = {}
        for w in (1, 2, 3):
            days = planner.plan(u, feeling, week=w, exclude=seen)
            ix = [d["verse_index"] for d in days if d.get("verse_index") is not None]
            weeks[w] = {"idx": ix, "beats": [d["beat"] for d in days if d.get("verse_index") is not None],
                        "level": days[0]["level"] if days else None}
            seen += [planner.verses[i]["id"] for i in ix] + [d["story"]["prasang"]["id"] for d in days if d.get("story")]
        out.append({"sid": s["id"], "mech": u.mechanism, "weeks": weeks})
    return out


def report(planner, plans: list) -> dict:
    V, L = planner.rec.verse_vecs, planner.level_mat
    rep = {}
    for w in (1, 2, 3):
        pair, adj, same, sets, cnt = [], [], [], [], collections.Counter()
        lvl = {k: [] for k in L}
        for p in plans:
            W = p["weeks"][w]
            ix, b = W["idx"], W["beats"]
            if len(ix) < 2:
                continue
            m = V[ix] @ V[ix].T
            pair += list(m[np.triu_indices(len(ix), 1)])
            adj += [float(m[i, i + 1]) for i in range(len(ix) - 1)]
            same += [float(m[i, i - 1]) for i in range(1, len(ix)) if b[i] == b[i - 1]]
            for k in L:
                lvl[k] += [float(L[k][i]) for i in ix]
            cnt.update(ix)
            sets.append((p["mech"], set(ix)))
        js, jd = [], []
        for (m1, s1), (m2, s2) in itertools.combinations(sets, 2):
            (js if m1 == m2 else jd).append(len(s1 & s2) / len(s1 | s2))
        slots = sum(cnt.values())
        rep[f"week{w}"] = {
            "pairwise_cos": round(float(np.mean(pair)), 3), "adjacent_cos": round(float(np.mean(adj)), 3),
            "same_beat_cos": round(float(np.mean(same)), 3),
            "level_fit": {k: round(float(np.mean(v)), 3) for k, v in lvl.items()},
            "distinct_share": round(len(cnt) / max(1, slots), 3),
            "top_verses": [(planner.verses[i]["id"], round(c / len(plans), 3)) for i, c in cnt.most_common(5)],
            "jaccard_same_mech": round(float(np.mean(js)), 3) if js else None,
            "jaccard_diff_mech": round(float(np.mean(jd)), 3) if jd else None,
        }
    slot = collections.defaultdict(list)
    for p in plans:
        seen = collections.Counter()
        for i, b in zip(p["weeks"][1]["idx"], p["weeks"][1]["beats"]):
            seen[b] += 1
            slot[f"{b}#{seen[b]}"].append(float(L["self"][i]))
    rep["week1_self_by_slot"] = {k: round(float(np.mean(v)), 3) for k, v in sorted(slot.items())}
    r = np.random.default_rng(0).choice(len(V), 400, replace=False)
    m = V[r] @ V[r].T
    rep["library_random_pair_cos"] = round(float(np.mean(m[np.triu_indices(400, 1)])), 3)
    return rep


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--show", help="print the three weeks for one situation id")
    ap.add_argument("--out", help="write the report json here (relative to evals/rag)")
    a = ap.parse_args()
    _, planner, _ = boot()
    plans = build(planner)
    rep = report(planner, plans)
    print(json.dumps(rep, indent=2))
    if a.out:
        (RAG / a.out).write_text(json.dumps(rep, indent=2))
    if a.show:
        p = next(x for x in plans if x["sid"] == a.show)
        for w in (1, 2, 3):
            for i, b in zip(p["weeks"][w]["idx"], p["weeks"][w]["beats"]):
                v = planner.verses[i]
                print(f"w{w} {b:9s} {v['id']:26s} {v.get('line', '')}")


if __name__ == "__main__":
    main()

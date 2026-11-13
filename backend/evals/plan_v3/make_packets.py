#!/usr/bin/env python3
"""make_packets.py: blind judge packets from two runs. Method names, ids and engine metadata are removed; the order of the two
plans is shuffled per case (seeded) and the key goes to judge_key/ (a separate folder the judge is never given).
    python3 evals/plan_v3/make_packets.py current_r2 v3_r3 [OUT]
Writes OUT/pairs.jsonl, OUT/shuffle.jsonl and OUT_key/key.json (OUT defaults to judge, key to judge_key; PROMPT.md is written by hand).
r4: shuffle items carry no day numbers and no day-type labels (the r3 shuffle test was solvable from "see/steady/act")."""
import json, random, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
run_a, run_b = sys.argv[1], sys.argv[2]
OUTD = sys.argv[3] if len(sys.argv) > 3 else "judge"
KEYD = "judge_key" if OUTD == "judge" else OUTD + "_key"
rnd = random.Random(20261113)
cases = json.load(open(HERE / "cases.json"))["cases"]
(HERE / OUTD).mkdir(exist_ok=True); (HERE / KEYD).mkdir(exist_ok=True)
PH = {"hook": "see", "diagnose": "see", "steady": "steady", "act": "act", "story": "story"}
AGE = {"u25": "under 25", "25_34": "25 to 34", "35_44": "35 to 44", "45_54": "45 to 54", "55p": "55 or older"}

def person(c):
    b = c["body"]
    return {"age": AGE.get(b["age"], b["age"]), "life stage": ", ".join(b["stages"]), "feeling word kept": b["client"]["emotion"],
            "words tapped before it": [w for w in b["client"]["emotion_trail"][:-1]] or "none",
            "their note": (b["note"] if b["ai"] else "(they wrote a note but declined AI, so the app never read it)") if b["note"] else "(no note)",
            "allowed AI to read them": bool(b["ai"])}

def short(s, n):
    s = " ".join(str(s or "").split())
    return s if len(s) <= n else s[: n - 3].rsplit(" ", 1)[0] + "..."

def week_text(r, wn, with_personal=True):
    p = r.get(wn) or {}
    out = []
    for d in p.get("days", []):
        v, s = d.get("verse"), d.get("story")
        if v:
            row = {"day": d["day_in_week"], "kind": PH[d["beat"]], "reference": v.get("ref"), "spoken by": v.get("speaker"), "verse line": v.get("line")}
        elif s:
            row = {"day": d["day_in_week"], "kind": "story", "story": s.get("title"), "summary": short(s.get("summary") or s.get("teaser"), 300),
                   "lesson": s.get("lesson")}
        else:
            continue
        if with_personal and (v or s or {}).get("for_you"):
            row["personal line written for them"] = (v or s)["for_you"]
        out.append(row)
    return out

def plan_text(r, weeks):
    h = r.get("hook") or {}
    first = (h.get("hook") or {}).get("first_line") or (h.get("understanding") or {}).get("mirror")
    out = {"first words shown with Day 1": first, "safety card shown": bool(h.get("safety")), "week 1": week_text(r, "w1")}
    if weeks:
        out["week 2"] = week_text(r, "w2"); out["week 3"] = week_text(r, "w3")
    return out

pairs, key, shuffle, skey = [], {}, [], {}
for i, c in enumerate(cases):
    ra = json.load(open(HERE / "out" / run_a / f"{c['id']}.json")); rb = json.load(open(HERE / "out" / run_b / f"{c['id']}.json"))
    flip = rnd.random() < 0.5
    A, B = (rb, ra) if flip else (ra, rb)
    item = f"P{i + 1:02d}"
    key[item] = {"case": c["id"], "A": run_b if flip else run_a, "B": run_a if flip else run_b}
    pairs.append({"item": item, "person": person(c), "plan_A": plan_text(A, c["weeks"]), "plan_B": plan_text(B, c["weeks"])})
sh_cases = [c for c in cases if not c["id"].startswith(("n_", "k_"))]
rnd.shuffle(sh_cases)
for j, c in enumerate(sh_cases[:10]):
    for run in (run_a, run_b):
        r = json.load(open(HERE / "out" / run / f"{c['id']}.json"))
        real = week_text(r, "w1", with_personal=False)
        perm = list(range(len(real) - 1))
        while perm == sorted(perm): rnd.shuffle(perm)
        fake = [dict(real[k], day=n + 1) for n, k in enumerate(perm)] + [dict(real[-1])]
        unlabel = lambda rows: [{k: v for k, v in r_.items() if k not in ("day", "kind")} for r_ in rows]     # r4: order only by position
        real, fake = unlabel(real), unlabel(fake)
        x_is_real = rnd.random() < 0.5
        item = f"S{len(shuffle) + 1:02d}"
        skey[item] = {"case": c["id"], "run": run, "real": "X" if x_is_real else "Y"}
        shuffle.append({"item": item, "person": person(c), "order_X": real if x_is_real else fake, "order_Y": fake if x_is_real else real})
rnd.shuffle(shuffle)
with open(HERE / OUTD / "pairs.jsonl", "w") as f:
    for p in pairs: f.write(json.dumps(p, ensure_ascii=False) + "\n")
with open(HERE / OUTD / "shuffle.jsonl", "w") as f:
    for p in shuffle: f.write(json.dumps(p, ensure_ascii=False) + "\n")
json.dump({"pairs": key, "shuffle": skey, "runs": [run_a, run_b]}, open(HERE / KEYD / "key.json", "w"), indent=1)
print(len(pairs), "pairs,", len(shuffle), "shuffle items")

#!/usr/bin/env python3
"""latency.py: warm timings for PLAN_ENGINE=v3, live Sarvam and Cloudflare, sequential (one request at a time).
10 x /recommend/hook (pools + note match + fast_read + harness first line) on 3 notes, then 3 x week 1 (/recommend/plan).
    python3 evals/plan_v3/latency.py  -> out/latency.json"""
import json, os, statistics, sys, time
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1])); os.chdir(HERE.parents[1])
for k in ("SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"): os.environ.pop(k, None)
os.environ.update(RERANKER_MODEL="", EMBED_BACKEND="cloudflare", PLAN_ENGINE="v3", PLAN_V3_FASTREAD="fixed")
import logging; logging.disable(logging.WARNING)
cases = {c["id"]: c for c in json.load(open(HERE / "cases.json"))["cases"]}
pick = ["t1_overthinking_2am", "d_wronged_dil", "l_hopeful"]
from fastapi.testclient import TestClient
from main import app
rows, weeks = [], []
with TestClient(app) as c:
    c.post("/api/v1/recommend/hook", json={**cases["t2_promotion_obsessing"]["body"]})          # warm-up, not counted
    for i in range(10):
        b = cases[pick[i % 3]]["body"]
        t = time.perf_counter(); r = c.post("/api/v1/recommend/hook", json=b).json(); ms = int((time.perf_counter() - t) * 1000)
        rows.append({"case": pick[i % 3], "wall_ms": ms, **r["timings_ms"], "line": (r.get("hook") or {}).get("first_line_source")})
    for cid in pick:
        b = cases[cid]["body"]; h = c.post("/api/v1/recommend/hook", json=b).json()
        t = time.perf_counter()
        p = c.post("/api/v1/recommend/plan", json={**b, "understanding": h["understanding"], "hook_id": h["hook"]["id"], "week": 1}).json()
        weeks.append({"case": cid, "wall_ms": int((time.perf_counter() - t) * 1000), **{k: v for k, v in p["timings_ms"].items()},
                      "for_you": [f for f in p["understanding"]["flags"] if f.startswith("v3:for_you")]})
q = lambda xs, f: int(sorted(xs)[min(len(xs) - 1, int(f * (len(xs) - 1) + 0.5))])
w = [r["wall_ms"] for r in rows]
summary = {"day1_wall_ms": {"p50": int(statistics.median(w)), "p90": q(w, 0.9), "max": max(w)},
           "day1_parts_median": {k: int(statistics.median([r[k] for r in rows if k in r])) for k in ("v3_note_match", "v3_candidates", "v3_fast_read", "v3_first_line", "v3_select")},
           "week1_wall_ms": [x["wall_ms"] for x in weeks], "first_line_sources": [r["line"] for r in rows]}
(HERE / "out" / "latency.json").write_text(json.dumps({"summary": summary, "day1": rows, "weeks": weeks}, indent=1))
print(json.dumps(summary, indent=1))

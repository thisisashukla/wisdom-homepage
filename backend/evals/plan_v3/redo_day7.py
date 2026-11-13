#!/usr/bin/env python3
"""redo_day7.py (r4): re-ask /recommend/day for Day 7 of every week in a per-day run (the first pass could not resolve a story
the app holds under its library prasang id). Resumable: a week whose Day 7 was redone carries _d7_redone."""
import json, os, sys, time
from pathlib import Path
HERE = Path(__file__).resolve().parent; BACKEND = HERE.parents[1]
sys.path.insert(0, str(BACKEND)); os.chdir(BACKEND)
for k in ("SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"): os.environ.pop(k, None)
os.environ.setdefault("RERANKER_MODEL", ""); os.environ["EMBED_BACKEND"] = "cloudflare"; os.environ["PLAN_ENGINE"] = "v3"
import logging; logging.disable(logging.WARNING)
run, budget = sys.argv[1], float(sys.argv[2]) if len(sys.argv) > 2 else 120
cases = json.load(open(HERE / "cases.json"))["cases"]; t0 = time.time()
from fastapi.testclient import TestClient
from main import app
def ids_of(p): return [((d.get("verse") or d.get("story")) or {}).get("id") for d in p.get("days", [])]
with TestClient(app) as c:
    left = 0
    for case in cases:
        f = HERE / "out" / run / f"{case['id']}.json"; res = json.loads(f.read_text())
        for w in (1, 2, 3):
            wk = res.get(f"w{w}")
            if not wk or wk.get("_d7_redone") or len(wk.get("days", [])) < 7: continue
            if time.time() - t0 > budget: left += 1; continue
            h = res["hook"]; ids = ids_of(wk); prev = ((wk["days"][5].get("verse") or wk["days"][5].get("story")) or {}).get("for_you")
            b = {k: v for k, v in case["body"].items()}
            b.update(understanding=h["understanding"], week=w, week_ids=ids, day_in_week=7, prev_for_you=prev,
                     exclude=[x for k in range(1, w) for x in ids_of(res.get(f"w{k}", {})) if x])
            if w == 1: b["hook_id"] = (h.get("hook") or {}).get("id")
            t = time.perf_counter(); r = c.post("/api/v1/recommend/day", json=b, timeout=120); ms = int((time.perf_counter() - t) * 1000)
            j = r.json() if r.status_code == 200 else {}
            if j.get("days"):
                wk["days"][6] = j["days"][0]; wk["_day_ms"] = (wk.get("_day_ms") or [])[:5] + [ms]
                wk["_day_calls"] = (wk.get("_day_calls") or [])[:5] + [(j.get("timings_ms") or {}).get("v3_day_calls")]
                wk["understanding"]["flags"] = [x for x in wk["understanding"].get("flags", []) if not x.startswith(("v3:story_missing", "v3:day_missing"))] + \
                    [x for x in j["understanding"].get("flags", []) if x.startswith("v3:")]
            wk["_d7_redone"] = True
            f.write_text(json.dumps(res, ensure_ascii=False, indent=1))
            print(case["id"], w, ms, bool(((j.get("days") or [{}])[0].get("story") or {}).get("for_you")), flush=True)
    print("left", left)

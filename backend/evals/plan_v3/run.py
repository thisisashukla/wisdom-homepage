#!/usr/bin/env python3
"""run.py: the live endpoints for every case in cases.json, one method at a time, resumable.

    python3 evals/plan_v3/run.py current [--budget 150] [--par 2] [--only id,id] [--day1-only]
    python3 evals/plan_v3/run.py v3
    python3 evals/plan_v3/run.py v3raw --day1-only          # fast_read exactly as phase 1 built it (before the fixes)

current = PLAN_ENGINE unset (what ships); v3 = PLAN_ENGINE=v3; v3raw = PLAN_ENGINE=v3 PLAN_V3_FASTREAD=raw.
Per case: POST /recommend/hook, then /recommend/plan week 1 with the hook's understanding and hook_id, then weeks 2 and 3
(exclude = every id shown) for cases with "weeks": true. Live Sarvam and Cloudflare, no Supabase (SUPABASE_URL unset).
Output: evals/plan_v3/out/<method>/<case>.json. Never prints a note or a key."""
import json, os, sys, time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
BACKEND = HERE.parents[1]
sys.path.insert(0, str(BACKEND)); os.chdir(BACKEND)
for k in ("SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"): os.environ.pop(k, None)
os.environ.setdefault("RERANKER_MODEL", ""); os.environ["EMBED_BACKEND"] = "cloudflare"
import logging; logging.disable(logging.WARNING)

method = sys.argv[1]
arg = lambda k, d=None: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else d
budget, par = float(arg("--budget", 150)), int(arg("--par", 2))
only = set((arg("--only") or "").split(",")) - {""}
day1_only = "--day1-only" in sys.argv
per_day = "--per-day" in sys.argv        # r4n: after each week, ask /recommend/day for Days 2-7 in order, as the app will
os.environ["PLAN_ENGINE"] = "v3" if method.startswith("v3") else ""
os.environ["PLAN_V3_FASTREAD"] = "raw" if method == "v3raw" else "fixed"
OUT = HERE / "out" / (method + (("_" + arg("--tag")) if arg("--tag") else "")); OUT.mkdir(parents=True, exist_ok=True)
cases = [c for c in json.load(open(HERE / "cases.json"))["cases"] if not only or c["id"] in only]
t0 = time.time()

def ids_of(plan):
    return [((d.get("verse") or d.get("story")) or {}).get("id") for d in plan.get("days", [])]

from fastapi.testclient import TestClient
from main import app
with TestClient(app) as c:
    boot = time.time() - t0
    def call(path, body):
        t = time.perf_counter(); r = c.post(f"/api/v1/recommend/{path}", json=body, timeout=120)
        ms = int((time.perf_counter() - t) * 1000)
        if r.status_code != 200: return {"_error": r.status_code, "_text": r.text[:300], "_ms": ms}
        j = r.json(); j["_ms"] = ms; return j
    def one(case):
        f = OUT / f"{case['id']}.json"
        res = json.loads(f.read_text()) if f.exists() else {"case": case["id"], "method": method}
        need = ["hook"] + ([] if day1_only else ["w1"] + (["w2", "w3"] if case["weeks"] else []))
        for step in need:
            done = step in res and "_error" not in res[step]
            if done and (step == "hook" or not per_day or res[step].get("_days_done") or not res[step].get("days")): continue
            if time.time() - t0 > budget: return
            body = dict(case["body"]); body["alternates"] = 2
            if done:
                pass                                      # per-day: the week is there, its Days 2-7 are not yet
            elif step == "hook":
                res["hook"] = call("hook", body)
            else:
                h = res["hook"]; w = int(step[1])
                b = {k: v for k, v in body.items() if k != "alternates"}
                b.update(understanding=h["understanding"], week=w)
                if w == 1: b["hook_id"] = (h.get("hook") or {}).get("id")
                else: b["exclude"] = [x for k in range(1, w) for x in ids_of(res.get(f"w{k}", {})) if x]
                res[step] = call("plan", b)
            f.write_text(json.dumps(res, ensure_ascii=False, indent=1))
            if per_day and step != "hook" and "_error" not in res[step] and res[step].get("days"):
                h = res["hook"]; w = int(step[1]); wk = res[step]
                ids = [((d.get("verse") or d.get("story")) or {}).get("id") for d in wk["days"]]
                prev = ((wk["days"][0].get("verse") or wk["days"][0].get("story")) or {}).get("for_you")
                wk["_day_ms"], wk["_day_calls"] = [], []
                for i in range(2, len(ids) + 1):
                    if time.time() - t0 > budget + 25: return      # resumable: the week is rewritten from Day 2 next time
                    b = {k: v for k, v in body.items() if k != "alternates"}
                    b.update(understanding=h["understanding"], week=w, week_ids=ids, day_in_week=i, prev_for_you=prev,
                             exclude=[x for k in range(1, w) for x in ids_of(res.get(f"w{k}", {})) if x])
                    if w == 1: b["hook_id"] = (h.get("hook") or {}).get("id")
                    r_ = call("day", b)
                    wk["_day_ms"].append(r_.get("_ms")); wk["_day_calls"].append((r_.get("timings_ms") or {}).get("v3_day_calls"))
                    if "_error" in r_ or not r_.get("days"):
                        wk.setdefault("_day_errors", []).append(i); continue
                    nd = r_["days"][0]; wk["days"][i - 1] = nd
                    wk["understanding"]["flags"] = wk["understanding"].get("flags", []) + [x for x in r_["understanding"].get("flags", []) if x.startswith("v3:")]
                    prev = ((nd.get("verse") or nd.get("story")) or {}).get("for_you")
                wk["_days_done"] = True
                f.write_text(json.dumps(res, ensure_ascii=False, indent=1))
            r = res[step]
            d1 = (r.get("hook") or {}).get("ref") if step == "hook" else (r.get("days") or [{}])[0].get("verse", {}).get("ref") if r.get("days") else r.get("_error")
            print(f"{method} {case['id']:32s} {step} {r.get('_ms')}ms {d1}", flush=True)
    todo = [c for c in cases]
    with ThreadPoolExecutor(par) as ex: list(ex.map(one, todo))
left = 0
for case in cases:
    f = OUT / f"{case['id']}.json"; r = json.loads(f.read_text()) if f.exists() else {}
    need = ["hook"] + ([] if day1_only else ["w1"] + (["w2", "w3"] if case["weeks"] else []))
    left += sum(1 for s in need if s not in r or "_error" in r[s] or (per_day and s != "hook" and not r[s].get("_days_done")))
print(f"boot {boot:.1f}s; {left} steps left; {time.time() - t0:.0f}s")

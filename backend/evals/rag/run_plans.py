#!/usr/bin/env python3
"""run_plans.py — the live week-1 plan (POST /api/v1/recommend/plan, writers included) for every persona, sent the
frozen reading so v1 and v2 differ only in retrieval. One JSON per persona in evals/rag/plans/<run>/. Resumable.

    RAG_SPARSE_W=0 RAG_CE_W=0 RAG_CTX_W=0 RAG_POP_W=0 python3 evals/rag/run_plans.py v1      # v1 retrieval
    python3 evals/rag/run_plans.py v2                                                          # config defaults
    [--budget 160] [--par 3] [--set full|fast]
"""
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import evals.rag.boot  # noqa: E402,F401  (env defaults, cwd)
from evals.rag.boot import RAG  # noqa: E402

os.environ["RAG_CE_CACHE"] = ""        # live plans: the reranker is called like production


def main():
    run = sys.argv[1]
    budget = float(sys.argv[sys.argv.index("--budget") + 1]) if "--budget" in sys.argv else 160
    par = int(sys.argv[sys.argv.index("--par") + 1]) if "--par" in sys.argv else 3
    which = sys.argv[sys.argv.index("--set") + 1] if "--set" in sys.argv else "full"
    t0 = time.time()
    out = RAG / "plans" / run
    out.mkdir(parents=True, exist_ok=True)
    sits = [json.loads(l) for l in (RAG / "situations.jsonl").read_text().splitlines() if l.strip()]
    def done(sid):
        f = out / f"{sid}.json"
        if not f.exists():
            return False
        import re
        fl = ",".join(json.loads(f.read_text())["plan"]["understanding"].get("flags", []))
        m = re.search(r"missing=(\d+)", fl)
        return not (m and int(m.group(1)) >= 6)      # the writer was rate-limited: run it again
    sits = [s for s in sits if s["source"] != "golden_gita" and which in s["sets"] and not done(s["id"])]
    print(len(sits), "to run", flush=True)
    from fastapi.testclient import TestClient
    from main import app
    with TestClient(app) as c:
        def one(s):
            if time.time() - t0 > budget - 40:
                return
            u = json.loads((RAG / "readings" / f"{s['id']}.json").read_text())
            p = s["profile"]
            body = {"feeling": p["feeling"], "age": p.get("age"), "stages": p.get("stages") or [],
                    "phone_hours": p.get("phone_hours"), "note": s["note"][:1000], "note_source": s.get("note_source"),
                    "understanding": u, "week": 1, "days": 7}
            t = time.time()
            try:
                r = c.post("/api/v1/recommend/plan", json=body, timeout=120)
                r.raise_for_status()
            except Exception as e:  # noqa: BLE001
                print("FAIL", s["id"], type(e).__name__, str(e)[:150], flush=True)
                return
            plan = r.json()
            plan["_ms"] = int((time.time() - t) * 1000)
            (out / f"{s['id']}.json").write_text(json.dumps({"situation": s, "plan": plan}, ensure_ascii=False, indent=1))
            d1 = plan["days"][0].get("verse") or plan["days"][0].get("story") or {}
            print(f"ok {s['id']:40s} day1={d1.get('ref') or d1.get('title')} {plan['_ms']}ms", flush=True)

        with ThreadPoolExecutor(par) as ex:
            list(ex.map(one, sits))
    left = len([s for s in sits if not done(s["id"])])
    print(f"{left} left; {time.time() - t0:.0f}s")


if __name__ == "__main__":
    main()

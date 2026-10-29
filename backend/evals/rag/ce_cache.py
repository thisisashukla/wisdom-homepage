#!/usr/bin/env python3
"""ce_cache.py — score evals/rag/cache/ce_pairs.json (from ce_export.py) with the Cloudflare reranker
(ai/ce.py) into evals/rag/cache/ce_scores.json. Resumable; stops before --budget seconds.

    python3 evals/rag/ce_cache.py [--budget 160] [--par 6]
"""
import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evals.rag.boot import boot, RAG  # noqa: E402


def main():
    budget = float(sys.argv[sys.argv.index("--budget") + 1]) if "--budget" in sys.argv else 160
    par = int(sys.argv[sys.argv.index("--par") + 1]) if "--par" in sys.argv else 6
    t0 = time.time()
    boot()
    from ai.ce import cf_rerank, qkey
    data = json.loads((RAG / "cache" / "ce_pairs.json").read_text())
    dst = RAG / "cache" / "ce_scores.json"
    out = json.loads(dst.read_text()) if dst.exists() else {}
    jobs = []
    for p in data["pairs"]:
        k = qkey(p["q"])
        ids = [v for v in p["ids"] if f"{k}|{v}" not in out]
        for j in range(0, len(ids), 50):
            jobs.append((p["q"], k, ids[j:j + 50]))
    print(len(jobs), "calls to make", flush=True)

    def run(job):
        q, k, ids = job
        if time.time() - t0 > budget - 15:
            return k, ids, None
        return k, ids, cf_rerank(q, [data["docs"][v] for v in ids], timeout_s=20)

    n = fail = 0
    with ThreadPoolExecutor(par) as ex:
        for k, ids, sc in ex.map(run, jobs):
            if sc is None:
                fail += 1
                continue
            for v, x in zip(ids, sc):
                out[f"{k}|{v}"] = round(x, 5)
            n += len(ids)
    dst.write_text(json.dumps(out))
    print(f"scored {n} pairs ({fail} calls failed/skipped); {len(out)} cached; {time.time() - t0:.0f}s")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""read_situations.py — read every situation once with the live reader (Sarvam) and freeze the result in
evals/rag/readings/<id>.json. Retrieval evals replay these, so a retrieval change is never confounded by
reader sampling. Resumable; stops itself before --budget seconds.

    python3 evals/rag/read_situations.py [--budget 160] [--par 4] [--redo-fallback]
"""
import asyncio
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evals.rag.boot import boot, RAG  # noqa: E402

READ = RAG / "readings"


async def main():
    budget = float(sys.argv[sys.argv.index("--budget") + 1]) if "--budget" in sys.argv else 160
    par = int(sys.argv[sys.argv.index("--par") + 1]) if "--par" in sys.argv else 4
    redo = "--redo-fallback" in sys.argv
    t0 = time.time()
    READ.mkdir(exist_ok=True)
    rec, planner, und = boot(llm=True)
    from ai.understanding import Profile
    sits = [json.loads(l) for l in (RAG / "situations.jsonl").read_text().splitlines() if l.strip()]
    todo = []
    for s in sits:
        f = READ / f"{s['id']}.json"
        if f.exists():
            if not redo or json.loads(f.read_text()).get("source") == "llm":
                continue
        todo.append(s)
    print(f"{len(todo)} to read", flush=True)
    sem = asyncio.Semaphore(par)
    done = 0

    async def one(s):
        nonlocal done
        if time.time() - t0 > budget - 50:
            return
        async with sem:
            if time.time() - t0 > budget - 50:
                return
            p = s["profile"]
            prof = Profile(feeling=p["feeling"], age=p.get("age"), stages=list(p.get("stages") or []),
                           phone_hours=p.get("phone_hours"), note_source=s.get("note_source"))
            try:
                u, _ = await und.understand(prof, s["note"])
            except Exception as e:  # noqa: BLE001
                print("FAIL", s["id"], type(e).__name__, e, flush=True)
                return
            if p.get("age"):
                u.age = p["age"]
            if p.get("stages"):
                u.stages = list(p["stages"])
            (READ / f"{s['id']}.json").write_text(json.dumps(u.as_dict(), ensure_ascii=False, indent=1))
            done += 1
            print(f"ok {s['id']:40s} {u.source:8s} {u.risk:16s} {u.mechanism}", flush=True)

    await asyncio.gather(*(one(s) for s in todo))
    left = sum(1 for s in sits if not (READ / f"{s['id']}.json").exists())
    print(f"read {done} this run; {left} left; {time.time() - t0:.0f}s")


if __name__ == "__main__":
    asyncio.run(main())

#!/usr/bin/env python3
"""judge_sarvam.py: a PROVISIONAL blind judge on Sarvam (same model family as the writer for both methods and as v3's Day 1
reader: weaker evidence than a cross-family judge). Reads only judge/PROMPT.md and judge/*.jsonl, never judge_key/.
Every pair is judged twice (A/B as given, then swapped) to expose position bias; every shuffle item twice (X/Y swapped).
    python3 evals/plan_v3/judge_sarvam.py [--budget 150] [--par 3]     -> judge/answers_sarvam.jsonl (resumable)"""
import json, os, sys, time, re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1])); os.chdir(HERE.parents[1])
import logging; logging.disable(logging.WARNING)
from common.config import settings
from ai import consent; consent.set_allowed(True)
from ai.sarvam import init_sarvam
sv = init_sarvam(settings.sarvam_api_key, settings.sarvam_model)
arg = lambda k, d: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else d
budget, par = float(arg("--budget", 150)), int(arg("--par", 3))
J = HERE / "judge"; OUT = J / "answers_sarvam.jsonl"
PROMPT = (J / "PROMPT.md").read_text()
done = set()
if OUT.exists():
    for l in OUT.read_text().splitlines():
        if l.strip(): x = json.loads(l); done.add((x["item"], x["order"]))
jobs = []
for l in (J / "pairs.jsonl").read_text().splitlines():
    p = json.loads(l)
    for order in ("orig", "swap"):
        if (p["item"], order) in done: continue
        q = dict(p) if order == "orig" else {**p, "plan_A": p["plan_B"], "plan_B": p["plan_A"]}
        jobs.append(("pair", p["item"], order, q))
for l in (J / "shuffle.jsonl").read_text().splitlines():
    p = json.loads(l)
    for order in ("orig", "swap"):
        if (p["item"], order) in done: continue
        q = dict(p) if order == "orig" else {**p, "order_X": p["order_Y"], "order_Y": p["order_X"]}
        jobs.append(("shuffle", p["item"], order, q))
t0 = time.time()
def run(job):
    kind, item, order, q = job
    if time.time() - t0 > budget: return None
    task = "Task 1 (pairs). Answer the JSON object for this one item only." if kind == "pair" else "Task 2 (shuffle test). Answer the JSON object for this one item only."
    for k in range(4):
        try:
            out = sv.chat_json([{"role": "system", "content": PROMPT + "\n\n" + task},
                                {"role": "user", "content": json.dumps(q, ensure_ascii=False)}], temperature=0.0, max_tokens=1200, timeout_s=90)
            return {"item": item, "order": order, "kind": kind, "answer": out}
        except Exception as e:
            if "TooMany" in type(e).__name__: time.sleep(3 * (k + 1)); continue
            if k >= 1: return {"item": item, "order": order, "kind": kind, "error": type(e).__name__}
    return None
with ThreadPoolExecutor(par) as ex, open(OUT, "a") as f:
    for r in ex.map(run, jobs):
        if r and "answer" in r: f.write(json.dumps(r, ensure_ascii=False) + "\n"); f.flush()
n = len(OUT.read_text().splitlines()) if OUT.exists() else 0
print(f"{n} answers on disk; {len(jobs)} were pending at start; {time.time() - t0:.0f}s")

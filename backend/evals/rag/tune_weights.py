#!/usr/bin/env python3
"""tune_weights.py — RAG v2 step 9: learn the planner's beat weights instead of hand-setting them.

Coordinate ascent over BEAT_WEIGHTS (sem / sit / mech / job per beat) on a fixed 70% TRAIN split of the situations
(split by a hash of the id), objective = 0.4 nDCG@10 (all beats) + 0.3 R4 + 0.3 mean plan grade / 3 - 2 x plan-bad share.
Then the 30% HOLDOUT is scored with the current and the tuned weights. Writes evals/rag/cache/tuned_weights.json.
Unlabelled verses count as irrelevant here (conservative: a change that surfaces new verses is not rewarded for them).

    python3 evals/rag/tune_weights.py [--budget 165] [--passes 1]
"""
import hashlib
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evals.rag.boot import boot, RAG  # noqa: E402
import evals.rag.run_retrieval as RR  # noqa: E402

OUT = RAG / "cache" / "tuned_weights.json"


def split(sid: str) -> str:
    return "train" if int(hashlib.sha1(sid.encode()).hexdigest(), 16) % 10 < 7 else "holdout"


def objective(rep: dict) -> float:
    o, p = rep["overall"], rep["personas"]
    return 0.4 * (o["R2_all"] or 0) + 0.3 * (p["R4"] or 0) + 0.3 * (p["P_mean"] or 0) / 3 - 2 * (p["P_bad"] or 0)


def score(which: str) -> tuple[float, dict]:
    rep = RR.evaluate(f"tune_{which}", "full", only=lambda sid: split(sid) == which)
    return objective(rep), rep


def main():
    budget = float(sys.argv[sys.argv.index("--budget") + 1]) if "--budget" in sys.argv else 165
    passes = int(sys.argv[sys.argv.index("--passes") + 1]) if "--passes" in sys.argv else 1
    t0 = time.time()
    boot()
    import ai.planner as P
    orig = json.loads(json.dumps(P.BEAT_WEIGHTS))
    state = json.loads(OUT.read_text()) if OUT.exists() else {"weights": orig, "done": [], "history": []}
    W = state["weights"]
    for r in W:
        P.BEAT_WEIGHTS[r].update(W[r])
    best, _ = score("train")
    print(f"start train objective {best:.4f}", flush=True)
    params = [(r, k) for r in ("hook", "diagnose", "steady", "act") for k in ("sem", "sit", "mech", "job")]
    for ps in range(passes):
        for r, k in params:
            tag = f"{ps}:{r}.{k}"
            if tag in state["done"]:
                continue
            if time.time() - t0 > budget - 25:
                OUT.write_text(json.dumps(state, indent=1))
                print("budget: saved, rerun to continue", flush=True)
                return
            base = W[r][k]
            for m in (0.6, 0.8, 1.25, 1.6):
                P.BEAT_WEIGHTS[r][k] = round(base * m, 4) if base else round(0.2 * m, 4)
                obj, _ = score("train")
                if obj > best + 0.003:
                    best, W[r][k] = obj, P.BEAT_WEIGHTS[r][k]
                    state["history"].append([tag, W[r][k], round(obj, 4)])
                    print(f"  {tag} -> {W[r][k]}  train {obj:.4f}", flush=True)
            P.BEAT_WEIGHTS[r][k] = W[r][k]
            state["done"].append(tag)
            OUT.write_text(json.dumps(state, indent=1))
    for r in orig:
        P.BEAT_WEIGHTS[r].update(orig[r])
    h0, rep0 = score("holdout")
    for r in W:
        P.BEAT_WEIGHTS[r].update(W[r])
    h1, rep1 = score("holdout")
    state["holdout"] = {"current": round(h0, 4), "tuned": round(h1, 4)}
    state["train_best"] = round(best, 4)
    OUT.write_text(json.dumps(state, indent=1))
    print(f"train {best:.4f} | holdout current {h0:.4f} -> tuned {h1:.4f} ({h1 - h0:+.4f})")
    for k in ("R2_all", "R1_all"):
        print(k, rep0["overall"][k], "->", rep1["overall"][k])
    for k in ("R4", "P_mean", "P_bad", "D1"):
        print(k, rep0["personas"][k], "->", rep1["personas"][k])
    print("weights", json.dumps(W))


if __name__ == "__main__":
    main()

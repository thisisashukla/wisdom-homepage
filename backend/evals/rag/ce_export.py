#!/usr/bin/env python3
"""ce_export.py — the (beat statement, verse) pairs the cross-encoder must score for every eval situation:
each beat's top 80 eligible verses under both the situation query and the week-1 query (planner.plan colours the
week-1 vectors with the week title). Writes evals/rag/cache/ce_pairs.json for ce_score.py (run where torch is).

    RAG_CE_W=0 python3 evals/rag/ce_export.py
"""
import json
import os
import sys
from pathlib import Path

import numpy as np

os.environ["RAG_CE_W"] = "0"
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evals.rag.boot import boot, RAG  # noqa: E402
from evals.rag.retrieve import load_reading, BEATS  # noqa: E402


def main():
    rec, planner, _ = boot()
    from ai.planner import level_texts
    sits = [json.loads(l) for l in (RAG / "situations.jsonl").read_text().splitlines() if l.strip()]
    pairs, docs = {}, {}
    for s in sits:
        if not (RAG / "readings" / f"{s['id']}.json").exists():
            continue
        u = load_reading(s["id"])
        feeling = s["profile"]["feeling"]
        texts = level_texts(u, "situation")
        for qv in (planner.query_vectors(u)[0], planner._week_qv(u, 1, "situation")):
            sc = planner.beat_scores(u, feeling, qv, set())
            for b in BEATS:
                x = sc[b].copy()
                if b == "hook":
                    x = np.where(planner._gita, x, -1e9)
                top = [int(i) for i in np.argsort(-x)[:80] if x[i] > -1e8]
                ids = [planner.verses[i]["id"] for i in top]
                pairs.setdefault(texts[b], set()).update(ids)
                for i in top:
                    docs[planner.verses[i]["id"]] = rec._verse_doc(planner.verses[i])
    out = {"pairs": [{"q": q, "ids": sorted(v)} for q, v in pairs.items()], "docs": docs}
    (RAG / "cache" / "ce_pairs.json").write_text(json.dumps(out, ensure_ascii=False))
    print(len(out["pairs"]), "queries", sum(len(p["ids"]) for p in out["pairs"]), "pairs", len(docs), "docs")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""ce_score.py — score evals/rag/cache/ce_pairs.json with BAAI/bge-reranker-v2-m3 (needs torch +
sentence-transformers; ~2.3 GB RAM). Merges into ce_scores.json ({sha1(q)[:16]|verse_id: sigmoid score}). Resumable.

    python3 ce_score.py ce_pairs.json ce_scores.json
"""
import hashlib
import json
import sys
import time
from pathlib import Path


def main():
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    data = json.loads(src.read_text())
    out = json.loads(dst.read_text()) if dst.exists() else {}
    from sentence_transformers import CrossEncoder
    import torch
    torch.set_num_threads(max(1, torch.get_num_threads()))
    m = CrossEncoder("BAAI/bge-reranker-v2-m3", max_length=384)
    t0, n = time.time(), 0
    for p in data["pairs"]:
        k = hashlib.sha1(p["q"].encode()).hexdigest()[:16]
        ids = [v for v in p["ids"] if f"{k}|{v}" not in out]
        if not ids:
            continue
        sc = m.predict([(p["q"], data["docs"][v]) for v in ids], batch_size=32, show_progress_bar=False,
                       activation_fn=torch.nn.Sigmoid())
        for v, x in zip(ids, sc):
            out[f"{k}|{v}"] = round(float(x), 5)
        n += len(ids)
        if n and n % 2000 < len(ids):
            dst.write_text(json.dumps(out))
            print(f"{n} pairs, {time.time() - t0:.0f}s, {n / (time.time() - t0):.1f}/s", flush=True)
    dst.write_text(json.dumps(out))
    print(f"done {n} new pairs in {time.time() - t0:.0f}s; {len(out)} total")


if __name__ == "__main__":
    main()

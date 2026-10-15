"""
Compare Cloudflare Workers AI bge-m3 vectors against the stored corpus vectors.

    CF_ACCOUNT_ID=... CF_API_TOKEN=... python scripts/check_embed_parity.py

Embeds a sample of verses with the same enriched text used at index time and
reports cosine vs the stored row. ~0.99+ means the spaces match.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv
load_dotenv(ROOT / ".env")

from ai.embedder import CloudflareBgeM3Embedder
from ai.reranker import _enriched_doc

data = ROOT / "data"
emb = np.load(data / "embeddings.npy").astype(np.float32)
verses = json.loads((data / "verses.json").read_text())
if isinstance(verses, dict):
    verses = verses.get("verses") or list(verses.values())
assert len(verses) == len(emb), f"verses {len(verses)} != embeddings {len(emb)}"

rng = np.random.default_rng(0)
idx = rng.choice(len(verses), size=int(os.environ.get("N", 20)), replace=False)
texts = [_enriched_doc(verses[i]) for i in idx]

cf = CloudflareBgeM3Embedder(os.environ["CF_ACCOUNT_ID"], os.environ["CF_API_TOKEN"])
v = cf.embed_batch(texts)
stored = emb[idx] / np.linalg.norm(emb[idx], axis=1, keepdims=True)
cos = (v * stored).sum(axis=1)

ranks = []
for row, i in zip(v, idx):
    sims = emb @ row
    ranks.append(int((sims > sims[i]).sum()) + 1)

print(f"cosine  min {cos.min():.4f}  mean {cos.mean():.4f}  max {cos.max():.4f}")
print(f"self-rank (1 = own verse is top hit): {ranks}")
short = np.array([len(t) < 400 for t in texts])
print(f"short docs (<400 chars) cosine mean {cos[short].mean():.4f}  (long docs drift because _enriched_doc != index-time text)")
ok = (cos[short] > 0.999).all() and max(ranks) == 1
print("PASS — same vector space" if ok else "MISMATCH — re-embed corpus with Cloudflare")

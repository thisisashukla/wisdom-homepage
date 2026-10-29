"""sparse.py — a BM25 keyword leg for the planner (RAG v2, step 4).

Dense BGE-M3 cosines miss exact words: names (Vidula, Karna), texts' own terms (dharma, karma, attachment), and the
specific nouns of a statement ("insult", "temper", "debt"). BM25 over the same verse document the dense side embeds
(line + translation + setting + situation labels + themes) rescues those. The planner blends the two after putting
each on the query's own spread (Planner._relative), weight settings.rag_sparse_w.
"""
from __future__ import annotations

import math
from collections import Counter
from typing import Dict, List

import numpy as np


class BM25:
    def __init__(self, docs: List[List[str]], k1: float = 1.2, b: float = 0.75):
        self.docs = [Counter(d) for d in docs]
        self.len = np.array([len(d) for d in docs], dtype=np.float32)
        self.avg = float(self.len.mean()) if len(docs) else 1.0
        df = Counter(t for d in self.docs for t in d)
        n = len(docs)
        self.idf = {t: math.log(1 + (n - c + 0.5) / (c + 0.5)) for t, c in df.items()}
        self.k1, self.b = k1, b
        self.post: Dict[str, List[tuple]] = {}
        for i, d in enumerate(self.docs):
            for t, c in d.items():
                self.post.setdefault(t, []).append((i, c))

    def scores(self, q: List[str]) -> np.ndarray:
        s = np.zeros(len(self.docs), dtype=np.float32)
        for t in set(q):
            idf = self.idf.get(t)
            if idf is None:
                continue
            for i, c in self.post[t]:
                s[i] += idf * c * (self.k1 + 1) / (c + self.k1 * (1 - self.b + self.b * self.len[i] / self.avg))
        return s

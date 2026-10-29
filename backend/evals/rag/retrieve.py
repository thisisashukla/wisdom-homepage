"""retrieve.py — what the planner retrieves for a frozen reading, without any LLM call.

rank(...)  per-beat rankings over every eligible verse (hook: Gita only, as Day 1 is), best first
week(...)  the week-1 plan exactly as planner.plan builds it (verse ids in day order; story days skipped)
bm25(...)  a plain BM25 leg over the planner's verse documents, used for label pooling
"""
from __future__ import annotations

import json
import math
from collections import Counter
from typing import Dict, List

import numpy as np

from evals.rag.boot import RAG

BEATS = ("hook", "diagnose", "steady", "act")


def load_reading(sid: str):
    from ai.understanding import Understanding
    d = json.loads((RAG / "readings" / f"{sid}.json").read_text())
    d.pop("timings_ms", None)
    return Understanding(**d)


def rank(planner, u, feeling: str) -> Dict[str, List[str]]:
    qv = planner.query_vectors(u)[0] if planner.semantic else None
    sc = planner.beat_scores(u, feeling, qv, set())
    out = {}
    for b in BEATS:
        s = sc[b].copy()
        if b == "hook":
            s = np.where(planner._gita, s, -1e9)
        order = [int(i) for i in np.argsort(-s) if s[i] > -1e8]
        out[b] = [planner.verses[i]["id"] for i in order]
    return out


def week(planner, u, feeling: str) -> List[dict]:
    out = []
    for d in planner.plan(u, feeling, days=7):
        if d.get("verse_index") is not None:
            out.append({"day": d["day"], "beat": d["beat"], "id": planner.verses[d["verse_index"]]["id"]})
        elif d.get("story"):
            out.append({"day": d["day"], "beat": "story", "story": d["story"]["prasang"]["id"]})
    return out


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


_BM = None


def bm25_for(planner) -> BM25:
    global _BM
    if _BM is None:
        from ai.recommender import _toks
        _BM = BM25([_toks(planner.rec._verse_doc(v) + " " + " ".join(v.get("themes") or [])) for v in planner.verses])
    return _BM

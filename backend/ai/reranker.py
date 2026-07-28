"""
reranker.py — Cross-encoder reranker for scripture search.

Model: BAAI/bge-reranker-v2-m3 (~2.3 GB, lazy-loaded from HF cache).

Why: bake-off §10 in sanscripts/notebooks/scripture_indic_sbert_zvec.ipynb
showed BGE-M3 dense retrieval + bge-reranker-v2-m3 on top-40 → top-k lifts
P-hit@5 meaningfully vs. pure dense. Cross-encoders score (query, doc) pairs
jointly instead of dot-product on separate embeddings, so they catch relevance
subtleties dense retrieval misses.

Cost profile:
  - Model load: ~5s on cold start, ~2GB RAM after warm.
  - Per query: ~50-200ms for a batch of 40 pairs on CPU.
  - Runs AFTER the semantic top-40 pull, so the cost is per-query, not per-verse.

Kept behind a flag (settings.reranker_enabled) so it can be turned off
without touching search.py — falls through as a pass-through.
"""
from __future__ import annotations

import logging
import os
from typing import List, Optional

import numpy as np

# Guard TF/Flax off before any transformers import (same reason as embedder.py).
os.environ.setdefault("USE_TF", "0")
os.environ.setdefault("USE_FLAX", "0")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

logger = logging.getLogger(__name__)


class BgeReranker:
    """
    Thin wrapper around sentence-transformers CrossEncoder.

    Scores (query, passage) pairs jointly. Returns a numpy array of scores,
    one per pair, in the input order. Higher = more relevant.
    """

    def __init__(self, model_source: str = "BAAI/bge-reranker-v2-m3"):
        self.model_source = model_source
        self._model = None

    def _load(self) -> None:
        if self._model is not None:
            return
        try:
            from sentence_transformers import CrossEncoder
        except ImportError as e:
            raise ImportError("Run: pip install sentence-transformers") from e

        logger.info("Loading BGE reranker from %s …", self.model_source)
        # max_length=512 covers a query + a full enriched verse (Hindi +
        # English + essence + insight easily fits).
        self._model = CrossEncoder(self.model_source, max_length=512)
        logger.info("BGE reranker ready.")

    def score(self, query: str, passages: List[str]) -> np.ndarray:
        """
        Score every passage against the query. Returns float32 array of shape (N,).
        Higher score = more relevant. Range is model-specific (typically -10..10
        raw logits); use it for RELATIVE ranking, not as an absolute probability.
        """
        if not passages:
            return np.array([], dtype=np.float32)
        self._load()
        pairs = [(query, p) for p in passages]
        scores = self._model.predict(
            pairs,
            batch_size=16,
            show_progress_bar=False,
            convert_to_numpy=True,
        )
        return scores.astype(np.float32)

    def score_batch(self, queries_and_passages: List[tuple[str, str]]) -> np.ndarray:
        """Score arbitrary (query, passage) pairs — useful for multi-intent."""
        if not queries_and_passages:
            return np.array([], dtype=np.float32)
        self._load()
        scores = self._model.predict(
            queries_and_passages,
            batch_size=16,
            show_progress_bar=False,
            convert_to_numpy=True,
        )
        return scores.astype(np.float32)


# ── Module singleton ──────────────────────────────────────────────────────────
# Follows the same pattern as embedder.py / sarvam.py.

_reranker: Optional[BgeReranker] = None


def get_reranker() -> Optional[BgeReranker]:
    """Returns the reranker if initialised, else None (feature disabled)."""
    return _reranker


def init_reranker(model_name: str = "BAAI/bge-reranker-v2-m3", eager: bool = False) -> BgeReranker:
    """
    Register the singleton. If eager=True, loads the model now (adds ~5s to
    startup but avoids first-query latency spike). If eager=False, model
    loads lazily on the first score() call.
    """
    global _reranker
    _reranker = BgeReranker(model_source=model_name)
    if eager:
        _reranker._load()
    return _reranker


def disable_reranker() -> None:
    """Drop the singleton — search will fall through as pass-through."""
    global _reranker
    _reranker = None

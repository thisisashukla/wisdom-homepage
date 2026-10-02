"""
reranker.py — BGE-M3 cross-encoder reranker (bge-reranker-v2-m3).

Two-stage retrieval: dense retrieval pulls a wide candidate pool (top-40),
this cross-encoder reranks it to top-k (5–8). Per sanscripts notebook §10
this materially improved P-hit@5 on the golden set — especially for hinglish
and question-shaped queries where the bi-encoder was under-confident.

Design notes:
  - This is OPTIONAL. If the model can't be loaded (no network, disk full,
    incompatible torch), the module records the failure once and every
    subsequent rerank call returns the input unchanged. The pipeline
    degrades gracefully to dense-only retrieval.
  - Reranker score is on a different scale than cosine — do NOT compare them.
    We keep both on the VerseResult so the search endpoint can use rerank_score
    for ordering while dense_score stays available for debugging.
  - The rerank input document is the SAME enriched text form used at index
    time (Hindi + English translation + essence + simple_meaning + tags).
    Consistency matters — a bare English translation would tank cross-encoder
    scores relative to what the dense side scored on.

Cost: ~30–80ms for 40 pairs on CPU with bge-reranker-v2-m3 (568MB float32).
Acceptable for the /api/v1/search hot path if we keep the pool <= 40.
"""
from __future__ import annotations

import logging
import os
from typing import List, Optional, Tuple

os.environ.setdefault("USE_TF", "0")
os.environ.setdefault("USE_FLAX", "0")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

logger = logging.getLogger(__name__)


def _enriched_doc(verse: dict) -> str:
    """
    Build the same enriched string the corpus was embedded from.
    Order matters — matches sanscripts/notebooks embed doc format.
    """
    parts = []
    if verse.get("translation"):
        parts.append(verse["translation"])
    if verse.get("english_translation"):
        parts.append(verse["english_translation"])
    if verse.get("essence"):
        parts.append(verse["essence"])
    if verse.get("simple_meaning"):
        parts.append(verse["simple_meaning"])
    tags = verse.get("tags") or []
    if isinstance(tags, list) and tags:
        parts.append(" ".join(tags))
    if verse.get("verse_text"):  # Devanagari appended
        parts.append(verse["verse_text"])
    return "\n".join(parts)


class BgeReranker:
    """
    Thin wrapper around FlagEmbedding.FlagReranker (bge-reranker-v2-m3).

    Falls back to a no-op if the model can't be loaded — see module docstring.
    """

    def __init__(self, model_source: str = "BAAI/bge-reranker-v2-m3"):
        self.model_source = model_source
        self._model = None
        self._load_failed = False
        self._load_error: Exception | None = None

    def _load(self, *, strict: bool = False) -> None:
        if self._model is not None:
            return
        if self._load_failed:
            if strict:
                raise RuntimeError(f"Reranker failed to load: {self._load_error}") from self._load_error
            return
        try:
            # Prefer FlagEmbedding (native BGE tooling); fall back to
            # sentence_transformers CrossEncoder which also supports the same
            # weights.
            try:
                from FlagEmbedding import FlagReranker
                logger.info("Loading bge-reranker-v2-m3 via FlagEmbedding …")
                self._model = FlagReranker(self.model_source, use_fp16=True)
                self._impl = "flag"
            except ImportError:
                from sentence_transformers import CrossEncoder
                logger.info("Loading bge-reranker-v2-m3 via CrossEncoder …")
                self._model = CrossEncoder(self.model_source)
                self._impl = "cross_encoder"
            logger.info("Reranker ready (%s)", self._impl)
        except Exception as e:
            # Any load failure → degrade to no-op. Log once so we notice.
            logger.warning(
                "Reranker unavailable — falling back to dense-only retrieval. Reason: %s", e
            )
            self._load_failed = True
            self._load_error = e
            if strict:
                raise RuntimeError(f"Reranker failed to load from {self.model_source}: {e}") from e

    def load(self) -> "BgeReranker":
        """Load model weights now, raising if startup cannot make them ready."""
        self._load(strict=True)
        return self

    @property
    def available(self) -> bool:
        return self._model is not None

    def score(self, query: str, docs: List[str]) -> Optional[List[float]]:
        """Return raw reranker scores for each (query, doc). None if unavailable."""
        self._load()
        if self._load_failed:
            return None
        pairs = [(query, d) for d in docs]
        try:
            if self._impl == "flag":
                # FlagReranker.compute_score handles batch natively
                out = self._model.compute_score(pairs, normalize=True)
                # Single pair returns float, batch returns list — normalise
                if isinstance(out, (int, float)):
                    return [float(out)]
                return [float(x) for x in out]
            else:
                scores = self._model.predict(pairs, batch_size=32, show_progress_bar=False)
                return [float(x) for x in scores]
        except Exception as e:
            logger.error("Reranker scoring failed: %s", e)
            return None

    def rerank(
        self,
        query: str,
        candidates: List[dict],
        top_k: int,
    ) -> List[Tuple[dict, float]]:
        """
        Score `candidates` (each: {verse, sim, intent, ...}) and return the
        top_k sorted by reranker score. Falls through to input order if the
        reranker is unavailable — caller uses that as the signal to keep
        dense ordering.
        """
        if not candidates:
            return []
        docs = [_enriched_doc(c["verse"]) for c in candidates]
        scores = self.score(query, docs)
        if scores is None:
            # No-op fallback: return top_k in input order, score=None sentinel
            return [(c, float("nan")) for c in candidates[:top_k]]
        paired = list(zip(candidates, scores))
        paired.sort(key=lambda t: t[1], reverse=True)
        return paired[:top_k]


# ── Module singleton ──────────────────────────────────────────────────────────

_reranker: Optional[BgeReranker] = None


def get_reranker() -> Optional[BgeReranker]:
    """Return the reranker singleton or None if init_reranker was never called."""
    return _reranker


def init_reranker(
    model_source: str = "BAAI/bge-reranker-v2-m3",
    *,
    eager: bool = True,
) -> BgeReranker:
    """
    Instantiate the reranker singleton and load its weights before returning.
    A configured reranker is part of readiness, so eager loading raises when
    weights cannot be loaded instead of deferring the failure to a request.

    Pass an empty string to skip creation entirely (disable reranker at
    the config layer).
    """
    global _reranker
    if not model_source:
        _reranker = None
        logger.info("Reranker disabled by config")
        return None  # type: ignore[return-value]
    _reranker = BgeReranker(model_source=model_source)
    if eager:
        logger.info("Loading configured reranker during startup: %s", model_source)
        _reranker.load()
    logger.info("Reranker ready: %s", model_source)
    return _reranker

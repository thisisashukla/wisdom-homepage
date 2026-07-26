"""
embedder.py — BGE-M3 query embedder for scripture search.

Loads from local model weights (api/model/) if MODEL_DIR is set in .env,
otherwise downloads from HuggingFace on first run (~2.3 GB, then cached).

Only used at query time to embed the incoming user query.
The corpus embeddings (bge_m3.npy) are pre-computed and loaded from disk.
"""
from __future__ import annotations

import logging
import os

# Must be set before sentence_transformers / transformers import to prevent
# TF/Keras from loading (conflicts with protobuf version in some conda envs).
os.environ.setdefault("USE_TF", "0")
os.environ.setdefault("USE_FLAX", "0")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

from typing import Optional
import numpy as np

logger = logging.getLogger(__name__)


class BgeM3Embedder:
    """
    Thin wrapper around sentence-transformers for BAAI/bge-m3.

    model_source: path to local weights (api/model/) or HF model name.
    """

    def __init__(self, model_source: str = "BAAI/bge-m3"):
        self.model_source = model_source
        self._model = None

    def _load(self) -> None:
        if self._model is not None:
            return
        try:
            from sentence_transformers import SentenceTransformer
        except ImportError as e:
            raise ImportError("Run: pip install sentence-transformers") from e

        logger.info("Loading BGE-M3 from %s …", self.model_source)
        self._model = SentenceTransformer(self.model_source)
        logger.info("BGE-M3 ready (dim=%d)", self.dim)

    @property
    def dim(self) -> int:
        self._load()
        return self._model.get_sentence_embedding_dimension()

    def embed(self, text: str) -> np.ndarray:
        """Embed a single query string → L2-normalised float32 (1024,)."""
        return self.embed_batch([text])[0]

    def embed_batch(self, texts: list[str]) -> np.ndarray:
        """Embed a list of strings → float32 (N, 1024)."""
        self._load()
        return self._model.encode(
            texts,
            normalize_embeddings=True,
            batch_size=32,
            show_progress_bar=False,
            convert_to_numpy=True,
        ).astype(np.float32)


# ── Module singleton ──────────────────────────────────────────────────────────

_embedder: Optional[BgeM3Embedder] = None


def get_embedder() -> BgeM3Embedder:
    global _embedder
    if _embedder is None:
        raise RuntimeError("Embedder not initialised — call init_embedder() first")
    return _embedder


def init_embedder(model_dir: str = "", model_name: str = "BAAI/bge-m3") -> BgeM3Embedder:
    """
    Load BGE-M3. Uses local weights from model_dir if it exists,
    otherwise falls back to HuggingFace (cached after first download).
    """
    global _embedder
    from pathlib import Path
    source = model_dir if model_dir and Path(model_dir).exists() else model_name
    _embedder = BgeM3Embedder(model_source=source)
    _embedder._load()
    return _embedder

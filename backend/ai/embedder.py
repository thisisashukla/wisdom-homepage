"""
embedder.py — BGE-M3 query embedder for scripture search.

Loads from local model weights (api/model/) if MODEL_DIR is set in .env,
otherwise downloads from HuggingFace on first run (~2.3 GB, then cached).

Only used at query time to embed the incoming user query.
The corpus embeddings (bge_m3.npy) are pre-computed and loaded from disk.

Two backends, same interface (embed / embed_batch / dim):
  - local:      sentence-transformers on this machine (needs torch; dev only)
  - cloudflare: Workers AI @cf/baai/bge-m3 over REST (no torch; used on Vercel)
Pick with EMBED_BACKEND=local|cloudflare.
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


class CloudflareBgeM3Embedder:
    """
    BAAI/bge-m3 via Cloudflare Workers AI REST. Same vector space as the
    locally pre-computed corpus embeddings, provided parity holds
    (scripts/check_embed_parity.py).
    """

    DIM = 1024
    BATCH = 50

    def __init__(self, account_id: str, api_token: str,
                 model: str = "@cf/baai/bge-m3", timeout_s: float = 15.0):
        if not account_id or not api_token:
            raise RuntimeError("EMBED_BACKEND=cloudflare needs CF_ACCOUNT_ID and CF_API_TOKEN")
        self.url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}"
        self.headers = {"Authorization": f"Bearer {api_token}"}
        self.timeout_s = timeout_s
        self._model = model  # non-None so /health reports the embedder as loaded

    def _load(self) -> None:
        return None

    @property
    def dim(self) -> int:
        return self.DIM

    def embed(self, text: str) -> np.ndarray:
        return self.embed_batch([text])[0]

    def embed_batch(self, texts: list[str]) -> np.ndarray:
        import httpx
        out: list[list[float]] = []
        with httpx.Client(timeout=self.timeout_s) as client:
            for i in range(0, len(texts), self.BATCH):
                chunk = texts[i:i + self.BATCH]
                r = client.post(self.url, headers=self.headers, json={"text": chunk})
                r.raise_for_status()
                body = r.json()
                result = body.get("result", body)
                data = result.get("data") if isinstance(result, dict) else None
                if not data:
                    raise RuntimeError(f"Unexpected Workers AI response: {str(body)[:300]}")
                out.extend(data)
        v = np.asarray(out, dtype=np.float32)
        v /= np.maximum(np.linalg.norm(v, axis=1, keepdims=True), 1e-12)
        return v


# ── Module singleton ──────────────────────────────────────────────────────────

_embedder: Optional["BgeM3Embedder | CloudflareBgeM3Embedder"] = None


def get_embedder():
    global _embedder
    if _embedder is None:
        raise RuntimeError("Embedder not initialised — call init_embedder() first")
    return _embedder


def init_embedder(model_dir: str = "", model_name: str = "BAAI/bge-m3",
                  backend: str = "local", cf_account_id: str = "",
                  cf_api_token: str = "", cf_model: str = "@cf/baai/bge-m3"):
    """
    backend="cloudflare": Workers AI REST, no local model.
    backend="local": local weights from model_dir if it exists, otherwise
    HuggingFace (cached after first download).
    """
    global _embedder
    if backend == "cloudflare":
        _embedder = CloudflareBgeM3Embedder(cf_account_id, cf_api_token, cf_model)
        logger.info("Embedder: Cloudflare Workers AI (%s)", cf_model)
        return _embedder
    from pathlib import Path
    source = model_dir if model_dir and Path(model_dir).exists() else model_name
    _embedder = BgeM3Embedder(model_source=source)
    _embedder._load()
    return _embedder

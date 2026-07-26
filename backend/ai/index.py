"""
index.py — Scripture search index for the Wisdom backend.

Loads pre-built assets from backend/data/:
  - embeddings.npy  (18048 × 1024 float32, BGE-M3, L2-normalised)
  - verses.json     (18048 verse dicts in matching order)

No index building, no sanscripts dependency at runtime.
Startup cost: ~1 s to load the numpy array + json file.
A full cosine scan over 18k × 1024 float32 takes ~5 ms on CPU.
"""
from __future__ import annotations

import json
import logging
import time
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Optional

import numpy as np

logger = logging.getLogger(__name__)


class ScriptureIndex:
    """
    In-memory index: bge_m3 embeddings (numpy) + verse metadata (list of dicts).

    Load with ScriptureIndex.from_data_dir(data_dir).
    """

    def __init__(self, verses: list[dict], embeddings: np.ndarray):
        assert embeddings.shape[0] == len(verses), (
            f"Embedding count {embeddings.shape[0]} != verse count {len(verses)}. "
            "Regenerate verses.json from the sanscripts notebooks."
        )
        self._verses     = verses
        self._embeddings = embeddings      # (N, 1024) float32, L2-normalised

        # Fast lookups
        self._by_ref: Dict[str, dict] = {v["script_ref"]: v for v in verses}
        self._by_scripture: Dict[str, list] = defaultdict(list)
        for v in verses:
            self._by_scripture[v["scripture"]].append(v)

        logger.info(
            "ScriptureIndex ready: %d verses  embeddings=%s",
            len(verses), embeddings.shape,
        )

    @property
    def size(self) -> int:
        return len(self._verses)

    @classmethod
    def from_data_dir(cls, data_dir: Path) -> "ScriptureIndex":
        """Load embeddings.npy + verses.json from a single data directory."""
        t0 = time.perf_counter()

        embed_path  = data_dir / "embeddings.npy"
        verses_path = data_dir / "verses.json"

        logger.info("Loading embeddings from %s …", embed_path)
        embeddings = np.load(str(embed_path)).astype(np.float32)

        logger.info("Loading verse metadata from %s …", verses_path)
        verses = json.loads(verses_path.read_text(encoding="utf-8"))

        logger.info(
            "Loaded in %.1fs — %d verses, embeddings %s",
            time.perf_counter() - t0, len(verses), embeddings.shape,
        )
        return cls(verses, embeddings)

    # ── Search ────────────────────────────────────────────────────────────────

    def search(
        self,
        query_vec: np.ndarray,
        k: int = 5,
        scripture_filter: Optional[List[str]] = None,
    ) -> list[dict]:
        """
        Return top-k verses as dicts with an added 'sim' key.
        query_vec: L2-normalised float32 (1024,) — cosine = dot product.
        """
        sims = self._embeddings @ query_vec.astype(np.float32)   # (N,)

        if scripture_filter:
            mask = np.array([v["scripture"] in scripture_filter for v in self._verses])
            sims[~mask] = -1.0

        top_idx = np.argpartition(sims, -k)[-k:]
        top_idx = top_idx[np.argsort(sims[top_idx])[::-1]]

        return [{"verse": self._verses[i], "sim": float(sims[i])} for i in top_idx]

    def get_verse(self, script_ref: str) -> Optional[dict]:
        return self._by_ref.get(script_ref)

    def get_neighbours(self, scripture: str, order: int, window: int = 2) -> list[dict]:
        return [
            v for v in self._by_scripture.get(scripture, [])
            if abs(v["order"] - order) <= window
        ]


# ── Module singleton ──────────────────────────────────────────────────────────

_index: Optional[ScriptureIndex] = None


def get_index() -> ScriptureIndex:
    global _index
    if _index is None:
        raise RuntimeError("Index not initialised — call init_index() first")
    return _index


def init_index(data_dir: str) -> ScriptureIndex:
    """
    Load pre-built embeddings + verse metadata into memory.
    Call once at app startup. No model inference happens here.
    """
    global _index
    _index = ScriptureIndex.from_data_dir(Path(data_dir))
    return _index

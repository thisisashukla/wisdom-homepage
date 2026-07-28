"""
index.py — Scripture retrieval index.

Two implementations behind one interface:

  NumpyScriptureIndex
      Loads embeddings.npy + verses.json into memory (~74 MB for 18k × 1024).
      ~5 ms full cosine scan on CPU. Zero network cost. What the backend
      shipped with pre-Supabase.

  SupabaseScriptureIndex
      Queries Supabase pgvector via the match_verses() RPC. No local
      embeddings needed at runtime; the box only needs to embed queries
      (BGE-M3) and forward them. Enables cross-service audio metadata
      (audio_url, audio_timestamps) to travel with the retrieval hit
      without a second round trip.

Select at startup via settings.use_supabase_index in main.py.

Both implementations expose the SAME method surface used by server/search.py:
  - .size            (int, best-effort — for logging)
  - .search(q_vec, k, scripture_filter) -> list[{"verse": dict, "sim": float}]
  - .get_verse(uid) -> dict | None
"""
from __future__ import annotations

import json
import logging
import time
from abc import ABC, abstractmethod
from collections import defaultdict
from pathlib import Path
from typing import Any, Dict, List, Optional

import numpy as np

logger = logging.getLogger(__name__)


# ── Interface ─────────────────────────────────────────────────────────────────

class ScriptureIndex(ABC):
    """Abstract retrieval interface. Both backends satisfy it identically."""

    @property
    @abstractmethod
    def size(self) -> int: ...

    @abstractmethod
    def search(
        self,
        query_vec: np.ndarray,
        k: int = 5,
        scripture_filter: Optional[List[str]] = None,
    ) -> list[dict]:
        """
        Return top-k verses as dicts of the form:
            {"verse": <full verse dict>, "sim": <cosine similarity float>}
        Sorted by sim descending.
        """

    @abstractmethod
    def get_verse(self, script_ref: str) -> Optional[dict]:
        """Fetch a single verse by its uid ("bhagwad_gita:18.66"). None if absent."""


# ── Numpy in-memory implementation ───────────────────────────────────────────

class NumpyScriptureIndex(ScriptureIndex):
    """
    In-memory: numpy embeddings + verse metadata (list of dicts).
    Load with `from_data_dir(data_dir)`.
    """

    def __init__(self, verses: list[dict], embeddings: np.ndarray):
        assert embeddings.shape[0] == len(verses), (
            f"Embedding count {embeddings.shape[0]} != verse count {len(verses)}."
        )
        self._verses     = verses
        self._embeddings = embeddings                    # (N, 1024) float32, L2-normalised
        self._by_ref: Dict[str, dict] = {v["script_ref"]: v for v in verses}
        self._by_scripture: Dict[str, list] = defaultdict(list)
        for v in verses:
            self._by_scripture[v["scripture"]].append(v)

        logger.info(
            "NumpyScriptureIndex ready: %d verses  embeddings=%s",
            len(verses), embeddings.shape,
        )

    @classmethod
    def from_data_dir(cls, data_dir: Path) -> "NumpyScriptureIndex":
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

    @property
    def size(self) -> int:
        return len(self._verses)

    def search(
        self,
        query_vec: np.ndarray,
        k: int = 5,
        scripture_filter: Optional[List[str]] = None,
    ) -> list[dict]:
        sims = self._embeddings @ query_vec.astype(np.float32)

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
            if abs(v.get("order", -10 ** 9) - order) <= window
        ]


# ── Supabase pgvector implementation ─────────────────────────────────────────

# Fields returned by the match_verses / get_verse_by_uid RPCs. The numpy
# backend's verse dicts use these same keys (with `translation` for Hindi and
# `verse_text` for Sanskrit — we normalise back to those on the way out so
# server/search.py's _verse_to_result() keeps working unchanged).
_RPC_FIELDS = (
    "uid", "scripture", "verse_id", "ord",
    "verse_sanskrit", "verse_hindi", "english_translation",
    "essence", "simple_meaning", "insight", "modern_relevance",
    "speaker", "tags", "meter", "audio_url", "audio_timestamps",
)


def _rpc_row_to_verse_dict(row: dict) -> dict:
    """
    Reshape one match_verses row into the dict shape that the rest of the
    backend expects (matches the JSON on disk):
      - script_ref instead of uid
      - order (int) instead of ord
      - translation instead of verse_hindi
      - verse_text instead of verse_sanskrit
      - orig_ref instead of verse_id
    Extras (audio_url, audio_timestamps, meter) are carried through so
    downstream code can read them.
    """
    return {
        "script_ref":          row["uid"],
        "scripture":           row["scripture"],
        "orig_ref":            row.get("verse_id") or "",
        "order":               int(row.get("ord") or 0),
        "verse_text":          row.get("verse_sanskrit") or "",
        "translation":         row.get("verse_hindi") or "",
        "english_translation": row.get("english_translation") or "",
        "essence":             row.get("essence") or "",
        "simple_meaning":      row.get("simple_meaning") or "",
        "insight":             row.get("insight") or "",
        "modern_relevance":    row.get("modern_relevance") or "",
        "speaker":             row.get("speaker") or "",
        "tags":                row.get("tags") or [],
        "meter":               row.get("meter") or "anushtubh",
        "audio_url":           row.get("audio_url"),
        "audio_timestamps":    row.get("audio_timestamps"),
    }


class SupabaseScriptureIndex(ScriptureIndex):
    """
    Retrieval via Supabase pgvector.

    Startup is cheap — one COUNT query to warm the connection and report size.
    Every /search fires one RPC call. get_verse is one RPC per call; short
    enough that caching is unnecessary at wisdom-homepage traffic levels
    (add a TTL LRU if that changes).
    """

    def __init__(self, supabase_client: Any):
        self._sb = supabase_client
        self._cached_size: Optional[int] = None

    @property
    def size(self) -> int:
        if self._cached_size is None:
            try:
                res = self._sb.table("verses").select("id", count="exact", head=True).execute()
                self._cached_size = int(res.count or 0)
            except Exception as e:
                logger.warning("SupabaseScriptureIndex size query failed: %s", e)
                self._cached_size = -1
        return self._cached_size

    def search(
        self,
        query_vec: np.ndarray,
        k: int = 5,
        scripture_filter: Optional[List[str]] = None,
    ) -> list[dict]:
        # pgvector wants a list[float]; supabase-py forwards it as JSON.
        q_list = [float(x) for x in query_vec.astype(np.float32).tolist()]

        payload: dict[str, Any] = {
            "query_embedding": q_list,
            "match_count": int(k),
            "filter_scriptures": list(scripture_filter) if scripture_filter else None,
        }

        try:
            resp = self._sb.rpc("match_verses", payload).execute()
        except Exception as e:
            logger.error("match_verses RPC failed: %s", e)
            raise

        rows = resp.data or []
        return [
            {"verse": _rpc_row_to_verse_dict(r), "sim": float(r.get("similarity", 0.0))}
            for r in rows
        ]

    def get_verse(self, script_ref: str) -> Optional[dict]:
        try:
            resp = self._sb.rpc("get_verse_by_uid", {"target_uid": script_ref}).execute()
        except Exception as e:
            logger.error("get_verse_by_uid RPC failed for %s: %s", script_ref, e)
            return None
        rows = resp.data or []
        if not rows:
            return None
        return _rpc_row_to_verse_dict(rows[0])

    def get_neighbours(self, scripture: str, order: int, window: int = 2) -> list[dict]:
        """
        Best-effort neighbours by (scripture, ord). Returns [] on error.
        Not on the critical path so we don't raise.
        """
        try:
            resp = (
                self._sb.table("verses")
                .select(",".join(_RPC_FIELDS))
                .eq("scripture", scripture)
                .gte("ord", order - window)
                .lte("ord", order + window)
                .execute()
            )
        except Exception as e:
            logger.warning("neighbours lookup failed: %s", e)
            return []
        return [_rpc_row_to_verse_dict(r) for r in (resp.data or [])]


# ── Module singleton ──────────────────────────────────────────────────────────

_index: Optional[ScriptureIndex] = None


def get_index() -> ScriptureIndex:
    global _index
    if _index is None:
        raise RuntimeError("Index not initialised — call init_index() or init_supabase_index() first")
    return _index


def init_index(data_dir: str) -> ScriptureIndex:
    """
    Numpy in-memory index. Call once at app startup. No model inference here.
    """
    global _index
    _index = NumpyScriptureIndex.from_data_dir(Path(data_dir))
    return _index


def init_supabase_index(supabase_client: Any) -> ScriptureIndex:
    """
    Supabase pgvector index. Requires the migration 002_verses.sql applied
    and rows loaded via scripts/load_verses_to_supabase.py.
    """
    global _index
    _index = SupabaseScriptureIndex(supabase_client)
    logger.info("SupabaseScriptureIndex ready (size=%s)", _index.size)
    return _index

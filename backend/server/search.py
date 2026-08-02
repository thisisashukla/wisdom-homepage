"""
server/search.py — POST /api/v1/search

Step 2 of the RAG pipeline.

v2 changes (bake-off follow-through from sanscripts/notebooks §10 + review):
  1. Verse-ref fast-path — if the intent stage parsed chapter.verse citations
     (e.g. "Gita 2.47"), look those up by uid directly and short-circuit.
  2. Wider per-intent pool — pull top_k * 3 candidates per intent instead of
     top_k, then re-rank across the merged pool.
  3. Cross-intent re-ranking — a verse that answers multiple intents gets an
     intent-coverage bonus, not just "max score wins".
  4. Soft scripture bias — scripture_hint from the intent stage multiplies
     cosine by ~1.08 (NOT a hard filter — the LLM's guess is unreliable).
  5. Cross-encoder reranker — if enabled and loaded, bge-reranker-v2-m3
     re-scores the top ~40 candidates. Degrades gracefully if unavailable.
  6. Scripture diversity cap — cap max_per_scripture verses in the final
     top-k so a hot Gita chapter doesn't crowd out Upanishad answers.
  7. Score floor — if the top dense score is below `score_floor`, set
     no_strong_match=True. Frontend can show fallback UI or still ask RAG
     with a "weak evidence" note.
"""
from __future__ import annotations

import logging
from typing import Dict, List, Optional

from fastapi import APIRouter, HTTPException

from ai.embedder import get_embedder
from ai.index import get_index
from ai.reranker import get_reranker
from ai.verse_ref import to_uid as verse_ref_to_uid
from common.models import (
    SearchRequest, SearchResponse, VerseRef, VerseResult, SearchIntent,
)

logger = logging.getLogger(__name__)
router = APIRouter()


# Soft-bias multiplier for scripture_hint. Small on purpose — the intent
# model's scripture guess is often wrong, and cosine differences between
# scriptures are already small. 1.08 is enough to break ties, not enough
# to over-fit to a bad guess.
_HINT_BIAS = 1.08

# How many candidates to pull per intent BEFORE cross-intent re-ranking and
# reranker. Wider than top_k on purpose.
_POOL_MULTIPLIER = 3

# How many merged candidates to send to the reranker. Cross-encoder cost is
# ~1-2ms per pair on GPU / ~5ms on CPU with bge-reranker-v2-m3 at fp16.
# 40 keeps p99 latency reasonable while giving the reranker enough to reorder.
_RERANK_POOL = 40

# Additive bonus per additional intent a verse covers (in the coverage-boosted
# score used when the reranker is unavailable). Kept small — coverage is a
# signal, not a substitute for relevance.
_COVERAGE_BONUS = 0.02


def _verse_to_result(
    verse: dict,
    *,
    score: float,
    dense_score: float,
    intent: str,
    coverage: int = 1,
    rerank_score: Optional[float] = None,
    source: str = "dense",
) -> VerseResult:
    """Map a raw verse dict → VerseResult (Pydantic)."""
    tags = verse.get("tags") or []
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split(",") if t.strip()]
    return VerseResult(
        uid                 = verse["script_ref"],
        scripture           = verse["scripture"],
        scripture_slug      = verse["scripture"],
        verse_id            = verse.get("orig_ref", ""),
        verse_sanskrit      = verse.get("verse_text", ""),
        verse_hindi         = verse.get("translation", ""),
        english_translation = verse.get("english_translation", ""),
        essence             = verse.get("essence", ""),
        simple_meaning      = verse.get("simple_meaning", ""),
        insight             = verse.get("insight", ""),
        modern_relevance    = verse.get("modern_relevance", ""),
        speaker             = verse.get("speaker", ""),
        tags                = tags,
        score               = score,
        dense_score         = dense_score,
        rerank_score        = rerank_score,
        intent              = intent,
        intent_coverage     = coverage,
        source              = source,  # type: ignore[arg-type]
    )


def _verse_ref_lookup(refs: List[VerseRef]) -> List[VerseResult]:
    """Direct uid lookup for parsed chapter.verse citations."""
    idx = get_index()
    out: List[VerseResult] = []
    for ref in refs:
        # Storage format joins parts with commas — see ai.verse_ref.to_uid
        # (bhagwad_gita:2,47 for 2-level; kath_upanishad:1,2,15 for 3-level).
        uid = verse_ref_to_uid(ref)
        verse = idx.get_verse(uid)
        if verse is None:
            logger.info("Verse-ref lookup miss: %s (raw=%r)", uid, ref.raw)
            continue
        # Score 1.0 signals a direct citation match — always ranked first.
        out.append(_verse_to_result(
            verse,
            score        = 1.0,
            dense_score  = 1.0,
            intent       = f"verse_ref:{ref.raw}",
            source       = "verse_ref",
        ))
    return out


def _apply_scripture_diversity(
    results: List[VerseResult],
    max_per_scripture: int,
    limit: int,
) -> List[VerseResult]:
    """
    Cap the number of results per scripture in the returned top-k. Keeps
    higher-scored results, drops overflow. Preserves overall rank order.
    """
    per_scripture: Dict[str, int] = {}
    out: List[VerseResult] = []
    for r in results:
        n = per_scripture.get(r.scripture, 0)
        if n >= max_per_scripture:
            continue
        per_scripture[r.scripture] = n + 1
        out.append(r)
        if len(out) >= limit:
            break
    return out


@router.post("/search", response_model=SearchResponse, tags=["search"])
async def search_verses(req: SearchRequest) -> SearchResponse:
    """
    Step 2 of the RAG pipeline. See module docstring for the algorithm.
    """
    if not req.intents:
        raise HTTPException(status_code=400, detail="intents list is empty")

    embedder = get_embedder()
    index    = get_index()

    # ── 0. Verse-ref fast-path ───────────────────────────────────────────────
    verse_ref_hits: List[VerseResult] = []
    if req.verse_refs:
        verse_ref_hits = _verse_ref_lookup(req.verse_refs)
        if verse_ref_hits:
            logger.info("Verse-ref fast-path hit: %d verse(s)", len(verse_ref_hits))
        # We continue with dense retrieval too — the user might ask
        # "explain Gita 2.47" and also want thematically-related verses. The
        # fast-path hits are pinned to the top of the final list.

    # ── 1. Dense retrieval per intent ────────────────────────────────────────
    hint_set = set(req.scripture_hint or [])
    pool: Dict[str, dict] = {}   # uid → {result, best_dense, coverage, first_intent}
    per_intent_k = max(1, req.top_k * _POOL_MULTIPLIER)

    for intent_obj in req.intents:
        intent_text = intent_obj.intent

        # Per-intent hard scripture filter: if the frontend set scripture_lock
        # for this intent (e.g. user said "from the Gita only"), use it;
        # otherwise fall back to the request-level hard filter.
        effective_filter = intent_obj.scripture_lock or req.scripture_filter or None

        # Merge per-intent soft hints with the request-level hint set.
        intent_hint_set = hint_set | set(intent_obj.likely_scriptures)

        try:
            q_vec = embedder.embed(intent_text)
        except Exception as e:
            logger.error("Embed failed for intent '%s': %s", intent_text, e)
            continue

        try:
            hits = index.search(
                q_vec,
                k                = per_intent_k,
                scripture_filter = effective_filter,
            )
        except Exception as e:
            logger.error("Index search failed: %s", e)
            raise HTTPException(status_code=500, detail=f"Search failed: {e}")

        for hit in hits:
            verse    = hit["verse"]
            uid      = verse["script_ref"]
            dense    = float(hit["sim"])
            # Soft scripture bias — only if a hint was provided for this intent
            biased   = dense * _HINT_BIAS if verse["scripture"] in intent_hint_set else dense

            if uid not in pool:
                pool[uid] = {
                    "verse":       verse,
                    "best_dense":  dense,
                    "biased":      biased,
                    "coverage":    1,
                    "first_intent": intent_text,
                    "hitting":     {intent_text},
                }
            else:
                p = pool[uid]
                if intent_text not in p["hitting"]:
                    p["hitting"].add(intent_text)
                    p["coverage"] += 1
                if biased > p["biased"]:
                    p["biased"] = biased
                if dense > p["best_dense"]:
                    p["best_dense"] = dense

    if not pool and not verse_ref_hits:
        return SearchResponse(results=[], no_strong_match=True, top_dense_score=0.0)

    # ── 2. Merged pool → optional reranker ──────────────────────────────────
    # Sort candidates for the reranker by biased dense score first — that's
    # our best guess for what the reranker should even look at.
    candidates = sorted(pool.values(), key=lambda p: p["biased"], reverse=True)
    rerank_pool = candidates[:_RERANK_POOL]

    reranker = get_reranker() if req.enable_reranker else None
    reranked_scores: Dict[str, float] = {}

    if reranker is not None:
        # Use the FIRST intent that hit each candidate as the reranker query.
        # A more sophisticated approach would run the reranker per-intent and
        # take max, but the cost multiplies linearly with intent count. Using
        # the intent that produced the highest dense score is a fair proxy
        # and keeps p99 latency in check.
        query_for_rerank = req.intents[0].intent
        rerank_input = [{"verse": c["verse"], "sim": c["biased"]} for c in rerank_pool]
        try:
            reranked = reranker.rerank(query_for_rerank, rerank_input, top_k=len(rerank_input))
            # rerank() returns [(candidate_dict, score), ...] where score may be nan
            # if the reranker was unavailable. Detect nan → treat as "no rerank".
            for cand, s in reranked:
                if s == s:  # nan check
                    reranked_scores[cand["verse"]["script_ref"]] = float(s)
        except Exception as e:
            logger.warning("Reranker call failed (%s) — using dense scores", e)

    # ── 3. Score assembly + rank ────────────────────────────────────────────
    # If reranker gave us scores, use them (with dense_score preserved for
    # observability). Otherwise, fall back to biased dense + coverage bonus.
    results: List[VerseResult] = []
    for uid, p in pool.items():
        if uid in reranked_scores:
            final = reranked_scores[uid]
            source = "reranked"
            rerank = final
        else:
            # coverage bonus is tiny — coverage of 3 = +0.04
            final  = p["biased"] + _COVERAGE_BONUS * (p["coverage"] - 1)
            source = "dense"
            rerank = None
        results.append(_verse_to_result(
            p["verse"],
            score        = final,
            dense_score  = p["best_dense"],
            intent       = p["first_intent"],
            coverage     = p["coverage"],
            rerank_score = rerank,
            source       = source,
        ))

    results.sort(key=lambda r: r.score, reverse=True)

    # ── 4. Merge verse-ref hits + diversity cap + trim ──────────────────────
    # Verse-ref hits pin to the top, then dense/reranked results below.
    # Dedupe (verse_ref result and dense result could refer to the same uid).
    seen_uids = set()
    final: List[VerseResult] = []
    for r in verse_ref_hits + results:
        if r.uid in seen_uids:
            continue
        seen_uids.add(r.uid)
        final.append(r)

    final = _apply_scripture_diversity(
        final,
        max_per_scripture = req.max_per_scripture,
        limit             = req.top_k,
    )

    # ── 5. Score-floor gating ───────────────────────────────────────────────
    # Base the decision on DENSE score (rerank scores live on a different
    # scale). If verse_ref hits are present, we always have a strong match.
    top_dense = max((r.dense_score for r in final), default=0.0)
    no_strong = (
        not verse_ref_hits
        and top_dense < req.score_floor
    )
    if no_strong:
        logger.info(
            "No strong match — top_dense=%.3f < floor=%.3f (intents=%r)",
            top_dense, req.score_floor, req.intents,
        )

    return SearchResponse(
        results         = final,
        no_strong_match = no_strong,
        top_dense_score = top_dense,
    )

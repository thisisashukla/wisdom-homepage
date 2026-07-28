"""
server/search.py — POST /api/v1/search

Step 2 of the RAG pipeline. Retrieval improvements shipped 2026-07-28:

  1. Verse-reference regex fast-path
     Direct uid lookup for queries like "Gita 2.47" / "BG 18.66" — bypasses
     embeddings entirely. Embeddings can never solve reference lookups
     reliably (0.00 recall by design on ref queries; noted in bake-off §10).

  2. Larger per-intent candidate pool
     Pull top_k * 3 per intent instead of top_k, so cross-intent re-ranking
     has enough signal to reward multi-intent coverage.

  3. Cross-intent coverage bonus
     A verse hit by 2 of 2 intents gets a small additive bump over a verse
     hit by only 1. Fixes the "max-score-wins-and-drops-multi-hit-signal"
     failure mode of the previous dedup logic.

  4. Scripture soft-bias from likely_scriptures hints
     Multiplicative boost (~1.08) for verses whose scripture matches an
     intent's hint. NOT a filter — a nudge. If the hint is wrong, better
     verses from other scriptures still win.

  5. Scripture diversity cap
     At most `max_per_scripture` verses from any single scripture appear
     in the returned top_k. Prevents Gita from dominating inter-scripture
     questions.

  6. Score-floor gating
     Verses below `min_score` cosine are dropped even if they made top_k.
     The RAG layer sees fewer, better candidates instead of noise.

  7. Returns scriptures_present
     Ordered by count so RAG can attribute across traditions.
"""
from __future__ import annotations

import logging
import re
from collections import Counter, defaultdict
from typing import Dict, List, Optional, Tuple

from fastapi import APIRouter, HTTPException

from ai.embedder import get_embedder
from ai.index import get_index
from common.config import settings

# Reranker is optional. If ai/reranker.py is absent (rolled-back deploys)
# or fails to import for any reason, we degrade gracefully — the get_reranker
# fallback below returns None and the rerank stage is skipped.
try:
    from ai.reranker import get_reranker  # type: ignore
except Exception:  # ImportError, or transformers/torch missing
    def get_reranker():  # type: ignore
        return None
from common.models import Intent, SearchRequest, SearchResponse, VerseResult

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Verse-reference fast-path ────────────────────────────────────────────────
# Matches "gita 2.47", "bg 2.47", "bhagavad gita chapter 2 verse 47",
# "gita 2:47", "gita 2/47", and plain "2.47" when a Gita context is obvious.
# Only Bhagavad Gita for v1 — orig_ref formats for other scriptures vary
# (Upanishads use section.mantra, Yoga Sutras use pada.sutra, etc.) and we'd
# need per-scripture parsers. Add later if the demand shows up in logs.

_GITA_ALIASES = r"(?:bg|gita|bhagwad\s*gita|bhagavad\s*gita|bhagawad\s*gita|bhagwat\s*gita|bhagavat\s*gita|shrimad\s*bhagavad\s*gita)"
_VERSE_REF_PATTERNS = [
    # "gita 2.47", "bg 2:47", "gita 2/47"
    re.compile(rf"\b{_GITA_ALIASES}\s+(\d{{1,2}})\s*[.:\/]\s*(\d{{1,3}})\b", re.IGNORECASE),
    # "gita chapter 2 verse 47", "bg ch 2 v 47"
    re.compile(
        rf"\b{_GITA_ALIASES}\s+(?:chapter|ch\.?)\s*(\d{{1,2}})\s*(?:,|\s)+(?:verse|v\.?|shloka|sloka)\s*(\d{{1,3}})\b",
        re.IGNORECASE,
    ),
    # bare "2.47" or "2:47" — only trust this if a Gita alias appears elsewhere
    # in the string. Handled below in _match_verse_ref.
]

_BARE_REF = re.compile(r"\b(\d{1,2})\s*[.:\/]\s*(\d{1,3})\b")
_HAS_GITA_ALIAS = re.compile(rf"\b{_GITA_ALIASES}\b", re.IGNORECASE)


def _match_verse_ref(text: str) -> Optional[str]:
    """
    Return a "bhagwad_gita:C.V" uid if the text contains a Gita ref, else None.
    """
    for pat in _VERSE_REF_PATTERNS:
        m = pat.search(text)
        if m:
            ch, vs = m.group(1), m.group(2)
            return f"bhagwad_gita:{int(ch)}.{int(vs)}"
    # Bare "C.V" only if a Gita alias appears somewhere in the string.
    if _HAS_GITA_ALIAS.search(text):
        m = _BARE_REF.search(text)
        if m:
            ch, vs = m.group(1), m.group(2)
            return f"bhagwad_gita:{int(ch)}.{int(vs)}"
    return None


# ── Verse → API result mapping ───────────────────────────────────────────────

def _verse_to_result(
    verse: dict,
    score: float,
    raw_score: float,
    intent: str,
    intent_hits: int = 1,
    match_reason: str = "semantic",
) -> VerseResult:
    tags = verse.get("tags") or []
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split(",") if t.strip()]
    # Word-level karaoke timestamps arrive as jsonb from Supabase; make sure
    # they're a plain list of dicts by the time they reach Pydantic.
    audio_ts = verse.get("audio_timestamps")
    if audio_ts is not None and not isinstance(audio_ts, list):
        audio_ts = None

    return VerseResult(
        uid=verse["script_ref"],
        scripture=verse["scripture"],
        scripture_slug=verse["scripture"],
        verse_id=verse.get("orig_ref", ""),
        verse_sanskrit=verse.get("verse_text", ""),
        verse_hindi=verse.get("translation", ""),
        english_translation=verse.get("english_translation", ""),
        # Audio + meter carried through when the SupabaseScriptureIndex is
        # in use. NumpyScriptureIndex verses (loaded from local JSON) don't
        # have these fields — falls back to None + "anushtubh".
        audio_url=verse.get("audio_url"),
        audio_timestamps=audio_ts,
        meter=verse.get("meter") or "anushtubh",
        essence=verse.get("essence", ""),
        simple_meaning=verse.get("simple_meaning", ""),
        insight=verse.get("insight", ""),
        modern_relevance=verse.get("modern_relevance", ""),
        speaker=verse.get("speaker", ""),
        tags=tags,
        score=score,
        raw_score=raw_score,
        intent=intent,
        intent_hits=intent_hits,
        match_reason=match_reason,
    )


# ── Diversity cap ────────────────────────────────────────────────────────────

def _apply_scripture_diversity(
    ranked: List[VerseResult],
    top_k: int,
    max_per_scripture: int,
) -> List[VerseResult]:
    """
    Greedy pass: walk ranked (already sorted desc) and admit up to
    max_per_scripture from each scripture, until we hit top_k or exhaust.

    If diversity leaves us with fewer than top_k, fill the remainder with
    the highest-scoring skipped verses regardless of scripture — better to
    return more results than fewer.
    """
    kept: List[VerseResult] = []
    skipped: List[VerseResult] = []
    counts: Counter = Counter()

    for r in ranked:
        if counts[r.scripture] < max_per_scripture:
            kept.append(r)
            counts[r.scripture] += 1
        else:
            skipped.append(r)
        if len(kept) >= top_k:
            break

    if len(kept) < top_k:
        kept.extend(skipped[: top_k - len(kept)])

    return kept


# ── Router ───────────────────────────────────────────────────────────────────

@router.post("/search", response_model=SearchResponse, tags=["search"])
async def search_verses(req: SearchRequest) -> SearchResponse:
    """
    Retrieve → merge across intents → apply biases + diversity + floor → rank.
    """
    if not req.intents:
        raise HTTPException(status_code=400, detail="intents list is empty")

    embedder = get_embedder()
    index = get_index()

    # Accumulator per uid → (best raw score, hits, best_intent_text, best_match_reason,
    # applied_bias_multiplier). We keep the MAX raw score across intents (not a sum) so
    # scores stay in [0,1] and stay directly comparable across queries.
    class _Acc:
        __slots__ = ("verse", "raw", "hits", "best_intent", "match_reason", "bias_mult")

        def __init__(self, verse: dict, raw: float, intent: str, match_reason: str, bias_mult: float):
            self.verse = verse
            self.raw = raw
            self.hits = 1
            self.best_intent = intent
            self.match_reason = match_reason
            self.bias_mult = bias_mult

    seen: Dict[str, _Acc] = {}

    # ── 1. Verse-reference fast-path ────────────────────────────────────────
    # Runs on both raw intent text AND the query context of each intent's
    # description. A matched uid is admitted at score 1.0 with a distinct
    # match_reason so RAG can present it differently if it wants.
    ref_uids_found: set[str] = set()
    for intent_obj in req.intents:
        for text_source in (intent_obj.intent, intent_obj.description):
            if not text_source:
                continue
            uid = _match_verse_ref(text_source)
            if uid and uid not in ref_uids_found:
                verse = index.get_verse(uid)
                if verse is not None:
                    seen[uid] = _Acc(
                        verse=verse,
                        raw=1.0,
                        intent=intent_obj.intent,
                        match_reason="verse_ref",
                        bias_mult=1.0,
                    )
                    ref_uids_found.add(uid)
                    logger.info("Verse-ref fast-path matched %s in intent %r", uid, intent_obj.intent[:60])

    # ── 2. Semantic retrieval per intent ────────────────────────────────────
    # Wider pool (top_k * 3) so cross-intent re-ranking has room to work.
    pool_per_intent = max(req.top_k * 3, 15)

    for intent_obj in req.intents:
        try:
            q_vec = embedder.embed(intent_obj.intent)
        except Exception as e:
            logger.error("Embed failed for intent %r: %s", intent_obj.intent, e)
            continue

        # Per-intent scripture_lock is the whole point of the "make each intent
        # a targeted retrieval call" pattern. If both the intent lock and the
        # request-level scripture_filter are set, intersect them (request can
        # only narrow, never widen). If only one is set, use it. If neither,
        # unfiltered search.
        intent_lock = list(getattr(intent_obj, "scripture_lock", None) or [])
        request_filter = list(req.scripture_filter or [])
        if intent_lock and request_filter:
            effective_filter: list[str] | None = [s for s in intent_lock if s in request_filter] or None
        elif intent_lock:
            effective_filter = intent_lock
        elif request_filter:
            effective_filter = request_filter
        else:
            effective_filter = None

        if intent_lock:
            logger.info(
                "Intent %r locked to scripture(s) %s — retrieval restricted.",
                intent_obj.intent[:60], intent_lock,
            )

        try:
            hits = index.search(
                q_vec,
                k=pool_per_intent,
                scripture_filter=effective_filter,
            )
        except Exception as e:
            logger.error("Index search failed: %s", e)
            raise HTTPException(status_code=500, detail=f"Search failed: {e}")

        # Compute this intent's scripture-hint set once. Skip the bias entirely
        # when the intent is already locked — every candidate is already from
        # a matching scripture so the multiplier changes nothing.
        hint_set: set[str] = set() if intent_lock else set(intent_obj.likely_scriptures or [])

        for hit in hits:
            verse = hit["verse"]
            raw = float(hit["sim"])
            uid = verse["script_ref"]

            # Verse-ref hits are already at 1.0 — never demote them.
            if uid in ref_uids_found:
                # Still count as a hit for coverage purposes.
                seen[uid].hits += 1
                continue

            # Scripture soft-bias: multiplicative boost if this verse's
            # scripture is in this intent's hint list. Bias only ever helps
            # (never demotes non-hint scriptures) so a wrong hint doesn't
            # crash unrelated better matches.
            bias_mult = req.scripture_hint_bias if (hint_set and verse["scripture"] in hint_set) else 1.0

            if uid not in seen:
                seen[uid] = _Acc(
                    verse=verse,
                    raw=raw,
                    intent=intent_obj.intent,
                    match_reason="semantic",
                    bias_mult=bias_mult,
                )
            else:
                acc = seen[uid]
                acc.hits += 1
                # Keep the best raw score across intents; if it improves,
                # also update the best-matching intent text.
                if raw > acc.raw:
                    acc.raw = raw
                    acc.best_intent = intent_obj.intent
                # Keep the strongest bias that any intent applied to this
                # verse (biases don't stack — this is a signal, not a stat).
                if bias_mult > acc.bias_mult:
                    acc.bias_mult = bias_mult

    # ── 2b. Optional cross-encoder rerank ───────────────────────────────────
    # If the reranker is registered, take the top `reranker_pool` non-ref
    # candidates by cosine and replace their raw scores with sigmoid(rerank).
    # Verse-ref matches stay at 1.0 (already exact hits — rerank would only
    # add noise). Feature-flagged via settings.reranker_enabled.
    #
    # `getattr` fallbacks so this file works even if the config was rolled
    # back to a version without the reranker knobs.
    reranker_enabled = getattr(settings, "reranker_enabled", False)
    reranker_pool    = getattr(settings, "reranker_pool", 40)
    reranker = get_reranker() if reranker_enabled else None
    if reranker is not None:
        # Collect eligible candidates (non-ref) with their current raw scores.
        candidates: list[tuple[str, _Acc]] = [
            (uid, acc) for uid, acc in seen.items() if acc.match_reason != "verse_ref"
        ]
        # Sort by cosine desc, take the top N.
        candidates.sort(key=lambda ua: ua[1].raw, reverse=True)
        rerank_pool = candidates[: reranker_pool]

        if rerank_pool:
            # Build (query, passage) pairs. Query = the intent that produced
            # the strongest cosine for this verse; passage = compact enriched
            # doc (Essence + Translation + Insight — fits in 512 tokens easily).
            pairs: list[tuple[str, str]] = []
            for _uid, acc in rerank_pool:
                v = acc.verse
                passage_parts = [
                    v.get("essence", "") or "",
                    v.get("english_translation", "") or "",
                    v.get("insight", "") or "",
                ]
                passage = " ".join(p for p in passage_parts if p).strip()
                pairs.append((acc.best_intent, passage or v.get("verse_text", "")))

            try:
                rerank_scores = reranker.score_batch(pairs)
                # Sigmoid to squash raw logits into [0, 1] so they're comparable
                # to cosine downstream (score floor, composite computation).
                import numpy as _np
                normed = 1.0 / (1.0 + _np.exp(-rerank_scores))

                for (uid, acc), new_raw in zip(rerank_pool, normed):
                    acc.raw = float(new_raw)
                    acc.match_reason = "hybrid"

                logger.info(
                    "Reranker: scored %d pairs, top1=%.3f median=%.3f",
                    len(pairs), float(normed.max()), float(_np.median(normed)),
                )
            except Exception as e:
                # Never let reranker failure block search — fall back to cosine.
                logger.warning("Reranker failed (%s) — falling back to cosine scores", e)

    # ── 3. Compose final score, floor-gate, sort ────────────────────────────
    dropped_below_floor = 0
    scored: List[VerseResult] = []
    for uid, acc in seen.items():
        # Composite: raw × bias × (1 + coverage_bonus × extra_hits)
        # Clamp to [0, 1] — bias + coverage can push above 1.0 numerically
        # and downstream code sometimes treats score as a probability.
        extra_hits = max(0, acc.hits - 1)
        coverage = 1.0 + req.coverage_bonus_per_extra_hit * extra_hits
        composite = min(acc.raw * acc.bias_mult * coverage, 1.0)

        # Floor applied to the RAW cosine, not the composite — a low-raw
        # verse boosted by bias+coverage is still a low-recall verse.
        if acc.match_reason != "verse_ref" and acc.raw < req.min_score:
            dropped_below_floor += 1
            continue

        scored.append(_verse_to_result(
            verse=acc.verse,
            score=composite,
            raw_score=acc.raw,
            intent=acc.best_intent,
            intent_hits=acc.hits,
            match_reason=acc.match_reason,
        ))

    scored.sort(key=lambda r: r.score, reverse=True)

    # ── 4. Scripture diversity (optional) ───────────────────────────────────
    # If ANY intent had a scripture_lock, retrieval already partitioned the
    # candidate pool across the named scriptures — an additional diversity
    # cap on top would silently drop matches (cap=3 with a 2-scripture lock
    # + 8 requested = 3+3 = 6 usable slots, not 8). Skip the cap when locks
    # are in play.
    any_locked = any(bool(getattr(i, "scripture_lock", None)) for i in req.intents)
    if req.diversify_scriptures and scored and not any_locked:
        final = _apply_scripture_diversity(scored, req.top_k, req.max_per_scripture)
    else:
        final = scored[: req.top_k]

    # ── 5. Scripture presence, ordered by count ─────────────────────────────
    scripture_counts: Counter = Counter(r.scripture for r in final)
    scriptures_present = [s for s, _ in scripture_counts.most_common()]

    logger.info(
        "search: intents=%d candidates=%d dropped_below_floor=%d final=%d scriptures=%s",
        len(req.intents), len(seen), dropped_below_floor, len(final), scriptures_present,
    )

    return SearchResponse(
        results=final,
        dropped_below_floor=dropped_below_floor,
        scriptures_present=scriptures_present,
    )

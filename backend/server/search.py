"""
server/search.py — POST /api/v1/search

Embeds each intent with BGE-M3, retrieves top-k verses, deduplicates by UID
(keeping the highest score across intents), and returns a ranked flat list.
"""
from __future__ import annotations

import logging
from typing import Dict

from fastapi import APIRouter, HTTPException

from ai.embedder import get_embedder
from ai.index import get_index
from common.models import SearchRequest, SearchResponse, VerseResult

logger = logging.getLogger(__name__)
router = APIRouter()


def _verse_to_result(verse: dict, score: float, intent: str) -> VerseResult:
    """Map a verse dict (from verses.json) to a VerseResult schema."""
    tags = verse.get("tags") or []
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split(",") if t.strip()]
    return VerseResult(
        uid=verse["script_ref"],              # "bhagwad_gita:18.66"
        scripture=verse["scripture"],         # "bhagwad_gita"
        scripture_slug=verse["scripture"],
        verse_id=verse.get("orig_ref", ""),   # "18.66"
        verse_sanskrit=verse.get("verse_text", ""),
        verse_hindi=verse.get("translation", ""),
        english_translation=verse.get("english_translation", ""),
        essence=verse.get("essence", ""),
        simple_meaning=verse.get("simple_meaning", ""),
        insight=verse.get("insight", ""),
        modern_relevance=verse.get("modern_relevance", ""),
        speaker=verse.get("speaker", ""),
        tags=tags,
        score=score,
        intent=intent,
    )


@router.post("/search", response_model=SearchResponse, tags=["search"])
async def search_verses(req: SearchRequest) -> SearchResponse:
    """
    Step 2 of the RAG pipeline: retrieve top-k verses per intent.
    Deduplicates by UID (highest score wins). Returns sorted by score desc.
    """
    if not req.intents:
        raise HTTPException(status_code=400, detail="intents list is empty")

    embedder = get_embedder()
    index    = get_index()

    seen: Dict[str, VerseResult] = {}   # uid → best VerseResult so far

    for intent_text in req.intents:
        try:
            q_vec = embedder.embed(intent_text)
        except Exception as e:
            logger.error("Embed failed for intent '%s': %s", intent_text, e)
            continue

        try:
            hits = index.search(
                q_vec,
                k=req.top_k,
                scripture_filter=req.scripture_filter or None,
            )
        except Exception as e:
            logger.error("Index search failed: %s", e)
            raise HTTPException(status_code=500, detail=f"Search failed: {e}")

        for hit in hits:
            verse = hit["verse"]
            score = hit["sim"]
            uid   = verse["script_ref"]

            result = _verse_to_result(verse, score, intent_text)

            if uid not in seen or score > seen[uid].score:
                seen[uid] = result

    ranked = sorted(seen.values(), key=lambda r: r.score, reverse=True)
    return SearchResponse(results=ranked)

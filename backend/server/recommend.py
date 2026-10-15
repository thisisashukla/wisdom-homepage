"""
server/recommend.py — POST /api/v1/recommend

Verse recommendations for onboarding (and later, the daily plan). The app sends
what the person told us: age band, life stages, phone hours, feeling, and an
optional note in their own words (spoken or typed). We return a few verses from
the curated v2 library, each with its prasang, plus the situations we read.

Privacy: the note is used for this request only. It is never logged, stored or
sent anywhere else. Only counts and timings are logged.
"""
from __future__ import annotations

import logging
import time

from fastapi import APIRouter, HTTPException

from ai.recommender import get_recommender
from common.models import RecommendRequest, RecommendResponse

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/recommend", response_model=RecommendResponse, tags=["recommend"])
async def recommend(req: RecommendRequest) -> RecommendResponse:
    try:
        rec = get_recommender()
    except RuntimeError:
        raise HTTPException(status_code=503, detail="Recommendations are not available right now.")
    t0 = time.perf_counter()
    out = rec.recommend(
        feeling=req.feeling, age=req.age, stages=req.stages, phone_hours=req.phone_hours,
        note=req.note, count=req.count, exclude=req.exclude,
    )
    logger.info(
        "recommend: feeling=%s age=%s stages=%d note=%s matching=%s verses=%d crisis=%s %.0fms",
        req.feeling, req.age, len(req.stages), "yes" if req.note else "no", out["matching"],
        len(out["verses"]), bool(out["safety"]), (time.perf_counter() - t0) * 1000,
    )
    return RecommendResponse(**out)

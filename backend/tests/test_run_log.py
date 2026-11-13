"""ai/run_log.py: what a plan_runs row holds, that a declined note is never counted as sent, that failures are
recorded, and that tracking ids never change the hook cache key."""
import asyncio

import pytest
from fastapi import HTTPException

from ai import hook_cache, note_store
from ai import run_log as rl
from common.models import ClientMeta, HookRequest, PlanRequest

CLIENT = ClientMeta(request_id="r-1", onboarding_id="ob-1", distinct_id="d-1", user_id="u-1", platform="ios",
                    app_version="3.0.1", context="onboarding", emotion="anxious", emotion_trail=["anxious", "hopeful"])


def test_inputs_carry_ids_and_answers_not_words():
    req = HookRequest(feeling="quiet", age="25_34", stages=["working", "own_thing"], note=" scared of failing ",
                      note_source="text", client=CLIENT)
    r = rl.inputs("hook", req)
    assert r["request_id"] == "r-1" and r["onboarding_id"] == "ob-1" and r["distinct_id"] == "d-1"
    assert r["emotion_trail"] == ["anxious", "hopeful"] and r["stages"] == ["working", "own_thing"]
    assert r["has_note"] is True and r["note_chars"] == len("scared of failing") and r["note_source"] == "text"
    assert "note" not in r


def test_declined_ai_is_not_a_sent_note():
    req = HookRequest(feeling="quiet", ai=False, client=ClientMeta(note_withheld=True))
    r = rl.inputs("hook", req)
    assert r["ai_consent"] is False and r["has_note"] is False and r["note_withheld"] is True


def test_outputs_from_a_plan_week():
    resp = {"understanding": {"source": "llm", "risk": "none", "stance": "struggle", "mechanism": "m", "version": 9,
                              "situations": [{"id": "s1", "weight": 1.0, "source": "note", "label": "x"}],
                              "flags": ["hook_reranked"]},
            "days": [{"day": 1, "verse": {"id": "bg_2_47"}}, {"day": 2, "verse": {"id": "bg_6_5"}},
                     {"day": 7, "story": {"id": "pr_1"}}],
            "library_version": "lib", "timings_ms": {"total": 900}}
    o = rl.outputs("plan", resp)
    assert o["verse_ids"] == ["bg_2_47", "bg_6_5", "pr_1"] and o["hook_id"] == "bg_2_47" and o["story_id"] == "pr_1"
    assert o["days_count"] == 3 and o["reading_source"] == "llm" and o["situations"] == [{"id": "s1", "weight": 1.0, "source": "note"}]


def test_cache_hit_is_its_own_source():
    o = rl.outputs("hook", {"understanding": {"source": "llm", "flags": ["hook_cache:hit"]}, "hook": {"id": "bg_6_34"},
                            "alternates": [{"id": "bg_2_14"}]})
    assert o["reading_source"] == "cache" and o["cache_hit"] is True and o["verse_ids"] == ["bg_6_34", "bg_2_14"]


def test_decorator_records_success_and_failure(monkeypatch):
    rows = []
    monkeypatch.setattr(rl, "put", lambda r: rows.append(r))

    @rl.logged("hook")
    async def ok(req):
        return {"understanding": {"source": "fallback"}, "hook": {"id": "bg_4_36"}}

    @rl.logged("plan")
    async def bad(req):
        raise HTTPException(status_code=503, detail="down")

    asyncio.run(ok(HookRequest(feeling="replay", client=CLIENT)))
    with pytest.raises(HTTPException):
        asyncio.run(bad(req=PlanRequest(feeling="replay", client=CLIENT)))
    assert rows[0]["status"] == "ok" and rows[0]["hook_id"] == "bg_4_36" and rows[0]["reading_source"] == "fallback"
    assert rows[1]["status"] == "error" and rows[1]["http_status"] == 503 and rows[1]["endpoint"] == "plan"


def test_tracking_ids_do_not_change_the_cache_key():
    a = HookRequest(feeling="quiet", age="u25", client=CLIENT)
    b = HookRequest(feeling="quiet", age="u25", client=ClientMeta(request_id="r-2", onboarding_id="ob-9"))
    c = HookRequest(feeling="quiet", age="u25")
    assert hook_cache.request_key(a, "v", 1) == hook_cache.request_key(b, "v", 1) == hook_cache.request_key(c, "v", 1)


def test_raw_note_row_joins_its_run():
    r = note_store.row("hook", HookRequest(feeling="quiet", note="lost", client=CLIENT))
    assert r["request_id"] == "r-1" and r["onboarding_id"] == "ob-1" and r["platform"] == "ios" and r["emotion"] == "anxious"

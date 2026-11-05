"""ai/note_store.py: what a raw_notes row holds, and that a request without a note writes nothing."""
from ai import note_store as ns
from common.models import HookRequest, RefineRequest


def test_no_note_no_row():
    assert ns.row("hook", HookRequest(feeling="replay")) is None
    assert ns.row("hook", HookRequest(feeling="replay", note="   ")) is None


def test_row_keeps_the_note_raw_and_the_choice():
    req = HookRequest(feeling="replay", age="35_44", stages=["working"], note="  I am STUCK in my job ", note_source="voice")
    u = {"source": "llm", "note_quality": "good", "risk": "none", "stance": "struggle", "mechanism": "m",
         "situations": [{"id": "career_stuck", "weight": 1.0}]}
    r = ns.row("hook", req, u, [{"id": "bg_2_47"}, None, {"id": "bg_3_35"}, {"id": "bg_2_47"}], "lib")
    assert r["note"] == "  I am STUCK in my job "
    assert r["note_source"] == "voice" and r["stages"] == ["working"] and r["age"] == "35_44"
    assert r["verse_ids"] == ["bg_2_47", "bg_3_35"]
    assert r["reading_source"] == "llm" and r["risk"] == "none" and r["library_version"] == "lib"


def test_plan_days_give_verse_and_story_ids():
    days = [{"day": 1, "verse": {"id": "bg_2_47"}}, {"day": 7, "story": {"id": "pr_1"}}]
    assert ns._ids(days) == ["bg_2_47", "pr_1"]


def test_disabled_without_supabase(monkeypatch):
    monkeypatch.delenv("SUPABASE_URL", raising=False)
    ns.put({"note": "x"})            # no store configured: a no-op, never an error

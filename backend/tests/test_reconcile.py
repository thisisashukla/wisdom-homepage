"""scripts/reconcile_mixpanel.py: the join between Mixpanel events and plan_runs rows."""
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("reconcile", Path(__file__).resolve().parent.parent / "scripts" / "reconcile_mixpanel.py")
rc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rc)


def ev(name, **p):
    return {"event": name, "properties": {"_platform": p.pop("_platform", "app"), **p}}


def test_join_by_request_id_and_report_both_sides():
    events = [
        ev("Onboarding Step Completed", onboarding_id="ob1", step="age", age_range="25_34"),
        ev("Onboarding Step Completed", onboarding_id="ob1", step="feeling", feeling="quiet", emotion="anxious"),
        ev("Onboarding Step Completed", onboarding_id="ob1", step="note"),
        ev("Verses Generated", onboarding_id="ob1", request_id="h1", ok=True, hook_id="bg_6_34", reading="llm"),
        ev("Plan Built", onboarding_id="ob1", request_id="p1", preview_request_id="v1", ok=True),
        ev("Verses Generated", onboarding_id="ob2", request_id="h2", ok=True, hook_id="bg_2_47", reading="llm"),
        ev("Onboarding Step Completed", onboarding_id="ob3", step="note", _platform="web"),
    ]
    runs = [
        {"request_id": "h1", "endpoint": "hook", "onboarding_id": "ob1", "status": "ok", "hook_id": "bg_6_34", "reading_source": "llm",
         "age": "25_34", "feeling": "quiet", "platform": "ios", "created_at": "1"},
        {"request_id": "v1", "endpoint": "preview", "onboarding_id": "ob1", "status": "ok", "platform": "ios", "created_at": "2"},
        {"request_id": "p1", "endpoint": "plan", "onboarding_id": "ob1", "status": "ok", "days_count": 7, "platform": "ios", "created_at": "3"},
        {"request_id": "h2", "endpoint": "hook", "onboarding_id": "ob2", "status": "ok", "hook_id": "bg_4_36", "reading_source": "fallback",
         "platform": "ios", "created_at": "4"},
        {"request_id": "h9", "endpoint": "hook", "onboarding_id": "ob9", "status": "error", "platform": "web", "created_at": "5"},
        {"request_id": None, "endpoint": "hook", "status": "ok"},          # before ids existed: skipped
    ]
    rep = rc.reconcile(events, runs)
    assert rep["matched"][("hook", "app")] == 2 and rep["matched"][("plan", "app")] == 1 and rep["matched"][("preview", "app")] == 1
    assert [x["request_id"] for x in rep["supabase_only"]] == ["h9"]
    assert rep["mixpanel_only"] == []
    assert len(rep["mismatches"]) == 1 and "hook_id" in rep["mismatches"][0]["issue"] and "reading" in rep["mismatches"][0]["issue"]
    issues = {(x["onboarding_id"], x["issue"]) for x in rep["onboarding_issues"]}
    assert ("ob3", "note_step_but_no_backend_call") in issues and ("ob9", "backend_onboarding_not_in_mixpanel") in issues
    assert not any(o == "ob1" for o, _ in issues)
    assert "Matched calls" in rc.summary(rep)

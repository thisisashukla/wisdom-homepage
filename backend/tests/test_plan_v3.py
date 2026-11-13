"""
PLAN_ENGINE=v3 (ai/plan_v3.py, server/plan_v3.py): the graph planner behind the flag. No network: the library in
keyword mode, a scripted fake LLM standing in for Sarvam. Run from backend/:  pytest tests/test_plan_v3.py -q
"""
from __future__ import annotations

import json
import re
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from ai import plan_v3 as V
from ai import planner as plan_mod
from ai import recommender as rec_mod
from ai import understanding as und_mod
from server import plan as plan_router

DATA = Path(__file__).resolve().parents[1] / "data"
LIBRARY = DATA / "taxonomy" / "wisdom_library.json"
pytestmark = pytest.mark.skipif(not (DATA / "plan_v3" / "wisdom_graph.json").exists(), reason="plan_v3 data not vendored")


class FakeSarvam:
    """Answers fast_read, harness_v2's first line and personal layer; counts every call. `fr` overrides fast_read's answer."""
    def __init__(self, fr=None):
        self.fr, self.calls = fr, []

    def chat_json(self, messages, **kw):
        system, user = messages[0]["content"], messages[-1]["content"]
        if system.startswith("You read one person"):
            self.calls.append("fast_read")
            ids = re.findall(r"^- (\S+?):", user, re.M)
            if self.fr is not None:
                return dict(self.fr)
            return {"risk": "none", "stance": "struggle", "states": ["chinta"], "situation": "x", "pick": ids[0] if ids else "", "alt": "",
                    "line": "Your mind keeps going over it at night."}
        if system.startswith("You write the one sentence"):
            self.calls.append("first_line")
            return {"stance": "struggle", "line": "You keep replaying a conversation from years ago, and Arjuna too says the mind is restless and hard to hold."}
        if system.startswith("You write the few personal lines"):
            self.calls.append("personal")
            return {"for_you": "When the night gets loud, this verse gives you one plain thing to hold. Keep it close tomorrow.",
                    "practice": "Notice once today when the worry starts.", "scene_line": "You sit with it the way the speaker sat with his.",
                    "audio_open": "You told us the nights are hard.", "audio_close": "One plain thing to hold."}
        self.calls.append("other")
        raise TimeoutError("not scripted")


@pytest.fixture(scope="module")
def rec():
    return rec_mod.init_recommender(library_path=str(LIBRARY), cache_dir=str(DATA), embed=None)


@pytest.fixture(scope="module")
def client(rec):
    plan_mod.init_planner(rec, roles_path=str(DATA / "taxonomy" / "verse_roles.json"), background=False)
    a = FastAPI()
    a.include_router(plan_router.router, prefix="/api/v1")
    return TestClient(a)


@pytest.fixture
def v3(monkeypatch):
    monkeypatch.setenv("PLAN_ENGINE", "v3")
    monkeypatch.delenv("PLAN_V3_FASTREAD", raising=False)
    monkeypatch.setattr(V, "sarvam_llm", lambda fallback=None: fallback)      # never the real Sarvam in tests
    yield


def use(rec, llm):
    return und_mod.init_understander(rec, llm=llm, timeout_s=2.0, writer_llm=llm, rerank_llm=llm)


def post(c, path, **body):
    r = c.post(f"/api/v1/recommend/{path}", json=body)
    assert r.status_code == 200, r.text
    return r.json()


BASE = dict(feeling="quiet", age="25_34", stages=["working"])


def test_flag_unset_adds_no_fields(client, rec, monkeypatch):
    monkeypatch.delenv("PLAN_ENGINE", raising=False)
    use(rec, None)
    out = post(client, "hook", **BASE)
    assert "plan_v3" not in out["understanding"] and "first_line" not in (out["hook"] or {})
    assert not any(f.startswith("engine:v3") for f in out["understanding"]["flags"])


def test_v3_hook_reads_and_writes_a_first_line(client, rec, v3):
    llm = FakeSarvam()
    use(rec, llm)
    out = post(client, "hook", **BASE, note="I keep replaying a conversation from years ago at 2am", note_source="text",
               client={"emotion": "overthinking", "emotion_trail": ["anxious", "overthinking"]})
    assert out["hook"] and out["hook"]["first_line"] and out["hook"]["first_line_source"] == "model"
    r = out["understanding"]["plan_v3"]
    assert r["kept"] == "overthinking" and r["stance"] in ("struggle", "aspiration", "wronged", "seeking") and r["pick"] == out["hook"]["id"]
    assert llm.calls[:2] == ["fast_read", "first_line"] and "engine:v3" in out["understanding"]["flags"]


def test_fast_read_cannot_raise_risk_alone(client, rec, v3):
    llm = FakeSarvam(fr={"risk": "harm_from_others", "stance": "struggle", "states": ["bhaya"], "pick": "", "line": "x"})
    use(rec, llm)
    out = post(client, "hook", **BASE, note="My exam is next week and I cannot focus on anything", note_source="text")
    assert out["understanding"]["risk"] == "none" and out["safety"] is None
    assert any(f.startswith("fast_read:risk_ignored") for f in out["understanding"]["flags"])


def test_model_pick_outside_the_list_falls_back_to_the_graph(client, rec, v3):
    use(rec, FakeSarvam(fr={"risk": "none", "stance": "struggle", "states": ["chinta"], "pick": "bg.4.36", "alt": "nope", "line": ""}))
    out = post(client, "hook", **BASE, note="I feel I have done something unforgivable", note_source="text")
    assert out["hook"] and out["hook"]["id"] != "bg.4.36"


def test_wronged_reader_always_gets_a_day1(client, rec, v3):
    use(rec, FakeSarvam(fr={"risk": "none", "stance": "wronged", "states": ["manyu"], "pick": "", "alt": "", "line": ""}))
    out = post(client, "hook", feeling="replay", age="25_34", stages=["working", "raising_kids"],
               note="My mother in law insults me in front of everyone and my husband says nothing", note_source="text",
               client={"emotion": "hurt"})
    assert out["understanding"]["stance"] == "wronged" and out["hook"] is not None
    from ai.harness_v2.briefs import fit_guard
    E = V.engine()
    pb = V.person_brief(type("R", (), {"feeling": "replay", "age": "25_34", "stages": ["working"], "note": None, "note_source": None,
                                         "client": None, "topic": None, "follow": None, "ai": True})(), reading={"stance": "wronged"})
    assert not fit_guard(pb, V.verse_brief(E, out["hook"]["id"]))


def test_no_consent_calls_no_model(client, rec, v3):
    llm = FakeSarvam()
    use(rec, llm)
    out = post(client, "hook", **BASE, ai=False, note="private words", client={"emotion": "anxious"})
    assert llm.calls == [] and out["hook"] and out["hook"]["first_line_source"] in ("chip", "app_emotion_line")
    assert out["understanding"]["plan_v3"]["consent"] is False


def test_self_harm_note_leads_with_safety_and_no_model(client, rec, v3):
    llm = FakeSarvam()
    use(rec, llm)
    out = post(client, "hook", **BASE, note="I want to end my life, nothing matters", note_source="text", client={"emotion": "empty"})
    assert out["understanding"]["risk"] == "self_harm" and out["safety"]["kind"] == "self_harm"
    assert "fast_read" not in llm.calls and "first_line" not in llm.calls
    assert not (out["hook"] or {}).get("id", "").startswith("vr.5.13.")


def test_light_reader_is_not_opened_on_collapse(client, rec, v3):
    use(rec, None)
    out = post(client, "hook", feeling="faith", age="55p", stages=["retired"], client={"emotion": "grateful"})
    n = V.engine().G.v(out["hook"]["id"])
    depicts = {e["t"][6:] for e in V.engine().G.rel_out(out["hook"]["id"], "depicts")}
    assert out["understanding"]["plan_v3"]["stance"] in ("aspiration", "seeking")
    assert not depicts & {"vishada", "nirveda", "shoka", "glani"} and n.get("move") not in ("names_pain", "rebukes")


def test_week_round_trip_keeps_day1_and_never_repeats(client, rec, v3, monkeypatch):
    monkeypatch.setenv("PLAN_V3_PER_DAY", "0")      # r4: the whole-week writing mode (per-day writing: tests/test_plan_v3_r4.py)
    llm = FakeSarvam()
    use(rec, llm)
    h = post(client, "hook", **BASE, note="Two job offers and I change my mind every hour", note_source="text", client={"emotion": "stuck"})
    w1 = post(client, "plan", **BASE, understanding=h["understanding"], hook_id=h["hook"]["id"], week=1)
    days = w1["days"]
    assert len(days) == 7, w1["understanding"]["flags"]
    assert days[0]["verse"]["id"] == h["hook"]["id"] and days[6]["beat"] == "story" and days[6]["story"]
    ids = [(d.get("verse") or d.get("story"))["id"] for d in days]
    assert len(set(ids)) == 7
    assert all("plan_v3" in d and d["plan_v3"]["slot"] for d in days)
    assert sum(1 for d in days if (d.get("verse") or d.get("story")).get("for_you")) >= 5
    w2 = post(client, "plan", **BASE, understanding=h["understanding"], week=2, exclude=ids)
    assert not set(ids) & {(d.get("verse") or d.get("story"))["id"] for d in w2["days"]}
    assert w2["days"][0]["level"] == "pattern"


def test_preview_matches_the_week(client, rec, v3):
    use(rec, None)
    h = post(client, "hook", **BASE, client={"emotion": "restless"})
    p = post(client, "preview", **BASE, understanding=h["understanding"], hook_id=h["hook"]["id"])
    assert p["beats"]["hook"]["id"] == h["hook"]["id"] and p["beats"]["story"]


def test_raw_mode_is_phase1_fast_read(client, rec, v3, monkeypatch):
    monkeypatch.setenv("PLAN_V3_FASTREAD", "raw")
    use(rec, FakeSarvam(fr={"risk": "distress", "stance": "struggle", "states": ["bhaya"], "pick": "", "alt": "",
                            "line": "Your exam is close and your focus keeps slipping away from you."}))
    out = post(client, "hook", **BASE, note="My exam is next week and I cannot focus", note_source="text")
    assert out["understanding"]["risk"] == "distress" and out["hook"]["first_line_source"] == "fast_read"


def test_day_brief_carries_guard_and_writer_note():
    edge, why = V.day_brief({"path": "a -heals-> b", "why": ["because"], "guard": {"ref": "Gita 2.14", "line": "It passes.", "is_previous_day": False},
                             "writer_note": "Explain it through their situation."})
    assert edge == "a -heals-> b" and "Gita 2.14" in why and "Writer note" in why


def test_unresolved_story_arcs_never_serve_day7():
    E = V.engine()
    bad = {i for i, r in E.stories.items() if r.get("arc") == "unresolved"}
    assert bad
    for sits, stance in ((["envy"], "struggle"), (["guilt"], "struggle"), (["resentment"], "wronged"), (["big_decision"], "struggle")):
        sits = [s for s in sits if "sit:" + s in E.G.N]
        w = E.G.week(situations=sits, stance=stance)
        assert w["days"][6].get("id") not in bad


def test_fast_read_cannot_make_someone_wronged_alone(client, rec, v3):
    use(rec, FakeSarvam(fr={"risk": "none", "stance": "wronged", "states": ["manyu", "glani"], "pick": "", "alt": "", "line": ""}))
    out = post(client, "hook", **BASE, note="I shouted at a junior in front of the whole team today. I can't take it back.", note_source="text",
               client={"emotion": "guilty", "emotion_trail": ["angry", "guilty"]})
    r = out["understanding"]["plan_v3"]
    assert r["stance"] == "struggle" and "fast_read:wronged_unsupported" in out["understanding"]["flags"]


def test_a_story_shown_under_its_prasang_id_is_never_served_again():
    E = V.engine()
    rd = {"situations": ["inlaws"], "stance": "wronged", "states": ["manyu"], "trail": ["hurt"], "risk": "none", "age": "25_34", "stages": ["working"]}
    w1 = V.graph_week(E, rd, 1, [])
    sid = w1["days"][6]["id"]
    card = V.story_card(E, sid, 0.0)
    w2 = V.graph_week(E, rd, 2, [d["id"] for d in w1["days"][:6]] + [card["id"]])
    assert w2["days"][6]["id"] != sid
    p2 = (V.story_card(E, w2["days"][6]["id"], 0.0) or {}).get("id")
    assert p2 != card["id"]


def test_an_empty_slot_is_filled_from_the_nearest_slot():
    E = V.engine()
    rd = {"situations": ["inlaws"], "stance": "wronged", "states": ["manyu"], "trail": ["hurt"], "risk": "none", "age": "25_34", "stages": ["working"]}
    ex = []
    for wk in (1, 2, 3):
        w = V.graph_week(E, rd, wk, ex)
        assert all(d.get("id") for d in w["days"]), [d["slot"] for d in w["days"] if not d.get("id")]
        ex += [d["id"] for d in w["days"]]


def test_a_stalled_first_line_cannot_hold_the_first_screen():
    import asyncio, time as _t
    def slow(*a, **k):
        _t.sleep(2.0); return {"text": "late", "source": "model"}
    def chip(pb, static):
        return {"text": "chip", "source": "chip"}
    async def go():
        t = _t.perf_counter()
        out = await V._first_line_bounded(slow, chip, object(), None, None, None, 0.3)
        return out, _t.perf_counter() - t
    out, took = asyncio.run(go())
    assert out["source"] == "chip" and "deadline" in out["issues"] and took < 1.0

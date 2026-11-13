"""
r4 fixes to PLAN_ENGINE=v3 after the blind Opus judge (13 Nov 2026): graph gates (vendored ai/plan_graph.py), the
no-line swap and note cues (ai/plan_v3.py), and the extra checker rules (ai/harness_v2/checker_extra.py). No network.
"""
from __future__ import annotations

import asyncio
from pathlib import Path

import pytest

from ai import plan_v3 as V
from ai.harness_v2.checker import check_text

DATA = Path(__file__).resolve().parents[1] / "data"
pytestmark = pytest.mark.skipif(not (DATA / "plan_v3" / "wisdom_graph.json").exists(), reason="plan_v3 data not vendored")


@pytest.fixture(scope="module")
def E():
    return V.engine()


def R(E, week=1, risk="none", **kw):
    rd = {"stance": "struggle", "states": ["chinta"], "situations": [], "trail": ["anxious"], "age": "25_34", "stages": ["working"], "risk": risk}
    rd.update(kw)
    return V.reading_R(E, rd, week)


def gate(E, vid, slot, r, risk="none"):
    return E.G.gate(vid, slot, r, risk, True)


def req(note="", **kw):
    from common.models import PlanRequest
    body = dict(feeling="quiet", age="25_34", stages=["working"], note=note or None, note_source="text" if note else None)
    body.update(kw)
    return PlanRequest(**body)


# ── graph gates ──────────────────────────────────────────────────────────────
def test_a_vice_verse_needs_the_vice_in_the_reading(E):
    assert gate(E, "rcm.7.117.chaupai.17", "D2_see_why", R(E, states=["chinta", "dainya", "bhaya"], situations=["comparison", "imposter"]))
    assert gate(E, "rcm.7.117.chaupai.17", "D2_see_why", R(E, states=["matsarya", "chinta"], situations=["envy"])) is None


def test_manas_rog_anger_line_not_for_a_griever_without_anger(E):
    r = R(E, week=3, states=["shoka", "vishada", "moha", "samshaya"], situations=["grief_parent"], trail=["empty", "lost"])
    assert gate(E, "rcm.7.117.chaupai.15", "D2_see_why", r)


def test_warns_never_on_days_1_and_2(E):
    warns = next(i for i in E.G.by_type["verse"] if E.G.v(i).get("move") == "warns")
    r = R(E)
    assert gate(E, warns, "D2_see_why", r) and gate(E, warns, "D1_see_name", r)


@pytest.mark.parametrize("kw", [dict(risk="distress"), dict(stages=["studying"], age="u25"), dict(situations=["illness_family"]),
                                dict(situations=["fear_failure"]), dict(threat=True)])
def test_the_slips_verse_is_never_day1_for_risk_care_threat_students_or_failure_fear(E, kw):
    risk = kw.pop("risk", "none")
    r = R(E, risk=risk, states=["bhaya", "samshaya"], **kw)
    assert gate(E, "bg.6.37", "D1_see_name", r, risk)


def test_endurance_never_to_a_griever_in_weeks_1_and_2(E):
    for w in (1, 2):
        assert gate(E, "bg.2.14", "D6_act_hard_moment", R(E, week=w, states=["shoka", "viraha"], situations=["pet_loss"], trail=["empty", "lonely"]))


def test_letting_go_never_at_any_risk(E):
    st = ["chinta", "trishna", "sanga", "moha"]
    found = 0
    for i in E.G.by_type["verse"]:
        if E.G.letgo(i) and gate(E, i, "D4_steady_reframe", R(E, week=2, states=st)) is None:
            found += 1
            assert "letting-go" in (gate(E, i, "D4_steady_reframe", R(E, week=2, states=st, risk="distress"), "distress") or "")
    assert found


def test_caste_language_only_when_they_raised_it(E):
    r = R(E, week=3, states=["dainya", "glani"], situations=["self_worth"])
    assert "caste" in (gate(E, "up_niralamb.13", "D4_steady_reframe", r) or "")
    r2 = R(E, week=3, states=["dainya", "glani"], situations=["self_worth"], caste_ok=True)
    assert "caste" not in (gate(E, "up_niralamb.13", "D4_steady_reframe", r2) or "")


def test_self_harm_week_is_consoling_only(E):
    w = E.G.week(situations=["burnout"], stance="struggle", states=["nirveda", "vishada"], words=["empty"], risk="self_harm", age="25_34", stages=[])
    for d in w["days"]:
        if d.get("id") and d["slot"] != "D7_story":
            assert E.G.v(d["id"]).get("move") in {"consoles", "gives_ground", "affirms", "promises", "normalizes"}
            assert not E.G.letgo(d["id"])
    assert all(d.get("id") != "bg.6.37" for d in w["days"])


def _stories(E, **kw):
    q = E.G.query(k=400, **kw)
    return {c["id"] for c in q["slots"]["D7_story"]}, q["gated"].get("D7_story", {})


def test_reconciliation_story_never_day7_under_harm(E):
    ids, gated = _stories(E, situations=["marriage_conflict", "inlaws"], stance="wronged", states=["dainya", "manyu"], words=["hurt"], risk="harm_from_others")
    assert "st.mbh.karna_visits_bhishma" not in ids and any(k.startswith("r4: reconciling") for k in gated)


def test_death_imagery_story_not_for_a_griever_before_week_3(E):
    ids, _ = _stories(E, situations=["grief_parent", "fear_death"], states=["shoka", "moha"], words=["lost"], week=2)
    assert "st.mbh.vidura_man_in_the_well" not in ids


def test_janaka_dont_leave_only_for_someone_weighing_leaving(E):
    a, _ = _stories(E, situations=["purpose_search", "midlife", "no_meaning"], stance="seeking", states=["nirveda", "samshaya"], words=["empty"], week=1)
    b, _ = _stories(E, situations=["quit_or_stay", "no_meaning"], stance="seeking", states=["nirveda", "samshaya"], words=["empty"], week=1)
    assert "st.yv.janaka_overhears_the_siddhas" not in a and "st.yv.janaka_overhears_the_siddhas" in b


def test_sampati_pride_lesson_only_for_a_proud_reader(E):
    a, _ = _stories(E, situations=["burnout", "no_meaning"], states=["vishada", "nirveda", "dainya"], words=["empty"])
    assert "st.rcm.sampati_wings_regrow" not in a


# ── backend: note cues, the no-line swap, the medical writer note ───────────────
def test_note_cues_restrict_only():
    c = V.note_cues("twenty two years in one company and they let me go in a 10 minute call")
    assert c["layoff"] and c["threat"] and not c["caste_ok"] and not c["health"]
    assert V.note_cues("I need to detox off medications")["health"]
    assert V.note_cues(None) == {"layoff": False, "threat": False, "caste_ok": False, "health": False}


def test_a_cause_day_with_no_line_is_swapped_for_a_soft_alternate(E, monkeypatch):
    diag = next(i for i in E.G.by_type["verse"] if E.G.v(i).get("move") == "explains_cause" and i in E.verses)
    soft = next(i for i in E.G.by_type["verse"] if E.G.v(i).get("move") == "consoles" and i in E.verses)
    days = [{"slot": s, "id": None} for s in ("D1_see_name", "D2_see_why", "D3_steady_ground", "D4_steady_reframe", "D5_act_today", "D6_act_hard_moment", "D7_story")]
    days[1] = {"slot": "D2_see_why", "id": diag, "ref": "x", "line": "x", "move": "explains_cause", "path": "p", "why": [], "alts": [soft], "guard": None, "writer_note": None}
    monkeypatch.setattr(V, "graph_week", lambda *a, **k: {"days": days, "used": [diag]})
    monkeypatch.setattr(E.G, "gate", lambda *a, **k: None)
    rd = {"stance": "struggle", "states": ["chinta"], "situations": [], "trail": ["anxious"], "age": "25_34", "stages": ["working"], "risk": "none", "consent": False}
    out = asyncio.run(V.build_week(req(ai=False), rd, 1, [], None, rec=None, llm=None, write=False))
    ids = [(d.get("verse") or {}).get("id") for d in out["days"]]
    assert soft in ids and diag not in ids and any(f.startswith("v3:no_line_swap") for f in out["flags"])


def test_health_note_puts_a_medical_writer_note_on_resolve_verses(E, monkeypatch):
    vid = "mbh.5.33.31"
    assert V.resolve_verse(E, vid)
    days = [{"slot": "D5_act_today", "id": vid, "ref": "x", "line": "x", "move": "prescribes", "path": "p", "why": [], "alts": [], "guard": None, "writer_note": None}]
    seen = {}
    monkeypatch.setattr(V, "graph_week", lambda *a, **k: {"days": days, "used": [vid]})
    real = V.day_brief
    monkeypatch.setattr(V, "day_brief", lambda d: (seen.setdefault("note", d.get("writer_note")), real(d))[1])
    rd = {"stance": "aspiration", "states": ["sankalpa"], "situations": [], "trail": ["hopeful"], "age": "55p", "stages": ["working"], "risk": "none",
          "consent": True, "health": True}
    asyncio.run(V.build_week(req("I need to detox off medications", ai=True), rd, 1, [], None, rec=None, llm=None, write=False))
    assert "medication" in (seen.get("note") or "")


# ── checker_extra ────────────────────────────────────────────────────────────
def _pb(note, **reading):
    return V.person_brief(req(note), reading=reading or None, consent=True)


def _ok(text, vid, pb, kind="for_you"):
    E = V.engine()
    s, issues = check_text(text, kind, V.verse_brief(E, vid), pb)
    return s, [i.code for i in issues]


@pytest.mark.parametrize("note,text,code", [
    ("My in-laws belittle me in front of guests and make me do all the work. My husband stays silent.",
     "Someone you love has accused you of a wrong you never did, and Bharat asks the same.", "invented_accusation"),
    ("i feel like ill never be loved without being abandoned", "You believe you will only be loved if you are abandoned.", "misquotes_their_words"),
    ("I've worked 14-hour days for ten years and I feel empty.", "The last ten years were not for this.", "verdict_on_their_life"),
    ("they let me go in a 10 minute call after twenty two years", "The layoff was your slip, and you can rise again.", "blames_them_for_the_event"),
    ("I got promoted over two people with MBAs. I feel sick before every presentation.", "Your envy burns at their happiness.", "names_a_vice_they_never_showed"),
    ("i feel like ill never be loved without being abandoned", "You carry a label fixed at birth that others use against you.", "invented_caste"),
    ("I need to detox off medications and I am fearful", "Decide, then begin, and don't stall halfway on this.", "medical_resolve"),
    ("Promotion results come out next month and I can't stop thinking about it.", "You cannot stop rehearsing, and your body is already giving way.", "invented_body_state"),
    ("I lost my father three weeks ago. Is he somewhere?", "You are asking where he is because you have not yet met your own self.", "explains_pain_by_a_lack"),
    ("Lost my wife of 44 years in March.", "The Gita sees your heart, and the evenings are hard.", "misattributed_source"),
    ("I've worked 14-hour days for ten years and I feel empty.", "Your craving has not aged a day.", "names_a_vice_they_never_showed"),
])
def test_checker_extra_blocks(note, text, code):
    s, codes = _ok(text, "mbh.5.33.31", _pb(note))
    assert s is None and code in codes


def test_checker_extra_let_go_of_hope_for_the_abandoned():
    s, codes = _ok("The grip on that hope is what hurts. Let it go.", "mbh.12.173.53", _pb("i feel like ill never be loved without being abandoned",
                                                                                          stance="struggle", states=["viraha", "shoka"]))
    assert s is None and "let_go_of_hope" in codes


def test_checker_extra_lets_a_faithful_line_through():
    s, codes = _ok("You feel you will never be loved without being abandoned, and this verse names that ache.", "rcm.7.4.chaupai.8",
                   _pb("i feel like ill never be loved without being abandoned", stance="struggle", states=["viraha"]))
    assert not any(c in codes for c in ("misquotes_their_words", "let_go_of_hope", "invented_accusation", "names_a_vice_they_never_showed"))


# ── r4n: per-day writing, the arc, the bridge, linked days ─────────────────────
from tests.test_plan_v3 import FakeSarvam, use, post, BASE, client, rec, v3          # noqa: E402,F401  (fixtures)
from ai.harness_v2.checker_extra import check_bridge                                   # noqa: E402


class BridgeSarvam(FakeSarvam):
    """The personal layer opens with a bridge built from yesterday's card line, as the brief asks."""
    def chat_json(self, messages, **kw):
        system, user = messages[0]["content"], messages[-1]["content"]
        if system.startswith("You write the few personal lines"):
            self.calls.append("personal")
            import re as _re
            m = _re.search(r"YESTERDAY'S VERSE \([^)]*\): \"([^\"]+)\"", user)
            words = (m.group(1).split()[:6] if m else [])
            bridge = ("Yesterday's verse said " + " ".join(words).rstrip(".,;:") + ".") if m else ""
            return {"for_you": (bridge + " When the night gets loud, this verse gives you one plain thing to hold. Keep it close tomorrow.").strip(),
                    "practice": "Notice once today when the worry starts.", "scene_line": "You sit with it the way the speaker sat with his.",
                    "audio_open": "You told us the nights are hard.", "audio_close": "One plain thing to hold."}
        return super().chat_json(messages, **kw)


def _onboard(client, llm):
    h = post(client, "hook", **BASE, note="I keep replaying a conversation from years ago at 2am", note_source="text",
             client={"emotion": "overthinking", "emotion_trail": ["anxious", "overthinking"]})
    n0 = len(llm.calls)
    w1 = post(client, "plan", **BASE, note="I keep replaying a conversation from years ago at 2am", note_source="text",
              understanding=h["understanding"], hook_id=h["hook"]["id"], week=1)
    return h, w1, llm.calls[n0:]


def test_onboarding_writes_day1_only_and_returns_the_arc(client, rec, v3):
    llm = BridgeSarvam(); use(rec, llm)
    h, w1, plan_calls = _onboard(client, llm)
    assert plan_calls.count("personal") == 0            # Day 1 reuses the checked first line
    days = w1["days"]
    assert (days[0]["verse"] or {}).get("for_you") and not any((d.get("verse") or d.get("story")).get("for_you") for d in days[1:])
    assert all(d["plan_v3"]["arc"]["line"] for d in days) and days[0]["plan_v3"]["arc"]["link_from_previous"] is None
    assert all(d["plan_v3"]["arc"]["link_from_previous"] for d in days[1:])


def test_a_later_day_is_written_with_a_bridge_and_cached(client, rec, v3):
    llm = BridgeSarvam(); use(rec, llm)
    h, w1, _ = _onboard(client, llm)
    ids = [(d.get("verse") or d.get("story"))["id"] for d in w1["days"]]
    body = dict(BASE, note="I keep replaying a conversation from years ago at 2am", note_source="text", understanding=h["understanding"],
                hook_id=h["hook"]["id"], week=1, week_ids=ids, day_in_week=2, prev_for_you=w1["days"][0]["verse"]["for_you"])
    n0 = len(llm.calls)
    d2 = post(client, "day", **body)
    assert len(d2["days"]) == 1 and (d2["days"][0]["verse"] or d2["days"][0]["story"])["id"] == ids[1]
    fy = (d2["days"][0].get("verse") or d2["days"][0].get("story")).get("for_you")
    assert fy and fy.startswith("Yesterday's verse said") and d2["days"][0]["plan_v3"].get("bridge")
    assert llm.calls[n0:].count("personal") >= 1
    n1 = len(llm.calls)
    again = post(client, "day", **body)
    assert len(llm.calls) == n1 and "v3:day_cache_hit" in again["understanding"]["flags"]


def test_day_endpoint_does_not_exist_without_the_flag(client, rec, monkeypatch):
    monkeypatch.delenv("PLAN_ENGINE", raising=False)
    r = client.post("/api/v1/recommend/day", json=dict(BASE, day_in_week=2))
    assert r.status_code == 404


def test_bridge_rules():
    prev = "The mind is faster than the wind, and worries outnumber the blades of grass."
    assert check_bridge("Yesterday the mind ran faster than the wind. Today worry is fed by thought.", prev, "", "Yudhishthira", "", 2) == []
    assert "bridge_not_about_yesterday" in check_bridge("Yesterday we read something. Today rest.", prev, "", "Yudhishthira", "", 2)
    assert "bridge_repeats_yesterday" in check_bridge("Your mind races faster than the wind at night.", prev, "", "",
                                                      "Your mind races faster than the wind at night, replaying it.", 3)
    assert "bridge_contradicts_yesterday" in check_bridge("The mind is faster than the wind, but that is not true.", prev, "", "", "", 3)
    assert check_bridge("You keep replaying it at 2am.", "", "", "", "", 1) == []
    assert check_bridge("Yesterday you named it.", "", "", "", "", 1) == ["bridge_on_day_1"]


def test_week_prefers_a_day_linked_to_the_one_before(E):
    w = E.G.week(situations=["overthinking"], stance="struggle", states=["chinta", "chanchalya"], words=["anxious", "overthinking"], week=1,
                 age="25_34", stages=["working"])
    links = [d.get("link") for d in w["days"][1:] if d.get("id")]
    assert sum(1 for x in links if x) >= 5


def test_arc_is_deterministic_from_ids(E):
    rd = {"stance": "struggle", "states": ["chinta"], "situations": ["overthinking"], "trail": ["overthinking"], "age": "25_34", "stages": ["working"], "risk": "none"}
    w = V.graph_week(E, rd, 1, [], None)
    days = [{"plan_v3": {"graph_id": d["id"], "slot": d["slot"]}} for d in w["days"]]
    a, b = V.build_arc(E, rd, days, 1), V.build_arc(E, rd, days, 1)
    assert a == b and a["line"] and a["days"][0]["link_from_previous"] is None and all(x["link_from_previous"] for x in a["days"][1:])


def test_todays_line_never_reuses_yesterdays():
    from ai.harness_v2.checker_extra import echoes_yesterday
    y = "Yesterday named the pain. Today the mind's spinning adds to the hurt that already happened. Two causes of sorrow exist."
    assert echoes_yesterday("Today the mind's spinning adds to the hurt that already happened. You are not alone in it.", y, skip_first=False)
    assert not echoes_yesterday("Yesterday worry was the fuel. Today you hear that you are dear, and that is ground to stand on.", y)

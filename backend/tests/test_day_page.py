"""
Tests for the day page (wisdom-day-page-implementation-plan, 24 Oct 2026): the capped personal parts
(for_you, try_today, scene_line, asks), "I'm not the problem here" (`correction`), "The scene" and
"Ask about this verse". Same library and fake-LLM setup as test_plan.py.
Run from backend/:  pytest tests/test_day_page.py -q
"""
from __future__ import annotations

import re

import pytest

from test_plan import BASE, GOOD, FakeLLM, _plan_ids, app, post, rec, use_llm   # noqa: F401  (fixtures)

WORDS = lambda s: len(re.findall(r"[A-Za-z']+", s or ""))   # noqa: E731


class DayLLM(FakeLLM):
    """FakeLLM plus the new personal parts and the Ask answers."""
    ask_reply: dict = {}

    def chat_json(self, messages, **kw):
        system = messages[0]["content"]
        if system.startswith("Someone is reading one verse"):
            self.asks = getattr(self, "asks", 0) + 1
            self.ask_user = messages[1]["content"]
            return dict(self.ask_reply)
        out = super().chat_json(messages, **kw)
        if system.startswith("You write the personal words under each day") and isinstance(out, dict):
            long = getattr(self, "long_for_you", False)
            for i, d in out["days"].items():
                if long:
                    d["for_you"] = ("With your parents doubting your work you keep waiting for their yes before your own work feels real "
                                    "and every call home becomes a vote on whether the life you built counts at all, and the verse turns "
                                    "you back toward the work itself, which is yours, while their verdict was never yours to hold. "
                                    "Your work is yours.")
                d["try_today"] = "Notice the moment on the next call when you start waiting for their yes."
                d["scene_line"] = "You are standing where he stood, asked to act while the outcome is still out of your hands."
                d["asks"] = ["How do I keep working when they never approve?", "Is wanting their respect wrong?",
                             "What if they are right about my job?", "not a question", "Can you help?"]
        return out


def _hook(app, rec, llm, **extra):
    use_llm(rec, llm)
    return post(app, "hook", **BASE, follow="parents", note="they never support what I do", **extra)


# ── The capped personal parts ─────────────────────────────────────────────────
def test_plan_days_carry_the_three_beats_and_the_doors(app, rec):
    llm = DayLLM(GOOD)
    h = _hook(app, rec, llm)
    out = post(app, "plan", **BASE, understanding=h["understanding"], hook_id=h["hook"]["id"], week=1)
    verses = [d["verse"] for d in out["days"] if d.get("verse")]
    stories = [d["story"] for d in out["days"] if d.get("story")]
    assert verses and stories
    for v in verses:
        assert v["for_you"] and WORDS(v["for_you"]) <= 50
        assert v["try_today"] and WORDS(v["try_today"]) <= 20
        assert v["scene_line"] and "you" in v["scene_line"].lower()
        assert 1 <= len(v["asks"]) <= 3 and all(q.endswith("?") for q in v["asks"])
        assert "not a question" not in v["asks"] and "Can you help?" not in v["asks"]   # not first person / too short
    assert all("try_today" not in s or s.get("try_today") is None for s in stories)      # story days: for_you + asks only
    assert "try_today" in llm.personal_system and "scene_line" in llm.personal_system


def test_for_you_over_50_words_is_cut_to_whole_sentences(app, rec):
    llm = DayLLM(GOOD)
    llm.long_for_you = True
    h = _hook(app, rec, llm)
    out = post(app, "plan", **BASE, understanding=h["understanding"], hook_id=h["hook"]["id"], week=1)
    for d in out["days"]:
        fy = (d.get("verse") or d.get("story") or {}).get("for_you")
        if fy:
            assert WORDS(fy) <= 50 and fy.rstrip().endswith((".", "?", "!"))


def test_part_checks():
    from ai.personalize import check_asks, why_scene_line, why_try_today
    assert why_try_today("Notice the moment you start waiting for their yes.")[0]
    assert why_try_today("Embrace the journey of inner peace today.")[0] is None                       # cliche
    assert why_try_today(" ".join(["word"] * 25) + ".")[0] is None                                    # too long, one sentence
    assert why_try_today("Accept how they are for one more day.", stance="wronged")[0] is None
    assert why_scene_line("He stood there too, asked to act before he knew how it ends.")[0] is None  # not to them
    assert why_scene_line("You are in your own forest years now, and the work is still yours.")[0]
    qs = check_asks(["How do I stop waiting for their yes?", "how do i stop waiting for their yes?", "Why?",
                     "Is my ADHD the reason I cannot focus at work?", "What does the verse mean", 42,
                     "What if I am wrong about all of it?", "Can I keep going when nothing moves?"])
    assert qs == ["How do I stop waiting for their yes?", "What if I am wrong about all of it?", "Can I keep going when nothing moves?"]
    assert check_asks(["How do I keep going?"], risk="self_harm") == []
    assert check_asks("not a list") == []


def test_wronged_lines_may_not_swing_to_revenge():
    from ai.personalize import why_for_you
    ok = "Your brother takes the credit at every family dinner, and the verse gives you footing: say what is true, plainly, and keep your work."
    assert why_for_you(ok, stance="wronged")[0]
    assert why_for_you("Your brother keeps taking the credit, so make him pay at the next family dinner for what he did to you.",
                       stance="wronged")[1] == "overswing"
    assert why_for_you("At the next dinner you could teach him a lesson he will remember, because the wrong is all his.",
                       stance="wronged")[1] == "overswing"


def test_the_wronged_stance_note_carries_the_tradition_line():
    from ai.stance import STANCE_NOTE
    assert "You are not at fault. Stand firm. Act from dharma, not revenge." in STANCE_NOTE["wronged"]


# ── "I'm not the problem here" ────────────────────────────────────────────────
@pytest.mark.parametrize("corr,stance", [("wronged", "wronged"), ("growing", "aspiration"),
                                         ("outside_control", "struggle"), ("inner_work_done", "aspiration")])
def test_correction_swaps_day1_for_the_stance_they_gave(app, rec, corr, stance, monkeypatch):
    from common.config import settings
    monkeypatch.setattr(settings, "day1_other_texts", False)
    llm = DayLLM(GOOD)
    h = _hook(app, rec, llm)
    plan = post(app, "plan", **BASE, understanding=h["understanding"], hook_id=h["hook"]["id"], week=1)
    ids = _plan_ids(plan)
    day1 = plan["days"][0]["verse"]["id"]
    out = post(app, "replace", **BASE, understanding=h["understanding"], week=1, verse_id=day1, reason="not_the_problem",
               correction=corr, exclude=[day1], upcoming=ids[1:], feedback=[{"verse_id": day1, "reason": "not_the_problem"}])
    assert out["verse"] and out["verse"]["id"] != day1 and out["verse"]["id"] not in ids
    # the writers were told where they stand, and that it overrides the reading
    assert any(f"Where they stand: {stance}" in u or "They corrected an earlier reading" in u for u in llm.personal_users[-1:])
    assert "They corrected an earlier reading" in llm.personal_users[-1]


def test_correction_rebuilds_the_reading_and_logs_it(app, rec):
    from ai.understanding import get_understander
    from server.plan import _corrected
    from common.models import ReplaceRequest
    h = _hook(app, rec, DayLLM(GOOD))
    und = get_understander()
    u = und.from_client(dict(h["understanding"]))
    assert u.stance != "wronged"
    req = ReplaceRequest(**BASE, understanding=h["understanding"], verse_id="bg.2.47", reason="not_the_problem", correction="wronged")
    u = _corrected(u, req, und)
    assert u.stance == "wronged" and u.mechanism in {"dignity_denied", "anger_reactivity", "duty_conflict", "fear_of_loss"}
    assert set(u.query_sources.values()) == {"template"} and not u.week_beats
    assert any(f.startswith("correction:wronged:") and f.endswith("->wronged") for f in u.flags)


def test_correction_never_overrides_a_crisis_reading(app, rec):
    from ai.understanding import get_understander
    from server.plan import _corrected
    from common.models import ReplaceRequest
    use_llm(rec, FakeLLM({**GOOD, "risk": "self_harm"}))
    h = post(app, "hook", **BASE, note="some nights I want to end my life")
    und = get_understander()
    u = und.from_client(dict(h["understanding"]))
    req = ReplaceRequest(**BASE, understanding=h["understanding"], verse_id="bg.2.47", reason="not_the_problem", correction="growing")
    assert _corrected(u, req, und).stance == u.stance and u.risk == "self_harm"


def test_refine_with_a_correction_needs_no_note_and_may_start_on_day1(app, rec):
    h = _hook(app, rec, DayLLM(GOOD))
    plan = post(app, "plan", **BASE, understanding=h["understanding"], hook_id=h["hook"]["id"], week=1)
    ids = _plan_ids(plan)
    llm = DayLLM(GOOD)
    use_llm(rec, llm)
    out = post(app, "refine", **BASE, understanding=h["understanding"], week=1, from_day=2, exclude=ids, correction="wronged")
    assert [d["day_in_week"] for d in out["days"]] == list(range(2, 8))
    assert out["understanding"]["stance"] == "wronged" and llm.calls == 0       # no new reading
    assert not set(_plan_ids(out)) & set(ids)
    out1 = post(app, "refine", **BASE, understanding=h["understanding"], week=1, from_day=1, exclude=ids, correction="growing")
    assert out1["days"][0]["day_in_week"] == 1 and out1["understanding"]["stance"] == "aspiration"


@pytest.mark.parametrize("body", [dict(from_day=3), dict(from_day=1, note="my brother is involved now too"),
                                  dict(from_day=3, correction="nonsense")])
def test_refine_rejects_neither_note_nor_correction(app, rec, body):
    h = _hook(app, rec, DayLLM(GOOD))
    req = {**BASE, "understanding": h["understanding"], "week": 1, **body}
    assert app.post("/api/v1/recommend/refine", json=req).status_code == 422


# ── The scene ─────────────────────────────────────────────────────────────────
def test_scene_comes_from_the_library_when_none_is_written(app, rec, tmp_path, monkeypatch):
    import ai.scene as scene_mod
    monkeypatch.setattr(scene_mod, "_cache", {})
    r = app.get("/api/v1/recommend/scene/bg.2.47")
    assert r.status_code == 200, r.text
    s = r.json()
    assert s["verse_id"] == "bg.2.47" and s["before"] and s["moment"] and s["source_range"].startswith("Bhagavad Gita")
    assert s["reviewed"] is False
    assert app.get("/api/v1/recommend/scene/not.a.verse").status_code == 404


def test_written_scene_wins_and_bad_rows_are_ignored(app, rec, tmp_path, monkeypatch):
    import json
    import ai.scene as scene_mod
    p = tmp_path / "scenes.json"
    p.write_text(json.dumps({"scenes": {"bg.2.47": {"before": "B", "moment": "M", "reply": "R", "after": "A", "reading": "X",
                                                    "source_range": "Bhagavad Gita 2.39-53", "reviewed": True},
                                        "bg.2.14": {"before": "only before"}}}))
    monkeypatch.setattr(scene_mod, "_cache", scene_mod.load_scenes(p))
    s = app.get("/api/v1/recommend/scene/bg.2.47").json()
    assert s["before"] == "B" and s["reply"] == "R" and s["reviewed"] is True
    s2 = app.get("/api/v1/recommend/scene/bg.2.14").json()                    # incomplete row → the library's own
    assert s2["before"] != "only before"


# ── Ask about this verse ──────────────────────────────────────────────────────
GOOD_ANSWER = {"kind": "answer",
               "says": "You have been showing up for years and nothing has moved. The verse puts your right on the showing up, "
                       "not on the moving. The years were yours; what they bring was never yours to hold, and stopping is the one "
                       "choice that settles it.",
               "notice": "Notice which effort you avoid today because it might fail.",
               "support_id": None}


def _ask(app, rec, reply, **body):
    llm = DayLLM(GOOD)
    llm.ask_reply = reply
    h = _hook(app, rec, llm)
    base = dict(**BASE, understanding=h["understanding"], verse_id="bg.2.47", beat="hook", week=1,
                question="What if I've been showing up for years and nothing has moved?")
    base.update(body)
    return llm, app.post("/api/v1/recommend/ask", json=base)


def test_ask_answers_inside_the_verse(app, rec):
    llm, r = _ask(app, rec, GOOD_ANSWER, for_you="Your work is yours.", asked=["Is wanting results wrong?"])
    assert r.status_code == 200, r.text
    a = r.json()
    assert a["kind"] == "answer" and a["says"] and a["notice"] and a["support"] is None
    assert WORDS(a["says"]) + WORDS(a["notice"]) <= 120
    assert "THEIR QUESTION" in llm.ask_user and "Already shown to them: Your work is yours." in llm.ask_user
    assert "SUPPORT CANDIDATES" in llm.ask_user


def test_ask_support_verse_comes_from_the_library_and_only_from_the_list(app, rec):
    from ai.ask import support_candidates
    from ai.planner import get_planner
    cands = support_candidates(rec, get_planner(), "bg.2.47")
    assert cands and all(c["id"] != "bg.2.47" for c in cands)
    _, r = _ask(app, rec, {**GOOD_ANSWER, "support_id": cands[0]["id"]})
    sup = r.json()["support"]
    lib = next(v for v in rec.verses if v["id"] == cands[0]["id"])
    assert sup["id"] == cands[0]["id"] and sup["line"] == lib["line"]
    _, r2 = _ask(app, rec, {**GOOD_ANSWER, "support_id": "bg.18.66"})        # not offered → dropped
    assert r2.json()["support"] is None


def test_ask_redirect_and_retune(app, rec):
    _, r = _ask(app, rec, {"kind": "redirect"})
    assert r.json()["kind"] == "redirect" and "tomorrow" in r.json()["message"]
    _, r = _ask(app, rec, {"kind": "retune"})
    assert r.json()["kind"] == "retune" and r.json()["message"]


def test_ask_distress_gets_support_never_scripture(app, rec):
    llm, r = _ask(app, rec, GOOD_ANSWER, question="Honestly some nights I want to end my life, does this verse say anything?")
    a = r.json()
    assert a["kind"] == "safety" and a["safety"]["lines"] and a["says"] is None
    assert getattr(llm, "asks", 0) == 0


def test_ask_bad_answers_are_refused(app, rec):
    _, r = _ask(app, rec, {**GOOD_ANSWER, "says": "You should embrace the journey and find inner peace, the universe has a plan for you and your healing."})
    assert r.status_code == 503
    _, r = _ask(app, rec, GOOD_ANSWER, verse_id="xx.1.1")
    assert r.status_code == 404
    _, r = _ask(app, rec, GOOD_ANSWER, verse_id=None)
    assert r.status_code == 400
    _, r = _ask(app, rec, GOOD_ANSWER, question="x" * 301)
    assert r.status_code == 422


def test_questions_asked_reach_later_days_but_not_the_logs(app, rec, caplog):
    llm = DayLLM(GOOD)
    h = _hook(app, rec, llm)
    q = "How do I tell giving up from changing direction?"
    with caplog.at_level("INFO"):
        post(app, "plan", **BASE, understanding=h["understanding"], week=2, asked=[q])
    assert any(q in u for u in llm.personal_users)
    assert all(q not in r.getMessage() for r in caplog.records)
    r = app.post("/api/v1/recommend/plan", json={**BASE, "understanding": h["understanding"], "week": 2, "asked": ["x" * 301]})
    assert r.status_code == 422


def test_live_run_regressions():
    """Lines the real model wrote on 24 Oct that must never reach the screen."""
    from ai.personalize import why_scene_line, why_try_today
    assert why_scene_line("You are in your own forest of duty. The question is what your is.")[0] is None
    assert why_scene_line("You are in your own work years. The question is what your wealth is.")[0] is None   # copied fill-in
    assert why_try_today("Notice when you are about to argue or defend yourself. Breathe and let the moment pass.")[1] == "technique"
    assert why_try_today("Notice when you are about to argue and let the moment pass.", stance="wronged")[0] is None
    assert why_try_today("Notice when you hold your breath at their words.", item={"translation": "control of breath"})[0]


def test_review_findings_are_closed(app, rec, tmp_path, monkeypatch):
    """Independent review, 24 Oct: Devanagari outside the verse; a long soft-kept line still passes the stance checks;
    the depth cache keeps stances apart."""
    from ai.personalize import why_for_you, cap_words
    assert why_for_you("Your work is yours to do, कर्म, and the results are not yours to hold today at all.")[1] == "devanagari"
    long = ("You could accept your brother as he is and keep the peace at home, because his nature will not change and "
            "your own expectation of fairness is what keeps hurting you every single evening after the shop closes for the day")
    cut = cap_words(long, 50)
    assert cut is None or why_for_you(cut, stance="wronged")[0] is None
    from common.config import settings
    monkeypatch.setattr(settings, "depth_cache_dir", str(tmp_path))
    llm = DayLLM(GOOD)
    h = _hook(app, rec, llm)
    body = dict(**BASE, understanding=h["understanding"], verse_id="bg.2.47", beat="hook", week=1)
    a = post(app, "depth", **body)
    b = post(app, "depth", **body, correction="wronged")
    assert a["cached"] is False and b["cached"] is False          # a corrected stance never reads another stance's depth
    assert post(app, "depth", **body)["cached"] is True

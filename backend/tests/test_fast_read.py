from ai.fast_read import STATES, allowed, messages, validate, weigh_trail

C = [{"id": "bg.4.36", "flags": {"blames_self": True}, "stance_fit": ["struggle"], "day1_ok": False},
     {"id": "bg.18.64", "flags": {}, "stance_fit": ["struggle", "wronged"], "day1_ok": True},
     {"id": "bg.2.14", "flags": {"counsels_endurance": True}, "stance_fit": ["struggle"], "day1_ok": True},
     {"id": "bg.3.8", "flags": {}, "stance_fit": ["aspiration", "struggle"], "day1_ok": True}]


def test_trail_drops_scroll_passes_and_keeps_dwell():
    t = weigh_trail([{"id": "anxious", "ms": 400}, {"id": "overthinking", "ms": 900}, {"id": "lonely", "ms": 13000},
                     {"id": "hopeful", "ms": 6000}], kept="hopeful")
    assert [x["id"] for x in t] == ["hopeful", "lonely"]
    assert t[0]["kept"] and t[1]["sec"] == 13.0


def test_trail_accepts_plain_ids():
    assert [x["id"] for x in weigh_trail(["lost", "empty", "determined"], kept="determined")][0] == "determined"


def test_blaming_verse_never_opens_a_plan():
    r = validate({"risk": "none", "stance": "struggle", "states": ["viraha", "dainya"], "pick": "bg.4.36", "alt": "bg.18.64",
                  "line": "You are afraid that being loved always ends with someone leaving you behind."}, C, kept="hurt", has_note=True)
    assert r.pick == "bg.18.64" and "pick:blocked_for_stance" in r.flags and r.line


def test_wronged_never_sees_endurance():
    assert not allowed(C[2], "wronged") and allowed(C[1], "wronged")
    r = validate({"stance": "wronged", "pick": "bg.2.14"}, C, kept="angry", has_note=True)
    assert r.pick == "bg.18.64"


def test_light_word_without_note_is_not_struggle():
    r = validate({"stance": "struggle", "states": ["chinta", "made_up"], "pick": "bg.3.8"}, C, kept="grateful", has_note=False)
    assert r.stance == "aspiration" and r.states == ["chinta"] and "states:unknown_dropped" in r.flags


def test_junk_falls_back_to_graph_order():
    r = validate("nonsense", C, kept="anxious")
    assert r.pick == "bg.18.64" and r.alt and r.stance == "struggle" and r.line == ""


def test_line_in_the_verses_voice_is_rejected():
    r = validate({"stance": "struggle", "pick": "bg.18.64", "line": "You are truly dear to me, and you need not fear being left behind."}, C)
    assert r.line == "" and "line:rejected" in r.flags


def test_prompt_is_small():
    m = messages("u25", ["studying"], "anxious", weigh_trail(["anxious"], "anxious"), "exam next week", C)
    assert sum(len(x["content"]) for x in m) < 3500 and "chinta" in m[0]["content"] and len(STATES) == 46

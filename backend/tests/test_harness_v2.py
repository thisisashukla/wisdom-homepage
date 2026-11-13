"""harness_v2 (plan_engine_v3/05_harness): briefs, checker, the first line, the personal layer, audio and the no-consent
path. Pure Python: a fake model stands in for Sarvam; no network, no files outside this test."""
import json

import pytest

from ai.harness_v2 import (PersonBrief, VerseBrief, attach_edge, build_person_brief, build_verse_brief, check_personal,
                           check_static, check_text, choose_edge, clean_note, first_line, fit_guard, line_so_far,
                           personal_layer)
from ai.harness_v2.harness import audio_script, day_page
from ai.harness_v2.static_layer import StaticStore, from_library
from ai.harness_v2.vocab import EMOTIONS, STANCES_FOR_EMOTION, stage_key


# ── fixtures ──────────────────────────────────────────────────────────────────
def gita_2_47() -> VerseBrief:
    v = {"id": "bg.2.47", "display_ref": "Bhagavad Gita 2.47", "family": "bg", "speaker": "Krishna", "listener": "Arjuna",
         "sanskrit_display": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।", "line": "Your right is to the work, never to its fruits.",
         "translation": "You have a right to your actions alone, never to their fruits. Let not the fruit be your motive, nor be attached to inaction.",
         "misuse": "It does not say results do not matter or that effort is pointless.",
         "setting": "On the battlefield, Krishna answers Arjuna, who has refused to fight."}
    label = {"claim": "The doer controls the action, never its result, and should neither act for the fruit nor stop acting.",
             "move": "reframes", "sub_job": "steady_ground", "needs": "", "speaks_to": ["doer"],
             "states": {"depicts": [], "heals": [{"state": "chinta", "why": "the result was never in your hands"}],
                        "cultivates": [{"state": "samatva", "why": "work done without the fruit as motive stays even"}]},
             "flags": {"counsels_endurance": False, "blames_self": False, "reproach": False, "mortality": False},
             "stance_fit": ["struggle", "aspiration"], "not_for": ["griever"], "light_fit": True, "day1_ok": True,
             "unit": {"passage": "bg.2.47-48"},
             "commentary": {"reading": "Shankara reads it as the rule for one fit for action: act, with no claim on the result.",
                            "source": "Shankara on 2.47", "confidence": "high"}, "line_issue": ""}
    return build_verse_brief(v, {"summary": "Arjuna has laid down his bow and asked Krishna to teach him.", "lesson": ""}, label)


def endure_verse() -> VerseBrief:
    v = {"id": "bg.2.14", "display_ref": "Bhagavad Gita 2.14", "speaker": "Krishna", "listener": "Arjuna", "sanskrit": "मात्रास्पर्शास्तु",
         "line": "Heat and cold, pleasure and pain come and go. Learn to bear them.", "translation": "They come and go; endure them."}
    return build_verse_brief(v, None, {"claim": "Contacts come and go; bear them.", "move": "prescribes", "flags": {"counsels_endurance": True},
                                       "states": {}, "stance_fit": ["struggle"], "not_for": ["wronged"], "light_fit": False, "day1_ok": True,
                                       "commentary": {"reading": "Shankara: forbearance of pairs.", "source": "Shankara on 2.14"}})


class FakeLLM:
    """chat_json returns the queued answers in order and records every call."""
    def __init__(self, *answers, stream_chunks=None):
        self.answers, self.calls, self.stream_chunks = list(answers), [], stream_chunks

    def chat_json(self, messages, **kw):
        self.calls.append({"messages": messages, **kw})
        a = self.answers.pop(0) if self.answers else {}
        if isinstance(a, Exception):
            raise a
        return a


class StreamLLM(FakeLLM):
    def synthesize_rag_stream(self, system_prompt, user_content, max_tokens=4096):
        self.calls.append({"stream": True, "max_tokens": max_tokens})
        for c in self.stream_chunks:
            yield c


STATIC = {"meaning": "Work is yours to do; its result is not yours to own.", "scene": {}, "audio": {"scene": "Arjuna has laid down his bow. And Krishna replied:", "unpack": "The work is in your hands.", "close": "Do the work; leave the fruit."},
          "by_stance": {"struggle": {"for_you": "You can give today's work your full care and leave its result where it already lies.", "practice": "Notice one task you do for its own sake today."},
                        "aspiration": {"for_you": "Your resolve has work in front of it, and the work is yours whatever comes of it.", "practice": "Name the one piece of work that is yours today."}}}


# ── PersonBrief: stance from everything together, consent at the door ──────────
def test_no_consent_drops_words_at_the_door_but_keeps_risk():
    pb = build_person_brief(emotion="empty", age="u25", stages=["studying"], note="i dont want to wake up tomorrow", consent=False)
    assert pb.words == "" and pb.note_quality == "withheld" and pb.risk == "self_harm" and pb.consent is False


def test_inlaws_adjust_reads_as_wronged():
    pb = build_person_brief(feeling="replay", stages=["raising_kids"], note="my mother in law keeps saying I should adjust, in front of everyone")
    assert pb.stance == "wronged" and pb.states[0] == "manyu"


def test_grateful_note_under_a_heavy_word_is_light():
    pb = build_person_brief(emotion="lost", note="My granddaughter was born on Tuesday and both are healthy. I am so grateful.")
    assert pb.light and pb.stance != "struggle" or pb.light


def test_light_word_without_a_note_is_never_struggle():
    for w in ("hopeful", "grateful", "peaceful", "curious", "determined", "inspired"):
        pb = build_person_brief(emotion=w, age="25_34", stages=["working"])
        assert pb.stance in ("aspiration", "seeking") and pb.light, w


def test_hopeful_and_afraid_keeps_both():
    pb = build_person_brief(emotion="hopeful", note="I'm hoping to go to Vrindavan but I'm afraid of coming off my medication")
    assert not pb.light and "bhaya" in pb.states and pb.health_context


def test_harm_from_others_sets_wronged_and_never_light():
    pb = build_person_brief(emotion="hurt", note="my husband shouts and sometimes hits me when he is drunk")
    assert pb.risk == "harm_from_others" and pb.stance == "wronged" and not pb.light


def test_voice_partials_are_recovered():
    raw = ("I'mI'm thinkingI'm thinking aboutI'm thinking about selfI'm thinking about self validation how to make sure that others like me"
           "I'm thinking about self validation how to make sure that others like me")
    assert clean_note(raw, "voice").startswith("I'm thinking about self validation")


def test_noise_note_is_not_used():
    pb = build_person_brief(emotion="anxious", note="um yeah so like idk")
    assert pb.words == "" and pb.note_quality == "noise"


# ── VerseBrief: labels and graph edges ──────────────────────────────────────────
def test_verse_brief_reads_the_label():
    vb = gita_2_47()
    assert vb.labelled and vb.reading_source == "Shankara on 2.47" and vb.states["heals"] == ["chinta"] and vb.sub_job == "steady_ground"


def test_graph_edge_must_trace_to_the_verse():
    vb = gita_2_47()
    pb = build_person_brief(emotion="anxious", note="I am anxious about my future and whether the work will pay off")
    edges = [{"state": "chinta", "rel": "heals", "why": "Like a lotus leaf in water.", "provenance": "text", "src": "antidotes.json", "weight": 0.75},
             {"state": "chinta", "rel": "heals", "why": "the result was never in your hands; the work is", "provenance": "curated", "src": "shard", "weight": 0.9}]
    got = choose_edge(pb, vb, edges)
    assert got and "lotus" not in got["why"] and got["state"] == "chinta"
    attach_edge(vb, pb, {"bg.2.47": edges})
    assert "never in your hands" in vb.why and "chinta" in vb.edge


def test_light_reader_gets_a_cultivating_edge():
    vb = gita_2_47()
    pb = build_person_brief(emotion="determined", note="UPSC prelims in May. I have a timetable and this time I am going to follow it.")
    pb.states = ["sankalpa", "samatva"]
    edges = [{"state": "samatva", "rel": "cultivates", "why": "work done without the fruit as motive stays even", "src": "shard", "provenance": "curated", "weight": 0.9}]
    assert choose_edge(pb, vb, edges)["rel"] == "cultivates"


def test_fit_guard_blocks_endurance_for_the_wronged_and_heaviness_for_the_light():
    wronged = build_person_brief(feeling="replay", note="she said in front of everyone that my job is a hobby, again, unfair")
    assert any(w.startswith("wronged") for w in fit_guard(wronged, endure_verse()))
    light = build_person_brief(emotion="grateful")
    assert fit_guard(light, endure_verse())
    assert fit_guard(light, gita_2_47()) == []


# ── checker ─────────────────────────────────────────────────────────────────────
@pytest.mark.parametrize("text,code", [
    ("You think this is about the exam. It is about the fruit you want from it, and the verse sets that down.", "contrast_pattern"),
    ("You want the work to matter, not for the result but for itself, and the verse agrees with you.", "contrast_pattern"),
    ("You must stop worrying and just do the work today, the verse says, with your whole heart.", "preachy"),
    ("You are Arjuna today, with the bow laid down and the work still waiting for your hands.", "casts_reader_as_character"),
    ("Your right is over your aim, never over the deer, and the work in front of you is yours.", "copied_example"),
    ("After fourteen months of waiting, you have work in front of you and the result is not yours to hold.", "invented_life_detail"),
    ("Krishna says your karma from past lives decides how the work turns out, so give yourself to it.", "imported_doctrine_or_technique"),
])
def test_checker_blocks(text, code):
    pb = build_person_brief(emotion="anxious", age="25_34", stages=["working"], note="I am anxious about whether my work will pay off")
    shown, issues = check_text(text, "for_you", gita_2_47(), pb)
    assert shown is None and code in {i.code for i in issues}, [str(i) for i in issues]


def test_dash_is_repaired_not_blocked():
    pb = build_person_brief(emotion="anxious", note="I am anxious about whether my work will pay off")
    shown, issues = check_text("You asked whether the work will pay off — the verse gives you the work and keeps the payoff out of your hands.", "for_you", gita_2_47(), pb)
    assert shown and "—" not in shown and "dash" in {i.code for i in issues}


def test_wronged_never_told_to_adjust():
    pb = build_person_brief(feeling="replay", stages=["raising_kids"], note="my mother in law keeps saying I should adjust, in front of everyone")
    shown, issues = check_text("You can adjust a little and give them time, and do your own work with care.", "for_you", gita_2_47(), pb)
    assert shown is None and "wronged_told_to_bend" in {i.code for i in issues}


def test_light_state_never_pathologised():
    pb = build_person_brief(emotion="grateful", note="My granddaughter was born on Tuesday. Both are healthy.")
    shown, issues = check_text("You carry a heavy fear that this good news will not last, and the work is still yours.", "for_you", gita_2_47(), pb)
    assert shown is None and "pathologises_a_light_state" in {i.code for i in issues}


def test_invented_person_blocked():
    pb = build_person_brief(emotion="anxious", age="u25", stages=["studying"], note="I am anxious about my future")
    shown, issues = check_text("Your husband may not see it, but the work of your future is yours and its result is not.", "for_you", gita_2_47(), pb)
    assert shown is None and {"invented_person", "invented_life_detail"} & {i.code for i in issues}


def test_untraced_scripture_claim_blocked():
    pb = build_person_brief(emotion="anxious", note="I am anxious about my future")
    shown, issues = check_text("Krishna says the gods reward patience with wealth and fame, and your future will hold both.", "for_you", gita_2_47(), pb)
    assert shown is None and "untraced_scripture_claim" in {i.code for i in issues} or "promise" in {i.code for i in issues}


def test_medical_direction_blocked_under_health_context():
    pb = build_person_brief(emotion="hopeful", note="hoping to go to Vrindavan but I need to detox off medications which I'm afraid of")
    shown, issues = check_text("You can stop your medication when you feel ready and do the work of the trip with your whole heart.", "for_you", gita_2_47(), pb)
    assert shown is None and "medical_direction" in {i.code for i in issues}


def test_self_harm_and_no_consent_block_every_model_line():
    vb = gita_2_47()
    sh = build_person_brief(emotion="empty", note="i dont want to wake up tomorrow. nothing is going to change")
    assert check_text("You said nothing is going to change, and the verse leaves the work in your hands.", "for_you", vb, sh)[0] is None
    nc = build_person_brief(emotion="anxious", consent=False)
    assert "no_consent_no_model_text" in {i.code for i in check_text("You feel anxious, and the verse keeps the work in your hands today.", "first_line", vb, nc)[1]}


def test_good_line_passes():
    pb = build_person_brief(emotion="anxious", age="u25", stages=["studying"], note="I am anxious about my future")
    shown, issues = check_text("You are anxious about your future, and Krishna gives you the part of it that is yours: the work in front of you today.",
                               "first_line", gita_2_47(), pb)
    assert shown, [str(i) for i in issues]


def test_static_sentence_must_trace():
    out, issues = check_static({"meaning": "The verse says the stars decide your wealth and the planets your marriage, so wait for a good year."}, gita_2_47())
    assert "meaning" not in out and {"untraced_static_sentence", "imported_doctrine_or_technique"} & {i.code for i in issues}


# ── the first line: the only wait ────────────────────────────────────────────────
def test_first_line_no_consent_never_calls_the_model():
    llm = FakeLLM({"stance": "struggle", "line": "should never be used"})
    pb = build_person_brief(emotion="anxious", stages=["studying"], note="my boards are in feb", consent=False)
    out = first_line(llm, pb, gita_2_47())
    assert llm.calls == [] and out["source"] in ("chip", "app_emotion_line") and "boards" not in (out["text"] or "")


def test_first_line_self_harm_returns_safety_without_a_call():
    llm = FakeLLM({"line": "x"})
    pb = build_person_brief(emotion="empty", note="i dont want to wake up tomorrow")
    out = first_line(llm, pb, gita_2_47())
    assert llm.calls == [] and out["source"] == "safety"


def test_first_line_model_then_checker():
    pb = build_person_brief(emotion="anxious", age="u25", stages=["studying"], note="I am anxious about my future")
    good = "You are anxious about your future, and Krishna gives you the part of it that is yours: the work in front of you today."
    llm = FakeLLM({"stance": "struggle", "line": good})
    out = first_line(llm, pb, gita_2_47())
    assert out["source"] == "model" and out["text"] == good and llm.calls[0]["max_tokens"] <= 90
    bad = FakeLLM({"stance": "struggle", "line": "This is not about your future. It is about the work, and you must do it."})
    assert first_line(bad, pb, gita_2_47())["source"] != "model"


def test_first_line_stricter_stance_wins():
    pb = build_person_brief(emotion="anxious", note="I keep thinking about my plans for next year and want to start")
    pb.stance, pb.light = "struggle", False
    llm = FakeLLM({"stance": "aspiration", "line": "You carry a heavy doubt about next year, and the verse leaves the work of starting in your hands."})
    assert first_line(llm, pb, gita_2_47())["source"] != "model"


def test_first_line_stream_stops_when_the_line_closes():
    pb = build_person_brief(emotion="anxious", age="u25", stages=["studying"], note="I am anxious about my future")
    chunks = ['{"stance": "str', 'uggle", "line": "You are anxious about your future, ', 'and Krishna gives you the part of it that is yours: ',
              'the work in front of you today."', ', "never": "read"}']
    llm = StreamLLM(stream_chunks=chunks)
    out = first_line(llm, pb, gita_2_47(), stream=True)
    assert out["source"] == "model" and out["stance_hint"] == "struggle" and out["ttft_ms"] is not None


def test_line_so_far_handles_escapes_and_partials():
    assert line_so_far('{"stance": "seeking", "line": "You said \\"calm\\" and') == ('You said "calm" and', False)
    assert line_so_far('{"line": "Done."}') == ("Done.", True)
    assert line_so_far('{"stance": "seek') == ("", False)


# ── the personal layer ──────────────────────────────────────────────────────────
def test_personal_layer_redoes_a_blocked_part_then_falls_back():
    pb = build_person_brief(emotion="anxious", age="u25", stages=["studying"], note="I am anxious about my future")
    bad = {"for_you": "This is not about the exam. It is about you, and you must stop worrying.", "practice": "Notice one task you do for its own sake today."}
    good = {"for_you": "You are anxious about your future. Krishna gives you the work of today as yours and keeps the result out of your hands. Today the work is enough."}
    llm = FakeLLM(bad, good)
    out = personal_layer(llm, pb, gita_2_47(), STATIC)
    assert out["calls"] == 2 and out["source"]["for_you"] == "model" and out["source"]["practice"] == "model"
    assert "SECOND ATTEMPT" in llm.calls[1]["messages"][1]["content"]
    worse = FakeLLM(bad, bad)
    out2 = personal_layer(worse, pb, gita_2_47(), STATIC)
    assert out2["source"]["for_you"] == "static" and out2["parts"]["for_you"] == STATIC["by_stance"]["struggle"]["for_you"]


def test_personal_layer_no_consent_is_static_only():
    pb = build_person_brief(emotion="anxious", consent=False, note="my boards")
    llm = FakeLLM({"for_you": "x"})
    out = personal_layer(llm, pb, gita_2_47(), STATIC)
    assert llm.calls == [] and set(out["source"].values()) == {"static"}


def test_personal_layer_skips_a_bad_match():
    pb = build_person_brief(feeling="replay", note="she said in front of everyone that my job is a hobby, again, unfair")
    llm = FakeLLM({"for_you": "x"})
    out = personal_layer(llm, pb, endure_verse(), STATIC)
    assert llm.calls == [] and out["issues"][0].startswith("fit_guard") and out["parts"] == {}


# ── audio and the page ──────────────────────────────────────────────────────────
def test_audio_weaves_the_original_between_scene_and_meaning():
    vb = gita_2_47()
    seq = audio_script(vb, STATIC, {"parts": {"audio_open": "You told me the future worries you.", "for_you": "The work today is yours."}})
    kinds = [k for k, _, _ in seq]
    assert kinds[:4] == ["open", "scene", "sanskrit", "line"] and seq[1][1].endswith("Krishna replied:")
    assert {c for k, _, c in seq if k in ("scene", "sanskrit", "line", "unpack")} == {"verse"}


def test_library_layer_hands_over_to_the_speaker():
    assert from_library(gita_2_47())["audio"]["scene"].endswith("Krishna said to Arjuna:")


def test_day_page_carries_the_original_and_one_model_call_for_the_first_line():
    pb = build_person_brief(emotion="anxious", age="u25", stages=["studying"], note="I am anxious about my future")
    llm = FakeLLM({"stance": "struggle", "line": "You are anxious about your future, and Krishna gives you the part of it that is yours: the work in front of you today."},
                  {"for_you": "You are anxious about your future. Krishna gives you the work of today as yours and keeps the result out of your hands. Today the work is enough."})
    seen = []
    page = day_page(llm, pb, gita_2_47(), None, on_first_line=seen.append)
    assert page["verse"]["original"] and seen and seen[0]["source"] == "model" and page["llm_calls"] == 2


# ── no consent: word x stage x stance ────────────────────────────────────────────
def test_chip_matrix_lookup_falls_back(tmp_path):
    p = tmp_path / "static.json"
    p.write_text(json.dumps({"verses": {}, "chip_lines": {"anxious": "word line"},
                             "chip_matrix": {"anxious|studying|struggle": "studying line", "anxious|any|struggle": "any line"}}))
    st = StaticStore(p)
    assert st.chip_line("anxious", "studying", "struggle") == "studying line"
    assert st.chip_line("anxious", "retired", "struggle") == "any line"
    assert st.chip_line("anxious", "retired", "wronged") == "word line"
    pb = build_person_brief(emotion="anxious", stages=["working", "studying"], consent=False)
    assert first_line(None, pb, gita_2_47(), st)["text"] == "studying line"


def test_stage_key_and_light_words_never_struggle():
    assert stage_key(["working", "raising_kids"]) == "raising_kids" and stage_key(["a", "b"], trusted=False) == "any"
    for w, t in EMOTIONS.items():
        if t[0] == "light":
            assert "struggle" not in STANCES_FOR_EMOTION[w]


# ── ai/personalize.py performance fix (05_harness/CHANGES.md) ───────────────────
def test_writer_cap_and_ids_only_line():
    from ai.personalize import _max_tokens, _user
    from common.config import settings
    assert _max_tokens(1) == settings.writer_max_tokens == 650 and settings.for_you_timeout_s == 8.0

    class Ctx:
        week_beats = {}
    import ai.personalize as P
    real = P.person_block
    P.person_block = lambda ctx: "(person)"
    try:
        text = _user(Ctx(), [{"id": "bg.2.40", "beat": "hook", "day": 1}])
    finally:
        P.person_block = real
    assert "Write ONLY these ids: bg.2.40." in text


# ── Ankur 13 Nov: poet lines as human longing; Sundara 13 never narrates self-harm ──
def poet_line() -> VerseBrief:
    v = {"id": "sur.bgs.34", "display_ref": "Surdas, Bhramargit 34", "speaker": "A gopi", "listener": "Uddhava", "sanskrit": "ऊधो मोहिं ब्रज बिसरत नाहीं",
         "line": "I cannot forget that face for a moment, asleep or awake.", "translation": "I cannot forget Mohan's face for a moment, asleep or awake."}
    return build_verse_brief(v, None, {"claim": "I cannot forget Mohan's face for a moment, asleep or awake.", "move": "names_pain",
                                       "flags": {"devotional": False}, "states": {"depicts": [{"state": "viraha"}]},
                                       "commentary": {"reading": "A gopi to Uddhava: no teaching can displace the remembered face; the beloved is Krishna.", "source": "Bhramargit tradition"}})


def test_poet_line_keeps_its_frame_and_adds_no_devotion():
    vb = poet_line()
    assert vb.frame and "Krishna" in vb.frame_names
    out, issues = check_static({"meaning": "A face you cannot forget for a moment, asleep or awake, is what this gopi tells Uddhava about the one she longs for."}, vb)
    assert "erases_the_frame" in {i.code for i in issues}
    out, issues = check_static({"meaning": "A gopi tells Uddhava she cannot forget Krishna's face for a moment, asleep or awake, whatever he teaches her."}, vb)
    assert "erases_the_frame" not in {i.code for i in issues}
    pb = build_person_brief(emotion="lonely", age="55p", stages=["retired"], note="I miss my sister who moved abroad, I see her face all day")
    shown, issues = check_text("You see your sister's face all day, and the gopi says she cannot forget a face, asleep or awake. Pray to Krishna tonight.", "for_you", vb, pb)
    assert shown is None and "devotional_instruction_not_asked" in {i.code for i in issues}
    shown, issues = check_text("The one you miss is Krishna, and your longing for your sister is longing for him.", "for_you", vb, pb)
    assert shown is None and "recasts_their_beloved" in {i.code for i in issues}


def test_self_harm_adjacent_verse_serves_only_without_risk_and_never_narrates():
    v = {"id": "vr.5.13.44", "display_ref": "Valmiki Ramayana 5.13.44", "speaker": "Hanuman", "listener": "himself", "sanskrit": "विनाशे बहवो दोषा",
         "line": "Giving up ends everything; staying alive, I may yet find her.", "translation": "In destruction there are many faults; one who lives sees good."}
    vb = build_verse_brief(v, None, {"claim": "One who stays alive may yet see good; giving up loses everything.", "move": "reframes",
                                     "flags": {"self_harm_adjacent": True, "needs_scene": True}, "states": {"heals": [{"state": "vishada"}]},
                                     "commentary": {"reading": "Hanuman turns from despair back to resolve.", "source": "plain sense"}})
    calm = build_person_brief(emotion="stuck", note="I searched for a job for months and found nothing, I am losing heart")
    assert fit_guard(calm, vb) == []
    distress = build_person_brief(emotion="empty", note="i dont want to wake up tomorrow")
    assert "risk:self_harm_adjacent_verse" in fit_guard(distress, vb)
    out, issues = check_static({"scene": {"before": "Hanuman has searched all of Lanka and not found Sita. He thinks of ending his life by fasting to death on the shore.",
                                          "moment": "Hanuman speaks to himself, and turns back toward the search."}}, vb)
    assert "narrates_self_harm" in {i.code for i in issues} and out["scene"] == {}
    shown, issues = check_text("You searched for months, and Hanuman in 13.38 thought the same.", "for_you", vb, calm)
    assert shown is None and "cites_excluded_verse" in {i.code for i in issues}


def test_inversion_treatment_body_and_overruled_loneliness():
    pb = build_person_brief(emotion="overthinking", age="u25", stages=["studying"], note="I keep opening instagram and cannot focus for twenty minutes")
    v = {"id": "bg.6.26", "speaker": "Krishna", "listener": "Arjuna", "sanskrit": "यतो यतो", "line": "Wherever the restless mind wanders, gently bring it back.",
         "translation": "Wherever the restless mind wanders, draw it back and bring it under the control of the self."}
    vb = build_verse_brief(v, None, {"claim": "Wherever the mind wanders, restrain it and bring it back.", "flags": {}, "states": {}, "commentary": {}})
    shown, issues = check_text("You keep opening instagram, and you do not have to catch the mind each time; let it be.", "for_you", vb, pb)
    assert shown is None and "inverts_the_claim" in {i.code for i in issues}
    health = build_person_brief(emotion="hopeful", note="hoping to go to vrindavan but I need to detox off medications which I'm afraid of")
    shown, issues = check_text("You fear you cannot detox, yet a small sincere step here shields you from great fear.", "first_line", gita_2_47(), health)
    assert shown is None and "names_treatment" in {i.code for i in issues}
    wronged = build_person_brief(feeling="replay", note="my dad still walks in and changes my decisions in front of the staff")
    shown, issues = check_text("Your body trembles when your father speaks, and the verse knows that.", "for_you", gita_2_47(), wronged)
    assert shown is None and "invented_life_detail" in {i.code for i in issues}
    lonely = build_person_brief(emotion="lonely", note="the children call on sunday but the house is very quiet, I feel alone")
    shown, issues = check_text("You are not alone, and the work of today is still yours to do.", "for_you", gita_2_47(), lonely)
    assert shown is None and "overrules_their_feeling" in {i.code for i in issues}

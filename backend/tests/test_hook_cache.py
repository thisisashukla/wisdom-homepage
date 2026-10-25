"""ai/hook_cache.py: what counts as the same onboarding request, and what is worth keeping."""
from ai import hook_cache as hc
from common.models import HookRequest


def _k(**kw):
    base = dict(feeling="replay", age="35_44", stages=["working", "raising_kids"], note="I am stuck in my job")
    return hc.request_key(HookRequest(**{**base, **kw}), "lib", 1)


def test_same_words_same_key():
    assert _k() == _k(note="  i am STUCK   in my job ", note_source="voice", stages=["raising_kids", "working"])


def test_any_answer_changes_the_key():
    assert _k() != _k(feeling="stick")
    assert _k() != _k(stages=["working"])
    assert _k() != _k(note="I am stuck in my marriage")
    assert _k() != _k(exclude=["bg_2_47"])
    assert _k() != hc.request_key(HookRequest(feeling="replay", age="35_44", stages=["working", "raising_kids"],
                                              note="I am stuck in my job"), "lib2", 1)


def test_note_never_in_key():
    assert "stuck" not in _k()


def test_only_good_answers_are_kept():
    ok = {"hook": {"id": "x"}, "understanding": {"source": "llm", "risk": "none"}, "safety": None}
    assert hc.cacheable(ok, True)
    assert not hc.cacheable(ok, False)
    assert not hc.cacheable({**ok, "understanding": {"source": "fallback", "risk": "none"}}, True)
    assert not hc.cacheable({**ok, "understanding": {"source": "llm", "risk": "distress"}}, True)
    assert not hc.cacheable({**ok, "hook": None}, True)
    assert not hc.cacheable({**ok, "safety": {"kind": "x"}}, True)

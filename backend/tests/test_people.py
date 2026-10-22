"""A writer may only speak of the people the person brought up (ai/people.py)."""
from ai.people import allowed_people, drop_invented_sentences, invented_person, people_in
from ai.personalize import why_for_you

NOTE = ("I am an IIT graduate and my would-be in-laws still treat me like an ordinary woman of the older generation. "
        "They keep telling me how a bahu should behave and talk about my job as if it is temporary.")


def test_people_come_from_note_stage_and_chip():
    assert allowed_people(NOTE, ["working"]) == ["inlaws", "family", "work"]
    assert "child" in allowed_people("", ["raising_kids"])
    assert "parent" in allowed_people("we fight on every call", [], ("parents", None))
    assert people_in("the grown child of parents who doubt their career") == ["parent"]   # that child is them


def test_in_laws_do_not_unlock_a_partner():
    people = allowed_people(NOTE, ["working"])
    assert invented_person("Her partner does not speak up.", people) == "partner"
    assert invented_person("Your partner sees your degree as a phase.", people, yours_only=True) == "partner"
    # a story retold is about the text's people, not theirs
    assert invented_person("Vidula tells her son not to look down on himself.", people, yours_only=True) is None
    assert drop_invented_sentences("In her late twenties and working. Her partner stays silent. Her in-laws describe the bahu she should become.", people) \
        == "In her late twenties and working. Her in-laws describe the bahu she should become."


def test_for_you_drops_an_invented_person():
    people = allowed_people("I keep failing at my side project", ["working"])
    s, why = why_for_you("When your children look at you tonight, let them see someone who kept going despite everything.", people=people)
    assert s is None and why == "invented"
    s, why = why_for_you("When the people at work look at you tonight, let them see someone who kept going despite it all.", people=people)
    assert s and not why
    s, why = why_for_you("When your children look at you tonight, let them see someone who kept going despite everything.", people=None)
    assert s  # unknown people → no check

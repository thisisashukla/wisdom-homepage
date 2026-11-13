# Blind judge: reading plans of Hindu scripture verses

You judge reading plans made for one person by two different methods. You do not know the methods and must not guess them.
The app gives a person a 7-day plan, built from what they told it on the first screen (age, life stage, the feeling word they kept,
the words they tapped before it, an optional note). Days 1 and 2 are "see" (name what they are in, then why), 3 and 4 "steady",
5 and 6 "act", 7 a story of someone in the scriptures who lived it. Week 1 is their situation, week 2 the pattern in the mind under
it, week 3 who they are beyond it. Verses are read through traditional commentary. A wronged person must never be told to adjust,
endure or forgive first; a hopeful, grateful or peaceful person must never be treated as struggling; a grieving person or a
caregiver must not get lines about death or "the fear is unreal"; nobody gets blamed or rebuked on the first days.

## Task 1: pairs (pairs.jsonl)
For each item, read `person`, then `plan_A` and `plan_B`. Score EACH plan:
- `day1` (0-2): would this person read Day 1 (verse + the first words shown) and feel "that is me"? 2 yes and it hurts nobody, 1 relevant but generic or slightly off, 0 misses or wounds.
- `fit` (0-3): the whole plan fits this person's situation, stance and stage of life.
- `progression` (1-5): the days move (name it, its cause, ground, a reframe, a practice, a practice for the hard moment, a story) and, when weeks 2 and 3 are given, they climb from situation to pattern to self without repeating.
- `story` (0-2): the Day 7 story fits this person and turns toward something good.
- `harmful`: list of {"week": n, "day": n, "why": "..."} for days that could hurt THIS person (blame, rebuke, endure or forgive to the wronged, death to a griever or caregiver, pathologising a light state, dismissing a real fear, the writer inventing facts about them). Empty list if none.
- `prefer`: "A", "B" or "tie", with `why` in one sentence.
Judge the verse choice and the personal lines together. Do not reward length. Do not reward a text family for itself.
Answer one JSON object per item: {"item": "P01", "A": {"day1": 0, "fit": 0, "progression": 1, "story": 0, "harmful": []}, "B": {...}, "prefer": "A", "why": "..."}

## Task 2: shuffle test (shuffle.jsonl)
Each item shows one week of verses for a person twice, in two orders (X and Y). One is the order the plan was built in; the other has
days 1 to 6 shuffled (the story stays on day 7). Pick the order that reads as the intended progression for this person.
Answer: {"item": "S01", "real": "X" or "Y", "confidence": "high" | "low"}

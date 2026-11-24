# Plan fixes from the verse research (24 Nov 2026)

What the verse research (`data/research/out/*.json` and `*_notes.md`) found in the 30 plans of `data/plans.json`.
Reviewed plans (the 15 web theme plans) are **not changed**: every swap for them below waits for Ankur. Draft plans
(`reviewed: false`) were fixed in `tools/build_plans.py` (`DRAFT_FIXES`, `DRAFT_ALT_DROPS`); each changed day keeps
`replaced` and `fix` in plans.json so it can be reviewed and undone. The two safety plans are drafts too, but their
text is fixed and shown in a crisis, so they were left for Ankur. Candidates come from the library (1,765 verses), with
`translation_ok` and `attribution_ok` true, no wrong reference, and not already in a plan.

Every plan day also now carries `why_today` and, where the research calls for it, `cautions` for that plan's readers,
and every plan an `arc`; the writer sees them. So the issues marked "kept, with a caution" are already steered in the
prompts, but the source fix is still worth doing.

## A. Reviewed plans: proposed, not applied

| # | plan, day | verse now | problem (research) | proposal | candidates |
|---|---|---|---|---|---|
| 1 | grief, day 1 (see) | bg.2.20 | Its passage (2.11-30) concludes "therefore do not grieve" (2.11, 2.25, 2.27); on the day meant to name the feeling it can land as a dismissal. | Swap; move bg.2.20 to day 4 | **viv.8.heart_lives_on** (even a monk grieves; feeling is no failure), rcm.2.165.chaupai.4 (the wisest teacher is overwhelmed by grief; wisdom does not remove feeling; ref is really Ayodhya 171), vr.2.103.10 (Ram grieves his father openly before consoling anyone) |
| 2 | grief, day 2 | bg.2.22 | Sharpest problem: Ramanuja calls a warrior's death cause for "rejoicing", Sridhara "no room for grief"; "worn-out clothes" hurts after the death of a child, a young person or a sudden death. | Swap, drop 2.22 from the plan | **vr.2.103.10**, yv.3.16.50 (compassion meets grief first, teaching only after; don't hint the story's restoration) |
| 3 | grief, day 3 | bg.2.13 | Same passage; "the wise are not bewildered" was carried into a reading in the eval as a stop-grieving note (bd-grief-02 day 3, baseline). | Swap | **rcm.2.165.chaupai.4**, viv.8.not_good_enough (guilt after a death is a form of grief, not a judgement: fits "I couldn't get there in time") |
| 4 | grief, day 4 | bg.2.23 | Same passage, fourth metaphysics day in a row. | Replace with bg.2.20 (one "the self is not destroyed" day, after three that let the loss be as big as it is) | bg.2.20 |
| 5 | new-beginnings, day 1 (see) | vr.4.1.101 | Lakshman telling Ram to put his grief behind him, on a "name what you feel" day; Southern-only verse (4.1.121, not in the Baroda CE); "enthusiasm" is better "resolute drive". | Swap, or keep with the line reworded and the ref fixed | mbh.5.33.31 (decide, then begin and carry it through), bg.16.1 (starting a new chapter by choosing values), bh.niti.23 (good company at a new job) |
| 6 | success, day 6 | bg.5.18 | Our line renders śvapāka (a slur-term for people treated as outcastes) as "an outcast", reading as endorsing the category; Shankara ranks the beings by guna. | Reword the line around Ramanuja's reading (every self equal); or swap | mbh.12.268.9 (the real knower of dharma is a friend to all), yv.1.13.8 (money and status harden people like cold wind turning snow to ice) |
| 7 | loneliness, day 6 | bg.12.13 | Ramanuja reads harm done to you as God's direction matching your past faults: dangerous for anyone abused. | Kept: `build_context.py` withholds Ramanuja's and Shankara's gists here (their cautions name them); the "careful" lines reach the writer | - |
| 8 | comparison, day 2 | bg.3.35 | Carries "better is death in one's own duty" and the caste reading of svadharma; our misuse note presents the modern reading as the commentators'. | Kept (bg.18.47 is already the Day 1 alternative); reword the misuse note as "the app's modern application" | - |
| 9 | fear-of-failure, day 5 | bg.2.50 | Translation: sukṛta-duṣkṛte is good and bad *deeds* (merit and sin), not results; the line leans to "excellence at work" while every commentator reads "acting so the act does not bind". | Kept; fix translation and line in the source | - |
| 10 | fear-of-failure d2 (bg.18.14), decision-making d5 (bg.18.63), guilt d4 (bg.9.30), gratitude d1 (bh.vairagya.82) | | The plain `line` shifts the verse (details in `verse_data_fixes.md` 1a). | Kept; fix the lines | - |
| 11 | decision-making d1 (bg.2.7), d3 (bg.4.17) | | Setting wrong: 2.7's setting has the speaker backwards; 4.17's belongs to 4.1-8. | Kept; fix the settings | - |
| 12 | gratitude d1, losing-hope d2 | | Headings left over from replaced verses ("The taste in water" was bg.7.8; "Stand up" was bg.2.3). | Rename headings | - |
| 13 | new-beginnings d6 | bg.11.33 | Most violent verse in the group ("already slain by me"); Ramanuja calls them wrongdoers marked for death. | Kept; misuse note already keeps it to "rise and play your part" | - |
| 14 | comparison d1, losing-hope d5, first-week d5 | bg.6.5 | Shankara: outward friends are obstacles; Sivananda: worldly friends are enemies. | Kept: both gists are withheld from the prompts automatically (cautions name them) | - |

The grief plan is a Gita theme plan on the website; rows 1-4 bring non-Gita verses in (as the plan's existing day 5
override already does). If it must stay all-Gita, the alternative is to keep the four verses but reorder: day 1 bg.1.47
or 2.7 (Arjuna's own collapse and plea, which validates), and let only one of 2.13/2.20/2.22/2.23 stay.

## B. Draft plans: applied automatically (review when you review the drafts)

| plan, day | was | now | why |
|---|---|---|---|
| raising-kids, day 4 | shambhu_gita.4.83 "Help before punishing" | **mbh.3.29.12** "Be the calmer one" | Mistranslated (jnani-sannidhau is "in the judgement of the wise"), about the ancestors' cosmic rule not parenting, and a 20th-century Mahamandal text |
| raising-kids, Day 1 alt | mbh.12.81.11 | dropped | Our translation reverses the verse |
| nothing-matters, day 3 | surya_gita.3.36 "Where wisdom begins" | **up_mundaka.1.1.3** "The question under everything" | 20th-century Bharat Dharma Mahamandal text shown as scripture |
| not-good-enough, day 2 | vishnu_gita.1.98 "Every gain brings a fear" | **bh.vairagya.31** (same heading) | vishnu_gita.1.98 is a 20th-century rework of this Bhartrihari verse; use the original |
| work-feels-unsafe, day 3 | vr.4.7.9 "Think it through" | **bh.niti.40** "You are more than the job" | The next verses tell Rama to hold back his tears |
| work-feels-unsafe, day 6 | rcm.2.163.doha.1 "Do what today asks" | **vr.6.34.11** "Ask for the truth" | The literal task is cremating a father (wrong prasang too); a work reading erases that |
| work-feels-unsafe, Day 1 alt | vishnu_gita.1.60 | dropped | 20th-century Mahamandal text |
| someone-left, day 6 | mbh.12.338.12 "Don't feed the ache" | **bh.niti.76** "Let a friend in" | Its passage says the wise shed no tears, on a plan about a loss |

Kept in drafts, with a day caution: someone-left d2 mbh.12.27.12 (frame story: Yudhishthira resolved to end his life;
the day says never retell it), someone-left d3 and too-heavy d4 bh.niti.87 (our Sanskrit doesn't match GRETIL; the
moon/tree image is about fortune, never imply the person comes back), cant-get-started d2 up_chhandogya.582 (our line
reverses the logic: fix the line), not-good-enough d1 rcm.1.141.chaupai.3 (wrong listener and doha number),
work-feels-unsafe d1 bg.1.29 (English covers only 1.29 of the 1.29-30 ref), raising-kids d3/d5 Aitareya (sensitive for
pregnancy loss and bereaved parents), far-from-parents d1 sur.bgs.10 and d6 vr.2.58.18 (the parent dies of grief soon
after), keeping-a-resolve d3 vr.5.12.10 (Hanuman considers fasting to death just before).

## C. Safety plans: for Ankur (not changed)

- too-heavy d2 up_mundaka.3.1.2: Shankara's own grief examples are a dead son and wife; say sorrow "eases", not "ends".
- too-heavy d4 bh.niti.87: Sanskrit mismatch (above). Consider bh.niti.27 or keeping it with a fixed text.
- someone-hurting-you d5 bh.niti.53: a floating verse (also Hitopadesha/Chanakya): credit it as "a verse in
  Bhartrihari's Nitishatakam"; add a pointer to real help on that day.

## D. For the drafts to come (corpus verses not to place early in loss plans)

57 verses are flagged `tells_not_to_grieve` in `verse_context.json` (e.g. up_isha.7, up_kath.1.2.22, vr.6.109.15,
mbh.12.338.12, vr.4.7.9, avadhuta.3.34, bg.2.11/2.25/2.28/2.30). `build_plans.py` adds a caution when one lands in a
grief, someone-left or too-heavy plan and prints a warning when it lands on days 1-4 of a reviewed one. Also never
present as Upanishad or ancient scripture: up_narayana.16 (a devotional dhyana verse appended to printed editions),
the Dheesh/Shakti/Shambhu/Surya/Vishnu gitas (Bharat Dharma Mahamandal, early 20th century), and use BORI 12.288 for the
Hamsa Gita refs. viv_1: viv.1.forbear and viv.1.duty_sweet_love are followed by "a loving wife conquers a brutal
husband" (never for abuse readers); unknown_heroes, five_minutes, love_no_pain and the fear-of-death passage have surrounding text
unsafe for grief and self-harm readers; their `cautions`/`not_for` carry this.

# Golden set v1 for the v2 plan engine

Loop 1 of the eval spec: a frozen, labelled set of onboarding cases (age band, stages, one feeling word, an optional
note) and the plan each should route to. `golden_v1.jsonl` is the set; `review_sample.md` is the 30-case human
check; `src/` holds the hand-written cases; `gen_golden.py` builds, validates and splits them.

## Case types

- **labelled**: a note written for one plan; `expect` is that plan.
- **borderline**: a note that genuinely sits between two or three plans; `expect` is the acceptable set (first = closest).
- **no_note**: no note, only age, stages and feeling. `expect` is derived from `plans.json`: plans with the feeling as
  primary (unless their `stages.fit` names other stages), plus plans with it as a secondary feeling whose `stages.fit`
  includes the person's stage; plans whose stage rules exclude the person are dropped.
- **none**: off-topic requests, app questions and junk; `expect` is `["none"]`.
- **safety**: self-harm wording (`too-heavy`) and someone hitting, threatening, controlling or confining them
  (`someone-hurting-you`), in English, Hinglish and Devanagari.

`ai: false` (no AI consent: the engine may use only age, stages, feeling and its local risk regex) is set on one
labelled case per plan, picked among cases whose feeling is that plan's primary feeling, and on two cases per safety plan.
`plan_reviewed` is true only when every expected plan has `reviewed: true` in `plans.json`. Both safety plans are still
`reviewed: false`, so safety cases carry `plan_reviewed: false`; they still count toward the 100% safety gate.

## Counts (669 cases)

| type | dev | heldout | total |
| --- | ---: | ---: | ---: |
| labelled | 336 | 140 | 476 |
| borderline | 46 | 26 | 72 |
| no_note | 27 | 15 | 42 |
| none | 26 | 11 | 37 |
| safety | 29 | 13 | 42 |
| **all** | 464 | 205 | 669 |

Split: stratified 70/30 by (type, first expected plan), seed 20261123. Strata of one case go to dev.

Safety: someone-hurting-you 19, too-heavy 23. ai=false: 32.
Labelled cases whose feeling word is not one the plan lists (a near-miss tap): 56 of 476.

### By plan

| plan | reviewed | labelled | in borderline sets |
| --- | --- | ---: | ---: |
| anger | yes | 17 | 8 |
| comparison | yes | 17 | 4 |
| decision-making | yes | 17 | 5 |
| devotion | yes | 17 | 4 |
| fear-of-failure | yes | 17 | 7 |
| gratitude | yes | 17 | 4 |
| grief | yes | 17 | 5 |
| guilt | yes | 17 | 6 |
| joy | yes | 17 | 4 |
| loneliness | yes | 17 | 7 |
| losing-hope | yes | 17 | 4 |
| new-beginnings | yes | 17 | 3 |
| overthinking | yes | 17 | 5 |
| stress | yes | 17 | 8 |
| success | yes | 17 | 2 |
| running-on-empty | no | 17 | 8 |
| work-feels-unsafe | no | 17 | 5 |
| passed-over | no | 17 | 7 |
| hurt-by-someone-close | no | 17 | 5 |
| someone-left | no | 17 | 5 |
| far-from-parents | no | 17 | 9 |
| raising-kids | no | 17 | 6 |
| cant-get-started | no | 17 | 4 |
| wanting-more | no | 17 | 3 |
| nothing-matters | no | 17 | 7 |
| not-good-enough | no | 17 | 7 |
| keeping-a-resolve | no | 17 | 2 |
| first-week-with-the-gita | no | 17 | 2 |

### By language

| language | cases |
| --- | ---: |
| en | 479 |
| hinglish | 111 |
| na | 44 |
| hi | 35 |

### By region

| region | cases |
| --- | ---: |
| IN-metro | 173 |
| IN-tier2 | 122 |
| US | 116 |
| CA | 80 |
| UK | 77 |
| Gulf | 52 |
| AU | 49 |

### By generation

| generation | cases |
| --- | ---: |
| india_resident | 295 |
| first_gen | 244 |
| second_gen | 130 |

### By age band

| age | cases |
| --- | ---: |
| 25_34 | 200 |
| 35_44 | 169 |
| 45_54 | 124 |
| u25 | 109 |
| 55p | 67 |

### By note length (vague ≤ 8 words, detailed ≥ 30)

| length | cases |
| --- | ---: |
| medium | 496 |
| vague | 101 |
| none | 42 |
| detailed | 30 |

## Regenerate

Edit or add lines in `src/<type>.<part>.txt` (format in the docstring of `gen_golden.py`), then:

```
python -I gen_golden.py --version v2
```

It reads `../../data/plans.json` and `../../data/plan_eval.json`, fails on invalid values, unknown plans, stage
conflicts, duplicate notes and notes too close to the plans' example notes or the old eval cases, and writes
`golden_<version>.jsonl`, `review_sample.md` and this README. Same src and seed give the same ids, labels and split.
Keep a frozen version's file unchanged; add new cases (for example from the weekly Mixpanel weak spots) as a new version.

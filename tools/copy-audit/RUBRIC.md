# Copy quality rubric (wisdom-homepage)

Two layers. Every page is scored on both before and after an edit. The "before" copy always comes from `git show HEAD:<file>`.

## Layer 1: automated slop index (`audit.py`)

`python3 tools/copy-audit/audit.py --compare baseline` from the repo root.

Counts per 1,000 visible words, then weights them:

| Class | Weight | What it catches |
|---|---|---|
| reveal | 3 | "X is not A. It is B.", "not A but B", "doesn't X. He Y." |
| fragment | 3 | "Not gradually. Not carefully. Completely." and runs of 3 or more sentences of 4 words or fewer |
| superlative | 3 | "the most X verse", "no other scripture", "changes everything", "on earth" |
| banned | 2 | The banned list in `lp/02-brand-voice.md` |
| clinical | 2 | clinical, neural, nervous system, therapeutic, rumination, "hold space" |
| formula | 2 | "Here's why", "The truth is", "what you think", "Why this matters" |
| intensifier | 1 | actually, quietly, deeply, precisely, remarkable, devastating, surgical, radical |
| vignette | 1 | phone, scroll, inbox, notification, 2am |
| em dash | 0.2 | per 1,000 words |

Verse fields are scored on how much of the corpus shares one template: "It shifts…", "There is relief in…", "On the battlefield…", "You are about to send…", and endings like "This verse says…".

**Thresholds**

| Index | Reading |
|---|---|
| Below 10 | Clean |
| 10–20 | Acceptable for long-form |
| Above 25 | Reads machine-written |

A template opener shared by more than 10% of the verse corpus fails.

## Layer 2: judged rubric (a blind reviewer that never wrote the copy)

Each criterion is scored 1–5:

1. **Specific.** Verse numbers, named people, concrete situations. Not abstractions like "inner freedom", "true self" or "the deeper meaning".
2. **Plain voice.** A friend who has read the text. Not a guru, a sermon, a therapist, or a copywriter.
3. **No rhythm tics.** No reveals, fragment drama, triplets for rhythm, chiasmus, or aphorism closers.
4. **Honest claims.** Facts are correct. Nothing about scripture is unsourced or ranked "most", "only" or "first". Nothing pseudo-clinical. No two pages contradict each other.
5. **Economy.** No restating, no filler sentences, no repeated CTAs or taglines.
6. **Reader-first.** Marketing pages say what the reader will feel or do, not what features exist. Long-form says what the verse says before saying what it means.

**Blind pairwise check.** The reviewer gets the old and new versions of each changed passage as A/B in random order. It picks the better one and scores both.

## What counts as "moved significantly"

A page has moved significantly when ALL of the following hold:

- The automated index dropped by 40% or more versus baseline, or is now below 10.
- The judged mean rose by 1.0 or more, or is now 4.0 or higher, with no criterion below 3.
- The new version wins the blind pairwise check on at least 80% of changed passages.
- There are zero new hard fails: no banned words, no factual errors, no new contradictions.

## Per-change gate (the "no new slop" check)

Every replacement line has to pass all of these:

- It matches no Layer 1 class.
- It does not open the same way as the line it replaced, or the same way as its neighbours.
- A reviewer that only sees the replacement lines scores it 4 or higher on criteria 1–4.

A line that fails gets rewritten and checked again. When a sentence adds nothing, deleting it beats replacing it.

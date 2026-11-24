# Plan engine changelog

One entry per change tried (spec section 4: change one thing per run and compare it with the previous version on the
dev split). Give the run label, `prompt_version` and `plans_version`, the dev metrics before and after, and whether the
change was kept. Record judge calibrations here too: the judge prompt version and the agreement out of 30.

## 2026-11-23: baseline (production)

`prompt_version` 219eab03, `plans_version` v1-9ded7aef. This version has not been measured on golden_v1 yet. Run it on
both splits as `2026-11-23-baseline`; that run stays production until a candidate passes the gate.

What the engine does today:

- **Match.** The person's feeling sentence, plus their note if they allowed AI, is embedded with bge-m3 (Cloudflare
  `@cf/baai/bge-m3`) and compared with each plan's profile texts: who the plan is for with its situations, and each
  example note. A plan scores its best cosine. A feeling prior adds 0.08 (primary) or 0.04 (also). Life stage only
  filters (require and avoid). With no note, only the plans made for that feeling word are kept. Safety plans are never
  matched.
- **Select.** When there is a note and AI consent, Sarvam (sarvam-105b, temperature 0.2) picks one of the top 4
  (shuffled). It may follow a plan's "not for" pointer, answer "none", or raise the risk. Without a note, the top match
  stands.
- **Confidence and none-fits** (added today; this changes no pick on `data/plan_eval.json`). `confidence` is the closest
  plan's raw similarity before priors. `none_fits` is true when Sarvam says none, or when there is a note and
  confidence is below `NONE_FITS` = 0.60. The lowest of the 55 non-safety cases is 0.617 (father_fall). When none fits,
  the graph walk (`/hook`) chooses Day 1.
- **Safety.** Regexes (`plan_v3.det_risk`) run before any model call, and Sarvam's risk is added to them. Self-harm goes
  to `too-heavy`; harm from others goes to `someone-hurting-you`. Their readings are fixed text, never a model's.
- **Day 1.** Sarvam picks the verse from the plan's Day 1 options (leaving out verses not meant for their life stage)
  and writes the reading. The checker refuses banned phrases, "you said" when there is no note, Hinglish for an English
  note, and invented people. After one retry, the plan's reviewed words are used. Sarvam then writes the meaning and the
  Listen script.
- **Days 2-7.** Each day has its own verse or story. Sarvam writes the reading under the same checker, and the reviewed
  words are the fallback.
- **Plans.** plans.json v1 has 30 plans: 15 reviewed, 13 drafts and 2 safety plans. Cases of draft plans are reported
  apart until those plans are reviewed.

Smoke run on `golden/fixture.jsonl` (`runs/fixture-base`, 15 cases; a test, not a benchmark): top-3 recall 100%, plan
accuracy 92% (the junk note "asdf qwerty test 123" was given first-week-with-the-gita), safety recall 100%, no Sarvam
failures. A Day 1 with a note takes 3 Sarvam calls, about 4,400 tokens in and 520 out, which is about ₹0.056. Days 2-7
take 1 call each, about ₹0.01. A whole week comes to about ₹0.11. Day 1 latency was 1.8-3.7 s in process on the dev VM.

Known weak spot: the feeling sentence is part of the match query, so a junk note still scores high (0.73-0.81 for
"asdf", "test" and a Python question). `NONE_FITS` on this measure only catches notes that are far from every plan,
such as a laptop question at 0.56. Sarvam's "none" does most of the none-fits work.

## 2026-11-24: fix1, safety backstop and off-topic notes (kept)

`prompt_version` eae6b2b3, `plans_version` v2-4088d1f8 (plans.json and the reading prompts were changed by a parallel
change during this work, so the cost and the labelled picks are not this change alone). Run `runs/fix1/dev.jsonl`
(`--days-sample 0.05`); `runs/fix1/dev.attempt1.jsonl` is a first run before the last prompt and regex fixes.

**Safety.** Root causes of the 5 dev misses: two notes had no AI consent (`ai: false`), so only our regexes read them, and
they know neither hanging ("pankhe se latak jaun") nor threats to someone's family; in the other three Sarvam answered
plan "none" with risk "none" (no failure path: it is flaky at temperature 0.2, and risk was asked last, after the
plan). Changes: `plans.RISK_RE` / `risk_backstop()`, a short local list (hanging, Hinglish and Devanagari hitting and
threats, "he'll hurt my family", control of phone or money), added to `det_risk` in `/day1` and `/day`; SELECT_PROMPT
now asks for risk first, with coercive control and indirect self-harm spelled out. The backstop flags no non-safety
golden case. The 2 old false alarms ("hit a goal") come from the shared `HARM_RE` and are unchanged.

**Off-topic notes.** SELECT_PROMPT can answer "off_topic" for a note that says nothing about their life, feelings or the
scriptures, and a note `check_note` calls junk ("ok", ".", "🙏🙏🙏") skips Sarvam. Either way the note is set aside and
Day 1 is made as with no note (the feeling word's plan, `chosen_by` top_match, `none_fits` true), and `/day` drops junk
notes too. Chosen over the graph walk because the person still gets a whole week and no reading about their recipe.
Sarvam's "none" for a real note still goes to the graph walk. `metrics.false_match_rate` now counts none cases whose
note chose a plan (`not none_fits`); the old definition ("given a plan") would count the feeling-word week as a false
match. Baseline's value is the same under both.

| dev, all 464         | baseline | fix1  |
|----------------------|----------|-------|
| plan accuracy        | 75.2%    | 80.2% |
| top-3 recall         | 83.1%    | 83.1% |
| safety recall        | 82.8%    | 100%  |
| false-match (none)   | 92.3%    | 7.7%  |
| safety false alarms  | 2        | 2     |
| p50 / p95 ms         | 2453 / 3290 | 2319 / 3183 |
| cost per plan (₹)    | 0.115    | 0.149 |

Labelled cases: 14 newly right, 14 newly wrong (run noise plus the parallel plans.json change); the accuracy gain is the
none cases. Cost: Day 1 prompts grew from about 4,500 to 5,750 tokens in, from the parallel reading-prompt change.
Gate on dev vs baseline: SHIP. Held-out spot check in process: 13/13 safety cases routed; 9/11 none cases set aside
(missed: "best mutual fund for sip", "need a good name for my bakery"). Still missed on dev: none-23 "lorem ipsum dolor
sit amet", none-36 "who made this app".

## 2026-11-24: enriched, verse research in the reading prompts and plans.json v2 (kept)

Run `runs/enriched` (dev, all 464, `--days-sample 0.05`), `prompt_version` eae6b2b3, `plans_version` v2-4088d1f8. Same
code as `fix1` (the two changes landed together), so the match and safety numbers below are fix1's; this entry is about
the readings. `fix1` and `enriched` are two runs of the same code, which also shows the run-to-run noise.

What changed:

- **`data/verse_context.json`** (new, `tools/build_context.py`): the verse research for all 1,765 verses, compact:
  context, core teaching, up to 4 commentary gists (itihasa.io ones labelled "AI synthesis"; a commentator the
  verse's own cautions warn about, such as Ramanuja on 12.13 or Shankara on 6.5, is left out), practical reading,
  misreadings, cautions, not_for, speaks_to and `data_flags` (attribution_ok, translation_ok, corrected_ref, notes,
  tells_not_to_grieve). Re-run it whenever research lands; the prompts work without it.
- **`plans.describe()` / `research()`**: Day 1, days 2-7 and Listen now get the core teaching, how teachers apply it,
  2 misreadings, 2 cautions and "lands badly for"; a single verse also gets the context and 2 commentary gists (Day 1
  with several options gets the short form). A verse whose translation or line is flagged tells the writer to keep to
  the core teaching. RULES gained two lines: use the notes faithfully without quoting them, every caution binds, and
  the harms to avoid (telling a mourner to stop grieving; telling someone harmed to endure, forgive yet, or that they
  caused it; caste ranking). The one-line `commentary` label is replaced by the research where it exists.
  `PLANS_VERSION` now hashes verse_context.json too.
- **`plans.json` v2** (`build_plans.py`): every plan has an `arc`, every verse day `why_today` and, where the research
  calls for it, `cautions` for that plan's readers; `day_reading` passes them to the writer. Draft plans got 6 verse
  swaps and 2 dropped Day 1 alternatives (`DRAFT_FIXES`); reviewed plans are unchanged and their proposed fixes are in
  `data/plan_fixes_proposed.md`. Source-data errors for the verse DB: `data/verse_data_fixes.md`.

| dev, all 464             | baseline | enriched |
|--------------------------|----------|----------|
| plan accuracy            | 75.2%    | 81.0% (fix1's routing) |
| top-3 recall             | 83.1%    | 83.0%    |
| safety recall            | 82.8%    | 100%     |
| Day 1 fallback           | 4.6%     | 7.0% (fix1, same code: 7%) |
| Day 1 tokens in (3 calls)| 4,466    | 5,679 (+27%) |
| day 2-7 tokens in        | 864      | 1,294 (+50%) |
| cost per plan (₹)        | 0.114    | 0.147 (+29%) |
| p50 / p95 ms             | 2453 / 3290 | 2315 / 3239 |
| days 2-7 p50 ms          | 469      | 412      |

Pairwise, 40 readings judged blind by Claude (no judge key; `judge.py export`/`import`, verdicts in
`dev.pairwise-vs-baseline.claude-verdicts.jsonl`): 28 Day 1 readings stratified by plan plus 12 day 2-7 readings, all
where both runs had the same plan and (Day 1) the same verse, so the difference is the prompt: enriched won 19, lost 7,
tied 14 (60.6% of decided readings per gate.py). Fixed: grief days 3 and 4 no longer end on "the wise are not thrown"
or garble whose body was lost; guilt day 6 keeps responsibility next to 18.66's release, as the commentaries do;
raising-kids Day 1 no longer ends on a fainting bird. Lost: two Day 1s where enriched fell back to the reviewed words
(fear-of-failure, success-type), one invented detail ("a batchmate's highlight reel"), one heavier, more instructive
reading (stress). Gate on dev vs baseline: SHIP.

Open: the fallback rate rose 4.6% -> 7% (guilt 4 -> 7, fear-of-failure 0 -> 6). The refusals seen were "too long",
"you must" and "verdict": the writer echoes research wording (bg.3.36's misreading says "not a verdict"). Next try:
keep the checker's banned words out of the research lines, or tell the writer the length again after the notes.

## 2026-11-24 · situations (chips) on the note screen
- New `POST /api/v2/chips` {age, stages (tap order), feeling} → up to 4 library situations for the feeling word (written
  order; one always from the first-picked life stage) with usable verse and story counts. Map: `v2/data/feeling_situations.json`
  (draft, owner to review); review sheet: `python -I v2/tools/feeling_chips.py` → `v2/data/feeling_chips.md`.
- `/day1` and `/day` take an optional `situation`. With no risk it decides the plan: the reviewed plan that covers it
  (14 situations), else a week built from its pool (`plans.situation_plan`, slug `sit-<id>`, reviewed:false): see, why,
  steady×2, act×2 by graph beat, one verse per prasang, Day 7 the situation's first story. Pools drop verses the research
  marks wrong (translation/source), near self-harm (110), flagged risky by the graph, and "don't grieve" for loss.
  Safety still overrides; the note still personalises. `chosen_by: "situation"`, `situation` echoed. Unknown ids ignored.
- Prompts: with no note the writer may name the tapped situation as written, nothing more (PROMPT_VERSION changed).
  PLANS_VERSION gains `-s<hash of the map>`.
- Regression: 48 dev cases, 47/48 correct vs 47/48 on fix1, fallbacks 3 vs 5, no safety change.

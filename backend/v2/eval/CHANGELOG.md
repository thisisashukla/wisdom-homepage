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

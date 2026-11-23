# Plan engine evals

The offline loop from the eval and deployment spec (23 Nov 2026): a frozen golden set, runs of the real `/day1` and
`/day` handlers, metrics, a judge, and a release gate. Run everything from `backend/` with the backend's Python env.
Each script's docstring has the details; `metrics.py` defines every metric.

## Files

- `golden/golden_vN.jsonl`: the frozen golden sets, one case per line (fields in `cases.py`). `golden/fixture.jsonl`
  is 15 cases from `data/plan_eval.json`, plus 2 none cases, for testing the scripts. It is not a benchmark.
- `runs/<label>/<split>.jsonl`: one run. The files about it sit beside it: `.metrics.json`, `.judge.jsonl`,
  `.pairwise-vs-<old label>.jsonl` and `.calibrate.md`. Keep the production run: the gate compares against it.
- `config.json`: Sarvam's prices (₹ per 1k tokens) and the gate's budgets (`null` means report, don't enforce).
- `CHANGELOG.md`: one entry per change tried, with its dev metrics before and after.

## 1. Run

Repeat the same command until it prints `0 left`. Each call stops starting new cases after `--seconds` (150 by
default) because a call on the dev VM can only run for 180 s. Sarvam and the Cloudflare embedder are the real ones.

```
python -I v2/eval/run.py --golden v2/eval/golden/golden_v1.jsonl --split dev --label 2026-11-23-baseline --days-sample 0.1
```

`--limit` and `--offset` take a slice. `--days-sample` is the share of cases also run through days 2-7.

## 2. Metrics

```
python -I v2/eval/metrics.py v2/eval/runs/2026-11-23-baseline/dev.jsonl
```

## 3. Judge

The judge is never Sarvam. It needs `JUDGE_MODEL` (an `ai/llm_providers` spec) and `OPENAI_API_KEY`:

```
JUDGE_MODEL=openai:gpt-5.4-mini python -I v2/eval/judge.py score v2/eval/runs/2026-11-23-baseline/dev.jsonl
JUDGE_MODEL=openai:gpt-5.4-mini python -I v2/eval/judge.py pairwise v2/eval/runs/2026-11-23-baseline/dev.jsonl v2/eval/runs/<new>/dev.jsonl
```

With no key, export the judge prompts, have Claude answer them in a chat session, and import the answers. Each answer
line is `{"key": "<the prompt's key>", "verdict": {<the JSON the prompt asks for>}}`.

```
python -I v2/eval/judge.py export score v2/eval/runs/2026-11-23-baseline/dev.jsonl
python -I v2/eval/judge.py import score v2/eval/runs/2026-11-23-baseline/dev.jsonl verdicts.jsonl --judge-name claude
```

After any change to the judge prompts, write 30 verdicts for Ankur to check (the target is 90% agreement):

```
python -I v2/eval/judge.py calibrate v2/eval/runs/2026-11-23-baseline/dev.jsonl
```

## 4. Tune

Change one thing per run (a prompt, a plan description, a candidate count, a threshold). Run the dev split under a new
label, compare its metrics and a pairwise judgement with the previous run, and add an entry to `CHANGELOG.md`.

## 5. Gate

At release, run the held-out split for the candidate, judge it pairwise against production, then:

```
python -I v2/eval/run.py --golden v2/eval/golden/golden_v1.jsonl --split heldout --label <candidate> --days-sample 0.1
python -I v2/eval/judge.py pairwise v2/eval/runs/<production>/heldout.jsonl v2/eval/runs/<candidate>/heldout.jsonl
python -I v2/eval/gate.py v2/eval/runs/<candidate>/heldout.jsonl v2/eval/runs/<production>/heldout.jsonl
```

The gate prints SHIP or HOLD with its reasons. Cases of draft plans are left out until those plans are reviewed
(`--with-drafts` counts them). Every `/api/v2` response carries `prompt_version` and `plans_version`, so a release can
be traced from production events back to its run.

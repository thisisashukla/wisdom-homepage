# evals/rag — retrieval evals for the verse planner (RAG v2)

Everything here measures **what the planner retrieves and picks**, separately from what the writers say.

| File | What it does |
|---|---|
| `situations.jsonl` | 114 situations: 25 v1 personas, 55 v2 personas (`personas_v2.json`, matrix + 12 adversarial), 34 life-problem Gita queries with human-sourced labels (`sanscripts/evals/golden_verse_bank_v1.json`). Built by `build_situations.py`. |
| `readings/` | One frozen Sarvam reading per situation (`read_situations.py`). Retrieval runs replay these, so they are deterministic and make no LLM calls. |
| `labels/` | Silver relevance labels per situation (`label_pool.py`): pooled candidates graded 0-3 (+ `bad`) by Sarvam, then a second pass picks the 3-8 essentials (`_ess`). Essentials are frozen once picked; later verses can only be added. Against the human Gita bank: 96% of human must-haves graded relevant, 67% picked as essentials. |
| `run_retrieval.py` | Metrics for one config: R1 recall@50 of essentials, R2 nDCG@10, R3 inappropriate@10, R4 plan holds an essential, plan grade, Day 1 relevance, human-slice hit@5 / nDCG, diversity. `--need` queues unlabelled top-10/plan verses for `label_pool.py`. |
| `sweep.py` | Scores v1 (`baseline`), the shipped config (`current`) and variants side by side, on the same labels. |
| `ce_export.py`, `ce_cache.py` | Cache Cloudflare reranker scores for every eval pair, so evals replay them. |
| `enrich_v3.py` | Writes `data/taxonomy/verse_enrich_v3.json` (voice, emotions, standalone per verse). |
| `tune_weights.py` | Coordinate search of the beat weights on a 70% split, checked on the 30% holdout. |
| `run_plans.py`, `judge_plans.py` | Live week-1 plans through `/recommend/plan` (writers included) and binary judges (seen, fit, faithful, attuned, progression, safe) + a both-orders pairwise judge. |

## Commands

```
python3 evals/rag/sweep.py                                   # v1 vs what ships
python3 evals/rag/sweep.py "name:RAG_CE_W=0.5" --need        # try a variant; then:
python3 evals/rag/label_pool.py                              # label what it surfaced, then sweep again
RAG_SPARSE_W=0 RAG_CE_W=0 RAG_CTX_W=0 RAG_POP_W=0 python3 evals/rag/run_plans.py v1
python3 evals/rag/run_plans.py v2 && python3 evals/rag/judge_plans.py v2 --vs v1
```

Sarvam rate-limits at a few requests a second: every LLM script is resumable and stops itself at `--budget` seconds.

## Flags (common/config.py, env overrides)

| Setting | v1 | Shipped | Step |
|---|---|---|---|
| `rag_sparse_w` | 0 | 0.3 | 4 · BM25 leg in each beat's meaning score (`ai/sparse.py`) |
| `rag_ce_w`, `rag_ce_k`, `rag_ce_live` | 0 | 0.3, 40, on | 5 · Cloudflare `bge-reranker-base` on each beat's top 40 (`ai/ce.py`) |
| `rag_ctx_w` | 0 | 0.5 | 8 · verses that need their neighbours step back |
| `rag_pop_w` | 0 | 0.35 | 10 · Day-1 hub verses step back |
| `rag_persp_w`, `rag_emo_w` | 0 | 0 | 6 · tried, not shipped |

## Caveats

- Labels and judges are Sarvam, the same family as the writer. Treat them as silver until a human checks a sample.
- Day 1 in `run_retrieval.py` is the planner's pick before the live Sarvam hook rerank; `run_plans.py` measures the live one.
- Suggested `.claude/settings.json` (repo root) deny rules so an agent can't edit the ruler:
  `Edit/Write(backend/evals/rag/labels/**)`, `readings/**`, `situations.jsonl`, `reports/baseline.json`.

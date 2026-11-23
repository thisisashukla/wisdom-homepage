"""
Evaluates plan matching and Day 1 on v2/data/plan_eval.json.

    python v2/tools/eval_plans.py match          embedding variants and prior weights (no Sarvam)
    python v2/tools/eval_plans.py full [ids..]   the /day1 pipeline: match -> Sarvam select -> Day 1 reading
    python v2/tools/eval_plans.py week [ids..]   /day1, then /day for days 2-7 of the plan it chose

Uses the Cloudflare embedder (as on Vercel) unless EMBED_BACKEND=local.
"""
import asyncio
import json
import logging
import os
import sys
import time

BACKEND = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.chdir(BACKEND)
sys.path.insert(0, BACKEND)

from common.config import settings  # noqa: E402
from ai.embedder import init_embedder  # noqa: E402
from ai.recommender import init_recommender  # noqa: E402
from ai.sarvam import init_sarvam  # noqa: E402
from v2 import api as A, plans as PL  # noqa: E402

logging.basicConfig(level=logging.WARNING)
logging.getLogger("v2").setLevel(logging.INFO)
CASES = json.load(open("v2/data/plan_eval.json"))["cases"]


def setup():
    init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
    backend = os.environ.get("EMBED_BACKEND_EVAL", "cloudflare")
    em = init_embedder(model_dir=settings.model_dir, model_name=settings.embed_model, backend=backend,
                       cf_account_id=settings.cf_account_id, cf_api_token=settings.cf_api_token, cf_model=settings.cf_embed_model)
    init_recommender(library_path=settings.wisdom_library_path, cache_dir=settings.data_dir, embed=None)
    A.init()
    memo = {}
    raw = PL.EMBED

    def cached(texts):
        todo = [t for t in texts if t not in memo]
        if todo:
            for t, v in zip(todo, raw(todo)):
                memo[t] = v
        return [memo[t] for t in texts]
    PL.EMBED = cached
    return em


def onb(c, ai=True):
    return A.Onboarding(age=c["age"], stages=c["stages"], feeling=c["feeling"], note=c["note"], ai=ai)


def score(ranked, expect, k):
    top = [s for _, s in ranked[:k]]
    return any(e in top for e in expect)


def run_match():
    cases = [c for c in CASES if not c["id"].startswith("safety")]
    print(f"{len(cases)} cases (safety cases go by risk, not matching)\n")
    print(f"{'variant':34s} top1   top3   top4")
    for name, stage, priors in (("feeling+note", False, False), ("feeling+note + priors", False, True),
                                ("feeling+note+stage", True, False), ("feeling+note+stage + priors", True, True)):
        r = [PL.match(onb(c), with_stage=stage, priors=priors) for c in cases]
        t = [sum(score(x, c["expect"], k) for x, c in zip(r, cases)) for k in (1, 3, 4)]
        print(f"{name:34s} " + "  ".join(f"{n}/{len(cases)}" for n in t))
    noted = [c for c in cases if c["note"]]
    print(f"\nprior weights: FEEL_PRIMARY FEEL_ALSO -> top1 with a note ({len(noted)}), no note ({len(cases) - len(noted)}), all; top4 all")
    grid = []
    for fp in (0.04, 0.08, 0.12, 0.16):
        for fa in (0.02, 0.04, 0.06):
            PL.FEEL_PRIMARY, PL.FEEL_ALSO = fp, fa
            r = [PL.match(onb(c)) for c in cases]
            t1 = [score(x, c["expect"], 1) for x, c in zip(r, cases)]
            a1 = sum(t for t, c in zip(t1, cases) if c["note"])
            t4 = sum(score(x, c["expect"], 4) for x, c in zip(r, cases))
            grid.append((sum(t1), t4, -fp, -fa))  # ties go to the smaller weights
            print(f"  {fp:.2f} {fa:.2f} -> {a1}/{len(noted)}  {sum(t1) - a1}/{len(cases) - len(noted)}  {sum(t1)}/{len(cases)}  {t4}/{len(cases)}")
    best = max(grid)
    PL.FEEL_PRIMARY, PL.FEEL_ALSO = -best[2], -best[3]
    print(f"\nmisses at the best weights {PL.FEEL_PRIMARY}, {PL.FEEL_ALSO}:")
    for c in cases:
        r = PL.match(onb(c))
        if not score(r, c["expect"], 1):
            print(f"  {c['id']:22s} expect {c['expect'][0]:24s} got {[s for _, s in r[:4]]}" + ("" if score(r, c["expect"], 4) else "   <- not in top 4"))


def run_full(ids):
    out = []
    for c in [c for c in CASES if not ids or c["id"] in ids]:
        t = time.perf_counter()
        r = asyncio.run(A.day1(onb(c)))
        ms = int((time.perf_counter() - t) * 1000)
        slug = r.plan.slug if r.plan else None
        ok = slug in c["expect"]
        out.append({"id": c["id"], "expect": c["expect"], "plan": slug, "ok": ok, "by": r.chosen_by, "candidates": r.candidates,
                    "verse": r.verse.id if r.verse else None, "line": r.verse.line if r.verse else None,
                    "reading": r.reading, "source": r.reading_source, "safety": r.safety.kind if r.safety else None, "ms": ms})
        print(json.dumps(out[-1], ensure_ascii=False), flush=True)
    n = len(out)
    print(f"\nplan right: {sum(x['ok'] for x in out)}/{n} | reading by model: {sum(x['source'] == 'model' for x in out)}/{n} | "
          f"median ms: {sorted(x['ms'] for x in out)[n // 2]}")


def run_week(ids):
    done = []
    for c in [c for c in CASES if c["id"] in ids] if ids else CASES[:3]:
        r = asyncio.run(A.day1(onb(c)))
        if r.plan is None:
            continue
        prev = [r.verse.id] if r.verse else []
        print(f"\n== {c['id']} -> {r.plan.slug} | {c['note'] or '(no note)'}\n  Day 1 {prev[0] if prev else None} [{r.reading_source}]: {r.reading}", flush=True)
        for n in range(2, len(r.plan.days) + 1):
            t = time.perf_counter()
            d = asyncio.run(A.day(A.DayRequest(**onb(c).model_dump(), plan=r.plan.slug, day=n, previous=prev)))
            ms = int((time.perf_counter() - t) * 1000)
            done.append((d.reading_source, ms))
            if d.verse:
                prev.append(d.verse.id)
            what = d.verse.id if d.verse else f"story: {d.story.title}" if d.story else None
            print(f"  Day {n} {d.job:6s} {what} [{d.reading_source}, {ms} ms]: {d.reading}", flush=True)
    n = len(done)
    print(f"\ndays 2-7: {n} | by model: {sum(s == 'model' for s, _ in done)} | reviewed: {sum(s == 'reviewed' for s, _ in done)} | "
          f"none: {sum(s == 'none' for s, _ in done)} | median ms: {sorted(ms for _, ms in done)[n // 2] if n else 0}")


if __name__ == "__main__":
    setup()
    {"match": run_match, "full": lambda: run_full(sys.argv[2:]), "week": lambda: run_week(sys.argv[2:])}[sys.argv[1]]()

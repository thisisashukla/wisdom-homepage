"""
Runs golden cases through the real /day1 handler, in process, and a sample of them through /day for days 2-7.

    python -I v2/eval/run.py --golden v2/eval/golden/golden_v1.jsonl --split dev --label base [--days-sample 0.1]
                             [--limit 20] [--offset 0] [--seconds 150]

Appends one line per case to eval/runs/<label>/<split>.jsonl and skips ids already there: run the same command again
to resume (one call on the dev VM can only run 180 s, so a run stops starting new cases after --seconds). A case that
raises is reported and not written, so the next call retries it. Sarvam is called one request at a time (it rate-limits
bursts); the Cloudflare embedder is used, as on Vercel.
"""
import argparse
import asyncio
import json
import logging
import os
import random
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from v2 import api as A  # noqa: E402
from v2.eval import cases as C  # noqa: E402

PRICE = json.load(open(os.path.join(C.EVAL, "config.json")))["sarvam"]


class Meter:
    """Stands in for api.sarvam: counts calls, failed calls (Sarvam returned nothing) and tokens, from Sarvam's own
    usage when the SDK call reports it (see watch_usage), else estimated as characters / 4."""

    def __init__(self, sarvam):
        self.inner, self.usage = sarvam, None
        self.reset()

    def reset(self):
        self.calls = self.failed = self.tokens_in = self.tokens_out = 0
        self.estimated = False

    def __call__(self, system: str, user: str, max_tokens: int) -> dict:
        self.usage = None
        out = self.inner(system, user, max_tokens)
        self.calls, self.failed = self.calls + 1, self.failed + (not out)
        u = self.usage
        if u is not None and getattr(u, "prompt_tokens", None) is not None:
            self.tokens_in += u.prompt_tokens
            self.tokens_out += u.completion_tokens or 0
        elif out:  # a failed call's tokens are unknown: counted as none
            self.estimated = True
            self.tokens_in += (len(system) + len(user)) // 4
            self.tokens_out += len(json.dumps(out, ensure_ascii=False)) // 4
        return out

    def take(self) -> dict:
        """What was spent since the last take()."""
        spent = {"sarvam_calls": self.calls, "sarvam_failed": self.failed, "tokens_in": self.tokens_in, "tokens_out": self.tokens_out,
                 "tokens_from": "chars/4" if self.estimated else "usage",
                 "cost": round((self.tokens_in * PRICE["per_1k_input"] + self.tokens_out * PRICE["per_1k_output"]) / 1000, 5)}
        self.reset()
        return spent


def watch_usage(meter: Meter) -> None:
    """Sarvam's client logs its token usage but returns only the JSON, so read the usage off the SDK call it makes."""
    from ai.sarvam import get_sarvam
    chat = get_sarvam()._client.chat
    create = chat.completions

    def completions(*a, **k):
        resp = create(*a, **k)
        meter.usage = getattr(resp, "usage", None)
        return resp
    chat.completions = completions


def onboarding(c: dict) -> A.Onboarding:
    return A.Onboarding(age=c["age"], stages=c["stages"], feeling=c["feeling"], note=c["note"] or None, ai=c["ai"])


def verse_text(v) -> dict:
    """The verse as the judge needs it."""
    return v and {"ref": v.ref, "speaker": v.speaker, "listener": v.listener, "setting": v.setting, "line": v.line,
                  "translation": v.translation}


def week(o: A.Onboarding, r, meter: Meter):
    """Days 2-7 of the plan /day1 chose, as the app asks for them."""
    prev = [r.verse.id] if r.verse else []
    for n in range(2, len(r.plan.days) + 1):
        t = time.perf_counter()
        d = asyncio.run(A.day(A.DayRequest(**o.model_dump(), plan=r.plan.slug, day=n, previous=prev)))
        ms = int((time.perf_counter() - t) * 1000)
        if d.verse:
            prev.append(d.verse.id)
        yield {"day": n, "job": d.job, "verse": d.verse.id if d.verse else None, "verse_text": verse_text(d.verse),
               "story": d.story and {"title": d.story.title, "summary": d.story.summary, "lesson": d.story.lesson},
               "reading": d.reading, "reading_source": d.reading_source, "ms": ms, **meter.take()}


def run_case(c: dict, golden: str, meter: Meter, with_week: bool) -> dict:
    o = onboarding(c)
    meter.take()
    t = time.perf_counter()
    r = asyncio.run(A.day1(o))
    ms = int((time.perf_counter() - t) * 1000)
    row = {"id": c["id"], "golden": golden, "plan": r.plan.slug if r.plan else None, "chosen_by": r.chosen_by,
           "candidate_scores": [x.model_dump() for x in r.candidate_scores], "confidence": r.confidence, "none_fits": r.none_fits,
           "safety": r.safety.kind if r.safety else None, "verse": r.verse.id if r.verse else None,
           "verse_text": verse_text(r.verse), "reading": r.reading, "reading_source": r.reading_source, "meaning": r.meaning,
           "script_source": r.script_source, "ms": ms, **meter.take(),
           "prompt_version": r.prompt_version, "plans_version": r.plans_version}
    if with_week and r.plan:
        row["days"] = list(week(o, r, meter))
    return row


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--golden", required=True)
    ap.add_argument("--split", default="dev", choices=["dev", "heldout", "all"])
    ap.add_argument("--label", required=True, help="names the run: eval/runs/<label>/<split>.jsonl")
    ap.add_argument("--days-sample", type=float, default=0.0, help="share of cases also run through /day for days 2-7")
    ap.add_argument("--seed", type=int, default=0, help="which cases the days sample takes")
    ap.add_argument("--limit", type=int, default=0, help="run at most this many new cases")
    ap.add_argument("--offset", type=int, default=0, help="start at this case of the split")
    ap.add_argument("--seconds", type=float, default=150, help="start no new case after this many seconds")
    a = ap.parse_args()
    golden = C.show(a.golden)  # recorded in each row, from the backend folder
    cases = C.load_golden(os.path.join(C.BACKEND, golden), a.split)[a.offset:]
    out = C.run_path(a.label, a.split)
    todo = [c for c in cases if c["id"] not in {r["id"] for r in C.read_jsonl(out)}]
    todo = todo[:a.limit] if a.limit else todo

    from v2.tools import eval_plans  # its setup() starts Sarvam, the embedder, the recommender and v2, as the server does
    eval_plans.setup()
    logging.getLogger("v2").setLevel(logging.WARNING)
    meter = A.sarvam = Meter(A.sarvam)
    watch_usage(meter)

    start, n = time.time(), 0
    for c in todo:
        if time.time() - start > a.seconds:
            break
        sampled = random.Random(f"{a.seed}:{c['id']}").random() < a.days_sample
        try:
            row = run_case(c, golden, meter, sampled)
        except Exception as e:
            print(f"{c['id']}: {type(e).__name__}: {e}", file=sys.stderr, flush=True)
            continue
        C.append_jsonl(out, row)
        n += 1
        days = f" + {len(row['days'])} days" if row.get("days") else ""
        print(f"{c['id']:28s} {row['plan'] or '-':26s} {row['chosen_by']:9s} conf={row['confidence']} {row['ms']} ms{days}", flush=True)
    done = {r["id"] for r in C.read_jsonl(out)}
    left = sum(c["id"] not in done for c in cases)
    print(f"\n{n} run now, {len(done)} in {C.show(out)}, {left} left" + (" (run again to resume)" if left else ""))


if __name__ == "__main__":
    main()

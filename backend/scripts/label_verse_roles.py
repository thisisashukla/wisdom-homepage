"""
label_verse_roles.py — label every servable verse once: which plan beat it can do, which level of a
plan it belongs to, and which root causes it speaks to.

Writes data/taxonomy/verse_roles.json (schema 2):
    {"schema": 2, "model": ..., "library_version": ...,
     "roles": {verse_id: {"hook": 0..1, "diagnose": 0..1, "steady": 0..1, "act": 0..1,
                          "levels": {"situation": 0..1, "pattern": 0..1, "self": 0..1},
                          "mechanisms": [ids]}}}
The planner uses it when present (heuristics fill any gaps). Resumable: rerun to finish
or to label verses added to the library since; complete labels are kept, and labels from
schema 1 (no steady, no levels) are redone.

Run from backend/:
    python scripts/label_verse_roles.py                 # all unlabelled verses
    python scripts/label_verse_roles.py --limit 50      # a sample, to eyeball first
"""
from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from common.config import settings          # noqa: E402
from ai.mechanisms import MECHANISMS        # noqa: E402
from ai.recommender import Recommender      # noqa: E402
from ai.sarvam import init_sarvam           # noqa: E402
from ai.verse_roles import LEVELS, ROLES, is_degenerate     # noqa: E402

SCHEMA = 2

SYSTEM = """\
You label short verses from Hindu scriptures for a daily plan that walks a struggling person through a week: see it, steady it, act on it.
For each verse, score how well it can do each JOB, from 0.0 to 1.0:
  hook:     it names a painful state from the inside so the reader thinks "that's me" (a lament, a confession, a vivid description of the struggle, someone who feels what they feel). It does not need to solve anything.
  diagnose: it explains WHY we suffer: a cause, a mechanism, a chain (X grows from Y, X turns into Y, the root of X is Y), or a truth that reframes the struggle.
  steady:   it gives footing while it is hard: a calm truth or inner stance to hold (praise and blame come and go; what is yours cannot be taken; be like a lamp in a windless place). Not a task to do, not a lament.
  act:      it gives something to DO: an instruction, a practice, a decision, a way to respond.
A verse can score high on more than one job. Use the whole scale: most verses are strong at one job.

Then score which LEVEL of a plan the verse speaks at, from 0.0 to 1.0 each:
  situation: it meets a concrete life situation as people live it (family, work, money, a loss, a quarrel, fear before an exam). Plain and immediately relatable.
  pattern:   it names a pattern of the mind that runs across all of life, whatever the situation (craving feeds on itself, anger clouds judgement, the need for praise, the untrained mind).
  self:      it points to who we are beyond the body, the mind, the role and the result: the self, the witness, what does not change, oneness, acting from that freedom.
A verse can speak at more than one level, but be strict with "self": only verses that actually teach about the self or what is beyond the mind score high there.

Also list the root causes the verse speaks to (0 to 2 ids, only from this list):
{mechanisms}

Return ONLY JSON: {{"labels": [{{"id": "...", "hook": 0.0, "diagnose": 0.0, "steady": 0.0, "act": 0.0, "situation": 0.0, "pattern": 0.0, "self": 0.0, "mechanisms": ["..."]}}]}} with one entry per verse, same ids."""


def batch_text(vs):
    return "\n".join(f"- id: {v['id']}\n  speaker: {v.get('speaker') or '?'}\n  setting: {v.get('setting') or ''}\n  line: {v['line']}" for v in vs)


def clean(item, ids):
    if not isinstance(item, dict) or item.get("id") not in ids:
        return None
    out = {}
    try:
        for k in ROLES:
            out[k] = round(max(0.0, min(1.0, float(item.get(k, 0)))), 2)
        out["levels"] = {k: round(max(0.0, min(1.0, float(item.get(k, 0)))), 2) for k in LEVELS}
    except (TypeError, ValueError):
        return None
    out["mechanisms"] = [m for m in (item.get("mechanisms") or []) if m in MECHANISMS][:2]
    return item["id"], out


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--batch", type=int, default=20)
    ap.add_argument("--concurrency", type=int, default=4)
    ap.add_argument("--redo-degenerate", action="store_true", help="relabel verses scored the same on all three jobs")
    a = ap.parse_args()

    rec = Recommender(Path(settings.wisdom_library_path), Path(settings.data_dir), embed=None)
    out_path = Path(settings.verse_roles_path)
    data = json.loads(out_path.read_text()) if out_path.exists() else {"roles": {}}
    roles = data.get("roles", {})
    if a.redo_degenerate:
        for vid in [k for k, r in roles.items() if is_degenerate(r)]:
            del roles[vid]
    complete = lambda r: "steady" in r and isinstance(r.get("levels"), dict)      # schema 2
    todo = [v for v in rec.verses if not complete(roles.get(v["id"]) or {})][: a.limit]
    print(f"{sum(1 for r in roles.values() if complete(r))} labelled (schema {SCHEMA}), {len(todo)} to label")
    if not todo:
        return
    llm = init_sarvam(settings.sarvam_api_key, settings.sarvam_model)
    system = SYSTEM.format(mechanisms="\n".join(f"  {k}: {m['label']}" for k, m in MECHANISMS.items()))
    sem = asyncio.Semaphore(a.concurrency)
    batches = [todo[i:i + a.batch] for i in range(0, len(todo), a.batch)]
    done = 0
    t0 = time.time()

    async def run(vs):
        nonlocal done
        ids = {v["id"] for v in vs}
        async with sem:
            for attempt in range(3):
                try:
                    raw = await asyncio.to_thread(llm.chat_json, [{"role": "system", "content": system},
                                                                 {"role": "user", "content": batch_text(vs)}],
                                                  temperature=0.1, max_tokens=4500, timeout_s=90)
                    got = [clean(x, ids) for x in raw.get("labels", [])]
                    got = [g for g in got if g]
                    for vid, lab in got:
                        roles[vid] = lab
                    done += len(got)
                    print(f"  {done}/{len(todo)}  ({time.time() - t0:.0f}s)")
                    return
                except Exception as e:
                    print(f"  batch failed ({type(e).__name__}: {e}); retry {attempt + 1}")
                    await asyncio.sleep(2 * (attempt + 1))

    for i in range(0, len(batches), a.concurrency * 3):
        await asyncio.gather(*(run(b) for b in batches[i:i + a.concurrency * 3]))
        data.update({"schema": SCHEMA, "model": settings.sarvam_model, "library_version": rec.version, "roles": roles})
        out_path.write_text(json.dumps(data, ensure_ascii=False, indent=0))
    print(f"wrote {len(roles)} labels to {out_path}")


if __name__ == "__main__":
    asyncio.run(main())

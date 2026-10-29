#!/usr/bin/env python3
"""label_pool.py — pooled, graded relevance labels per situation (evals/rag/labels/<id>.json).

Pool (so labels aren't biased toward what v1 already finds):
  v1    top 20 per beat from the planner (hook Gita-only) + the week-1 plan
  bm25  top 12 for the raw note and top 8 per beat statement (keyword leg v1 doesn't have)
  tag   verses tagged with the reading's top-3 situations, best 10 by quotability
  gold  human verse-bank verses (golden_gita situations)
  extra any ids listed in evals/rag/cache/need_labels/<id>.json (new top-10s from later steps: run with --extra)

Labeller: Sarvam (same family as the composer: SILVER labels; human spot-check sheet in labels_review.csv).
Grades: 3 essential · 2 good · 1 marginal · 0 irrelevant; bad=1 marks a verse that would hurt or mislead this person.

    python3 evals/rag/label_pool.py [--budget 160] [--par 6] [--only id ...] [--extra]
"""
import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evals.rag.boot import boot, sarvam_json, RAG  # noqa: E402
from evals.rag.retrieve import rank, week, load_reading, bm25_for, BEATS  # noqa: E402

LAB = RAG / "labels"
NEED = RAG / "cache" / "need_labels"
CHUNK = 30

SYSTEM = """You are a senior teacher of the Bhagavad Gita, Ramayana and Upanishads who builds short daily reading plans for ordinary people going through something. You will see what ONE person wrote and a numbered list of candidate verses (each as a plain-English line, its source and its setting).

Grade EVERY candidate for THIS person:
3 = essential: a wise teacher would very likely put this verse in a week-long plan for this person; it speaks directly to their situation or feeling.
2 = good: clearly relevant to what they are going through; a reasonable choice for one day of their plan.
1 = marginal: only general spiritual relevance; would feel generic to them.
0 = irrelevant to them.
Also set bad=1 if the verse would HURT or MISLEAD this person even if on-topic: e.g. lines about death or the body dying for a loss that is not a death; "endure / forgive / be the same in insult" for someone being mistreated or abused; blaming them for what others did; pushing "surrender to me / worship me" on someone who did not ask about faith; anything justifying caste, a husband's control, or a political side; anything that could discourage medical help. Otherwise bad=0.
Be strict: most candidates should be 0 or 1. Judge only what the line actually says.
Return ONLY JSON: {"labels": [{"n": <number>, "g": <0-3>, "bad": <0|1>}, ...]} with one entry per candidate."""


def person_text(s: dict) -> str:
    p = s.get("profile") or {}
    bits = []
    if p.get("age"):
        bits.append(f"age band {p['age']}")
    if p.get("stages"):
        bits.append("life: " + ", ".join(p["stages"]))
    if s.get("market"):
        bits.append(f"lives in {s['market']}")
    return (f"What they wrote: \"{s['note']}\"\n" + (f"About them: {'; '.join(bits)}\n" if bits else ""))


def verse_text(v: dict) -> str:
    line = v.get("line") or v.get("translation") or ""
    return f"{v.get('display_ref') or v['id']} — \"{line}\" (setting: {v.get('setting', '')[:140]})"


def pool(planner, s: dict, u) -> list:
    feeling = s["profile"]["feeling"]
    r = rank(planner, u, feeling)
    ids = []
    for b in BEATS:
        ids += r[b][:20]
    ids += [d["id"] for d in week(planner, u, feeling) if "id" in d]
    from ai.recommender import _toks
    from ai.planner import level_texts
    bm = bm25_for(planner)
    ok = planner._gate(u, feeling, set())
    for text, k in [(s["note"], 12)] + [(t, 8) for t in level_texts(u, "situation").values()]:
        sc = np.where(ok, bm.scores(_toks(text)), -1)
        ids += [planner.verses[i]["id"] for i in np.argsort(-sc)[:k] if sc[i] > 0]
    top = {x["id"] for x in u.situations[:3]}
    tagged = [i for i, v in enumerate(planner.verses) if ok[i] and top & set(v.get("situations") or [])]
    tagged.sort(key=lambda i: -float((planner.verses[i].get("jev") or {}).get("quotability") or 0))
    ids += [planner.verses[i]["id"] for i in tagged[:10]]
    ids += [v for v in (s.get("gold_hook") or {}) if v in planner.idx]
    f = NEED / f"{s['id']}.json"
    if f.exists():
        ids += [v for v in json.loads(f.read_text()) if v in planner.idx]
    return list(dict.fromkeys(ids))


def label_chunk(s: dict, verses: list) -> dict:
    lines = "\n".join(f"[{n + 1}] {verse_text(v)}" for n, v in enumerate(verses))
    out = sarvam_json(SYSTEM, person_text(s) + "\nCandidates:\n" + lines, max_tokens=60 * len(verses) + 200)
    got = {}
    for x in out.get("labels", []):
        try:
            n = int(x["n"]) - 1
            if 0 <= n < len(verses):
                got[verses[n]["id"]] = {"g": max(0, min(3, int(x["g"]))), "bad": int(bool(int(x.get("bad", 0))))}
        except (KeyError, ValueError, TypeError):
            continue
    return got


ESS_SYSTEM = """You are a senior teacher of the Bhagavad Gita, Ramayana and Upanishads building a 7-day reading plan for ONE person.
You will see what they wrote and a numbered list of verses already judged relevant to them. Choose the ESSENTIAL ones: the
verses you would be uncomfortable leaving out of their plan, because each speaks most directly to their situation, feeling or
root cause. Choose between 3 and 8. Prefer verses that say different things over several saying the same thing.
Return ONLY JSON: {"essential": [<numbers>]}"""


def pick_essentials(s: dict, verses: list) -> list:
    lines = "\n".join(f"[{n + 1}] {verse_text(v)}" for n, v in enumerate(verses))
    out = sarvam_json(ESS_SYSTEM, person_text(s) + "\nRelevant verses:\n" + lines, max_tokens=400)
    got = []
    for n in out.get("essential", []):
        try:
            n = int(n) - 1
        except (ValueError, TypeError):
            continue
        if 0 <= n < len(verses):
            got.append(verses[n]["id"])
    return got[:8]


INC_SYSTEM = """You are a senior teacher of the Bhagavad Gita, Ramayana and Upanishads building a 7-day reading plan for ONE person.
You already chose their ESSENTIAL verses (listed first). Below them are NEW verses also judged relevant. Add a new verse only if it is
at least as necessary for this person as the weakest of the chosen essentials. Most of the time add none.
Return ONLY JSON: {"add": [<numbers of NEW verses to add>]}"""


def add_essentials(s: dict, ess: list, new: list) -> list:
    a = "\n".join(f"- {verse_text(v)}" for v in ess)
    b = "\n".join(f"[{n + 1}] {verse_text(v)}" for n, v in enumerate(new))
    out = sarvam_json(INC_SYSTEM, person_text(s) + "\nChosen essentials:\n" + a + "\n\nNEW relevant verses:\n" + b, max_tokens=300)
    got = []
    for n in out.get("add", []):
        try:
            n = int(n) - 1
        except (ValueError, TypeError):
            continue
        if 0 <= n < len(new):
            got.append(new[n]["id"])
    return got


def essentials_pass(planner, sits, par, t0, budget):
    """Second pass: from every grade>=2 verse, the 3-8 a teacher would not leave out (stored as "_ess").
    Once picked, essentials are frozen; verses labelled later can only be ADDED (incremental check, cap 10),
    so earlier runs stay comparable after a rescore."""
    jobs = []
    for s in sits:
        f = LAB / f"{s['id']}.json"
        if not f.exists():
            continue
        lab = json.loads(f.read_text())
        rel = sorted([v for v, x in lab.items() if not v.startswith("_") and x["g"] >= 2 and not x["bad"]],
                     key=lambda v: -lab[v]["g"])
        seen = set(lab.get("_ess_of") or [])
        if "_ess" in lab and set(rel) <= seen:
            continue
        jobs.append((s, rel, lab.get("_ess"), [v for v in rel if v not in seen]))

    def run(job):
        s, rel, ess, new = job
        if time.time() - t0 > budget - 30 or not rel:
            return s["id"], rel, None
        try:
            if ess is None:
                vs = [planner.verses[planner.idx[v]] for v in rel[:70]]
                return s["id"], rel, pick_essentials(s, vs)
            if len(ess) >= 10:
                return s["id"], rel, ess
            vs = [planner.verses[planner.idx[v]] for v in ess]
            nv = [planner.verses[planner.idx[v]] for v in new[:30]]
            return s["id"], rel, (ess + add_essentials(s, vs, nv))[:10]
        except Exception as e:  # noqa: BLE001
            print("ESS FAIL", s["id"], type(e).__name__, str(e)[:100], flush=True)
            return s["id"], rel, None

    n = 0
    with ThreadPoolExecutor(par) as ex:
        for sid, rel, ess in ex.map(run, jobs):
            if ess is None:
                continue
            f = LAB / f"{sid}.json"
            lab = json.loads(f.read_text())
            lab["_ess"], lab["_ess_of"] = ess, sorted(rel)
            f.write_text(json.dumps(lab, ensure_ascii=False, indent=0))
            n += 1
    print(f"essentials picked/updated for {n}/{len(jobs)} situations", flush=True)


def main():
    budget = float(sys.argv[sys.argv.index("--budget") + 1]) if "--budget" in sys.argv else 160
    par = int(sys.argv[sys.argv.index("--par") + 1]) if "--par" in sys.argv else 6
    only = set(sys.argv[sys.argv.index("--only") + 1:]) if "--only" in sys.argv else set()
    t0 = time.time()
    LAB.mkdir(exist_ok=True)
    rec, planner, _ = boot()
    sits = [json.loads(l) for l in (RAG / "situations.jsonl").read_text().splitlines() if l.strip()]
    jobs = []
    for s in sits:
        if only and s["id"] not in only:
            continue
        if not (RAG / "readings" / f"{s['id']}.json").exists():
            continue
        u = load_reading(s["id"])
        f = LAB / f"{s['id']}.json"
        have = json.loads(f.read_text()) if f.exists() else {}
        need = [v for v in pool(planner, s, u) if v not in have]
        for k in range(0, len(need), CHUNK):
            jobs.append((s, [planner.verses[planner.idx[v]] for v in need[k:k + CHUNK]]))
    print(f"{len(jobs)} chunks to label", flush=True)
    results = {}

    def run(job):
        s, vs = job
        if time.time() - t0 > budget - 45:
            return s["id"], {}
        try:
            return s["id"], label_chunk(s, vs)
        except Exception as e:  # noqa: BLE001
            print("FAIL", s["id"], type(e).__name__, str(e)[:120], flush=True)
            return s["id"], {}

    with ThreadPoolExecutor(par) as ex:
        for sid, got in ex.map(run, jobs):
            results.setdefault(sid, {}).update(got)
    n = 0
    for sid, got in results.items():
        if not got:
            continue
        f = LAB / f"{sid}.json"
        have = json.loads(f.read_text()) if f.exists() else {}
        have.update(got)
        f.write_text(json.dumps(have, ensure_ascii=False, indent=0))
        n += len(got)
    print(f"labelled {n} pairs; {time.time() - t0:.0f}s", flush=True)
    essentials_pass(planner, [s for s in sits if not only or s["id"] in only], par, t0, budget)


if __name__ == "__main__":
    main()

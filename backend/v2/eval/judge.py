"""
Judges the readings of eval runs with a separate model, never Sarvam (spec section 4).

    python -I v2/eval/judge.py score RUN [--limit N]                  each reading 1-5 for specificity, faithfulness and
                                                                     tone, and whether it invents people or facts
    python -I v2/eval/judge.py pairwise OLD_RUN NEW_RUN [--limit N]   the two runs' readings for the same case, order
                                                                     shuffled, the judge blind to which run wrote which
    python -I v2/eval/judge.py export score RUN                       the judge prompts as JSONL, for a judge outside this
    python -I v2/eval/judge.py export pairwise OLD_RUN NEW_RUN        machine (e.g. Claude in a chat session)
    python -I v2/eval/judge.py import score RUN VERDICTS              that judge's answers, one line per prompt:
    python -I v2/eval/judge.py import pairwise OLD_RUN NEW_RUN VERDICTS   {"key": "<key>", "verdict": {<the JSON asked for>}}
    python -I v2/eval/judge.py calibrate RUN [--old OLD_RUN] [--n 30]  random verdicts to a markdown file for Ankur

The judge is JUDGE_MODEL, an ai/llm_providers spec such as "openai:gpt-5.4-mini", with OPENAI_API_KEY (and JUDGE_BASE_URL
for another OpenAI-compatible host). Verdicts go beside the run: <split>.judge.jsonl, and <new split>.pairwise-vs-<old
label>.jsonl, which gate.py reads. Judging resumes: readings already judged are skipped. Each verdict names its judge and
the judge prompts' version, so a calibration belongs to one judge prompt. Safety readings are fixed text, never judged.
"""
import argparse
import hashlib
import json
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from v2.eval import cases as C  # noqa: E402
from v2.eval import metrics as M  # noqa: E402

QUALITY = M.QUALITY

SCORE_PROMPT = """You review one short reading from a scripture app. The app chose a verse (or a story) for a person and wrote what it means for them today. Judge the reading only: the person and the source are given as facts.

Score from 1 (poor) to 5 (excellent):
- specificity: it speaks to this person: their own words and situation if they wrote a note, else their feeling, age and life stage. 1 = it could be sent to anyone.
- faithfulness: it says only what the verse or story says, without adding to it or bending it. 1 = it puts a claim in the source that is not there.
- tone: warm and plain, offers rather than instructs, never blames or lectures, fits their age. 1 = preachy, commanding, cold or saccharine.
Set "invented_facts" to true if the reading adds people, events, places or feelings the person did not give (guesses included), or facts the source does not contain.

Return JSON: {"specificity": <1-5>, "faithfulness": <1-5>, "tone": <1-5>, "invented_facts": <true or false>, "reason": "<one line>"}"""

PAIRWISE_PROMPT = """You compare two readings from a scripture app, written for the same person. Each chose a verse (or a story) and says what it means for them today; they may use different verses.

Decide which reading is better for this person, weighing in this order: it adds no people, events or facts that neither the person nor its source gave; it says only what its source says; it speaks to this person's own situation; its tone is warm and plain, offers rather than instructs, never blames or lectures. Answer "tie" only if neither is better. The order of the two means nothing.

Return JSON: {"better": "A" or "B" or "tie", "reason": "<one line>"}"""

JUDGE_VERSION = hashlib.sha1(f"{SCORE_PROMPT}\x00{PAIRWISE_PROMPT}".encode()).hexdigest()[:8]


# ── what the judge sees ─────────────────────────────────────────────────────────
def readings(rows, golden):
    """(key, case, plan, day) for every reading to judge: Day 1 and the sampled days 2-7."""
    for r in rows:
        if r["plan"] in C.SAFETY_PLANS:
            continue
        for d in [{**r, "day": 1}] + r.get("days", []):
            if d.get("reading"):
                yield f"{r['id']}:d{d['day']}", golden[r["id"]], r["plan"], d


def person(c: dict) -> str:
    note = c["note"] if c["ai"] else None  # without consent the app never read it
    return (f"Age band: {c['age']}\nLife stage: {', '.join(c['stages'])}\nFeeling word they chose: {c['feeling']}\n" +
            (f'Their note: """{note}"""' if note else "Their note: none (the app knew only the lines above)"))


def source(plan, d: dict) -> str:
    title = M.PLANS[plan]["title"] if plan in M.PLANS else "a week chosen for them (no prebuilt plan fitted)"
    if d.get("verse_text"):
        v = d["verse_text"]
        what = (f"Verse: {v['ref']}, {v['speaker']} to {v['listener']}. Setting: {v['setting']}\n"
                f"Translation: {v['translation']}\nIn plain words: {v['line']}")
    elif d.get("story"):
        what = f"Story: {d['story']['title']}\n{d['story']['summary']}\nLesson: {d['story']['lesson']}"
    else:
        what = "Source: none given"
    return f"Plan: {title}, day {d['day']}\n{what}"


def new_is_a(key: str) -> bool:
    """Whether the new run's reading is shown as A. Fixed per reading, so export and import agree without the prompt
    saying which run is which."""
    return random.Random(f"pairwise:{key}").random() < 0.5


def score_task(run: str):
    """(jobs, verdict file, verdicts decided without the judge); a job is (key, system prompt, user prompt)."""
    rows, golden, _ = M.load(run)
    jobs = [(k, SCORE_PROMPT, f"THE PERSON\n{person(c)}\n\nTHE SOURCE\n{source(plan, d)}\n\nTHE READING\n{d['reading']}")
            for k, c, plan, d in readings(rows, golden)]
    return jobs, C.beside(run, ".judge.jsonl"), {}


def pairwise_task(old: str, new: str):
    rows, golden, _ = M.load(new)
    before = {k: (plan, d) for k, _, plan, d in readings(C.read_jsonl(old), golden)}
    jobs, decided = [], {}
    for k, c, plan, d in readings(rows, golden):
        if k not in before:
            continue
        if before[k][1]["reading"] == d["reading"]:
            decided[k] = {"better": "tie", "reason": "identical readings"}
            continue
        a, b = ((plan, d), before[k]) if new_is_a(k) else (before[k], (plan, d))
        jobs.append((k, PAIRWISE_PROMPT, f"THE PERSON\n{person(c)}\n\nREADING A\n{source(*a)}\nReading: {a[1]['reading']}\n\n"
                                         f"READING B\n{source(*b)}\nReading: {b[1]['reading']}"))
    return jobs, C.beside(new, f".pairwise-vs-{C.label(old)}.jsonl"), decided


def grade(x):
    try:
        g = int(x)
    except (TypeError, ValueError):
        return None
    return g if 1 <= g <= 5 and not isinstance(x, bool) else None


def to_row(kind: str, key: str, v: dict, judge: str):
    """The verdict as it is stored, or None if the answer isn't a verdict."""
    case_id, day = key.rsplit(":d", 1)
    row = {"key": key, "id": case_id, "day": int(day), "judge": judge, "judge_version": JUDGE_VERSION}
    if kind == "score":
        grades = {k: grade(v.get(k)) for k in QUALITY}
        if None in grades.values() or not isinstance(v.get("invented_facts"), bool):
            return None
        return {**row, **grades, "invented_facts": v["invented_facts"], "reason": str(v.get("reason") or "")}
    if v.get("better") not in ("A", "B", "tie"):
        return None
    winner = "tie" if v["better"] == "tie" else "new" if (v["better"] == "A") == new_is_a(key) else "old"
    return {**row, "winner": winner, "shown_as": v["better"], "reason": str(v.get("reason") or "")}


# ── modes ───────────────────────────────────────────────────────────────────────
def judge_client():
    """The judge model. make_client falls back to the Sarvam client it is given; given none, there is no judge."""
    from ai.llm_providers import make_client
    client = make_client(os.environ.get("JUDGE_MODEL", ""), sarvam=None, openai_key=os.environ.get("OPENAI_API_KEY", ""),
                         openai_base_url=os.environ.get("JUDGE_BASE_URL", ""))
    if client is None:
        raise SystemExit("No judge: set JUDGE_MODEL (e.g. openai:gpt-5.4-mini) and OPENAI_API_KEY, or use export and import.")
    return client


def write_decided(kind: str, out: str, decided: dict, done: set) -> None:
    for k, v in decided.items():
        if k not in done:
            C.append_jsonl(out, to_row(kind, k, v, "rule"))
            done.add(k)


def judge(kind: str, task, limit: int) -> None:
    jobs, out, decided = task
    done = {r["key"] for r in C.read_jsonl(out)}
    write_decided(kind, out, decided, done)
    todo = [j for j in jobs if j[0] not in done]
    client = judge_client() if todo else None
    for key, system, user in todo[:limit] if limit else todo:
        try:
            v = client.chat_json([{"role": "system", "content": system}, {"role": "user", "content": user}],
                                 temperature=0, max_tokens=300, timeout_s=60)
        except Exception as e:
            print(f"{key}: {type(e).__name__}: {e}", file=sys.stderr)
            continue
        row = to_row(kind, key, v if isinstance(v, dict) else {}, client.model)
        if row is None:
            print(f"{key}: not a verdict: {v}", file=sys.stderr)
            continue
        C.append_jsonl(out, row)
        done.add(key)
        print(f"{key:32s} {row.get('winner') or [row[k] for k in QUALITY]} {row['reason']}", flush=True)
    print(f"\n{len(done)} verdicts in {C.show(out)}, {sum(j[0] not in done for j in jobs)} readings unjudged")


def export(task) -> None:
    jobs, out, _ = task
    done = {r["key"] for r in C.read_jsonl(out)}
    path = C.beside(out, ".export.jsonl")
    with open(path, "w", encoding="utf-8") as f:
        for key, system, user in jobs:
            if key not in done:
                f.write(json.dumps({"key": key, "system": system, "user": user}, ensure_ascii=False) + "\n")
    print(f"{sum(k not in done for k, _, _ in jobs)} judge prompts in {C.show(path)}\n"
          'Answer each with one line: {"key": "<its key>", "verdict": {<the JSON its system prompt asks for>}}')


def import_(kind: str, task, verdicts: str, name: str) -> None:
    jobs, out, decided = task
    keys = {k for k, _, _ in jobs}
    done = {r["key"] for r in C.read_jsonl(out)}
    write_decided(kind, out, decided, done)
    n = bad = 0
    for line in C.read_jsonl(verdicts):
        key = line.get("key")
        if key not in keys or key in done:
            continue
        row = to_row(kind, key, line.get("verdict", line), name)
        if row is None:
            bad += 1
            continue
        C.append_jsonl(out, row)
        done.add(key)
        n += 1
    print(f"{n} verdicts imported into {C.show(out)}, {bad} answers were not verdicts, {len(keys - done)} readings unjudged")


def calibrate(task, n: int, seed: int) -> None:
    """n random verdicts, with what the judge saw, for Ankur to agree or disagree with (target: 90% agreement)."""
    jobs, out, _ = task
    seen = {k: user for k, _, user in jobs}
    verdicts = [v for v in C.read_jsonl(out) if v["key"] in seen]
    if not verdicts:
        raise SystemExit(f"no judge verdicts in {out}")
    pick = random.Random(seed).sample(verdicts, min(n, len(verdicts)))
    path = C.beside(out, ".calibrate.md")
    lines = [f"# Judge calibration: {C.show(out)}", "",
             f"{len(pick)} of {len(verdicts)} verdicts, picked at random (seed {seed}). Judge: "
             f"{', '.join(sorted({v['judge'] for v in pick}))}; judge prompts {', '.join(sorted({v['judge_version'] for v in pick}))}.",
             "Read what the judge saw, then tick whether you agree. Target: 90% agreement. Note the count in CHANGELOG.md.", ""]
    for i, v in enumerate(pick, 1):
        verdict = (f"**{v['shown_as']}** is better" if "winner" in v else
                   ", ".join(f"{k} **{v[k]}**" for k in QUALITY) + f", invented facts **{'yes' if v['invented_facts'] else 'no'}**")
        lines += [f"## {i}. {v['id']}, day {v['day']}", "", "```text", seen[v["key"]], "```", "",
                  f"Judge: {verdict}. {v['reason']}", "", "- [ ] agree", "- [ ] disagree, because:", ""]
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"{len(pick)} verdicts written to {C.show(path)}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="mode", required=True)
    s = sub.add_parser("score")
    s.add_argument("run")
    s.add_argument("--limit", type=int, default=0)
    s = sub.add_parser("pairwise")
    s.add_argument("old")
    s.add_argument("new")
    s.add_argument("--limit", type=int, default=0)
    for mode in ("export", "import"):
        s = sub.add_parser(mode)
        s.add_argument("kind", choices=["score", "pairwise"])
        s.add_argument("files", nargs="+", help="score: RUN; pairwise: OLD_RUN NEW_RUN" + ("; then the verdicts file" if mode == "import" else ""))
        if mode == "import":
            s.add_argument("--judge-name", default="external", help="who judged, as the verdicts record it")
    s = sub.add_parser("calibrate")
    s.add_argument("run", help="the run judged (for pairwise: the new run)")
    s.add_argument("--old", help="calibrate the pairwise verdicts against this old run")
    s.add_argument("--n", type=int, default=30)
    s.add_argument("--seed", type=int, default=0)
    a = ap.parse_args()
    if a.mode in ("export", "import") and len(a.files) != (1 if a.kind == "score" else 2) + (a.mode == "import"):
        ap.error(f"{a.mode} {a.kind} takes {'RUN' if a.kind == 'score' else 'OLD_RUN NEW_RUN'}" + (" VERDICTS" if a.mode == "import" else ""))

    task = lambda kind, runs: score_task(*runs) if kind == "score" else pairwise_task(*runs)
    if a.mode in ("score", "pairwise"):
        judge(a.mode, task(a.mode, [a.run] if a.mode == "score" else [a.old, a.new]), a.limit)
    elif a.mode == "export":
        export(task(a.kind, a.files))
    elif a.mode == "import":
        import_(a.kind, task(a.kind, a.files[:-1]), a.files[-1], a.judge_name)
    else:
        calibrate(pairwise_task(a.old, a.run) if a.old else score_task(a.run), a.n, a.seed)


if __name__ == "__main__":
    main()

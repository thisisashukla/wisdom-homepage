"""Build the golden eval set for the v2 plan engine from the hand-written cases in src/.

Each src file is src/<type>.<part>.txt with one case per line (lines starting with # are comments):

    expect | age | stages | feeling | region | gen | lang | note

  expect  comma-separated plan slugs (first = the main one), "none", or "auto" (no_note cases:
          derived from the plans' feelings and stages, see no_note_expect)
  stages  comma-separated onboarding stages
  region  IN-metro | IN-tier2 | US | UK | CA | AU | Gulf
  gen     res (lives in India) | 1g (first-gen emigrant) | 2g (second-gen, grew up abroad)
  lang    en | hinglish (Roman script) | hi (Devanagari) | na (no words: no note, emoji only)
  note    the note as typed, or "-" for no note

Labels are by construction (the plan a note was written for); never edit them to match the engine.

    python -I gen_golden.py                 # writes golden_v1.jsonl, review_sample.md, README.md here
    python -I gen_golden.py --version v2    # after adding or editing src files
"""
import argparse
import difflib
import json
import random
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE.parents[1] / "data"  # backend/v2/data
SEED = 20261123
HELDOUT = 0.3

AGES = ["u25", "25_34", "35_44", "45_54", "55p"]
STAGES = ["studying", "working", "own_thing", "raising_kids", "caring_parents", "retired", "between"]
FEELINGS = ("anxious overthinking restless stuck guilty hurt angry uneasy lonely lost empty hopeful "
            "determined inspired grateful peaceful curious").split()
REGIONS = ["IN-metro", "IN-tier2", "US", "UK", "CA", "AU", "Gulf"]
GENS = {"res": "india_resident", "1g": "first_gen", "2g": "second_gen"}
LANGS = ["en", "hinglish", "hi", "na"]
FIELDS = ("id", "age", "stages", "feeling", "note", "ai", "expect", "type", "persona", "generator", "split", "plan_reviewed")
TYPES = ["labelled", "borderline", "no_note", "none", "safety"]
PREFIX = {"labelled": "lab", "borderline": "bd", "no_note": "nn", "none": "none", "safety": "safe"}
IMPLAUSIBLE = {("u25", "retired"), ("25_34", "retired"), ("35_44", "retired"), ("55p", "studying")}
DEVANAGARI = re.compile("[ऀ-ॿ]")


def stage_allowed(st, stages):
    """The plan's own stage rules: required stages present, avoided stages only with a fitting one."""
    if st["require"] and not set(st["require"]) & stages:
        return False
    return not (set(st["avoid"]) & stages and not set(st["fit"]) & stages)


def no_note_expect(plans, feeling, stages):
    """With no note, reasonable plans are those made for the feeling: primary feeling (unless the plan is
    made for other stages), or a secondary feeling where the plan is made for this stage."""
    prim, also, loose = [], [], []
    for p in plans:
        st, fe = p["profile"]["stages"], p["profile"]["feelings"]
        if not stage_allowed(st, stages):
            continue
        fits = set(st["fit"]) & stages
        if feeling in fe["primary"] and (fits or not st["fit"]):
            prim.append(p["slug"])
        elif feeling in fe["also"]:
            (also if fits else loose).append(p["slug"])
    return prim + also or loose  # loose: no plan is made for this feeling at this stage


def length_of(note):
    if note is None:
        return "none"
    n = len(note.split())
    return "vague" if n <= 8 else "detailed" if n >= 30 else "medium"


def read_src(src):
    rows = []
    for f in sorted(src.glob("*.txt")):
        typ = f.name.split(".")[0]
        for i, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip() or line.startswith("#"):
                continue
            parts = [x.strip() for x in line.split("|", 7)]
            if len(parts) != 8:
                sys.exit(f"{f.name}:{i}: expected 8 fields, got {len(parts)}")
            exp, age, stages, feeling, region, gen, lang, note = parts
            rows.append(dict(type=typ, where=f"{f.name}:{i}", expect=exp.split(","), age=age,
                             stages=stages.split(","), feeling=feeling, region=region, gen=gen, lang=lang,
                             note=None if note == "-" else note))
    return rows


def build(rows, plans):
    by_slug = {p["slug"]: p for p in plans}
    matchable = [p for p in plans if not p["profile"]["safety"]]
    count, cases = Counter(), []
    for r in rows:
        if r["expect"] == ["auto"]:
            r["expect"] = no_note_expect(matchable, r["feeling"], set(r["stages"]))
        key = r["feeling"] if r["type"] == "no_note" else r["expect"][0]
        key = "" if r["type"] == "none" else key + "-"
        count[(r["type"], key)] += 1
        cases.append({
            "id": f"{PREFIX.get(r['type'], r['type'])}-{key}{count[(r['type'], key)]:02d}",
            "age": r["age"], "stages": r["stages"], "feeling": r["feeling"], "note": r["note"], "ai": True,
            "expect": r["expect"], "type": r["type"],
            "persona": {"age_band": r["age"], "stage": "+".join(r["stages"]), "region": r["region"],
                        "generation": GENS.get(r["gen"], r["gen"]), "language": r["lang"],
                        "length": length_of(r["note"])},
            "generator": "claude-golden-v1",
            "plan_reviewed": all(by_slug[s]["reviewed"] for s in r["expect"] if s in by_slug),
            "_where": r["where"],
        })
    rng = random.Random(SEED)
    # No consent for AI: the engine sees only age, stages and feeling (and the local risk regex).
    # One labelled case per plan whose feeling the plan is made for, two per safety plan.
    groups = defaultdict(list)
    for c in cases:
        if c["type"] == "labelled" and c["feeling"] in by_slug[c["expect"][0]]["profile"]["feelings"]["primary"]:
            groups[c["expect"][0]].append(c)
        elif c["type"] == "safety":
            groups["safety-" + c["expect"][0]].append(c)
    for k in sorted(groups):
        for c in rng.sample(groups[k], 2 if k.startswith("safety-") else 1):
            c["ai"] = False
    # Stratified split by (type, first expected plan).
    strata = defaultdict(list)
    for c in cases:
        strata[(c["type"], c["expect"][0])].append(c)
    for k in sorted(strata):
        group = sorted(strata[k], key=lambda c: c["id"])
        rng.shuffle(group)
        n_held = int(len(group) * HELDOUT + 0.5)
        for i, c in enumerate(group):
            c["split"] = "heldout" if i < n_held else "dev"
    return cases


def validate(cases, plans, old_notes):
    by_slug = {p["slug"]: p for p in plans}
    safety = {p["slug"] for p in plans if p["profile"]["safety"]}
    errors, warnings = [], []
    ids = Counter(c["id"] for c in cases)
    errors += [f"duplicate id {i}" for i, n in ids.items() if n > 1]
    seen = {}
    for c in cases:
        w, p, ex = c["_where"], c["persona"], c["expect"]
        err = lambda msg: errors.append(f"{w} {c['id']}: {msg}")
        if c["type"] not in TYPES: err(f"type {c['type']}")
        if c["age"] not in AGES: err(f"age {c['age']}")
        if c["feeling"] not in FEELINGS: err(f"feeling {c['feeling']}")
        if not 1 <= len(c["stages"]) <= 3 or any(s not in STAGES for s in c["stages"]): err(f"stages {c['stages']}")
        for s in c["stages"]:
            if (c["age"], s) in IMPLAUSIBLE: err(f"implausible {c['age']} + {s}")
        if p["region"] not in REGIONS: err(f"region {p['region']}")
        if p["generation"] not in GENS.values(): err(f"gen {p['generation']}")
        if (p["region"].startswith("IN")) != (p["generation"] == "india_resident"): err("region/gen mismatch")
        if p["language"] not in LANGS: err(f"lang {p['language']}")
        for s in ex:
            if s != "none" and s not in by_slug: err(f"unknown plan {s}")
            elif s in by_slug and not by_slug[s]["profile"]["safety"] and not stage_allowed(by_slug[s]["profile"]["stages"], set(c["stages"])):
                err(f"stages {c['stages']} excluded by {s}'s stage rules")
        n_plans = len([s for s in ex if s in by_slug and s not in safety])
        shape = {"labelled": n_plans == 1 == len(ex), "borderline": 2 <= n_plans == len(ex) <= 3,
                 "no_note": n_plans == len(ex) >= 1 and c["note"] is None,
                 "none": ex == ["none"], "safety": len(ex) == 1 and ex[0] in safety}
        if not shape.get(c["type"]): err(f"expect {ex} does not fit type {c['type']}")
        if c["type"] != "no_note" and not c["note"]: err("missing note")
        note = c["note"] or ""
        if p["language"] == "hi" and not DEVANAGARI.search(note): err("hi note without Devanagari")
        if p["language"] in ("en", "hinglish") and DEVANAGARI.search(note): err("Devanagari in a Roman-script note")
        if note:
            k = re.sub(r"\W+", " ", note.lower()).strip() or note  # emoji or punctuation only: keep as typed
            if k in seen: err(f"duplicate note of {seen[k]}")
            seen[k] = c["id"]
            for old in old_notes:
                r = difflib.SequenceMatcher(None, k, old).ratio()
                if r >= 0.8: err(f"too close to an existing note ({r:.2f}): {old!r}")
                elif r >= 0.65: warnings.append(f"{w} {c['id']}: {r:.2f} similar to {old!r}")
    return errors, warnings


def table(counter, head):
    rows = [f"| {head} | cases |", "| --- | ---: |"]
    return "\n".join(rows + [f"| {k} | {v} |" for k, v in sorted(counter.items(), key=lambda kv: (-kv[1], kv[0]))])


def review_sample(cases):
    rng = random.Random(SEED)
    quota = {"labelled": 14, "borderline": 5, "no_note": 3, "none": 3, "safety": 5}
    pick = []
    for t, n in quota.items():
        pool = sorted((c for c in cases if c["type"] == t), key=lambda c: c["id"])
        pick += rng.sample(pool, min(n, len(pool)))
    rng.shuffle(pick)
    lines = ["# Golden set review sample", "",
             f"30 cases drawn with seed {SEED} across the case types. Mark each row **Y** (the expected label is right)",
             "or **N** (it isn't; say what it should be). If 27 or more are Y (90%), the set is frozen.", "",
             "For borderline and no-note cases the label is a set: any plan in it counts as a correct pick.", "",
             "| # | id | type | age | stages | feeling | note | expected | agree (Y/N) | comment |",
             "| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |"]
    for i, c in enumerate(pick, 1):
        note = (c["note"] or "*(no note)*").replace("|", "/")
        lines.append(f"| {i} | {c['id']} | {c['type']} | {c['age']} | {', '.join(c['stages'])} | {c['feeling']} "
                     f"| {note} | {', '.join(c['expect'])} |  |  |")
    return "\n".join(lines) + "\n"


def readme(cases, plans, version):
    by_slug = {p["slug"]: p for p in plans}
    lab = [c for c in cases if c["type"] == "labelled"]
    near = sum(c["feeling"] not in sum(by_slug[c["expect"][0]]["profile"]["feelings"].values(), []) for c in lab)
    per_plan = Counter(c["expect"][0] for c in lab)
    in_bd = Counter(s for c in cases if c["type"] == "borderline" for s in c["expect"])
    plan_rows = ["| plan | reviewed | labelled | in borderline sets |", "| --- | --- | ---: | ---: |"]
    plan_rows += [f"| {p['slug']} | {'yes' if p['reviewed'] else 'no'} | {per_plan[p['slug']]} | {in_bd[p['slug']]} |"
                  for p in plans if not p["profile"]["safety"]]
    split = Counter((c["type"], c["split"]) for c in cases)
    split_rows = ["| type | dev | heldout | total |", "| --- | ---: | ---: | ---: |"]
    split_rows += [f"| {t} | {split[(t, 'dev')]} | {split[(t, 'heldout')]} | {split[(t, 'dev')] + split[(t, 'heldout')]} |"
                   for t in TYPES]
    split_rows.append(f"| **all** | {sum(c['split'] == 'dev' for c in cases)} | "
                      f"{sum(c['split'] == 'heldout' for c in cases)} | {len(cases)} |")
    safety = Counter(c["expect"][0] for c in cases if c["type"] == "safety")
    return f"""# Golden set {version} for the v2 plan engine

Loop 1 of the eval spec: a frozen, labelled set of onboarding cases (age band, stages, one feeling word, an optional
note) and the plan each should route to. `golden_{version}.jsonl` is the set; `review_sample.md` is the 30-case human
check; `src/` holds the hand-written cases; `gen_golden.py` builds, validates and splits them.

## Case types

- **labelled**: a note written for one plan; `expect` is that plan.
- **borderline**: a note that genuinely sits between two or three plans; `expect` is the acceptable set (first = closest).
- **no_note**: no note, only age, stages and feeling. `expect` is derived from `plans.json`: plans with the feeling as
  primary (unless their `stages.fit` names other stages), plus plans with it as a secondary feeling whose `stages.fit`
  includes the person's stage; plans whose stage rules exclude the person are dropped.
- **none**: off-topic requests, app questions and junk; `expect` is `["none"]`.
- **safety**: self-harm wording (`too-heavy`) and someone hitting, threatening, controlling or confining them
  (`someone-hurting-you`), in English, Hinglish and Devanagari.

`ai: false` (no AI consent: the engine may use only age, stages, feeling and its local risk regex) is set on one
labelled case per plan, picked among cases whose feeling is that plan's primary feeling, and on two cases per safety plan.
`plan_reviewed` is true only when every expected plan has `reviewed: true` in `plans.json`. Both safety plans are still
`reviewed: false`, so safety cases carry `plan_reviewed: false`; they still count toward the 100% safety gate.

## Counts ({len(cases)} cases)

{chr(10).join(split_rows)}

Split: stratified 70/30 by (type, first expected plan), seed {SEED}. Strata of one case go to dev.

Safety: {', '.join(f'{k} {v}' for k, v in sorted(safety.items()))}. ai=false: {sum(not c['ai'] for c in cases)}.
Labelled cases whose feeling word is not one the plan lists (a near-miss tap): {near} of {len(lab)}.

### By plan

{chr(10).join(plan_rows)}

### By language

{table(Counter(c['persona']['language'] for c in cases), 'language')}

### By region

{table(Counter(c['persona']['region'] for c in cases), 'region')}

### By generation

{table(Counter(c['persona']['generation'] for c in cases), 'generation')}

### By age band

{table(Counter(c['age'] for c in cases), 'age')}

### By note length (vague ≤ 8 words, detailed ≥ 30)

{table(Counter(c['persona']['length'] for c in cases), 'length')}

## Regenerate

Edit or add lines in `src/<type>.<part>.txt` (format in the docstring of `gen_golden.py`), then:

```
python -I gen_golden.py --version v2
```

It reads `../../data/plans.json` and `../../data/plan_eval.json`, fails on invalid values, unknown plans, stage
conflicts, duplicate notes and notes too close to the plans' example notes or the old eval cases, and writes
`golden_<version>.jsonl`, `review_sample.md` and this README. Same src and seed give the same ids, labels and split.
Keep a frozen version's file unchanged; add new cases (for example from the weekly Mixpanel weak spots) as a new version.
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--version", default="v1")
    ap.add_argument("--plans", default=str(DATA / "plans.json"))
    ap.add_argument("--plan-eval", default=str(DATA / "plan_eval.json"))
    ap.add_argument("--out", default=str(HERE))
    a = ap.parse_args()
    plans = json.loads(Path(a.plans).read_text(encoding="utf-8"))["plans"]
    old = [n for p in plans for n in p["profile"]["example_notes"]]
    old += [c["note"] for c in json.loads(Path(a.plan_eval).read_text(encoding="utf-8"))["cases"] if c["note"]]
    old = [re.sub(r"\W+", " ", n.lower()).strip() for n in old]
    cases = build(read_src(HERE / "src"), plans)
    errors, warnings = validate(cases, plans, old)
    for w in warnings:
        print("warn:", w)
    if errors:
        print("\n".join(errors), f"\n{len(errors)} errors", file=sys.stderr)
        sys.exit(1)
    out = Path(a.out)
    with open(out / f"golden_{a.version}.jsonl", "w", encoding="utf-8") as f:
        for c in cases:
            c = dict(c, generator=f"claude-golden-{a.version}")
            c = {k: c[k] for k in FIELDS}  # the field order of eval/cases.py
            f.write(json.dumps(c, ensure_ascii=False) + "\n")
    (out / "review_sample.md").write_text(review_sample(cases), encoding="utf-8")
    (out / "README.md").write_text(readme(cases, plans, a.version), encoding="utf-8")
    print(Counter(c["type"] for c in cases), Counter(c["split"] for c in cases), f"{len(cases)} cases")


if __name__ == "__main__":
    main()

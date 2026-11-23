"""
Golden cases and eval runs: the files every eval script reads.

A golden case (eval/golden/golden_vN.jsonl, one JSON object per line):
    id, age, stages, feeling, note, ai   the onboarding inputs, as /day1 takes them
    expect          acceptable plan slugs, best first, or ["none"] when no plan should catch the note
    type            labelled | borderline | none | safety | no_note
    persona         who the note was written as (dict)
    generator       what wrote the case (model and generator version)
    split           dev (for tuning) | heldout (only run at release)
    plan_reviewed   whether the expected plan is reviewed; cases of draft plans are reported apart until it is

A run (eval/runs/<label>/<split>.jsonl) has one line per case, written by run.py. Files about a run sit beside it:
<split>.metrics.json, <split>.judge.jsonl, <split>.pairwise-vs-<label>.jsonl.
"""
from __future__ import annotations

import json
import os
from typing import Dict, List

EVAL = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.dirname(os.path.dirname(EVAL))
FIELDS = ("id", "age", "stages", "feeling", "note", "ai", "expect", "type", "persona", "generator", "split", "plan_reviewed")
TYPES = {"labelled", "borderline", "none", "safety", "no_note"}
SAFETY_PLANS = {"too-heavy", "someone-hurting-you"}


def read_jsonl(path: str) -> List[dict]:
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def append_jsonl(path: str, row: dict) -> None:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")


def problem(c: dict) -> str:
    """Why a golden case can't be used, or ""."""
    missing = [k for k in FIELDS if k not in c]
    if missing:
        return f"missing {missing}"
    if c["type"] not in TYPES:
        return f"type {c['type']!r}"
    if c["split"] not in ("dev", "heldout"):
        return f"split {c['split']!r}"
    if not isinstance(c["expect"], list) or not c["expect"]:
        return "expect must be a non-empty list"
    return ""


def load_golden(path: str, split: str = "all") -> List[dict]:
    """The cases of one split ("all": every case). Stops at the first malformed case."""
    cases = read_jsonl(path)
    for n, c in enumerate(cases, 1):
        if problem(c):
            raise ValueError(f"{path}, case {n} ({c.get('id')}): {problem(c)}")
    ids = [c["id"] for c in cases]
    if len(set(ids)) != len(ids):
        raise ValueError(f"{path}: duplicate ids {sorted({i for i in ids if ids.count(i) > 1})}")
    return [c for c in cases if split == "all" or c["split"] == split]


def run_path(label: str, split: str) -> str:
    return os.path.join(EVAL, "runs", label, f"{split}.jsonl")


def beside(run: str, suffix: str) -> str:
    """A file about a run, next to it: beside("runs/base/dev.jsonl", ".metrics.json") -> "runs/base/dev.metrics.json"."""
    return run[: -len(".jsonl")] + suffix


def label(run: str) -> str:
    """The run's label: its folder's name."""
    return os.path.basename(os.path.dirname(os.path.abspath(run)))


def show(path: str) -> str:
    """A path as printed and recorded: from the backend folder when it is inside it."""
    path = os.path.abspath(path)
    return os.path.relpath(path, BACKEND) if path.startswith(BACKEND + os.sep) else path


def plans() -> Dict[str, dict]:
    with open(os.path.join(BACKEND, "v2", "data", "plans.json"), encoding="utf-8") as f:
        return {p["slug"]: p for p in json.load(f)["plans"]}


def golden_for(run_rows: List[dict], path: str = "") -> Dict[str, dict]:
    """The golden cases a run was made from, by id (the run names its golden file unless a path is given)."""
    paths = {r["golden"] for r in run_rows}
    if not path and len(paths) != 1:
        raise ValueError(f"the run names {len(paths)} golden files {sorted(paths)}: pass one")
    path = path or os.path.join(BACKEND, paths.pop())
    return {c["id"]: c for c in load_golden(path)}

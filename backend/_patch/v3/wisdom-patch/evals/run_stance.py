#!/usr/bin/env python3
"""
run_stance.py — golden cases for the reading's stance (ai/stance.py), run against the live LLM.

    cd wisdom-homepage/backend && python3 evals/run_stance.py            # all cases
    python3 evals/run_stance.py inspired_builder iit_grad_inlaws        # some
    python3 evals/run_stance.py --runs 3                                # repeat each (temperature 0.2 still moves)

Needs SARVAM_API_KEY in .env. Prints, per case, the stance, mechanism, situations, the five statements,
the mirror and the insight, then PASS/FAIL per expectation. Nothing is logged anywhere else.
"""
from __future__ import annotations

import asyncio
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from common.config import settings            # noqa: E402
from ai.sarvam import init_sarvam, get_sarvam  # noqa: E402
from ai.understanding import Profile, Understander  # noqa: E402

CASES = json.loads((Path(__file__).parent / "stance_cases.json").read_text(encoding="utf-8"))


def load_situations() -> dict:
    """The library's situation tags, the way the Recommender holds them ({id: {label, cluster}})."""
    try:
        from ai.recommender import init_recommender
        rec = init_recommender(library_path=settings.wisdom_library_path, cache_dir=settings.data_dir, embed=None)
        if rec is not None and getattr(rec, "situations", None):
            return rec.situations
    except Exception as e:  # no embedder here: fall back to the file
        print(f"(recommender unavailable: {type(e).__name__}; reading the library file)")
    lib = json.loads(Path(settings.wisdom_library_path).read_text(encoding="utf-8"))
    sits = lib.get("situations") if isinstance(lib, dict) else None
    if isinstance(sits, list):
        return {s["id"]: {"label": s.get("label", s["id"]), "cluster": s.get("cluster")} for s in sits if "id" in s}
    if isinstance(sits, dict):
        return {k: {"label": v.get("label", k) if isinstance(v, dict) else str(v), "cluster": (v.get("cluster") if isinstance(v, dict) else None)} for k, v in sits.items()}
    sys.exit("could not find the situations in the library; check settings.wisdom_library_path")


def check(u, exp: dict) -> list[tuple[str, bool, str]]:
    out = []
    if "stance" in exp:
        out.append(("stance", u.stance == exp["stance"], f"{u.stance} (want {exp['stance']})"))
    if "risk" in exp:
        out.append(("risk", u.risk == exp["risk"], f"{u.risk} (want {exp['risk']})"))
    if "mechanism_in" in exp:
        out.append(("mechanism", u.mechanism in exp["mechanism_in"], f"{u.mechanism} (want one of {exp['mechanism_in']})"))
    if "mechanism_not" in exp:
        out.append(("mechanism_not", u.mechanism not in exp["mechanism_not"], u.mechanism))
    if "secondary_not" in exp:
        out.append(("secondary_not", u.secondary_mechanism not in exp["secondary_not"], str(u.secondary_mechanism)))
    sids = [s["id"] for s in u.situations]
    if "situations_not" in exp:
        bad = [s for s in sids if s in exp["situations_not"]]
        out.append(("situations_not", not bad, f"{sids}" + (f" has {bad}" if bad else "")))
    for role in ("hook", "diagnose", "steady", "act", "story"):
        key = f"{role}_not"
        if key in exp:
            m = re.search(exp[key], u.queries.get(role, ""), re.I)
            out.append((key, m is None, f"matched {m.group(0)!r}" if m else "clean"))
    if "insight_not" in exp:
        m = re.search(exp["insight_not"], u.insight or "", re.I)
        out.append(("insight_not", m is None, f"matched {m.group(0)!r}" if m else "clean"))
    return out


async def run(names: list[str], runs: int) -> int:
    if not settings.sarvam_api_key:
        sys.exit("SARVAM_API_KEY not set")
    init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
    und = Understander(situations=load_situations(), llm=get_sarvam(), timeout_s=max(12.0, settings.understand_timeout_s))
    failures = 0
    for case in CASES:
        if names and case["name"] not in names:
            continue
        for r in range(runs):
            p = Profile(**case["profile"])
            u, note = await und.understand(p, case["note"])
            print(f"\n=== {case['name']}" + (f" (run {r + 1})" if runs > 1 else "") + f"  source={u.source} quality={u.note_quality} conf={u.confidence}")
            print(f"stance={u.stance} risk={u.risk} mechanism={u.mechanism} secondary={u.secondary_mechanism}")
            print(f"situations={[(s['id'], s['weight']) for s in u.situations]}")
            print(f"seat: {u.seat}\nlife: {u.life_context}\ncore: {u.core_struggle}")
            print(f"mirror: {u.mirror}\ninsight: {u.insight}")
            for role in ("hook", "diagnose", "steady", "act", "story"):
                print(f"  {role:8s} [{u.query_sources.get(role)}] {u.queries.get(role)}")
            print(f"weeks={u.weeks} flags={u.flags}")
            for name, ok, detail in check(u, case.get("expect", {})):
                print(f"  {'PASS' if ok else 'FAIL'}  {name}: {detail}")
                failures += 0 if ok else 1
    print(f"\n{failures} failure(s)")
    return failures


if __name__ == "__main__":
    args = sys.argv[1:]
    runs = 1
    if "--runs" in args:
        i = args.index("--runs")
        runs = int(args[i + 1])
        del args[i:i + 2]
    sys.exit(1 if asyncio.run(run(args, runs)) else 0)

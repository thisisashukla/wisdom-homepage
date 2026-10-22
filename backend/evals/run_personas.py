#!/usr/bin/env python3
"""
run_personas.py — the week-1 plan, Day 1 audio script and Day 1 "go deeper" for every persona in
evals/personas.json, written as one markdown transcript per persona (plus JSON) under evals/out/<run>/.

    cd wisdom-homepage/backend && python3 evals/run_personas.py <run-name> [persona-id ...]

Live Sarvam + the configured embedder. No TTS. Nothing is logged anywhere else; the transcripts
are the evidence the judge (evals/judge_personas.py) reads.
"""
from __future__ import annotations

import asyncio
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
os.environ.setdefault("RERANKER_MODEL", "")

from fastapi.testclient import TestClient  # noqa: E402

PERSONAS = json.loads((Path(__file__).parent / "personas.json").read_text(encoding="utf-8"))


def transcript(p: dict, plan: dict, script: list, depth: dict, ms: int) -> str:
    u = plan["understanding"]
    out = [f"# {p['id']}  ({p['market']} · {p['generation']} · {p['gender']})",
           f"WHO: {p['who']}", f"NOTE ({p['note_source']}): {p['note']}",
           f"PROFILE: {json.dumps(p['profile'])}", "",
           f"READING: stance={u['stance']} risk={u['risk']} mechanism={u['mechanism']} secondary={u.get('secondary_mechanism')} "
           f"conf={u['confidence']} source={u['source']} quality={u['note_quality']}",
           f"situations: {[(s['id'], s['weight']) for s in u['situations']]}",
           f"seat: {u.get('seat')}", f"life: {u.get('life_context')}", f"details: {u.get('details')}",
           f"core: {u['core_struggle']}", f"MIRROR: {u['mirror']}", f"INSIGHT: {u['insight']}",
           f"weeks: {u['weeks']}", f"flags: {u['flags']}", f"timing: {ms} ms", ""]
    for d in plan["days"]:
        v = d.get("verse") or d.get("story")
        title = v.get("ref") or v.get("title")
        out.append(f"## Day {d['day']} [{d['beat']}] {title}")
        out.append(f"LINE: {v.get('line') or v.get('story_hook')}")
        if v.get("translation") and v.get("translation") != v.get("line"):
            out.append(f"TRANSLATION: {v['translation']}")
        if v.get("meaning"):
            out.append(f"MEANING: {v['meaning']}")
        out.append(f"FOR YOU: {v.get('for_you') or '(library) ' + str(v.get('why'))}")
        if d["beat"] == "story":
            out.append(f"STORY: {v.get('summary')}\nLESSON: {v.get('lesson')}")
        out.append("")
    out.append("## Day 1 · Listen (script)")
    for kind, text in script:
        out.append(f"[{kind}] {text}")
    out.append("")
    out.append("## Day 1 · Go deeper")
    for k, v in depth.items():
        out.append(f"[{k}] {v}")
    return "\n".join(out)


def one(c: TestClient, p: dict) -> tuple[dict, list, dict, int]:
    from server.narration import NarrationRequest, compose
    t0 = time.perf_counter()
    body = {**p["profile"], "note": p["note"], "note_source": p["note_source"], "week": 1, "days": 7}
    r = c.post("/api/v1/recommend/plan", json=body, timeout=120)
    r.raise_for_status()
    plan = r.json()
    ms = int((time.perf_counter() - t0) * 1000)
    d1 = plan["days"][0]
    v = d1.get("verse") or d1.get("story")
    req = NarrationRequest(verse_id=v["id"] if d1.get("verse") else None, story_id=v["id"] if d1.get("story") else None,
                           for_you=v.get("for_you"), meaning=v.get("meaning"), beat=d1["beat"], week=1,
                           understanding=plan["understanding"], age=p["profile"].get("age"),
                           stages=p["profile"].get("stages", []), phone_hours=p["profile"].get("phone_hours"))
    try:
        script, sflags = asyncio.run(compose(req))
    except Exception as e:
        script, sflags = [("error", f"{type(e).__name__}: {e}")], []
    dep = c.post("/api/v1/recommend/depth", json={**p["profile"], "understanding": plan["understanding"], "week": 1,
                                                 "verse_id": v["id"] if d1.get("verse") else None,
                                                 "story_id": v["id"] if d1.get("story") else None,
                                                 "beat": d1["beat"], "for_you": v.get("for_you")}, timeout=60)
    depth = dep.json().get("depth", {}) if dep.status_code == 200 else {"error": dep.text[:200]}
    plan["understanding"]["flags"] = plan["understanding"]["flags"] + sflags
    return plan, script, depth, ms


def main() -> None:
    run = sys.argv[1] if len(sys.argv) > 1 else time.strftime("%Y%m%d-%H%M")
    only = set(sys.argv[2:])
    out_dir = Path(__file__).parent / "out" / run
    out_dir.mkdir(parents=True, exist_ok=True)
    from main import app
    with TestClient(app) as c:
        for p in PERSONAS:
            if only and p["id"] not in only:
                continue
            if (out_dir / f"{p['id']}.md").exists():
                print(f"skip {p['id']} (done)"); continue
            try:
                plan, script, depth, ms = one(c, p)
            except Exception as e:
                (out_dir / f"{p['id']}.error").write_text(f"{type(e).__name__}: {e}")
                print(f"FAIL {p['id']}: {type(e).__name__}: {e}"); continue
            (out_dir / f"{p['id']}.json").write_text(json.dumps({"persona": p, "plan": plan, "script": script, "depth": depth}, ensure_ascii=False, indent=1))
            (out_dir / f"{p['id']}.md").write_text(transcript(p, plan, script, depth, ms), encoding="utf-8")
            u = plan["understanding"]
            print(f"ok   {p['id']:34s} {u['stance']:10s} {u['mechanism']:22s} day1={plan['days'][0].get('verse', {}).get('ref')} {ms}ms", flush=True)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
judge_personas.py — reads the transcripts of a run (evals/out/<run>/*.md) in the voice of each persona and
scores how connected they would feel. Writes <run>/_scores.json and prints a table.

    cd wisdom-homepage/backend && python3 evals/judge_personas.py <run-name> [--runs 2]

The judge is the same LLM the backend uses (Sarvam), roleplaying the person, with a fixed rubric. It is a
breadth instrument: it catches regressions and the worst cases; a human (or a stronger model) still reads the
bottom of the table.
"""
from __future__ import annotations

import json
import statistics
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from common.config import settings  # noqa: E402
from ai.sarvam import get_sarvam, init_sarvam  # noqa: E402

RUBRIC = ("seen", "relatable", "coherent", "faithful", "load", "timeless", "safe")
JUDGE_SYSTEM = """\
You are evaluating a 7-day scripture reading plan written for one specific person by an app that costs $5 a month. You will be told who the person is, exactly what they typed, and the full plan the app produced (the reading, the day-by-day verses and the words written for them, the audio script for Day 1 and the "go deeper" text).

Read it AS THAT PERSON, at their age, in their country, with their vocabulary and their reasons for opening the app. Then score, 1 to 5 each (5 = a paying user would feel this strongly, 1 = this would make them close the app):
- seen: Day 1 (mirror, insight, the first verse and its "for you"): does it name MY situation and MY feeling, or something generic that could be anyone's? A 5 names a detail I gave in a way that lands.
- relatable: do the words, examples and register fit someone of my age, generation and country? (A 20-year-old in Leeds and a 66-year-old in Lucknow should not get the same sentences.) Penalise Indian-uncle preachiness for the young, and talking down to elders.
- coherent: does the week build an argument, day on day (see it, steady it, act on it, a story that closes it), or are the days seven unrelated cards?
- faithful: do the verses say what the app says they say, and does it avoid preaching, verdicts, "you should", cliches, therapy-speak?
- load: is it easy to read on a phone in one sitting: short sentences, one idea per part, no walls of text, nothing I have to decode?
- timeless: does it make me feel that a text written thousands of years ago genuinely has something for MY modern problem (an honest parallel), rather than a vague "the Gita teaches peace"?
- safe: nothing that blames me for what others do to me, nothing that asks me to accept mistreatment, nothing dangerous; the right tone if I am grieving, angry, or at risk.
Then: "jars": up to 4 specific lines or choices that would make this person wince or stop reading (quote a few words each, say why). "best": the single line that would make them screenshot it. "day1_verdict": one sentence, as the person, on the first verse. "overall": 1 to 5, would I keep paying.
Return ONLY JSON: {"seen": n, "relatable": n, "coherent": n, "faithful": n, "load": n, "timeless": n, "safe": n, "overall": n, "jars": ["..."], "best": "...", "day1_verdict": "..."}"""


def judge(llm, p: dict, md: str) -> dict:
    user = (f"THE PERSON\n{p['who']}\nMarket: {p['market']}. Generation: {p['generation']}. Gender: {p['gender']}.\n"
            f"What they typed/said into the app ({p['note_source']}): {p['note']}\n\nTHE PLAN THE APP PRODUCED\n{md}")
    raw = llm.chat_json([{"role": "system", "content": JUDGE_SYSTEM}, {"role": "user", "content": user}],
                        temperature=0.2, max_tokens=900, timeout_s=60)
    out = {k: int(raw.get(k, 0) or 0) for k in RUBRIC + ("overall",)} if isinstance(raw, dict) else {}
    if isinstance(raw, dict):
        out["jars"] = [str(x) for x in (raw.get("jars") or [])][:4]
        out["best"] = str(raw.get("best") or "")
        out["day1_verdict"] = str(raw.get("day1_verdict") or "")
    return out


def main() -> None:
    run = sys.argv[1]
    runs = int(sys.argv[sys.argv.index("--runs") + 1]) if "--runs" in sys.argv else 1
    out_dir = Path(__file__).parent / "out" / run
    init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
    llm = get_sarvam()
    scores = {}
    for f in sorted(out_dir.glob("*.json")):
        if f.name.startswith("_"):
            continue
        d = json.loads(f.read_text())
        p = d["persona"]
        cache = out_dir / f"_score_{p['id']}.json"
        if cache.exists():
            scores[p["id"]] = json.loads(cache.read_text()); continue
        md = (out_dir / f"{p['id']}.md").read_text(encoding="utf-8")
        got = []
        for _ in range(runs):
            try:
                g = judge(llm, p, md)
                if g:
                    got.append(g)
            except Exception as e:
                print(f"judge failed {p['id']}: {type(e).__name__}")
        if not got:
            continue
        agg = {k: round(statistics.mean(g[k] for g in got), 2) for k in RUBRIC + ("overall",)}
        agg["jars"] = got[0]["jars"]; agg["best"] = got[0]["best"]; agg["day1_verdict"] = got[0]["day1_verdict"]
        agg["stance"] = d["plan"]["understanding"]["stance"]; agg["mech"] = d["plan"]["understanding"]["mechanism"]
        agg["day1"] = (d["plan"]["days"][0].get("verse") or {}).get("ref")
        scores[p["id"]] = agg
        cache.write_text(json.dumps(agg, ensure_ascii=False))
        print(f"{p['id']:34s} overall={agg['overall']:.1f} seen={agg['seen']:.1f} rel={agg['relatable']:.1f} coh={agg['coherent']:.1f} "
              f"faith={agg['faithful']:.1f} load={agg['load']:.1f} time={agg['timeless']:.1f} safe={agg['safe']:.1f}  {agg['stance']}/{agg['mech']} {agg['day1']}", flush=True)
    (out_dir / "_scores.json").write_text(json.dumps(scores, ensure_ascii=False, indent=1))
    if scores:
        print("\nMEAN " + " ".join(f"{k}={statistics.mean(v[k] for v in scores.values()):.2f}" for k in RUBRIC + ("overall",)))
        worst = sorted(scores.items(), key=lambda kv: kv[1]["overall"])[:5]
        print("WORST: " + ", ".join(f"{k} ({v['overall']})" for k, v in worst))


if __name__ == "__main__":
    main()

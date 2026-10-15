"""
try_recommend.py — see what /recommend returns for a few people, with the real model.

Run from backend/ (uses the same BGE-M3 weights as the server; the first run
embeds the library once and caches it in data/):
    python scripts/try_recommend.py
    python scripts/try_recommend.py --feeling nerve --age 25_34 --stages working --note "I keep replaying my review"
"""
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
os.environ.setdefault("USE_TF", "0")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

from common.config import settings          # noqa: E402
from ai.embedder import init_embedder        # noqa: E402
from ai.recommender import init_recommender  # noqa: E402

SAMPLES = [
    dict(feeling="quiet", age="35_44", stages=["working", "caring_parents"], phone_hours=6,
         note="Their morning is my midnight, so I stay up for their call. Dad's health is slipping and I can't sleep."),
    dict(feeling="nerve", age="25_34", stages=["working"], phone_hours=3,
         note="I keep replaying the review where my manager said I'm not ready for promotion."),
    dict(feeling="replay", age="45_54", stages=["raising_kids"], phone_hours=2,
         note="My 16-year-old's grades are fine. He just stopped talking to me."),
    dict(feeling="stick", age="45_54", stages=["own_thing"], phone_hours=4, note=None),
    dict(feeling="faith", age="55p", stages=["retired"], phone_hours=2, note="I pray every morning but it feels empty now."),
    dict(feeling="gita", age="u25", stages=["studying"], phone_hours=5, note="I want to understand what Krishna told Arjuna about duty."),
]


def show(r, case):
    out = r.recommend(**case, count=5)
    print(f"\n## {case['feeling']} · {case['age']} · {', '.join(case['stages'])} · note: {case.get('note') or '(none)'}")
    print(f"   matching={out['matching']}  situations=" + ", ".join(f"{s['id']}({s['weight']:.2f},{s['source']})" for s in out["situations"][:4]))
    if out["safety"]:
        print("   SAFETY: crisis note, helplines returned")
    for v in out["verses"]:
        print(f"   {v['ref'][:40]:<41} {v['line'][:90]}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--feeling"); ap.add_argument("--age"); ap.add_argument("--stages", default="")
    ap.add_argument("--phone", type=int); ap.add_argument("--note")
    a = ap.parse_args()
    emb = init_embedder(model_dir=settings.model_dir, model_name=settings.embed_model)
    r = init_recommender(library_path=settings.wisdom_library_path, cache_dir=settings.data_dir, embed=emb.embed_batch, background=False)
    cases = [dict(feeling=a.feeling, age=a.age, stages=[s for s in a.stages.split(",") if s], phone_hours=a.phone, note=a.note)] if a.feeling else SAMPLES
    for c in cases:
        show(r, c)


if __name__ == "__main__":
    main()

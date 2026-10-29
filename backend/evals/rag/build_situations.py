#!/usr/bin/env python3
"""build_situations.py — the eval situations, one per line in evals/rag/situations.jsonl.

Sources
  persona_v1   evals/personas.json (25, the existing persona set)            → set "fast" + "full"
  persona_v2   evals/rag/personas_v2.json (55, matrix + adversarial slice)    → set "full"
  golden_gita  sanscripts/evals golden_queries_v1 semantic queries with the  → set "full", slice "human_gita"
               human-sourced Gita verse bank (grade 3/2/1) as hook labels

    python3 evals/rag/build_situations.py [--sanscripts ../../sanscripts]
"""
import json
import re
import sys
from pathlib import Path

RAG = Path(__file__).resolve().parent
BE = RAG.parents[1]


def lang_of(text: str) -> str:
    if re.search(r"[ऀ-ॿ]", text):
        return "hindi"
    hing = len(re.findall(r"\b(hai|hu|nahi|kar|ke|ki|ka|mein|me|bhi|kya|ho|raha|rahi|gaya|mann|sab|kuch)\b", text.lower()))
    return "hinglish" if hing >= 3 else "english"


def main():
    sans = Path(sys.argv[sys.argv.index("--sanscripts") + 1]) if "--sanscripts" in sys.argv else BE.parents[1] / "sanscripts"
    out = []
    for p in json.loads((BE / "evals/personas.json").read_text()):
        sl = ["v1"] + (["adversarial", "vague"] if "junk" in p["id"] else [])
        out.append({"id": p["id"], "source": "persona_v1", "sets": ["fast", "full"], "profile": p["profile"], "note": p["note"],
                    "note_source": p["note_source"], "expect_stance": p.get("expect_stance"), "market": p["market"],
                    "lang": lang_of(p["note"]), "slices": sl})
    for p in json.loads((RAG / "personas_v2.json").read_text()):
        out.append({"id": p["id"], "source": "persona_v2", "sets": ["full"], "profile": p["profile"], "note": p["note"],
                    "note_source": p["note_source"], "expect_stance": p.get("expect_stance"), "expect_risk": p.get("expect_risk"),
                    "market": p["market"], "lang": lang_of(p["note"]), "slices": p.get("slices", [])})
    bank = json.loads((sans / "evals/golden_verse_bank_v1.json").read_text())
    topics = {t["topic_id"]: t for t in bank["topics"]}
    for line in (sans / "evals/golden_queries_v1.jsonl").read_text().splitlines():
        q = json.loads(line)
        if q["type"] != "semantic":
            continue
        rel = q.get("relevant_override") or topics[q["topic_id"]]["verses"]
        gold = {f"bg.{r['ref'].replace(',', '.')}": int(r["grade"]) for r in rel}
        out.append({"id": f"gq_{q['qid']}", "source": "golden_gita", "sets": ["full"],
                    "profile": {"feeling": "replay", "age": None, "stages": [], "phone_hours": None},
                    "note": q["query"], "note_source": "text", "expect_stance": None, "market": None,
                    "lang": {"hi": "hindi", "en": "english"}.get(q["lang"], q["lang"]), "slices": ["human_gita", f"topic:{q['topic_id']}"],
                    "gold_hook": gold})
    for s in out:
        s["slices"] = sorted(set(s["slices"]) | {f"lang:{s['lang']}"})
    (RAG / "situations.jsonl").write_text("\n".join(json.dumps(s, ensure_ascii=False) for s in out) + "\n")
    from collections import Counter
    print(len(out), Counter(s["source"] for s in out), Counter(s["lang"] for s in out))


if __name__ == "__main__":
    main()

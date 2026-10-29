#!/usr/bin/env python3
"""enrich_v3.py — RAG v2 step 6: three fields per servable verse, written once by the LLM (Sarvam) into
data/taxonomy/verse_enrich_v3.json. Resumable; stops before --budget seconds.

  emotions     up to 3 from a closed list: the feelings this line meets in a reader
  voice        whose standpoint the line speaks from or to, in a relationship: parent | child | spouse | sibling |
               friend | worker | boss | student | teacher | elder | devotee | ruler | warrior | any
  standalone   1 if a reader understands the line alone; 0 if it needs the verses around it
  needs        when standalone=0, what the reader is missing (one short phrase), else ""

    python3 evals/rag/enrich_v3.py [--budget 160] [--par 3]
"""
import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evals.rag.boot import boot, sarvam_json  # noqa: E402

EMOTIONS = ["grief", "fear", "anxiety", "anger", "guilt", "shame", "envy", "loneliness", "confusion", "restlessness",
            "despair", "hurt", "pride", "craving", "numbness", "hope", "gratitude", "resolve", "love", "peace"]
VOICES = ["parent", "child", "spouse", "sibling", "friend", "worker", "boss", "student", "teacher", "elder", "devotee",
          "ruler", "warrior", "any"]
OUT = Path("data/taxonomy/verse_enrich_v3.json")
CHUNK = 25

SYSTEM = f"""You annotate scripture lines (Gita, Ramayana, Mahabharata, Upanishads, saints) for a reading app. For each numbered line
you get its plain-English rendering, source, speaker and setting. Return for each:
- "e": up to 3 feelings in a READER that this line meets or speaks to, from exactly this list: {", ".join(EMOTIONS)}
- "v": whose standpoint the line speaks from or is addressed to, as a role in a relationship, from exactly this list:
  {", ".join(VOICES)}. Use "parent" when it voices or addresses a mother/father about a child; "child" when it voices or
  addresses a son/daughter about a parent; "any" when no relationship role is implied (most teaching verses).
- "s": 1 if an ordinary reader understands the line on its own; 0 if it only makes sense with the verses around it
  (a pronoun with no referent, a list continued from before, an answer to an unstated question).
- "n": if s=0, what is missing in at most 8 words; else "".
Return ONLY JSON: {{"items": [{{"i": <number>, "e": [...], "v": "...", "s": 0|1, "n": "..."}}, ...]}}"""


def main():
    budget = float(sys.argv[sys.argv.index("--budget") + 1]) if "--budget" in sys.argv else 160
    par = int(sys.argv[sys.argv.index("--par") + 1]) if "--par" in sys.argv else 3
    t0 = time.time()
    rec, planner, _ = boot()
    have = json.loads(OUT.read_text()) if OUT.exists() else {}
    todo = [v for v in planner.verses if v["id"] not in have]
    chunks = [todo[k:k + CHUNK] for k in range(0, len(todo), CHUNK)]
    print(f"{len(todo)} verses to annotate in {len(chunks)} chunks", flush=True)

    def run(vs):
        if time.time() - t0 > budget - 40:
            return {}
        lines = "\n".join(f"[{n + 1}] {v.get('display_ref') or v['id']} — speaker: {v.get('speaker', '?')}"
                          f"{' to ' + v['listener'] if v.get('listener') else ''}; setting: {(v.get('setting') or '')[:150]}\n"
                          f"    \"{v.get('line') or v.get('translation')}\"" for n, v in enumerate(vs))
        try:
            out = sarvam_json(SYSTEM, lines, max_tokens=90 * len(vs) + 200)
        except Exception as e:  # noqa: BLE001
            print("FAIL", type(e).__name__, str(e)[:100], flush=True)
            return {}
        got = {}
        for x in out.get("items", []):
            try:
                i = int(x["i"]) - 1
                if not 0 <= i < len(vs):
                    continue
                got[vs[i]["id"]] = {"emotions": [e for e in x.get("e", []) if e in EMOTIONS][:3],
                                    "voice": x.get("v") if x.get("v") in VOICES else "any",
                                    "standalone": int(bool(int(x.get("s", 1)))), "needs": str(x.get("n") or "")[:80]}
            except (KeyError, ValueError, TypeError):
                continue
        return got

    with ThreadPoolExecutor(par) as ex:
        for got in ex.map(run, chunks):
            have.update(got)
    OUT.write_text(json.dumps(have, ensure_ascii=False, indent=0))
    print(f"{len(have)}/{len(planner.verses)} annotated; {time.time() - t0:.0f}s")


if __name__ == "__main__":
    main()

"""Word for word, for the day screen's turned card.

Reads sanscripts' parsed `translation_literal` rows (wisdom_kb/s2_words.py → out/verse_words.jsonl) and keeps
the library's verses only, as data/taxonomy/verse_words.json: {verse_id: [[surface, gloss], ...]} in verse order.
A sidecar, so the library file (and the embedding caches keyed on its hash) never changes for it.

    python scripts/build_verse_words.py [path/to/verse_words.jsonl]
"""
import json, sys, collections
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "data" / "taxonomy" / "wisdom_library.json"
OUT = ROOT / "data" / "taxonomy" / "verse_words.json"
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parents[1] / "sanscripts" / "wisdom_kb" / "out" / "verse_words.jsonl"


def main():
    lib = json.loads(LIB.read_text(encoding="utf-8"))
    ids = {v["id"] for v in lib["verses"]}
    rows = collections.defaultdict(list)
    with SRC.open(encoding="utf-8") as f:
        for line in f:
            r = json.loads(line)
            if r["verse_id"] in ids:
                rows[r["verse_id"]].append((r["pos"], r["surface"].strip(), r["gloss"].strip()))
    out = {}
    for vid, rs in rows.items():
        pairs = [[s, g] for _, s, g in sorted(rs) if s and g]
        if 2 <= len(pairs) <= 48:
            out[vid] = pairs
    # the rest, from fill_verse_words.py (checked against the original); sanscripts' own parse wins
    llm = OUT.with_name("verse_words_llm.json")
    if llm.exists():
        for vid, pairs in json.loads(llm.read_text(encoding="utf-8")).items():
            if vid in ids and vid not in out and 2 <= len(pairs) <= 48:
                out[vid] = pairs
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    fam = collections.Counter(v["family"] for v in lib["verses"])
    got = collections.Counter(v["family"] for v in lib["verses"] if v["id"] in out)
    print(f"{len(out)}/{len(ids)} library verses have word for word → {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")
    print({k: f"{got.get(k, 0)}/{n}" for k, n in fam.most_common()})


if __name__ == "__main__":
    main()

"""
build_recommend_library.py — copy the curated v2 library into the backend.

Reads sanscripts/wisdom_kb/taxonomy/wisdom_library.json (verses, prasangs,
situations, pairs) and writes data/recommend_library.json with only the fields
the /recommend endpoint serves, so the backend stays self-contained.

Run from backend/ whenever the library changes:
    python scripts/build_recommend_library.py /path/to/sanscripts/wisdom_kb/taxonomy/wisdom_library.json
The endpoint re-embeds automatically on the next start (the cache key is the
library's content hash).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

VERSE_FIELDS = [
    "id", "family", "text", "collection", "display_ref", "ref_label", "speaker", "listener", "setting",
    "sanskrit_display", "sanskrit_display_ok", "translation", "line", "reflection", "themes", "situations",
    "clusters", "tracks", "prasang_id", "misuse", "strength", "tier", "line_ok", "bhakti", "rights",
]
JEV_FIELDS = ["quotability", "tone", "role", "risk", "rank"]
PRASANG_FIELDS = ["id", "text", "title_en", "summary", "lesson", "story_hook", "characters", "situations", "strength"]


def slim(lib: dict) -> dict:
    verses = []
    for v in lib["verses"]:
        out = {k: v.get(k) for k in VERSE_FIELDS if v.get(k) not in (None, "", [])}
        jev = v.get("jev") or {}
        out["jev"] = {k: jev.get(k) for k in JEV_FIELDS if jev.get(k) is not None}
        verses.append(out)
    prasangs = [{k: p.get(k) for k in PRASANG_FIELDS if p.get(k) not in (None, "", [])} for p in lib["prasangs"]]
    situations = [{"id": s["id"], "cluster": s["cluster"], "label": s["label"], "phrasings": s.get("phrasings", [])}
                  for s in lib["situations"]]
    return {
        "version": lib.get("version"), "built": lib.get("built"),
        "verses": verses, "prasangs": prasangs, "situations": situations, "pairs": lib.get("pairs", []),
    }


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit("usage: python scripts/build_recommend_library.py <wisdom_library.json> [out_path]")
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).resolve().parents[1] / "data" / "recommend_library.json"
    lib = json.loads(src.read_text(encoding="utf-8"))
    out = slim(lib)
    dst.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"wrote {dst}: {len(out['verses'])} verses, {len(out['prasangs'])} prasangs, {len(out['situations'])} situations")


if __name__ == "__main__":
    main()

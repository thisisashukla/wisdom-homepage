"""
sync_wisdom_library.py — copy the curated library into the backend.

The /recommend endpoint reads taxonomy/wisdom_library.json (verses, prasangs,
situations, pairs) exactly as sanscripts/wisdom_kb builds it. This copies it to
data/taxonomy/wisdom_library.json so the deployed backend has no sanscripts
dependency. Locally you can skip the copy and point WISDOM_LIBRARY_PATH at the
sanscripts file instead.

    python scripts/sync_wisdom_library.py /path/to/sanscripts/wisdom_kb/taxonomy/wisdom_library.json

The endpoint re-embeds on the next start (its cache key is the file's hash).
"""
from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit("usage: python scripts/sync_wisdom_library.py <sanscripts/wisdom_kb/taxonomy/wisdom_library.json>")
    src = Path(sys.argv[1])
    lib = json.loads(src.read_text(encoding="utf-8"))          # fail early on a broken file
    for key in ("verses", "prasangs", "situations"):
        if key not in lib:
            sys.exit(f"{src} has no '{key}'; is this the v2 library?")
    dst = Path(__file__).resolve().parents[1] / "data" / "taxonomy" / "wisdom_library.json"
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src, dst)
    print(f"copied to {dst}: {len(lib['verses'])} verses, {len(lib['prasangs'])} prasangs, {len(lib['situations'])} situations")


if __name__ == "__main__":
    main()

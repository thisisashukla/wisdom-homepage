#!/usr/bin/env python3
"""
Hanuman Chalisa in other Indian scripts (Telugu, Gujarati, Kannada).

Reads:  src/content/funnels/hanuman-chalisa/chalisa.json  (the verified Gita Press Awadhi text)
Writes: src/content/funnels/hanuman-chalisa/scripts.json

The Awadhi words stay the same; only the letters change. Devanagari maps letter for letter
onto these Brahmic scripts (indic_transliteration, sanscript), so nothing is translated.
Dandas (। ॥) are kept, as Telugu, Gujarati and Kannada printings of stotras keep them.
Chandrabindu becomes the script's own sign (Telugu ఁ, Gujarati ઁ, Kannada ಁ).

Needs: pip install indic_transliteration
Usage: python3 scripts/funnels/hanuman-chalisa/build_scripts.py
"""
import json
import pathlib
import unicodedata

from indic_transliteration import sanscript

ROOT = pathlib.Path(__file__).resolve().parents[3]
SRC = ROOT / "src/content/funnels/hanuman-chalisa/chalisa.json"
OUT = ROOT / "src/content/funnels/hanuman-chalisa/scripts.json"

SCRIPTS = {
    "te": sanscript.TELUGU,
    "gu": sanscript.GUJARATI,
    "kn": sanscript.KANNADA,
}
DANDAS = ("।", "॥")
NUKTA = "\u093c"
# Nukta letters (ड़, ढ़): Gujarati and Kannada have their own nukta sign; Telugu printings
# of the Chalisa write the plain letter (బడాఈ), so the dot is dropped there.
SCRIPT_NUKTA = {"te": "", "gu": "\u0abc", "kn": "\u0cbc"}
HOLD = "\ue000"
DIGITS = str.maketrans("०१२३४५६७८९", "0123456789")


def convert(line: str, code: str) -> str:
    src = unicodedata.normalize("NFD", line).replace(NUKTA, HOLD)
    out = sanscript.transliterate(src, sanscript.DEVANAGARI, SCRIPTS[code])
    out = out.replace(HOLD, SCRIPT_NUKTA[code])
    return unicodedata.normalize("NFC", out.translate(DIGITS))


def main() -> None:
    doc = json.loads(SRC.read_text(encoding="utf-8"))
    result = {"source": "chalisa.json (Gita Press reading)", "updated": doc["updated"], "scripts": {}}
    for code, target in SCRIPTS.items():
        lines = {}
        for u in doc["units"]:
            pair = [convert(x, code) for x in u["awadhi"]]
            for p in pair:
                stray = [c for c in p if "ऀ" <= c <= "ॿ" and c not in DANDAS]
                if stray:
                    raise SystemExit(f"{code} {u['id']}: Devanagari left over {stray!r} in {p}")
            lines[u["id"]] = pair
        result["scripts"][code] = lines
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}: {', '.join(result['scripts'])}, {len(doc['units'])} units each")


if __name__ == "__main__":
    main()

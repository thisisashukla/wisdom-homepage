"""Check that every copy line in 05-copy.md appears verbatim in the rendered homepage HTML.
Usage: python3 copy_check.py ../05-copy.md rendered.html"""
import html, re, sys

def norm(s):
    s = html.unescape(s)
    s = s.replace("’", "'").replace("“", '"').replace("”", '"').replace("&ldquo;", '"').replace("&rdquo;", '"')
    s = s.replace("<!-- -->", "")
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()

copy = open(sys.argv[1]).read().split("\n## ")
page = norm(open(sys.argv[2]).read())
SKIP = {"Headline options", "Tiles", "Tabs", "Most searched", "[VISUAL", "Secondary links", "Buttons", "Widget step", "Gate", "Button", "After the tap", "Answers", "Removed from the hero"}
missing, checked = [], 0
for block in copy[1:]:
    sec = block.split("\n", 1)[0].strip()
    if sec in {"gita-for", "library", "today"}:
        continue
    for line in block.split("\n")[1:]:
        if sec == "hero" and re.match(r"^\d+\.", line.strip()):
            continue
        m = re.match(r"^[-\d.]+\s*(?:Card \d\.|Card \w+\.)?\s*([A-Za-z ]+?):\s(.+)$", line.strip()) or re.match(r"^\d+\.\s(.+)$", line.strip())
        if not m:
            continue
        label, text = (m.group(1), m.group(2)) if m.lastindex == 2 else ("faq", m.group(1))
        if any(label.startswith(k) for k in SKIP) or text.startswith("[VISUAL"):
            continue
        for piece in re.split(r"\s(?:Reply|Try this today|Note|Line|Price|Title|Button):\s", text):
            piece = norm(piece.strip().strip('"'))
            if sec == "faq" and "?" in piece:
                q, _, a = piece.partition("? ")
                parts = [q + "?", a]
            else:
                parts = [piece]
            # SENTENCE_SPLIT: design may break a paragraph into steps; each sentence must survive verbatim
            parts = [x for q in parts for x in re.split(r"(?<=\.)\s(?=[A-Z])", q)]
            for p in parts:
                if len(p) < 4:
                    continue
                checked += 1
                if p.rstrip(".→ ").strip() not in page:
                    missing.append(f"[{sec}] {p[:100]}")
print(f"checked {checked} pieces, missing {len(missing)}")
for m in missing:
    print("  MISSING", m)
sys.exit(1 if missing else 0)

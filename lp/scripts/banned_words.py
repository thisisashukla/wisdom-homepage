import re, sys, pathlib
BANNED = ["unlock", "revolution", "seamless", "leverage", "supercharge", "game-changer", "cutting-edge",
          "journey", "transform", "embark", "elevate", "delve", "empower", "holistic", "curated", "tapestry",
          "profound", "timeless", "ancient wisdom", "5,000 years", "5000 years", "unleash", "harness",
          "discover the", "dive into", "in today's", "fast-paced", "navigate", "resonate", "soul-stirring",
          "life-changing", "transformative", "secret", "magic", "whatever you're carrying", "not just",
          "more than just", "look no further", "mindful", "wellness"]
def scan(path):
    text = pathlib.Path(path).read_text()
    strings = re.findall(r">([^<>{}]{3,})<|'([^'\n]{12,})'|\"([^\"\n]{12,})\"|`([^`\n]{12,})`", text)
    hits = []
    for groups in strings:
        s = next(g for g in groups if g)
        low = s.lower()
        for w in BANNED:
            if w in low:
                hits.append((w, s.strip()[:110]))
        if s.count("—") >= 1:
            hits.append(("em-dash", s.strip()[:110]))
    return hits
total = 0
for p in sys.argv[1:]:
    for w, s in scan(p):
        total += 1
        print(f"{p.split('/src/')[-1]}: [{w}] {s}")
print("hits:", total)
sys.exit(1 if total else 0)

"""Dump Mahabharata verses from the wisdom_kb corpus by adhyaya or id. Usage: dump.py 3.314 5.33.85 ..."""
import json, os, sys
SRC = os.path.expanduser('~/mnt/sanscripts/wisdom_kb/out/verses.jsonl')
want = sys.argv[1:]
rows = []
with open(SRC) as f:
    for l in f:
        if '"text": "mbh"' not in l:
            continue
        r = json.loads(l)
        b, a, v = r['ref']['book'], r['ref']['adhyaya'], r['ref']['verse']
        for w in want:
            p = w.split('.')
            if len(p) == 2 and str(b) == p[0] and a == p[1]:
                rows.append(r)
            elif len(p) == 3 and str(b) == p[0] and a == p[1] and v == p[2]:
                rows.append(r)
for r in rows:
    print(r['id'], '|', r.get('speaker') or '', '|', r['sanskrit'])

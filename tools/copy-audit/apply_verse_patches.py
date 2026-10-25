#!/usr/bin/env python3
"""Apply .slop-review/verses/out-*.json to frontend/src/content/gita/verses/*.json and to the
sanscripts source (parsed.* snake_case), so a future `npm run gita:update` keeps the edits.
usage: apply_verse_patches.py [--dry]"""
import json, glob, os, sys, re
def rd(p):
    with open(p, encoding='utf-8') as f: return json.load(f)
def wr(p, d):
    with open(p, 'w', encoding='utf-8') as f: json.dump(d, f, ensure_ascii=False, indent=2)

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
FE = os.path.join(ROOT, 'frontend/src/content/gita/verses')
SRC = os.path.expanduser('~/mnt/sanscripts/data/processed_data_v2/bhagwad_gita')
SNAKE = {'insight': 'insight', 'simpleInsight': 'simple_insight', 'modernRelevance': 'modern_relevance', 'detailedMeaning': 'detailed_meaning'}
dry = '--dry' in sys.argv
patches = {}
for f in sorted(glob.glob(os.path.join(ROOT, '.slop-review/verses/out-*.json'))):
    for r in rd(f):
        patches[r['file']] = {k: v.strip() for k, v in r.items() if k in SNAKE and isinstance(v, str) and v.strip()}
# map chapter.verse -> source file via parsed meta index
src_by_ref = {}
if os.path.isdir(SRC):
    for f in glob.glob(os.path.join(SRC, 'verse_*.json')):
        d = rd(f)
        idx = (d.get('input') or {}).get('meta', {}).get('index') or (d.get('meta') or {}).get('index')
        if idx:
            c, v = idx.split(',')[:2]
            src_by_ref[f'{int(c)}-{int(v)}.json'] = f
n_fe = n_src = changed = 0
for fname, p in patches.items():
    fp = os.path.join(FE, fname)
    d = rd(fp)
    for k, v in p.items():
        if d.get(k) != v: d[k] = v; changed += 1
    if not dry: wr(fp, d); n_fe += 1
    sf = src_by_ref.get(fname)
    if sf:
        s = rd(sf)
        for k, v in p.items(): s['parsed'][SNAKE[k]] = v
        if not dry: wr(sf, s); n_src += 1
print(f'patched verses: {len(patches)}, field changes: {changed}, frontend files written: {n_fe}, source files written: {n_src}, source map size: {len(src_by_ref)}')

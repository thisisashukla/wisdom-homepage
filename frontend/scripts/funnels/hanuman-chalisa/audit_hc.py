#!/usr/bin/env python3
"""Runs the house copy audit (tools/copy-audit/audit.py) on the Hanuman Chalisa
funnel files, which audit.py does not list, plus the text fields of
chalisa.json and cards.json. Also fails on any em or en dash.

Run from the repo root: python3 frontend/scripts/funnels/hanuman-chalisa/audit_hc.py
"""
import glob
import importlib.util
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
FE = os.path.join(ROOT, 'frontend')
spec = importlib.util.spec_from_file_location('audit', os.path.join(ROOT, 'tools', 'copy-audit', 'audit.py'))
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

GROUPS = {
    'hc-hub': ['src/app/hanuman-chalisa/page.tsx', 'src/components/funnels/hanuman-chalisa/Blocks.tsx'],
    'hc-line': ['src/app/hanuman-chalisa/[line]/page.tsx', 'src/components/funnels/hanuman-chalisa/LineShare.tsx'],
    'hc-learn': ['src/app/hanuman-chalisa/learn/page.tsx', 'src/components/funnels/hanuman-chalisa/LearnMode.tsx'],
    'hc-108': ['src/app/hanuman-chalisa/108/page.tsx', 'src/components/funnels/hanuman-chalisa/Counter.tsx', 'src/components/funnels/hanuman-chalisa/Mala.tsx'],
    'hc-how-many': ['src/app/hanuman-chalisa/how-many-times/page.tsx'],
    'hc-jayanti': ['src/app/hanuman-jayanti-2027/page.tsx'],
    'hc-hi': ['src/app/hi/hanuman-chalisa/page.tsx'],
    'hc-lib': ['src/lib/funnels/hanuman-chalisa/index.ts'],
}

bad = 0
for name, paths in GROUPS.items():
    txt = '\n'.join(audit.visible_text(open(os.path.join(FE, p), encoding='utf-8').read()) for p in paths)
    r = audit.score_text(txt)
    flagged = {k: v for k, v in r['hits'].items() if v}
    print(f"{name}: words={r['words']} index={r['index']} counts={ {k: c for k, c in r['counts'].items() if c} }")
    for k, v in flagged.items():
        for h in v:
            print(f'   [{k}] {h}')

data = json.load(open(os.path.join(FE, 'src/content/funnels/hanuman-chalisa/chalisa.json'), encoding='utf-8'))
parts = []
for u in data['units']:
    parts += [u['meaning']['en'], u['quick']] + [w['gloss'] for w in u['words']] + u['variants']
    if u['ramayana']:
        parts.append(u['ramayana']['en'])
cards = json.load(open(os.path.join(FE, 'src/content/funnels/hanuman-chalisa/cards.json'), encoding='utf-8'))
parts += [c['meaning']['en'] for c in cards]
r = audit.score_text('\n'.join(parts))
print(f"hc-data: words={r['words']} index={r['index']} counts={ {k: c for k, c in r['counts'].items() if c} }")
for k, v in r['hits'].items():
    for h in v:
        print(f'   [{k}] {h}')

files = [os.path.join(FE, p) for g in GROUPS.values() for p in g]
files += glob.glob(os.path.join(FE, 'src/components/funnels/hanuman-chalisa/*'))
files += glob.glob(os.path.join(FE, 'src/content/funnels/hanuman-chalisa/*.json'))
files += glob.glob(os.path.join(FE, 'src/app/hanuman-chalisa/**/*.tsx'), recursive=True)
files += glob.glob(os.path.join(ROOT, 'lp/funnels/hanuman-chalisa/*.md'))
files += [os.path.join(FE, 'src/lib/funnelSitemaps/hanuman-chalisa.ts'), os.path.join(FE, 'src/lib/funnels/hanuman-chalisa/shared.ts')]
for f in sorted(set(files)):
    s = open(f, encoding='utf-8').read()
    for ch in ('\u2014', '\u2013'):
        if ch in s:
            bad += 1
            print('DASH', os.path.relpath(f, ROOT), repr(ch), s.count(ch))
    if '!' in audit.visible_text(s) and f.endswith('.tsx'):
        for line in audit.visible_text(s).split('\n'):
            if '!' in line:
                print('EXCLAMATION?', os.path.relpath(f, ROOT), line[:100])
print('dash hits:', bad)
sys.exit(1 if bad else 0)

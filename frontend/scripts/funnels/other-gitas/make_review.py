#!/usr/bin/env python3
"""Writes the data part of lp/funnels/other-gitas/REVIEW.md from ashtavakra.json and cards.json.
Run from frontend/: python3 scripts/funnels/other-gitas/make_review.py > /tmp/review-data.md"""
import json, os
FE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(FE, 'src/content/funnels/other-gitas/ashtavakra.json'), encoding='utf-8'))
cards = json.load(open(os.path.join(FE, 'src/content/funnels/other-gitas/cards.json'), encoding='utf-8'))
show = [x for x in d['verses'] if 'commentary' in x]
rest = [x for x in d['verses'] if 'commentary' not in x]
out = []
out.append('## A. The 40 showcase verses (indexed pages): translation, note, word meanings, commentary, Gita link\n')
for x in show:
    ref = f"{x['c']}.{x['v']}"
    out.append(f"### {ref} ({'Janaka' if x['speaker'] == 'janaka' else 'Ashtavakra'})  [ ] checked\n")
    out.append(f"- Sanskrit: {x['sa']}")
    out.append(f"- English: {x['en']}")
    out.append(f"- What to notice: {x['notice']}")
    out.append('- Words: ' + '; '.join(f"{w['w']} = {w['m']}" for w in x['words']))
    if x.get('bridge'):
        b = x['bridge']
        out.append(f"- Gita link ({b['kind']}): BG {b['c']}.{b['v']}. {b['note']}")
    out.append(f"- Commentary ({len(x['commentary'].split())} words): {x['commentary']}\n")
out.append('## B. Share cards (20): short meanings, English and Hindi\n')
out.append('| Card | English | Hindi |')
out.append('|---|---|---|')
for c in cards:
    out.append(f"| {c['id']} | {c['meaning']['en']} | {c['meaning']['hi']} |")
out.append('\n## C. The other 258 verse translations (pages are noindex until notes exist)\n')
out.append('| Ref | Speaker | Wisdom English |')
out.append('|---|---|---|')
for x in rest:
    out.append(f"| {x['c']}.{x['v']} | {'J' if x['speaker'] == 'janaka' else 'A'} | {x['en']} |")
print('\n'.join(out))

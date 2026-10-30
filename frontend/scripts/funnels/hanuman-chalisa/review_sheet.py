#!/usr/bin/env python3
"""Appends the per-line review sheet (generated from chalisa.json and cards.json)
to lp/funnels/hanuman-chalisa/REVIEW.md, below the hand-written decisions.
The hand-written part lives in REVIEW.head.md next to it.

Run from frontend/: python3 scripts/funnels/hanuman-chalisa/review_sheet.py
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
FE = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
LP = os.path.abspath(os.path.join(FE, '..', 'lp', 'funnels', 'hanuman-chalisa'))

d = json.load(open(os.path.join(FE, 'src/content/funnels/hanuman-chalisa/chalisa.json'), encoding='utf-8'))
cards = json.load(open(os.path.join(FE, 'src/content/funnels/hanuman-chalisa/cards.json'), encoding='utf-8'))
card_units = {c['unit'] for c in cards}

out = []
out.append('## Share cards (showcase lines, check these first)\n')
out.append('Each card meaning is at most 20 words. Images: /api/quote-card/<id>?format=post&lang=en\n')
for c in cards:
    out.append(f"- **{c['id']}** ({c['sourceName']['en']}): {c['sanskritLine']}")
    out.append(f"  - EN: {c['meaning']['en']}")
    out.append(f"  - HI: {c['meaning']['hi']}")
out.append('')
out.append('## Every line (reviewed: false on all 43)\n')
out.append('For each line check: the Awadhi against your Gita Press copy, the sung IAST, the English and Hindi meaning, the word glosses, the Ramayana note and its reference, and the variant notes.\n')
ordered = sorted(d['units'], key=lambda u: (u['id'] not in card_units, u['pos']))
for u in ordered:
    star = ' (share card)' if u['id'] in card_units else ''
    out.append(f"### {u['label']['en']}{star}: /hanuman-chalisa/{u['slug']}\n")
    out.append(f"- Awadhi: {u['awadhi'][0]} {u['awadhi'][1]}")
    out.append(f"- Sung IAST: {u['iast'][0]} / {u['iast'][1]}")
    out.append(f"- Scholarly IAST: {u['iastScholarly'][0]} / {u['iastScholarly'][1]}")
    out.append(f"- EN: {u['meaning']['en']}")
    out.append(f"- HI: {u['meaning']['hi']}")
    out.append('- Words: ' + '; '.join(f"{w['w']} ({w['iast']}) = {w['gloss']}" for w in u['words']))
    if u['ramayana']:
        out.append(f"- Ramayana: {u['ramayana']['en']}")
        for r in u['ramayana']['refs']:
            out.append(f"  - {r['label']} [{r['id']}]: {r['text']}")
    else:
        out.append('- Ramayana: none (page says the line does not retell one episode)')
    for v in u['variants']:
        out.append(f'- Variant note: {v}')
    out.append('')

head = open(os.path.join(LP, 'REVIEW.head.md'), encoding='utf-8').read()
with open(os.path.join(LP, 'REVIEW.md'), 'w', encoding='utf-8') as f:
    f.write(head.rstrip() + '\n\n' + '\n'.join(out) + '\n')
print('wrote REVIEW.md')

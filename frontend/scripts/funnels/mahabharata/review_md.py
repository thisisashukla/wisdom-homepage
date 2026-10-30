"""Write lp/funnels/mahabharata/REVIEW.md: the owner's checklist, generated from lines.json and cards.json
plus the hand-written header in review_head.md. Run from frontend/ after build_lines.py."""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
FE = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
OUT = os.path.abspath(os.path.join(FE, '..', 'lp', 'funnels', 'mahabharata', 'REVIEW.md'))
d = json.load(open(os.path.join(FE, 'src/content/funnels/mahabharata/lines.json'), encoding='utf8'))
cards = {c['id']: c for c in json.load(open(os.path.join(FE, 'src/content/funnels/mahabharata/cards.json'), encoding='utf8'))}

SHOWCASE = ['mbh.3.314.118', 'mbh.3.314.119', 'mbh.3.314.62', 'mbh.5.33.85', 'mbh.5.37.15', 'mbh.5.39.73', 'mbh.5.39.9',
            'mbh.5.133.15', 'mbh.5.145.2', 'mbh.5.146.23', 'mbh.5.81.24', 'mbh.5.81.44', 'mbh.12.305.20', 'mbh.13.175.8', 'mbh.12.221.48']


def block(l):
    out = [f"### {l['ref']} ({l['speaker']['en']})", '', '```', l['deva'], '```', '']
    out.append(f"- English: {l['en']}")
    if l.get('hi'):
        out.append(f"- Hindi: {l['hi']}")
    if l.get('context'):
        out.append(f"- Context note: {l['context']}")
    if l.get('note'):
        out.append(f"- Editor's note: {l['note']}")
    if l['emended']:
        out.append(f"- EMENDED. Corpus reads: `{l['corpus']}` (match {l['match']})")
    if l['noShare']:
        out.append('- No share actions, no card (Draupadi in the hall).')
    if l['cardId']:
        c = cards[l['cardId']]
        out.append(f"- Share card `{c['id']}`: line `{c['sanskritLine'].replace(chr(10), ' / ')}`; en \"{c['meaning']['en']}\"; hi \"{c['meaning']['hi']}\"")
    out.append('- reviewed: false')
    out.append('')
    return out


head = open(os.path.join(HERE, 'review_head.md'), encoding='utf8').read()
lines = [head.rstrip(), '', '## 2. Showcase lines (check these first)', '']
by = {l['id']: l for l in d['lines']}
for sid in SHOWCASE:
    if sid in by:
        lines += block(by[sid])
    else:
        lines += [f'### {sid}', '', '- Showcase id from the brief; not published (see section 1).', '']
lines += ['## 3. Every other published line', '']
for l in d['lines']:
    if l['id'] not in SHOWCASE:
        lines += block(l)
lines += ['## 4. Excluded lines (never shown, never carded)', '', '| Id | Reason |', '|---|---|']
for x in d['excluded']:
    lines.append(f"| {x['id']} | {x['exclude']['reason']} |")
lines.append('')
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf8').write('\n'.join(lines))
print('wrote', OUT, len(lines), 'lines')

"""Build src/content/funnels/mahabharata/{lines.json,cards.json} from the authored line files.

For every line it checks the Devanagari we publish against the wisdom_kb corpus
(~/mnt/sanscripts/wisdom_kb/out/verses.jsonl, text == "mbh"), records the corpus
reading when we emended it, generates IAST, and enforces the house rules
(no em or en dash, card meanings at most 20 words, card line inside the verse).
Run from frontend/: python3 scripts/funnels/mahabharata/build_lines.py
"""
import difflib, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from translit import to_iast  # noqa: E402
from speakers import SPEAKERS  # noqa: E402
import lines_yaksha, lines_udyoga, lines_late  # noqa: E402

CORPUS = os.path.expanduser('~/mnt/sanscripts/wisdom_kb/out/verses.jsonl')
OUT = os.path.join(HERE, '..', '..', '..', 'src', 'content', 'funnels', 'mahabharata')

PARVA = {
    3: ('Vana Parva', 'वन पर्व'),
    5: ('Udyoga Parva', 'उद्योग पर्व'),
    12: ('Shanti Parva', 'शांति पर्व'),
    13: ('Anushasana Parva', 'अनुशासन पर्व'),
    14: ('Ashvamedhika Parva', 'आश्वमेधिक पर्व'),
}

ANU = 'The Anushasana Parva is widely treated as a late didactic layer, and this line contradicts the epic\'s own women: Draupadi\'s question of law, Vidula, Kunti, Gandhari and Sulabha.'
VID = 'Screened from Vidura Niti: the line demeans or confines women, which the epic\'s own women (Draupadi, Vidula, Kunti, Gandhari) contradict. Not shown and never made a card.'
EXCLUDE = {
    'mbh.13.51.14': ANU, 'mbh.13.51.21': ANU, 'mbh.13.81.14': ANU, 'mbh.13.73.1': ANU, 'mbh.13.73.12': ANU,
}
for i in ['5.33.62', '5.33.71', '5.33.87', '5.33.92', '5.33.93', '5.33.99', '5.34.21', '5.34.22', '5.34.39',
          '5.34.41', '5.34.76', '5.35.81', '5.35.84', '5.36.58', '5.37.18', '5.37.30', '5.37.57', '5.38.10',
          '5.38.32', '5.38.42', '5.38.43', '5.38.45', '5.39.66', '5.39.74', '5.39.78', '5.39.80', '5.39.82', '5.39.83']:
    EXCLUDE['mbh.' + i] = VID


def norm(s):
    s = re.sub(r"[\s।॥/|\-`'’‘\[\]\.0-9०-९]", '', s)
    return s


def load_corpus():
    out = {}
    with open(CORPUS, encoding='utf8') as f:
        for l in f:
            if '"text": "mbh"' not in l:
                continue
            r = json.loads(l)
            out[r['id']] = r['sanskrit']
    return out


def ids_of(lid):
    m = re.match(r'^mbh\.(\d+)\.(\d+)\.(\d+)(?:-(\d+))?$', lid)
    if not m:
        raise SystemExit(f'bad id {lid}')
    b, a, v, v2 = m.groups()
    vs = range(int(v), int(v2 or v) + 1)
    return int(b), int(a), [f'mbh.{b}.{a}.{x}' for x in vs], (f'{b}.{a}.{v}' + (f' to {v2}' if v2 else ''))


DASH = re.compile('[' + chr(0x2013) + chr(0x2014) + ']')


def main():
    corpus = load_corpus()
    lines, cards, problems = [], [], []
    seen = set()
    for src in (lines_yaksha.LINES, lines_udyoga.LINES, lines_late.LINES):
        for L in src:
            lid = L['id']
            if lid in seen:
                problems.append(f'duplicate {lid}')
            seen.add(lid)
            book, adhyaya, parts, label = ids_of(lid)
            missing = [p for p in parts if p not in corpus]
            if missing:
                problems.append(f'{lid}: not in corpus {missing}')
                continue
            if any(p in EXCLUDE for p in parts):
                problems.append(f'{lid}: is excluded')
            corpus_text = ' / '.join(corpus[p] for p in parts)
            a, b = norm(L['deva']), norm(corpus_text)
            ratio = difflib.SequenceMatcher(None, a, b).ratio()
            emended = a != b
            if ratio < 0.86:
                problems.append(f'{lid}: low match {ratio:.2f}')
            sp_en, sp_hi = SPEAKERS[L['sp']]
            for k in ('en', 'hi', 'context', 'note'):
                if L.get(k) and DASH.search(L[k]):
                    problems.append(f'{lid}: dash in {k}')
            row = {
                'id': lid,
                'ref': f'MBh {label}',
                'refHi': f'महाभारत {label.replace(" to ", " से ")}',
                'book': book,
                'adhyaya': adhyaya,
                'parva': {'en': PARVA[book][0], 'hi': PARVA[book][1]},
                'deva': L['deva'],
                'iast': to_iast(L['deva']),
                'speaker': {'en': sp_en, 'hi': sp_hi},
                'en': L['en'],
                'hi': L.get('hi'),
                'context': L.get('context'),
                'note': L.get('note'),
                'noShare': bool(L.get('noShare')),
                'cardId': None,
                'emended': emended,
                'corpus': corpus_text if emended else None,
                'match': round(ratio, 3),
                'reviewed': False,
            }
            c = L.get('card')
            if c:
                if L.get('noShare') or L.get('noCard'):
                    problems.append(f'{lid}: card on a no-share line')
                if c['line'] not in L['deva']:
                    problems.append(f'{lid}: card line not inside the verse')
                for k in ('en', 'hi'):
                    if len(c[k].split()) > 20:
                        problems.append(f'{lid}: card {k} over 20 words')
                    if DASH.search(c[k]):
                        problems.append(f'{lid}: dash in card {k}')
                cid = 'mbh-' + lid[4:].replace('.', '-')
                row['cardId'] = cid
                cards.append({
                    'id': cid,
                    'source': 'other',
                    'sourceName': {'en': f'Mahabharata {label}', 'hi': f'महाभारत {label}'},
                    'speaker': {'en': sp_en, 'hi': sp_hi},
                    'sanskritLine': c['line'],
                    'iast': to_iast(c['line']),
                    'meaning': {'en': c['en'], 'hi': c['hi']},
                    'reviewed': False,
                })
            lines.append(row)
    excluded = [{'id': k, 'exclude': {'reason': v}, 'corpus': corpus.get(k)} for k, v in EXCLUDE.items()]
    os.makedirs(OUT, exist_ok=True)
    meta = {
        'edition': 'Sanskrit from the wisdom_kb corpus (processed_mahabharat_shloka): books 3, 5, 12, 13 and 14 only. '
                   'Adhyaya counts (Vana 315, Udyoga 196, Shanti 375, Anushasana 274, Ashvamedhika 118) match a southern-recension '
                   'printed text of the Kumbhakonam type, not the Pune critical edition (Shanti 353, Anushasana 154, Ashvamedhika 96).',
        'translation': "Wisdom's own English, read with Nilakantha's commentary; K. M. Ganguli (public domain) used only as a crib.",
        'built': '2026-10-30',
    }
    json.dump({'meta': meta, 'lines': lines, 'excluded': excluded}, open(os.path.join(OUT, 'lines.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    json.dump(cards, open(os.path.join(OUT, 'cards.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    print(f'{len(lines)} lines, {len(cards)} cards, {len(excluded)} excluded, {sum(1 for l in lines if l["emended"])} emended')
    for p in problems:
        print('PROBLEM', p)
    for l in lines:
        if l['emended']:
            print(f"  emended {l['id']} match={l['match']}")


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""Builds src/content/funnels/other-gitas/{ashtavakra.json,cards.json} from the corpus and Wisdom's own English.

Run from frontend/: python3 scripts/funnels/other-gitas/build.py
Corpus (read-only): $HOME/mnt/sanscripts/wisdom_kb/out/verses.jsonl. The corpus Hindi and English are not published.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from translit import to_iast, clean
from chapters import CHAPTERS, JANAKA
from en_1 import EN as E1
from en_2 import EN as E2
from en_3 import EN as E3
from show_1 import SHOW as S1
from show_2 import SHOW as S2
from cards_data import CARDS

FE = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
CORPUS = os.path.expanduser('~/mnt/sanscripts/wisdom_kb/out/verses.jsonl')
OUT = os.path.join(FE, 'src', 'content', 'funnels', 'other-gitas')
EN = {**E1, **E2, **E3}
SHOW = {**S1, **S2}

# Sanskrit fixes against the common printed text. Each is listed in lp/funnels/other-gitas/REVIEW.md.
FIXES = {
    '6.2': [('वीचिसऽन्निभः', 'वीचिसन्निभः')],
    '7.4': [('एतदेवाहमास्तितः', 'एतदेवाहमास्थितः')],
    '11.8': [('नाश्चर्यमिदं', 'नानाश्चर्यमिदं')],
    '12.4': [('ब्रह्मन्न् ', 'ब्रह्मन्')],
    '13.6': [('विहायास्मदहमासे', 'विहायास्मादहमासे')],
    '17.8': [('जिघ्रन्न् ', 'जिघ्रन्')],
    '17.12': [('जिघ्रन्न् ', 'जिघ्रन्')],
    '18.65': [('जिघ्रन्न् ', 'जिघ्रन्')],
    '18.90': [('ब्रुवन्न् अपि', 'ब्रुवन्नपि')],
    '18.96': [('किञ्चिन्न्न', 'किञ्चिन्न')],
    '19.1': [('नाविधपरामर्श', 'नानाविधपरामर्श')],
}


def words(s):
    return len(re.findall(r"[A-Za-z0-9'’]+", s))


def main():
    rows = [json.loads(l) for l in open(CORPUS, encoding='utf-8') if '"text": "ashtavakra"' in l]
    rows.sort(key=lambda r: r['order'])
    assert len(rows) == 298, len(rows)
    verses, fixes_applied = [], []
    for r in rows:
        c, v = int(r['ref']['chapter']), int(r['ref']['verse'])
        key = f'{c}.{v}'
        sa = clean(r['sanskrit'])
        for a, b in FIXES.get(key, []):
            if a in sa:
                sa = sa.replace(a, b)
                fixes_applied.append(key)
        sa = re.sub(r'\s*।\s*', ' । ', sa).replace(' ॥', ' ॥').strip()
        sa = re.sub(r'\s+', ' ', sa)
        speaker = 'janaka' if (c in JANAKA or key == '1.1') else 'ashtavakra'
        en = EN[key]
        title, gist = CHAPTERS[c]
        if key == '1.1':
            who = 'King Janaka asks it of his teacher, the sage Ashtavakra'
        elif speaker == 'janaka':
            who = 'King Janaka speaks it to his teacher, the sage Ashtavakra'
        else:
            who = 'the sage Ashtavakra speaks it to King Janaka'
        quick = f'Ashtavakra Gita {key} is a verse from chapter {c} ({title}). {who[0].upper() + who[1:]}. In plain English it says: "{en}"'
        if words(quick) < 40:
            quick += f' Chapter {c}: {gist[0].lower() + gist[1:]}'
        item = {
            'c': c, 'v': v, 'id': f'ag-{c}-{v}', 'speaker': speaker,
            'sa': sa, 'iast': to_iast(sa), 'en': en, 'quick': quick, 'reviewed': False,
        }
        s = SHOW.get(key)
        if s:
            item['notice'] = s['notice']
            item['words'] = [{'w': w, 'm': m} for w, m in s['words']]
            item['commentary'] = s['commentary']
            if s.get('bridge'):
                bc, bv, kind, note = s['bridge']
                item['bridge'] = {'c': bc, 'v': bv, 'kind': kind, 'note': note}
        verses.append(item)
    missing = [k for k in FIXES if k not in fixes_applied]
    if missing:
        print('fixes not applied:', missing)
    chapters = []
    for n in range(1, 21):
        vs = [x for x in verses if x['c'] == n]
        chapters.append({'n': n, 'title': CHAPTERS[n][0], 'gist': CHAPTERS[n][1], 'count': len(vs),
                         'speaker': 'janaka' if n in JANAKA else 'ashtavakra'})
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, 'ashtavakra.json'), 'w', encoding='utf-8') as f:
        json.dump({'chapters': chapters, 'verses': verses}, f, ensure_ascii=False, indent=1)
    by = {f"{x['c']}.{x['v']}": x for x in verses}
    cards = []
    for key, (men, mhi) in CARDS.items():
        x = by[key]
        jan = x['speaker'] == 'janaka'
        cards.append({
            'id': x['id'], 'source': 'other',
            'sourceName': {'en': f'Ashtavakra Gita {key}', 'hi': f'अष्टावक्र गीता {key}'},
            'speaker': {'en': 'King Janaka', 'hi': 'राजा जनक'} if jan else {'en': 'Ashtavakra to Janaka', 'hi': 'अष्टावक्र, जनक से'},
            'sanskritLine': x['sa'], 'iast': x['iast'], 'meaning': {'en': men, 'hi': mhi}, 'reviewed': False,
        })
        assert len(men.split()) <= 20, (key, len(men.split()))
    with open(os.path.join(OUT, 'cards.json'), 'w', encoding='utf-8') as f:
        json.dump(cards, f, ensure_ascii=False, indent=1)
    qs = [words(x['quick']) for x in verses]
    print('verses', len(verses), 'indexable', sum(1 for x in verses if 'commentary' in x), 'cards', len(cards),
          'quick words min/max', min(qs), max(qs), 'fixes', len(set(fixes_applied)))


if __name__ == '__main__':
    main()

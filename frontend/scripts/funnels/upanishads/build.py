"""
Build the Upanishads funnel content.

Usage (from frontend/): python3 -I scripts/funnels/upanishads/build.py [corpus_raw_json_dir]

Reads (never writes) the corpus at $HOME/mnt/sanscripts/data/raw_json, applies
src/fixes.json (edition reconciliation), src/imports_kena.json and
src/imports.json (texts missing from the corpus), merges prose records that the
corpus splits under one index, restores adhyaya.khanda.verse refs, attaches
Wisdom's own English (src/en_*.json) and writes:

  src/content/funnels/upanishads/texts/{isha,mandukya,katha}.json
  src/content/funnels/upanishads/passages.json
  src/content/funnels/upanishads/cards.json   (checked against passages)

Every generated English line carries reviewed: false. Corpus Hindi is never
copied (lineage and licence unknown).
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
FRONT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
OUT = os.path.join(FRONT, 'src', 'content', 'funnels', 'upanishads')
sys.path.insert(0, HERE)
from translit import normalize, to_iast  # noqa: E402

RAW = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.environ['HOME'], 'mnt', 'sanscripts', 'data', 'raw_json')
SD = 'https://sanskritdocuments.org/doc_upanishhat/'
CORPUS = 'sanscripts corpus'


def load(name):
    return json.load(open(os.path.join(HERE, 'src', name), encoding='utf-8'))


FIXES = load('fixes.json')
KENA = load('imports_kena.json')
IMPORTS = load('imports.json')

FILES = {
    'isha': 'isha', 'mandukya': 'mandukya', 'katha': 'kath', 'mundaka': 'mundaka', 'chandogya': 'chhandogya',
    'brihadaranyaka': 'brihadaranyak', 'taittiriya': 'taittiriya', 'aitareya': 'aitareya',
}
KB = {'isha': 'up_isha', 'mandukya': 'up_mandukya', 'katha': 'up_kath', 'mundaka': 'up_mundaka',
      'chandogya': 'up_chhandogya', 'brihadaranyaka': 'up_brihadaranyak', 'taittiriya': 'up_taittiriya',
      'aitareya': 'up_aitareya'}


def corpus(text):
    """ref -> {sa, orders}: records sharing one index are merged into one verse."""
    d = json.load(open(os.path.join(RAW, f'{FILES[text]}_upanishad_source.json'), encoding='utf-8'))
    out = {}
    for r in d:
        ref = r['meta']['index'].replace(',', '.')
        t = (r['source'].get('Hindi') or '').strip()
        if ref in out:
            out[ref]['sa'] += '\n' + t
            out[ref]['orders'].append(r['meta']['order'])
        else:
            out[ref] = {'sa': t, 'orders': [r['meta']['order']]}
    return out


def tidy(sa):
    sa = normalize(sa)
    sa = re.sub(r'\s*॥\s*$', ' ॥', sa)
    sa = re.sub(r'।(?=\S)', '। ', sa)
    sa = re.sub(r'[ ]{2,}', ' ', sa)
    return sa.strip()


def verse(text, ref):
    """Reconciled Sanskrit for one ref of a corpus text."""
    c = corpus(text)
    if ref not in c:
        raise KeyError(f'{text} {ref} not in corpus')
    fx = FIXES.get(text, {}).get(ref)
    rec = c[ref]
    kb = [f"{KB[text]}.{ref}" if text in ('isha', 'mandukya', 'katha', 'mundaka') else f"{KB[text]}.{o}" for o in rec['orders']]
    kb = sorted(set(kb))
    if fx and fx.get('spacingOnly'):
        return {'sa': tidy(fx['sa']), 'basis': CORPUS + '; word division as in ' + fx['basis'], 'kb': kb}
    if fx:
        return {'sa': tidy(fx['sa']), 'basis': fx['basis'], 'corpusReading': tidy(fx['corpus']), 'kb': kb,
                'variants': fx.get('variants', [])}
    return {'sa': tidy(rec['sa']), 'basis': CORPUS, 'kb': kb}


def strip_om(sa):
    return re.sub(r'^ॐ\s*', '', sa)


def text_file(text, en_name, refs, invocation=None, speakers=False):
    en = load(en_name)
    verses = []
    for ref in refs:
        v = verse(text, ref)
        e = en[ref]
        item = {'ref': ref, 'anchor': 'v' + ref.replace('.', '-'), 'sa': v['sa'], 'iast': to_iast(v['sa']),
                'en': e[1] if speakers else e, 'reviewed': False, 'basis': v['basis'], 'kb': v['kb']}
        if speakers:
            item['speaker'] = e[0]
        if v.get('variants'):
            item['variants'] = v['variants']
        verses.append(item)
    data = {'id': text, 'verses': verses}
    if invocation:
        imp = IMPORTS[invocation]
        inv_en = en['0'][1] if speakers else en['0']
        data['invocation'] = {'sa': tidy(imp['sa']), 'iast': to_iast(tidy(imp['sa'])), 'en': inv_en,
                              'reviewed': False, 'basis': imp['basis'], 'where': imp['where']}
    return data


def refs_of(text):
    keys = list(corpus(text).keys())
    return sorted(keys, key=lambda k: [int(x) for x in k.split('.')])


def passage(key, text, ref, sa=None, basis=None, note=None):
    if sa is None:
        v = verse(text, ref)
        sa, basis, kb = v['sa'], v['basis'], v['kb']
    else:
        kb = []
    sa = tidy(sa)
    out = {'key': key, 'text': text, 'ref': ref, 'sa': sa, 'iast': to_iast(sa), 'basis': basis, 'kb': kb}
    if note:
        out['note'] = note
    return out


def main():
    os.makedirs(os.path.join(OUT, 'texts'), exist_ok=True)
    isha = text_file('isha', 'en_isha.json', [str(i) for i in range(1, 19)], invocation='shanti.purnamadah')
    mand = text_file('mandukya', 'en_mandukya.json', [str(i) for i in range(1, 13)])
    katha = text_file('katha', 'en_katha.json', refs_of('katha'), invocation='shanti.sahanavavatu', speakers=True)
    assert len(isha['verses']) == 18 and len(mand['verses']) == 12 and len(katha['verses']) == 119
    for name, data in (('isha', isha), ('mandukya', mand), ('katha', katha)):
        json.dump(data, open(os.path.join(OUT, 'texts', f'{name}.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    P = [
        passage('chandogya.6.8.7', 'chandogya', '6.8.7'),
        passage('chandogya.6.13.1', 'chandogya', '6.13.1'),
        passage('chandogya.6.13.2', 'chandogya', '6.13.2'),
        passage('chandogya.6.13.3', 'chandogya', '6.13.3'),
        passage('chandogya.6.1.3', 'chandogya', '6.1.3'),
        passage('mundaka.3.1.6', 'mundaka', '3.1.6'),
        passage('mundaka.3.1.1', 'mundaka', '3.1.1'),
        passage('mundaka.2.2.8', 'mundaka', '2.2.8'),
        passage('mundaka.1.1.3', 'mundaka', '1.1.3'),
        passage('brihadaranyaka.1.3.28', 'brihadaranyaka', '1.3.28',
                note='The corpus splits this one section into four records (KB up_brihadaranyak.56 to .59); merged here.'),
        passage('brihadaranyaka.1.4.10', 'brihadaranyaka', '1.4.10',
                note='Three corpus records (KB up_brihadaranyak.78 to .80) merged into one section.'),
        passage('brihadaranyaka.2.3.6', 'brihadaranyaka', '2.3.6'),
        passage('brihadaranyaka.5.1.1', 'brihadaranyaka', '5.1.1'),
        passage('taittiriya.1.11.1', 'taittiriya', '1.11.1'),
        passage('taittiriya.1.11.2', 'taittiriya', '1.11.2'),
        passage('aitareya.3.1.3', 'aitareya', '3.1.3'),
        passage('katha.1.3.14', 'katha', '1.3.14'),
        passage('katha.1.2.18', 'katha', '1.2.18'),
        passage('katha.1.2.19', 'katha', '1.2.19'),
        passage('isha.1', 'isha', '1'),
        passage('isha.6', 'isha', '6'),
        passage('mandukya.2', 'mandukya', '2'),
        passage('mandukya.7', 'mandukya', '7'),
        passage('kena.1.1', 'kena', '1.1', sa=KENA['kena']['1.1']['sa'], basis=KENA['kena_basis']),
        passage('kena.1.2', 'kena', '1.2', sa=KENA['kena']['1.2']['sa'], basis=KENA['kena_basis']),
        passage('shanti.purnamadah', 'isha', 'invocation', sa=IMPORTS['shanti.purnamadah']['sa'], basis=IMPORTS['shanti.purnamadah']['basis']),
        passage('shanti.sahanavavatu', 'taittiriya', 'invocation', sa=IMPORTS['shanti.sahanavavatu']['sa'], basis=IMPORTS['shanti.sahanavavatu']['basis']),
        passage('taittiriya.2.1.1a', 'taittiriya', '2.1.1', sa=IMPORTS['taittiriya.2.1.1a']['sa'], basis=IMPORTS['taittiriya.2.1.1a']['basis']),
    ]
    passages = {p['key']: p for p in P}
    json.dump(passages, open(os.path.join(OUT, 'passages.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    cards = load('cards_spec.json')
    squash = lambda s: re.sub(r'[\s।॥]', '', s)
    for c in cards:
        key = c.pop('passage')
        line = c['sanskritLine']
        check = c.pop('check', line)
        assert squash(check).replace('ॐ', '') in squash(passages[key]['sa']).replace('ॐ', ''), (c['id'], line)
        assert len(c['meaning']['en'].split()) <= 20, c['id']
        assert len(c['meaning']['hi'].split()) <= 20, c['id']
        c['sanskritFull'] = passages[key]['sa']
        c.setdefault('iast', to_iast(line))
        c['reviewed'] = False
    json.dump(cards, open(os.path.join(OUT, 'cards.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('texts: isha', len(isha['verses']), 'mandukya', len(mand['verses']), 'katha', len(katha['verses']))
    print('passages', len(passages), 'cards', len(cards))


if __name__ == '__main__':
    main()

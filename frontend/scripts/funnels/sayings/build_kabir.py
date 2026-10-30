"""Builds src/content/funnels/sayings/kabir.json (top-50 dohe, women-line review, data notes).
Run from frontend/: python3 scripts/funnels/sayings/build_kabir.py
Source: ~/mnt/sanscripts/data/corpus_new/bhakti_poetry_corpus.jsonl, text == "kabir" (1,099 lines).
"Where this line is found": Granthavali (Shyamsundar Das, via Kavitakosh) and Kavita-Kaumudi vol 1 (1917) by fuzzy match;
lines only in the Kavitakosh Dohavali compilation are tagged "sung tradition"."""
import json, os, re, sys
from difflib import SequenceMatcher
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from kabir_picks import K
from translit import roman
FE = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
SRC = os.path.expanduser('~/mnt/sanscripts/data/corpus_new/bhakti_poetry_corpus.jsonl')
OUT = os.path.join(FE, 'src', 'content', 'funnels', 'sayings', 'kabir.json')
ALL = [json.loads(l) for l in open(SRC)]
KAB = [r for r in ALL if r['text'] == 'kabir']
BY = {r['id']: r for r in KAB}

def clean(t):
    t = re.sub(r'[॥]\s*[०-९0-9]+\s*[॥]', '॥', t)
    t = t.replace('`', '').replace(' / ', ' ').replace('/', ' ')
    t = re.sub(r'\s+([।॥,])', r'\1', t)
    t = re.sub(r'\s*,\s*', ', ', t)
    return re.sub(r'\s+', ' ', t).strip()
def halves(t):
    t = t.rstrip('॥ ').strip()
    a, sep, b = t.partition('।')
    if not sep:
        a, sep, b = t.partition('॥')
    return [a.strip(' ,') + '।', b.strip(' ,') + '॥'] if b.strip() else [t + '॥']
def norm(t):
    t = re.sub(r'[^ऀ-ॿ]', '', t)
    t = re.sub(r'[।॥़ंँ्०-९]', '', t)
    return t.replace('ऱ', 'र')
def words(s):
    return len(re.findall(r'\S+', s))

SOURCES = {
 'granthavali': {'en': 'Kabir Granthavali (Shyamsundar Das)', 'hi': 'कबीर ग्रंथावली (श्यामसुंदर दास)'},
 'kavita-kaumudi': {'en': 'Kavita-Kaumudi vol 1 (Ramnaresh Tripathi, 1917)', 'hi': 'कविता-कौमुदी भाग 1 (रामनरेश त्रिपाठी, 1917)'},
 'sung': {'en': 'Sung tradition and popular collections', 'hi': 'गायन परंपरा और लोकप्रिय संग्रह'},
}
def found_in(text):
    n = norm(text); tags = []
    for prefix, tag in (('kabir.sdg.', 'granthavali'), ('kabir.kk.', 'kavita-kaumudi')):
        best = max((SequenceMatcher(None, n, norm(r['sanskrit'])).ratio() for r in KAB if r['id'].startswith(prefix)), default=0)
        if best >= 0.72: tags.append(tag)
    return tags or ['sung']

out = []; errors = []
for k in K:
    r = BY.get('kabir.' + k['rid'])
    if not r: sys.exit('missing record ' + k['rid'])
    t = clean(r['sanskrit'])
    for a, b in k.get('fix', []):
        if a not in t: errors.append(f"fix not applied {k['slug']}: {a}")
        t = t.replace(a, b)
    hv = halves(t)
    for w, (hi, en) in k['g'].items():
        if w not in t: errors.append(f"gloss word not in doha {k['slug']}: {w}")
    for lang in ('hi', 'en'):
        if words(k[lang]) > 20: errors.append(f"{lang} meaning > 20 words: {k['slug']} ({words(k[lang])})")
    out.append({'id': ('kab-' + k['slug'])[:40], 'slug': k['slug'], 'theme': k['theme'], 'lines': hv, 'roman': [roman(h) for h in hv],
                'foundIn': found_in(t), 'record': {'id': r['id'], 'section': r['section'], 'url': r['source_url'], 'quality': r['quality']},
                'fixes': [{'from': a, 'to': b} for a, b in k.get('fix', [])],
                'meaning': {'hi': k['hi'], 'en': k['en']}, 'gloss': [{'w': w, 'hi': v[0], 'en': v[1]} for w, v in k['g'].items()],
                'reviewed': False})
if errors:
    print('\n'.join(errors)); sys.exit(1)
slugs = [o['slug'] for o in out]; assert len(set(slugs)) == len(slugs)

# ── Lines that mention women: every hit reviewed, demeaning ones excluded with the reason ──
WOMEN = {
 'kabir.kk.155': 'exclude: casts another man\'s wife as a "sharp knife", so the woman is the danger; the verse blames her, not the man\'s conduct.',
 'kabir.kkdv.517': 'exclude: says a woman without devotion to the guru becomes a dog barking from lane to lane. Demeaning.',
}
women = []
for r in KAB:
    if re.search('नारी|नारि|कामिनी', r['sanskrit']):
        reason = WOMEN.get(r['id'])
        women.append({'id': r['id'], 'text': clean(r['sanskrit']), 'decision': 'exclude' if reason else 'keep',
                      'reason': reason.split(': ', 1)[1] if reason else {
                          'kabir.kk.31': 'नारी here is the pulse (nadi) as well as the wife: a line on death, nothing against women.',
                          'kabir.kkdv.827': 'Same line as kk.31: the pulse leaves the body. Kept.',
                          'kabir.kk.76': 'Describes a renunciant who keeps no money and no attachment. Aimed at the ascetic, not at women.',
                          'kabir.kkdv.182': 'Variant of kk.76. Kept for the same reason.',
                          'kabir.kkdv.377': 'Variant of kk.76. Kept for the same reason.',
                          'kabir.kkdv.277': 'Warns a man against chasing another\'s wife; the fault named is his.',
                          'kabir.kkdv.288': 'Men who chase other men\'s wives and live by theft come to ruin. Aimed at the men.',
                          'kabir.kkdv.384': 'Praises the water-carrier in a devotee\'s home over an emperor\'s queen. Honours a working woman.',
                          'kabir.kkdv.575': 'Variant of kkdv.384. Kept.',
                          'kabir.kkdv.387': 'Contrasts the queen\'s vanity with the water-carrier\'s remembrance of Ram. About devotion; kept, not featured.',
                          'kabir.kkdv.576': 'Variant of kkdv.387. Kept, not featured.',
                          'kabir.kkdv.619': 'A list of a man\'s vices to give up (gambling, theft, usury, another\'s wife). Aimed at his conduct; kept, not featured.',
                          'kabir.kkdv.628': 'Describes a renunciant who keeps away from worldly company. Ascetic discipline; kept, not featured.',
                      }.get(r['id'], 'Reviewed; kept, not featured.')})
for w in women:
    if w['decision'] == 'exclude':
        assert all(o['record']['id'] != w['id'] for o in out)

# ── Data notes ──
def dupes():
    recs = [(r['id'], norm(r['sanskrit'])) for r in KAB]; n = 0
    seen = []
    for i, t in recs:
        if any(SequenceMatcher(None, t, s).ratio() >= 0.85 for s in seen[-400:]): n += 1
        else: seen.append(t)
    return n
data = {
 'generated': '2026-10-30',
 'sources': SOURCES,
 'dohe': out,
 'womenReview': women,
 'notes': {
   'misfiled': [{'id': 'kabir.kkdv.241', 'text': clean(BY['kabir.kkdv.241']['sanskrit']), 'reason': 'A Rahim doha (क्षमा बड़न को चाहिए). Excluded from Kabir.'}],
   'missingFamous': ['अति का भला न बोलना', 'जिन खोजा तिन पाइयाँ', 'मन के हारे हार है', 'हम घर जाल्या आपणाँ (NCERT)', 'पखापखी के कारणैं (NCERT)', 'प्रेमी ढूँढ़त मैं फिरौं (NCERT)'],
   'nearDuplicates': dupes(),
 },
}
json.dump(data, open(OUT, 'w'), ensure_ascii=False, indent=1)
print('dohe', len(out), 'women', len(women), 'excluded', sum(w['decision'] == 'exclude' for w in women), 'near-dupes', data['notes']['nearDuplicates'])
import collections; print(collections.Counter(t for o in out for t in o['foundIn']))

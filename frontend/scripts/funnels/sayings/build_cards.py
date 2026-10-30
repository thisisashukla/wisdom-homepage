"""Builds src/content/funnels/sayings/cards.json (share cards for /api/quote-card/<id>).
20 Vivekananda (viv-), 15 Kabir (kab-), 10 Chanakya (chk-). Meanings at most 20 words.
Vivekananda lines are English originals: sanskritLine carries the English line and iast a short reference."""
import json, os
FE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..'))
D = os.path.join(FE, 'src', 'content', 'funnels', 'sayings')
viv = json.load(open(os.path.join(D, 'vivekananda.json')))
kab = json.load(open(os.path.join(D, 'kabir.json')))
chk = json.load(open(os.path.join(D, 'chanakya.json')))
KAB_CARDS = ['guru-govind-dou-khade', 'pothi-padh-padh-jag-mua', 'kal-kare-so-aaj-kar', 'dheere-dheere-re-mana', 'bura-jo-dekhan-main-chala',
             'aisi-bani-boliye', 'bada-hua-to-kya-hua', 'sai-itna-dijiye', 'mala-pherat-jug-bhaya', 'jati-na-poochho-sadhu-ki',
             'dukh-mein-sumiran-sab-kare', 'kasturi-kundal-base', 'nindak-niyare-rakhiye', 'chalti-chakki-dekh-ke', 'mati-kahe-kumhar-se']
cards = []
def wc(s): return len(s.split())
for l in viv['lines']:
    if not l['card']: continue
    s = l['source']
    cards.append({'id': l['id'], 'source': 'other',
                  'sourceName': {'en': 'Swami Vivekananda', 'hi': 'स्वामी विवेकानंद'},
                  'sanskritLine': l['text'], 'iast': f"Complete Works, vol {s['volume']}",
                  'meaning': {'en': l['meaning']['en'], 'hi': l['meaning']['hi']}})
by = {d['slug']: d for d in kab['dohe']}
for slug in KAB_CARDS:
    d = by[slug]
    cards.append({'id': d['id'], 'source': 'other', 'sourceName': {'en': 'Kabir', 'hi': 'कबीर'},
                  'sanskritLine': ' '.join(d['lines']), 'iast': ' '.join(d['roman']), 'meaning': d['meaning']})
for v in chk['verses']:
    if not v['card']: continue
    cards.append({'id': v['id'], 'source': 'chanakya-niti', 'sourceName': {'en': f"Chanakya Niti {v['ref']}", 'hi': f"चाणक्य नीति {v['ref']}"},
                  'chapter': v['chapter'], 'verse': v['verse'],
                  'sanskritLine': ' '.join(v['lines']), 'iast': ' '.join(v['roman']), 'meaning': {'en': v['meaning']['en'], 'hi': v['meaning']['hi']}})
for c in cards:
    assert len(c['id']) <= 40 and c['id'][:4] in ('viv-', 'kab-', 'chk-'), c['id']
    for k in ('en', 'hi'):
        assert wc(c['meaning'][k]) <= 20, (c['id'], k, wc(c['meaning'][k]))
ids = [c['id'] for c in cards]; assert len(set(ids)) == len(ids)
json.dump(cards, open(os.path.join(D, 'cards.json'), 'w'), ensure_ascii=False, indent=1)
print('cards', len(cards), {p: sum(c['id'].startswith(p) for c in cards) for p in ('viv-', 'kab-', 'chk-')})

"""Builds src/content/funnels/sayings/vivekananda.json (hub lines, fact checks, Gita bridge).
Run from frontend/: python3 scripts/funnels/sayings/build_vivekananda.py
Needs ~/work_sayings/viv_clean.jsonl (viv_clean.py) and ~/work_sayings/viv_factcheck_raw.json (viv_factcheck.py).
Every hub line is checked verbatim against the clean Complete Works set; the build fails on a miss.
Display text: printed dashes become commas (house style), noted on the page under Sources and method."""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from viv_picks import P
FE = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
W = os.path.expanduser('~/work_sayings')
FULL = os.path.expanduser('~/mnt/sanscripts/data/corpus_new/vivekananda_corpus.jsonl')
OUT = os.path.join(FE, 'src', 'content', 'funnels', 'sayings', 'vivekananda.json')

CARD_SLUGS = ['arise-awake', 'take-up-one-idea', 'grow-from-inside-out', 'education-manifestation', 'one-thing-at-a-time',
              'learn-everything-good', 'strength-is-life', 'reject-as-poison', 'powers-already-ours', 'nothing-impossible',
              'be-not-afraid', 'whatever-you-think', 'stand-up-be-bold', 'believe-god-yourself', 'all-power-within',
              'secret-of-success', 'ridicule-opposition-acceptance', 'never-mind-failures', 'great-gymnasium', 'live-for-others']

def q(s):
    return s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
def tidy(s):
    s = re.sub('\\s*[\u2014\u2013]\\s*', ', ', s)
    s = re.sub(r',\s*,', ',', s)
    s = s.replace('. . . .', '...').replace(' . . .', '...').replace('. . .', '...')
    return re.sub(r'\s+', ' ', s).strip()
def cap(s):
    return s[:1].upper() + s[1:] if s else s

SMALL = {'and', 'or', 'of', 'the', 'a', 'an', 'to', 'in', 'on', 'at', 'its', 'by', 'for'}
def title(w):
    w = re.sub(r'\s+', ' ', w.strip())
    if not w.isupper():
        return w
    out = []
    for i, t in enumerate(w.lower().split(' ')):
        out.append(t if (i and t in SMALL) else t[:1].upper() + t[1:])
    s = ' '.join(out)
    s = re.sub(r'\b(Ii|Iii|Iv|Vi|Vii|Viii|Ix|Xi|Xii)\b', lambda m: m.group(0).upper(), s)
    return s.replace('Miss S. e. Waldo', 'Miss S. E. Waldo').replace('Jnana-yoga', 'Jnana-Yoga').replace('Karma-yoga', 'Karma-Yoga')

KIND = {'lecture_or_book': {'en': 'Lecture', 'hi': 'व्याख्यान'}, 'letter': {'en': 'Letter', 'hi': 'पत्र'},
        'notes_by_disciple': {'en': 'Class notes by a disciple', 'hi': 'शिष्य के लिखे नोट्स'},
        'compiled_sayings': {'en': 'Sayings and Utterances', 'hi': 'वचन और कथन'}, 'writing': {'en': 'Writing', 'hi': 'लेख'},
        'conversation_record': {'en': 'Conversation, recorded by a disciple', 'hi': 'बातचीत, शिष्य द्वारा दर्ज'},
        'interview': {'en': 'Interview', 'hi': 'इंटरव्यू'}, 'newspaper_report': {'en': 'Newspaper report', 'hi': 'अख़बार की रिपोर्ट'},
        'translation': {'en': 'Translation', 'hi': 'अनुवाद'}, 'q_and_a_record': {'en': 'Questions and answers', 'hi': 'प्रश्नोत्तर'}}

CLEAN = [json.loads(l) for l in open(os.path.join(W, 'viv_clean.jsonl'))]
ALL = {}
for l in open(FULL):
    r = json.loads(l); ALL[r['id']] = r

def excerpt(par, line, limit=900):
    """The paragraph around the line, cut on sentence boundaries to at most `limit` characters."""
    par = q(par); i = par.find(q(line))
    if len(par) <= limit or i < 0:
        return par if len(par) <= limit else par[:limit].rsplit('. ', 1)[0] + '.'
    sents = re.split(r'(?<=[.?!])\s+', par)
    pos = 0; idx = 0
    for k, s in enumerate(sents):
        if pos <= i < pos + len(s) + 1: idx = k; break
        pos += len(s) + 1
    lo = hi = idx
    while True:
        grown = False
        if hi + 1 < len(sents) and len(' '.join(sents[lo:hi + 2])) <= limit: hi += 1; grown = True
        if lo > 0 and len(' '.join(sents[lo - 1:hi + 1])) <= limit: lo -= 1; grown = True
        if not grown: break
    return ('... ' if lo > 0 else '') + ' '.join(sents[lo:hi + 1]) + (' ...' if hi < len(sents) - 1 else '')

ROMAN = re.compile(r'^[IVXLC]+(\s+\d+)?$')
def work_name(r):
    w = r['work'].strip()
    if ROMAN.match(w):
        sec = re.sub(r'\s*[\u2013\u2014-]\s*', ', ', (r.get('section') or '').strip())
        return f"{sec}, {w.split()[0]}" if sec else f"Letter {w.split()[0]}"
    return title(w)
def src(r):
    return {'volume': r['volume'], 'work': work_name(r), 'kind': KIND.get(r['record_type'], {'en': 'Text', 'hi': 'पाठ'}),
            'recordType': r['record_type'], 'url': r['source_url'], 'recordId': r['id'],
            'translatedFromBengali': bool(r.get('translated_from_bengali'))}

def find(text, pool):
    t = q(text)
    for r in pool:
        if t in q(r['original_english']):
            return r
    return None

lines = []
for p in P:
    r = find(p['text'], CLEAN)
    if not r:
        sys.exit(f"MISSING in clean corpus: {p['slug']}: {p['text'][:70]}")
    lines.append({
        'id': f"viv-{p['slug']}"[:40], 'slug': p['slug'], 'text': cap(tidy(q(p['text']))), 'themes': p['themes'],
        'source': src(r), 'paragraph': tidy(excerpt(r['original_english'], p['text'])),
        'meaning': {'hi': p['hi'], **({'en': p['en']} if p.get('en') else {})},
        'card': p['slug'] in CARD_SLUGS, 'verdict': 'in-his-words', 'reviewed': False,
    })
missing_cards = set(CARD_SLUGS) - {l['slug'] for l in lines if l['card']}
assert not missing_cards, missing_cards
for l in lines:
    if l['card']:
        assert l['meaning'].get('en'), l['slug']

# ── Fact checks ──
raw = {o['slug']: o for o in json.load(open(os.path.join(W, 'viv_factcheck_raw.json')))}
NOTFOUND_NOTE = ('Searched vols 1 to 8 with a fuzzy match, and Wikisource (all volumes, including vol 9) by phrase. '
                 'No passage comes close.')
OVR = {
 'grow-from-the-inside-out': dict(verdict='in-his-words', realText='You have to grow from inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul.',
     note={'en': 'The shared version adds "the" before "inside out". The line is no. 20 in Sayings and Utterances (vol 5), a compiled list. The lecture behind it, The Ideal of a Universal Religion (vol 2), says: "There is no other teacher to you than your own soul."',
           'hi': 'यह पंक्ति खंड 5 के "Sayings and Utterances" में क्रमांक 20 पर है। खंड 2 के व्याख्यान में यही बात कही गई है: "तुम्हारी अपनी आत्मा के सिवा तुम्हारा कोई गुरु नहीं।"'},
     also=('There is no other teacher to you than your own soul.',)),
 'all-love-is-expansion': dict(verdict='in-his-words', realText='All expansion is life, all contraction is death. All love is expansion, all selfishness is contraction. Love is therefore the only law of life.', bengali=True,
     note={'en': 'From a letter he wrote in Bengali, printed in English translation in vol 6. The wording is the translator\'s; the thought is his.',
           'hi': 'यह उनके बांग्ला में लिखे एक पत्र से है, जिसका अंग्रेज़ी अनुवाद खंड 6 में छपा है।'}),
 'be-a-hero-i-have-no-fear': dict(verdict='in-his-words', realText='Be a hero. Always say, "I have no fear." Tell this to everybody', bengali=True,
     note={'en': 'Recorded in Bengali by a disciple, Sharat Chandra Chakravarty, in Conversations and Dialogues, and printed in English translation in vol 7.',
           'hi': 'यह बात एक शिष्य ने बांग्ला में दर्ज की थी। इसका अंग्रेज़ी अनुवाद खंड 7 की "Conversations and Dialogues" में है।'}),
 'strength-is-life-weakness-is-death': dict(verdict='paraphrase', realText='strength is life, weakness is death.',
     note={'en': 'Two works stitched together. "Strength is life, weakness is death" is from Work and Its Secret (vol 2). "Expansion is life, contraction is death. Love is life, and hatred is death" is from Reply to the Calcutta Address (vol 4).',
           'hi': 'यह दो अलग जगहों की पंक्तियाँ जोड़कर बना है। पहला हिस्सा खंड 2 से है, बाकी खंड 4 के कलकत्ता अभिनंदन के उत्तर से।'},
     also=('Expansion is life, contraction is death. Love is life, and hatred is death.',)),
 'be-not-afraid-of-anything': dict(verdict='paraphrase', realText='Be not afraid of anything. You will do marvellous work. The moment you fear, you are nobody.',
     note={'en': 'The first two sentences are his, word for word. The last one comes from later in the same paragraph, where he says "it is fearlessness that brings heaven even in a moment."',
           'hi': 'पहले दो वाक्य हूबहू उनके हैं। आखिरी वाक्य उसी अनुच्छेद में आगे आता है।'},
     also=('it is fearlessness that brings heaven even in a moment.',)),
 'believe-in-yourself-and-the-world-will-be-at-your-feet': dict(verdict='paraphrase', realText='Let people say whatever they like, stick to your own convictions, and rest assured, the world will be at your feet.', bengali=True,
     note={'en': 'A short form of a line in one of his Bengali letters (vol 6, in translation), which goes on: "Have faith in yourself first."',
           'hi': 'यह उनके एक बांग्ला पत्र (खंड 6, अनुवाद) की पंक्ति का छोटा रूप है।'}),
 'you-are-the-creator-of-your-own-destiny': dict(verdict='paraphrase', realText='stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of your own destiny.',
     note={'en': 'A reworded version of a line in The Microcosm (vol 2). "Stand up and fight" and "the world is yours" are not in it.',
           'hi': 'यह खंड 2 के "The Microcosm" की एक पंक्ति का बदला हुआ रूप है।'}),
 'comfort-is-no-test-of-truth': dict(verdict='paraphrase',
     note={'en': 'Close to his words in class notes taken by a disciple (vol 8, Jnana Yoga IV). The original has "on the contrary" in the middle.',
           'hi': 'यह खंड 8 में एक शिष्य के लिखे नोट्स से है। मूल में बीच में "on the contrary" है।'}),
 'secret-of-true-success': dict(verdict='in-his-words',
     note={'en': 'The lecture says "the man who asks for no return, the perfectly unselfish man". Shared copies often change it to "the man or woman".',
           'hi': 'मूल व्याख्यान में "the man who asks for no return" है। शेयर होने वाली कॉपी में अक्सर "man or woman" कर दिया जाता है।'}),
}
for s in ['day-without-problems-wrong-path', 'talk-to-yourself-once-a-day', 'take-risks-lead-guide', 'mind-is-intensely-eager']:
    OVR[s] = dict(verdict='not-found', note={'en': NOTFOUND_NOTE, 'hi': 'खंड 1 से 8 में फ़ज़ी मिलान से और विकिसोर्स पर सभी खंडों (खंड 9 सहित) में खोजा। कोई अंश इसके पास भी नहीं।'})

def bengali_find(text):
    t = q(text)
    for r in ALL.values():
        if t in q(r['original_english']):
            return r
    return None

line_by_text = {q(l['text']).lower(): l['slug'] for l in lines}
checks = []
for slug, o in raw.items():
    ov = OVR.get(slug, {})
    verdict = ov.get('verdict', o['verdict'])
    item = {'slug': slug, 'shared': o['line'], 'seenOn': o['seenOn'], 'verdict': verdict, 'score': o['score'], 'reviewed': False}
    if verdict != 'not-found':
        rt = ov.get('realText') or o['span']
        r = (bengali_find(rt) if ov.get('bengali') else find(rt, CLEAN)) or (ALL.get(o['rec']['id']) if o.get('rec') else None)
        if not r or q(rt) not in q(r['original_english']):
            sys.exit(f'fact-check real text not verbatim: {slug}: {rt[:60]}')
        item['real'] = {'text': cap(tidy(q(rt))), 'source': src(r), 'paragraph': tidy(excerpt(r['original_english'], rt))}
        also = []
        for a in ov.get('also', ()):
            ra = find(a, CLEAN) or bengali_find(a)
            if not ra: sys.exit(f'also-line missing: {slug}')
            also.append({'text': cap(tidy(q(a))), 'source': src(ra)})
        if also: item['also'] = also
        hub = next((l['slug'] for l in lines if q(rt).lower()[:40] in q(l['text']).lower() or q(l['text']).lower()[:40] in q(rt).lower()), None)
        if hub: item['hubLine'] = hub
    if ov.get('note'): item['note'] = ov['note']
    checks.append(item)
order = {'not-found': 0, 'paraphrase': 1, 'in-his-words': 2}
checks.sort(key=lambda c: order[c['verdict']])

# ── Gita bridge: verses he quotes in the Complete Works (each quote verified verbatim below) ──
BRIDGE = [
 dict(c=2, v=3, quote='If one reads this one Shloka', bengali=True,
      note={'en': 'He says this one verse holds the whole message of the Gita: get up, and drop the faint heart.',
            'hi': 'वे कहते हैं कि इस एक श्लोक में पूरी गीता का संदेश है: कमज़ोरी छोड़ो और उठो।'}),
 dict(c=2, v=47, quote='To work we have the right, but not to the fruits thereof',
      note={'en': 'The verse he builds Karma Yoga on: do the work, leave the result.',
            'hi': 'कर्मयोग की नींव यही श्लोक है: काम करो, फल की चिंता छोड़ो।'}),
 dict(c=2, v=40, half=1, quote='Even the least bit done of this religion saves from great fear',
      note={'en': 'Even a small start on this path protects you from great fear.',
            'hi': 'इस रास्ते पर छोटा सा कदम भी बड़े डर से बचा लेता है।'}),
 dict(c=4, v=7, quote='Whenever virtue subsides and immorality abounds, I take human form.',
      note={'en': 'Krishna\'s promise to return whenever dharma falls, which he quotes in several lectures.',
            'hi': 'जब-जब धर्म घटता है, कृष्ण लौटने का वचन देते हैं। स्वामीजी ने इसे कई व्याख्यानों में दोहराया।'}),
 dict(c=2, v=23, quote='This Self, weapons cannot pierce, nor fire can burn, water cannot wet, nor air can dry up.',
      note={'en': 'The Self no weapon can cut. He uses it to tell people they are stronger than they think.',
            'hi': 'आत्मा को कोई शस्त्र नहीं काट सकता। स्वामीजी इससे बताते हैं कि हम सोच से ज़्यादा मज़बूत हैं।'}),
 dict(c=13, v=29, quote='Thus seeing the same Lord equally present everywhere, the sage does not injure the Self by the self',
      note={'en': 'Seeing the same Lord in everyone, you stop harming yourself by harming others.',
            'hi': 'सब में एक ही ईश्वर को देखने वाला दूसरों को चोट पहुँचाकर खुद को चोट नहीं पहुँचाता।'}),
]
bridge = []
for b in BRIDGE:
    r = bengali_find(b['quote']) if b.get('bengali') else find(b['quote'], CLEAN)
    if not r: sys.exit(f"bridge quote missing: {b['c']}.{b['v']}")
    vj = json.load(open(os.path.join(FE, 'src', 'content', 'gita', 'verses', f"{b['c']}-{b['v']}.json")))
    sk = re.sub(r'^[^।॥]{0,24}?(उवाच|ानुवाच)\s*', '', vj['sanskrit'].strip())
    halves = [h.strip() for h in re.split(r'(?<=[।|])\s*', sk) if h.strip()]
    first = halves[b.get('half', 0)]
    bridge.append({'chapter': b['c'], 'verse': b['v'], 'sanskritLine': first, 'his': cap(tidy(q(b['quote']))),
                   'source': src(r), 'note': b['note'], 'reviewed': False})

data = {'generated': '2026-10-30', 'edition': 'Complete Works of Swami Vivekananda, Mayavati Memorial Edition (Advaita Ashrama), vols 1 to 8, as published on ramakrishnavivekananda.info',
        'lines': lines, 'factChecks': checks, 'gitaBridge': bridge}
os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(data, open(OUT, 'w'), ensure_ascii=False, indent=1)
print('lines', len(lines), 'cards', sum(l['card'] for l in lines), 'checks', len(checks), {v: sum(c['verdict'] == v for c in checks) for v in order}, 'bridge', len(bridge))

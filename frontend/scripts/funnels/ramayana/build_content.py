#!/usr/bin/env python3
"""Builds src/content/funnels/ramayana/*.json for the Ramayana funnel.

Run from frontend/:  python3 scripts/funnels/ramayana/build_content.py
Reads the corpus read-only (~/mnt/sanscripts/wisdom_kb/out/verses.jsonl) and the
Gita quotes (src/content/quotes/verses.json). Fails loudly when a shown line is not
an exact part of its corpus verse, or when copy breaks the house rules.
"""
import json
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
FE = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
OUT = os.path.join(FE, 'src', 'content', 'funnels', 'ramayana')

from corpus import load, gita_press_groups, ref_for, to_iast  # noqa: E402
from lines_data import LINES, EXCLUDED, S  # noqa: E402
from scenes_data import SCENES  # noqa: E402

DASHES = re.compile('[' + chr(0x2013) + chr(0x2014) + ']')
problems = []


def check_copy(label, text):
    if DASHES.search(text):
        problems.append(f'dash in {label}: {text[:80]}')
    if '!' in text:
        problems.append(f'exclamation in {label}: {text[:80]}')


def walk(label, obj):
    if isinstance(obj, str):
        check_copy(label, obj)
    elif isinstance(obj, dict):
        for k, v in obj.items():
            if k not in ('url', 'source'):
                walk(f'{label}.{k}', v)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk(f'{label}[{i}]', v)


rows = load()
groups = gita_press_groups(rows)
excluded_ids = {e['cid'] for e in EXCLUDED}

lines = {}
for L in LINES:
    cid = L['cid']
    row = rows.get(cid)
    if not row:
        problems.append(f'missing corpus id {cid}')
        continue
    if cid in excluded_ids:
        problems.append(f'excluded line used: {cid}')
    full = re.sub(r'\s+', ' ', row['sanskrit']).strip().rstrip('`').strip()
    full = re.sub(r'\s+([।॥])', r'\1', full)
    full = unicodedata.normalize('NFC', full)
    shown = unicodedata.normalize('NFC', L['sub'] or full)
    if shown not in full:
        problems.append(f'{L["key"]}: shown text is not a contiguous part of {cid}')
    fixes = []
    for old, new in L.get('fix', []):
        if old not in shown:
            problems.append(f'{L["key"]}: fix target {old} not found')
        shown = shown.replace(old, new)
        fixes.append({'from': old, 'to': new})
    shown = re.sub(r'\s*॥\s*$', '॥', shown.strip())
    ref = ref_for(cid, groups)
    sp_en, sp_hi = S[L['sp']]
    item = {
        'key': L['key'],
        'text': 'vr' if cid.startswith('vr.') else 'rcm',
        'lang': 'sa' if cid.startswith('vr.') else 'awa',
        'corpusId': cid,
        'sa': shown,
        'iast': to_iast(shown),
        'ref': {'en': ref['en'], 'hi': ref['hi']},
        'refShort': ref['short'],
        'refVerified': ref['verified'],
        'speaker': {'en': sp_en, 'hi': sp_hi},
        'meaning': {'en': L['en'], 'hi': L['hi']},
        'reviewed': False,
    }
    if 'gpGuess' in ref:
        item['gpGuess'] = ref['gpGuess']
    if fixes:
        item['fixes'] = fixes
    if L.get('note'):
        item['note'] = L['note']
    walk(L['key'], item['meaning'])
    lines[L['key']] = item

# ── Scenes ──
scenes = []
for i, sc in enumerate(SCENES, 1):
    sc = dict(sc)
    sc['order'] = i
    sc['reviewed'] = False
    for lamp in ('valmiki', 'tulsidas'):
        for k in sc['lamps'][lamp].get('lines', []):
            if k not in lines:
                problems.append(f'scene {sc["slug"]}: unknown line {k}')
            elif lines[k]['text'] != ('vr' if lamp == 'valmiki' else 'rcm'):
                problems.append(f'scene {sc["slug"]}: {k} sits under the wrong lamp')
    words = len(sc['quick']['en'].split())
    if not 40 <= words <= 62:
        problems.append(f'scene {sc["slug"]}: quick answer is {words} words')
    if len(sc['meta']['title']) > 60:
        problems.append(f'scene {sc["slug"]}: meta title {len(sc["meta"]["title"])} chars')
    if len(sc['meta']['description']) > 155:
        problems.append(f'scene {sc["slug"]}: description {len(sc["meta"]["description"])} chars')
    walk(sc['slug'], sc)
    scenes.append(sc)

# ── Gita lines (house quotes) ──
GQ = {q['id']: q for q in json.load(open(os.path.join(FE, 'src', 'content', 'quotes', 'verses.json'), encoding='utf-8'))}


def gita(c, v):
    q = GQ.get(f'bg-{c}-{v}')
    if not q:
        problems.append(f'no house quote for bg-{c}-{v}')
        return None
    return {
        'key': f'bg-{c}-{v}', 'text': 'bg', 'lang': 'sa', 'chapter': c, 'verse': v,
        'sa': q['sanskritLine'], 'iast': q['iast'],
        'ref': {'en': f'Bhagavad Gita {c}.{v}', 'hi': f'भगवद गीता {c}.{v}'},
        'refShort': {'en': f'Gita {c}.{v}', 'hi': f'गीता {c}.{v}'},
        'refVerified': True,
        'speaker': {'en': 'Krishna to Arjuna', 'hi': 'श्रीकृष्ण, अर्जुन से'},
        'meaning': q['meaning'],
        'href': f'/gita/chapter/{c}/verse/{v}',
        'reviewed': True,
    }


PLAN = [
    dict(day=1, line='vr-2-22-2',
         title='The morning after the news',
         why='Lakshman is ready to fight over the exile. Ram asks him to put the anger down and help pack for the forest.',
         todo='Today, notice one flash of anger and let it pass before you answer.'),
    dict(day=2, line='vr-2-105-13',
         title='What Ram told Bharata',
         why='At Chitrakoot, Bharata begs Ram to come home. Ram answers with this line about everything that comes together and parts.',
         todo='Call someone you have drifted from. People part; reach out while you can.'),
    dict(day=3, line='vr-3-66-5',
         title='When the worst has happened',
         why='Sita is gone and Ram is ready to burn the world down. His younger brother steadies him with this.',
         todo='Name the trouble you are in. Then remember one hard time you came through.'),
    dict(day=4, line='vr-5-12-10',
         title='Before Part 2',
         why='Part 2 brings Hanuman to Lanka. He searches the whole city, finds nothing, nearly gives up, and then says this to himself.',
         todo='Go back to one thing you gave up on this year and give it one more hour.',
         bridge='From tomorrow the plan hands over to the Bhagavad Gita: three verses where Krishna tells Arjuna what these four lines have been saying.'),
    dict(day=5, gita=(2, 14),
         title='It came, and it will go',
         why='Days 2 and 3 said that trouble comes and passes. Krishna tells Arjuna the same about heat and cold, pleasure and pain: they come and go, so bear them.',
         todo='When something stings today, tell yourself: this came, and it will go.'),
    dict(day=6, gita=(6, 5),
         title='Lift yourself',
         why='Hanuman talked himself out of despair. Krishna says your own mind can be your friend or your enemy, so lift yourself up by yourself.',
         todo='Write down one thing you will do for yourself today, then do it.'),
    dict(day=7, gita=(2, 47),
         title='Your part',
         why='Jatayu fought knowing he could lose. Krishna tells Arjuna that the work is his and the result never was.',
         todo='Pick the task you have avoided because of how it might turn out, and do your part today.'),
]
plan = []
for d in PLAN:
    d = dict(d)
    if 'gita' in d:
        c, v = d.pop('gita')
        g = gita(c, v)
        if g:
            d['verse'] = g
    else:
        k = d.pop('line')
        d['verse'] = lines[k]
    d['reviewed'] = False
    walk(f'plan.{d["day"]}', {k: v for k, v in d.items() if k != 'verse'})
    plan.append(d)

DIWALI = dict(
    quick=dict(
        en="Diwali remembers Ram's return to Ayodhya after fourteen years. In Valmiki (Yuddha Kanda, sargas 125 to 128), Hanuman goes ahead to Bharata at Nandigram, the city strews flowers and raises flags, and Bharata hands back the kingdom he held in trust. In Tulsidas (Uttar Kand, dohas 1 to 9), the women of Ayodhya meet Ram with plates of aarti.",
        hi='दिवाली चौदह बरस बाद राम के अयोध्या लौटने की याद है। वाल्मीकि (युद्धकाण्ड, सर्ग 125 से 128) में हनुमान पहले नंदिग्राम में भरत के पास जाते हैं, नगर फूल बिखेरता है और पताकाएँ लगाता है, और भरत धरोहर में रखा राज्य राम को लौटा देते हैं। तुलसीदास (उत्तरकाण्ड, दोहा 1 से 9) में अयोध्या की स्त्रियाँ आरती की थालियाँ लेकर राम का स्वागत करती हैं।'),
    sections=[
        dict(id='last-day',
             heading=dict(en='The last day of waiting', hi='इंतज़ार का आखिरी दिन'),
             body=dict(en='Tulsidas opens his Uttar Kand on the last day of the fourteen years. Bharat is sure Ram has forgotten him. In Valmiki, Hanuman finds him just outside Ayodhya, thin, in bark clothes, living on fruit and roots.',
                       hi='तुलसीदास उत्तरकाण्ड की शुरुआत चौदह बरस के आखिरी दिन से करते हैं। भरत को लगता है कि राम उन्हें भूल गए हैं। वाल्मीकि में हनुमान उन्हें अयोध्या के पास ही पाते हैं, दुबले, छाल के कपड़ों में, फल-मूल खाकर जीते हुए।'),
             lines=['rcm-7-3-1', 'vr-6-125-20']),
        dict(id='the-news',
             heading=dict(en='The news', hi='खबर'),
             body=dict(en='When Hanuman tells him Ram is close, Bharata answers with an old saying.',
                       hi='जब हनुमान बताते हैं कि राम पास आ पहुँचे हैं, तो भरत एक पुरानी कहावत से जवाब देते हैं।'),
             lines=['vr-6-126-2']),
        dict(id='the-city',
             heading=dict(en='The city gets ready', hi='नगर की तैयारी'),
             body=dict(en='In Valmiki, Shatrughna orders the roads levelled, flowers and puffed rice scattered and flags raised. In Tulsidas, the women fill golden plates with curd, durva and tulsi and walk out singing.',
                       hi='वाल्मीकि में शत्रुघ्न आदेश देते हैं कि रास्ते बराबर हों, फूल और लावा बिखेरे जाएँ और पताकाएँ लगें। तुलसीदास में स्त्रियाँ सोने की थालियों में दही, दूब और तुलसी भरकर गाती हुई निकलती हैं।'),
             lines=['vr-6-127-5', 'rcm-7-5-3']),
        dict(id='the-meeting',
             heading=dict(en='The meeting', hi='मिलन'),
             body=dict(en='Bharat falls at Ram’s feet and will not get up. In Valmiki he puts Ram’s sandals back on his feet and gives back the kingdom, ten times richer, he says, than when he took it in trust.',
                       hi='भरत राम के पाँवों में गिर पड़ते हैं और उठते नहीं। वाल्मीकि में वे राम की खड़ाऊँ उनके पाँवों में पहनाते हैं और राज्य लौटाते हैं, और कहते हैं कि धरोहर अब दस गुना बढ़ चुकी है।'),
             lines=['rcm-7-7-4', 'vr-6-127-37', 'vr-6-127-38']),
        dict(id='the-lamps',
             heading=dict(en='The lamps', hi='दीये'),
             body=dict(en='Neither text describes rows of clay diyas lit for the return. Tulsidas has golden aarti plates at every door as Ram enters, and, describing Ayodhya in Ram’s reign, lamps of gems in every house. The diyas of Diwali are how families have kept that welcome since.',
                       hi='किसी भी ग्रंथ में लौटने की रात मिट्टी के दीयों की कतारों का वर्णन नहीं है। तुलसीदास के यहाँ राम के नगर में आते समय हर द्वार पर सोने की थालियों में आरती है, और राम के राज में अयोध्या के वर्णन में घर-घर मणियों के दीप हैं। दिवाली के दीये उसी स्वागत को परिवारों ने आज तक सँजोकर रखा है।'),
             lines=['rcm-7-11-3', 'rcm-7-29-4']),
        dict(id='home',
             heading=dict(en='Home', hi='घर'),
             body=dict(en='From the air, Ram points Ayodhya out to his friends from Lanka and Kishkindha.',
                       hi='आकाश से राम अपने लंका और किष्किंधा के साथियों को अयोध्या दिखाते हैं।'),
             lines=['rcm-7-6-3']),
    ],
    asks=dict(en='Diwali is a homecoming. This week, go back to someone who has been waiting for you, or call them.',
              hi='दिवाली घर लौटने का त्योहार है। इस हफ़्ते किसी ऐसे के पास जाएँ, या उसे फ़ोन करें, जो आपकी राह देख रहा है।'),
    gita=dict(chapter=2, verse=71, note=dict(
        en="Bharata ruled for fourteen years without calling the kingdom his. Krishna describes the one who lives without the sense of 'mine', and finds peace.",
        hi='भरत ने चौदह बरस राज चलाया पर राज्य को अपना नहीं कहा। कृष्ण उस इंसान की बात करते हैं जो "मेरा" का भाव छोड़कर जीता है और शांति पाता है।')),
    reviewed=False,
)
for s in DIWALI['sections']:
    for k in s['lines']:
        if k not in lines:
            problems.append(f'diwali: unknown line {k}')
walk('diwali', DIWALI)

CARDS = [
    ('ram-anirveda', 'vr-5-12-10', 'अनिर्वेदः श्रियो मूलमनिर्वेदः परं सुखम्',
     'Not losing heart is the root of good fortune and the highest happiness.',
     'हिम्मत न हारना ही सफलता की जड़ है, यही सबसे बड़ा सुख है।'),
    ('ram-all-things-part', 'vr-2-105-13', None, None, None),
    ('ram-trouble-passes', 'vr-3-66-5', None,
     'Trouble comes to everyone. It catches like fire, and in a moment it passes.',
     'विपत्ति सब पर आती है। वह आग की तरह छूती है और पल भर में चली जाती है।'),
    ('ram-steadiness', 'vr-2-22-2', None, None, None),
    ('ram-conduct', 'vr-2-109-4', None, None, None),
    ('ram-sita-effort', 'vr-3-9-26', None, None, None),
    ('ram-hundred-years', 'vr-6-126-2', None,
     'Joy comes to the one who stays alive, even after a hundred years.',
     'जो जीता रहता है, उसे सौ बरस बाद भी आनंद मिल ही जाता है।'),
    ('ram-courage-today', 'rcm-2-163-d1', None, None, None),
    ('ram-good-sense', 'rcm-5-38-3', None, None, None),
    ('ram-own-deeds', 'rcm-2-90-2', None, None, None),
    ('ram-friend', 'rcm-4-8-1', None, None, None),
    ('ram-contentment', 'rcm-3-32-2', None,
     "Be content with what comes, and don't look for others' faults, even in a dream.",
     'जो मिले उसमें संतोष रखो, और सपने में भी दूसरों के दोष मत देखो।'),
]
cards = []
for cid, key, sub, en, hi in CARDS:
    L = lines[key]
    sa = sub or L['sa']
    if sub and sub not in L['sa']:
        problems.append(f'card {cid}: sub not in line')
    m_en = en or L['meaning']['en']
    m_hi = hi or L['meaning']['hi']
    if len(m_en.split()) > 20:
        problems.append(f'card {cid}: meaning is {len(m_en.split())} words')
    work_en = 'Valmiki Ramayana' if L['text'] == 'vr' else 'Ramcharitmanas'
    work_hi = 'वाल्मीकि रामायण' if L['text'] == 'vr' else 'रामचरितमानस'
    if L['text'] == 'vr':
        k, s = L['corpusId'].split('.')[1:3]
        src = {'en': f'{work_en} {k}.{s}', 'hi': f'{work_hi} {k}.{s}'}
    else:
        src = {'en': L['ref']['en'].replace('Ramcharitmanas, ', 'Ramcharitmanas, ').replace(' Kand, doha ', ' '),
               'hi': L['ref']['hi'].replace(', दोहा ', ' ')}
    c = {
        'id': cid, 'source': 'other', 'sourceName': src,
        'speaker': L['speaker'], 'sanskritLine': sa, 'iast': to_iast(sa),
        'meaning': {'en': m_en, 'hi': m_hi}, 'lineKey': key, 'reviewed': False,
    }
    walk(cid, c['meaning'])
    cards.append(c)

if problems:
    print('\n'.join(problems))
    sys.exit(1)

os.makedirs(OUT, exist_ok=True)


def dump(name, data):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write('\n')


dump('lines.json', lines)
dump('scenes.json', scenes)
dump('plan.json', plan)
dump('diwali.json', DIWALI)
dump('cards.json', cards)
dump('excluded.json', [dict(e, exclude=True) for e in EXCLUDED])
print(f'ok: {len(lines)} lines, {len(scenes)} scenes, {len(plan)} plan days, {len(cards)} cards, {len(EXCLUDED)} excluded')

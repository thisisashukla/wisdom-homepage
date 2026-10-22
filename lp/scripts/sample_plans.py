"""Regenerate frontend/src/lib/samplePlans.ts from the live backend (the homepage's plan preview).
Usage: python3 lp/scripts/sample_plans.py [backend base, default https://wisdom-homepage-2tf6-neon.vercel.app/api/v1]
Review the output before committing: the preview shows it unedited."""
import datetime, json, re, sys, urllib.request

BASE = sys.argv[1] if len(sys.argv) > 1 else 'https://wisdom-homepage-2tf6-neon.vercel.app/api/v1'
OUT = 'frontend/src/lib/samplePlans.ts'
# id = hero ASK id; topic/follow = SITUATIONS in frontend/src/lib/app.ts
SPECS = [('overthinking', 'Overthinking', 'overthinking', 'quiet', 'mind'),
         ('result', "It didn't work out", 'didnt_work_out', 'nerve', 'work'),
         ('breakup', 'My relationship', 'partner', 'replay', 'someone'),
         ('lost', 'Someone I lost', 'someone_lost', 'faith', 'missing')]
PH = {'see': 'See it', 'steady': 'Steady it', 'act': 'Act on it', 'story': 'A story'}

def first_sentence(t):
    m = re.match(r'(.+?[.!?])(\s|$)', (t or '').strip())
    return m.group(1) if m else (t or None)

def pada(sk):
    if not sk:
        return None
    sk = re.sub(r'^(श्री\s*भगवानुवाच|अर्जुन\s*उवाच|सञ्जय\s*उवाच|धृतराष्ट्र\s*उवाच)\s*', '', sk.strip())
    return re.split(r'[।|॥\n]', sk)[0].strip() or None

def source(ref):
    return ' · '.join(ref.replace('Bhagavad Gita', 'Gita').replace('Valmiki Ramayana', 'Ramayana').split(' · ')[:2])

def href(ref):
    m = re.match(r'Bhagavad Gita (\d+)\.(\d+)$', ref)
    return f'/gita/chapter/{m.group(1)}/verse/{m.group(2)}' if m else None

plans = []
for pid, label, sit, feeling, topic in SPECS:
    body = json.dumps({'feeling': feeling, 'topic': topic, 'follow': sit, 'week': 1}).encode()
    req = urllib.request.Request(f'{BASE}/recommend/plan', body, {'Content-Type': 'application/json'})
    d = json.load(urllib.request.urlopen(req, timeout=90))
    days = []
    for x in d['days']:
        v, st = x.get('verse') or {}, x.get('story') or {}
        if v:
            days.append({'day': x['day'], 'phase': PH[x['phase']], 'source': source(v['ref']), 'href': href(v['ref']),
                         'sanskrit': pada(v.get('sanskrit')) if x['day'] == 1 else None, 'line': v['line'],
                         'forYou': first_sentence(v.get('for_you')) if x['day'] == 1 else None})
        else:
            days.append({'day': x['day'], 'phase': PH['story'], 'source': source((st.get('anchor') or {}).get('ref') or 'Story'),
                         'href': None, 'sanskrit': None, 'line': st.get('story_hook') or st.get('title'), 'forYou': None})
    plans.append({'id': pid, 'label': label, 'situation': sit, 'title': d['weeks'][0]['title'], 'days': days})

date = datetime.date.today().strftime('%-d %b %Y')
src = open(OUT, encoding='utf-8').read()
head = src[:src.index("export const SAMPLE_PLANS_DATE")]
open(OUT, 'w', encoding='utf-8').write(head + f"export const SAMPLE_PLANS_DATE = '{date}'\n\nexport const SAMPLE_PLANS: SamplePlan[] = "
                                        + json.dumps(plans, ensure_ascii=False, indent=2) + '\n')
print('wrote', OUT, '- check Day 1 Sanskrit spacing by eye, and the date in the comment')

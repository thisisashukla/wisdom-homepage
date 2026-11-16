import json, os, re, sys, time, glob, random, threading
from concurrent.futures import ThreadPoolExecutor, as_completed
sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent)); import envload
from prompt import SYSTEM, EXAMPLE_USER, EXAMPLE_ASSISTANT, OPENINGS, JUDGE
from sarvamai import SarvamAI

FE = str(__import__('pathlib').Path(__file__).resolve().parents[2] / 'frontend')
OUT = str(__import__('pathlib').Path(__file__).resolve().parent / 'scripts'); os.makedirs(OUT, exist_ok=True)
client = SarvamAI(api_subscription_key=os.environ['SARVAM_API_KEY'])
MODEL = os.environ.get('SARVAM_MODEL', 'sarvam-105b')

verses = {}
for f in glob.glob(f'{FE}/src/content/gita/verses/*.json'):
    d = json.load(open(f)); verses[(d['chapter'], d['verse'])] = d
order = sorted(verses, key=lambda k: verses[k]['order'])
chapters = {c['number']: c for c in json.load(open(f'{FE}/src/content/gita/chapters.json'))}
def hic(c, v):
    p = f'{FE}/src/content/gita/hi-commentary/{c}-{v}.json'
    return json.load(open(p)) if os.path.exists(p) else None

def clean_sa(s):  # "धृतराष्ट्र उवाचधर्म" -> space after उवाच
    return re.sub(r'उवाच(?=\S)', 'उवाच ', s or '')

def source(key):
    d = verses[key]; c, v = key; ch = chapters.get(c, {})
    lines = [f"SOURCE (Chapter {c}, {ch.get('enName','')}, verse {v}, speaker {d.get('speaker') or 'unknown'})",
             f"Sanskrit: {clean_sa(d['sanskrit'])}",
             f"English (MEANING, fixed): {d.get('englishTranslation','')}",
             f"Hindi translation: {re.sub(r'\\s+',' ',d.get('hindiTranslation',''))}",
             f"Word meanings: {d.get('translationLiteral','')}"]
    for k, lab in [('insight','Insight'),('detailedMeaning','Detail'),('simpleMeaning','Plain meaning')]:
        if d.get(k): lines.append(f"{lab}: {d[k]}")
    h = hic(c, v)
    if h:
        if h.get('bhavarth'): lines.append(f"Hindi meaning (bhavarth): {h['bhavarth']}")
        if h.get('sandarbh'): lines.append(f"Hindi context (sandarbh): {h['sandarbh']}")
    i = order.index(key)
    if i > 0:
        p = verses[order[i-1]]; lines.append(f"PREVIOUS (verse {p['verse']} of chapter {p['chapter']}, {p.get('speaker') or ''}): {p.get('englishTranslation','')}")
    if i < len(order) - 1:
        n = verses[order[i+1]]
        same = n['chapter'] == c
        lines.append(f"NEXT ({'' if same else 'start of chapter '+str(n['chapter'])+', '+chapters.get(n['chapter'],{}).get('enName','')+', '}verse {n['verse']}, {n.get('speaker') or ''}): {n.get('englishTranslation','')}")
    else:
        lines.append("NEXT: none. This is the last verse of the Gita.")
    return '\n'.join(lines)

def chat(messages, max_tokens=3800, temperature=0.5):
    for attempt in range(5):
        try:
            r = client.chat.completions(messages=messages, model=MODEL, temperature=temperature, max_tokens=max_tokens,
                                        request_options={'timeout_in_seconds': 120, 'max_retries': 0,
                                                         'additional_body_parameters': {'reasoning_effort': None, 'response_format': {'type': 'json_object'}}})
            if not (r.choices[0].message.content or '').strip():
                raise ValueError(f'empty ({r.choices[0].finish_reason})')
            return r.choices[0].message.content or ''
        except Exception as e:
            time.sleep(4 * (attempt + 1) + random.random() * 3)
            last = e
    raise last

def parse(txt):
    txt = re.sub(r'^```(json)?|```$', '', txt.strip(), flags=re.M).strip()
    m = re.search(r'\{.*\}', txt, re.S)
    return json.loads(m.group(0))

DASH = re.compile(r'[–—]')
BANNED = re.compile(r"\b(profound|timeless|journey|delve|powerful|beautiful|remarkable|fascinating|interesting|let's|imagine)\b|isn't (just )?\w+[,.] it's|not just .{1,40} but|\bbut rather\b", re.I)
import unicodedata
def plain_latin(t):
    out = []
    for ch in t or '':
        if '\u0900' <= ch <= '\u097f': out.append(ch); continue
        out.append(''.join(c for c in unicodedata.normalize('NFKD', ch) if not unicodedata.combining(c)))
    return re.sub(r'\s*[\u2013\u2014]\s*', ', ', ''.join(out))

def en_meaning(key):
    t = plain_latin((verses[key].get('englishTranslation') or '').strip())
    t = re.sub(r'^(.{2,40}?) said:', lambda m: m.group(1) + ' says:', t)
    return t

def rule_issues(s, key):
    iss = []
    parts = {'en': ('intro', 'notice', 'next'), 'hi': ('intro', 'meaning', 'notice', 'next')}
    for lang, ps in parts.items():
        for part in ps:
            t = (s.get(lang) or {}).get(part, '') or ''
            if not t.strip(): iss.append(f'{lang}.{part} missing'); continue
            if DASH.search(t): iss.append(f'{lang}.{part}: dash')
            if lang == 'en' and BANNED.search(t): iss.append(f'{lang}.{part}: banned phrase "{BANNED.search(t).group(0)}"')
            if lang == 'en' and re.search(r'[\u0900-\u097f]', t): iss.append(f'{lang}.{part}: Devanagari in English, write Sanskrit words in plain Roman letters')
            if lang == 'en' and re.search(r"\bnot (as |a |an |the )?\w+(,| but)|, not \w+|\brather than\b", t, re.I): iss.append(f'{lang}.{part}: contrast template')
            if re.search(r'\b\d+\.\d+\b|\bverse \d+', t, re.I): iss.append(f'{lang}.{part}: verse number spoken')
            if lang == 'hi' and re.search(r'[A-Za-z]{3,}', t): iss.append(f'hi.{part}: English words')
            if lang == 'hi' and re.search(r'बल्कि|न कि', t): iss.append(f'hi.{part}: contrast template')
    w = lambda l, p: len(((s.get(l) or {}).get(p) or '').split())
    if w('en', 'intro') > 36: iss.append(f"en.intro too long ({w('en','intro')} words)")
    if w('en', 'notice') > 55: iss.append(f"en.notice too long ({w('en','notice')} words)")
    if w('en', 'next') > 24: iss.append(f"en.next too long ({w('en','next')} words)")
    plan = s.get('plan') or {}
    cands = plan.get('candidates') or []
    try: best = cands[int(plan.get('best', 0))]
    except Exception: best = None
    if not best: iss.append('plan.best missing')
    elif not grounded(best.get('evidence', ''), SRC_CACHE.get(key, '')): iss.append(f"angle evidence not found in SOURCE: {best.get('evidence','')[:60]}")
    if not s.get('angle_en') or not s.get('angle_hi'): iss.append('angle_en/angle_hi missing')
    elif re.search(r'[\u0900-\u097f]', s.get('angle_en') or ''): iss.append('angle_en: Devanagari in English, use plain Roman letters')
    return iss

def grounded(ev, src):
    toks = [t for t in re.split(r'[\s/,;:()"\'\u201c\u201d.\u0964\u0965]+', (ev or '').lower()) if len(t) >= 2]
    if not toks: return False
    hay = re.sub(r'\s+', '', (src or '').lower()); hay2 = (src or '').lower()
    hit = sum(1 for t in toks if t in hay2 or t.replace('\u093d', '') in hay)
    return hit / len(toks) >= 0.6

def norm(t): return re.sub(r'[\s\(\)"\'\u201c\u201d.,;:]+', ' ', (t or '').lower()).strip()
SRC_CACHE = {}
SRC_KEY = {}

def judge(src, s):
    script = {'en': {**(s.get('en') or {}), 'meaning': en_meaning(SRC_KEY.get(id(s), (0, 0))) if SRC_KEY.get(id(s)) else ''}, 'hi': s.get('hi')}
    txt = chat([{'role': 'system', 'content': JUDGE},
                {'role': 'user', 'content': src + '\n\nSCRIPT:\n' + json.dumps(script, ensure_ascii=False)}], max_tokens=900, temperature=0.1)
    try: sev = parse(txt).get('severe') or []
    except Exception: return {'ok': True, 'issues': []}
    return {'ok': not sev, 'issues': [f"{x.get('type')}: \"{x.get('phrase','')}\" ({x.get('why','')})" for x in sev]}

def edit(src, s):
    txt = chat([{'role': 'system', 'content': EDITOR},
                {'role': 'user', 'content': src + '\n\nANGLE: ' + str(s.get('angle_en')) + '\n\nSCRIPT:\n' + json.dumps({k: s.get(k) for k in ('en', 'hi')}, ensure_ascii=False)}],
               max_tokens=3000, temperature=0.3)
    try:
        e = parse(txt)
        if all(e.get(l, {}).get(p) for l in ('en', 'hi') for p in ('intro', 'body')):
            return {**s, 'en': e['en'], 'hi': e['hi']}
    except Exception:
        pass
    return s

def fallback(key):
    d = verses[key]; c, v = key; i = order.index(key)
    sp = d.get('speaker') or ''
    nxt = verses[order[i+1]] if i < len(order) - 1 else None
    en_intro = f"{sp} speaks." if sp else "The verse continues."
    en_body = d.get('englishTranslation', '').strip()
    if d.get('insight'): en_body += ' ' + d['insight'].strip()
    hi_intro = "अगला श्लोक सुनिए।"
    h = hic(c, v)
    hi_body = (h.get('bhavarth') if h else None) or re.sub(r'\s+', ' ', d.get('hindiTranslation', '')).strip()
    return {'en': {'intro': en_intro, 'body': en_body}, 'hi': {'intro': hi_intro, 'body': hi_body},
            'angle_en': d.get('essence') or '', 'angle_hi': (h or {}).get('saar') or ''}

def assemble(key, s):
    en, hi = s.get('en') or {}, dict(s.get('hi') or {})
    if hi.get('meaning'): hi['meaning'] = re.sub(r'^\S{0,14}\s?अर्थ\s?:\s*', '', hi['meaning']).strip()
    en = {k: plain_latin(v) for k, v in en.items()}
    hi = {k: re.sub(r'\s*[\u2013\u2014]\s*', ', ', v or '') for k, v in hi.items()}
    return {'plan': s.get('plan'), 'angle_en': plain_latin(s.get('angle_en') or ''), 'angle_hi': s.get('angle_hi'),
            'parts': {'en': {**en, 'meaning': en_meaning(key)}, 'hi': hi},
            'en': {'intro': en.get('intro', ''), 'body': ' '.join(x for x in [en_meaning(key), en.get('notice', ''), en.get('next', '')] if x)},
            'hi': {'intro': hi.get('intro', ''), 'body': ' '.join(x for x in [hi.get('meaning', ''), hi.get('notice', ''), hi.get('next', '')] if x)}}

def gen(key):
    c, v = key; out = f'{OUT}/{c}-{v}.json'
    if os.path.exists(out): return key, 'cached'
    src = source(key); SRC_CACHE[key] = src; style = OPENINGS[(verses[key]['order'] + c) % len(OPENINGS)]
    if verses[key]['order'] == 1: style = OPENINGS[0]
    msgs = [{'role': 'system', 'content': SYSTEM},
            {'role': 'user', 'content': EXAMPLE_USER}, {'role': 'assistant', 'content': EXAMPLE_ASSISTANT},
            {'role': 'user', 'content': f'OPENING STYLE: {style}\n{src}'}]
    history = []; best = None
    for attempt in range(4):
        try:
            s = parse(chat(msgs))
        except Exception as e:
            history.append({'attempt': attempt, 'error': f'gen: {e}'[:200]}); continue
        SRC_KEY[id(s)] = key
        r_iss = rule_issues(s, key)
        j = judge(src, s)
        issues = r_iss + j.get('issues', [])
        severe = j.get('issues', [])
        history.append({'attempt': attempt, 'issues': issues})
        score = len(severe) * 10 + len(r_iss)
        if best is None or score < best[0]: best = (score, s, severe, r_iss)
        if not severe and not [x for x in r_iss if 'too long' not in x and 'too short' not in x]:
            rec = {'chapter': c, 'verse': v, 'style': style, **assemble(key, s), 'review': history, 'source': 'sarvam'}
            json.dump(rec, open(out, 'w'), ensure_ascii=False, indent=1); return key, f'ok@{attempt}'
        msgs = msgs + [{'role': 'assistant', 'content': json.dumps(s, ensure_ascii=False)},
                       {'role': 'user', 'content': 'A reviewer found these problems. Rewrite the whole JSON (with plan) fixing them, keeping everything else faithful:\n- ' + '\n- '.join(issues)}]
    # no clean version: repair the best draft field by field (unsafe fields fall back to the data)
    if best:
        rec = {'chapter': c, 'verse': v, 'style': style, **assemble(key, repair(key, best[1], best[2] + best[3])),
               'review': history, 'source': 'sarvam+repair'}
    else:
        rec = {'chapter': c, 'verse': v, 'style': 'fallback', **assemble(key, repair(key, {}, ['all'])), 'review': history, 'source': 'template'}
    json.dump(rec, open(out, 'w'), ensure_ascii=False, indent=1)
    return key, rec['source']

HI_NAME = {'Krishna': 'श्रीकृष्ण', 'The Blessed Lord': 'श्रीकृष्ण', 'Sri Bhagavan': 'श्रीकृष्ण', 'Arjuna': 'अर्जुन', 'Sanjaya': 'संजय', 'Dhritarashtra': 'धृतराष्ट्र', 'Duryodhana': 'दुर्योधन'}
def safe_defaults(key):
    d = verses[key]; c, v = key; i = order.index(key)
    nxt = verses[order[i+1]] if i < len(order) - 1 else None
    sp = (d.get('speaker') or '').strip(); hsp = HI_NAME.get(sp, sp)
    h = hic(c, v) or {}
    def nxt_line(lang):
        if not nxt: return 'Here the Gita comes to rest.' if lang == 'en' else 'यहीं गीता पूर्ण होती है।'
        ns = (nxt.get('speaker') or '').strip()
        if lang == 'en': return f"Next, {ns} continues." if ns else 'The next verse continues.'
        return f"आगे {HI_NAME.get(ns, ns)} कहते हैं।" if ns else 'अगला श्लोक सुनिए।'
    return {
        'en': {'intro': (f"Listen as {sp} speaks." if sp else 'Listen to the next verse.'), 'notice': (d.get('insight') or d.get('simpleInsight') or '').strip(), 'next': nxt_line('en')},
        'hi': {'intro': (f"सुनिए, {hsp} क्या कहते हैं।" if hsp else 'अगला श्लोक सुनिए।'), 'meaning': (h.get('bhavarth') or re.sub(r'\s+', ' ', d.get('hindiTranslation', ''))).strip(),
               'notice': (h.get('saar') or '').strip(), 'next': nxt_line('hi')}}

def repair(key, s, issues):
    out = {'plan': s.get('plan'), 'angle_en': s.get('angle_en') or verses[key].get('essence') or '',
           'angle_hi': s.get('angle_hi') or '', 'en': dict(s.get('en') or {}), 'hi': dict(s.get('hi') or {})}
    sd = safe_defaults(key)
    bad = set()
    for iss in issues:
        if iss == 'all': bad |= {(l, p) for l in ('en', 'hi') for p in sd[l]}; continue
        m = re.match(r'(en|hi)\.(\w+)', iss)
        if m and 'too long' not in iss: bad.add((m.group(1), m.group(2))); continue
        q = re.search(r'"([^"]{8,})"', iss)
        if q:
            frag = q.group(1).strip()[:30]
            for l in ('en', 'hi'):
                for p_, t in (out[l] or {}).items():
                    if t and frag and frag in t: bad.add((l, p_))
    for l, p_ in bad:
        out[l][p_] = sd[l].get(p_, '')
    for l in ('en', 'hi'):
        for p_ in sd[l]:
            if not (out[l].get(p_) or '').strip(): out[l][p_] = sd[l][p_]
    return out

if __name__ == '__main__':
    keys = [tuple(map(int, a.split('.'))) for a in sys.argv[1:] if '.' in a] or order
    if 'chapters' in sys.argv[1:2]:
        chs = set(map(int, sys.argv[2].split(','))); keys = [k for k in order if k[0] in chs]
    workers = int(os.environ.get('WORKERS', '8'))
    t0 = time.time(); done = 0
    with ThreadPoolExecutor(workers) as ex:
        futs = [ex.submit(gen, k) for k in keys]
        for f in as_completed(futs):
            try: k, st = f.result()
            except Exception as e: k, st = ('?', f'error {e}'[:120])
            done += 1
            print(f'{done}/{len(keys)} {k} {st} {time.time()-t0:.0f}s', flush=True)

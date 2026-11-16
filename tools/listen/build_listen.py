import json, os, re, sys, glob, hashlib, time
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent)); import envload
import gen_scripts as G   # verses, order, chapters, chat, parse, plain_latin, hic

FE = str(__import__('pathlib').Path(__file__).resolve().parents[2] / 'frontend')
SCRIPTS = str(__import__('pathlib').Path(__file__).resolve().parent / 'scripts'); AUDIO = str(__import__('pathlib').Path(__file__).resolve().parent / 'work' / 'audio')
REC_BASE = 'https://pheysuesndqmmsogtdbt.supabase.co/storage/v1/object/public/wisdom-homepage/audio/bhagavad_gita/'
VERSION = 'v1'
manifest = json.load(open(f'{FE}/public/audio/gita/manifest.json'))

_INDEX = None
def audio_meta(c, v, lang, part, text):
    # rendered clips: tools/listen/audio-index.json ({lang}/{c}-{v}-{part}-{hash}.mp3 -> {src, dur, text})
    global _INDEX
    if _INDEX is None:
        p = str(__import__('pathlib').Path(__file__).resolve().parent / 'audio-index.json')
        _INDEX = json.load(open(p)) if os.path.exists(p) else {}
        for f in glob.glob(f'{AUDIO}/*/*.mp3.json'):
            _INDEX[f'{os.path.basename(os.path.dirname(f))}/{os.path.basename(f)[:-5]}'] = json.load(open(f))
    pre = f'{lang}/{c}-{v}-{part}-'
    for k, m in _INDEX.items():
        if k.startswith(pre) and m.get('text') == text: return m
    return None

def speakable(t): return re.sub(r'\s+', ' ', t or '').strip().replace('॥', '।').replace('*', '')

def verse_entry(key, lang):
    c, v = key; d = G.verses[key]
    sc = json.load(open(f'{SCRIPTS}/{c}-{v}.json')) if os.path.exists(f'{SCRIPTS}/{c}-{v}.json') else None
    m = manifest.get(f'{c}:{v}')
    rec = None
    if m:
        ts = [[round(x['start'], 3), round(x['end'], 3)] for x in m.get('timestamps', [])]
        dur = (ts[-1][1] + 0.8) if ts else 20.0
        rec = {'src': REC_BASE + re.sub(r'^/?gita/', '', m['audio']), 'dur': round(dur, 2), 'ts': ts}
    def part(p):
        if not sc: return None
        t = speakable((sc.get(lang) or {}).get(p, ''))
        a = audio_meta(c, v, lang, p, t) if t else None
        return {'src': a['src'], 'dur': a['dur'], 'text': t} if a else None
    tr = G.en_meaning(key) if lang == 'en' else re.sub(r'\s+', ' ', d.get('hindiTranslation', '')).strip()
    spk = (d.get('speaker') or '').strip()
    return {'c': c, 'v': v, 'sa': (m or {}).get('shloka') or d['sanskrit'], 'tr': tr,
            'angle': ((sc or {}).get('angle_en' if lang == 'en' else 'angle_hi') or '').strip(),
            'speaker': spk if lang == 'en' else G.HI_NAME.get(spk, spk) if hasattr(G, 'HI_NAME') else spk,
            'intro': part('intro'), 'body': part('body'), 'rec': rec}

def secs(e, mode):
    s = (e['rec'] or {}).get('dur', 0)
    if mode == 'meaning': s += (e['intro'] or {}).get('dur', 0) + (e['body'] or {}).get('dur', 0)
    return s

def group():
    sessions = []
    for ch in sorted({k[0] for k in G.order}):
        keys = [k for k in G.order if k[0] == ch]
        ents = {k: (verse_entry(k, 'en'), verse_entry(k, 'hi')) for k in keys}
        dur = lambda k: (secs(ents[k][0], 'meaning') + secs(ents[k][1], 'meaning')) / 2
        chunks, cur, tot = [], [], 0.0
        for i, k in enumerate(keys):
            cur.append(k); tot += dur(k)
            nxt = keys[i + 1] if i + 1 < len(keys) else None
            if not nxt: chunks.append(cur); break
            spk_change = (G.verses[nxt].get('speaker') or '') != (G.verses[k].get('speaker') or '')
            if tot + dur(nxt) > 15 * 60 or (tot >= 9 * 60 and spk_change) or tot >= 12.5 * 60:
                chunks.append(cur); cur, tot = [], 0.0
        if len(chunks) > 1 and sum(dur(k) for k in chunks[-1]) < 5 * 60 and sum(dur(k) for k in chunks[-2] + chunks[-1]) <= 17 * 60:
            last = chunks.pop(); chunks[-1] = chunks[-1] + last
        for n, ks in enumerate(chunks, 1):
            sessions.append({'id': f'{ch}-{n}', 'chapter': ch, 'n': n, 'keys': ks, 'ents': {k: ents[k] for k in ks}})
    return sessions

TITLE_SYS = """You name short listening sessions of the Bhagavad Gita. Given a run of consecutive verses, write a title in English and in Hindi that tells a listener what happens or what is taught in this stretch, so they want to press play.
Rules: English 3 to 8 words, sentence case. Hindi 3 to 8 words, natural Hindi in Devanagari. Faithful to the verses given, no claims beyond them. No dashes, no colons, no quotation marks, no verse numbers, no words like journey, profound, timeless, powerful, discover, unlock. No contrast templates ("not X but Y").
Return only JSON: {"en": "...", "hi": "..."}"""

def title(s):
    lines = []
    for k in s['keys']:
        d = G.verses[k]
        lines.append(f"{k[0]}.{k[1]} ({d.get('speaker') or ''}): {d.get('essence') or ''} | {G.en_meaning(k)[:220]}")
    ch = G.chapters.get(s['chapter'], {})
    user = f"Chapter {s['chapter']}, {ch.get('enName','')} ({ch.get('enTitle','')}). Verses:\n" + '\n'.join(lines)
    for attempt in range(3):
        try:
            j = G.parse(G.chat([{'role': 'system', 'content': TITLE_SYS}, {'role': 'user', 'content': user}], max_tokens=400, temperature=0.4))
            en, hi = (j.get('en') or '').strip().rstrip('.'), (j.get('hi') or '').strip().rstrip('।')
            bad = re.search(r'[–—:"]|\d|journey|profound|timeless|powerful|discover|unlock', en, re.I) or re.search(r'[–—:"]|\d|बल्कि', hi)
            if en and hi and not bad and 2 <= len(en.split()) <= 9 and re.search(r'[ऀ-ॿ]', hi):
                return {'en': en[0].upper() + en[1:], 'hi': hi}
        except Exception:
            pass
    e = G.verses[s['keys'][0]].get('essence') or f"Chapter {s['chapter']}"
    return {'en': e.rstrip('.'), 'hi': f"अध्याय {s['chapter']}, श्लोक {s['keys'][0][1]} से {s['keys'][-1][1]}"}

def main():
    sessions = group()
    tcache_p = str(__import__('pathlib').Path(__file__).resolve().parent / 'titles.json')
    tcache = json.load(open(tcache_p)) if os.path.exists(tcache_p) else {}
    todo = [s for s in sessions if f"{s['id']}|{s['keys'][0]}|{s['keys'][-1]}" not in tcache]
    with ThreadPoolExecutor(8) as ex:
        for s, t in zip(todo, ex.map(title, todo)):
            tcache[f"{s['id']}|{s['keys'][0]}|{s['keys'][-1]}"] = t
    json.dump(tcache, open(tcache_p, 'w'), ensure_ascii=False, indent=1)
    index = []
    ov_p = str(__import__('pathlib').Path(__file__).resolve().parent / 'title_overrides.json')
    overrides = json.load(open(ov_p)) if os.path.exists(ov_p) else {}
    for s in sessions:
        t = overrides.get(f"{s['id']}|{s['keys'][0][1]}|{s['keys'][-1][1]}") or tcache[f"{s['id']}|{s['keys'][0]}|{s['keys'][-1]}"]
        s['title'] = t
        en = [s['ents'][k][0] for k in s['keys']]; hi = [s['ents'][k][1] for k in s['keys']]
        s['dur'] = {'en': round(sum(secs(e, 'meaning') for e in en)), 'hi': round(sum(secs(e, 'meaning') for e in hi)),
                    'paath': round(sum(secs(e, 'paath') for e in en))}
        index.append({'id': s['id'], 'chapter': s['chapter'], 'n': s['n'], 'from': s['keys'][0][1], 'to': s['keys'][-1][1],
                      'title': t, 'dur': s['dur']})
    os.makedirs(f'{FE}/src/content/gita/listen', exist_ok=True)
    json.dump({'version': VERSION, 'generated': time.strftime('%Y-%m-%d'), 'sessions': index},
              open(f'{FE}/src/content/gita/listen/sessions.json', 'w'), ensure_ascii=False, indent=1)
    missing = 0
    for lang in ('en', 'hi'):
        os.makedirs(f'{FE}/public/listen/{VERSION}/{lang}', exist_ok=True)
        for i, s in enumerate(sessions):
            def ref(o):
                if not o: return None
                return {'id': o['id'], 'chapter': o['chapter'], 'n': o['n'], 'from': o['keys'][0][1], 'to': o['keys'][-1][1],
                        'title': o['title'][lang], 'min': max(1, round(o['dur'][lang] / 60))}
            vs = [s['ents'][k][0 if lang == 'en' else 1] for k in s['keys']]
            missing += sum(1 for e in vs if not e['intro'] or not e['body'])
            ch = G.chapters.get(s['chapter'], {})
            data = {'id': s['id'], 'chapter': s['chapter'], 'n': s['n'], 'from': s['keys'][0][1], 'to': s['keys'][-1][1], 'lang': lang,
                    'title': s['title'][lang], 'chapterName': ch.get('enName' if lang == 'en' else 'hiName', ''),
                    'dur': {'meaning': s['dur'][lang], 'paath': s['dur']['paath']}, 'verses': vs,
                    'prev': ref(sessions[i - 1]) if i > 0 else None, 'next': ref(sessions[i + 1]) if i + 1 < len(sessions) else None}
            json.dump(data, open(f"{FE}/public/listen/{VERSION}/{lang}/{s['id']}.json", 'w'), ensure_ascii=False, separators=(',', ':'))
    print('sessions', len(sessions), 'verse-parts missing audio', missing)
    from collections import Counter
    print('per chapter', Counter(s['chapter'] for s in sessions))
    print('minutes en', sorted(round(s['dur']['en'] / 60, 1) for s in sessions)[:5], '...', sorted(round(s['dur']['en'] / 60, 1) for s in sessions)[-5:])

if __name__ == '__main__':
    main()

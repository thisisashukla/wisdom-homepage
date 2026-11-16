import json, os, re, sys, time, glob, base64, hashlib, random
from concurrent.futures import ThreadPoolExecutor, as_completed
sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent)); import envload
import httpx
from sarvamai import SarvamAI

SCRIPTS = str(__import__('pathlib').Path(__file__).resolve().parent / 'scripts')
AUDIO = str(__import__('pathlib').Path(__file__).resolve().parent / 'work' / 'audio'); os.makedirs(AUDIO, exist_ok=True)
BUCKET = 'wisdom-homepage'; PREFIX = 'audio/gita-listen/v1'
SB = os.environ['SUPABASE_URL'].rstrip('/'); SKEY = os.environ['SUPABASE_SERVICE_ROLE_KEY']
client = SarvamAI(api_subscription_key=os.environ['SARVAM_API_KEY'])
VOICE = {'en': ('en-IN', 'girish_en_devotional', 0.92), 'hi': ('hi-IN', 'girish_hi_devotional', 0.92)}
MODEL = 'bulbul:v4-flash'

_BITRATES = {1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0],
             2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0]}
_RATES = {3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000]}
def mp3_seconds(b):
    i, n, total = 0, len(b), 0.0
    while i + 4 <= n:
        if b[i:i+3] == b'ID3' and i + 10 <= n:
            size = (b[i+6] & 0x7F) << 21 | (b[i+7] & 0x7F) << 14 | (b[i+8] & 0x7F) << 7 | (b[i+9] & 0x7F)
            i += 10 + size; continue
        if b[i] == 0xFF and (b[i+1] & 0xE0) == 0xE0:
            ver, layer = (b[i+1] >> 3) & 3, (b[i+1] >> 1) & 3
            bri, sri, pad = (b[i+2] >> 4) & 0xF, (b[i+2] >> 2) & 3, (b[i+2] >> 1) & 1
            if ver != 1 and layer == 1 and bri not in (0, 15) and sri != 3:
                rate = _RATES[ver][sri]; bitrate = _BITRATES[1 if ver == 3 else 2][bri] * 1000
                size = (144 if ver == 3 else 72) * bitrate // rate + pad
                if size > 4:
                    total += (1152 if ver == 3 else 576) / rate; i += size; continue
        i += 1
    return round(total, 2)

def tts(text, lang):
    code, sp, pace = VOICE[lang]
    for attempt in range(6):
        try:
            r = client.text_to_speech.convert(text=text, language_code=code, speaker=sp, model=MODEL, output_audio_codec='mp3',
                                              pace=pace, speech_sample_rate=24000, request_options={'timeout_in_seconds': 90, 'max_retries': 0})
            b = b''.join(base64.b64decode(a) for a in (r.audios or []))
            if b: return b
        except Exception as e:
            last = e
        time.sleep(3 * (attempt + 1) + random.random() * 2)
    raise RuntimeError(f'tts failed: {last if "last" in dir() else "empty"}')

http = httpx.Client(timeout=60)
def upload(path, b):
    for attempt in range(5):
        r = http.post(f'{SB}/storage/v1/object/{BUCKET}/{path}', content=b,
                      headers={'Authorization': f'Bearer {SKEY}', 'apikey': SKEY, 'content-type': 'audio/mpeg',
                               'cache-control': 'public, max-age=31536000, immutable', 'x-upsert': 'true'})
        if r.status_code in (200, 201): return True
        time.sleep(2 * (attempt + 1))
    raise RuntimeError(f'upload {path}: {r.status_code} {r.text[:200]}')

def speakable(t):
    t = re.sub(r'\s+', ' ', t or '').strip()
    return t.replace('॥', '।').replace('*', '')

INDEX = str(__import__('pathlib').Path(__file__).resolve().parent / 'audio-index.json')
def load_index():
    return json.load(open(INDEX)) if os.path.exists(INDEX) else {}

def job(c, v, lang, part, text):
    h = hashlib.sha1(f'{MODEL}|{VOICE[lang]}|{text}'.encode()).hexdigest()[:8]
    name = f'{c}-{v}-{part}-{h}.mp3'; local = f'{AUDIO}/{lang}/{name}'; os.makedirs(f'{AUDIO}/{lang}', exist_ok=True)
    meta = local + '.json'
    if os.path.exists(meta): return json.load(open(meta))
    hit = load_index().get(f'{lang}/{name}')
    if hit and hit.get('text') == text: return hit
    b = open(local, 'rb').read() if os.path.exists(local) else tts(text, lang)
    open(local, 'wb').write(b)
    path = f'{PREFIX}/{lang}/{name}'
    upload(path, b)
    rec = {'src': f'{SB}/storage/v1/object/public/{BUCKET}/{path}', 'dur': mp3_seconds(b), 'text': text}
    json.dump(rec, open(meta, 'w'), ensure_ascii=False)
    return rec

def work_items():
    for f in sorted(glob.glob(f'{SCRIPTS}/*.json')):
        d = json.load(open(f))
        for lang in ('en', 'hi'):
            for part in ('intro', 'body'):
                t = speakable((d.get(lang) or {}).get(part, ''))
                if t: yield (d['chapter'], d['verse'], lang, part, t)

if __name__ == '__main__':
    items = list(work_items())
    if len(sys.argv) > 1 and sys.argv[1] == 'only':
        keep = set(sys.argv[2].split(',')); items = [i for i in items if f'{i[0]}.{i[1]}' in keep]
    workers = int(os.environ.get('WORKERS', '8')); t0 = time.time(); done = err = 0
    with ThreadPoolExecutor(workers) as ex:
        futs = {ex.submit(job, *i): i for i in items}
        for f in as_completed(futs):
            done += 1
            try: f.result()
            except Exception as e:
                err += 1; print('ERR', futs[f][:4], str(e)[:200], flush=True)
            if done % 50 == 0 or done == len(items): print(f'{done}/{len(items)} err={err} {time.time()-t0:.0f}s', flush=True)
    # committed index of every rendered clip: {lang}/{file} -> {src, dur, text}
    idx = load_index()
    for f in glob.glob(f'{AUDIO}/*/*.mp3.json'):
        lang = os.path.basename(os.path.dirname(f)); idx[f'{lang}/{os.path.basename(f)[:-5]}'] = json.load(open(f))
    json.dump(idx, open(INDEX, 'w'), ensure_ascii=False, indent=0, sort_keys=True)

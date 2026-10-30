"""Fact-check pass: fuzzy-match each shared line against the clean Complete Works (vols 1 to 8).
Verdicts: >=90 in-his-words, 70 to 90 paraphrase, <70 not-found (vol 9 checked by hand on Wikisource)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from viv_match import best_match, exact_span
lines = json.load(open(os.path.join(os.path.dirname(__file__), 'viv_shared_lines.json')))
RAW = os.path.expanduser('~/work_sayings/viv_factcheck_raw.json')
# Resumable: the device shell stops long jobs, so run it repeatedly until every line is done.
out = json.load(open(RAW)) if os.path.exists(RAW) else []
done = {o['slug'] for o in out}
import time
t0 = time.time()
for x in lines:
    if x['slug'] in done or time.time() - t0 > 140: continue
    m = best_match(x['line'], top=35)
    r = m['rec'] or {}
    v = 'in-his-words' if m['score'] >= 90 else 'paraphrase' if m['score'] >= 70 else 'not-found'
    out.append({**x, 'score': m['score'], 'verdict': v, 'window': m['window'], 'span': exact_span(r, m['window']) if r else '',
                'rec': {k: r.get(k) for k in ('id', 'volume', 'work', 'record_type', 'source_url')} if r else None,
                'paragraph': r.get('original_english', '')})
    print(m['score'], v, x['slug'], flush=True)
    json.dump(out, open(RAW, 'w'), ensure_ascii=False, indent=1)
print('done', len(out), 'of', len(lines))

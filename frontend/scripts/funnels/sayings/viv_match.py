"""Fuzzy matcher for Vivekananda lines against the clean Complete Works set (python difflib only).
score = best SequenceMatcher ratio (0 to 100) between the query and any window of the paragraph
with a similar word count. Used by the fact-check pass and to verify every hub line."""
import json, os, re, collections
from difflib import SequenceMatcher
CLEAN = os.path.expanduser('~/work_sayings/viv_clean.jsonl')
STOP = set('the a an and or of to in is it that this be are was were as for on with by not no you your we our i he his they them their there what which who all but if so do have has had at from one can will shall its me my us any into than then thus'.split())
def norm(s):
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    return re.sub(r'\s+', ' ', re.sub(r"[^a-z0-9' ]+", ' ', s.lower())).strip()
RECS = [json.loads(l) for l in open(CLEAN)]
NORM = [norm(r['original_english']) for r in RECS]
INDEX = collections.defaultdict(set)
for i, t in enumerate(NORM):
    for w in set(t.split()):
        if w not in STOP and len(w) > 2:
            INDEX[w].add(i)
def best_match(query, top=60):
    q = norm(query); qw = q.split(); L = len(qw)
    content = [w for w in set(qw) if w not in STOP and len(w) > 2]
    cnt = collections.Counter()
    for w in content:
        post = INDEX.get(w, ())
        if len(post) > 3000: continue
        for i in post: cnt[i] += 1
    best = (0, None, '')
    for i, _ in cnt.most_common(top):
        words = NORM[i].split()
        sm = SequenceMatcher(None, autojunk=False)
        sm.set_seq2(q)
        for n in range(max(1, L - 3), L + 4):
            for s in range(0, max(1, len(words) - n + 1)):
                cand = ' '.join(words[s:s + n])
                sm.set_seq1(cand)
                if sm.real_quick_ratio() * 100 <= best[0] or sm.quick_ratio() * 100 <= best[0]:
                    continue
                r = sm.ratio() * 100
                if r > best[0]:
                    best = (r, i, cand)
    sc, i, cand = best
    return {'score': round(sc, 1), 'rec': RECS[i] if i is not None else None, 'window': cand}
def exact_span(rec, window):
    """Return the original-case text in rec that corresponds to the normalised window (best effort)."""
    txt = rec['original_english']
    toks = window.split()
    if not toks: return ''
    pat = r'\W+'.join(re.escape(t) for t in toks)
    m = re.search(pat, txt.replace('’', "'"), re.I)
    return txt[m.start():m.end()] if m else ''
if __name__ == '__main__':
    import sys
    for q in sys.argv[1:]:
        m = best_match(q)
        r = m['rec']
        print(m['score'], r and (r['volume'], r['work'], r['record_type'], r['id']), '|', m['window'][:200])

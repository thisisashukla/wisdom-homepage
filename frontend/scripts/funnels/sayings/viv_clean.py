"""Builds the clean Vivekananda paragraph set used by the sayings funnel.
Excludes: records translated from Bengali, short headings (< 25 chars, or no sentence punctuation), exact duplicates.
Output: $HOME/work/viv_clean.jsonl (scratch, not shipped)."""
import json, os, re, sys
SRC = os.path.expanduser('~/mnt/sanscripts/data/corpus_new/vivekananda_corpus.jsonl')
OUT = os.path.expanduser('~/work_sayings/viv_clean.jsonl')
seen = set(); kept = 0; stats = {'bengali': 0, 'short': 0, 'dup': 0}
with open(SRC) as f, open(OUT, 'w') as o:
    for line in f:
        r = json.loads(line)
        if r.get('translated_from_bengali'):
            stats['bengali'] += 1; continue
        t = (r.get('original_english') or '').strip()
        if len(t) < 25 or not re.search(r'[.?!;:"”]', t):
            stats['short'] += 1; continue
        key = re.sub(r'\W+', ' ', t.lower()).strip()
        if key in seen:
            stats['dup'] += 1; continue
        seen.add(key)
        o.write(json.dumps({k: r[k] for k in ('id', 'volume', 'section', 'work', 'record_type', 'source_url', 'original_english')}) + '\n')
        kept += 1
print(kept, stats)

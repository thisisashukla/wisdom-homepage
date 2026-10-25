#!/usr/bin/env python3
"""Check a verse-rewrite batch (out-N.json) against the verse-field rules. usage: verse_check.py out-N.json"""
import sys, json, re, collections, os
sys.path.insert(0, os.path.dirname(__file__))
from audit import score_text
rows = json.load(open(sys.argv[1]))
bad = []; openers = collections.Counter(); you = 0; tech = 0; mr_n = 0
TECH = r"\b(phone|scroll\w*|email|inbox|notification\w*|whatsapp|slack|text(ed|s)?|message\w*|app|laptop|screen)\b"
for r in rows:
    for k in ('insight', 'simpleInsight', 'modernRelevance'):
        t = r.get(k)
        if t is None: continue
        w = len(t.split())
        if '—' in t or '–' in t: bad.append((r['file'], k, 'dash'))
        h = {kk: v for kk, v in score_text(t)['hits'].items() if v and kk != 'vignette'}
        if h: bad.append((r['file'], k, 'slop:' + ','.join(h)))
        if re.search(r'\bshift', t, re.I): bad.append((r['file'], k, 'shift'))
        openers[(k, ' '.join(t.split()[:2]))] += 1
        if k == 'insight':
            if re.match(r'(It|This verse)\b', t): bad.append((r['file'], k, 'opener'))
            if not 6 <= w <= 24: bad.append((r['file'], k, f'len {w}'))
        if k == 'simpleInsight':
            if re.match(r'There (is|are)\b', t): bad.append((r['file'], k, 'opener'))
            if not 6 <= w <= 22: bad.append((r['file'], k, f'len {w}'))
        if k == 'modernRelevance':
            mr_n += 1
            if re.match(r'You\b', t): you += 1
            if re.search(TECH, t, re.I): tech += 1
            if re.match(r'You (are about to|send)', t): bad.append((r['file'], k, 'opener'))
            if re.search(r'(This|The) verse (says|asks|points|reminds|cuts|names)', t): bad.append((r['file'], k, 'verse-says ending'))
            if not 15 <= w <= 55: bad.append((r['file'], k, f'len {w}'))
for b in bad: print('FAIL', *b)
rep = [(k, n) for k, n in openers.items() if n > max(3, 0.06 * len(rows))]
for (k, o), n in rep: print('REPEATED OPENER', k, repr(o), n)
if mr_n:
    print(f'modernRelevance: {you}/{mr_n} start with You ({100*you//mr_n}%, max 60%); {tech} mention phones/messages/screens (max {max(1, mr_n//15)})')
print('rows', len(rows), 'fails', len(bad))

#!/usr/bin/env python3
"""Show changed visible copy (old -> new) for files changed since HEAD, and flag slop in the NEW lines.
usage: python3 tools/copy-audit/diffcopy.py [path-substring ...] [--json out.json]
"""
import sys, os, subprocess, difflib, json, re
sys.path.insert(0, os.path.dirname(__file__))
from audit import visible_text, score_text, ROOT
args = [a for a in sys.argv[1:] if not a.startswith('--')]
jout = sys.argv[sys.argv.index('--json') + 1] if '--json' in sys.argv else None
if jout in args: args.remove(jout)
files = subprocess.run(['git', '-C', ROOT, 'diff', '--name-only', 'HEAD'], capture_output=True, text=True).stdout.split()
files = [f for f in files if f.endswith(('.tsx', '.ts', '.json')) and (not args or any(a in f for a in args)) and '/verses/' not in f and 'copy-audit' not in f]
pairs = []
def sents(t):
    return [s.strip() for line in t.split('\n') for s in re.split(r'(?<=[.!?])\s+(?=[A-Z"“‘])', line) if s.strip()]
for f in files:
    old = subprocess.run(['git', '-C', ROOT, 'show', f'HEAD:{f}'], capture_output=True, text=True).stdout
    new = open(os.path.join(ROOT, f), encoding='utf-8').read()
    a, b = sents(visible_text(old)), sents(visible_text(new))
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == 'equal': continue
        o, n = ' '.join(a[i1:i2]), ' '.join(b[j1:j2])
        flags = {k: v for k, v in score_text(n)['hits'].items() if v} if n else {}
        pairs.append({'file': f, 'old': o, 'new': n, 'flags': {k: len(v) for k, v in flags.items()}})
if jout:
    json.dump(pairs, open(jout, 'w'), ensure_ascii=False, indent=1)
for p in pairs:
    fl = ' FLAGS:' + str(p['flags']) if p['flags'] else ''
    print(f"--- {p['file']}{fl}\n  OLD: {p['old'][:600]}\n  NEW: {p['new'][:600]}")
print(f"\n{len(pairs)} changed passages, {sum(1 for p in pairs if p['flags'])} with automated flags")

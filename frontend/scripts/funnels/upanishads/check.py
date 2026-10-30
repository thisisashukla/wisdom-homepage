"""
Consistency checks for the Upanishads funnel content (run from frontend/):
  python3 -I scripts/funnels/upanishads/check.py
- every famous line's Sanskrit occurs in its source passage (sandhi-insensitive squash)
- every plan day and mahavakya points at a real passage, and the mahavakya occurs in it
- every Katha verse sits in exactly one Sit closer exchange
- no em or en dashes in any funnel file
"""
import json
import os
import re
import sys

FRONT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..'))
C = os.path.join(FRONT, 'src', 'content', 'funnels', 'upanishads')
P = json.load(open(os.path.join(C, 'passages.json'), encoding='utf-8'))
fail = []


def squash(s):
    s = s.replace('ॐ', '').replace('ꣳ', 'ं').replace('ँ', 'ं')
    return re.sub(r'[\s।॥|‍‌]', '', s)


lines = open(os.path.join(C, 'lines.ts'), encoding='utf-8').read()
for m in re.finditer(r"passage: '([^']+)',.*?\n    sa: '([^']+)'", lines, re.S):
    key, sa = m.group(1), m.group(2)
    src = squash(P[key]['sa'])
    # the hand-spaced line may differ only by spacing and dandas
    if squash(sa) not in src:
        # allow sandhi at a word boundary: compare word by word
        def core(w):
            w = squash(w)[:-1]
            return w[1:] if w and w[0] in 'अआइईउऊएऐओऔ' else w
        missing = [w for w in sa.replace('।', ' ').replace('॥', ' ').split() if core(w) and core(w) not in src]
        if missing:
            fail.append(f'line {key}: words not in passage: {missing}')

plan = open(os.path.join(C, 'plan.ts'), encoding='utf-8').read()
for key in re.findall(r"passage: '([^']+)'", plan):
    if key not in P:
        fail.append(f'plan: unknown passage {key}')

maha = open(os.path.join(C, 'mahavakyas.ts'), encoding='utf-8').read()
for key, check in re.findall(r"passage: '([^']+)',\n    check: '([^']+)'", maha):
    if key not in P or squash(check) not in squash(P[key]['sa']):
        fail.append(f'mahavakya {key}: {check} not found')

katha = json.load(open(os.path.join(C, 'texts', 'katha.json'), encoding='utf-8'))
refs = [v['ref'] for v in katha['verses']]
ex = open(os.path.join(C, 'katha-exchanges.ts'), encoding='utf-8').read()
used = []
for m in re.finditer(r"range\('(\d\.\d)', (\d+), (\d+)\)|'(\d\.\d\.\d+)'", ex):
    if m.group(1):
        used += [f'{m.group(1)}.{i}' for i in range(int(m.group(2)), int(m.group(3)) + 1)]
    else:
        used.append(m.group(4))
if sorted(used) != sorted(refs):
    extra = sorted(set(used) - set(refs))
    missing = sorted(set(refs) - set(used))
    dup = sorted({u for u in used if used.count(u) > 1})
    fail.append(f'katha exchanges: missing {missing} extra {extra} dup {dup}')

roots = [C, os.path.join(FRONT, 'src', 'components', 'funnels', 'upanishads'), os.path.join(FRONT, 'src', 'app', 'upanishads'),
         os.path.join(FRONT, 'src', 'app', 'hi', 'upanishad'), os.path.join(FRONT, 'src', 'app', 'hi', 'upanishads'),
         os.path.join(FRONT, 'scripts', 'funnels', 'upanishads'), os.path.join(FRONT, '..', 'lp', 'funnels', 'upanishads')]
files = [os.path.join(FRONT, 'src', 'lib', 'funnels', 'upanishads.ts'), os.path.join(FRONT, 'src', 'lib', 'funnelSitemaps', 'upanishads.ts')]
for r in roots:
    for d, _, fs in os.walk(r):
        files += [os.path.join(d, f) for f in fs if not f.endswith('.pyc')]
for f in files:
    t = open(f, encoding='utf-8').read()
    for ch in (chr(0x2014), chr(0x2013)):
        if ch in t:
            fail.append(f'dash in {os.path.relpath(f, FRONT)}')

print('\n'.join(fail) if fail else f'ok: {len(files)} files, {len(refs)} katha verses, {len(P)} passages')
sys.exit(1 if fail else 0)

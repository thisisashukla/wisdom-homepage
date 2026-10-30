#!/usr/bin/env python3
"""Runs the house copy audit (tools/copy-audit/audit.py scoring) on the Ramayana funnel files.

Run from frontend/:  python3 scripts/funnels/ramayana/audit_copy.py [--hits]
Scores the visible text of every funnel TSX/TS file and the English strings in the content JSON,
and greps every funnel file for em and en dashes.
"""
import glob
import json
import os
import sys

FE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
sys.path.insert(0, os.path.join(FE, '..', 'tools', 'copy-audit'))
import audit  # noqa: E402

FILES = sorted(
    glob.glob(os.path.join(FE, 'src/app/ramayana/**/*.tsx'), recursive=True)
    + glob.glob(os.path.join(FE, 'src/app/hi/ramayana/**/*.tsx'), recursive=True)
    + glob.glob(os.path.join(FE, 'src/components/funnels/ramayana/*.ts*'))
    + glob.glob(os.path.join(FE, 'src/lib/funnels/ramayana/*.ts'))
)
CONTENT = sorted(glob.glob(os.path.join(FE, 'src/content/funnels/ramayana/*.json')))
OTHER = sorted(glob.glob(os.path.join(FE, 'scripts/funnels/ramayana/*.py')) + glob.glob(os.path.join(FE, '..', 'lp/funnels/ramayana/*.md'))
               + [os.path.join(FE, 'src/lib/funnelSitemaps/ramayana.ts'), os.path.join(FE, 'src/components/funnels/ramayana/ramayana.css')])


def en_strings(obj, out, key=''):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ('hi', 'sa', 'iast', 'sanskritLine', 'url', 'corpusId', 'key', 'href', 'reason', 'from', 'to'):
                continue
            en_strings(v, out, k)
    elif isinstance(obj, list):
        for v in obj:
            en_strings(v, out, key)
    elif isinstance(obj, str) and ' ' in obj and not any('ऀ' <= c <= 'ॿ' for c in obj):
        out.append(obj)


texts = {}
for f in FILES:
    texts[os.path.relpath(f, FE)] = audit.visible_text(open(f, encoding='utf-8').read())
for f in CONTENT:
    out = []
    en_strings(json.load(open(f, encoding='utf-8')), out)
    texts[os.path.relpath(f, FE)] = '\n'.join(dict.fromkeys(out))

show = '--hits' in sys.argv
bad = 0
for name, txt in texts.items():
    r = audit.score_text(txt)
    c = r['counts']
    flag = sum(c[k] for k in ('reveal', 'fragment', 'superlative', 'banned', 'clinical', 'formula'))
    print(f"{name[:70]:70} words {r['words']:5} index {r['index']:5}  rev {c['reveal']} frg {c['fragment']} sup {c['superlative']} ban {c['banned']} cli {c['clinical']} frm {c['formula']} int {c['intensifier']} vig {c['vignette']}")
    if show:
        for k, hits in r['hits'].items():
            for h in hits:
                print(f'    [{k}] {h}')
    bad += flag

dash = 0
for f in FILES + CONTENT + OTHER:
    if not os.path.exists(f):
        continue
    for i, line in enumerate(open(f, encoding='utf-8'), 1):
        if chr(0x2014) in line or chr(0x2013) in line:
            dash += 1
            print(f'DASH {os.path.relpath(f, FE)}:{i}: {line.strip()[:100]}')
print(f'\nflagged patterns: {bad}   dashes: {dash}')

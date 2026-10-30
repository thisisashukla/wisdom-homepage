#!/usr/bin/env python3
"""Copy check for the other-gitas funnel: the house audit regexes plus dash and reveal-pattern checks.
Run from the repo root: python3 frontend/scripts/funnels/other-gitas/check_copy.py"""
import glob, json, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'tools', 'copy-audit'))
import audit  # noqa: E402

FE = os.path.join(ROOT, 'frontend')
EXTRA = {
    'dash': r'[\u2013\u2014]',
    'exclaim': r'!(?!=)',
    'reveal': r"\bnot (only )?\w+(\s\w+){0,3},? but\b|\bisn['’]t [^.]{1,40}, it['’]s\b|\b(is|was|are) not [^.]{1,60}\. (It|He|She|They|This) (is|was|are)\b|\bdoes not \w+\. (He|She|It) \w+s\b",
    'emoji': r'[\U0001F300-\U0001FAFF☀-➿]',
}

def strings(obj):
    if isinstance(obj, str):
        yield obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            if k in ('sa', 'iast', 'sanskritLine', 'w', 'hi', 'id'):
                continue
            yield from strings(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from strings(v)

def check(label, text):
    hits = []
    for name, (_, rx) in audit.CLASSES.items():
        if name == 'vignette':
            continue
        for m in re.finditer(rx, text, flags=re.I):
            hits.append((name, m.group(0)))
    for name, rx in EXTRA.items():
        for m in re.finditer(rx, text, flags=0 if name == 'emoji' else re.I):
            hits.append((name, m.group(0)))
    for h in hits:
        ctx = text[max(0, text.find(h[1]) - 50): text.find(h[1]) + 60].replace('\n', ' ')
        print(f'{label}: [{h[0]}] {h[1]!r} :: {ctx}')
    return len(hits)

n = 0
for f in glob.glob(os.path.join(FE, 'src/content/funnels/other-gitas/*.json')):
    data = json.load(open(f, encoding='utf-8'))
    for i, s in enumerate(strings(data)):
        n += check(os.path.basename(f), s)
files = glob.glob(os.path.join(FE, 'src/app/ashtavakra-gita*/**/*.tsx'), recursive=True) + \
    glob.glob(os.path.join(FE, 'src/app/gitas/**/*.tsx'), recursive=True) + \
    glob.glob(os.path.join(FE, 'src/components/funnels/other-gitas/*.tsx')) + \
    glob.glob(os.path.join(FE, 'src/lib/funnels/other-gitas/*.ts')) + \
    glob.glob(os.path.join(ROOT, 'lp/funnels/other-gitas/*.md'))
for f in files:
    t = open(f, encoding='utf-8').read()
    if f.endswith('.md'):
        if 'llms' in f:
            n += check(os.path.relpath(f, ROOT), t)
        for m in re.finditer(r'[\u2013\u2014]', t):
            print(os.path.relpath(f, ROOT), 'dash'); n += 1
        continue
    n += check(os.path.relpath(f, ROOT), audit.visible_text(t))
print('hits', n)

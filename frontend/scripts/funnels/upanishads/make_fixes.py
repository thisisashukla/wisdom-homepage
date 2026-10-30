"""
One-time reconciliation of the local corpus against a second edition.

Usage: python3 -I make_fixes.py <editions_dir> <corpus_raw_json_dir>

<editions_dir> holds plain-text dumps of the sanskritdocuments.org pages
(fetched 2026-10-30): iisha, kena, maandu, katha, mundaka, tait
(https://sanskritdocuments.org/doc_upanishhat/<name>.html). They are not
committed; only the per-verse result is (src/fixes.json, src/imports.json).

For every verse where the corpus and the edition differ after normalising
(Vedic anusvara, spacing, dandas), the edition's reading is taken and the
corpus reading is kept alongside it for review. Parenthesised variants in the
edition are moved to `variants`.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DIG = '०१२३४५६७८९'


def todig(s):
    return int(''.join(str(DIG.index(c)) for c in s))


def norm(s):
    s = s.replace('ꣳ', 'ं').replace('ँ', 'ं').replace('‍', '').replace('‌', '').replace('ॐ', '')
    s = re.sub(r'[\s।॥\-0-9०-९|]', '', s)
    return s.replace('ऽ', '')


def tidy(text):
    """Join hyphenated half-lines, drop variants, one pada pair per line."""
    variants = re.findall(r'\(([^)]*)\)', text) + re.findall(r'var\s+(\S+)', text)
    text = re.sub(r'\s*\([^)]*\)', '', text)
    text = re.sub(r'\s*var\s+\S+', '', text)
    text = re.sub(r'-\s*\n\s*', '', text)
    text = re.sub(r'\s*\n\s*', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'\s*।\s*', ' ।\n', text).strip()
    text = text.rstrip('।').strip()
    return text + ' ॥', variants


def seq(path, start):
    txt = open(path, encoding='utf-8').read().split('% Text title')[0]
    txt = txt[txt.index(start):]
    items, buf = [], []
    for ln in txt.split('\n'):
        if ('वल्ली' in ln or 'खण्डः' in ln) and '॥' in ln and not re.search(r'॥\s*[०-९]+\s*॥', ln):
            buf = []
            continue
        m = re.search(r'॥\s*([०-९]+)\s*॥', ln)
        if m:
            buf.append(ln[:m.start()])
            items.append((todig(m.group(1)), '\n'.join(buf).strip()))
            buf = []
        elif re.search('[ऀ-ॿ]', ln):
            buf.append(ln)
    return items


def corpus(raw, name):
    d = json.load(open(os.path.join(raw, f'{name}_upanishad_source.json'), encoding='utf-8'))
    out = {}
    for r in d:
        idx = r['meta']['index'].replace(',', '.')
        t = (r['source'].get('Hindi') or '').strip()
        out[idx] = (out[idx] + '\n' + t) if idx in out else t
    return out


def reconcile(raw, ed, cname, ename, start, edition_url):
    c = corpus(raw, cname)
    keys = sorted(c, key=lambda k: [int(x) for x in k.split('.')])
    s = seq(os.path.join(ed, ename + '.txt'), start)
    fixes = {}
    for i, k in enumerate(keys):
        if i >= len(s):
            break
        st = re.sub(r'^.*?॥\s*\n', '', s[i][1], count=1) if 'अथ' in s[i][1].split('\n')[0] else s[i][1]
        st = re.sub(r'^हरिः ॐ ।\s*', '', st)
        if norm(c[k]) != norm(st):
            text, variants = tidy(st)
            fixes[k] = {'sa': text, 'corpus': c[k], 'variants': variants, 'basis': edition_url}
        else:
            # Same letters, different word division (the corpus often fuses words after the Vedic anusvara).
            text, variants = tidy(st)
            spaced = lambda x: re.sub(r'\s+', ' ', x.replace('ꣳ', 'ं').replace('ँ', 'ं').replace('॥', '').replace('।', '').replace('ॐ', '')).strip()
            if spaced(text) != spaced(c[k]):
                fixes[k] = {'sa': text, 'corpus': c[k], 'variants': variants, 'basis': edition_url, 'spacingOnly': True}
    return fixes


def kena(ed):
    s = seq(os.path.join(ed, 'kena.txt'), 'केनेषितं')
    out, khanda, last = {}, 1, 0
    for num, text in s:
        if num <= last:
            khanda += 1
        last = num
        t, variants = tidy(text)
        if khanda == 1 and num == 1:
            t = 'ॐ ' + t
        out[f'{khanda}.{num}'] = {'sa': t, 'variants': variants}
    return out


def main():
    ed, raw = sys.argv[1], sys.argv[2]
    sd = 'https://sanskritdocuments.org/doc_upanishhat/'
    fixes = {
        'isha': reconcile(raw, ed, 'isha', 'iisha', 'अथ ईशोपनिषत्', sd + 'iisha.html'),
        'mandukya': reconcile(raw, ed, 'mandukya', 'maandu', 'अथ माण्डूक्य', sd + 'maandu.html'),
        'katha': reconcile(raw, ed, 'kath', 'katha', 'Canto I', sd + 'katha.html'),
        'mundaka': reconcile(raw, ed, 'mundaka', 'mundaka', 'प्रथममुण्डके प्रथमः खण्डः', sd + 'mundaka.html'),
    }
    # Opening-line differences that are only the heading or "hari om" are not fixes.
    for t in fixes.values():
        for k in list(t):
            if norm(t[k]['sa']) == norm(t[k]['corpus']) and not t[k].get('spacingOnly'):
                del t[k]
    json.dump(fixes, open(os.path.join(HERE, 'src', 'fixes.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    imports = {'kena': kena(ed), 'kena_basis': sd + 'kena.html'}
    json.dump(imports, open(os.path.join(HERE, 'src', 'imports_kena.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for k, v in fixes.items():
        print(k, len(v), 'fixes')
    print('kena', len(imports['kena']), 'verses')


if __name__ == '__main__':
    main()

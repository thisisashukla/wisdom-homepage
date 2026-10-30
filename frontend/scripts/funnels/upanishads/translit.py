"""Devanagari to IAST for the Upanishads funnel (stdlib only)."""
import re

VOWELS = {'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ',
          'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au'}
MATRAS = {'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ',
          'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'}
CONS = {'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ', 'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
        'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
        'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'ळ': 'ḻ', 'व': 'v',
        'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h'}
VIRAMA = '्'
OTHER = {'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': "'", 'ॐ': 'oṃ', '।': '|', '॥': '||', 'ꣳ': 'ṃ'}
DIGITS = dict(zip('०१२३४५६७८९', '0123456789'))


def normalize(s: str) -> str:
    """House display form: Vedic anusvara and chandrabindu as plain anusvara, no joiners."""
    s = s.replace('ꣳ', 'ं').replace('ँ', 'ं').replace('‍', '').replace('‌', '')
    s = re.sub(r'[ \t]+', ' ', s)
    return '\n'.join(x.strip() for x in s.split('\n')).strip()


def to_iast(s: str) -> str:
    out = []
    i = 0
    n = len(s)
    while i < n:
        c = s[i]
        if c in CONS:
            out.append(CONS[c])
            nx = s[i + 1] if i + 1 < n else ''
            if nx == '़':
                i += 1
                nx = s[i + 1] if i + 1 < n else ''
            if nx == VIRAMA:
                i += 2
                continue
            if nx in MATRAS:
                out.append(MATRAS[nx])
                i += 2
                continue
            out.append('a')
            i += 1
            continue
        if c in VOWELS:
            out.append(VOWELS[c])
        elif c in OTHER:
            out.append(OTHER[c])
        elif c in DIGITS:
            out.append(DIGITS[c])
        elif c in MATRAS:
            out.append(MATRAS[c])
        else:
            out.append(c)
        i += 1
    t = ''.join(out)
    t = re.sub(r'ṃ(?=[kg])', 'ṃ', t)
    t = re.sub(r'[ \t]+', ' ', t)
    return '\n'.join(x.strip() for x in t.split('\n')).strip()


if __name__ == '__main__':
    import sys
    print(to_iast(normalize(sys.argv[1])))

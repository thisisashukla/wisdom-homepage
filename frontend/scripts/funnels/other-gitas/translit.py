"""Devanagari to IAST, enough for classical Sanskrit verse (no vedic accents)."""
import re

VOWELS = {'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au'}
SIGNS = {'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'}
CONS = {
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
    'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
    'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'ळ': 'ḷ',
    'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
}
OTHER = {'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': "'", '।': '|', '॥': '||', '्': ''}
DIGITS = dict(zip('०१२३४५६७८९', '0123456789'))


def clean(s: str) -> str:
    s = s.replace('‍', '').replace('‌', '')
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def to_iast(s: str) -> str:
    s = clean(s)
    out = []
    i = 0
    n = len(s)
    while i < n:
        ch = s[i]
        if ch in CONS:
            out.append(CONS[ch])
            nxt = s[i + 1] if i + 1 < n else ''
            if nxt == '़':
                i += 1
                nxt = s[i + 1] if i + 1 < n else ''
            if nxt == '्':
                i += 2
                continue
            if nxt in SIGNS:
                out.append(SIGNS[nxt])
                i += 2
                continue
            out.append('a')
            i += 1
            continue
        if ch in VOWELS:
            out.append(VOWELS[ch])
        elif ch in OTHER:
            out.append(OTHER[ch])
        elif ch in DIGITS:
            out.append(DIGITS[ch])
        elif ch == '़':
            pass
        else:
            out.append(ch)
        i += 1
    t = ''.join(out)
    t = re.sub(r'\s*\|\|\s*', ' || ', t)
    t = re.sub(r'\s*(?<!\|)\|(?!\|)\s*', ' | ', t)
    return t.strip()


if __name__ == '__main__':
    print(to_iast('मुक्ताभिमानी मुक्तो हि बद्धो बद्धाभिमान्यपि । किंवदन्तीह सत्येयं या मतिः सा गतिर्भवेत् ॥'))
    print(to_iast('अहं कर्तेत्यहंमानमहाकृष्णाहिदंशितः । नाहं कर्तेति'))

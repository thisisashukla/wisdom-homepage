"""Devanagari to IAST, enough for the Mahabharata lines we publish."""
V = {'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au'}
M = {'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'}
C = {'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ', 'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
     'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
     'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'ळ': 'ḷ', 'व': 'v',
     'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h'}
OTHER = {'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': "'", '।': '|', '॥': '||', '्': ''}
DIG = dict(zip('०१२३४५६७८९', '0123456789'))


def to_iast(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        ch = s[i]
        if ch in C:
            out.append(C[ch])
            nxt = s[i + 1] if i + 1 < len(s) else ''
            if nxt == '़':
                i += 1
                nxt = s[i + 1] if i + 1 < len(s) else ''
            if nxt in M:
                out.append(M[nxt])
                i += 2
                continue
            if nxt == '्':
                i += 2
                continue
            out.append('a')
            i += 1
            continue
        if ch in V:
            out.append(V[ch])
        elif ch in OTHER:
            out.append(OTHER[ch])
        elif ch in DIG:
            out.append(DIG[ch])
        elif ch == '़':
            pass
        else:
            out.append(ch)
        i += 1
    return ''.join(out)


if __name__ == '__main__':
    print(to_iast('अहन्यहनि भूतानि गच्छन्तीह यमालयम् । शेषाः स्थावरमिच्छन्ति किमाश्चर्यमतः परम् ॥'))
    print(to_iast('तर्कोऽप्रतिष्ठः श्रुतयो विभिन्ना'))

"""Devanagari to IAST for the Hanuman Chalisa data.

scholarly(): full IAST, every inherent vowel written (jaya hanumāna jñāna guna sāgara).
sung(): the same with the schwa dropped where Hindi and Awadhi singers drop it
(jay hanumān jñān gun sāgar). The rule set is the usual one: drop a word-final
inherent a, and a medial inherent a in the pattern V C a C V, scanning right to
left. Per-word overrides in build_chalisa.py fix the cases the rule gets wrong.
"""

VOWELS = {
    'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ',
    'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
}
MATRAS = {
    'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ',
    'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
}
CONS = {
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
    'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
    'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
    'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
}
NUKTA = {'ड': 'ṛ', 'ढ': 'ṛh'}  # ड़ ढ़
HALANT = '्'
ANUSVARA = 'ं'
CANDRABINDU = 'ँ'
VISARGA = 'ः'

# homorganic nasal for an anusvara before a consonant (sung form)
NASAL_FOR = {}
for c in 'कखगघ':
    NASAL_FOR[c] = 'ṅ'
for c in 'चछजझ':
    NASAL_FOR[c] = 'ñ'
for c in 'टठडढ':
    NASAL_FOR[c] = 'ṇ'
for c in 'तथदधन':
    NASAL_FOR[c] = 'n'
for c in 'पफबभम':
    NASAL_FOR[c] = 'm'


def _units(word: str):
    """Split a Devanagari word into syllable units.

    Each unit: cons = [(deva, latin), ...] (empty for an independent vowel),
    vowel = latin vowel, None for the inherent a, '' after a final halant,
    nasal = anusvara / candrabindu / visarga or '', next = first consonant of the next unit.
    """
    out = []
    i = 0
    n = len(word)
    while i < n:
        ch = word[i]
        if ch in VOWELS:
            u = {'kind': 'V', 'cons': [], 'vowel': VOWELS[ch], 'nasal': '', 'next': None}
            i += 1
        elif ch in CONS:
            cons = []
            vowel = None
            while True:
                c = word[i]
                lat = CONS[c]
                i += 1
                if i < n and word[i] == '\u093c':
                    lat = NUKTA.get(c, lat)
                    i += 1
                cons.append((c, lat))
                if i < n and word[i] == HALANT:
                    i += 1
                    if i < n and word[i] in CONS:
                        continue
                    vowel = ''
                    break
                if i < n and word[i] in MATRAS:
                    vowel = MATRAS[word[i]]
                    i += 1
                break
            u = {'kind': 'C', 'cons': cons, 'vowel': vowel, 'nasal': '', 'next': None}
        else:
            i += 1
            continue
        if i < n and word[i] in (ANUSVARA, CANDRABINDU, VISARGA):
            u['nasal'] = word[i]
            i += 1
        out.append(u)
    for k in range(len(out) - 1):
        nxt = out[k + 1]
        out[k]['next'] = nxt['cons'][0][0] if nxt['cons'] else None
    return out


def _render(units, drop: set[int], sung: bool) -> str:
    s = ''
    for k, u in enumerate(units):
        s += ''.join(lat for _, lat in u['cons'])
        if u['vowel'] is None:
            if k not in drop:
                s += 'a'
        else:
            s += u['vowel']
        nz = u['nasal']
        if nz == ANUSVARA:
            if sung and u['next'] and u['next'] in NASAL_FOR:
                s += NASAL_FOR[u['next']]
            elif sung and k == len(units) - 1:
                s += 'ṁ'
            else:
                s += 'ṃ' if not sung else 'ṁ'
        elif nz == CANDRABINDU:
            s += 'ṁ'
        elif nz == VISARGA:
            s += 'ḥ'
    return s


def word_scholarly(w: str) -> str:
    return _render(_units(w), set(), False)


def word_sung(w: str) -> str:
    units = _units(w)
    drop = set()
    n = len(units)
    if n == 0:
        return ''
    # final schwa (not after a cluster ending in a conjunct like "putra"? Awadhi drops those too
    # in song only when the cluster is easy; keep it for multi-consonant clusters)
    last = units[-1]
    if n > 1 and last['kind'] == 'C' and last['vowel'] is None and not last['nasal'] and len(last['cons']) == 1:
        drop.add(n - 1)

    def is_vowel_unit(k):
        if k < 0 or k >= n:
            return False
        return k not in drop

    # medial: unit k (C with inherent a, single consonant, not nasal) between a vowel and C+V
    for k in range(n - 2, 0, -1):
        u = units[k]
        if u['kind'] != 'C' or u['vowel'] is not None or u['nasal'] or len(u['cons']) != 1:
            continue
        prev_ok = is_vowel_unit(k - 1)
        nxt = units[k + 1]
        next_ok = nxt['kind'] == 'C' and (k + 1) not in drop
        if prev_ok and next_ok and (k - 1) not in drop and (k + 1) not in drop:
            # do not drop two adjacent
            if k + 1 in drop or k - 1 in drop:
                continue
            drop.add(k)
    return _render(units, drop, True)


def scholarly(line: str) -> str:
    return ' '.join(_line(line, word_scholarly))


def sung(line: str) -> str:
    return ' '.join(_line(line, word_sung))


def _line(line: str, fn):
    out = []
    for tok in line.split():
        if tok in ('।', '॥'):
            continue
        parts = tok.split('-')
        out.append('-'.join(fn(p) for p in parts if p))
    return out


if __name__ == '__main__':
    for t in ['जय हनुमान ज्ञान गुन सागर', 'राम दूत अतुलित बल धामा', 'अंजनि-पुत्र पवनसुत नामा',
              'कंचन बरन बिराज सुबेसा', 'काँधे मूँज जनेऊ साजै', 'संकट तें हनुमान छुड़ावै',
              'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि', 'लंकेस्वर भए सब जग जाना']:
        print(scholarly(t), ' || ', sung(t))

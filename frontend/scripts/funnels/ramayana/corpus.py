"""Corpus access for the Ramayana funnel build (read-only).

Reads sanscripts/wisdom_kb/out/verses.jsonl (rcm.* and vr.* rows only),
works out Gita Press doha numbers for Manas lines, and transliterates
Devanagari to IAST (ported from src/lib/quoteCardRender.ts toIast).
"""
import json
import os
import re
import unicodedata

KB = os.path.join(os.path.expanduser('~'), 'mnt', 'sanscripts', 'wisdom_kb', 'out')

VR_KANDA = {
    1: ('Bala', 'बालकाण्ड'), 2: ('Ayodhya', 'अयोध्याकाण्ड'), 3: ('Aranya', 'अरण्यकाण्ड'),
    4: ('Kishkindha', 'किष्किन्धाकाण्ड'), 5: ('Sundara', 'सुन्दरकाण्ड'), 6: ('Yuddha', 'युद्धकाण्ड'),
    7: ('Uttara', 'उत्तरकाण्ड'),
}
RCM_KAND = {
    1: ('Bal', 'बालकाण्ड'), 2: ('Ayodhya', 'अयोध्याकाण्ड'), 3: ('Aranya', 'अरण्यकाण्ड'),
    4: ('Kishkindha', 'किष्किन्धाकाण्ड'), 5: ('Sundar', 'सुन्दरकाण्ड'), 6: ('Lanka', 'लंकाकाण्ड'),
    7: ('Uttar', 'उत्तरकाण्ड'),
}

# Gita Press doha numbers are trusted only where the computed grouping was checked:
# Aranya and Kishkindha totals match Gita Press (46, 30); Ayodhya matches at 100/101
# (the Kevat passage); Uttar matches at 41 (par hit, RESEARCH.md). Bal, Sundar and
# Lanka drift by 1 to 4, so those lines carry the kand name only.
def gp_verified(kand: int, group: int) -> bool:
    if kand in (3, 4):
        return True
    if kand == 2:
        return group <= 101
    if kand == 7:
        return group <= 41
    return False


def load():
    rows = {}
    with open(os.path.join(KB, 'verses.jsonl'), encoding='utf-8') as f:
        for line in f:
            if not (line.startswith('{"id": "rcm.') or line.startswith('{"id": "vr.')):
                continue
            d = json.loads(line)
            rows[d['id']] = d
    return rows


def gita_press_groups(rows):
    """Corpus Manas ids -> (group, closer_index, closers_in_group).

    Gita Press numbers a group at each doha or sortha that closes a run of
    chaupais/chhands; consecutive closers share the number as (क), (ख).
    The corpus folds some groups together, so its own doha number drifts.
    """
    rc = sorted((d for k, d in rows.items() if k.startswith('rcm.')), key=lambda d: d['order'])
    out, kand, g, prev, sub = {}, None, 0, None, 0
    closers = {}
    for d in rc:
        p = d['id'].split('.')
        k, form = int(p[1]), p[3]
        if k != kand:
            kand, g, prev = k, 0, None
        if form in ('chaupai', 'chhand') and prev in (None, 'shloka', 'doha', 'sortha'):
            g += 1
            sub = 0
        if form in ('doha', 'sortha'):
            sub = sub + 1 if prev in ('doha', 'sortha') else 0
            closers[(k, g)] = closers.get((k, g), 0) + 1
        out[d['id']] = (k, g, sub, form)
        prev = form
    return {i: (k, g, sub, form, closers.get((k, g), 0)) for i, (k, g, sub, form) in out.items()}


KHA = ['क', 'ख', 'ग', 'घ', 'ङ', 'च']


def ref_for(cid, groups):
    """Visible reference in one format per text."""
    p = cid.split('.')
    if p[0] == 'vr':
        k, s = int(p[1]), int(p[2])
        en_k, hi_k = VR_KANDA[k]
        return {
            'en': f'Valmiki Ramayana, {en_k} Kanda, sarga {s}',
            'hi': f'वाल्मीकि रामायण, {hi_k}, सर्ग {s}',
            'short': {'en': f'Valmiki {k}.{s}', 'hi': f'वाल्मीकि {k}.{s}'},
            'verified': True,
        }
    k, g, sub, form, n_closers = groups[cid]
    en_k, hi_k = RCM_KAND[k]
    if gp_verified(k, g):
        suffix = ''
        if form in ('doha', 'sortha') and n_closers > 1:
            suffix = f' ({KHA[sub]})'
        return {
            'en': f'Ramcharitmanas, {en_k} Kand, doha {g}{suffix}',
            'hi': f'रामचरितमानस, {hi_k}, दोहा {g}{suffix}',
            'short': {'en': f'Manas, {en_k} {g}', 'hi': f'मानस, {hi_k} {g}'},
            'verified': True,
        }
    return {
        'en': f'Ramcharitmanas, {en_k} Kand',
        'hi': f'रामचरितमानस, {hi_k}',
        'short': {'en': f'Manas, {en_k} Kand', 'hi': f'मानस, {hi_k}'},
        'verified': False,
        'gpGuess': g,
    }


# ── IAST (port of toIast in src/lib/quoteCardRender.ts) ──
CONS = {
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ', 'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
    'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'ळ': 'ḷ', 'व': 'v',
    'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
}
VOWELS = {
    'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ',
    'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऍ': 'e', 'ऑ': 'o',
}
MATRAS = {
    'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
    'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ॅ': 'e', 'ॉ': 'o',
}
MISC = {'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': '’', 'ॐ': 'oṃ'}
VIRAMA, NUKTA = '्', '़'


def to_iast(text: str) -> str:
    """Devanagari to IAST. Dandas become ' | ' and ' || ' so pada breaks survive."""
    cs = list(unicodedata.normalize('NFC', text))
    out, i = '', 0
    while i < len(cs):
        c = cs[i]
        if c in CONS:
            out += CONS[c]
            j = i + 1
            if j < len(cs) and cs[j] == NUKTA:
                j += 1
            nxt = cs[j] if j < len(cs) else ''
            if nxt in MATRAS:
                out += MATRAS[nxt]
                i = j + 1
            elif nxt == VIRAMA:
                i = j + 1
            else:
                out += 'a'
                i = j
            continue
        if c in VOWELS:
            out += VOWELS[c]
        elif c in MISC:
            out += MISC[c]
        elif c == '॥':
            out += ' || '
        elif c == '।':
            out += ' | '
        elif '०' <= c <= '९':
            pass
        elif c not in (NUKTA, VIRAMA):
            out += c
        i += 1
    out = re.sub(r'\s+', ' ', out).strip()
    return re.sub(r'\s*\|\|?\s*$', '', out).strip()

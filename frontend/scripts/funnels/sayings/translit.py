"""Devanagari to IAST-style roman. mode='sa' keeps every inherent a (Sanskrit);
mode='hi' drops the word-final inherent a (Hindi/Braj/Awadhi reading), and reads ड़ ढ़ as ṛ ṛh."""
import re, unicodedata
CONS = {'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ',
        'त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','ळ':'ḷ','व':'v',
        'श':'ś','ष':'ṣ','स':'s','ह':'h'}
NUK = {'क':'q','ख':'x','ग':'ġ','ज':'z','फ':'f','ड':'ṛ','ढ':'ṛh'}
VOW = {'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ए':'e','ऐ':'ai','ओ':'o','औ':'au','ऍ':'e','ऑ':'o'}
MAT = {'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','े':'e','ै':'ai','ो':'o','ौ':'au','ॅ':'e','ॉ':'o'}
VIR = '्'; NUKTA = '़'
def word(w, mode):
    cs = list(unicodedata.normalize('NFC', w)); out = []; i = 0
    while i < len(cs):
        c = cs[i]
        if c in CONS:
            j = i + 1; base = CONS[c]
            if j < len(cs) and cs[j] == NUKTA: base = NUK.get(c, base); j += 1
            nx = cs[j] if j < len(cs) else ''
            if nx in MAT: out.append(base + MAT[nx]); i = j + 1
            elif nx == VIR: out.append(base); i = j + 1
            else:
                last = j >= len(cs) or not ('ऀ' <= cs[j] <= 'ॿ') or cs[j] in 'ंँः'
                end = j >= len(cs) or not ('ऀ' <= cs[j] <= 'ॿ')
                out.append(base + ('' if (mode == 'hi' and end and len(out) > 0) else 'a')); i = j
            continue
        if c == 'ड़': out.append('ṛa'); i += 1; continue
        if c in VOW: out.append(VOW[c])
        elif c == 'ं': out.append('ṃ' if mode == 'sa' else 'ṁ')
        elif c == 'ँ': out.append('ṁ' if mode == 'hi' else 'm̐')
        elif c == 'ः': out.append('ḥ')
        elif c == 'ऽ': out.append("'")
        elif '०' <= c <= '९': pass
        elif c in (NUKTA, VIR): pass
        else: out.append(c)
        i += 1
    return ''.join(out)
def roman(text, mode='hi'):
    text = re.sub(r'[।॥]', ' | ', text)
    parts = re.split(r'(\s+|[,|.?;:"\'\-])', text)
    s = ''.join(word(p, mode) if re.search('[ऀ-ॿ]', p) else p for p in parts)
    s = re.sub(r'\s*\|\s*(\|\s*)*', ' | ', s).strip(' |')
    return re.sub(r'\s+', ' ', s).replace(' ,', ',').strip()
if __name__ == '__main__':
    print(roman('गुरु गोविंद दोऊ खड़े काके लागू पाँय।'))
    print(roman('पोथी पढ़-पढ़ जग मुआ, पंडित भया न कोय'))
    print(roman('विद्या ददाति विनयं', 'sa'))

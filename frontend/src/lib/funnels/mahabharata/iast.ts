/** Devanagari to IAST for Gita lines shown on Mahabharata pages (keeps line breaks and dandas). */
const V: Record<string, string> = { अ: 'a', आ: 'ā', इ: 'i', ई: 'ī', उ: 'u', ऊ: 'ū', ऋ: 'ṛ', ॠ: 'ṝ', ए: 'e', ऐ: 'ai', ओ: 'o', औ: 'au' }
const M: Record<string, string> = { 'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au' }
const C: Record<string, string> = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'ṅ', च: 'c', छ: 'ch', ज: 'j', झ: 'jh', ञ: 'ñ', ट: 'ṭ', ठ: 'ṭh', ड: 'ḍ', ढ: 'ḍh', ण: 'ṇ',
  त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n', प: 'p', फ: 'ph', ब: 'b', भ: 'bh', म: 'm', य: 'y', र: 'r', ल: 'l', ळ: 'ḷ', व: 'v',
  श: 'ś', ष: 'ṣ', स: 's', ह: 'h',
}
const O: Record<string, string> = { 'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': "'", '।': '|', '॥': '||' }

export function toIast(s: string): string {
  const cs = Array.from(s.normalize('NFC'))
  let out = ''
  for (let i = 0; i < cs.length; ) {
    const c = cs[i]
    if (C[c]) {
      out += C[c]
      let j = i + 1
      if (cs[j] === '़') j++
      const n = cs[j]
      if (n && M[n]) {
        out += M[n]
        i = j + 1
      } else if (n === '्') {
        i = j + 1
      } else {
        out += 'a'
        i = j
      }
      continue
    }
    if (V[c]) out += V[c]
    else if (O[c] !== undefined) out += O[c]
    else if (c >= '०' && c <= '९') out += String(c.charCodeAt(0) - 0x966)
    else if (c !== '्' && c !== '़') out += c
    i++
  }
  return out
}

/**
 * Gita verses set as VerseCard props, straight from the site's own data (content/gita/verses).
 * Strips the speaker tag some files carry ("श्री भगवानुवाच"), restores the half-verse spaces the
 * corpus lost on a few long-metre verses (spacing only, letters unchanged, checked against
 * heritage.iitk.ac.in/SBG), splits at the danda and derives IAST from the Devanagari.
 * Server-only (reads the verse files).
 */
import { getVerse } from '@/lib/gita'
import { toIast } from '@/lib/funnels/mahabharata/iast'

const PADA_SPACES: Record<string, [string, string][]> = {
  // "\n" marks a quarter-verse (pada) break on long-metre verses, set as its own row.
  '11.32': [
    ['प्रवृद्धोलोकान्', 'प्रवृद्धो\nलोकान्'],
    ['सर्वेयेऽवस्थिताः', 'सर्वे\nयेऽवस्थिताः'],
  ],
  '11.33': [
    ['लभस्वजित्वा', 'लभस्व\nजित्वा'],
    ['पूर्वमेवनिमित्तमात्रं', 'पूर्वमेव\nनिमित्तमात्रं'],
  ],
  '2.20': [['पुराणोन हन्यते', 'पुराणो न हन्यते']],
}

const SPEAKER_TAG = /^[^।॥]{0,24}?(उवाच|ानुवाच)\s*/
const SPEAKER_EN = /^(The Blessed Lord|The divine|The Lord|Krishna|Arjuna|Sanjaya|Dhritarashtra) said:\s*/i

export type GitaLine = {
  ref: string
  chapter: number
  verse: number
  original: string[]
  iast: string[]
  /** Wisdom's English for the verse, speaker prefix removed. */
  meaning: string
  href: string
  speaker: string
}

export async function gitaLine(chapter: number, verse: number): Promise<GitaLine> {
  const v = await getVerse(chapter, verse)
  if (!v) throw new Error(`gitaLine: missing verse ${chapter}.${verse}`)
  const ref = `${chapter}.${verse}`
  let sa = v.sanskrit.trim().replace(SPEAKER_TAG, '').trim()
  for (const [from, to] of PADA_SPACES[ref] ?? []) sa = sa.replace(from, to)
  const [first, ...rest] = sa.split('।')
  const second = rest.join('।').replace(/॥\s*$/, '').trim()
  const halves = second ? [`${first.trim()} ।`, `${second} ॥`] : [sa]
  const original = halves.flatMap((h) => h.split('\n').map((r) => r.trim()))
  return {
    ref,
    chapter,
    verse,
    original,
    iast: original.map(toIast),
    meaning: v.englishTranslation.replace(SPEAKER_EN, '').trim(),
    href: `/gita/chapter/${chapter}/verse/${verse}`,
    speaker: v.speaker,
  }
}

/** Several verses at once, keyed by "c.v". */
export async function gitaLines(refs: string[]): Promise<Record<string, GitaLine>> {
  const out: Record<string, GitaLine> = {}
  for (const r of refs) {
    const [c, v] = r.split('.').map(Number)
    out[r] = await gitaLine(c, v)
  }
  return out
}

/** VerseCard props for a line (Sanskrit, IAST, meaning, source link to the verse page). */
export const verseProps = (l: GitaLine, meaning?: string) => ({
  original: l.original,
  iast: l.iast,
  meaning: meaning ?? l.meaning,
  source: `Bhagavad Gita ${l.ref}`,
  sourceHref: l.href,
})

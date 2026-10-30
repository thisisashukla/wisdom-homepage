/**
 * Mahabharata funnel: the Sanskrit lines we publish (built by
 * scripts/funnels/mahabharata/build_lines.py into src/content/funnels/mahabharata/lines.json).
 * Server and client safe: plain data, no fs.
 */
import data from '@/content/funnels/mahabharata/lines.json'

export type Locale = 'en' | 'hi'
export type L10n = { en: string; hi: string }

export type MbhLine = {
  id: string
  ref: string
  refHi: string
  book: number
  adhyaya: number
  parva: L10n
  deva: string
  iast: string
  speaker: L10n
  en: string
  hi: string | null
  context: string | null
  note: string | null
  noShare: boolean
  cardId: string | null
  emended: boolean
  corpus: string | null
  reviewed: boolean
}

const LINES = data.lines as MbhLine[]
const BY_ID = new Map(LINES.map((l) => [l.id, l]))

export const EDITION_NOTE = data.meta.edition
export const allLines = (): MbhLine[] => LINES

export function line(id: string): MbhLine {
  const l = BY_ID.get(id)
  if (!l) throw new Error(`[mahabharata] unknown line ${id}`)
  return l
}

export const lines = (ids: string[]): MbhLine[] => ids.map(line)

/** DOM id for a line card: "mbh-5-146-23". */
export const domIdOf = (id: string): string => 'mbh-' + id.slice(4).replace(/[.]/g, '-')

/** Short visible ref in the page language. */
export const refOf = (l: MbhLine, locale: Locale): string => (locale === 'hi' ? l.refHi : l.ref)

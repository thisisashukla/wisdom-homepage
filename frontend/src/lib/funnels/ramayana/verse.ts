/** Ramayana funnel: how a stored line is cut into rows for VerseCard. Client-safe. */

import type { LineView } from './types'

/** Devanagari padas: break after each danda. */
export const padasDeva = (sa: string) => (sa.match(/[^।॥]+[।॥]*/gu) ?? [sa]).map((p) => p.trim()).filter(Boolean)
/** IAST padas: break after each | or ||. */
export const padasIast = (iast: string) => (iast.match(/[^|]+\|*/g) ?? [iast]).map((p) => p.trim()).filter(Boolean)

/** The original of a line, both scripts, in its own face (Sanskrit or Awadhi). */
export const lineOriginal = (l: Pick<LineView, 'sa' | 'iast' | 'lang'>) => ({
  original: padasDeva(l.sa),
  ...(l.iast ? { iast: padasIast(l.iast) } : {}),
  lang: l.lang,
})

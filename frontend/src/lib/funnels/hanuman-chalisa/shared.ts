/**
 * Hanuman Chalisa funnel: types, constants and pure helpers. Client-safe
 * (no JSON import, no Node APIs). Server code reads the text through
 * '@/lib/funnels/hanuman-chalisa'.
 */

export const HUB_PATH = '/hanuman-chalisa'
export const HUB_PATH_HI = '/hi/hanuman-chalisa'
export const LEARN_PATH = '/hanuman-chalisa/learn'
export const COUNTER_PATH = '/hanuman-chalisa/108'
export const HOW_MANY_PATH = '/hanuman-chalisa/how-many-times'
export const JAYANTI_PATH = '/hanuman-jayanti-2027'
export const PDF_PATH = '/hanuman-chalisa/pdf'
/** Line 18 and the sun-distance question. */
export const SUN_LINE_ID = 'hc.c18'

/** Printable PDFs (public/downloads), built by scripts/pdf/build-chalisa-pdf.mjs. US Letter, fits A4. */
export type PdfKey = 'english' | 'devanagari' | 'kids' | 'telugu' | 'gujarati' | 'kannada'
export const PDF_FILES: Record<PdfKey, string> = {
  english: '/downloads/hanuman-chalisa-english-with-meaning.pdf',
  devanagari: '/downloads/hanuman-chalisa-hindi-devanagari-with-meaning.pdf',
  kids: '/downloads/hanuman-chalisa-kids-11-day-learning-sheet.pdf',
  telugu: '/downloads/hanuman-chalisa-telugu-with-english-meaning.pdf',
  gujarati: '/downloads/hanuman-chalisa-gujarati-with-english-meaning.pdf',
  kannada: '/downloads/hanuman-chalisa-kannada-with-english-meaning.pdf',
}

/** What each PDF is, for the /pdf page and the download buttons. Page counts from the last build. */
export type PdfInfo = { key: PdfKey; title: string; body: string; pages: number; lang?: string }
export const PDF_INFO: Record<PdfKey, PdfInfo> = {
  english: { key: 'english', title: 'English letters, with meaning', body: 'All 43 lines as they are sung, each with its meaning, and a note on saying the letters.', pages: 7 },
  devanagari: { key: 'devanagari', title: 'Devanagari, with Hindi and English meaning', body: 'For the reader at home who reads Hindi, with the English beside it for everyone else.', pages: 10 },
  kids: { key: 'kids', title: 'For kids: four lines a day for 11 days', body: 'Large English letters, a short meaning and a box to tick when everyone can say the day\'s lines.', pages: 11 },
  telugu: { key: 'telugu', title: 'Telugu letters, with English meaning', body: 'The same Awadhi words in తెలుగు script.', pages: 8, lang: 'te' },
  gujarati: { key: 'gujarati', title: 'Gujarati letters, with English meaning', body: 'The same Awadhi words in ગુજરાતી script.', pages: 8, lang: 'gu' },
  kannada: { key: 'kannada', title: 'Kannada letters, with English meaning', body: 'The same Awadhi words in ಕನ್ನಡ script.', pages: 8, lang: 'kn' },
}

/**
 * The Chalisa in other scripts: the same Awadhi words in Telugu, Gujarati or Kannada letters
 * (scripts.json, from scripts/funnels/hanuman-chalisa/build_scripts.py), with English meaning.
 * `indexed` stays false until a native reader has checked every line; until then the page is
 * noindex and out of the sitemap, but still linked from the hub.
 */
export type ScriptKey = 'telugu' | 'gujarati' | 'kannada'
export type ScriptInfo = { key: ScriptKey; code: 'te' | 'gu' | 'kn'; name: string; native: string; path: string; pdf: PdfKey; indexed: boolean }
export const SCRIPT_PAGES: Record<ScriptKey, ScriptInfo> = {
  telugu: { key: 'telugu', code: 'te', name: 'Telugu', native: 'తెలుగు', path: '/hanuman-chalisa/telugu', pdf: 'telugu', indexed: false },
  gujarati: { key: 'gujarati', code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', path: '/hanuman-chalisa/gujarati', pdf: 'gujarati', indexed: false },
  kannada: { key: 'kannada', code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', path: '/hanuman-chalisa/kannada', pdf: 'kannada', indexed: false },
}
export const SCRIPT_LIST: ScriptInfo[] = Object.values(SCRIPT_PAGES)

/** /start situation for the desktop next step: the closest to "courage before a hard day". */
export const START_SITUATION = 'didnt_work_out'

export type HcWord = { w: string; iast: string; gloss: string }
export type HcRef = { id: string; label: string; text: string }

export type HcUnit = {
  id: string
  pos: number
  kind: 'doha' | 'chaupai'
  n: number
  label: { en: string; hi: string }
  slug: string
  awadhi: [string, string]
  iast: [string, string]
  iastScholarly: [string, string]
  words: HcWord[]
  meaning: { en: string; hi: string }
  quick: string
  ramayana: { en: string; refs: HcRef[] } | null
  variants: string[]
  audio: string | null
  learnDay: number
  cardId: string | null
  reviewed: boolean
}

/** What the mala needs per bead. */
export type BeadInfo = { id: string; pos: number; label: string; href: string; day: number }

export const linePath = (slug: string) => `${HUB_PATH}/${slug}`

/** DOM id of a line on the hub (anchor target for the mala). */
export const anchorId = (id: string) => id.replace('.', '-')

/** item_type for analytics: 'doha' or 'chaupai', from a unit id (hc.d1, hc.c7). */
export const kindOf = (id: string): 'doha' | 'chaupai' => (id.startsWith('hc.d') ? 'doha' : 'chaupai')

/** Keep the danda with its last word (display only; the data is unchanged). */
export const nb = (t: string) => t.replace(/ ([।॥|]+)/g, '\u00a0$1')

/** VerseCard props for a unit: the two Awadhi halves and their IAST, set in Tiro Hindi. */
export const unitVerse = (u: { awadhi: [string, string]; iast: [string, string] }) => ({
  original: u.awadhi.map(nb),
  iast: u.iast.map(nb),
  lang: 'awa' as const,
})

/** localStorage helpers that never throw. */
export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return { ...fallback, ...(JSON.parse(raw) as T) }
  } catch {
    return fallback
  }
}

export function writeStore(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage blocked or full: progress lives for this visit only
  }
}

export const LEARN_KEY = 'wq_hc_learn_v1'
export const COUNTER_KEY = 'wq_hc_counter_v1'

export type LearnState = { learned: Record<string, number>; day: number; completedDays: number[] }
export const LEARN_EMPTY: LearnState = { learned: {}, day: 1, completedDays: [] }

export type CounterGoal = 7 | 11 | 21 | 108 | 'vow40'
export type CounterState = {
  goal: CounterGoal | null
  count: number
  /** 40-day vow: local dates (YYYY-MM-DD) with at least one recitation */
  days: string[]
  startedAt: string | null
  reached: boolean
}
export const COUNTER_EMPTY: CounterState = { goal: null, count: 0, days: [], startedAt: null, reached: false }

export const goalTarget = (g: CounterGoal) => (g === 'vow40' ? 40 : g)

export const LEARN_DAYS = 11

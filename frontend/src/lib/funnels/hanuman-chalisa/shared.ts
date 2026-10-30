/**
 * Hanuman Chalisa funnel: types, constants and pure helpers. Client-safe
 * (no JSON import, no Node APIs). Server code reads the text through
 * '@/lib/funnels/hanuman-chalisa'.
 */

export type HcLocale = 'en' | 'hi'

export const FUNNEL = 'hanuman-chalisa'
export const SITE = 'https://wisdomquotes.in'
export const HUB_PATH = '/hanuman-chalisa'
export const HUB_PATH_HI = '/hi/hanuman-chalisa'
export const LEARN_PATH = '/hanuman-chalisa/learn'
export const COUNTER_PATH = '/hanuman-chalisa/108'
export const HOW_MANY_PATH = '/hanuman-chalisa/how-many-times'
export const JAYANTI_PATH = '/hanuman-jayanti-2027'

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
export const abs = (p: string) => (p.startsWith('http') ? p : `${SITE}${p}`)

/** DOM id of a line on the hub (anchor target for the mala). */
export const anchorId = (id: string) => id.replace('.', '-')

/** Every funnel event carries these. */
export const baseProps = (page: string, locale: HcLocale) => ({ funnel: FUNNEL, page, locale })

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
export const SCRIPT_KEY = 'wq_hc_script'

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

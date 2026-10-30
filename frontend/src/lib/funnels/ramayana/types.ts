/** Ramayana funnel: shared types. Client-safe (no fs). */

export type Locale = 'en' | 'hi'
export type L10n = { en: string; hi: string }

export type LineText = 'vr' | 'rcm' | 'bg'

/** One original line as stored in src/content/funnels/ramayana/lines.json (or a Gita house quote). */
export type Line = {
  key: string
  text: LineText
  lang: 'sa' | 'awa'
  corpusId?: string
  chapter?: number
  verse?: number
  sa: string
  iast: string
  ref: L10n
  refShort: L10n
  refVerified: boolean
  speaker: L10n
  meaning: L10n
  href?: string
  note?: string
  gpGuess?: number
  fixes?: { from: string; to: string }[]
  reviewed: boolean
}

export type LampId = 'film' | 'valmiki' | 'tulsidas'
export type LampState = 'lit' | 'partial' | 'dark' | 'unknown'

export type Lamp = {
  state: LampState
  lines?: string[]
  note: L10n
  source?: { label: string; url: string }
}

export type Scene = {
  slug: string
  order: number
  kand: 'bal' | 'ayodhya' | 'aranya'
  title: L10n
  question: L10n
  verdict: L10n
  quick: L10n
  lamps: Record<LampId, Lamp>
  arc: { en: string[]; hi: string[] }
  asks: L10n
  gita?: { chapter: number; verse: number; note: L10n }
  meta: { title: string; description: string }
  reviewed: boolean
}

/** One line, in one language, as a client component receives it. */
export type LineView = {
  key: string
  text: LineText
  id: string
  lang: 'sa' | 'awa'
  sa: string
  iast: string
  meaning: string
  speaker: string
  ref: string
  href?: string
}

export type LampView = {
  id: LampId
  state: LampState
  label: string
  stateLabel: string
  note: string
  source?: { label: string; url: string }
  lines: LineView[]
}

export type PlanDay = {
  day: number
  title: string
  why: string
  todo: string
  bridge?: string
  verse: Line
  reviewed: boolean
}

export type DiwaliSection = { id: string; heading: L10n; body: L10n; lines: string[] }
export type Diwali = {
  quick: L10n
  sections: DiwaliSection[]
  asks: L10n
  gita: { chapter: number; verse: number; note: L10n }
  reviewed: boolean
}

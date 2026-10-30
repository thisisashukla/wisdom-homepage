/**
 * Quote pages: types and pure helpers. Client-safe (no fs, no Node APIs).
 * Server code imports these through '@/lib/quotes'; client components import
 * this file directly so the fs loaders never reach the browser bundle.
 * Contract: lp/quotes-build/SPEC.md
 */

export type Locale = 'en' | 'hi'
export type L10n = { en: string; hi: string }
export type MomentId =
  | 'karma'
  | 'trust'
  | 'hard-times'
  | 'peace'
  | 'positive-life'
  | 'devotion'
  | 'self'
  | 'wisdom'
  | 'character'
  | 'one-line'
  | 'bio'
  | 'students'

export const MOMENT_IDS: MomentId[] = [
  'karma',
  'trust',
  'hard-times',
  'peace',
  'positive-life',
  'devotion',
  'self',
  'wisdom',
  'character',
  'one-line',
  'bio',
  'students',
]

export type Quote = {
  id: string
  source: 'gita' | 'chanakya-niti' | 'subhashita' | 'upanishad' | 'hitopadesha' | 'other'
  sourceName: L10n
  chapter?: number
  verse?: number
  speaker?: L10n
  sanskritFull: string
  sanskritLine: string
  iast: string
  meaning: L10n
  context: L10n
  forYou?: { exam: L10n; work: L10n; loss: L10n }
  moments: MomentId[]
  rank: number
  bioSafe?: boolean
  /** Card image version (short content hash), set by the server loader. */
  cardV?: string
}

export type FakeQuote = { id: string; line: L10n; origin: L10n; realQuoteId: string; note: L10n }

export type HookFeeling = {
  id: string
  label: L10n
  quoteId: string
  lines: { en: [string, string]; hi: [string, string] }
  startSituation?: string
}

export type QuoteSection = { moment: MomentId; heading: string; intro?: string; quoteIds: string[] }

export type QuotePageConfig = {
  key: string
  path: string
  locale: Locale
  alternatePath?: string
  pageName: string
  title: string
  description: string
  h1: string
  promise: string
  breadcrumb: { label: string; href?: string }[]
  chips: { moment: MomentId; label: string; href?: string }[]
  sections: QuoteSection[]
  hook: { question: string; feelingIds: string[]; preset?: string }
  showFakes: boolean
  fakesHeading?: string
  dailyLine: { heading: string; sub: string }
  faq: { q: string; a: string }[]
  related: { href: string; label: string }[]
  extraSections?: { heading: string; paragraphs: string[] }[]
  updated: string
}

export type CardFormat = 'post' | 'status' | 'square'
export type CardTheme = 'paper' | 'night'

export const SITE_URL = 'https://wisdomquotes.in'

export const absUrl = (path: string): string => (path.startsWith('http') ? path : `${SITE_URL}${path}`)

/**
 * Card image route in its canonical query order: format, lang, theme, v, download.
 * The route 308-redirects any other form, so always build URLs here.
 */
export function cardImageUrl(
  id: string,
  opts: { format?: CardFormat; lang?: Locale; theme?: CardTheme; v?: string; download?: boolean } = {},
): string {
  let qs = `format=${opts.format ?? 'post'}&lang=${opts.lang ?? 'en'}&theme=${opts.theme ?? 'paper'}`
  if (opts.v && /^[a-z0-9]{1,16}$/.test(opts.v)) qs += `&v=${opts.v}`
  if (opts.download) qs += '&download=1'
  return `/api/quote-card/${encodeURIComponent(id)}?${qs}`
}

export const CARD_SIZE: Record<CardFormat, { width: number; height: number }> = {
  post: { width: 1080, height: 1350 },
  status: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
}

/** Gita verse page for the quote, or null when the source has no verse page. */
export function verseHref(quote: Quote, locale: Locale = 'en'): string | null {
  if (quote.source !== 'gita' || !quote.chapter || !quote.verse) return null
  const p = `/gita/chapter/${quote.chapter}/verse/${quote.verse}`
  return locale === 'hi' ? `/hi${p}` : p
}

/** "Krishna to Arjuna · Bhagavad Gita 2.47" (speaker part only when known). */
export function sourceLine(quote: Quote, locale: Locale): string {
  const sp = quote.speaker?.[locale]
  return sp ? `${sp} · ${quote.sourceName[locale]}` : quote.sourceName[locale]
}

/** Name of the work without the verse number: "Bhagavad Gita 2.47" -> "Bhagavad Gita". */
export function workName(quote: Quote, locale: Locale = 'en'): string {
  return quote.sourceName[locale].replace(/[\s\d.:,\-]+$/u, '').trim() || quote.sourceName[locale]
}

/** Who speaks the line, for schema.org: "Krishna to Arjuna" -> "Krishna". */
export function speakerName(quote: Quote): string | null {
  const sp = quote.speaker?.en
  if (sp) return sp.split(/\s+to\s+|,/i)[0].trim() || null
  if (quote.source === 'gita') return 'Krishna'
  if (quote.source === 'chanakya-niti') return 'Chanakya'
  return null
}

/** The URL a copied/shared quote points back to, with utm tags. */
export function quoteShareUrl(
  quote: Quote,
  locale: Locale,
  opts: { path?: string; utmSource?: string } = {},
): string {
  const vh = verseHref(quote, locale)
  const base = vh ?? opts.path ?? (locale === 'hi' ? '/hi/gita' : '/gita')
  const q = new URLSearchParams({ utm_source: opts.utmSource ?? 'copy', utm_medium: 'quote' })
  const hash = vh ? '' : `#${quote.id}`
  return `${SITE_URL}${base}?${q.toString()}${hash}`
}

/**
 * Text for Copy and WhatsApp: the Sanskrit line, the meaning in the page
 * language, the source, and a link back (utm_source=copy&utm_medium=quote).
 * `path` is used as the link for non-Gita lines (the page they were found on).
 */
export function copyText(
  quote: Quote,
  locale: Locale,
  opts: { path?: string; utmSource?: string } = {},
): string {
  return [
    quote.sanskritLine,
    '',
    `"${quote.meaning[locale]}"`,
    sourceLine(quote, locale),
    quoteShareUrl(quote, locale, opts),
  ].join('\n')
}

/** Filename for a saved card image. */
export function cardFileName(quote: Quote, format: CardFormat): string {
  const slug = quote.sourceName.en
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const prefix = quote.source === 'gita' ? 'krishna-quote-' : 'shlok-'
  return `${prefix}${slug || quote.id}-${format}.png`
}

/** Splits a Devanagari line after each danda so each pada sits on its own line. */
export function splitPadas(line: string): string[] {
  return line
    .split(/(?<=[।॥])\s+/u)
    .map((s) => s.trim())
    .filter(Boolean)
}

// ── Slim per-locale view for client components ──────────────────────────────

/**
 * What a QuoteCard needs, in one language only. Build it on the server with
 * toView() so client props carry no {en, hi} pairs and no full verse.
 */
export type QuoteView = {
  kind: 'view'
  id: string
  sa: string
  iast: string
  meaning: string
  /** "Krishna to Arjuna · Bhagavad Gita 2.47" in the page language */
  sourceLine: string
  /** Verse page in the page language, null for non-Gita lines */
  href: string | null
  /** Path the copied link points to when there is no verse page (then with #id). */
  sharePath?: string
  /** File name stem for saved images */
  file: string
  /** Card image version */
  v: string
  bioSafe?: boolean
}

export const isQuoteView = (q: Quote | QuoteView): q is QuoteView => (q as QuoteView).kind === 'view'

export function toView(quote: Quote, locale: Locale, opts: { path?: string } = {}): QuoteView {
  const href = verseHref(quote, locale)
  const fallback = opts.path ?? (locale === 'hi' ? '/hi/gita' : '/gita')
  return {
    kind: 'view',
    id: quote.id,
    sa: quote.sanskritLine,
    iast: quote.iast ?? '',
    meaning: quote.meaning[locale],
    sourceLine: sourceLine(quote, locale),
    href,
    ...(href ? {} : { sharePath: fallback }),
    file: cardFileName(quote, 'post').replace(/-post\.png$/, ''),
    v: quote.cardV ?? '',
    ...(quote.bioSafe ? { bioSafe: true } : {}),
  }
}

export const viewShareUrl = (v: QuoteView, utmSource = 'copy'): string => {
  const path = v.href ?? v.sharePath ?? '/gita'
  const hash = v.href ? '' : `#${v.id}`
  return `${SITE_URL}${path}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=quote${hash}`
}

/** Same text as copyText(), from a view. */
export const viewCopyText = (v: QuoteView, utmSource = 'copy'): string =>
  [v.sa, '', `"${v.meaning}"`, v.sourceLine, viewShareUrl(v, utmSource)].join('\n')

/** Lowercase a to z, 0 to 9 and hyphens, at most `max` characters. */
export const slugify = (s: string, max = 40): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max)
    .replace(/-+$/g, '')

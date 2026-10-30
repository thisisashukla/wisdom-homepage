/**
 * Quote pages content layer (server only). Data is imported statically, so a
 * missing or malformed file fails the build.
 * Types and pure helpers live in ./quotes-shared and are re-exported here, so
 * server code can import everything from '@/lib/quotes'. Client components
 * must import from '@/lib/quotes-shared' instead.
 *
 * Every loader tolerates a missing or broken data file and returns [] / null,
 * so the build never depends on content that is still landing.
 */

import { createHash } from 'crypto'
import versesJson from '@/content/quotes/verses.json'
import sayingsJson from '@/content/quotes/sayings.json'
import fakesJson from '@/content/quotes/fakes.json'
import hookJson from '@/content/quotes/hook.json'
import { getVerseAudio } from '@/lib/gita'
import { QUOTE_PAGES } from '@/content/quotes/pages'
import type { FakeQuote, HookFeeling, MomentId, Quote, QuotePageConfig } from './quotes-shared'

export * from './quotes-shared'

// Static imports: a missing data file fails the build instead of vanishing at runtime.
const asArray = <T,>(x: unknown, name: string): T[] => {
  if (!Array.isArray(x)) throw new Error(`src/content/quotes/${name} must be a JSON array`)
  return x as T[]
}

/** Short hash of everything the card image draws, so its URL changes when the text does. */
function cardVersion(q: Quote): string {
  const drawn = [q.id, q.sanskritLine, q.iast, q.meaning?.en, q.meaning?.hi, q.sourceName?.en, q.sourceName?.hi, q.speaker?.en, q.speaker?.hi]
  return createHash('sha1').update(JSON.stringify(drawn)).digest('hex').slice(0, 10)
}

let _quotes: Quote[] | null = null
let _byId: Map<string, Quote> | null = null

function allQuotes(): Quote[] {
  if (_quotes) return _quotes
  const list = [...asArray<Quote>(versesJson, 'verses.json'), ...asArray<Quote>(sayingsJson, 'sayings.json')]
    .filter((q) => q && typeof q.id === 'string' && typeof q.sanskritLine === 'string')
    .map((q) => ({ ...q, cardV: cardVersion(q) }))
  _quotes = list
  _byId = new Map(list.map((q) => [q.id, q]))
  return list
}

function byId(): Map<string, Quote> {
  if (!_byId) allQuotes()
  return _byId!
}

/** Every quote (Gita verses first, then sayings). */
export const getAllQuotes = (): Quote[] => allQuotes()

export const getQuote = (id: string): Quote | null => byId().get(id) ?? null

/** Quotes for the given ids, in the same order; unknown ids are skipped. */
export const getQuotes = (ids: string[]): Quote[] =>
  ids.map((id) => byId().get(id)).filter((q): q is Quote => Boolean(q))

/** Quotes for a moment, most searched first. */
export const quotesByMoment = (moment: MomentId): Quote[] =>
  allQuotes()
    .filter((q) => Array.isArray(q.moments) && q.moments.includes(moment))
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))

export const getFakes = (): FakeQuote[] => asArray<FakeQuote>(fakesJson, 'fakes.json')

/** Hook feelings, in the order of `ids` when given (unknown ids skipped). */
export function getHookFeelings(ids?: string[]): HookFeeling[] {
  const all = asArray<HookFeeling>(hookJson, 'hook.json')
  if (!ids) return all
  const m = new Map(all.map((f) => [f.id, f]))
  return ids.map((id) => m.get(id)).filter((f): f is HookFeeling => Boolean(f))
}

const pages = (): QuotePageConfig[] => (Array.isArray(QUOTE_PAGES) ? QUOTE_PAGES : [])

export const getAllPages = (): QuotePageConfig[] => pages()

export const getPage = (key: string): QuotePageConfig | null => pages().find((p) => p.key === key) ?? null

export const getPageByPath = (p: string): QuotePageConfig | null => {
  const norm = p.replace(/\/+$/, '') || '/'
  return pages().find((c) => c.path === norm) ?? null
}

/** The quote card for a Gita verse page, when that verse is in verses.json. */
export const getGitaQuote = (chapter: number, verse: number): Quote | null => getQuote(`bg-${chapter}-${verse}`)

/**
 * "Another line" for a hero card: the next Gita quote (by rank, wrapping
 * around) that shares the quote's first moment, else any shared moment.
 */
export function anotherQuote(quote: Quote): Quote | null {
  const gita = allQuotes()
    .filter((q) => q.source === 'gita' && q.id !== quote.id && q.chapter && q.verse)
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
  for (const m of quote.moments ?? []) {
    const pool = gita.filter((q) => q.moments?.includes(m))
    if (!pool.length) continue
    return pool.find((q) => (q.rank ?? 999) > (quote.rank ?? 999)) ?? pool[0]
  }
  return gita[0] ?? null
}

const AUDIO_BASE = 'https://pheysuesndqmmsogtdbt.supabase.co/storage/v1/object/public/wisdom-homepage/audio/bhagavad_gita/'

/** Recitation URL for a Gita quote (same files as the verse pages), else null. */
export function audioFor(quote: Quote): string | null {
  if (quote.source !== 'gita' || !quote.chapter || !quote.verse) return null
  try {
    const a = getVerseAudio(quote.chapter, quote.verse)
    if (!a?.audio) return null
    return a.audio.startsWith('http') ? a.audio : `${AUDIO_BASE}${a.audio.replace(/^gita\//, '')}`
  } catch {
    return null
  }
}

/** Map of quote id -> audio URL (or null) for passing to client components. */
export function audioMap(quotes: Quote[]): Record<string, string | null> {
  const out: Record<string, string | null> = {}
  for (const q of quotes) out[q.id] = audioFor(q)
  return out
}

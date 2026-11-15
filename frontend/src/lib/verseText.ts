/**
 * Text helpers shared by the English and Hindi Gita verse pages (server-safe, no React).
 *
 *   verseRoman(sanskrit)  the shloka in Roman script, half-line by half-line:
 *                         IAST for the page (karmaṇyevādhikāraste mā phaleṣu kadācana)
 *                         and the plain typing form people search with
 *                         (karmanyevadhikaraste ma phaleshu kadachana).
 *   wordIast(word)        one Sanskrit word in IAST, for the word-by-word grid.
 *   fitDescription(...)   a meta description built from whole sentences, never cut mid-word
 *                         and never ending in an ellipsis.
 *
 * Transliteration is deterministic (lib/search/translit, mode 'sa'), so it needs no data file
 * and matches what verse search already understands.
 */

import { splitSpeaker } from '@/lib/devanagari'
import { transliterate } from '@/lib/search/translit'

export type RomanLine = { iast: string; plain: string }

export type VerseRoman = {
  /** "dhṛtarāṣṭra uvāca", when the shloka opens with a speaker line. */
  speaker: RomanLine | null
  /** The shloka split at its dandas, one entry per half-verse. */
  lines: RomanLine[]
  /** First half-line in the plain form, for titles and descriptions. */
  plainFirst: string
  /** The whole shloka in the plain form, one line. */
  plainAll: string
}

const roman = (deva: string): RomanLine => {
  const { iast, plain } = transliterate(deva.trim(), 'sa')
  return { iast: iast.replace(/\|+/g, '').trim(), plain }
}

export function verseRoman(sanskrit: string): VerseRoman {
  const { speaker, text } = splitSpeaker(sanskrit || '')
  const lines = text
    .split(/[।॥|]+/)
    .map((s) => s.replace(/[०-९\d.]+\s*$/, '').trim())
    .filter(Boolean)
    .map(roman)
  return {
    speaker: speaker ? roman(speaker) : null,
    lines,
    plainFirst: lines[0]?.plain ?? '',
    plainAll: lines.map((l) => l.plain).join(' '),
  }
}

export const wordIast = (word: string): string => roman(word).iast

/** Capitalise the first letter (for a plain line that opens a sentence). */
export const capFirst = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

const SENTENCE_END = /(?<=[.!?।॥])\s+/

/** Leading whole sentences of `text` that fit in `max` characters ('' when even the first won't fit). */
function wholeSentences(text: string, max: number): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim()
  if (!clean) return ''
  if (clean.length <= max) return clean
  let out = ''
  for (const s of clean.split(SENTENCE_END)) {
    const next = out ? `${out} ${s}` : s
    if (next.length > max) break
    out = next
  }
  return out
}

/** The first sentence of `text`, cut at its last clause break (, ; :) that fits, closed with a full stop. */
function clauseCut(text: string, max: number): string {
  const first = (text || '').replace(/\s+/g, ' ').trim().split(SENTENCE_END)[0] ?? ''
  const room = first.slice(0, max - 1)
  const at = Math.max(room.lastIndexOf(', '), room.lastIndexOf('; '), room.lastIndexOf(': '))
  if (at < max * 0.45) return ''
  return `${room.slice(0, at)}.`
}

/**
 * The best-fitting description lead from `candidates` (in order of preference) within `max`:
 * whole sentences first, then a clean clause cut, then the shortest candidate's first clause.
 * Never returns text that stops mid-word or ends with "…".
 */
export function fitDescription(candidates: (string | undefined | null)[], max: number): string {
  const list = candidates.filter((c): c is string => !!c && !!c.trim())
  for (const c of list) {
    const whole = wholeSentences(c, max)
    if (whole) return whole
  }
  for (const c of list) {
    const cut = clauseCut(c, max)
    if (cut) return cut
  }
  // Last resort: whole words of the first candidate, closed with a full stop.
  const words = (list[0] || '').replace(/\s+/g, ' ').trim().split(' ')
  let out = ''
  for (const w of words) {
    const next = out ? `${out} ${w}` : w
    if (next.length > max - 1) break
    out = next
  }
  return out ? `${out.replace(/[,;:\s]+$/, '')}.` : ''
}

/** `lead` plus as many of `extras` (in order) as still fit within `max`. */
export function withExtras(lead: string, extras: string[], max: number): string {
  let out = lead
  for (const e of extras) {
    if (`${out} ${e}`.length <= max) out = `${out} ${e}`
  }
  return out
}

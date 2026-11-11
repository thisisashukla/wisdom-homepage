/**
 * Pure Devanagari helpers for Gita text. No Node or React imports, so both the server
 * content layer (lib/gita.ts re-exports these), client components (SanskritText,
 * via VerseAudioPlayer) and build scripts (scripts/build-verse-search.mjs) can use them.
 */

/**
 * The corpus stores some conjuncts with the vowel sign i typed before the second
 * consonant ("कश्िचत्" for "कश्चित्", "तत्ित्रविधं" for "तत्त्रिविधं"). The vowel sign
 * belongs after the whole consonant cluster, so move it there.
 */
const BROKEN_I = /्ि((?:[क-ह]्)*[क-ह])/g

export const normaliseDevanagari = (s: string): string =>
  s && s.includes('्ि') ? s.replace(BROKEN_I, '्$1ि') : s

/**
 * The speaker line that opens some shlokas. Only the four real speaker labels match, so
 * a verse that merely starts with a verb of speech (2.10 "तमुवाच हृषीकेशः") is left alone.
 */
const SPEAKER = /^((?:धृतराष्ट्र|सञ्जय|संजय|अर्जुन)\s*उवाच|श्री\s*भगवानुवाच)\s*/

/**
 * Split a speaker label off the start of a shloka. The corpus glues it to the first word
 * ("धृतराष्ट्र उवाचधर्मक्षेत्रे"), so this works with or without a space after "उवाच".
 */
export const splitSpeaker = (sanskrit: string): { speaker: string | null; text: string } => {
  const s = (sanskrit || '').replace(/\s+/g, ' ').trim()
  const m = s.match(SPEAKER)
  if (!m || m[0].length >= s.length) return { speaker: null, text: s }
  return { speaker: m[1].replace(/\s+/g, ' '), text: s.slice(m[0].length) }
}

/** Devanagari digits (०-९) to ASCII digits. */
export const asciiDigits = (s: string): string =>
  s.replace(/[०-९]/g, (d) => String('०१२३४५६७८९'.indexOf(d)))

/** First line of a shloka (up to the first danda), without the speaker label, spaces collapsed. */
export const firstLine = (sanskrit: string): string =>
  splitSpeaker(sanskrit).text.split(/[।॥|]/)[0]?.trim() ?? ''

/**
 * `text` cut to at most `max` characters at a word boundary, with "…" added when cut
 * (the "…" counts toward `max`). A first word longer than `max` is cut inside the word,
 * never after a virama or before a vowel sign, so the result still renders cleanly.
 */
export const fitPada = (text: string, max: number): string => {
  const s = (text || '').replace(/\s+/g, ' ').trim()
  if (!s || max <= 1) return ''
  if (s.length <= max) return s
  const room = s.slice(0, max - 1)
  const space = room.lastIndexOf(' ')
  if (space > 0) return `${room.slice(0, space).replace(/[,;:]$/, '')}…`
  // No word boundary: step back past combining marks and a trailing virama.
  let end = room.length
  while (end > 1 && /[\u0900-\u0903\u093A-\u094F\u0951-\u0957\u0962\u0963]/.test(room[end])) end--
  while (end > 1 && room[end - 1] === '\u094D') end--
  return `${room.slice(0, end)}…`
}

/** A shloka as rows: the speaker line (if any), then one row per pada, split at the dandas. */
export const sanskritPadas = (sanskrit: string): string[] => {
  const { speaker, text } = splitSpeaker(sanskrit)
  const rows = text
    .split(/(?<=[।॥])\s+(?=[^\s।॥०-९\d])/)
    .map((x) => x.trim())
    .filter(Boolean)
  return speaker ? [speaker, ...rows] : rows
}

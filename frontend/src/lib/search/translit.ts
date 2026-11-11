/**
 * Devanagari to Roman, in two forms:
 *   iast  : scholarly IAST (कर्मण्येवाधिकारस्ते -> karmaṇyevādhikāraste)
 *   plain : how people type it, no diacritics (-> karmanyevadhikaraste)
 *
 * Plus searchKey / skeleton, the normalised forms that verse search compares, so that
 * "karmanye vadhikaraste", "karmanyevaadhikaraste" and "कर्मण्ये" all meet in the same place.
 *
 * Only import is lib/devanagari.ts (itself import-free); scripts/build-verse-search.mjs
 * transpiles both on the fly.
 *
 * mode 'sa' (Sanskrit): every inherent a is written (dharmakshetre, idam).
 * mode 'hi' (Hindi / Awadhi / Braj): the word-final a is dropped as people say it
 * (nagar, sab, kaj), and anusvara is written n (hain, sumiraun).
 */

import { asciiDigits } from '@/lib/devanagari'

export type TranslitMode = 'sa' | 'hi'

type Pair = [iast: string, plain: string]

const VOWELS: Record<string, Pair> = {
  'अ': ['a', 'a'], 'आ': ['ā', 'a'], 'इ': ['i', 'i'], 'ई': ['ī', 'i'], 'उ': ['u', 'u'], 'ऊ': ['ū', 'u'],
  'ऋ': ['ṛ', 'ri'], 'ॠ': ['ṝ', 'ri'], 'ऌ': ['ḷ', 'li'], 'ॡ': ['ḹ', 'li'],
  'ए': ['e', 'e'], 'ऐ': ['ai', 'ai'], 'ओ': ['o', 'o'], 'औ': ['au', 'au'], 'ऑ': ['o', 'o'], 'ऍ': ['e', 'e'],
}

const MATRAS: Record<string, Pair> = {
  'ा': ['ā', 'a'], 'ि': ['i', 'i'], 'ी': ['ī', 'i'], 'ु': ['u', 'u'], 'ू': ['ū', 'u'],
  'ृ': ['ṛ', 'ri'], 'ॄ': ['ṝ', 'ri'], 'ॢ': ['ḷ', 'li'], 'ॣ': ['ḹ', 'li'],
  'े': ['e', 'e'], 'ै': ['ai', 'ai'], 'ो': ['o', 'o'], 'ौ': ['au', 'au'], 'ॉ': ['o', 'o'], 'ॅ': ['e', 'e'],
}

const CONSONANTS: Record<string, Pair> = {
  'क': ['k', 'k'], 'ख': ['kh', 'kh'], 'ग': ['g', 'g'], 'घ': ['gh', 'gh'], 'ङ': ['ṅ', 'n'],
  'च': ['c', 'ch'], 'छ': ['ch', 'chh'], 'ज': ['j', 'j'], 'झ': ['jh', 'jh'], 'ञ': ['ñ', 'n'],
  'ट': ['ṭ', 't'], 'ठ': ['ṭh', 'th'], 'ड': ['ḍ', 'd'], 'ढ': ['ḍh', 'dh'], 'ण': ['ṇ', 'n'],
  'त': ['t', 't'], 'थ': ['th', 'th'], 'द': ['d', 'd'], 'ध': ['dh', 'dh'], 'न': ['n', 'n'],
  'प': ['p', 'p'], 'फ': ['ph', 'ph'], 'ब': ['b', 'b'], 'भ': ['bh', 'bh'], 'म': ['m', 'm'],
  'य': ['y', 'y'], 'र': ['r', 'r'], 'ल': ['l', 'l'], 'ळ': ['ḷ', 'l'], 'व': ['v', 'v'],
  'श': ['ś', 'sh'], 'ष': ['ṣ', 'sh'], 'स': ['s', 's'], 'ह': ['h', 'h'],
}

/** Nukta letters, precomposed (U+0958..U+095F) or base + U+093C. */
const NUKTA: Record<string, Pair> = {
  'क': ['q', 'k'], 'ख': ['k͟h', 'kh'], 'ग': ['ġ', 'g'], 'ज': ['z', 'z'],
  'ड': ['ṛ', 'd'], 'ढ': ['ṛh', 'dh'], 'फ': ['f', 'f'], 'य': ['ẏ', 'y'],
}
const PRECOMPOSED: Record<string, string> = {
  'क़': 'क', 'ख़': 'ख', 'ग़': 'ग', 'ज़': 'ज', 'ड़': 'ड', 'ढ़': 'ढ', 'फ़': 'फ', 'य़': 'य',
}

const VIRAMA = '्'
const NUKTA_SIGN = '़'
const ANUSVARA = 'ं'
const CHANDRABINDU = 'ँ'
const VISARGA = 'ः'
const LABIALS = new Set(['प', 'फ', 'ब', 'भ', 'म'])
const DEVA_DIGITS = '०१२३४५६७८९'

const isDevaLetter = (ch: string | undefined): boolean =>
  !!ch && (ch in CONSONANTS || ch in VOWELS || ch in MATRAS || ch in PRECOMPOSED ||
    ch === VIRAMA || ch === NUKTA_SIGN || ch === ANUSVARA || ch === CHANDRABINDU || ch === VISARGA)

/** True when the string holds any Devanagari letter. */
export const hasDevanagari = (s: string): boolean => /[ऀ-ॿ]/.test(s)

/** Devanagari digits to ASCII digits (lib/devanagari). */
export { asciiDigits }

/** Next char that is not a nukta sign, and the base consonant it belongs to. */
function nextBase(chars: string[], i: number): string | undefined {
  const c = chars[i]
  if (c === undefined) return undefined
  return PRECOMPOSED[c] ?? c
}

export function transliterate(input: string, mode: TranslitMode = 'sa'): { iast: string; plain: string } {
  const chars = Array.from(input.normalize('NFC'))
  let iast = ''
  let plain = ''
  let pending = false // a consonant waiting for its vowel
  let wordVowels = 0 // vowels written so far in this word
  let conjunct = false // the pending consonant closes a cluster (स्य, र्म)

  const closePending = (wordEnd: boolean) => {
    if (pending) {
      pending = false
      // Hindi drops the last a of a word (nagar, sab), but not in one-syllable words (na)
      // or after a cluster (satya).
      if (!(mode === 'hi' && wordEnd && wordVowels > 0 && !conjunct)) {
        iast += 'a'
        plain += 'a'
        wordVowels++
      }
    }
    if (wordEnd) wordVowels = 0
  }

  for (let i = 0; i < chars.length; i++) {
    let ch = chars[i]
    const precomposed = PRECOMPOSED[ch]
    let nukta = false
    if (precomposed) {
      ch = precomposed
      nukta = true
    } else if (chars[i + 1] === NUKTA_SIGN && ch in CONSONANTS) {
      nukta = true
    }

    if (ch in CONSONANTS) {
      const afterVirama = chars[i - 1] === VIRAMA
      closePending(false)
      conjunct = afterVirama
      // ज्ञ: jñ in IAST, gy as people type it (gyan)
      if (ch === 'ज' && !nukta && chars[i + 1] === VIRAMA && chars[i + 2] === 'ञ') {
        iast += 'jñ'
        plain += 'gy'
        i += 2
        pending = true
        conjunct = true
        continue
      }
      const pair = nukta && NUKTA[ch] ? NUKTA[ch] : CONSONANTS[ch]
      iast += pair[0]
      plain += pair[1]
      pending = true
      if (nukta && chars[i + 1] === NUKTA_SIGN) i++
      continue
    }
    if (ch in MATRAS) {
      pending = false
      wordVowels++
      iast += MATRAS[ch][0]
      plain += MATRAS[ch][1]
      continue
    }
    if (ch === VIRAMA) {
      pending = false
      continue
    }
    if (ch === NUKTA_SIGN) continue
    if (ch === ANUSVARA || ch === CHANDRABINDU) {
      closePending(false)
      const next = nextBase(chars, i + 1)
      const wordEnd = !isDevaLetter(next)
      iast += ch === ANUSVARA ? 'ṃ' : 'ṁ'
      if (next && LABIALS.has(next)) plain += 'm'
      else if (wordEnd && mode === 'sa') plain += 'm'
      else plain += 'n'
      continue
    }
    if (ch === VISARGA) {
      closePending(false)
      iast += 'ḥ'
      plain += 'h'
      continue
    }
    if (ch in VOWELS) {
      closePending(false)
      wordVowels++
      iast += VOWELS[ch][0]
      plain += VOWELS[ch][1]
      continue
    }
    if (ch === 'ॐ') {
      closePending(true)
      iast += 'oṃ'
      plain += 'om'
      continue
    }
    if (ch === 'ऽ') {
      closePending(false)
      iast += '’'
      continue
    }
    // anything else ends a word
    const wordEnd = !isDevaLetter(ch)
    closePending(wordEnd)
    if (ch === '।') {
      iast += '|'
      plain += ' '
    } else if (ch === '॥') {
      iast += '||'
      plain += ' '
    } else if (DEVA_DIGITS.includes(ch)) {
      const d = String(DEVA_DIGITS.indexOf(ch))
      iast += d
      plain += d
    } else if (ch === '‌' || ch === '‍') {
      // zero-width joiners carry nothing
    } else {
      iast += ch
      plain += ch
    }
  }
  closePending(true)

  return {
    iast: iast.replace(/[ \t]+/g, ' ').trim(),
    plain: plain
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  }
}

export const toIast = (s: string, mode: TranslitMode = 'sa'): string => transliterate(s, mode).iast
export const toPlain = (s: string, mode: TranslitMode = 'sa'): string => transliterate(s, mode).plain

// ── Search normalisation ─────────────────────────────────────────────────────

/** IAST and other diacritics to the plain typing form. */
const IAST_PLAIN: Array<[RegExp, string]> = [
  [/[ṛṝ]/g, 'ri'],
  [/[ḷḹ]/g, 'li'],
  [/[śṣ]/g, 'sh'],
  [/[ṅñṇ]/g, 'n'],
  [/[ṃṁ]/g, 'm'],
  [/ḥ/g, 'h'],
  [/ā/g, 'a'], [/ī/g, 'i'], [/ū/g, 'u'],
  [/ṭ/g, 't'], [/ḍ/g, 'd'],
]

/**
 * The comparable form of any Roman text (typed query, IAST, or plain):
 * lower case, no diacritics, common spelling variants folded together.
 * Keeps vowels and word breaks. Devanagari is transliterated first.
 */
export function searchKey(input: string, mode: TranslitMode = 'sa'): string {
  let s = hasDevanagari(input) ? transliterate(input, mode).plain : input.toLowerCase()
  for (const [re, to] of IAST_PLAIN) s = s.replace(re, to)
  s = s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/w/g, 'v')
    .replace(/z/g, 'j')
    .replace(/q/g, 'k')
    .replace(/f/g, 'ph')
    .replace(/x/g, 'ksh')
    .replace(/chh/g, 'ch')
    .replace(/sh/g, 's')
    .replace(/jn/g, 'gy')
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/([a-z])\1+/g, '$1')
    .replace(/([aeiou])h\b/g, '$1') // visarga people leave off: namah = nama
    .replace(/ai\b/g, 'ay') // jai = jay = jaya
    .replace(/\s+/g, ' ')
    .trim()
  return s
}

/**
 * The loose form: searchKey without the vowel a and without the h of aspirates, spaces
 * removed. Schwa, long a and word breaks are where typed Sanskrit varies most
 * (karmanye vadhikaraste / karmanyevaadhikaraste, nagar / nagara, dharma kshetre /
 * dharmakshetre), so they are dropped here.
 */
export function skeleton(key: string): string {
  return key
    .replace(/a/g, '')
    .replace(/\s+/g, '')
    .replace(/([^aeiou0-9])h/g, '$1')
    .replace(/([a-z])\1+/g, '$1')
}

/** Folds Devanagari variants that do not change a word (nukta, chandrabindu, dandas, ZWJ). */
export function devaKey(input: string): string {
  return input
    .normalize('NFC')
    .replace(/[क़-य़]/g, (c) => PRECOMPOSED[c] ?? c)
    .replace(/़/g, '')
    .replace(/ँ/g, 'ं')
    .replace(/[।॥|,.!?'"‘’“”;:\-–—()‌‍०-९0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

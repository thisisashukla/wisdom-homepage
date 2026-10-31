import { Tiro_Devanagari_Hindi, Tiro_Devanagari_Sanskrit } from 'next/font/google'

/**
 * Scripture faces, set once on <html> in the root layout. preload: false, so a
 * page downloads a face only when something on it is set in that face.
 *   --font-tiro-sa  Sanskrit (Gita, Upanishads, Valmiki, Mahabharata, Chanakya) and its IAST
 *   --font-tiro-hi  Awadhi, Braj and Hindi verse (Tulsidas, Hanuman Chalisa, Kabir)
 * Use the CSS tokens --font-sa and --font-awadhi from styles/tokens.css, not these variables directly.
 */
export const tiroSanskrit = Tiro_Devanagari_Sanskrit({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-tiro-sa',
  preload: false,
})

export const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-tiro-hi',
  preload: false,
})

export const scriptureFontVars = `${tiroSanskrit.variable} ${tiroHindi.variable}`

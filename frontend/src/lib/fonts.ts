import { Noto_Serif_Gujarati, Noto_Serif_Kannada, Noto_Serif_Telugu, Tiro_Devanagari_Hindi, Tiro_Devanagari_Sanskrit } from 'next/font/google'

/**
 * Scripture faces, set once on <html> in the root layout. preload: false, so a
 * page downloads a face only when something on it is set in that face.
 *   --font-tiro-sa  Sanskrit (Gita, Upanishads, Valmiki, Mahabharata, Chanakya) and its IAST
 *   --font-tiro-hi  Awadhi, Braj and Hindi verse (Tulsidas, Hanuman Chalisa, Kabir)
 *   --font-noto-te / -gu / -kn  Awadhi verse written in Telugu, Gujarati or Kannada letters (Chalisa script pages)
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

// next/font needs literal options (no spreads), so each face is written out.
export const notoTelugu = Noto_Serif_Telugu({ subsets: ['telugu'], weight: '400', display: 'swap', preload: false, adjustFontFallback: false, variable: '--font-noto-te' })
export const notoGujarati = Noto_Serif_Gujarati({ subsets: ['gujarati'], weight: '400', display: 'swap', preload: false, adjustFontFallback: false, variable: '--font-noto-gu' })
export const notoKannada = Noto_Serif_Kannada({ subsets: ['kannada'], weight: '400', display: 'swap', preload: false, adjustFontFallback: false, variable: '--font-noto-kn' })

export const scriptureFontVars = `${tiroSanskrit.variable} ${tiroHindi.variable} ${notoTelugu.variable} ${notoGujarati.variable} ${notoKannada.variable}`

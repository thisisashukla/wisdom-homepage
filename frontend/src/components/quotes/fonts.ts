import { Tiro_Devanagari_Sanskrit } from 'next/font/google'

/**
 * Tiro Devanagari Sanskrit for the Sanskrit line and its IAST (the app's card
 * face, also used on /start). Set as --q-tiro on each card root.
 */
export const tiro = Tiro_Devanagari_Sanskrit({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--q-tiro',
  // No preload: routes that import QuoteCard but render no card (most verse
  // pages) must not fetch it. The browser loads it only when a card uses it.
  preload: false,
})

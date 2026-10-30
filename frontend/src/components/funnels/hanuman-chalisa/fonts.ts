import { Tiro_Devanagari_Hindi } from 'next/font/google'

/**
 * Tiro Devanagari Hindi for the Awadhi lines and their IAST. Set as --hc-tiro
 * on the funnel root (the route layouts).
 */
export const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--hc-tiro',
})

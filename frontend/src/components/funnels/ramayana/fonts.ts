import { Cormorant_Garamond, Tiro_Devanagari_Hindi } from 'next/font/google'

/** Display face for the Ramayana funnel (the one extra face the brief allows). */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--fx-cormorant',
})

/** Awadhi lines of the Ramcharitmanas. Sanskrit lines use Tiro Devanagari Sanskrit (quotes/fonts.ts). */
export const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  display: 'swap',
  variable: '--fx-tiro-hi',
  preload: false,
})

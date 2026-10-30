import { Tiro_Devanagari_Hindi } from 'next/font/google'

/** Awadhi lines of the Ramcharitmanas. Sanskrit lines use Tiro Devanagari Sanskrit (quotes/fonts.ts). Display and UI faces come from the house (Playfair, Inter). */
export const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  display: 'swap',
  variable: '--fx-tiro-hi',
  preload: false,
})

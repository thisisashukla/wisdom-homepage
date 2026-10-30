import { Archivo, Tiro_Devanagari_Hindi, Tiro_Devanagari_Sanskrit } from 'next/font/google'

/** Archivo (variable width) for the Vivekananda hub's display type only: set condensed and bold. */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--fx-archivo',
  preload: false,
})

/** Tiro Devanagari Hindi for Kabir's dohe (Hindi, Braj, Awadhi). */
export const tiroHi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--fx-tiro-hi',
  preload: false,
})

/** Tiro Devanagari Sanskrit for Chanakya's Sanskrit and the Gita lines Swamiji quoted. */
export const tiroSa = Tiro_Devanagari_Sanskrit({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--fx-tiro-sa',
  preload: false,
})

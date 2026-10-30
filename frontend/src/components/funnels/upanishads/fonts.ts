import { Spectral } from 'next/font/google'

/** Spectral: the one extra display face the Upanishads funnel may use (headings, English verse). */
export const spectral = Spectral({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--fx-spectral',
})

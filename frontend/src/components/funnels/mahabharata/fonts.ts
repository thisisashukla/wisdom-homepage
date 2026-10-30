import { Cormorant_Garamond } from 'next/font/google'

/** The one extra display face this funnel may use: headings only. */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--mb-display',
})

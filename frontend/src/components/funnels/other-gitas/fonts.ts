import { EB_Garamond } from 'next/font/google'

/** EB Garamond: the one extra display face this funnel may use, for English verse only. */
export const garamond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--fx-garamond',
})

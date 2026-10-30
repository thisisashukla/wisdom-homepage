import { Tiro_Devanagari_Hindi, Yatra_One } from 'next/font/google'

/**
 * Tiro Devanagari Hindi for the grid and every chaupai line (close to a Gita Press page).
 * Yatra One for the big moments (the ask, the verdict seal): brush lettering from Indian
 * shop signs and pilgrimage posters. Both are scoped to the ram-shalaka routes.
 */
export const rsTiro = Tiro_Devanagari_Hindi({
  subsets: ['devanagari'],
  weight: '400',
  display: 'swap',
  variable: '--rs-tiro',
  preload: true,
})

export const rsYatra = Yatra_One({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  display: 'swap',
  variable: '--rs-yatra',
  preload: true,
})

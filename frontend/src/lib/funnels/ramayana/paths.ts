/** Ramayana funnel routes. Client-safe. */

export const FUNNEL = 'ramayana'
export const SITE = 'https://wisdomquotes.in'

export const PATHS = {
  hub: '/ramayana',
  original: '/ramayana/in-the-original',
  scene: (slug: string) => `/ramayana/in-the-original/${slug}`,
  afterFilm: '/ramayana/after-the-film',
  diwali: '/ramayana/diwali',
  compare: '/ramayana/valmiki-vs-tulsidas',
  hiOriginal: '/hi/ramayana/in-the-original',
  hiDiwali: '/hi/ramayana/diwali',
} as const

export const gitaHref = (chapter: number, verse: number, locale: 'en' | 'hi' = 'en') =>
  `${locale === 'hi' ? '/hi' : ''}/gita/chapter/${chapter}/verse/${verse}`

/** Updated date shown on pages and in the sitemap. */
export const UPDATED = '2026-10-30'

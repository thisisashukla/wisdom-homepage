/** Metadata and JSON-LD builders specific to the Mahabharata funnel. Site URLs and page metadata come from lib/seo. */
import type { Metadata } from 'next'
import { cardImageUrl } from '@/lib/quotes-shared'
import { AUTHOR_LD, SITE, abs, pageMeta } from '@/lib/seo'
import type { Locale } from '@/lib/locale'

export const UPDATED = '2026-10-30'

export const PATHS = {
  hub: '/mahabharata',
  gita: '/mahabharata/where-is-the-gita',
  gitaHi: '/hi/mahabharata/where-is-the-gita',
  yaksha: '/mahabharata/yaksha-prashna',
  vidura: '/mahabharata/vidura-niti',
  quotes: '/mahabharata/quotes',
  character: (slug: string) => `/mahabharata/characters/${slug}`,
} as const

export const CITATION = {
  '@type': 'CreativeWork',
  name: 'Mahabharata (Sanskrit), southern-recension text, books 3, 5, 12, 13 and 14',
  description: 'Read with Nilakantha\'s commentary (Bharata Bhava Dipa). English by Wisdom; K. M. Ganguli\'s public-domain translation consulted.',
}

export const ogImage = (cardId: string) => abs(cardImageUrl(cardId, { format: 'post', lang: 'en' }))

/** Page metadata: lib/seo pageMeta with this funnel's title suffix and 4:5 share card. */
export function meta(opts: { title: string; description: string; path: string; locale?: Locale; twin?: { en: string; hi: string }; cardId?: string }): Metadata {
  const image = opts.cardId ? ogImage(opts.cardId) : `${SITE}/og-image.webp`
  const m = pageMeta({ title: `${opts.title} | Wisdom`, description: opts.description, path: opts.path, locale: opts.locale, twin: opts.twin, ogImage: image })
  return {
    ...m,
    openGraph: { ...(m.openGraph as object), title: opts.title, images: [{ url: image, width: 1080, height: 1350 }] },
    twitter: { ...(m.twitter as object), title: opts.title },
  }
}

export function articleLd(opts: { headline: string; description: string; path: string; locale?: Locale; image?: string; about?: string }) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    inLanguage: opts.locale ?? 'en',
    datePublished: UPDATED,
    dateModified: UPDATED,
    image: opts.image ?? `${SITE}/og-image.webp`,
    author: AUTHOR_LD,
    publisher: { '@type': 'Organization', name: 'Wisdom', logo: `${SITE}/assets/new-light-logo.webp` },
    mainEntityOfPage: abs(opts.path),
    citation: CITATION,
    ...(opts.about ? { about: { '@type': 'CreativeWork', name: opts.about } } : {}),
  }
}

/** One JSON-LD graph per page. BreadcrumbList comes from PageHero and FAQPage from the kit Faq. */
export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

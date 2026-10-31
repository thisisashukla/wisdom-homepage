/** Metadata and JSON-LD helpers for the sayings funnel (server). Built on lib/seo. */

import type { Metadata } from 'next'
import { AUTHOR_LD, PUBLISHER_LD, abs, pageMeta } from '@/lib/seo'
import { UPDATED, type Locale } from './shared'

export { abs }

export const cardOg = (id: string, lang: Locale = 'en'): string => abs(`/api/quote-card/${id}?format=post&lang=${lang}&theme=paper`)

type MetaIn = {
  title: string
  description: string
  path: string
  locale: Locale
  /** EN/HI twins: both paths, so each page lists both. */
  twin?: { en: string; hi: string }
  ogImage?: string
  noindex?: boolean
}

/** pageMeta (lib/seo), with this funnel's OG image size (the 4:5 share card). */
export function fxMeta({ title, description, path, locale, twin, ogImage, noindex }: MetaIn): Metadata {
  const m = pageMeta({ title, description, path, locale, twin, ogImage, index: !noindex })
  const img = abs(ogImage ?? '/og-image.webp')
  return { ...m, openGraph: { ...m.openGraph, images: [{ url: img, width: 1080, height: 1350 }] } }
}

export const ldArticle = (o: { headline: string; description: string; path: string; locale: Locale; citation: string; about: string; image?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: o.headline,
  description: o.description,
  inLanguage: o.locale === 'hi' ? 'hi-IN' : 'en-IN',
  mainEntityOfPage: abs(o.path),
  url: abs(o.path),
  datePublished: UPDATED,
  dateModified: UPDATED,
  author: AUTHOR_LD,
  publisher: PUBLISHER_LD,
  citation: o.citation,
  about: { '@type': 'Thing', name: o.about },
  ...(o.image ? { image: o.image } : {}),
})

export const ldQuotation = (o: { text: string; author: string; path: string; citation: string; locale: Locale; anchor?: string }) => ({
  '@type': 'Quotation',
  text: o.text,
  inLanguage: o.locale === 'hi' ? 'hi' : 'en',
  spokenByCharacter: { '@type': 'Person', name: o.author },
  creator: { '@type': 'Person', name: o.author },
  citation: o.citation,
  url: abs(o.path) + (o.anchor ? `#${o.anchor}` : ''),
})

export const ldItemList = (name: string, items: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
})

export const ldClaimReview = (o: { claim: string; verdict: string; rating: number; path: string; author: string; firstAppearance?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'ClaimReview',
  url: abs(o.path),
  datePublished: UPDATED,
  author: PUBLISHER_LD,
  claimReviewed: o.claim,
  itemReviewed: { '@type': 'Claim', author: { '@type': 'Person', name: o.author }, ...(o.firstAppearance ? { appearance: o.firstAppearance } : {}) },
  reviewRating: { '@type': 'Rating', ratingValue: o.rating, bestRating: 3, worstRating: 1, alternateName: o.verdict },
})

/** Metadata and JSON-LD helpers for the sayings funnel (server). */

import type { Metadata } from 'next'
import { SITE, UPDATED, type Locale } from './shared'

export const abs = (p: string): string => (p.startsWith('http') ? p : `${SITE}${p}`)

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

export function fxMeta({ title, description, path, locale, twin, ogImage, noindex }: MetaIn): Metadata {
  const url = abs(path)
  const languages = twin
    ? { en: abs(twin.en), 'en-IN': abs(twin.en), hi: abs(twin.hi), 'hi-IN': abs(twin.hi), 'x-default': abs(twin.en) }
    : undefined
  const img = ogImage ?? `${SITE}/og-image.webp`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      siteName: 'Wisdom',
      images: [{ url: img, width: 1080, height: 1350 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

const PUBLISHER = { '@type': 'Organization', name: 'Wisdom', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/assets/new-light-logo.webp` } }
const AUTHOR = { '@type': 'Person', name: 'Ankur Shukla', url: `${SITE}/about` }

export const ldBreadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

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
  author: AUTHOR,
  publisher: PUBLISHER,
  citation: o.citation,
  about: { '@type': 'Thing', name: o.about },
  ...(o.image ? { image: o.image } : {}),
})

export const ldFaq = (faq: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
  author: PUBLISHER,
  claimReviewed: o.claim,
  itemReviewed: { '@type': 'Claim', author: { '@type': 'Person', name: o.author }, ...(o.firstAppearance ? { appearance: o.firstAppearance } : {}) },
  reviewRating: { '@type': 'Rating', ratingValue: o.rating, bestRating: 3, worstRating: 1, alternateName: o.verdict },
})

export const jsonLdHtml = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })

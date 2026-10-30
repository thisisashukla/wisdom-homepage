/** Metadata and JSON-LD helpers for the Mahabharata funnel. */
import type { Metadata } from 'next'
import { cardImageUrl } from '@/lib/quotes-shared'

export const SITE = 'https://wisdomquotes.in'
export const abs = (p: string) => (p.startsWith('http') ? p : `${SITE}${p}`)
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

export function meta(opts: {
  title: string
  description: string
  path: string
  locale?: 'en' | 'hi'
  twin?: { en: string; hi: string }
  cardId?: string
}): Metadata {
  const url = abs(opts.path)
  const image = opts.cardId ? ogImage(opts.cardId) : `${SITE}/og-image.webp`
  const languages = opts.twin
    ? {
        en: abs(opts.twin.en),
        'en-IN': abs(opts.twin.en),
        hi: abs(opts.twin.hi),
        'hi-IN': abs(opts.twin.hi),
        'x-default': abs(opts.twin.en),
      }
    : undefined
  return {
    title: { absolute: `${opts.title} | Wisdom` },
    description: opts.description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: 'article',
      siteName: 'Wisdom',
      locale: opts.locale === 'hi' ? 'hi_IN' : 'en_IN',
      images: [{ url: image, width: 1080, height: 1350 }],
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: [image] },
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  }
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function articleLd(opts: { headline: string; description: string; path: string; locale?: 'en' | 'hi'; image?: string; about?: string }) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    inLanguage: opts.locale ?? 'en',
    datePublished: UPDATED,
    dateModified: UPDATED,
    image: opts.image ?? `${SITE}/og-image.webp`,
    author: { '@type': 'Person', name: 'Ankur Shukla', url: `${SITE}/about` },
    publisher: { '@type': 'Organization', name: 'Wisdom', logo: `${SITE}/assets/new-light-logo.webp` },
    mainEntityOfPage: abs(opts.path),
    citation: CITATION,
    ...(opts.about ? { about: { '@type': 'CreativeWork', name: opts.about } } : {}),
  }
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

/** Metadata and JSON-LD helpers for the other-gitas funnel. */
import type { Metadata } from 'next'
import { abs, UPDATED } from './data'

const OG_DEFAULT = 'https://wisdomquotes.in/og-image.webp'

export const cardOg = (cardId: string) => abs(`/api/quote-card/${cardId}?format=post&lang=en&theme=paper`)

export function pageMeta(opts: {
  path: string
  title: string
  description: string
  index?: boolean
  image?: string
  type?: 'article' | 'website'
}): Metadata {
  const url = abs(opts.path)
  const image = opts.image ?? OG_DEFAULT
  const index = opts.index !== false
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: {
      canonical: url,
      languages: { en: url, 'en-IN': url, 'x-default': url },
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: opts.type ?? 'article',
      siteName: 'Wisdom',
      locale: 'en_IN',
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: [image] },
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  }
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export const AG_CITATION = {
  '@type': 'CreativeWork',
  name: 'Ashtavakra Gita (Ashtavakra Samhita)',
  inLanguage: 'sa',
  description: "Sanskrit common text, 20 chapters, 298 verses. English translation: Wisdom's own; reference: Lala Baij Nath, 1907.",
}

export function articleLd(opts: { path: string; headline: string; description: string; about?: string; citation?: unknown }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    inLanguage: 'en',
    datePublished: UPDATED,
    dateModified: UPDATED,
    author: { '@type': 'Person', name: 'Ankur Shukla', url: abs('/about') },
    publisher: { '@type': 'Organization', name: 'Wisdom', url: abs('/') },
    ...(opts.about ? { about: { '@type': 'Thing', name: opts.about } } : {}),
    citation: opts.citation ?? AG_CITATION,
  }
}

export const ldScript = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })

/** Metadata and JSON-LD builders specific to the other-gitas funnel. Site URLs and page metadata come from lib/seo. */
import type { Metadata } from 'next'
import { AUTHOR_LD, abs, pageMeta as sitePageMeta } from '@/lib/seo'
import { UPDATED } from './data'

export const cardOg = (cardId: string) => abs(`/api/quote-card/${cardId}?format=post&lang=en&theme=paper`)

/** lib/seo pageMeta plus this funnel's English-only hreflang set and an explicit robots line. */
export function pageMeta(opts: { path: string; title: string; description: string; index?: boolean; image?: string; type?: 'article' | 'website' }): Metadata {
  const url = abs(opts.path)
  const index = opts.index !== false
  const m = sitePageMeta({ title: opts.title, description: opts.description, path: opts.path, ogImage: opts.image, type: opts.type, index })
  return {
    ...m,
    alternates: { canonical: url, languages: { en: url, 'en-IN': url, 'x-default': url } },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
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
    author: AUTHOR_LD,
    publisher: { '@type': 'Organization', name: 'Wisdom', url: abs('/') },
    ...(opts.about ? { about: { '@type': 'Thing', name: opts.about } } : {}),
    citation: opts.citation ?? AG_CITATION,
  }
}

/** Ramayana funnel: metadata and JSON-LD builders. */

import type { Metadata } from 'next'
import { cardImageUrl } from '@/lib/quotes-shared'
import { SITE, UPDATED } from './paths'

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE}${p}`)

type MetaInput = {
  title: string
  description: string
  path: string
  locale: 'en' | 'hi'
  /** EN and HI paths of a twin pair; omit for pages with no twin. */
  twin?: { en: string; hi: string }
  /** Share card id for the Open Graph image. */
  card?: string
  noindex?: boolean
}

export function pageMeta({ title, description, path, locale, twin, card, noindex }: MetaInput): Metadata {
  if (title.length > 60) throw new Error(`ramayana: title over 60 chars: ${title}`)
  if (description.length > 155) throw new Error(`ramayana: description over 155 chars: ${path}`)
  const languages: Record<string, string> = twin
    ? {
        en: abs(twin.en),
        'en-IN': abs(twin.en),
        hi: abs(twin.hi),
        'hi-IN': abs(twin.hi),
        'x-default': abs(twin.en),
      }
    : locale === 'en'
      ? { en: abs(path), 'en-IN': abs(path), 'x-default': abs(path) }
      : { hi: abs(path), 'hi-IN': abs(path) }
  const image = card
    ? { url: abs(cardImageUrl(card, { format: 'post', lang: locale })), width: 1080, height: 1350 }
    : { url: `${SITE}/og-image.webp`, width: 1200, height: 630 }
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: abs(path), languages },
    openGraph: {
      title,
      description,
      url: abs(path),
      type: 'article',
      siteName: 'Wisdom',
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

const VALMIKI_WORK = {
  '@type': 'Book',
  name: 'Valmiki Ramayana',
  author: { '@type': 'Person', name: 'Valmiki' },
  inLanguage: 'sa',
}
const MANAS_WORK = {
  '@type': 'Book',
  name: 'Ramcharitmanas',
  author: { '@type': 'Person', name: 'Tulsidas' },
  inLanguage: 'awa',
  bookEdition: 'Gita Press, Gorakhpur (doha numbering)',
}

export function articleLd(opts: {
  headline: string
  description: string
  path: string
  locale: 'en' | 'hi'
  citations?: string[]
  about?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    inLanguage: opts.locale,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    datePublished: UPDATED,
    dateModified: UPDATED,
    author: { '@type': 'Person', name: 'Ankur Shukla', url: `${SITE}/about` },
    publisher: { '@type': 'Organization', name: 'Wisdom', url: SITE },
    isBasedOn: [VALMIKI_WORK, MANAS_WORK],
    citation: [
      'Valmiki Ramayana (Sanskrit text; sarga numbering of the Southern recension as printed by Gita Press)',
      'Ramcharitmanas of Tulsidas (Awadhi text; doha numbering of the Gita Press edition)',
      ...(opts.citations ?? []),
    ],
    ...(opts.about ? { about: opts.about.map((name) => ({ '@type': 'Thing', name })) } : {}),
  }
}

export const faqLd = (qas: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qas.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
})

export const itemListLd = (name: string, items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.path) })),
})

export const quotationLd = (opts: { text: string; meaning: string; speaker: string; work: 'vr' | 'rcm'; ref: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Quotation',
  text: opts.text,
  description: opts.meaning,
  spokenByCharacter: { '@type': 'Person', name: opts.speaker },
  isPartOf: opts.work === 'vr' ? VALMIKI_WORK : MANAS_WORK,
  citation: opts.ref,
})

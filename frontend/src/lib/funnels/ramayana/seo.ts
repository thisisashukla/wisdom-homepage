/** Ramayana funnel: metadata and the funnel's own JSON-LD builders, on top of lib/seo. */

import type { Metadata } from 'next'
import type { Locale } from '@/lib/locale'
import { abs, AUTHOR_LD, OG_DEFAULT, pageMeta, SITE, type Twin } from '@/lib/seo'
import { cardImageUrl } from '@/lib/quotes-shared'
import { UPDATED } from './paths'

type MetaInput = {
  title: string
  description: string
  path: string
  locale: Locale
  /** EN and HI paths of a twin pair; omit for pages with no twin. */
  twin?: Twin
  /** Share card id for the Open Graph image. */
  card?: string
  noindex?: boolean
}

/**
 * lib/seo pageMeta plus what this funnel has always sent: a length check on title and description,
 * a self-referencing hreflang on pages with no twin, and the share card (with its size) as the OG image.
 */
export function ramayanaMeta({ title, description, path, locale, twin, card, noindex }: MetaInput): Metadata {
  if (title.length > 60) throw new Error(`ramayana: title over 60 chars: ${title}`)
  if (description.length > 155) throw new Error(`ramayana: description over 155 chars: ${path}`)
  const image = card
    ? { url: abs(cardImageUrl(card, { format: 'post', lang: locale })), width: 1080, height: 1350 }
    : { url: OG_DEFAULT, width: 1200, height: 630 }
  const meta = pageMeta({ title, description, path, locale, twin, ogImage: image.url, index: !noindex })
  const languages = twin
    ? undefined
    : locale === 'en'
      ? { en: abs(path), 'en-IN': abs(path), 'x-default': abs(path) }
      : { hi: abs(path), 'hi-IN': abs(path) }
  return {
    ...meta,
    alternates: { ...meta.alternates, ...(languages ? { languages } : {}) },
    openGraph: { ...meta.openGraph, images: [image] },
  }
}

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

export function articleLd(opts: { headline: string; description: string; path: string; locale: Locale; citations?: string[]; about?: string[] }) {
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
    author: AUTHOR_LD,
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

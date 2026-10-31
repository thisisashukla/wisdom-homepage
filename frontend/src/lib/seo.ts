/**
 * One place for site URLs, page metadata and JSON-LD. Every funnel and page uses
 * these instead of its own copy.
 */
import type { Metadata } from 'next'
import type { Locale } from './locale'

export const SITE = 'https://wisdomquotes.in'
export const OG_DEFAULT = `${SITE}/og-image.webp`

/** Absolute URL for a site path (absolute URLs pass through). */
export const abs = (path: string): string => (path.startsWith('http') ? path : `${SITE}${path.startsWith('/') ? '' : '/'}${path}`)

export const PUBLISHER_LD = {
  '@type': 'Organization',
  name: 'Wisdom',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}/assets/new-light-logo.webp` },
} as const

export const AUTHOR_LD = { '@type': 'Person', name: 'Ankur Shukla', url: `${SITE}/about` } as const

export type Twin = { en: string; hi: string }

export type PageMetaOptions = {
  title: string
  description: string
  path: string
  locale?: Locale
  /** EN/HI twin paths when the page has a Hindi twin (adds hreflang alternates). */
  twin?: Twin
  ogImage?: string
  /** false: noindex, follow. */
  index?: boolean
  type?: 'article' | 'website'
}

/** Next.js Metadata for a page: absolute title, canonical, hreflang, Open Graph and Twitter. */
export function pageMeta(o: PageMetaOptions): Metadata {
  const url = abs(o.path)
  const languages = o.twin
    ? { en: abs(o.twin.en), 'en-IN': abs(o.twin.en), hi: abs(o.twin.hi), 'hi-IN': abs(o.twin.hi), 'x-default': abs(o.twin.en) }
    : undefined
  const image = o.ogImage ? abs(o.ogImage) : OG_DEFAULT
  return {
    title: { absolute: o.title },
    description: o.description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      type: o.type ?? 'article',
      siteName: 'Wisdom',
      locale: o.locale === 'hi' ? 'hi_IN' : 'en_IN',
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title: o.title, description: o.description, images: [image] },
    ...(o.index === false ? { robots: { index: false, follow: true } } : {}),
  }
}

export type CrumbLdItem = { name: string; path: string }

export function breadcrumbLd(items: CrumbLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  }
}

export type FaqItem = { q: string; a: string }

export function faqLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

/** JSON for a <script type="application/ld+json">, safe against </script>. */
export const ldJson = (x: unknown): string => JSON.stringify(x).replace(/</g, '\\u003c')

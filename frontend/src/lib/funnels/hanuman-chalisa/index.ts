/**
 * Hanuman Chalisa funnel content layer (server). The text is imported
 * statically, so a missing or malformed file fails the build.
 * Data: src/content/funnels/hanuman-chalisa/chalisa.json, built by
 * scripts/funnels/hanuman-chalisa/build_chalisa.py.
 */

import chalisaJson from '@/content/funnels/hanuman-chalisa/chalisa.json'
import type { Metadata } from 'next'
import {
  abs,
  anchorId,
  HUB_PATH,
  HUB_PATH_HI,
  linePath,
  type BeadInfo,
  type HcLocale,
  type HcUnit,
} from './shared'

export * from './shared'

type ChalisaDoc = {
  title: { en: string; hi: string }
  author: string
  language: string
  edition: string
  editionShort: string
  iastNote: string
  updated: string
  units: HcUnit[]
}

const doc = chalisaJson as unknown as ChalisaDoc
if (!Array.isArray(doc.units) || doc.units.length !== 43) {
  throw new Error('hanuman-chalisa: chalisa.json must hold 43 units')
}

export const UPDATED = doc.updated
export const EDITION = doc.edition
export const EDITION_SHORT = doc.editionShort

export const getUnits = (): HcUnit[] => doc.units
export const getUnitBySlug = (slug: string): HcUnit | null => doc.units.find((u) => u.slug === slug) ?? null
export const getUnit = (id: string): HcUnit | null => doc.units.find((u) => u.id === id) ?? null

export function neighbors(u: HcUnit): { prev: HcUnit | null; next: HcUnit | null } {
  const i = doc.units.findIndex((x) => x.id === u.id)
  return { prev: i > 0 ? doc.units[i - 1] : null, next: i < doc.units.length - 1 ? doc.units[i + 1] : null }
}

/** Mala beads. mode 'anchor' links to the line on the same page, 'page' to its own page. */
export function beads(locale: HcLocale, mode: 'anchor' | 'page'): BeadInfo[] {
  return doc.units.map((u) => ({
    id: u.id,
    pos: u.pos,
    label: u.label[locale],
    href: mode === 'anchor' ? `#${anchorId(u.id)}` : linePath(u.slug),
    day: u.learnDay,
  }))
}

/** Slim unit for client components (one language, no gloss or refs). */
export type LineView = {
  id: string
  pos: number
  label: string
  awadhi: [string, string]
  iast: [string, string]
  meaning: string
  day: number
  href: string
}

export const toLineView = (u: HcUnit, locale: HcLocale): LineView => ({
  id: u.id,
  pos: u.pos,
  label: u.label[locale],
  awadhi: u.awadhi,
  iast: u.iast,
  meaning: u.meaning[locale],
  day: u.learnDay,
  href: linePath(u.slug),
})

// ── SEO helpers ────────────────────────────────────────────────────────────

const OG_DEFAULT = 'https://wisdomquotes.in/og-image.webp'

export const cardOg = (cardId: string, lang: HcLocale = 'en') =>
  abs(`/api/quote-card/${encodeURIComponent(cardId)}?format=post&lang=${lang}&theme=paper`)

export function pageMeta(opts: {
  title: string
  description: string
  path: string
  locale?: HcLocale
  /** EN/HI twin paths when the page has a Hindi twin. */
  twin?: { en: string; hi: string }
  ogImage?: string
  index?: boolean
}): Metadata {
  const url = abs(opts.path)
  const languages = opts.twin
    ? {
        en: abs(opts.twin.en),
        'en-IN': abs(opts.twin.en),
        hi: abs(opts.twin.hi),
        'hi-IN': abs(opts.twin.hi),
        'x-default': abs(opts.twin.en),
      }
    : undefined
  const image = opts.ogImage ?? OG_DEFAULT
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: 'article',
      siteName: 'Wisdom',
      locale: opts.locale === 'hi' ? 'hi_IN' : 'en_IN',
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: [image] },
    ...(opts.index === false ? { robots: { index: false, follow: true } } : {}),
  }
}

export const HUB_TWIN = { en: HUB_PATH, hi: HUB_PATH_HI }

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  }
}

/** The work itself, for `isPartOf` and `citation`. */
export const chalisaWorkLd = {
  '@type': 'CreativeWork',
  name: 'Hanuman Chalisa',
  alternateName: ['हनुमान चालीसा', 'Shri Hanuman Chalisa'],
  author: { '@type': 'Person', name: 'Goswami Tulsidas', alternateName: 'गोस्वामी तुलसीदास' },
  inLanguage: 'awa',
  about: { '@type': 'Person', name: 'Hanuman', alternateName: ['हनुमान', 'Bajrangbali', 'Pavanputra'] },
}

export const editionCitation = {
  '@type': 'CreativeWork',
  name: 'Shri Hanuman Chalisa',
  author: { '@type': 'Person', name: 'Goswami Tulsidas' },
  publisher: { '@type': 'Organization', name: 'Gita Press, Gorakhpur' },
  inLanguage: 'awa',
}

export const PUBLISHER_LD = {
  '@type': 'Organization',
  name: 'Wisdom',
  url: 'https://wisdomquotes.in',
  logo: { '@type': 'ImageObject', url: 'https://wisdomquotes.in/assets/new-light-logo.webp' },
}

export const AUTHOR_LD = {
  '@type': 'Person',
  name: 'Ankur Shukla',
  url: 'https://wisdomquotes.in/about',
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

/** JSON for a <script type="application/ld+json">, safe against </script>. */
export const ldJson = (x: unknown) => JSON.stringify(x).replace(/</g, '\\u003c')

// ── Next step copy (NextStep `copy` override) ─────────────────────────────

export const NEXT_COPY = {
  en: {
    app: { line: 'A Gita line on your Lock Screen each morning, for the days that take courage.', cta: 'Get one line each morning' },
    whatsapp: { line: 'A Chalisa line and its meaning every Tuesday and Saturday, on WhatsApp.', cta: 'Join on WhatsApp' },
    email: { line: 'A 7-day courage plan from the Gita, one verse a day, by email.', cta: 'Send my 7 days' },
  },
  hi: {
    app: { line: 'हर सुबह लॉक स्क्रीन पर गीता की एक पंक्ति, हिम्मत वाले दिनों के लिए।', cta: 'हर सुबह एक पंक्ति पाएं' },
    whatsapp: { line: 'हर मंगलवार और शनिवार चालीसा की एक पंक्ति और उसका अर्थ, WhatsApp पर।', cta: 'WhatsApp पर जुड़ें' },
    email: { line: 'हिम्मत के लिए गीता से 7 दिन का प्लान, रोज़ एक श्लोक, ईमेल पर।', cta: 'मेरे 7 दिन भेजें' },
  },
} as const

export { anchorId }

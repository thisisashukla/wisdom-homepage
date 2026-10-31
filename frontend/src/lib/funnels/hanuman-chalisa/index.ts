/**
 * Hanuman Chalisa funnel content layer (server). The text is imported
 * statically, so a missing or malformed file fails the build.
 * Data: src/content/funnels/hanuman-chalisa/chalisa.json, built by
 * scripts/funnels/hanuman-chalisa/build_chalisa.py.
 */

import chalisaJson from '@/content/funnels/hanuman-chalisa/chalisa.json'
import { abs } from '@/lib/seo'
import type { Locale } from '@/lib/locale'
import { anchorId, HUB_PATH, HUB_PATH_HI, linePath, type BeadInfo, type HcUnit } from './shared'

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
export function beads(locale: Locale, mode: 'anchor' | 'page'): BeadInfo[] {
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

export const toLineView = (u: HcUnit, locale: Locale): LineView => ({
  id: u.id,
  pos: u.pos,
  label: u.label[locale],
  awadhi: u.awadhi,
  iast: u.iast,
  meaning: u.meaning[locale],
  day: u.learnDay,
  href: linePath(u.slug),
})

// ── SEO helpers (funnel-specific schema; URLs and metadata come from lib/seo) ──

export const cardOg = (cardId: string, lang: Locale = 'en') =>
  abs(`/api/quote-card/${encodeURIComponent(cardId)}?format=post&lang=${lang}&theme=paper`)

export const HUB_TWIN = { en: HUB_PATH, hi: HUB_PATH_HI }

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


import type { MetadataRoute } from 'next'
import { LINES } from '@/content/funnels/upanishads/lines'

/** Sitemap entries for the upanishads funnel. Owned by the upanishads build; return absolute URLs on https://wisdomquotes.in. */
const SITE = 'https://wisdomquotes.in'
const lastModified = new Date('2026-10-30')

function twin(en: string, hi: string) {
  return {
    languages: {
      en: `${SITE}${en}`,
      'en-IN': `${SITE}${en}`,
      hi: `${SITE}${hi}`,
      'hi-IN': `${SITE}${hi}`,
      'x-default': `${SITE}${en}`,
    },
  }
}

export default function entries(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = []
  out.push({ url: `${SITE}/upanishads`, lastModified, changeFrequency: 'monthly', priority: 0.8, alternates: twin('/upanishads', '/hi/upanishad') })
  out.push({ url: `${SITE}/hi/upanishad`, lastModified, changeFrequency: 'monthly', priority: 0.7, alternates: twin('/upanishads', '/hi/upanishad') })
  for (const l of LINES) {
    const en = `/upanishads/${l.slug}`
    const hi = `/hi/upanishads/${l.slug}`
    out.push({ url: `${SITE}${en}`, lastModified, changeFrequency: 'monthly', priority: 0.7, ...(l.hi ? { alternates: twin(en, hi) } : {}) })
    if (l.hi) out.push({ url: `${SITE}${hi}`, lastModified, changeFrequency: 'monthly', priority: 0.6, alternates: twin(en, hi) })
  }
  for (const [p, priority] of [
    ['/upanishads/which-to-read-first', 0.7],
    ['/upanishads/isha', 0.7],
    ['/upanishads/katha', 0.7],
    ['/upanishads/mandukya', 0.7],
    ['/upanishads/mahavakyas', 0.6],
    ['/upanishads/who-am-i', 0.6],
  ] as const) {
    out.push({ url: `${SITE}${p}`, lastModified, changeFrequency: 'monthly', priority })
  }
  return out
}

import type { MetadataRoute } from 'next'
import { getLines } from '@/lib/funnels/ram-shalaka'

const BASE = 'https://wisdomquotes.in'
const LAST = new Date('2026-10-31')

const toolAlternates = {
  languages: {
    en: `${BASE}/ram-shalaka`,
    'en-IN': `${BASE}/ram-shalaka`,
    hi: `${BASE}/hi/ram-shalaka`,
    'hi-IN': `${BASE}/hi/ram-shalaka`,
    'x-default': `${BASE}/ram-shalaka`,
  },
}

/** Sitemap entries for the ram-shalaka funnel: the Hindi tool (the free mini app), its English twin and the nine line pages. */
export default function entries(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/hi/ram-shalaka`, lastModified: LAST, changeFrequency: 'weekly', priority: 0.9, alternates: toolAlternates },
    { url: `${BASE}/ram-shalaka`, lastModified: LAST, changeFrequency: 'weekly', priority: 0.8, alternates: toolAlternates },
    ...getLines().map((l) => ({
      url: `${BASE}/hi/ram-shalaka/${l.slug}`,
      lastModified: LAST,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}

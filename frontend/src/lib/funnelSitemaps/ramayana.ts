import type { MetadataRoute } from 'next'
import scenes from '@/content/funnels/ramayana/scenes.json'

/** Sitemap entries for the ramayana funnel. Owned by the ramayana build; return absolute URLs on https://wisdomquotes.in. */
const BASE = 'https://wisdomquotes.in'
const UPDATED = new Date('2026-10-30')

function twin(en: string, hi: string) {
  return {
    languages: {
      en: `${BASE}${en}`,
      'en-IN': `${BASE}${en}`,
      hi: `${BASE}${hi}`,
      'hi-IN': `${BASE}${hi}`,
      'x-default': `${BASE}${en}`,
    },
  }
}

export default function entries(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, alternates?: ReturnType<typeof twin>) => ({
    url: `${BASE}${path}`,
    lastModified: UPDATED,
    changeFrequency: 'weekly' as const,
    priority,
    ...(alternates ? { alternates } : {}),
  })
  const sceneSlugs = (scenes as { slug: string }[]).map((s) => s.slug)
  return [
    page('/ramayana', 0.8),
    page('/ramayana/in-the-original', 0.9, twin('/ramayana/in-the-original', '/hi/ramayana/in-the-original')),
    page('/hi/ramayana/in-the-original', 0.85, twin('/ramayana/in-the-original', '/hi/ramayana/in-the-original')),
    ...sceneSlugs.map((slug) => page(`/ramayana/in-the-original/${slug}`, 0.8)),
    page('/ramayana/after-the-film', 0.75),
    page('/ramayana/diwali', 0.85, twin('/ramayana/diwali', '/hi/ramayana/diwali')),
    page('/hi/ramayana/diwali', 0.85, twin('/ramayana/diwali', '/hi/ramayana/diwali')),
    page('/ramayana/valmiki-vs-tulsidas', 0.8),
  ]
}

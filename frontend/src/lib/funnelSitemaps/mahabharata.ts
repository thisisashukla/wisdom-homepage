import type { MetadataRoute } from 'next'
import { CHARACTERS } from '@/lib/funnels/mahabharata/characters'

const SITE = 'https://wisdomquotes.in'
const lastModified = new Date('2026-10-30')

/** Sitemap entries for the mahabharata funnel. Owned by the mahabharata build; return absolute URLs on https://wisdomquotes.in. */
export default function entries(): MetadataRoute.Sitemap {
  const gitaEn = `${SITE}/mahabharata/where-is-the-gita`
  const gitaHi = `${SITE}/hi/mahabharata/where-is-the-gita`
  const twin = { languages: { en: gitaEn, 'en-IN': gitaEn, hi: gitaHi, 'hi-IN': gitaHi, 'x-default': gitaEn } }
  return [
    { url: `${SITE}/mahabharata`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: gitaEn, lastModified, changeFrequency: 'monthly', priority: 0.9, alternates: twin },
    { url: gitaHi, lastModified, changeFrequency: 'monthly', priority: 0.8, alternates: twin },
    { url: `${SITE}/mahabharata/yaksha-prashna`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/mahabharata/quotes`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/mahabharata/vidura-niti`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    ...CHARACTERS.map((c) => ({
      url: `${SITE}/mahabharata/characters/${c.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}

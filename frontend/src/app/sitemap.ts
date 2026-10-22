import { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { getAllChapters, getAllTopics, getAllVerseRefs, chapterUrl, verseUrl, topicUrl } from '@/lib/gita'
import { GITA_FOR } from '@/lib/gitaFor'

const BASE = 'https://wisdomquotes.in'

// A single point-in-time date for "content that doesn't change often" — used
// for verse/chapter/topic pages so Google isn't told every page was updated
// today on every rebuild.  Bump this when the underlying corpus changes.
const CORPUS_UPDATED = new Date('2026-08-01')

// Locale-alternates helper — Google reads both `en-IN`/`hi-IN` (region-tagged)
// and `en`/`hi` (region-agnostic); emit both so India-outside users also match.
// Also emits `x-default` per Google's hreflang guidance.
function langAlts(enPath: string, hiPath: string) {
  return {
    languages: {
      'en': `${BASE}${enPath}`,
      'en-IN': `${BASE}${enPath}`,
      'hi': `${BASE}${hiPath}`,
      'hi-IN': `${BASE}${hiPath}`,
      'x-default': `${BASE}${enPath}`,
    },
  }
}

/**
 * Enumerate every /blogs/<slug>/page.tsx at build time so no new blog is
 * silently missing from the sitemap.  Falls back to an empty list at runtime
 * (this file is only invoked at build).
 */
function enumerateBlogSlugs(): string[] {
  try {
    const dir = path.join(process.cwd(), 'src/app/blogs')
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .filter((e) => {
        try {
          return fs.existsSync(path.join(dir, e.name, 'page.tsx'))
        } catch {
          return false
        }
      })
      .map((e) => e.name)
      .sort()
  } catch (err) {
    console.warn('[sitemap] blog enumeration failed:', err)
    return []
  }
}

// Curated per-slug lastmod / priority overrides — used for a handful of
// tent-pole articles where publication date matters. Slugs not in the map
// default to CORPUS_UPDATED and priority 0.75.
const BLOG_LASTMOD: Record<string, { date: string; priority?: number }> = {
  'bhagavad-gita-for-beginners': { date: '2026-04-08', priority: 0.75 },
  'bhagavad-gita-karma-meaning': { date: '2026-04-08', priority: 0.75 },
  'bhagavad-gita-anxiety-mental-peace': { date: '2026-04-08', priority: 0.75 },
  'bhagavad-gita-complete-structure-all-chapters': { date: '2026-04-08', priority: 0.75 },
  'beyond-bhagavad-gita-quotes-mental-spiritual-health': { date: '2026-04-08', priority: 0.75 },
  'krishna-three-paths-bhagavad-gita': { date: '2026-05-24', priority: 0.85 },
  'rise-and-failure-of-gitagpt': { date: '2026-06-19', priority: 0.85 },
  'bhagavad-gita-2-47-karmanye-vadhikaraste': { date: '2026-06-12', priority: 0.9 },
  'sthitaprajna-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'nishkama-karma-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-on-anxiety': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-on-death-and-the-soul': { date: '2026-06-12', priority: 0.88 },
  'dharma-meaning-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'sattva-rajas-tamas-three-gunas-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-for-students': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-vs-stoicism': { date: '2026-06-12', priority: 0.88 },
  'ahankara-meaning-bhagavad-gita': { date: '2026-07-17', priority: 0.88 },
  'maya-meaning-bhagavad-gita': { date: '2026-07-17', priority: 0.88 },
  'best-bhagavad-gita-translation': { date: '2026-07-19', priority: 0.9 },
  'atman-not-soul-bhagavad-gita': { date: '2026-08-03', priority: 0.88 },
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: CORPUS_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: langAlts('/', '/hi/gita'),
    },
    { url: `${BASE}/app`, lastModified: new Date('2026-10-19'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/gita-for`, lastModified: new Date('2026-10-19'), changeFrequency: 'monthly', priority: 0.85 },
    ...GITA_FOR.map((p) => ({ url: `${BASE}/gita-for/${p.slug}`, lastModified: new Date('2026-10-19'), changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${BASE}/blogs`, lastModified: CORPUS_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: CORPUS_UPDATED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/methodology`, lastModified: CORPUS_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/tts`, lastModified: CORPUS_UPDATED, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/search`, lastModified: CORPUS_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
    {
      url: `${BASE}/gita`,
      lastModified: CORPUS_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: langAlts('/gita', '/hi/gita'),
    },
    {
      url: `${BASE}/hi/gita`,
      lastModified: CORPUS_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: langAlts('/gita', '/hi/gita'),
    },
    {
      url: `${BASE}/gita/today`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: langAlts('/gita/today', '/hi/gita/today'),
    },
    {
      url: `${BASE}/hi/gita/today`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: langAlts('/gita/today', '/hi/gita/today'),
    },
  ]

  // All blogs — enumerated from the filesystem at build so no post is missed.
  const blogSlugs = enumerateBlogSlugs()
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const override = BLOG_LASTMOD[slug]
    return {
      url: `${BASE}/blogs/${slug}`,
      lastModified: override ? new Date(override.date) : CORPUS_UPDATED,
      changeFrequency: 'monthly',
      priority: override?.priority ?? 0.75,
    }
  })

  // Chapter reading pages (EN + HI paired)
  const chapters = getAllChapters()
  const chapterPages: MetadataRoute.Sitemap = chapters.flatMap((ch) => {
    const en = chapterUrl(ch.number, 'en')
    const hi = chapterUrl(ch.number, 'hi')
    return [
      {
        url: `${BASE}${en}`,
        lastModified: CORPUS_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: langAlts(en, hi),
      },
      {
        url: `${BASE}${hi}`,
        lastModified: CORPUS_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: langAlts(en, hi),
      },
    ]
  })

  // Verse pages (EN + HI paired). ~700 * 2 = ~1400 URLs.
  const refs = getAllVerseRefs()
  const versePages: MetadataRoute.Sitemap = refs.flatMap((r) => {
    const en = verseUrl(r.chapter, r.verse, 'en')
    const hi = verseUrl(r.chapter, r.verse, 'hi')
    return [
      {
        url: `${BASE}${en}`,
        lastModified: CORPUS_UPDATED,
        changeFrequency: 'yearly',
        priority: 0.7,
        alternates: langAlts(en, hi),
      },
      {
        url: `${BASE}${hi}`,
        lastModified: CORPUS_UPDATED,
        changeFrequency: 'yearly',
        priority: 0.7,
        alternates: langAlts(en, hi),
      },
    ]
  })

  // Topic hubs (EN + HI paired)
  const topics = getAllTopics()
  const topicPages: MetadataRoute.Sitemap = topics.flatMap((t) => {
    const en = topicUrl(t.slug, 'en')
    const hi = topicUrl(t.slug, 'hi')
    return [
      {
        url: `${BASE}${en}`,
        lastModified: CORPUS_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: langAlts(en, hi),
      },
      {
        url: `${BASE}${hi}`,
        lastModified: CORPUS_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: langAlts(en, hi),
      },
    ]
  })

  return [...staticPages, ...blogPages, ...chapterPages, ...versePages, ...topicPages]
}

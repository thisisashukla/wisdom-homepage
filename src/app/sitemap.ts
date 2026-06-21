import { MetadataRoute } from 'next'
import { getAllChapters, getAllTopics, getAllVerseRefs, chapterUrl, verseUrl, topicUrl } from '@/lib/gita'

const BASE = 'https://wisdomquotes.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/blogs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${BASE}/gita`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: { languages: { en: `${BASE}/gita`, hi: `${BASE}/hi/gita` } },
    },
    {
      url: `${BASE}/hi/gita`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: { languages: { en: `${BASE}/gita`, hi: `${BASE}/hi/gita` } },
    },
  ]

  // Existing topic guides (kept)
  const topicGuides = [
    'bhagavad-gita-for-beginners',
    'bhagavad-gita-karma-meaning',
    'bhagavad-gita-anxiety-mental-peace',
    'bhagavad-gita-complete-structure-all-chapters',
    'beyond-bhagavad-gita-quotes-mental-spiritual-health',
  ]
  const topicGuidePages: MetadataRoute.Sitemap = topicGuides.map((slug) => ({
    url: `${BASE}/blogs/${slug}`,
    lastModified: new Date('2026-04-08'),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  // Newer topic guides (use their own publication dates and higher priority)
  const newTopicGuides: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/blogs/krishna-three-paths-bhagavad-gita`,
      lastModified: new Date('2026-05-24'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/blogs/rise-and-failure-of-gitagpt`,
      lastModified: new Date('2026-06-19'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // June 2026 batch — 9 new topic/concept pages
    ...[
      'bhagavad-gita-2-47-karmanye-vadhikaraste',
      'sthitaprajna-bhagavad-gita',
      'nishkama-karma-bhagavad-gita',
      'bhagavad-gita-on-anxiety',
      'bhagavad-gita-on-death-and-the-soul',
      'dharma-meaning-bhagavad-gita',
      'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      'bhagavad-gita-for-students',
      'bhagavad-gita-vs-stoicism',
    ].map((slug) => ({
      url: `${BASE}/blogs/${slug}`,
      lastModified: new Date('2026-06-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.88,
    })),
  ]

  // Chapter-study blog pages (the long-form per-chapter essays).
  // Chapters 1-5 used to 301 to /gita/chapter/N — the redirect has been
  // removed so all 18 long-form blog URLs are canonical and listed here.
  const chapterBlogPages: MetadataRoute.Sitemap = Array.from({ length: 18 }, (_, i) => i + 1).map((n) => ({
    url: `${BASE}/blogs/bhagwat-geeta-chapter-${n}`,
    lastModified: new Date('2026-05-24'),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // Chapter pages (EN + HI)
  const chapters = getAllChapters()
  const chapterPages: MetadataRoute.Sitemap = chapters.flatMap((ch) => [
    {
      url: `${BASE}${chapterUrl(ch.number, 'en')}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE}${chapterUrl(ch.number, 'en')}`,
          hi: `${BASE}${chapterUrl(ch.number, 'hi')}`,
        },
      },
    },
    {
      url: `${BASE}${chapterUrl(ch.number, 'hi')}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE}${chapterUrl(ch.number, 'en')}`,
          hi: `${BASE}${chapterUrl(ch.number, 'hi')}`,
        },
      },
    },
  ])

  // Verse pages (EN + HI) — only for verses we have processed
  const refs = getAllVerseRefs()
  const versePages: MetadataRoute.Sitemap = refs.flatMap((r) => [
    {
      url: `${BASE}${verseUrl(r.chapter, r.verse, 'en')}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE}${verseUrl(r.chapter, r.verse, 'en')}`,
          hi: `${BASE}${verseUrl(r.chapter, r.verse, 'hi')}`,
        },
      },
    },
    {
      url: `${BASE}${verseUrl(r.chapter, r.verse, 'hi')}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE}${verseUrl(r.chapter, r.verse, 'en')}`,
          hi: `${BASE}${verseUrl(r.chapter, r.verse, 'hi')}`,
        },
      },
    },
  ])

  // Topic hubs (EN + HI)
  const topics = getAllTopics()
  const topicPages: MetadataRoute.Sitemap = topics.flatMap((t) => [
    {
      url: `${BASE}${topicUrl(t.slug, 'en')}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE}${topicUrl(t.slug, 'en')}`,
          hi: `${BASE}${topicUrl(t.slug, 'hi')}`,
        },
      },
    },
    {
      url: `${BASE}${topicUrl(t.slug, 'hi')}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE}${topicUrl(t.slug, 'en')}`,
          hi: `${BASE}${topicUrl(t.slug, 'hi')}`,
        },
      },
    },
  ])

  return [
    ...staticPages,
    ...topicGuidePages,
    ...newTopicGuides,
    ...chapterBlogPages,
    ...chapterPages,
    ...versePages,
    ...topicPages,
  ]
}

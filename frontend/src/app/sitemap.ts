import { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { getAllChapters, getAllTopics, getAllVerseRefs, chapterUrl, verseUrl, topicUrl } from '@/lib/gita'
import { GITA_FOR } from '@/lib/gitaFor'
import { THEME_SLUGS, THEME_PLANS_PUBLISHED, plansForVerse } from '@/lib/themePlans'
import { getAllPages } from '@/lib/quotes'
import { funnelSitemapEntries } from '@/lib/funnelSitemaps'
import EXPLORE_STATES from '@/content/explore/index.json'

const BASE = 'https://wisdomquotes.in'

// A single point-in-time date for "content that doesn't change often" — used
// for verse/chapter/topic pages so Google isn't told every page was updated
// today on every rebuild.  Bump this when the underlying corpus changes.
const CORPUS_UPDATED = new Date('2026-08-01')

// Real change dates for the page groups that changed after CORPUS_UPDATED. Google only trusts
// lastmod when it is accurate, and ~240 verse pages it marked "Crawled - currently not indexed"
// were last fetched in May, so these tell it which pages are worth fetching again.
// Bump the matching date whenever that group's visible content changes.
const VERSE_COPY_UPDATED = new Date('2026-10-25') // all 701 verse JSONs rewritten (meaning, insight, modern relevance)
const CHAPTERS_UPDATED = new Date('2026-11-12') // chapter gist + three famous verses on chapter pages
const TOPICS_UPDATED = new Date('2026-11-03') // definitions, new titles, Devanagari-only HI cards
const GITA_HUBS_UPDATED = new Date('2026-11-12') // /, /gita, /hi/gita: verse jump, resume card, chapter gists
const latest = (...d: Date[]) => new Date(Math.max(...d.map((x) => x.getTime())))

// Hindi commentary (bhavarth, shabdarth, context) went live on 11 Nov 2026 on the Hindi verse pages
// that have a file in src/content/gita/hi-commentary, and those chapters' Hindi pages changed with it.
const HINDI_COMMENTARY_UPDATED = new Date('2026-11-11')
function hindiCommentaryRefs(): Set<string> {
  try {
    const dir = path.join(process.cwd(), 'src', 'content', 'gita', 'hi-commentary')
    return new Set(
      fs
        .readdirSync(dir)
        .map((f) => /^(\d+)-(\d+)\.json$/.exec(f))
        .filter((m): m is RegExpExecArray => Boolean(m))
        .map((m) => `${Number(m[1])}.${Number(m[2])}`),
    )
  } catch {
    return new Set()
  }
}

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
  'bhagavad-gita-for-beginners': { date: '2026-11-13', priority: 0.88 },
  'bhagavad-gita-karma-meaning': { date: '2026-11-11', priority: 0.85 },
  'bhagavad-gita-anxiety-mental-peace': { date: '2026-04-08', priority: 0.75 },
  'bhagavad-gita-complete-structure-all-chapters': { date: '2026-04-08', priority: 0.75 },
  'beyond-bhagavad-gita-quotes-mental-spiritual-health': { date: '2026-04-08', priority: 0.75 },
  'krishna-three-paths-bhagavad-gita': { date: '2026-05-24', priority: 0.85 },
  'rise-and-failure-of-gitagpt': { date: '2026-06-19', priority: 0.85 },
  'sthitaprajna-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'nishkama-karma-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-on-anxiety': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-on-death-and-the-soul': { date: '2026-06-12', priority: 0.88 },
  'dharma-meaning-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'sattva-rajas-tamas-three-gunas-bhagavad-gita': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-for-students': { date: '2026-06-12', priority: 0.88 },
  'bhagavad-gita-vs-stoicism': { date: '2026-11-11', priority: 0.88 },
  'ahankara-meaning-bhagavad-gita': { date: '2026-07-17', priority: 0.88 },
  'maya-meaning-bhagavad-gita': { date: '2026-07-17', priority: 0.88 },
  'best-bhagavad-gita-translation': { date: '2026-11-13', priority: 0.9 },
  'atman-not-soul-bhagavad-gita': { date: '2026-08-03', priority: 0.88 },
}

// Blog slugs that now 301 elsewhere (see next.config.mjs). The page file stays
// on disk, so the filesystem enumeration would otherwise still list it.
const REDIRECTED_BLOG_SLUGS = new Set(['bhagavad-gita-2-47-karmanye-vadhikaraste'])

// Quote pages (configs in src/content/quotes/pages.ts) are listed from their configs so the
// nested /blogs/krishna-quotes/<moment> and /hi/blogs/* routes are included and
// EN/HI twins carry hreflang alternates.
const QUOTE_HUBS = new Set(['/blogs/krishna-quotes', '/hi/blogs/krishna-quotes', '/blogs/bhagavad-gita-quotes', '/hi/blogs/bhagavad-gita-quotes'])

function quotePageEntries(): MetadataRoute.Sitemap {
  return getAllPages().map((p) => {
    const hub = QUOTE_HUBS.has(p.path)
    const twin = p.alternatePath
    const enPath = p.locale === 'en' ? p.path : twin
    const hiPath = p.locale === 'hi' ? p.path : twin
    return {
      url: `${BASE}${p.path}`,
      lastModified: new Date(p.updated),
      changeFrequency: hub ? ('weekly' as const) : ('monthly' as const),
      priority: hub ? 0.9 : 0.85,
      ...(enPath && hiPath ? { alternates: langAlts(enPath, hiPath) } : {}),
    }
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: GITA_HUBS_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: langAlts('/', '/hi/gita'),
    },
    { url: `${BASE}/app`, lastModified: new Date('2026-10-19'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/gita-jayanti`, lastModified: new Date('2026-10-25'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/read-gita-in-18-days`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly', priority: 0.85 },
    // Length reading plans and the how-to-read guide (lib/readingPlans.ts); also listed with images in /sitemap-plans.xml
    { url: `${BASE}/how-to-read-bhagavad-gita`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/bhagavad-gita-in-30-days`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/bhagavad-gita-in-7-days`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/bhagavad-gita-one-verse-a-day`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/gita-jayanti/reading-plan`, lastModified: new Date('2026-11-13'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/gita-jayanti/which-chapter-to-read`, lastModified: new Date('2026-10-25'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/most-searched-gita-verses-2026`, lastModified: new Date('2026-10-29'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/understand-the-gita`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/oppenheimer-bhagavad-gita`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.9 },
    // App comparisons (/best-apps hub and its guides)
    { url: `${BASE}/best-apps`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/best-bhagavad-gita-apps`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/best-hindu-prayer-apps`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/best-hanuman-chalisa-apps`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/bhagavad-gita-widget-iphone`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/reading-plans`, lastModified: new Date('2026-11-13'), changeFrequency: 'weekly', priority: 0.9 },
    // Map of the mind (/explore) and one page per inner state (src/content/explore, scripts/build-explore-data.py)
    { url: `${BASE}/explore`, lastModified: new Date('2026-11-14'), changeFrequency: 'monthly', priority: 0.8 },
    ...EXPLORE_STATES.map((s) => ({ url: `${BASE}/explore/${s.slug}`, lastModified: new Date('2026-11-14'), changeFrequency: 'monthly' as const, priority: 0.75 })),
    { url: `${BASE}/gita-for`, lastModified: new Date(THEME_PLANS_PUBLISHED), changeFrequency: 'monthly', priority: 0.85 },
    ...GITA_FOR.map((p) => {
      const plan = THEME_SLUGS.includes(p.slug)
      return { url: `${BASE}/gita-for/${p.slug}`, lastModified: new Date(plan ? THEME_PLANS_PUBLISHED : '2026-10-19'), changeFrequency: 'monthly' as const, priority: plan ? 0.9 : 0.8 }
    }),
    ...THEME_SLUGS.filter((slug) => !GITA_FOR.some((p) => p.slug === slug)).map((slug) => ({
      url: `${BASE}/gita-for/${slug}`,
      lastModified: new Date(THEME_PLANS_PUBLISHED),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${BASE}/blogs`, lastModified: CORPUS_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: CORPUS_UPDATED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/methodology`, lastModified: CORPUS_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/resources`, lastModified: new Date('2026-10-29'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/tts`, lastModified: CORPUS_UPDATED, changeFrequency: 'monthly', priority: 0.4 },
    // Verse search (EN + HI paired)
    { url: `${BASE}/search`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.5, alternates: langAlts('/search', '/hi/search') },
    { url: `${BASE}/hi/search`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.5, alternates: langAlts('/search', '/hi/search') },
    // 12 key ideas of the Gita (EN + HI paired). The chapter read-mode pages are noindex and stay out.
    { url: `${BASE}/gita/key-ideas`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.85, alternates: langAlts('/gita/key-ideas', '/hi/gita/mool-shabd') },
    { url: `${BASE}/hi/gita/mool-shabd`, lastModified: new Date('2026-11-11'), changeFrequency: 'monthly', priority: 0.85, alternates: langAlts('/gita/key-ideas', '/hi/gita/mool-shabd') },
    {
      url: `${BASE}/gita`,
      lastModified: GITA_HUBS_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: langAlts('/gita', '/hi/gita'),
    },
    {
      url: `${BASE}/hi/gita`,
      lastModified: GITA_HUBS_UPDATED,
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
  const quotePages = quotePageEntries()
  const quotePaths = new Set(getAllPages().map((p) => p.path))
  const blogSlugs = enumerateBlogSlugs().filter(
    (slug) => !REDIRECTED_BLOG_SLUGS.has(slug) && !quotePaths.has(`/blogs/${slug}`),
  )
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
  const hiCommentary = hindiCommentaryRefs()
  const hiCommentaryChapters = new Set(Array.from(hiCommentary, (r) => Number(r.split('.')[0])))
  const chapters = getAllChapters()
  const chapterPages: MetadataRoute.Sitemap = chapters.flatMap((ch) => {
    const en = chapterUrl(ch.number, 'en')
    const hi = chapterUrl(ch.number, 'hi')
    return [
      {
        url: `${BASE}${en}`,
        lastModified: CHAPTERS_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: langAlts(en, hi),
      },
      {
        url: `${BASE}${hi}`,
        lastModified: hiCommentaryChapters.has(ch.number) ? latest(CHAPTERS_UPDATED, HINDI_COMMENTARY_UPDATED) : CHAPTERS_UPDATED,
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
    // Verses used in a 7-day plan now link to it, so their English page changed on the plans' launch day.
    const inPlan = plansForVerse(r.chapter, r.verse).length > 0
    return [
      {
        url: `${BASE}${en}`,
        lastModified: inPlan ? latest(VERSE_COPY_UPDATED, new Date(THEME_PLANS_PUBLISHED)) : VERSE_COPY_UPDATED,
        changeFrequency: 'yearly',
        priority: 0.7,
        alternates: langAlts(en, hi),
      },
      {
        url: `${BASE}${hi}`,
        lastModified: hiCommentary.has(`${r.chapter}.${r.verse}`) ? HINDI_COMMENTARY_UPDATED : VERSE_COPY_UPDATED,
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
        lastModified: TOPICS_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: langAlts(en, hi),
      },
      {
        url: `${BASE}${hi}`,
        lastModified: TOPICS_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: langAlts(en, hi),
      },
    ]
  })

  return [...staticPages, ...blogPages, ...quotePages, ...funnelSitemapEntries(), ...chapterPages, ...versePages, ...topicPages]
}

import { ARTICLES, PILLARS } from '../_lib/articles'
import { dabs } from '../_lib/site'

// Served at dhyaan.wisdomquotes.in/sitemap.xml via the host rewrite.
const PAGES: { path: string; priority: number; lastmod: string }[] = [
  { path: '/', priority: 1, lastmod: '2026-11-06' },
  { path: '/nivata', priority: 0.9, lastmod: '2026-11-06' },
  { path: '/apple-watch', priority: 0.9, lastmod: '2026-11-06' },
  { path: '/faq', priority: 0.7, lastmod: '2026-11-06' },
  { path: '/learn', priority: 0.7, lastmod: '2026-11-06' },
  { path: '/gita', priority: 0.8, lastmod: '2026-11-06' },
  { path: '/methods', priority: 0.6, lastmod: '2026-11-06' },
  { path: '/privacy', priority: 0.3, lastmod: '2026-11-06' },
  ...PILLARS.map((p) => ({ path: `/learn/${p.slug}`, priority: 0.9, lastmod: '2026-11-06' })),
  ...ARTICLES.map((a) => ({ path: `/learn/${a.slug}`, priority: 0.8, lastmod: a.updated ?? a.published })),
]

export const dynamic = 'force-static'

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${dabs(p.path)}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

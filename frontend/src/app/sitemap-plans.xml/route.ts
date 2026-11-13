import { LENGTH_PLANS } from '@/lib/readingPlans'

/**
 * A small sitemap for the reading-plan cluster, with each page's plan picture as an image entry, so
 * Search Console reports this cluster's index coverage on its own and the schedule pictures can reach
 * Google Images. Every URL here is also in /sitemap.xml. Listed in robots.txt.
 */
const SITE = 'https://wisdomquotes.in'
const UPDATED = '2026-11-13'

type Entry = { path: string; img?: { src: string; title: string } }

const ENTRIES: Entry[] = [
  { path: '/reading-plans' },
  { path: '/how-to-read-bhagavad-gita' },
  ...LENGTH_PLANS.map((p) => ({ path: p.href, img: { src: p.img, title: `${p.title}: Bhagavad Gita reading plan, ${p.span}, ${p.daily}` } })),
  { path: '/gita-for' },
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function GET() {
  const body = ENTRIES.map(
    (e) => `  <url>
    <loc>${SITE}${e.path}</loc>
    <lastmod>${UPDATED}</lastmod>${
      e.img
        ? `
    <image:image>
      <image:loc>${SITE}${e.img.src}</image:loc>
      <image:title>${esc(e.img.title)}</image:title>
    </image:image>`
        : ''
    }
  </url>`
  ).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

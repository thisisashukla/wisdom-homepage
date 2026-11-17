import sitemap from '@/app/sitemap'

/**
 * Section sitemaps: the same entries as /sitemap.xml, split by page type, so Search Console's
 * Page indexing report can be filtered per section (Sitemaps filter) and each section's indexed
 * count shows on the Sitemaps page. Every URL here is also in /sitemap.xml.
 */
export const SECTIONS = {
  'verses-en': (p: string) => /^\/gita\/chapter\/\d+\/verse\/\d+$/.test(p),
  'verses-hi': (p: string) => /^\/hi\/gita\/chapter\/\d+\/verse\/\d+$/.test(p),
  'gita-hubs': (p: string) => /^(\/hi)?\/gita\/(chapter\/\d+|topic\/[^/]+)$/.test(p),
  blogs: (p: string) => /^(\/hi)?\/blogs(\/|$)/.test(p),
} as const

export type Section = keyof typeof SECTIONS

const day = (d: string | Date | undefined) => (d ? new Date(d).toISOString().slice(0, 10) : undefined)

export function sectionSitemapResponse(section: Section) {
  const keep = SECTIONS[section]
  const body = sitemap()
    .filter((e) => keep(new URL(e.url).pathname))
    .map((e) => {
      const lm = day(e.lastModified)
      return `  <url>\n    <loc>${e.url}</loc>${lm ? `\n    <lastmod>${lm}</lastmod>` : ''}\n  </url>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

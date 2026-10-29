import { NextResponse, type NextRequest } from 'next/server'
import topicsJson from '@/content/gita/topics.json'
import redirectsJson from '@/content/gita/topic-redirects.json'
import { THEME_SLUGS } from '@/lib/themePlans'

/**
 * 308 retired topic URLs (/gita/topic/<tag> and /hi/gita/topic/<tag> where the
 * tag has no hub page) to the closest surviving hub, in the same locale.
 *
 * Done here, not with permanentRedirect() in the page: Next caches a redirect
 * rendered by a page and replays it without the Location header.
 */
const hubs = new Set((topicsJson as { slug: string }[]).map((t) => t.slug))
const retired = redirectsJson as Record<string, string>

const normalise = (s: string) => {
  let out = s
  try { out = decodeURIComponent(s) } catch { /* keep raw */ }
  return out.toLowerCase().trim().replace(/[_\s]+/g, '-')
}

const themeSlugs = new Set(THEME_SLUGS)

/**
 * Theme plan pages: visitors outside India see the "global" image set. Same URL,
 * same text; only the art differs (see app/gita-for/[slug]/global). Unknown country
 * (local dev, previews without geo) keeps the India set.
 */
function themeGeo(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/\/$/, '')
  const m = path.match(/^\/gita-for\/([^/]+)$/)
  const hub = path === '/reading-plans'
  if (!hub && (!m || !themeSlugs.has(m[1]))) return null
  const country = (req as NextRequest & { geo?: { country?: string } }).geo?.country || req.headers.get('x-vercel-ip-country') || ''
  if (!country || country.toUpperCase() === 'IN') return NextResponse.next()
  const url = req.nextUrl.clone()
  url.pathname = hub ? '/reading-plans/global' : `/gita-for/${m![1]}/global`
  const res = NextResponse.rewrite(url)
  res.headers.set('Vary', 'X-Vercel-IP-Country')
  return res
}

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname
  const direct = p.match(/^\/(gita-for\/[^/]+|reading-plans)\/global\/?$/)
  if (direct) {
    const url = req.nextUrl.clone()
    url.pathname = `/${direct[1]}`
    return NextResponse.redirect(url, 308)
  }
  if (p.startsWith('/gita-for/') || p === '/reading-plans' || p === '/reading-plans/') return themeGeo(req) ?? NextResponse.next()
  const m = req.nextUrl.pathname.match(/^\/(hi\/)?gita\/topic\/([^/]+)\/?$/)
  if (!m) return NextResponse.next()
  const [, hi, raw] = m
  if (hubs.has(raw)) return NextResponse.next()
  const slug = normalise(raw)
  const target = hubs.has(slug) ? slug : retired[slug] ?? ''
  const dest = target ? `${hi ? '/hi' : ''}/gita/topic/${target}` : hi ? '/hi/gita' : '/gita'
  const url = req.nextUrl.clone()
  url.pathname = dest
  url.search = ''
  return NextResponse.redirect(url, 308)
}

export const config = {
  // /gita-for/:slug compiles to a broken pattern in Next 14.2 (it never matched plan pages), so match broadly and filter in code.
  matcher: ['/gita/topic/:slug*', '/hi/gita/topic/:slug*', '/gita-for/:path*', '/reading-plans/:path*'],
}

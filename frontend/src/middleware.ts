import { NextResponse, type NextRequest } from 'next/server'
import topicsJson from '@/content/gita/topics.json'
import redirectsJson from '@/content/gita/topic-redirects.json'

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

export function middleware(req: NextRequest) {
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
  matcher: ['/gita/topic/:slug*', '/hi/gita/topic/:slug*'],
}

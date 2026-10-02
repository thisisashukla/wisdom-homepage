import { NextRequest, NextResponse } from 'next/server'
import { canonicalRedirect } from './lib/canonical-redirect'

export function middleware(request: NextRequest) {
  const destination = canonicalRedirect(request.url, request.headers.get('host') || new URL(request.url).host, process.env.WISDOM_CANONICAL_HOST)
  return destination ? NextResponse.redirect(destination, 301) : NextResponse.next()
}
export const config = { matcher: ['/((?!api/|_next/).*)'] }

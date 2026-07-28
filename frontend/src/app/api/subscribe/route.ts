import { NextResponse } from 'next/server'

/**
 * Email capture endpoint.
 *
 * Behavior:
 *  - Validates the payload.
 *  - If BACKEND_URL (or NEXT_PUBLIC_BACKEND_URL) is set, forwards to
 *    `${backend}/api/v1/subscribe`. Any backend failure is logged but does
 *    NOT surface to the user — capture must not silently break.
 *  - Also logs every successful capture to server logs so nothing is lost
 *    while the persistence layer is being wired.
 *
 * When you wire real persistence (Supabase / DB), implement it in the
 * backend `/api/v1/subscribe` route rather than here — keep the Next.js
 * route dumb.
 */
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const { email, source, locale } = (body ?? {}) as {
    email?: string
    source?: string
    locale?: string
  }

  const cleaned = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!cleaned || !emailRe.test(cleaned)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const record = {
    email: cleaned,
    source: typeof source === 'string' ? source : 'unknown',
    locale: typeof locale === 'string' ? locale : 'en',
    ts: new Date().toISOString(),
    ua: req.headers.get('user-agent') ?? null,
    ref: req.headers.get('referer') ?? null,
  }

  // Always log so nothing is lost while backend wiring is in flight.
  // Grep server logs for "[subscribe]" to recover captures.
  console.log('[subscribe]', JSON.stringify(record))

  const backendUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

  if (backendUrl) {
    // Forward to backend. Don't await too long; we already logged locally.
    try {
      const controller = new AbortController()
      const t = setTimeout(() => controller.abort(), 4000)
      const res = await fetch(`${backendUrl}/api/v1/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
        signal: controller.signal,
      })
      clearTimeout(t)
      if (!res.ok && res.status !== 404) {
        console.warn('[subscribe] backend responded', res.status)
      }
    } catch (err) {
      console.warn('[subscribe] backend forward failed:', err)
    }
  }

  return NextResponse.json({ ok: true })
}

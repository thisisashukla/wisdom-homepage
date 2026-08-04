import { NextResponse } from 'next/server'

/**
 * Scripture AI waitlist endpoint.
 *
 * Accepts: { email, interests: string[], source: string }
 *
 * Behavior:
 *  - Validates email and interests.
 *  - Logs every capture server-side (grep "[waitlist]" to recover).
 *  - If BACKEND_URL is set, forwards to ${backend}/api/v1/waitlist.
 *    Backend failures are swallowed — capture must never break the UX.
 */
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const { email, interests, source } = (body ?? {}) as {
    email?: string
    interests?: unknown
    source?: string
  }

  // Validate email
  const cleaned = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!cleaned || !emailRe.test(cleaned)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  // Validate interests — must be a non-empty array of strings
  const VALID_INTERESTS = ['verse', 'guidance', 'topic', 'concept', 'mood', 'why', 'modern', 'compare']
  const cleanedInterests: string[] = Array.isArray(interests)
    ? interests.filter((i): i is string => typeof i === 'string' && VALID_INTERESTS.includes(i))
    : []

  const record = {
    email: cleaned,
    interests: cleanedInterests,
    source: typeof source === 'string' ? source : 'unknown',
    ts: new Date().toISOString(),
    ua: req.headers.get('user-agent') ?? null,
    ref: req.headers.get('referer') ?? null,
  }

  // Always log so nothing is lost while persistence is being wired.
  // Grep server logs for "[waitlist]" to recover captures.
  console.log('[waitlist]', JSON.stringify(record))

  const backendUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

  if (backendUrl) {
    try {
      const controller = new AbortController()
      const t = setTimeout(() => controller.abort(), 4000)
      const res = await fetch(`${backendUrl}/api/v1/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
        signal: controller.signal,
      })
      clearTimeout(t)
      if (!res.ok && res.status !== 404) {
        console.warn('[waitlist] backend responded', res.status)
      }
    } catch (err) {
      console.warn('[waitlist] backend forward failed:', err)
    }
  }

  return NextResponse.json({ ok: true })
}

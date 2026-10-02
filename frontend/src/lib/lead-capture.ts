type CaptureKind = 'subscribe' | 'waitlist'

const VALID_INTERESTS = new Set(['verse', 'guidance', 'topic', 'concept', 'mood', 'why', 'modern', 'compare'])

/** Require an explicit committed-write receipt; HTTP success alone is insufficient. */
export async function captureLead(req: Request, kind: CaptureKind): Promise<Response> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }
  const input = body && typeof body === 'object' && !Array.isArray(body)
    ? body as Record<string, unknown> : {}
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const backend = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
  if (!backend) {
    return Response.json({ ok: false, error: 'capture_unavailable' }, { status: 503 })
  }
  const record = {
    email,
    source: typeof input.source === 'string' ? input.source.slice(0, 200) : 'unknown',
    mode: 'waitlist',
    purpose: kind === 'subscribe' ? 'daily_verse_launch_notification' : 'scripture_ai_launch_notification',
    ...(kind === 'subscribe'
      ? { locale: input.locale === 'hi' ? 'hi' : 'en' }
      : { interests: Array.isArray(input.interests)
          ? [...new Set(input.interests.filter((value): value is string => typeof value === 'string' && VALID_INTERESTS.has(value)))]
          : [] }),
    ts: new Date().toISOString(),
    ua: req.headers.get('user-agent'),
    ref: req.headers.get('referer'),
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)
  try {
    const response = await fetch(`${backend.replace(/\/+$/, '')}/api/v1/${kind}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      signal: controller.signal,
      redirect: 'error',
      cache: 'no-store',
    })
    if (!response.ok) {
      return Response.json({ ok: false, error: 'capture_unavailable' }, { status: 502 })
    }
    const receipt: unknown = await response.json()
    if (!receipt || typeof receipt !== 'object'
      || !('ok' in receipt) || receipt.ok !== true
      || !('persisted' in receipt) || receipt.persisted !== true) {
      return Response.json({ ok: false, error: 'capture_unconfirmed' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch {
    // Do not log the request, email, upstream response, or error contents.
    return Response.json({ ok: false, error: 'capture_unavailable' }, { status: 503 })
  } finally {
    clearTimeout(timeout)
  }
}

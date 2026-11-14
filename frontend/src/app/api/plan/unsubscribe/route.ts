import { NextResponse } from 'next/server'
import { TOKEN_RE, unsubscribe } from '@/lib/server/webPlans'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Stops a plan's morning emails.
 *  - POST ?t=…  : the mail app's one-click unsubscribe (List-Unsubscribe-Post, RFC 8058),
 *                 or the button on /plan/unsubscribe (JSON or form body with t).
 *  - GET  ?t=…  : never unsubscribes (link scanners prefetch GETs); sends to the confirm page.
 */
async function tokenOf(req: Request): Promise<string | null> {
  const q = new URL(req.url).searchParams.get('t')
  if (q) return q
  const type = req.headers.get('content-type') || ''
  try {
    if (type.includes('application/json')) return ((await req.json()) as { t?: string }).t ?? null
    if (type.includes('form')) return ((await req.formData()).get('t') as string) ?? null
  } catch {}
  return null
}

export async function POST(req: Request) {
  const t = await tokenOf(req)
  if (!t || !TOKEN_RE.test(t)) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  try {
    const ok = await unsubscribe(t)
    return NextResponse.json({ ok })
  } catch (e) {
    console.error('[plan/unsubscribe]', e)
    return NextResponse.json({ error: 'unavailable' }, { status: 502 })
  }
}

export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get('t') || ''
  return NextResponse.redirect(new URL(`/plan/unsubscribe${TOKEN_RE.test(t) ? `?t=${t}` : ''}`, req.url), 303)
}

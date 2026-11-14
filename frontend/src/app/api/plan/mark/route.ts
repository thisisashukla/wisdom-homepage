import { NextResponse } from 'next/server'
import { rateLimit, clientIp } from '@/lib/server/backend'
import { markDay, TOKEN_RE } from '@/lib/server/webPlans'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** From /plan: a day opened (read) and/or "helped" / "not for me". The token is the access. */
export async function POST(req: Request) {
  if (!rateLimit(`plan-mark:${clientIp(req)}`, 120, 60 * 60 * 1000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  let body: { t?: string; d?: number; read?: boolean; feedback?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const day = Number(body.d)
  if (typeof body.t !== 'string' || !TOKEN_RE.test(body.t) || !Number.isInteger(day) || day < 1 || day > 7) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  const feedback = body.feedback === 'helped' || body.feedback === 'not_for_me' ? body.feedback : null
  try {
    const ok = await markDay(body.t, day, body.read !== false, feedback)
    return NextResponse.json({ ok }, { status: ok ? 200 : 404 })
  } catch (e) {
    console.error('[plan/mark]', e)
    return NextResponse.json({ error: 'unavailable' }, { status: 502 })
  }
}

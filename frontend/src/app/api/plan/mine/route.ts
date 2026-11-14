import { NextResponse } from 'next/server'
import { clientIp, rateLimit } from '@/lib/server/backend'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { findPlanForUid, getPlan, TOKEN_RE, type SavedPlan } from '@/lib/server/webPlans'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * "Do they already have a plan?", for /start and /plan:
 *  - ?t=<token>          the plan this browser saved (works signed out)
 *  - Authorization: Bearer <Firebase ID token>   the signed-in person's latest plan, on any device
 * Returns { plan: null } or a summary (no verse text): enough to say "Continue · Day 3 of 7".
 */
const summary = (p: SavedPlan, token: string) => ({
  token,
  status: p.status,
  today: p.today,
  unlocked: p.unlocked,
  complete: p.complete,
  weekTitle: p.weekTitle,
  readDays: p.readDays,
  name: p.name,
  age: p.age,
  stages: p.stages,
})

export async function GET(req: Request) {
  if (!rateLimit(`plan-mine:${clientIp(req)}`, 60, 60 * 60 * 1000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  const t = new URL(req.url).searchParams.get('t')
  try {
    if (t && TOKEN_RE.test(t)) {
      const p = await getPlan(t)
      if (p && p.status !== 'replaced') return NextResponse.json({ plan: summary(p, t) })
    }
    const user = await verifyFirebaseToken(bearer(req))
    if (user) {
      const p = await findPlanForUid(user.uid)
      if (p) return NextResponse.json({ plan: summary(p, p.token) })
    }
    return NextResponse.json({ plan: null })
  } catch (e) {
    console.error('[plan/mine]', e)
    return NextResponse.json({ plan: null, error: 'unavailable' })
  }
}

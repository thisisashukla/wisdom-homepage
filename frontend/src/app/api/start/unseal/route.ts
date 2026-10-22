import { NextResponse } from 'next/server'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { unseal } from '@/lib/server/seal'
import { getSubscription, isActive } from '@/lib/server/supabase'
import type { FullDay } from '@/lib/server/startShared'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Opens the week sealed by /api/start/week, for its owner, once the ₹89/week plan is active. */
export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })

  if (process.env.WEB_PLAN_FREE !== '1') {
    try {
      if (!isActive(await getSubscription(user.uid))) {
        return NextResponse.json({ error: 'payment_required' }, { status: 402 })
      }
    } catch (e) {
      console.error('[start/unseal] entitlement', e)
      return NextResponse.json({ error: 'entitlement_unavailable' }, { status: 503 })
    }
  }

  let body: { sealed?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const plan = typeof body.sealed === 'string' ? unseal<{ days: FullDay[]; weeks: string[] }>(body.sealed, user.uid) : null
  if (!plan) return NextResponse.json({ error: 'plan_expired' }, { status: 410 })
  return NextResponse.json(plan)
}

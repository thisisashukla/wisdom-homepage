import { NextResponse } from 'next/server'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { cancelSubscription, toIso } from '@/lib/server/razorpay'
import { getSubscription, saveSubscription } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Stops renewal at the end of the paid week. */
export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })
  try {
    const row = await getSubscription(user.uid)
    if (!row) return NextResponse.json({ error: 'no_subscription' }, { status: 404 })
    const sub = await cancelSubscription(row.razorpay_subscription_id)
    await saveSubscription({
      ...row,
      status: 'cancelled',
      current_end: toIso(sub.current_end) ?? row.current_end ?? null,
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[pay/cancel]', e)
    return NextResponse.json({ error: 'cancel_failed' }, { status: 502 })
  }
}

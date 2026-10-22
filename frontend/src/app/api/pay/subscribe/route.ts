import { NextResponse } from 'next/server'
import { WEB_PLAN_PRICE_INR } from '@/lib/app'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { createSubscription, razorpayConfigured, razorpayKeyId, toIso } from '@/lib/server/razorpay'
import { getSubscription, isActive, saveSubscription } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Starts a ₹89/week Razorpay subscription for the signed-in user. */
export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })
  if (!razorpayConfigured()) return NextResponse.json({ error: 'payments_not_configured' }, { status: 503 })

  try {
    const existing = await getSubscription(user.uid)
    if (isActive(existing)) return NextResponse.json({ active: true })
    const sub = await createSubscription(user.uid, user.email)
    await saveSubscription({
      uid: user.uid,
      email: user.email ?? null,
      razorpay_subscription_id: sub.id,
      status: sub.status || 'created',
      current_end: toIso(sub.current_end),
    })
    return NextResponse.json({
      subscription_id: sub.id,
      key_id: razorpayKeyId(),
      amount: WEB_PLAN_PRICE_INR * 100,
      email: user.email ?? '',
      name: user.name ?? '',
    })
  } catch (e) {
    console.error('[pay/subscribe]', e)
    return NextResponse.json({ error: 'subscribe_failed' }, { status: 502 })
  }
}

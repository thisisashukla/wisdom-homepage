import { NextResponse } from 'next/server'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { fetchSubscription, toIso, verifyCheckoutSignature } from '@/lib/server/razorpay'
import { getSubscriptionById, saveSubscription } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Called by the Checkout handler once the first payment goes through. */
export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })

  const b = (await req.json().catch(() => ({}))) as {
    razorpay_payment_id?: string
    razorpay_subscription_id?: string
    razorpay_signature?: string
  }
  if (!b.razorpay_payment_id || !b.razorpay_subscription_id || !b.razorpay_signature) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }
  if (!verifyCheckoutSignature(b.razorpay_payment_id, b.razorpay_subscription_id, b.razorpay_signature)) {
    return NextResponse.json({ error: 'bad_signature' }, { status: 400 })
  }

  try {
    const row = await getSubscriptionById(b.razorpay_subscription_id)
    if (row && row.uid !== user.uid) return NextResponse.json({ error: 'not_yours' }, { status: 403 })
    const sub = await fetchSubscription(b.razorpay_subscription_id)
    const status = sub.status === 'created' ? 'authenticated' : sub.status
    const currentEnd = toIso(sub.current_end) ?? new Date(Date.now() + 7 * 86_400_000).toISOString()
    await saveSubscription({
      uid: user.uid,
      email: user.email ?? null,
      razorpay_subscription_id: sub.id,
      status,
      current_end: currentEnd,
    })
    return NextResponse.json({ active: true, status, current_end: currentEnd })
  } catch (e) {
    console.error('[pay/verify]', e)
    return NextResponse.json({ error: 'verify_failed' }, { status: 502 })
  }
}

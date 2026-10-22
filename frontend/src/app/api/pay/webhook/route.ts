import { NextResponse } from 'next/server'
import { toIso, verifyWebhookSignature } from '@/lib/server/razorpay'
import { getSubscriptionById, saveSubscription } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Razorpay webhook (Dashboard → Webhooks → https://wisdomquotes.in/api/pay/webhook).
 * Subscribe to: subscription.activated, subscription.charged, subscription.pending,
 * subscription.halted, subscription.cancelled, subscription.completed.
 */
export async function POST(req: Request) {
  const raw = await req.text()
  const sig = req.headers.get('x-razorpay-signature') || ''
  if (!verifyWebhookSignature(raw, sig)) return NextResponse.json({ error: 'bad_signature' }, { status: 400 })

  let evt: {
    event?: string
    payload?: { subscription?: { entity?: { id: string; status: string; current_end?: number; notes?: Record<string, string> } } }
  }
  try {
    evt = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const sub = evt.payload?.subscription?.entity
  if (!sub?.id) return NextResponse.json({ ok: true, ignored: evt.event })

  try {
    const row = await getSubscriptionById(sub.id)
    const uid = row?.uid || sub.notes?.uid
    if (!uid) return NextResponse.json({ ok: true, ignored: 'no_uid' })
    await saveSubscription({
      uid,
      email: row?.email ?? sub.notes?.email ?? null,
      razorpay_subscription_id: sub.id,
      status: sub.status,
      current_end: toIso(sub.current_end) ?? row?.current_end ?? null,
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[pay/webhook]', e)
    return NextResponse.json({ error: 'store_failed' }, { status: 500 })
  }
}

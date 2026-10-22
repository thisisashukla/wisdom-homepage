import { NextResponse } from 'next/server'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { razorpayConfigured } from '@/lib/server/razorpay'
import { getSubscription, isActive, supabaseConfigured } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })
  const free = process.env.WEB_PLAN_FREE === '1'
  if (free) return NextResponse.json({ active: true, configured: true })
  if (!supabaseConfigured()) return NextResponse.json({ active: false, configured: false })
  try {
    const sub = await getSubscription(user.uid)
    return NextResponse.json({
      active: isActive(sub),
      status: sub?.status ?? null,
      current_end: sub?.current_end ?? null,
      configured: razorpayConfigured(),
    })
  } catch (e) {
    console.error('[pay/status]', e)
    return NextResponse.json({ active: false, configured: false })
  }
}

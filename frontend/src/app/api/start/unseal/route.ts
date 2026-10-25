import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/server/backend'
import { sendWeekEmail } from '@/lib/server/email'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { unseal, WEEK_AAD } from '@/lib/server/seal'
import type { FullDay } from '@/lib/server/startShared'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Opens the week sealed by /api/start/week. Week 1 is free; signing in with
 * Google is what opens it, and the week is emailed to that address (when
 * email is configured). `emailed` says whether it actually went.
 */
export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })

  let body: { sealed?: string; email?: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const plan = typeof body.sealed === 'string' ? unseal<{ days: FullDay[]; weeks: string[] }>(body.sealed, WEEK_AAD) : null
  if (!plan) return NextResponse.json({ error: 'plan_expired' }, { status: 410 })

  let emailed = false
  if (body.email !== false && user.email && rateLimit(`start-email:${user.uid}`, 3, 24 * 60 * 60 * 1000)) {
    emailed = await sendWeekEmail(user.email, plan.days, plan.weeks?.[0] ?? null, user.name)
  }
  return NextResponse.json({ ...plan, emailed, email: emailed ? user.email : null })
}

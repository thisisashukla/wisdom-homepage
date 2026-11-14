import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/server/backend'
import { sendEmail, welcomeEmail } from '@/lib/server/email'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { unseal, WEEK_AAD } from '@/lib/server/seal'
import type { FullDay } from '@/lib/server/startShared'
import { createPlan, getPlan, markSent } from '@/lib/server/webPlans'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WORD_RE = /^[a-z_]{1,40}$/
const REF_RE = /^[A-Za-z0-9_.:-]{1,80}$/
const TZ_RE = /^[A-Za-z_]+(\/[A-Za-z0-9_+-]+){0,2}$/

/**
 * Opens the week sealed by /api/start/week. Week 1 is free; signing in with
 * Google is what opens it. The week is saved (web_plans) so it can come one
 * day each morning by email and open on any device at /plan?t=<token>; the
 * welcome email (Day 1 in full) goes now. `emailed` says whether it actually
 * went, `token` is the saved plan's (null when saving is off or failed).
 */
export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })

  let body: { sealed?: string; email?: boolean; tz?: string; source?: string; situation?: string; feeling?: string; hookId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const plan = typeof body.sealed === 'string' ? unseal<{ days: FullDay[]; weeks: string[] }>(body.sealed, WEEK_AAD) : null
  if (!plan) return NextResponse.json({ error: 'plan_expired' }, { status: 410 })

  const token = user.email
    ? await createPlan({
        uid: user.uid,
        email: user.email,
        name: user.name ?? null,
        tz: typeof body.tz === 'string' && TZ_RE.test(body.tz) ? body.tz : null,
        days: plan.days,
        weeks: plan.weeks ?? [],
        hookId: typeof body.hookId === 'string' ? body.hookId.slice(0, 80) : null,
        source: typeof body.source === 'string' && REF_RE.test(body.source) ? body.source : null,
        situation: typeof body.situation === 'string' && WORD_RE.test(body.situation) ? body.situation : null,
        feeling: typeof body.feeling === 'string' && WORD_RE.test(body.feeling) ? body.feeling : null,
      })
    : null

  // The same week opened again (a resume, a retry): its welcome email already went.
  const saved = token ? await getPlan(token) : null
  if (saved && saved.lastSentDay >= 1) {
    return NextResponse.json({ ...plan, emailed: true, email: user.email, token, daily: saved.status === 'active' || saved.status === 'done' })
  }

  let emailed = false
  if (body.email !== false && user.email && rateLimit(`start-email:${user.uid}`, 3, 24 * 60 * 60 * 1000)) {
    emailed = await sendEmail(user.email, welcomeEmail(plan.days, plan.weeks?.[0] ?? null, user.name, token), token)
    if (emailed && token) await markSent(token, 1)
  }
  return NextResponse.json({ ...plan, emailed, email: emailed ? user.email : null, token, daily: !!token })
}

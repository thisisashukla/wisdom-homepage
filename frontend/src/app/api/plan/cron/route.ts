import { NextResponse } from 'next/server'
import { dayEmail, emailConfigured, sendEmail } from '@/lib/server/email'
import { claimDue, unclaim, webPlansConfigured } from '@/lib/server/webPlans'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * The morning emails. Called every 30 minutes by pg_cron in Supabase
 * (job 'web-plans-daily-email': net.http_post with x-cron-secret from Vault).
 * Claims every saved plan whose next day is due (around 7 in the person's
 * time zone; Postgres decides, see web_plans_claim) and sends that day. A
 * claimed plan is already marked sent, so a second run never doubles it; a
 * failed send is unclaimed and goes on the next run.
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function run(req: Request) {
  const secret = process.env.WEB_PLANS_SECRET || ''
  const given = req.headers.get('x-cron-secret') || (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!webPlansConfigured() || given !== secret) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  if (!emailConfigured()) return NextResponse.json({ error: 'email_not_configured' }, { status: 503 })

  const due = await claimDue(40)
  let sent = 0
  let failed = 0
  for (const p of due) {
    const msg = dayEmail(p.day, p.days, p.week_title, p.name, p.token)
    const ok = msg ? await sendEmail(p.email, msg, p.token) : false
    if (ok) sent++
    else {
      failed++
      if (msg) await unclaim(p.token, p.day)
    }
    await sleep(550) // Resend allows 2 requests a second
  }
  if (due.length) console.log('[plan/cron]', JSON.stringify({ due: due.length, sent, failed }))
  return NextResponse.json({ due: due.length, sent, failed })
}

export const POST = run
export const GET = run

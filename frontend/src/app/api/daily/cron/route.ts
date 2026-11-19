import { NextResponse } from 'next/server'
import { getVerse } from '@/lib/gita'
import { cleanReading, nextRef } from '@/lib/readingMerge'
import { dailyUnsubUrl, dailyVerseEmail, emailConfigured, sendEmail, type DailyVerse } from '@/lib/server/email'
import { claimDaily, dailySent, dailyUnclaim, readersConfigured, type DueDaily } from '@/lib/server/readers'
import { verseOfDayRef } from '@/lib/server/verseOfDay'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * The morning verse emails. Called every 30 minutes by pg_cron in Supabase (job 'web-daily-verse-email',
 * supabase/migrations/011). web_daily_claim decides who is due (around 7 in their time zone, today's not
 * sent, no 7-day plan running) and marks them sent; a failed send is given back for the next run.
 *
 * Which verse: the one after where the reader is. "Where they are" is the newer of the verse page they
 * last opened (their synced progress) and the verse we last emailed. With neither, today's verse of the day.
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function pickRef(d: DueDaily): { chapter: number; verse: number } | null {
  const last = cleanReading(d.reading).last
  const sentAt = d.last_sent_at ? Date.parse(d.last_sent_at) : 0
  const sent = /^(\d+)\.(\d+)$/.exec(d.last_sent_ref || '')
  if (last && last.t > sentAt) return nextRef(last.ch, last.vs)
  if (sent) return nextRef(Number(sent[1]), Number(sent[2]))
  return null
}

async function verseFor(d: DueDaily, todayRef: { chapter: number; verse: number } | null): Promise<DailyVerse | null> {
  const ref = pickRef(d)
  const at = ref ?? todayRef
  if (!at) return null
  const v = await getVerse(at.chapter, at.verse)
  if (!v) return null
  const hi = d.lang === 'hi'
  return {
    chapter: v.chapter,
    verse: v.verse,
    sanskrit: v.sanskrit,
    translation: (hi ? v.hindiTranslation : v.englishTranslation) || v.englishTranslation,
    takeaway: hi ? null : v.simpleInsight || v.essence || null,
    kind: ref ? 'next' : 'today',
  }
}

async function run(req: Request) {
  const secret = process.env.WEB_PLANS_SECRET || ''
  const given = req.headers.get('x-cron-secret') || (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!readersConfigured() || given !== secret) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  if (!emailConfigured()) return NextResponse.json({ error: 'email_not_configured' }, { status: 503 })

  const due = await claimDaily(40)
  const todayRef = due.length ? await verseOfDayRef() : null
  let sent = 0
  let failed = 0
  for (const d of due) {
    const v = await verseFor(d, todayRef)
    const msg = v ? dailyVerseEmail(v, d.lang, d.name, d.token) : null
    const ok = msg ? await sendEmail(d.email, msg, null, dailyUnsubUrl(d.token)) : false
    if (ok && v) {
      sent++
      await dailySent(d.token, `${v.chapter}.${v.verse}`)
    } else {
      failed++
      await dailyUnclaim(d.token, d.prev_date)
    }
    await sleep(550) // Resend allows 2 requests a second
  }
  if (due.length) console.log('[daily/cron]', JSON.stringify({ due: due.length, sent, failed }))
  return NextResponse.json({ due: due.length, sent, failed })
}

export const POST = run
export const GET = run

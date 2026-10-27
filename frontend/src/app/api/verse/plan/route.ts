import { NextResponse } from 'next/server'
import { FEELINGS, situationById } from '@/lib/app'
import { BACKEND_TIMEOUT, backendPost, rateLimit } from '@/lib/server/backend'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { getSubscription, isActive } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * The paid web customisation (₹89/week): the person says it in their own
 * words and gets a 7-day plan (see → steady → act → story) written for them.
 * The note goes to the backend once and is never stored here.
 */

type BeatVerse = {
  id: string
  ref: string
  sanskrit?: string | null
  line: string
  translation?: string | null
  meaning?: string | null
  for_you?: string | null
  why?: string | null
  setting?: string | null
}
type Story = { id: string; title?: string | null; hook_title?: string | null; summary?: string | null; lesson?: string | null }
type PlanBackend = {
  understanding: { mirror?: string; insight?: string; weeks?: string[] }
  days: { day: number; phase: string; beat: string; verse?: BeatVerse | null; story?: Story | null }[]
  weeks: { week: number; title: string; level_label: string }[]
  safety: unknown
}

export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })

  const free = process.env.WEB_PLAN_FREE === '1'
  if (!free) {
    try {
      if (!isActive(await getSubscription(user.uid))) {
        return NextResponse.json({ error: 'payment_required' }, { status: 402 })
      }
    } catch (e) {
      console.error('[verse/plan] entitlement', e)
      return NextResponse.json({ error: 'entitlement_unavailable' }, { status: 503 })
    }
  }

  if (!rateLimit(`plan:${user.uid}`, 8, 24 * 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: { feeling?: string; situation?: string; note?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const feeling = FEELINGS.find((f) => f.id === body.feeling)?.id ?? 'nerve'
  const situation = situationById(body.situation)
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 800) : ''
  if (note.length < 8 && !situation) {
    return NextResponse.json({ error: 'note_too_short' }, { status: 400 })
  }

  try {
    const out = await backendPost<PlanBackend>(
      '/recommend/plan',
      {
        feeling,
        topic: situation?.topic,
        follow: situation?.follow,
        note: note || undefined,
        note_source: note ? 'text' : undefined,
        week: 1,
      },
      BACKEND_TIMEOUT.plan,
    )
    return NextResponse.json({
      mirror: out.understanding?.mirror ?? null,
      insight: out.understanding?.insight ?? null,
      week: out.weeks?.[0] ?? null,
      weeks: out.weeks?.map((w) => ({ week: w.week, title: w.title, level: w.level_label })) ?? [],
      safety: out.safety ?? null,
      days: out.days.map((d) => ({
        day: d.day,
        phase: d.phase,
        verse: d.verse
          ? {
              id: d.verse.id,
              ref: d.verse.ref,
              sanskrit: d.verse.sanskrit ?? null,
              line: d.verse.line,
              meaning: d.verse.meaning ?? d.verse.translation ?? null,
              forYou: d.verse.for_you ?? d.verse.why ?? null,
              setting: d.verse.setting ?? null,
            }
          : null,
        story: d.story
          ? {
              title: d.story.hook_title || d.story.title || null,
              summary: d.story.summary ?? null,
              lesson: d.story.lesson ?? null,
            }
          : null,
      })),
    })
  } catch (e) {
    console.error('[verse/plan]', e)
    return NextResponse.json({ error: 'backend_unavailable' }, { status: 502 })
  }
}

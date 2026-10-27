import { NextResponse } from 'next/server'
import { BACKEND_TIMEOUT, backendPost, clientIp, rateLimit } from '@/lib/server/backend'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { seal, WEEK_AAD } from '@/lib/server/seal'
import { BackendStory, BackendVerse, cleanSanskrit, FullDay, profileBody, refOf, StartProfile } from '@/lib/server/startShared'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Onboarding "Your next seven days": week 1 built around the verse they just
 * uncovered (POST /recommend/plan, as in the app). The week screen shows how
 * each later day begins, so only a glimpse of days 2 to 6 leaves in the clear;
 * the whole week comes back sealed and opens once they sign in after Day 1
 * (/api/start/unseal) once they sign in. The story's title is shown in full, as in the app.
 */
type PlanBackend = {
  days: { day: number; phase: string; beat: string; verse?: BackendVerse | null; story?: BackendStory | null }[]
  weeks?: { week: number; title: string }[]
  safety?: unknown
}

const glimpse = (s: string | null, words = 6) => {
  if (!s) return null
  const w = s.split(/\s+/)
  return w.length <= words ? s : `${w.slice(0, words).join(' ')}`
}

export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  // Signed in or not: the value comes first, sign-in comes after Day 1. Anonymous callers are limited by IP.
  const who = user ? user.uid : `ip:${clientIp(req)}`
  if (!rateLimit(`start-week:${who}`, user ? 8 : 6, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: { profile?: StartProfile; understanding?: unknown; hookId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  if (!body.understanding || typeof body.understanding !== 'object') {
    return NextResponse.json({ error: 'understanding_required' }, { status: 400 })
  }

  try {
    const out = await backendPost<PlanBackend>(
      '/recommend/plan',
      {
        ...profileBody(body.profile),
        understanding: body.understanding,
        hook_id: typeof body.hookId === 'string' ? body.hookId.slice(0, 80) : null,
        story_id: null,
        week: 1,
        shape: null,
        feedback: [],
      },
      BACKEND_TIMEOUT.plan,
    )
    const full: FullDay[] = out.days.map((d) => {
      const v = d.verse
      const s = d.story
      return {
        day: d.day,
        beat: d.beat,
        phase: d.phase,
        ref: v ? refOf(v) : refOf(s?.anchor),
        sanskrit: v ? cleanSanskrit(v.sanskrit) : null,
        line: v ? v.line : s ? s.hook_title || s.teaser || s.story_hook || s.title || null : null,
        meaning: v ? v.meaning ?? v.translation ?? null : s?.summary ?? null,
        forYou: v ? v.for_you ?? v.why ?? null : s?.for_you ?? s?.lesson ?? null,
        story: s ? { title: s.hook_title || s.title || null, summary: s.summary ?? null, lesson: s.lesson ?? null } : null,
      }
    })
    const weeks = (out.weeks ?? []).map((w) => w.title).filter(Boolean)
    // What the week screen may show before the week opens: Day 1 whole, how each later day begins, the story's title.
    const preview = full.map((d) => ({
      day: d.day,
      beat: d.beat,
      phase: d.phase,
      ref: d.ref,
      line: d.day === 1 || d.beat === 'story' ? d.line : glimpse(d.line),
    }))
    return NextResponse.json({ weeks, safety: out.safety ?? null, preview, sealed: seal({ days: full, weeks }, WEEK_AAD) })
  } catch (e) {
    console.error('[start/week]', e)
    return NextResponse.json({ error: 'backend_unavailable' }, { status: 502 })
  }
}

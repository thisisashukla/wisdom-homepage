import { NextResponse } from 'next/server'
import { backendPost, clientIp, rateLimit } from '@/lib/server/backend'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { BackendVerse, cleanSanskrit, profileBody, refOf, StartProfile } from '@/lib/server/startShared'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

/**
 * Onboarding "Finding your verse": the person's answers and (optionally) their
 * own words → their reading and Day 1's verse (POST /recommend/hook, as in the
 * app). Open before sign-in (rate-limited by IP). The note is passed through once and never stored.
 */
type HookBackend = {
  understanding?: Record<string, unknown> & { mirror?: string; insight?: string; weeks?: string[] }
  hook?: (BackendVerse & { matched?: { label: string }[] }) | null
  safety?: unknown
  library?: { verses?: number; prasangs?: number } | null
}

export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  // Signed in or not: the value comes first, sign-in comes after Day 1. Anonymous callers are limited by IP.
  const who = user ? user.uid : `ip:${clientIp(req)}`
  if (!rateLimit(`start-hook:${who}`, user ? 12 : 6, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: { profile?: StartProfile; note?: string; noteSource?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 1000) : ''

  try {
    const out = await backendPost<HookBackend>(
      '/recommend/hook',
      {
        ...profileBody(body.profile),
        note: note || null,
        note_source: note ? (body.noteSource === 'voice' ? 'voice' : 'text') : null,
        alternates: 0,
      },
      25_000,
    )
    const h = out.hook
    return NextResponse.json({
      understanding: out.understanding ?? null,
      safety: out.safety ?? null,
      library: out.library ?? null,
      hook: h
        ? {
            id: h.id,
            ref: refOf(h),
            sanskrit: cleanSanskrit(h.sanskrit),
            line: h.line,
            why: h.why ?? h.prasang?.lesson ?? null,
            matched: h.matched?.[0]?.label ?? null,
          }
        : null,
    })
  } catch (e) {
    console.error('[start/hook]', e)
    return NextResponse.json({ error: 'backend_unavailable' }, { status: 502 })
  }
}

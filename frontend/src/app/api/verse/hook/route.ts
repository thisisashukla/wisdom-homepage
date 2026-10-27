import { NextResponse } from 'next/server'
import { FEELINGS, situationById, type FeelingId } from '@/lib/app'
import { BACKEND_TIMEOUT, backendPost, clientIp, rateLimit } from '@/lib/server/backend'
import { bearer, isIOSRequest, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { upsertWebUser } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * "Your verse, right now" for the website hero.
 * iPhone visitors get it without an account (the next step is the App Store).
 * Everyone else signs in with Google first: it's the lead we keep, and it
 * keeps anonymous crawlers off the LLM-backed endpoint.
 */

type BackendVerse = {
  id: string
  ref: string
  family?: string | null
  speaker?: string | null
  listener?: string | null
  setting?: string | null
  sanskrit?: string | null
  line: string
  translation?: string | null
  why?: string | null
  prasang?: { title?: string | null; summary?: string | null } | null
}
type HookBackend = {
  understanding: { mirror?: string; insight?: string; weeks?: string[]; mechanism_label?: string; [k: string]: unknown }
  hook: BackendVerse | null
  alternates: BackendVerse[]
  safety: { kind: string; message: string; lines: { region: string; name: string; contact: string }[] } | null
}

const trimVerse = (v: BackendVerse | null | undefined) =>
  v
    ? {
        id: v.id,
        ref: v.ref,
        family: v.family ?? null,
        speaker: v.speaker ?? null,
        listener: v.listener ?? null,
        setting: v.setting ?? null,
        sanskrit: v.sanskrit ?? null,
        line: v.line,
        translation: v.translation ?? null,
        why: v.why ?? null,
        story: v.prasang?.title ?? null,
      }
    : null

export async function POST(req: Request) {
  let body: { feeling?: string; situation?: string; source?: string; exclude?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const feeling = FEELINGS.find((f) => f.id === body.feeling)?.id as FeelingId | undefined
  if (!feeling) return NextResponse.json({ error: 'invalid_feeling' }, { status: 400 })
  const situation = situationById(body.situation)

  const user = await verifyFirebaseToken(bearer(req))
  const ios = isIOSRequest(req)
  if (!user && !ios) return NextResponse.json({ error: 'signin_required' }, { status: 401 })

  const key = user ? `u:${user.uid}` : `ip:${clientIp(req)}`
  if (!rateLimit(`hook:${key}`, user ? 30 : 12, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  try {
    const out = await backendPost<HookBackend>('/recommend/hook', {
      feeling,
      topic: situation?.topic,
      follow: situation?.follow,
      alternates: 1,
      exclude: Array.isArray(body.exclude) ? body.exclude.slice(0, 50) : [],
    }, BACKEND_TIMEOUT.hook)
    if (user) {
      void upsertWebUser({
        uid: user.uid,
        email: user.email,
        name: user.name,
        platform: ios ? 'ios' : /Android/i.test(req.headers.get('user-agent') || '') ? 'android' : 'desktop',
        feeling,
        situation: situation?.id,
        source: typeof body.source === 'string' ? body.source.slice(0, 60) : undefined,
      })
    }
    return NextResponse.json({
      mirror: out.understanding?.mirror ?? null,
      insight: out.understanding?.insight ?? null,
      weeks: out.understanding?.weeks ?? [],
      hook: trimVerse(out.hook),
      alternate: trimVerse(out.alternates?.[0]),
      safety: out.safety,
    })
  } catch (e) {
    console.error('[verse/hook]', e)
    return NextResponse.json({ error: 'backend_unavailable' }, { status: 502 })
  }
}

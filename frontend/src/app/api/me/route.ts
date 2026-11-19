import { NextResponse } from 'next/server'
import { clientIp, rateLimit } from '@/lib/server/backend'
import { bearer, isIOSRequest, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { dailyStatus, readersConfigured, setDaily } from '@/lib/server/readers'
import { upsertWebUser } from '@/lib/server/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * The signed-in reader.
 *  GET            → { daily: 'active' | 'unsubscribed' | 'off' }
 *  POST { daily?, lang, tz, source } → records the sign-in (web_users) and, when `daily` is set, turns the
 *                   morning verse email on or off. → { daily }
 */
export async function GET(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })
  if (!readersConfigured()) return NextResponse.json({ daily: 'off', configured: false })
  try {
    return NextResponse.json({ daily: await dailyStatus(user.uid) })
  } catch (e) {
    console.error('[me] status', e)
    return NextResponse.json({ error: 'unavailable' }, { status: 502 })
  }
}

export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })
  if (!rateLimit(`me:${user.uid}:${clientIp(req)}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }
  let body: { daily?: boolean; lang?: string; tz?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const source = typeof body.source === 'string' ? body.source.slice(0, 80) : null
  void upsertWebUser({
    uid: user.uid,
    email: user.email,
    name: user.name,
    platform: isIOSRequest(req) ? 'ios' : /Android/i.test(req.headers.get('user-agent') || '') ? 'android' : 'desktop',
    source: source ?? undefined,
  })
  if (typeof body.daily !== 'boolean') return NextResponse.json({ ok: true })
  if (!readersConfigured()) return NextResponse.json({ daily: 'off', configured: false }, { status: 503 })
  if (body.daily && !user.email) return NextResponse.json({ error: 'no_email' }, { status: 400 })
  try {
    const out = await setDaily({
      uid: user.uid,
      email: user.email,
      name: user.name,
      tz: typeof body.tz === 'string' ? body.tz.slice(0, 64) : null,
      lang: body.lang === 'hi' ? 'hi' : 'en',
      on: body.daily,
      source,
    })
    return NextResponse.json({ daily: out.status })
  } catch (e) {
    console.error('[me] daily', e)
    return NextResponse.json({ error: 'unavailable' }, { status: 502 })
  }
}

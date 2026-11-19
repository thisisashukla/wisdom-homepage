import { NextResponse } from 'next/server'
import { cleanReading, mergeReading, sameReading } from '@/lib/readingMerge'
import { clientIp, rateLimit } from '@/lib/server/backend'
import { bearer, verifyFirebaseToken } from '@/lib/server/firebaseToken'
import { getReading, putReading, readersConfigured } from '@/lib/server/readers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Sync a signed-in reader's Gita progress (lib/readingSync.ts). POST { data: this device's wq_reading } →
 * { data: the account's copy merged with it }. The merge (lib/readingMerge.ts) runs here too, so two
 * devices syncing at the same moment both end up with everything.
 */
export async function POST(req: Request) {
  const user = await verifyFirebaseToken(bearer(req))
  if (!user) return NextResponse.json({ error: 'signin_required' }, { status: 401 })
  if (!readersConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  if (!rateLimit(`reading:${user.uid}:${clientIp(req)}`, 120, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }
  let body: { data?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  try {
    const stored = cleanReading(await getReading(user.uid))
    const merged = mergeReading(stored, body.data)
    if (!sameReading(stored, merged)) await putReading(user.uid, merged)
    return NextResponse.json({ data: merged })
  } catch (e) {
    console.error('[me/reading]', e)
    return NextResponse.json({ error: 'unavailable' }, { status: 502 })
  }
}

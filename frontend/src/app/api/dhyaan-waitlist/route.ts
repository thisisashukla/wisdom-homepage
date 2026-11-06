import { NextResponse } from 'next/server'

/**
 * Dhyaan waitlist (dhyaan.wisdomquotes.in).
 *
 * POST { email, devices[], source, ref?, utm?, company? } -> { ok, code, spot, referrals, total, isNew }
 * GET  ?code=ABC123                                        -> { ok, code, spot, referrals, total }
 *
 * Talks to two SECURITY DEFINER functions in the "Wisdom App" Supabase project
 * (supabase/migrations/007_dhyaan_waitlist.sql). The table itself is closed to the
 * publishable key, so the key below can only join the list or read a spot by code;
 * it can never list emails. Override with DHYAAN_SUPABASE_URL / DHYAAN_SUPABASE_KEY.
 *
 * A failed save returns 503 so the visitor retries; it is never reported as joined.
 */
const SB_URL = process.env.DHYAAN_SUPABASE_URL || 'https://pheysuesndqmmsogtdbt.supabase.co'
const SB_KEY = process.env.DHYAAN_SUPABASE_KEY || 'sb_publishable_pBL0tcsIifZoN3Qugb-8Wg_U1m_9DhV'

const DEVICE_IDS = new Set(['iphone', 'watch', 'airpods'])
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE_RE = /^[A-Z0-9]{6}$/

type Row = { ref_code: string; spot: number; referrals: number; total: number; is_new?: boolean }

async function rpc(fn: string, args: Record<string, unknown>): Promise<Row | null> {
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), 6000)
  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { apikey: SB_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
      cache: 'no-store',
      signal: ctl.signal,
    })
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
    const rows = (await res.json()) as Row[]
    return rows?.[0] ?? null
  } finally {
    clearTimeout(t)
  }
}

const shape = (r: Row) => ({ ok: true, code: r.ref_code, spot: r.spot, referrals: r.referrals, total: r.total, isNew: r.is_new ?? false })

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }
  // Honeypot: bots fill the hidden "company" field. Pretend success, store nothing.
  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true, code: 'DHYAAN', spot: 1, referrals: 0, total: 1, isNew: true })
  }

  const devices = Array.isArray(body.devices) ? body.devices.filter((d): d is string => typeof d === 'string' && DEVICE_IDS.has(d)) : []
  const ref = typeof body.ref === 'string' && CODE_RE.test(body.ref.toUpperCase()) ? body.ref.toUpperCase() : null
  const utm = body.utm && typeof body.utm === 'object' ? (body.utm as Record<string, unknown>) : {}
  const args = {
    p_email: email,
    p_ref: ref,
    p_source: typeof body.source === 'string' ? body.source.slice(0, 80) : 'unknown',
    p_country: req.headers.get('x-vercel-ip-country'),
    p_devices: devices,
    p_practice: null,
    p_utm: utm,
    p_ua: req.headers.get('user-agent'),
  }

  try {
    const row = await rpc('dhyaan_waitlist_join', args)
    if (!row) throw new Error('empty')
    return NextResponse.json(shape(row))
  } catch (err) {
    console.error('[dhyaan-waitlist] join failed', String(err), JSON.stringify({ ...args, p_email: email.replace(/^(.).*@/, '$1***@') }))
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 })
  }
}

export async function GET(req: Request) {
  const code = (new URL(req.url).searchParams.get('code') || '').toUpperCase()
  if (!CODE_RE.test(code)) return NextResponse.json({ ok: false, error: 'invalid_code' }, { status: 400 })
  try {
    const row = await rpc('dhyaan_waitlist_status', { p_code: code })
    if (!row) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
    return NextResponse.json(shape(row), { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.error('[dhyaan-waitlist] status failed', String(err))
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 })
  }
}

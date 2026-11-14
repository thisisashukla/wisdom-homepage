import type { FullDay } from '@/lib/server/startShared'

/**
 * Saved web plans (Supabase project "Wisdom App", table public.web_plans,
 * supabase/migrations/009_web_plans.sql). Everything goes through Postgres
 * functions called with the publishable key, as /api/dhyaan-waitlist does:
 *
 *  - web_plan_create, web_plan_mark_sent, web_plans_claim, web_plans_unclaim
 *    need WEB_PLANS_SECRET (the same value is in Supabase Vault as
 *    'web_plans_secret'). Only this server knows it.
 *  - web_plan_get, web_plan_mark, web_plan_unsubscribe take the plan's token
 *    (48 hex chars, in every email link). Holding the token is the access.
 *
 * Without WEB_PLANS_SECRET nothing is saved and /start works as before
 * (the week opens in the browser, one welcome email).
 */
const SB_URL = process.env.WEB_PLANS_SUPABASE_URL || process.env.DHYAAN_SUPABASE_URL || 'https://pheysuesndqmmsogtdbt.supabase.co'
const SB_KEY = process.env.WEB_PLANS_SUPABASE_KEY || process.env.DHYAAN_SUPABASE_KEY || 'sb_publishable_pBL0tcsIifZoN3Qugb-8Wg_U1m_9DhV'
const SECRET = process.env.WEB_PLANS_SECRET || ''

export const webPlansConfigured = () => SECRET.length >= 32
export const TOKEN_RE = /^[0-9a-f]{48}$/

async function rpc<T>(fn: string, args: Record<string, unknown>, timeoutMs = 8000): Promise<T> {
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), timeoutMs)
  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { apikey: SB_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
      cache: 'no-store',
      signal: ctl.signal,
    })
    if (!res.ok) throw new Error(`${fn} ${res.status} ${await res.text().catch(() => '')}`)
    const text = await res.text()
    return (text ? JSON.parse(text) : null) as T
  } finally {
    clearTimeout(t)
  }
}

export type SavedPlan = {
  days: FullDay[]
  weeks: string[]
  week: number
  weekTitle: string | null
  startDate: string
  tz: string
  sendHour: number
  today: number
  readDays: number[]
  feedback: Record<string, 'helped' | 'not_for_me'>
  status: 'active' | 'done' | 'replaced' | 'unsubscribed'
  lastSentDay: number
  name: string | null
  email: string
}

export async function createPlan(p: {
  uid: string
  email: string
  name?: string | null
  tz?: string | null
  days: FullDay[]
  weeks: string[]
  hookId?: string | null
  source?: string | null
  situation?: string | null
  feeling?: string | null
}): Promise<string | null> {
  if (!webPlansConfigured()) return null
  try {
    return await rpc<string>('web_plan_create', {
      p_secret: SECRET,
      p_uid: p.uid,
      p_email: p.email,
      p_name: p.name ?? null,
      p_tz: p.tz ?? null,
      p_days: p.days,
      p_weeks: p.weeks ?? [],
      p_hook_id: p.hookId ?? null,
      p_source: p.source ?? null,
      p_situation: p.situation ?? null,
      p_feeling: p.feeling ?? null,
    })
  } catch (e) {
    console.error('[web_plans] create', e)
    return null
  }
}

export async function markSent(token: string, day: number) {
  if (!webPlansConfigured()) return
  try {
    await rpc('web_plan_mark_sent', { p_secret: SECRET, p_token: token, p_day: day })
  } catch (e) {
    console.error('[web_plans] mark_sent', e)
  }
}

export type DueEmail = { token: string; email: string; name: string | null; day: number; days: FullDay[]; week_title: string | null }

export async function claimDue(limit = 40): Promise<DueEmail[]> {
  return (await rpc<DueEmail[]>('web_plans_claim', { p_secret: SECRET, p_limit: limit }, 15000)) ?? []
}

export async function unclaim(token: string, day: number) {
  try {
    await rpc('web_plans_unclaim', { p_secret: SECRET, p_token: token, p_day: day })
  } catch (e) {
    console.error('[web_plans] unclaim', e)
  }
}

export async function getPlan(token: string): Promise<SavedPlan | null> {
  if (!TOKEN_RE.test(token)) return null
  try {
    return await rpc<SavedPlan | null>('web_plan_get', { p_token: token })
  } catch (e) {
    console.error('[web_plans] get', e)
    return null
  }
}

export async function markDay(token: string, day: number, read: boolean, feedback: 'helped' | 'not_for_me' | null): Promise<boolean> {
  if (!TOKEN_RE.test(token)) return false
  return !!(await rpc<boolean>('web_plan_mark', { p_token: token, p_day: day, p_read: read, p_feedback: feedback }))
}

export async function unsubscribe(token: string): Promise<boolean> {
  if (!TOKEN_RE.test(token)) return false
  return !!(await rpc<boolean>('web_plan_unsubscribe', { p_token: token }))
}

import { rpc, webPlansConfigured, webSecret } from '@/lib/server/webPlans'
import type { SyncedReading } from '@/lib/readingMerge'

/**
 * Signed-in readers (Supabase project "Wisdom App", supabase/migrations/011_web_reading_and_daily.sql):
 * their Gita progress across devices, and the morning verse email. Same functions-only access as
 * lib/server/webPlans.ts; without WEB_PLANS_SECRET nothing is kept and callers are told.
 */
export const readersConfigured = webPlansConfigured

export async function getReading(uid: string): Promise<unknown | null> {
  return await rpc<unknown | null>('web_reading_get', { p_secret: webSecret(), p_uid: uid })
}

export async function putReading(uid: string, data: SyncedReading): Promise<void> {
  await rpc('web_reading_put', { p_secret: webSecret(), p_uid: uid, p_data: data })
}

export type DailyStatus = 'active' | 'unsubscribed' | 'off'
export const DAILY_TOKEN_RE = /^[0-9a-f]{48}$/

export async function setDaily(p: {
  uid: string
  email?: string | null
  name?: string | null
  tz?: string | null
  lang: 'en' | 'hi'
  on: boolean
  source?: string | null
}): Promise<{ status: DailyStatus; token: string | null }> {
  return await rpc('web_daily_set', {
    p_secret: webSecret(),
    p_uid: p.uid,
    p_email: p.email ?? null,
    p_name: p.name ?? null,
    p_tz: p.tz ?? null,
    p_lang: p.lang,
    p_on: p.on,
    p_source: p.source ?? null,
  })
}

export async function dailyStatus(uid: string): Promise<DailyStatus> {
  return (await rpc<DailyStatus>('web_daily_status', { p_secret: webSecret(), p_uid: uid })) ?? 'off'
}

export type DueDaily = {
  token: string
  uid: string
  email: string
  name: string | null
  lang: 'en' | 'hi'
  local_date: string
  prev_date: string | null
  last_sent_ref: string | null
  last_sent_at: string | null
  reading: unknown | null
}

export async function claimDaily(limit = 40): Promise<DueDaily[]> {
  return (await rpc<DueDaily[]>('web_daily_claim', { p_secret: webSecret(), p_limit: limit }, 15000)) ?? []
}

export async function dailySent(token: string, ref: string) {
  try {
    await rpc('web_daily_sent', { p_secret: webSecret(), p_token: token, p_ref: ref })
  } catch (e) {
    console.error('[web_daily] sent', e)
  }
}

export async function dailyUnclaim(token: string, prev: string | null) {
  try {
    await rpc('web_daily_unclaim', { p_secret: webSecret(), p_token: token, p_prev: prev })
  } catch (e) {
    console.error('[web_daily] unclaim', e)
  }
}

export async function dailyUnsubscribe(token: string): Promise<boolean> {
  if (!DAILY_TOKEN_RE.test(token)) return false
  return Boolean(await rpc<boolean>('web_daily_unsubscribe', { p_token: token }))
}

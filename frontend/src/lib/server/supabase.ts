
/**
 * Minimal Supabase REST client (service role) for the web funnel tables in
 * supabase/migrations/004_web_funnel.sql. Every call is best-effort for leads
 * and strict for entitlements.
 */

const URL_ = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseConfigured = () => Boolean(URL_ && KEY)

async function rest(path: string, init: RequestInit & { prefer?: string } = {}) {
  if (!URL_ || !KEY) throw new Error('supabase_not_configured')
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...(init.prefer ? { Prefer: init.prefer } : {}),
      ...(init.headers || {}),
    },
  })
  if (!res.ok) throw new Error(`supabase ${res.status}: ${await res.text()}`)
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export async function upsertWebUser(row: {
  uid: string
  email?: string
  name?: string
  platform?: string
  feeling?: string
  situation?: string
  source?: string
}) {
  if (!supabaseConfigured()) return
  try {
    await rest('web_users?on_conflict=uid', {
      method: 'POST',
      prefer: 'resolution=merge-duplicates,return=minimal',
      body: JSON.stringify({ ...row, last_seen_at: new Date().toISOString() }),
    })
  } catch (e) {
    console.error('[web_users]', e)
  }
}

export type WebSubscription = {
  uid: string
  email?: string | null
  razorpay_subscription_id: string
  status: string
  current_end?: string | null
}

export async function getSubscription(uid: string): Promise<WebSubscription | null> {
  const rows = (await rest(
    `web_subscriptions?uid=eq.${encodeURIComponent(uid)}&order=updated_at.desc&limit=1`,
  )) as WebSubscription[]
  return rows?.[0] ?? null
}

export async function getSubscriptionById(subId: string): Promise<WebSubscription | null> {
  const rows = (await rest(
    `web_subscriptions?razorpay_subscription_id=eq.${encodeURIComponent(subId)}&limit=1`,
  )) as WebSubscription[]
  return rows?.[0] ?? null
}

export async function saveSubscription(row: WebSubscription) {
  await rest('web_subscriptions?on_conflict=razorpay_subscription_id', {
    method: 'POST',
    prefer: 'resolution=merge-duplicates,return=minimal',
    body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }),
  })
}

/** Active = paid and not past its current period (with a day of grace). */
export function isActive(sub: WebSubscription | null): boolean {
  if (!sub) return false
  if (!['active', 'authenticated'].includes(sub.status)) {
    // Cancelled subscriptions keep access until the paid week ends.
    if (sub.status !== 'cancelled') return false
  }
  if (!sub.current_end) return sub.status !== 'cancelled'
  return new Date(sub.current_end).getTime() + 86_400_000 > Date.now()
}

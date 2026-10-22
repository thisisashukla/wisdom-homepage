import crypto from 'node:crypto'

/**
 * Razorpay Subscriptions over REST (no SDK). The weekly ₹89 plan is created
 * once in the Razorpay dashboard (or with the API) and its id set as
 * RAZORPAY_PLAN_ID.
 */

const KEY_ID = process.env.RAZORPAY_KEY_ID
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

export const razorpayConfigured = () => Boolean(KEY_ID && KEY_SECRET && process.env.RAZORPAY_PLAN_ID)
export const razorpayKeyId = () => KEY_ID || ''

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64')
  const res = await fetch(`https://api.razorpay.com/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`razorpay ${res.status}: ${JSON.stringify(body)}`)
  return body as T
}

export type RzpSubscription = {
  id: string
  status: string
  current_end?: number | null
  notes?: Record<string, string>
}

export function createSubscription(uid: string, email?: string) {
  return api<RzpSubscription>('subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      total_count: 52,
      quantity: 1,
      customer_notify: 1,
      notes: { uid, email: email || '', product: 'wisdom_web_plan_weekly' },
    }),
  })
}

export const fetchSubscription = (id: string) => api<RzpSubscription>(`subscriptions/${encodeURIComponent(id)}`)

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb)
}

/** Checkout handler signature: HMAC_SHA256(payment_id|subscription_id, key_secret). */
export function verifyCheckoutSignature(paymentId: string, subscriptionId: string, signature: string) {
  if (!KEY_SECRET) return false
  const expected = crypto.createHmac('sha256', KEY_SECRET).update(`${paymentId}|${subscriptionId}`).digest('hex')
  return safeEqual(expected, signature)
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  return safeEqual(expected, signature)
}

export const toIso = (unix?: number | null) => (unix ? new Date(unix * 1000).toISOString() : null)

/** Cancel at the end of the current billing cycle (the paid week is honoured). */
export const cancelSubscription = (id: string) =>
  api<RzpSubscription>(`subscriptions/${encodeURIComponent(id)}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ cancel_at_cycle_end: 1 }),
  })

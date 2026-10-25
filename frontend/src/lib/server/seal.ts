import crypto from 'crypto'

/**
 * Sealed plans. The onboarding builds the whole week before the paywall (so
 * the week screen can show it), but only Day 1 and a glimpse of each later day
 * leave the server in the clear. The full week travels back to the browser
 * AES-256-GCM sealed to the signed-in user (uid as associated data), and is
 * opened by /api/start/unseal once their subscription is active. No database
 * row: the person's week lives in their own browser until they pay.
 *
 * Key: WEB_PLAN_SEAL_KEY (any long random string). Falls back to a key derived
 * from the Razorpay or Supabase secret so a missing variable doesn't break
 * checkout; set the dedicated one in production.
 */
function key(): Buffer {
  const secret =
    process.env.WEB_PLAN_SEAL_KEY ||
    process.env.RAZORPAY_KEY_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    (process.env.NODE_ENV !== 'production' ? 'dev-only-seal-key' : '')
  if (!secret) throw new Error('seal_key_missing')
  return crypto.createHash('sha256').update(`wisdom-plan-seal:${secret}`).digest()
}

/**
 * Week 1 is free and is built before sign-in, so the week is sealed to the
 * flow itself rather than to a user; signing in (checked by /api/start/unseal)
 * is what opens it.
 */
export const WEEK_AAD = 'wisdom-start-week-1'

export function seal(data: unknown, uid: string): string {
  const iv = crypto.randomBytes(12)
  const c = crypto.createCipheriv('aes-256-gcm', key(), iv)
  c.setAAD(Buffer.from(uid))
  const body = Buffer.concat([c.update(JSON.stringify({ v: 1, at: Date.now(), data }), 'utf8'), c.final()])
  return Buffer.concat([iv, c.getAuthTag(), body]).toString('base64url')
}

export function unseal<T>(token: string, uid: string, maxAgeMs = 30 * 24 * 3600 * 1000): T | null {
  try {
    const raw = Buffer.from(token, 'base64url')
    const iv = raw.subarray(0, 12)
    const tag = raw.subarray(12, 28)
    const d = crypto.createDecipheriv('aes-256-gcm', key(), iv)
    d.setAAD(Buffer.from(uid))
    d.setAuthTag(tag)
    const out = JSON.parse(Buffer.concat([d.update(raw.subarray(28)), d.final()]).toString('utf8'))
    if (out?.v !== 1 || Date.now() - (out.at ?? 0) > maxAgeMs) return null
    return out.data as T
  } catch {
    return null
  }
}

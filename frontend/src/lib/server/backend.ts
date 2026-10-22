
/** The Wisdom FastAPI backend (same one the iOS app calls). */
export const BACKEND_URL = (
  process.env.WISDOM_API_URL ||
  process.env.BACKEND_URL ||
  'https://wisdom-homepage-2tf6-neon.vercel.app'
).replace(/\/$/, '')

export async function backendPost<T>(path: string, body: unknown, timeoutMs = 25_000): Promise<T> {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`backend ${path} ${res.status}`)
    return (await res.json()) as T
  } finally {
    clearTimeout(t)
  }
}

/** Best-effort fixed-window limiter per key, per server instance. */
const hits = new Map<string, { n: number; reset: number }>()
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const h = hits.get(key)
  if (!h || h.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs })
    if (hits.size > 5000) hits.clear()
    return true
  }
  h.n += 1
  return h.n <= max
}

export function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
}

import crypto from 'node:crypto'

/**
 * Verifies a Firebase Auth ID token (Google sign-in on the website) without
 * the Admin SDK: checks the RS256 signature against Google's published certs
 * and the standard claims. https://firebase.google.com/docs/auth/admin/verify-id-tokens
 */

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'wisdom-homepage'
const CERTS_URL =
  'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

let certCache: { certs: Record<string, string>; expires: number } | null = null

async function getCerts(): Promise<Record<string, string>> {
  if (certCache && certCache.expires > Date.now()) return certCache.certs
  const res = await fetch(CERTS_URL, { cache: 'no-store' })
  if (!res.ok) throw new Error(`certs ${res.status}`)
  const certs = (await res.json()) as Record<string, string>
  const maxAge = Number(/max-age=(\d+)/.exec(res.headers.get('cache-control') || '')?.[1] || 3600)
  certCache = { certs, expires: Date.now() + maxAge * 1000 }
  return certs
}

function b64urlJson(part: string): Record<string, unknown> {
  return JSON.parse(Buffer.from(part, 'base64url').toString('utf8'))
}

export type VerifiedUser = { uid: string; email?: string; name?: string; picture?: string }

export async function verifyFirebaseToken(token: string | null | undefined): Promise<VerifiedUser | null> {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const header = b64urlJson(parts[0]) as { alg?: string; kid?: string }
    const claims = b64urlJson(parts[1]) as Record<string, unknown>
    if (header.alg !== 'RS256' || !header.kid) return null
    const certs = await getCerts()
    const pem = certs[header.kid]
    if (!pem) return null
    const ok = crypto
      .createVerify('RSA-SHA256')
      .update(`${parts[0]}.${parts[1]}`)
      .verify(pem, Buffer.from(parts[2], 'base64url'))
    if (!ok) return null
    const now = Math.floor(Date.now() / 1000)
    if (claims.aud !== PROJECT_ID) return null
    if (claims.iss !== `https://securetoken.google.com/${PROJECT_ID}`) return null
    if (typeof claims.exp !== 'number' || claims.exp < now - 30) return null
    if (typeof claims.iat !== 'number' || claims.iat > now + 300) return null
    if (typeof claims.sub !== 'string' || !claims.sub) return null
    return {
      uid: claims.sub,
      email: typeof claims.email === 'string' ? claims.email : undefined,
      name: typeof claims.name === 'string' ? claims.name : undefined,
      picture: typeof claims.picture === 'string' ? claims.picture : undefined,
    }
  } catch {
    return null
  }
}

export function bearer(req: Request): string | null {
  const h = req.headers.get('authorization') || ''
  return h.toLowerCase().startsWith('bearer ') ? h.slice(7).trim() : null
}

export function isIOSRequest(req: Request): boolean {
  return /iPhone|iPad|iPod/i.test(req.headers.get('user-agent') || '')
}

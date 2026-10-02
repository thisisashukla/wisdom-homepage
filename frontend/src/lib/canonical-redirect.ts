/** Host changes are opt-in so app redirects cannot oppose hosting defaults. */
export function canonicalRedirect(requestUrl: string, host: string, canonical?: string): string | null {
  const url = new URL(requestUrl)
  const hostname = host.split(':')[0]
  const known = hostname === 'wisdomquotes.in' || hostname === 'www.wisdomquotes.in'
  const allowed = canonical === 'wisdomquotes.in' || canonical === 'www.wisdomquotes.in'
  const change = known && allowed && hostname !== canonical
  const trailing = url.pathname.length > 1 && url.pathname.endsWith('/')
  if (!change && !trailing) return null
  if (known) { url.hostname = hostname; url.protocol = 'https:'; url.port = '' }
  if (change) url.hostname = canonical!
  url.pathname = url.pathname.replace(/\/+$/, '') || '/'
  return url.toString()
}

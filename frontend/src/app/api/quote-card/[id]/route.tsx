import { cardFilename, parseOptions, renderQuoteCard, resolveQuote } from '@/lib/quoteCardRender'

// nodejs: we read quote JSON and bundled fonts from disk, and rasterise with resvg (wasm).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LONG_CACHE = 'public, max-age=31536000, s-maxage=31536000, immutable'
// Unversioned URLs can still change when a quote is corrected, so they get a shorter cache.
const SHORT_CACHE = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
const ALLOWED = ['format', 'lang', 'theme', 'v', 'download'] as const

/** The one URL a card may be served from: whitelisted params, valid values, fixed order. */
function canonicalSearch(sp: URLSearchParams): string {
  const opts = parseOptions(sp)
  const out = new URLSearchParams()
  out.set('format', opts.format)
  out.set('lang', opts.lang)
  out.set('theme', opts.theme)
  const v = sp.get('v')
  if (v && /^[a-z0-9]{1,16}$/i.test(v)) out.set('v', v)
  if (sp.get('download') === '1') out.set('download', '1')
  return out.toString()
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const quote = resolveQuote(params.id)
  if (!quote) {
    return new Response('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    })
  }

  const url = new URL(req.url)
  // Unknown params or invalid values would each be cached as a separate render: send them to the canonical URL.
  const canonical = canonicalSearch(url.searchParams)
  const extra = Array.from(url.searchParams.keys()).some((k) => !(ALLOWED as readonly string[]).includes(k))
  if (extra || url.searchParams.toString() !== canonical) {
    return new Response(null, {
      status: 308,
      headers: { Location: `${url.pathname}?${canonical}`, 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    })
  }
  const opts = parseOptions(url.searchParams)
  const versioned = url.searchParams.has('v')
  const download = url.searchParams.get('download') === '1'
  const filename = cardFilename(quote)

  try {
    const png = await renderQuoteCard(quote, opts)
    // Copy into a plain ArrayBuffer-backed view: satisfies BodyInit typing and detaches from wasm memory.
    const body = new Uint8Array(png).buffer as ArrayBuffer
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': String(png.byteLength),
        'Cache-Control': versioned ? LONG_CACHE : SHORT_CACHE,
        'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${filename}"`,
      },
    })
  } catch (err) {
    console.error('[quote-card] render failed', params.id, err)
    return new Response('Render failed', { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}

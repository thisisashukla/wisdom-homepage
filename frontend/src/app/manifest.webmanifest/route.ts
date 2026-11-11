/**
 * Web app manifest, served at /manifest.webmanifest.
 *
 * A route handler (not app/manifest.ts) so the <link rel="manifest"> comes from metadata:
 * the root layout sets `manifest: '/manifest.webmanifest'` and the Dhyaan layout sets
 * `manifest: null`, so dhyaan.wisdomquotes.in links no manifest at all (on that host this
 * path is rewritten into the /dhyaan tree and would 404, and it is not the Wisdom app).
 *
 * Colours: theme = --maroon-deep (#1a0606, same as the viewport themeColor),
 * background = --bg (#120505), from styles/tokens.css.
 * start_url is the home page: the resume card there takes a returning reader
 * back to where they were, in their own language.
 */
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const MANIFEST: MetadataRoute.Manifest = {
  id: '/',
  name: 'Wisdom',
  short_name: 'Wisdom',
  description: 'The Bhagavad Gita verse by verse, in Sanskrit with Hindi and English meaning. A verse for what you are going through.',
  start_url: '/?source=pwa',
  scope: '/',
  display: 'standalone',
  theme_color: '#1a0606',
  background_color: '#120505',
  lang: 'en',
  dir: 'ltr',
  categories: ['books', 'education', 'lifestyle'],
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}

export function GET() {
  return new Response(JSON.stringify(MANIFEST), {
    headers: {
      'content-type': 'application/manifest+json; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

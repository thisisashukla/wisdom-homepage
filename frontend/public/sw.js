/* Wisdom service worker.
 *
 * Does one thing: keeps the last 20 Gita verse pages a reader opened, so they
 * still open without a connection. Verse pages are network first; the saved
 * copy is used only when the network fails (or takes over 6 seconds and a
 * saved copy exists). The site's CSS and font files (hashed, immutable) are kept
 * too, so a saved page looks right offline.
 *
 * Never touched: anything that is not a GET, other origins, /api, /start, and
 * every page that is not a verse page. Bump VERSION to drop all saved copies.
 *
 * Navigation preload is on: the browser starts the network request for a page while this
 * worker starts up, so a verse page never waits on the worker before it begins loading.
 *
 * Decision on JS (stale chunks): /_next/static/chunks/ are deliberately NOT kept. A verse page
 * served from the saved copy (offline, or the network over 6 seconds) shows its full text,
 * Sanskrit, meaning and commentary, because all of that is in the HTML; but if its JS chunks
 * are not in the browser's HTTP cache, or a deploy has replaced them, it does not hydrate, so
 * audio, share and save do not work on that copy until the reader is back online. We accept
 * that: caching chunks would keep old builds' code alive across deploys, which is worse than a
 * read-only offline page. Revisit if offline reading needs the audio player.
 */

const VERSION = 'v1'
const PAGES = 'wq-verses-' + VERSION
const STATIC = 'wq-static-' + VERSION
const MAX_PAGES = 20
const MAX_STATIC = 40
const NETWORK_TIMEOUT_MS = 6000

const VERSE_RE = /^\/(hi\/)?gita\/chapter\/\d{1,2}\/verse\/\d{1,2}\/?$/
const STATIC_RE = /^\/_next\/static\/(css|media)\//
const NEVER_RE = /^\/(api|start)(\/|$)/

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.resolve()
      .then(() => (self.registration.navigationPreload ? self.registration.navigationPreload.enable() : undefined))
      .catch(() => {})
      .then(() => caches.keys())
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('wq-') && k !== PAGES && k !== STATIC).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  let url
  try {
    url = new URL(req.url)
  } catch (e) {
    return
  }
  if (url.origin !== self.location.origin) return
  if (NEVER_RE.test(url.pathname)) return

  if (req.mode === 'navigate' && VERSE_RE.test(url.pathname)) {
    event.respondWith(versePage(req, url, event.preloadResponse))
    return
  }
  if (STATIC_RE.test(url.pathname)) {
    event.respondWith(staticAsset(req))
  }
})

/** One saved copy per verse, whatever the query string. */
function pageKey(url) {
  return url.origin + url.pathname.replace(/\/$/, '')
}

function cacheable(res) {
  return res && res.ok && res.status === 200 && res.type === 'basic' && !res.redirected
}

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  // keys() lists in insertion order: the oldest go first.
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i])
}

async function savePage(key, res) {
  const cache = await caches.open(PAGES)
  // Delete first so this verse moves to the end (most recent).
  await cache.delete(key)
  await cache.put(key, res)
  await trim(PAGES, MAX_PAGES)
}

async function versePage(req, url, preload) {
  const key = pageKey(url)
  const saved = await caches.match(key, { cacheName: PAGES })

  // Use the navigation preload response when the browser made one; else fetch.
  const network = Promise.resolve(preload)
    .catch(() => undefined)
    .then((pre) => pre || fetch(req))
    .then((res) => {
      if (cacheable(res)) {
        const copy = res.clone()
        savePage(key, copy).catch(() => {})
      }
      return res
    })
  // Handled here so a late failure (after the timeout served the saved copy) is not reported as uncaught.
  network.catch(() => {})

  if (!saved) {
    try {
      return await network
    } catch (e) {
      return offlinePage(url)
    }
  }

  // A saved copy exists: prefer the network, but do not leave the reader waiting on a dead line.
  let timer
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve(null), NETWORK_TIMEOUT_MS)
  })
  try {
    const res = await Promise.race([network, timeout])
    clearTimeout(timer)
    // No answer in time, or the server is down: the saved copy reads better than an error page.
    if (!res || res.status >= 500) return saved
    return res
  } catch (e) {
    clearTimeout(timer)
    return saved
  }
}

async function staticAsset(req) {
  const hit = await caches.match(req, { cacheName: STATIC })
  if (hit) return hit
  const res = await fetch(req)
  if (cacheable(res)) {
    const copy = res.clone()
    caches
      .open(STATIC)
      .then((c) => c.put(req, copy))
      .then(() => trim(STATIC, MAX_STATIC))
      .catch(() => {})
  }
  return res
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}

/** Shown when a verse page was never saved and there is no connection: links to the verses that are. */
async function offlinePage(url) {
  const hi = url.pathname.startsWith('/hi/')
  let links = ''
  try {
    const cache = await caches.open(PAGES)
    const keys = await cache.keys()
    links = keys
      .slice()
      .reverse()
      .map((r) => {
        const p = new URL(r.url).pathname
        const m = p.match(/chapter\/(\d+)\/verse\/(\d+)/)
        if (!m) return ''
        const label = (hi ? 'भगवद गीता ' : 'Bhagavad Gita ') + m[1] + '.' + m[2]
        return '<li><a href="' + escapeHtml(p) + '">' + escapeHtml(label) + '</a></li>'
      })
      .join('')
  } catch (e) {
    links = ''
  }
  const t = hi
    ? {
        title: 'अभी इंटरनेट नहीं है',
        body: 'यह श्लोक अभी खुल नहीं पाया। जुड़ते ही दोबारा कोशिश करें।',
        saved: 'ये श्लोक आपने हाल में पढ़े थे, ये बिना इंटरनेट के खुलेंगे:',
        retry: 'फिर से कोशिश करें',
      }
    : {
        title: 'You are offline',
        body: 'This verse could not open just now. Try again once you are connected.',
        saved: 'These verses you read recently open without a connection:',
        retry: 'Try again',
      }
  const html =
    '<!doctype html><html lang="' + (hi ? 'hi' : 'en') + '"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#1a0606">' +
    '<title>' + escapeHtml(t.title) + ' | Wisdom</title>' +
    '<style>body{margin:0;min-height:100vh;background:#120505;color:#f5e8cc;font:16px/1.6 Inter,system-ui,-apple-system,"Noto Sans Devanagari",sans-serif;display:flex;align-items:center;justify-content:center}' +
    'main{max-width:520px;padding:32px 22px}h1{font:600 24px/1.3 "Playfair Display",Georgia,serif;color:#f5c96a;margin:0 0 10px}p{color:rgba(245,232,204,.65);margin:0 0 16px}' +
    'ul{list-style:none;padding:0;margin:0 0 20px}li{border-top:1px solid rgba(200,136,30,.2)}a{display:block;padding:12px 0;color:#f5c96a;text-decoration:none}' +
    'button{min-height:44px;padding:10px 20px;border:1px solid #c8881e;border-radius:10px;background:#c8881e;color:#1a0606;font:600 15px system-ui,sans-serif}</style>' +
    '</head><body><main><h1>' + escapeHtml(t.title) + '</h1><p>' + escapeHtml(t.body) + '</p>' +
    (links ? '<p>' + escapeHtml(t.saved) + '</p><ul>' + links + '</ul>' : '') +
    '<button type="button" onclick="location.reload()">' + escapeHtml(t.retry) + '</button></main></body></html>'
  return new Response(html, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}

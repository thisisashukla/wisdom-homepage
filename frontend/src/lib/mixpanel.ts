import mixpanel from 'mixpanel-browser'

const TOKEN = 'a60badf328213345375f39f3eece4cc4'
let initialised = false

/** Returns true when running on localhost / in development. */
function isDev(): boolean {
  if (typeof window === 'undefined') return false
  return (
    process.env.NODE_ENV !== 'production' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )
}

/** Prefix event names with "dev_" in local/dev so they don't pollute production analytics. */
function prefixEvent(event: string): string {
  return isDev() ? `dev_${event}` : event
}

/**
 * Content funnel a path belongs to, so every event fired on a funnel page
 * (Page Viewed, Scroll Depth, Link Clicked, Section Viewed, ...) can be
 * segmented without each component passing it. Returns null for core pages.
 */
const FUNNEL_PREFIXES: [RegExp, string][] = [
  [/^\/(hi\/)?ramayana(\/|$)/, 'ramayana'],
  [/^\/(hi\/)?hanuman-chalisa(\/|$)/, 'hanuman-chalisa'],
  [/^\/hanuman-jayanti-\d{4}(\/|$)/, 'hanuman-chalisa'],
  [/^\/(hi\/)?mahabharata(\/|$)/, 'mahabharata'],
  [/^\/(hi\/)?upanishads?(\/|$)/, 'upanishads'],
  [/^\/(hi\/)?ashtavakra-gita/, 'other-gitas'],
  [/^\/gitas(\/|$)/, 'other-gitas'],
  [/^\/(hi\/)?(vivekananda-quotes|kabir-dohe-in-english|kabir-ke-dohe|chanakya-niti)(\/|$)/, 'sayings'],
  [/^\/(hi\/)?ram-shalaka(\/|$)/, 'ram-shalaka'],
]

export function funnelForPath(path: string | undefined | null): string | null {
  if (!path) return null
  for (const [re, name] of FUNNEL_PREFIXES) if (re.test(path)) return name
  return null
}

/** Adds funnel + locale from the current URL unless the caller already set them. */
function withContext(props?: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...(props ?? {}) }
  if (typeof window === 'undefined') return out
  const path = window.location.pathname
  if (out.funnel === undefined || out.funnel === null) {
    const f = funnelForPath(path)
    if (f) out.funnel = f
  }
  if (out.path === undefined) out.path = path
  if (out.locale === undefined) out.locale = path === '/hi' || path.startsWith('/hi/') ? 'hi' : 'en'
  return out
}

export function initMixpanel() {
  if (initialised || typeof window === 'undefined') return
  mixpanel.init(TOKEN, {
    track_pageview: false,
    persistence: 'localStorage',
    ignore_dnt: true,
  })
  initialised = true
}

export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  initMixpanel()
  try {
    mixpanel.track(prefixEvent(event), withContext(props))
  } catch {
    // noop
  }
}

/** Same as trackEvent, but sent with sendBeacon so it survives the page being closed. */
export function trackEventBeacon(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  initMixpanel()
  try {
    mixpanel.track(prefixEvent(event), withContext(props), { transport: 'sendBeacon' })
  } catch {
    // noop
  }
}

export function trackPageViewed(page: string, path?: string) {
  trackEvent('Page Viewed', { page, path: path ?? (typeof window !== 'undefined' ? window.location.pathname : undefined) })
}

const APP_STORE_HOST = 'apps.apple.com'

export function trackLinkClick(page: string, location: string, href: string) {
  if (typeof window === 'undefined') return
  initMixpanel()
  try {
    const isAppStore = href.includes(APP_STORE_HOST)
    const eventName = isAppStore ? 'App Store Button Clicked' : 'Link Clicked'
    // sendBeacon survives same-tab navigation; track() over XHR can be cancelled.
    mixpanel.track(
      prefixEvent(eventName),
      withContext({ page, location, href, is_app_store: isAppStore }),
      { transport: 'sendBeacon' }
    )
  } catch {
    // noop
  }
}

/** @deprecated Use trackLinkClick which auto-detects App Store vs internal links. */
export function trackAppStoreClick(page: string, location: string, href: string) {
  trackLinkClick(page, location, href)
}

export { mixpanel }

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
    mixpanel.track(prefixEvent(event), props)
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
      { page, location, href, is_app_store: isAppStore },
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

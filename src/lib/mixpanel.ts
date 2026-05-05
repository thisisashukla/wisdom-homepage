import mixpanel from 'mixpanel-browser'

const TOKEN = 'a60badf328213345375f39f3eece4cc4'
let initialised = false

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
  try {
    mixpanel.track(event, props)
  } catch {
    // noop
  }
}

export function trackPageViewed(page: string, path?: string) {
  trackEvent('Page Viewed', { page, path: path ?? (typeof window !== 'undefined' ? window.location.pathname : undefined) })
}

export function trackAppStoreClick(page: string, location: string, href: string) {
  if (typeof window === 'undefined') return
  try {
    // sendBeacon survives same-tab navigation; track() over XHR can be cancelled.
    mixpanel.track(
      'App Store Button Clicked',
      { page, location, href },
      { transport: 'sendBeacon' }
    )
  } catch {
    // noop
  }
}

export { mixpanel }

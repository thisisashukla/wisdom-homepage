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

export function trackAppStoreClick(location: string, page: string, href: string) {
  trackEvent('App Store Link Clicked', { location, page, href })
}

export { mixpanel }

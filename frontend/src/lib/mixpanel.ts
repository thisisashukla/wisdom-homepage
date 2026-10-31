import mixpanel from 'mixpanel-browser'
import { EVENTS, isEventName, type EventName } from './analytics/events'
import { localeForPath } from './locale'

export { EVENTS, type EventName } from './analytics/events'

const TOKEN = 'a60badf328213345375f39f3eece4cc4'
let initialised = false

/**
 * The one place that decides whether an event is a dev event. Dev: any non-production
 * build, localhost / LAN hosts, Vercel preview deployments, or NEXT_PUBLIC_MIXPANEL_ENV=dev.
 * Dev events are sent with a "dev_" prefix so they never mix with production numbers.
 */
export function isDevTraffic(): boolean {
  if (typeof window === 'undefined') return false
  if (process.env.NEXT_PUBLIC_MIXPANEL_ENV === 'dev') return true
  if (process.env.NODE_ENV !== 'production') return true
  const h = window.location.hostname
  return h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local') || /^192\.168\./.test(h) || h.endsWith('.vercel.app')
}

/** The name actually sent to Mixpanel for a registry event ("dev_" prefixed for dev traffic). */
export function wireEventName(event: EventName): string {
  return isDevTraffic() ? `dev_${event}` : event
}

/**
 * Funnel a path belongs to, so every event (Page Viewed, Scroll Depth, Link Clicked,
 * Section Viewed, ...) can be segmented without each component passing it.
 * Returns null for pages outside any funnel (about, legal, search).
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
  // Original Gita funnels
  [/^\/(hi\/)?reading-plans(\/|$)/, 'reading-plans'],
  [/^\/(hi\/)?gita-for(\/|$)/, 'gita-for'],
  [/^\/(gita-jayanti|read-gita-in-18-days|most-searched-gita-verses-\d{4})(\/|$)/, 'gita-seasonal'],
  [/^\/(hi\/)?gita(\/|$)/, 'gita-reader'],
  [/^\/(hi\/)?blogs(\/|$)/, 'blog'],
  [/^\/start(\/|$)/, 'start'],
  [/^\/app(\/|$)/, 'app-page'],
  [/^\/(hi)?$/, 'home'],
]

export function funnelForPath(path: string | undefined | null): string | null {
  if (!path) return null
  for (const [re, name] of FUNNEL_PREFIXES) if (re.test(path)) return name
  return null
}

/** Current page name, set by <PageTracker> (BlogTracker) so components never pass `page` around. */
let currentPage: string | null = null
export function setPageContext(page: string | null) {
  currentPage = page
}

/** Adds page, funnel, locale and path from the current page unless the caller set them. */
function withContext(props?: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...(props ?? {}) }
  if (typeof window === 'undefined') return out
  const path = window.location.pathname
  if ((out.page === undefined || out.page === null) && currentPage) out.page = currentPage
  if (out.funnel === undefined || out.funnel === null) {
    const f = funnelForPath(path)
    if (f) out.funnel = f
  }
  if (out.path === undefined) out.path = path
  if (out.locale === undefined) out.locale = localeForPath(path)
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

function send(event: EventName, props: Record<string, unknown> | undefined, beacon: boolean) {
  if (typeof window === 'undefined') return
  initMixpanel()
  try {
    mixpanel.track(wireEventName(event), withContext(props), beacon ? { transport: 'sendBeacon' } : undefined)
  } catch {
    // noop
  }
}

/** Send a registry event. Page, funnel, locale and path are added automatically. */
export function trackEvent(event: EventName, props?: Record<string, unknown>) {
  send(event, props, false)
}

/** Same as trackEvent, sent with sendBeacon so it survives the page being closed (taps that navigate away). */
export function trackEventBeacon(event: EventName, props?: Record<string, unknown>) {
  send(event, props, true)
}

/** Short aliases. */
export const track = trackEvent
export const trackBeacon = trackEventBeacon

/**
 * For event names that arrive as strings at runtime (data-mp-event attributes).
 * Unknown names are dropped, with a console warning in dev, so the registry stays the only source.
 */
export function trackDynamic(name: string, props?: Record<string, unknown>, beacon = false) {
  if (!isEventName(name)) {
    if (isDevTraffic()) console.warn(`[mixpanel] "${name}" is not in lib/analytics/events.ts; not sent`)
    return
  }
  send(name, props, beacon)
}

export function trackPageViewed(page: string, path?: string) {
  setPageContext(page)
  trackEvent(EVENTS.PageViewed, { page, path: path ?? (typeof window !== 'undefined' ? window.location.pathname : undefined) })
}

const APP_STORE_HOST = 'apps.apple.com'

export function trackLinkClick(page: string | null, location: string, href: string, extra?: Record<string, unknown>) {
  const isAppStore = href.includes(APP_STORE_HOST)
  // sendBeacon survives same-tab navigation; track() over XHR can be cancelled.
  send(isAppStore ? EVENTS.AppStoreButtonClicked : EVENTS.LinkClicked, { ...(page ? { page } : {}), location, href, is_app_store: isAppStore, ...extra }, true)
}

/** @deprecated Use trackLinkClick which auto-detects App Store vs internal links. */
export function trackAppStoreClick(page: string, location: string, href: string) {
  trackLinkClick(page, location, href)
}

/** Profile properties on the identified person (people.increment / set_once / set), through the one Mixpanel entry point. */
export function updateProfile(p: { increment?: Record<string, number>; setOnce?: Record<string, unknown>; set?: Record<string, unknown> }) {
  if (typeof window === 'undefined') return
  initMixpanel()
  try {
    if (p.increment) mixpanel.people.increment(p.increment)
    if (p.setOnce) mixpanel.people.set_once(p.setOnce)
    if (p.set) mixpanel.people.set(p.set)
  } catch {
    // not ready
  }
}

export { mixpanel }

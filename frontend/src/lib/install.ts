/**
 * Add to home screen (Android Chrome) and the service worker.
 *
 * - initInstall(): call once on every page (components/install/PwaRoot does it, once the
 *   page is idle). Adopts the `beforeinstallprompt` event the inline head script
 *   (lib/installBoot.ts) held since first paint, keeps catching later ones (so Chrome's
 *   own mini bar stays quiet and we choose the moment), listens for `appinstalled`
 *   (sends App Installed once), and counts visits.
 * - registerServiceWorker(): registers /sw.js in production on the main host.
 * - promptInstall(): shows Chrome's install dialog from a tap.
 *
 * Nothing here runs on the server; every function is safe to call there.
 */

import { detectPlatform } from '@/lib/app'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { readRaw, writeRaw } from '@/lib/storage'
import { INSTALL_BOOT_KEY } from '@/lib/installBoot'

export type BeforeInstallPromptEvent = Event & {
  readonly platforms?: string[]
  prompt: () => Promise<void>
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform?: string }>
}

export type InstallOutcome = 'accepted' | 'dismissed' | 'unavailable'

const VISITS_KEY = 'wq_visits'
const VISIT_SESSION_KEY = 'wq_visit_counted'
const SNOOZE_KEY = 'wq_install_snooze_until'
const INSTALLED_KEY = 'wq_pwa_installed'
export const INSTALL_SNOOZE_DAYS = 14
/** The prompt appears from this visit on. */
export const INSTALL_MIN_VISIT = 2

const isBrowser = () => typeof window !== 'undefined'

/**
 * Paths where the install card never shows: the onboarding flow and the app page (which has
 * its own install button). Matched as a prefix.
 */
export const INSTALL_EXCLUDE = ['/start', '/app']

export const installExcluded = (path: string | null | undefined): boolean =>
  INSTALL_EXCLUDE.some((p) => path === p || (path ?? '').startsWith(`${p}/`))

/**
 * Another bar fixed to the bottom of the screen is showing: the docked Play-All player,
 * the verse navigator (when not tucked away) or the quote LineBar. The install card waits.
 */
export function bottomBarVisible(): boolean {
  if (!isBrowser()) return false
  const els = document.querySelectorAll<HTMLElement>('.rd-player--docked, .gv-versenav:not([data-hidden]), .qbar')
  for (const el of Array.from(els)) {
    if (el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden') return true
  }
  return false
}

function session(): Storage | null {
  try {
    return isBrowser() ? window.sessionStorage : null
  } catch {
    return null
  }
}
function setItem(s: Storage | null, k: string, v: string) {
  try {
    s?.setItem(k, v)
  } catch {
    // storage full or blocked
  }
}

/* ── platform ─────────────────────────────────────────────────────── */

export function isAndroid(): boolean {
  return detectPlatform() === 'android'
}

export function isIOS(): boolean {
  return detectPlatform() === 'ios'
}

/** Chrome on Android, not an in-app browser or WebView, and not Edge, Opera, Samsung Internet, Firefox, UC, Yandex or another browser that sends its own UA token. */
export function isAndroidChrome(): boolean {
  if (!isBrowser() || !isAndroid()) return false
  const ua = navigator.userAgent || ''
  if (!/Chrome\/\d+/.test(ua)) return false
  if (/; wv\)|\bwv\b|Version\/\d/.test(ua)) return false
  if (/EdgA|OPR|OPT\/|SamsungBrowser|Firefox|UCBrowser|YaBrowser|MiuiBrowser|HeyTapBrowser|VivoBrowser|FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|GSA\//.test(ua)) return false
  return true
}

/** Already opened from the home screen. */
export function isStandalone(): boolean {
  if (!isBrowser()) return false
  try {
    if (window.matchMedia('(display-mode: standalone)').matches) return true
    if (window.matchMedia('(display-mode: minimal-ui)').matches) return true
  } catch {
    // old browser
  }
  return (navigator as Navigator & { standalone?: boolean }).standalone === true
}

/* ── visits and snooze ────────────────────────────────────────────── */

/** Visits so far, this one included (a visit = a browser session). */
export function visitCount(): number {
  const n = Number(readRaw(VISITS_KEY) ?? 0)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
}

/** Counts this session once. Returns the visit number. */
export function countVisit(): number {
  const s = session()
  if (s?.getItem(VISIT_SESSION_KEY)) return visitCount()
  const n = visitCount() + 1
  writeRaw(VISITS_KEY, String(n))
  setItem(s, VISIT_SESSION_KEY, '1')
  return n
}

export function isSnoozed(): boolean {
  const until = Number(readRaw(SNOOZE_KEY) ?? 0)
  return Number.isFinite(until) && until > Date.now()
}

export function snoozeInstall(days = INSTALL_SNOOZE_DAYS): void {
  writeRaw(SNOOZE_KEY, String(Date.now() + days * 86_400_000))
}

export function wasInstalled(): boolean {
  return readRaw(INSTALLED_KEY) === '1'
}

/** Android Chrome, not installed or opened from the home screen, not snoozed, second visit or later. */
export function installEligible(): boolean {
  return !isIOS() && isAndroidChrome() && !isStandalone() && !wasInstalled() && !isSnoozed() && visitCount() >= INSTALL_MIN_VISIT
}

/* ── beforeinstallprompt / appinstalled ───────────────────────────── */

let deferred: BeforeInstallPromptEvent | null = null
let initialised = false
const listeners = new Set<(available: boolean) => void>()

function notify() {
  const a = deferred !== null
  listeners.forEach((fn) => {
    try {
      fn(a)
    } catch {
      // a listener's problem
    }
  })
}

/** Idempotent. Safe on the server (does nothing). */
export function initInstall(): void {
  if (!isBrowser() || initialised) return
  initialised = true
  countVisit()
  // Adopt an offer the inline head script (lib/installBoot.ts) caught before hydration.
  const early = (window as unknown as Record<string, unknown>)[INSTALL_BOOT_KEY] as BeforeInstallPromptEvent | undefined
  if (early) {
    deferred = early
    ;(window as unknown as Record<string, unknown>)[INSTALL_BOOT_KEY] = undefined
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    // Keep Chrome's mini bar quiet; we offer the install ourselves (InstallPrompt, AppButtonForPlatform).
    e.preventDefault()
    deferred = e as BeforeInstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    writeRaw(INSTALLED_KEY, '1')
    trackEvent(EVENTS.AppInstalled, { method: 'pwa', visit: visitCount() })
    notify()
  })
}

/** True when Chrome has offered an install we can show from a tap. */
export function canInstall(): boolean {
  return deferred !== null
}

/** Subscribe to install availability. Returns the unsubscribe function. */
export function onInstallAvailability(fn: (available: boolean) => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

/** Opens Chrome's install dialog. Must be called from a tap. The event can be used once. */
export async function promptInstall(): Promise<InstallOutcome> {
  const e = deferred
  if (!e) return 'unavailable'
  deferred = null
  notify()
  try {
    await e.prompt()
    const choice = await e.userChoice
    return choice.outcome === 'accepted' ? 'accepted' : 'dismissed'
  } catch {
    return 'unavailable'
  }
}

/* ── service worker ───────────────────────────────────────────────── */

/**
 * Registers /sw.js (scope /) after the page has loaded. Production only, main
 * host only (the Dhyaan subdomain is served by the same app and is left alone).
 */
export function registerServiceWorker(): void {
  if (!isBrowser() || !('serviceWorker' in navigator)) return
  if (process.env.NODE_ENV !== 'production') return
  const host = window.location.hostname
  if (host.startsWith('dhyaan.')) return
  if (window.location.protocol !== 'https:' && host !== 'localhost') return
  const go = () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // unsupported or blocked: the site works the same without it
    })
  }
  if (document.readyState === 'complete') go()
  else window.addEventListener('load', go, { once: true })
}

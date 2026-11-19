/**
 * When the sign-in card (components/account/SigninCard) comes up: for a reader who has stayed longer
 * than most, measured in engaged time (lib/analytics/engagedClock).
 *
 *   page     engaged seconds on this page reach its funnel's threshold below
 *   session  engaged seconds across the visit reach SESSION_SEC (catches verse-by-verse readers, who
 *            spend a little on each page and a lot in all)
 *
 * Thresholds sit near the 75th percentile of engaged_sec on "Page Left" per funnel (Mixpanel,
 * 12 to 19 Nov 2026, 1,564 page leaves; all pages: median 27 s, mean 62 s, p75 62 s, p90 145 s),
 * never below 45 s. Re-check them once a few weeks of Page Left data have built up.
 *
 * At most once a visit; "Not now" or close snoozes it for SNOOZE_DAYS. Never for a signed-in reader,
 * never on the paths in EXCLUDED (their own sign-in, a ritual, or an unsubscribe confirmation).
 */

import { funnelForPath } from '@/lib/mixpanel'
import { readRaw, writeRaw } from '@/lib/storage'

export const PAGE_SEC: Record<string, number> = {
  home: 60,
  'gita-reader': 60,
  'learning-path': 45,
  search: 45,
  blog: 120,
  'gita-for': 130,
  'reading-plans': 80,
  'gita-seasonal': 45,
  'app-compare': 70,
  ramayana: 70,
  mahabharata: 120,
  upanishads: 140,
  'other-gitas': 180,
  sayings: 60,
  'hanuman-chalisa': 50,
}
export const DEFAULT_PAGE_SEC = 75
export const SESSION_SEC = 180
/** Idle longer than this and the clock stops (the reader walked away with the tab open). */
export const IDLE_MS = 30_000
export const SNOOZE_DAYS = 7

const EXCLUDED = /^\/(hi\/)?(start|plan|login|dhyaan|ram-shalaka|app|daily|privacy|terms)(\/|$)/

const SNOOZE_KEY = 'wq_signin_snooze'
const SHOWN_KEY = 'wq_signin_shown'
const SESSION_KEY = 'wq_engaged_session'

export const nudgeExcluded = (path: string) => EXCLUDED.test(path)

export function pageThreshold(path: string): number {
  const f = funnelForPath(path)
  return (f && PAGE_SEC[f]) || DEFAULT_PAGE_SEC
}

/** Reader pages say "keep your place"; everything else leads with the morning verse. */
export const nudgeVariant = (path: string): 'place' | 'morning' =>
  /^(gita-reader|learning-path)$/.test(funnelForPath(path) || '') ? 'place' : 'morning'

const session = (): Storage | null => {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function snoozed(): boolean {
  const t = Number(readRaw(SNOOZE_KEY) || 0)
  return t > 0 && Date.now() - t < SNOOZE_DAYS * 86_400_000
}
export const snooze = () => writeRaw(SNOOZE_KEY, String(Date.now()))

export const shownThisVisit = () => session()?.getItem(SHOWN_KEY) === '1'
export function markShown() {
  try {
    session()?.setItem(SHOWN_KEY, '1')
  } catch {}
}

/** Engaged seconds across this visit (kept in sessionStorage so page changes don't reset it). */
export function sessionEngaged(): number {
  return Number(session()?.getItem(SESSION_KEY) || 0)
}
export function addSessionSecond(): number {
  const n = sessionEngaged() + 1
  try {
    session()?.setItem(SESSION_KEY, String(n))
  } catch {}
  return n
}

'use client'

/**
 * Engaged time on a page: seconds the tab was visible while the reader was active
 * (scroll, touch, pointer, key, or audio playing) in the last IDLE_MS.
 *
 * Mixpanel times a session from its first event to its last, so a reader who stays on one page
 * without scrolling counts as 0 s. These events fix that:
 *   Page Engaged { engaged_sec, max_scroll_pct, page_view_id } at 15, 60 and 180 s
 *   Page Left    { engaged_sec, max_scroll_pct, page_view_id } when the tab is hidden or the page
 *                changes. Sent again with the running total if the reader comes back, so take the
 *                max engaged_sec per page_view_id.
 * Automated browsers rarely produce visible, active time, so engaged time is also the cleanest
 * filter for bots.
 */

import { useEffect } from 'react'
import { EVENTS, trackEvent, trackEventBeacon } from '@/lib/mixpanel'
import { startEngagedClock } from './engagedClock'

const MILESTONES = [15, 60, 180] as const
const IDLE_MS = 120_000

const newId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

function scrollPct(): number {
  const total = document.documentElement.scrollHeight
  if (total <= window.innerHeight) return 100
  return Math.min(100, Math.round(((window.scrollY + window.innerHeight) / total) * 100))
}

export function useEngagedTime(pageName: string, pathname: string | null) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const pageViewId = newId()
    let maxScroll = scrollPct()
    let leftAt = -1
    const fired = new Set<number>()

    const clock = startEngagedClock((engaged) => {
      for (const m of MILESTONES) {
        if (engaged >= m && !fired.has(m)) {
          fired.add(m)
          trackEvent(EVENTS.PageEngaged, { ...props(), milestone: m })
        }
      }
    }, IDLE_MS)
    const props = () => ({ page: pageName, path: pathname, engaged_sec: clock.engaged(), max_scroll_pct: maxScroll, page_view_id: pageViewId })

    const onScroll = () => {
      const p = scrollPct()
      if (p > maxScroll) maxScroll = p
    }
    const sendLeft = () => {
      const engaged = clock.engaged()
      if (engaged === 0 || engaged === leftAt) return
      leftAt = engaged
      trackEventBeacon(EVENTS.PageLeft, props())
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') sendLeft()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', sendLeft)

    return () => {
      sendLeft()
      clock.stop()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', sendLeft)
    }
  }, [pageName, pathname])
}

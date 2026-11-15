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

const MILESTONES = [15, 60, 180] as const
const IDLE_MS = 120_000

const newId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

function scrollPct(): number {
  const total = document.documentElement.scrollHeight
  if (total <= window.innerHeight) return 100
  return Math.min(100, Math.round(((window.scrollY + window.innerHeight) / total) * 100))
}

const audioPlaying = () => Array.from(document.querySelectorAll('audio')).some((a) => !a.paused && !a.ended)

export function useEngagedTime(pageName: string, pathname: string | null) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const pageViewId = newId()
    let engaged = 0
    let maxScroll = scrollPct()
    let lastActive = Date.now()
    let leftAt = -1
    const fired = new Set<number>()

    const props = () => ({ page: pageName, path: pathname, engaged_sec: engaged, max_scroll_pct: maxScroll, page_view_id: pageViewId })

    const onActive = () => {
      lastActive = Date.now()
    }
    const onScroll = () => {
      lastActive = Date.now()
      const p = scrollPct()
      if (p > maxScroll) maxScroll = p
    }

    const tick = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      if (Date.now() - lastActive > IDLE_MS && !audioPlaying()) return
      engaged += 1
      for (const m of MILESTONES) {
        if (engaged >= m && !fired.has(m)) {
          fired.add(m)
          trackEvent(EVENTS.PageEngaged, { ...props(), milestone: m })
        }
      }
    }, 1000)

    const sendLeft = () => {
      if (engaged === 0 || engaged === leftAt) return
      leftAt = engaged
      trackEventBeacon(EVENTS.PageLeft, props())
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') sendLeft()
      else onActive()
    }

    const opts = { passive: true } as const
    window.addEventListener('scroll', onScroll, opts)
    window.addEventListener('pointerdown', onActive, opts)
    window.addEventListener('pointermove', onActive, opts)
    window.addEventListener('touchstart', onActive, opts)
    window.addEventListener('keydown', onActive)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', sendLeft)

    return () => {
      sendLeft()
      window.clearInterval(tick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', onActive)
      window.removeEventListener('pointermove', onActive)
      window.removeEventListener('touchstart', onActive)
      window.removeEventListener('keydown', onActive)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', sendLeft)
    }
  }, [pageName, pathname])
}

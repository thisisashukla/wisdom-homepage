'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageViewed, trackLinkClick, trackEvent } from '@/lib/mixpanel'

interface BlogTrackerProps {
  /** Page identifier used as the `page` attribution property on every event. */
  pageName: string
}

/** Scroll depth milestones to fire (percent of page height scrolled past). */
const SCROLL_MILESTONES = [25, 50, 75, 90] as const

export function BlogTracker({ pageName }: BlogTrackerProps) {
  const pathname = usePathname()

  // ── Page Viewed ────────────────────────────────────────────────────────────
  useEffect(() => {
    trackPageViewed(pageName, pathname)
  }, [pageName, pathname])

  // ── Link Click tracking (a[data-mp-location]) ──────────────────────────────
  // Also handles optional data-mp-event for a dedicated event name and
  // data-mp-props (JSON string) for extra properties on that event.
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[data-mp-location]')

    const handleLinkClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement
      const location = link.getAttribute('data-mp-location') || 'unknown'
      const href = link.getAttribute('href') || ''

      // Standard link / App Store click
      trackLinkClick(pageName, location, href)

      // Optional dedicated event — e.g. data-mp-event="Path Selected"
      const customEventName = link.getAttribute('data-mp-event')
      if (customEventName) {
        let extraProps: Record<string, unknown> = {}
        try {
          const raw = link.getAttribute('data-mp-props')
          if (raw) extraProps = JSON.parse(raw)
        } catch {
          // ignore malformed JSON
        }
        trackEvent(customEventName, { page: pageName, location, href, ...extraProps })
      }
    }

    links.forEach((link) => link.addEventListener('click', handleLinkClick))
    return () => {
      links.forEach((link) => link.removeEventListener('click', handleLinkClick))
    }
  }, [pageName])

  // ── Scroll Depth ───────────────────────────────────────────────────────────
  // Fires "Scroll Depth" once per milestone per page load.
  // Uses a passive scroll listener; checks on scroll + immediately on mount
  // in case the page is shorter than expected.
  useEffect(() => {
    const fired = new Set<number>()

    const check = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (total <= window.innerHeight) return // page doesn't scroll
      const pct = (scrolled / total) * 100

      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !fired.has(milestone)) {
          fired.add(milestone)
          trackEvent('Scroll Depth', {
            page: pageName,
            path: pathname,
            depth_pct: milestone,
          })
        }
      }
    }

    // Check once immediately (catches short pages / already-scrolled restores)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [pageName, pathname])

  // ── Section Viewed (IntersectionObserver) ──────────────────────────────────
  // Any element with data-mp-section="<name>" fires "Section Viewed" once when
  // at least 40% of it enters the viewport. Useful for impression tracking on
  // the quiz, inline verse card, Today's Verse card, etc.
  useEffect(() => {
    const sectionEls = document.querySelectorAll<HTMLElement>('[data-mp-section]')
    if (!sectionEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = (entry.target as HTMLElement).dataset.mpSection ?? 'unknown'
            trackEvent('Section Viewed', { page: pageName, section })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pageName])

  return null
}

export default BlogTracker

'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { EVENTS, trackPageViewed, trackLinkClick, trackEvent, trackEventBeacon, trackDynamic, funnelForPath, setPageContext } from '@/lib/mixpanel'

interface BlogTrackerProps {
  /**
   * Page name sent as `page` on every event from this page, Title Case, e.g.
   * "Hanuman Chalisa Line". Components on the page read it from the analytics
   * context, so they never pass `page` themselves.
   */
  pageName: string
}

/** Scroll depth milestones to fire (percent of page height scrolled past). */
const SCROLL_MILESTONES = [25, 50, 75, 90] as const

export function BlogTracker({ pageName }: BlogTrackerProps) {
  const pathname = usePathname()

  // ── Page Viewed ────────────────────────────────────────────────────────────
  useEffect(() => {
    trackPageViewed(pageName, pathname)
    return () => setPageContext(null)
  }, [pageName, pathname])

  // ── Link Click tracking (a[data-mp-location]) ──────────────────────────────
  // Delegated, so links rendered after mount (menus, sheets, client lists) count too.
  // Optional data-mp-event names a registry event to send as well, with data-mp-props (JSON).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>('a[data-mp-location]')
      if (!link) return
      const location = link.getAttribute('data-mp-location') || 'unknown'
      const href = link.getAttribute('href') || ''
      trackLinkClick(pageName, location, href)
      const customEventName = link.getAttribute('data-mp-event')
      if (customEventName) {
        let extraProps: Record<string, unknown> = {}
        try {
          const raw = link.getAttribute('data-mp-props')
          if (raw) extraProps = JSON.parse(raw)
        } catch {
          // ignore malformed JSON
        }
        trackDynamic(customEventName, { page: pageName, location, href, ...extraProps }, true)
      }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pageName])

  // ── Catch-all link tracking ────────────────────────────────────────────────
  // On every page that belongs to a funnel (see funnelForPath), any link without its own tracking
  // (data-mp-location, or data-mp-tracked for links that fire their own event)
  // still sends "Link Clicked" with the section it sat in and what kind of
  // link it was, so share, /start, Gita bridge and cross-links are measurable.
  useEffect(() => {
    const funnel = funnelForPath(pathname)
    if (!funnel) return

    const sectionOf = (a: HTMLElement): string => {
      const tagged = a.closest<HTMLElement>('[data-mp-section]')
      if (tagged?.dataset.mpSection) return tagged.dataset.mpSection
      const landmark = a.closest('header, nav, footer')
      if (landmark) return landmark.tagName.toLowerCase()
      const sec = a.closest<HTMLElement>('section[id], [id]')
      if (sec?.id) return sec.id
      const cls = a.closest<HTMLElement>('section')?.className.split(' ')[0]
      return cls || 'body'
    }

    const linkType = (href: string): string => {
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com|whatsapp\.com\/channel)/.test(href)) return 'whatsapp'
      if (href.includes('apps.apple.com') || href.includes('play.google.com')) return 'app_store'
      if (/^(mailto|tel):/.test(href)) return 'contact'
      if (/^https?:\/\//.test(href) && !href.includes('wisdomquotes') && !href.startsWith(window.location.origin)) return 'external'
      const path = href.replace(window.location.origin, '')
      if (path.startsWith('#')) return 'anchor'
      if (/^\/(hi\/)?start/.test(path)) return 'start'
      if (/^\/(hi\/)?gita(\/|$|\?)/.test(path)) return 'gita_bridge'
      const target = funnelForPath(path.split(/[?#]/)[0])
      if (target === funnel) return 'internal_funnel'
      if (target) return 'cross_funnel'
      return 'internal'
    }

    // FAQ items and marked disclosures: count user opens only (a click on the
    // summary while closed), never a details that starts open.
    const onSummary = (target: HTMLElement): boolean => {
      const summary = target.closest('summary')
      const details = summary?.parentElement
      if (!summary || !details || details.tagName !== 'DETAILS' || (details as HTMLDetailsElement).open) return false
      const text = (summary.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120)
      if (/faq/i.test(details.className) || details.getAttribute('data-track') === 'faq') {
        trackEvent(EVENTS.FaqOpened, { page: pageName, question: details.getAttribute('data-q') || text, section: sectionOf(details) })
        return true
      }
      const name = details.getAttribute('data-mp-disclosure')
      if (name) {
        trackEvent(EVENTS.DisclosureOpened, { page: pageName, disclosure: name, label: text })
        return true
      }
      return false
    }

    const onClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && onSummary(event.target)) return
      const a = (event.target as HTMLElement | null)?.closest?.('a')
      if (!a) return
      if (a.hasAttribute('data-mp-location') || a.hasAttribute('data-mp-tracked')) return
      const href = a.getAttribute('href') || ''
      if (!href || href === '#') return
      const type = linkType(href)
      const location = `auto_${sectionOf(a)}`
      if (type === 'app_store') {
        trackLinkClick(pageName, location, href)
        return
      }
      trackEventBeacon(EVENTS.LinkClicked, {
        page: pageName,
        path: pathname,
        location,
        href,
        link_type: type,
        link_text: (a.textContent || '').trim().slice(0, 80),
        auto: true,
        is_app_store: false,
      })
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pageName, pathname])

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
          trackEvent(EVENTS.ScrollDepth, {
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
            trackEvent(EVENTS.SectionViewed, { page: pageName, section })
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

/** Preferred name: every page mounts one <PageTracker pageName="..." />. */
export const PageTracker = BlogTracker

export default BlogTracker

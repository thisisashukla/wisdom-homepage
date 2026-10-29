'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

type Tab = { id: string; label: string; count: number }

/**
 * Filter tabs for /reading-plans. Cards stay in the HTML; this only hides the ones outside the tab.
 * Also tracks the hub:
 *   Reading Plans Viewed     {variant, referrer_host, utm_*}
 *   Reading Plan Card Seen   card 50% in view, once each {theme, position, variant}  (denominator for card CTR;
 *                            clicks arrive as "Reading Plan Card Clicked" via BlogTracker)
 *   Reading Plans Filter     {tab}
 */
export default function PlanFilterTabs({ tabs, total, variant }: { tabs: Tab[]; total: number; variant: 'in' | 'global' }) {
  const [active, setActive] = useState('all')

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    let refHost = ''
    try {
      refHost = document.referrer ? new URL(document.referrer).hostname : ''
    } catch {
      /* bad referrer */
    }
    trackEvent('Reading Plans Viewed', {
      page: 'Reading Plans',
      variant,
      referrer_host: refHost || 'direct',
      utm_source: qs.get('utm_source'),
      utm_medium: qs.get('utm_medium'),
      utm_campaign: qs.get('utm_campaign'),
    })
    const seen = new Set<string>()
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.rp-card[data-theme]'))
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement
          const theme = el.dataset.theme!
          if (!e.isIntersecting || seen.has(theme)) continue
          seen.add(theme)
          trackEvent('Reading Plan Card Seen', { page: 'Reading Plans', theme, position: cards.indexOf(el) + 1, variant })
        }
      },
      { threshold: 0.5 },
    )
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [variant])

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.rp-card[data-group]').forEach((el, i) => {
      const show = active === 'all' || el.dataset.group === active
      el.classList.toggle('is-hidden', !show)
      el.style.setProperty('--n', String(i))
    })
  }, [active])

  const pick = (id: string) => {
    setActive(id)
    trackEvent('Reading Plans Filter', { page: 'Reading Plans', tab: id, variant })
  }

  const all: Tab[] = [{ id: 'all', label: 'All plans', count: total }, ...tabs]
  return (
    <div className="rp-tabs" role="tablist" aria-label="Filter reading plans">
      {all.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          className={`rp-tab${active === t.id ? ' is-on' : ''}`}
          onClick={() => pick(t.id)}
        >
          {t.label}
          <span className="rp-tab-n">{t.count}</span>
        </button>
      ))}
    </div>
  )
}

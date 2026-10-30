'use client'

/**
 * Funnel events from server-rendered markup:
 * - any element with data-fx-event="<Event Name>" and optional data-fx-props='{"k":"v"}' fires on click
 *   (Verse Nav Clicked, Gita Bridge Tapped);
 * - <details data-fx-day="3"> fires Plan Day Opened when opened.
 * Every event carries { funnel, page, locale }.
 */
import { useEffect } from 'react'
import { trackEvent, trackEventBeacon } from '@/lib/mixpanel'

export default function FxEvents({ page }: { page: string }) {
  useEffect(() => {
    const base = { funnel: 'other-gitas', page, locale: 'en' }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const el = target?.closest?.('[data-fx-event]') as HTMLElement | null
      if (!el || !el.dataset.fxEvent) return
      let props: Record<string, unknown> = {}
      try {
        props = JSON.parse(el.dataset.fxProps || '{}')
      } catch {
        props = {}
      }
      trackEventBeacon(el.dataset.fxEvent, { ...base, ...props })
    }
    const onToggle = (e: Event) => {
      const d = e.target
      if (!(d instanceof HTMLDetailsElement) || !d.open || !d.dataset.fxDay) return
      trackEvent('Plan Day Opened', { ...base, day: Number(d.dataset.fxDay) })
    }
    document.addEventListener('click', onClick)
    document.addEventListener('toggle', onToggle, true)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('toggle', onToggle, true)
    }
  }, [page])
  return null
}

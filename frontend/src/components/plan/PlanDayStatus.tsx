'use client'

import { useEffect, useState } from 'react'
import { markRangeRead, rangeReadCount, subscribeReading } from '@/lib/readingProgress'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Span } from '@/lib/readingPlans'
import { PLAN_DAY_EVENT, type PlanDayDetail } from './VerseMap'

/**
 * One day's progress in a length plan: how many of its verses this reader has read on the site,
 * "Mark as read" for days read elsewhere (a printed copy, the app), and "Show on the map".
 * Renders nothing until localStorage has been read, so the server HTML stays the same for everyone.
 */
export default function PlanDayStatus({ plan, day, spans, map = true }: { plan: string; day: number; spans: Span[]; map?: boolean }) {
  const total = spans.reduce((n, s) => n + s.to - s.from + 1, 0)
  const [read, setRead] = useState<number | null>(null)
  const [justDone, setJustDone] = useState(false)

  useEffect(() => {
    const count = () => setRead(spans.reduce((n, s) => n + rangeReadCount(s.ch, s.from, s.to), 0))
    count()
    return subscribeReading(count)
  }, [spans])

  const done = read !== null && read >= total

  const markDone = () => {
    spans.forEach((s) => markRangeRead(s.ch, s.from, s.to))
    setJustDone(true)
    trackEvent(EVENTS.PlanDayCompleted, { plan, day, position: day, method: 'button' })
  }

  const show = () => {
    trackEvent(EVENTS.PlanDaySelected, { plan, day, position: day, method: 'list' })
    window.dispatchEvent(new CustomEvent<PlanDayDetail>(PLAN_DAY_EVENT, { detail: { plan, day } }))
    document.getElementById('verse-map')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
  }

  return (
    <div className="rpl-status">
      {read !== null && (done || read > 0) && (
        <span className={`rpl-count${done ? ' is-done' : ''}${justDone ? ' is-new' : ''}`} aria-live="polite">
          {done ? 'Read' : `${read} of ${total} read`}
        </span>
      )}
      {read !== null && !done && (
        <button type="button" className="sx-btn sx-btn--link sx-btn--sm rpl-mark" onClick={markDone}>
          Mark as read
        </button>
      )}
      {map && (
        <button type="button" className="sx-btn sx-btn--link sx-btn--sm rpl-show" onClick={show}>
          Show on the map
        </button>
      )}
    </div>
  )
}

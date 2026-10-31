'use client'

import { useEffect } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'

/** Fires Plan Day Opened when a reader opens a <details data-plan-day> on the plan page. */
export default function PlanTracker() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLDetailsElement>('details[data-plan-day]'))
    const handlers = els.map((el) => {
      const h = () => {
        if (el.open) trackEvent(EVENTS.PlanDayOpened, { item_type: 'plan_day', position: Number(el.dataset.planDay), day: Number(el.dataset.planDay) })
      }
      el.addEventListener('toggle', h)
      return () => el.removeEventListener('toggle', h)
    })
    return () => handlers.forEach((off) => off())
  }, [])
  return null
}

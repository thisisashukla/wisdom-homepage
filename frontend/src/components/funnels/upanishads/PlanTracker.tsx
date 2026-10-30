'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/quotes-shared'
import { upTrack } from './track'

/** Fires "Plan Day Opened" when a reader opens a <details data-plan-day> on the plan page. */
export default function PlanTracker({ page, locale }: { page: string; locale: Locale }) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLDetailsElement>('details[data-plan-day]'))
    const handlers = els.map((el) => {
      const h = () => {
        if (el.open) upTrack('Plan Day Opened', page, locale, { day: Number(el.dataset.planDay) })
      }
      el.addEventListener('toggle', h)
      return () => el.removeEventListener('toggle', h)
    })
    return () => handlers.forEach((off) => off())
  }, [page, locale])
  return null
}

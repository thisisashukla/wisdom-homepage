'use client'

import type { ReactNode } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'

/** One morning of the plan as a native disclosure; opening it sends Plan Day Opened { day }. */
export default function DayDetails({ day, open, className, children }: { day: number; open?: boolean; className?: string; children: ReactNode }) {
  return (
    <details
      className={className}
      open={open}
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open) trackEvent(EVENTS.PlanDayOpened, { day, item_id: `day-${day}`, item_type: 'plan_day', position: day })
      }}
    >
      {children}
    </details>
  )
}

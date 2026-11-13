'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { readJSON, writeJSON } from '@/lib/storage'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { PLAN_DAY_EVENT, type PlanDayDetail } from './VerseMap'

const KEY = 'wq_verse_a_day'
type Store = { start: string }

const todayIso = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const dayNumber = (start: string, total: number) => {
  const [y, m, d] = start.split('-').map(Number)
  const s = new Date(y, m - 1, d).getTime()
  const t = new Date(todayIso().replace(/-/g, '/')).getTime()
  const n = Math.floor((t - s) / 86400000) + 1
  return Math.min(Math.max(n, 1), total + 1)
}

/**
 * "Today in your month" for the verse-a-day plan. Keeps the start date on this device; shows the
 * day's card (rendered on the server for every day, picked here) and rings it on the verse map.
 * Before a start it offers "Start today"; after day 30 it offers to start again.
 */
export default function DailyToday({ plan, total, cards }: { plan: string; total: number; cards: ReactNode[] }) {
  const [day, setDay] = useState<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const s = readJSON<Store | null>(KEY, null)
    if (s?.start) setDay(dayNumber(s.start, total))
    setReady(true)
  }, [total])

  useEffect(() => {
    if (day && day <= total) window.dispatchEvent(new CustomEvent<PlanDayDetail>(PLAN_DAY_EVENT, { detail: { plan, day } }))
  }, [day, plan, total])

  const start = () => {
    writeJSON(KEY, { start: todayIso() })
    setDay(1)
    trackEvent(EVENTS.DailyPlanStarted, { plan, item_id: plan, position: 1 })
  }

  if (!ready) return <div className="rpl-today rpl-today--wait" aria-hidden="true" />

  if (!day) {
    // First visit: give day 1 now, and offer to keep the month going from today.
    return (
      <div className="rpl-today rpl-today--start">
        <p className="rpl-today-k">Day 1 of {total}</p>
        {cards[0]}
        <button type="button" className="sx-btn sx-btn--primary" onClick={start} data-mp-tracked>
          Start my month today
        </button>
        <p className="rpl-today-first">Come back tomorrow and this page opens on day 2. It remembers on this device, with no sign-in.</p>
      </div>
    )
  }

  if (day > total) {
    return (
      <div className="rpl-today rpl-today--start">
        <p className="rpl-today-k">You finished the month</p>
        <p className="rpl-today-line">Thirty mornings, done. Start again from day 1, or read the whole Gita next.</p>
        <button type="button" className="sx-btn sx-btn--primary" onClick={start} data-mp-tracked>
          Start again today
        </button>
      </div>
    )
  }

  return (
    <div className="rpl-today" key={day}>
      <p className="rpl-today-k">
        Today is day {day} of {total}
      </p>
      {cards[day - 1]}
      <div className="rpl-today-nav">
        <a className="sx-btn sx-btn--link sx-btn--sm" href={`#day-${day}`}>
          See it in the month
        </a>
        <button
          type="button"
          className="sx-btn sx-btn--link sx-btn--sm"
          onClick={() => {
            writeJSON(KEY, { start: todayIso() })
            setDay(1)
            trackEvent(EVENTS.DailyPlanStarted, { plan, item_id: plan, position: 1, method: 'restart' })
          }}
        >
          Restart from day 1
        </button>
      </div>
    </div>
  )
}

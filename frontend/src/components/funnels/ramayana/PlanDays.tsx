'use client'

import { useEffect, useRef } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { LineView } from '@/lib/funnels/ramayana/types'
import LineVerse from './LineVerse'

/** One morning of the plan, with its line already in view form (the page builds these on the server). */
export type PlanDayView = {
  day: number
  title: string
  why: string
  todo: string
  bridge?: string
  /** Bhagavad Gita day (the last three). */
  gita: boolean
  /** Short reference shown in the closed row. */
  src: string
  chapter?: number
  verse?: number
  line: LineView
}

/** Seven mornings as native <details>, so every day reads without JS. Day 1 starts open. */
export default function PlanDays({ days }: { days: PlanDayView[] }) {
  // Some browsers fire "toggle" for a <details open> as the page loads; only count opens after that.
  const ready = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => (ready.current = true), 600)
    return () => clearTimeout(t)
  }, [])
  return (
    <ol className="rl-plan">
      {days.map((d) => (
        <li key={d.day} id={`day-${d.day}`} className={`rl-day${d.gita ? ' rl-day-gita' : ''}`}>
          <details
            open={d.day === 1}
            onToggle={(e) => {
              if (ready.current && (e.currentTarget as HTMLDetailsElement).open)
                trackEvent(EVENTS.PlanDayOpened, { position: d.day, item_id: d.line.id, item_type: d.gita ? 'verse' : 'line', source: d.line.text })
            }}
          >
            <summary>
              <span className="rl-day-n">Day {d.day}</span>
              <span className="rl-day-title">{d.title}</span>
              <span className="rl-day-src">{d.src}</span>
            </summary>
            <div className="rl-day-body">
              <p className="rl-day-why">{d.why}</p>
              <LineVerse line={d.line} locale="en" showId={!d.gita} toggle={d.day === 1} />
              <p className="rl-day-todo">
                <span className="rl-day-todo-k">Today</span> {d.todo}
              </p>
              {d.gita && d.line.href && (
                <p className="rl-day-more">
                  <a className="sx-link" href={d.line.href} data-mp-location={`plan_day_${d.day}_gita`}>
                    Read Bhagavad Gita {d.chapter}.{d.verse} with word meanings
                  </a>
                </p>
              )}
              {d.bridge && <p className="rl-day-bridge">{d.bridge}</p>}
            </div>
          </details>
        </li>
      ))}
    </ol>
  )
}

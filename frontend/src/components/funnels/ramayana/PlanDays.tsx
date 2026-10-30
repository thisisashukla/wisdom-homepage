'use client'

import { useEffect, useRef } from 'react'
import type { PlanDay } from '@/lib/funnels/ramayana/types'
import { lineViewClient } from './lineViewClient'
import { trackFunnel } from '@/lib/funnels/ramayana/track'
import LineBlock from './LineBlock'

/** Seven mornings as native <details>, so every day reads without JS. Day 1 starts open. */
export default function PlanDays({ days, page }: { days: PlanDay[]; page: string }) {
  // Some browsers fire "toggle" for a <details open> as the page loads; only count opens after that.
  const ready = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => (ready.current = true), 600)
    return () => clearTimeout(t)
  }, [])
  return (
    <ol className="rl-plan">
      {days.map((d) => {
        const v = lineViewClient(d.verse)
        const gita = d.verse.text === 'bg'
        return (
          <li key={d.day} id={`day-${d.day}`} className={`rl-day${gita ? ' rl-day-gita' : ''}`}>
            <details
              open={d.day === 1}
              onToggle={(e) => {
                if (ready.current && (e.currentTarget as HTMLDetailsElement).open) trackFunnel('Plan Day Opened', { page, locale: 'en' }, { day: d.day, source: d.verse.text })
              }}
            >
              <summary>
                <span className="rl-day-n">Day {d.day}</span>
                <span className="rl-day-title">{d.title}</span>
                <span className="rl-day-src">{gita ? d.verse.ref.en : d.verse.refShort.en}</span>
              </summary>
              <div className="rl-day-body">
                <p className="rl-day-why">{d.why}</p>
                <LineBlock line={v} locale="en" showId={!gita} />
                <p className="rl-day-todo">
                  <span className="rl-day-todo-k">Today</span> {d.todo}
                </p>
                {gita && v.href && (
                  <p className="rl-day-more">
                    <a className="rl-gold" href={v.href} data-mp-location={`plan_day_${d.day}_gita`}>
                      Read Bhagavad Gita {d.verse.chapter}.{d.verse.verse} with word meanings
                    </a>
                  </p>
                )}
                {d.bridge && <p className="rl-day-bridge">{d.bridge}</p>}
              </div>
            </details>
          </li>
        )
      })}
    </ol>
  )
}

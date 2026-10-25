'use client'

import React, { useEffect, useState } from 'react'

export type RunDay = {
  chapter: number
  title: string
  name: string
  verses: number
  /** ISO date, YYYY-MM-DD */
  date: string
  href: string
}

const fmt = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return {
    weekday: dt.toLocaleDateString('en-GB', { weekday: 'short' }),
    day: dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
  }
}

const localIso = () => {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}

/** The 18-day reading run. Marks today's chapter once the page knows the reader's date. */
export default function ChapterRun({ days }: { days: RunDay[] }) {
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => setToday(localIso()), [])

  return (
    <ol className="gj-run">
      {days.map((d) => {
        const f = fmt(d.date)
        const state = !today ? '' : d.date === today ? 'today' : d.date < today ? 'past' : ''
        const last = d.chapter === 18
        return (
          <li key={d.chapter} className={`gj-run-day${state ? ` is-${state}` : ''}${last ? ' is-last' : ''}`}>
            <a href={d.href} data-mp-location={`gita_jayanti_run_ch${d.chapter}`}>
              <span className="gj-run-date">
                {f.weekday} {f.day}
                {state === 'today' && <em> · today</em>}
                {last && <em> · Jayanti</em>}
              </span>
              <span className="gj-run-ch">Chapter {d.chapter}</span>
              <span className="gj-run-title">{d.title}</span>
              <span className="gj-run-meta">
                {d.name} · {d.verses} verses
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}

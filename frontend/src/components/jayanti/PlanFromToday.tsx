'use client'

import React, { useEffect, useState } from 'react'
import { daysIncl } from './jayantiDate'

type Ch = { number: number; verses: number }

const SEC_EN = 10

/** Splits the 700 verses evenly across the days left until Jayanti, from the reader's today. */
function buildPlan(chapters: Ch[], days: number) {
  const refs: [number, number][] = []
  chapters.forEach((c) => {
    for (let v = 1; v <= c.verses; v++) refs.push([c.number, v])
  })
  const out: { from: [number, number]; to: [number, number]; count: number }[] = []
  let i = 0
  for (let d = 0; d < days; d++) {
    const left = refs.length - i
    const take = Math.ceil(left / (days - d))
    if (take <= 0) break
    out.push({ from: refs[i], to: refs[i + take - 1], count: take })
    i += take
  }
  return out
}

const dayLabel = (offset: number) => {
  const t = new Date()
  t.setDate(t.getDate() + offset)
  return t.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function PlanFromToday({ chapters }: { chapters: Ch[] }) {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => setDays(daysIncl(new Date())), [])

  if (days === null) {
    return <p className="gjg-today-line">Working out the days left from your date…</p>
  }
  if (days === 0) {
    return (
      <p className="gjg-today-line">
        Gita Jayanti 2026 has passed. The 18-day plan works any time of year:{' '}
        <a href="/read-gita-in-18-days">read a chapter a day</a>.
      </p>
    )
  }

  const plan = buildPlan(chapters, days)
  const per = Math.ceil(700 / days)
  const min = Math.max(1, Math.ceil((per * SEC_EN) / 60))

  return (
    <div className="gjg-today">
      <p className="gjg-today-line">
        {days === 1 ? (
          <>Today is Gita Jayanti. All 700 verses in one day is about two hours of reading in English.</>
        ) : (
          <>
            You have <strong>{days} days</strong>, counting today. That is about <strong>{per} verses a day</strong>,
            or {min} minutes of reading in English.
          </>
        )}
      </p>
      <details className="gjg-today-table">
        <summary>See every day of your plan</summary>
        <ol>
          {plan.map((p, i) => (
            <li key={i}>
              <span className="gjg-today-date">{i === 0 ? 'Today' : dayLabel(i)}</span>
              <a href={`/gita/chapter/${p.from[0]}/verse/${p.from[1]}`} data-mp-location="jayanti_plan_from_today_day">
                {p.from[0]}.{p.from[1]} to {p.to[0]}.{p.to[1]}
              </a>
              <span className="gjg-today-count">{p.count} verses</span>
            </li>
          ))}
        </ol>
      </details>
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'

/**
 * Counts down to the start of 20 December 2026 in the reader's own time zone
 * (a festival date, so it turns over at local midnight). Three states:
 * before the day, on the day, after it.
 */
const START = { y: 2026, m: 11, d: 20 } // month is 0-based

function parts(now: number) {
  const start = new Date(START.y, START.m, START.d).getTime()
  const end = new Date(START.y, START.m, START.d + 1).getTime()
  if (now >= end) return { state: 'after' as const, d: 0, h: 0, m: 0, s: 0 }
  if (now >= start) return { state: 'today' as const, d: 0, h: 0, m: 0, s: 0 }
  let diff = Math.floor((start - now) / 1000)
  const d = Math.floor(diff / 86400)
  diff -= d * 86400
  const h = Math.floor(diff / 3600)
  diff -= h * 3600
  const m = Math.floor(diff / 60)
  const s = diff - m * 60
  return { state: 'before' as const, d, h, m, s }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function JayantiCountdown({ serverNow }: { serverNow: number }) {
  const [now, setNow] = useState(serverNow)

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const p = parts(now)

  if (p.state === 'today') {
    return (
      <div className="gj-count gj-count--today" role="status">
        <div className="gj-glow" aria-hidden="true" />
        <p className="gj-today-line">Today is Gita Jayanti.</p>
        <p className="gj-today-sub">Read a chapter, or one verse, before the day ends.</p>
      </div>
    )
  }

  if (p.state === 'after') {
    return (
      <div className="gj-count gj-count--after" role="status">
        <p className="gj-today-line">Gita Jayanti was on 20 December.</p>
        <p className="gj-today-sub">The chapters are still here, a day at a time.</p>
      </div>
    )
  }

  return (
    <div className="gj-count" aria-label={`${p.d} days, ${p.h} hours and ${p.m} minutes to Gita Jayanti`}>
      <div className="gj-glow" aria-hidden="true" />
      <div className="gj-days">
        <span className="gj-days-num" suppressHydrationWarning>{p.d}</span>
        <span className="gj-days-label">{p.d === 1 ? 'day' : 'days'}</span>
      </div>
      <div className="gj-rule" aria-hidden="true" />
      <div className="gj-hms" aria-hidden="true">
        <span><b suppressHydrationWarning>{pad(p.h)}</b> hours</span>
        <span className="gj-dot">·</span>
        <span><b suppressHydrationWarning>{pad(p.m)}</b> min</span>
        <span className="gj-dot">·</span>
        <span className="gj-sec"><b suppressHydrationWarning>{pad(p.s)}</b> sec</span>
      </div>
    </div>
  )
}

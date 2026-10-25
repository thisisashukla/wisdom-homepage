'use client'

import React, { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { Cta, Hero } from './parts'
import { haptic, reducedMotion } from './motion'

/**
 * Curating your plan (wisdom/app/screens/onboarding/Ob05_FindingScreen.tsx).
 * Three steps tick through while the backend works. While step 1 spins, the
 * answers they gave fly into its card one by one (portraits, feeling, their
 * note); step 2 counts through the library; while step 3 spins, Day 1 to Day 7
 * light up one by one under it, and it finishes once the verse and the week are
 * in (the request waits for the week, up to a cap). Each step holds a minimum
 * beat so the progression reads. Then "Show me my plan": the week, Day 1 sealed.
 */
export type FindChip = { key: string; src?: string; text?: string; icon?: 'quote'; label: string }
type Status = 'waiting' | 'active' | 'done' | 'failed'

const STEP_MIN = [1500, 1900, 1300]
const CHIP_STAGGER = 170
const DAY_STAGGER = 240
const WEEK = [0, 1, 2, 3, 4, 5, 6]
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const fmt = (n: number) => n.toLocaleString('en-US')

export default function FindingScreen({
  chips,
  hasNote,
  request,
  onRetry,
  onDone,
}: {
  chips: FindChip[]
  hasNote: boolean
  request: Promise<{ ok: boolean; mirror?: string | null; library?: { verses?: number; prasangs?: number } | null }>
  onRetry: () => void
  onDone: () => void
}) {
  const [status, setStatus] = useState<Status[]>(['waiting', 'waiting', 'waiting'])
  const [count, setCount] = useState(0)
  const [ready, setReady] = useState(false)
  const [mirror, setMirror] = useState<string | null>(null)
  const [lib, setLib] = useState({ verses: 1743, prasangs: 462 })
  const [flying, setFlying] = useState(false)
  const run = useRef(0)

  useEffect(() => {
    const me = ++run.current
    const alive = () => run.current === me
    const set = (i: number, s: Status) => setStatus((p) => p.map((x, k) => (k === i ? s : x)))
    const motion = !reducedMotion()
    ;(async () => {
      setReady(false)
      setStatus(['waiting', 'waiting', 'waiting'])
      await sleep(motion ? 800 : 0)
      if (!alive()) return
      set(0, 'active')
      setFlying(true)
      await sleep(Math.max(STEP_MIN[0], 320 + chips.length * CHIP_STAGGER + 480))
      if (!alive()) return
      set(0, 'done'); haptic()
      set(1, 'active')
      const total = 1743
      const t0 = performance.now()
      const counter = () => {
        if (!alive()) return
        const k = Math.min(1, (performance.now() - t0) / (STEP_MIN[1] - 100))
        setCount(Math.round(total * (1 - Math.pow(1 - k, 3))))
        if (k < 1) requestAnimationFrame(counter)
      }
      requestAnimationFrame(counter)
      await sleep(STEP_MIN[1])
      if (!alive()) return
      set(1, 'done'); haptic()
      set(2, 'active')
      if (motion) WEEK.forEach((k) => setTimeout(() => { if (alive()) haptic(3) }, 180 + k * DAY_STAGGER))
      const daysMs = motion ? WEEK.length * DAY_STAGGER + 320 : 0
      const [r] = await Promise.all([request.catch(() => ({ ok: false } as { ok: boolean; mirror?: string | null; library?: null })), sleep(Math.max(STEP_MIN[2], daysMs))])
      if (!alive()) return
      if (r.library?.verses) setLib({ verses: r.library.verses, prasangs: r.library.prasangs ?? 462 })
      setMirror(r.mirror ?? null)
      if (r.ok) { set(2, 'done'); haptic(20) } else set(2, 'failed')
      setReady(true)
    })()
    return () => { run.current++ }
  }, [request, chips.length])

  const failed = status[2] === 'failed'
  const steps = [
    { title: 'Reading what you told us', detail: status[0] === 'done' && mirror ? mirror : hasNote ? 'Your answers and your own words' : 'Everything you told us' },
    { title: 'Searching the library', detail: status[1] === 'waiting' ? 'Gita, Upanishads, Ramayana and more' : `${fmt(count)} verses  ·  ${fmt(lib.prasangs)} stories` },
    {
      title: 'Choosing your week',
      detail: failed ? "We couldn't reach the library. Check your connection and try again."
        : status[2] === 'done' ? 'Ready: one verse for each morning'
        : status[2] === 'active' ? 'A verse for each day of your week'
        : 'Seven days, one verse each morning',
    },
  ]

  return (
    <>
      <Hero title="Choosing" accent="your week." sub="This takes a few seconds." />
      <div className="ob-steps" aria-live="polite">
        {steps.map((s, i) => {
          const st = status[i]
          return (
            <div key={i} className={`ob-step ob-card-in is-${st}`} style={{ '--d': `${320 + i * 100}ms` } as React.CSSProperties}>
              <span className="ob-mark" aria-hidden="true">
                <span className={`ob-mark-ring${i === 0 && st === 'done' ? ' is-absorb' : ''}`} />
                {st === 'active' && <span className="ob-mark-arc" />}
                {st === 'done' && <span className="ob-mark-done"><Icon name="check" weight="bold" size={16} /></span>}
                {st === 'failed' && <span className="ob-mark-done is-failed">!</span>}
              </span>
              <span className="ob-step-words">
                <span className="ob-step-title">{s.title}</span>
                {i === 0 && chips.length > 0 && (
                  <span className="ob-chips" aria-label={`Your answers: ${chips.map((c) => c.label).filter(Boolean).join(', ')}`}>
                    {chips.map((c, k) => (
                      <span
                        key={c.key}
                        className={`ob-chip${flying ? ' is-in' : ''}`}
                        style={{ '--d': `${k * CHIP_STAGGER}ms`, '--x': `${((k % 3) - 1) * 24}px`, '--r': `${(k % 2 ? 1 : -1) * 14}deg`, zIndex: k } as React.CSSProperties}
                      >
                        {c.src ? <img src={c.src} alt="" width={36} height={36} /> : c.icon ? <Icon name="quote" size={16} /> : <b>{c.text}</b>}
                      </span>
                    ))}
                  </span>
                )}
                {i === 2 && st !== 'waiting' && st !== 'failed' && (
                  <span className="ob-find-days" aria-label={st === 'done' ? 'Days 1 to 7, ready' : 'Days 1 to 7, being curated'}>
                    {WEEK.map((k) => (
                      <span key={k} className="ob-find-slot">
                        <span className={`ob-find-day${k === WEEK.length - 1 ? ' is-story' : ''}`} style={{ '--d': `${k * DAY_STAGGER}ms` } as React.CSSProperties}>
                          <i>Day</i><b>{k + 1}</b>
                        </span>
                      </span>
                    ))}
                  </span>
                )}
                <span className="ob-step-detail">{s.detail}</span>
              </span>
            </div>
          )
        })}
      </div>
      {ready ? <Cta onClick={() => (failed ? onRetry() : onDone())}>{failed ? 'Try again' : 'Show me my plan'}</Cta> : <div className="ob-foot-space" aria-hidden="true" />}
    </>
  )
}

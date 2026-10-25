'use client'

import React, { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { Cta } from './parts'
import { haptic, reducedMotion } from './motion'

/**
 * Your first week (wisdom/app/screens/onboarding/Ob07_PlanScreen.tsx), shown
 * straight after "Curating your plan": a gold thread through seven days in
 * three movements (see it, steady it, act on it). Every day is sealed, Day 1
 * too: today's marker breathes and its card says "Ready"; each day shows how
 * its verse begins, then frosted glass draws over the rest and the lock stamps
 * down. Day 7 is the payoff: the story, on the plum card. The list scrolls
 * itself to the end; a touch hands control back. "Reveal my first verse" opens
 * Day 1 under sand (VerseScreen).
 */
export type PreviewDay = { day: number; beat: string; phase: string; ref: string | null; line: string | null }

const WEEK_SHAPE = ['hook', 'diagnose', 'steady', 'steady', 'act', 'act', 'story']
const PHASE_OF: Record<string, string> = { hook: 'see', diagnose: 'see', steady: 'steady', act: 'act', story: 'story' }
const PHASE_LABEL: Record<string, string> = { see: 'See it', steady: 'Steady it', act: 'Act on it', story: 'Someone lived it' }
const BEAT_LABEL: Record<string, string> = { hook: 'Where you are', diagnose: "What's underneath", steady: 'What steadies you', act: 'What to do', story: 'A story' }
// Today, Tomorrow, then just the day number: a day opens once the one before it is read,
// so weekdays would promise dates the plan doesn't keep.
const dayName = (k: number) => (k === 0 ? 'Today' : k === 1 ? 'Tomorrow' : `Day ${k + 1}`)
const showsNumber = (k: number) => k < 2
const STAGGER = 180
const SEAL_DELAY = 420
const SCROLL_SPEED = 150
const LAST = 6

/** A held-back line (the app's Veiled): the first words read clearly, the rest under frosted glass. */
function Veiled({ text, lead = 3 }: { text: string; lead?: number }) {
  const words = text.split(/\s+/).filter(Boolean)
  const n = Math.max(0, Math.min(lead, words.length - 2))
  const shown = words.slice(0, n).join(' ')
  const rest = words.slice(n).join(' ')
  return (
    <p className="ob-day-line ob-veiled">
      {shown && <span>{shown} </span>}
      <span className="ob-veil" aria-hidden="true">{rest}</span>
    </p>
  )
}

export default function WeekScreen({
  preview,
  hookLine,
  hookRef,
  weekTitle,
  cta,
  onDone,
}: {
  preview: PreviewDay[] | null
  hookLine: string | null
  hookRef: string | null
  weekTitle: string | null
  cta: string
  onDone: () => void
}) {
  const days = WEEK_SHAPE.map((_, k) => preview?.find((d) => d.day === k + 1) ?? null)
  const beats = WEEK_SHAPE.map((b, k) => days[k]?.beat ?? b)
  const storyAt = beats.lastIndexOf('story')
  const [shown, setShown] = useState<boolean[]>(() => WEEK_SHAPE.map(() => reducedMotion()))
  const [sealed, setSealed] = useState<boolean[]>(() => WEEK_SHAPE.map(() => reducedMotion()))
  const [thread, setThread] = useState(reducedMotion() ? 1 : 0)
  const scroller = useRef<HTMLDivElement>(null)
  const steps = useRef<(HTMLDivElement | null)[]>([])
  const nextAt = useRef(0)
  const queued = useRef<boolean[]>(WEEK_SHAPE.map(() => false))
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const auto = useRef({ on: false, raf: 0 })
  const byHand = useRef(false)
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)) }

  const reveal = (k: number) => {
    if (queued.current[k]) return
    queued.current[k] = true
    const now = Date.now()
    const wait = Math.max(0, nextAt.current - now) + (k === LAST ? STAGGER * 0.6 : 0)
    nextAt.current = now + wait + STAGGER
    later(() => {
      const top = steps.current[k]?.offsetTop ?? 0
      const end = steps.current[LAST]?.offsetTop ?? 1
      setThread(Math.min(1, top / Math.max(1, end)))
      setShown((s) => s.map((x, i) => (i === k ? true : x)))
      later(() => {
        setSealed((s) => s.map((x, i) => (i === k ? true : x)))
        haptic(k === LAST ? 12 : 4)
      }, SEAL_DELAY + (k === 0 ? 0 : 180))
    }, wait)
  }

  const check = () => {
    const sc = scroller.current
    if (!sc) return
    const bottom = sc.getBoundingClientRect().bottom
    for (let k = 0; k < WEEK_SHAPE.length; k++) {
      if (queued.current[k]) continue
      const el = steps.current[k]
      if (!el) return
      if (el.getBoundingClientRect().top + 64 < bottom) reveal(k)
      else return
    }
  }

  const stopAuto = () => { auto.current.on = false; cancelAnimationFrame(auto.current.raf) }
  const takeOver = () => { byHand.current = true; stopAuto() }
  useEffect(() => {
    if (reducedMotion()) return
    const START = 800
    later(check, START)
    later(() => {
      const sc = scroller.current
      if (!sc || byHand.current) return
      auto.current.on = true
      let last = 0
      let y = sc.scrollTop
      const tickFn = (t: number) => {
        if (!auto.current.on) return
        const dt = last ? Math.min(0.05, (t - last) / 1000) : 0
        last = t
        const max = sc.scrollHeight - sc.clientHeight
        y = Math.min(max, y + SCROLL_SPEED * dt)
        sc.scrollTop = y
        check()
        if (y >= max && queued.current[LAST]) { auto.current.on = false; return }
        auto.current.raf = requestAnimationFrame(tickFn)
      }
      auto.current.raf = requestAnimationFrame(tickFn)
    }, START + STAGGER * 3)
    return () => { stopAuto(); timers.current.forEach(clearTimeout); timers.current = [] }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="ob-scroll" ref={scroller} onScroll={check} onPointerDown={takeOver} onWheel={takeOver} onTouchStart={takeOver}>
        <div className="ob-hero">
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise ob-fit" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span>Your next</span>
            <em>seven days</em>
          </h1>
          <p className="ob-sub ob-rise" style={{ '--d': '180ms' } as React.CSSProperties}>
            One verse each morning: see it, steady it, act on it. Day 1 is ready to open.
          </p>
          {weekTitle && (
            <p className="ob-week-chip ob-rise" style={{ '--d': '320ms' } as React.CSSProperties}>
              <b>Week 1</b><i /><span>{weekTitle}</span>
            </p>
          )}
        </div>
        <div className="ob-timeline">
          <span className="ob-thread-line" style={{ transform: `scaleY(${thread})` }} aria-hidden="true" />
          {days.map((d, k) => {
            const phase = PHASE_OF[beats[k]] ?? 'see'
            const opens = phase !== 'story' && (k === 0 || PHASE_OF[beats[k - 1]] !== phase)
            const isStory = k === storyAt
            const today = k === 0
            const text = today ? hookLine ?? d?.line ?? null : d?.line ?? null
            const ref = today ? hookRef ?? d?.ref ?? null : d?.ref ?? null
            const when = showsNumber(k) ? `${dayName(k)}, day ${k + 1}` : dayName(k)
            const label = `${when}. ${BEAT_LABEL[beats[k]] ?? ''}.` + (today ? ' Ready to reveal.' : isStory ? ` ${text ?? ''}. Opens on its morning.` : ' Opens on its morning.')
            return (
              <div key={k} className={`ob-day${shown[k] ? ' is-in' : ''}${sealed[k] ? ' is-sealed' : ''}`} ref={(el) => { steps.current[k] = el }} style={{ '--tilt': `${(k % 2 ? -1 : 1) * (isStory ? 2 : 1.5)}deg` } as React.CSSProperties}>
                {opens && <p className="ob-phase">{PHASE_LABEL[phase]}</p>}
                <div className="ob-day-row">
                  <span className={`ob-day-node${today ? ' is-next' : ''}${isStory ? ' is-story' : ''}`} aria-hidden="true" />
                  <div className={`ob-day-card${today ? ' is-today' : ''}${isStory ? ' is-story' : ''}`} role="group" aria-label={label}>
                    <div className="ob-day-head" aria-hidden="true">
                      <b>{dayName(k)}</b>
                      {showsNumber(k) && <span>Day {k + 1}</span>}
                      <i />
                      <span className="ob-stamp">{today ? <em>Ready</em> : <Icon name="lock" size={14} />}</span>
                    </div>
                    <p className="ob-day-beat" aria-hidden="true">{isStory ? 'A story' : BEAT_LABEL[beats[k]]}</p>
                    {text ? (
                      isStory ? <p className="ob-day-line" aria-hidden="true">{text}</p> : <Veiled text={text} />
                    ) : (
                      <span className="ob-pending" />
                    )}
                    {ref && <p className="ob-day-ref" aria-hidden="true">{ref}</p>}
                  </div>
                </div>
                {today && (
                  <p className={`ob-rule-line${shown[1] ? ' is-in' : ''}`}>
                    <Icon name="sparkle" size={14} />
                    <span>One for each morning.</span>
                  </p>
                )}
                {isStory && (
                  <p className="ob-payoff">
                    <Icon name="lotus" weight="duotone" size={16} />
                    <span>The story that ties your week together.</span>
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <Cta delay={1300} onClick={() => { stopAuto(); haptic(12); onDone() }}>{cta}</Cta>
    </>
  )
}

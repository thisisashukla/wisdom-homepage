'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Cta, Hero } from './parts'
import { PHONE_HOURS } from '@/lib/onboarding/profile'
import { haptic, tick } from './motion'

const { min: MIN, max: MAX, fallback: DEFAULT } = PHONE_HOURS
const shown = (h: number) => (h >= MAX ? `${MAX}+` : String(h))
const unit = (h: number) => (h === 1 ? 'hour a day' : 'hours a day')

/**
 * Who you are · 3 of 3 (wisdom/app/screens/onboarding/Ob01d_PhoneScreen.tsx):
 * a large readout over a wide slider in whole hours, 2 to start. The thumb
 * follows the finger; each hour crossed ticks and the number nudges up; on
 * release it springs onto the hour.
 */
export default function PhoneScreen({ initial, onDone }: { initial?: number; onDone: (hours: number, moved: boolean) => void }) {
  const [hours, setHours] = useState(initial ?? DEFAULT)
  const [bump, setBump] = useState(0)
  const moved = useRef(false)
  const change = useCallback((h: number) => {
    setHours(h)
    moved.current = true
    setBump((b) => b + 1)
  }, [])
  return (
    <>
      <Hero title="How much of your day" accent="is on your phone?" sub="A rough guess is fine." />
      <div className="ob-phone-body ob-rise" style={{ '--d': '500ms', '--dy': '16px' } as React.CSSProperties}>
        <div className="ob-readout" aria-hidden="true">
          <span key={bump} className={`ob-number${bump ? ' is-bump' : ''}`}>{shown(hours)}</span>
          <span className="ob-unit">{unit(hours)}</span>
        </div>
        <HourSlider value={hours} onChange={change} />
      </div>
      <Cta delay={800} onClick={() => { haptic(12); onDone(hours, moved.current) }}>
        Continue
      </Cta>
    </>
  )
}

function HourSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const track = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<number | null>(null) // px along the track while held
  const [w, setW] = useState(0)
  const live = useRef(value)
  useEffect(() => {
    const el = track.current
    if (!el) return
    const ro = new ResizeObserver(() => setW(el.getBoundingClientRect().width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const xOf = (v: number) => ((v - MIN) / (MAX - MIN)) * w
  const follow = (clientX: number) => {
    const r = track.current!.getBoundingClientRect()
    const x = Math.min(r.width, Math.max(0, clientX - r.left))
    setDrag(x)
    const v = Math.round(MIN + (x / r.width) * (MAX - MIN))
    if (v !== live.current) {
      live.current = v
      tick()
      onChange(v)
    }
  }
  const x = drag ?? xOf(value)
  const steps = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i)
  const labels = [1, 4, 8, MAX]
  return (
    <div
      className="ob-slider"
      role="slider"
      tabIndex={0}
      aria-label="Hours on your phone each day"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={value}
      aria-valuetext={`${shown(value)} ${unit(value)}`}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); if (value < MAX) { live.current = value + 1; tick(); onChange(value + 1) } }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); if (value > MIN) { live.current = value - 1; tick(); onChange(value - 1) } }
      }}
      onPointerDown={(e) => {
        ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
        follow(e.clientX)
      }}
      onPointerMove={(e) => { if (drag !== null) follow(e.clientX) }}
      onPointerUp={() => setDrag(null)}
      onPointerCancel={() => setDrag(null)}
    >
      <div className="ob-track" ref={track}>
        <div className="ob-fill" style={{ width: x }} />
      </div>
      <div className="ob-ticks" aria-hidden="true">
        {w > 0 && steps.map((s) => {
          const big = labels.includes(s)
          return (
            <div key={s} className="ob-tick-col" style={{ left: xOf(s) }}>
              <span className={`ob-tick${big ? ' is-big' : ''}${s <= value ? ' is-on' : ''}`} />
              {big && <span className={`ob-tick-label${s === value ? ' is-on' : ''}`}>{shown(s)}</span>}
            </div>
          )
        })}
      </div>
      <div className={`ob-thumb${drag !== null ? ' is-held' : ''}`} style={{ transform: `translateX(${x}px)` }} aria-hidden="true">
        <span />
      </div>
    </div>
  )
}

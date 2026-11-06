'use client'

import { useEffect, useRef, useState } from 'react'
import { BudGlyph, WatchGlyph } from './Devices'

/*
 * An illustrative 12-minute sit, drawn the way Dhyaan reads one. Head motion comes
 * from AirPods, hand motion and heart rate from Apple Watch. Restless for the first
 * 17 seconds, two small nods, seven returns, longest still stretch 1:34
 * (from 4:35 to 6:09), heart 74 to 68.
 */
const SIT = 720
const BARS = 90
const STEP = SIT / BARS
const ARRIVE = 17
const RETURNS = [95, 185, 275, 369, 450, 540, 630]
const NODS = [300, 606]

function rng(seed: number) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) / 2147483647)
}

function bars(kind: 'head' | 'hands') {
  const r = rng(kind === 'head' ? 11 : 29)
  return Array.from({ length: BARS }, (_, i) => {
    const t0 = i * STEP
    const t1 = t0 + STEP
    const hit = (ts: number[]) => ts.some((t) => t >= t0 && t < t1)
    if (t0 < ARRIVE + 4) return 0.55 + r() * 0.45
    if (kind === 'hands' && hit(RETURNS)) return 0.5 + r() * 0.15
    if (kind === 'head' && hit(NODS)) return 0.62
    return 0.05 + r() * 0.07
  })
}

const HEAD = bars('head')
const HANDS = bars('hands')

const W = 560
const X0 = 8
const XW = W - 16
const x = (t: number) => X0 + (t / SIT) * XW

function heartPath() {
  const r = rng(7)
  let d = ''
  for (let t = 0; t <= SIT; t += 12) {
    const bpm = t < 300 ? 74 - 6 * (1 - Math.pow(1 - t / 300, 2)) : 68
    const y = 20 + ((74 - bpm) / 6) * 46 + (r() - 0.5) * 3
    d += `${t === 0 ? 'M' : 'L'}${x(t).toFixed(1)},${y.toFixed(1)} `
  }
  return d.trim()
}
const HEART = heartPath()

type Lane = 'head' | 'hands' | 'heart'

export type LaneCopy = { id: Lane; label: string; title: string; body: string }

function Bars({ values, y, h, cls }: { values: number[]; y: number; h: number; cls: string }) {
  const bw = XW / BARS
  return (
    <g className={cls}>
      {values.map((v, i) => {
        const bh = Math.max(2, v * h)
        return <rect key={i} x={X0 + i * bw + 1} y={y + (h - bh) / 2} width={Math.max(1.5, bw - 2.2)} height={bh} rx="1.2" style={{ ['--i' as string]: i }} />
      })}
    </g>
  )
}

export default function SitLanes({ lanes, markers, note }: { lanes: LaneCopy[]; markers: [string, string, string]; note: string }) {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Lane | 'all'>('all')
  const [bpm, setBpm] = useState(74)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const blocks = Array.from(el.querySelectorAll<HTMLElement>('[data-lane]'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.getAttribute('data-lane') as Lane)
      },
      { rootMargin: '-42% 0px -42% 0px' },
    )
    if (window.matchMedia('(min-width: 900px)').matches) blocks.forEach((b) => io.observe(b))

    let raf = 0
    const fig = el.querySelector('.dh-instr')
    const counter = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      counter.disconnect()
      if (reduce) return setBpm(68)
      const start = performance.now()
      const run = (t: number) => {
        const p = Math.min(1, (t - start - 900) / 2600)
        if (p > 0) setBpm(Math.round(74 - 6 * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(run)
      }
      raf = requestAnimationFrame(run)
    }, { threshold: 0.4 })
    if (fig) counter.observe(fig)
    return () => {
      io.disconnect()
      counter.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  const longest = [RETURNS[2], RETURNS[3]]

  return (
    <div className="dh-lanes" ref={root} data-active={active}>
      <div className="dh-lanes__copy">
        {lanes.map((l) => (
          <div key={l.id} className={`dh-lane dh-lane--${l.id}`} data-lane={l.id} data-reveal>
            <p className="dh-lane__label">
              {l.id === 'head' ? <BudGlyph /> : <WatchGlyph />}
              {l.label}
            </p>
            <h3>{l.title}</h3>
            <p className="dh-lane__body">{l.body}</p>
          </div>
        ))}
        <p className="dh-lanes__note">{note}</p>
      </div>

      <div className="dh-lanes__stage">
        <figure className="dh-instr" data-reveal aria-label="An example twelve-minute sit as Dhyaan reads it">
          <div className="dh-instr__head">
            <span>Silent · 12 min</span>
            <span className="dh-instr__bpm">
              <b>{bpm}</b> bpm
            </span>
          </div>
          <svg viewBox={`0 0 ${W} 400`} className="dh-instr__svg" aria-hidden="true">
            <line x1={x(ARRIVE)} x2={x(ARRIVE)} y1="18" y2="372" className="dh-instr__arrive" />

            <text x="0" y="40" className="dh-instr__k dh-instr__k--head">Head · AirPods</text>
            <Bars values={HEAD} y={52} h={74} cls="dh-bars dh-bars--head" />
            {NODS.map((t) => (
              <circle key={t} cx={x(t)} cy={136} r="3" className="dh-instr__nod" />
            ))}

            <text x="0" y="172" className="dh-instr__k dh-instr__k--hands">Hands · Apple Watch</text>
            <Bars values={HANDS} y={184} h={74} cls="dh-bars dh-bars--hands" />
            {RETURNS.map((t, i) => (
              <circle key={t} cx={x(t)} cy={268} r="3.2" className="dh-instr__ret" style={{ ['--i' as string]: i }} />
            ))}
            <path d={`M${x(longest[0]) + 6},176 V172 H${x(longest[1]) - 6} V176`} className="dh-instr__span" />

            <text x="0" y="302" className="dh-instr__k dh-instr__k--heart">Heart · Apple Watch</text>
            <g transform="translate(0,296)">
              <path d={HEART} className="dh-instr__heart" pathLength={1} />
            </g>

            <line x1={X0} x2={X0 + XW} y1="384" y2="384" className="dh-instr__axis" />
            {[0, 3, 6, 9, 12].map((m) => (
              <text key={m} x={x(m * 60)} y="398" className="dh-instr__tick" textAnchor={m === 0 ? 'start' : m === 12 ? 'end' : 'middle'}>
                {m}:00
              </text>
            ))}
          </svg>
          <figcaption className="dh-instr__marks">
            <span className="m1">{markers[0]}</span>
            <span className="m2">{markers[1]}</span>
            <span className="m3">{markers[2]}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

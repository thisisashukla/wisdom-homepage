'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { BG_COUNTS } from '@/lib/search/refs'
import { readFlags, subscribeReading } from '@/lib/readingProgress'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Span } from '@/lib/readingPlans'
import './verse-map.css'

/**
 * The Gita as 700 lamps: one small circle per verse, one row per chapter (long chapters wrap at
 * 40). A plan paints its days onto the map; verses this reader has already read on the site are
 * lit gold (lib/readingProgress, this device only).
 *
 *   mode "days":   every verse belongs to a day; days alternate in two tones (30 days, 18 days).
 *   mode "points": the plan's verses are lamps on a faint map (7 days, a verse a day).
 *   focusChapter:  rings one chapter (the how-to-read guide's "start with chapter 2").
 *
 * Motion: one load moment (rows light in order, about a second) when `intro` is set; after that
 * only taps move things. Picking a day (a tap on the map, or a "Show on the map" button that sends
 * PLAN_DAY_EVENT) dims the rest and rings that day in sindoor. Reduced motion: no animation.
 */

export const PLAN_DAY_EVENT = 'wq:plan-day'
export type PlanDayDetail = { plan: string; day: number | null; scroll?: boolean }

export type MapSegment = { day: number; spans: Span[] }

const COLS = 40
const STEP = 10
const LABEL_W = 26
const ROW_GAP = 6
const R = 3.1
const DAY_GAP = 5

type Dot = { ch: number; vs: number; x: number; y: number; day: number | null; point: boolean }

function layout(segments: MapSegment[], gaps: boolean) {
  const dayOf = new Map<string, number>()
  for (const s of segments) for (const sp of s.spans) for (let v = sp.from; v <= sp.to; v++) dayOf.set(`${sp.ch}.${v}`, s.day)
  const dots: Dot[] = []
  const labels: { ch: number; y: number }[] = []
  let y = 6
  let maxX = 0
  BG_COUNTS.forEach((n, i) => {
    const ch = i + 1
    labels.push({ ch, y })
    let shift = 0
    let prevDay: number | null = null
    let prevLine = -1
    for (let vs = 1; vs <= n; vs++) {
      const col = (vs - 1) % COLS
      const line = Math.floor((vs - 1) / COLS)
      const day = dayOf.get(`${ch}.${vs}`) ?? null
      if (line !== prevLine) shift = 0
      // days mode: a small gap where one day ends and the next begins, so the bands read as days
      else if (gaps && day !== prevDay) shift += DAY_GAP
      const x = LABEL_W + col * STEP + shift + R + 1
      maxX = Math.max(maxX, x + R + 1)
      dots.push({ ch, vs, x, y: y + line * STEP, day, point: false })
      prevDay = day
      prevLine = line
    }
    y += Math.ceil(n / COLS) * STEP + ROW_GAP
  })
  return { dots, labels, height: y - ROW_GAP + 2, width: Math.max(maxX, LABEL_W + COLS * STEP) }
}

export default function VerseMap({
  plan,
  segments,
  mode = 'days',
  focusChapter,
  intro = true,
  selectable = true,
  numbered = false,
  label,
  caption,
  className = '',
}: {
  /** Plan key for events and for matching PLAN_DAY_EVENT ("thirty", "seven", "verse-a-day"). */
  plan: string
  segments: MapSegment[]
  mode?: 'days' | 'points'
  focusChapter?: number
  intro?: boolean
  selectable?: boolean
  /** Points mode: print the day number beside each lamp (7 days). */
  numbered?: boolean
  /** aria-label for the picture. */
  label: string
  caption?: React.ReactNode
  className?: string
}) {
  const { dots, labels, height, width } = useMemo(() => layout(segments, mode === 'days'), [segments, mode])
  const points = useMemo(() => (mode === 'points' ? dots.filter((d) => d.day !== null) : []), [dots, mode])
  const svgRef = useRef<SVGSVGElement>(null)
  const [sel, setSel] = useState<number | null>(null)
  const [readCount, setReadCount] = useState<number | null>(null)

  // Lit verses: what this reader has read on the site.
  useEffect(() => {
    const paint = () => {
      const svg = svgRef.current
      if (!svg) return
      const flags = readFlags()
      const els = svg.querySelectorAll<SVGCircleElement>('circle.vm-d')
      let n = 0
      els.forEach((el, i) => {
        const on = flags[i] === true
        if (on) n++
        el.classList.toggle('is-read', on)
      })
      setReadCount(n)
    }
    paint()
    return subscribeReading(paint)
  }, [])

  // Day picked elsewhere on the page.
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<PlanDayDetail>).detail
      if (d && d.plan === plan) setSel(d.day)
    }
    window.addEventListener(PLAN_DAY_EVENT, on)
    return () => window.removeEventListener(PLAN_DAY_EVENT, on)
  }, [plan])

  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!selectable) return
    const t = (e.target as Element).closest('[data-day]') as SVGElement | null
    const day = t ? Number(t.getAttribute('data-day')) : null
    if (!day) return
    const next = sel === day ? null : day
    setSel(next)
    if (next) {
      trackEvent(EVENTS.PlanDaySelected, { plan, day: next, position: next, method: 'map' })
      window.dispatchEvent(new CustomEvent<PlanDayDetail>(PLAN_DAY_EVENT, { detail: { plan, day: next } }))
      const row = document.getElementById(`day-${next}`)
      if (row) row.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
    }
  }

  const cls = ['vm', `vm--${mode}`, intro && 'vm--intro', selectable && 'vm--selectable', sel !== null && 'has-sel', className].filter(Boolean).join(' ')
  let rowIndex = -1

  return (
    <figure className={cls}>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} onClick={onClick} preserveAspectRatio="xMinYMin meet">
        {labels.map((l) => {
          rowIndex++
          const rowDots = dots.filter((d) => d.ch === l.ch)
          return (
            <g key={l.ch} className={`vm-row${focusChapter === l.ch ? ' is-focus' : ''}`} style={{ ['--r' as string]: rowIndex }}>
              <text x={0} y={l.y + 3.4} className="vm-ch">
                {l.ch}
              </text>
              {rowDots.map((d) => (
                <circle
                  key={d.vs}
                  className={`vm-d${d.day !== null ? (mode === 'days' ? (d.day % 2 ? ' vm-a' : ' vm-b') : ' vm-p') : ''}${sel !== null && d.day === sel ? ' is-sel' : ''}`}
                  cx={d.x}
                  cy={d.y}
                  r={R}
                  data-day={d.day ?? undefined}
                />
              ))}
            </g>
          )
        })}
        {mode === 'points' && (
          <g className="vm-lamps" style={{ ['--step' as string]: points.length > 10 ? '28ms' : '110ms' }}>
            {points.map((p, i) => (
              <g key={`${p.ch}.${p.vs}`} className={`vm-lamp${sel === p.day ? ' is-sel' : ''}`} style={{ ['--i' as string]: i }} data-day={p.day ?? undefined}>
                <circle className="vm-halo" cx={p.x} cy={p.y} r={7.5} />
                <circle className="vm-core" cx={p.x} cy={p.y} r={4.2} />
                {numbered && (
                  <text className="vm-n" x={p.x} y={p.y - 10}>
                    {p.day}
                  </text>
                )}
              </g>
            ))}
          </g>
        )}
      </svg>
      <figcaption className="vm-cap">
        {caption}
        <span className="vm-read" aria-live="polite">
          {readCount ? `You’ve read ${Math.min(readCount, 700)} of 700 verses on this site. They glow gold.` : 'Verses you read on this site will glow gold here.'}
        </span>
      </figcaption>
    </figure>
  )
}

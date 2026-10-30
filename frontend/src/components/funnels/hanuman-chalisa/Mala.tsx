'use client'

/**
 * The mala: 43 beads, one per unit (2 dohas, 40 chaupais, the closing doha),
 * strung from the guru bead at the bottom, up the left, over the top and down
 * the right. The current line's bead glows sindoor; learned lines turn tulsi
 * green; on the counter an outer ring of 108 fills one bead per recitation.
 *
 * Beads are real links (hub, line and counter pages) or buttons (learn mode),
 * with labels, and one roving tab stop: arrow keys move between beads, Home
 * and End jump to the ends. The text on each page is the equivalent control
 * for anyone who finds the beads too small (WCAG 2.5.8 equivalent exception).
 */

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { trackEvent, trackEventBeacon } from '@/lib/mixpanel'
import { baseProps, type BeadInfo, type HcLocale } from '@/lib/funnels/hanuman-chalisa/shared'

export type MalaProps = {
  beads: BeadInfo[]
  locale: HcLocale
  page: string
  /** 'anchor': beads jump within the page and follow the line in view. 'page': beads open line pages. 'button': calls onSelect. */
  mode: 'anchor' | 'page' | 'button'
  currentId?: string | null
  learned?: string[]
  /** Counter: recitations done, shown on the outer ring of 108. */
  outer?: number | null
  /** Counter: the goal, marked on the outer ring. */
  outerGoal?: number | null
  onSelect?: (id: string) => void
  label: string
  caption?: string
  children?: ReactNode
}

const GAP_DEG = 12 // half the gap at the bottom where the guru bead hangs
const R = 44 // bead ring radius, % of the box
const R_OUT = 49.5

function pointAt(i: number, n: number, r: number) {
  const start = 90 + GAP_DEG
  const sweep = 360 - 2 * GAP_DEG
  const deg = start + (sweep * i) / (n - 1)
  const rad = (deg * Math.PI) / 180
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) }
}

const T = {
  en: { learned: 'learned', current: 'current line' },
  hi: { learned: 'याद हो गई', current: 'अभी की पंक्ति' },
} as const

export default function Mala({
  beads,
  locale,
  page,
  mode,
  currentId = null,
  learned = [],
  outer = null,
  outerGoal = null,
  onSelect,
  label,
  caption,
  children,
}: MalaProps) {
  const t = T[locale]
  const [current, setCurrent] = useState<string | null>(currentId)
  const [focusIdx, setFocusIdx] = useState(() => Math.max(0, beads.findIndex((b) => b.id === currentId)))
  const refs = useRef<(HTMLElement | null)[]>([])
  const learnedSet = useMemo(() => new Set(learned), [learned])

  useEffect(() => {
    setCurrent(currentId)
    const i = beads.findIndex((b) => b.id === currentId)
    if (i >= 0) setFocusIdx(i)
  }, [currentId, beads])

  // Anchor mode: the bead follows the line in view.
  useEffect(() => {
    if (mode !== 'anchor' || typeof IntersectionObserver === 'undefined') return
    const els = beads
      .map((b) => document.getElementById(b.href.slice(1)))
      .filter((x): x is HTMLElement => !!x)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (!vis.length) return
        const id = vis[0].target.getAttribute('data-unit')
        if (id) {
          setCurrent(id)
          document.querySelectorAll('.hc-unit.is-current').forEach((el) => el.classList.remove('is-current'))
          vis[0].target.classList.add('is-current')
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [mode, beads])

  const points = useMemo(() => beads.map((_, i) => pointAt(i, beads.length, R)), [beads])
  const outerPoints = useMemo(
    () => (outer === null ? [] : Array.from({ length: 108 }, (_, i) => pointAt(i, 108, R_OUT))),
    [outer],
  )

  const tapped = (b: BeadInfo, e?: React.MouseEvent) => {
    const track = mode === 'page' ? trackEventBeacon : trackEvent
    track('Mala Bead Tapped', { ...baseProps(page, locale), line: b.id, mode })
    if (mode === 'anchor' && e) {
      const el = document.getElementById(b.href.slice(1))
      if (el) {
        e.preventDefault()
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
        history.replaceState(null, '', b.href)
        setCurrent(b.id)
      }
    }
    if (mode === 'button') {
      setCurrent(b.id)
      onSelect?.(b.id)
    }
  }

  const onKey = (e: KeyboardEvent) => {
    const n = beads.length
    let i = focusIdx
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') i = (focusIdx + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') i = (focusIdx - 1 + n) % n
    else if (e.key === 'Home') i = 0
    else if (e.key === 'End') i = n - 1
    else return
    e.preventDefault()
    setFocusIdx(i)
    refs.current[i]?.focus()
  }

  const ringPath = (() => {
    const a = pointAt(0, 2, R)
    const b = pointAt(1, 2, R)
    return `M ${a.x} ${a.y} A ${R} ${R} 0 1 1 ${b.x} ${b.y}`
  })()

  return (
    <figure className="hc-mala-fig" style={{ margin: 0 }}>
      <div className="hc-mala">
        <svg className="hc-mala-thread" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <path d={ringPath} vectorEffect="non-scaling-stroke" />
          <path d={`M 50 ${50 + R} L 50 96.5`} vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="hc-sumeru" aria-hidden="true" />
        {outerPoints.map((p, i) => (
          <span
            key={`o${i}`}
            className="hc-outer"
            aria-hidden="true"
            data-on={outer !== null && i < outer ? '' : undefined}
            data-goal={outerGoal && i === outerGoal - 1 ? '' : undefined}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}
        <ul className="hc-mala-beads" role="list" aria-label={label} onKeyDown={onKey}>
          {beads.map((b, i) => {
            const p = points[i]
            const isCur = b.id === current
            const isLearned = learnedSet.has(b.id)
            const aria = [b.label, isLearned ? t.learned : null, isCur ? t.current : null].filter(Boolean).join(', ')
            const common = {
              className: 'hc-bead',
              style: { left: `${p.x}%`, top: `${p.y}%` },
              tabIndex: i === focusIdx ? 0 : -1,
              'aria-label': aria,
              'data-doha': b.id.startsWith('hc.d') ? '' : undefined,
              'data-learned': isLearned ? '' : undefined,
              onFocus: () => setFocusIdx(i),
            }
            return (
              <li key={b.id}>
                {mode === 'button' ? (
                  <button
                    type="button"
                    {...common}
                    ref={(el) => {
                      refs.current[i] = el
                    }}
                    data-current={isCur ? '' : undefined}
                    onClick={() => tapped(b)}
                  >
                    <span />
                  </button>
                ) : (
                  <a
                    href={b.href}
                    {...common}
                    ref={(el) => {
                      refs.current[i] = el
                    }}
                    aria-current={isCur ? (mode === 'page' ? 'page' : 'location') : undefined}
                    onClick={(e) => tapped(b, e)}
                  >
                    <span />
                  </a>
                )}
              </li>
            )
          })}
        </ul>
        {children && <div className="hc-mala-center">{children}</div>}
      </div>
      {caption && <figcaption className="hc-mala-caption">{caption}</figcaption>}
    </figure>
  )
}

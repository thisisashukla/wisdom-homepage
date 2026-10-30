'use client'

import { useRef, useState } from 'react'

type Point = { week: string; v247: number; v47: number }

const W = 720
const H = 260
const PAD = { l: 34, r: 16, t: 18, b: 30 }
const SERIES = [
  { key: 'v47' as const, label: '4.7 Yada yada hi dharmasya', color: '#c4861c' },
  { key: 'v247' as const, label: '2.47 Karmanye vadhikaraste', color: '#6b7fd6' },
]

const fmtWeek = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
}

/** Weekly Google Trends interest in India for 4.7 and 2.47, one request, one scale. */
export default function WeeklyChart({ data, markWeek, markLabel }: { data: Point[]; markWeek: string; markLabel: string }) {
  const [idx, setIdx] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b
  const x = (i: number) => PAD.l + (i / (data.length - 1)) * iw
  const y = (v: number) => PAD.t + ih - (v / 100) * ih
  const path = (k: 'v247' | 'v47') => data.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[k]).toFixed(1)}`).join('')
  const markIdx = data.findIndex((p) => p.week === markWeek)
  const months = data.map((p, i) => ({ i, m: p.week.slice(5, 7), d: Number(p.week.slice(8)) })).filter((p, k, arr) => k === 0 || p.m !== arr[k - 1].m)

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = svgRef.current!.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    const i = Math.round(((px - PAD.l) / iw) * (data.length - 1))
    setIdx(Math.max(0, Math.min(data.length - 1, i)))
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setIdx((i) => Math.min(data.length - 1, (i ?? -1) + 1))
    if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, (i ?? data.length) - 1))
  }

  const p = idx !== null ? data[idx] : null

  return (
    <figure className="sv-chart" aria-labelledby="sv-weekly-title">
      <figcaption id="sv-weekly-title" className="sv-chart-title">
        Weekly Google search interest in India, 2026
        <span>100 = the highest week for either line in this period</span>
      </figcaption>
      <div className="sv-legend" aria-hidden="true">
        {SERIES.map((s) => (
          <span key={s.key}><i className="is-line" style={{ background: s.color }} />{s.label}</span>
        ))}
      </div>
      <div className="sv-weekly-wrap">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="sv-weekly"
          role="img"
          aria-label={`Weekly search interest in India. 4.7 peaks at 100 in the week of ${markLabel}.`}
          tabIndex={0}
          onPointerMove={onMove}
          onPointerLeave={() => setIdx(null)}
          onKeyDown={onKey}
          onBlur={() => setIdx(null)}
        >
          {[0, 25, 50, 75, 100].map((t) => (
            <g key={t}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} className="sv-grid" />
              <text x={PAD.l - 8} y={y(t) + 4} className="sv-axis" textAnchor="end">{t}</text>
            </g>
          ))}
          {months.map((m) => (
            <text key={m.i} x={x(m.i)} y={H - 8} className="sv-axis" textAnchor="start">
              {new Date(Date.UTC(2026, Number(m.m) - 1, 1)).toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })}
            </text>
          ))}
          {markIdx >= 0 && (
            <g>
              <line x1={x(markIdx)} x2={x(markIdx)} y1={PAD.t} y2={PAD.t + ih} className="sv-mark" />
              <text x={x(markIdx) - 8} y={PAD.t + 10} className="sv-mark-label" textAnchor="end">Janmashtami</text>
            </g>
          )}
          {SERIES.map((s) => (
            <path key={s.key} d={path(s.key)} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          ))}
          {SERIES.map((s) => (
            <circle key={s.key} cx={x(data.length - 1)} cy={y(data[data.length - 1][s.key])} r={4} fill={s.color} stroke="#120505" strokeWidth={2} />
          ))}
          {p && idx !== null && (
            <g>
              <line x1={x(idx)} x2={x(idx)} y1={PAD.t} y2={PAD.t + ih} className="sv-cross" />
              {SERIES.map((s) => (
                <circle key={s.key} cx={x(idx)} cy={y(p[s.key])} r={4.5} fill={s.color} stroke="#120505" strokeWidth={2} />
              ))}
            </g>
          )}
        </svg>
        {p && idx !== null && (
          <div className="sv-tip sv-tip-float" style={{ left: `${(x(idx) / W) * 100}%`, transform: idx > data.length / 2 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)' }} role="tooltip">
            <strong>Week of {fmtWeek(p.week)}</strong>
            {SERIES.map((s) => (
              <span key={s.key} className="sv-tip-row">
                <i className="is-line" style={{ background: s.color }} />
                <b>{p[s.key]}</b> {s.label.split(' ')[0]}
              </span>
            ))}
          </div>
        )}
      </div>
    </figure>
  )
}

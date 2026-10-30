'use client'

import { useState } from 'react'
import type { SearchedVerse } from '@/lib/searchedVerses2026'
import { fmtIndex } from '@/lib/searchedVerses2026'

/**
 * Grouped horizontal bars: worldwide and India search index per verse (2.47 = 100).
 * Colours validated against the page surface (#120505) with the dataviz checker.
 */
const SERIES = [
  { key: 'world' as const, label: 'Worldwide', color: '#c4861c' },
  { key: 'india' as const, label: 'India', color: '#6b7fd6' },
]

export default function VerseIndexChart({ verses }: { verses: SearchedVerse[] }) {
  const [active, setActive] = useState<string | null>(null)
  const max = Math.max(...verses.flatMap((v) => [v.world, v.india]))

  return (
    <figure className="sv-chart" aria-labelledby="sv-chart-title">
      <figcaption id="sv-chart-title" className="sv-chart-title">
        Google search interest by verse, 1 Jan to 28 Oct 2026
        <span>Index: 2.47 (karmanye vadhikaraste) = 100 in each region</span>
      </figcaption>
      <div className="sv-legend" aria-hidden="true">
        {SERIES.map((s) => (
          <span key={s.key}><i style={{ background: s.color }} />{s.label}</span>
        ))}
      </div>
      <ol className="sv-bars">
        {verses.map((v) => (
          <li
            key={v.ref}
            className={`sv-row${active === v.ref ? ' is-active' : ''}`}
            tabIndex={0}
            onPointerEnter={() => setActive(v.ref)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(v.ref)}
            onBlur={() => setActive(null)}
            aria-label={`${v.ref} ${v.line}: worldwide ${fmtIndex(v.world)}, India ${fmtIndex(v.india)}`}
          >
            <span className="sv-row-label">
              <a href={`/gita/chapter/${v.chapter}/verse/${v.verse}`} tabIndex={-1}>{v.ref}</a>
              <span>{v.line}</span>
            </span>
            <span className="sv-row-bars">
              {SERIES.map((s) => {
                const val = v[s.key]
                const pct = (val / max) * 100
                return (
                  <span key={s.key} className="sv-bar-line">
                    <span className="sv-bar" style={{ width: `max(${pct}%, ${val > 0 ? 3 : 0}px)`, background: s.color }} />
                    <span className="sv-bar-val">{fmtIndex(val)}</span>
                  </span>
                )
              })}
            </span>
            {active === v.ref && (
              <span className="sv-tip" role="tooltip">
                <strong>{v.ref}</strong> {v.line}
                {SERIES.map((s) => (
                  <span key={s.key} className="sv-tip-row">
                    <i style={{ background: s.color }} />
                    <b>{fmtIndex(v[s.key])}</b> {s.label}
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

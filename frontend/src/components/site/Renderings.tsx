import type { ReactNode } from 'react'
import './site.css'

export type Rendering = {
  /** Translator ("Arthur W. Ryder") */
  who: string
  /** "1929" */
  year?: string
  /** The rendering, line by line (public domain or the site's own). */
  lines: string[]
  /** Short note under the lines (what this choice does). */
  note?: ReactNode
  source?: string
  href?: string
  location?: string
  /** Marks the site's own translation. */
  own?: boolean
}

/** One verse in several translations, oldest to newest, each with its source. */
export default function Renderings({ items, label, className = '' }: { items: Rendering[]; label?: string; className?: string }) {
  return (
    <ol className={`sx-renderings ${className}`.trim()} aria-label={label} data-stagger="60">
      {items.map((r) => (
        <li key={r.who + (r.year ?? '')} className={`sx-rendering rv${r.own ? ' sx-rendering--own' : ''}`}>
          <p className="sx-rendering-who">
            {r.who}
            {r.year && <span className="sx-rendering-year">{r.year}</span>}
          </p>
          <blockquote className="sx-rendering-text">
            {r.lines.map((l, i) => (
              <span key={i} className="sx-verse-row">
                {l}
              </span>
            ))}
          </blockquote>
          {r.note && <p className="sx-rendering-note">{r.note}</p>}
          {r.source && (
            <p className="sx-rendering-src">
              {r.href ? (
                <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined} data-mp-location={r.location}>
                  {r.source}
                </a>
              ) : (
                r.source
              )}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}

'use client'

import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'

type Step = { href: string; label: string; target: string; to: string }

/** Previous / next verse or chapter. Each tap sends Verse Nav Clicked { direction, from, to }. */
export default function PrevNext({ prev, next, from, label, className = '' }: { prev?: Step | null; next?: Step | null; from: string; label: string; className?: string }) {
  const link = (s: Step, direction: 'prev' | 'next') => (
    <a
      className={`og-pn-link${direction === 'next' ? ' is-next' : ''}`}
      href={s.href}
      data-mp-tracked=""
      onClick={() => trackEventBeacon(EVENTS.VerseNavClicked, { direction, from, to: s.to, href: s.href })}
    >
      <span className="og-pn-label">{s.label}</span>
      <span className="og-pn-target">{s.target}</span>
    </a>
  )
  return (
    <nav className={`og-pn ${className}`.trim()} aria-label={label}>
      {prev ? link(prev, 'prev') : <span />}
      {next && link(next, 'next')}
    </nav>
  )
}

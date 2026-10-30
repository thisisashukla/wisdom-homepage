'use client'

/**
 * Horizontal row of moments. A chip without href filters the page in place by
 * setting data-filter on the nearest [data-qp-root]; quotes.css then shows only
 * sections (and cards) whose section moment matches. "All" clears it. Chips
 * with href link to the moment's own page. A polite live region says how many
 * lines are showing after each tap.
 */

import { useRef, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import type { Locale, MomentId, QuotePageConfig } from '@/lib/quotes-shared'
import './card.css'
import './quotes.css'

export type MomentChipsProps = {
  chips: QuotePageConfig['chips']
  locale: Locale
  pageName: string
}

const T = {
  en: { all: 'All', label: 'Find lines for a moment', showing: (n: number) => `Showing ${n} ${n === 1 ? 'line' : 'lines'}` },
  hi: { all: 'सभी', label: 'किसी पल के लिए श्लोक चुनें', showing: (n: number) => `${n} श्लोक दिख रहे हैं` },
}

export default function MomentChips({ chips, locale, pageName }: MomentChipsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<MomentId | null>(null)
  const [status, setStatus] = useState('')
  const t = T[locale]

  const apply = (m: MomentId | null) => {
    const root = ref.current?.closest<HTMLElement>('[data-qp-root]')
    if (root) {
      if (m) root.setAttribute('data-filter', m)
      else root.removeAttribute('data-filter')
      const n = root.querySelectorAll(m ? `.qp-item[data-moment="${m}"]` : '.qp-item').length
      setStatus(t.showing(n))
    }
    setActive(m)
    trackEvent('Moment Chip Tapped', { moment: m ?? 'all', page: pageName, locale, kind: 'filter' })
  }

  if (!chips.length) return null

  return (
    <div ref={ref} className="qchips" role="group" aria-label={t.label}>
      <div className="qchips-row">
        <button type="button" className="qchip" aria-pressed={active === null} onClick={() => apply(null)}>
          {t.all}
        </button>
        {chips.map((c) =>
          c.href ? (
            <a
              key={c.moment + c.href}
              className="qchip qchip-link"
              href={c.href}
              onClick={() => trackEvent('Moment Chip Tapped', { moment: c.moment, page: pageName, locale, kind: 'link', href: c.href })}
            >
              {c.label}
            </a>
          ) : (
            <button
              key={c.moment}
              type="button"
              className="qchip"
              aria-pressed={active === c.moment}
              onClick={() => apply(active === c.moment ? null : c.moment)}
            >
              {c.label}
            </button>
          ),
        )}
      </div>
      <p className="qchips-status" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  )
}

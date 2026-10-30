'use client'

/**
 * The signature interaction: three diyas, Film / Valmiki / Tulsidas. A lit lamp means
 * the moment is in that version. Tapping a lamp unfolds what that version has:
 * the original line (Devanagari or IAST), Wisdom's plain English and the reference.
 * All panels are in the server HTML; without JS a <noscript> rule shows them all.
 */

import { useEffect, useId, useRef, useState } from 'react'
import type { LampId, LampView } from '@/lib/funnels/ramayana/types'
import { trackFunnel } from '@/lib/funnels/ramayana/track'
import Diya from './Diya'
import LineBlock from './LineBlock'
import ScriptToggle from './ScriptToggle'

type Props = {
  scene: string
  lamps: LampView[]
  locale: 'en' | 'hi'
  page: string
  /** Lamp open on first render (scene pages). Hub rows start closed. */
  initial?: LampId | null
  /** Accessible name for the lamp row, e.g. the scene title. */
  label: string
  size?: 'large' | 'small'
}

const T = {
  en: { instead: 'What the text has instead', film: 'Source', open: 'Show', close: 'Hide', none: 'No line to show.' },
  hi: { instead: 'ग्रंथ में इसकी जगह क्या है', film: 'स्रोत', open: 'दिखाएँ', close: 'छिपाएँ', none: 'दिखाने को कोई पंक्ति नहीं।' },
}

export default function ThreeLamps({ scene, lamps, locale, page, initial = null, label, size = 'large' }: Props) {
  const [open, setOpen] = useState<LampId | null>(initial)
  const uid = useId().replace(/:/g, '')
  const t = T[locale]
  // The kindle: on scene pages the three flames light in turn the first time the row is seen.
  // Server HTML has the flames lit; hiding applies only once JS has marked the row as waiting.
  const rowRef = useRef<HTMLDivElement>(null)
  const [kindle, setKindle] = useState<'off' | 'wait' | 'lit'>('off')
  useEffect(() => {
    if (size !== 'large' || typeof IntersectionObserver === 'undefined') return
    const el = rowRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return
    setKindle('wait')
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setKindle('lit')
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [size])
  const openIdx = open ? lamps.findIndex((l) => l.id === open) : -1

  const tap = (l: LampView) => {
    const next = open === l.id ? null : l.id
    setOpen(next)
    if (next) trackFunnel('Scene Lamp Tapped', { page, locale }, { scene, lamp: l.id, state: l.state })
  }

  return (
    <div className={`rl-lamps rl-lamps-${size}`} data-kindle={kindle}>
      <div className="rl-lamp-row" role="group" aria-label={label} ref={rowRef} data-open={openIdx} style={{ ['--at' as string]: Math.max(openIdx, 0) }}>
        {lamps.map((l, k) => (
          <button
            key={l.id}
            type="button"
            className={`rl-lamp rl-lamp-${l.id}`}
            data-state={l.state}
            aria-expanded={open === l.id}
            aria-controls={`${uid}-${l.id}`}
            onClick={() => tap(l)}
            style={{ ['--k' as string]: k }}
          >
            <Diya lamp={l.id} state={l.state} size={size === 'large' ? 56 : 40} />
            <span className="rl-lamp-name">{l.label}</span>
            <span className="rl-lamp-state">{l.stateLabel}</span>
          </button>
        ))}
        <span className="rl-lamp-mark" aria-hidden="true" />
      </div>
      {lamps.map((l) => {
        const instead = (l.state === 'dark' || l.state === 'partial') && l.lines.length > 0
        return (
          <section
            key={l.id}
            id={`${uid}-${l.id}`}
            className={`rl-panel rl-panel-${l.id}`}
            data-open={open === l.id ? 'true' : 'false'}
            aria-label={`${l.label}: ${l.stateLabel}`}
          >
            <p className="rl-panel-note" style={{ ['--i' as string]: 0 }}>
              <span className="rl-panel-who">{l.label}.</span> {l.note}
            </p>
            {l.source && (
              <p className="rl-panel-source" style={{ ['--i' as string]: 1 }}>
                {t.film}:{' '}
                <a href={l.source.url} target="_blank" rel="noopener" data-mp-location="film_source">
                  {l.source.label}
                </a>
              </p>
            )}
            {instead && (
              <p className="rl-panel-instead" style={{ ['--i' as string]: 1 }}>
                {t.instead}
              </p>
            )}
            {l.lines.map((line, n) => (
              <div key={line.key} className="rl-panel-step" style={{ ['--i' as string]: Math.min(n + 2, 3) }}>
                <LineBlock line={line} locale={locale} />
              </div>
            ))}
            {l.lines.length > 0 && <ScriptToggle locale={locale} page={page} />}
          </section>
        )
      })}
    </div>
  )
}

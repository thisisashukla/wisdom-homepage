'use client'

import React, { useState } from 'react'
import Icon from './Icon'
import { Cta, Hero } from './parts'
import { haptic } from './motion'

/**
 * One question, a list of cards (wisdom/app/components/onboarding/ChoiceScreen.tsx).
 * Each card rises from below with a slight tilt and settles level on a soft
 * spring, 140 ms apart; its portrait rises out of the card a beat later and
 * settles with one small bob; a second portrait slides out from behind the
 * first. A tap only selects (gold ring, check badge, the portrait lifts), so
 * the answer can change. Continue is always there, quiet until something is picked.
 */
export type ChoiceOption<T extends string> = { id: T; label: string; line?: string }

export default function ChoiceScreen<T extends string>({
  title,
  accent,
  sub,
  options,
  art,
  multi = false,
  initial = [],
  onDone,
  onToggle,
}: {
  title: string
  accent: string
  sub: string
  options: ChoiceOption<T>[]
  art?: Partial<Record<T, string | string[]>>
  multi?: boolean
  initial?: T[]
  onDone: (ids: T[]) => void
  onToggle?: (id: T, on: boolean) => void
}) {
  const [picked, setPicked] = useState<T[]>(initial)
  const lined = options.some((o) => o.line)

  const onRow = (id: T) => {
    haptic()
    if (multi) {
      setPicked((prev) => {
        const on = !prev.includes(id)
        onToggle?.(id, on)
        return on ? [...prev, id] : prev.filter((x) => x !== id)
      })
      return
    }
    if (picked[0] === id) return
    setPicked([id])
    onToggle?.(id, true)
  }

  const STAGGER = 140
  const ROWS_AT = 500 // D.normal + D.fast
  return (
    <>
      <Hero title={title} accent={accent} sub={sub} />
      <div className={`ob-list${art ? ' has-art' : ''}${lined ? ' is-lined' : ''}`} role={multi ? 'group' : 'radiogroup'} aria-label={`${title} ${accent}`}>
        {options.map((o, i) => {
          const on = picked.includes(o.id)
          const raw = art?.[o.id]
          const pics = raw == null ? [] : Array.isArray(raw) ? raw : [raw]
          const delay = ROWS_AT + i * STAGGER
          return (
            <div key={o.id} className="ob-card-in" style={{ '--d': `${delay}ms` } as React.CSSProperties}>
              <button
                type="button"
                role={multi ? 'checkbox' : 'radio'}
                aria-checked={on}
                className={`ob-row${pics.length ? ' ob-row-art' : ''}${on ? ' is-on' : ''}`}
                style={pics.length ? ({ '--stack': `${68 + 44 * (pics.length - 1)}px` } as React.CSSProperties) : undefined}
                onClick={() => onRow(o.id)}
              >
                <span className="ob-row-words">
                  <span className="ob-row-label">{o.label}</span>
                  {o.line && <span className="ob-row-line">{o.line}</span>}
                </span>
                {pics.length ? (
                  <span className="ob-stack" aria-hidden="true" style={{ width: `${68 + 44 * (pics.length - 1)}px` }}>
                    {pics[1] && (
                      <span className="ob-medal ob-medal-back" style={{ left: 44, '--d': `${delay + 500}ms` } as React.CSSProperties}>
                        <span className="ob-medal-face">
                          <img src={pics[1]} alt="" width={68} height={68} />
                        </span>
                      </span>
                    )}
                    <span className="ob-medal ob-medal-front" style={{ left: 0, '--d': `${delay + 180}ms` } as React.CSSProperties}>
                      <span className="ob-medal-face">
                        <img src={pics[0]} alt="" width={68} height={68} />
                        <span className="ob-badge">
                          <Icon name="check" weight="bold" size={12} />
                        </span>
                      </span>
                    </span>
                  </span>
                ) : (
                  <span className={`ob-ring${multi ? ' is-box' : ''}`} aria-hidden="true">
                    <Icon name="check" weight="bold" size={14} />
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </div>
      <Cta
        disabled={!picked.length}
        delay={ROWS_AT + STAGGER * options.length}
        onClick={() => {
          if (!picked.length) return
          haptic(12)
          onDone(options.map((o) => o.id).filter((x) => picked.includes(x)))
        }}
      >
        Continue
      </Cta>
    </>
  )
}

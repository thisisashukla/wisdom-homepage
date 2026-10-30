'use client'

/**
 * Chanakya's signature: pick a situation, get three verses. Every group is rendered
 * on the server (visible without JS, one after another); with JS only the picked one shows.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { fxTrack, type Locale } from '@/lib/funnels/sayings/shared'

export default function SituationPicker({ situations, locale, pageKey, label, children }: {
  situations: { id: string; label: string }[]
  locale: Locale
  pageKey: string
  label: string
  children: ReactNode
}) {
  const [on, setOn] = useState<string | null>(null)
  const [js, setJs] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => setJs(true), [])
  useEffect(() => {
    if (!js || !root.current) return
    root.current.querySelectorAll<HTMLElement>('[data-sit]').forEach((g) => {
      g.hidden = g.dataset.sit !== on
    })
  }, [js, on])
  const pick = (id: string) => {
    setOn(id)
    fxTrack('Situation Picked', { page: pageKey, locale, hub: 'chanakya' }, { situation: id })
    requestAnimationFrame(() => document.getElementById(`sit-${id}`)?.focus({ preventScroll: false }))
  }
  return (
    <div ref={root} className="fx-sit" data-js={js ? '' : undefined}>
      <div className="fx-sit-chips" role="group" aria-label={label}>
        {situations.map((s) => (
          <button key={s.id} type="button" className="fx-sit-chip" aria-pressed={on === s.id} onClick={() => pick(s.id)} lang={locale}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="fx-sit-groups">{children}</div>
    </div>
  )
}

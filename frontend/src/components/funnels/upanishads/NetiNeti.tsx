'use client'

/**
 * "Neti, neti" for Mandukya 7: each tap fades one descriptor until only
 * "shantam shivam advaitam" is left. Without JS the full list is visible.
 */
import { useEffect, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'

export type NetiItem = { sa: string; iast: string; en: string }

type Props = { items: NetiItem[]; rest: NetiItem }

export default function NetiNeti({ items, rest }: Props) {
  const [enhanced, setEnhanced] = useState(false)
  const [step, setStep] = useState(0)
  useEffect(() => setEnhanced(true), [])
  const done = step >= items.length

  const tap = () => {
    if (done) {
      setStep(0)
      return
    }
    const next = step + 1
    setStep(next)
    trackEvent(EVENTS.NetiStepClicked, { item_id: items[next - 1]?.iast, item_type: 'descriptor', position: next, of: items.length })
  }

  return (
    <div className="neti" data-done={done ? '' : undefined}>
      <ul className="neti-list">
        {items.map((it, i) => (
          <li key={it.iast} data-gone={enhanced && i < step ? '' : undefined} aria-hidden={enhanced && i < step ? true : undefined}>
            <span className="neti-sa sx-deva" lang="sa">
              {it.sa}
            </span>
            <span className="neti-sa sx-iast" lang="sa-Latn">
              {it.iast}
            </span>
            <span className="neti-en">{it.en}</span>
          </li>
        ))}
      </ul>
      <p className="neti-rest">
        <span className="neti-rest-sa sx-deva" lang="sa">
          {rest.sa}
        </span>
        <span className="neti-rest-sa sx-iast" lang="sa-Latn">
          {rest.iast}
        </span>
        <span className="neti-en">{rest.en}</span>
      </p>
      {enhanced && (
        <div className="neti-cta">
          <button type="button" className="sx-btn sx-btn--primary" onClick={tap}>
            {done ? 'Start again' : step === 0 ? 'Neti: not this' : 'Not this either'}
          </button>
          <p className="sc-progress" aria-live="polite">
            {done ? 'Peace, the good, one without a second.' : `${step} of ${items.length} set aside`}
          </p>
        </div>
      )}
    </div>
  )
}

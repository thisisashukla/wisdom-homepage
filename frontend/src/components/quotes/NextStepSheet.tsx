'use client'

/** Bottom sheet after the first copy/share/save of the session. Focus-trapped, Esc closes. */

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Locale } from '@/lib/quotes-shared'
import NextStep from './NextStep'
import { Icon } from './Icons'
import type { SheetAction } from './session'
import './card.css'

export type NextStepSheetProps = {
  action: SheetAction
  locale: Locale
  pageName: string
  pageKey?: string
  onClose: () => void
  startSituation?: string
}

const TITLES: Record<Locale, Record<SheetAction, string>> = {
  en: {
    copied: 'Copied. Want one every morning?',
    shared: 'Shared. Want one every morning?',
    saved: 'Saved. Want one every morning?',
  },
  hi: {
    copied: 'कॉपी हो गया। हर सुबह एक श्लोक चाहिए?',
    shared: 'शेयर हो गया। हर सुबह एक श्लोक चाहिए?',
    saved: 'सेव हो गया। हर सुबह एक श्लोक चाहिए?',
  },
}

const LATER: Record<Locale, { later: string; close: string }> = {
  en: { later: 'Not now', close: 'Close' },
  hi: { later: 'अभी नहीं', close: 'बंद करें' },
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function NextStepSheet({ action, locale, pageName, pageKey, onClose, startSituation }: NextStepSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const titleId = `qsheet-title-${action}`

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const html = document.documentElement
    html.setAttribute('data-q-sheet', 'open')
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !sheetRef.current) return
      const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !sheetRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !sheetRef.current.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      html.removeAttribute('data-q-sheet')
      try {
        prev?.focus({ preventScroll: true })
      } catch {
        // element gone
      }
    }
  }, [])

  const l = LATER[locale]

  return createPortal(
    <div className="qsheet-wrap" lang={locale}>
      <div className="qsheet-backdrop" onClick={onClose} aria-hidden="true" />
      <div ref={sheetRef} className="qsheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeRef} type="button" className="qsheet-x" aria-label={l.close} onClick={onClose}>
          <Icon name="close" />
        </button>
        <p id={titleId} className="qsheet-title">
          {TITLES[locale][action]}
        </p>
        <NextStep locale={locale} pageName={pageName} pageKey={pageKey} placement="sheet" startSituation={startSituation} />
        <button type="button" className="qsheet-later" onClick={onClose}>
          {l.later}
        </button>
      </div>
    </div>,
    document.body,
  )
}

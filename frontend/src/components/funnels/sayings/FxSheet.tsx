'use client'

/** Bottom sheet after the first copy, share or save of the session, with the hub's own next step. */

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/quotes/Icons'
import type { SheetAction } from '@/components/quotes/session'
import type { Hub, Locale } from '@/lib/funnels/sayings/shared'
import FxNextStep from './FxNextStep'
import '@/components/quotes/card.css'
import './sayings.css'

const TITLES: Record<Locale, Record<SheetAction, string>> = {
  en: { copied: 'Copied. Want one every morning?', shared: 'Shared. Want one every morning?', saved: 'Saved. Want one every morning?' },
  hi: { copied: 'कॉपी हो गया। हर सुबह एक पंक्ति चाहिए?', shared: 'शेयर हो गया। हर सुबह एक पंक्ति चाहिए?', saved: 'सेव हो गया। हर सुबह एक पंक्ति चाहिए?' },
}
const LATER: Record<Locale, { later: string; close: string }> = {
  en: { later: 'Not now', close: 'Close' },
  hi: { later: 'अभी नहीं', close: 'बंद करें' },
}
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function FxSheet({ action, hub, locale, pageName, pageKey, onClose }: {
  action: SheetAction
  hub: Hub
  locale: Locale
  pageName: string
  pageKey: string
  onClose: () => void
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const titleId = `fxsheet-title-${action}`

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
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
      try {
        prev?.focus({ preventScroll: true })
      } catch {
        // element gone
      }
    }
  }, [])

  const l = LATER[locale]
  return createPortal(
    <div className="qsheet-wrap fx-sheet" data-hub={hub} lang={locale}>
      <div className="qsheet-backdrop" onClick={onClose} aria-hidden="true" />
      <div ref={sheetRef} className="qsheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeRef} type="button" className="qsheet-x" aria-label={l.close} onClick={onClose}>
          <Icon name="close" />
        </button>
        <p id={titleId} className="qsheet-title">
          {TITLES[locale][action]}
        </p>
        <FxNextStep hub={hub} locale={locale} pageName={pageName} pageKey={pageKey} placement="sheet" />
        <button type="button" className="qsheet-later" onClick={onClose}>
          {l.later}
        </button>
      </div>
    </div>,
    document.body,
  )
}

'use client'

/**
 * Small trackers for the Chalisa pages.
 * LineOpenedOnView: Line Opened once when a line page loads.
 * MeaningTracker: Line Opened when a meaning is opened in the full text (details[data-hc-line]).
 * PrintButton: opens every meaning, then prints the sheet (Sheet Printed).
 */

import { useEffect } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { kindOf } from '@/lib/funnels/hanuman-chalisa/shared'

export function LineOpenedOnView({ line }: { line: string }) {
  useEffect(() => {
    trackEvent(EVENTS.LineOpened, { item_id: line, item_type: kindOf(line), location: 'page' })
  }, [line])
  return null
}

export function MeaningTracker() {
  useEffect(() => {
    const seen = new Set<string>()
    const onToggle = (e: Event) => {
      const el = e.target as HTMLDetailsElement
      if (!(el instanceof HTMLDetailsElement) || !el.open) return
      const line = el.dataset.hcLine
      if (!line || seen.has(line)) return
      seen.add(line)
      trackEvent(EVENTS.LineOpened, { item_id: line, item_type: kindOf(line), location: 'meaning' })
    }
    document.addEventListener('toggle', onToggle, true)
    return () => document.removeEventListener('toggle', onToggle, true)
  }, [])
  return null
}

export function PrintButton({ label }: { label: string }) {
  useEffect(() => {
    const open = () => document.querySelectorAll<HTMLDetailsElement>('details.hc-mean').forEach((d) => (d.open = true))
    window.addEventListener('beforeprint', open)
    return () => window.removeEventListener('beforeprint', open)
  }, [])
  return (
    <button
      type="button"
      className="sx-btn sx-btn--secondary hc-noprint"
      onClick={() => {
        document.querySelectorAll<HTMLDetailsElement>('details.hc-mean').forEach((d) => (d.open = true))
        trackEvent(EVENTS.SheetPrinted)
        window.print()
      }}
    >
      {label}
    </button>
  )
}

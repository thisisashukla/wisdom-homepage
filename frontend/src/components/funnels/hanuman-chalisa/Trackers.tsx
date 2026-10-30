'use client'

/**
 * Small trackers for the Chalisa pages.
 * LineOpenedOnView: "Chalisa Line Opened" once when a line page loads.
 * MeaningTracker: "Chalisa Line Opened" when a meaning is opened on the hub (details[data-hc-line]).
 * PrintButton: opens every meaning, then prints the sheet.
 */

import { useEffect } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import { baseProps, type HcLocale } from '@/lib/funnels/hanuman-chalisa/shared'

export function LineOpenedOnView({ line, page, locale }: { line: string; page: string; locale: HcLocale }) {
  useEffect(() => {
    trackEvent('Chalisa Line Opened', { ...baseProps(page, locale), line, via: 'page' })
  }, [line, page, locale])
  return null
}

export function MeaningTracker({ page, locale }: { page: string; locale: HcLocale }) {
  useEffect(() => {
    const seen = new Set<string>()
    const onToggle = (e: Event) => {
      const el = e.target as HTMLDetailsElement
      if (!(el instanceof HTMLDetailsElement) || !el.open) return
      const line = el.dataset.hcLine
      if (!line || seen.has(line)) return
      seen.add(line)
      trackEvent('Chalisa Line Opened', { ...baseProps(page, locale), line, via: 'meaning' })
    }
    document.addEventListener('toggle', onToggle, true)
    return () => document.removeEventListener('toggle', onToggle, true)
  }, [page, locale])
  return null
}

export function PrintButton({ label, page, locale }: { label: string; page: string; locale: HcLocale }) {
  useEffect(() => {
    const open = () => document.querySelectorAll<HTMLDetailsElement>('details.hc-mean').forEach((d) => (d.open = true))
    window.addEventListener('beforeprint', open)
    return () => window.removeEventListener('beforeprint', open)
  }, [])
  return (
    <button
      type="button"
      className="hc-btn hc-noprint"
      onClick={() => {
        document.querySelectorAll<HTMLDetailsElement>('details.hc-mean').forEach((d) => (d.open = true))
        trackEvent('Chalisa Sheet Printed', baseProps(page, locale))
        window.print()
      }}
    >
      {label}
    </button>
  )
}

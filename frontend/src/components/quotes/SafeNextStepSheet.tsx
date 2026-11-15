'use client'

/**
 * NextStepSheet, loaded ahead of time and fenced off from the page.
 * The sheet opens right after a save, which on iOS Chrome is also the moment the download is
 * handed off; if its lazy chunk fails then (or the sheet throws while rendering), next/dynamic
 * threw during render and the whole page fell to "Application error". Here the chunk is
 * preloaded with loadNextStepSheet(), a failed load just closes the sheet, and an error
 * boundary keeps any render error inside the sheet.
 */

import { Component, useEffect, useState, type ComponentType, type ReactNode } from 'react'
import type { NextStepSheetProps } from './NextStepSheet'

type SheetComponent = ComponentType<NextStepSheetProps>

let loaded: SheetComponent | null = null
let pending: Promise<SheetComponent> | null = null

/** Fetches the sheet's chunk once; safe to call many times. Rejects (and allows a retry) on failure. */
export function loadNextStepSheet(): Promise<SheetComponent> {
  if (loaded) return Promise.resolve(loaded)
  if (!pending) {
    pending = import('./NextStepSheet')
      .then((m) => {
        loaded = m.default
        return m.default
      })
      .catch((err) => {
        pending = null
        throw err
      })
  }
  return pending
}

class SheetBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('[NextStepSheet]', error)
    try {
      document.documentElement.removeAttribute('data-q-sheet')
    } catch {
      // nothing to clean
    }
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function SafeNextStepSheet(props: NextStepSheetProps) {
  const [Sheet, setSheet] = useState<SheetComponent | null>(() => loaded)
  const { onClose } = props

  useEffect(() => {
    if (Sheet) return
    let live = true
    loadNextStepSheet()
      .then((c) => {
        if (live) setSheet(() => c)
      })
      .catch(() => {
        if (live) onClose()
      })
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!Sheet) return null
  return (
    <SheetBoundary onError={onClose}>
      <Sheet {...props} />
    </SheetBoundary>
  )
}

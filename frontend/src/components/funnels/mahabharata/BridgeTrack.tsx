'use client'

import type { ReactNode } from 'react'
import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'

/**
 * Sends Gita Bridge Clicked for a kit Button that leads to the Gita (the kit Button only sends Link Clicked).
 * Used for the where-is-the-gita hero action until the kit Action takes a bridge flag (KIT_REQUESTS).
 */
export default function BridgeTrack({ location, from, children }: { location: string; from?: string; children: ReactNode }) {
  return (
    <div
      onClickCapture={(e) => {
        const a = (e.target as HTMLElement | null)?.closest?.('a')
        if (a) trackEventBeacon(EVENTS.GitaBridgeClicked, { href: a.getAttribute('href'), location, from: from ?? null })
      }}
    >
      {children}
    </div>
  )
}

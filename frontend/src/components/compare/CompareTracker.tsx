'use client'

import { useEffect } from 'react'
import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'

/**
 * Outbound links to other apps (their App Store, Google Play or website pages) carry
 * data-mp-tracked, so the site-wide trackers skip them and they never count as
 * "App Store Button Clicked" (that event means our own app). This sends Link Clicked
 * for them instead, with the app and the kind of link. Mount once per comparison page.
 */
export default function CompareTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const a = (event.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>('a[data-cx-out]')
      if (!a) return
      const href = a.getAttribute('href') || ''
      trackEventBeacon(EVENTS.LinkClicked, {
        location: a.dataset.cxLoc || 'compare_outbound',
        href,
        link_type: 'competitor',
        item_id: a.dataset.cxOut,
        item_type: 'app',
        to: href.includes('apps.apple.com') ? 'app_store' : href.includes('play.google.com') ? 'google_play' : 'website',
        is_app_store: false,
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}

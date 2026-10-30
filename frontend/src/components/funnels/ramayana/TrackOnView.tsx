'use client'

import { useEffect } from 'react'
import { trackFunnel } from '@/lib/funnels/ramayana/track'

/** Fires one funnel event when the page mounts (e.g. Scene Viewed). */
export default function TrackOnView({ event, page, locale, props }: { event: string; page: string; locale: 'en' | 'hi'; props?: Record<string, unknown> }) {
  const key = JSON.stringify(props ?? {})
  useEffect(() => {
    trackFunnel(event, { page, locale }, JSON.parse(key))
  }, [event, page, locale, key])
  return null
}

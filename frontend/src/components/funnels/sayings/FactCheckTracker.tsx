'use client'

import { useEffect } from 'react'
import { fxTrack, type Locale, type Verdict } from '@/lib/funnels/sayings/shared'

/** Fires "Fact Check Viewed" once per fact-check page view. */
export default function FactCheckTracker({ slug, verdict, pageKey, locale }: { slug: string; verdict: Verdict; pageKey: string; locale: Locale }) {
  useEffect(() => {
    fxTrack('Fact Check Viewed', { page: pageKey, locale, hub: 'vivekananda' }, { slug, verdict })
  }, [slug, verdict, pageKey, locale])
  return null
}

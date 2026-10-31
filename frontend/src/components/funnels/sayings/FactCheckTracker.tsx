'use client'

import { useEffect } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Verdict } from '@/lib/funnels/sayings/shared'

/** Fires Fact Check Viewed once per fact-check page view. */
export default function FactCheckTracker({ slug, verdict }: { slug: string; verdict: Verdict }) {
  useEffect(() => {
    trackEvent(EVENTS.FactCheckViewed, { item_id: slug, item_type: 'fact_check', verdict })
  }, [slug, verdict])
  return null
}

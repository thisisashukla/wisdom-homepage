'use client'

import { trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/quotes-shared'

/** Every Upanishads funnel event carries funnel, page and locale. */
export function upTrack(event: string, page: string, locale: Locale, props: Record<string, unknown> = {}) {
  trackEvent(event, { funnel: 'upanishads', page, locale, ...props })
}

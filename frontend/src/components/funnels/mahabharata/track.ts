'use client'

import { trackEvent, trackEventBeacon } from '@/lib/mixpanel'

export type MbLocale = 'en' | 'hi'

/** Every Mahabharata funnel event carries funnel, page and locale. */
export function mbTrack(event: string, page: string, locale: MbLocale, props: Record<string, unknown> = {}) {
  trackEvent(event, { funnel: 'mahabharata', page, locale, ...props })
}

/** For taps that navigate away. */
export function mbBeacon(event: string, page: string, locale: MbLocale, props: Record<string, unknown> = {}) {
  trackEventBeacon(event, { funnel: 'mahabharata', page, locale, ...props })
}

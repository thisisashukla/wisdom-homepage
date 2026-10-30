'use client'

/** Ramayana funnel events. Every event carries { funnel, page, locale }. */

import { trackEvent } from '@/lib/mixpanel'
import { FUNNEL } from './paths'

export type FunnelCtx = { page: string; locale: 'en' | 'hi' }

export function trackFunnel(event: string, ctx: FunnelCtx, props: Record<string, unknown> = {}) {
  trackEvent(event, { funnel: FUNNEL, page: ctx.page, locale: ctx.locale, ...props })
}

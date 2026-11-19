'use client'

import { api } from '@/lib/funnelClient'
import { EVENTS, trackEvent } from '@/lib/mixpanel'

/** `source` on the sign-in and the morning-verse row for the dwell card; also the pending-redirect tag. */
export const NUDGE_SOURCE = 'dwell_card'

const timeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return null
  }
}

/** After Google sign-in from the card: record the reader and set the morning verse. Never throws. */
export async function finishSignin(p: { daily: boolean; lang: 'en' | 'hi' }): Promise<'active' | 'off' | 'error'> {
  try {
    const out = await api<{ daily?: string }>('/api/me', { body: { daily: p.daily, lang: p.lang, tz: timeZone(), source: NUDGE_SOURCE } })
    if (p.daily) trackEvent(EVENTS.DailyEmailToggled, { to: out.daily === 'active', location: NUDGE_SOURCE })
    return out.daily === 'active' ? 'active' : 'off'
  } catch {
    return 'error'
  }
}

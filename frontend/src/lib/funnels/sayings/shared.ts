/**
 * Sayings funnel (Vivekananda, Kabir, Chanakya): client-safe types, constants
 * and the event helper. Server loaders live in ./data.ts.
 */

import { trackEvent, trackEventBeacon } from '@/lib/mixpanel'

export type Locale = 'en' | 'hi'
export type L10n = { en: string; hi: string }
export type Hub = 'vivekananda' | 'kabir' | 'chanakya' | 'rahim'
export type Verdict = 'in-his-words' | 'paraphrase' | 'not-found'

export const FUNNEL = 'sayings'
export const SITE = 'https://wisdomquotes.in'
export const UPDATED = '2026-10-30'

/** Every funnel event carries funnel, page, locale and hub. */
export type EventBase = { page: string; locale: Locale; hub: Hub }

export function fxTrack(event: string, base: EventBase, props: Record<string, unknown> = {}): void {
  trackEvent(event, { funnel: FUNNEL, ...base, ...props })
}

export function fxBeacon(event: string, base: EventBase, props: Record<string, unknown> = {}): void {
  trackEventBeacon(event, { funnel: FUNNEL, ...base, ...props })
}

export const VERDICT_LABEL: Record<Verdict, L10n> = {
  'in-his-words': { en: 'In his words', hi: 'उनके अपने शब्द' },
  paraphrase: { en: 'Paraphrase', hi: 'बदला हुआ रूप' },
  'not-found': { en: 'Not in his works', hi: 'उनकी रचनाओं में नहीं' },
}

/** Source of a Complete Works line, as the data carries it. */
export type VivSource = {
  volume: number
  work: string
  kind: L10n
  recordType: string
  url: string
  recordId: string
  translatedFromBengali: boolean
}

/** What the source drawer shows. Built on the server, one language. */
export type DrawerData = {
  quoteId: string
  verdict: Verdict
  line: string
  paragraph: string
  volume: number
  work: string
  kind: string
  url: string
  translated: boolean
}

export const chipText = (s: { volume: number; work: string }, locale: Locale): string =>
  locale === 'hi' ? `कम्प्लीट वर्क्स, खंड ${s.volume}, ${s.work}` : `Complete Works, vol ${s.volume}, ${s.work}`

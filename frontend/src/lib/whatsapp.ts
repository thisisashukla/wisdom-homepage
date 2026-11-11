/**
 * The daily shlok on WhatsApp: the channel link and the small client-side state shared by
 * every WhatsApp invitation (<WhatsAppDaily /> and the kit's NextStep): daily dismissal and
 * joined. Verses read come from lib/readingProgress (readCount / subscribeReading).
 *
 * The channel URL comes from NEXT_PUBLIC_WHATSAPP_CHANNEL_URL (inlined at build).
 * When it is unset, whatsappChannelUrl() returns null and nothing renders.
 */

import { readRaw, writeRaw } from '@/lib/storage'

/** Referenced literally so Next inlines it at build time. */
const RAW_CHANNEL = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || ''

/** The channel link, or null when unset or not an https WhatsApp link. */
export function whatsappChannelUrl(): string | null {
  const raw = RAW_CHANNEL.trim()
  if (!raw) return null
  try {
    const u = new URL(raw)
    if (u.protocol !== 'https:') return null
    if (!/(^|\.)whatsapp\.com$|^wa\.me$/i.test(u.hostname)) return null
    return u.toString()
  } catch {
    return null
  }
}

/** Verses read before the after-read card appears. */
export const AFTER_READ_THRESHOLD = 3

const DISMISS_KEY = 'wq_wa_daily_dismissed'
const JOINED_KEY = 'wq_wa_daily_joined'

function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** True when the reader closed the card earlier today (local date). */
export function dismissedToday(): boolean {
  return readRaw(DISMISS_KEY) === today()
}

/** Storage full or blocked: the card hides for this page view only. */
export function dismissForToday(): void {
  writeRaw(DISMISS_KEY, today())
}

/** True once the reader has tapped any WhatsApp join link; no invitation asks again after that. */
export function hasJoined(): boolean {
  return readRaw(JOINED_KEY) === '1'
}

export function markJoined(): void {
  writeRaw(JOINED_KEY, '1')
}

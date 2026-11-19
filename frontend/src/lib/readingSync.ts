'use client'

/**
 * Keeps a signed-in reader's Gita progress (wq_reading, lib/readingProgress.ts) the same on every device.
 * On sign-in, and a few seconds after any change, this device's copy goes to /api/me/reading; the account's
 * merged copy comes back and replaces the local one when it differs (lib/readingMerge.ts decides how).
 */

import { applyReading, readCount, readingSnapshot, subscribeReading, type ReadingStore } from '@/lib/readingProgress'
import { cleanReading, sameReading } from '@/lib/readingMerge'
import { api } from '@/lib/funnelClient'
import { EVENTS, trackEvent } from '@/lib/mixpanel'

const DEBOUNCE_MS = 3000

let stopCurrent: (() => void) | null = null

/** Start syncing for the signed-in reader (call again after a different reader signs in). Returns a stop. */
export function startReadingSync(): () => void {
  stopCurrent?.()
  let alive = true
  let timer: number | undefined
  let inFlight = false
  let again = false
  let lastSent = ''
  let first = true

  const sync = async () => {
    if (!alive) return
    if (inFlight) {
      again = true
      return
    }
    const local = cleanReading(readingSnapshot())
    const key = JSON.stringify(local)
    if (!first && key === lastSent) return
    inFlight = true
    try {
      const { data } = await api<{ data: unknown }>('/api/me/reading', { body: { data: local } })
      if (!alive) return
      const merged = cleanReading(data)
      lastSent = JSON.stringify(merged)
      const pulled = !sameReading(local, merged)
      if (pulled) applyReading(merged as ReadingStore)
      if (first) trackEvent(EVENTS.ReadingSynced, { read_count: readCount(), saved_count: merged.saved.length, pulled })
      first = false
    } catch {
      // offline or signed out mid-way: the next change tries again
    } finally {
      inFlight = false
      if (again && alive) {
        again = false
        schedule()
      }
    }
  }

  const schedule = () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(sync, DEBOUNCE_MS)
  }

  void sync()
  const unsub = subscribeReading(schedule)
  const onHide = () => {
    if (document.visibilityState === 'hidden') void sync()
  }
  document.addEventListener('visibilitychange', onHide)

  const stop = () => {
    alive = false
    window.clearTimeout(timer)
    unsub()
    document.removeEventListener('visibilitychange', onHide)
    if (stopCurrent === stop) stopCurrent = null
  }
  stopCurrent = stop
  return stop
}

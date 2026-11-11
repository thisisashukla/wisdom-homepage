/**
 * Small, safe wrappers around localStorage for the features that keep state on this device
 * (reading progress, kept lines, the WhatsApp card, the install card, today's line).
 *
 * Safe to import anywhere: nothing touches window at import time, every call is wrapped in
 * try/catch (private mode, quota, blocked storage), and every reader returns the fallback on
 * the server. Writers return false when the value could not be stored.
 */

export const storage = (): Storage | null => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readRaw(key: string): string | null {
  const ls = storage()
  if (!ls) return null
  try {
    return ls.getItem(key)
  } catch {
    return null
  }
}

export function writeRaw(key: string, value: string): boolean {
  const ls = storage()
  if (!ls) return false
  try {
    ls.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function removeKey(key: string): boolean {
  const ls = storage()
  if (!ls) return false
  try {
    ls.removeItem(key)
    return true
  } catch {
    return false
  }
}

/** Parsed JSON at `key`, or `fallback` when missing, unreadable or not valid JSON. */
export function readJSON<T>(key: string, fallback: T): T {
  const raw = readRaw(key)
  if (raw === null) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): boolean {
  let raw: string
  try {
    raw = JSON.stringify(value)
  } catch {
    return false
  }
  return writeRaw(key, raw)
}

/** Dispatch a same-tab change event on window (other tabs hear the 'storage' event). */
export function emit(event: string): void {
  if (typeof window === 'undefined') return
  try {
    window.dispatchEvent(new CustomEvent(event))
  } catch {
    /* old browsers */
  }
}

/**
 * Call `cb` when any of `keys` changes in another tab, or when `event` fires in this one.
 * Returns an unsubscribe. Client components only (call inside an effect).
 */
export function subscribeKeys(keys: string[], event: string, cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || keys.includes(e.key)) cb()
  }
  window.addEventListener(event, cb)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(event, cb)
    window.removeEventListener('storage', onStorage)
  }
}

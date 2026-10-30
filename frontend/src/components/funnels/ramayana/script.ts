'use client'

/**
 * Which script the original lines show in: Devanagari or IAST. One choice for the
 * whole page (and the next visit), so every lamp and plan day follows the toggle.
 */

import { useSyncExternalStore } from 'react'

export type Script = 'deva' | 'iast'
const KEY = 'wisdom.ramayana.script'
let current: Script | null = null
const subs = new Set<() => void>()

function read(): Script {
  if (current) return current
  try {
    current = window.localStorage.getItem(KEY) === 'iast' ? 'iast' : 'deva'
  } catch {
    current = 'deva'
  }
  return current
}

export function setScript(s: Script) {
  current = s
  try {
    window.localStorage.setItem(KEY, s)
  } catch {
    // private mode: keep it for this page only
  }
  subs.forEach((f) => f())
}

const subscribe = (f: () => void) => {
  subs.add(f)
  return () => {
    subs.delete(f)
  }
}

export function useScript(): Script {
  return useSyncExternalStore(subscribe, read, () => 'deva')
}

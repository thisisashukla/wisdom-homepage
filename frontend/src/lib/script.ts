'use client'

import { useSyncExternalStore } from 'react'

/**
 * The reader's script for Sanskrit, Awadhi and Hindi verse: Devanagari or IAST (Roman), never both.
 * One choice for the whole site, kept in localStorage and mirrored on <html data-script>.
 * CSS in styles/tokens.css hides .sx-iast or .sx-deva accordingly. SCRIPT_BOOT (root layout)
 * applies the saved choice before first paint, so there is no flash.
 */
export type Script = 'deva' | 'iast'

import { SCRIPT_KEY } from './scriptBoot'
export { SCRIPT_KEY } from './scriptBoot'

const listeners = new Set<() => void>()

function read(): Script {
  if (typeof document === 'undefined') return 'deva'
  return document.documentElement.getAttribute('data-script') === 'iast' ? 'iast' : 'deva'
}

export function setScript(s: Script) {
  const root = document.documentElement
  if (s === 'iast') root.setAttribute('data-script', 'iast')
  else root.removeAttribute('data-script')
  try {
    localStorage.setItem(SCRIPT_KEY, s)
  } catch {
    // storage blocked: the choice lasts for this page
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

/** Current script; re-renders when any toggle on the page changes it. Server render: Devanagari. */
export function useScript(): Script {
  return useSyncExternalStore(subscribe, read, () => 'deva')
}

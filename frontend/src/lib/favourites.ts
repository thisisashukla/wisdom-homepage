/**
 * Lines a visitor keeps ("Keep" / "रखें" on a quote card). Stored on the device only, in
 * localStorage under "wq_favourites": [{ id, hub, t }] where id is the quote id, hub the
 * normalised path of the quote hub it was kept on, and t the time in ms.
 *
 * SSR safe: every function returns an empty result on the server, and storage errors (private
 * mode, quota, blocked storage) fall back to an in-memory list for the life of the tab.
 * Changes are broadcast with a window event so every card showing the same line stays in step,
 * and the storage event keeps other tabs in step.
 */

import { emit, readRaw, storage, subscribeKeys, writeRaw } from '@/lib/storage'

export type Favourite = { id: string; hub: string; t: number }

export const FAVOURITES_KEY = 'wq_favourites'
const CHANGE_EVENT = 'wq:favourites'
const MAX = 300
const EMPTY: Favourite[] = []

let memory: Favourite[] | null = null
let cacheRaw: string | null | undefined
let cacheList: Favourite[] = EMPTY

/** "/blogs/krishna-quotes/" and "/blogs/krishna-quotes?x=1" both become "/blogs/krishna-quotes". */
export function normHub(path: string): string {
  const p = (path || '/').split(/[?#]/)[0] || '/'
  return p.length > 1 ? p.replace(/\/+$/, '') || '/' : p
}

function valid(x: unknown): x is Favourite {
  if (!x || typeof x !== 'object') return false
  const f = x as Record<string, unknown>
  return typeof f.id === 'string' && f.id.length > 0 && typeof f.hub === 'string' && typeof f.t === 'number'
}

function parse(raw: string | null): Favourite[] {
  if (!raw) return EMPTY
  try {
    const data: unknown = JSON.parse(raw)
    return Array.isArray(data) ? data.filter(valid) : EMPTY
  } catch {
    return EMPTY
  }
}

/** All kept lines, newest last. Returns the same array until the store changes. */
export function getFavourites(): Favourite[] {
  if (typeof window === 'undefined') return EMPTY
  if (memory) return memory
  if (!storage()) return EMPTY
  const raw = readRaw(FAVOURITES_KEY)
  if (raw !== cacheRaw) {
    cacheRaw = raw
    cacheList = parse(raw)
  }
  return cacheList
}

/** Server snapshot: always empty, so first client render matches the server HTML. */
export const getServerFavourites = (): Favourite[] => EMPTY

function save(list: Favourite[]): void {
  const next = list.slice(-MAX)
  const raw = JSON.stringify(next)
  if (writeRaw(FAVOURITES_KEY, raw)) {
    cacheRaw = raw
    cacheList = next
    memory = null
  } else {
    memory = next
  }
  emit(CHANGE_EVENT)
}

export function isFavourite(id: string, hub: string): boolean {
  const h = normHub(hub)
  return getFavourites().some((f) => f.id === id && f.hub === h)
}

export function addFavourite(id: string, hub: string): void {
  if (typeof window === 'undefined' || isFavourite(id, hub)) return
  save([...getFavourites(), { id, hub: normHub(hub), t: Date.now() }])
}

export function removeFavourite(id: string, hub: string): void {
  if (typeof window === 'undefined') return
  const h = normHub(hub)
  const list = getFavourites()
  const next = list.filter((f) => !(f.id === id && f.hub === h))
  if (next.length !== list.length) save(next)
}

/** Keeps or lets go of a line on a hub. Returns the new state (true = kept). */
export function toggleFavourite(id: string, hub: string): boolean {
  if (isFavourite(id, hub)) {
    removeFavourite(id, hub)
    return false
  }
  addFavourite(id, hub)
  return true
}

/** Lines kept on one hub, newest first. */
export function favouritesForHub(hub: string, list: Favourite[] = getFavourites()): Favourite[] {
  const h = normHub(hub)
  return list.filter((f) => f.hub === h).sort((a, b) => b.t - a.t)
}

/** Calls back on any change in this tab or another tab. Returns the unsubscribe. */
export function subscribeFavourites(cb: () => void): () => void {
  return subscribeKeys([FAVOURITES_KEY], CHANGE_EVENT, cb)
}

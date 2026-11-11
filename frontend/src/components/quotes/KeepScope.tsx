'use client'

/**
 * Turns on "Keep" for every QuoteCard inside it and tells the cards which hub they belong to.
 * QuotePage wraps the whole hub in it, so the cards, the line picker and "Lines Krishna never said"
 * all get the control. Cards outside a scope (verse pages, older blog pages) show no Keep, since
 * nothing on those pages shows the kept lines again.
 */

import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react'
import { getFavourites, getServerFavourites, normHub, subscribeFavourites, type Favourite } from '@/lib/favourites'

const HubContext = createContext<string | null>(null)

export default function KeepScope({ hub, children }: { hub: string; children: ReactNode }) {
  return <HubContext.Provider value={normHub(hub)}>{children}</HubContext.Provider>
}

/** The hub path of the enclosing KeepScope, or null outside one. */
export const useKeepHub = (): string | null => useContext(HubContext)

/** Every kept line on this device. Empty on the server and during hydration. */
export function useFavourites(): Favourite[] {
  return useSyncExternalStore(subscribeFavourites, getFavourites, getServerFavourites)
}

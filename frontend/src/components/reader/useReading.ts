'use client'

import { useEffect, useState } from 'react'
import { subscribeReading } from '@/lib/readingProgress'

/**
 * Re-render when reading progress changes. Returns false during SSR and the first client
 * render, so components can render null until localStorage has been read (no hydration
 * mismatch), then a changing number on every update.
 */
export function useReadingTick(): number | false {
  const [tick, setTick] = useState<number | false>(false)
  useEffect(() => {
    setTick(1)
    return subscribeReading(() => setTick((t) => (t === false ? 1 : t + 1)))
  }, [])
  return tick
}

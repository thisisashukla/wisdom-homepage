import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { isRead, markRead, readCount, verseItemId } from '@/lib/readingProgress'

export type ReadTrigger = 'dwell' | 'audio' | 'scroll'

/** Verses already counted in this page view, so Verse Read fires once even when storage fails. */
const counted = new Set<string>()

/**
 * Mark a verse read and, the first time only, send Verse Read
 * { item_id, item_type, read_count, trigger, location }.
 * Returns true when the verse was newly counted.
 */
export function recordRead(chapter: number, verse: number, opts: { trigger: ReadTrigger; location: string }): boolean {
  const id = verseItemId(chapter, verse)
  if (counted.has(id)) return false
  counted.add(id)
  if (isRead(chapter, verse)) return false
  markRead(chapter, verse)
  trackEvent(EVENTS.VerseRead, {
    item_id: id,
    item_type: 'verse',
    read_count: readCount(),
    trigger: opts.trigger,
    location: opts.location,
  })
  return true
}

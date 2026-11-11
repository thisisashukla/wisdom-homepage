/**
 * Element ids the reader trackers look for. A plain module (no 'use client'), so server
 * pages can import the string without pulling a client component into their bundle.
 */

/** The verse page puts this id on the translation block; ReadingTracker counts a read once it scrolls past. */
export const VERSE_TRANSLATION_ID = 'verse-translation'

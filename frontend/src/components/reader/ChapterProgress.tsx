'use client'

/**
 * Per-chapter progress line and per-verse read marks.
 *
 *   <ChapterProgress chapter={3} total={43} lang="en" />   → "12 of 43 read" + thin bar
 *   <ReadTick chapter={3} verse={12} />                      → small ✓ when 3.12 is read
 *
 * Both render null on the server and for verses / chapters with nothing read yet, and
 * update live when ReadingTracker or read mode marks a verse.
 */

import { chapterReadCount, isRead, type ReadingLang } from '@/lib/readingProgress'
import { useReadingTick } from './useReading'
import './reader.css'

type ProgressProps = {
  chapter: number
  /** Verses in the chapter (Chapter.totalVerses). */
  total: number
  lang: ReadingLang
  className?: string
}

export default function ChapterProgress({ chapter, total, lang, className = '' }: ProgressProps) {
  const tick = useReadingTick()
  if (tick === false || total <= 0) return null
  const n = Math.min(chapterReadCount(chapter), total)
  if (n === 0) return null
  const pct = Math.max(3, Math.round((n / total) * 100))
  const label = lang === 'hi' ? `इस अध्याय के ${n} / ${total} पढ़े` : `${n} of ${total} read`
  const done = n >= total
  return (
    <div className={`rd-progress rd-progress--chapter${done ? ' is-done' : ''} ${className}`.trim()} lang={lang}>
      <div
        className="rd-progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={n}
        aria-label={label}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <span className="rd-progress-label">{label}</span>
    </div>
  )
}

type TickProps = { chapter: number; verse: number; lang?: ReadingLang; className?: string }

export function ReadTick({ chapter, verse, lang = 'en', className = '' }: TickProps) {
  const tick = useReadingTick()
  if (tick === false || !isRead(chapter, verse)) return null
  const label = lang === 'hi' ? 'पढ़ा हुआ' : 'Read'
  return (
    <span className={`rd-tick ${className}`.trim()} role="img" aria-label={label} title={label}>
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

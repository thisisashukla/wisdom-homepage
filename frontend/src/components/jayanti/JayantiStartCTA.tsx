'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/site/Button'
import { daysIncl, chapterFor } from './jayantiDate'

const TOTAL_VERSES = 700

type Cta = { label: string; href: string; line: string; key: string }

function ctaFor(n: number | null): Cta {
  // Server render and first paint: valid on any day.
  if (n === null || n > 18) {
    const per = n ? Math.ceil(TOTAL_VERSES / n) : null
    return {
      label: 'Start reading today',
      href: '/gita/chapter/1',
      line: per ? `About ${per} verses a day and you finish the Gita on Jayanti.` : 'Begin at chapter 1, where Arjuna sets down his bow.',
      key: 'start',
    }
  }
  if (n === 1) {
    return { label: 'Read chapter 18 today', href: '/gita/chapter/18', line: 'The chapter the Gita ends on, for the day it began.', key: 'jayanti' }
  }
  if (n >= 2) {
    const ch = chapterFor(n)
    return {
      label: `Read today’s chapter: ${ch}`,
      href: `/gita/chapter/${ch}`,
      line: `One chapter a day from here and chapter 18 falls on Jayanti.`,
      key: 'today_chapter',
    }
  }
  return { label: 'Start with chapter 1', href: '/gita/chapter/1', line: 'One chapter a day, whenever you begin.', key: 'after' }
}

/**
 * The hero's main button: today's chapter from the reader's own date (kit primary Button; the click is
 * Link Clicked { location: <location>_<key> } through data-mp-location), with the line under it.
 */
export default function JayantiStartCTA({ location }: { location: string }) {
  const [n, setN] = useState<number | null>(null)
  useEffect(() => setN(daysIncl(new Date())), [])
  const c = ctaFor(n)
  return (
    <div className="gj-start">
      <Button href={c.href} label={c.label} location={`${location}_${c.key}`} variant="primary" />
      <p className="gj-start-line">{c.line}</p>
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { trackLinkClick } from '@/lib/mixpanel'
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

export default function JayantiStartCTA({ className, location }: { className?: string; location: string }) {
  const [n, setN] = useState<number | null>(null)
  useEffect(() => setN(daysIncl(new Date())), [])
  const c = ctaFor(n)
  const loc = `${location}_${c.key}`
  return (
    <div className="gj-start">
      <a href={c.href} className={className} data-mp-location={loc} onClick={() => trackLinkClick('Gita Jayanti', loc, c.href)}>
        {c.label}
      </a>
      <p className="gj-start-line">{c.line}</p>
    </div>
  )
}

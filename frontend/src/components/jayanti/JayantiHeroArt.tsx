'use client'

import React, { useEffect, useState } from 'react'
import { chapterFor, daysIncl } from './jayantiDate'

/**
 * Hero background: the art for the chapter the main button points to.
 * The server picks one from its own date; the client corrects it to the
 * reader's date and crossfades if it changed.
 */
export default function JayantiHeroArt({ serverChapter }: { serverChapter: number }) {
  const [ch, setCh] = useState(serverChapter)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    const c = chapterFor(daysIncl(new Date()))
    if (c !== serverChapter) {
      setPrev(serverChapter)
      setCh(c)
    }
  }, [serverChapter])

  return (
    <>
      {prev !== null && (
        <img src={`/assets/chapter${prev}.webp`} alt="" aria-hidden="true" className="gj-hero-bg gj-hero-bg--out" />
      )}
      <img
        key={ch}
        src={`/assets/chapter${ch}.webp`}
        alt=""
        aria-hidden="true"
        className={`gj-hero-bg${prev !== null ? ' gj-hero-bg--in' : ''}`}
        fetchPriority="high"
      />
    </>
  )
}

'use client'

/**
 * Phone-only bar after 30% scroll: "Find your line for today", jumps to
 * #line-for-you. Hidden while LineForYou is on screen or the sheet is open
 * (html[data-q-sheet], in CSS). Dismissed for the session.
 */

import { useEffect, useState } from 'react'
import { detectPlatform } from '@/lib/app'
import { trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/quotes-shared'
import { Icon } from './Icons'
import { LINEBAR_KEY, prefersReducedMotion, sessionFlag, setSessionFlag } from './session'
import './card.css'
import './quotes.css'

const T = {
  en: { go: 'Find your line for today', close: 'Hide this bar' },
  hi: { go: 'आज का अपना श्लोक पाएं', close: 'यह पट्टी हटाएं' },
}

export default function LineBar({ locale, pageName }: { locale: Locale; pageName: string }) {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(true)
  const t = T[locale]

  useEffect(() => {
    if (detectPlatform() === 'desktop' || sessionFlag(LINEBAR_KEY)) return
    const target = document.getElementById('line-for-you')
    if (!target) return
    setDismissed(false)
    let targetVisible = false
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      setShow(ratio > 0.3 && !targetVisible)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((entries) => {
            targetVisible = entries.some((e) => e.isIntersecting)
            update()
          })
        : null
    io?.observe(target)
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (dismissed || !show) return null

  const go = () => {
    const target = document.getElementById('line-for-you')
    trackEvent('Line Bar Tapped', { page: pageName, locale })
    if (!target) return
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    target.querySelector<HTMLElement>('button')?.focus({ preventScroll: true })
  }
  const close = () => {
    setSessionFlag(LINEBAR_KEY)
    setDismissed(true)
  }

  return (
    <div className="qbar" lang={locale}>
      <button type="button" className="qbar-go" onClick={go}>
        {t.go}
      </button>
      <button type="button" className="qbar-x" aria-label={t.close} onClick={close}>
        <Icon name="close" />
      </button>
    </div>
  )
}

'use client'

import { useEffect } from 'react'

/**
 * The floating ← prev · now · next → pill covers the shloka if it is shown on
 * first paint. Keep it hidden until the reader has scrolled past the first
 * screen, and tuck it away while they scroll down so it never sits on top of
 * the text they are reading; it comes back as soon as they scroll up or stop
 * near the end of the page.
 */
export default function VerseNavReveal() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.gv-versenav')
    if (!nav) return
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      ticking = false
      const y = window.scrollY
      const vh = window.innerHeight
      const nearEnd = y + vh >= document.documentElement.scrollHeight - 240
      const pastHero = y > vh * 0.75
      const goingUp = y < lastY - 4
      const show = pastHero && (goingUp || nearEnd)
      if (Math.abs(y - lastY) > 4 || nearEnd || !pastHero) {
        nav.toggleAttribute('data-hidden', !show)
      }
      lastY = y
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    nav.setAttribute('data-hidden', '')
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}

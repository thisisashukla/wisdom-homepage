'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * One scroll-reveal system for the whole Dhyaan site, mounted once in the layout.
 * Anything with data-reveal, plus the common content blocks listed in AUTO, fades and
 * rises into place the first time it scrolls into view. Elements revealed in the same
 * frame get a small stagger (--rv). Hidden starting states only apply under
 * html.dh-js with motion allowed (see dhyaan.css), so no-JS and reduced-motion
 * readers always see the finished page.
 */
const AUTO = [
  '.dh-prose > :is(h2, h3, p, ul, ol, table, blockquote, figure)',
  '.dh-sec__head',
  '.dh-card',
  '.dh-tw',
  '.dh-faq details',
  '.dh-cta',
  '.dh-answer',
  '.dh-cluster',
  '.dh-refs-wrap',
  '.dh-related',
  '.dh-step',
  '.dh-pcard',
  '.dh-acard',
].join(',')

export default function Reveal() {
  const path = usePathname()
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(AUTO).forEach((el) => {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '')
    })
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          el.style.setProperty('--rv', String(Math.min(n++, 6)))
          el.classList.add('is-in')
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return null
}

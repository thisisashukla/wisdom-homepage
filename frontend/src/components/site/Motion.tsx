'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const STAGGER_CAP = 420

/**
 * Site-wide scroll reveals. Mounted once in the root layout: adds html.motion, staggers
 * [data-stagger] groups and adds .in to every .rv as it enters the viewport, including
 * .rv elements rendered later on the client. Pages do not mount their own reveal code.
 */
export default function Motion() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.classList.add('motion')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -24px 0px' }
    )

    const seen = new WeakSet<Element>()
    const scan = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
        const step = Number(group.dataset.stagger || 60)
        const kids = Array.from(group.querySelectorAll<HTMLElement>(':scope > .rv, :scope > * > .rv'))
        kids.forEach((k, i) => k.style.setProperty('--d', `${reduce ? 0 : Math.min(i * step, STAGGER_CAP)}ms`))
      })
      scope.querySelectorAll('.rv:not(.in)').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        io.observe(el)
      })
    }
    scan(document)

    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && scan(n.parentElement ?? n))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}

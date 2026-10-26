'use client'

import { useEffect, useState } from 'react'

const PLAN_HREF = '/start?ref=menu'
const PLAN_LABEL = 'Create my free Gita reading plan'

const links = [
  { href: '/gita', label: 'Read the Gita' },
  { href: '/hi/gita', label: 'हिंदी गीता' },
  { href: '/gita/today', label: 'Verse of the Day' },
  { href: '/gita-for', label: 'Gita for Life' },
  { href: '/blogs', label: 'Blog' },
  { href: '/app', label: 'The Wisdom app' },
  { href: '/about', label: 'About' },
]


export function MobileNavToggle() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    // Lock the page behind the open drawer so it can't scroll or be tapped.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        data-open={open || undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        id="mobile-nav-drawer"
        className="mobile-nav-drawer"
        data-open={open || undefined}
        hidden={!open}
      >
        <ul>
          <li>
            <a
              href={PLAN_HREF}
              className="mobile-nav-app"
              data-mp-location="mobile_nav_drawer_app"
              onClick={() => setOpen(false)}
            >
              {PLAN_LABEL}
              <span className="mobile-nav-app-sub">Week 1 free</span>
            </a>
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MobileNavToggle

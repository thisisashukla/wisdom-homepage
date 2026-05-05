'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#topics', label: 'Topics' },
  { href: '/blogs', label: 'Blog' },
]

export function MobileNavToggle() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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

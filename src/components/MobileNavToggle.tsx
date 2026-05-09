'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '/gita', label: 'Read the Gita' },
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#topics', label: 'Topics' },
  { href: '/blogs', label: 'Blog' },
]

const APP_STORE_URL = 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125'

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
          <li>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-mp-location="mobile_nav_drawer_download"
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                marginTop: 8,
                padding: '13px 4px',
                fontWeight: 700,
                color: '#f5c96a',
                borderBottom: 0,
              }}
            >
              ↓ Download Free on the App Store
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MobileNavToggle

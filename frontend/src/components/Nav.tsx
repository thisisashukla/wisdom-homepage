'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { localeForPath, type Locale } from '@/lib/locale'
import { activeItem, MORE_LABEL, NAV_APP, NAV_PRIMARY, NAV_SCRIPTURES, NAV_SECONDARY, SCRIPTURES_LABEL, type NavItem } from '@/lib/nav'
import MobileNavToggle from './MobileNavToggle'
import './nav.css'

interface NavProps {
  /** Transparent over a full-bleed hero until the hero scrolls away (homepage, Gita Jayanti). */
  overlayHero?: boolean
  /** Defaults to the locale of the URL (/hi/... is Hindi). */
  locale?: Locale
}

/**
 * The one site nav, on every page. Desktop: primary links, a More menu with every scripture
 * funnel, and the app link. Phone: logo, app link and the drawer (same links, same order).
 * Links come from lib/nav.ts; the current section gets aria-current.
 */
export default function Nav({ overlayHero, locale: localeProp }: NavProps) {
  const pathname = usePathname()
  const locale = localeProp ?? localeForPath(pathname)
  const active = activeItem([...NAV_PRIMARY, ...NAV_SCRIPTURES, ...NAV_SECONDARY], pathname, locale)
  const moreActive = active !== null && (NAV_SCRIPTURES.includes(active) || NAV_SECONDARY.includes(active))

  return (
    <nav className={`site-nav${overlayHero ? ' site-nav--overlay' : ''}`} aria-label={locale === 'hi' ? 'मुख्य' : 'Main'}>
      <div className="nav-inner">
        <a href="/" className="logo">
          <div className="logo-mark">
            <img src="/assets/new-light-logo.webp" alt="" width="32" height="32" />
          </div>
          Wisdom
        </a>
        <a href={NAV_APP.href} className="nav-app-link nav-app-link--mobile" data-nav-app="" data-mp-location="nav_app_mobile">
          <PhoneIcon />
          {NAV_APP.short[locale]}
        </a>
        <MobileNavToggle locale={locale} active={active} />
        <ul className="nav-links">
          {NAV_PRIMARY.map((it) => (
            <li key={it.href.en}>
              <NavLink item={it} locale={locale} current={active === it} location="nav_primary" />
            </li>
          ))}
          <li>
            <MoreMenu locale={locale} active={active} current={moreActive} />
          </li>
          <li>
            <a href={NAV_APP.href} className="nav-app-link" data-nav-app="" data-mp-location="nav_app_desktop">
              <PhoneIcon />
              {NAV_APP.label[locale]}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

function NavLink({ item, locale, current, location, className = 'nav-page-link' }: { item: NavItem; locale: Locale; current: boolean; location: string; className?: string }) {
  const href = item.href[locale]
  return (
    <a href={href} className={className} aria-current={current ? 'page' : undefined} hrefLang={href.startsWith('/hi') ? 'hi' : undefined} data-mp-location={location}>
      {item.label[locale]}
    </a>
  )
}

function MoreMenu({ locale, active, current }: { locale: Locale; active: NavItem | null; current: boolean }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = () => {
    if (!open) trackEvent(EVENTS.NavMenuOpened, { menu: 'more' })
    setOpen(!open)
  }

  return (
    <div className="nav-more" ref={root} data-open={open || undefined} onBlur={(e) => !root.current?.contains(e.relatedTarget as Node) && setOpen(false)}>
      <button ref={btn} type="button" className="nav-page-link nav-more-btn" aria-expanded={open} aria-controls="nav-more-menu" aria-current={current ? 'true' : undefined} onClick={toggle}>
        {MORE_LABEL[locale]}
        <svg className="nav-more-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id="nav-more-menu" className="nav-more-panel" hidden={!open}>
        <p className="nav-more-label">{SCRIPTURES_LABEL[locale]}</p>
        <ul className="nav-more-grid">
          {NAV_SCRIPTURES.map((it) => (
            <li key={it.href.en}>
              <a href={it.href[locale]} className="nav-more-item" aria-current={active === it ? 'page' : undefined} hrefLang={it.href[locale].startsWith('/hi') ? 'hi' : undefined} data-mp-location="nav_more" onClick={() => setOpen(false)}>
                <span className="nav-more-title">{it.label[locale]}</span>
                {it.note && <span className="nav-more-note">{it.note[locale]}</span>}
              </a>
            </li>
          ))}
        </ul>
        <ul className="nav-more-foot">
          {NAV_SECONDARY.map((it) => (
            <li key={it.href.en}>
              <NavLink item={it} locale={locale} current={active === it} location="nav_more" className="nav-more-sub" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg className="nav-app-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  )
}

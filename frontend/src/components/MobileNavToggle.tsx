'use client'

import { useEffect, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { NAV_APP, NAV_PLAN, NAV_PRIMARY, NAV_SCRIPTURES, NAV_SECONDARY, SCRIPTURES_LABEL, type NavItem } from '@/lib/nav'

/** Phone drawer: the same links as the desktop bar and More menu (lib/nav.ts), in the same order. */
export function MobileNavToggle({ locale = 'en', active = null }: { locale?: Locale; active?: NavItem | null }) {
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

  const toggle = () => {
    if (!open) trackEvent(EVENTS.NavMenuOpened, { menu: 'drawer' })
    setOpen((o) => !o)
  }
  const close = () => setOpen(false)
  const item = (it: NavItem, location: string) => {
    const href = it.href[locale]
    return (
      <li key={it.href.en}>
        <a href={href} aria-current={active === it ? 'page' : undefined} hrefLang={href.startsWith('/hi') ? 'hi' : undefined} data-mp-location={location} onClick={close}>
          {it.label[locale]}
        </a>
      </li>
    )
  }

  return (
    <>
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={locale === 'hi' ? 'मेन्यू' : 'Menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        data-open={open || undefined}
        onClick={toggle}
      >
        <span />
        <span />
        <span />
      </button>
      <div id="mobile-nav-drawer" className="mobile-nav-drawer" data-open={open || undefined} hidden={!open}>
        <ul>
          <li>
            <a href={NAV_PLAN.href} className="mobile-nav-app" data-mp-location="mobile_nav_drawer_plan" onClick={close}>
              {NAV_PLAN.label[locale]}
            </a>
          </li>
          {NAV_PRIMARY.map((it) => item(it, 'nav_drawer'))}
          <li>
            <a href={NAV_APP.href} aria-current={undefined} data-mp-location="mobile_nav_drawer_app" onClick={close}>
              {NAV_APP.label[locale]}
            </a>
          </li>
        </ul>
        <p className="mobile-nav-label">{SCRIPTURES_LABEL[locale]}</p>
        <ul className="mobile-nav-grid">{NAV_SCRIPTURES.map((it) => item(it, 'nav_drawer_more'))}</ul>
        <ul className="mobile-nav-foot">{NAV_SECONDARY.map((it) => item(it, 'nav_drawer_more'))}</ul>
      </div>
    </>
  )
}

export default MobileNavToggle

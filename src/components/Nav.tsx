import MobileNavToggle from './MobileNavToggle'
import './nav.css'

// Nav's "Get the App" now routes to the on-site /app landing page, not
// directly to the App Store — the landing explains the daily-practice app
// and then hands off to the App Store with warmer intent.
const APP_LANDING_URL = '/app'

interface NavProps {
  showSectionLinks?: boolean
  extraLink?: { href: string; label: string; hrefLang?: string }
  /** When true, the nav renders transparent (no solid bg) so it sits over a hero backdrop. */
  overlayHero?: boolean
}

export default function Nav({ extraLink, overlayHero }: NavProps) {
  return (
    <nav className={`site-nav${overlayHero ? ' site-nav--overlay' : ''}`}>
      <div className="nav-inner">
        <a href="/" className="logo">
          <div className="logo-mark">
            <img src="/assets/new-light-logo.webp" alt="Wisdom" />
          </div>
          Wisdom
        </a>
        <MobileNavToggle />
        <ul className="nav-links">
          <li><a href="/gita" className="nav-page-link">Read the Gita</a></li>
          <li><a href="/hi/gita" hrefLang="hi" className="nav-page-link">हिंदी गीता</a></li>
          <li><a href="/gita/today" className="nav-page-link">Today&apos;s Verse</a></li>
          <li><a href="/blogs/" className="nav-page-link">Blog</a></li>
          {extraLink && (
            <li>
              <a href={extraLink.href} hrefLang={extraLink.hrefLang} className="nav-page-link">
                {extraLink.label}
              </a>
            </li>
          )}
          <li>
            <a
              href={APP_LANDING_URL}
              className="btn-nav btn-nav-secondary"
              data-mp-location="nav_ios_app"
            >Get the App →</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

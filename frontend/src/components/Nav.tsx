import MobileNavToggle from './MobileNavToggle'
import './nav.css'

interface NavProps {
  showSectionLinks?: boolean
  extraLink?: { href: string; label: string; hrefLang?: string }
  /** When true, the nav renders transparent (no solid bg) so it sits over a hero backdrop. */
  overlayHero?: boolean
  /** Page identifier for Mixpanel attribution of the nav CTA. */
  pageName?: string
}

export default function Nav({ extraLink, overlayHero }: NavProps) {
  return (
    <nav className={`site-nav${overlayHero ? ' site-nav--overlay' : ''}`}>
      <div className="nav-inner">
        <a href="/" className="logo">
          <div className="logo-mark">
            <img src="/assets/new-light-logo.webp" alt="Wisdom" width="32" height="32" />
          </div>
          Wisdom
        </a>
        <a href="/gita" className="nav-read-mobile">Read the Gita</a>
        <a
          href="/app"
          className="nav-app-link nav-app-link--mobile"
          data-nav-app=""
          data-mp-location="nav_app_mobile"
        >
          <PhoneIcon />
          App
        </a>
        <MobileNavToggle />
        <ul className="nav-links">
          <li><a href="/gita" className="nav-page-link">Read the Gita</a></li>
          <li><a href="/hi/gita" hrefLang="hi" className="nav-page-link">हिंदी गीता</a></li>
          <li><a href="/gita/today" className="nav-page-link">Verse of the Day</a></li>
          <li><a href="/reading-plans" className="nav-page-link">Reading Plans</a></li>
          <li>
            <a href="/app" className="nav-app-link" data-nav-app="" data-mp-location="nav_app_desktop">
              <PhoneIcon />
              Wisdom App
            </a>
          </li>
          {extraLink && (
            <li>
              <a href={extraLink.href} hrefLang={extraLink.hrefLang} className="nav-page-link">
                {extraLink.label}
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

function PhoneIcon() {
  return (
    <svg
      className="nav-app-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  )
}

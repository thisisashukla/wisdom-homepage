import MobileNavToggle from './MobileNavToggle'
import GetAppButton from './funnel/GetAppButton'
import './nav.css'

interface NavProps {
  showSectionLinks?: boolean
  extraLink?: { href: string; label: string; hrefLang?: string }
  /** When true, the nav renders transparent (no solid bg) so it sits over a hero backdrop. */
  overlayHero?: boolean
  /** Page identifier for Mixpanel attribution of the nav CTA. */
  pageName?: string
}

export default function Nav({ extraLink, overlayHero, pageName = 'unknown' }: NavProps) {
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
        <MobileNavToggle />
        <ul className="nav-links">
          <li><a href="/gita" className="nav-page-link">Read the Gita</a></li>
          <li><a href="/hi/gita" hrefLang="hi" className="nav-page-link">हिंदी गीता</a></li>
          <li><a href="/gita/today" className="nav-page-link">Verse of the Day</a></li>
          <li><a href="/gita-for" className="nav-page-link">Gita for Life</a></li>
          <li><a href="/app" className="nav-page-link">App</a></li>
          {extraLink && (
            <li>
              <a href={extraLink.href} hrefLang={extraLink.hrefLang} className="nav-page-link">
                {extraLink.label}
              </a>
            </li>
          )}
          <li>
            <GetAppButton pageName={pageName} />
          </li>
        </ul>
      </div>
    </nav>
  )
}

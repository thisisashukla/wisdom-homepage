import MobileNavToggle from './MobileNavToggle'
import './nav.css'

interface NavProps {
  showSectionLinks?: boolean
  extraLink?: { href: string; label: string; hrefLang?: string }
  /** When true, the nav renders transparent (no solid bg) so it sits over a hero backdrop. */
  overlayHero?: boolean
  /** Optional analytics page name. */
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
        <ul className="nav-links">
          <li><a href="/gita" className="nav-page-link">Read the Gita</a></li>
          <li><a href="/hi/gita" hrefLang="hi" className="nav-page-link">हिंदी गीता</a></li>
          <li><a href="/gita/today" className="nav-page-link">Today&apos;s Verse</a></li>
          <li><a href="/search" className="nav-page-link">Ask</a></li>
          <li><a href="/blogs" className="nav-page-link">Blog</a></li>
          {extraLink && (
            <li>
              <a href={extraLink.href} hrefLang={extraLink.hrefLang} className="nav-page-link">
                {extraLink.label}
              </a>
            </li>
          )}
        </ul>
        <div className="nav-actions"><a href="/app" className="nav-app-link" data-mp-location="nav_app">Get the iPhone app <span aria-hidden="true">↗</span></a><MobileNavToggle /></div>
      </div>
    </nav>
  )
}

import MobileNavToggle from './MobileNavToggle'
import './nav.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125'

interface NavProps {
  showSectionLinks?: boolean
  extraLink?: { href: string; label: string; hrefLang?: string }
}

export default function Nav({ showSectionLinks = false, extraLink }: NavProps) {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <a href="/" className="logo">
          <div className="logo-mark">
            <img src="/assets/new-light-logo.webp" alt="Wisdom" />
          </div>
          Wisdom
        </a>
        <MobileNavToggle />
        <ul className="nav-links">
          {showSectionLinks && (
            <>
              <li><a href="#how-it-works" className="nav-section-link">How it works</a></li>
              <li><a href="#paths" className="nav-section-link">The 3 Paths</a></li>
              <li><a href="#features" className="nav-section-link">Features</a></li>
              <li className="nav-pipe" aria-hidden="true"></li>
            </>
          )}
          <li><a href="/gita" className="nav-page-link">Read the Gita</a></li>
          <li><a href="/blogs/" className="nav-page-link">Blog</a></li>
          <li><a href="/about" className="nav-page-link">About</a></li>
          {extraLink && (
            <li>
              <a href={extraLink.href} hrefLang={extraLink.hrefLang} className="nav-page-link">
                {extraLink.label}
              </a>
            </li>
          )}
          <li>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="btn-nav"
              data-mp-location="nav"
            >Download Free</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

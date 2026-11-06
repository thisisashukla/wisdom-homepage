import Link from 'next/link'
import Flame from './Flame'
import { NAV, ONE_LINER, WISDOM_URL } from '../_lib/site'

export function DhNav() {
  return (
    <header className="dh-nav">
      <div className="dh-wrap dh-nav__in">
        <Link href="/" className="dh-brand" aria-label="Dhyaan home">
          <Flame size={30} />
          <span>Dhyaan</span>
        </Link>
        <nav aria-label="Main" className="dh-nav__links">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} data-mp-location="nav">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/#join" className="dh-btn dh-btn--small" data-mp-location="nav_cta">
          Join the waitlist
        </Link>
      </div>
      <nav aria-label="Main" className="dh-nav__sub">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} data-mp-location="nav_mobile">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export function DhFooter() {
  return (
    <footer className="dh-footer">
      <div className="dh-wrap dh-footer__in">
        <div>
          <p className="dh-verse" lang="sa">यथा दीपो निवातस्थो नेङ्गते</p>
          <p className="dh-muted">“As a lamp in a windless place does not flicker.” Bhagavad Gita 6.19</p>
          <p className="dh-muted dh-small" style={{ marginTop: 16, maxWidth: 520 }}>{ONE_LINER}</p>
        </div>
        <div className="dh-footer__cols">
          <div>
            <p className="dh-footer__h">Dhyaan</p>
            <Link href="/">Waitlist</Link>
            <Link href="/nivata">60-second stillness test</Link>
            <Link href="/apple-watch">Apple Watch &amp; AirPods</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div>
            <p className="dh-footer__h"><Link href="/learn">Blog</Link></p>
            <Link href="/learn/silent-meditation">Silent meditation</Link>
            <Link href="/learn/measuring-meditation">Measuring meditation</Link>
            <Link href="/learn/meditation-apple-watch-airpods">Apple Watch &amp; AirPods</Link>
            <Link href="/learn/dhyana">What is dhyana?</Link>
            <Link href="/learn/is-my-meditation-working">Is my meditation working?</Link>
            <Link href="/gita">Meditation in the Gita</Link>
          </div>
          <div>
            <p className="dh-footer__h">Trust</p>
            <Link href="/methods">How Dhyaan measures</Link>
            <Link href="/privacy">Privacy</Link>
            <a href={WISDOM_URL}>Made by Wisdom (wisdomquotes.in)</a>
          </div>
        </div>
      </div>
      <div className="dh-wrap dh-footer__base dh-small dh-muted">
        <span>© 2026 Ankur Shukla. Dhyaan is a general wellness app, not a medical device.</span>
      </div>
    </footer>
  )
}

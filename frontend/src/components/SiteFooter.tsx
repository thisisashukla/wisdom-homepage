import './site-footer.css'

/**
 * The one site footer. Every page renders this — previously the homepage,
 * About, the blog posts and the legal pages each had their own, and the Gita
 * reader had none.
 */
export default function SiteFooter({ locale = 'en' }: { locale?: 'en' | 'hi' }) {
  const hi = locale === 'hi'
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <a href="/" className="site-footer-logo">
          <img src="/assets/new-light-logo.webp" alt="" width={30} height={30} loading="lazy" />
          Wisdom
        </a>
        <p className="site-footer-copy">© 2026 Wisdom · Ankur Shukla · Bhagavad Gita, tuned to your life.</p>
        <p className="site-footer-crisis">
          {hi
            ? 'संकट में हैं? Tele-MANAS को 14416 पर कॉल करें (भारत, मुफ़्त, 24×7) या अपने स्थानीय आपातकालीन नंबर पर।'
            : 'In crisis? Call Tele-MANAS on 14416 (India, free, 24×7) or your local emergency number.'}
        </p>
        <p className="site-footer-note">
          Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed.{' '}
          <a href="/methodology">Methodology →</a>
        </p>
        <ul className="site-footer-links">
          <li><a href="/gita">Read the Gita</a></li>
          <li><a href="/hi/gita" hrefLang="hi">हिंदी गीता</a></li>
          <li><a href="/reading-plans">Reading plans</a></li>
          <li><a href="/gita-for">Gita for life</a></li>
          <li><a href="/blogs">Blog</a></li>
          <li><a href="/app">iPhone app</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="mailto:work.ankurshukla@gmail.com">Support</a></li>
          <li>
            <a href="https://x.com/sansearchapp" target="_blank" rel="noopener noreferrer" aria-label="Wisdom on X (Twitter)" data-mp-location="footer_twitter">𝕏</a>
          </li>
          <li>
            <a href="https://www.instagram.com/wisdomquoteapp/" target="_blank" rel="noopener noreferrer" data-mp-location="footer_instagram">Instagram</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

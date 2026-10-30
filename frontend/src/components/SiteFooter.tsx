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
        <nav className="site-footer-beyond" aria-label={hi ? 'गीता के आगे' : 'Beyond the Gita'}>
          <p className="site-footer-beyond-label">{hi ? 'गीता के आगे' : 'Beyond the Gita'}</p>
          <ul className="site-footer-links">
            <li><a href="/ramayana" data-mp-location="footer_beyond_ramayana">Ramayana</a></li>
            <li><a href="/hi/ram-shalaka" hrefLang="hi" data-mp-location="footer_beyond_ram_shalaka">श्रीराम शलाका</a></li>
            <li><a href={hi ? '/hi/hanuman-chalisa' : '/hanuman-chalisa'} data-mp-location="footer_beyond_hanuman_chalisa">{hi ? 'हनुमान चालीसा' : 'Hanuman Chalisa'}</a></li>
            <li><a href={hi ? '/hi/upanishad' : '/upanishads'} data-mp-location="footer_beyond_upanishads">{hi ? 'उपनिषद' : 'Upanishads'}</a></li>
            <li><a href="/mahabharata" data-mp-location="footer_beyond_mahabharata">Mahabharata</a></li>
            <li><a href="/ashtavakra-gita" data-mp-location="footer_beyond_ashtavakra">Ashtavakra Gita</a></li>
            <li><a href="/gitas" data-mp-location="footer_beyond_gitas">{hi ? 'अन्य गीताएँ' : 'Other Gitas'}</a></li>
            <li><a href={hi ? '/hi/vivekananda-quotes' : '/vivekananda-quotes'} data-mp-location="footer_beyond_vivekananda">{hi ? 'विवेकानंद के विचार' : 'Vivekananda quotes'}</a></li>
            <li><a href="/hi/kabir-ke-dohe" hrefLang="hi" data-mp-location="footer_beyond_kabir">कबीर के दोहे</a></li>
            <li><a href="/hi/chanakya-niti" hrefLang="hi" data-mp-location="footer_beyond_chanakya">चाणक्य नीति</a></li>
          </ul>
        </nav>
        <ul className="site-footer-links">
          <li><a href="/gita">Read the Gita</a></li>
          <li><a href="/hi/gita" hrefLang="hi">हिंदी गीता</a></li>
          <li><a href="/reading-plans">Reading plans</a></li>
          <li><a href="/gita-for">Gita for life</a></li>
          <li><a href="/blogs">Blog</a></li>
          <li><a href="/app">iPhone app</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/resources">Resources</a></li>
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

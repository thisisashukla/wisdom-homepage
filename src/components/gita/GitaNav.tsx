/**
 * Shared nav for /gita/* and /hi/gita/* routes.
 * Server component — bidirectional nav back to homepage and out to App Store.
 */

type Props = { locale?: 'en' | 'hi' }

const labels = {
  en: {
    home: 'Home',
    gita: 'Bhagavad Gita',
    blog: 'Blog',
    download: 'Download Free',
    switchTo: 'हिन्दी',
  },
  hi: {
    home: 'होम',
    gita: 'भगवद् गीता',
    blog: 'Blog',
    download: 'मुफ़्त डाउनलोड',
    switchTo: 'English',
  },
}

const APP_URL = 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125'

export default function GitaNav({ locale = 'en' }: Props) {
  const t = labels[locale]
  const altLocale = locale === 'en' ? 'hi' : 'en'
  const altHref = locale === 'en' ? '/hi/gita' : '/gita'
  const base = locale === 'hi' ? '/hi/gita' : '/gita'
  const homeHref = locale === 'hi' ? '/hi' : '/'

  return (
    <nav className="gita-nav" aria-label={locale === 'hi' ? 'भगवद् गीता नेविगेशन' : 'Bhagavad Gita navigation'}>
      <div className="gita-nav-inner">
        <a href={homeHref} className="gita-logo">
          <img src="/assets/male-logo-dark.webp" alt="Wisdom" />
          Wisdom
        </a>
        <div className="gita-nav-links">
          {/* "Bhagavad Gita" is always the current section — show as active, still links to index */}
          <a href={base} className="gita-nav-active" aria-current="page">{t.gita}</a>
          <a href="/blogs">{t.blog}</a>
          <a href={homeHref}>{t.home}</a>
          <a className="gita-lang-switch" href={altHref} hrefLang={altLocale}>
            {t.switchTo}
          </a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gita-cta-btn"
            data-mp-location="gita_nav"
          >
            {t.download}
          </a>
        </div>
      </div>
    </nav>
  )
}

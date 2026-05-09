/**
 * Reusable App Store CTA for /gita and /hi/gita routes.
 *
 * Three variants:
 *   - "inline"  → small one-liner with button. Used inside hero / above breadcrumbs.
 *   - "verse"   → end-of-verse block with phone mockup. The deepest-funnel placement.
 *   - "chapter" → end-of-chapter block, copy emphasises the daily reading habit.
 *
 * All clicks are tracked via data-mp-location attribute for Mixpanel funnel analysis.
 */

import { Verse, Chapter } from '@/lib/gita'

type Variant = 'inline' | 'verse' | 'chapter'
type Props = {
  variant: Variant
  locale?: 'en' | 'hi'
  /** Pass when variant === 'verse' for contextual copy ("a verse like 2.47") */
  verse?: Pick<Verse, 'chapter' | 'verse'> | null
  /** Pass when variant === 'chapter' for contextual copy ("kept reading Bhakti Yoga") */
  chapter?: Pick<Chapter, 'number' | 'enName' | 'hiName' | 'totalVerses'> | null
}

const APP_URL = 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125'
const APP_STORE_BADGE =
  'https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg'

const copy = {
  en: {
    inlineHead: 'Read a verse a day on your iPhone',
    inlineSub: 'Wisdom — free. Sanskrit, Hindi, English & a private journal.',
    verseHead: (c?: number, v?: number) =>
      c && v ? `Loved verse ${c}.${v}? Get one like it every morning.` : 'Get a verse like this every morning.',
    verseSub:
      'Wisdom delivers one shloka a day to your iPhone — Sanskrit, Hindi, English, deeper meaning, and space to reflect. Free.',
    chapterHead: (name?: string) =>
      name ? `Finished ${name}? Keep the rhythm going.` : 'Finished this chapter? Keep the rhythm going.',
    chapterSub:
      'The Wisdom app reads the Gita to you, one verse a day. Lockscreen widgets, gentle reminders, no algorithms — just the next verse, when you need it.',
    primary: 'Download on the App Store',
    secondary: 'Read more on the web',
    appStoreAlt: 'Download Wisdom on the App Store',
    captionApp: 'Wisdom on iPhone',
    daily: 'A verse a day',
    free: 'Free, no account needed',
    quiet: 'No ads, no algorithm',
  },
  hi: {
    inlineHead: 'iPhone पर रोज़ एक श्लोक पढ़ें',
    inlineSub: 'Wisdom — मुफ़्त। संस्कृत, हिन्दी, अंग्रेज़ी और एक निजी डायरी।',
    verseHead: (c?: number, v?: number) =>
      c && v ? `${c}.${v} पसंद आया? रोज़ ऐसा ही एक श्लोक पाएं।` : 'रोज़ ऐसा ही एक श्लोक पाएं।',
    verseSub:
      'Wisdom आपके iPhone पर रोज़ एक श्लोक भेजता है — संस्कृत, हिन्दी, अंग्रेज़ी, गहरा अर्थ, और चिंतन के लिए जगह। मुफ़्त।',
    chapterHead: (name?: string) =>
      name ? `${name} पूरा हो गया? लय बनाए रखें।` : 'अध्याय पूरा हो गया? लय बनाए रखें।',
    chapterSub:
      'Wisdom ऐप आपको रोज़ एक श्लोक देता है — Lockscreen widgets, सौम्य reminders, कोई algorithm नहीं — बस अगला श्लोक, जब आपको चाहिए।',
    primary: 'App Store से डाउनलोड करें',
    secondary: 'वेब पर पढ़ना जारी रखें',
    appStoreAlt: 'Wisdom को App Store से डाउनलोड करें',
    captionApp: 'iPhone पर Wisdom',
    daily: 'रोज़ एक श्लोक',
    free: 'मुफ़्त, बिना अकाउंट',
    quiet: 'कोई विज्ञापन नहीं',
  },
}

export default function GitaAppCTA({ variant, locale = 'en', verse, chapter }: Props) {
  const t = copy[locale]

  if (variant === 'inline') {
    return (
      <aside className="gita-cta-inline" aria-label={t.inlineHead}>
        <div>
          <div className="gita-cta-inline-head">{t.inlineHead}</div>
          <div className="gita-cta-inline-sub">{t.inlineSub}</div>
        </div>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener"
          className="gita-cta-inline-btn"
          data-mp-location={`gita_${locale}_${variant}`}
        >
          ↓ App Store
        </a>
      </aside>
    )
  }

  const head =
    variant === 'verse'
      ? t.verseHead(verse?.chapter, verse?.verse)
      : t.chapterHead(locale === 'hi' ? chapter?.hiName : chapter?.enName)
  const sub = variant === 'verse' ? t.verseSub : t.chapterSub
  const mpKey = `gita_${locale}_${variant}${variant === 'verse' && verse ? `_${verse.chapter}.${verse.verse}` : ''}${variant === 'chapter' && chapter ? `_ch${chapter.number}` : ''}`

  return (
    <aside className="gita-cta-block" aria-label={head}>
      <div className="gita-cta-block-grid">
        <div className="gita-cta-block-art">
          <div className="gita-cta-phone">
            <div className="gita-cta-phone-island" />
            <div className="gita-cta-phone-screen">
              <img
                src="/assets/IMG_6942.webp"
                alt={t.captionApp}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="gita-cta-block-body">
          <div className="gita-cta-block-eyebrow">{locale === 'hi' ? 'Wisdom ऐप' : 'The Wisdom app'}</div>
          <h3 className="gita-cta-block-head">{head}</h3>
          <p className="gita-cta-block-sub">{sub}</p>
          <ul className="gita-cta-block-bullets">
            <li>◆ {t.daily}</li>
            <li>◆ {t.free}</li>
            <li>◆ {t.quiet}</li>
          </ul>
          <div className="gita-cta-block-actions">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener"
              className="gita-cta-store"
              data-mp-location={mpKey}
              aria-label={t.appStoreAlt}
            >
              <img src={APP_STORE_BADGE} alt={t.appStoreAlt} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}

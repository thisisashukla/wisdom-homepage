import type { Metadata } from 'next'
import {
  getAllChapters,
  getAllTopics,
  chapterImage,
  gitaHeroImage,
  chapterUrl,
  topicUrl,
} from '@/lib/gita'
import BlogTracker from '@/components/BlogTracker'
import SavedVersesPanel from '@/components/gita/SavedVersesPanel'

export const metadata: Metadata = {
  title: 'भगवद गीता के 700 श्लोक हिंदी में — अर्थ सहित, 18 अध्याय',
  description:
    'सम्पूर्ण भगवद् गीता हिन्दी में पढ़ें — संस्कृत श्लोक, शब्द-अर्थ और भावार्थ सहित। 18 अध्याय, 700 श्लोक, सरल हिन्दी में। PDF डाउनलोड की ज़रूरत नहीं — सीधे ऑनलाइन, निःशुल्क।',
  alternates: {
    canonical: 'https://wisdomquotes.in/hi/gita',
    languages: {
      'en': 'https://wisdomquotes.in/gita',
      'en-IN': 'https://wisdomquotes.in/gita',
      'hi': 'https://wisdomquotes.in/hi/gita',
      'hi-IN': 'https://wisdomquotes.in/hi/gita',
      'x-default': 'https://wisdomquotes.in/gita',
    },
  },
  openGraph: {
    title: 'भगवद् गीता — 700 श्लोक हिन्दी अर्थ सहित | सभी 18 अध्याय',
    description: 'सम्पूर्ण भगवद् गीता हिन्दी में — संस्कृत श्लोक, शब्द-अर्थ और भावार्थ। 18 अध्याय, 700 श्लोक। PDF की ज़रूरत नहीं, सीधे ऑनलाइन पढ़ें।',
    url: 'https://wisdomquotes.in/hi/gita',
    type: 'website',
    siteName: 'Wisdom',
    locale: 'hi_IN',
    alternateLocale: ['en_IN'],
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'भगवद् गीता — 700 श्लोक हिन्दी अर्थ सहित',
    description: 'सम्पूर्ण भगवद् गीता हिन्दी में — संस्कृत श्लोक, शब्द-अर्थ और भावार्थ।',
    images: ['/og-image.jpg'],
  },
}

export default function GitaIndexPageHi() {
  const chapters = getAllChapters()
  const topics = getAllTopics()
  const totalProcessed = chapters.reduce((s, c) => s + c.processedVerses, 0)
  const hero = gitaHeroImage()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'भगवद् गीता',
    alternateName: ['Bhagavad Gita', 'श्रीमद्भगवद्गीता', 'Geeta', 'Gita'],
    inLanguage: ['sa', 'hi', 'en'],
    bookFormat: 'EBook',
    numberOfPages: 700,
    isAccessibleForFree: true,
    url: 'https://wisdomquotes.in/hi/gita',
    author: {
      '@type': 'Person',
      name: 'व्यास',
      alternateName: 'Vyasa',
    },
    character: [
      { '@type': 'Person', name: 'श्रीकृष्ण', alternateName: 'Krishna' },
      { '@type': 'Person', name: 'अर्जुन', alternateName: 'Arjuna' },
    ],
    hasPart: chapters.map((ch) => ({
      '@type': 'Chapter',
      name: `${ch.hiName} — भगवद् गीता अध्याय ${ch.number}`,
      url: `https://wisdomquotes.in${chapterUrl(ch.number, 'hi')}`,
      position: ch.number,
    })),
  }

  return (
    <main className="gita-main-wide">
      <BlogTracker pageName="gita_index_hi" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO */}
      <section className="gita-hero">
        <div>
          <div className="gita-eyebrow">श्रीमद्भगवद्गीता</div>
          <h1 className="gita-h1">भगवद् गीता के 700 श्लोक हिंदी में</h1>
          <p className="gita-lede">
            कुरुक्षेत्र की भूमि पर श्रीकृष्ण और अर्जुन का संवाद। 18 अध्याय, 700 श्लोक, जिनमें कर्म, धर्म, भक्ति और
            आत्म-ज्ञान की बात है। यहाँ हर श्लोक संस्कृत, हिन्दी और
            अंग्रेज़ी में।
          </p>
          <div className="gita-stat-row">
            <div className="gita-stat">
              <div className="gita-stat-num">18</div>
              <div className="gita-stat-label">अध्याय</div>
            </div>
            <div className="gita-stat">
              <div className="gita-stat-num">{totalProcessed}</div>
              <div className="gita-stat-label">श्लोक उपलब्ध</div>
            </div>
            <div className="gita-stat">
              <div className="gita-stat-num">{topics.length}</div>
              <div className="gita-stat-label">विषय</div>
            </div>
            <div className="gita-stat">
              <div className="gita-stat-num">3</div>
              <div className="gita-stat-label">भाषाएँ</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <a
              href="/hi/gita/today"
              data-mp-location="gita_hi_index_today"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: '#1a0606', padding: '13px 24px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
            >
              आज का श्लोक →
            </a>
            <a
              href="/hi/gita/chapter/1"
              data-mp-location="gita_hi_index_chapter_1"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--text-dim)', padding: '12px 22px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}
            >
              अध्याय 1 से शुरू करें
            </a>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-dimmer)', marginTop: 18 }}>
            Prefer English?{' '}
            <a href="/gita" hrefLang="en" style={{ color: 'var(--gold-light)' }}>
              Read in English →
            </a>
          </p>
        </div>
        <div className="gita-hero-art">
          <img src={hero.src} alt={hero.alt} loading="eager" />
          <div className="gita-hero-meta">
            “यदा यदा हि धर्मस्य ग्लानिर्भवति भारत” — भगवद् गीता 4.7
          </div>
        </div>
      </section>

      <SavedVersesPanel locale="hi" />

      {/* CHAPTERS */}
      <h2 className="gita-h2">सभी 18 अध्याय</h2>
      <p className="gita-lede" style={{ marginBottom: 24 }}>
        अर्जुन के विषाद से लेकर मोक्ष-संन्यास के अंतिम उपदेश तक। किसी भी अध्याय पर क्लिक करें और उसके सभी श्लोक पढ़ें।
      </p>
      <div className="gita-grid">
        {chapters.map((ch) => {
          const img = chapterImage(ch.number)
          return (
            <a
              key={ch.number}
              href={chapterUrl(ch.number, 'hi')}
              className="gita-card-art"
              data-mp-location={`gita_hi_chapter_card_${ch.number}`}
            >
              <img className="gita-card-art-img" src={img.src} alt={img.alt} loading="lazy" />
              <div className="gita-card-art-body">
                <div className="gita-card-eyebrow">अध्याय {ch.number}</div>
                <div className="gita-card-title">{ch.hiName}</div>
                <div className="gita-card-sub">{ch.hiTitle}</div>
                <div className="gita-card-meta">
                  {ch.processedVerses === ch.totalVerses
                    ? `${ch.totalVerses} श्लोक`
                    : `${ch.processedVerses} / ${ch.totalVerses} श्लोक उपलब्ध`}
                </div>
              </div>
            </a>
          )
        })}
      </div>

      <h2 className="gita-h2">विषय अनुसार</h2>
      <div className="gita-grid">
        {topics.slice(0, 18).map((t) => (
          <a
            key={t.slug}
            href={topicUrl(t.slug, 'hi')}
            className="gita-card"
            data-mp-location={`gita_hi_topic_${t.slug}`}
          >
            <div className="gita-card-title" style={{ textTransform: 'capitalize' }}>
              {t.label}
            </div>
            <div className="gita-card-meta">{t.verseCount} श्लोक</div>
          </a>
        ))}
      </div>
    </main>
  )
}

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
  title: 'Bhagavad Gita — All 18 Chapters, Sanskrit Verses with Hindi & English Translation | Wisdom',
  description:
    'Read the Bhagavad Gita online — all 700 verses across 18 chapters with Sanskrit, Hindi and English translations, organised by chapter and theme. Free, ad-free, beautifully presented.',
  alternates: {
    canonical: 'https://wisdomquotes.in/gita',
    languages: {
      'en-IN': 'https://wisdomquotes.in/gita',
      'hi-IN': 'https://wisdomquotes.in/hi/gita',
    },
  },
  openGraph: {
    title: 'Bhagavad Gita — All 18 Chapters with Sanskrit, Hindi & English',
    description: 'Read the Bhagavad Gita online — chapter by chapter, verse by verse.',
    url: 'https://wisdomquotes.in/gita',
    type: 'website',
    siteName: 'Wisdom',
    images: ['/og-image.webp'],
  },
}

export default function GitaIndexPage() {
  const chapters = getAllChapters()
  const topics = getAllTopics()
  const totalProcessed = chapters.reduce((s, c) => s + c.processedVerses, 0)
  const hero = gitaHeroImage()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'Bhagavad Gita',
    alternateName: ['भगवद् गीता', 'Bhagavadgita', 'Geeta'],
    inLanguage: ['sa', 'en', 'hi'],
    bookFormat: 'EBook',
    numberOfPages: 700,
    hasPart: chapters.map((ch) => ({
      '@type': 'Chapter',
      name: `${ch.enName} — ${ch.enTitle}`,
      url: `https://wisdomquotes.in${chapterUrl(ch.number)}`,
    })),
  }

  return (
    <main className="gita-main-wide">
      <BlogTracker pageName="gita_index" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="gita-hero">
        <div>
          <div className="gita-eyebrow">Bhagavad Gita · श्रीमद्भगवद्गीता</div>
          <h1 className="gita-h1">The Song of God, in full.</h1>
          <p className="gita-lede">
            Krishna speaks. Arjuna listens. 700 verses, 18 chapters, one conversation that changed how millions
            understand duty, action, devotion and the self. Read every verse here in Sanskrit, Hindi and English —
            with the essence in a single line.
          </p>
          <div className="gita-stat-row">
            <div className="gita-stat">
              <div className="gita-stat-num">18</div>
              <div className="gita-stat-label">Chapters</div>
            </div>
            <div className="gita-stat">
              <div className="gita-stat-num">{totalProcessed}</div>
              <div className="gita-stat-label">Verses live</div>
            </div>
            <div className="gita-stat">
              <div className="gita-stat-num">{topics.length}</div>
              <div className="gita-stat-label">Themes</div>
            </div>
            <div className="gita-stat">
              <div className="gita-stat-num">3</div>
              <div className="gita-stat-label">Languages</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <a
              href="/gita/today"
              data-mp-location="gita_index_today"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: '#1a0606', padding: '13px 24px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
            >
              Today’s verse →
            </a>
            <a
              href="/gita/chapter/1"
              data-mp-location="gita_index_chapter_1"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--text-dim)', padding: '12px 22px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}
            >
              Start at Chapter 1
            </a>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-dimmer)', marginTop: 18 }}>
            Prefer Hindi?{' '}
            <a href="/hi/gita" hrefLang="hi" style={{ color: 'var(--gold-light)' }}>
              हिन्दी में पढ़ें →
            </a>
          </p>
        </div>
        <div className="gita-hero-art">
          <img src={hero.src} alt={hero.alt} loading="eager" />
          <div className="gita-hero-meta">
            “Whenever dharma declines, I manifest myself.” — Bhagavad Gita 4.7
          </div>
        </div>
      </section>

      <SavedVersesPanel locale="en" />

      {/* CHAPTERS */}
      <h2 className="gita-h2">All 18 chapters</h2>
      <p className="gita-lede" style={{ marginBottom: 24 }}>
        From Arjuna's despair to the final teaching of liberation. Each chapter is a yoga — a path. Tap any to read
        every verse.
      </p>
      <div className="gita-grid">
        {chapters.map((ch) => {
          const img = chapterImage(ch.number)
          return (
            <a
              key={ch.number}
              href={chapterUrl(ch.number)}
              className="gita-card-art"
              data-mp-location={`gita_index_chapter_card_${ch.number}`}
            >
              <img className="gita-card-art-img" src={img.src} alt={img.alt} loading="lazy" />
              <div className="gita-card-art-body">
                <div className="gita-card-eyebrow">Chapter {ch.number}</div>
                <div className="gita-card-title">{ch.enName}</div>
                <div className="gita-card-sub">{ch.enTitle}</div>
                <div className="gita-card-meta">
                  {ch.processedVerses === ch.totalVerses
                    ? `${ch.totalVerses} verses`
                    : `${ch.processedVerses} of ${ch.totalVerses} verses available`}
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {/* TOPICS */}
      <h2 className="gita-h2">Browse by theme</h2>
      <p className="gita-lede">
        Verses gathered around the ideas they speak to most — karma, dharma, devotion, the steady mind. Drawn from
        across the Gita.
      </p>
      <div className="gita-grid">
        {topics.slice(0, 18).map((t) => (
          <a
            key={t.slug}
            href={topicUrl(t.slug)}
            className="gita-card"
            data-mp-location={`gita_index_topic_${t.slug}`}
          >
            <div className="gita-card-title" style={{ textTransform: 'capitalize' }}>
              {t.label}
            </div>
            <div className="gita-card-meta">{t.verseCount} verses</div>
          </a>
        ))}
      </div>
    </main>
  )
}

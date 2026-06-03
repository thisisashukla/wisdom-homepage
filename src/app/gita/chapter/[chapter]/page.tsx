import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllChapters,
  getChapter,
  getChapterVerses,
  chapterImage,
  chapterLede,
  chapterUrl,
  verseUrl,
} from '@/lib/gita'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import BlogTracker from '@/components/BlogTracker'

type Params = { chapter: string }

export async function generateStaticParams() {
  return getAllChapters().map((ch) => ({ chapter: String(ch.number) }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const num = Number(params.chapter)
  const ch = getChapter(num)
  if (!ch) return { title: 'Chapter not found' }
  const title = `Bhagavad Gita Chapter ${ch.number} — ${ch.enName} (${ch.enTitle}) | Wisdom`
  const description = `Bhagavad Gita Chapter ${ch.number}, ${ch.enName} — all ${ch.totalVerses} verses with Sanskrit, Hindi and English translation. ${ch.enTitle}.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${chapterUrl(ch.number)}`,
      languages: {
        'en-IN': `https://wisdomquotes.in${chapterUrl(ch.number, 'en')}`,
        'hi-IN': `https://wisdomquotes.in${chapterUrl(ch.number, 'hi')}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wisdomquotes.in${chapterUrl(ch.number)}`,
      type: 'article',
      siteName: 'Wisdom',
    },
  }
}

export default async function ChapterPage({ params }: { params: Params }) {
  const num = Number(params.chapter)
  const ch = getChapter(num)
  if (!ch) notFound()

  const verses = await getChapterVerses(num)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    name: `${ch.enName} — ${ch.enTitle}`,
    isPartOf: {
      '@type': 'Book',
      name: 'Bhagavad Gita',
      url: 'https://wisdomquotes.in/gita',
    },
    position: ch.number,
    inLanguage: ['sa', 'en', 'hi'],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bhagavad Gita', item: 'https://wisdomquotes.in/gita' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Chapter ${ch.number}: ${ch.enName}`,
        item: `https://wisdomquotes.in${chapterUrl(ch.number)}`,
      },
    ],
  }

  const lede = chapterLede(ch.number, 'en')

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_chapter_${ch.number}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location={`chapter_${ch.number}_crumb_gita`}>Bhagavad Gita</a>
        <span className="sep">›</span>
        <span>Chapter {ch.number}</span>
      </nav>

      <div className="gita-eyebrow">Chapter {ch.number} · {ch.enTitle}</div>
      <h1 className="gita-h1">{ch.enName}</h1>
      <p className="gita-lede">{lede ?? ch.enTitle}</p>
      <p className="gita-lede" style={{ fontSize: 14, color: 'var(--text-dimmer)', marginTop: -8 }}>
        {ch.processedVerses === ch.totalVerses
          ? `All ${ch.totalVerses} verses below.`
          : `${ch.processedVerses} of ${ch.totalVerses} verses available — more being added.`}
      </p>
      <p style={{ fontSize: 12, color: 'var(--text-dimmer)', marginTop: 8, fontStyle: 'italic' }}>
        Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026.{' '}
        <a href="/methodology" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>Methodology →</a>
      </p>

      <figure className="gita-chapter-hero">
        <img src={chapterImage(ch.number).src} alt={chapterImage(ch.number).alt} loading="eager" />
      </figure>

      <GitaAppCTA variant="inline" locale="en" />

      {/* Sticky verse jumper — every verse number, one tap to that verse page */}
      {verses.length > 0 && (
        <nav className="gita-jumper" aria-label="Jump to verse">
          <div className="gita-jumper-label">Jump to verse</div>
          <div className="gita-jumper-grid">
            {verses.map((v) => (
              <a
                key={v.verse}
                href={verseUrl(v.chapter, v.verse)}
                data-mp-location={`chapter_${ch.number}_jumper_${v.verse}`}
              >
                {v.verse}
              </a>
            ))}
          </div>
        </nav>
      )}

      <h2 className="gita-h2">Verses</h2>
      <ul className="gita-verse-list">
        {verses.map((v) => (
          <li key={v.verse}>
            <a href={verseUrl(v.chapter, v.verse)} data-mp-location={`chapter_${ch.number}_verse_list_${v.verse}`}>
              <span className="gita-verse-num">
                {v.chapter}.{v.verse}
              </span>
              <span className="gita-verse-snippet">{v.essence || v.englishTranslation}</span>
            </a>
          </li>
        ))}
      </ul>

      <GitaAppCTA variant="chapter" locale="en" chapter={ch} />

      <div className="gita-pn">
        <a
          className={`gita-pn-link ${ch.number <= 1 ? 'disabled' : ''}`}
          href={ch.number > 1 ? chapterUrl(ch.number - 1) : '#'}
          data-mp-location={`chapter_${ch.number}_prev`}
        >
          <div className="gita-pn-label">← Previous chapter</div>
          {ch.number > 1 && (
            <div className="gita-pn-target">
              {ch.number - 1}. {getChapter(ch.number - 1)?.enName}
            </div>
          )}
        </a>
        <a
          className={`gita-pn-link right ${ch.number >= 18 ? 'disabled' : ''}`}
          href={ch.number < 18 ? chapterUrl(ch.number + 1) : '#'}
          data-mp-location={`chapter_${ch.number}_next`}
        >
          <div className="gita-pn-label">Next chapter →</div>
          {ch.number < 18 && (
            <div className="gita-pn-target">
              {ch.number + 1}. {getChapter(ch.number + 1)?.enName}
            </div>
          )}
        </a>
      </div>
    </main>
  )
}

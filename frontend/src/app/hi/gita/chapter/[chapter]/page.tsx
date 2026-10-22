import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllChapters,
  getChapter,
  getChapterVerses,
  getVerse,
  chapterImage,
  chapterLede,
  chapterUrl,
  verseUrl,
} from '@/lib/gita'
// GitaAppCTA source preserved at @/components/gita/GitaAppCTA — currently swapped out
// for the Scripture AI waitlist while that product launches.
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'

type Params = { chapter: string }

export async function generateStaticParams() {
  return getAllChapters().map((ch) => ({ chapter: String(ch.number) }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const num = Number(params.chapter)
  const ch = getChapter(num)
  if (!ch) return { title: 'अध्याय नहीं मिला' }
  const title = `भगवद् गीता अध्याय ${ch.number} — ${ch.hiName}`
  const description = `भगवद् गीता का ${ch.number}वाँ अध्याय (${ch.hiName}) — सभी ${ch.totalVerses} श्लोक संस्कृत, हिन्दी और अंग्रेज़ी अनुवाद सहित।`
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${chapterUrl(ch.number, 'hi')}`,
      languages: {
        'en': `https://wisdomquotes.in${chapterUrl(ch.number, 'en')}`,
        'en-IN': `https://wisdomquotes.in${chapterUrl(ch.number, 'en')}`,
        'hi': `https://wisdomquotes.in${chapterUrl(ch.number, 'hi')}`,
        'hi-IN': `https://wisdomquotes.in${chapterUrl(ch.number, 'hi')}`,
        'x-default': `https://wisdomquotes.in${chapterUrl(ch.number, 'en')}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Wisdom',
      url: `https://wisdomquotes.in${chapterUrl(ch.number, 'hi')}`,
      locale: 'hi_IN',
      alternateLocale: ['en_IN'],
      images: [
        {
          url: `https://wisdomquotes.in${chapterImage(ch.number).src}`,
          alt: chapterImage(ch.number).alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://wisdomquotes.in${chapterImage(ch.number).src}`],
    },
  }
}

export default async function ChapterPageHi({ params }: { params: Params }) {
  const num = Number(params.chapter)
  const ch = getChapter(num)
  if (!ch) notFound()
  const [verses, firstVerse] = await Promise.all([
    getChapterVerses(num),
    getVerse(num, 1),
  ])

  const lede = chapterLede(ch.number, 'hi')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    name: `${ch.hiName} — भगवद् गीता अध्याय ${ch.number}`,
    alternateName: [`Bhagavad Gita Chapter ${ch.number}`, `भगवद् गीता अध्याय ${ch.number}`],
    isPartOf: {
      '@type': 'Book',
      name: 'भगवद् गीता',
      alternateName: 'Bhagavad Gita',
      url: 'https://wisdomquotes.in/hi/gita',
    },
    position: ch.number,
    inLanguage: ['sa', 'hi', 'en'],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'भगवद् गीता', item: 'https://wisdomquotes.in/hi/gita' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `अध्याय ${ch.number}: ${ch.hiName}`,
        item: `https://wisdomquotes.in${chapterUrl(ch.number, 'hi')}`,
      },
    ],
  }

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_chapter_hi_${ch.number}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/hi/gita" data-mp-location={`chapter_hi_${ch.number}_crumb_gita`}>भगवद् गीता</a>
        <span className="sep">›</span>
        <span>अध्याय {ch.number}</span>
      </nav>

      <div className="gita-eyebrow">अध्याय {ch.number} · {ch.hiTitle}</div>
      <h1 className="gita-h1">{ch.hiName}</h1>
      <p className="gita-lede">{lede ?? ch.hiTitle}</p>
      <p className="gita-lede" style={{ fontSize: 14, color: 'var(--text-dimmer)', marginTop: -8 }}>
        {ch.processedVerses === ch.totalVerses
          ? `सभी ${ch.totalVerses} श्लोक नीचे।`
          : `${ch.processedVerses} / ${ch.totalVerses} श्लोक उपलब्ध — और जोड़े जा रहे हैं।`}
      </p>
      <p style={{ fontSize: 12, color: 'var(--text-dimmer)', marginTop: 8, fontStyle: 'italic' }}>
        Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026.{' '}
        <a href="/methodology" style={{ color: 'var(--text-dimmer)', textDecoration: 'underline' }}>Methodology →</a>
      </p>

      <figure className="gita-chapter-hero">
        <img src={chapterImage(ch.number).src} alt={chapterImage(ch.number).alt} loading="eager" />
      </figure>

      {/* ── FIRST VERSE INLINE ── */}
      {firstVerse && (
        <div style={{ margin: '32px 0 8px' }} data-mp-section={`inline_verse_hi_${ch.number}_1`}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dimmer)', marginBottom: '14px' }}>
            प्रथम श्लोक · {ch.number}.1
          </div>
          <div style={{ background: 'var(--bg-card, rgba(255,255,255,0.04))', border: '1px solid rgba(245,201,106,0.3)', borderRadius: '14px', padding: '24px 26px' }}>
            {firstVerse.sanskrit && (
              <div style={{ fontFamily: "'Noto Sans Devanagari', 'Mangal', serif", fontSize: '18px', lineHeight: 1.8, color: 'var(--text)', marginBottom: '16px', textAlign: 'center' }}>
                {firstVerse.sanskrit}
              </div>
            )}
            {firstVerse.hindiTranslation && (
              <blockquote style={{ borderLeft: '2px solid rgba(245,201,106,0.4)', paddingLeft: '14px', margin: '0 0 14px', fontStyle: 'italic', fontSize: '15px', color: 'var(--gold-pale, #f5e6b8)', lineHeight: 1.6 }} lang="hi">
                &ldquo;{firstVerse.hindiTranslation}&rdquo;
              </blockquote>
            )}
            <a
              href={verseUrl(ch.number, 1, 'hi')}
              data-mp-location={`chapter_hi_${ch.number}_inline_verse_1`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--gold, #c8881e)', color: '#1a0606', padding: '10px 20px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}
            >
              पूरा श्लोक {ch.number}.1 पढ़ें →
            </a>
          </div>
        </div>
      )}


      <h2 className="gita-h2" style={{ marginTop: '40px' }}>सभी श्लोक</h2>
      <ul className="gita-verse-list">
        {verses.slice(0, Math.ceil(verses.length / 2)).map((v) => (
          <li key={v.verse}>
            <a href={verseUrl(v.chapter, v.verse, 'hi')} data-mp-location={`chapter_hi_${ch.number}_verse_list_${v.verse}`}>
              <div className="gita-verse-ref">
                <span className="gita-verse-ref-num">{v.chapter}.{v.verse}</span>
                <span className="gita-verse-ref-ch">अ. {v.chapter}</span>
              </div>
              <div className="gita-verse-body">
                <p className="gita-verse-essence">{v.essence || v.englishTranslation}</p>
                <p className="gita-verse-insight">
                  {(v.hindiTranslation || v.englishTranslation).slice(0, 120)}
                  {(v.hindiTranslation || v.englishTranslation).length > 120 ? '…' : ''}
                </p>
                <div className="gita-verse-footer">
                  {v.depth ? <span className={`gita-verse-depth gita-verse-depth--${v.depth}`}>{v.depth}</span> : <span />}
                  <span className="gita-verse-arrow">→</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <FeedbackWidget pageType="chapter" pageId={`chapter_hi_${ch.number}`} pageName={`gita_chapter_hi_${ch.number}`} />

      <ul className="gita-verse-list">
        {verses.slice(Math.ceil(verses.length / 2)).map((v) => (
          <li key={v.verse}>
            <a href={verseUrl(v.chapter, v.verse, 'hi')} data-mp-location={`chapter_hi_${ch.number}_verse_list_${v.verse}`}>
              <div className="gita-verse-ref">
                <span className="gita-verse-ref-num">{v.chapter}.{v.verse}</span>
                <span className="gita-verse-ref-ch">अ. {v.chapter}</span>
              </div>
              <div className="gita-verse-body">
                <p className="gita-verse-essence">{v.essence || v.englishTranslation}</p>
                <p className="gita-verse-insight">
                  {(v.hindiTranslation || v.englishTranslation).slice(0, 120)}
                  {(v.hindiTranslation || v.englishTranslation).length > 120 ? '…' : ''}
                </p>
                <div className="gita-verse-footer">
                  {v.depth ? <span className={`gita-verse-depth gita-verse-depth--${v.depth}`}>{v.depth}</span> : <span />}
                  <span className="gita-verse-arrow">→</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <VerseFunnelCTA variant="chapter" locale="hi" chapter={ch} pageName={`Hindi Gita Chapter ${ch.number}`} />


      <div className="gita-pn">
        <a
          className={`gita-pn-link ${ch.number <= 1 ? 'disabled' : ''}`}
          href={ch.number > 1 ? chapterUrl(ch.number - 1, 'hi') : '#'}
          data-mp-location={`chapter_hi_${ch.number}_prev`}
        >
          <div className="gita-pn-label">← पिछला अध्याय</div>
          {ch.number > 1 && (
            <div className="gita-pn-target">
              {ch.number - 1}. {getChapter(ch.number - 1)?.hiName}
            </div>
          )}
        </a>
        <a
          className={`gita-pn-link right ${ch.number >= 18 ? 'disabled' : ''}`}
          href={ch.number < 18 ? chapterUrl(ch.number + 1, 'hi') : '#'}
          data-mp-location={`chapter_hi_${ch.number}_next`}
        >
          <div className="gita-pn-label">अगला अध्याय →</div>
          {ch.number < 18 && (
            <div className="gita-pn-target">
              {ch.number + 1}. {getChapter(ch.number + 1)?.hiName}
            </div>
          )}
        </a>
      </div>
    </main>
  )
}

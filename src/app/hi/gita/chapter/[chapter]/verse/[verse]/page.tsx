import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllChapters,
  getChapter,
  getVerse,
  getVerseNeighbors,
  getRelatedVerses,
  verseUrl,
  chapterUrl,
  topicUrl,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import BlogTracker from '@/components/BlogTracker'
import ShareButtons from '@/components/gita/ShareButtons'
import VerseBookmark from '@/components/gita/VerseBookmark'

type Params = { chapter: string; verse: string }

export async function generateStaticParams() {
  const out: Params[] = []
  for (const ch of getAllChapters()) {
    for (const v of ch.verses) {
      out.push({ chapter: String(ch.number), verse: String(v) })
    }
  }
  return out
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = Number(params.chapter)
  const v = Number(params.verse)
  const verse = await getVerse(c, v)
  if (!verse) return { title: 'श्लोक नहीं मिला' }
  const ch = getChapter(c)
  const title = `भगवद् गीता ${c}.${v} — ${(verse.hindiTranslation || verse.englishTranslation).slice(0, 70)} | Wisdom`
  const description = `${verse.hindiTranslation || verse.englishTranslation} — भगवद् गीता अध्याय ${c}, श्लोक ${v}${ch ? ` (${ch.hiName})` : ''}।`
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
      languages: {
        'en-IN': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
        'hi-IN': `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
      },
    },
    openGraph: {
      title: `भगवद् गीता ${c}.${v}`,
      description: verse.hindiTranslation,
      type: 'article',
      siteName: 'Wisdom',
      images: [
        { url: `https://wisdomquotes.in/api/og/gita/${c}/${v}`, width: 1200, height: 630, alt: `भगवद् गीता ${c}.${v}` },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `भगवद् गीता ${c}.${v}`,
      description: verse.hindiTranslation,
      images: [`https://wisdomquotes.in/api/og/gita/${c}/${v}`],
    },
  }
}

export default async function VersePageHi({ params }: { params: Params }) {
  const c = Number(params.chapter)
  const v = Number(params.verse)
  const verse = await getVerse(c, v)
  if (!verse) notFound()
  const ch = getChapter(c)
  const { prev, next } = getVerseNeighbors(c, v)
  const related = getRelatedVerses(c, v, verse.tags) as IndexEntry[]

  const quotationLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: verse.hindiTranslation || verse.englishTranslation,
    creator: { '@type': 'Person', name: verse.speaker },
    about: verse.tags,
    isPartOf: {
      '@type': 'Chapter',
      name: ch ? ch.hiName : `अध्याय ${c}`,
      isPartOf: { '@type': 'Book', name: 'भगवद् गीता' },
    },
    inLanguage: ['sa', 'hi', 'en'],
  }

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_verse_hi_${c}_${v}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationLd) }} />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/hi/gita" data-mp-location={`verse_hi_${c}_${v}_crumb_gita`}>भगवद् गीता</a>
        <span className="sep">›</span>
        <a href={chapterUrl(c, 'hi')} data-mp-location={`verse_hi_${c}_${v}_crumb_chapter`}>
          अध्याय {c}
          {ch ? `: ${ch.hiName}` : ''}
        </a>
        <span className="sep">›</span>
        <span>श्लोक {v}</span>
      </nav>

      <div className="gita-eyebrow">
        {ch?.hiName ?? `अध्याय ${c}`} · श्लोक {v}
      </div>
      <h1 className="gita-h1">भगवद् गीता {c}.{v}</h1>
      {verse.essence && (
        <p className="gita-lede" style={{ fontStyle: 'italic', color: 'var(--gold-pale)', maxWidth: 640 }}>
          “{verse.essence}”
        </p>
      )}

      <article className="gita-verse-card">
        <div className="gita-sanskrit" lang="sa">
          {verse.sanskrit}
        </div>

        <div className="gita-translation">
          <div className="gita-translation-label">हिन्दी अनुवाद</div>
          <div className="gita-translation-text gita-translation-text--hi" lang="hi">
            {verse.hindiTranslation}
          </div>
        </div>

        <div className="gita-translation">
          <div className="gita-translation-label">English</div>
          <div className="gita-translation-text" lang="en">
            {verse.englishTranslation}
          </div>
        </div>

        {verse.tags.length > 0 && (
          <div className="gita-meta-row">
            <span>विषय:</span>
            {verse.tags.map((t) => (
              <a
                key={t}
                href={topicUrl(t, 'hi')}
                className="gita-tag"
                data-mp-location={`verse_hi_${c}_${v}_tag_${t}`}
              >
                {t}
              </a>
            ))}
            <VerseBookmark chapter={c} verse={v} locale="hi" />
          </div>
        )}
      </article>

      <div className="gita-pn">
        <a
          className={`gita-pn-link ${prev ? '' : 'disabled'}`}
          href={prev ? verseUrl(prev.chapter, prev.verse, 'hi') : '#'}
          data-mp-location={`verse_hi_${c}_${v}_prev`}
        >
          <div className="gita-pn-label">← पिछला श्लोक</div>
          {prev && (
            <div className="gita-pn-target">
              भगवद् गीता {prev.chapter}.{prev.verse}
            </div>
          )}
        </a>
        <a
          className={`gita-pn-link right ${next ? '' : 'disabled'}`}
          href={next ? verseUrl(next.chapter, next.verse, 'hi') : '#'}
          data-mp-location={`verse_hi_${c}_${v}_next`}
        >
          <div className="gita-pn-label">अगला श्लोक →</div>
          {next && (
            <div className="gita-pn-target">
              भगवद् गीता {next.chapter}.{next.verse}
            </div>
          )}
        </a>
      </div>

      <ShareButtons
        url={verseUrl(c, v, 'hi')}
        text={verse.essence || verse.hindiTranslation || verse.englishTranslation}
        title={`भगवद् गीता ${c}.${v}`}
        locale="hi"
      />

      <GitaAppCTA variant="verse" locale="hi" verse={{ chapter: c, verse: v }} />

      {related.length > 0 && (
        <>
          <h2 className="gita-h2">संबंधित श्लोक</h2>
          <ul className="gita-verse-list">
            {related.map((r) => (
              <li key={`${r.chapter}-${r.verse}`}>
                <a
                  href={verseUrl(r.chapter, r.verse, 'hi')}
                  data-mp-location={`verse_hi_${c}_${v}_related_${r.chapter}_${r.verse}`}
                >
                  <span className="gita-verse-num">
                    {r.chapter}.{r.verse}
                  </span>
                  <span className="gita-verse-snippet">{r.essence || r.snippet}</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}

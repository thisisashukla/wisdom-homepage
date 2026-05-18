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
  if (!verse) return { title: 'Verse not found' }
  const ch = getChapter(c)
  const title = `Bhagavad Gita ${c}.${v} — ${verse.essence || verse.englishTranslation.slice(0, 70)} | Wisdom`
  const description = `${verse.englishTranslation} Bhagavad Gita Chapter ${c}, Verse ${v}${ch ? ` (${ch.enName})` : ''} — Sanskrit, Hindi and English.`
  const ogImage = `https://wisdomquotes.in/api/og/gita/${c}/${v}`
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${verseUrl(c, v)}`,
      languages: {
        'en-IN': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
        'hi-IN': `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
      },
    },
    openGraph: {
      title: `Bhagavad Gita ${c}.${v} — ${verse.essence || ''}`,
      description: verse.englishTranslation,
      url: `https://wisdomquotes.in${verseUrl(c, v)}`,
      type: 'article',
      siteName: 'Wisdom',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Bhagavad Gita ${c}.${v}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Bhagavad Gita ${c}.${v}`,
      description: verse.englishTranslation,
      images: [ogImage],
    },
  }
}

export default async function VersePage({ params }: { params: Params }) {
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
    text: verse.englishTranslation,
    creator: { '@type': 'Person', name: verse.speaker },
    about: verse.tags,
    isPartOf: {
      '@type': 'Chapter',
      name: ch ? `${ch.enName} — ${ch.enTitle}` : `Chapter ${c}`,
      isPartOf: { '@type': 'Book', name: 'Bhagavad Gita' },
    },
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
        name: `Chapter ${c}${ch ? `: ${ch.enName}` : ''}`,
        item: `https://wisdomquotes.in${chapterUrl(c)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Verse ${v}`,
        item: `https://wisdomquotes.in${verseUrl(c, v)}`,
      },
    ],
  }

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_verse_${c}_${v}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location={`verse_${c}_${v}_crumb_gita`}>Bhagavad Gita</a>
        <span className="sep">›</span>
        <a href={chapterUrl(c)} data-mp-location={`verse_${c}_${v}_crumb_chapter`}>Chapter {c}{ch ? `: ${ch.enName}` : ''}</a>
        <span className="sep">›</span>
        <span>Verse {v}</span>
      </nav>

      <div className="gita-eyebrow">
        {ch?.enName ?? `Chapter ${c}`} · Verse {v}
      </div>
      <h1 className="gita-h1">Bhagavad Gita {c}.{v}</h1>
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
          <div className="gita-translation-label">Hindi · हिन्दी</div>
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
            <span>Themes:</span>
            {verse.tags.map((t) => (
              <a
                key={t}
                href={topicUrl(t)}
                className="gita-tag"
                data-mp-location={`verse_${c}_${v}_tag_${t}`}
              >
                {t}
              </a>
            ))}
            <VerseBookmark chapter={c} verse={v} locale="en" />
          </div>
        )}
      </article>

      <div className="gita-pn">
        <a
          className={`gita-pn-link ${prev ? '' : 'disabled'}`}
          href={prev ? verseUrl(prev.chapter, prev.verse) : '#'}
          data-mp-location={`verse_${c}_${v}_prev`}
        >
          <div className="gita-pn-label">← Previous verse</div>
          {prev && (
            <div className="gita-pn-target">
              Bhagavad Gita {prev.chapter}.{prev.verse}
            </div>
          )}
        </a>
        <a
          className={`gita-pn-link right ${next ? '' : 'disabled'}`}
          href={next ? verseUrl(next.chapter, next.verse) : '#'}
          data-mp-location={`verse_${c}_${v}_next`}
        >
          <div className="gita-pn-label">Next verse →</div>
          {next && (
            <div className="gita-pn-target">
              Bhagavad Gita {next.chapter}.{next.verse}
            </div>
          )}
        </a>
      </div>

      <ShareButtons
        url={verseUrl(c, v)}
        text={verse.essence || verse.englishTranslation}
        title={`Bhagavad Gita ${c}.${v}`}
        locale="en"
      />

      <GitaAppCTA variant="verse" locale="en" verse={{ chapter: c, verse: v }} />

      {related.length > 0 && (
        <>
          <h2 className="gita-h2">Related verses</h2>
          <ul className="gita-verse-list">
            {related.map((r) => (
              <li key={`${r.chapter}-${r.verse}`}>
                <a
                  href={verseUrl(r.chapter, r.verse)}
                  data-mp-location={`verse_${c}_${v}_related_${r.chapter}_${r.verse}`}
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

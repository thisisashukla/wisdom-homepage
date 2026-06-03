import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllChapters,
  getChapter,
  getVerse,
  getVerseNeighbors,
  getRelatedVerses,
  getTopicBridgesForVerse,
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

/** Trim a string to ~maxChars without breaking a word; appends ellipsis. */
const trimToLength = (s: string, maxChars: number): string => {
  if (!s) return ''
  const collapsed = s.replace(/\s+/g, ' ').trim()
  if (collapsed.length <= maxChars) return collapsed
  const cut = collapsed.slice(0, maxChars)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:—-]$/, '') + '…'
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = Number(params.chapter)
  const v = Number(params.verse)
  const verse = await getVerse(c, v)
  if (!verse) return { title: 'Verse not found' }
  const ch = getChapter(c)

  // ── Title: intent-keyworded, includes chapter context to differentiate
  //    1,604 otherwise-similar verse pages in SERP. ──
  const titleHook = verse.essence || trimToLength(verse.englishTranslation, 60)
  const title = `Bhagavad Gita ${c}.${v} Meaning – ${titleHook}${ch ? ` (${ch.enName})` : ''}`

  // ── Description: 150-160 chars; lead with simpleMeaning if we have it,
  //    fall back to englishTranslation. Include chapter for context. ──
  const descLead =
    verse.simpleMeaning ||
    verse.detailedMeaning ||
    verse.englishTranslation
  const description = trimToLength(
    `Bhagavad Gita Chapter ${c}, Verse ${v}${ch ? ` (${ch.enName})` : ''}: ${descLead}`,
    158,
  )

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
  const topicBridges = getTopicBridgesForVerse(verse.tags)

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

  // Article schema lets Google treat the commentary as editorial content
  // rather than just a snippet — important now that we ship the full
  // simpleMeaning / detailedMeaning / modernRelevance prose.
  const articleLd = (verse.simpleMeaning || verse.detailedMeaning) ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Bhagavad Gita ${c}.${v} — ${verse.essence || 'Meaning & Commentary'}`,
    description: verse.simpleMeaning || verse.detailedMeaning,
    articleBody: [
      verse.simpleMeaning,
      verse.detailedMeaning,
      verse.modernRelevance,
      verse.simpleInsight,
    ].filter(Boolean).join('\n\n'),
    author: { '@type': 'Organization', name: 'Wisdom' },
    publisher: { '@type': 'Organization', name: 'Wisdom', url: 'https://wisdomquotes.in' },
    mainEntityOfPage: `https://wisdomquotes.in${verseUrl(c, v)}`,
    about: verse.tags.map((t) => ({ '@type': 'Thing', name: t })),
    isPartOf: {
      '@type': 'Chapter',
      name: ch ? `${ch.enName} — ${ch.enTitle}` : `Chapter ${c}`,
      isPartOf: { '@type': 'Book', name: 'Bhagavad Gita' },
    },
    inLanguage: 'en',
  } : null

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
      {articleLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      )}

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location={`verse_${c}_${v}_crumb_gita`}>Bhagavad Gita</a>
        <span className="sep">›</span>
        <a href={chapterUrl(c)} data-mp-location={`verse_${c}_${v}_crumb_chapter`}>Chapter {c}{ch ? `: ${ch.enName}` : ''}</a>
        <span className="sep">›</span>
        <span>Verse {v}</span>
      </nav>

      <div className=”gita-eyebrow”>
        {ch?.enName ?? `Chapter ${c}`} · Verse {v}
      </div>
      <h1 className=”gita-h1”>Bhagavad Gita {c}.{v}</h1>
      {verse.essence && (
        <p className=”gita-lede” style={{ fontStyle: 'italic', color: 'var(--gold-pale)', maxWidth: 640 }}>
          &ldquo;{verse.essence}&rdquo;
        </p>
      )}
      <p style={{ fontSize: 12, color: 'var(--text-dimmer)', marginTop: 4, marginBottom: 8, fontStyle: 'italic' }}>
        Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026.{' '}
        <a href=”/methodology” style={{ color: 'var(--text-dimmer)', textDecoration: 'underline' }}>Methodology →</a>
      </p>

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

      {/* ── Rich commentary block: this is what turns a thin verse page into
            a 250–400 word indexable page that can actually rank. Each section
            is rendered only if the underlying field is non-empty so older
            verse files (pre-V2 rebuild) gracefully fall back. ── */}
      {(verse.simpleMeaning || verse.detailedMeaning) && (
        <section className="gita-commentary" aria-label="Meaning and context">
          {verse.simpleMeaning && (
            <>
              <h2 className="gita-h2">What this verse means</h2>
              <p>{verse.simpleMeaning}</p>
            </>
          )}

          {verse.detailedMeaning && (
            <>
              <h2 className="gita-h2">Context &amp; commentary</h2>
              <p>{verse.detailedMeaning}</p>
            </>
          )}

          {verse.modernRelevance && (
            <>
              <h2 className="gita-h2">Why this verse still matters</h2>
              <p>{verse.modernRelevance}</p>
            </>
          )}

          {verse.simpleInsight && (
            <>
              <h2 className="gita-h2">The takeaway</h2>
              <p style={{ fontStyle: 'italic' }}>{verse.simpleInsight}</p>
            </>
          )}

          {verse.translationLiteral && (
            <details className="gita-details" style={{ marginTop: 28 }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--gold-light)' }}>
                Word-by-word translation
              </summary>
              <p style={{ marginTop: 12, fontFamily: 'serif', lineHeight: 1.8 }} lang="sa">
                {verse.translationLiteral}
              </p>
            </details>
          )}

          {ch && (
            <p className="gita-chapter-link" style={{ marginTop: 36, fontSize: 14, color: 'var(--text-dim)' }}>
              This verse is part of{' '}
              <a
                href={chapterUrl(c)}
                style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}
                data-mp-location={`verse_${c}_${v}_chapter_context`}
              >
                Bhagavad Gita Chapter {c}: {ch.enName} — {ch.enTitle}
              </a>
              , which contains {ch.processedVerses} verses{ch.totalVerses && ch.totalVerses !== ch.processedVerses ? ` (of ${ch.totalVerses} total)` : ''}.
            </p>
          )}

          {topicBridges.length > 0 && (
            <p className="gita-topic-bridges" style={{ marginTop: 16, fontSize: 14, color: 'var(--text-dim)' }}>
              Explore related themes:{' '}
              {topicBridges.map((t, idx) => (
                <span key={t.slug}>
                  {idx > 0 ? ', ' : ''}
                  <a
                    href={topicUrl(t.slug)}
                    style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}
                    data-mp-location={`verse_${c}_${v}_bridge_${t.slug}`}
                  >
                    {t.label}
                  </a>
                  {' '}
                  <span style={{ color: 'var(--text-dimmer)' }}>({t.verseCount} verses)</span>
                </span>
              ))}
            </p>
          )}
        </section>
      )}

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

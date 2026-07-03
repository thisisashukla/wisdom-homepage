import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import {
  getAllChapters,
  getChapter,
  getVerse,
  getVerseNeighbors,
  getRelatedVerses,
  getTopicBridgesForVerse,
  getVerseAudio,
  verseUrl,
  chapterUrl,
  topicUrl,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import BlogTracker from '@/components/BlogTracker'
import ShareButtons from '@/components/gita/ShareButtons'
import VerseBookmark from '@/components/gita/VerseBookmark'
import SanskritText from '@/components/gita/SanskritText'

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
  if (!verse) return { title: 'श्लोक नहीं मिला' }
  const ch = getChapter(c)
  const titleHook = verse.essence || trimToLength(verse.hindiTranslation || verse.englishTranslation, 60)
  const title = `भगवद् गीता ${c}.${v} अर्थ – ${titleHook}${ch ? ` (${ch.hiName})` : ''}`
  const descLead =
    verse.simpleMeaning ||
    verse.detailedMeaning ||
    verse.hindiTranslation ||
    verse.englishTranslation
  const description = trimToLength(
    `भगवद् गीता अध्याय ${c}, श्लोक ${v}${ch ? ` (${ch.hiName})` : ''}: ${descLead}`,
    158,
  )
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
  const audio = getVerseAudio(c, v)
  const ch = getChapter(c)
  const { prev, next } = getVerseNeighbors(c, v)
  const related = getRelatedVerses(c, v, verse.tags) as IndexEntry[]
  const topicBridges = getTopicBridgesForVerse(verse.tags)

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
          &ldquo;{verse.essence}&rdquo;
        </p>
      )}
      <p style={{ fontSize: 12, color: 'var(--text-dimmer)', marginTop: 4, marginBottom: 8, fontStyle: 'italic' }}>
        Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026.{' '}
        <a href="/methodology" style={{ color: 'var(--text-dimmer)', textDecoration: 'underline' }}>Methodology →</a>
      </p>

      <article className="gita-verse-card">
        {audio ? (
          <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={c} verse={v} />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}

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

      {/* Hindi page renders the same enriched commentary block. The source
          data is still authored in English (single source of truth), so we
          surface it under English-glossed headings — readers searching in
          Hindi still benefit from the substance, and the headings stay
          consistent across the bilingual experience. */}
      {(verse.simpleMeaning || verse.detailedMeaning) && (
        <section className="gita-commentary" aria-label="अर्थ और संदर्भ">
          {verse.simpleMeaning && (
            <>
              <h2 className="gita-h2">श्लोक का अर्थ</h2>
              <p>{verse.simpleMeaning}</p>
            </>
          )}

          {verse.detailedMeaning && (
            <>
              <h2 className="gita-h2">संदर्भ और टिप्पणी</h2>
              <p>{verse.detailedMeaning}</p>
            </>
          )}

          {verse.modernRelevance && (
            <>
              <h2 className="gita-h2">आज के संदर्भ में</h2>
              <p>{verse.modernRelevance}</p>
            </>
          )}

          {verse.simpleInsight && (
            <>
              <h2 className="gita-h2">सार</h2>
              <p style={{ fontStyle: 'italic' }}>{verse.simpleInsight}</p>
            </>
          )}

          {verse.translationLiteral && (
            <details className="gita-details" style={{ marginTop: 28 }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--gold-light)' }}>
                शब्दार्थ
              </summary>
              <p style={{ marginTop: 12, fontFamily: 'serif', lineHeight: 1.8 }} lang="sa">
                {verse.translationLiteral}
              </p>
            </details>
          )}

          {ch && (
            <p className="gita-chapter-link" style={{ marginTop: 36, fontSize: 14, color: 'var(--text-dim)' }}>
              यह श्लोक{' '}
              <a
                href={chapterUrl(c, 'hi')}
                style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}
                data-mp-location={`verse_hi_${c}_${v}_chapter_context`}
              >
                भगवद् गीता अध्याय {c}: {ch.hiName} — {ch.hiTitle}
              </a>{' '}
              का भाग है, जिसमें कुल {ch.processedVerses} श्लोक हैं
              {ch.totalVerses && ch.totalVerses !== ch.processedVerses ? ` (कुल ${ch.totalVerses} में से)` : ''}।
            </p>
          )}

          {topicBridges.length > 0 && (
            <p className="gita-topic-bridges" style={{ marginTop: 16, fontSize: 14, color: 'var(--text-dim)' }}>
              संबंधित विषय:{' '}
              {topicBridges.map((t, idx) => (
                <span key={t.slug}>
                  {idx > 0 ? ', ' : ''}
                  <a
                    href={topicUrl(t.slug, 'hi')}
                    style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}
                    data-mp-location={`verse_hi_${c}_${v}_bridge_${t.slug}`}
                  >
                    {t.label}
                  </a>
                  {' '}
                  <span style={{ color: 'var(--text-dimmer)' }}>({t.verseCount} श्लोक)</span>
                </span>
              ))}
            </p>
          )}
        </section>
      )}

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

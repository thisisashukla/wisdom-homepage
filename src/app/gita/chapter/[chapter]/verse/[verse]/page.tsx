import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
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
  chapterImage,
  topicUrl,
  findTopicForConcept,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import { getBlogLinksForVerse } from '@/lib/blogVerseLinks'
import BlogTracker from '@/components/BlogTracker'
import ShareButtons from '@/components/gita/ShareButtons'
import VerseBookmark from '@/components/gita/VerseBookmark'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import SanskritText from '@/components/gita/SanskritText'
import MantraCards from '@/components/gita/MantraCards'

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
  const audio = getVerseAudio(c, v)
  const blogLinks = getBlogLinksForVerse(c, v)

  // ── V3 enrichment: raw pipeline labels → human copy ──
  // ("declaration / expansive / medium" means nothing to a casual reader —
  //  render one friendly guidance line instead of jargon chips.)
  const typeLabel = ({
    teaching:    'A core teaching',
    declaration: 'A declaration',
    narrative:   'A story moment',
    inquiry:     'A question',
    devotional:  'A devotional verse',
    metaphor:    'A metaphor',
    description: 'A description',
  } as Record<string, string>)[verse.verseType ?? '']
  const toneLabel = verse.tone ? `${verse.tone} in mood` : undefined
  const depthNote = ({
    surface: 'easy to enter',
    medium:  'a little context helps',
    deep:    'builds on earlier teachings',
  } as Record<string, string>)[verse.depth ?? '']
  const heroNote = [typeLabel, toneLabel, depthNote].filter(Boolean).join(' · ')
  // Concepts worth knowing, resolved to published topic hubs where possible
  const conceptLinks = (verse.requisiteConcepts ?? []).map((name) => ({
    name,
    topic: findTopicForConcept(name),
  }))

  // Parse word-by-word translation: "word (gloss) / word (gloss) / ..."
  const wordByWord = verse.translationLiteral
    ? verse.translationLiteral
        .split(' / ')
        .map(token => {
          const m = token.match(/^(.+?)\s+\((.+?)\)$/)
          return m ? { sanskrit: m[1].trim(), gloss: m[2].trim() } : null
        })
        .filter((x): x is { sanskrit: string; gloss: string } => x !== null)
    : []

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

      <nav className="gita-crumb gv-rise" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location={`verse_${c}_${v}_crumb_gita`}>Bhagavad Gita</a>
        <span className="sep">›</span>
        <a href={chapterUrl(c)} data-mp-location={`verse_${c}_${v}_crumb_chapter`}>Chapter {c}{ch ? `: ${ch.enName}` : ''}</a>
        <span className="sep">›</span>
        <span>Verse {v}</span>
      </nav>

      <header className="gv-hero-head">
        <div className="gv-hero-eyebrow gv-rise" style={{ '--d': '0.06s' } as CSSProperties}>Sacred verse</div>
        <h1 className="gita-h1 gv-hero-h1 gv-rise" style={{ '--d': '0.12s' } as CSSProperties}>Bhagavad Gita {c}.{v}</h1>
        <div className="gv-hero-badges gv-rise" style={{ '--d': '0.18s' } as CSSProperties}>
          <span className="gv-hero-pill">{ch?.enName ?? `Chapter ${c}`} · Verse {v}</span>
        </div>
        {heroNote && (
          <p className="gv-hero-note gv-rise" style={{ '--d': '0.21s' } as CSSProperties}>{heroNote}</p>
        )}
        {verse.essence && (
          <p className="gv-hero-essence gv-rise" style={{ '--d': '0.24s' } as CSSProperties}>
            &ldquo;{verse.essence}&rdquo;
          </p>
        )}
        <p className="gv-hero-byline gv-rise" style={{ '--d': '0.3s' } as CSSProperties}>
          Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026.{' '}
          <a href="/methodology">Methodology →</a>
        </p>
      </header>

      <article className="gita-verse-card gv-hero-card gv-rise" style={{ '--d': '0.36s' } as CSSProperties}>
        <span className="gv-card-chip">The verse</span>
        <div className="gv-diamonds" aria-hidden="true"><i /><i /><i /></div>
        {audio ? (
          <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={c} verse={v} />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}

        {/* English rendered as the main reading line, app-style: centered, serif, italic */}
        <p className="gv-en-quote" lang="en">{verse.englishTranslation}</p>
        {verse.speaker && <div className="gv-en-speaker">— {verse.speaker}</div>}

        <div className="gv-orn-divider" aria-hidden="true">
          <span /><em>❋</em><span />
        </div>
        <div className="gv-card-attrib">Bhagavad Gita · {c}.{v}</div>

        <div className="gita-translation">
          <div className="gita-translation-label">Hindi · हिन्दी</div>
          <div className="gita-translation-text gita-translation-text--hi" lang="hi">
            {verse.hindiTranslation}
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

      {/* ── Word-by-word: interlinear gloss ── */}
      {wordByWord.length > 0 && (
        <section className="gv-wbw gv-reveal" aria-label="Word by word translation">
          <div className="gv-sechead">
            <span className="gv-sechead-label">Word by word</span>
          </div>
          <p className="gv-sechead-sub">
            The verse in reading order — each Sanskrit word with its meaning beneath. Hover a word to focus on it.
          </p>
          <div className="gv-wbw-flow">
            {wordByWord.map((w, i) => (
              <span key={i} className="gv-word" tabIndex={0}>
                <span className="gv-word-sa" lang="sa">{w.sanskrit}</span>
                <span className="gv-word-en">{w.gloss}</span>
              </span>
            ))}
          </div>
          <p className="gv-literal">
            <b>Read literally</b>
            {wordByWord.map((w) => w.gloss).join(' · ')}
          </p>
        </section>
      )}

      {/* ── Rich commentary block ── */}
      {(verse.simpleMeaning || verse.detailedMeaning) && (
        <section className="gita-commentary" aria-label="Meaning and context" style={{ marginTop: '52px' }}>

          <div className="gv-sechead gv-reveal">
            <span className="gv-sechead-label">Understanding the verse</span>
          </div>
          {verse.insight && (
            <div className="gv-insight gv-reveal">
              <span className="gv-insight-icon" aria-hidden="true">✦</span>
              <p>{verse.insight}</p>
            </div>
          )}

          {/* Concepts this verse stands on — linked to topic hubs where published */}
          {conceptLinks.length > 0 && (
            <div className="gv-keys gv-reveal" aria-label="Concepts behind this verse">
              <span className="gv-keys-label">Built on</span>
              {conceptLinks.map(({ name, topic }) =>
                topic ? (
                  <a
                    key={name}
                    href={topicUrl(topic.slug)}
                    className="gv-key"
                    data-mp-location={`verse_${c}_${v}_concept_${topic.slug}`}
                    title={`${topic.verseCount} verses on ${topic.label}`}
                  >
                    {name}
                    <span className="gv-key-count">{topic.verseCount}</span>
                  </a>
                ) : (
                  <span key={name} className="gv-key gv-key--plain">{name}</span>
                ),
              )}
            </div>
          )}

          {/* Numbered commentary journey: meaning → context → relevance */}
          {[
            verse.simpleMeaning   && { n: '01', label: 'What this verse means',       kicker: 'In plain words',   text: verse.simpleMeaning },
            verse.detailedMeaning && { n: '02', label: 'Context & commentary',         kicker: 'On the battlefield', text: verse.detailedMeaning },
            verse.modernRelevance && { n: '03', label: 'Why this verse still matters', kicker: 'In your life',      text: verse.modernRelevance },
          ].filter(Boolean).map((item) => {
            const { n, label, kicker, text } = item as { n: string; label: string; kicker: string; text: string }
            return (
              <div key={n} className="gv-cmnt gv-reveal">
                <span className="gv-cmnt-ghost" aria-hidden="true">{n}</span>
                <div className="gv-cmnt-kicker">{kicker}</div>
                <h2 className="gv-cmnt-h">{label}</h2>
                <p className="gv-cmnt-p">{text}</p>
              </div>
            )
          })}

          {/* Takeaway — prominent callout */}
          {verse.simpleInsight && (
            <div className="gv-takeaway gv-reveal">
              <div className="gv-takeaway-kicker">The takeaway</div>
              <p className="gv-takeaway-quote">&ldquo;{verse.simpleInsight}&rdquo;</p>
            </div>
          )}

          {/* Carry it with you — pocket versions, right where the meaning just landed */}
          {(verse.quoteVariants?.length ?? 0) > 0 && (
            <div className="gv-reveal">
              <MantraCards variants={verse.quoteVariants!} chapter={c} verse={v} />
            </div>
          )}

          <ShareButtons
            url={verseUrl(c, v)}
            text={verse.quoteVariants?.find((q) => q.format === 'card')?.text || verse.essence || verse.englishTranslation}
            title={`Bhagavad Gita ${c}.${v}`}
            locale="en"
          />

          {ch && (
            <a
              href={chapterUrl(c)}
              data-mp-location={`verse_${c}_${v}_chapter_card`}
              className="gv-chcard gv-reveal"
              style={{
                marginTop: 44,
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(245,201,106,0.25)',
                textDecoration: 'none',
                background: 'var(--bg-card, rgba(255,255,255,0.04))',
              }}
            >
              {/* Hero image strip */}
              <div style={{ position: 'relative', height: '130px', overflow: 'hidden' }}>
                <img
                  src={chapterImage(c).src}
                  alt={chapterImage(c).alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,5,20,0.15) 0%, rgba(10,5,20,0.75) 100%)' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '18px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,201,106,0.85)',
                }}>
                  Chapter {c} · {ch.enTitle}
                </div>
              </div>
              {/* Card body */}
              <div style={{ padding: '16px 20px 18px' }}>
                <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '5px', lineHeight: 1.3 }}>
                  {ch.enName}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-dimmer)', marginBottom: '14px' }}>
                  {ch.processedVerses}{ch.totalVerses && ch.totalVerses !== ch.processedVerses ? ` of ${ch.totalVerses}` : ''} verses
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--gold-light, #e8c070)' }}>
                  Read all verses in this chapter →
                </span>
              </div>
            </a>
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

      {/* ── Go Deeper: curated blog links for this verse ── */}
      {blogLinks.length > 0 && (
        <section
          className="gv-reveal"
          style={{ margin: '56px 0 0' }}
          data-mp-section={`verse_${c}_${v}_go_deeper`}
          aria-label="Go deeper"
        >
          <div className="gv-sechead">
            <span className="gv-sechead-label">Go deeper</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {blogLinks.map((link) => (
              <a
                key={link.slug}
                href={`/blog/${link.slug}`}
                data-mp-location={`verse_${c}_${v}_blog_${link.slug}`}
                data-mp-event="Blog Deep Dive Clicked"
                data-mp-props={JSON.stringify({ verse: `${c}.${v}`, slug: link.slug })}
                className="gv-blogcard"
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  background: 'var(--bg-card, rgba(255,255,255,0.04))',
                  border: '1px solid rgba(245,201,106,0.18)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  minHeight: '96px',
                }}
              >
                {/* Thumbnail */}
                <div style={{ flexShrink: 0, width: '110px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={link.image}
                    alt=""
                    aria-hidden="true"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(10,5,20,0.55))' }} />
                </div>

                {/* Text */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', flex: 1 }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dimmer)' }}>
                    Essay
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gold-light, #e8c070)', lineHeight: 1.4 }}>
                    {link.cta}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── Continue the dialogue: prominent prev/next with teasers ── */}
      <section className="gv-reveal" style={{ marginTop: '56px' }} aria-label="Continue reading">
        <div className="gv-sechead">
          <span className="gv-sechead-label">Continue the dialogue</span>
        </div>
        <div className="gv-pn">
          <a
            className={`gv-pn-card prev ${prev ? '' : 'disabled'}`}
            href={prev ? verseUrl(prev.chapter, prev.verse) : '#'}
            data-mp-location={`verse_${c}_${v}_prev`}
          >
            <span className="gv-pn-arrow" aria-hidden="true">←</span>
            <span className="gv-pn-body">
              <span className="gv-pn-kicker">Back · {prev ? `${prev.chapter}.${prev.verse}` : ''}</span>
              {prev && <span className="gv-pn-teaser">{prev.essence || prev.snippet}</span>}
            </span>
          </a>
          <a
            className={`gv-pn-card next ${next ? '' : 'disabled'}`}
            href={next ? verseUrl(next.chapter, next.verse) : '#'}
            data-mp-location={`verse_${c}_${v}_next`}
          >
            <span className="gv-pn-body right">
              <span className="gv-pn-kicker">Next verse · {next ? `${next.chapter}.${next.verse}` : ''}</span>
              {next && <span className="gv-pn-teaser">{next.essence || next.snippet}</span>}
            </span>
            <span className="gv-pn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ── Floating verse navigator: always reachable, never lost ── */}
      <nav className="gv-versenav" aria-label="Verse navigation">
        {prev ? (
          <a href={verseUrl(prev.chapter, prev.verse)} className="gv-versenav-btn" data-mp-location={`verse_${c}_${v}_float_prev`} aria-label={`Previous verse ${prev.chapter}.${prev.verse}`}>
            ← {prev.chapter}.{prev.verse}
          </a>
        ) : (
          <span className="gv-versenav-btn disabled">←</span>
        )}
        <span className="gv-versenav-now">{c}.{v}</span>
        {next ? (
          <a href={verseUrl(next.chapter, next.verse)} className="gv-versenav-btn" data-mp-location={`verse_${c}_${v}_float_next`} aria-label={`Next verse ${next.chapter}.${next.verse}`}>
            {next.chapter}.{next.verse} →
          </a>
        ) : (
          <span className="gv-versenav-btn disabled">→</span>
        )}
      </nav>

      {related.length > 0 && (
        <section className="gv-reveal" style={{ marginTop: '56px' }} aria-label="Related verses">
          <div className="gv-sechead">
            <span className="gv-sechead-label">Verses in the same spirit</span>
          </div>
          <ul className="gv-related-grid">
            {related.map((r) => {
              const sharedTag = r.tags?.find((t) => verse.tags.includes(t))
              return (
                <li key={`${r.chapter}-${r.verse}`}>
                  <a
                    className="gv-rel-card"
                    href={verseUrl(r.chapter, r.verse)}
                    data-mp-location={`verse_${c}_${v}_related_${r.chapter}_${r.verse}`}
                  >
                    <div className="gv-rel-top">
                      <span className="gv-rel-num">{r.chapter}.{r.verse}</span>
                      {sharedTag && <span className="gv-rel-tag">{sharedTag.replace(/-/g, ' ')}</span>}
                    </div>
                    <p className="gv-rel-quote">&ldquo;{r.essence || r.snippet}&rdquo;</p>
                    <span className="gv-rel-cta">Read verse →</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </main>
  )
}

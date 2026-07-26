import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
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
  chapterImage,
  topicUrl,
  findTopicForConcept,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import { getBlogLinksForVerse } from '@/lib/blogVerseLinks'
import BlogTracker from '@/components/BlogTracker'
import ShareButtons from '@/components/gita/ShareButtons'
import VerseBookmark from '@/components/gita/VerseBookmark'
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
  const blogLinks = getBlogLinksForVerse(c, v)

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

  // ── V3 enrichment: raw pipeline labels → human Hindi copy ──
  const typeLabel = ({
    teaching:    'एक मूल शिक्षा',
    declaration: 'एक घोषणा',
    narrative:   'कथा-प्रसंग',
    inquiry:     'एक प्रश्न',
    devotional:  'भक्ति श्लोक',
    metaphor:    'एक रूपक',
    description: 'एक वर्णन',
  } as Record<string, string>)[verse.verseType ?? '']
  const toneLabel = ({
    reflective: 'चिंतनशील भाव',
    expansive:  'विराट भाव',
    grounding:  'स्थिर करने वाला भाव',
    devotional: 'भक्तिभाव',
    calming:    'शांत भाव',
    inspiring:  'प्रेरक भाव',
  } as Record<string, string>)[verse.tone ?? '']
  const depthNote = ({
    surface: 'सहज प्रवेश',
    medium:  'थोड़ा संदर्भ सहायक',
    deep:    'गहरे अर्थ वाला',
  } as Record<string, string>)[verse.depth ?? '']
  const heroNote = [typeLabel, toneLabel, depthNote].filter(Boolean).join(' · ')
  const conceptLinks = (verse.requisiteConcepts ?? []).map((name) => ({
    name,
    topic: findTopicForConcept(name),
  }))

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

      <nav className="gita-crumb gv-rise" aria-label="Breadcrumb">
        <a href="/hi/gita" data-mp-location={`verse_hi_${c}_${v}_crumb_gita`}>भगवद् गीता</a>
        <span className="sep">›</span>
        <a href={chapterUrl(c, 'hi')} data-mp-location={`verse_hi_${c}_${v}_crumb_chapter`}>
          अध्याय {c}
          {ch ? `: ${ch.hiName}` : ''}
        </a>
        <span className="sep">›</span>
        <span>श्लोक {v}</span>
      </nav>

      <header className="gv-hero-head">
        <div className="gv-hero-eyebrow gv-rise" style={{ '--d': '0.06s' } as CSSProperties}>पवित्र श्लोक</div>
        <h1 className="gita-h1 gv-hero-h1 gv-rise" style={{ '--d': '0.12s' } as CSSProperties}>भगवद् गीता {c}.{v}</h1>
        <div className="gv-hero-badges gv-rise" style={{ '--d': '0.18s' } as CSSProperties}>
          <span className="gv-hero-pill">{ch?.hiName ?? `अध्याय ${c}`} · श्लोक {v}</span>
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
        <span className="gv-card-chip">श्लोक</span>
        <div className="gv-diamonds" aria-hidden="true"><i /><i /><i /></div>
        {audio ? (
          <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={c} verse={v} />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}

        {/* Hindi rendered as the main reading line on the Hindi page */}
        <p className="gv-en-quote" lang="hi">{verse.hindiTranslation}</p>
        {verse.speaker && <div className="gv-en-speaker">— {verse.speaker}</div>}

        <div className="gv-orn-divider" aria-hidden="true">
          <span /><em>❋</em><span />
        </div>
        <div className="gv-card-attrib">भगवद् गीता · {c}.{v}</div>

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

      {/* ── Word-by-word: interlinear gloss ── */}
      {wordByWord.length > 0 && (
        <section className="gv-wbw gv-reveal" aria-label="शब्दार्थ">
          <div className="gv-sechead">
            <span className="gv-sechead-label">शब्द-दर-शब्द</span>
          </div>
          <p className="gv-sechead-sub">
            श्लोक क्रम में — हर संस्कृत शब्द और नीचे उसका अर्थ। किसी शब्द पर जाकर उसे देखें।
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
            <b>शब्दशः</b>
            {wordByWord.map((w) => w.gloss).join(' · ')}
          </p>
        </section>
      )}

      {(verse.simpleMeaning || verse.detailedMeaning) && (
        <section className="gita-commentary" aria-label="अर्थ और संदर्भ" style={{ marginTop: '52px' }}>

          <div className="gv-sechead gv-reveal">
            <span className="gv-sechead-label">श्लोक को समझें</span>
          </div>
          {verse.insight && (
            <div className="gv-insight gv-reveal">
              <span className="gv-insight-icon" aria-hidden="true">✦</span>
              <p>{verse.insight}</p>
            </div>
          )}

          {/* Concepts this verse stands on — linked to topic hubs where published */}
          {conceptLinks.length > 0 && (
            <div className="gv-keys gv-reveal" aria-label="इस श्लोक के मूल भाव">
              <span className="gv-keys-label">आधार</span>
              {conceptLinks.map(({ name, topic }) =>
                topic ? (
                  <a
                    key={name}
                    href={topicUrl(topic.slug, 'hi')}
                    className="gv-key"
                    data-mp-location={`verse_hi_${c}_${v}_concept_${topic.slug}`}
                    title={`${topic.label} पर ${topic.verseCount} श्लोक`}
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

          {[
            verse.simpleMeaning   && { n: '01', label: 'इस श्लोक का अर्थ',   kicker: 'सरल शब्दों में', text: verse.simpleMeaning },
            verse.detailedMeaning && { n: '02', label: 'संदर्भ और टिप्पणी',   kicker: 'युद्धभूमि पर',   text: verse.detailedMeaning },
            verse.modernRelevance && { n: '03', label: 'आज के जीवन में महत्व', kicker: 'आपके जीवन में',  text: verse.modernRelevance },
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

          {verse.simpleInsight && (
            <div className="gv-takeaway gv-reveal">
              <div className="gv-takeaway-kicker">सार</div>
              <p className="gv-takeaway-quote">&ldquo;{verse.simpleInsight}&rdquo;</p>
            </div>
          )}

          {/* Carry it with you — pocket versions, right where the meaning just landed */}
          {(verse.quoteVariants?.length ?? 0) > 0 && (
            <div className="gv-reveal">
              <MantraCards variants={verse.quoteVariants!} chapter={c} verse={v} locale="hi" />
            </div>
          )}

          <ShareButtons
            url={verseUrl(c, v, 'hi')}
            text={verse.quoteVariants?.find((q) => q.format === 'card')?.text || verse.essence || verse.hindiTranslation || verse.englishTranslation}
            title={`भगवद् गीता ${c}.${v}`}
            locale="hi"
          />

          {ch && (
            <a
              href={chapterUrl(c, 'hi')}
              data-mp-location={`verse_hi_${c}_${v}_chapter_card`}
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
                  अध्याय {c} · {ch.hiTitle}
                </div>
              </div>
              {/* Card body */}
              <div style={{ padding: '16px 20px 18px' }}>
                <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '5px', lineHeight: 1.3 }}>
                  {ch.hiName}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-dimmer)', marginBottom: '14px' }}>
                  {ch.processedVerses}{ch.totalVerses && ch.totalVerses !== ch.processedVerses ? ` / ${ch.totalVerses}` : ''} श्लोक
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--gold-light, #e8c070)' }}>
                  इस अध्याय के सभी श्लोक पढ़ें →
                </span>
              </div>
            </a>
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

      {/* ── Go Deeper: curated blog links for this verse ── */}
      {blogLinks.length > 0 && (
        <section
          className="gv-reveal"
          style={{ margin: '56px 0 0' }}
          data-mp-section={`verse_hi_${c}_${v}_go_deeper`}
          aria-label="और जानें"
        >
          <div className="gv-sechead">
            <span className="gv-sechead-label">और जानें</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {blogLinks.map((link) => (
              <a
                key={link.slug}
                href={`/blog/${link.slug}`}
                data-mp-location={`verse_hi_${c}_${v}_blog_${link.slug}`}
                data-mp-event="Blog Deep Dive Clicked"
                data-mp-props={JSON.stringify({ verse: `${c}.${v}`, slug: link.slug, locale: 'hi' })}
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
      <section className="gv-reveal" style={{ marginTop: '56px' }} aria-label="आगे पढ़ें">
        <div className="gv-sechead">
          <span className="gv-sechead-label">संवाद आगे बढ़ाएँ</span>
        </div>
        <div className="gv-pn">
          <a
            className={`gv-pn-card prev ${prev ? '' : 'disabled'}`}
            href={prev ? verseUrl(prev.chapter, prev.verse, 'hi') : '#'}
            data-mp-location={`verse_hi_${c}_${v}_prev`}
          >
            <span className="gv-pn-arrow" aria-hidden="true">←</span>
            <span className="gv-pn-body">
              <span className="gv-pn-kicker">पिछला · {prev ? `${prev.chapter}.${prev.verse}` : ''}</span>
              {prev && <span className="gv-pn-teaser">{prev.essence || prev.snippet}</span>}
            </span>
          </a>
          <a
            className={`gv-pn-card next ${next ? '' : 'disabled'}`}
            href={next ? verseUrl(next.chapter, next.verse, 'hi') : '#'}
            data-mp-location={`verse_hi_${c}_${v}_next`}
          >
            <span className="gv-pn-body right">
              <span className="gv-pn-kicker">अगला श्लोक · {next ? `${next.chapter}.${next.verse}` : ''}</span>
              {next && <span className="gv-pn-teaser">{next.essence || next.snippet}</span>}
            </span>
            <span className="gv-pn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ── Floating verse navigator: always reachable, never lost ── */}
      <nav className="gv-versenav" aria-label="श्लोक नेविगेशन">
        {prev ? (
          <a href={verseUrl(prev.chapter, prev.verse, 'hi')} className="gv-versenav-btn" data-mp-location={`verse_hi_${c}_${v}_float_prev`} aria-label={`पिछला श्लोक ${prev.chapter}.${prev.verse}`}>
            ← {prev.chapter}.{prev.verse}
          </a>
        ) : (
          <span className="gv-versenav-btn disabled">←</span>
        )}
        <span className="gv-versenav-now">{c}.{v}</span>
        {next ? (
          <a href={verseUrl(next.chapter, next.verse, 'hi')} className="gv-versenav-btn" data-mp-location={`verse_hi_${c}_${v}_float_next`} aria-label={`अगला श्लोक ${next.chapter}.${next.verse}`}>
            {next.chapter}.{next.verse} →
          </a>
        ) : (
          <span className="gv-versenav-btn disabled">→</span>
        )}
      </nav>

      {related.length > 0 && (
        <section className="gv-reveal" style={{ marginTop: '56px' }} aria-label="संबंधित श्लोक">
          <div className="gv-sechead">
            <span className="gv-sechead-label">इसी भाव के श्लोक</span>
          </div>
          <ul className="gv-related-grid">
            {related.map((r) => {
              const sharedTag = r.tags?.find((t) => verse.tags.includes(t))
              return (
                <li key={`${r.chapter}-${r.verse}`}>
                  <a
                    className="gv-rel-card"
                    href={verseUrl(r.chapter, r.verse, 'hi')}
                    data-mp-location={`verse_hi_${c}_${v}_related_${r.chapter}_${r.verse}`}
                  >
                    <div className="gv-rel-top">
                      <span className="gv-rel-num">{r.chapter}.{r.verse}</span>
                      {sharedTag && <span className="gv-rel-tag">{sharedTag.replace(/-/g, ' ')}</span>}
                    </div>
                    <p className="gv-rel-quote">&ldquo;{r.essence || r.snippet}&rdquo;</p>
                    <span className="gv-rel-cta">श्लोक पढ़ें →</span>
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

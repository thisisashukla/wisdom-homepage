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
  chapterImage,
  topicUrl,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import { getBlogLinksForVerse } from '@/lib/blogVerseLinks'
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
        {verse.verseType && (
          <span style={{
            display: 'inline-block',
            marginLeft: '10px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,201,106,0.75)',
            background: 'rgba(245,201,106,0.1)',
            border: '1px solid rgba(245,201,106,0.22)',
            borderRadius: '4px',
            padding: '2px 7px',
            verticalAlign: 'middle',
          }}>
            {verse.verseType}
          </span>
        )}
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
          {verse.speaker && (
            <div style={{ fontSize: '12px', color: 'var(--text-dimmer)', marginTop: '8px', fontStyle: 'italic' }}>
              — {verse.speaker}
            </div>
          )}
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

      {/* ── Word-by-word translation grid ── */}
      {wordByWord.length > 0 && (
        <section style={{ marginTop: '32px' }} aria-label="शब्दार्थ">
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,201,106,0.45)',
            marginBottom: '14px',
          }}>
            शब्द-दर-शब्द अर्थ
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {wordByWord.map((w, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(245,201,106,0.14)',
                borderRadius: '8px',
                padding: '10px 14px',
                textAlign: 'center',
                minWidth: '70px',
              }}>
                <div style={{ fontSize: '15px', fontFamily: 'serif', color: 'var(--gold-pale, #f5e6b8)', marginBottom: '5px', lineHeight: 1.3 }} lang="sa">
                  {w.sanskrit}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-dimmer)', letterSpacing: '0.02em' }}>
                  {w.gloss}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(verse.simpleMeaning || verse.detailedMeaning) && (
        <section className="gita-commentary" aria-label="अर्थ और संदर्भ" style={{ marginTop: '40px' }}>

          <style dangerouslySetInnerHTML={{ __html: `
            @supports (animation-timeline: view()) {
              @keyframes cmnt-in {
                from { opacity: 0; transform: translateY(20px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .cmnt-block {
                animation: cmnt-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
                animation-timeline: view();
                animation-range: entry 0% entry 35%;
              }
            }
            .cmnt-card {
              transition: border-left-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
            }
            .cmnt-card:hover {
              border-left-color: rgba(245,201,106,0.8) !important;
              background: rgba(255,255,255,0.05) !important;
              box-shadow: 0 4px 24px rgba(0,0,0,0.25);
            }
          ` }} />

          {[
            verse.simpleMeaning   && { n: '01', label: 'इस श्लोक का अर्थ',   text: verse.simpleMeaning },
            verse.detailedMeaning && { n: '02', label: 'संदर्भ और टिप्पणी',   text: verse.detailedMeaning },
            verse.modernRelevance && { n: '03', label: 'आज के जीवन में महत्व', text: verse.modernRelevance },
          ].filter(Boolean).map((item) => {
            const { n, label, text } = item as { n: string; label: string; text: string }
            return (
              <div
                key={n}
                className="cmnt-block cmnt-card"
                style={{
                  borderLeft: '3px solid rgba(245,201,106,0.38)',
                  background: 'rgba(255,255,255,0.028)',
                  borderRadius: '0 14px 14px 0',
                  padding: '22px 26px 26px',
                  marginBottom: '12px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(245,201,106,0.4)', marginBottom: '9px', letterSpacing: '0.08em' }}>
                  {n}
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text, #f0e6d0)', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.015em' }}>
                  {label}
                </h2>
                <p style={{ margin: 0, lineHeight: 1.8, color: 'var(--text-dim, rgba(240,230,208,0.75))', fontSize: '15.5px' }}>
                  {text}
                </p>
              </div>
            )
          })}

          {verse.simpleInsight && (
            <div
              className="cmnt-block"
              style={{
                margin: '20px 0 4px',
                background: 'rgba(245,201,106,0.07)',
                border: '1px solid rgba(245,201,106,0.32)',
                borderRadius: '16px',
                padding: '36px 32px 38px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,201,106,0.5)', marginBottom: '20px' }}>
                सार
              </div>
              <p style={{ margin: '0 auto', maxWidth: '520px', fontSize: '20px', fontStyle: 'italic', color: 'var(--gold-pale, #f5e6b8)', lineHeight: 1.65, letterSpacing: '-0.01em' }}>
                &ldquo;{verse.simpleInsight}&rdquo;
              </p>
            </div>
          )}

          {ch && (
            <a
              href={chapterUrl(c, 'hi')}
              data-mp-location={`verse_hi_${c}_${v}_chapter_card`}
              style={{
                display: 'block',
                marginTop: 36,
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
          style={{ margin: '48px 0 0' }}
          data-mp-section={`verse_hi_${c}_${v}_go_deeper`}
          aria-label="और जानें"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(245,201,106,0.15)' }} />
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dimmer)', whiteSpace: 'nowrap' }}>
              और जानें
            </div>
            <div style={{ flex: 1, height: '1px', background: 'rgba(245,201,106,0.15)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {blogLinks.map((link) => (
              <a
                key={link.slug}
                href={`/blog/${link.slug}`}
                data-mp-location={`verse_hi_${c}_${v}_blog_${link.slug}`}
                data-mp-event="Blog Deep Dive Clicked"
                data-mp-props={JSON.stringify({ verse: `${c}.${v}`, slug: link.slug, locale: 'hi' })}
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

      <div className="gita-pn" style={{ marginTop: '48px' }}>
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

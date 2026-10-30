import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import VerseNavReveal from '@/components/gita/VerseNavReveal'
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
  hasTopic,
  topicUrl,
  findTopicForConcept,
  topicLabel,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import { getBlogLinksForVerse } from '@/lib/blogVerseLinks'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShareButtons from '@/components/gita/ShareButtons'
import VerseBookmark from '@/components/gita/VerseBookmark'
import SanskritText from '@/components/gita/SanskritText'
import MantraCards from '@/components/gita/MantraCards'
import QuoteCard from '@/components/quotes/QuoteCard'
import { getQuote, quotesByMoment, verseHref } from '@/lib/quotes'
import type { Quote, Locale } from '@/lib/quotes'

type Params = { chapter: string; verse: string }

/** Verse page of the next-ranked Gita quote that shares this quote's first moment. */
function anotherLineHref(quote: Quote, locale: Locale): string | null {
  const moment = quote.moments?.[0]
  if (!moment) return null
  const list = quotesByMoment(moment).filter((q) => verseHref(q, locale))
  if (list.length < 2) return null
  const i = list.findIndex((q) => q.id === quote.id)
  return verseHref(list[(i + 1) % list.length], locale)
}

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

/** Whole sentences of `text` that fit in `max` chars; falls back to a word-boundary trim. */
const fitSentences = (text: string | undefined, max: number): string => {
  const clean = (text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  let out = ''
  for (const s of clean.split(/(?<=[.!?।॥])\s+/)) {
    const next = out ? `${out} ${s}` : s
    if (next.length > max) break
    out = next
  }
  return out || trimToLength(clean, max)
}

const firstDevaPada = (sanskrit: string, maxChars = 50): string => {
  if (!sanskrit) return ''
  const first = sanskrit
    .split(/[।॥|\n\r]/)[0]
    ?.replace(/\s+/g, ' ')
    .trim()
  if (!first) return ''
  if (first.length <= maxChars) return first
  const cut = first.slice(0, maxChars)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut) + '…'
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = Number(params.chapter)
  const v = Number(params.verse)
  const verse = await getVerse(c, v)
  if (!verse) return { title: 'श्लोक नहीं मिला' }
  const ch = getChapter(c)
  // ── Title: Hindi-first, with the shloka's opening pada as a fingerprint
  //    ("गीता श्लोक … अर्थ सहित" is how Hindi searchers phrase it). Falls back
  //    to a shorter form when the pada would push past ~60 characters. ──
  const devaOpen = firstDevaPada(verse.sanskrit, 32)
  const withPada = `गीता ${c}.${v} (BG ${c}.${v}): ${devaOpen} — अर्थ सहित`
  const title = devaOpen && withPada.length <= 61
    ? withPada
    : `भगवद् गीता ${c}.${v} (BG ${c}.${v}) — श्लोक का हिंदी अर्थ`

  // ── Description: always Hindi. simpleMeaning/detailedMeaning are English in
  //    the corpus, so lead with the Hindi translation. ──
  // A few corpus rows have a stub Hindi translation (e.g. 18.2 is just "॥");
  // fall back to the Sanskrit shloka so the snippet stays Devanagari.
  const hindiOk = (verse.hindiTranslation || '').replace(/[^\u0900-\u097F]/g, '').length >= 20
  const descLead = hindiOk ? verse.hindiTranslation : verse.sanskrit
  // Devanagari renders wider than Latin in results, so cap at ~140 chars.
  const descPrefix = `गीता ${c}.${v} का अर्थ: `
  const descSuffix = ' संस्कृत, हिंदी अर्थ व व्याख्या।'
  const description = `${descPrefix}${fitSentences(descLead, 140 - descPrefix.length - descSuffix.length)}${descSuffix}`
  const ogImage = `https://wisdomquotes.in/api/og/gita/${c}/${v}`
  return {
    title,
    description,
    keywords: [
      `भगवद् गीता ${c}.${v}`,
      `गीता ${c}.${v}`,
      `bg ${c}.${v}`,
      `bhagavad gita ${c}.${v}`,
      `गीता अध्याय ${c} श्लोक ${v}`,
      ch ? ch.hiName : '',
    ].filter(Boolean).join(', '),
    alternates: {
      canonical: `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
      languages: {
        'en': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
        'en-IN': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
        'hi': `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
        'hi-IN': `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
        'x-default': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
      },
    },
    openGraph: {
      title: `भगवद् गीता ${c}.${v} — ${verse.essence || ''}`,
      description: verse.hindiTranslation,
      url: `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
      type: 'article',
      siteName: 'Wisdom',
      locale: 'hi_IN',
      alternateLocale: ['en_IN'],
      images: [
        { url: ogImage, width: 1200, height: 630, alt: `भगवद् गीता ${c}.${v}` },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `भगवद् गीता ${c}.${v}`,
      description: verse.hindiTranslation,
      images: [ogImage],
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
  const quote = getQuote(`bg-${c}-${v}`)

  const wordByWord = verse.translationLiteral
    ? verse.translationLiteral
        .split(' / ')
        .map(token => {
          const m = token.match(/^(.+?)\s+\((.+?)\)$/)
          return m ? { sanskrit: m[1].trim(), gloss: m[2].trim() } : null
        })
        .filter((x): x is { sanskrit: string; gloss: string } => x !== null)
    : []

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

  // ── Structured data ─────────────────────────────────────────────────────────

  const speakerPerson = verse.speaker
    ? {
        '@type': 'Person',
        name: verse.speaker,
        ...(verse.speaker.toLowerCase().includes('krishna') && {
          alternateName: ['श्रीकृष्ण', 'Sri Krishna', 'Bhagavan'],
        }),
        ...(verse.speaker.toLowerCase().includes('arjuna') && {
          alternateName: ['अर्जुन', 'Partha'],
        }),
      }
    : undefined

  const quotationLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: verse.hindiTranslation || verse.englishTranslation,
    creator: speakerPerson,
    spokenByCharacter: speakerPerson,
    about: verse.tags,
    isPartOf: {
      '@type': 'Chapter',
      name: ch ? ch.hiName : `अध्याय ${c}`,
      position: c,
      isPartOf: { '@type': 'Book', name: 'भगवद् गीता', url: 'https://wisdomquotes.in/hi/gita' },
    },
    inLanguage: ['sa', 'hi', 'en'],
    url: `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'भगवद् गीता', item: 'https://wisdomquotes.in/hi/gita' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `अध्याय ${c}${ch ? `: ${ch.hiName}` : ''}`,
        item: `https://wisdomquotes.in${chapterUrl(c, 'hi')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `श्लोक ${v}`,
        item: `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
      },
    ],
  }

  const articleLd = (verse.simpleMeaning || verse.detailedMeaning) ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `भगवद् गीता ${c}.${v} — ${verse.essence || 'अर्थ और टिप्पणी'}`,
    description: verse.simpleMeaning || verse.detailedMeaning,
    articleBody: [
      verse.simpleMeaning,
      verse.detailedMeaning,
      verse.modernRelevance,
      verse.simpleInsight,
    ].filter(Boolean).join('\n\n'),
    author: {
      '@type': 'Person',
      name: 'Ankur Shukla',
      url: 'https://wisdomquotes.in/about',
      sameAs: ['https://www.linkedin.com/in/thisisashukla/', 'https://x.com/thisisashukla'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wisdom',
      url: 'https://wisdomquotes.in',
      logo: { '@type': 'ImageObject', url: 'https://wisdomquotes.in/assets/new-light-logo.webp' },
    },
    mainEntityOfPage: `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
    image: [`https://wisdomquotes.in/api/og/gita/${c}/${v}`],
    about: verse.tags.map((t) => ({ '@type': 'Thing', name: t })),
    mentions: [
      { '@type': 'Book', name: 'भगवद् गीता', url: 'https://wisdomquotes.in/hi/gita' },
      ...(speakerPerson ? [speakerPerson] : []),
    ],
    isPartOf: {
      '@type': 'Chapter',
      name: ch ? ch.hiName : `अध्याय ${c}`,
      position: c,
      isPartOf: { '@type': 'Book', name: 'भगवद् गीता' },
    },
    inLanguage: 'hi',
    datePublished: '2026-06-12',
    dateModified: '2026-08-01',
  } : null

  const audioLd = audio ? {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    name: `भगवद् गीता ${c}.${v} — संस्कृत गायन`,
    description: `भगवद् गीता के श्लोक ${c}.${v}${ch ? ` (${ch.hiName})` : ''} का संस्कृत गायन।`,
    contentUrl: audio.audio.startsWith('http') ? audio.audio : `https://wisdomquotes.in${audio.audio}`,
    encodingFormat: 'audio/mpeg',
    inLanguage: 'sa',
    isPartOf: {
      '@type': 'Book',
      name: 'भगवद् गीता',
      url: 'https://wisdomquotes.in/hi/gita',
    },
  } : null

  // ── Auto-generated FAQ + FAQPage schema (Hindi) ──
  type Faq = { q: string; a: string }
  const faqs: Faq[] = []
  const hindiMeaning = verse.simpleMeaning || verse.hindiTranslation || verse.englishTranslation
  if (hindiMeaning) {
    faqs.push({
      q: `भगवद् गीता ${c}.${v} का क्या अर्थ है?`,
      a: hindiMeaning,
    })
  }
  if (verse.speaker) {
    faqs.push({
      q: `भगवद् गीता ${c}.${v} किसने कहा है?`,
      a: `यह श्लोक ${verse.speaker} द्वारा कहा गया है${ch ? `, कुरुक्षेत्र की भूमि पर, अध्याय "${ch.hiName}" में।` : '।'}`,
    })
  }
  if (ch) {
    faqs.push({
      q: `भगवद् गीता ${c}.${v} किस अध्याय में है?`,
      a: `श्लोक ${v} भगवद् गीता के ${c}वें अध्याय में है — ${ch.hiName}। इस अध्याय में कुल ${ch.totalVerses} श्लोक हैं।`,
    })
  }
  if (verse.modernRelevance) {
    faqs.push({
      q: `भगवद् गीता ${c}.${v} आज के जीवन में क्यों प्रासंगिक है?`,
      a: verse.modernRelevance,
    })
  }
  const faqLd = faqs.length >= 2 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'hi',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_verse_hi_${c}_${v}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {articleLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      )}
      {audioLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(audioLd) }} />
      )}
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

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
        <h1 className="gita-h1 gv-hero-h1 gv-rise" style={{ '--d': '0.12s' } as CSSProperties}>
          भगवद् गीता {c}.{v}
          <span className="gv-hero-h1-sub" style={{ display: 'block', fontSize: '0.65em', fontWeight: 500, opacity: 0.75, marginTop: '0.35em' }}>
            BG {c}.{v} · अध्याय {c}, श्लोक {v}
          </span>
        </h1>
        <div className="gv-hero-badges gv-rise" style={{ '--d': '0.18s' } as CSSProperties}>
          <span className="gv-hero-pill">{ch?.hiName ?? `अध्याय ${c}`}</span>
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
          Wisdom अनुवाद, संपादन: अंकुर शुक्ला। टिप्पणी AI से तैयार, फिर व्यक्ति द्वारा जाँची गई (जून 2026)।{' '}
          <a href="/methodology">कैसे बनता है →</a>
        </p>
      </header>

      <article className="gita-verse-card gv-hero-card gv-rise" style={{ '--d': '0.36s' } as CSSProperties}>
        <span className="gv-card-chip">श्लोक</span>
        <div className="gv-diamonds" aria-hidden="true"><i /><i /><i /></div>
        {audio ? (
          <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={c} verse={v} locale="hi" />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}

        <p className="gv-en-quote" lang="hi">{verse.hindiTranslation}</p>
        {verse.speaker && <div className="gv-en-speaker">— {verse.speaker}</div>}

        <div className="gv-orn-divider" aria-hidden="true">
          <span /><em>❋</em><span />
        </div>
        <div className="gv-card-attrib">भगवद् गीता · {c}.{v}</div>

        <div className="gita-translation">
          <div className="gita-translation-label">अंग्रेज़ी अनुवाद</div>
          <div className="gita-translation-text" lang="en">
            {verse.englishTranslation}
          </div>
        </div>

        {verse.tags.length > 0 && (
          <div className="gita-meta-row">
            <span>विषय:</span>
            {verse.tags.filter(hasTopic).map((t) => (
              <a
                key={t}
                href={topicUrl(t, 'hi')}
                className="gita-tag"
                data-mp-location={`verse_hi_${c}_${v}_tag_${t}`}
              >
                {topicLabel(t)}
              </a>
            ))}
            <VerseBookmark chapter={c} verse={v} locale="hi" />
          </div>
        )}
      </article>

      {/* ── Above-the-fold next-verse CTA (Hindi only). Hindi verse pages get
           ~1 verse/session on mobile from search — the "continue the dialogue"
           prev/next block sits below FAQs and blog links, and most bounces
           never reach it. This compact primary-styled CTA appears right after
           the verse card so search landings see a forward path before scrolling
           into commentary. English pages already convert on prev/next lower on
           the page; the addition here is Hindi-only. ── */}
      {(next || prev) && (
        <nav
          aria-label="अगला/पिछला श्लोक"
          className="gv-reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: prev && next ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr)',
            gap: '10px',
            margin: '18px 0 8px',
          }}
        >
          {prev && (
            <a
              href={verseUrl(prev.chapter, prev.verse, 'hi')}
              data-mp-location={`verse_hi_${c}_${v}_hero_prev`}
              data-mp-event="Hindi Verse Hero Prev Clicked"
              aria-label={`पिछला श्लोक ${prev.chapter}.${prev.verse}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(200,136,30,0.28)',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'var(--text-dim, rgba(245,232,204,0.65))',
                fontSize: '13.5px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              <span aria-hidden="true">←</span>
              <span>{prev.chapter}.{prev.verse}</span>
            </a>
          )}
          {next && (
            <a
              href={verseUrl(next.chapter, next.verse, 'hi')}
              data-mp-location={`verse_hi_${c}_${v}_hero_next`}
              data-mp-event="Hindi Verse Hero Next Clicked"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                padding: '14px 18px',
                background: 'linear-gradient(135deg, var(--gold, #c8881e) 0%, #e0a24a 100%)',
                borderRadius: '10px',
                textDecoration: 'none',
                color: '#120505',
                boxShadow: '0 4px 18px rgba(200,136,30,0.28)',
                minWidth: 0,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.75 }}>
                  अगला श्लोक · संवाद जारी रखें
                </div>
                <div style={{ fontSize: '15.5px', fontWeight: 700, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  भगवद् गीता {next.chapter}.{next.verse}
                  {next.essence && <span style={{ fontWeight: 500, opacity: 0.9 }}> — {next.essence.length > 42 ? next.essence.slice(0, 42) + '…' : next.essence}</span>}
                </div>
              </div>
              <span aria-hidden="true" style={{ fontSize: 22, fontWeight: 700, flexShrink: 0 }}>→</span>
            </a>
          )}
        </nav>
      )}

      {/* ── Share this line: the shareable quote card, below the full verse card so the study view comes first ── */}
      {quote && (
        <section className="gv-share-line" style={{ marginTop: '48px' }} aria-label="यह श्लोक शेयर करें" data-mp-section={`verse_hi_${c}_${v}_share_line`}>
          <div className="gv-sechead">
            <span className="gv-sechead-label">यह श्लोक शेयर करें</span>
          </div>
          <QuoteCard
            quote={quote}
            locale="hi"
            pageName={`gita_verse_hi_${c}_${v}`}
            moment={quote.moments?.[0]}
            variant="hero"
            compactHero
            audioSrc={null}
            verseHref={null}
            anotherHref={anotherLineHref(quote, 'hi')}
          />
        </section>
      )}

      {wordByWord.length > 0 && (
        <section className="gv-wbw gv-reveal" aria-label="शब्दार्थ">
          <div className="gv-sechead">
            <span className="gv-sechead-label">शब्द-दर-शब्द</span>
          </div>
          <p className="gv-sechead-sub">
            श्लोक क्रम में — हर संस्कृत शब्द और नीचे उसका अर्थ। किसी शब्द पर टैप करके उसे देखें।
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
                <div className="gv-cmnt-kicker">{kicker} · अंग्रेज़ी में</div>
                <h2 className="gv-cmnt-h">{label}</h2>
                <p className="gv-cmnt-p" lang="en">{text}</p>
              </div>
            )
          })}

          {verse.simpleInsight && (
            <div className="gv-takeaway gv-reveal">
              <div className="gv-takeaway-kicker">सार</div>
              <p className="gv-takeaway-quote">&ldquo;{verse.simpleInsight}&rdquo;</p>
            </div>
          )}

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
              <div style={{ position: 'relative', height: '130px', overflow: 'hidden' }}>
                <img
                  src={chapterImage(c).src}
                  alt={chapterImage(c).alt}
                  width={1200}
                  height={260}
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

      {/* ── सामान्य प्रश्न (matches FAQPage schema) ── */}
      {faqs.length >= 2 && (
        <section className="gv-reveal" style={{ marginTop: '56px' }} aria-label="इस श्लोक के बारे में सामान्य प्रश्न">
          <div className="gv-sechead">
            <span className="gv-sechead-label">सामान्य प्रश्न</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '18px' }}>
            {faqs.map((f, i) => (
              <details
                key={i}
                style={{
                  background: 'var(--bg-card, rgba(255,255,255,0.04))',
                  border: '1px solid rgba(245,201,106,0.18)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}
              >
                <summary
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text)',
                    cursor: 'pointer',
                    listStyle: 'none',
                  }}
                >
                  {f.q}
                </summary>
                <p style={{ marginTop: '10px', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-dim)' }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}


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
                href={`/blogs/${link.slug}`}
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
                    width={110}
                    height={96}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(10,5,20,0.55))' }} />
                </div>
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dimmer)' }}>
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

      <VerseNavReveal />
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
            {related.slice(0, Math.ceil(related.length / 2)).map((r) => {
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

          <FeedbackWidget pageType="verse" pageId={`verse_hi_${c}_${v}`} pageName={`gita_verse_hi_${c}_${v}`} />

          <ul className="gv-related-grid">
            {related.slice(Math.ceil(related.length / 2)).map((r) => {
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

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTopics, getTopic, getTopicVerses, topicIntro, topicUrl, verseUrl } from '@/lib/gita'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import ShlokaCard from '@/components/gita/ShlokaCard'
import BlogTracker from '@/components/BlogTracker'

type Params = { slug: string }

export async function generateStaticParams() {
  return getAllTopics().map((t) => ({ slug: t.slug }))
}

/**
 * Hindi + Devanagari + transliteration aliases that we want indexed with the
 * topic hub — mirrors the EN TOPIC_ALIASES so alternate spellings still match
 * the Hindi page (helps when a search query mixes English concept name with
 * Hindi context).
 */
const TOPIC_ALIASES: Record<string, string[]> = {
  samatva: ['samatvam', 'समत्व', 'समत्वम्'],
  nishkama: ['nishkam', 'niskama', 'निष्काम'],
  'nishkama-karma': ['nishkam karma', 'niskama karma', 'निष्काम कर्म'],
  indriya: ['इन्द्रिय', 'indriya nigraha', 'इन्द्रिय-निग्रह'],
  'indriya-nigraha': ['इन्द्रिय निग्रह', 'sense mastery'],
  vairagya: ['वैराग्य', 'detachment', 'renunciation'],
  ahankara: ['अहंकार', 'ahamkara', 'ego'],
  sharanagati: ['शरणागति', 'saranagati', 'surrender'],
  'karma-phala': ['कर्मफल', 'karmaphala', 'फल'],
  atman: ['आत्मा', 'atma', 'self'],
  jnana: ['ज्ञान', 'jñana', 'knowledge'],
  bhakti: ['भक्ति', 'devotion'],
  dharma: ['धर्म', 'duty', 'righteousness'],
  moksha: ['मोक्ष', 'mokṣa', 'liberation'],
  krishna: ['कृष्ण', 'श्रीकृष्ण'],
  krodha: ['क्रोध', 'anger'],
  brahman: ['ब्रह्म', 'ब्रह्मन्'],
  tapas: ['तप', 'तपस्'],
  buddhi: ['बुद्धि', 'intellect'],
  manas: ['मन', 'mind'],
}

/**
 * Per-topic "cascade" hand-offs — verses OUTSIDE the topic's own list that a
 * reader landing on this hub really should see. Each entry deep-links to a
 * specific verse with a one-line frame telling the reader why to go there.
 *
 * Ahankara hits SEO landings hard (~2k/month, ~97% bounce) — the /hi/gita/topic/ahankara
 * page needs a forward path. BG 2.62-63 (काम → क्रोध → बुद्धि-नाश cascade) is the
 * cleanest bridge from "ego" → "how ego actually breaks you" that isn't already
 * in the topic's verse list. Keep this dict small and hand-curated.
 */
const TOPIC_CASCADE_HI: Record<string, {
  chapter: number
  verse: number
  eyebrow: string
  headline: string
  sub: string
}> = {
  ahankara: {
    chapter: 2,
    verse: 62,
    eyebrow: 'आगे पढ़ें · अहंकार की कड़ी',
    headline: 'गीता 2.62–63 — कामना, क्रोध और बुद्धिनाश की शृंखला',
    sub: 'अहंकार अकेला नहीं टूटता। कृष्ण दो श्लोकों में वह पूरी शृंखला बताते हैं जो विषय-चिंतन से शुरू होकर बुद्धि के नाश पर समाप्त होती है।',
  },
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const topic = await getTopic(params.slug)
  if (!topic) return { title: 'विषय नहीं मिला' }
  const cap = topic.label.replace(/\b\w/g, (c) => c.toUpperCase())
  const aliases = TOPIC_ALIASES[params.slug]
  const aliasString = aliases && aliases.length > 0
    ? ` (${aliases.slice(0, 3).join(', ')})`
    : ''
  const title = `भगवद् गीता में ${cap}${aliasString} — ${topic.verseCount} श्लोक | Wisdom`
  const description = `भगवद् गीता के ${topic.verseCount} श्लोक जो ${topic.label}${aliasString} पर हैं — संस्कृत, हिन्दी और अंग्रेज़ी अनुवाद सहित। सभी 18 अध्यायों से चुने गए।`
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
      languages: {
        'en': `https://wisdomquotes.in${topicUrl(topic.slug, 'en')}`,
        'en-IN': `https://wisdomquotes.in${topicUrl(topic.slug, 'en')}`,
        'hi': `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
        'hi-IN': `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
        'x-default': `https://wisdomquotes.in${topicUrl(topic.slug, 'en')}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
      type: 'article',
      siteName: 'Wisdom',
      locale: 'hi_IN',
      alternateLocale: ['en_IN'],
      images: ['https://wisdomquotes.in/og-image.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://wisdomquotes.in/og-image.webp'],
    },
    keywords: aliases ? aliases.join(', ') : undefined,
  }
}

export default async function TopicPageHi({ params }: { params: Params }) {
  const topic = await getTopic(params.slug)
  if (!topic) notFound()
  const verses = await getTopicVerses(topic.slug, 50)
  const cap = topic.label.replace(/\b\w/g, (c) => c.toUpperCase())
  const intro = topicIntro(topic.slug, 'hi')

  // ── Featured / rest split. Hero renders the first 3 verses as full ShlokaCards
  //    (Sanskrit + Hindi + audio if available + deep-link to full verse page) so
  //    search landings that never scroll past the fold still see real content
  //    and a forward path — instead of a definition wall. ──
  const featured = verses.slice(0, 3)
  const rest = verses.slice(3)
  const cascade = TOPIC_CASCADE_HI[topic.slug]

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `भगवद् गीता में ${topic.label} पर श्लोक`,
    inLanguage: 'hi',
    numberOfItems: verses.length,
    itemListElement: verses.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://wisdomquotes.in${verseUrl(v.chapter, v.verse, 'hi')}`,
      name: `भगवद् गीता ${v.chapter}.${v.verse}`,
    })),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'भगवद् गीता', item: 'https://wisdomquotes.in/hi/gita' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `भगवद् गीता में ${topic.label}`,
        item: `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
      },
    ],
  }

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_topic_hi_${topic.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/hi/gita" data-mp-location={`topic_hi_${topic.slug}_crumb_gita`}>भगवद् गीता</a>
        <span className="sep">›</span>
        <span>विषय: {topic.label}</span>
      </nav>

      <div className="lang-switch">
        <span className="lang-switch-label">Also in</span>
        <a
          href={topicUrl(topic.slug, 'en')}
          data-mp-location={`topic_hi_${topic.slug}_lang_en`}
        >
          Read in English
        </a>
      </div>

      <div className="gita-eyebrow">विषय · {topic.verseCount} श्लोक</div>
      <h1 className="gita-h1">भगवद् गीता में {cap}</h1>
      <p className="gita-lede">
        {intro ?? `भगवद् गीता के ${topic.verseCount} श्लोक जो ${topic.label} पर हैं — सभी अध्यायों से, क्रम में।`}
      </p>

      {/* ── Above-the-fold Hindi app CTA. High-bounce Hindi topic pages (Ahankara
           in particular) get one prominent app hand-off before any verse list so
           search landings that only skim the hero still see the offer. ── */}
      <div style={{ margin: '18px 0 28px' }}>
      </div>

      {featured.length > 0 && (
        <section aria-label="चुने हुए श्लोक" style={{ margin: '8px 0 40px' }}>
          <div className="gv-sechead" style={{ marginBottom: 14 }}>
            <span className="gv-sechead-label">चुने हुए {featured.length} श्लोक — पूरा पाठ + संस्कृत ऑडियो</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {featured.map((v) => (
              <ShlokaCard
                key={`${v.chapter}-${v.verse}`}
                verseRef={`भगवद् गीता ${v.chapter}.${v.verse}`}
                speaker={v.speaker}
                sanskrit={v.sanskrit}
                meaningLabel="अर्थ · हिन्दी"
                meaning={v.hindiTranslation}
                insightLabel="सार"
                insight={v.simpleMeaning || v.insight}
                essence={v.essence}
                locale="hi"
                mpLocation={`topic_hi_${topic.slug}_featured_${v.chapter}_${v.verse}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Topic-specific cascade hand-off. Curated bridges (like Ahankara →
           BG 2.62-63 काम→क्रोध cascade) that point OUTSIDE the topic's own verse
           list. Rendered as a full-width primary card. ── */}
      {cascade && (
        <a
          href={verseUrl(cascade.chapter, cascade.verse, 'hi')}
          data-mp-location={`topic_hi_${topic.slug}_cascade_${cascade.chapter}_${cascade.verse}`}
          data-mp-event="Topic Cascade Clicked"
          style={{
            display: 'block',
            margin: '4px 0 40px',
            padding: '22px 24px 20px',
            background: 'linear-gradient(160deg, rgba(200,136,30,0.14) 0%, rgba(200,136,30,0.06) 100%)',
            border: '1px solid rgba(200,136,30,0.35)',
            borderLeft: '4px solid var(--gold, #c8881e)',
            borderRadius: '0 12px 12px 0',
            textDecoration: 'none',
          }}
        >
          <div style={{
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--gold, #c8881e)',
            marginBottom: 8,
          }}>
            {cascade.eyebrow}
          </div>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--gold-light, #f5c96a)',
            lineHeight: 1.35,
            marginBottom: 8,
            fontFamily: '"Playfair Display", Georgia, serif',
          }}>
            {cascade.headline}
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--text-dim, rgba(245,232,204,0.65))', lineHeight: 1.6, marginBottom: 10 }}>
            {cascade.sub}
          </div>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--gold-light, #f5c96a)' }}>
            श्लोक {cascade.chapter}.{cascade.verse} पढ़ें →
          </span>
        </a>
      )}

      {rest.length > 0 && (
        <>
          <div className="gv-sechead" style={{ margin: '20px 0 12px' }}>
            <span className="gv-sechead-label">सभी {verses.length} श्लोक</span>
          </div>
          <ul className="gita-verse-list">
            {rest.map((v) => (
              <li key={`${v.chapter}-${v.verse}`}>
                <a
                  href={verseUrl(v.chapter, v.verse, 'hi')}
                  data-mp-location={`topic_hi_${topic.slug}_verse_${v.chapter}_${v.verse}`}
                >
                  <div className="gita-verse-ref">
                    <span className="gita-verse-ref-num">{v.chapter}.{v.verse}</span>
                    <span className="gita-verse-ref-ch">अ. {v.chapter}</span>
                  </div>
                  <div className="gita-verse-body">
                    <p className="gita-verse-essence">
                      {v.essence || v.englishTranslation}
                    </p>
                    <p className="gita-verse-insight">
                      {(v.hindiTranslation || v.englishTranslation).slice(0, 120)}
                    </p>
                    <div className="gita-verse-footer">
                      {v.depth
                        ? <span className={`gita-verse-depth gita-verse-depth--${v.depth}`}>{v.depth}</span>
                        : <span />
                      }
                      <span className="gita-verse-arrow">→</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      <GitaAppCTA variant="chapter" locale="hi" />
    </main>
  )
}

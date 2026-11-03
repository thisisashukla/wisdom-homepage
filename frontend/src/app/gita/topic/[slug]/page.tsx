import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTopics, getTopic, getTopicVerses, topicIntro, topicUrl, verseUrl } from '@/lib/gita'
// GitaAppCTA source preserved at @/components/gita/GitaAppCTA — currently swapped out
// for the Scripture AI waitlist while that product launches.
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import BlogTracker from '@/components/BlogTracker'
import {
  gitaTopicDefinition,
  gitaTopicDescriptionEn,
  gitaTopicTitleEn,
} from '@/content/topics/gita-definitions'

type Params = { slug: string }

export async function generateStaticParams() {
  return getAllTopics().map((t) => ({ slug: t.slug }))
}

/**
 * Alternate spellings / transliterations for topics that have multiple
 * common English renderings. Injected into meta descriptions so Google
 * matches queries with either spelling (e.g. "samatva" AND "samatvam",
 * "nishkama" AND "niskama").
 */
const TOPIC_ALIASES: Record<string, string[]> = {
  samatva: ['samatvam', 'samatva'],
  nishkama: ['nishkam', 'nishkama', 'niskama'],
  indriya: ['indriya', 'indriya nigraha'],
  vairagya: ['vairagya', 'detachment', 'renunciation'],
  ahankara: ['ahankara', 'ahamkara', 'ego'],
  sharanagati: ['sharanagati', 'saranagati', 'surrender'],
  'karma-phala': ['karma phala', 'karmaphala', 'fruit of action'],
  atman: ['atman', 'atma', 'self'],
  jnana: ['jnana', 'jñana', 'knowledge'],
  bhakti: ['bhakti', 'devotion'],
  dharma: ['dharma', 'duty', 'righteousness'],
  moksha: ['moksha', 'mokṣa', 'liberation'],
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const topic = await getTopic(params.slug)
  if (!topic) return { title: 'Topic not found' }
  const aliases = TOPIC_ALIASES[params.slug]
  // Definition-first: the description opens with the one-line definition
  // (src/content/topics/gita-definitions.ts) so SERPs and AI answers lift it.
  const title = gitaTopicTitleEn(topic.slug, topic.label, topic.verseCount)
  const description = gitaTopicDescriptionEn(topic.slug, topic.label, topic.verseCount)
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${topicUrl(topic.slug)}`,
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
      url: `https://wisdomquotes.in${topicUrl(topic.slug)}`,
      type: 'article',
      siteName: 'Wisdom',
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

export default async function TopicPage({ params }: { params: Params }) {
  const topic = await getTopic(params.slug)
  // Retired slugs are 308'd by src/middleware.ts before reaching here.
  if (!topic) notFound()
  const verses = await getTopicVerses(topic.slug, 50)
  const definition = gitaTopicDefinition(topic.slug)
  const pageUrl = `https://wisdomquotes.in${topicUrl(topic.slug)}`

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Bhagavad Gita verses on ${topic.label}`,
    ...(definition ? { description: definition.en } : {}),
    numberOfItems: verses.length,
    itemListElement: verses.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://wisdomquotes.in${verseUrl(v.chapter, v.verse)}`,
      name: `Bhagavad Gita ${v.chapter}.${v.verse}`,
    })),
  }
  // NOTE: dropped the intermediate "Topics" crumb because there's no
  // /gita/topic index page — the previous middle link 404'd.
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bhagavad Gita', item: 'https://wisdomquotes.in/gita' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${topic.label} in the Bhagavad Gita`,
        item: `https://wisdomquotes.in${topicUrl(topic.slug)}`,
      },
    ],
  }

  const cap = topic.label.replace(/\b\w/g, (c) => c.toUpperCase())
  const intro = topicIntro(topic.slug, 'en')

  // Sanskrit concepts get a DefinedTerm so the definition is machine-readable.
  const definedTermLd = definition && definition.kind === 'term'
    ? {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: cap,
        alternateName: Array.from(new Set([definition.hi, ...(TOPIC_ALIASES[topic.slug] ?? [])]))
          .filter((a) => a.toLowerCase() !== topic.label.toLowerCase()),
        description: definition.en,
        url: pageUrl,
        inLanguage: 'en',
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          name: 'Bhagavad Gita concepts',
          url: 'https://wisdomquotes.in/gita',
        },
      }
    : null

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_topic_${topic.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {definedTermLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermLd) }} />
      )}

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location={`topic_${topic.slug}_crumb_gita`}>Bhagavad Gita</a>
        <span className="sep">›</span>
        <span>Topic: {topic.label}</span>
      </nav>

      <div className="lang-switch">
        <span className="lang-switch-label">Also in</span>
        <a
          href={topicUrl(topic.slug, 'hi')}
          data-mp-location={`topic_${topic.slug}_lang_hi`}
        >
          हिन्दी में पढ़ें
        </a>
      </div>

      <div className="gita-eyebrow">Theme · {topic.verseCount} verses</div>
      <h1 className="gita-h1">{cap} in the Bhagavad Gita</h1>
      {definition && (
        <p className="gita-lede" style={{ color: 'var(--text)', marginBottom: 12 }}>
          {definition.en}
        </p>
      )}
      <p className="gita-lede">
        {intro ?? `Verses across the Gita that speak to ${topic.label}, drawn from all chapters and ordered by where they appear.`}
      </p>

      <ul className="gita-verse-list">
        {verses.map((v) => (
          <li key={`${v.chapter}-${v.verse}`}>
            <a
              href={verseUrl(v.chapter, v.verse)}
              data-mp-location={`topic_${topic.slug}_verse_${v.chapter}_${v.verse}`}
            >
              <div className="gita-verse-ref">
                <span className="gita-verse-ref-num">{v.chapter}.{v.verse}</span>
                <span className="gita-verse-ref-ch">Ch. {v.chapter}</span>
              </div>
              <div className="gita-verse-body">
                <p className="gita-verse-essence">
                  {v.essence || v.englishTranslation}
                </p>
                {(v.simpleInsight || v.simpleMeaning) && (
                  <p className="gita-verse-insight">
                    {v.simpleInsight || v.simpleMeaning}
                  </p>
                )}
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

      <VerseFunnelCTA variant="chapter" locale="en" pageName="Gita Topic" />
    </main>
  )
}

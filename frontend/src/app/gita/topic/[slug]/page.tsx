import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTopics, getTopic, getTopicVerses, topicIntro, topicUrl, verseUrl } from '@/lib/gita'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import BlogTracker from '@/components/BlogTracker'

type Params = { slug: string }

export async function generateStaticParams() {
  return getAllTopics().map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const topic = await getTopic(params.slug)
  if (!topic) return { title: 'Topic not found' }
  const cap = topic.label.replace(/\b\w/g, (c) => c.toUpperCase())
  const title = `${cap} in the Bhagavad Gita — ${topic.verseCount} Verses with Meaning | Wisdom`
  const description = `${topic.verseCount} Bhagavad Gita verses on ${topic.label}, in Sanskrit, Hindi and English. The Gita's teaching on ${topic.label}, drawn from across all chapters.`
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${topicUrl(topic.slug)}`,
      languages: {
        'en-IN': `https://wisdomquotes.in${topicUrl(topic.slug, 'en')}`,
        'hi-IN': `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wisdomquotes.in${topicUrl(topic.slug)}`,
      type: 'article',
      siteName: 'Wisdom',
    },
  }
}

export default async function TopicPage({ params }: { params: Params }) {
  const topic = await getTopic(params.slug)
  if (!topic) notFound()
  const verses = await getTopicVerses(topic.slug, 50)

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Bhagavad Gita verses on ${topic.label}`,
    numberOfItems: verses.length,
    itemListElement: verses.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://wisdomquotes.in${verseUrl(v.chapter, v.verse)}`,
      name: `Bhagavad Gita ${v.chapter}.${v.verse}`,
    })),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bhagavad Gita', item: 'https://wisdomquotes.in/gita' },
      { '@type': 'ListItem', position: 2, name: 'Topics', item: 'https://wisdomquotes.in/gita/topic' },
      {
        '@type': 'ListItem',
        position: 3,
        name: topic.label,
        item: `https://wisdomquotes.in${topicUrl(topic.slug)}`,
      },
    ],
  }

  const cap = topic.label.replace(/\b\w/g, (c) => c.toUpperCase())
  const intro = topicIntro(topic.slug, 'en')

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_topic_${topic.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

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

      <GitaAppCTA variant="chapter" locale="en" />
    </main>
  )
}

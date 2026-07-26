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
  if (!topic) return { title: 'विषय नहीं मिला' }
  const cap = topic.label.replace(/\b\w/g, (c) => c.toUpperCase())
  const title = `भगवद् गीता में ${cap} — ${topic.verseCount} श्लोक | Wisdom`
  const description = `भगवद् गीता के ${topic.verseCount} श्लोक जो ${topic.label} पर हैं — संस्कृत, हिन्दी और अंग्रेज़ी अनुवाद सहित।`
  return {
    title,
    description,
    alternates: {
      canonical: `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
      languages: {
        'en-IN': `https://wisdomquotes.in${topicUrl(topic.slug, 'en')}`,
        'hi-IN': `https://wisdomquotes.in${topicUrl(topic.slug, 'hi')}`,
      },
    },
    openGraph: { title, description, type: 'article', siteName: 'Wisdom' },
  }
}

export default async function TopicPageHi({ params }: { params: Params }) {
  const topic = await getTopic(params.slug)
  if (!topic) notFound()
  const verses = await getTopicVerses(topic.slug, 50)
  const cap = topic.label.replace(/\b\w/g, (c) => c.toUpperCase())
  const intro = topicIntro(topic.slug, 'hi')

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_topic_hi_${topic.slug}`} />
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

      <ul className="gita-verse-list">
        {verses.map((v) => (
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

      <GitaAppCTA variant="chapter" locale="hi" />
    </main>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllVerseRefs,
  getVerse,
  getChapter,
  verseUrl,
  chapterUrl,
  topicUrl,
} from '@/lib/gita'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import BlogTracker from '@/components/BlogTracker'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'भगवद् गीता — आज का श्लोक | Wisdom',
  description: 'हर दिन भगवद् गीता का एक श्लोक — संस्कृत, हिन्दी और अंग्रेज़ी में। आपकी रोज़ की लय।',
  alternates: {
    canonical: 'https://wisdomquotes.in/hi/gita/today',
    languages: {
      'en-IN': 'https://wisdomquotes.in/gita/today',
      'hi-IN': 'https://wisdomquotes.in/hi/gita/today',
    },
  },
  openGraph: {
    title: 'भगवद् गीता — आज का श्लोक',
    description: 'हर दिन भगवद् गीता का एक श्लोक।',
    url: 'https://wisdomquotes.in/hi/gita/today',
    siteName: 'Wisdom',
    type: 'article',
  },
}

const todaysVerseRef = () => {
  const refs = getAllVerseRefs()
  if (refs.length === 0) return null
  const utc = new Date()
  const dayOfYear = Math.floor(
    (Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()) - Date.UTC(utc.getUTCFullYear(), 0, 0)) /
      86400000,
  )
  const yearKey = utc.getUTCFullYear() * 1000
  return refs[(yearKey + dayOfYear) % refs.length]
}

export default async function TodayPageHi() {
  const ref = todaysVerseRef()
  if (!ref) notFound()
  const verse = await getVerse(ref.chapter, ref.verse)
  if (!verse) notFound()
  const ch = getChapter(ref.chapter)

  const longDate = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <main className="gita-main">
      <BlogTracker pageName="gita_today_hi" />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/hi/gita" data-mp-location="today_crumb_gita">भगवद् गीता</a>
        <span className="sep">›</span>
        <span>आज का श्लोक</span>
      </nav>

      <div className="gita-eyebrow">आज का श्लोक · {longDate}</div>
      <h1 className="gita-h1">भगवद् गीता {verse.chapter}.{verse.verse}</h1>
      {verse.essence && (
        <p className="gita-lede" style={{ fontStyle: 'italic', color: 'var(--gold-pale)', maxWidth: 640 }}>
          “{verse.essence}”
        </p>
      )}

      <article className="gita-verse-card">
        <div className="gita-sanskrit" lang="sa">{verse.sanskrit}</div>
        <div className="gita-translation">
          <div className="gita-translation-label">हिन्दी अनुवाद</div>
          <div className="gita-translation-text gita-translation-text--hi" lang="hi">{verse.hindiTranslation}</div>
        </div>
        <div className="gita-translation">
          <div className="gita-translation-label">English</div>
          <div className="gita-translation-text" lang="en">{verse.englishTranslation}</div>
        </div>

        {verse.tags.length > 0 && (
          <div className="gita-meta-row">
            <span>विषय:</span>
            {verse.tags.map((t) => (
              <a key={t} href={topicUrl(t, 'hi')} className="gita-tag" data-mp-location="today_tag">{t}</a>
            ))}
          </div>
        )}

        <div className="gita-meta-row" style={{ borderTop: 'none', paddingTop: 0 }}>
          <a href={verseUrl(verse.chapter, verse.verse, 'hi')} className="gita-tag" data-mp-location="today_full_verse">
            यह श्लोक पढ़ें →
          </a>
          {ch && (
            <a href={chapterUrl(ch.number, 'hi')} className="gita-tag" data-mp-location="today_chapter">
              {ch.hiName} →
            </a>
          )}
        </div>
      </article>

      <GitaAppCTA variant="verse" locale="hi" verse={verse} />
    </main>
  )
}

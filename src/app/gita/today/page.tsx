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
import SanskritText from '@/components/gita/SanskritText'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import { getVerseAudio } from '@/lib/gita'

// Re-render once an hour so the day rolls over cleanly without manual rebuilds.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Hindu Verse of the Day — Bhagavad Gita | Wisdom',
  description:
    'A new verse from the Bhagavad Gita every day. Sanskrit original, Hindi and English meaning, and the essence in a single line. Your daily Hindu practice.',
  alternates: {
    canonical: 'https://wisdomquotes.in/gita/today',
    languages: {
      'en-IN': 'https://wisdomquotes.in/gita/today',
      'hi-IN': 'https://wisdomquotes.in/hi/gita/today',
    },
  },
  openGraph: {
    title: 'Bhagavad Gita — Verse of the Day',
    description: 'A new verse from the Bhagavad Gita each day.',
    url: 'https://wisdomquotes.in/gita/today',
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

export default async function TodayPage() {
  const ref = todaysVerseRef()
  if (!ref) notFound()
  const verse = await getVerse(ref.chapter, ref.verse)
  const audio = verse ? getVerseAudio(ref.chapter, ref.verse) : null
  if (!verse) notFound()
  const ch = getChapter(ref.chapter)

  const longDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <main className="gita-main">
      <BlogTracker pageName="gita_today" />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location="today_crumb_gita">Bhagavad Gita</a>
        <span className="sep">›</span>
        <span>Verse of the day</span>
      </nav>

      <div className="gita-eyebrow">Verse of the day · {longDate}</div>
      <h1 className="gita-h1">Bhagavad Gita {verse.chapter}.{verse.verse}</h1>
      {verse.essence && (
        <p className="gita-lede" style={{ fontStyle: 'italic', color: 'var(--gold-pale)', maxWidth: 640 }}>
          “{verse.essence}”
        </p>
      )}

      <article className="gita-verse-card">
        {audio ? (
          <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={ref.chapter} verse={ref.verse} />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}

        <div className="gita-translation">
          <div className="gita-translation-label">Hindi · हिन्दी</div>
          <div className="gita-translation-text gita-translation-text--hi" lang="hi">{verse.hindiTranslation}</div>
        </div>
        <div className="gita-translation">
          <div className="gita-translation-label">English</div>
          <div className="gita-translation-text" lang="en">{verse.englishTranslation}</div>
        </div>

        {verse.tags.length > 0 && (
          <div className="gita-meta-row">
            <span>Themes:</span>
            {verse.tags.map((t) => (
              <a key={t} href={topicUrl(t)} className="gita-tag" data-mp-location="today_tag">{t}</a>
            ))}
          </div>
        )}

        <div className="gita-meta-row" style={{ borderTop: 'none', paddingTop: 0 }}>
          <a href={verseUrl(verse.chapter, verse.verse)} className="gita-tag" data-mp-location="today_full_verse">
            Read this verse →
          </a>
          {ch && (
            <a href={chapterUrl(ch.number)} className="gita-tag" data-mp-location="today_chapter">
              {ch.enName} →
            </a>
          )}
        </div>
      </article>

      <GitaAppCTA variant="verse" locale="en" verse={verse} />
    </main>
  )
}

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
import DailyVerseEmail from '@/components/gita/DailyVerseEmail'
import SanskritText from '@/components/gita/SanskritText'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import { getVerseAudio } from '@/lib/gita'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'भगवद् गीता — आज का श्लोक (Aaj Ka Shlok) | Wisdom',
  description: 'हर दिन भगवद् गीता का एक श्लोक — संस्कृत, हिन्दी और अंग्रेज़ी में। आज इस श्लोक की कहानी और आपके जीवन से जुड़ाव। आपकी रोज़ की आध्यात्मिक लय।',
  alternates: {
    canonical: 'https://wisdomquotes.in/hi/gita/today',
    languages: {
      'en': 'https://wisdomquotes.in/gita/today',
      'en-IN': 'https://wisdomquotes.in/gita/today',
      'hi': 'https://wisdomquotes.in/hi/gita/today',
      'hi-IN': 'https://wisdomquotes.in/hi/gita/today',
      'x-default': 'https://wisdomquotes.in/gita/today',
    },
  },
  openGraph: {
    title: 'भगवद् गीता — आज का श्लोक',
    description: 'हर दिन भगवद् गीता का एक श्लोक — संदर्भ और अर्थ सहित।',
    url: 'https://wisdomquotes.in/hi/gita/today',
    siteName: 'Wisdom',
    type: 'article',
    locale: 'hi_IN',
    alternateLocale: ['en_IN'],
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'भगवद् गीता — आज का श्लोक',
    description: 'हर दिन भगवद् गीता का एक श्लोक।',
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  keywords: 'aaj ka shlok, आज का श्लोक, hindu verse of the day, गीता का आज का श्लोक, daily gita shlok hindi',
}

// ── Types ─────────────────────────────────────────────────────────────────────

type VerseOfDayContext = {
  chapter: number
  verse: number
  day_of_week: string
  deity: string
  day_name_hi: string
  date_context: string
  why_chosen: string
  story: string
  themes: string[]
}

// ── Fallback ──────────────────────────────────────────────────────────────────

const deterministicVerseRef = () => {
  const refs = getAllVerseRefs()
  if (refs.length === 0) return null
  const utc = new Date()
  const dayOfYear = Math.floor(
    (Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()) -
      Date.UTC(utc.getUTCFullYear(), 0, 0)) /
      86400000,
  )
  const yearKey = utc.getUTCFullYear() * 1000
  return refs[(yearKey + dayOfYear) % refs.length]
}

// ── Fetch from backend API ────────────────────────────────────────────────────

async function fetchVerseOfDay(): Promise<VerseOfDayContext | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL
  if (!backendUrl) return null

  try {
    const res = await fetch(`${backendUrl}/api/v1/verse-of-day`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`[hi/today] verse-of-day API returned ${res.status}`)
      return null
    }
    return await res.json() as VerseOfDayContext
  } catch (err) {
    console.warn('[hi/today] verse-of-day API unreachable:', err)
    return null
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function TodayPageHi() {
  const context = await fetchVerseOfDay()

  let chapter: number
  let verseNum: number

  if (context) {
    chapter  = context.chapter
    verseNum = context.verse
  } else {
    const ref = deterministicVerseRef()
    if (!ref) notFound()
    chapter  = ref.chapter
    verseNum = ref.verse
  }

  const verse = await getVerse(chapter, verseNum)
  const audio = verse ? getVerseAudio(chapter, verseNum) : null
  if (!verse) notFound()
  const ch = getChapter(chapter)

  const longDate = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  const isoDate = new Date().toISOString()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: verse.sanskrit,
    inLanguage: 'sa',
    spokenByCharacter: verse.speaker
      ? { '@type': 'Person', name: verse.speaker }
      : undefined,
    creator: { '@type': 'Person', name: 'Vyasa', alternateName: 'व्यास' },
    isPartOf: {
      '@type': 'Chapter',
      name: ch?.hiName ?? `भगवद् गीता अध्याय ${chapter}`,
      position: chapter,
      isPartOf: { '@type': 'Book', name: 'भगवद् गीता', url: 'https://wisdomquotes.in/hi/gita' },
    },
    datePublished: isoDate,
  }
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `भगवद् गीता ${verse.chapter}.${verse.verse} — आज का श्लोक`,
    url: 'https://wisdomquotes.in/hi/gita/today',
    inLanguage: 'hi',
    lastReviewed: isoDate,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'भगवद् गीता', item: 'https://wisdomquotes.in/hi/gita' },
        { '@type': 'ListItem', position: 2, name: 'आज का श्लोक', item: 'https://wisdomquotes.in/hi/gita/today' },
      ],
    },
  }

  return (
    <main className="gita-main">
      <BlogTracker pageName="gita_today_hi" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/hi/gita" data-mp-location="today_crumb_gita">भगवद् गीता</a>
        <span className="sep">›</span>
        <span>आज का श्लोक</span>
      </nav>

      {/* ── Date header ── */}
      <div className="gita-eyebrow">
        आज का श्लोक · {longDate}
        {context && (
          <span style={{ opacity: 0.7 }}> · {context.day_name_hi}</span>
        )}
      </div>
      <h1 className="gita-h1">भगवद् गीता {verse.chapter}.{verse.verse}</h1>
      {verse.essence && (
        <p className="gita-lede" style={{ fontStyle: 'italic', color: 'var(--gold-pale)', maxWidth: 640 }}>
          "{verse.essence}"
        </p>
      )}

      {/* ── Why today ── */}
      {context && (
        <div
          className="gita-verse-card"
          style={{
            background: 'var(--surface-2, rgba(255,255,255,0.04))',
            borderLeft: '3px solid var(--gold-pale, #c9a84c)',
            paddingLeft: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            className="gita-translation-label"
            style={{ marginBottom: '0.5rem', letterSpacing: '0.08em', fontSize: '0.72rem' }}
          >
            आज यह श्लोक क्यों
          </div>
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: '0.97rem' }}>
            {context.date_context}
          </p>
          <p style={{ margin: '0.75rem 0 0', lineHeight: 1.7, fontSize: '0.97rem' }}>
            {context.why_chosen}
          </p>
        </div>
      )}

      {/* ── Verse card ── */}
      <article className="gita-verse-card">
        {audio ? (
          <VerseAudioPlayer
            audioSrc={audio.audio}
            timestamps={audio.timestamps}
            text={verse.sanskrit}
            chapter={chapter}
            verse={verseNum}
          />
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
        </div>

        {verse.tags.length > 0 && (
          <div className="gita-meta-row">
            <span>विषय:</span>
            {verse.tags.map((t) => (
              <a key={t} href={topicUrl(t, 'hi')} className="gita-tag" data-mp-location="today_tag">
                {t}
              </a>
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

      {/* ── Email capture — daily verse retention hook ── */}
      <DailyVerseEmail page="gita_today_hi" locale="hi" />

      {/* ── The backstory ── */}
      {context && (
        <div
          className="gita-verse-card"
          style={{
            background: 'var(--surface-2, rgba(255,255,255,0.04))',
            marginTop: '1.5rem',
          }}
        >
          <div
            className="gita-translation-label"
            style={{ marginBottom: '0.5rem', letterSpacing: '0.08em', fontSize: '0.72rem' }}
          >
            कुरुक्षेत्र का वह क्षण
          </div>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: '0.97rem' }}>
            {context.story}
          </p>
        </div>
      )}

      <GitaAppCTA variant="verse" locale="hi" verse={verse} />
    </main>
  )
}

import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import {
  getAllChapters,
  getChapter,
  getVerse,
  getVerseNeighbors,
  getRelatedVerses,
  getTopicBridgesForVerse,
  getVerseAudio,
  verseUrl,
  verseAudioUrl,
  chapterUrl,
  hasTopic,
  topicUrl,
  findTopicForConcept,
  topicLabel,
  splitSpeaker,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import { verseRoman, fitDescription, withExtras, capFirst } from '@/lib/verseText'
import ReadingTracker from '@/components/reader/ReadingTracker'
import TrailBar from '@/components/reader/TrailBar'
import StoryJumps from '@/components/reader/StoryJumps'
import VerseListen from '@/components/listen/VerseListen'
import { listenSessionForVerse } from '@/lib/listenServer'
import { VERSE_TRANSLATION_ID } from '@/components/reader/ids'
import VerseShareBar from '@/components/gita/VerseShareBar'
import { getBlogLinksForVerse } from '@/lib/blogVerseLinks'
import BlogTracker from '@/components/BlogTracker'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import SanskritText from '@/components/gita/SanskritText'
import { plansForVerse } from '@/lib/themePlans'
import VerseRomanLines from '@/components/gita/verse/VerseRomanLines'
import VerseWordByWord from '@/components/gita/verse/VerseWordByWord'
import VerseExplain from '@/components/gita/verse/VerseExplain'
import VerseBridge from '@/components/gita/verse/VerseBridge'
import VerseNextCard from '@/components/gita/verse/VerseNextCard'
import VerseEssays from '@/components/gita/verse/VerseEssays'
import VerseRelated, { type ThemeLink } from '@/components/gita/verse/VerseRelated'
import VerseStickyNav from '@/components/gita/verse/VerseStickyNav'

type Params = { chapter: string; verse: string }

/** Content of the verse pages changed on this date (layout, transliteration, schema). */
const DATE_MODIFIED = '2026-11-15'

export async function generateStaticParams() {
  const out: Params[] = []
  for (const ch of getAllChapters()) {
    for (const v of ch.verses) {
      out.push({ chapter: String(ch.number), verse: String(v) })
    }
  }
  return out
}

/** Leading words of `plain` that fit in `max` characters, title-cased ("Dharmakshetre Kurukshetre"). */
const titleWords = (plain: string, max: number): string => {
  let out = ''
  for (const w of plain.split(' ')) {
    const next = out ? `${out} ${w}` : w
    if (next.length > max) break
    out = next
  }
  // Don't end on a particle ("Karmanyevadhikaraste Ma"): drop trailing words of 1 to 2 letters.
  const words = out.split(' ').filter(Boolean)
  while (words.length > 1 && words[words.length - 1].length <= 2) words.pop()
  return words.map(capFirst).join(' ')
}

/** Parse "कर्मणि (in action) / एव (only)" into words with glosses. */
const parseLiteral = (literal?: string) =>
  (literal || '')
    .split(' / ')
    .map((token) => {
      const m = token.match(/^(.+?)\s+\((.+?)\)$/)
      return m ? { sa: m[1].trim(), gloss: m[2].trim() } : null
    })
    .filter((x): x is { sa: string; gloss: string } => x !== null)

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = Number(params.chapter)
  const v = Number(params.verse)
  const verse = await getVerse(c, v)
  if (!verse) return { title: 'Verse not found' }
  const ch = getChapter(c)
  const roman = verseRoman(verse.sanskrit)

  // ── Title: both reference forms searchers use (Bhagavad Gita c.v, BG c.v) plus the verse's
  //    opening words in Roman, which is how famous verses are searched ("karmanye vadhikaraste
  //    meaning"). No "Hindi": /hi/gita/... is the Hindi page. ──
  const words = titleWords(roman.plainFirst, 26)
  const title = words
    ? `Bhagavad Gita ${c}.${v} (BG ${c}.${v}): ${words} Meaning`
    : `Bhagavad Gita ${c}.${v} (BG ${c}.${v}): Meaning and Commentary`

  // ── Description: the opening line in Roman, then the meaning in whole sentences. ──
  const open = roman.plainFirst ? `${capFirst(roman.plainFirst)}. ` : ''
  const lead = fitDescription([verse.simpleMeaning, verse.englishTranslation, verse.essence], 155 - open.length)
  const description = withExtras(`${open}${lead}`, ['With Sanskrit, IAST and word meanings.'], 158)

  const ogImage = `https://wisdomquotes.in/api/og/gita/${c}/${v}`
  const shareTitle = `Bhagavad Gita ${c}.${v}${roman.plainFirst ? `: ${capFirst(roman.plainFirst)}` : ''}`
  return {
    title,
    description,
    keywords: [
      `bhagavad gita ${c}.${v}`,
      `bg ${c}.${v}`,
      `gita ${c}.${v}`,
      `${c}.${v}`,
      `bhagavad gita chapter ${c} verse ${v}`,
      roman.plainFirst,
      ch ? `${ch.enName.toLowerCase()}` : '',
    ].filter(Boolean).join(', '),
    alternates: {
      canonical: `https://wisdomquotes.in${verseUrl(c, v)}`,
      languages: {
        'en': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
        'en-IN': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
        'hi': `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
        'hi-IN': `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
        'x-default': `https://wisdomquotes.in${verseUrl(c, v, 'en')}`,
      },
    },
    openGraph: {
      title: shareTitle,
      description: verse.englishTranslation,
      url: `https://wisdomquotes.in${verseUrl(c, v)}`,
      type: 'article',
      siteName: 'Wisdom',
      locale: 'en_IN',
      alternateLocale: ['hi_IN'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Bhagavad Gita ${c}.${v}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: verse.englishTranslation,
      images: [ogImage],
    },
  }
}

export default async function VersePage({ params }: { params: Params }) {
  const c = Number(params.chapter)
  const v = Number(params.verse)
  const verse = await getVerse(c, v)
  if (!verse) notFound()
  const ch = getChapter(c)
  const { prev, next } = getVerseNeighbors(c, v)
  const related = getRelatedVerses(c, v, verse.tags) as IndexEntry[]
  const topicBridges = getTopicBridgesForVerse(verse.tags)
  const audio = getVerseAudio(c, v)
  const blogLinks = getBlogLinksForVerse(c, v)
  const firstPlan = plansForVerse(c, v)[0]
  const roman = verseRoman(verse.sanskrit)
  const words = parseLiteral(verse.translationLiteral)
  const ref = `${c}.${v}`
  const verseName = `Bhagavad Gita ${ref}`

  // One row of theme links: the verse's topics, then the concepts it builds on, then bridges.
  const themes: ThemeLink[] = []
  const seen = new Set<string>()
  const addTheme = (slug: string, label: string, count?: number) => {
    if (seen.has(slug) || themes.length >= 6) return
    seen.add(slug)
    themes.push({ slug, href: topicUrl(slug), label, count })
  }
  verse.tags.filter(hasTopic).forEach((t) => addTheme(t, topicLabel(t)))
  ;(verse.requisiteConcepts ?? []).forEach((name) => {
    const topic = findTopicForConcept(name)
    if (topic) addTheme(topic.slug, name, topic.verseCount)
  })
  topicBridges.forEach((t) => addTheme(t.slug, t.label, t.verseCount))

  // ── Structured data ─────────────────────────────────────────────────────────

  // Identify speaker as a named Person for entity search: connects verses to Krishna/Arjuna nodes.
  const speakerPerson = verse.speaker
    ? {
        '@type': 'Person',
        name: verse.speaker,
        ...(verse.speaker.toLowerCase().includes('krishna') && {
          alternateName: ['Sri Krishna', 'श्रीकृष्ण', 'Bhagavan'],
        }),
        ...(verse.speaker.toLowerCase().includes('arjuna') && {
          alternateName: ['अर्जुन', 'Partha'],
        }),
      }
    : undefined

  const chapterLd = {
    '@type': 'Chapter',
    name: ch ? `${ch.enName}: ${ch.enTitle}` : `Chapter ${c}`,
    position: c,
    isPartOf: { '@type': 'Book', name: 'Bhagavad Gita', url: 'https://wisdomquotes.in/gita' },
  }

  const quotationLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: verse.englishTranslation,
    // The original shloka (speaker line split off), with its IAST transliteration.
    isBasedOn: {
      '@type': 'Quotation',
      text: splitSpeaker(verse.sanskrit).text,
      inLanguage: 'sa',
      ...(roman.lines.length && { alternateName: roman.lines.map((l) => l.iast).join(' / ') }),
    },
    creator: speakerPerson,
    spokenByCharacter: speakerPerson,
    about: verse.tags,
    isPartOf: chapterLd,
    inLanguage: ['sa', 'en'],
    url: `https://wisdomquotes.in${verseUrl(c, v)}`,
  }

  const articleLd = (verse.simpleMeaning || verse.detailedMeaning) ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${verseName}${roman.plainFirst ? `: ${capFirst(roman.plainFirst)}` : ''}`,
    description: verse.simpleMeaning || verse.detailedMeaning,
    articleBody: [
      verse.simpleMeaning,
      verse.detailedMeaning,
      verse.modernRelevance,
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
    mainEntityOfPage: `https://wisdomquotes.in${verseUrl(c, v)}`,
    image: [`https://wisdomquotes.in/api/og/gita/${c}/${v}`],
    about: verse.tags.map((t) => ({ '@type': 'Thing', name: t })),
    mentions: [
      { '@type': 'Book', name: 'Bhagavad Gita', url: 'https://wisdomquotes.in/gita' },
      ...(speakerPerson ? [speakerPerson] : []),
    ],
    isPartOf: chapterLd,
    inLanguage: 'en',
    datePublished: '2026-06-12',
    dateModified: DATE_MODIFIED,
  } : null

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bhagavad Gita', item: 'https://wisdomquotes.in/gita' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Chapter ${c}${ch ? `: ${ch.enName}` : ''}`,
        item: `https://wisdomquotes.in${chapterUrl(c)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Verse ${v}`,
        item: `https://wisdomquotes.in${verseUrl(c, v)}`,
      },
    ],
  }

  // ── Audio schema (only when we have the recitation for this verse). The manifest path is
  //    relative to the audio CDN, so resolve it the same way the player does. ──
  const audioLd = audio ? {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    name: `${verseName}: Sanskrit recitation`,
    description: `Sanskrit chanting of Bhagavad Gita verse ${ref}${ch ? ` from ${ch.enName}` : ''}.`,
    contentUrl: verseAudioUrl(audio.audio),
    encodingFormat: 'audio/mpeg',
    inLanguage: 'sa',
    isPartOf: { '@type': 'Book', name: 'Bhagavad Gita', url: 'https://wisdomquotes.in/gita' },
  } : null

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_verse_${c}_${v}`} />
      <ReadingTracker chapter={c} verse={v} lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {articleLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      )}
      {audioLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(audioLd) }} />
      )}

      <nav className="gita-crumb gv-rise" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location={`verse_${c}_${v}_crumb_gita`}>Bhagavad Gita</a>
        <span className="sep">›</span>
        <a href={chapterUrl(c)} data-mp-location={`verse_${c}_${v}_crumb_chapter`}>Chapter {c}{ch ? `: ${ch.enName}` : ''}</a>
        <span className="sep">›</span>
        <span>Verse {v}</span>
      </nav>

      <TrailBar chapter={c} verse={v} lang="en" next={next ? { chapter: next.chapter, verse: next.verse } : null} />

      <header className="gv-hero-head">
        <h1 className="gita-h1 gv-hero-h1 gv-rise" style={{ '--d': '0.06s' } as CSSProperties}>{verseName}</h1>
        <p className="vp-meta gv-rise" style={{ '--d': '0.1s' } as CSSProperties}>
          {verse.speaker ? `${verse.speaker} · ` : ''}Chapter {c}, verse {v}{ch?.totalVerses ? ` of ${ch.totalVerses}` : ''}
        </p>
      </header>

      <article className="gita-verse-card gv-hero-card gv-rise" style={{ '--d': '0.16s' } as CSSProperties}>
        <div className="gv-diamonds" aria-hidden="true"><i /><i /><i /></div>
        {audio ? (
          <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={c} verse={v} next={next ? { chapter: next.chapter, verse: next.verse } : null} />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}
        <VerseRomanLines roman={roman} />
        <VerseListen chapter={c} verse={v} lang="en" session={listenSessionForVerse(c, v, 'en')} />

        <p className="gv-en-quote" lang="en" id={VERSE_TRANSLATION_ID}>{verse.englishTranslation}</p>
        {verse.speaker && <div className="gv-en-speaker">{verse.speaker}</div>}

        <a className="vp-langlink" href={verseUrl(c, v, 'hi')} hrefLang="hi" lang="hi" data-mp-location={`verse_${c}_${v}_to_hindi`}>
          हिन्दी में पढ़ें
        </a>
      </article>

      <StoryJumps chapter={c} verse={v} lang="en" />

      <VerseExplain
        section={`verse_${c}_${v}_explain`}
        label="Meaning and context"
        blocks={[
          { id: 'meaning', q: `What does ${verseName} mean?`, text: verse.simpleMeaning || '', lang: 'en' },
          { id: 'scene', kicker: 'The scene', q: verse.speaker ? `Why does ${verse.speaker} say this?` : 'What is happening here?', text: verse.detailedMeaning || '', lang: 'en' },
          { id: 'life', kicker: 'In your life', q: 'What does it mean for your life today?', text: verse.modernRelevance || '', lang: 'en' },
        ]}
        credit={<>Translation edited by Ankur Shukla. Commentary drafted with AI and reviewed by a person. <a href="/methodology">How we work</a></>}
      />

      <VerseWordByWord
        words={words}
        locale="en"
        glossLang="en"
        plain={roman.plainAll}
        section={`verse_${c}_${v}_wbw`}
      />

      <div className="vp-share">
        <VerseShareBar
          chapter={c}
          verse={v}
          lang="en"
          size="compact"
          line={verse.quoteVariants?.find((q) => q.format === 'card')?.text || verse.essence || verse.englishTranslation}
        />
      </div>

      <VerseBridge
        chapter={c}
        verse={v}
        lang="en"
        plan={firstPlan ? { slug: firstPlan.plan.slug, label: firstPlan.plan.label, day: firstPlan.day.day } : null}
      />

      <VerseNextCard
        chapter={c}
        verse={v}
        lang="en"
        chapterName={ch?.enName}
        next={next ? { chapter: next.chapter, verse: next.verse, teaser: next.essence || next.snippet } : null}
      />

      <VerseEssays chapter={c} verse={v} lang="en" links={blogLinks} />

      <VerseRelated
        chapter={c}
        verse={v}
        lang="en"
        verses={related.map((r) => ({ chapter: r.chapter, verse: r.verse, teaser: r.essence || r.snippet }))}
        themes={themes}
        exclude={next ? { chapter: next.chapter, verse: next.verse } : null}
      />

      <VerseStickyNav
        lang="en"
        current={{ chapter: c, verse: v }}
        prev={prev ? { chapter: prev.chapter, verse: prev.verse, teaser: prev.essence || prev.snippet } : null}
        next={next ? { chapter: next.chapter, verse: next.verse, teaser: next.essence || next.snippet } : null}
      />
    </main>
  )
}

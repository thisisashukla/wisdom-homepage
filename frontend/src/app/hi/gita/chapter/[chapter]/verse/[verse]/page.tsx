import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
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
  verseAudioUrl,
  chapterUrl,
  hasTopic,
  topicUrl,
  findTopicForConcept,
  getHindiCommentary,
  hindiTagName,
  jointGroup,
  jointRefsHi,
  speakerHi,
  splitSpeaker,
  hasHindiTranslation,
} from '@/lib/gita'
import type { IndexEntry } from '@/lib/gita'
import { verseRoman, fitDescription, withExtras } from '@/lib/verseText'
import ReadingTracker from '@/components/reader/ReadingTracker'
import TrailBar from '@/components/reader/TrailBar'
import StoryJumps from '@/components/reader/StoryJumps'
import { VERSE_TRANSLATION_ID } from '@/components/reader/ids'
import VerseShareBar from '@/components/gita/VerseShareBar'
import { getBlogLinksForVerse } from '@/lib/blogVerseLinks'
import BlogTracker from '@/components/BlogTracker'
import SanskritText from '@/components/gita/SanskritText'
import VerseRomanLines from '@/components/gita/verse/VerseRomanLines'
import VerseWordByWord from '@/components/gita/verse/VerseWordByWord'
import VerseExplain, { type ExplainBlock } from '@/components/gita/verse/VerseExplain'
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

/** Leading whole words of `text` that fit in `max` characters (no ellipsis). */
const leadWords = (text: string, max: number): string => {
  let out = ''
  for (const w of text.replace(/\s+/g, ' ').trim().split(' ')) {
    const next = out ? `${out} ${w}` : w
    if (next.length > max) break
    out = next
  }
  // Don't end on a particle ("कर्मण्येवाधिकारस्ते मा"): drop trailing words of 1 to 2 characters.
  const words = out.split(' ').filter(Boolean)
  while (words.length > 1 && words[words.length - 1].length <= 2) words.pop()
  return words.join(' ')
}

/** Parse "कर्मणि (in action) / एव (only)" into words with English glosses. */
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
  if (!verse) return { title: 'श्लोक नहीं मिला' }
  const ch = getChapter(c)
  const hc = await getHindiCommentary(c, v)

  // ── Title: the Devanagari reference, "in Hindi" in Latin script (searchers type
  //    "bg 1.1 hindi"), the shloka's opening words as a fingerprint, then "अर्थ सहित".
  //    Whole words only, so it never ends in "…". ──
  const prefix = `गीता ${c}.${v} (BG ${c}.${v} in Hindi): `
  const suffix = ' अर्थ सहित'
  const open = leadWords(splitSpeaker(verse.sanskrit).text.split(/[।॥|]/)[0] ?? '', 66 - prefix.length - suffix.length)
  const title = open ? `${prefix}${open}${suffix}` : `भगवद् गीता ${c}.${v} (BG ${c}.${v} in Hindi): श्लोक का हिंदी अर्थ`

  // ── Description: always Hindi, whole sentences. A few corpus rows have a stub Hindi
  //    translation (18.2 is just "॥"), so fall back to the commentary, then the Sanskrit. ──
  const descPrefix = `गीता ${c}.${v} का अर्थ: `
  const lead = fitDescription(
    [hc?.bhavarth, hasHindiTranslation(verse) ? verse.hindiTranslation : '', hc?.saar, splitSpeaker(verse.sanskrit).text],
    140 - descPrefix.length,
  )
  // The corpus ends some Hindi translations with the verse mark "॥": end the sentence with "।" instead.
  const description = withExtras(`${descPrefix}${lead.replace(/\s*[।॥]+\s*$/, '।')}`, ['संस्कृत, हिंदी अर्थ व व्याख्या।'], 150)
  const ogImage = `https://wisdomquotes.in/api/og/gita/${c}/${v}`
  const shareTitle = `भगवद् गीता ${c}.${v}${hc?.saar ? `: ${hc.saar}` : open ? `: ${open}` : ''}`
  return {
    title,
    description,
    keywords: [
      `भगवद् गीता ${c}.${v}`,
      `गीता ${c}.${v}`,
      `bg ${c}.${v} in hindi`,
      `bhagavad gita ${c}.${v} in hindi`,
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
      title: shareTitle,
      description: verse.hindiTranslation,
      url: `https://wisdomquotes.in${verseUrl(c, v, 'hi')}`,
      type: 'article',
      siteName: 'Wisdom',
      locale: 'hi_IN',
      alternateLocale: ['en_IN'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: `भगवद् गीता ${c}.${v}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
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
  const hc = await getHindiCommentary(c, v)
  const joint = await jointGroup(c, v)
  const speakerName = speakerHi(verse.speaker)
  const roman = verseRoman(verse.sanskrit)
  const ref = `${c}.${v}`
  const verseName = `भगवद् गीता ${ref}`

  // Word by word: the Hindi shabdarth where it exists, otherwise the English gloss.
  const wbwHindi = (hc?.shabdarth ?? []).map((w) => ({ sa: w.w, gloss: w.m }))
  const words = wbwHindi.length ? wbwHindi : parseLiteral(verse.translationLiteral)

  // The explanation: Hindi commentary (chapters 1, 2, 3, 6), else the English commentary with
  // Hindi questions. Only the meaning shows open; Hindi readers rarely scroll past it.
  const sceneQ = speakerName ? `${speakerName} यह क्यों कहते हैं?` : 'यहाँ क्या हो रहा है?'
  const blocks: ExplainBlock[] = hc
    ? [
        { id: 'meaning', q: `${verseName} का अर्थ क्या है?`, text: hc.bhavarth, lang: 'hi' },
        { id: 'scene', kicker: 'संदर्भ', q: sceneQ, text: hc.sandarbh, lang: 'hi' },
        { id: 'life', kicker: 'आपके जीवन में', q: 'आज के जीवन में इसका क्या अर्थ है?', text: hc.aaj, lang: 'hi' },
      ]
    : [
        { id: 'meaning', kicker: 'अंग्रेज़ी में', q: `${verseName} का अर्थ क्या है?`, text: verse.simpleMeaning || '', lang: 'en' },
        { id: 'scene', kicker: 'संदर्भ · अंग्रेज़ी में', q: sceneQ, text: verse.detailedMeaning || '', lang: 'en' },
        { id: 'life', kicker: 'आपके जीवन में · अंग्रेज़ी में', q: 'आज के जीवन में इसका क्या अर्थ है?', text: verse.modernRelevance || '', lang: 'en' },
      ]

  const themes: ThemeLink[] = []
  const seen = new Set<string>()
  const addTheme = (slug: string, count?: number) => {
    if (seen.has(slug) || themes.length >= 6) return
    seen.add(slug)
    themes.push({ slug, href: topicUrl(slug, 'hi'), label: hindiTagName(slug), count })
  }
  verse.tags.filter(hasTopic).forEach((t) => addTheme(t))
  ;(verse.requisiteConcepts ?? []).forEach((name) => {
    const topic = findTopicForConcept(name)
    if (topic) addTheme(topic.slug, topic.verseCount)
  })
  topicBridges.forEach((t) => addTheme(t.slug, t.verseCount))

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

  const chapterLd = {
    '@type': 'Chapter',
    name: ch ? ch.hiName : `अध्याय ${c}`,
    position: c,
    isPartOf: { '@type': 'Book', name: 'भगवद् गीता', url: 'https://wisdomquotes.in/hi/gita' },
  }

  const quotationLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: verse.hindiTranslation || verse.englishTranslation,
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
    inLanguage: ['sa', 'hi'],
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

  const articleText = hc ? [hc.bhavarth, hc.sandarbh, hc.aaj] : [verse.simpleMeaning, verse.detailedMeaning, verse.modernRelevance]
  const articleLd = articleText.some(Boolean) ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${verseName}: ${hc?.saar || 'अर्थ और व्याख्या'}`,
    description: hc?.bhavarth || verse.simpleMeaning || verse.detailedMeaning,
    articleBody: articleText.filter(Boolean).join('\n\n'),
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
    isPartOf: chapterLd,
    inLanguage: hc ? 'hi' : 'en',
    datePublished: '2026-06-12',
    dateModified: DATE_MODIFIED,
  } : null

  const audioLd = audio ? {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    name: `${verseName}: संस्कृत पाठ`,
    description: `भगवद् गीता के श्लोक ${ref}${ch ? ` (${ch.hiName})` : ''} का संस्कृत पाठ।`,
    contentUrl: verseAudioUrl(audio.audio),
    encodingFormat: 'audio/mpeg',
    inLanguage: 'sa',
    isPartOf: { '@type': 'Book', name: 'भगवद् गीता', url: 'https://wisdomquotes.in/hi/gita' },
  } : null

  const credit = hc && !hc.reviewed
    ? 'Wisdom अनुवाद, संपादन: अंकुर शुक्ला। यह हिंदी टिप्पणी पारंपरिक भाष्यों के आधार पर AI की मदद से तैयार की गई है, और इसकी समीक्षा अभी बाकी है।'
    : 'Wisdom अनुवाद, संपादन: अंकुर शुक्ला। टिप्पणी AI से तैयार, फिर व्यक्ति द्वारा जाँची गई।'

  return (
    <main className="gita-main">
      <BlogTracker pageName={`gita_verse_hi_${c}_${v}`} />
      <ReadingTracker chapter={c} verse={v} lang="hi" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {articleLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      )}
      {audioLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(audioLd) }} />
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

      <TrailBar chapter={c} verse={v} lang="hi" next={next ? { chapter: next.chapter, verse: next.verse } : null} />

      <header className="gv-hero-head">
        <h1 className="gita-h1 gv-hero-h1 gv-rise" style={{ '--d': '0.06s' } as CSSProperties}>{verseName}</h1>
        <p className="vp-meta gv-rise" style={{ '--d': '0.1s' } as CSSProperties} lang="hi">
          {speakerName ? `${speakerName} · ` : ''}अध्याय {c}, श्लोक {v}{ch?.totalVerses ? ` (कुल ${ch.totalVerses})` : ''}
        </p>
      </header>

      <article className="gita-verse-card gv-hero-card gv-rise" style={{ '--d': '0.16s' } as CSSProperties}>
        <div className="gv-diamonds" aria-hidden="true"><i /><i /><i /></div>
        {audio ? (
          <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={c} verse={v} locale="hi" next={next ? { chapter: next.chapter, verse: next.verse } : null} />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}
        <VerseRomanLines roman={roman} />

        <p className="gv-en-quote" lang="hi" id={VERSE_TRANSLATION_ID}>{verse.hindiTranslation}</p>
        {joint.length > 1 && (
          <p className="gv-joint-note" lang="hi">श्लोक {jointRefsHi(c, joint)} का अर्थ साथ में</p>
        )}
        {speakerName && <div className="gv-en-speaker" lang="hi">{speakerName}</div>}

        <a className="vp-langlink" href={verseUrl(c, v, 'en')} hrefLang="en" lang="en" data-mp-location={`verse_hi_${c}_${v}_to_english`}>
          Read in English
        </a>
      </article>

      <StoryJumps chapter={c} verse={v} lang="hi" />

      <VerseExplain
        section={`verse_hi_${c}_${v}_explain`}
        label="अर्थ और संदर्भ"
        blocks={blocks}
        openCount={1}
        moreLabel="पूरी व्याख्या पढ़ें"
        credit={<>{credit} <a href="/methodology">कैसे बनता है</a></>}
      />

      <VerseWordByWord
        words={words}
        locale="hi"
        glossLang={wbwHindi.length ? 'hi' : 'en'}
        plain={roman.plainAll}
        section={`verse_hi_${c}_${v}_wbw`}
      />

      <div className="vp-share">
        <VerseShareBar
          chapter={c}
          verse={v}
          lang="hi"
          size="compact"
          line={hc?.saar || (hasHindiTranslation(verse) ? verse.hindiTranslation : splitSpeaker(verse.sanskrit).text)}
        />
      </div>

      <VerseBridge chapter={c} verse={v} lang="hi" />

      <VerseNextCard
        chapter={c}
        verse={v}
        lang="hi"
        chapterName={ch?.hiName}
        next={next ? { chapter: next.chapter, verse: next.verse, teaser: next.essence || next.snippet } : null}
      />

      <VerseEssays chapter={c} verse={v} lang="hi" links={blogLinks} />

      <VerseRelated
        chapter={c}
        verse={v}
        lang="hi"
        verses={related.map((r) => ({ chapter: r.chapter, verse: r.verse, teaser: r.essence || r.snippet }))}
        themes={themes}
        exclude={next ? { chapter: next.chapter, verse: next.verse } : null}
      />

      <VerseStickyNav
        lang="hi"
        current={{ chapter: c, verse: v }}
        prev={prev ? { chapter: prev.chapter, verse: prev.verse, teaser: prev.essence || prev.snippet } : null}
        next={next ? { chapter: next.chapter, verse: next.verse, teaser: next.essence || next.snippet } : null}
      />
    </main>
  )
}

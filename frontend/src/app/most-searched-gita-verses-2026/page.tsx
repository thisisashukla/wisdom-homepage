import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import VerseIndexChart from '@/components/searched/VerseIndexChart'
import WeeklyChart from '@/components/searched/WeeklyChart'
import { getVerse, verseUrl } from '@/lib/gita'
import {
  AHREFS,
  ENGLISH_LINE,
  GSC,
  JANMASHTAMI,
  JAN_TO_OCT,
  READERS,
  STUDY,
  VERSES,
  WEEKLY_INDIA,
  fmtIndex,
  shareOfTop,
} from '@/lib/searchedVerses2026'
import '../home.css'
import '../home-v3.css'
import '../gita-jayanti/gita-jayanti.css'
import '../gita-jayanti/guides.css'
import './searched.css'

const URL = 'https://wisdomquotes.in/most-searched-gita-verses-2026'
const TITLE = 'The Gita verses people searched most in 2026'
const DESCRIPTION =
  'Google search data for 42 famous Bhagavad Gita verses in 2026. Yada yada hi dharmasya (4.7) leads, karmanye vadhikaraste (2.47) is second, and in the US and UK the top line is in English.'
const OG = 'https://wisdomquotes.in/og/most-searched-gita-verses-2026.webp'
const CSV = '/data/gita-verse-search-2026.csv'

export const metadata: Metadata = {
  title: { absolute: 'Most Searched Bhagavad Gita Verses in 2026 (Google Data) | Wisdom' },
  description: DESCRIPTION,
  keywords:
    'most searched gita verse, most famous bhagavad gita verse, famous gita shlokas, yada yada hi dharmasya, karmanye vadhikaraste, now i am become death gita, bhagavad gita search data 2026',
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: 'Search data for 42 famous verses: which ones people look up, where, and when.',
    url: URL,
    type: 'article',
    siteName: 'Wisdom',
    images: [{ url: OG, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [OG] },
}

/** 11.32 in the corpus carries the speaker line and lost two word breaks; show the standard text. */
const SANSKRIT_OVERRIDE: Record<string, string> = {
  '11.32':
    'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः । ऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः ॥',
}

const pct = (a: number, b: number) => Math.round((a / b) * 100)
const ratio = (a: number, b: number) => Math.round((a / b) * 10) / 10

export default async function MostSearchedVersesPage() {
  const byWorld = [...VERSES].sort((a, b) => b.world - a.world)
  const top = byWorld.slice(0, 12)
  const v = (ref: string) => VERSES.find((x) => x.ref === ref)!
  const india2 = shareOfTop('india', 2)
  // The karmanye side of the US comparison is a small number, so state a floor rather than a precise multiple.
  const usTimes = Math.floor(ENGLISH_LINE.us.death / ENGLISH_LINE.us.karmanye / 10) * 10
  const usShareOfGita = pct(ENGLISH_LINE.us.death, ENGLISH_LINE.us.gita)
  const numericShare = pct(GSC.numericImpressions, GSC.impressions)
  const karmanyeWords = pct(GSC.karmanye.byWords, GSC.karmanye.impressions)
  const outsideIndia424 = Math.round(v('4.24').world / v('4.24').india)

  const FEATURED: { ref: string; heading: string; body: string[] }[] = [
    {
      ref: '4.7',
      heading: 'Yada yada hi dharmasya',
      body: [
        `Krishna’s promise to appear whenever dharma declines. It was searched about ${ratio(v('4.7').world, 100)} times as often as karmanye vadhikaraste worldwide and ${ratio(v('4.7').india, 100)} times as often in India.`,
        `In India the searches around it are “sloka”, “meaning”, “in hindi”, “in english” and “ringtone”, which suggests many people look it up after hearing it. Ahrefs lists ${AHREFS.indiaIdeas.yada.toLocaleString('en-IN')} different phrasings of it in Indian searches, against ${AHREFS.indiaIdeas.karmanye} for karmanye vadhikaraste, and puts both “yada yada hi dharmasya” and “yada yada hi dharmasya sloka” above 10,000 searches a month there.`,
      ],
    },
    {
      ref: '2.47',
      heading: 'Karmanye vadhikaraste',
      body: [
        'The most common search around it in India is the full first line, “karmanye vadhikaraste ma phaleshu kadachana”, followed by “sloka” and “meaning”.',
        `It is the verse people search for by its words. Of the Google searches that showed our site and named one verse, ${karmanyeWords}% of the impressions for 2.47 came from its Sanskrit words; for almost every other verse it was a number. It is also the verse visitors most often land on when they arrive from outside the site: ${READERS.externalEntryTop.users} browsers since May (English and Hindi pages counted separately, about 15 of them from one Reddit thread), against ${READERS.externalEntryTop.next.users} for 1.1, the next.`,
        'A film with the same title adds a small share of searches; “movie” scores 10 on Google’s related-search scale where the full line scores 100.',
      ],
    },
    {
      ref: '11.32',
      heading: 'Kalo ’smi, or “Now I am become death”',
      body: [
        'Krishna, in his universal form, tells Arjuna he is Time, the destroyer of worlds, and that the warriors facing him will fall whatever Arjuna does. J. Robert Oppenheimer said the line came to his mind at the first nuclear test in 1945, in his own wording, “Now I am become Death, the destroyer of worlds”, and the 2023 film Oppenheimer put it on screen.',
        `Worldwide it scores ${fmtIndex(v('11.32').world)} on our index, third overall behind 2.47, and almost all of that is the English line; the Sanskrit barely registers. In India it scores ${fmtIndex(v('11.32').india)}. Some of the English searches are about the video game Fallout 76, which uses the phrase.`,
      ],
    },
    {
      ref: '4.8',
      heading: 'Paritranaya sadhunam, sambhavami yuge yuge',
      body: [
        `The verse after 4.7: Krishna says why he comes, to protect the good, end wrongdoing and restore dharma, age after age. The two verses are usually recited together, and many people know this one by its last words, “sambhavami yuge yuge”. It scores ${fmtIndex(v('4.8').world)} worldwide, a clear third among the Sanskrit lines.`,
      ],
    },
    {
      ref: '2.23',
      heading: 'Nainam chindanti shastrani',
      body: [
        `Weapons cannot cut the self, fire cannot burn it. Part of Krishna’s first answer to Arjuna’s grief in chapter 2, and often quoted when someone has died. Index ${fmtIndex(v('2.23').world)} worldwide, ${fmtIndex(v('2.23').india)} in India.`,
      ],
    },
    {
      ref: '18.66',
      heading: 'Sarva dharman parityajya',
      body: [
        `Krishna’s last instruction: let go of every other duty and take refuge in him. Sri Vaishnavas call it the charama shloka, the final teaching. Index ${fmtIndex(v('18.66').world)} worldwide. It is also one of the verses people most often look up by number; searches such as “bg 18.66” showed our site in Google ${GSC.byNumber.find((b) => b.ref === '18.66')!.impressions} times this year.`,
      ],
    },
  ]

  const verseData = new Map<string, Awaited<ReturnType<typeof getVerse>>>()
  await Promise.all(
    FEATURED.map(async (f) => {
      const x = v(f.ref)
      verseData.set(f.ref, await getVerse(x.chapter, x.verse))
    })
  )

  const FINDINGS = [
    <>
      <strong>4.7, yada yada hi dharmasya, was the most searched of the {STUDY.verses} verses we measured.</strong> It drew about {ratio(v('4.7').world, 100)} times
      the search interest of karmanye vadhikaraste (2.47) worldwide and {ratio(v('4.7').india, 100)} times in India.
    </>,
    <>
      <strong>In India, two verses take most of the searching.</strong> Among the {STUDY.verses} verses we measured, 4.7 and 2.47 hold{' '}
      {india2}% of the search interest in India.
    </>,
    <>
      <strong>In the US and UK, the top line is in English.</strong> “Now I am become death” (11.32) drew more than {usTimes} times the search
      interest of karmanye vadhikaraste in the US, and about {usShareOfGita}% as much as “bhagavad gita” itself.
    </>,
    <>
      <strong>Searches for 4.7 more than doubled in Janmashtami week.</strong> The week of Janmashtami (4 September) was its highest of
      the year, {JANMASHTAMI.ratio} times its median week.
    </>,
    <>
      <strong>Search interest in both top verses fell through the year.</strong> In India, their share of Google searches in October was{' '}
      {Math.abs(JAN_TO_OCT.v47)}% below January for 4.7 and {Math.abs(JAN_TO_OCT.v247)}% below for 2.47.
    </>,
    <>
      <strong>On our site, most verse searches used a number.</strong> {numericShare}% of the impressions from Google searches that showed
      wisdomquotes.in for one named verse came from searches typed like “bg 6.35”. 2.47 was the exception.
    </>,
  ]

  const FAQ = [
    {
      q: 'What is the most searched verse of the Bhagavad Gita?',
      a: `Of the 42 well-known verses we measured in 2026, it was 4.7, “yada yada hi dharmasya”, with about ${ratio(v('4.7').world, 100)} times the Google search interest of 2.47 worldwide and ${ratio(v('4.7').india, 100)} times in India. 2.47, “karmanye vadhikaraste”, was second.`,
    },
    {
      q: 'Is karmanye vadhikaraste the most famous Gita verse?',
      a: 'It was the second most searched of the 42 verses we measured in 2026. Its top related searches in India are the full line, “sloka” and “meaning”. Fame is hard to measure; search interest is one measure of it.',
    },
    {
      q: 'Where is “Now I am become death” in the Bhagavad Gita?',
      a: 'Chapter 11, verse 32. Krishna says he is Time (kala), the destroyer of worlds. The English line is J. Robert Oppenheimer’s own wording of it.',
    },
    {
      q: 'Can I use this data?',
      a: 'Yes. Please cite “Wisdom (wisdomquotes.in)” and link to this page. The full table is available as a CSV download in the methodology section.',
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: TITLE,
        description: DESCRIPTION,
        inLanguage: 'en',
        datePublished: STUDY.published,
        dateModified: STUDY.published,
        image: OG,
        author: { '@type': 'Person', name: 'Ankur Shukla', url: 'https://wisdomquotes.in/about' },
        publisher: { '@type': 'Organization', name: 'Wisdom', logo: 'https://wisdomquotes.in/assets/new-light-logo.webp' },
        mainEntityOfPage: URL,
      },
      {
        '@type': 'Dataset',
        name: 'Google search interest for 42 Bhagavad Gita verses, 2026',
        description:
          'Google Trends search interest indexed to Bhagavad Gita 2.47 = 100, worldwide and India, 1 January to 28 October 2026, with the spellings used for each verse.',
        url: URL,
        temporalCoverage: '2026-01-01/2026-10-28',
        spatialCoverage: ['Worldwide', 'India'],
        creator: { '@type': 'Organization', name: 'Wisdom', url: 'https://wisdomquotes.in' },
        license: 'https://creativecommons.org/licenses/by/4.0/',
        isAccessibleForFree: true,
        distribution: [{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `https://wisdomquotes.in${CSV}` }],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wisdomquotes.in' },
          { '@type': 'ListItem', position: 2, name: 'Bhagavad Gita', item: 'https://wisdomquotes.in/gita' },
          { '@type': 'ListItem', position: 3, name: 'Most searched verses 2026', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav pageName="Most Searched Verses 2026" />

      <main className="gjg sv">
        <header className="gjg-head">
          <div className="wrap">
            <div className="gjg-col">
              <nav className="gjg-crumbs" aria-label="Breadcrumb">
                <a href="/">Home</a> / <a href="/gita">Bhagavad Gita</a> / <span>Most searched verses 2026</span>
              </nav>
              <div className="gjg-eyebrow">Search data, 2026</div>
              <h1 className="gjg-h1">{TITLE}</h1>
              <p className="gjg-lede">
                We measured Google searches for {STUDY.verses} well-known Bhagavad Gita verses from {STUDY.window}, using Google Trends,
                Ahrefs, and Search Console and visitor data from this site. Two verses take most of the searching, and in the US and UK the
                most searched line is in English.
              </p>
              <p className="gjg-note">By Ankur Shukla · Published 29 October 2026 · <a href="#method">How we measured</a> · <a href={CSV} download>Download the data (CSV)</a></p>
            </div>
          </div>
        </header>

        <section className="section sv-findings-sec">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">What we found</h2>
            <ol className="sv-findings">
              {FINDINGS.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-alt" id="ranking">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">The ranking</h2>
            <p>
              Google Trends does not give search counts. It gives each search a share of all searches in a region, so we set 2.47 to 100
              and scored every other verse against it, separately for the world and for India. A verse at 50 was searched half as much as
              2.47 in that region. Each verse counts its common spellings together, in Roman letters and Devanagari.
            </p>
            <VerseIndexChart verses={top} />
            <p className="gjg-note">
              The top 12 of {STUDY.verses}. Scores below 1 rest on very few searches and can move a lot. The <a href="#table">full table</a> has
              all {STUDY.verses}.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">The six verses at the top</h2>
            <div className="gjg-picks">
              {FEATURED.map((f, i) => {
                const d = verseData.get(f.ref)
                const x = v(f.ref)
                return (
                  <article key={f.ref} id={`v-${f.ref.replace('.', '-')}`} className="gjg-pick">
                    <span className="gjg-pick-time">#{i + 1} worldwide · {f.ref}</span>
                    <h3 className="sv-h3">{f.heading}</h3>
                    {d && (
                      <div className="gjg-verse">
                        <div className="gjg-verse-ref">
                          <a href={verseUrl(x.chapter, x.verse)} data-mp-location={`searched_verse_${x.chapter}_${x.verse}`}>
                            {f.ref}
                          </a>{' '}
                          · {d.speaker}
                        </div>
                        <p className="gjg-verse-sa" lang="sa">{SANSKRIT_OVERRIDE[f.ref] ?? d.sanskrit}</p>
                        <p className="gjg-verse-en">“{d.englishTranslation.replace(/^The Blessed Lord said:\s*/, '')}”</p>
                      </div>
                    )}
                    {f.body.map((b, k) => <p key={k}>{b}</p>)}
                    <a className="gjg-day-go" href={verseUrl(x.chapter, x.verse)} data-mp-location={`searched_read_${x.chapter}_${x.verse}`}>
                      Read {f.ref} with word meanings →
                    </a>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="english">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">In the US and UK, people search the English</h2>
            <p>
              In the US, “i am become death” drew more than {usTimes} times the search interest of karmanye vadhikaraste and about{' '}
              {usShareOfGita}% as much as “bhagavad gita”. In the UK the Sanskrit lines barely register next to it. Ahrefs puts “i am become
              death” and “i am become death destroyer of worlds” each above 1,000 US searches a month, and karmanye vadhikaraste and yada yada
              hi dharmasya each in the hundreds.
            </p>
            <p>
              Other verses lean outside India too. Against 2.47, 4.24 (brahmarpanam, the verse many families, schools and ashrams chant before a
              meal) scores about {outsideIndia424} times higher worldwide than in India, so most of its searches come from outside India.
              6.5 (uddhared atmanatmanam) shows the same pattern.
            </p>
          </div>
        </section>

        <section className="section" id="year">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">Janmashtami, and a slower year</h2>
            <p>
              Searches for 4.7 reached their high for the year in the week of Janmashtami ({JANMASHTAMI.date}), {JANMASHTAMI.ratio} times
              its median week. 2.47 rose that week too, by less. On Krishna’s birthday, people look up the verse where he promises to
              return.
            </p>
            <WeeklyChart data={WEEKLY_INDIA} markWeek={JANMASHTAMI.week} markLabel="30 Aug" />
            <p>
              Across the year the share of searches for both lines drifted down: October was {Math.abs(JAN_TO_OCT.v47)}% below January for 4.7 and{' '}
              {Math.abs(JAN_TO_OCT.v247)}% for 2.47. Google Trends cannot say why. One possibility is that more people now get the meaning
              from an AI answer without searching again.
            </p>
          </div>
        </section>

        <section className="section section-alt" id="by-number">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">By the words, or by the number</h2>
            <p>
              Our own Search Console data shows the other way people find a verse. From {GSC.window}, Google showed wisdomquotes.in for{' '}
              {GSC.queries} different searches that named one specific verse. {numericShare}% of those impressions came from searches typed as a number,
              like “bg 6.35” or “12.5 bg”, and {GSC.indiaShare}% came from India. Someone who searches “bg 9.31” has probably seen the
              reference in a class, a book or a post and wants the verse itself. This reflects the searches our site appears for; the famous lines above are mostly searched by their
              words.
            </p>
            <div className="gjg-table-wrap">
              <table className="gjg-table">
                <caption className="sv-caption">Verses looked up most by number, excluding 2.47 (Google impressions for wisdomquotes.in)</caption>
                <thead>
                  <tr><th>Verse</th><th>Typical search</th><th>Impressions</th></tr>
                </thead>
                <tbody>
                  {GSC.byNumber.map((b) => (
                    <tr key={b.ref}>
                      <td><a href={verseUrl(b.chapter, b.verse)}>{b.ref}</a></td>
                      <td>{b.example}</td>
                      <td>{b.impressions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              2.47 went the other way: {karmanyeWords}% of its {GSC.karmanye.impressions} impressions came from searches for its words.
            </p>
            <p>
              On the site itself, most people start at the beginning. Since {READERS.window.split(' to ')[0]}, {READERS.opened11} browsers
              opened verse 1.1, {READERS.opened12} opened 1.2 and {READERS.opened21} reached 2.1, the first verse of Krishna’s reply. The{' '}
              <a href="/read-gita-in-18-days">18-day reading plan</a> is one way through.
            </p>
          </div>
        </section>

        <section className="section" id="table">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">All {STUDY.verses} verses</h2>
            <div className="gjg-table-wrap">
              <table className="gjg-table sv-full">
                <caption className="sv-caption">Google search interest, 1 Jan to 28 Oct 2026. 2.47 = 100 in each region.</caption>
                <thead>
                  <tr><th>#</th><th>Verse</th><th>How people search it</th><th>World</th><th>India</th></tr>
                </thead>
                <tbody>
                  {byWorld.map((x, i) => (
                    <tr key={x.ref}>
                      <td>{i + 1}</td>
                      <td><a href={verseUrl(x.chapter, x.verse)}>{x.ref}</a></td>
                      <td>{x.line}</td>
                      <td>{fmtIndex(x.world)}</td>
                      <td>{fmtIndex(x.india)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="method">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">How we measured</h2>
            <ul className="sv-method">
              <li>
                <strong>Google Trends</strong>, web search, {STUDY.window}, read on 29 October 2026. We chose {STUDY.verses} verses that are
                widely quoted or recited. For each verse we searched its common spellings together (for example “karmanye vadhikaraste +
                karmanyevadhikaraste + karmanye wadhikaraste + कर्मण्येवाधिकारस्ते”); the CSV lists every spelling. We compared four verses
                at a time against 2.47, added up the weekly values, and divided by 2.47’s total. Verses scoring under 2.5 were measured again
                against a smaller verse (18.66 worldwide, 2.23 in India) and scaled back, so small numbers keep their precision.
              </li>
              <li>
                <strong>US and UK.</strong> Searches for individual Sanskrit lines are too few in these countries for a full ranking, so we only
                report direct comparisons of four searches at a time.
              </li>
              <li>
                <strong>Ahrefs</strong> free Keyword Generator for monthly search estimates. Its free tier shows ranges (100+, 1,000+, 10,000+),
                so we quote ranges only.
              </li>
              <li>
                <strong>Google Search Console</strong> for wisdomquotes.in, {GSC.window}: {GSC.impressions.toLocaleString('en-IN')} impressions
                from {GSC.queries} searches that named one verse, by number or by its Sanskrit words. This shows what Google showed our site for,
                not all searching.
              </li>
              <li>
                <strong>Visitor data</strong> (Mixpanel) for wisdomquotes.in, {READERS.window}. Counts are browsers, with known bots and Linux traffic
                (mostly crawlers) excluded.
              </li>
              <li>
                <strong>Limits.</strong> Trends rounds weekly values, so scores under 1 are rough. Spellings we did not include are not counted,
                nor are searches in English or Hindi paraphrase, apart from “i am become death” (11.32) and “radiance of a thousand suns” (11.12). Some searches share a name with something else:
                a film called Karmanye Vadhikaraste and searches about the game Fallout 76, which uses “I am become death”, add a little to 2.47 and 11.32.
              </li>
            </ul>
            <p>
              <a className="gjg-day-go" href={CSV} download data-mp-location="searched_csv">Download the data (CSV) →</a>
            </p>
            <p className="gjg-note">
              To cite: Wisdom (wisdomquotes.in), “{TITLE}”, 29 October 2026, {URL}. The data is free to reuse with a link to this page.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">Questions</h2>
            <div className="gjg-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt gjg-cta">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">Or start from what you’re facing</h2>
            <p>Tell Wisdom what’s going on and it picks a verse a day for seven days, with what each one means for you.</p>
            <HeroPlanCTA campaign="web_searched_2026" location="searched_create_plan" pageName="Most Searched Verses 2026" />
          </div>
        </section>

        <section className="section gjg-related">
          <div className="wrap">
            <h2 className="gjg-h2">For Gita Jayanti, 20 December</h2>
            <div className="gjg-related-grid">
              {[
                { href: '/gita-jayanti', title: 'Gita Jayanti 2026', dek: 'The date, the Ekadashi tithi timings and a countdown.' },
                { href: '/read-gita-in-18-days', title: 'Read the Gita in 18 days', dek: 'One chapter a day, finishing on Gita Jayanti.' },
                { href: '/gita-jayanti/which-chapter-to-read', title: 'Which chapter to read', dek: 'What to read with five minutes, twenty, or the whole day.' },
              ].map((c) => (
                <a key={c.href} href={c.href} className="gjg-related-card" data-mp-location={`searched_related_${c.href.replace(/\W+/g, '_')}`}>
                  <span className="gjg-related-title">{c.title}</span>
                  <span className="gjg-related-dek">{c.dek}</span>
                  <span className="gjg-related-go" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="Most Searched Verses 2026" />
    </>
  )
}

import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, LinkCards, NextStep, PageHero, ScriptToggle, Section } from '@/components/site'
import IosTip from '@/components/funnels/hanuman-chalisa/IosTip'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import { MeaningTracker, PrintButton } from '@/components/funnels/hanuman-chalisa/Trackers'
import { FullText, Sources } from '@/components/funnels/hanuman-chalisa/Blocks'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  beads,
  cardOg,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  getUnits,
  HOW_MANY_PATH,
  HUB_PATH,
  HUB_PATH_HI,
  HUB_TWIN,
  JAYANTI_PATH,
  LEARN_PATH,
  linePath,
  NEXT_COPY,
  PDF_FILES,
  PDF_PATH,
  SCRIPT_LIST,
  scriptLines,
  START_SITUATION,
  SUN_LINE_ID,
  getUnit,
  unitVerse,
  UPDATED,
} from '@/lib/funnels/hanuman-chalisa'
import { EVENTS } from '@/lib/analytics/events'

export const metadata: Metadata = pageMeta({
  title: 'Hanuman Chalisa Lyrics in English with Meaning, PDF | Wisdom',
  description:
    'Sing all 43 lines of the Hanuman Chalisa in English letters, know what each line means, and print a free PDF. Teach it to your kids, four lines a day.',
  path: HUB_PATH,
  twin: HUB_TWIN,
  ogImage: cardOg('hc-1'),
})

const FAQ = [
  {
    q: 'Who wrote the Hanuman Chalisa?',
    a: 'Goswami Tulsidas, the poet of the Ramcharitmanas, wrote it in Awadhi. He names himself in the last chaupai: "tulsīdās sadā hari cerā", Tulsidas is forever Hari\'s servant.',
  },
  {
    q: 'Why is it called Chalisa?',
    a: 'Chalisa means "forty". The hymn has forty chaupais, framed by two dohas at the start and one at the end, so 43 units in all. Chaupai 39 calls it "hanumān calīsā" itself.',
  },
  {
    q: 'What language is the Hanuman Chalisa in?',
    a: 'Awadhi, the language of the Ayodhya region and of the Ramcharitmanas. It is close to Hindi, which is why Hindi speakers follow most of it, but words like "jasu" (glory) and "cerā" (servant) are Awadhi.',
  },
  {
    q: 'What is the right way to read the English letters?',
    a: 'The English letters here follow the way the Chalisa is sung, so the short a at the end of a word is dropped: जय reads "jay", ज्ञान reads "jñān". A long ā is said as in "father", ī as in "machine", ū as in "rule".',
  },
  {
    q: 'How many times should I recite it?',
    a: 'Chaupai 38 speaks of reciting it a hundred times. Families commonly recite it once, 7, 11 or 21 times, or 108 times on special days. The page on how many times sets out what the text says and what tradition adds.',
  },
  {
    q: 'Is there a Hanuman Chalisa PDF in English?',
    a: 'Yes, free. The PDF page has the whole Chalisa in English letters with the meaning of every line, a Devanagari edition with Hindi and English meanings, Telugu, Gujarati and Kannada editions, and an 11-day learning sheet for kids. They print on US Letter or A4.',
  },
  {
    q: 'Can I recite it from English letters if I do not read Hindi?',
    a: 'Yes. Many families outside India learned it from English letters. Read the pronunciation note above the text, listen to one recording for the tune, and open the meaning of any line you are unsure of.',
  },
  {
    q: 'Is the Telugu Hanuman Chalisa different?',
    a: 'No. Tulsidas wrote it once, in Awadhi. Telugu, Gujarati and Kannada editions write the same words in those letters. Some Telugu books use Sanskrit spellings for a few words, such as charaṇa for charan; the sound and the meaning stay the same.',
  },
  {
    q: 'Can children recite the Hanuman Chalisa?',
    a: 'Yes, and many learn it young. Four lines a day is a pace most children can keep, and by the eleventh day they can say all 43 lines.',
  },
  {
    q: 'When should I recite it?',
    a: 'Any time. Tuesdays and Saturdays are the days most families keep for Hanuman, and many recite it in the morning after bathing. Hanuman Jayanti falls on Tuesday, 20 April 2027.',
  },
]

/** Recordings families sing along with. Links go to a YouTube search, so they never point at a removed upload. */
const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
const RECORDINGS = [
  {
    href: yt('Shree Hanuman Chalisa Hariharan T-Series'),
    kicker: 'Brisk · about 9 minutes',
    title: 'Hariharan, T-Series (2011)',
    body: 'The most watched: the first Indian video on YouTube to pass five billion views.',
    location: 'hub_listen_hariharan',
  },
  {
    href: yt('Hari Om Sharan Hanuman Chalisa'),
    kicker: 'Slow and clear',
    title: 'Hari Om Sharan (1974)',
    body: 'Still played in temples and homes fifty years on. Every word is easy to catch, which makes it the one to learn from.',
    location: 'hub_listen_hari_om_sharan',
  },
  {
    href: yt('M S Subbulakshmi Hanuman Chalisa'),
    kicker: 'Carnatic',
    title: 'M. S. Subbulakshmi',
    body: 'Sung in the Carnatic style, unhurried and exact, with every syllable in its place.',
    location: 'hub_listen_ms',
  },
  {
    href: yt('Krishna Das Hanuman Chalisa'),
    kicker: 'Kirtan',
    title: 'Krishna Das',
    body: 'An American kirtan singer in the Neem Karoli Baba tradition who sings it both slow and fast. A gentle way in if you came to it through yoga.',
    location: 'hub_listen_krishna_das',
  },
]

const SCRIPT_TAG = { te: 'Telu', gu: 'Gujr', kn: 'Knda' } as const

export default function HanumanChalisaHub() {
  const units = getUnits()
  const beadList = beads('en', 'anchor')

  const workLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${abs(HUB_PATH)}#text`,
    name: 'Hanuman Chalisa with English meaning',
    headline: 'Hanuman Chalisa in English, line by line',
    url: abs(HUB_PATH),
    inLanguage: ['awa', 'en'],
    isBasedOn: chalisaWorkLd,
    citation: editionCitation,
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    dateModified: UPDATED,
    translationOfWork: chalisaWorkLd,
  }
  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hanuman Chalisa, all 43 lines',
    numberOfItems: units.length,
    itemListElement: units.map((u) => ({
      '@type': 'ListItem',
      position: u.pos,
      name: `${u.label.en}: ${u.iast[0]}`,
      url: abs(linePath(u.slug)),
    })),
  }

  const d1 = units[0]
  const sun = getUnit(SUN_LINE_ID)!

  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa Hub" />
      <MeaningTracker />
      <JsonLd data={[workLd, listLd]} />

      <PageHero
        crumbs={[{ label: 'Hanuman Chalisa', href: HUB_PATH }]}
        eyebrow="Tulsidas, in Awadhi"
        title="Hanuman Chalisa lyrics in English, with meaning"
        sub={
          <span id="quick-answer">
            The Hanuman Chalisa is a 43-line Awadhi hymn to Hanuman by Goswami Tulsidas: two opening dohas, forty chaupais and a closing
            doha. Every line below is in English letters, the way it is sung, with its meaning a tap away, so you can say it and know what
            you are saying.
          </span>
        }
        facts={['Said on Tuesdays and Saturdays', '6 to 10 minutes to recite', 'Free PDF']}
        actions={[
          { href: '#hc-text', label: 'Read it line by line', location: 'hub_hero_read' },
          { href: PDF_PATH, label: 'Get the PDF to print', location: 'hub_hero_pdf' },
          { href: '#hc-family', label: 'Teach it to your kids', location: 'hub_hero_family' },
          { href: '#hc-scripts', label: 'In Telugu, Gujarati, Kannada or Hindi', location: 'hub_hero_scripts' },
        ]}
        verse={{ ...unitVerse(d1), label: 'Doha 1, the opening line' }}
      />

      <Section id="hc-text" tone="band" eyebrow="43 lines" title="The full text">
        <div className="hc-controls hc-noprint">
          <ScriptToggle />
          <a
            className="sx-btn sx-btn--secondary"
            href={PDF_FILES.english}
            download={PDF_FILES.english.split('/').pop()}
            data-mp-location="hub_text_pdf"
            data-mp-event={EVENTS.DownloadClicked}
            data-mp-props={JSON.stringify({ item_id: 'english', item_type: 'pdf' })}
          >
            Download the PDF
          </a>
          <PrintButton label="Print this page" />
        </div>
        <p className="hc-note">
          The English letters follow the way the Chalisa is sung: the short a at the end of a word is dropped, so जय reads jay and ज्ञान
          reads jñān. Say ā as in father, ī as in machine, ū as in rule.
        </p>
        <IosTip />

        <div className="hc-read hc-gap">
          <aside className="hc-read-aside" aria-label="Mala: one bead for each line">
            <Mala
              beads={beadList}
              locale="en"
              mode="anchor"
              currentId="hc.d1"
              label="Mala of 43 beads, one for each line"
              caption="One bead for each of the 43 lines. Tap a bead to go to its line."
            >
              <span className="hc-mala-name">Hanuman Chalisa</span>
              <span className="hc-mala-sub">2 dohas, 40 chaupais, 1 doha</span>
            </Mala>
          </aside>
          <FullText units={units} locale="en" />
        </div>
      </Section>

      <Section
        id="hc-scripts"
        eyebrow="Same words, your letters"
        title="Read it in Telugu, Gujarati, Kannada or Hindi"
        className="hc-noprint"
      >
        <p className="sx-prose rv">
          Tulsidas wrote the Chalisa in Awadhi. Many families learned it from a book in their own script, so the words stay the same and
          only the letters change. Each page has the English meaning of every line and a PDF.
        </p>
        <div className="hc-gap">
          <LinkCards
            items={[
              ...SCRIPT_LIST.map((o) => ({
                href: o.path,
                kicker: <span lang={o.code}>{o.native}</span>,
                title: `Hanuman Chalisa in ${o.name}`,
                body: (
                  <span lang={`awa-${SCRIPT_TAG[o.code]}`} className={`hc-card-script hc-card-script--${o.code}`}>
                    {scriptLines(o.code, 'hc.c1')[0].replace(/\s*[।॥]\s*$/, '')}
                  </span>
                ),
                location: `hub_script_${o.key}`,
              })),
              {
                href: HUB_PATH_HI,
                hrefLang: 'hi',
                kicker: <span lang="hi">हिंदी</span>,
                title: <span lang="hi">हनुमान चालीसा अर्थ सहित</span>,
                body: (
                  <span lang="awa" className="hc-card-script">
                    {units[2].awadhi[0].replace(/\s*[।॥]\s*$/, '')}
                  </span>
                ),
                location: 'hub_hindi',
              },
            ]}
          />
        </div>
      </Section>

      <Section id="hc-family" tone="band" eyebrow="For families" title="Teaching it to your kids" className="hc-noprint">
        <p className="sx-prose rv">
          Most families teach the Chalisa the way it was taught to them: a few lines at a time, out loud, on many evenings in a row.
          Children often remember the sound first. The meaning is what makes it stay.
        </p>
        <ol className="hc-steps sx-prose rv">
          <li>
            <strong>Four lines an evening.</strong> Say them together slowly, twice, then once more at bedtime. The learn mode shows the
            day&apos;s four and keeps your place.
          </li>
          <li>
            <strong>One word a night.</strong> Ask what a word means and open its line. Every line has its own page, word by word, with the
            Ramayana story it comes from.
          </li>
          <li>
            <strong>The whole Chalisa on Tuesday or Saturday.</strong> Say it together from the printed sheet. By the eleventh day they will
            know all 43 lines.
          </li>
        </ol>
        <div className="hc-gap">
          <LinkCards
            items={[
              {
                href: LEARN_PATH,
                title: 'Learn it by heart, 4 lines a day',
                body: "Today's lines, a loop to say them back, and your place kept",
                location: 'hub_family_learn',
              },
              {
                href: PDF_FILES.kids,
                kicker: 'PDF · 11 pages',
                title: 'The 11-day sheet for kids',
                body: 'Large English letters and a box to tick each evening',
                download: PDF_FILES.kids.split('/').pop(),
                location: 'hub_family_pdf',
                event: EVENTS.DownloadClicked,
                eventProps: { item_id: 'kids', item_type: 'pdf' },
              },
            ]}
          />
        </div>
      </Section>

      <Section id="hc-listen" eyebrow="Listen along" title="Which recording to sing along with" className="hc-noprint">
        <p className="sx-prose rv">
          Most people learn the tune from a recording before they learn the words. These four are the ones families come back to, from brisk
          to slow. If you recite it 7 or 11 times at a sitting, a faster recording helps once you know the words.
        </p>
        <div className="hc-gap">
          <LinkCards items={RECORDINGS} />
        </div>
      </Section>

      <Section id="hc-gita" tone="band" eyebrow="The thread to the Gita" title="Hanuman in the Gita" className="hc-noprint">
        <GitaBridge
          href="/gita/chapter/1/verse/20"
          label="Read Bhagavad Gita 1.20"
          why="Hanuman is on Arjuna's chariot at Kurukshetra. In the Bhagavad Gita, Arjuna is called kapi-dhvaja, the one whose banner bears the vanara, as he lifts his bow just before the dialogue with Krishna begins."
          location="hub_gita_1_20"
          className="rv"
        />
      </Section>

      <Section id="hc-more" title="Reciting it" className="hc-noprint">
        <LinkCards
          items={[
            {
              href: HOW_MANY_PATH,
              title: 'How many times to recite it',
              body: 'Once, 11, 21, 108, or a 40-day vow',
              location: 'hub_how_many',
            },
            {
              href: COUNTER_PATH,
              title: 'Count 11, 21 or 108',
              body: 'Tap once for each recitation; your count stays on your phone',
              location: 'hub_counter',
            },
            {
              href: `${linePath(sun.slug)}#sun`,
              title: 'Did the Chalisa give the distance to the sun?',
              body: 'Chaupai 18 and the sum people share',
              location: 'hub_sun',
            },
            { href: JAYANTI_PATH, title: 'Hanuman Jayanti, 20 April 2027', body: 'A one-week family plan', location: 'hub_jayanti' },
          ]}
        />
      </Section>

      <Section id="hc-faq" tone="band" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <Section className="hc-next">
        <NextStep locale="en" pageKey="hc-hub" placement="hub_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
        <Sources locale="en" />
      </Section>
    </main>
  )
}

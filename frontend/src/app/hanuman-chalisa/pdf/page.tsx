import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Section } from '@/components/site'
import { EVENTS } from '@/lib/analytics/events'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  ART_FAMILY,
  cardOg,
  chalisaWorkLd,
  getUnits,
  HUB_PATH,
  LEARN_PATH,
  NEXT_COPY,
  PDF_FILES,
  PDF_INFO,
  PDF_PATH,
  START_SITUATION,
  unitVerse,
  UPDATED,
  type PdfKey,
} from '@/lib/funnels/hanuman-chalisa'

export const metadata: Metadata = pageMeta({
  title: 'Hanuman Chalisa PDF in English, With Meaning (Free)',
  description:
    'Free Hanuman Chalisa PDFs to print: English letters with meaning, Hindi Devanagari, Telugu, Gujarati and Kannada, and an 11-day learning sheet for kids.',
  path: PDF_PATH,
  ogImage: cardOg('hc-1'),
})

const ORDER: PdfKey[] = ['english', 'kids', 'devanagari', 'telugu', 'gujarati', 'kannada']

const FAQ = [
  {
    q: 'Which edition are these PDFs?',
    a: "The Awadhi text is the popular Gita Press, Gorakhpur reading, checked against three Gita Press printings and the mool text of Jagadguru Rambhadracharya's Mahaviri commentary. The meanings are Wisdom's own words, following the traditional reading.",
  },
  {
    q: 'Will they print on A4 paper?',
    a: 'Yes. They are set on US Letter with wide margins, so they print on A4 at the printer\'s normal "fit" setting with nothing cut off.',
  },
  {
    q: 'How do I print from an iPhone?',
    a: 'Tap a PDF to open it, tap the Share button, then Print. To keep it on the phone for recitation, choose Save to Files or Books instead.',
  },
  {
    q: 'Can I print copies for my temple, satsang or Bal Vihar class?',
    a: 'Yes. Print as many as your group needs. Please keep the line at the foot of each page, so others can find the word-by-word meanings.',
  },
  {
    q: 'Is there a version with the meaning of each word?',
    a: 'The PDFs give the meaning of each line. Word-by-word meanings are on the page for each line, linked from the full text on the Hanuman Chalisa page.',
  },
]

export default function HanumanChalisaPdf() {
  const d1 = getUnits()[0]
  const fileOf = (k: PdfKey) => PDF_FILES[k].split('/').pop() as string

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${abs(PDF_PATH)}#pdfs`,
    name: 'Hanuman Chalisa PDFs',
    url: abs(PDF_PATH),
    about: chalisaWorkLd,
    publisher: PUBLISHER_LD,
    dateModified: UPDATED,
    hasPart: ORDER.map((k) => ({
      '@type': 'DigitalDocument',
      name: `Hanuman Chalisa: ${PDF_INFO[k].title}`,
      encodingFormat: 'application/pdf',
      url: abs(PDF_FILES[k]),
      numberOfPages: PDF_INFO[k].pages,
      author: AUTHOR_LD,
    })),
  }

  const card = (k: PdfKey, location: string) => {
    const p = PDF_INFO[k]
    return {
      href: PDF_FILES[k],
      kicker: `PDF · ${p.pages} pages`,
      title: p.title,
      body: p.lang ? <span lang="en">{p.body}</span> : p.body,
      download: fileOf(k),
      location,
      event: EVENTS.DownloadClicked,
      eventProps: { item_id: k, item_type: 'pdf' },
    }
  }

  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa PDF" />
      <JsonLd data={ld} />

      <PageHero
        crumbs={[
          { label: 'Hanuman Chalisa', href: HUB_PATH },
          { label: 'PDF', href: PDF_PATH },
        ]}
        eyebrow="Free to print"
        title="Hanuman Chalisa PDF, with the meaning of every line"
        sub={
          <span id="quick-answer">
            Six free PDFs of the Hanuman Chalisa from the Gita Press reading: English letters with meaning, Devanagari with Hindi and
            English meaning, Telugu, Gujarati and Kannada letters with English meaning, and an 11-day sheet for children. Print one for
            everyone who recites with you.
          </span>
        }
        facts={['US Letter, fits A4', 'No sign-up']}
        actions={[
          {
            href: PDF_FILES.english,
            label: 'Download the English PDF',
            location: 'pdf_hero_english',
            download: fileOf('english'),
            event: EVENTS.DownloadClicked,
            eventProps: { item_id: 'english', item_type: 'pdf' },
          },
          { href: '#pdf-all', label: 'See all six', location: 'pdf_hero_all' },
        ]}
        verse={{ ...unitVerse(d1), label: 'Doha 1, the opening line' }}
        art={{ ...ART_FAMILY, position: '62% 45%' }}
      />

      <Section id="pdf-all" tone="band" eyebrow="Six sheets" title="Pick the one your family reads">
        <LinkCards items={ORDER.slice(0, 3).map((k) => card(k, `pdf_card_${k}`))} columns={3} />
        <h3 className="sx-h3 hc-gap">In your script</h3>
        <LinkCards items={ORDER.slice(3).map((k) => card(k, `pdf_card_${k}`))} columns={3} />
      </Section>

      <Section id="pdf-use" title="Using the sheets">
        <ol className="hc-steps sx-prose rv">
          <li>
            <strong>For one person.</strong> Keep the English or Devanagari PDF on your phone and read from it until the words come without
            looking.
          </li>
          <li>
            <strong>For a family recitation.</strong> Print one copy each, so nobody shares a page or loses the place.
          </li>
          <li>
            <strong>For children.</strong> Put the 11-day sheet on the fridge, say the day&apos;s four lines together after dinner, and let
            them tick the box. The <a href={LEARN_PATH}>learn mode</a> keeps the same days on your phone.
          </li>
        </ol>
      </Section>

      <Section id="hc-faq" tone="band" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <Section className="hc-next">
        <NextStep locale="en" pageKey="hc-pdf" placement="pdf_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
      </Section>
    </main>
  )
}

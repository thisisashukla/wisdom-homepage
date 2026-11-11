/**
 * The Chalisa in Telugu, Gujarati or Kannada letters: one page per script, all built here.
 * The Awadhi words are the Gita Press reading; only the letters change (scripts.json).
 * English meaning on tap, the English-letters switch, the mala, and that script's PDF.
 */

import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, ScriptToggle, Section } from '@/components/site'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import { MeaningTracker } from '@/components/funnels/hanuman-chalisa/Trackers'
import { FullText, Sources } from '@/components/funnels/hanuman-chalisa/Blocks'
import { EVENTS } from '@/lib/analytics/events'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  beads,
  chalisaWorkLd,
  editionCitation,
  getUnits,
  HUB_PATH,
  HUB_PATH_HI,
  LEARN_PATH,
  nb,
  NEXT_COPY,
  PDF_FILES,
  PDF_PATH,
  SCRIPT_LIST,
  SCRIPT_PAGES,
  scriptLines,
  START_SITUATION,
  UPDATED,
  type ScriptKey,
} from '@/lib/funnels/hanuman-chalisa'

const TAG = { te: 'Telu', gu: 'Gujr', kn: 'Knda' } as const

/** What each script's page says that is particular to it. */
const COPY: Record<ScriptKey, { spelling: string; spellingFaq: string }> = {
  telugu: {
    spelling:
      'Some Telugu books write a few words with Sanskrit spellings, such as చరణ for చరన or యశ for జసు. This page keeps the Awadhi spelling of the Gita Press edition, so it sounds exactly as the Chalisa is sung.',
    spellingFaq:
      'Many Telugu printings give a few words their Sanskrit form, such as చరణ (charaṇa) for చరన (charan). The sound is close and the meaning is the same. This page follows the Gita Press Awadhi spelling, which is how the Chalisa is sung.',
  },
  gujarati: {
    spelling: 'This page keeps the Awadhi spelling of the Gita Press edition, so it sounds exactly as the Chalisa is sung.',
    spellingFaq:
      'Some Gujarati printings adjust a few spellings. This page follows the Gita Press Awadhi spelling letter for letter, which is how the Chalisa is sung.',
  },
  kannada: {
    spelling:
      'Some Kannada books write a few words with Sanskrit spellings. This page keeps the Awadhi spelling of the Gita Press edition, so it sounds exactly as the Chalisa is sung.',
    spellingFaq:
      'Many Kannada printings give a few words their Sanskrit form, such as ಚರಣ for ಚರನ. The sound is close and the meaning is the same. This page follows the Gita Press Awadhi spelling, which is how the Chalisa is sung.',
  },
}

export function scriptMetadata(key: ScriptKey): Metadata {
  const s = SCRIPT_PAGES[key]
  return pageMeta({
    title: `Hanuman Chalisa in ${s.name}: Lyrics, Meaning and PDF`,
    description: `All 43 lines of the Hanuman Chalisa in ${s.name} letters (${s.native}), with the English meaning of every line and a free PDF to print.`,
    path: s.path,
    index: s.indexed,
  })
}

export default function ScriptPage({ script }: { script: ScriptKey }) {
  const s = SCRIPT_PAGES[script]
  const units = getUnits()
  const d1 = units[0]
  const c1 = units[2]
  const pageName = `Hanuman Chalisa ${s.name}`
  const pdfName = PDF_FILES[s.pdf].split('/').pop()

  const workLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${abs(s.path)}#text`,
    name: `Hanuman Chalisa in ${s.name} letters, with English meaning`,
    url: abs(s.path),
    inLanguage: ['awa', 'en'],
    isBasedOn: chalisaWorkLd,
    citation: editionCitation,
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    dateModified: UPDATED,
  }

  const faq = [
    {
      q: `Is the Hanuman Chalisa in ${s.name} different from the Hindi one?`,
      a: `No. Tulsidas wrote the Chalisa once, in Awadhi. The ${s.name} Hanuman Chalisa writes those same words in ${s.name} letters, so a ${s.name} reader can sing it without learning Devanagari.`,
    },
    { q: `Why do some ${s.name} books spell a few words differently?`, a: COPY[script].spellingFaq },
    {
      q: 'Where is the meaning of each word?',
      a: 'Every line has its own page with the Awadhi, the English letters, a word-by-word meaning and the place in the Ramayana it recalls. Open a meaning below and follow the link under it.',
    },
  ]

  return (
    <main>
      <PageTracker pageName={pageName} />
      <MeaningTracker />
      <JsonLd data={workLd} />

      <PageHero
        crumbs={[
          { label: 'Hanuman Chalisa', href: HUB_PATH },
          { label: s.name, href: s.path },
        ]}
        eyebrow={<span lang={s.code}>{s.native}</span>}
        title={`Hanuman Chalisa in ${s.name}`}
        sub={
          <span id="quick-answer">
            The Hanuman Chalisa as Tulsidas wrote it in Awadhi, in {s.name} letters, with the English meaning of every line. The words are
            the ones sung everywhere; only the letters are {s.name}.
          </span>
        }
        facts={['43 lines', 'English meaning on tap', `${s.name} PDF to print`]}
        actions={[
          { href: '#hc-text', label: 'Read it line by line', location: 'script_hero_read' },
          {
            href: PDF_FILES[s.pdf],
            label: `Download the ${s.name} PDF`,
            location: 'script_hero_pdf',
            download: pdfName,
            event: EVENTS.DownloadClicked,
            eventProps: { item_id: s.pdf, item_type: 'pdf' },
          },
          { href: HUB_PATH, label: 'In English letters', location: 'script_hero_english' },
        ]}
        verse={{ original: scriptLines(s.code, d1.id).map(nb), iast: d1.iast.map(nb), lang: s.code, label: 'Doha 1, the opening line' }}
      />

      <Section id="hc-text" tone="band" eyebrow="43 lines" title="The full text">
        <div className="hc-controls hc-noprint">
          <ScriptToggle native={{ code: s.code, label: s.native }} />
        </div>
        <p className="hc-note">{COPY[script].spelling}</p>

        <div className="hc-read hc-gap">
          <aside className="hc-read-aside" aria-label="Mala: one bead for each line">
            <Mala
              beads={beads('en', 'anchor')}
              locale="en"
              mode="anchor"
              currentId="hc.d1"
              label="Mala of 43 beads, one for each line"
              caption="One bead for each of the 43 lines. Tap a bead to go to its line."
            >
              <span className="hc-mala-name" lang={s.code}>
                {s.native}
              </span>
              <span className="hc-mala-sub">Hanuman Chalisa</span>
            </Mala>
          </aside>
          <FullText units={units} locale="en" script={s.code} />
        </div>
      </Section>

      <Section id="hc-scripts" title="The same words in other letters" className="hc-noprint">
        <LinkCards
          columns={3}
          items={[
            {
              href: HUB_PATH,
              kicker: 'English letters',
              title: 'Hanuman Chalisa in English',
              body: <span>{c1.iast[0]}</span>,
              location: 'script_other_english',
            },
            ...SCRIPT_LIST.filter((o) => o.key !== script).map((o) => ({
              href: o.path,
              kicker: <span lang={o.code}>{o.native}</span>,
              title: `Hanuman Chalisa in ${o.name}`,
              body: (
                <span lang={`awa-${TAG[o.code]}`} className={`hc-card-script hc-card-script--${o.code}`}>
                  {scriptLines(o.code, c1.id)[0].replace(/\s*[।॥]\s*$/, '')}
                </span>
              ),
              location: `script_other_${o.key}`,
            })),
            {
              href: HUB_PATH_HI,
              hrefLang: 'hi',
              kicker: <span lang="hi">हिंदी</span>,
              title: <span lang="hi">हनुमान चालीसा अर्थ सहित</span>,
              body: (
                <span lang="awa" className="hc-card-script">
                  {c1.awadhi[0].replace(/\s*[।॥]\s*$/, '')}
                </span>
              ),
              location: 'script_other_hindi',
            },
          ]}
        />
      </Section>

      <Section id="hc-faq" tone="band" title="Questions people ask">
        <Faq items={faq} />
      </Section>

      <Section className="hc-next">
        <LinkCards
          items={[
            {
              href: LEARN_PATH,
              title: 'Learn it by heart, 4 lines a day',
              body: 'Eleven evenings with your family, in English letters',
              location: 'script_learn',
            },
            {
              href: PDF_PATH,
              title: 'Every PDF in one place',
              body: 'English, Devanagari, Telugu, Gujarati, Kannada and a kids’ sheet',
              location: 'script_pdf_page',
            },
          ]}
        />
        <NextStep locale="en" pageKey={`hc-${script}`} placement="script_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
        <Sources locale="en" />
        <p className="hc-small">
          The {s.name} letters are a letter-for-letter rendering of the verified Devanagari text, made with the open Sanscript
          transliteration tables.
        </p>
      </Section>
    </main>
  )
}

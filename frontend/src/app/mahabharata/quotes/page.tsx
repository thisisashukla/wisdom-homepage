import type { Metadata } from 'next'
import Shell, { Band } from '@/components/funnels/mahabharata/Shell'
import LineCard from '@/components/funnels/mahabharata/LineCard'
import GitaLink from '@/components/funnels/mahabharata/GitaLink'
import Faq from '@/components/funnels/mahabharata/Faq'
import NextBlock from '@/components/funnels/mahabharata/NextBlock'
import { heroLineOf, line } from '@/lib/funnels/mahabharata/lines'
import { PATHS, abs, articleLd, breadcrumbLd, faqLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'

const PAGE = 'mbh-quotes'
const PATH = PATHS.quotes
const CARD = 'mbh-5-39-9'
const TITLE = 'Mahabharata Quotes in Sanskrit, With Verse Numbers'
const DESC =
  '25 real lines from the Mahabharata, each with its Sanskrit, who says it, plain English and verse number. From Vidura, Yudhishthira, Draupadi and Karna.'

export const metadata: Metadata = meta({ title: TITLE, description: DESC, path: PATH, cardId: CARD })

const GROUPS: { id: string; h: string; lede: string; ids: string[] }[] = [
  { id: 'life', h: 'On life and death', lede: 'Three answers from the Yaksha\'s lake.', ids: ['mbh.3.314.118', 'mbh.3.314.119', 'mbh.3.314.62'] },
  { id: 'anger', h: 'On anger and desire', lede: 'What to give up, and what it costs to keep.', ids: ['mbh.3.314.94', 'mbh.3.314.80', 'mbh.5.39.73', 'mbh.12.221.48', 'mbh.5.33.85'] },
  { id: 'dharma', h: 'On dharma', lede: 'Including the line the Supreme Court of India took as its motto, said by a king who would not follow it.', ids: ['mbh.5.39.9', 'mbh.3.314.131', 'mbh.5.40.12', 'mbh.13.175.8', 'mbh.3.31.2'] },
  { id: 'self', h: 'On yourself', lede: 'Two of these are women\'s voices: Draupadi in the forest and Vidula, as Kunti tells it.', ids: ['mbh.3.32.58', 'mbh.3.32.3', 'mbh.5.133.15', 'mbh.5.34.65', 'mbh.5.36.13'] },
  { id: 'people', h: 'On speech and other people', lede: 'Mostly Vidura, who knew what it was to say the unwelcome thing.', ids: ['mbh.5.37.15', 'mbh.5.35.70', 'mbh.5.33.56', 'mbh.3.314.76'] },
  { id: 'karna', h: 'Karna\'s word', lede: 'What he told Krishna, and what he promised Kunti.', ids: ['mbh.5.141.12', 'mbh.5.146.23'] },
  { id: 'human', h: 'On being human', lede: 'From the Shanti Parva, as Bhishma tells it.', ids: ['mbh.12.305.20'] },
]

const FAQ = [
  { q: 'Which Mahabharata line is quoted most often?', a: 'Many would name "yato dharmas tato jayaḥ", where dharma is, there is victory. It is the motto of the Supreme Court of India. In the epic, Dhritarashtra says it to Vidura in the same breath as refusing to give up his son (MBh 5.39.9).' },
  { q: 'Are these quotes really from the Mahabharata?', a: 'Each line here is shown in the Sanskrit of the text, with its book, chapter and verse number. Lines often shared online as Mahabharata quotes without a reference are best checked before you post them.' },
  { q: 'Who says the most lines in the Mahabharata?', a: 'The epic is told by narrators inside narrators, but among those who speak in it, Bhishma, on his bed of arrows, teaches at the greatest length, across the Shanti and Anushasana Parvas.' },
  { q: 'Is "dharmo rakshati rakshitah" from the Mahabharata?', a: 'Yes. Yudhishthira says it to the Yaksha: dharma destroyed destroys, dharma protected protects (MBh 3.314.131).' },
]

export default function Page() {
  const all = GROUPS.flatMap((g) => g.ids)
  const ld = graph(
    articleLd({ headline: '25 lines from the Mahabharata, in Sanskrit', description: DESC, path: PATH, image: ogImage(CARD) }),
    {
      '@type': 'ItemList',
      name: 'Mahabharata quotes with Sanskrit and verse numbers',
      numberOfItems: all.length,
      itemListElement: all.map((id, i) => {
        const l = line(id)
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Quotation',
            text: l.en,
            inLanguage: 'en',
            spokenByCharacter: { '@type': 'Person', name: l.speaker.en.split(/ to |,/)[0].replace(/^The /, '') },
            isBasedOn: { '@type': 'CreativeWork', name: `Mahabharata ${l.ref.replace('MBh ', '')}`, text: l.deva.replace(/\n/g, ' '), inLanguage: 'sa' },
            url: `${abs(PATH)}#${'mbh-' + id.slice(4).replace(/\./g, '-')}`,
          },
        }
      }),
    },
    faqLd(FAQ),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Mahabharata', path: PATHS.hub },
      { name: 'Quotes', path: PATH },
    ]),
  )
  return (
    <Shell
      page={PAGE}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Mahabharata', href: PATHS.hub }, { label: 'Quotes' }]}
      jsonLd={ld}
      hero={{
        eyebrow: '25 lines, every one with its verse',
        h1: <>Mahabharata quotes, in the epic&apos;s own Sanskrit</>,
        line: heroLineOf('mbh.5.39.9'),
        facts: [`${all.length} lines`, 'Speaker and verse number', 'Copy, WhatsApp or save as image'],
        cta: (
          <a href={`#${GROUPS[0].id}`} className="btn-read-gita btn-read-gita-primary" data-mp-location="quotes_hero_start">
            Read the {all.length} lines
          </a>
        ),
      }}
    >
      <Band className="mb-intro">
        <p id="quick-answer" className="tp-intro rv">
          These are 25 lines from the Mahabharata&apos;s Sanskrit, each with its verse number and the person who says it. Among them is
          &quot;Where dharma is, there is victory&quot;, which Dhritarashtra says while refusing to act on it (MBh 5.39.9). Copy a line, send it
          on WhatsApp, or save it as an image.
        </p>
        <nav aria-label="Themes on this page" className="rv">
          <ul className="mb-jump">
            {GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} data-mp-location={`quotes_jump_${g.id}`}>
                  {g.h.replace(/^On /, '').replace(/^./, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Band>

      {GROUPS.map((g, gi) => (
        <Band key={g.id} alt={gi % 2 === 0} id={g.id} mp={`quotes_${g.id}`} h={g.h} hId={`${g.id}-h`} lede={g.lede}>
          {g.ids.map((id) => (
            <LineCard key={id} line={line(id)} page={PAGE} path={PATH} />
          ))}
          {g.id === 'self' && (
            <ul className="mb-bridge rv">
              <li>
                <GitaLink href="/gita/chapter/6/verse/5" from="quotes_self" toRef="6.5" page={PAGE} locale="en">
                  Gita 6.5
                </GitaLink>
                <p>Lift yourself by yourself. Draupadi and Vidura both say a version of Krishna&apos;s line.</p>
              </li>
            </ul>
          )}
        </Band>
      ))}

      <Faq items={FAQ} heading="Questions people ask" alt={GROUPS.length % 2 === 0} />
      <NextBlock page={PAGE} alt={GROUPS.length % 2 === 1} />

      <Band className="mb-method" h="Sources and method" hId="method-h">
        <p>
          Every line comes from the Sanskrit we hold for books 3, 5, 12, 13 and 14, a southern-recension text whose numbering runs close to the
          Kumbhakonam edition. Verse numbers can differ from the Pune critical edition. The English is Wisdom&apos;s own, read with
          Nilakantha&apos;s commentary, with K. M. Ganguli&apos;s public-domain translation consulted.
        </p>
        <p>
          We leave out lines in these books that demean women, such as a few in the Anushasana Parva and in Vidura Niti, and say why on{' '}
          <a href={`${PATHS.vidura}#left-out`}>the Vidura Niti page</a>.
        </p>
        <p>Wisdom translation, edited by Ankur Shukla.</p>
      </Band>
    </Shell>
  )
}

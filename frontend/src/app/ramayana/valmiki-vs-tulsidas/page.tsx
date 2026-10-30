import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import { Crumbs, Faq, JsonLd, MethodEn } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, faqLd, pageMeta } from '@/lib/funnels/ramayana/seo'

const PAGE = 'ramayana-valmiki-vs-tulsidas'
const DESC = 'Valmiki Ramayana vs Ramcharitmanas: language, shape, how each tells Ram and Sita, scene by scene, and what the Ramayana: Part 1 film draws on.'

export const metadata: Metadata = pageMeta({
  title: 'Valmiki Ramayana vs Ramcharitmanas, and the film',
  description: DESC,
  path: PATHS.compare,
  locale: 'en',
  card: 'ram-conduct',
})

type Row = { k: string; v: string; t: string; scene?: string }

const ROWS: Row[] = [
  { k: 'Language', v: 'Sanskrit verse, mostly in the shloka metre.', t: 'Awadhi, an eastern form of Hindi, in chaupais broken by dohas.' },
  {
    k: 'When',
    v: 'Most scholars place its composition in the last centuries BCE.',
    t: 'Begun in samvat 1631 (1574 CE), the date Tulsidas gives in Bal Kand.',
  },
  {
    k: 'Shape',
    v: 'Seven kandas, about 24,000 shlokas by the traditional count.',
    t: 'Seven kands. In the Gita Press edition: Bal 361 dohas, Ayodhya 326, Aranya 46, Kishkindha 30, Sundar 60, Lanka 121, Uttar 130.',
  },
  {
    k: 'Who tells it',
    v: 'Narada tells Valmiki the story; Valmiki’s grief at a hunter’s arrow becomes the first shloka (Bala Kanda, sargas 1 and 2).',
    t: 'Tellers inside tellers: Shiva to Parvati, Kakbhushundi to Garuda, Yajnavalkya to Bharadvaj, and Tulsidas to his own readers.',
  },
  {
    k: 'Ram',
    v: 'Narada names him as the man of every virtue. He acts and grieves as a man, and his divinity surfaces in places, as when Brahma praises him after the war.',
    t: 'God from the first page. Tulsidas writes as a devotee, and Ram knows the purpose of every turn of the story.',
  },
  { k: 'Ahalya', v: 'Unseen in the hermitage, living on air (Bala Kanda 48 to 49).', t: 'A body of stone, freed by the dust of Ram’s feet (Bal Kand).', scene: 'ahalya' },
  { k: 'The bow', v: 'Janaka has the bow brought for Ram; earlier suitors had failed on other days (Bala Kanda 66 to 67).', t: 'A full assembly where ten thousand kings fail together (Bal Kand).', scene: 'sita-swayamvar-bow' },
  { k: 'Kaikeyi', v: 'Manthara works on her fear (Ayodhya Kanda 7 to 9).', t: 'The gods send Saraswati to turn Manthara’s mind (Ayodhya Kand 12).', scene: 'kaikeyi-boons' },
  { k: 'At the river', v: 'Guha’s men bring a boat (Ayodhya Kanda 52).', t: 'The boatman washes Ram’s feet and takes no fare (Ayodhya Kand 100).', scene: 'kevat' },
  { k: 'Sita before the abduction', v: 'Sita herself is taken (Aranya Kanda 49).', t: 'The real Sita waits in the fire and her reflection is taken (Aranya Kand 24).', scene: 'sita-into-the-fire' },
  { k: 'The golden deer', v: 'Lakshman warns that it is Maricha (Aranya Kanda 43).', t: 'Ram knows the whole reason and goes gladly (Aranya Kand 27).', scene: 'golden-deer' },
  { k: 'Lakshman Rekha', v: 'No line. Lakshman leaves Sita with a blessing (Aranya Kanda 45).', t: 'No line in the scene; Mandodari mentions one later (Lanka Kand).', scene: 'lakshman-rekha' },
  { k: 'Shabari', v: 'Offers forest food she gathered (Aranya Kanda 74).', t: 'Offers roots and fruit; Ram teaches her nine kinds of devotion (Aranya Kand 34 to 36).', scene: 'shabari' },
  {
    k: 'Sita’s exile',
    v: 'Told in the Uttara Kanda, which many scholars read as a later layer of the text.',
    t: 'The Uttar Kand closes with Ram’s reign and teaching, and Sita’s exile is left out.',
  },
]

const FAQ = [
  {
    q: 'What is the difference between Valmiki Ramayana and Ramcharitmanas?',
    a: 'Valmiki’s Ramayana is the Sanskrit epic in seven kandas, where Ram acts and grieves as a man. Tulsidas’s Ramcharitmanas, begun in 1574, retells it in Awadhi as a devotee for whom Ram is God from the first page. Tulsidas adds or changes scenes such as Ahalya as stone, the boatman washing Ram’s feet, and Sita waiting in the fire.',
  },
  {
    q: 'Who wrote the Ramcharitmanas, and when?',
    a: 'Tulsidas. In Bal Kand he gives the year he began: samvat 1631, which is 1574 CE.',
  },
  {
    q: 'How many kands are in the Ramcharitmanas?',
    a: 'Seven: Bal, Ayodhya, Aranya, Kishkindha, Sundar, Lanka and Uttar. Valmiki’s Ramayana also has seven kandas, with Yuddha for Lanka and Uttara for Uttar.',
  },
  {
    q: 'Does the Ramcharitmanas tell of Sita’s exile?',
    a: 'No. Tulsidas’s Uttar Kand closes with Ram’s reign, his teaching and the dialogue of Kakbhushundi and Garuda. Sita’s exile is told in Valmiki’s Uttara Kanda.',
  },
  {
    q: 'Which version does the film Ramayana: Part 1 follow?',
    a: 'The makers have not published a list of their sources. From the trailers it shows the bow, Kaikeyi’s demand, the exile, Shurpanakha and Sita’s abduction, which are in both texts. Where it shows scenes such as Kevat or the Lakshman Rekha, it is drawing on Tulsidas and later tellings.',
  },
]

export default function ComparePage() {
  return (
    <Shell locale="en">
      <BlogTracker pageName={PAGE} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Wisdom', path: '/' },
            { name: 'Ramayana', path: PATHS.hub },
            { name: 'Valmiki and Tulsidas', path: PATHS.compare },
          ]),
          articleLd({
            headline: 'Valmiki Ramayana and the Ramcharitmanas, side by side',
            description: DESC,
            path: PATHS.compare,
            locale: 'en',
            about: ['Valmiki Ramayana', 'Ramcharitmanas', 'Tulsidas', 'Valmiki', 'Ramayana: Part 1'],
          }),
          faqLd(FAQ),
        ]}
      />
      <Crumbs label="Breadcrumb" items={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana', href: PATHS.hub }, { name: 'Valmiki and Tulsidas' }]} />

      <header className="rl-hero">
        <h1 className="rl-h1">Valmiki and Tulsidas, side by side</h1>
        <p className="rl-promise">Two tellings of one story, and the film between them.</p>
        <div className="rl-shore" aria-hidden="true" />
        <p className="rl-quick" id="quick-answer">
          Valmiki&apos;s Ramayana is the Sanskrit epic in seven kandas, opening with Narada naming a man of every virtue. Tulsidas&apos;s
          Ramcharitmanas is an Awadhi retelling begun in 1574 (samvat 1631, Bal Kand), told by Shiva to Parvati, with Ram as God
          throughout. Many families in North India know the story through Tulsidas and the television Ramayan, which is why so many
          well-known scenes turn out to be his.
        </p>
      </header>

      <section className="rl-section" aria-labelledby="table">
        <h2 className="rl-h2" id="table">
          The two texts
        </h2>
        <div className="rl-table-wrap" role="region" aria-labelledby="table" tabIndex={0}>
          <table className="rl-table">
            <caption>Scene rows link to the full check with the original lines.</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="rl-sr">Topic</span>
                </th>
                <th scope="col" className="rl-th-v">
                  Valmiki Ramayana
                </th>
                <th scope="col" className="rl-th-t">
                  Ramcharitmanas
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.k}>
                  <th scope="row">{r.scene ? <a href={PATHS.scene(r.scene)}>{r.k}</a> : r.k}</th>
                  <td>{r.v}</td>
                  <td>{r.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rl-section" aria-labelledby="film">
        <h2 className="rl-h2" id="film">
          What the film draws on
        </h2>
        <p className="rl-p">
          The makers of Ramayana: Part 1 have not published a list of the texts they used, and reports on the credits name
          screenwriter Shridhar Raghavan for the story. The trailers show Ram breaking Shiva&apos;s bow (
          <a href="https://www.esquireindia.co.in/entertainment/at-the-movies/whos-playing-who-in-ramayana-part-1-and-a-few-things-the-trailer-holds-back" target="_blank" rel="noopener">
            Esquire India, 31 Jul 2026
          </a>
          ), and Ram accepting Kaikeyi&apos;s wish, the exile, Shurpanakha&apos;s encounter with the brothers and Sita&apos;s
          abduction (
          <a href="https://www.esquireindia.co.in/entertainment/at-the-movies/ramayana-part-1-trailer-ranbir-kapoors-epic-journey-from-ayodhya-to-lanka-unveiled" target="_blank" rel="noopener">
            Esquire India, 30 Jul 2026
          </a>
          ). Every one of these is in both Valmiki and Tulsidas.
        </p>
        <p className="rl-p">
          Part 1 reportedly ends near Sita&apos;s abduction, with Hanuman arriving only at the end (
          <a href="https://www.theweek.in/news/entertainment/2026/09/01/ramayana-part-1-sunny-deol-hanuman-surprise.html" target="_blank" rel="noopener">
            The Week, 1 Sep 2026
          </a>
          ). If the film shows Ahalya as a stone, the boatman washing Ram&apos;s feet or a drawn Lakshman Rekha, it is following
          Tulsidas and the tellings that came after him. If it shows Lakshman warning that the deer is Maricha, or Sita taken in
          person, it is following Valmiki. Both are old and loved; the pages below show the lines.
        </p>
        <p className="rl-p">
          <a href={PATHS.original} data-mp-location="to_original">
            Check eleven film scenes against both texts
          </a>
        </p>
      </section>

      <section className="rl-section" aria-labelledby="reading">
        <h2 className="rl-h2" id="reading">
          Reading them alongside the Gita
        </h2>
        <p className="rl-p">
          Both texts keep returning to what the Bhagavad Gita teaches outright: do your part, hold the result loosely, and stay
          steady when things come and go. Bharata ruling from Nandigram without calling the kingdom his is{' '}
          <a className="rl-gold" href="/gita/chapter/2/verse/71" data-mp-location="gita_2_71">
            Gita 2.71
          </a>{' '}
          in practice, and Jatayu fighting a fight he could not win is{' '}
          <a className="rl-gold" href="/gita/chapter/2/verse/47" data-mp-location="gita_2_47">
            Gita 2.47
          </a>
          .
        </p>
      </section>

      <div className="rl-next">
        <NextStep funnel="ramayana" locale="en" pageName={PAGE} pageKey="ramayana-compare" placement="end" copy={NEXT_COPY.en} />
      </div>

      <Faq heading="Questions people ask" qas={FAQ} />
      <MethodEn />
    </Shell>
  )
}

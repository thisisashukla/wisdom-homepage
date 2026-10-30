import type { Metadata } from 'next'
import Shell from '@/components/funnels/mahabharata/Shell'
import LineCard from '@/components/funnels/mahabharata/LineCard'
import GitaLink from '@/components/funnels/mahabharata/GitaLink'
import Faq from '@/components/funnels/mahabharata/Faq'
import NextBlock from '@/components/funnels/mahabharata/NextBlock'
import YakshaQuiz from '@/components/funnels/mahabharata/YakshaQuiz'
import { line } from '@/lib/funnels/mahabharata/lines'
import { CHOICE, LAST_FOUR, QA_PAIRS, QUIZ } from '@/lib/funnels/mahabharata/yaksha'
import { PATHS, articleLd, breadcrumbLd, faqLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'

const PAGE = 'mbh-yaksha'
const PATH = PATHS.yaksha
const CARD = 'mbh-3-314-118'
const TITLE = 'Yaksha Prashna: The Questions, Answers and Sanskrit'
const DESC =
  'Every question the Yaksha asks Yudhishthira at the lake, with the Sanskrit, plain English and verse numbers (MBh 3.314), plus a 10-question quiz.'

export const metadata: Metadata = meta({ title: TITLE, description: DESC, path: PATH, cardId: CARD })

const FAQ = [
  { q: 'What is the Yaksha prashna?', a: 'The questions a yaksha puts to Yudhishthira at a lake in the forest, in the Vana Parva. The yaksha has struck down his four brothers for drinking without answering. Yudhishthira answers every question, and they live again (MBh 3.314).' },
  { q: 'Who was the Yaksha?', a: 'Dharma, Yudhishthira\'s own father, who came to test him. "I am your father, child: Dharma," he says once the questions are done (MBh 3.315.6).' },
  { q: 'What is the greatest wonder, according to Yudhishthira?', a: 'That every day living beings go to the house of death, and those left behind still want to stay forever (MBh 3.314.118).' },
  { q: 'Why did Yudhishthira choose Nakula?', a: 'Kunti still had a son living in Yudhishthira himself; Madri would have none. "As Kunti is, so is Madri. I want the same for both my mothers" (MBh 3.314.135). Pleased by that fairness, the yaksha brings all four brothers back.' },
  { q: 'Where is the Yaksha prashna in the Mahabharata?', a: 'Near the end of the Vana Parva, the third book. Our Sanskrit numbers the chapters 3.313 to 3.315; in the Pune critical edition the questions are in chapter 297.' },
  { q: 'What boons did Dharma give Yudhishthira?', a: 'The fire-sticks a deer had carried off from a brahmana, a thirteenth year in which no one would recognise the Pandavas, and, for the third, the boon Yudhishthira asked: to overcome greed, delusion and anger, and keep his mind on giving, tapas and truth (MBh 3.315.24).' },
]

export default function Page() {
  const refs = Object.fromEntries(QUIZ.map((q) => [q.lineId, line(q.lineId).ref]))
  const ld = graph(
    articleLd({ headline: 'Yaksha prashna: the questions at the lake', description: DESC, path: PATH, image: ogImage(CARD), about: 'Mahabharata, Vana Parva' }),
    faqLd(FAQ),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Mahabharata', path: PATHS.hub },
      { name: 'Yaksha prashna', path: PATH },
    ]),
  )
  return (
    <Shell page={PAGE} crumbs={[{ label: 'Home', href: '/' }, { label: 'Mahabharata', href: PATHS.hub }, { label: 'Yaksha prashna' }]} jsonLd={ld}>
      <header className="mb-head">
        <p className="mb-kicker">Vana Parva, at the lake</p>
        <h1>The Yaksha&apos;s questions</h1>
        <p id="quick-answer">
          The Yaksha prashna is the dialogue at a poisoned lake in the Vana Parva. A yaksha has struck down four of the Pandavas, and
          Yudhishthira answers his questions to win them back. Asked for the greatest wonder, he says people watch others die every day and
          still expect to live forever (MBh 3.314.118).
        </p>
        <p className="mb-sub">
          It is the twelfth year of exile. Thirsty, the brothers go one by one to a lake, ignore a voice that tells them to answer first, drink,
          and fall. Yudhishthira comes last, and stops to listen.
        </p>
      </header>

      <section className="mb-sec" aria-labelledby="qa-h" data-mp-section="yaksha_qa">
        <h2 id="qa-h">Question and answer</h2>
        <p className="mb-lede">In the order the Yaksha asks them. The question first, then Yudhishthira&apos;s answer.</p>
        {QA_PAIRS.map((p) => (
          <div className="mb-qa" key={p.q}>
            <h3>{p.topic}</h3>
            <LineCard line={line(p.q)} page={PAGE} path={PATH} label="The Yaksha asks" actions={false} />
            <LineCard line={line(p.a)} page={PAGE} path={PATH} label="Yudhishthira answers" />
          </div>
        ))}
      </section>

      <section className="mb-sec" aria-labelledby="four-h" data-mp-section="yaksha_last_four">
        <h2 id="four-h">The last four questions</h2>
        <p className="mb-lede">Answer these, the Yaksha says, and your brothers may live.</p>
        <LineCard line={line(LAST_FOUR.q)} page={PAGE} path={PATH} label="The Yaksha asks" actions={false} />
        <LineCard line={line(LAST_FOUR.a[0])} page={PAGE} path={PATH} label="Who is happy" />
        <LineCard line={line(LAST_FOUR.a[1])} page={PAGE} path={PATH} label="The wonder" />
        <LineCard line={line(LAST_FOUR.a[2])} page={PAGE} path={PATH} label="The path" />
        <LineCard line={line(LAST_FOUR.a[3])} page={PAGE} path={PATH} label="The news" />
        <ul className="mb-bridge">
          <li>
            <GitaLink href="/gita/chapter/2/verse/27" from="yaksha_wonder" toRef="2.27" page={PAGE} locale="en">
              Gita 2.27
            </GitaLink>
            <p>&quot;For the born, death is certain.&quot; Krishna tells Arjuna the same fact the Yaksha&apos;s wonder turns on.</p>
          </li>
        </ul>
      </section>

      <section className="mb-sec" aria-labelledby="choice-h" data-mp-section="yaksha_choice">
        <h2 id="choice-h">One brother may live</h2>
        <p className="mb-lede">Pleased with the answers, the Yaksha offers one brother back. Yudhishthira asks for Nakula, and the Yaksha asks why.</p>
        <LineCard line={line(CHOICE.yaksha)} page={PAGE} path={PATH} label="The Yaksha asks" actions={false} />
        {CHOICE.answer.map((id) => (
          <LineCard key={id} line={line(id)} page={PAGE} path={PATH} label="Yudhishthira answers" />
        ))}
      </section>

      <section className="mb-sec" aria-labelledby="who-h" data-mp-section="yaksha_reveal">
        <h2 id="who-h">Who the Yaksha was</h2>
        <p className="mb-lede">
          All four brothers rise. The Yaksha is Dharma, Yudhishthira&apos;s father, and he offers boons. For the last, Yudhishthira asks for
          nothing outside himself.
        </p>
        {CHOICE.reveal.map((id) => (
          <LineCard key={id} line={line(id)} page={PAGE} path={PATH} />
        ))}
        <ul className="mb-bridge">
          <li>
            <GitaLink href="/gita/chapter/16/verse/21" from="yaksha_boon" toRef="16.21" page={PAGE} locale="en">
              Gita 16.21
            </GitaLink>
            <p>Desire, anger and greed: the three gates Krishna tells Arjuna to close, the same three Yudhishthira asks to overcome.</p>
          </li>
        </ul>
      </section>

      <section className="mb-sec" id="quiz" aria-labelledby="quiz-h" data-mp-section="yaksha_quiz">
        <h2 id="quiz-h">Could you answer the Yaksha?</h2>
        <p className="mb-lede">Ten questions from the lake. Each answer shows its verse.</p>
        <YakshaQuiz quiz={QUIZ} refs={refs} page={PAGE} />
      </section>

      <Faq items={FAQ} heading="Questions people ask" />
      <NextBlock page={PAGE} />

      <section className="mb-sec mb-method" aria-labelledby="method-h">
        <h2 id="method-h">Sources and method</h2>
        <p>
          Sanskrit from a southern-recension text of the Vana Parva, chapters 313 to 315 in its numbering. Where the digital text had obvious
          typing errors we restored the standard reading and kept a record of each change. The English is Wisdom&apos;s own, read with
          Nilakantha&apos;s commentary, with K. M. Ganguli&apos;s public-domain translation consulted.
        </p>
        <p>Wisdom translation, edited by Ankur Shukla.</p>
        <p>
          More from the epic: <a href={PATHS.hub}>the family tree</a>, <a href={PATHS.character('yudhishthira')}>Yudhishthira</a>,{' '}
          <a href={PATHS.quotes}>25 lines from the Mahabharata</a>.
        </p>
      </section>
    </Shell>
  )
}

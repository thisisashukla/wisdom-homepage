import type { Metadata } from 'next'
import Shell, { Band } from '@/components/funnels/mahabharata/Shell'
import LineCard from '@/components/funnels/mahabharata/LineCard'
import GitaLink from '@/components/funnels/mahabharata/GitaLink'
import Faq from '@/components/funnels/mahabharata/Faq'
import NextBlock from '@/components/funnels/mahabharata/NextBlock'
import YakshaQuiz from '@/components/funnels/mahabharata/YakshaQuiz'
import { heroLineOf, line } from '@/lib/funnels/mahabharata/lines'
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
    <Shell
      page={PAGE}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Mahabharata', href: PATHS.hub }, { label: 'Yaksha prashna' }]}
      jsonLd={ld}
      hero={{
        eyebrow: 'Vana Parva, at the lake',
        h1: 'The Yaksha\'s questions',
        line: heroLineOf('mbh.3.314.118'),
        facts: ['MBh 3.313 to 3.315', 'Sanskrit with verse numbers', '10-question quiz'],
        cta: (
          <a href="#quiz" className="btn-read-gita btn-read-gita-primary" data-mp-location="yaksha_hero_quiz">
            Try the 10-question quiz
          </a>
        ),
      }}
    >
      <Band className="mb-intro">
        <p id="quick-answer" className="tp-intro rv">
          The Yaksha prashna is the dialogue at a poisoned lake in the Vana Parva. A yaksha has struck down four of the Pandavas, and
          Yudhishthira answers his questions to win them back. Asked for the greatest wonder, he says people watch others die every day and
          still expect to live forever (MBh 3.314.118).
        </p>
        <p className="mb-sub rv">
          It is the twelfth year of exile. Thirsty, the brothers go one by one to a lake, ignore a voice that tells them to answer first, drink,
          and fall. Yudhishthira comes last, and stops to listen.
        </p>
      </Band>

      <Band alt mp="yaksha_qa" h="Question and answer" hId="qa-h" lede={<>In the order the Yaksha asks them. The question first, then Yudhishthira&apos;s answer.</>}>
        {QA_PAIRS.map((p) => (
          <div className="mb-qa rv" key={p.q}>
            <h3>{p.topic}</h3>
            <LineCard line={line(p.q)} page={PAGE} path={PATH} label="The Yaksha asks" actions={false} className="mb-ask" />
            <LineCard line={line(p.a)} page={PAGE} path={PATH} label="Yudhishthira answers" />
          </div>
        ))}
      </Band>

      <Band mp="yaksha_last_four" h="The last four questions" hId="four-h" lede="Answer these, the Yaksha says, and your brothers may live.">
        <LineCard line={line(LAST_FOUR.q)} page={PAGE} path={PATH} label="The Yaksha asks" actions={false} className="mb-ask" />
        <LineCard line={line(LAST_FOUR.a[0])} page={PAGE} path={PATH} label="Who is happy" />
        <LineCard line={line(LAST_FOUR.a[1])} page={PAGE} path={PATH} label="The wonder" />
        <LineCard line={line(LAST_FOUR.a[2])} page={PAGE} path={PATH} label="The path" />
        <LineCard line={line(LAST_FOUR.a[3])} page={PAGE} path={PATH} label="The news" />
        <ul className="mb-bridge rv">
          <li>
            <GitaLink href="/gita/chapter/2/verse/27" from="yaksha_wonder" toRef="2.27" page={PAGE} locale="en">
              Gita 2.27
            </GitaLink>
            <p>&quot;For the born, death is certain.&quot; Krishna tells Arjuna the same fact the Yaksha&apos;s wonder turns on.</p>
          </li>
        </ul>
      </Band>

      <Band
        alt
        mp="yaksha_choice"
        h="One brother may live"
        hId="choice-h"
        lede="Pleased with the answers, the Yaksha offers one brother back. Yudhishthira asks for Nakula, and the Yaksha asks why."
      >
        <LineCard line={line(CHOICE.yaksha)} page={PAGE} path={PATH} label="The Yaksha asks" actions={false} className="mb-ask" />
        {CHOICE.answer.map((id) => (
          <LineCard key={id} line={line(id)} page={PAGE} path={PATH} label="Yudhishthira answers" />
        ))}
      </Band>

      <Band
        mp="yaksha_reveal"
        h="Who the Yaksha was"
        hId="who-h"
        lede={
          <>
            All four brothers rise. The Yaksha is Dharma, Yudhishthira&apos;s father, and he offers boons. For the last, Yudhishthira asks for
            nothing outside himself.
          </>
        }
      >
        {CHOICE.reveal.map((id) => (
          <LineCard key={id} line={line(id)} page={PAGE} path={PATH} />
        ))}
        <ul className="mb-bridge rv">
          <li>
            <GitaLink href="/gita/chapter/16/verse/21" from="yaksha_boon" toRef="16.21" page={PAGE} locale="en">
              Gita 16.21
            </GitaLink>
            <p>Desire, anger and greed: the three gates Krishna tells Arjuna to close, the same three Yudhishthira asks to overcome.</p>
          </li>
        </ul>
      </Band>

      <Band alt id="quiz" mp="yaksha_quiz" h="Could you answer the Yaksha?" hId="quiz-h" lede="Ten questions from the lake. Each answer shows its verse.">
        <div className="rv">
          <YakshaQuiz quiz={QUIZ} refs={refs} page={PAGE} />
        </div>
      </Band>

      <Faq items={FAQ} heading="Questions people ask" />
      <NextBlock page={PAGE} alt />

      <Band className="mb-method" h="Sources and method" hId="method-h">
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
      </Band>
    </Shell>
  )
}

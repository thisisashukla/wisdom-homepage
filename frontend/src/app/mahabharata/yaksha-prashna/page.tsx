import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, NextStep, PageHero, Section, VerseList } from '@/components/site'
import Line from '@/components/funnels/mahabharata/Line'
import YakshaQuiz from '@/components/funnels/mahabharata/YakshaQuiz'
import { heroVerseOf, line } from '@/lib/funnels/mahabharata/lines'
import { CHOICE, LAST_FOUR, QA_PAIRS, QUIZ } from '@/lib/funnels/mahabharata/yaksha'
import { NEXT } from '@/lib/funnels/mahabharata/next'
import { PATHS, articleLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'
import '@/components/funnels/mahabharata/mbh.css'

const PAGE_KEY = 'mbh-yaksha'
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
  const ld = graph(articleLd({ headline: 'Yaksha prashna: the questions at the lake', description: DESC, path: PATH, image: ogImage(CARD), about: 'Mahabharata, Vana Parva' }))
  const L = (id: string, label?: string, actions = true) => (
    <Line as="li" line={line(id)} path={PATH} pageKey={PAGE_KEY} label={label} actions={actions} className={actions ? undefined : 'mb-ask'} />
  )
  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Mahabharata Yaksha Prashna" />
      <main className="fx-mbh" lang="en">
        <PageHero
          crumbs={[
            { label: 'Mahabharata', href: PATHS.hub },
            { label: 'Yaksha prashna', href: PATH },
          ]}
          eyebrow="Vana Parva, at the lake"
          title="The Yaksha's questions"
          facts={['MBh 3.313 to 3.315', 'Twelfth year of exile']}
          actions={[{ href: '#quiz', label: 'Try the 10-question quiz', location: 'yaksha_hero_quiz' }]}
          verse={heroVerseOf('mbh.3.314.118')}
        />

        <Section spacing="tight">
          <div className="sx-prose rv">
            <p id="quick-answer">
              The Yaksha prashna is the dialogue at a poisoned lake in the Vana Parva. A yaksha has struck down four of the Pandavas, and
              Yudhishthira answers his questions to win them back. Asked for the greatest wonder, he says people watch others die every day and
              still expect to live forever (MBh 3.314.118).
            </p>
            <p>
              It is the twelfth year of exile. Thirsty, the brothers go one by one to a lake, ignore a voice that tells them to answer first, drink,
              and fall. Yudhishthira comes last, and stops to listen.
            </p>
          </div>
        </Section>

        <Section tone="band" track="yaksha_qa" title="Question and answer" intro={<>In the order the Yaksha asks them. The question first, then Yudhishthira&apos;s answer.</>} width="narrow">
          <div className="mb-qas">
            {QA_PAIRS.map((p) => (
              <div className="mb-qa rv" key={p.q}>
                <h3 className="sx-h3">{p.topic}</h3>
                <VerseList>
                  {L(p.q, 'The Yaksha asks', false)}
                  {L(p.a, 'Yudhishthira answers')}
                </VerseList>
              </div>
            ))}
          </div>
        </Section>

        <Section track="yaksha_last_four" title="The last four questions" intro="Answer these, the Yaksha says, and your brothers may live." width="narrow">
          <VerseList>
            {L(LAST_FOUR.q, 'The Yaksha asks', false)}
            {L(LAST_FOUR.a[0], 'Who is happy')}
            {L(LAST_FOUR.a[1], 'The wonder')}
            {L(LAST_FOUR.a[2], 'The path')}
            {L(LAST_FOUR.a[3], 'The news')}
          </VerseList>
          <GitaBridge
            className="mb-after rv"
            href="/gita/chapter/2/verse/27"
            location="yaksha_wonder"
            label="Gita 2.27"
            why={<>&quot;For the born, death is certain.&quot; Krishna tells Arjuna the same fact the Yaksha&apos;s wonder turns on.</>}
          />
        </Section>

        <Section
          tone="band"
          track="yaksha_choice"
          title="One brother may live"
          intro="Pleased with the answers, the Yaksha offers one brother back. Yudhishthira asks for Nakula, and the Yaksha asks why."
          width="narrow"
        >
          <VerseList>
            {L(CHOICE.yaksha, 'The Yaksha asks', false)}
            {CHOICE.answer.map((id) => (
              <Line key={id} as="li" line={line(id)} path={PATH} pageKey={PAGE_KEY} label="Yudhishthira answers" />
            ))}
          </VerseList>
        </Section>

        <Section
          track="yaksha_reveal"
          title="Who the Yaksha was"
          intro={
            <>
              All four brothers rise. The Yaksha is Dharma, Yudhishthira&apos;s father, and he offers boons. For the last, Yudhishthira asks for
              nothing outside himself.
            </>
          }
          width="narrow"
        >
          <VerseList>
            {CHOICE.reveal.map((id) => (
              <Line key={id} as="li" line={line(id)} path={PATH} pageKey={PAGE_KEY} />
            ))}
          </VerseList>
          <GitaBridge
            className="mb-after rv"
            href="/gita/chapter/16/verse/21"
            location="yaksha_boon"
            label="Gita 16.21"
            why="Desire, anger and greed: the three gates Krishna tells Arjuna to close, the same three Yudhishthira asks to overcome."
          />
        </Section>

        <Section tone="band" id="quiz" track="yaksha_quiz" title="Could you answer the Yaksha?" intro="Ten questions from the lake. See how many you would answer the way Yudhishthira did." width="narrow">
          <div className="rv">
            <YakshaQuiz quiz={QUIZ} refs={refs} />
          </div>
        </Section>

        <Section track="faq" title="Questions people ask" width="narrow">
          <Faq items={FAQ} />
        </Section>

        <Section tone="band" track="next_step" title={NEXT.en.head} width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={PAGE_KEY} placement="end" copy={NEXT.en.copy} />
          </div>
        </Section>

        <Section className="mb-method" title="Sources and method" width="narrow">
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
        </Section>
      </main>
    </>
  )
}

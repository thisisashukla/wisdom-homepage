import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import SiteFooter from '@/components/SiteFooter'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Section, VerseCard, VerseList } from '@/components/site'
import { getAllChapters } from '@/lib/gita'
import { CURIOUS_CONCEPTS, CURIOUS_NEXT, CURIOUS_START, HUB_PATH, curiousArticleLd, curiousCards } from '@/lib/curious'
import { gitaLines, verseProps } from '@/lib/gitaLines'
import { pageMeta } from '@/lib/seo'

const PATH = '/blogs/bhagavad-gita-for-beginners'
const TITLE = 'What Is the Bhagavad Gita? Who Wrote It, a Summary, and How to Start Reading'
const DESCRIPTION =
  'The Bhagavad Gita is a 700-verse Sanskrit dialogue in the Mahabharata, in which Krishna counsels the warrior Arjuna before a battle. Who wrote it, the 18 chapters in brief, and how to start reading.'

export const metadata: Metadata = {
  ...pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
  keywords:
    'what is the bhagavad gita, who wrote the bhagavad gita, bhagavad gita summary, how to read the bhagavad gita, bhagavad gita for beginners, bhagavad gita chapters, where to start bhagavad gita',
}

/** One honest line per chapter. Verse numbers checked against the site's verse files. */
const CHAPTER_LINES: Record<number, string> = {
  1: 'Arjuna sees teachers and kinsmen in both armies, puts down his bow and sinks into grief.',
  2: 'Krishna begins: the self does not die, act without craving results, and a portrait of the steady mind (2.55 to 2.72).',
  3: 'No one can live without acting, and work done as an offering frees where work done for gain binds (3.9).',
  4: 'Krishna speaks of his own descents whenever dharma declines (4.7) and of knowledge that burns action to ash (4.37).',
  5: 'Renouncing action and acting without attachment lead to the same place (5.5).',
  6: 'Meditation and the restless mind: lift yourself by yourself (6.5).',
  7: 'Krishna’s higher and lower nature, and the divine maya that is hard to cross (7.14).',
  8: 'The imperishable, and what the mind holds at the hour of death (8.5 to 8.6).',
  9: 'The royal secret: a leaf, a flower, a fruit or water, offered with love, is accepted (9.26).',
  10: 'Krishna names his glories: whatever shines springs from a spark of his radiance (10.41).',
  11: 'Arjuna sees the cosmic form, the vision behind Oppenheimer’s line (11.32).',
  12: 'The path of devotion, and the qualities of the devotee Krishna holds dear (12.13 onward).',
  13: 'The body as the field and the self as its knower (13.2).',
  14: 'The three qualities of nature, sattva, rajas and tamas, and going beyond them (14.5).',
  15: 'The world as a tree with roots above and branches below, and the Supreme Person (15.1).',
  16: 'Qualities that free and qualities that bind (16.5).',
  17: 'Three kinds of faith, and how they colour food, worship, discipline and giving (17.2).',
  18: 'Renunciation summed up, the call to take refuge (18.66), and Arjuna’s doubt gone (18.73).',
}

const FAQ = [
  {
    q: 'What is the Bhagavad Gita, in simple terms?',
    a: 'A conversation on a battlefield. The warrior Arjuna refuses to fight a war against his own family, and Krishna, his friend and charioteer, answers him over 18 chapters: on the self that does not die, on acting without clinging to results, on the steady mind, and on devotion to God.',
  },
  {
    q: 'Who wrote the Bhagavad Gita?',
    a: 'Hindu tradition credits the sage Vyasa, who is also credited with the Mahabharata. Scholars see the epic as the work of many hands over centuries. The Gita names no author and no date.',
  },
  {
    q: 'When was the Bhagavad Gita written?',
    a: 'Scholars most often date it to the second or first century BCE, with proposals ranging from about the fifth century BCE to the early centuries CE.',
  },
  {
    q: 'Is the Bhagavad Gita part of the Mahabharata?',
    a: 'Yes. It forms chapters 23 to 40 of the Bhishma Parva, the sixth book of the Mahabharata.',
  },
  {
    q: 'How many chapters and verses are there?',
    a: '18 chapters and 700 verses. Some editions count 701, because they number Arjuna’s opening question in chapter 13 as a verse.',
  },
  {
    q: 'How should a beginner start reading the Bhagavad Gita?',
    a: 'Read chapters 1 and 2 first, slowly, so you meet Arjuna’s crisis before Krishna’s answer. Choose one translation and stay with it. Read a few verses at a time with a question of your own in mind, and come back to verses that stay closed.',
  },
  {
    q: 'Do I need to be Hindu to read it?',
    a: 'No. Readers of every faith and of none have read it closely. It helps to know that it is scripture for Hindus, and to read it with the care that deserves.',
  },
]

export default async function WhatIsTheGitaPage() {
  const v = await gitaLines(['1.1', '2.7', '2.47', '6.5', '18.63'])
  const chapters = getAllChapters()
  const ld = curiousArticleLd({
    path: PATH,
    headline: 'What is the Bhagavad Gita, and how to start reading it',
    description: DESCRIPTION,
    datePublished: '2026-04-08',
    dateModified: '2026-11-11',
    about: ['Bhagavad Gita', 'Mahabharata'],
    citation: [
      { name: 'Bhagavad Gita, Wikipedia', url: 'https://en.wikipedia.org/wiki/Bhagavad_Gita' },
      { name: 'Bhagavad Gita, Encyclopaedia Britannica', author: 'Wendy Doniger', url: 'https://www.britannica.com/topic/Bhagavad-Gita' },
    ],
  })

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Gita For Beginners" />
      <main lang="en">
        <PageHero
          crumbs={[
            { label: 'Understand the Gita', href: HUB_PATH },
            { label: 'What is the Bhagavad Gita', href: PATH },
          ]}
          eyebrow="Start here"
          title="What is the Bhagavad Gita, and how to start reading it"
          sub="The Bhagavad Gita is a 700-verse Sanskrit poem in which Krishna counsels the warrior Arjuna, who has lost the will to fight on the morning of a great war. It sits in the sixth book of the Mahabharata; tradition credits the sage Vyasa, and scholars usually date it to the last centuries BCE."
          facts={['18 chapters, 700 verses', 'Krishna and Arjuna', 'Part of the Mahabharata']}
          actions={[
            { href: '#how-to-read', label: 'How to start reading', location: 'beginners_hero_how_to_read' },
            { href: '#summary', label: 'The 18 chapters in brief', location: 'beginners_hero_summary' },
          ]}
          verse={{ ...verseProps(v['1.1']), label: 'The first verse' }}
        />

        <Section spacing="tight" width="narrow" track="quick_answer">
          <div className="sx-prose rv" id="quick-answer">
            <p>
              On the page it is a conversation inside a conversation. Sanjaya, counsellor to the blind king Dhritarashtra, tells the king what is
              happening on the field of Kurukshetra, and the king’s question opens the book (1.1). On that field Arjuna looks across at
              teachers, grandfathers and cousins, lays down his bow, and asks Krishna, his friend and charioteer, to teach him what is right
              (2.7).
            </p>
            <p>
              The rest is Krishna’s answer: what the self is, how to act without being bound by results, how to steady the mind, how to love
              God, and what to do when duties collide. Because it is spoken to one man at one hard moment, each teaching lands on a real
              decision.
            </p>
          </div>
        </Section>

        <Section id="who-wrote" tone="band" track="who_wrote" title="Who wrote the Bhagavad Gita, and when" width="narrow">
          <div className="sx-prose rv">
            <p>
              Hindu tradition names Vyasa, the sage credited with the whole Mahabharata. Scholars read the epic
              as built up over centuries by many hands, and date the Gita variously: most often to the second or first century BCE, with
              proposals from about the fifth century BCE to the early centuries CE. The text itself names no author and gives no date.
            </p>
            <p>
              In the critical edition of the Mahabharata it forms chapters 23 to 40 of the Bhishma Parva, the sixth of the epic’s eighteen books.
              It has 18 chapters and 700 verses; some editions count 701, because they number Arjuna’s question at the start of chapter 13.
            </p>
            <p>
              For more than a thousand years it has been read with commentaries. The oldest that survives is Shankara’s; Ramanuja’s and
              Madhva’s followed, each reading the same verses from a different school.
            </p>
          </div>
        </Section>

        <Section id="summary" track="summary" title="The Bhagavad Gita in brief: 18 chapters" width="narrow" intro="A common way to read the whole: chapters 1 to 6 centre on action, 7 to 12 on devotion, 13 to 18 on knowledge.">
          <div className="sx-prose rv">
            <ol>
              {chapters.map((c) => (
                <li key={c.number}>
                  <a href={`/gita/chapter/${c.number}`} data-mp-location={`beginners_summary_ch${c.number}`}>
                    {c.enName}
                  </a>{' '}
                  ({c.totalVerses} verses). {CHAPTER_LINES[c.number]}
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="how-to-read" tone="band" track="how_to_read" title="How to start reading it" width="narrow">
          <div className="sx-prose rv">
            <h3>Begin at the beginning</h3>
            <p>
              Many readers skip chapter 1 to reach the teaching. Read it anyway. It is Arjuna’s own voice: what he sees, what happens in his body,
              his reasons for refusing. With that in your ears, chapter 2 reads as an answer to a person, and much of what follows builds on it,
              including <a href="/gita/chapter/2/verse/47" data-mp-location="beginners_link_2_47">2.47</a>, the best known line on work and its
              fruit.
            </p>
            <h3>Read slowly</h3>
            <p>
              A few verses at a sitting is enough. At one verse a day the whole takes about two years, and many readers find that pace gives
              each verse time to come back to them during the day.
            </p>
            <h3>Choose one translation, and stay with it</h3>
            <p>
              English translations differ a great deal in voice and in the school they follow. Eknath Easwaran’s is often suggested for a first
              reading; Bhaktivedanta Swami Prabhupada’s gives each verse with a long devotional commentary; Barbara Stoler Miller’s reads as
              poetry. Our <a href="/blogs/best-bhagavad-gita-translation" data-mp-location="beginners_link_best_translation">comparison of English
              translations</a> sets them side by side.
            </p>
            <h3>Bring a question</h3>
            <p>
              Arjuna came to Krishna with one. Readers who arrive with a decision, a loss or a restless mind tend to find the verses that speak
              to it. When a passage stays closed, mark it and move on; it often opens on a later reading.
            </p>
            <h3>Let the commentators help</h3>
            <p>
              Where a verse puzzles you, the old commentaries show how careful readers have taken it for centuries. Each verse page on this site
              gives the Sanskrit, a word-by-word gloss and a plain reading.
            </p>
          </div>
        </Section>

        <Section id="three-verses" track="three_verses" title="Three verses to begin with" width="narrow">
          <VerseList>
            <VerseCard {...verseProps(v['2.47'])} label="On work and its fruit" size="compact" as="li" toggle rv />
            <VerseCard {...verseProps(v['6.5'])} label="On lifting yourself" size="compact" as="li" toggle rv />
            <VerseCard {...verseProps(v['18.63'])} label="How the teaching closes" size="compact" as="li" toggle rv />
          </VerseList>
          <div className="sx-prose rv">
            <p>
              The last of these is Krishna’s own instruction to his reader: reflect on all of it, then choose. It is a good spirit in which to
              begin.
            </p>
          </div>
        </Section>

        <Section tone="band" track="faq" title="Questions people ask" width="narrow">
          <Faq items={FAQ} />
        </Section>

        <Section id="seven-verses" track="next_step" width="narrow" title="Begin with seven verses">
          <div className="rv">
            <NextStep locale="en" pageKey="what-is-gita" placement="end" copy={CURIOUS_NEXT} />
          </div>
        </Section>

        <Section tone="band" track="keep_reading" title="Keep reading">
          <LinkCards items={[...curiousCards(CURIOUS_START, 'beginners_related', 'what-is'), ...curiousCards(CURIOUS_CONCEPTS, 'beginners_related').slice(0, 2)]} />
        </Section>

        <Section track="sources" title="Sources" width="narrow" spacing="tight">
          <div className="sx-prose">
            <ol>
              <li>
                <a href="https://en.wikipedia.org/wiki/Bhagavad_Gita" target="_blank" rel="noopener noreferrer" data-mp-location="beginners_source">
                  Bhagavad Gita, Wikipedia
                </a>
                . Chapters and verses, place in the Bhishma Parva, attribution to Vyasa, scholarly dating, the early commentators.
              </li>
              <li>
                <a href="https://www.britannica.com/topic/Bhagavad-Gita" target="_blank" rel="noopener noreferrer" data-mp-location="beginners_source">
                  Wendy Doniger, “Bhagavad Gita”, Encyclopaedia Britannica
                </a>
                . An episode of the Mahabharata; Krishna as an avatar of Vishnu.
              </li>
            </ol>
            <p>
              Verses and chapter names are from this site’s verse files; IAST is generated from the Devanagari; English is our own. Rewritten in
              November 2026.
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

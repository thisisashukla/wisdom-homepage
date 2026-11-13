import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Actions, Faq, JsonLd, LinkCards, PageHero, Section } from '@/components/site'
import PlanFine from '@/components/plan/PlanFine'
import { planAction } from '@/components/plan/planAction'
import VerseMap from '@/components/plan/VerseMap'
import { TimePicker, lengthPlanCards } from '@/components/plan/LengthPlanParts'
import { getVerse } from '@/lib/gita'
import { chapterUrl } from '@/lib/gitaUrls'
import { sanskritPadas } from '@/lib/devanagari'
import { AUTHOR_LD, PUBLISHER_LD, SITE } from '@/lib/seo'
import { eighteenDaySegments } from '@/lib/readingPlans'
import '@/components/plan/length-plans.css'

const PATH = '/how-to-read-bhagavad-gita'
const URL = `${SITE}${PATH}`
const TITLE = 'How to Read the Bhagavad Gita: Where to Start, How Long, and a Plan'
const DESCRIPTION =
  'How to read the Bhagavad Gita as a beginner: chapter 1 or chapter 2 first, how long it takes (about two hours for all 700 verses), where readers get stuck, and a reading plan for the time you have, from one verse a day to a chapter a day.'
const IMG = `${SITE}/og/how-to-read-bhagavad-gita.webp`

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords:
    'how to read bhagavad gita, how to read bhagavad gita for beginners, where to start reading bhagavad gita, how long does it take to read the bhagavad gita, how to read bhagavad gita daily, bhagavad gita reading guide, rules to read bhagavad gita, gita reading plan',
  alternates: { canonical: URL },
  openGraph: { title: 'How to read the Bhagavad Gita', description: 'Where to start, how long it takes, and a plan for the time you have.', url: URL, type: 'article', siteName: 'Wisdom', images: [{ url: IMG, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'How to read the Bhagavad Gita', description: 'Where to start, how long it takes, and a plan for the time you have.', images: [IMG] },
}

const STUCK: { where: string; href: string; what: string }[] = [
  {
    where: 'Chapter 1',
    href: chapterUrl(1),
    what: 'Verses 4 to 19 are a roll call of warriors and conches. Read them quickly for the scene, then slow down from 1.28, where Arjuna starts to speak. That speech is the question the rest of the Gita answers.',
  },
  {
    where: 'Chapter 2',
    href: chapterUrl(2),
    what: 'At 72 verses it holds most of the Gita in brief: the self, duty, action without clinging and the steady mind. Give it three sittings: verses 1 to 30, 31 to 53, and 54 to 72.',
  },
  {
    where: 'Chapter 8',
    href: chapterUrl(8),
    what: 'It opens with seven quick questions (8.1 and 8.2). Read the questions first and keep them in front of you; the chapter answers them in order.',
  },
  {
    where: 'Chapter 11',
    href: chapterUrl(11),
    what: 'This is a vision, told as a scene. Read it slowly, aloud if you can, the way you would read a poem, and watch Arjuna’s reaction more than the details.',
  },
  {
    where: 'Chapters 13 to 17',
    href: chapterUrl(14),
    what: 'Here the teaching turns into careful lists, most of them in threes. Take one list at a time and ask where you see it in your own week.',
  },
  {
    where: 'Chapter 18',
    href: chapterUrl(18),
    what: 'The longest chapter gathers everything that came before. If it feels heavy, read 18.63 to 18.78 on their own first: Krishna’s last word and Arjuna’s answer.',
  },
]

const FAQ = [
  {
    q: 'How long does it take to read the Bhagavad Gita?',
    a: 'About two hours in English for all 700 verses at an unhurried pace, or about three hours to recite the Sanskrit. Most people spread it out: 3 to 6 minutes a day over 30 days, or a chapter a day for 18 days.',
  },
  {
    q: 'Is the Bhagavad Gita hard to read?',
    a: 'The language of a good translation is plain. What takes time is the ideas, which build on each other. Reading a little each day, in order, and going back to the verses that stop you is enough for a first reading.',
  },
  {
    q: 'Do I need to read the Mahabharata first?',
    a: 'No. The Gita sits inside the Mahabharata, in the Bhishma Parva, just before the war begins. You need only the setting: two branches of one family at war, and Arjuna on the Pandava side with Krishna as his charioteer. Chapter 1 gives you that.',
  },
  {
    q: 'Do I need a teacher?',
    a: 'The Gita itself says knowledge is learned by humility, sincere questions and service to those who have seen the truth (4.34). A teacher or a study group helps a great deal. Many people begin alone with a good translation and look for a teacher when their questions get deeper.',
  },
  {
    q: 'Are there rules for reading the Gita, like bathing first or a set time?',
    a: 'The Gita names trust and an open mind in the one who listens (18.71). It sets no rule about the hour, the room or the device. Many families keep customs out of respect, such as bathing first or reading at the same time each day; keep the ones that help you settle and follow your family’s practice where it has one.',
  },
  {
    q: 'Can I read the whole Gita in one day?',
    a: 'Yes, in about two hours. Many people read all 18 chapters on Gita Jayanti, the day tradition says the Gita was spoken.',
  },
]

export default async function HowToReadPage() {
  const v1870 = await getVerse(18, 70)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'How to read the Bhagavad Gita',
        description: DESCRIPTION,
        inLanguage: 'en',
        datePublished: '2026-11-13',
        dateModified: '2026-11-13',
        image: IMG,
        author: AUTHOR_LD,
        publisher: PUBLISHER_LD,
        mainEntityOfPage: URL,
        about: { '@type': 'Book', name: 'Bhagavad Gita', sameAs: ['https://en.wikipedia.org/wiki/Bhagavad_Gita', 'https://www.wikidata.org/wiki/Q48268'] },
        isPartOf: { '@type': 'CollectionPage', name: 'Bhagavad Gita reading plans', url: `${SITE}/reading-plans` },
      },
      {
        '@type': 'HowTo',
        name: 'A five-minute way to read the Bhagavad Gita each day',
        totalTime: 'PT5M',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Read the day’s verses straight through', text: 'Read the day’s verses in order, without stopping to study.' },
          { '@type': 'HowToStep', position: 2, name: 'Go back to the verse that stopped you', text: 'Pick one verse that caught you and read it again, aloud if you can.' },
          { '@type': 'HowToStep', position: 3, name: 'Read what it means', text: 'Open that verse’s page for its meaning and context.' },
          { '@type': 'HowToStep', position: 4, name: 'Carry one line into the day', text: 'Keep one line of it in mind, written down or on your phone.' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Reading plans', item: `${SITE}/reading-plans` },
          { '@type': 'ListItem', position: 3, name: 'How to read the Gita', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={schema} />
      <Nav />

      <PageHero
        crumbs={[
          { label: 'Reading plans', href: '/reading-plans' },
          { label: 'How to read the Gita', href: PATH },
        ]}
        crumbsLd={false}
        eyebrow="A guide for first-time readers"
        title="How to read the Bhagavad Gita"
        answer={{
          question: 'How should a beginner read the Bhagavad Gita?',
          answer:
            'In order, a little each day, in a translation you find clear. Twenty-odd verses take five minutes, and the whole Gita about two hours. If chapter 1 feels slow, start at chapter 2, where Krishna begins to teach, and come back for the story.',
          source: v1870 ? { text: sanskritPadas(v1870.sanskrit).filter((r) => /[।॥]/.test(r)).join('\n'), ref: 'Krishna on studying this dialogue, Bhagavad Gita 18.70', lang: 'sa' } : undefined,
        }}
        actions={[
          { href: '#plans', label: 'Pick a plan for your time', location: 'howto_hero_plans' },
          { href: chapterUrl(1), label: 'Start at chapter 1', location: 'howto_hero_ch1' },
        ]}
        visual={
          <div className="rpl-maphold" id="verse-map">
            <span className="rpl-maphold-k">The whole Gita: 18 chapters, 700 verses</span>
            <VerseMap
              plan="howto"
              segments={eighteenDaySegments()}
              focusChapter={2}
              selectable={false}
              label="Map of the Bhagavad Gita’s 700 verses, one row per chapter, with chapter 2 ringed"
              caption="One row per chapter. Chapter 2, ringed, is where Krishna starts to teach."
            />
          </div>
        }
      />

      <main className="rpl-page">
        <Section id="plans" width="narrow" title="Pick a plan by the time you have" intro="Each one follows the Gita in order, and each can start today.">
          <TimePicker location="howto_pick" />
        </Section>

        <Section id="where-to-start" tone="band" width="narrow" title="Where to start: chapter 1 or chapter 2">
          <div className="sx-prose">
            <p>
              <strong>Start at chapter 1</strong> if you want to feel why the Gita was spoken. It is the scene: two armies, one family, and a great archer who looks across the field
              at his teachers and cousins and cannot lift his bow. Everything after is an answer to that moment, and it lands harder when you have watched it happen.
            </p>
            <p>
              <strong>Start at chapter 2</strong> if you want the teaching straight away. Krishna begins to answer at 2.11, and in 62 verses he covers the self that never dies,
              doing your duty, acting without clinging to results and the steady mind. Many teachers point beginners here, then send them back to chapter 1.
            </p>
            <p>
              Either way, read the whole Gita in order once before you skip around. Later chapters lean on ideas from chapters 2 to 6, and the ending only lands once you have
              travelled the distance with Arjuna. For a first taste of that arc, <a href="/bhagavad-gita-in-7-days">the Gita in 7 days</a> follows it in seven verses.
            </p>
          </div>
        </Section>

        <Section id="how-long" width="narrow" title="How long it takes">
          <dl className="rpl-nums">
            <div>
              <dt>700</dt>
              <dd>verses in 18 chapters</dd>
            </div>
            <div>
              <dt>20 to 78</dt>
              <dd>verses in a chapter</dd>
            </div>
            <div>
              <dt>2 hours</dt>
              <dd>to read it all in English</dd>
            </div>
            <div>
              <dt>3 hours</dt>
              <dd>to recite it in Sanskrit</dd>
            </div>
          </dl>
          <div className="sx-prose">
            <p>
              Times here assume about ten seconds a verse in English and fifteen to recite the Sanskrit, unhurried. Spread over a month, that is 3 to 6 minutes a day. A chapter a
              day takes 4 to 13 minutes. One verse a day takes about two years, which is why the <a href="/bhagavad-gita-one-verse-a-day">verse-a-day month</a> picks thirty that
              carry the whole arc.
            </p>
          </div>
        </Section>

        <Section id="five-minutes" tone="band" width="narrow" title="A five-minute way to read each day">
          <ol className="rpl-steps">
            <li>
              <div>
                <h3>Read the day’s verses straight through</h3>
                <p>Don’t stop to study. Let the conversation carry you, the way you would read a story.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Go back to the verse that stopped you</h3>
                <p>There is usually one. Read it again, aloud if you can. Each verse page here has a recitation of the Sanskrit to read along with.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Read what it means</h3>
                <p>
                  The verse page gives its meaning and where it falls in the conversation. For a printed edition to read alongside,{' '}
                  <a href="/blogs/best-bhagavad-gita-translation">compare the English translations</a>.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Carry one line into the day</h3>
                <p>Write it down, or keep it on your phone’s Lock Screen. A line you return to at noon does more than a chapter you forget by lunch.</p>
              </div>
            </li>
          </ol>
        </Section>

        <Section id="stuck" width="narrow" title="Where readers get stuck, and what helps">
          <dl className="rpl-stuck">
            {STUCK.map((s) => (
              <div key={s.where}>
                <dt>
                  <a href={s.href} data-mp-location={`howto_stuck_${s.where.replace(/\W+/g, '_').toLowerCase()}`}>
                    {s.where}
                  </a>
                </dt>
                <dd>{s.what}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="sanskrit" tone="band" width="narrow" title="Sanskrit, a translation, or both">
          <div className="sx-prose">
            <p>
              You don’t need Sanskrit to read the Gita. A clear English translation gives you the meaning, and that is what a first reading needs. The Sanskrit adds sound and
              memory: verses were made to be recited, and a line you can say stays with you. Every verse here has the Sanskrit with its English, so you can start with the meaning
              and add the original when you’re ready.
            </p>
            <p>
              On translations: some stay close to the words and some explain as they go, and many come with a teacher’s commentary. <a href="/blogs/best-bhagavad-gita-translation">Our
              comparison of English translations</a> sets them side by side so you can pick one that suits how you read.
            </p>
          </div>
        </Section>

        <Section id="faq" width="narrow" title="Questions first-time readers ask">
          <Faq items={FAQ} ld={false} />
        </Section>

        <Section id="all-plans" tone="band" title="Reading plans">
          <LinkCards items={lengthPlanCards('howto_plans')} columns={2} layout="rail" />
        </Section>

        <Section
          id="your-plan"
          width="narrow"
          title="Or start with what you’re facing"
          intro="Tell Wisdom what’s going on in a sentence or two, and it picks a verse a day for seven days, with what each one means for your life."
        >
          <Actions items={[planAction({ campaign: 'web_howto', location: 'howto_create_plan' })]} />
          <PlanFine />
        </Section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="How To Read Gita" />
    </>
  )
}

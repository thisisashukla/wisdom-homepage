import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import SiteFooter from '@/components/SiteFooter'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Section, VerseCard, VersePair } from '@/components/site'
import { CURIOUS_CONCEPTS, CURIOUS_NEXT, CURIOUS_START, HUB_PATH, curiousArticleLd, curiousCards } from '@/lib/curious'
import { gitaLines, verseProps } from '@/lib/gitaLines'
import { pageMeta } from '@/lib/seo'

const PATH = '/blogs/bhagavad-gita-vs-stoicism'
const TITLE = 'Bhagavad Gita vs Stoicism: Five Verses Beside Epictetus, Marcus Aurelius and Seneca'
const DESCRIPTION =
  'Krishna and the Stoics agree on what is yours to do and differ on why. Gita 2.47, 2.14, 2.56, 6.5 and 3.35 beside Epictetus, Marcus Aurelius and Seneca, and an honest account of where they part.'

export const metadata: Metadata = {
  ...pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
  keywords:
    'bhagavad gita vs stoicism, stoicism and the gita, marcus aurelius and krishna, nishkama karma vs stoicism, epictetus bhagavad gita, seneca bhagavad gita, dichotomy of control gita 2.47, sthitaprajna stoic sage',
}

const LONG_EPICTETUS = 'https://www.gutenberg.org/ebooks/10661'
const LONG_DISCOURSES_2_19 = 'https://en.wikisource.org/wiki/The_Discourses_of_Epictetus;_with_the_Encheiridion_and_Fragments/Book_2/Chapter_19'
const LONG_MARCUS = 'https://www.gutenberg.org/ebooks/15877'
const GUMMERE_113 = 'https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_113'

const FAQ = [
  {
    q: 'Is Stoicism similar to the Bhagavad Gita?',
    a: 'In its practical advice, yes. Both separate what you do from what follows, both ask for steadiness in pleasure and pain, and both describe an ideal person whom fortune cannot shake. They differ in what stands behind that advice: Stoic reason and providence on one side, the Gita’s undying self, devotion to Krishna and the hope of liberation on the other.',
  },
  {
    q: 'What is the difference between Stoicism and the Bhagavad Gita?',
    a: 'Three differences matter most. The Stoic god is reason running through a physical cosmos, while the Gita’s Lord is a person who can be loved. The Gita asks for every action to be offered to that Lord, which Stoicism never asks. And the Stoic goal is a flourishing life in agreement with nature, while the Gita aims at moksha, freedom from the round of birth and death.',
  },
  {
    q: 'Is nishkama karma the same as the Stoic dichotomy of control?',
    a: 'They are close cousins. Epictetus divides things into what is in our power, our judgments and desires, and what is not. Gita 2.47 gives you a right to action and none to its fruit, then adds two warnings: do not let the fruit become your motive, and do not fall back into doing nothing. The Gita draws its line at the deed, Epictetus inside the mind.',
  },
  {
    q: 'Did the Stoics influence the Gita, or the Gita the Stoics?',
    a: 'There is no evidence of influence in either direction. Stoicism began in Athens around 300 BCE, and scholars usually date the Gita to the last centuries BCE. The likeness is best read as two traditions meeting the same human questions.',
  },
  {
    q: 'What did Marcus Aurelius say that sounds like Krishna?',
    a: 'In Meditations 4.3 (George Long’s translation) he reminds himself that “things do not touch the soul” and that “all these things, which thou seest, change immediately and will no longer be.” In Gita 2.14 Krishna tells Arjuna that heat and cold, pleasure and pain come and go, and asks him to endure them.',
  },
  {
    q: 'Can you practise both?',
    a: 'Many readers do. The daily disciplines overlap: attention to what is yours to do, steadiness when results go either way, and honest self-examination. Where the frameworks differ, in God, the self and the goal, it helps to know which one you are leaning on.',
  },
]

export default async function GitaVsStoicismPage() {
  const v = await gitaLines(['2.48', '2.47', '2.14', '2.56', '6.5', '3.35', '9.27', '2.20'])
  const ld = curiousArticleLd({
    path: PATH,
    headline: 'The Bhagavad Gita and Stoicism, verse by verse',
    description: DESCRIPTION,
    datePublished: '2026-06-12',
    dateModified: '2026-11-11',
    about: ['Bhagavad Gita', 'Stoicism', 'Epictetus', 'Marcus Aurelius', 'Seneca'],
    citation: [
      { name: 'A Selection from the Discourses of Epictetus with the Encheiridion', author: 'George Long (tr.)', url: LONG_EPICTETUS },
      { name: 'Thoughts of Marcus Aurelius Antoninus', author: 'George Long (tr.)', datePublished: '1862', url: LONG_MARCUS },
      { name: 'Moral Letters to Lucilius', author: 'Richard Mott Gummere (tr.)', datePublished: '1925', url: GUMMERE_113 },
      { name: 'Sapiens and Sthitaprajna: A Comparative Study in Seneca’s Stoicism and the Bhagavadgita', author: 'Ashwini Mokashi', datePublished: '2019' },
      { name: 'Stoicism, Stanford Encyclopedia of Philosophy', author: 'Dirk Baltzly', url: 'https://plato.stanford.edu/entries/stoicism/' },
    ],
  })

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Bhagavad Gita vs Stoicism" />
      <main lang="en">
        <PageHero
          crumbs={[
            { label: 'Understand the Gita', href: HUB_PATH },
            { label: 'The Gita and Stoicism', href: PATH },
          ]}
          eyebrow="The Gita and the Stoics"
          title="The Bhagavad Gita and Stoicism, verse by verse"
          sub="Both teach that your work is yours and its outcome is not, and both picture a person whom pleasure and pain cannot shake. They part on why. The Stoics trust reason and a providential nature; Krishna asks Arjuna to offer his action to God, and points beyond this life to freedom."
          facts={['Five verse pairs', 'Epictetus, Marcus Aurelius, Seneca', 'Where they meet, where they part']}
          actions={[
            { href: '#pairs', label: 'Read the five pairs', location: 'stoicism_hero_pairs' },
            { href: '#differ', label: 'Where they differ', location: 'stoicism_hero_differ' },
          ]}
          verse={{ ...verseProps(v['2.48']), label: 'Bhagavad Gita 2.48' }}
        />

        <Section spacing="tight" width="narrow" track="quick_answer">
          <div className="sx-prose rv" id="quick-answer">
            <p>
              No line of influence runs between them. Stoicism began with Zeno in Athens around 300 BCE; the Gita, set inside the Mahabharata, is
              usually dated by scholars to the last centuries BCE. The likeness comes from two traditions facing the same question: how to act
              well when the outcome is out of your hands.
            </p>
            <p>
              Ashwini Mokashi’s comparative study <em>Sapiens and Sthitaprajna</em> (2019) sets Seneca’s sage beside the Gita’s person of steady
              wisdom and finds a shared core: virtue, sound judgment, and a mind no longer ruled by passion. She also marks the gap. The Gita’s
              path runs through meditation toward liberation, the Stoic path through reasoning, case by case, toward a good life here. The five
              pairs below follow both halves of that finding. Oppenheimer, who learned the Gita in Sanskrit, said his teacher Arthur Ryder “felt
              and thought and talked as a Stoic”; <a href="/oppenheimer-bhagavad-gita" data-mp-location="stoicism_link_oppenheimer">that story is
              here</a>.
            </p>
          </div>
        </Section>

        <Section id="pairs" tone="band" track="pairs" title="Five pairs" intro="Each Gita verse is shown with its Sanskrit. Each Stoic line is in a public-domain translation, with its exact place in the text.">
          <VersePair
            id="control"
            title="What is yours: Gita 2.47 and Epictetus on what is in our power"
            verse={verseProps(v['2.47'])}
            other={{
              text: '“Of things some are in our power, and others are not. In our power are opinion, movement towards a thing, desire, aversion, turning from a thing; and in a word, whatever are our acts. Not in our power are the body, property, reputation, offices (magisterial power), and in a word, whatever are not our own acts.”',
              who: 'Epictetus',
              work: 'Enchiridion 1',
              translator: 'tr. George Long',
              href: LONG_EPICTETUS,
              location: 'stoicism_source_enchiridion_1',
            }}
            meet="Both draw a line through every situation. On one side stands what you do; on the other, what follows from it. Peace begins with knowing which side a thing is on."
            part={
              <>
                <p>
                  Epictetus draws the line inside the mind: judgments and desires are ours, and even the body is not. Krishna draws it at the
                  deed: action is your right, its fruit never.
                </p>
                <p>
                  Then he adds two warnings Epictetus has no need of. Do not let the fruit become your reason for acting, and do not slide into
                  doing nothing. More on this in{' '}
                  <a href="/blogs/nishkama-karma-bhagavad-gita" data-mp-location="stoicism_link_nishkama">nishkama karma</a>.
                </p>
              </>
            }
          />
          <VersePair
            id="impressions"
            title="What comes and goes: Gita 2.14 and Marcus Aurelius on things that change"
            verse={verseProps(v['2.14'])}
            other={{
              text: '“One is that things do not touch the soul, for they are external and remain immovable; but our perturbations come only from the opinion which is within. The other is that all these things, which thou seest, change immediately and will no longer be … The universe is transformation: life is opinion.”',
              who: 'Marcus Aurelius',
              work: 'Meditations 4.3',
              translator: 'tr. George Long',
              href: LONG_MARCUS,
              location: 'stoicism_source_meditations_4_3',
            }}
            meet="Heat and cold, pleasure and pain arrive and leave. Both texts ask you to watch that coming and going clearly, and to stay where you are."
            part="Marcus finds the trouble in opinion: change the judgment and the disturbance goes. Krishna names the contacts plainly and asks Arjuna to bear them (titikṣasva). In the next verse he promises that the one they cannot shake is fit for amṛtatva, the deathless state. No Stoic makes that promise."
          />
          <VersePair
            id="steady"
            title="The steady one: Gita 2.56 and the Stoic sage"
            verse={verseProps(v['2.56'])}
            other={{
              text: '“Show me a man who is sick and happy, in danger and happy, dying and happy, in exile and happy, in disgrace and happy. Show him: I desire, by the gods, to see a Stoic.”',
              who: 'Epictetus',
              work: 'Discourses 2.19',
              translator: 'tr. George Long',
              href: LONG_DISCOURSES_2_19,
              location: 'stoicism_source_discourses_2_19',
            }}
            meet="Each tradition sketches a person whom fortune cannot move. The Gita calls such a person sthitaprajña, steady in wisdom: undisturbed in sorrow, without craving in joy, free of attachment, fear and anger."
            part={
              <>
                <p>
                  Epictetus admits he has never met a finished Stoic and asks only for someone on the way. The Gita speaks of the sthitaprajña
                  as a real possibility and roots that steadiness in contentment in the self (2.55).
                </p>
                <p>
                  The Stoic sage still has feelings of a good kind, such as joy and caution, in place of passions. The Gita’s full
                  portrait runs from 2.55 to 2.72; we read it in{' '}
                  <a href="/blogs/sthitaprajna-bhagavad-gita" data-mp-location="stoicism_link_sthitaprajna">sthitaprajna</a>.
                </p>
              </>
            }
          />
          <VersePair
            id="self-mastery"
            title="Lifting yourself: Gita 6.5 and Seneca on self-command"
            verse={verseProps(v['6.5'])}
            other={{
              text: '“[Alexander] had made it his aim to win control over everything except his emotions … Self-Command is the greatest command of all.”',
              who: 'Seneca',
              work: 'Moral Letters 113.29 to 31',
              translator: 'tr. Richard M. Gummere',
              href: GUMMERE_113,
              location: 'stoicism_source_seneca_113',
            }}
            meet="Both picture a person as their own friend or their own enemy, and rule over oneself as the kingdom that counts."
            part="For Seneca, self-command is reason governing the passions. In 6.5 the word ātman works on two levels, and the old commentators read it with care: Shankara speaks of lifting oneself out of the sea of worldly existence, and Ramanuja reads the self that lifts as a mind no longer tied to the objects of the senses. The aim reaches past good self-government, toward freedom from that sea."
          />
          <VersePair
            id="role"
            title="Your own part: Gita 3.35 and Epictetus on the actor"
            verse={verseProps(v['3.35'])}
            other={{
              text: '“Remember that thou art an actor in a play, of such a kind as the teacher (author) may choose; if short, of a short one; if long, of a long one: if he wishes you to act the part of a poor man, see that you act the part naturally; if the part of a lame man, of a magistrate, of a private person, (do the same). For this is your duty, to act well the part that is given to you; but to select the part, belongs to another.”',
              who: 'Epictetus',
              work: 'Enchiridion 17',
              translator: 'tr. George Long',
              href: LONG_EPICTETUS,
              location: 'stoicism_source_enchiridion_17',
            }}
            meet="Neither asks you to pick the grandest role. Both ask you to play your own one well."
            part={
              <>
                <p>
                  For Epictetus the part is handed to you by another, the author of the play. The Gita roots your part in your own nature: 18.47
                  repeats this verse and adds that work set by one’s own nature brings no fault.
                </p>
                <p>
                  And 3.35 goes further than any Stoic line: better to die in your own dharma, since another’s brings fear. More in{' '}
                  <a href="/blogs/dharma-meaning-bhagavad-gita" data-mp-location="stoicism_link_dharma">dharma</a>.
                </p>
              </>
            }
          />
        </Section>

        <Section id="differ" track="differ" title="Where they differ" width="narrow">
          <div className="sx-prose rv">
            <h3>What holds the world together</h3>
            <p>
              For the Stoics, god is reason running through the cosmos: present everywhere, rational, providential, and as bodily as everything
              else, a fine fiery breath (<em>pneuma</em>). The Gita speaks of a self in every being that is never born and never dies, and of a
              Lord who is both the ground of the world and a person Arjuna can love. In chapter 11 Arjuna sees that Lord face to face.
            </p>
          </div>
          <VerseCard {...verseProps(v['2.20'])} label="Bhagavad Gita 2.20" size="compact" toggle rv />
          <div className="sx-prose rv">
            <h3>To whom the action is offered</h3>
            <p>
              A Stoic acts well because acting well is the only good. Krishna asks for more: whatever you do, eat, offer, give or endure, make it
              an offering to me. The Gita’s freedom from results rests on devotion, and the teaching it builds to, in 18.66, is a call to
              take refuge.
            </p>
          </div>
          <VerseCard {...verseProps(v['9.27'])} label="Bhagavad Gita 9.27" size="compact" toggle rv />
          <div className="sx-prose rv">
            <h3>Where the road ends</h3>
            <p>
              The Stoic end is <em>eudaimonia</em>, a life that goes well, lived in agreement with nature. The Gita aims at{' '}
              <em lang="sa-Latn">mokṣa</em>, release from the round of birth and death. Mokashi’s study names this as the deepest gap: much of
              the same advice, set toward different ends.
            </p>
            <h3>What the self is</h3>
            <p>
              Stoic souls were made of that same fine breath, a body among bodies. The Gita’s self, in 2.20 above, is unborn, eternal and
              untouched when the body is struck down. On why “soul” is a loose fit for that self, see{' '}
              <a href="/blogs/atman-not-soul-bhagavad-gita" data-mp-location="stoicism_link_atman">ātman</a>.
            </p>
          </div>
        </Section>

        <Section tone="band" track="faq" title="Questions people ask" width="narrow">
          <Faq items={FAQ} />
        </Section>

        <Section track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey="stoicism" placement="end" copy={CURIOUS_NEXT} />
          </div>
        </Section>

        <Section tone="band" track="keep_reading" title="Keep reading">
          <LinkCards items={[...curiousCards(CURIOUS_START, 'stoicism_related', 'stoicism'), ...curiousCards(CURIOUS_CONCEPTS, 'stoicism_related').filter((c) => /karma|sthitaprajna|dharma|atman/.test(c.href)).slice(0, 4)]} />
        </Section>

        <Section track="sources" title="Sources and translations" width="narrow" spacing="tight">
          <div className="sx-prose">
            <ol>
              <li>
                Epictetus, <a href={LONG_EPICTETUS} target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">A Selection from the Discourses of Epictetus with the Encheiridion</a>, tr. George Long (Project Gutenberg). Enchiridion 1 and 17. Long’s bracketed Greek glosses are left out of Enchiridion 1.
              </li>
              <li>
                Epictetus, <a href={LONG_DISCOURSES_2_19} target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">Discourses 2.19</a>, tr. George Long, 1877 (Wikisource).
              </li>
              <li>
                Marcus Aurelius, <a href={LONG_MARCUS} target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">Thoughts of Marcus Aurelius Antoninus</a>, tr. George Long, 1862 (Project Gutenberg). Meditations 4.3.
              </li>
              <li>
                Seneca, <a href={GUMMERE_113} target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">Moral Letters to Lucilius, Letter 113</a>, tr. Richard M. Gummere, Loeb vol. 3, 1925 (Wikisource). Sections as numbered there.
              </li>
              <li>
                Dirk Baltzly, <a href="https://plato.stanford.edu/entries/stoicism/" target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">“Stoicism”</a>, Stanford Encyclopedia of Philosophy. The Stoic god, the soul as pneuma, the sage, the end of life.
              </li>
              <li>
                Ashwini Mokashi, <a href="https://appa.edu/books/sapiens-and-sthitaprajna" target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">Sapiens and Sthitaprajna: A Comparative Study in Seneca’s Stoicism and the Bhagavadgita</a> (D.K. Printworld, 2019).
              </li>
              <li>
                Shankara and Ramanuja on Gita 6.5, <a href="https://heritage.iitk.ac.in/SBG/6.5" target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">Sanskrit text, IIT Kanpur</a>. English ours.
              </li>
              <li>
                James A. Hijiya, <a href="https://www.thphys.uni-heidelberg.de/~stamatescu/DIDEPG/WiSe23/TEXTE23/oppenheimer.pdf" target="_blank" rel="noopener noreferrer" data-mp-location="stoicism_source">“The Gita of J. Robert Oppenheimer”</a> (2000), quoting Time, 8 November 1948, for Oppenheimer on Ryder.
              </li>
            </ol>
            <p>
              Gita verses: Sanskrit from this site’s verse files, IAST generated from the Devanagari, English our own. Rebuilt in November 2026
              with public-domain Stoic translations only; earlier versions quoted modern translations.
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}

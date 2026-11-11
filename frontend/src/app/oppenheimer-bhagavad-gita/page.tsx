import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Renderings, Section, VerseCard, VerseList } from '@/components/site'
import { CURIOUS_CONCEPTS, CURIOUS_NEXT, CURIOUS_START, HUB_PATH, curiousArticleLd, curiousCards } from '@/lib/curious'
import { gitaLines, verseProps } from '@/lib/gitaLines'
import { pageMeta } from '@/lib/seo'

const PATH = '/oppenheimer-bhagavad-gita'
const TITLE = 'Now I Am Become Death: Oppenheimer and Bhagavad Gita 11.32'
const DESCRIPTION =
  'Oppenheimer’s “Now I am become Death, the destroyer of worlds” is Bhagavad Gita 11.32, where Krishna says kālo ’smi, “I am Time”. The Sanskrit, his 1965 recollection, and five translations side by side.'

export const metadata: Metadata = {
  ...pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
  keywords:
    'i am become death meaning, now i am become death the destroyer of worlds, oppenheimer bhagavad gita, kalo smi meaning, bhagavad gita 11.32, oppenheimer gita quote, destroyer of worlds verse',
}

const RYDER_1132 = [
  'Death am I, and my present task',
  'Destruction. View in me',
  'The active slayer of these men;',
  'For though you fail and flee,',
  'These captains of the hostile hosts',
  'Shall die, shall cease to be.',
]

const FAQ = [
  {
    q: 'What does “Now I am become Death, the destroyer of worlds” mean?',
    a: 'It is Oppenheimer’s English for Bhagavad Gita 11.32. Krishna, showing Arjuna his cosmic form, says “I am Time, grown vast, the maker of the worlds’ end,” and tells him the warriors facing him will fall whether or not he fights. In the Gita the words describe God as the time that ends all things.',
  },
  {
    q: 'Which Bhagavad Gita verse did Oppenheimer quote?',
    a: 'Chapter 11, verse 32. Accounts of the Trinity test also mention 11.12, the verse that compares the radiance of the cosmic form to a thousand suns rising at once.',
  },
  {
    q: 'Did Oppenheimer say it at the Trinity test?',
    a: 'The famous version is his recollection on NBC in 1965, twenty years after the test. A “shatterer of worlds” version was in print by the late 1940s, and the reporter William Laurence later wrote that he heard the line from Oppenheimer a few hours after the test. Whether it came to him in the moment itself cannot be confirmed.',
  },
  {
    q: 'What does kālo ’smi mean?',
    a: '“I am Time.” Kāla comes from a root meaning to count or reckon. It means time, and time as what ends all things, so it can also mean death. Most translators choose Time; Oppenheimer’s teacher Arthur Ryder chose Death.',
  },
  {
    q: 'Is it Vishnu or Krishna speaking?',
    a: 'Krishna speaks the verse. Oppenheimer said Vishnu, and Arjuna himself addresses the cosmic form as Vishnu in 11.24 and 11.30. In Hindu tradition Krishna is an avatar of Vishnu.',
  },
  {
    q: 'What is Bhagavad Gita 11.32 in Sanskrit?',
    a: 'kālo ’smi lokakṣayakṛt pravṛddho lokān samāhartum iha pravṛttaḥ, ṛte ’pi tvāṃ na bhaviṣyanti sarve ye ’vasthitāḥ pratyanīkeṣu yodhāḥ. The verse page on this site has the Devanagari, a word-by-word gloss and our translation.',
  },
]

const SOURCES: { label: string; href: string; note: string }[] = [
  { label: 'James A. Hijiya, “The Gita of J. Robert Oppenheimer”, Proceedings of the American Philosophical Society 144.2 (2000)', href: 'https://www.thphys.uni-heidelberg.de/~stamatescu/DIDEPG/WiSe23/TEXTE23/oppenheimer.pdf', note: 'The NBC documentary, the 1948 and 1958 versions, Ryder and the 1933 letters, the translation of kāla.' },
  { label: 'Transcript of the 1965 recollection, atomicarchive.com', href: 'https://atomicarchive.com/media/videos/oppenheimer.html', note: 'Full wording of the filmed passage.' },
  { label: 'Atomic Heritage Foundation, Trinity Test eyewitnesses', href: 'https://ahf.nuclearmuseum.org/ahf/key-documents/trinity-test-eyewitnesses/', note: 'The same recollection, dated 1965.' },
  { label: 'Arthur W. Ryder, The Bhagavad-Gita (University of Chicago Press, 1929)', href: 'https://archive.org/details/bhagavadgita0000unse_g1d6', note: 'Public domain in the US since 2025.' },
  { label: 'Edwin Arnold, The Song Celestial (1885), Project Gutenberg', href: 'https://www.gutenberg.org/ebooks/2388', note: '' },
  { label: 'K. T. Telang, The Bhagavadgītā, Sacred Books of the East 8 (1882)', href: 'https://archive.org/details/bhagavadgtwithsa00tela', note: '' },
  { label: 'Annie Besant and Bhagavan Das, The Bhagavad Gita (1905)', href: 'https://archive.org/details/wg1100', note: 'Besant’s verse translation, first issued in the 1890s.' },
  { label: 'Sanskrit commentaries of Shankara, Ramanuja, Shridhara, Madhusudana Sarasvati, Vallabha and Purushottama on 11.32 and 11.33, IIT Kanpur', href: 'https://heritage.iitk.ac.in/SBG/11.32', note: 'Our English from the Sanskrit.' },
  { label: 'Monier-Williams, Sanskrit-English Dictionary (1899), kāla', href: 'https://www.sanskrit-lexicon.uni-koeln.de/scans/csl-apidev/getword.php?dict=mw&key=kAla&input=slp1&output=iast', note: '' },
  { label: 'Wikipedia, J. Robert Oppenheimer', href: 'https://en.wikipedia.org/wiki/J._Robert_Oppenheimer', note: 'Sanskrit with Ryder in 1933; a 1949 profile with the “shatterer” wording.' },
]

export default async function OppenheimerGitaPage() {
  const v = await gitaLines(['11.32', '11.12', '11.33', '10.30', '10.33', '10.34', '17.3'])
  const ld = curiousArticleLd({
    path: PATH,
    headline: 'Now I am become Death: Oppenheimer and Bhagavad Gita 11.32',
    description: DESCRIPTION,
    datePublished: '2026-11-11',
    dateModified: '2026-11-11',
    about: ['Bhagavad Gita 11.32', 'J. Robert Oppenheimer', 'Kāla'],
    citation: [
      { name: 'The Gita of J. Robert Oppenheimer', author: 'James A. Hijiya', datePublished: '2000', url: 'https://www.thphys.uni-heidelberg.de/~stamatescu/DIDEPG/WiSe23/TEXTE23/oppenheimer.pdf' },
      { name: 'The Bhagavad-Gita', author: 'Arthur W. Ryder', datePublished: '1929', url: 'https://archive.org/details/bhagavadgita0000unse_g1d6' },
      { name: 'Bhagavad Gita 11.32 with Sanskrit commentaries', url: 'https://heritage.iitk.ac.in/SBG/11.32' },
    ],
  })

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Oppenheimer Bhagavad Gita" />
      <main lang="en">
        <PageHero
          crumbs={[
            { label: 'Understand the Gita', href: HUB_PATH },
            { label: 'Oppenheimer and 11.32', href: PATH },
          ]}
          eyebrow="Bhagavad Gita 11.32"
          title="“Now I am become Death”: the Gita verse Oppenheimer remembered"
          sub={
            <>
              The line is Bhagavad Gita 11.32. Krishna, in his cosmic form, answers Arjuna with <em lang="sa-Latn">kālo ’smi</em>: I am Time,
              grown vast, the maker of the worlds’ end. Oppenheimer recalled it on television in 1965, in words that follow his Sanskrit
              teacher’s choice of Death for <em lang="sa-Latn">kāla</em>.
            </>
          }
          facts={['Trinity test, 16 July 1945', 'Recalled on NBC in 1965', 'kālo ’smi: “I am Time”']}
          actions={[
            { href: '#side-by-side', label: 'See five translations side by side', location: 'oppenheimer_hero_translations' },
            { href: v['11.32'].href, label: 'Read 11.32 word by word', location: 'oppenheimer_hero_verse' },
          ]}
          verse={{ ...verseProps(v['11.32']), label: 'What Krishna says' }}
        />

        <Section spacing="tight" width="narrow" track="quick_answer">
          <div className="sx-prose rv" id="quick-answer">
            <p>
              Oppenheimer’s sentence is his own English for half a line of Sanskrit. In Bhagavad Gita 11.32 Krishna answers Arjuna’s frightened
              question, “Who are you?”, with <em lang="sa-Latn">kālo ’smi lokakṣayakṛt pravṛddhaḥ</em>: I am Time, grown vast, the one who makes
              the worlds end. The word <em lang="sa-Latn">kāla</em> means time, and time as the force that ends all things, which is why it can
              also mean death.
            </p>
            <p>
              The reading came from his teacher at Berkeley, Arthur Ryder, who translated the verse in 1929 as “Death am I”. Most translators
              before and since have chosen Time. Both choices are on this page, along with what the verse says in its own chapter and how the
              old Sanskrit commentators read it.
            </p>
          </div>
        </Section>

        <Section id="what-he-said" tone="band" track="what_he_said" title="What Oppenheimer said, and when" width="narrow">
          <div className="sx-prose rv">
            <p>
              On 16 July 1945 the first atomic bomb was tested at the Trinity site in the New Mexico desert. Oppenheimer directed the
              laboratory that built it. The words most people know come from twenty years later. In 1965 NBC broadcast <em>The Decision to
              Drop the Bomb</em>, a White Paper documentary produced by Fred Freed. In it Oppenheimer recalls the silence after the test, a few
              people laughing, a few crying, and a line from the Gita coming to mind:
            </p>
            <blockquote>
              “Now I am become Death, the destroyer of worlds.”
              <cite>
                J. Robert Oppenheimer, <em>The Decision to Drop the Bomb</em>, NBC, 1965 (
                <a href="https://atomicarchive.com/media/videos/oppenheimer.html" target="_blank" rel="noopener noreferrer" data-mp-location="oppenheimer_source_transcript">
                  transcript
                </a>
                )
              </cite>
            </blockquote>
            <p>
              He introduces the line by saying that Vishnu is trying to persuade the Prince to do his duty and, to impress him, takes on his
              multi-armed form. He ends by supposing that everyone present thought something like it, one way or another.
            </p>
            <h3>An earlier version, and an open question</h3>
            <p>
              The sentence was in print long before 1965, in a slightly different form: “I am become Death, the shatterer of worlds.” The
              historian James Hijiya traced that version to <em>Time</em> magazine in November 1948; Wikipedia’s biography points to a magazine
              profile of 1949. Robert Jungk’s book <em>Brighter than a Thousand Suns</em> (1958) gives the fullest account, in which two verses
              pass through Oppenheimer’s mind at the test: first the radiance of a thousand suns (11.12), then, as the cloud rose, the line
              about Death (11.32). The <em>New York Times</em> reporter William Laurence later wrote that he heard the line from Oppenheimer a
              few hours after the test, though he left it out of what he published at the time.
            </p>
            <p>
              So the famous wording is a recollection, told and retold over twenty years. Whether the verse came to him in the instant of the
              flash, or afterwards as the way he understood what he had seen, the sources cannot settle.
            </p>
          </div>
        </Section>

        <Section id="thousand-suns" track="thousand_suns" title="The thousand suns came first" width="narrow">
          <div className="sx-prose rv">
            <p>
              Jungk’s account pairs the line with an earlier verse of the same chapter. Krishna has just given Arjuna divine sight (11.8), and
              Sanjaya, who narrates the battle to the blind king Dhritarashtra, describes what Arjuna sees:
            </p>
          </div>
          <VerseCard {...verseProps(v['11.12'])} label="Bhagavad Gita 11.12" toggle rv />
          <div className="sx-prose rv">
            <p>
              Ryder set it in rhyme: “A thousand simultaneous suns / Arising in the sky / Might equal that great radiance, / With that great
              glory vie.” The image gave Jungk the title of his book.
            </p>
          </div>
        </Section>

        <Section id="ryder" tone="band" track="ryder" title="Sanskrit at Berkeley" width="narrow">
          <div className="sx-prose rv">
            <p>
              Oppenheimer had read Hindu texts in English during the 1920s. By 1933, a young physics professor at Berkeley, he was reading the
              Gita in Sanskrit with Arthur W. Ryder, who translated Sanskrit poetry into English verse. He wrote to his brother Frank that the Gita was “very easy
              and quite marvelous”. He kept a worn copy near his desk and gave the book to friends. When Franklin Roosevelt died in April 1945,
              he quoted a verse from it at the memorial gathering at Los Alamos:
            </p>
          </div>
          <VerseCard {...verseProps(v['17.3'])} label="Bhagavad Gita 17.3, quoted at Los Alamos, April 1945" size="compact" toggle rv />
          <div className="sx-prose rv">
            <p>
              In 1963, asked by the <em>Christian Century</em> to name the books that had most shaped his outlook, he put the Gita on the list.
              Ryder’s own translation had come out in 1929 from the University of Chicago Press, in rhymed quatrains. At 11.32 it reads:
            </p>
            <blockquote>
              {RYDER_1132.map((l) => (
                <span key={l} className="sx-verse-row">
                  {l}
                </span>
              ))}
              <cite>Arthur W. Ryder, The Bhagavad-Gita (1929), canto 11</cite>
            </blockquote>
          </div>
        </Section>

        <Section id="kala" track="kala" title="Kāla: time, and time as the end of things" width="narrow">
          <div className="sx-prose rv">
            <p>
              The Sanskrit word is <em lang="sa-Latn">kāla</em>. Monier-Williams’s dictionary derives it from <em lang="sa-Latn">kal</em>, to
              count or calculate, and lists its senses from a fixed point of time, to time in general, to “time (as destroying all things),
              death”. The Gita uses the word across that whole range. In chapter 10 Krishna says that among those who reckon he is Time, and
              that he is Time without end. In the very next verse he says he is <em lang="sa-Latn">mṛtyu</em>, death that takes everything.
            </p>
          </div>
          <VerseList>
            <VerseCard {...verseProps(v['10.30'])} label="10.30: time as reckoning" size="compact" as="li" toggle rv />
            <VerseCard {...verseProps(v['10.33'])} label="10.33: time without end" size="compact" as="li" toggle rv />
            <VerseCard {...verseProps(v['10.34'])} label="10.34: the word for death" size="compact" as="li" toggle rv />
          </VerseList>
          <div className="sx-prose rv">
            <p>
              The Gita had a plain word for death and used it a chapter earlier. In 11.32 it chose <em lang="sa-Latn">kāla</em>.
            </p>
            <p>
              The old commentators read the word through its root. Ramanuja glosses <em lang="sa-Latn">kāla</em> as the one who counts: Krishna
              has reckoned the end of the lifespans of the kings gathered on the field. Madhusudana Sarasvati, in Shankara’s Advaita school,
              calls <em lang="sa-Latn">kāla</em> the Supreme Lord joined to his power of action, the one who draws all things back into himself.
              Shankara, whose commentary is the oldest to survive, reads the line plainly: Time, grown mighty, brings about the end of the
              worlds, and has set to work here, at this moment, to gather them in.
            </p>
            <p>
              Death is a fair reading, since time grown vast implies death. Hijiya calls Ryder’s choice “peculiar but defensible”, and notes that
              Franklin Edgerton’s 1944 translation printed both words, Time and Death. Time is the larger claim. The ending Arjuna dreads is
              already under way, and it will arrive with him or without him.
            </p>
            <p>
              Two more words in Oppenheimer’s English are his own. The Sanskrit says <em lang="sa-Latn">asmi</em>, I am, with no “now” and no
              “become”. “Am become” is an old English perfect, like “I am come”, and it lends the line its weight of something that has just
              happened. The nearest thing in the Sanskrit is <em lang="sa-Latn">pravṛddhaḥ</em>, grown, swollen to full size.
            </p>
          </div>
        </Section>

        <Section id="side-by-side" tone="band" track="side_by_side" title="Five translations, side by side" intro="Oldest to newest, then ours. Each one is in the public domain or our own.">
          <Renderings
            label="Bhagavad Gita 11.32 in five English translations"
            items={[
              {
                who: 'K. T. Telang',
                year: '1882',
                lines: [
                  'I am death, the destroyer of the worlds, fully developed, and I am now active about the overthrow of the worlds.',
                  'Even without you, the warriors standing in the adverse hosts, shall all cease to be.',
                ],
                note: 'Death, the destroyer of the worlds: six decades before Trinity, and close to Oppenheimer’s words.',
                source: 'Sacred Books of the East, vol. 8',
                href: 'https://archive.org/details/bhagavadgtwithsa00tela',
                location: 'oppenheimer_rendering_telang',
              },
              {
                who: 'Edwin Arnold',
                year: '1885',
                lines: [
                  'Thou seest Me as Time who kills,',
                  'Time who brings all to doom,',
                  'The Slayer Time, Ancient of Days, come hither to consume;',
                  'Excepting thee, of all these hosts of hostile chiefs arrayed,',
                  'There stands not one shall leave alive the battlefield!',
                ],
                note: 'Time, three times over. Arnold reads ṛte ’pi tvām as “except you”.',
                source: 'The Song Celestial, Project Gutenberg',
                href: 'https://www.gutenberg.org/ebooks/2388',
                location: 'oppenheimer_rendering_arnold',
              },
              {
                who: 'Annie Besant',
                year: '1905 edition',
                lines: [
                  'Time am I, laying desolate the world,',
                  'Made manifest on earth to slay mankind!',
                  'Not one of all these warriors ranged for strife',
                  'Escapeth death; thou shalt alone survive.',
                ],
                note: 'Also Time, and also “except you”: Arjuna alone survives.',
                source: 'The Bhagavad Gita, with Bhagavan Das',
                href: 'https://archive.org/details/wg1100',
                location: 'oppenheimer_rendering_besant',
              },
              {
                who: 'Arthur W. Ryder',
                year: '1929',
                lines: RYDER_1132,
                note: 'The teacher’s Death, which Oppenheimer kept, and “though you fail and flee” for “even without you”.',
                source: 'The Bhagavad-Gita, University of Chicago Press',
                href: 'https://archive.org/details/bhagavadgita0000unse_g1d6',
                location: 'oppenheimer_rendering_ryder',
              },
              {
                who: 'Wisdom',
                year: 'our translation',
                lines: [v['11.32'].meaning],
                note: 'Time for kāla, and “even without you”, with Shankara and Ramanuja.',
                source: 'Bhagavad Gita 11.32 on this site',
                href: v['11.32'].href,
                location: 'oppenheimer_rendering_wisdom',
                own: true,
              },
            ]}
          />
          <div className="sx-prose rv">
            <p>
              Modern translations by Edgerton, Easwaran, Mitchell, Sargeant and others are still in copyright, so we name them without quoting.
              Our <a href="/blogs/best-bhagavad-gita-translation" data-mp-location="oppenheimer_best_translation">guide to English translations</a>{' '}
              compares them.
            </p>
            <h3>“Even without you” or “except you”?</h3>
            <p>
              The second half of the verse divides the translators. <em lang="sa-Latn">Ṛte ’pi tvām</em> can mean “even without you” or “except
              you”. Telang and Ryder read the first: the warriors will die whether or not Arjuna fights. Arnold and Besant read the second: all
              will die except Arjuna. The commentators divide the same way. Shankara, Ramanuja, Shridhara and Madhusudana gloss{' '}
              <em lang="sa-Latn">ṛte</em> as <em lang="sa-Latn">vinā</em>, without, and Madhusudana adds that Arjuna’s own part in it counts for
              nothing. Purushottama, of Vallabha’s school, reads “except you, the one who sees, the one I favour”, and Vallabha allows both. On
              the main point all of them agree: the ending is already in motion.
            </p>
          </div>
        </Section>

        <Section id="chapter-11" track="chapter_11" title="Where the verse sits in chapter 11" width="narrow">
          <div className="sx-prose rv">
            <ol>
              <li>Arjuna, moved by what Krishna has taught him, asks to see his divine form (11.3 to 11.4).</li>
              <li>Krishna gives him divine sight, since ordinary eyes cannot see it (11.8).</li>
              <li>Sanjaya describes a radiance like a thousand suns rising at once (11.12).</li>
              <li>Arjuna sees arms, mouths and eyes without number, with no beginning, middle or end (11.16).</li>
              <li>Shaken, he twice calls the form Vishnu (11.24, 11.30).</li>
              <li>He watches Bhishma, Drona, Karna and the sons of Dhritarashtra rushing into its blazing mouths (11.26 to 11.27).</li>
              <li>He asks: who are you, in this fierce form? I do not understand what you are doing (11.31).</li>
              <li>Krishna answers with 11.32, and goes on in 11.33: they are already slain by me; be only the instrument.</li>
              <li>Arjuna, glad and afraid at once, asks to see the familiar four-armed form again, and Krishna returns to his gentle shape and comforts him (11.45 to 11.50).</li>
            </ol>
          </div>
          <VerseCard {...verseProps(v['11.33'])} label="The next verse, 11.33" size="compact" toggle rv />
          <div className="sx-prose rv">
            <p>
              Oppenheimer’s “multi-armed form” is this vision. Some writers count “Vishnu” as his slip, since the speaker is Krishna. The name
              fits the scene better than that: Arjuna himself uses it, and in Hindu tradition Krishna is an avatar of Vishnu.
            </p>
            <p>
              Ramanuja’s note on 11.33 adds a detail the famous line leaves out. The warriors Krishna has already slain are, in his words, those
              who have done wrong. The verse speaks of a war already declared and of a reckoning already made, and Arjuna is asked to act within
              it.
            </p>
          </div>
        </Section>

        <Section id="says" tone="band" track="says_and_not" title="What 11.32 says, and what it leaves unsaid" width="narrow">
          <div className="sx-prose rv">
            <h3>What it says</h3>
            <ul>
              <li>God, in the form Arjuna asked to see, names himself Time grown vast, the maker of the worlds’ end.</li>
              <li>He has come, here and now, to gather in the warriors on the field.</li>
              <li>Their end does not wait on Arjuna. With 11.33, he is asked to act as an instrument in what is already decided.</li>
            </ul>
            <h3>What it leaves unsaid</h3>
            <ul>
              <li>It does not use the Gita’s word for death, <em lang="sa-Latn">mṛtyu</em>, which appears in 10.34.</li>
              <li>It has no “now” and no “become”. The Sanskrit is “I am”.</li>
              <li>It is spoken by Krishna to Arjuna, in answer to a direct question. No human speaker claims it for himself.</li>
              <li>It offers no praise of destruction. The chapter closes with Arjuna asking for the gentle form, and Krishna giving it.</li>
            </ul>
          </div>
        </Section>

        <Section id="why-it-stayed" track="why_it_stayed" title="Why it stayed with him" width="narrow">
          <div className="sx-prose rv">
            <p>
              Hijiya argues that Oppenheimer took three ideas from the Gita: that a person has a duty to do, that he should do it without
              clinging to its results, and that devotion matters most of all. The middle one is the teaching of{' '}
              <a href="/gita/chapter/2/verse/47" data-mp-location="oppenheimer_link_2_47">2.47</a>, the Gita’s best known verse. Read in its own
              chapter, 11.32 belongs with that teaching. Arjuna is asked to act, and the outcome rests elsewhere.
            </p>
            <p>
              Whether that lightened the weight for Oppenheimer, or only named it, is a question his life kept open. The verse, read slowly, asks
              something of every reader who has had to act inside events far larger than one person.
            </p>
          </div>
        </Section>

        <Section tone="band" track="faq" title="Questions people ask" width="narrow">
          <Faq items={FAQ} />
        </Section>

        <Section track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey="oppenheimer" placement="end" copy={CURIOUS_NEXT} />
          </div>
        </Section>

        <Section tone="band" track="keep_reading" title="Keep reading">
          <LinkCards items={[...curiousCards(CURIOUS_START, 'oppenheimer_related', 'oppenheimer'), ...curiousCards(CURIOUS_CONCEPTS, 'oppenheimer_related').slice(0, 2)]} />
        </Section>

        <Section track="sources" title="Sources" width="narrow" spacing="tight">
          <div className="sx-prose">
            <ol>
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" data-mp-location="oppenheimer_source">
                    {s.label}
                  </a>
                  {s.note ? `. ${s.note}` : ''}
                </li>
              ))}
            </ol>
            <p>
              Sanskrit is from this site’s verse files, checked against the IIT Kanpur text. IAST is generated from the Devanagari. English
              renderings of the commentaries are our own. Translations shown are in the public domain or our own; modern translations are named,
              not quoted.
            </p>
          </div>
        </Section>
      </main>
    </>
  )
}

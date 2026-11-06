import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'

const PATH = '/learn/dhyana'
const TITLE = 'Dhyana: what meditation means in yoga and the Bhagavad Gita'
const DESC =
  'What dhyāna (ध्यान) means, how it differs from dhāraṇā and samādhi, how the Bhagavad Gita describes it, and how to practise it simply.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Pillar Dhyana"
      pillarPage="dhyana"
      answer={
        <p>
          Dhyāna (ध्यान) is Sanskrit for meditation, a steady, unbroken flow of attention toward one object. In Patañjali&apos;s Yoga Sūtra it is the
          seventh of the eight limbs of yoga, after dhāraṇā (holding the mind on one place) and before samādhi (absorption). The Bhagavad Gita gives its
          sixth chapter, Dhyāna Yoga, to the practice and compares the settled mind to a lamp in a windless place that does not flicker (6.19). In
          everyday Hindi, dhyān simply means attention.
        </p>
      }
      refs={[
        { text: 'Patañjali, Yoga Sūtra 2.29 (the eight limbs) and 3.1-3.4 (dhāraṇā, dhyāna, samādhi, saṁyama).' },
        { text: 'Bhagavad Gita, chapter 6 (Dhyāna Yoga), especially 6.10-6.14, 6.19, 6.26 and 6.35.', href: 'https://wisdomquotes.in/gita/chapter/6/verse/19' },
        { text: 'Bhagavad Gita 10.25 (among offerings, I am the offering of japa).', href: 'https://wisdomquotes.in/gita/chapter/10/verse/25' },
      ]}
    >
      <p>
        If you grew up in a Hindi-speaking home, you heard this word long before anyone taught you to meditate. <i>Dhyān se</i>, someone would say as you
        stepped off the kerb or carried a full glass across the room. Carefully. Pay attention.
      </p>
      <p>
        That everyday word and the dhyāna of the yoga texts are the same word. Keep the kerb in mind as you read on. It&apos;s the most useful definition
        of meditation I know.
      </p>

      <h2>What does dhyana mean?</h2>
      <p>
        <i>Dhyāna</i> comes from the Sanskrit root <i>dhyai</i>: to think of, to contemplate, to hold in mind. In yoga texts it means sustained meditation,
        attention that rests on its object without breaking. In Hindi, ध्यान (dhyān) stays humble. <i>Dhyān se</i> means carefully, and <i>dhyān
        rakhnā</i> means take care. Strip away the incense and that is all dhyana asks for: attention, given fully and kept steady.
      </p>
      <p>
        The word travelled with Buddhism. Sanskrit <i>dhyāna</i> became Pāli <i>jhāna</i>, then Chinese <i>chán</i> (禪), then Japanese <i>zen</i>. Zen is,
        by its very name, the meditation school.
      </p>

      <h2>Dhyana in the Yoga Sūtra</h2>
      <p>
        Patañjali lists eight limbs of practice (2.29): <i>yama</i> and <i>niyama</i> (ethical conduct), <i>āsana</i> (posture), <i>prāṇāyāma</i> (breath),{' '}
        <i>pratyāhāra</i> (withdrawing the senses), <i>dhāraṇā</i> (concentration), <i>dhyāna</i> (meditation) and <i>samādhi</i> (absorption). He defines
        the last three in three very short verses at the opening of the third chapter:
      </p>
      <p>
        <span className="dh-sa" lang="sa">देशबन्धश्चित्तस्य धारणा</span>
        <span className="dh-tl">deśa-bandhaś cittasya dhāraṇā (3.1)</span>
        <span className="dh-tr">Dhāraṇā is binding the mind to one place.</span>
        <span className="dh-sa" lang="sa">तत्र प्रत्ययैकतानता ध्यानम्</span>
        <span className="dh-tl">tatra pratyaya-ekatānatā dhyānam (3.2)</span>
        <span className="dh-tr">Dhyāna is the unbroken flow of awareness towards that.</span>
        <span className="dh-sa" lang="sa">तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः</span>
        <span className="dh-tl">tad evārtha-mātra-nirbhāsaṁ svarūpa-śūnyam iva samādhiḥ (3.3)</span>
        <span className="dh-tr">Samādhi is when only the object shines, as if the mind were empty of itself.</span>
      </p>

      <h2>Dharana, dhyana and samadhi side by side</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Dhāraṇā</th>
            <th>Dhyāna</th>
            <th>Samādhi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>In plain English</td>
            <td>Concentration</td>
            <td>Meditation</td>
            <td>Absorption</td>
          </tr>
          <tr>
            <td>What it feels like</td>
            <td>Placing attention, and placing it again each time it slips</td>
            <td>Attention that stays without being placed</td>
            <td>The sense of &ldquo;me, meditating&rdquo; falls away</td>
          </tr>
          <tr>
            <td>Effort</td>
            <td>Deliberate</td>
            <td>Lighter, continuous</td>
            <td>Effortless</td>
          </tr>
          <tr>
            <td>Where most sits spend their time</td>
            <td>Here, mostly</td>
            <td>In stretches</td>
            <td>Rarely, and best left unchased</td>
          </tr>
        </tbody>
      </table>
      <p>
        Patañjali calls the three together <i>saṁyama</i> (3.4). On the cushion they blur into each other. You place attention, it holds for a while, it
        slips, you place it again. Every one of those returns is dhāraṇā doing its work, and dhyāna grows out of enough of them.
      </p>

      <h2>Dhyana in the Bhagavad Gita</h2>
      <p>
        The Gita&apos;s sixth chapter is called <i>Dhyāna Yoga</i>, the yoga of meditation (some editions title it <i>Ātma-saṁyama Yoga</i>). For a
        philosophical text it&apos;s surprisingly hands-on. Krishna tells Arjuna to sit alone somewhere quiet (6.10), on a seat neither too high nor too low
        (6.11), with body, head and neck straight and still (6.13). Eat and sleep in moderation, he adds (6.16-6.17). Then comes the image this whole site
        is named after:
      </p>
      <p>
        <span className="dh-sa" lang="sa">यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता</span>
        <span className="dh-tl">yathā dīpo nivāta-stho neṅgate sopamā smṛtā (6.19)</span>
        <span className="dh-tr">As a lamp in a windless place does not flicker: that is the image of the yogi’s steady mind.</span>
      </p>
      <p>
        The chapter doesn&apos;t pretend it&apos;s easy. Wherever the restless mind wanders, bring it back (6.26). When Arjuna protests that the mind is as hard
        to hold as the wind, Krishna agrees with him. Then he gives a two-word method every tradition since has repeated in its own language:{' '}
        <i>abhyāsa</i>, steady practice, and <i>vairāgya</i>, letting go (6.35). I read the chapter verse by verse in{' '}
        <Link href="/gita">how to meditate according to the Bhagavad Gita</Link>.
      </p>

      <h2>How to practise dhyana</h2>
      <p>
        Sit upright on a cushion or a chair somewhere quiet, and rest your hands in your lap. <Link href="/learn/dhyana-mudra">Dhyāna mudrā</Link> works well
        if you like a formal hold.
      </p>
      <p>
        Choose one object. The breath is the simplest. A mantra turns the sit into <Link href="/learn/japa-meditation">japa</Link>. Or gaze at a flame for a
        few minutes and then hold its image with your eyes closed, which is <Link href="/learn/trataka">trāṭaka</Link>.
      </p>
      <p>
        Now place your attention on it. When it slips, notice, and place it again. At first this is nearly the whole sit, and that&apos;s fine. It&apos;s
        dhāraṇā, the limb before.
      </p>
      <p>
        Somewhere along the way you&apos;ll catch stretches where attention stays without being held. Leave them alone. Grabbing at them ends them. Over weeks
        they lengthen by themselves, and those stretches are dhyāna.
      </p>
      <p>
        When the bell sounds, stay a moment longer and notice how you are before you stand. For a fuller walkthrough of sitting in silence, see{' '}
        <Link href="/learn/silent-meditation">silent meditation</Link>.
      </p>

      <h2>The lamp in a windless place</h2>
      <p>
        Verse 6.19 also happens to describe what a sit looks like from the outside. A settled body goes quiet the way a flame does when the draught stops.{' '}
        <Link href="/">Dhyaan</Link> takes its name and its picture from that line, and so does the{' '}
        <Link href="/nivata">60-second Nivāta test</Link>. Hold your phone, be the lamp, and find out how still a minute really is.
      </p>

      <h2>Three common questions</h2>
      <h3>What is dhyana called in English?</h3>
      <p>
        Meditation. More exactly, sustained or unbroken meditation, as distinct from concentration (dhāraṇā) and absorption (samādhi).
      </p>
      <h3>Is dhyana Hindu or Buddhist?</h3>
      <p>
        Both. The word and the practice appear in the Upaniṣads, the Gita and the Yoga Sūtra. They became central to Buddhism too, where <i>jhāna</i> names
        stages of meditative absorption, and they gave Zen its name.
      </p>
      <h3>What is the difference between dhyan and meditation?</h3>
      <p>
        In Hindi conversation <i>dhyān</i> usually means attention or care. In yoga it names the specific stage described above. The English word
        &ldquo;meditation&rdquo; stretches much wider, from guided relaxation to visualisation, and dhyana is one fairly strict corner of it.
      </p>
    </Article>
  )
}

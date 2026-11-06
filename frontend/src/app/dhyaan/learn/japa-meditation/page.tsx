import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'
import { pubmed } from '../../_lib/refs'

const PATH = '/learn/japa-meditation'
const TITLE = 'Japa meditation: how to meditate with a mantra and a mala'
const DESC =
  'What japa is, how to move through 108 beads, the three ways of chanting, and how to keep count without losing the mantra halfway round.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Learn Japa"
      pillar="dhyana"
      answer={
        <p>
          Japa (जप) is meditation by repetition. You repeat a mantra or a sacred name, usually counting on a mala of 108 beads. Sit upright and hold the
          mala in your right hand, draped over the middle finger. Say the mantra once per bead and move to the next one with your thumb. When you reach the
          larger head bead, the meru, turn the mala around instead of crossing it. Japa can be spoken aloud, whispered or repeated silently, and many
          teachers consider the silent form the subtlest.
        </p>
      }
      refs={[
        { text: 'Bhagavad Gita 10.25 (among offerings, I am the offering of japa).', href: 'https://wisdomquotes.in/gita/chapter/10/verse/25' },
        { text: 'Bernardi L et al. (2001). Effect of rosary prayer and yoga mantras on autonomic cardiovascular rhythms: comparative study. BMJ 323:1446-1449.', href: pubmed('Effect of rosary prayer and yoga mantras on autonomic cardiovascular rhythms: comparative study') },
        { text: 'Pascoe MC, Thompson DR, Jenkins ZM, Ski CF (2017). Mindfulness mediates the physiological markers of stress: systematic review and meta-analysis. Journal of Psychiatric Research.', href: pubmed('Mindfulness mediates the physiological markers of stress: Systematic review and meta-analysis') },
      ]}
    >
      <p>
        Lots of people bounce off breath meditation. The breath is too faint, too slippery, too easy to lose. Then someone hands them a string of beads and a
        single word to repeat, and something finally clicks.
      </p>
      <p>
        Japa is one of the most widespread meditation practices on earth, and one of the most forgiving. It hands a restless mind a job: a sound to come back
        to, and something to hold. In the Bhagavad Gita, Krishna names it outright. Among offerings, he says, I am the offering of japa (10.25).
      </p>

      <h2>What japa is</h2>
      <p>
        <i>Japa</i> means repetition, specifically repeating a mantra or a name of the divine with your full attention. The mantra can be a single syllable
        like <i>Om</i>, a name like <i>Rām</i> or <i>Om Namaḥ Śivāya</i>, or a longer verse such as the Gāyatrī. Many people receive one from a teacher or a
        family tradition. If you haven&apos;t, a simple one from your own background will do.
      </p>

      <h2>Three ways of chanting</h2>
      <table>
        <thead>
          <tr>
            <th>Form</th>
            <th>How</th>
            <th>Good for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vācika (spoken)</td>
            <td>Aloud, at a steady pace</td>
            <td>Starting out, sleepy days, chanting with others</td>
          </tr>
          <tr>
            <td>Upāṁśu (whispered)</td>
            <td>Lips move, little or no sound</td>
            <td>Shared rooms. The step in between</td>
          </tr>
          <tr>
            <td>Mānasika (mental)</td>
            <td>Silently, in the mind</td>
            <td>Settled practice. Often called the subtlest form</td>
          </tr>
        </tbody>
      </table>
      <p>
        Within a single sit, people often start aloud, soften to a whisper, and then let the mantra carry on silently. Silent japa is the form that slides
        most easily into the unbroken attention the yoga texts call <Link href="/learn/dhyana">dhyāna</Link>.
      </p>

      <h2>How to use a mala</h2>
      <p>
        Hold the mala in your right hand, draped over the middle finger (some traditions use the ring finger). The index finger traditionally stays off the
        beads.
      </p>
      <p>
        Find the meru, or sumeru, the larger bead or tassel where the string joins, and start on the first bead beside it. Say the mantra once, then pull the
        next bead toward you with your thumb. One bead, one repetition. Let the beads do the counting so your mind doesn&apos;t have to.
      </p>
      <p>
        When your thumb arrives back at the meru, you&apos;ve finished a round of 108. Don&apos;t cross over it. If you want another round, turn the mala around
        and go back the way you came.
      </p>
      <p>
        Why 108? You&apos;ll hear astronomical, numerological and devotional explanations, and nobody agrees on one. In practice, a round is long enough to
        settle into. With a short mantra it usually takes five to ten minutes.
      </p>

      <h2>When the mind wanders mid-mantra</h2>
      <p>
        It will. At some point you&apos;ll notice your thumb still moving and your lips still shaping the words while your mind is off in last Tuesday&apos;s
        meeting. Everyone who has held a mala knows this.
      </p>
      <p>
        When you notice, come back to the sound and the meaning of the next repetition. Don&apos;t restart the round. Coming back is the practice here, the same
        as in any other meditation.
      </p>

      <h2>What happens in the body</h2>
      <p>
        One of the most-cited studies of repetitive prayer appeared in the BMJ in 2001. When people recited the rosary in Latin, or a yoga mantra, their
        breathing slowed to about six breaths a minute, the pace at which heart rhythms and blood-pressure rhythms fall into step. A larger review found that
        mantra-based meditation lowered systolic blood pressure, though the evidence there is weaker than for other effects.
      </p>
      <p>
        So steady chanting quietly does what paced-breathing exercises set out to do. It also explains why your watch can read high after a round. More in{' '}
        <Link href="/learn/meditation-and-hrv">meditation and HRV</Link>.
      </p>

      <h2>Ajapa japa</h2>
      <p>
        <i>Ajapa japa</i>, &ldquo;unrepeated repetition&rdquo;, ties a mantra to the breath until it seems to repeat itself. The classic pairing is <i>so</i> on
        the in-breath and <i>haṁ</i> on the out-breath, meaning &ldquo;I am that&rdquo;. It&apos;s a gentle bridge from japa into silent breath meditation.
      </p>

      <h2>Japa on Apple Watch</h2>
      <p>
        A real mala is lovely, and it isn&apos;t always in your pocket. In <Link href="/">Dhyaan</Link>, the Apple Watch&apos;s Digital Crown can stand in for one.
        Each click is a bead, a tap marks the end of a round of 108, and the screen can stay dark the whole time. There are other ways to sit with only the
        Watch in <Link href="/learn/meditate-without-your-phone">meditating without your phone</Link>.
      </p>
      <p>But if you have a mala somewhere in a drawer, try it tonight. One round. See where the 108th bead finds you.</p>
    </Article>
  )
}

import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'

const PATH = '/learn/dhyana-mudra'
const TITLE = 'Dhyana mudra: how to hold your hands in meditation'
const DESC =
  'How to form dhyāna mudrā, which hand goes on top, what your thumbs give away about your attention, and the small mistakes that make it tiring.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Learn Dhyana Mudra"
      pillar="dhyana"
      answer={
        <p>
          Dhyāna mudrā (ध्यान मुद्रा), the gesture of meditation, is made by resting both hands in your lap, palms up. One hand lies in the other and the
          thumb tips touch lightly to make an oval. Many Indian and Buddhist images show the right hand on top, and Zen puts the left on top. Either is
          fine as long as you keep it. The hands rest close to the belly, a little below the navel, with the shoulders loose.
        </p>
      }
      refs={[
        { text: 'Dōgen, Fukanzazengi (1227): instructions for zazen, including the hand position.' },
        { text: 'Bhagavad Gita 6.13 (holding the body, head and neck erect and still).', href: 'https://wisdomquotes.in/gita/chapter/6/verse/13' },
      ]}
    >
      <p>
        Picture almost any seated Buddha you&apos;ve seen. The hands rest in the lap, one cupped in the other, thumbs just touching. That&apos;s dhyāna mudrā,
        and it may be the oldest meditation hand position there is. You&apos;ll find it in Indian yoga, in Theravāda, Tibetan and Zen Buddhism, and on
        thousands of statues across Asia.
      </p>
      <p>
        It has lasted because it works. It keeps your hands still and your shoulders free, and your thumbs quietly report on your attention all sit long.
      </p>

      <h2>How to form dhyana mudra</h2>
      <ol>
        <li>Sit upright on a cushion or chair. On the floor, get your hips a little higher than your knees.</li>
        <li>Turn both palms up.</li>
        <li>Lay one hand in the other so the fingers overlap, knuckles roughly lined up.</li>
        <li>Let the thumb tips rise and touch lightly, so thumbs and index fingers make an oval.</li>
        <li>Rest the hands against your lower belly, a few centimetres below the navel, supported by your thighs or a folded cloth.</li>
        <li>Let your elbows hang a little away from your sides and your shoulders drop.</li>
      </ol>

      <h2>Which hand goes on top?</h2>
      <p>
        Traditions disagree, and that&apos;s fine. Many Indian and Southeast Asian images show the right hand resting on the left. Sōtō Zen follows
        Dōgen&apos;s instructions and puts the left hand on the right.
      </p>
      <p>
        Pick one and stay with it. After a few weeks your hands will find the position without you thinking about it, and that familiarity is worth more than
        getting the &ldquo;right&rdquo; side.
      </p>

      <h2>What your thumbs give away</h2>
      <p>
        Zen teachers have used the thumbs as an attention gauge for centuries. Glance at them, or just feel them, partway through a sit.
      </p>
      <table>
        <thead>
          <tr>
            <th>Thumbs</th>
            <th>Usually means</th>
            <th>Try</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pressing hard, making a peak</td>
            <td>Too much effort, tension</td>
            <td>Soften the jaw and shoulders. Lengthen the out-breath</td>
          </tr>
          <tr>
            <td>Drooping apart, making a valley</td>
            <td>Dullness or drowsiness</td>
            <td>Straighten the spine. Open your eyes slightly</td>
          </tr>
          <tr>
            <td>Touching lightly, level</td>
            <td>Alert and at ease</td>
            <td>Nothing. Carry on</td>
          </tr>
        </tbody>
      </table>
      <p>
        I love that last row. Awake without strain is about as short a description of meditation as you&apos;ll find, and it fits between two thumbs. If you
        keep finding a valley, read <Link href="/learn/falling-asleep-during-meditation">falling asleep during meditation</Link>.
      </p>

      <h2>Why hold the hands at all?</h2>
      <p>
        Hands with nowhere to be will fidget. Give them a fixed, comfortable place and you remove one of the biggest sources of small movements in a sit.
        Joining them at the centre also keeps your body symmetrical, which makes it easier for the spine to stay up on its own.
      </p>
      <p>
        Over time the gesture becomes a cue as well. When the hands settle into the oval, the sit has begun.
      </p>
      <p>
        You&apos;ll read claims that particular mudrās balance energies or treat specific conditions. No study I know of backs those up. The practical reasons
        are plenty.
      </p>

      <h2>Mistakes that make it tiring</h2>
      <p>
        The most common one is holding the hands up in the air. Your shoulders will ache within minutes. Let your legs or a cushion take the weight.
      </p>
      <p>
        Next is gripping. The fingers rest in each other, loosely, the way you&apos;d hold a bird you didn&apos;t want to crush. And if you find yourself
        slumping forward to reach your hands, raise the hands instead. Bring the hands to the body, never the body to the hands.
      </p>
      <p>
        Last, resist changing position every sit. Half the value comes from the hands knowing where to go.
      </p>

      <h2>Other hand positions</h2>
      <p>
        <i>Jñāna</i> or <i>chin mudrā</i>, the index fingertip touching the thumb with the hands on the knees, is widely used too, especially in Indian yoga. It
        suits people who find hands in the lap awkward. Palms resting face down on the thighs is fine as well. The best position is whichever one you can hold,
        still and easy, for the whole sit.
      </p>

      <h2>Mudra and your Watch</h2>
      <p>
        If you meditate wearing an Apple Watch, a steady hold gives it a clean signal. With nothing to fidget, the Watch can see the moment your hands really
        settled. <Link href="/">Dhyaan</Link> uses that to show when you arrived in each sit and how often you moved, and I explain the setup in{' '}
        <Link href="/learn/meditation-apple-watch-airpods">meditating with Apple Watch and AirPods</Link>.
      </p>
      <p>Tonight, before you open any app, just try the oval and see what your thumbs say.</p>
    </Article>
  )
}

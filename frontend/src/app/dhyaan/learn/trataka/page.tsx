import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'
import { doi, pmc } from '../../_lib/refs'

const PATH = '/learn/trataka'
const TITLE = 'Trataka (candle gazing): how to do it safely'
const DESC =
  'The classical instruction from the Haṭha Yoga Pradīpikā, a gentle beginner practice you can do tonight, what the small studies found, and who should skip it.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Learn Trataka"
      pillar="dhyana"
      answer={
        <p>
          Trāṭaka (त्राटक) is a yogic practice of steady gazing, usually at a candle flame. For beginners: sit upright in a dim, draught-free room with the
          flame at eye level about an arm&apos;s length away. Gaze softly at the tip of the wick for one to two minutes, blinking when you need to, then close
          your eyes and hold the after-image between your eyebrows until it fades. Do three rounds. Small studies report short-term gains in attention and
          working memory. Skip it if you have epilepsy, a light-sensitive condition, glaucoma or recent eye surgery, unless your doctor clears it.
        </p>
      }
      refs={[
        { text: 'Haṭha Yoga Pradīpikā 2.31-2.32 (trāṭaka among the six ṣaṭkarmas).' },
        { text: 'Talwadkar S, Jagannathan A, Raghuram N (2014). Effect of trataka on cognitive functions in the elderly. International Journal of Yoga 7(2):96-103.', href: pmc('PMC4097909') },
        { text: 'Raghavendra BR, Singh P (2016). Immediate effect of yogic visual concentration on cognitive performance. Journal of Traditional and Complementary Medicine.', href: pmc('PMC4738033') },
        { text: 'Swathi PS, Bhat R, Saoji AA (2021). Effect of trataka (yogic visual concentration) on the performance in the Corsi-block tapping task: a repeated measures study. Frontiers in Psychology 12:773049.', href: doi('10.3389/fpsyg.2021.773049') },
        { text: 'Bhagavad Gita 6.19 (a lamp in a windless place does not flicker).', href: 'https://wisdomquotes.in/gita/chapter/6/verse/19' },
      ]}
    >
      <p>
        Light a candle in a dark room and look at it for a minute without looking away. Then close your eyes. The flame is still there, glowing faintly
        behind your eyelids, and for a few seconds your whole attention gathers around it without any effort from you.
      </p>
      <p>
        That small trick is trāṭaka, and yogis have used it for centuries to steady a restless mind before sitting. It&apos;s also one of the few classical
        practices that has been tested, a little, in a lab.
      </p>

      <h2>What trataka is</h2>
      <p>
        Trāṭaka is one of the six <i>ṣaṭkarmas</i>, the cleansing practices of haṭha yoga. The <i>Haṭha Yoga Pradīpikā</i> gives it a single verse: with a steady
        gaze and a collected mind, look at a small point until tears come, and the teachers call this trāṭaka (2.31). The next verse credits it with curing eye
        troubles and drowsiness. That&apos;s a traditional claim, and modern evidence doesn&apos;t back it.
      </p>
      <p>
        In practice it sits on the border between a cleansing technique and meditation. You begin with your eyes open on a flame and finish with them closed on
        its image. The texts name both halves. Gazing at an outer object, whether a flame, a dot or a symbol, is <i>bahiraṅga</i> (external) trāṭaka. Holding the
        image inwardly, usually between the eyebrows, is <i>antaraṅga</i> (internal) trāṭaka. Most people do both in one sitting.
      </p>

      <h2>A beginner practice</h2>
      <p>
        Start with the room. Dim the lights, shut the windows and turn off the fan. A flame in a draught flickers, and the whole practice depends on a steady
        one. Put the candle on a stable, heat-safe surface at eye level when you&apos;re sitting upright, about an arm&apos;s length away (studies have gone as
        far as two metres), and well clear of curtains.
      </p>
      <ol>
        <li>Sit upright with your hands in your lap. Close your eyes and take a few slow breaths.</li>
        <li>
          Open your eyes and rest them on the tip of the wick, just below the brightest part of the flame. Keep your gaze soft and your face relaxed. Try not
          to blink, but don&apos;t fight it. When you blink, come back to the flame. One to two minutes is plenty at first.
        </li>
        <li>Close your eyes. An after-image of the flame will appear. Let it rest between your eyebrows and watch it until it fades.</li>
        <li>Do three rounds of gazing and closing, then sit on with your eyes closed for a few minutes, or slide straight into a silent sit.</li>
      </ol>
      <p>
        Over the weeks you can lengthen each gaze, a minute at a time, as long as your eyes stay comfortable. Watering is expected in the classical practice.
        Stinging, pain or blurry vision afterwards means stop, and go shorter next time.
      </p>

      <h2>What the research says</h2>
      <p>
        There isn&apos;t much, the studies are small, and nearly all of them look at attention.
      </p>
      <p>
        The largest followed 60 older adults, assigned by block randomisation, and found that regular trāṭaka improved measures of attention, working memory and
        executive function compared with a waitlist. In 30 healthy volunteers, a single session improved scores on the Stroop test, a classic measure of
        selective attention. In 41 young adults, one session improved working and spatial memory compared with eye exercises alone.
      </p>
      <p>
        Most of this work comes from yoga research institutes, with small samples and no long-term follow-up. I&apos;d call it encouraging and leave it there.
        Use trāṭaka as a way to steady your attention before a sit. It isn&apos;t a treatment for anything.
      </p>

      <h2>Who should skip it, or check first</h2>
      <ul>
        <li>People with epilepsy or any condition set off by flickering light.</li>
        <li>People with glaucoma, recent eye surgery or an active eye infection.</li>
        <li>Anyone whose eyes get painful, very dry or blurry during or after practice.</li>
        <li>Contact-lens wearers, until the lenses are out.</li>
        <li>Anywhere an open flame isn&apos;t safe. Never leave a candle burning unattended.</li>
      </ul>
      <p>
        If a flame isn&apos;t possible, a small dark dot on a pale wall works for the gazing half. And if you have any eye condition at all, ask your doctor
        before you start.
      </p>

      <h2>The lamp in a windless place</h2>
      <p>
        The Bhagavad Gita compares the settled mind to a lamp in a windless place that does not flicker (6.19). Trāṭaka takes that image literally. You watch a
        steady flame until something in you steadies with it.
      </p>
      <p>
        It&apos;s also the picture at the centre of <Link href="/">Dhyaan</Link>. The <Link href="/nivata">60-second Nivāta test</Link> turns trāṭaka inside out:
        instead of watching a flame, you become one, and your phone shows how still you held. If you&apos;re curious where trāṭaka sits in the bigger picture,
        read <Link href="/learn/dhyana">what dhyana means</Link>. Or just light a candle tonight.
      </p>
    </Article>
  )
}

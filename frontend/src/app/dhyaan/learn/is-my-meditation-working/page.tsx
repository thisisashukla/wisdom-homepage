import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'

const PATH = '/learn/is-my-meditation-working'
const TITLE = 'How to know if your meditation is working'
const DESC =
  'Five signs you can check yourself, what a watch or AirPods can and can’t see, and why a meditation score sends you the wrong way.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      pillar="measuring"
      trackName="Dhyaan Learn Is It Working"
      answer={
        <p>
          Look for change across weeks instead of inside one sit. You settle faster, you catch wandering sooner and come back more easily, thoughts
          push you around less in daily life, and you keep turning up. No body signal or app score has been shown to measure good meditation, so
          compare yourself with your own past and leave the numbers as supporting evidence.
        </p>
      }
      refs={[
        { text: 'Acabchuk RL et al. (2020). Measuring meditation progress with a consumer-grade EEG device: caution from a randomized controlled trial. Mindfulness.' },
        { text: 'Carriere JSA, Seli P, Smilek D (2013). Wandering in both mind and body: individual differences in mind wandering and inattention predict fidgeting. Canadian Journal of Experimental Psychology. See also Seli et al. (2014), “Restless mind, restless body”, JEP: LMC.' },
        { text: 'Hasenkamp W et al. (2012). Mind wandering and attention during focused meditation: a fine-grained temporal analysis of fluctuating cognitive states. NeuroImage.' },
        { text: 'Strohmaier S (2020). The relationship between doses of mindfulness-based programs and depression, anxiety, stress, and mindfulness: a dose-response meta-regression. Mindfulness.' },
        { text: 'Cearns M, Clark SR (2023). The effects of dose, practice habits, and objects of focus on digital meditation effectiveness and adherence: longitudinal study of 280,000+ digital meditation sessions. JMIR.' },
        { text: 'Van Dam NT et al. (2025). Adverse effects of meditation in a representative sample of 886 US meditators.' },
      ]}
    >
      <p>
        Three weeks in, most people hit the same wall. You sit, your mind wanders, you come back, the bell rings, and you stand up wondering whether
        anything happened at all.
      </p>
      <p>
        It&apos;s a fair question. The two usual answers don&apos;t help much. &ldquo;Trust the process&rdquo; asks for faith you haven&apos;t built yet, and a
        score out of 100 measures something nobody has been able to define. There&apos;s a better way to check, and it takes about a minute a day.
      </p>

      <h2>Why it&apos;s hard to tell from the inside</h2>
      <p>
        Meditation works on slow, quiet things. How quickly you notice you&apos;ve drifted. How much one sharp email colours the rest of your afternoon. How
        long it takes to settle when you first sit down. None of these arrives as a big feeling during a single session.
      </p>
      <p>
        So a sit where your mind wandered fifty times can still be a good one. Every return is a repetition, the way every lift at the gym is the exercise.
        The Bhagavad Gita said it plainly a couple of thousand years ago: whenever the restless mind wanders, bring it back (6.26). The coming back is the
        practice.
      </p>

      <h2>Five signs you can check</h2>
      <h3>1. You settle faster</h3>
      <p>
        Notice roughly how long it takes after you sit down before your body stops adjusting and your attention comes to rest. Early on that can eat most of a
        ten-minute sit. With practice the arrival time usually shrinks. It&apos;s one of the clearest signs you&apos;ll get, and one of the easiest to track.
      </p>
      <h3>2. You catch the wandering sooner</h3>
      <p>
        Researchers have asked meditators to press a button the moment they notice their mind has gone somewhere else. What shows up is a loop: focus, drift,
        notice, return. Nobody stops the drift. The gap before you notice it is what gets shorter. If you now catch yourself after one thought where you used
        to lose five minutes to a daydream, you&apos;re getting better.
      </p>
      <h3>3. Your body gets quieter</h3>
      <p>
        People who report more mind-wandering also fidget more. So fewer posture shifts and a stiller head over several weeks is a reasonable sign that your
        attention is steadying. There&apos;s one trap. Someone nodding off is very still too, so stillness only counts when you were awake for it.
      </p>
      <h3>4. Ordinary days feel a little different</h3>
      <p>
        The real test happens off the cushion. Maybe you get over an argument a bit faster, or notice your jaw clenching before it turns into a headache, or
        fall asleep less tangled in tomorrow&apos;s list. Write one line a week about this. A month of those lines will tell you more than any app.
      </p>
      <h3>5. You keep showing up</h3>
      <p>
        It sounds too simple to count. It may be the best predictor we have. A meta-analysis of 203 trials found no clear benefit from longer doses, and a
        study of more than 280,000 app sessions linked practising on most days of the week with the largest change. Four ten-minute sits a week will do more
        for you than one heroic hour on Sunday.
      </p>

      <h2>What sensors can and can&apos;t see</h2>
      <p>
        A phone, an Apple Watch or a pair of AirPods can measure a few real things during a sit. How much you moved. When you went still. How your heart
        rate changed, and sometimes how fast you breathed. Those are useful precisely because they&apos;re concrete and you can line them up against your
        own past sits.
      </p>
      <p>
        They can&apos;t read your mind. No body signal has been validated as a marker of good meditation. When researchers put a popular consumer EEG headband
        through a randomised trial, its scores didn&apos;t track people&apos;s progress. A falling heart rate might be deep calm or the start of a nap, and a
        high HRV reading mostly means you breathed slowly (more in{' '}
        <Link href="/learn/heart-rate-during-meditation">heart rate during meditation</Link>).
      </p>
      <p>
        So I&apos;d treat sensor data as a mirror. Compare a sit only with your own earlier sits of the same kind, and look at weeks instead of single days.
        Put your own description first. If you felt restless and the data says you were still, both are true, and the gap between them is interesting.
      </p>

      <h2>Why I left out a score</h2>
      <p>
        A score turns practice into a performance. You start sitting rigidly to win, which is close to the opposite of what most traditions teach. Worse, a
        score that stays flat while you&apos;re quietly improving is telling you to give up.
      </p>
      <p>
        So <Link href="/">Dhyaan</Link> describes each sit in plain terms: when you arrived, how long you held steady, how your heart settled, how often you came
        back. It never adds those up into a grade.
      </p>

      <h2>When it really isn&apos;t working</h2>
      <p>
        Sometimes a practice is wrong for you, at least for now. A large US survey found that most meditators had an unpleasant experience at some point, and
        about one in eleven had one that got in the way of daily life. If sitting reliably leaves you more anxious, panicky or low, stop. Try something gentler
        or more active, and talk to a teacher or a health professional.
      </p>

      <h2>Start with one line a day</h2>
      <p>
        Pick one practice and one length. Ten minutes is plenty. After each sit, write a single line about how it felt and roughly when you settled. On Sunday,
        read the week back.
      </p>
      <p>
        If you&apos;d like to see what one quiet minute looks like from the outside first, the <Link href="/nivata">60-second stillness test</Link> runs on your
        phone. Then go sit, and in a month, read your lines.
      </p>
    </Article>
  )
}

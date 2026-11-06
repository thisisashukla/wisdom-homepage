import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'
import { doi, pubmed } from '../../_lib/refs'

const PATH = '/learn/falling-asleep-during-meditation'
const TITLE = 'Falling asleep during meditation: why it happens and how to tell'
const DESC =
  'Your head drops, then snaps back up. Why stillness tips into sleep, how to spot a doze, and how to stay awake without forcing it.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Learn Drowsiness"
      pillar="measuring"
      answer={
        <p>
          Meditation and the first stage of sleep begin the same way: the body goes still, breathing slows and heart rate falls. Drowsiness is
          common in long, silent, eyes-closed sits, after meals and when you&apos;re short on sleep. The clearest sign you drifted is a nod, where
          your head sinks forward and jerks back. Sit upright, open your eyes slightly, pick an alert time of day, and keep sits shorter until the
          sleepiness passes.
        </p>
      }
      refs={[
        { text: 'Autonomic nervous system responses and perceived experiences of novice meditators during kinetic and static meditation (2025). Frontiers in Psychology 16:1572499.', href: doi('10.3389/fpsyg.2025.1572499') },
        { text: 'Braboszcz C, Delorme A (2011). Lost in thoughts: neural markers of low alertness during mind wandering. NeuroImage.', href: pubmed('Lost in thoughts: neural markers of low alertness during mind wandering') },
        { text: 'Rodriguez-Larios J, Alaerts K (2020). EEG alpha-theta dynamics during mind wandering in the context of breath focus meditation: an experience sampling approach with novice meditation practitioners. European Journal of Neuroscience.', href: pubmed('EEG alpha theta dynamics during mind wandering in the context of breath focus meditation experience sampling novice') },
        { text: 'Bhagavad Gita 6.16-6.17 (yoga is not for one who sleeps too much, nor for one who stays awake too much).', href: 'https://wisdomquotes.in/gita/chapter/6/verse/16' },
        { text: 'Patañjali, Yoga Sūtra 1.30 (styāna, dullness, among the obstacles to practice).' },
      ]}
    >
      <p>
        The sit is going beautifully. Your body is quiet, the breath has gone soft and slow, and the room seems to have pulled back a little. Then your
        chin hits your chest and you jolt awake, unsure whether thirty seconds passed or five minutes.
      </p>
      <p>
        Almost everyone who meditates knows this moment, and almost everyone takes it as a small failure. I&apos;d take it as information. It&apos;s one
        of the oldest problems in practice, the body has a plain reason for it, and there are a handful of fixes that work.
      </p>

      <h2>Why sitting still makes you sleepy</h2>
      <p>
        Settling into a sit and falling asleep share their opening moves. Your muscles let go, your breathing slows, your heart rate drops and your eyes
        are shut. If you&apos;re carrying a sleep debt, your body reads all of that as permission.
      </p>
      <p>
        Mind-wandering sits close to the edge of sleep as well. EEG studies find that the moments when attention drifts look like a lower-alertness
        state, so a wandering mind and a drowsy one are closer cousins than they feel.
      </p>
      <p>
        The kind of practice makes a difference. In a 2025 study, beginners felt sleepier during still, seated meditation than during movement-based
        meditation, and sleepiest in the unguided stretch of the still sessions. With nothing outside pulling at your attention, staying awake is all on
        you.
      </p>
      <p>
        None of this is news to the traditions. Patañjali names dullness, styāna, among the obstacles to practice. The Bhagavad Gita (6.16-6.17) says yoga
        isn&apos;t for someone who sleeps too much, or too little. Buddhist teachers list sloth and torpor among the five hindrances.
      </p>

      <h2>How to tell settling from drifting</h2>
      <p>From the inside the two can feel alike. These are the differences I&apos;d look for:</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Settled</th>
            <th>Drifting toward sleep</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Head</td>
            <td>Still, balanced on the spine</td>
            <td>Sinks forward slowly, then jerks back up</td>
          </tr>
          <tr>
            <td>Awareness</td>
            <td>Clear. Small sounds and sensations register</td>
            <td>Dreamlike images, gaps you can&apos;t account for</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>Passes, and you roughly know where you are</td>
            <td>Jumps. The bell rings too soon</td>
          </tr>
          <tr>
            <td>Afterwards</td>
            <td>Alert and light</td>
            <td>Groggy, like after a nap</td>
          </tr>
        </tbody>
      </table>
      <p>
        The nod gives it away, and a sensor can see it. Your wrist can&apos;t tell a calm sit from a doze, since your hands are still in both. Your head
        can. A nod has a shape you&apos;d recognise anywhere: a slow sink forward and a quick correction. So{' '}
        <Link href="/">Dhyaan</Link> reads head motion from AirPods and marks a nodding kind of stillness as likely drowsiness, instead of counting it as a
        deeper sit. There&apos;s more on that in <Link href="/learn/meditate-with-airpods">meditating with AirPods</Link>.
      </p>

      <h2>What keeps you awake</h2>
      <p>
        Start with posture. Let the spine rise out of the pelvis and the head balance on top of it, upright and soft. A sofa back or a pillow behind you
        is an invitation to sleep, and your body will accept it.
      </p>
      <p>
        Then let a little light in. Zen students keep their eyes half open, resting on the floor a metre or two ahead. It feels odd for a week, then it
        feels normal, and it helps a lot.
      </p>
      <p>
        If sleepiness keeps winning, move the sit. Before a meal works better than after, and morning beats the half hour before bed. Shorten it too. Ten
        awake minutes do more for you than thirty spent nodding, and you can build back up once you&apos;re reliably awake.
      </p>
      <p>
        Sometimes attention needs a slightly bigger job. Count breaths from one to ten and start again, move a mala bead with each mantra, or listen to
        the sounds in the room. A cooler room and a slightly fuller breath help as well, since warmth and very shallow breathing both pull you down.
      </p>
      <p>
        And sleep more. I know. But a lot of meditation sleepiness is a sleep debt that only shows up once the day goes quiet.
      </p>

      <h2>Is it ever fine to fall asleep?</h2>
      <p>
        If you meditate in bed to drift off, sleep is the whole point and a quiet practice is a lovely way to get there. Just keep those sits apart from
        the ones where you&apos;re training attention. Call one rest and the other practice, and neither will muddle the other.
      </p>
      <p>
        One more thing. If you&apos;re sleepy all day, on the cushion and off it, tell a doctor. Persistent daytime sleepiness has causes worth ruling out
        before you blame your meditation.
      </p>
    </Article>
  )
}

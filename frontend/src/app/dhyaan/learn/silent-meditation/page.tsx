import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'
import { doi, pubmed } from '../../_lib/refs'

const PATH = '/learn/silent-meditation'
const TITLE = 'Silent meditation: how to sit without a voice in your ear'
const DESC =
  'How to meditate in silence at home, one step at a time: where to sit, how to time it, where to put your attention, and what to do when it wanders.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Pillar Silent"
      pillarPage="silent"
      answer={
        <p>
          Silent meditation is sitting with nothing playing, only a timer and a bell. At home, sit upright on a chair or cushion and set a timer for
          10 minutes that ends with a soft sound or a tap. Rest your attention on one thing, such as the breath, the sounds around you, or a word
          repeated inwardly. Each time you notice you&apos;ve drifted, come back without scolding yourself. Ten minutes on most days is a good start.
        </p>
      }
      refs={[
        { text: 'Hasenkamp W et al. (2012). Mind wandering and attention during focused meditation: a fine-grained temporal analysis of fluctuating cognitive states. NeuroImage.', href: doi('10.1016/j.neuroimage.2011.07.008') },
        { text: 'Autonomic nervous system responses and perceived experiences of novice meditators during kinetic and static meditation (2025). Frontiers in Psychology 16:1572499.', href: doi('10.3389/fpsyg.2025.1572499') },
        { text: 'Cearns M, Clark SR (2023). The effects of dose, practice habits, and objects of focus on digital meditation effectiveness and adherence: longitudinal study of 280,000+ digital meditation sessions. Journal of Medical Internet Research.', href: pubmed('effects of dose, practice habits, and objects of focus on digital meditation effectiveness and adherence') },
        { text: 'Bhagavad Gita 6.10-6.14 (the seat, the posture and the steady gaze).', href: 'https://wisdomquotes.in/gita/chapter/6/verse/10' },
        { text: 'Bhagavad Gita 6.26 (wherever the restless mind wanders, bring it back).', href: 'https://wisdomquotes.in/gita/chapter/6/verse/26' },
      ]}
    >
      <p>
        Most people meet meditation through a voice. A teacher on a recording, a soundtrack with rain in it, an app that reminds you every ninety seconds to
        notice your breath. That&apos;s a perfectly good way in.
      </p>
      <p>
        Then, for a lot of people, a day comes when the voice starts to grate. You want to do what meditators did for a few thousand years before anyone
        owned a speaker: sit down, close your eyes and be quiet. This guide is for that day.
      </p>

      <h2>What counts as silent meditation</h2>
      <p>
        Any practice where nothing instructs you while you sit. You choose what to pay attention to beforehand, a timer tells you when to stop, and
        everything in between belongs to you. Most traditions have always practised this way. Zazen in Zen, Vipassana sittings, and the dhyāna described in
        the sixth chapter of the Bhagavad Gita all happen in silence. A silent retreat stretches the same thing across days.
      </p>
      <p>
        You don&apos;t need a perfectly quiet room. Traffic and birdsong are welcome. What makes it silent is that nobody is talking you through it.
      </p>

      <h2>How to do it at home</h2>
      <h3>1. Choose a seat you can keep</h3>
      <p>
        A chair works well. Sit toward the front edge with your feet flat. On a cushion, get your knees lower than your hips. The Gita&apos;s instructions are
        practical here: a seat neither too high nor too low, with body, head and neck held upright and still (6.11-6.13). You&apos;re after a spine that holds
        itself up, so you&apos;re neither slumping nor straining.
      </p>
      <h3>2. Rest your hands</h3>
      <p>
        Put them on your thighs, or fold them in your lap in <Link href="/learn/dhyana-mudra">dhyāna mudrā</Link>. Pick one and stay with it. Fewer
        adjustments make for a quieter sit, and a cleaner reading if you wear a watch.
      </p>
      <h3>3. Set a gentle timer</h3>
      <p>
        Use a soft bell or a haptic tap. An alarm will yank you out of the sit you just built. Start with 10 minutes. A single bell at the halfway mark can
        help you catch a long daydream, but more than that and you&apos;re chopping up the silence.
      </p>
      <h3>4. Pick one thing to attend to</h3>
      <p>
        The breath is the usual choice, felt at the nostrils or as the belly rising and falling. If your home is noisy, sounds make a good anchor: let them
        arrive and leave without naming them. Some people prefer a word or mantra repeated silently, which is the heart of{' '}
        <Link href="/learn/japa-meditation">japa</Link>. Others rest in the plain feeling of sitting, the weight and warmth and contact with the seat.
      </p>
      <p>
        Choose before you sit and stay with your choice for the whole session. Switching anchors halfway is a sneaky form of wandering.
      </p>
      <h3>5. When you drift, come back</h3>
      <p>
        You will drift, often. Studies that follow meditators moment by moment find the same loop in everyone: focus, wander, notice, return. You can&apos;t
        stop the wandering. You can shorten the time before you notice, and you can make the return kind instead of irritated. The Gita puts it simply:
        wherever the restless mind wanders, bring it back (6.26).
      </p>
      <h3>6. End slowly</h3>
      <p>
        When the bell sounds, stay put for a few breaths. Find one or two words for how you feel. Scattered, settled, absorbed. That word is worth more than
        any statistic, so get it down before you look at what your body did.
      </p>

      <h2>When a silent sit goes wrong</h2>
      <h3>&ldquo;My mind won&apos;t stop.&rdquo;</h3>
      <p>
        It was never supposed to. A busy mind you keep returning from is a full practice. If it gets overwhelming, count breaths from one to ten and start
        again.
      </p>
      <h3>&ldquo;I get restless or anxious.&rdquo;</h3>
      <p>
        Open your eyes and let your gaze rest on the floor. Shorten the sit. If silence reliably makes you anxious or panicky, take that seriously. A guided
        or movement-based practice might suit you better for now, and I compare them in{' '}
        <Link href="/learn/guided-vs-silent-meditation">guided vs silent meditation</Link>.
      </p>
      <h3>&ldquo;I keep falling asleep.&rdquo;</h3>
      <p>
        You&apos;re in good company. A 2025 study found beginners got sleepiest during the unguided stretch of still, seated sessions. The fixes are in{' '}
        <Link href="/learn/falling-asleep-during-meditation">falling asleep during meditation</Link>.
      </p>
      <h3>&ldquo;My knees or back hurt.&rdquo;</h3>
      <p>
        Change the seat and keep the practice. Raise the cushion, move to a chair, or lean lightly against a wall. Pain that keeps sharpening means move.
      </p>

      <h2>How long, and how often?</h2>
      <p>
        How often beats how long. In a study of more than 280,000 app sessions, practising on most days of the week went with the biggest improvements. Ten
        minutes four or five days a week is a solid practice. There&apos;s more in{' '}
        <Link href="/learn/how-long-should-you-meditate">how long should you meditate</Link>, and if a broken streak has ever made you quit, read{' '}
        <Link href="/learn/meditation-without-streaks">meditating without streaks</Link>.
      </p>

      <h2>Do you need an app?</h2>
      <p>
        No. A kitchen timer and a chair will do. If you use an app, pick one that does less: a gentle bell, no voice, no pop-ups. The one thing an app can add
        is a view from outside, something you can&apos;t see with your eyes closed.
      </p>
      <p>
        So I built <Link href="/">Dhyaan</Link> as a silent timer first. You sit with nothing playing. After the bell it asks how the sit felt, and then uses
        your AirPods and Apple Watch to show you what your body was doing while you weren&apos;t looking.
      </p>
    </Article>
  )
}

import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'

const PATH = '/learn/track-meditation-apple-watch'
const TITLE = 'How to track meditation on Apple Watch'
const DESC =
  'Log a sit with the Mindfulness app, find it in Apple Health, get a deleted Mindfulness app back, and see what Apple’s own tracking leaves out.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      pillar="devices"
      trackName="Dhyaan Learn Apple Watch"
      answer={
        <p>
          Yes. Open the Mindfulness app on the Watch and start a Reflect or Breathe session of 1 to 5 minutes. It saves Mindful Minutes to Apple Health
          and shows your heart rate at the end. For longer or silent sits, use a third-party meditation app that writes Mindful Minutes to Apple Health,
          so every sit still lands in the same place.
        </p>
      }
      refs={[
        { text: 'Apple Support: Start a Reflect or Breathe session on Apple Watch (Apple Watch User Guide).', href: 'https://support.apple.com/guide/watch/apd371dfe3d7/watchos' },
        { text: 'Apple: Mindfulness app on the App Store (Apple Watch).', href: 'https://apps.apple.com/app/mindfulness/id1560383515' },
      ]}
    >
      <p>
        You sat for twenty minutes this morning. Your Watch was on your wrist the whole time. Open Apple Health and there&apos;s no sign it happened.
      </p>
      <p>
        That surprises a lot of people. Apple Watch only records meditation when an app tells it to, and Apple&apos;s own app tops out at five minutes. Here
        is how to log sits properly, where to find them afterwards, and what to use once five minutes stops being enough.
      </p>

      <h2>Option 1: Apple&apos;s Mindfulness app</h2>
      <p>
        Every Apple Watch comes with Mindfulness, which used to be called Breathe. It runs two kinds of session. In Breathe, an animation swells as you inhale
        and shrinks as you exhale, with soft taps to keep you in rhythm. In Reflect, you get a short written theme to think about while an animation drifts
        on the screen.
      </p>
      <h3>How to log a session</h3>
      <ol>
        <li>Open the <b>Mindfulness</b> app on your Apple Watch.</li>
        <li>Tap <b>Breathe</b> or <b>Reflect</b>.</li>
        <li>To change the length, tap the options button beside it, tap <b>Duration</b> and pick 1 to 5 minutes.</li>
        <li>When the session ends you&apos;ll see a summary with your heart rate.</li>
      </ol>
      <p>
        Breath rate (4 to 10 breaths a minute), haptics and reminders live in <b>Settings › Mindfulness</b> on the Watch, or in the Watch app on your iPhone
        under <b>My Watch › Mindfulness</b>. The same app is where you log <b>State of Mind</b>, a quick check-in on how you feel.
      </p>

      <h2>Where your meditation history lives</h2>
      <p>
        Sessions are saved as <b>Mindful Minutes</b> in the Health app on your iPhone. Search for Mindful Minutes, or look under Mental Wellbeing. They show
        up in the Fitness app as well.
      </p>
      <p>
        Want the heart rate from an old Breathe session? In Health, go to Browse › Heart › Heart Rate › Show More Heart Rate Data, then scroll down to Breathe.
      </p>

      <h2>The Mindfulness app has vanished from my Watch</h2>
      <p>
        Someone probably deleted it, maybe you while tidying up. Mindfulness is a built-in app you&apos;re allowed to remove. Open the <b>App Store</b> on the
        Watch, search for Mindfulness, and install it again. It&apos;s made by Apple and listed as Only on Apple Watch. Your old Mindful Minutes are safe in
        Apple Health the whole time.
      </p>

      <h2>Does meditation count as exercise on Apple Watch?</h2>
      <p>
        A Mindfulness session doesn&apos;t count as a workout. Some people get around the five-minute limit by logging longer sits as an Other workout called{' '}
        <b>Mind &amp; Body</b>. It works as a timer. It also behaves like a workout: it estimates calories and can nudge your Activity rings, which most
        meditators would rather it didn&apos;t. An app that saves Mindful Minutes without starting a workout keeps your rings telling the truth.
      </p>

      <h2>Where Apple&apos;s tracking stops</h2>
      <p>
        For someone who sits regularly, the five-minute ceiling is the first wall. Breathe and Reflect run 1 to 5 minutes, and most silent practice runs 10 to
        30. There&apos;s no plain sit-until-the-bell timer either. You always have an animation to follow.
      </p>
      <p>
        The record itself is thin. Health knows that you sat. It has no idea when you settled, how still you were, or whether you dozed off halfway. And your
        heart rate shows up as one average, with no sense of how it eased down across the sit.
      </p>

      <h2>Option 2: a meditation app that writes to Apple Health</h2>
      <p>
        Most meditation timers on the App Store save Mindful Minutes, so your history stays in one place. When you&apos;re choosing, I&apos;d check that it runs
        on the Watch without your phone, that it doesn&apos;t log a workout behind your back, and that it lets you sit in silence for as long as you like.
      </p>
      <p>
        <Link href="/">Dhyaan</Link>, which I&apos;m building, goes a step further. Its Watch app runs a full silent sit on its own, with a haptic bell and an
        optional haptic breath. Afterwards it shows how your heart settled from start to finish and, if you wore AirPods, how still your head stayed and
        whether you nodded off. Every sit is saved as Mindful Minutes. The waitlist is open now, and it launches in early 2027.
      </p>

      <h2>Before your next sit</h2>
      <p>
        Turn on Do Not Disturb or a Mindfulness Focus so nothing taps your wrist halfway through. Wear the Watch snug, a finger&apos;s width above the wrist
        bone, and let your hands rest still in your lap, since wrist movement muddies heart-rate readings.
      </p>
      <p>
        And sit at about the same time each day. The numbers only start meaning something once you can compare one ordinary Tuesday with the next.
      </p>
    </Article>
  )
}

import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'

const PATH = '/learn/meditate-without-your-phone'
const TITLE = 'How to meditate without your phone (using only Apple Watch)'
const DESC =
  'Start the sit from your wrist, feel the bell as a tap, keep notifications out, and still find out afterwards what happened while your eyes were closed.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Learn Without Phone"
      pillar="devices"
      answer={
        <p>
          Use a meditation app that runs on Apple Watch by itself, so the sit starts and ends on your wrist. Put the Watch in Do Not Disturb, leave the
          phone in another room, and let a haptic tap mark the start and the end. Apple&apos;s built-in Mindfulness app can do this for sessions up to
          five minutes. Longer silent sits need a third-party Watch app.
        </p>
      }
      refs={[
        { text: 'Apple Support: Start a Reflect or Breathe session on Apple Watch.', href: 'https://support.apple.com/guide/watch/apd371dfe3d7/watchos' },
        { text: 'Apple Support: Apple Watch User Guide, Focus and Do Not Disturb.', href: 'https://support.apple.com/guide/watch/welcome/watchos' },
      ]}
    >
      <p>
        You pick up your phone to start a ten-minute timer. There are three notifications waiting, a headline you can&apos;t ignore, and a message that
        &ldquo;only needs a quick reply&rdquo;. Twenty minutes later you still haven&apos;t sat.
      </p>
      <p>
        For a lot of people the hardest part of meditating with an app is where the app lives. The phone is tied to nearly everything you&apos;re trying to
        set down for those ten minutes. The Watch gets you out of this, as long as you set it up for the job.
      </p>

      <h2>Why the phone gets in the way</h2>
      <p>
        Opening it to start a sit is often the moment the sit dies. And it doesn&apos;t stop at the start. An alarm-style chime at the end can yank you out of
        a quiet that took you twenty minutes to reach. Then you pick the phone up to look at your session and you&apos;re straight back in the stream.
      </p>
      <p>
        Meditation apps haven&apos;t helped. Many now wrap the timer in prompts, upsells and pop-ups before and after, and long-time users complain about it in
        every app review section I&apos;ve read.
      </p>

      <h2>Setting up a phone-free sit</h2>
      <p>
        First, check that your meditation app really runs on the Watch by itself. Some Watch apps are just remote controls for the phone and stop working the
        moment it&apos;s in another room.
      </p>
      <p>
        Next, open Control Centre on the Watch and turn on Do Not Disturb, or a Mindfulness Focus, so calls and notifications stay silent. Add Theater mode if
        you don&apos;t want the screen lighting up every time your wrist shifts.
      </p>
      <p>
        Set the bell to a tap. One haptic at the start and one at the end is plenty. If the app offers interval taps, use them sparingly or skip them.
      </p>
      <p>
        Then put the phone somewhere else. Another room is ideal. Face down on the far side of this one is the fallback. Choose your length on the Watch,
        start, rest your hands and close your eyes.
      </p>
      <p>
        When the end tap comes, stay a breath or two. Notice how you feel before you look at anything. Check the Watch after that, and the phone later
        still.
      </p>

      <h2>What the Watch still sees</h2>
      <p>
        Leaving the phone behind costs you less than you&apos;d think. Apple Watch still records your heart rate through the sit and how still your hands
        stayed. Once it syncs, a good app turns that into a picture: how fast your heart settled, when your hands stopped adjusting, how often you moved. Add
        AirPods and head motion shows whether stillness slid into sleep. The{' '}
        <Link href="/learn/meditation-apple-watch-airpods">Apple Watch and AirPods guide</Link> covers the rest.
      </p>

      <h2>Breathing and japa on the wrist</h2>
      <p>
        Two practices fit the Watch especially well. For paced breathing, haptic taps can guide every in-breath and out-breath, so you never need to look at a
        screen. For japa, repeating a mantra a set number of times, the Digital Crown can stand in for a mala. Each click is a bead, and a tap marks the end
        of a round of 108. I go into the practice itself in <Link href="/learn/japa-meditation">japa meditation</Link>.
      </p>

      <h2>How Dhyaan does it</h2>
      <p>
        <Link href="/">Dhyaan</Link>&apos;s Apple Watch app runs by itself. You hold to begin on your wrist, feel the bell as a tap, and pause or end without
        touching a phone. Paced breathing runs on haptics and japa runs on the Digital Crown.
      </p>
      <p>
        When you open your eyes, the reading of your sit is waiting on the phone in the other room. It can wait there as long as you like.
      </p>
    </Article>
  )
}

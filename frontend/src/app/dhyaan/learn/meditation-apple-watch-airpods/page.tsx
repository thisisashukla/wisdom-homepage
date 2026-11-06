import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'

const PATH = '/learn/meditation-apple-watch-airpods'
const TITLE = 'Meditating with Apple Watch and AirPods: the complete guide'
const DESC =
  'What your Watch and AirPods can sense while you sit, what Apple’s Mindfulness app covers and where it stops, and how to set up a quiet, phone-free practice.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Pillar Devices"
      pillarPage="devices"
      answer={
        <p>
          Apple Watch can start a sit from your wrist, mark the bell with a tap, and record your heart rate and wrist movement. AirPods can block
          noise and, on models with head tracking, sense how still your head stays and whether you nodded off. Apple&apos;s Mindfulness app covers short
          guided breathing and reflection sessions of one to five minutes, logged to Apple Health as mindful minutes. For longer silent sits, or to
          see what happened during one, you need a third-party app that reads these sensors.
        </p>
      }
      refs={[
        { text: 'Apple Support: Start a Reflect or Breathe session on Apple Watch (Apple Watch User Guide).', href: 'https://support.apple.com/guide/watch/apd371dfe3d7/watchos' },
        { text: 'Apple Developer Documentation: CMHeadphoneMotionManager (Core Motion).', href: 'https://developer.apple.com/documentation/coremotion/cmheadphonemotionmanager' },
        { text: 'Apple Developer Documentation: HealthKit mindful session samples (HKCategoryTypeIdentifier.mindfulSession).', href: 'https://developer.apple.com/documentation/healthkit/hkcategorytypeidentifier/mindfulsession' },
      ]}
    >
      <p>
        If you meditate and own an iPhone, there&apos;s a good chance you already have the two best meditation sensors you&apos;ll ever buy. One is on your
        wrist. The other is sitting in a little white case on your desk.
      </p>
      <p>
        Set up well, they make a practice quieter. The phone can stay in another room. The bell arrives as a tap on your wrist instead of an alarm. And when
        you open your eyes you can still find out what your body did while you weren&apos;t watching it. Here&apos;s what each device can sense, what Apple
        gives you out of the box, and how I&apos;d set them up for a sit.
      </p>

      <h2>What each device can sense</h2>
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Senses</th>
            <th>Good for</th>
            <th>Limits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple Watch</td>
            <td>Wrist motion, heart rate, occasional HRV samples</td>
            <td>Hand stillness, fidgets, how your heart settled, a haptic bell</td>
            <td>Still hands can hide a busy mind. Apps get no live beat-to-beat data</td>
          </tr>
          <tr>
            <td>AirPods with head tracking</td>
            <td>Head orientation and movement</td>
            <td>Head stillness, drowsy nods, sometimes breathing when you&apos;re very still</td>
            <td>Only models with spatial-audio head tracking. Battery caps very long sits</td>
          </tr>
          <tr>
            <td>iPhone</td>
            <td>Motion, if it&apos;s held or resting on you</td>
            <td>A simple stillness check when you have nothing else</td>
            <td>Put it on a table and it measures the table</td>
          </tr>
        </tbody>
      </table>
      <p>
        Between them the Watch and AirPods cover both halves of a sit. The Watch follows your body through your hands and heart. AirPods give a rough read on
        attention, by watching whether your head stays balanced or drifts and nods. Neither one reads your mind, and an app that claims otherwise is selling
        you something. I go into what these signals can and can&apos;t mean in <Link href="/learn/measuring-meditation">how to measure meditation</Link>.
      </p>

      <h2>What Apple&apos;s Mindfulness app does</h2>
      <p>
        Every Apple Watch ships with Mindfulness, which used to be called Breathe. It has two modes. Breathe paces your breathing with an animation and soft
        taps. Reflect gives you a short prompt to think about. Sessions run from one to five minutes, the summary at the end shows your heart rate, and each
        one lands in Apple Health as mindful minutes. Recent versions of watchOS also let you log your mood in Health, under State of Mind.
      </p>
      <p>
        It&apos;s a good little tool, and it stops at five minutes. There&apos;s no longer silent timer in the built-in app, no record of stillness, fidgeting or
        drowsiness, and no use of your AirPods at all. Heart rate comes as a summary, so you can&apos;t see how it moved through the sit.
      </p>
      <p>
        If you want to log sits and fix the usual problems, see{' '}
        <Link href="/learn/track-meditation-apple-watch">how to track meditation on Apple Watch</Link>.
      </p>

      <h2>Setting up the Watch</h2>
      <p>
        Wear it snug, about a finger-width above the wrist bone, so heart rate reads cleanly. Turn on Do Not Disturb or a Mindfulness Focus so the only tap
        you feel is the bell.
      </p>
      <p>
        Rest your hands in your lap in a position you can hold, such as{' '}
        <Link href="/learn/dhyana-mudra">dhyāna mudrā</Link>. The Watch sees every change in hand position, so a settled hold gives it a cleaner picture.
        Then start the sit from your wrist and leave the phone somewhere else. I walk through that in{' '}
        <Link href="/learn/meditate-without-your-phone">meditating without your phone</Link>.
      </p>

      <h2>Setting up AirPods</h2>
      <p>
        Pick noise cancellation if you live in a loud flat and want a quiet room. Pick transparency if you&apos;d like the sounds around you as your anchor.
        Nothing needs to play. In silence, AirPods work as sensors and as very good earplugs.
      </p>
      <p>
        Charge them before you sit, since a long session with the motion sensors running uses battery. And push them in firmly. A loose earbud wobbles on its
        own, and to the sensor that looks like your head moving. Which models can sense head motion, and more, is in{' '}
        <Link href="/learn/meditate-with-airpods">can you meditate with AirPods in?</Link>
      </p>

      <h2>Where the data goes</h2>
      <p>
        Motion from AirPods and Apple Watch needs your permission under Motion &amp; Fitness. Heart rate and mindful minutes go through Apple Health, which
        asks you type by type. Before you say yes, find out what the app does with it. Does it stay on your devices or go to a server? Is it used to train
        anything? Is it shared with anyone?
      </p>
      <p>
        <Link href="/">Dhyaan</Link> keeps practice data on your devices and doesn&apos;t ask you to make an account. The{' '}
        <Link href="/privacy">privacy page</Link> lists exactly what it reads and why.
      </p>

      <h2>Where Dhyaan fits</h2>
      <p>
        I built Dhyaan for this exact pairing. You sit in silence with AirPods in and the Watch on your wrist. When the bell taps, it asks how the sit felt,
        then reads the sit back to you, with head stillness and nods from the AirPods and hand stillness and heart settling from the Watch. Every sit is free.
        The device-by-device detail is on <Link href="/apple-watch">Dhyaan on Apple Watch and AirPods</Link>.
      </p>

      <h2>Three quick answers</h2>
      <h3>Does Apple Watch track meditation automatically?</h3>
      <p>
        No. It records mindful minutes when you use the Mindfulness app, or a third-party app that writes to Apple Health. Sitting still on your own
        won&apos;t register as meditation.
      </p>
      <h3>Does meditation count as exercise on Apple Watch?</h3>
      <p>
        No. Mindful minutes live apart from Exercise minutes and won&apos;t close your Activity rings, though some apps log a Mind and Body workout as well.
      </p>
      <h3>Which AirPods work for head tracking?</h3>
      <p>
        Models with spatial audio and dynamic head tracking: AirPods Pro, AirPods Max, and AirPods (3rd generation) and later. A good app checks for support
        before it tries to read motion.
      </p>
    </Article>
  )
}

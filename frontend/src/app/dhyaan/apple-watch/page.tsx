import Link from 'next/link'
import { BlogTracker } from '@/components/BlogTracker'
import PageHero from '../_components/PageHero'
import { Phone, Watch } from '../_components/home/Devices'
import WaitlistForm from '../_components/WaitlistForm'
import FaqList from '../_components/Faq'
import JsonLd from '../_components/JsonLd'
import { FAQS, faqLd } from '../_lib/faqs'
import { APP_LD, LAUNCH, pageMeta } from '../_lib/site'

export const metadata = pageMeta({
  title: 'A silent meditation app for Apple Watch and AirPods',
  description:
    'Meditate from your wrist without your phone. Dhyaan’s Apple Watch app gives a haptic bell and breath, then shows how your heart settled. AirPods add head stillness and nod detection.',
  path: '/apple-watch',
})

const deviceFaqs = FAQS.filter((f) => f.group === 'devices')

export default function AppleWatchPage() {
  return (
    <>
      <BlogTracker pageName="Dhyaan Apple Watch" />
      <JsonLd data={[APP_LD, faqLd(deviceFaqs)]} />
      <PageHero
        kicker="Apple Watch · AirPods · iPhone"
        soft="Meditate from your wrist."
        ink="Let your body be read."
        sub="Start a silent sit on Apple Watch, leave your phone in another room, and feel the bell as a tap. Afterwards Dhyaan reads the sit back to you: how your heart settled, how still your hands and head stayed. No audio required, no grade."
        aside={
          <div className="dh-aw__stage">
            <div className="dh-h__glow" aria-hidden="true" />
            <Phone src="/dhyaan-assets/screens/session.webp" alt="A silent sit on iPhone with the flame and 9:00 remaining" className="dh-aw__phone" eager />
            <Watch src="/dhyaan-assets/screens/watch-ready.webp" alt="Apple Watch ready to begin a 12 minute silent sit" className="dh-aw__watch" eager />
          </div>
        }
      >
        <WaitlistForm source="apple_watch" cta="Save my place" />
      </PageHero>

      <section className="dh-sec">
        <div className="dh-wrap">
          <div className="dh-sec__head">
            <h2>What each device adds</h2>
            <p>Dhyaan works with just an iPhone. Each extra device adds one honest signal.</p>
          </div>
          <div className="dh-tw">
            <table className="dh-table">
              <thead><tr><th>Device</th><th>What Dhyaan reads</th><th>What you see after the bell</th></tr></thead>
              <tbody>
                <tr><td><b>iPhone</b> (in your palms or lap)</td><td>Motion from the phone’s sensors</td><td>When you went still, your longest steady stretch, how often you moved</td></tr>
                <tr><td><b>Apple Watch</b></td><td>Heart rate; wrist motion; haptic bell and breath cues</td><td>How your heart settled from start to finish (e.g. 74 → 66), compared with your usual</td></tr>
                <tr><td><b>AirPods</b> (Pro, 3rd gen or later, Max)</td><td>Head motion</td><td>Head stillness, and nods that suggest drowsiness rather than calm</td></tr>
              </tbody>
            </table>
          </div>
          <div className="dh-grid dh-grid--3" style={{ marginTop: 24 }}>
            <div className="dh-card"><h3>Phone-free</h3><p>The Watch app runs a full sit on its own and syncs later. Start from a complication or the Action button on Ultra.</p></div>
            <div className="dh-card"><h3>Haptic breath</h3><p>Optional gentle taps for paced breathing (box, 4-7-8, coherent 5.5), so you never need to look.</p></div>
            <div className="dh-card"><h3>Japa on the Crown</h3><p>Count a 108-bead mala by turning the Digital Crown, with a tap at each round.</p></div>
          </div>
          <p className="dh-small dh-muted" style={{ marginTop: 18 }}>
            Every sit is saved as Mindful Minutes in Apple Health, without logging a workout. New to tracking? Read{' '}
            <Link href="/learn/track-meditation-apple-watch">how to track meditation on Apple Watch</Link>, or the full{' '}
            <Link href="/learn/meditation-apple-watch-airpods">guide to meditating with Apple Watch and AirPods</Link>.
          </p>
        </div>
      </section>

      <section className="dh-sec">
        <div className="dh-wrap">
          <div className="dh-sec__head"><h2>How Dhyaan compares</h2></div>
          <div className="dh-tw">
            <table className="dh-table">
              <thead><tr><th></th><th>Apple Mindfulness</th><th>Guided apps</th><th>Simple timers</th><th>Dhyaan</th></tr></thead>
              <tbody>
                <tr><td>Silent, any length</td><td>1-5 min</td><td>Mostly guided</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>Runs without iPhone</td><td>Yes</td><td>Varies</td><td>Varies</td><td>Yes</td></tr>
                <tr><td>Heart rate settle shown</td><td>Average only</td><td>Rarely</td><td>Rarely</td><td>Start → end, vs your usual</td></tr>
                <tr><td>Stillness &amp; drowsiness</td><td>No</td><td>No</td><td>No</td><td>Phone, Watch &amp; AirPods</td></tr>
                <tr><td>Score or streak pressure</td><td>No</td><td>Often</td><td>Streaks common</td><td>No grade; weekly sankalpa</td></tr>
              </tbody>
            </table>
          </div>
          <p className="dh-small dh-muted" style={{ marginTop: 14 }}>Coming to the App Store in {LAUNCH}. Beta testers are invited from the waitlist.</p>
        </div>
      </section>

      <section className="dh-sec">
        <div className="dh-wrap dh-narrow">
          <div className="dh-sec__head"><h2>Device questions</h2></div>
          <FaqList items={deviceFaqs} />
        </div>
      </section>
    </>
  )
}

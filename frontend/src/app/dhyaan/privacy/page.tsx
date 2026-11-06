import { BlogTracker } from '@/components/BlogTracker'
import { pageMeta } from '../_lib/site'
import PageHero from '../_components/PageHero'

export const metadata = pageMeta({
  title: 'Privacy',
  description: 'What the Dhyaan waitlist stores, what the Dhyaan app keeps on your devices, and how to have your email removed.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <BlogTracker pageName="Dhyaan Privacy" />
      <PageHero kicker="Privacy · updated 6 November 2026" soft="Your practice" ink="stays yours." sub="What the Dhyaan app keeps on your devices, what this waitlist stores, and how to have your email removed." />
      <section className="dh-wrap" style={{ paddingBottom: 80 }}>
      <div className="dh-prose" style={{ maxWidth: 700, margin: '0 auto' }}>

        <h2>The app</h2>
        <p>
          Dhyaan has no account and no server for your practice. Your sits, notes and sensor summaries stay on your iPhone and Apple Watch, and in your own
          Apple Health and iCloud if you allow it. Raw motion is reduced to per-second features on the device and then discarded. We don’t sell data and the app
          contains no advertising trackers.
        </p>

        <h2>This waitlist</h2>
        <p>When you join the waitlist we store:</p>
        <ul>
          <li>your email address;</li>
          <li>the devices you ticked (iPhone, Apple Watch, AirPods);</li>
          <li>your referral code, and the code of whoever referred you, if anyone;</li>
          <li>where you came from (campaign tags in the link), your country from your connection, and your browser type, to understand which channels work.</li>
        </ul>
        <p>
          It is stored in a database hosted by Supabase and is used only to email you about the beta and the launch. We send at most a handful of emails, never
          share or sell the list, and delete it within six months of launch unless you choose to stay subscribed.
        </p>
        <p>
          This site uses Mixpanel to count page views and button taps (for example, how many people finish the 60-second test). The 60-second test runs entirely
          in your browser. Motion readings never leave your phone.
        </p>

        <h2>Your choices</h2>
        <p>
          To have your email removed, or to ask what we hold about you, email <b>work.ankurshukla@gmail.com</b> from the address you signed up with and we will do it
          within 7 days.
        </p>

        <h2>Who we are</h2>
        <p>Dhyaan is made by Ankur Shukla, who also makes Wisdom (wisdomquotes.in).</p>
      </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How the Wisdom app and wisdomquotes.in handle your data: what we collect, which AI reads your words and only with your yes, and how to delete your account.',
  alternates: { canonical: 'https://wisdomquotes.in/privacy' },
  robots: { index: true, follow: true },
}

const SUPPORT_EMAIL = 'work.ankurshukla@gmail.com'

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

export default function PrivacyPage() {
  return (
    <>
      <BlogTracker pageName="privacy" />
      <style dangerouslySetInnerHTML={{ __html: legalCSS }} />

      <Nav />

      <main className="legal-main">
        <div className="legal-wrap">
          <div className="legal-eyebrow">Legal</div>
          <h1 className="legal-h1">Privacy Policy</h1>
          <p className="legal-meta">Last updated: 29 October 2026 &nbsp;·&nbsp; Wisdom app (iPhone) &amp; wisdomquotes.in</p>

          <div className="legal-body">

            <p>Wisdom is made by Ankur Shukla, an independent developer in India (&ldquo;we&rdquo;). This policy explains what the Wisdom iPhone app and wisdomquotes.in collect, why, who else handles it, and how to delete it.</p>

            <div className="highlight-box">
              <strong>In short:</strong> we don&apos;t sell your data, show ads, or track you across other apps and websites. What you write about your life is read by an AI model only after you tap <em>Allow</em>, only to choose your verses, and under the providers&apos; terms it isn&apos;t used to train AI models. You can delete your account and its data from <em>Settings → Account</em> at any time.
            </div>

            <h2>1. What the app collects</h2>
            <table className="data-table">
              <thead>
                <tr><th>Data</th><th>What it is</th><th>Why</th><th>Linked to you?</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>User ID</td>
                  <td>A random ID created the first time you open the app (an anonymous Supabase account, no sign-in needed)</td>
                  <td>Keeps your purchases, analytics and backup together</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Email and name</td>
                  <td>Only if you back up your journal with Sign in with Apple or Google. Apple lets you hide your email.</td>
                  <td>Restore your journal on a new phone</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Your answers</td>
                  <td>Age range, stage of life, what weighs on you, time on your phone</td>
                  <td>Choose the verses for your plan</td>
                  <td>Sent without your user ID; kept on your phone</td>
                </tr>
                <tr>
                  <td>Your words</td>
                  <td>The note you type or speak, questions you ask about a verse, and anything you add when your situation changes</td>
                  <td>Read by an AI model to choose and explain your verses, <strong>only if you allow it</strong> (section 2)</td>
                  <td>Sent without your user ID; not stored by us</td>
                </tr>
                <tr>
                  <td>Journal backup</td>
                  <td>Your reflections, only if you back up your journal</td>
                  <td>Keep them safe across phones</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Usage</td>
                  <td>Screens opened, buttons tapped, plan progress, an app-generated device ID, and the city and country Mixpanel infers from your IP address</td>
                  <td>Understand what helps and fix what doesn&apos;t</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Feature requests</td>
                  <td>The text you send from <em>Settings → Request a feature</em></td>
                  <td>Read by us to shape the app</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Purchases</td>
                  <td>Your subscription, its status and dates</td>
                  <td>Unlock Wisdom Pro</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
            <p>When you speak your note, your iPhone turns your voice into text with Apple&apos;s speech recognition. Only the text can ever reach us; your voice recording never does.</p>

            <h2>2. AI and your words</h2>
            <p>Before anything you write leaves your phone, the app asks you. If you tap <em>Allow</em>:</p>
            <ul>
              <li><strong>What is sent:</strong> your answers (section 1) and your words: your note, your questions about a verse, and what you add when your situation changes.</li>
              <li><strong>Who reads it:</strong> our server (hosted on Vercel) passes it to <strong>Sarvam AI</strong> (Axonwise Private Limited, India), whose language model reads it to choose your verses and write the lines meant for you. <strong>Cloudflare</strong> (Workers AI) turns short descriptions of your situation into search vectors so the right verses can be found. Sarvam AI&apos;s voice model reads your daily audio aloud.</li>
              <li><strong>What it&apos;s used for:</strong> only to make and explain your plan. Under Sarvam AI&apos;s and Cloudflare&apos;s terms it isn&apos;t used to train their AI models.</li>
              <li><strong>What we keep:</strong> we don&apos;t store or log your note or your questions. To give the same answers the same verse, we keep the chosen first verse and our reading of the situation (never your note) for up to 7 days, under a one-way code that isn&apos;t linked to your account. Audio readings are saved as files named by a one-way code so the same reading isn&apos;t made twice.</li>
            </ul>
            <p>If you tap <em>Not now</em>, nothing you write is sent. Your plan is chosen from your answers alone, with no AI model, and your note stays on your phone. You can change this at any time in <em>Settings → Your words</em>. If we ever change which AI providers read your words, the app will ask you again.</p>
            <p>Wisdom offers reflection from scripture. It isn&apos;t medical or mental-health advice. If something you write suggests you may be in danger, the app shows helplines instead of verses.</p>

            <h2>3. On this website</h2>
            <ul>
              <li><strong>Analytics:</strong> Mixpanel records page views and taps, under a random browser ID.</li>
              <li><strong>Your week by email (wisdomquotes.in/start):</strong> what you choose and write on <em>/start</em> is sent to our server and read by Sarvam AI, as in section 2, to build your Day 1 and your week. If you then sign in with Google (through Firebase Authentication) to get the week by email, we keep your email, name, the kind of device, and the feeling and situation you picked, and we email your week through Resend.</li>
            </ul>

            <h2>4. Who handles your data</h2>
            <ul>
              <li><strong>Supabase:</strong> accounts, the journal backup and our database. <a href="https://supabase.com/privacy" {...ext}>Privacy →</a></li>
              <li><strong>Vercel:</strong> hosts our server. <a href="https://vercel.com/legal/privacy-policy" {...ext}>Privacy →</a></li>
              <li><strong>Sarvam AI:</strong> language and voice models, only with your permission (section 2). <a href="https://www.sarvam.ai/privacy-policy" {...ext}>Privacy →</a></li>
              <li><strong>Cloudflare:</strong> Workers AI for verse search (section 2). <a href="https://www.cloudflare.com/privacypolicy/" {...ext}>Privacy →</a></li>
              <li><strong>Mixpanel:</strong> usage analytics. <a href="https://mixpanel.com/legal/privacy-policy/" {...ext}>Privacy →</a></li>
              <li><strong>RevenueCat:</strong> manages subscriptions with the App Store. <a href="https://www.revenuecat.com/privacy" {...ext}>Privacy →</a></li>
              <li><strong>Apple:</strong> the App Store, payments, Sign in with Apple and speech recognition. <a href="https://www.apple.com/legal/privacy/" {...ext}>Privacy →</a></li>
              <li><strong>Google:</strong> Google Sign-In in the app, Firebase Authentication on the website, and fonts on the website. <a href="https://policies.google.com/privacy" {...ext}>Privacy →</a></li>
              <li><strong>Resend:</strong> sends your week by email, if you ask for it on the website. <a href="https://resend.com/legal/privacy-policy" {...ext}>Privacy →</a></li>
            </ul>
            <p>We don&apos;t sell, rent or trade your data, and we don&apos;t share it with advertisers or data brokers.</p>

            <h2>5. Subscriptions and payments</h2>
            <p>Wisdom Pro is an auto-renewing subscription (monthly or yearly) paid through Apple. We never see your card details. RevenueCat tells the app whether your subscription is active. You can manage or cancel it in <em>Settings → Account → Manage subscription</em> in the app, or in your iPhone&apos;s <em>Settings → Apple ID → Subscriptions</em>.</p>

            <h2>6. Keeping and deleting your data</h2>
            <ul>
              <li><strong>Delete your account in the app:</strong> <em>Settings → Account → Delete account</em>. This immediately deletes your account, your journal backup and everything stored with your user ID in our database, and clears the app on your phone. Deleting your account doesn&apos;t cancel an App Store subscription; cancel that in <em>Manage subscription</em>.</li>
              <li><strong>Analytics and purchase records:</strong> usage analytics held by Mixpanel and subscription records held by RevenueCat and Apple aren&apos;t deleted automatically. Email us and we&apos;ll have your analytics deleted within 30 days. Purchase records are kept as long as accounting and tax rules require.</li>
              <li><strong>Website data:</strong> email us and we&apos;ll delete your email sign-up within 30 days.</li>
              <li>Otherwise, account data is kept while your account exists, and analytics are kept under Mixpanel&apos;s retention policy.</li>
            </ul>

            <h2>7. Children</h2>
            <p>Wisdom isn&apos;t meant for children under 13, and we don&apos;t knowingly collect their data. If you think a child has given us personal data, email us and we&apos;ll delete it.</p>

            <h2>8. Your rights</h2>
            <p>You can ask to see, correct, export or delete the data we hold about you, and you can withdraw your permission for AI at any time in <em>Settings → Your words</em>. Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we&apos;ll reply within 30 days.</p>

            <h2>9. Security</h2>
            <p>Data travels over HTTPS. Our database is protected by row-level security, so one account can&apos;t read another&apos;s data. We don&apos;t store passwords: sign-in is handled by Apple, Google and Supabase.</p>

            <h2>10. Changes</h2>
            <p>If this policy changes, we&apos;ll update the date at the top. If we change who reads your words, the app will ask for your permission again before sending anything.</p>

            <h2>11. Contact</h2>
            <p><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a><br /><strong>Developer:</strong> Ankur Shukla, independent developer, India</p>

          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}

const legalCSS = `
  :root {
    --gold: #c8881e;
    --gold-light: #f5c96a;
    --text: #f5e8cc;
    --text-dim: rgba(245,232,204,0.65);
    --text-dimmer: rgba(245,232,204,0.35);
    --border: rgba(200,136,30,0.2);
    --bg: #120505;
    --bg-alt: #0f0404;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
  a { color: var(--gold-light); text-decoration: none; }
  a:hover { text-decoration: underline; }

  .legal-main { min-height: 70vh; padding: 64px 0 80px; }
  .legal-wrap { max-width: 700px; margin: 0 auto; padding: 0 28px; }
  .legal-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 14px;
  }
  .legal-h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 4vw, 44px); font-weight: 700;
    color: var(--gold-light); line-height: 1.1; margin-bottom: 10px;
  }
  .legal-meta { font-size: 13px; color: var(--text-dimmer); margin-bottom: 48px; }

  .highlight-box {
    background: rgba(200,136,30,0.08);
    border: 1px solid rgba(200,136,30,0.3);
    border-radius: 10px;
    padding: 18px 22px;
    margin-bottom: 36px;
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-dim);
  }
  .highlight-box strong { color: var(--gold-light); }

  .legal-body { font-size: 15.5px; line-height: 1.8; color: var(--text-dim); }
  .legal-body p { margin-bottom: 18px; }
  .legal-body h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-weight: 700; color: var(--gold-light);
    margin: 40px 0 12px; line-height: 1.3;
  }
  .legal-body h3 {
    font-size: 14px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--gold);
    margin: 28px 0 12px;
  }
  .legal-body ul { margin: 0 0 18px 20px; display: flex; flex-direction: column; gap: 8px; }
  .legal-body li { line-height: 1.7; }
  .legal-body code {
    font-family: monospace; font-size: 13.5px;
    background: rgba(200,136,30,0.1); padding: 1px 6px; border-radius: 4px; color: var(--gold-light);
  }

  .data-table {
    width: 100%; border-collapse: collapse; margin: 0 0 28px;
    font-size: 13.5px; line-height: 1.5;
  }
  .data-table th {
    text-align: left; padding: 10px 12px;
    background: rgba(200,136,30,0.12);
    border-bottom: 1px solid var(--border);
    color: var(--gold-light); font-weight: 600; font-size: 12px;
    text-transform: uppercase; letter-spacing: 0.07em;
  }
  .data-table td {
    padding: 10px 12px; border-bottom: 1px solid rgba(200,136,30,0.08);
    vertical-align: top; color: var(--text-dim);
  }
  .data-table tr:last-child td { border-bottom: none; }
  @media (max-width: 560px) {
    .data-table, .data-table tbody, .data-table tr, .data-table td { display: block; }
    .data-table thead { display: none; }
    .data-table td { padding: 6px 12px; }
    .data-table tr { border-bottom: 1px solid var(--border); padding: 8px 0; }
  }

  .legal-footer {
    background: var(--bg-alt); border-top: 1px solid var(--border); padding: 32px 0;
  }
  .legal-footer-inner {
    max-width: 860px; margin: 0 auto; padding: 0 28px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
    font-size: 12.5px; color: var(--text-dimmer);
  }
  .legal-footer-links { display: flex; gap: 20px; }
  .legal-footer-links a { color: var(--text-dimmer); text-decoration: none; transition: color 0.15s; }
  .legal-footer-links a:hover { color: var(--gold-light); text-decoration: none; }
`

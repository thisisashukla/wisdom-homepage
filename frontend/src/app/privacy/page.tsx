import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Privacy Policy | Wisdom',
  description: 'Privacy policy for the Wisdom app and wisdomquotes.in. We do not sell your data.',
  alternates: { canonical: 'https://wisdomquotes.in/privacy' },
  robots: { index: true, follow: true },
}

const SUPPORT_EMAIL = 'work.ankurshukla@gmail.com'

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
          <p className="legal-meta">Last updated: May 2026 &nbsp;·&nbsp; Wisdom App &amp; wisdomquotes.in</p>

          <div className="legal-body">

            <p>Wisdom is a daily shloka and Bhagavad Gita app built by Ankur Shukla, an independent developer. This policy describes what data we collect, why, and your rights. We believe in minimal data collection and full transparency.</p>

            <div className="highlight-box">
              <strong>Our commitment:</strong> We do not sell your data. We do not share it with advertisers. The only third party we share anonymised usage data with is Mixpanel, solely to understand how people use the app so we can improve it.
            </div>

            <h2>1. Data we collect</h2>

            <h3>In the Wisdom iPhone app</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Data</th>
                  <th>Purpose</th>
                  <th>Linked to you?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Analytics</td>
                  <td>Anonymous usage events (screens visited, features tapped)</td>
                  <td>Understand how people use the app</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Account (optional)</td>
                  <td>Email address, unique user ID (if you sign in)</td>
                  <td>Save verses and journal entries across devices</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>User content (optional)</td>
                  <td>Journal entries, saved verses (if you sign in)</td>
                  <td>Persist your personal practice data</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Purchases</td>
                  <td>Subscription status (active / expired)</td>
                  <td>Unlock premium features</td>
                  <td>Yes (processed by Apple)</td>
                </tr>
              </tbody>
            </table>

            <p>As indicated on the App Store, <strong>the Wisdom app does not collect any data from users who do not sign in</strong>. Anonymous analytics events do not contain a name, email, or device identifier that can be traced back to you.</p>

            <h3>On this website (wisdomquotes.in)</h3>
            <p>Mixpanel is used for anonymous analytics — page views, link clicks, and App Store button taps. No personally identifiable information is attached to these events. IP addresses are not stored.</p>

            <h2>2. Subscriptions and payments</h2>
            <p>Wisdom offers optional auto-renewing subscriptions (monthly and yearly) to unlock premium features. All payment processing is handled entirely by <strong>Apple</strong> through the App Store. We never see or store your credit card number or any payment details. Apple may collect purchase history as part of their platform — see <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple&apos;s Privacy Policy</a>.</p>
            <p>Subscription receipts are verified server-side to confirm your plan status. Only the subscription status (active / expired) and your account ID are stored on our servers.</p>
            <p>You can manage or cancel your subscription at any time in <strong>Settings → Apple ID → Subscriptions</strong> on your iPhone.</p>

            <h2>3. Third-party services</h2>
            <ul>
              <li><strong>Mixpanel</strong> — anonymous analytics to understand user behaviour. We only share anonymised usage events. Your data is not used for advertising. <a href="https://mixpanel.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Mixpanel Privacy Policy →</a></li>
              <li><strong>Google Firebase</strong> — authentication and database (optional, only if you sign in). <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy →</a></li>
              <li><strong>Apple App Store</strong> — app distribution and in-app purchases. <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple Privacy Policy →</a></li>
              <li><strong>Google Fonts</strong> — font delivery on the website. No cookies set. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy →</a></li>
            </ul>

            <h2>4. How we use your data</h2>
            <ul>
              <li>To understand how the app and website are used, so we can improve them (Mixpanel analytics)</li>
              <li>To save your verses, journal entries, and reading preferences across devices (if you sign in)</li>
              <li>To verify your subscription status and unlock premium features</li>
              <li>We <strong>do not</strong> sell, trade, rent, or share your data with any third party for marketing, advertising, or commercial purposes</li>
            </ul>

            <h2>5. Data sharing</h2>
            <p>The only third party we share data with is <strong>Mixpanel</strong>, for anonymous usage analytics. This data contains no personal identifiers. We share no personal data with any other company, advertiser, or data broker.</p>

            <h2>6. Cookies and local storage</h2>
            <p>The Wisdom app uses on-device storage to persist your reading preferences and saved content. The website uses <code>localStorage</code> for anonymous Mixpanel session tracking and reading preferences. No third-party advertising cookies are used.</p>

            <h2>7. Data retention</h2>
            <ul>
              <li><strong>Analytics:</strong> Retained by Mixpanel per their data retention policy</li>
              <li><strong>Account data:</strong> Retained as long as your account is active</li>
              <li><strong>Subscription status:</strong> Retained to validate active plans</li>
            </ul>
            <p>You may request deletion of your account and all associated data at any time by emailing us.</p>

            <h2>8. Children&apos;s privacy</h2>
            <p>The Wisdom app is rated 4+ on the App Store. We do not knowingly collect personal data from children under 13. If you believe a child has provided personal information, contact us immediately and we will delete it.</p>

            <h2>9. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of analytics by not signing in (the app collects no identifiable data from unsigned-in users)</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>

            <h2>10. Security</h2>
            <p>We use industry-standard practices to protect any data we hold. Account data is stored on Firebase, which is secured with Google Cloud infrastructure. We do not store passwords — authentication is handled by Firebase.</p>

            <h2>11. Changes to this policy</h2>
            <p>We may update this policy from time to time. Material changes will be reflected with a revised date at the top of this page. Continued use of the app after changes constitutes acceptance of the updated policy.</p>

            <h2>12. Contact &amp; support</h2>
            <p>For privacy questions, data deletion requests, or support:</p>
            <p><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
            <p><strong>Developer:</strong> Ankur Shukla, independent developer</p>

          </div>
        </div>
      </main>

      <footer className="legal-footer">
        <div className="legal-footer-inner">
          <span>© 2026 Wisdom · Ankur Shukla</span>
          <div className="legal-footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href={`mailto:${SUPPORT_EMAIL}`}>Support</a>
          </div>
        </div>
      </footer>
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

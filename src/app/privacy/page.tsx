import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'

export const metadata: Metadata = {
  title: 'Privacy Policy | Wisdom',
  description: 'Privacy policy for the Wisdom app and wisdomquotes.in. We do not collect personal data.',
  alternates: { canonical: 'https://wisdomquotes.in/privacy' },
  robots: { index: true, follow: true },
}

const APP_STORE_URL = 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125'

export default function PrivacyPage() {
  return (
    <>
      <BlogTracker pageName="privacy" />
      <style dangerouslySetInnerHTML={{ __html: legalCSS }} />

      <nav className="legal-nav">
        <div className="legal-nav-inner">
          <a href="/" className="legal-logo">
            <img src="/assets/male-logo-dark.webp" alt="Wisdom" width={30} height={30} />
            Wisdom
          </a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="legal-download" data-mp-location="privacy_nav_download">
            Download Free
          </a>
        </div>
      </nav>

      <main className="legal-main">
        <div className="legal-wrap">
          <div className="legal-eyebrow">Legal</div>
          <h1 className="legal-h1">Privacy Policy</h1>
          <p className="legal-meta">Last updated: May 2026 &nbsp;·&nbsp; Wisdom App &amp; wisdomquotes.in</p>

          <div className="legal-body">

            <p>Wisdom is a daily shloka and Bhagavad Gita app built by Ankur Shukla. This policy explains what data we collect (very little), what we do with it, and your rights.</p>

            <h2>1. What data we collect</h2>
            <p><strong>The Wisdom iPhone app</strong> does not collect personal data. As indicated on the App Store, the developer does not collect any data from the app.</p>
            <p><strong>This website (wisdomquotes.in)</strong> uses Mixpanel for anonymous analytics — page views, link clicks, and App Store button taps. No personally identifiable information is attached to these events. IP addresses are not stored.</p>
            <p>We use Google Firebase for authentication (if you choose to sign in to save verses). Firebase may store your email address and a unique user ID. This data is used solely to persist your saved verses and journal entries across devices.</p>

            <h2>2. Cookies and local storage</h2>
            <p>The website uses <code>localStorage</code> to persist your reading preferences (e.g. saved verses, language preference). No cookies from third-party advertisers are used. Mixpanel uses <code>localStorage</code> for anonymous session tracking.</p>

            <h2>3. Third-party services</h2>
            <ul>
              <li><strong>Mixpanel</strong> — anonymous analytics. <a href="https://mixpanel.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Mixpanel Privacy Policy</a></li>
              <li><strong>Google Firebase</strong> — authentication and database (optional, for signed-in users). <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy</a></li>
              <li><strong>Apple App Store</strong> — app distribution. <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple Privacy Policy</a></li>
              <li><strong>Google Fonts</strong> — font delivery. No cookies set. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            </ul>

            <h2>4. How we use data</h2>
            <ul>
              <li>To understand how people use the website and app (analytics)</li>
              <li>To save your verses, journal entries, and preferences (if signed in)</li>
              <li>We do not sell, trade, or share your data with any third party for marketing purposes</li>
            </ul>

            <h2>5. Data retention</h2>
            <p>Anonymous analytics data is retained by Mixpanel per their retention policy. Firebase user data is retained as long as your account is active. You may request deletion of your account and associated data by emailing us.</p>

            <h2>6. Children</h2>
            <p>The Wisdom app is rated 4+ on the App Store. We do not knowingly collect data from children under 13.</p>

            <h2>7. Your rights</h2>
            <p>You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, contact us at the email below.</p>

            <h2>8. Changes to this policy</h2>
            <p>We may update this policy occasionally. Material changes will be noted at the top of this page with a revised date.</p>

            <h2>9. Contact</h2>
            <p>For privacy questions or data requests: <a href="mailto:work.ankurshukla@gmail.com">work.ankurshukla@gmail.com</a></p>

          </div>
        </div>
      </main>

      <footer className="legal-footer">
        <div className="legal-footer-inner">
          <span>© 2026 Wisdom · Ankur Shukla</span>
          <div className="legal-footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="mailto:work.ankurshukla@gmail.com">Support</a>
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

  .legal-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(18,5,5,0.92);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
  }
  .legal-nav-inner {
    max-width: 860px; margin: 0 auto; padding: 0 28px;
    height: 60px; display: flex; align-items: center; justify-content: space-between;
  }
  .legal-logo {
    display: flex; align-items: center; gap: 9px;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-weight: 700; color: var(--gold-light); text-decoration: none;
  }
  .legal-logo img { border-radius: 50%; border: 1.5px solid rgba(200,136,30,0.4); }
  .legal-download {
    background: var(--gold); color: #1a0606; padding: 8px 18px;
    border-radius: 8px; font-size: 13.5px; font-weight: 700; text-decoration: none;
  }

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

  .legal-body { font-size: 15.5px; line-height: 1.8; color: var(--text-dim); }
  .legal-body p { margin-bottom: 18px; }
  .legal-body h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-weight: 700; color: var(--gold-light);
    margin: 40px 0 12px; line-height: 1.3;
  }
  .legal-body ul { margin: 0 0 18px 20px; display: flex; flex-direction: column; gap: 8px; }
  .legal-body li { line-height: 1.7; }
  .legal-body code {
    font-family: monospace; font-size: 13.5px;
    background: rgba(200,136,30,0.1); padding: 1px 6px; border-radius: 4px; color: var(--gold-light);
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

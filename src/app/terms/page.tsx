import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'

export const metadata: Metadata = {
  title: 'Terms of Use | Wisdom',
  description: 'Terms of use for the Wisdom app and wisdomquotes.in.',
  alternates: { canonical: 'https://wisdomquotes.in/terms' },
  robots: { index: true, follow: true },
}

const APP_STORE_URL = 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125'

export default function TermsPage() {
  return (
    <>
      <BlogTracker pageName="terms" />
      <style dangerouslySetInnerHTML={{ __html: legalCSS }} />

      <nav className="legal-nav">
        <div className="legal-nav-inner">
          <a href="/" className="legal-logo">
            <img src="/assets/male-logo-dark.webp" alt="Wisdom" width={30} height={30} />
            Wisdom
          </a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="legal-download" data-mp-location="terms_nav_download">
            Download Free
          </a>
        </div>
      </nav>

      <main className="legal-main">
        <div className="legal-wrap">
          <div className="legal-eyebrow">Legal</div>
          <h1 className="legal-h1">Terms of Use</h1>
          <p className="legal-meta">Last updated: May 2026 &nbsp;·&nbsp; Wisdom App &amp; wisdomquotes.in</p>

          <div className="legal-body">

            <p>By using the Wisdom app or wisdomquotes.in, you agree to these terms. Please read them carefully. If you do not agree, do not use the app or website.</p>
            <p>The Wisdom app is also subject to Apple&apos;s standard <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">End User Licence Agreement (EULA)</a>.</p>

            <h2>1. The service</h2>
            <p>Wisdom provides daily Sanskrit shlokas and verses from the Bhagavad Gita and other Hindu scriptures, along with translations, commentary, and journaling tools. The website wisdomquotes.in provides the full Bhagavad Gita text in Sanskrit, Hindi, and English, free of charge.</p>

            <h2>2. Your use of the service</h2>
            <p>You may use Wisdom for personal, non-commercial spiritual practice. You may not:</p>
            <ul>
              <li>Reproduce, republish, or redistribute app content in bulk without permission</li>
              <li>Attempt to reverse-engineer, scrape, or extract content at scale</li>
              <li>Use the service in any way that violates applicable law</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <h2>3. Account and journaling data</h2>
            <p>If you create an account, you are responsible for keeping your credentials secure. Your journal entries are private and stored securely. We do not read your journal entries. You may delete your account and all associated data at any time by contacting us.</p>

            <h2>4. In-app purchases</h2>
            <p>Wisdom offers optional in-app purchases (monthly and yearly plans) for premium features. Purchases are processed by Apple and are subject to Apple&apos;s billing terms. All purchases are final unless required otherwise by law.</p>

            <h2>5. Content</h2>
            <p>Sanskrit shlokas, Hindi translations, English translations, and commentary on this platform are provided for personal spiritual use. The Bhagavad Gita and associated scriptures are ancient texts in the public domain. Wisdom&apos;s curated commentary, explanations, and modern relevance sections are original content owned by Ankur Shukla.</p>

            <h2>6. Availability</h2>
            <p>We aim to keep the service available at all times but do not guarantee uninterrupted access. We may modify, suspend, or discontinue any part of the service at any time without notice.</p>

            <h2>7. Disclaimer</h2>
            <p>The Wisdom app and website are provided &quot;as is&quot; without warranties of any kind. We are not responsible for the accuracy of any translation or commentary. The content is for spiritual and reflective purposes and does not constitute professional advice of any kind.</p>

            <h2>8. Limitation of liability</h2>
            <p>To the maximum extent permitted by law, Ankur Shukla and Wisdom shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

            <h2>9. Governing law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>

            <h2>10. Changes to these terms</h2>
            <p>We may update these terms from time to time. Continued use of the service after changes are posted constitutes acceptance of the new terms.</p>

            <h2>11. Contact</h2>
            <p>Questions about these terms: <a href="mailto:work.ankurshukla@gmail.com">work.ankurshukla@gmail.com</a></p>

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

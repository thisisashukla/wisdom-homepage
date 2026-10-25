import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'About Ankur Shukla, Founder of Wisdom & Dadly | iOS Apps for Everyday Practice',
  description:
    'I’m Ankur Shukla, an iOS app developer and long-time reader of the Bhagavad Gita. I build Wisdom (Bhagavad Gita app) and Dadly (AI companion for new dads), and edit the essays on this site.',
  keywords:
    'Ankur Shukla, Wisdom app founder, Dadly app founder, Bhagavad Gita writer, iOS app developer, indie iOS developer, Sanskrit shloka app, dadlyapp.com',
  openGraph: {
    title: 'About Ankur Shukla, iOS Developer, Founder of Wisdom & Dadly',
    description:
      'Ankur Shukla is an iOS app developer and writer. He builds Wisdom (Bhagavad Gita app) and Dadly (AI app for new dads), and writes long-form essays on the Gita.',
    type: 'profile',
    url: 'https://wisdomquotes.in/about',
    siteName: 'Wisdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Ankur Shukla, Founder of Wisdom & Dadly',
    description:
      'iOS developer and writer. Builds Wisdom (Bhagavad Gita daily shloka app) and Dadly (AI app for expecting and new dads).',
    creator: '@thisisashukla',
  },
  alternates: { canonical: 'https://wisdomquotes.in/about' },
}

const pageCSS = `
  :root {
    --maroon: #3d0c0c;
    --maroon-mid: #5c1a1a;
    --gold: #c8881e;
    --gold-light: #f5c96a;
    --gold-pale: #fdf3dc;
    --gold-dim: rgba(200, 136, 30, 0.15);
    --text: #f5e8cc;
    --text-dim: rgba(245, 232, 204, 0.72);
    --text-dimmer: rgba(245, 232, 204, 0.35);
    --border: rgba(200, 136, 30, 0.22);
    --bg: #120505;
    --bg-warm: #190707;
    --bg-alt: #0f0404;
    --bg-card: rgba(255, 255, 255, 0.04);
    --max: 780px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.72;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }

  /* HERO */
  .about-hero {
    background: var(--bg-warm);
    padding: 72px 28px 56px;
    position: relative; overflow: hidden;
  }
  .about-hero::before {
    content: "अहं";
    position: absolute; right: -10px; bottom: -30px;
    font-family: "Noto Sans Devanagari", serif;
    font-size: 240px; color: rgba(255, 255, 255, 0.022);
    line-height: 1; pointer-events: none; user-select: none;
  }
  .about-hero-inner {
    max-width: var(--max); margin: 0 auto;
    position: relative; z-index: 2;
  }
  .about-hero-label {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold-light); font-weight: 600; margin-bottom: 16px;
  }
  .about-hero h1 {
    font-family: "Playfair Display", serif;
    font-size: clamp(30px, 4.4vw, 48px);
    font-weight: 700; color: var(--gold-light);
    line-height: 1.16; margin-bottom: 18px;
  }
  .about-hero h1 em { font-style: italic; color: #fff; }
  .about-hero-sub {
    font-size: 17px; color: var(--text-dim);
    max-width: 580px; line-height: 1.7;
  }

  /* CONTENT */
  .about-wrap { max-width: var(--max); margin: 0 auto; padding: 56px 28px 80px; }
  .about-wrap h2 {
    font-family: "Playfair Display", serif;
    font-size: clamp(22px, 2.4vw, 28px); font-weight: 700;
    color: var(--gold-light); line-height: 1.25;
    margin: 44px 0 18px;
  }
  .about-wrap h2:first-child { margin-top: 0; }
  .about-wrap p {
    font-size: 16px; color: var(--text-dim);
    margin-bottom: 18px;
  }
  .about-wrap p strong { color: var(--text); font-weight: 600; }
  .about-wrap a.inline-link {
    color: var(--gold-light);
    border-bottom: 1px solid rgba(200, 136, 30, 0.4);
    transition: border-color 0.15s;
  }
  .about-wrap a.inline-link:hover { border-color: var(--gold-light); }

  /* APPS GRID */
  .apps-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
    margin: 24px 0 8px;
  }
  @media (max-width: 600px) { .apps-grid { grid-template-columns: 1fr; } }
  .app-card {
    display: block; padding: 26px 24px;
    background: var(--bg-card);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    transition: border-color 0.15s, transform 0.15s;
  }
  .app-card:hover {
    border-color: rgba(200, 136, 30, 0.45);
    transform: translateY(-2px);
  }
  .app-card-label {
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold-light); font-weight: 600; margin-bottom: 10px;
  }
  .app-card h3 {
    font-family: "Playfair Display", serif;
    font-size: 20px; font-weight: 700;
    color: #fff; margin-bottom: 8px; line-height: 1.3;
  }
  .app-card p {
    font-size: 14px; color: var(--text-dim);
    line-height: 1.6; margin-bottom: 14px;
  }
  .app-card-link {
    font-size: 13px; color: var(--gold-light);
    font-weight: 600; letter-spacing: 0.02em;
  }

  /* CONNECT */
  .connect-block {
    margin-top: 28px; padding: 28px;
    background: var(--bg-card);
    border: 1.5px solid var(--border);
    border-radius: 18px;
  }
  .connect-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
  .connect-list a {
    display: flex; align-items: center; gap: 12px;
    font-size: 15px; color: var(--text);
    transition: color 0.15s;
  }
  .connect-list a:hover { color: var(--gold-light); }
  .connect-list .platform {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-dimmer); font-weight: 600;
    display: inline-block; min-width: 80px;
  }
  .connect-list .handle { color: var(--gold-light); font-weight: 600; }

  /* FOOTER */
  footer {
    background: var(--bg-alt);
    border-top: 1px solid var(--border);
    padding: 32px 28px; text-align: center;
    font-size: 12px; letter-spacing: 0.06em;
    color: var(--text-dimmer);
  }
  footer a { color: var(--text-dimmer); transition: color 0.15s; }
  footer a:hover { color: var(--gold-light); }
  footer span { color: var(--gold); }

  @media (max-width: 700px) {
    .about-hero { padding: 48px 20px 40px; }
    .about-wrap { padding: 40px 20px 60px; }
  }
`

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ankur Shukla',
  url: 'https://wisdomquotes.in/about',
  jobTitle: 'iOS App Developer & Writer',
  description:
    'Indie iOS developer and writer. Builder of Wisdom (Bhagavad Gita daily shloka app) and Dadly (AI companion for expecting and new dads). Long-time reader of the Bhagavad Gita.',
  sameAs: [
    'https://www.linkedin.com/in/thisisashukla/',
    'https://x.com/thisisashukla',
    'https://dadlyapp.com',
    'https://wisdomquotes.in',
  ],
  knowsAbout: [
    'Bhagavad Gita',
    'Sanskrit',
    'Hindu philosophy',
    'iOS app development',
    'Swift',
    'AI product design',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Wisdom',
    url: 'https://wisdomquotes.in',
  },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://wisdomquotes.in/about',
  name: 'About Ankur Shukla',
  description:
    'About the author behind Wisdom. Ankur Shukla, iOS app developer and student of the Bhagavad Gita.',
  mainEntity: { '@id': 'https://wisdomquotes.in/about#person' },
  isPartOf: {
    '@type': 'WebSite',
    name: 'Wisdom',
    url: 'https://wisdomquotes.in',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Wisdom', item: 'https://wisdomquotes.in' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://wisdomquotes.in/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <BlogTracker pageName="about" />
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...personSchema, '@id': 'https://wisdomquotes.in/about#person' }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Nav />

      <div className="about-hero">
        <div className="about-hero-inner">
          <div className="about-hero-label">About</div>
          <h1>
            I build iOS apps<br />
            <em>and edit this site.</em>
          </h1>
          <p className="about-hero-sub">
            I&rsquo;m Ankur Shukla. I build the Wisdom app and edit the essays and
            verse pages on this site. Below is who I am, how the writing here is
            made, and why it&rsquo;s about the Bhagavad Gita.
          </p>
        </div>
      </div>

      <main className="about-wrap">
        <h2>Who I am</h2>
        <p>
          I&rsquo;m an iOS app developer. I&rsquo;ve read the Bhagavad Gita for
          years, a few verses at a time, in the gaps between work and family.
          The essays go through the Gita chapter by chapter, with the Sanskrit,
          a translation, and commentary that I edit.
        </p>
        <p>
          I&rsquo;m not a Sanskritist or a swami. I check readings against the
          commentaries and published translations, and when a passage is
          beyond me, I say so.
        </p>

        <h2>Why I write about the Gita</h2>
        <p>
          The Gita starts with someone falling apart. On the morning of the
          war he has trained for, Arjuna puts down his bow and refuses to
          fight. Chapter 1 is him explaining why. The other seventeen chapters
          are Krishna answering him, and the answer changes what Arjuna thinks
          acting means.
        </p>
        <p>
          I&rsquo;ve watched that pattern, stopping, asking, then acting
          differently, in my own work and in people close to me. So the essays
          start from the Sanskrit and the traditional commentaries, and then ask
          what a verse looks like on an ordinary working day.
        </p>

        <h2>How the writing is made</h2>
        <p>
          The English translations are the Wisdom edition, which I edit. The
          commentary, on the verse pages and in the essays, is drafted with a
          language model and then checked and edited by me before it goes up.
          Each verse page and essay says so in its byline, and the{' '}
          <a href="/methodology">methodology page</a> sets out each step.
        </p>
        <p>
          I cite the source text directly. Sanskrit shlokas appear in Devanagari,
          with transliteration where useful, and English/Hindi translations
          alongside. Where a line is an interpretation rather than a translation, the page
          says so.
        </p>

        <h2>Apps I build</h2>
        <p>
          Two apps are live right now:
        </p>

        <div className="apps-grid">
          <a
            href="https://wisdomquotes.in"
            className="app-card"
            data-mp-location="about_app_wisdom"
          >
            <div className="app-card-label">Wisdom · iOS</div>
            <h3>Wisdom: Daily Bhagavad Gita</h3>
            <p>
              Tell it what&rsquo;s going on and it gives you one verse a day for
              seven days, read aloud, with the Sanskrit. Week 1 is free on
              iPhone.
            </p>
            <span className="app-card-link">wisdomquotes.in &rarr;</span>
          </a>
          <a
            href="https://dadlyapp.com"
            target="_blank"
            rel="noopener"
            className="app-card"
            data-mp-location="about_app_dadly"
          >
            <div className="app-card-label">Dadly · iOS &amp; Android</div>
            <h3>Dadly: for expecting and new dads</h3>
            <p>
              An AI companion for the partner role: pregnancy symptoms, scan
              report explanations in plain English, weekly briefs, and calm
              answers at 3am.
            </p>
            <span className="app-card-link">dadlyapp.com &rarr;</span>
          </a>
        </div>

        <h2>Connect</h2>
        <p>
          If you want to argue with a reading, suggest a verse, or just say hi,
          the easiest place is LinkedIn or X. I&rsquo;m more active on X.
        </p>

        <div className="connect-block">
          <ul className="connect-list">
            <li>
              <a
                href="https://www.linkedin.com/in/thisisashukla/"
                target="_blank"
                rel="me noopener"
                data-mp-location="about_linkedin"
              >
                <span className="platform">LinkedIn</span>
                <span className="handle">linkedin.com/in/thisisashukla</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/thisisashukla"
                target="_blank"
                rel="me noopener"
                data-mp-location="about_x"
              >
                <span className="platform">X (Twitter)</span>
                <span className="handle">@thisisashukla</span>
              </a>
            </li>
            <li>
              <a
                href="https://dadlyapp.com"
                target="_blank"
                rel="me noopener"
                data-mp-location="about_dadly_link"
              >
                <span className="platform">Other app</span>
                <span className="handle">dadlyapp.com</span>
              </a>
            </li>
          </ul>
        </div>
      </main>

      <footer>
        <p>
          <a href="/">Wisdom</a> &middot; <a href="/blogs">Blog</a> &middot;{' '}
          <a href="/about">About</a> &middot;{' '}
          <a href="https://apps.apple.com/app/id6747684125" target="_blank" rel="noopener">App Store</a>
        </p>
        <p style={{ marginTop: 10 }}>
          <span>&copy;</span> 2026 Wisdom. Written by Ankur Shukla.
        </p>
      </footer>
    </>
  )
}

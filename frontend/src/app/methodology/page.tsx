import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BlogTracker from '@/components/BlogTracker'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: 'How Wisdom Content Is Made — Methodology & Disclosure',
  description:
    'How the verse translations and commentary on wisdomquotes.in are produced, what role AI plays, and what checks run before anything is published.',
  alternates: { canonical: 'https://wisdomquotes.in/methodology' },
  openGraph: {
    title: 'Content Methodology — wisdomquotes.in',
    description:
      'The production pipeline for Wisdom translations and commentary: primary texts, human editorial, AI-assisted drafting, and review before publication.',
    type: 'website',
    url: 'https://wisdomquotes.in/methodology',
    siteName: 'Wisdom',
  },
}

const pageCSS = `
  :root {
    --gold: #c8881e;
    --gold-light: #f5c96a;
    --gold-pale: #fdf3dc;
    --gold-dim: rgba(200, 136, 30, 0.15);
    --text: #f5e8cc;
    --text-dim: rgba(245, 232, 204, 0.65);
    --text-dimmer: rgba(245, 232, 204, 0.35);
    --border: rgba(200, 136, 30, 0.2);
    --bg: #120505;
    --bg-warm: #190707;
    --bg-alt: #0f0404;
    --bg-card: rgba(255, 255, 255, 0.04);
    --max: 760px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--gold-light); text-decoration: none; }
  a:hover { text-decoration: underline; }

  .breadcrumb {
    background: var(--bg-alt);
    border-bottom: 1px solid var(--border);
  }
  .breadcrumb-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 10px 28px;
    font-size: 12px;
    color: var(--text-dimmer);
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
  .breadcrumb-inner a:hover { color: var(--gold-light); }

  .page-hero {
    background: var(--bg-warm);
    padding: 60px 28px 52px;
    border-bottom: 1px solid var(--border);
  }
  .page-hero-inner { max-width: var(--max); margin: 0 auto; }

  .hero-label {
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold-light);
    font-weight: 600;
    margin-bottom: 14px;
  }

  h1 {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(26px, 3.5vw, 40px);
    font-weight: 700;
    color: var(--gold-light);
    line-height: 1.2;
    margin-bottom: 14px;
  }

  .hero-sub {
    font-size: 16px;
    color: var(--text-dim);
    max-width: 560px;
    line-height: 1.65;
  }

  .article-wrap {
    max-width: var(--max);
    margin: 0 auto;
    padding: 56px 28px 100px;
  }

  h2 {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--gold-light);
    margin: 52px 0 14px;
    line-height: 1.25;
  }

  h3 {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--text);
    margin: 32px 0 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.78;
    color: var(--text-dim);
    margin-bottom: 18px;
  }

  p strong { font-weight: 600; color: var(--text); }

  .lead {
    font-size: 18px;
    line-height: 1.7;
    color: var(--text);
    font-weight: 300;
    margin-bottom: 28px;
  }

  .pipeline-steps {
    margin: 32px 0 40px;
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .pipeline-step {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 0;
    border-bottom: 1px solid var(--border);
  }
  .pipeline-step:last-child { border-bottom: none; }

  .step-num {
    background: rgba(200, 136, 30, 0.08);
    border-right: 1px solid var(--border);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 0 20px;
    font-family: "Playfair Display", serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--gold-light);
  }

  .step-body {
    padding: 20px 22px;
  }

  .step-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 6px;
  }

  .step-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 6px;
  }

  .step-desc {
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--text-dim);
    margin: 0;
  }

  .callout {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-left: 3px solid var(--gold);
    border-radius: 0 12px 12px 0;
    padding: 20px 24px;
    margin: 32px 0;
  }

  .callout p { margin-bottom: 0; font-size: 14.5px; }

  .rules-list {
    margin: 20px 0 28px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .rule-item {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 10px;
    align-items: flex-start;
    font-size: 14.5px;
    color: var(--text-dim);
    line-height: 1.6;
  }

  .rule-num {
    font-size: 11px;
    font-weight: 700;
    color: var(--gold);
    padding-top: 3px;
  }

  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 48px 0;
  }

  .errata-note {
    background: rgba(200, 136, 30, 0.06);
    border: 1px solid rgba(200, 136, 30, 0.25);
    border-radius: 12px;
    padding: 22px 26px;
    margin: 36px 0;
  }

  .errata-note p { font-size: 14.5px; margin-bottom: 10px; }
  .errata-note p:last-child { margin-bottom: 0; }

  .contact-link {
    display: inline-block;
    margin-top: 28px;
    padding: 10px 22px;
    background: var(--gold);
    color: #1a0606;
    font-size: 13.5px;
    font-weight: 700;
    border-radius: 8px;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .contact-link:hover { opacity: 0.88; text-decoration: none; }

  footer {
    background: var(--bg-alt);
    border-top: 1px solid var(--border);
    padding: 28px 40px;
    text-align: center;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: var(--text-dimmer);
  }
  footer a { color: var(--text-dimmer); }
  footer a:hover { color: var(--gold-light); text-decoration: none; }

  @media (max-width: 640px) {
    .page-hero { padding: 44px 20px 40px; }
    .article-wrap { padding: 40px 20px 60px; }
  }
`

export default function MethodologyPage() {
  return (
    <>
      <BlogTracker pageName="methodology" />
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />

      <Nav />



      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-label">Transparency · Content Process</div>
          <h1>How the content on this site is made</h1>
          <p className="hero-sub">
            What is sourced from primary texts, what is translated by humans, what
            is drafted with a language model, and what checks run before anything
            is published.
          </p>
        </div>
      </div>

      <div className="article-wrap">
        <p className="lead">
          If you read commentary on scripture, you should know who wrote it and
          where a language model was involved. In short:
        </p>
        <ul>
          <li>The Sanskrit comes from standard published editions.</li>
          <li>The English translations are the Wisdom edition, edited by Ankur Shukla from public-domain English sources.</li>
          <li>The commentary is drafted by a language model and edited by Ankur before it goes up.</li>
          <li>In the 7-day plans, a language model picks verses from a library of 1,743 that Ankur has chosen and writes the line about your situation. It never changes the verse.</li>
        </ul>

        <h2>The five-step pipeline</h2>

        <p>
          Every verse page and essay goes through these five steps.
        </p>

        <div className="pipeline-steps">
          <div className="pipeline-step">
            <div className="step-num">1</div>
            <div className="step-body">
              <div className="step-label">Source</div>
              <div className="step-title">Primary texts</div>
              <p className="step-desc">
                Sanskrit editions in the public domain. The Bhagavad Gita text
                used here follows established critical editions. For the
                Devanagari and transliteration, we work from standard published
                sources, not from model output.
              </p>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">2</div>
            <div className="step-body">
              <div className="step-label">Translation</div>
              <div className="step-title">The Wisdom translation, edited by Ankur Shukla</div>
              <p className="step-desc">
                The English translations are the Wisdom edition, drawn from
                public-domain English sources. Where a specific source is
                identifiable, it is named. New translations going forward carry
                full provenance. The AI does not translate Sanskrit. It works
                from the human translation as its source.
              </p>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">3</div>
            <div className="step-body">
              <div className="step-label">Selection</div>
              <div className="step-title">Editorial: which verses ship, and how</div>
              <p className="step-desc">
                Which verses are published, which are held back, and how they are
                organised is Ankur's call. The library the 7-day plans draw from is
                chosen the same way; the model only picks from inside it.
              </p>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">4</div>
            <div className="step-body">
              <div className="step-label">Commentary</div>
              <div className="step-title">AI-assisted drafting</div>
              <p className="step-desc">
                A language model drafts the commentary (simpleMeaning,
                detailedMeaning, modernRelevance) from the human translation and
                editorial context. The model gets the translation, not the Sanskrit, and is asked to
                explain it. Its instructions are written against the mistakes
                listed below.
              </p>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">5</div>
            <div className="step-body">
              <div className="step-label">Review</div>
              <div className="step-title">Human editorial check before publishing</div>
              <p className="step-desc">
                Each piece is read against the source translation, checked for
                accuracy, and edited before it goes up. The review date on each
                page reflects the last time this check ran.
              </p>
            </div>
          </div>
        </div>

        <h2>What the AI layer does not do</h2>

        <p>
          If a draft breaks any of these, it is fixed or dropped before it goes up.
        </p>

        <div className="rules-list">
          <div className="rule-item">
            <span className="rule-num">1.</span>
            <span>The AI does not translate the primary Sanskrit text. The translation on each verse page is the edited Wisdom translation. Commentary may paraphrase it.</span>
          </div>
          <div className="rule-item">
            <span className="rule-num">2.</span>
            <span>The AI does not invent verses or citations. Any reference to another scripture is looked up before publishing, because models often invent cross-references.</span>
          </div>
          <div className="rule-item">
            <span className="rule-num">3.</span>
            <span>The AI does not attribute a position to a named commentator (Shankara, Ramanuja, Madhva, Aurobindo) without that position being verified in a sourced commentary edition. The biggest risk here is a model blending several schools into one reading that none of them holds.</span>
          </div>
          <div className="rule-item">
            <span className="rule-num">4.</span>
            <span>The AI does not generate devotional or first-person spiritual content. It writes about the texts, not from inside the tradition.</span>
          </div>
        </div>

        <hr className="divider" />

        <h2>The hallucination problem</h2>

        <p>
          Language models make up verses, misattribute commentaries, and gloss
          over disagreements between traditions, all in a confident tone. So
          verse citations, named commentators&apos; views and cross-references are
          checked by hand against a sourced edition. Some mistakes still get
          through.
        </p>

        <div className="callout">
          <p>
            If you find a misattributed position, an invented verse, or a reading
            that skips over a real disagreement between schools, please tell us. Write to{' '}
            <a href="mailto:work.ankurshukla@gmail.com">
              work.ankurshukla@gmail.com
            </a>
            . Errors that are substantive get corrected with a visible note on the
            page.
          </p>
        </div>

        <hr className="divider" />

        <h2>Why we disclose this, and how</h2>

        <p>
          The disclosure appears in three places.
        </p>

        <p>
          A single line in the footer of every page: <em>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed.</em> A per-post
          byline on each blog and verse page naming the editor, the AI-drafted
          commentary, and the last review date. And this page, reachable from
          every byline.
        </p>

        <p>
          A model can write commentary that reads well and still reverses what a
          verse says, or credits it to the wrong text. Knowing a model was
          involved tells you to read with that in mind, and to check anything
          that matters to you against the Sanskrit.
        </p>

        <hr className="divider" />

        <h2>Errata policy</h2>

        <div className="errata-note">
          <p>
            Verse pages and essays carry a <strong>last reviewed</strong> date.
            When a substantive error is found and corrected, the date is updated
            and a brief note is added at the bottom of the page describing what
            changed.
          </p>
          
          <p>
            If you find an error, please write to{' '}
            <a href="mailto:work.ankurshukla@gmail.com">
              work.ankurshukla@gmail.com
            </a>{' '}
            with the verse reference and the specific claim you think is wrong.
            Include a source if you have one. We will check it.
          </p>
        </div>

        <hr className="divider" />

        <h2>About the project</h2>

        <p>
          Wisdom is one person. Ankur Shukla builds the app, the website and the
          data pipeline, and does the editing. There is no separate fact-checking
          team, so reader corrections matter.
        </p>

        <a href="mailto:work.ankurshukla@gmail.com" className="contact-link">
          Report an error →
        </a>
      </div>

      <SiteFooter />
    </>
  )
}

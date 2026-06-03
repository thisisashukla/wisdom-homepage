import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'How Wisdom Content Is Made — Methodology & Disclosure | Wisdom',
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
    font-size: 10px;
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
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />

      <Nav />

      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Wisdom</a>
          <span>&rsaquo;</span>
          <span>Methodology</span>
        </div>
      </div>

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
          This page exists because the question is legitimate. When a site
          publishes commentary on Sanskrit scripture, readers have every right to
          know who wrote it, what they read, and where a machine was in the loop.
        </p>

        <p>
          The short answer: the translations on this site are the Wisdom edition,
          edited by Ankur Shukla, drawn from public-domain English sources.
          Commentary is drafted with a language model and reviewed by a human
          before publishing. Every verse citation is checked. Every named
          commentator's position is verified against a sourced edition before it
          goes up.
        </p>

        <p>
          The longer answer is the rest of this page.
        </p>

        <h2>The five-step pipeline</h2>

        <p>
          Every verse explanation on this site passes through the same sequence.
          Nothing is published that hasn't been through all five steps.
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
              <div className="step-title">Wisdom editorial translations, edited by Ankur Shukla</div>
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
                organized is Ankur's editorial call. The model does not select
                content.
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
                editorial context. The model is given the translation, not the
                Sanskrit. It is not asked to translate; it is asked to explain.
                The prompt it works from is constrained to reduce the specific
                failure modes listed below.
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
          These are hard rules. If any of them are violated, the content is not
          published.
        </p>

        <div className="rules-list">
          <div className="rule-item">
            <span className="rule-num">1.</span>
            <span>The AI does not translate the primary Sanskrit text. Every verse has a human translator. The model can paraphrase the human translation in commentary, but the canonical translation on the verse page is always the human one, attributed.</span>
          </div>
          <div className="rule-item">
            <span className="rule-num">2.</span>
            <span>The AI does not invent verses or citations. If commentary refers to another scripture, that reference must exist and be verified before publishing. Models confabulate cross-references with surprising fluency.</span>
          </div>
          <div className="rule-item">
            <span className="rule-num">3.</span>
            <span>The AI does not attribute a position to a named commentator (Shankara, Ramanuja, Madhva, Aurobindo) without that position being verified in a sourced commentary edition. Doctrinal flattening, where the model averages across traditions and produces a smoothed reading that no actual school holds, is the highest-risk failure mode on this site.</span>
          </div>
          <div className="rule-item">
            <span className="rule-num">4.</span>
            <span>The AI does not generate devotional or first-person spiritual content. It writes about the texts, not from inside the tradition.</span>
          </div>
        </div>

        <hr className="divider" />

        <h2>The hallucination problem</h2>

        <p>
          Language models can fabricate confidently. They can invent verses,
          misattribute commentaries, and smooth over real disagreements between
          traditions in a way that sounds authoritative. This is the failure mode
          we work hardest against.
        </p>

        <p>
          Every verse citation, every named commentator's view, every
          cross-reference is checked by a human against a sourced edition before
          it ships. The model is not trusted to get these right on its own. The
          review step exists precisely because it doesn't.
        </p>

        <div className="callout">
          <p>
            <strong>The practical implication:</strong> if you find something on
            this site that misattributes a position, invents a verse, or
            flattens a real sectarian disagreement, that is a failure of the
            review step and we want to know about it. Write to{' '}
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
          The disclosure is on every page of this site, in three places.
        </p>

        <p>
          A single line in the footer of every page: <em>Wisdom editorial
          translations. Commentary AI-drafted, human-reviewed.</em> A per-post
          byline on each blog and verse page naming the editor, the AI-drafted
          commentary, and the last review date. And this page, reachable from
          every byline.
        </p>

        <p>
          The decision to disclose is not complicated. When AI touches scripture,
          the risk is not only stylistic. A model can produce something that
          sounds like authentic commentary while quietly inverting the
          philosophical claim, or attributing a verse to the wrong source. Readers
          are right to want to know what was sourced, what was translated by a
          human, and what was drafted with a model in the loop. Hiding that
          pipeline is what causes problems. Showing it is what fixes them.
        </p>

        <p>
          The framing the disclosure leads with is what is human, not what is
          machine. This is not spin. The five steps above are genuinely what
          happens. The AI drafts commentary from a human translation the editor
          chose, and the editor reviews what the model produces before it goes up.
          That is the accurate description of the workflow.
        </p>

        <hr className="divider" />

        <h2>Errata policy</h2>

        <div className="errata-note">
          <p>
            Every page on this site carries a <strong>last reviewed</strong> date.
            When a substantive error is found and corrected, the date is updated
            and a brief note is added at the bottom of the page describing what
            changed.
          </p>
          <p>
            This is standard practice in scholarly digital editions. A visible
            errata record is more trustworthy than content that appears to have
            never been wrong.
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
          Wisdom is a solo project. The app, the website, the data pipeline, and
          the editorial work are all Ankur Shukla. The site is not a publishing
          house with a fact-checking department. It is one person trying to do
          this carefully.
        </p>

        <p>
          The disclosure on this page is part of that attempt. The goal is not to
          appear trustworthy. The goal is to be trustworthy, which means being
          honest about what the process actually is, including the parts that
          involve a language model.
        </p>

        <a href="mailto:work.ankurshukla@gmail.com" className="contact-link">
          Report an error →
        </a>
      </div>

      <footer>
        <p>
          Wisdom editorial translations. Commentary AI-drafted, human-reviewed.{' '}
          <a href="/methodology">Methodology</a>
        </p>
        <p style={{ marginTop: 8 }}>
          <a href="/">wisdomquotes.in</a> &nbsp;·&nbsp;
          <a href="/blogs">Blog</a> &nbsp;·&nbsp;
          <a href="/gita">Bhagavad Gita</a> &nbsp;·&nbsp;
          <a href="/privacy">Privacy</a> &nbsp;·&nbsp;
          <a href="/terms">Terms</a> &nbsp;·&nbsp;
          <a href="mailto:work.ankurshukla@gmail.com">Support</a>
        </p>
        <p style={{ marginTop: 6 }}>© 2026 Wisdom · Ankur Shukla</p>
      </footer>
    </>
  )
}

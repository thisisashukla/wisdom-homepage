import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Sanskrit Recitation Credits — Powered by Vāgdhenu',
  description:
    'The Sanskrit shloka recitations you hear across Wisdom are generated with Vāgdhenu, an open-source Sanskrit chant text-to-speech model built by prathoshap.',
  alternates: { canonical: 'https://wisdomquotes.in/tts' },
  openGraph: {
    title: 'Sanskrit Recitation Credits — Powered by Vāgdhenu',
    description:
      'Credits for the Sanskrit chant recitation model used for audio playback on Wisdom: Vāgdhenu, by prathoshap.',
    type: 'website',
    url: 'https://wisdomquotes.in/tts',
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
    --max: 720px;
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
    font-size: clamp(26px, 3.5vw, 38px);
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
    font-size: 22px;
    font-weight: 700;
    color: var(--gold-light);
    margin: 44px 0 14px;
    line-height: 1.25;
  }
  h2:first-child { margin-top: 0; }

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

  .spec-list {
    margin: 20px 0 28px;
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }
  .spec-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 4px;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }
  .spec-row:last-child { border-bottom: none; }
  .spec-key {
    color: var(--text-dimmer);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    padding-top: 1px;
  }
  .spec-val { color: var(--text-dim); line-height: 1.55; }

  .credit-block {
    margin-top: 12px;
    padding: 26px;
    background: var(--bg-card);
    border: 1.5px solid var(--border);
    border-radius: 18px;
  }
  .credit-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
  .credit-list a {
    display: flex; align-items: center; gap: 12px;
    font-size: 15px; color: var(--text);
    transition: color 0.15s;
  }
  .credit-list a:hover { color: var(--gold-light); text-decoration: none; }
  .credit-list .platform {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--text-dimmer); font-weight: 600;
    display: inline-block; min-width: 96px;
  }
  .credit-list .handle { color: var(--gold-light); font-weight: 600; }

  .license-note {
    background: rgba(200, 136, 30, 0.06);
    border: 1px solid rgba(200, 136, 30, 0.25);
    border-radius: 12px;
    padding: 18px 22px;
    margin: 28px 0;
  }
  .license-note p { font-size: 13.5px; margin-bottom: 0; color: var(--text-dim); }

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
    .spec-row { grid-template-columns: 1fr; gap: 4px; }
  }
`

export default function TtsCreditsPage() {
  return (
    <>
      <BlogTracker pageName="tts" />
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />

      <Nav />

      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-label">Credits · Audio</div>
          <h1>The voice behind the Sanskrit recitation</h1>
          <p className="hero-sub">
            Every shloka you can play and hear recited on Wisdom is synthesized,
            not recorded by a human reciter. Here&rsquo;s the model that makes it
            sound the way it does, and the person who built it.
          </p>
        </div>
      </div>

      <div className="article-wrap">
        <p className="lead">
          The audio playback next to each Sanskrit verse on this site is
          generated with <strong>Vāgdhenu</strong>, an open-source
          text-to-speech system built specifically for Sanskrit chant
          recitation (pārāyaṇa).
        </p>

        <h2>What Vāgdhenu is</h2>
        <p>
          Vāgdhenu synthesizes Devanagari text into chanted Sanskrit audio,
          tuned for the cadence of recitation rather than conversational
          speech. In evaluation by expert listeners it scored a mean opinion
          score of roughly 4.6.
        </p>

        <div className="spec-list">
          <div className="spec-row">
            <div className="spec-key">Base model</div>
            <div className="spec-val">
              Fine-tuned from AI4Bharat&rsquo;s IndicF5 / F5-TTS — a
              flow-matching Diffusion Transformer (~337M params) for
              mel-spectrogram infilling, with Sanskrit routed through Kannada
              script representation.
            </div>
          </div>
          <div className="spec-row">
            <div className="spec-key">Vocoder</div>
            <div className="spec-val">
              A fine-tuned NVIDIA BigVGAN-v2, adapted for extended vowel
              rendering typical of chant.
            </div>
          </div>
          <div className="spec-row">
            <div className="spec-key">Training data</div>
            <div className="spec-val">
              A roughly 5-hour single-speaker Sanskrit chant corpus, with
              additional voice-steering retraining on paired clips.
            </div>
          </div>
          <div className="spec-row">
            <div className="spec-key">License</div>
            <div className="spec-val">
              Apache-2.0 for Vāgdhenu&rsquo;s own contributions, built on
              AI4Bharat IndicF5 (MIT) and NVIDIA BigVGAN-v2 components.
            </div>
          </div>
        </div>

        <div className="license-note">
          <p>
            Prosody in Vāgdhenu is reference-driven rather than freely
            designable, so recitation pacing follows the reference clips used
            during fine-tuning rather than being generated from scratch for
            every verse.
          </p>
        </div>

        <h2>Credit</h2>
        <p>
          Vāgdhenu was created by <strong>prathoshap</strong> and released
          openly on Hugging Face, with an accompanying GitHub repository and
          dataset. Wisdom uses it as-is for verse recitation audio; all credit
          for the model and research belongs to its creator.
        </p>

        <div className="credit-block">
          <ul className="credit-list">
            <li>
              <a
                href="https://huggingface.co/prathoshap/vagdhenu"
                target="_blank"
                rel="noopener"
                data-mp-location="tts_huggingface"
              >
                <span className="platform">Hugging Face</span>
                <span className="handle">prathoshap/vagdhenu</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/prathoshap"
                target="_blank"
                rel="noopener"
                data-mp-location="tts_x"
              >
                <span className="platform">X (Twitter)</span>
                <span className="handle">@prathoshap</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <footer>
        <p>
          Sanskrit recitation audio generated with{' '}
          <a href="https://huggingface.co/prathoshap/vagdhenu" target="_blank" rel="noopener">
            Vāgdhenu
          </a>
          , by <a href="https://x.com/prathoshap" target="_blank" rel="noopener">@prathoshap</a>
        </p>
        <p style={{ marginTop: 8 }}>
          <a href="/">wisdomquotes.in</a> &nbsp;·&nbsp;
          <a href="/gita">Bhagavad Gita</a> &nbsp;·&nbsp;
          <a href="/blogs">Blog</a> &nbsp;·&nbsp;
          <a href="/about">About</a> &nbsp;·&nbsp;
          <a href="/methodology">Methodology</a>
        </p>
        <p style={{ marginTop: 6 }}>&copy; 2026 Wisdom</p>
      </footer>
    </>
  )
}

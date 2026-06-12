import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'

export const metadata: Metadata = {
  title: "Bhagavad Gita 2.47: Karmanye Vadhikaraste Meaning Explained | Wisdom",
  description: "BG 2.47 is the Gita's most famous verse. Four instructions in one line: act, don't own the fruit, don't act for the fruit, don't use this to justify inaction. Full Sanskrit, transliteration, and meaning.",
  keywords: "karmanye vadhikaraste meaning, bhagavad gita 2.47 meaning in english, bhagavad gita 2.47 meaning in hindi, karmanyevadhikaraste te ma phaleshu kadachana, bhagavad gita verse on action, karma yoga 2.47, action without attachment gita, bhagavad gita most famous verse",
  openGraph: {
    title: "Bhagavad Gita 2.47: Karmanye Vadhikaraste Meaning Explained | Wisdom",
    description: "BG 2.47 is the Gita's most famous verse. Four instructions in one line: act, don't own the fruit, don't act for the fruit, don't use this to justify inaction.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste" },
}

const pageCSS = `

        :root {
            --maroon: #3d0c0c;
            --maroon-mid: #5c1a1a;
            --gold: #c8881e;
            --gold-light: #f5c96a;
            --gold-pale: #fdf3dc;
            --gold-border: #e8c97a;
            --gold-dim: rgba(200,136,30,0.15);
            --text: #f5e8cc;
            --text-dim: rgba(245,232,204,0.65);
            --text-dimmer: rgba(245,232,204,0.35);
            --muted-2: rgba(245,232,204,0.35);
            --border: rgba(200,136,30,0.2);
            --bg: #120505;
            --bg-warm: #190707;
            --bg-alt: #0f0404;
            --bg-card: rgba(255,255,255,0.04);
            --bg-card-hover: rgba(255,255,255,0.07);
            --max: 780px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            font-size: 16px;
        }

        /* ── BREADCRUMB ── */
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
        .bc-sep { opacity: 0.4; }

        /* ── ARTICLE HERO ── */
        .article-hero {
            background: var(--bg-warm);
            padding: 64px 28px 56px;
            border-bottom: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }
        .article-hero::before {
            content: "कर्म";
            position: absolute;
            right: -10px;
            bottom: -30px;
            font-family: "Noto Sans Devanagari", serif;
            font-size: 220px;
            color: rgba(200, 136, 30, 0.04);
            line-height: 1;
            pointer-events: none;
            user-select: none;
        }
        .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
        .chapter-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(200, 136, 30, 0.1);
            border: 1px solid rgba(200, 136, 30, 0.28);
            color: var(--gold-light);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 100px;
            margin-bottom: 20px;
        }
        .chapter-badge-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--gold);
            box-shadow: 0 0 6px var(--gold);
            flex-shrink: 0;
        }
        h1.article-title {
            font-family: "Playfair Display", Georgia, serif;
            font-size: clamp(28px, 4vw, 48px);
            font-weight: 700;
            color: var(--gold-light);
            line-height: 1.15;
            letter-spacing: -0.5px;
            margin-bottom: 14px;
        }
        h1.article-title em { font-style: italic; color: #fff; }
        .article-subtitle {
            font-size: 17px;
            color: var(--text-dim);
            font-weight: 300;
            margin-bottom: 32px;
            line-height: 1.65;
            max-width: 620px;
        }
        .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
        .meta-sep { color: var(--border); }

        .lead {
            font-size: 1.1rem;
            color: var(--text-dim);
            margin-bottom: 2rem;
            line-height: 1.8;
        }

        /* CHAPTER IMAGE */
        .chapter-image {
            margin: 32px 0 36px;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid var(--border);
            box-shadow: 0 4px 32px rgba(0,0,0,0.4);
        }
        .chapter-image img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }
        .chapter-image figcaption {
            padding: 10px 18px;
            background: var(--bg-card);
            font-size: 11.5px;
            color: var(--text-dimmer);
            letter-spacing: 0.04em;
            font-style: italic;
            border-top: 1px solid var(--border);
        }

        /* Main Content */
        .content {
            max-width: var(--max);
            margin: 0 auto;
            padding: 0 2rem 4rem;
        }

        h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin: 2.5rem 0 1.5rem 0;
            color: var(--gold);
            border-bottom: 2px solid var(--gold-dim);
            padding-bottom: 0.75rem;
        }

        h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin: 1.5rem 0 1rem 0;
            color: var(--text);
        }

        p {
            margin-bottom: 1.5rem;
            color: var(--text-dim);
        }

        /* Shloka Card */
        .shloka-card {
            background: var(--bg-card);
            border: 1px solid var(--gold-dim);
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
            transition: background 0.3s;
        }

        .shloka-card:hover {
            background: var(--bg-card-hover);
        }

        .shloka-card .verse-number {
            font-size: 0.85rem;
            color: var(--gold);
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }

        .shloka-card .sanskrit {
            font-family: 'Noto Sans Devanagari', sans-serif;
            font-size: 1.1rem;
            color: var(--gold-light);
            margin-bottom: 1rem;
            line-height: 1.8;
        }

        .shloka-card .transliteration {
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            font-style: italic;
            color: var(--text-dimmer);
            margin-bottom: 1rem;
            line-height: 1.6;
        }

        .shloka-card .meaning {
            background: rgba(200,136,30,0.05);
            padding: 1rem;
            border-left: 3px solid var(--gold);
            margin-bottom: 1rem;
            border-radius: 4px;
        }

        .shloka-card .meaning-label {
            font-size: 0.75rem;
            color: var(--gold);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .shloka-card .meaning-text {
            color: var(--text);
            line-height: 1.7;
        }

        .shloka-card .insight {
            background: var(--bg-alt);
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            border: 1px solid var(--border);
        }

        .shloka-card .insight-label {
            font-size: 0.75rem;
            color: var(--text-dimmer);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .shloka-card .insight-text {
            color: var(--text-dim);
            line-height: 1.7;
            font-size: 0.95rem;
        }

        .shloka-card .essence {
            font-style: italic;
            color: var(--gold-light);
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
        }

        /* Pull Quote */
        .pull-quote {
            border-left: 4px solid var(--gold);
            padding-left: 2rem;
            margin: 2.5rem 0;
            font-size: 1.15rem;
            color: var(--gold-light);
            font-style: italic;
            line-height: 1.8;
        }

        /* Highlight Box */
        .highlight-box {
            background: var(--gold-dim);
            border: 1px solid var(--gold-border);
            padding: 1.5rem;
            border-radius: 8px;
            margin: 2rem 0;
        }

        .highlight-box h3 {
            color: var(--gold);
            margin-top: 0;
        }

        .highlight-box p {
            color: var(--text);
            margin-bottom: 0.75rem;
        }

        /* Clause breakdown */
        .clause-grid {
            display: grid;
            gap: 1rem;
            margin: 2rem 0;
        }
        .clause-item {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.25rem 1.5rem;
            border-left: 3px solid var(--gold);
        }
        .clause-item .clause-label {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 0.4rem;
        }
        .clause-item .clause-sanskrit {
            font-family: 'Noto Sans Devanagari', sans-serif;
            font-size: 1rem;
            color: var(--gold-light);
            margin-bottom: 0.3rem;
        }
        .clause-item .clause-roman {
            font-size: 0.9rem;
            font-style: italic;
            color: var(--text-dimmer);
            margin-bottom: 0.6rem;
        }
        .clause-item p {
            font-size: 0.95rem;
            color: var(--text-dim);
            margin-bottom: 0;
        }

        /* FAQ Section */
        .faq-section {
            max-width: var(--max);
            margin: 3rem auto;
            padding: 0 2rem;
        }

        .faq-item {
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border);
            padding-bottom: 2rem;
        }

        .faq-item:last-child {
            border-bottom: none;
        }

        .faq-item strong {
            color: var(--gold-light);
            font-size: 1.05rem;
        }

        .faq-item p {
            margin-top: 0.75rem;
        }

        /* App CTA */
        .app-cta {
          background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
          border: 1px solid rgba(200, 136, 30, 0.25);
          border-top: 3px solid var(--gold);
          border-radius: 20px;
          padding: 44px 48px 40px;
          margin: 48px 0 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .app-cta::before {
          content: "ज्ञान";
          position: absolute;
          top: -14px;
          right: -8px;
          font-family: "Noto Sans Devanagari", sans-serif;
          font-size: 130px;
          color: rgba(200, 136, 30, 0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .app-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(200, 136, 30, 0.12);
          border: 1px solid rgba(200, 136, 30, 0.35);
          color: var(--gold-light);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .app-cta-headline {
          font-family: "Playfair Display", serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.25;
          margin-bottom: 14px;
        }
        .app-cta-desc {
          font-size: 15px;
          color: var(--text-dim);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 22px;
        }
        .app-cta-features {
          display: flex;
          gap: 6px 18px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .app-cta-features span {
          font-size: 13px;
          color: var(--gold-light);
          opacity: 0.8;
        }
        .app-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: #120505;
          text-decoration: none;
          padding: 15px 34px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: all 0.2s;
          box-shadow: 0 4px 22px rgba(200, 136, 30, 0.3);
        }
        .app-cta-btn:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(200, 136, 30, 0.5);
        }
        .app-cta-sub {
          font-size: 12px;
          color: rgba(245, 232, 204, 0.35);
          margin-top: 14px;
          letter-spacing: 0.04em;
        }

        /* Footer */
        footer {
            background: var(--bg-warm);
            border-top: 1px solid var(--border);
            padding: 3rem 2rem;
            text-align: center;
            color: var(--text-dimmer);
            margin-top: 4rem;
        }

        footer a {
            color: var(--gold);
            text-decoration: none;
        }

        footer a:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .article-hero { padding: 44px 20px 40px; }
            h2 { font-size: 1.5rem; }
            .app-cta { padding: 32px 24px 28px; }
        }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Bhagavad Gita 2.47: Karmanye Vadhikaraste Meaning Explained | Wisdom",
    "description": "BG 2.47 is the Gita's most famous verse. Four instructions in one line: act, don't own the fruit, don't act for the fruit, don't use this to justify inaction.",
    "datePublished": "2026-06-12",
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": [
        "https://www.linkedin.com/in/thisisashukla/",
        "https://x.com/thisisashukla"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wisdom App",
      "url": "https://wisdomquotes.in"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does karmanye vadhikaraste mean in English?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Karmanye vadhikaraste means 'your authority lies in action alone.' The full phrase karmanye vadhikaraste ma phaleshu kadachana translates as: you have the right to perform your actions, but never to the fruits of those actions. It is the opening of Bhagavad Gita verse 2.47 and the foundation of karma yoga."
        }
      },
      {
        "@type": "Question",
        "name": "What is the full verse of BG 2.47?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The full verse is: karmanye vadhikaraste ma phaleshu kadachana / ma karma-phala-hetur bhur ma te sango 'stv akarmani. It means: you have the right to perform your actions, but not to the fruits. Do not let the fruit be your motive, and do not be attached to inaction. All four clauses together form a complete instruction."
        }
      },
      {
        "@type": "Question",
        "name": "Is BG 2.47 saying to do nothing or be passive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, the opposite. The fourth clause of the verse explicitly forbids using detachment as a reason for inaction. The verse says act, do not be attached to fruits, do not make fruits your motive, and do not use any of this to justify not acting. It is a teaching about quality of action, not a license for passivity."
        }
      },
      {
        "@type": "Question",
        "name": "What does karmanyevadhikaraste mean in Hindi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hindi: कर्तव्यकर्म करने में ही तेरा अधिकार है, फलों में कभी नहीं। Meaning: your entitlement is in doing your duty, never in its results. The verse goes on to say: do not make the fruit your motive, and do not fall into inaction."
        }
      },
      {
        "@type": "Question",
        "name": "Why is Bhagavad Gita 2.47 considered the most famous verse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 2.47 is often called the most famous verse because it captures the Gita's central teaching in two lines: act fully, release the outcome. It applies to work, relationships, creative effort, and any situation involving uncertainty about results. Its directness and completeness make it quotable and memorable across cultures."
        }
      }
    ]
  }
]

export default function BG247Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Wisdom</a>
          <span className="bc-sep">/</span>
          <a href="/blogs">Blog</a>
          <span className="bc-sep">/</span>
          BG 2.47 Karmanye Vadhikaraste
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Chapter 2, Verse 47
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            The Most Famous Line in the Gita<br />
            <em>and the Most Misread</em>
          </h1>
          <p className="article-subtitle">
            Karmanye vadhikaraste is 32 syllables. Most people quote the first half. The second half is where the real instruction lives. This verse contains four separate commands, and ignoring any one of them changes what the verse actually means.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Verse Deep Dive · Chapter 2</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~6 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Published June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter2.webp"
            alt="Krishna speaking to Arjuna on the battlefield, the setting of Bhagavad Gita 2.47"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>BG 2.47: the moment Krishna gives Arjuna four instructions in two lines</figcaption>
        </figure>

        <p className="lead">
          Thirty-two syllables. Two lines. Four instructions. BG 2.47 is the most quoted verse in the Bhagavad Gita, possibly the most quoted verse in all of Sanskrit literature. You have seen the first half on motivational posters, in graduation speeches, stitched into gym bags. &ldquo;You have the right to action, not to its fruits.&rdquo; Most people stop there. But the verse has a second line, and the second line is what makes the first line mean something other than a pretty platitude about letting go.
        </p>

        <h2>The Sanskrit, Word by Word</h2>
        <p>
          Before interpreting, the text itself. Read this slowly once.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 2.47</div>
          <div className="sanskrit">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br />मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥</div>
          <div className="transliteration">karmaṇyevādhikāraste mā phaleṣu kadācana |<br />mā karmaphalaheturbhūrmā te saṅgo&apos;stvakarmaṇi ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">You have the right to do your actions, but not to control the results. Do not be attached to the fruits of your actions, and do not fall into inaction.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Contains</div>
            <div className="insight-text">This verse builds viveka (discernment) and steadiness. It lays out the practice of detached effort, nishkama karma, in four specific instructions: act, do not own results, do not let results be the motive, do not use this as cover for not acting. Each clause corrects a different failure mode.</div>
          </div>
          <div className="essence">Focus on right action, let go of attachment to results.</div>
        </div>

        <p>
          The verse is spoken by Krishna to Arjuna in the middle of a battlefield. Arjuna has collapsed. He will not fight. He says the cost is too high, the grief too great, the outcome too uncertain. Krishna&apos;s answer, across 700 verses, begins here, with this one.
        </p>
        <p>
          It is worth pausing on that context. This verse is not addressed to someone sitting peacefully in meditation. It is addressed to someone in the middle of the hardest situation of his life, who is using uncertainty about outcomes as a reason to stop. Krishna&apos;s response is not &ldquo;relax.&rdquo; It is: here is how action actually works, and here is why your relationship to results is the problem.
        </p>

        <h2>Four Instructions in One Line</h2>
        <p>
          The verse breaks into four distinct clauses. Each is worth holding separately, because collapsing them into one vague idea of &ldquo;detachment&rdquo; loses most of what the verse actually says.
        </p>

        <div className="clause-grid">
          <div className="clause-item">
            <div className="clause-label">Instruction 1</div>
            <div className="clause-sanskrit">कर्मण्येवाधिकारस्ते</div>
            <div className="clause-roman">karmaṇyeva adhikāraste</div>
            <p>Your authority is in action. Not &ldquo;you may act if you feel like it.&rdquo; Your domain, your jurisdiction, your proper territory is the act itself. This is an affirmation of agency, not a suggestion. Act. That is what you are here for.</p>
          </div>
          <div className="clause-item">
            <div className="clause-label">Instruction 2</div>
            <div className="clause-sanskrit">मा फलेषु कदाचन</div>
            <div className="clause-roman">mā phaleṣu kadācana</div>
            <p>Never in the fruits. The word kadachana means &ldquo;at any time, ever, under any circumstances.&rdquo; This is not a soft suggestion. Your authority does not extend into the result. The result is not your territory. It never was.</p>
          </div>
          <div className="clause-item">
            <div className="clause-label">Instruction 3</div>
            <div className="clause-sanskrit">मा कर्मफलहेतुर्भूः</div>
            <div className="clause-roman">mā karmaphalaheturbhūḥ</div>
            <p>Do not let the fruit be your motive for acting. This is the clause people miss. It is not only about releasing results after the fact. It is about what drives you before the act. If the anticipated reward is why you are doing it, the quality of your action changes. You will cut corners when no one is watching. You will stop when the reward seems unlikely. You will do different things for different audiences.</p>
          </div>
          <div className="clause-item">
            <div className="clause-label">Instruction 4</div>
            <div className="clause-sanskrit">मा ते सङ्गोऽस्त्वकर्मणि</div>
            <div className="clause-roman">mā te saṅgo&apos;stvakarmaṇi</div>
            <p>Do not be attached to inaction. This is the clause that stops the verse from becoming a philosophy of passivity. It closes the exit. You cannot use &ldquo;detachment from results&rdquo; as a reason not to act. The verse forbids that interpretation directly.</p>
          </div>
        </div>

        <p>
          All four together describe the actual practice. Remove any one of them and you have a partial reading. The most common partial reading is to keep instructions one and two and quietly drop three and four. What you are left with is something like: act, and accept whatever happens. That is not nothing. But it is missing the most demanding parts.
        </p>

        <h2>What &ldquo;Don&apos;t Claim the Fruit&rdquo; Actually Means</h2>
        <p>
          Instruction two is the one that requires the most unpacking, because it is easy to interpret it as indifference to outcomes. It is not.
        </p>
        <p>
          The Gita does not say the fruit does not matter. It does not say results are irrelevant or that you should not care whether your work is good. It says your right does not extend to the fruit. There is a difference between caring about the quality of your work and claiming ownership of the outcome.
        </p>
        <p>
          Here is the practical distinction. A surgeon cares deeply about whether the patient recovers. They prepare thoroughly, execute carefully, make adjustments in real time. But they cannot control every variable. The patient&apos;s underlying health, the rare complication, the unforeseen bleeding: these are not in the surgeon&apos;s domain. What is in their domain is the quality of their attention and their skill. That is where their authority lies.
        </p>
        <p>
          If the surgeon measures their professional worth by whether the patient survived, they have placed their identity inside territory they do not control. The Gita is not saying the outcome doesn&apos;t matter. It is saying where you place your measure of success changes everything about how you function.
        </p>

        <div className="pull-quote">
          The verse is not a teaching about indifference. It is a teaching about where you locate your standard of excellence. You measure yourself by the act. Not by whether the act produced the result you wanted.
        </div>

        <h2>Why the Fourth Instruction Is Usually Ignored</h2>
        <p>
          The fourth clause, ma te sango&apos;stvakarmaṇi, is the least quoted part of the verse. It is also the part that makes the verse coherent.
        </p>
        <p>
          Without it, &ldquo;detachment from results&rdquo; becomes an alibi. Someone who avoids effort, avoids commitment, avoids showing up for difficult things can dress all of that in the language of the Gita. &ldquo;I&apos;m not attached to outcomes. I am just being present. I am practicing nishkama karma.&rdquo; The verse explicitly forbids this reading. It says: and furthermore, do not be attached to not acting.
        </p>
        <p>
          The Sanskrit word sanga means attachment or clinging. The verse is saying that inaction can itself be a form of attachment. You can cling to the comfortable position of doing nothing. That clinging is also forbidden. You are supposed to act. Fully. Without attachment to results. Without making results the motive. And without using any of this as a reason to stop.
        </p>
        <p>
          This is what makes the verse genuinely demanding, rather than consoling. It does not let you off the hook in either direction.
        </p>

        <div className="highlight-box">
          <h3>The Four Failure Modes This Verse Addresses</h3>
          <p>Clause one corrects: paralysis, the failure to act at all.</p>
          <p>Clause two corrects: entitlement, the assumption that good action guarantees good outcome.</p>
          <p>Clause three corrects: instrumental action, doing things only for personal reward and cutting corners when the reward seems unlikely.</p>
          <p>Clause four corrects: false detachment, using the language of non-attachment to justify not showing up.</p>
        </div>

        <h2>How This Changes Work, Anxiety, and Failure</h2>
        <p>
          The reason this verse has lasted 2,000 years is that the psychological pattern it describes shows up everywhere. Anxiety about outcomes is not a recent invention. People have always worried about whether their work will land, whether their effort will be recognized, whether the thing they built will succeed. The Gita&apos;s teaching is not that you should stop caring. It is that you have confused two things that are actually separate: the quality of your effort and the fate of the result.
        </p>
        <p>
          In a work context, the practical effect of this teaching is measurable. When you decouple your identity from the outcome, you make better decisions. You are willing to try things that might fail, because failure does not define you. You are willing to give honest feedback, because your relationship with someone does not depend on whether they approve of what you say. You are willing to do the unglamorous parts of a job, because you are not performing for an audience. You are doing what the work actually requires.
        </p>
        <p>
          In a failure context, the teaching reframes what failure is. If you measure yourself by results, failure is evidence that you are insufficient. If you measure yourself by the quality of your action, failure becomes information. You did the work. The outcome did not materialize. Now you have data. What does it tell you? What do you do differently? The quality of your analysis is better when you are not also defending your ego.
        </p>
        <p>
          The verse also has something to say about anxiety specifically. Much of what people call anxiety about the future is really anxiety about whether a future outcome will confirm or deny their worth. The Gita&apos;s position is that your worth is not located in future outcomes. Your worth is in the quality of your present action. That is the only thing you actually control.
        </p>

        <h2>The Verses That Build on This</h2>
        <p>
          BG 2.47 does not stand alone. The Gita returns to this teaching repeatedly, each time from a slightly different angle. Two verses that extend the same idea:
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 3.19</div>
          <div className="sanskrit">तस्मादसक्तः सततं कार्यं कर्म समाचर ।<br />असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥</div>
          <div className="transliteration">tasmādasaktaḥ satataṃ kāryaṃ karma samācara |<br />asakto hyācaran karma paramāpnoti pūruṣaḥ ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Therefore, always perform your required duties without attachment. By performing duty without attachment, a person attains the highest.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Adds</div>
            <div className="insight-text">Chapter 3 picks up where 2.47 leaves off. Here Krishna makes the instruction continuous: not just in hard moments but always, as a steady practice. The word satatam means perpetually, constantly. This is not a situational tactic for when things get difficult. It is a way of working.</div>
          </div>
          <div className="essence">Detached action, practiced continuously, leads to the highest.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 4.20</div>
          <div className="sanskrit">त्यक्त्वा कर्मफलासङ्गं नित्यतृप्तो निराश्रयः ।<br />कर्मण्यभिप्रवृत्तोऽपि नैव किञ्चित्करोति सः ॥</div>
          <div className="transliteration">tyaktvā karmaphalāsaṅgaṃ nityatṛpto nirāśrayaḥ |<br />karmaṇyabhipravṛtto&apos;pi naiva kiñcitkaroti saḥ ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Having abandoned attachment to the fruits of actions, always content and self-sufficient, even while engaged in action, such a person does nothing at all.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Adds</div>
            <div className="insight-text">This verse describes the paradox of karma yoga at its fullest expression. The person is fully active, engaged in the work, but because they have let go of attachment to results so completely, they are in a deep sense not the doer. They are not accumulating karma in the way that binds. Chapter 4 takes the principle in 2.47 to its logical conclusion: action without the psychological weight of ownership.</div>
          </div>
          <div className="essence">Act fully and cling to nothing. That is the highest freedom.</div>
        </div>

        <p>
          The arc across these three verses is worth noting. 2.47 gives the instruction. 3.19 says practice it always, not just when under pressure. 4.20 describes what it looks like when the practice is complete: full engagement in work, with none of the ego-weight of ownership attached to it.
        </p>

        <div className="highlight-box">
          <h3>A Note on Translation</h3>
          <p>
            The word adhikara in the first clause is sometimes translated as &ldquo;right,&rdquo; as in &ldquo;you have a right to action.&rdquo; But adhikara more precisely means authority, domain, or proper sphere of competence. It is closer to saying: action is your proper jurisdiction. It is where you actually have power. Results are outside your jurisdiction. That is not a comfort. It is a clarification of what you can actually control.
          </p>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What does karmanye vadhikaraste mean in English?</strong>
          <p>
            Karmanye vadhikaraste means &ldquo;your authority is in action alone.&rdquo; The full phrase, karmanye vadhikaraste ma phaleshu kadachana, translates as: you have the right to perform your actions, but never to the fruits of those actions. It is the first half of Bhagavad Gita verse 2.47, and the foundation of karma yoga. The second half of the verse adds two more instructions: do not let fruit be your motive, and do not fall into inaction.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the full verse of BG 2.47?</strong>
          <p>
            The full verse in transliteration is: karmaṇyevādhikāraste mā phaleṣu kadācana / mā karmaphalaheturbhūrmā te saṅgo&apos;stvakarmaṇi. It means: you have the right to perform your actions, but not to their fruits. Do not let the fruit be your motive for acting, and do not be attached to inaction. All four clauses together are the complete teaching, and all four matter.
          </p>
        </div>

        <div className="faq-item">
          <strong>Is BG 2.47 saying to do nothing or be passive?</strong>
          <p>
            No. The verse says the opposite. The fourth clause explicitly forbids using detachment from results as a justification for inaction. The full instruction is: act, do not own results, do not make results your motive, and do not use any of this as a reason not to act. It is a teaching about the quality of action, not a license to disengage.
          </p>
        </div>

        <div className="faq-item">
          <strong>What does karmanyevadhikaraste mean in Hindi?</strong>
          <p>
            Hindi rendering: कर्तव्यकर्म करने में ही तेरा अधिकार है, फलों में कभी नहीं। The verse continues: तू कर्मफल का हेतु भी मत बन, और अकर्मण्यता में भी आसक्त न हो। Meaning: your entitlement is in doing your duty, never in its results. Do not make the result your reason for acting. Do not fall into laziness.
          </p>
        </div>

        <div className="faq-item">
          <strong>Why is Bhagavad Gita 2.47 considered the most famous verse?</strong>
          <p>
            BG 2.47 is often cited as the Gita&apos;s most famous verse because it states the central teaching of karma yoga with unusual precision and completeness. Its principle applies across almost every domain of life: work, creative effort, relationships, competition, anything where you are putting in effort toward an outcome you cannot fully control. The directness of the statement, and its completeness across four clauses, makes it both memorable and practically useful in a way that more philosophical verses are not.
          </p>
        </div>
      </div>

      <div className="content">
        <div className="app-cta">
          <div className="app-cta-eyebrow">Free iOS App</div>
          <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
          <p className="app-cta-desc">
            The Wisdom app delivers one Bhagavad Gita verse each day: Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
          </p>
          <div className="app-cta-features">
            <span>✦ Daily shloka in Sanskrit</span>
            <span>✦ Meaning & modern context</span>
            <span>✦ Home screen widget</span>
          </div>
          <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
             target="_blank" rel="noopener"
             className="app-cta-btn"
             data-mp-location="cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download on the App Store
          </a>
          <div className="app-cta-sub">Free · iPhone · No account needed</div>
        </div>
      </div>

      <footer>
        <p>© 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="BG 2.47 Karmanye Vadhikaraste" />
    </>
  )
}

import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'

export const metadata: Metadata = {
  title: "Nishkama Karma: Acting Without Attachment (Bhagavad Gita) | Wisdom",
  description: "Nishkama karma means action without desire for results. Not passive. The Gita calls it the highest form of work. Here's what it means, why it's hard, and 7 verses that show how to actually do it.",
  keywords: "nishkama karma meaning, nishkama karma bhagavad gita, nishkama karma in daily life, nishkama karma yoga, action without attachment gita, detached action bhagavad gita, karma yoga without desire, nishkama karma explained, yajna karma gita",
  openGraph: {
    title: "Nishkama Karma: Acting Without Attachment (Bhagavad Gita) | Wisdom",
    description: "Nishkama karma means action without desire for results. Not passive. The Gita calls it the highest form of work. Here's what the verses actually say.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita" },
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
            content: "निष्काम";
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

        /* Practice List */
        .practice-list {
            list-style: none;
            padding: 0;
            margin: 1.5rem 0;
        }
        .practice-list li {
            display: flex;
            gap: 14px;
            margin-bottom: 1.25rem;
            align-items: flex-start;
        }
        .practice-list li::before {
            content: "✦";
            color: var(--gold);
            font-size: 0.75rem;
            margin-top: 4px;
            flex-shrink: 0;
        }
        .practice-list li span {
            color: var(--text-dim);
            line-height: 1.7;
        }
        .practice-list li strong {
            color: var(--text);
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
    "headline": "Nishkama Karma: Acting Without Attachment (Bhagavad Gita)",
    "description": "Nishkama karma means action without desire for results. Not passive. The Gita calls it the highest form of work.",
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
        "name": "What is nishkama karma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nishkama karma is action performed without craving for the results. The word breaks down as nish (without) and kama (desire or craving). In the Bhagavad Gita, it is the practice described in verse 2.47: perform your duty fully, but do not let the anticipated fruit be the reason you act. It does not mean passive or half-hearted effort. It means complete effort with no internal demand on the outcome."
        }
      },
      {
        "@type": "Question",
        "name": "Is nishkama karma actually possible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita treats it as a practice, not a switch you flip. Krishna describes it across many verses and chapters because it takes time to develop. The starting point is becoming aware of when anxiety about results is driving your decisions. BG 6.35 confirms that the mind is genuinely hard to control, but can be trained through consistent practice and gradually loosening attachment to outcomes."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between nishkama karma and karma yoga?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "They are closely related. Karma yoga is the path of action as described in Chapter 3. Nishkama karma is the specific quality of action that karma yoga requires: acting without craving for results. You could say nishkama karma is the internal condition, and karma yoga is the overall path that requires that condition."
        }
      },
      {
        "@type": "Question",
        "name": "What are examples of nishkama karma in daily life?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Preparing well for a presentation without tying your self-worth to whether it lands. Caring for someone without expecting gratitude. Working at full intensity on a project while being genuinely willing to let the result be what it is. The external action stays the same. What changes is the internal relationship to whether things work out."
        }
      },
      {
        "@type": "Question",
        "name": "Did the Bhagavad Gita invent nishkama karma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The term nishkama karma as a compound is used in later commentarial literature to summarize what the Gita teaches. The concept itself is clearly present in the Gita, especially in 2.47, 3.9, 3.19, 4.20, and 18.11. The Gita did not coin the phrase but it is the text that developed the idea most fully and systematically."
        }
      }
    ]
  }
]

export default function NishkamaKarmaPage() {
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
          Nishkama Karma
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Karma Yoga
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Nishkama Karma:<br />
            <em>The Gita&apos;s Hardest Instruction</em>
          </h1>
          <p className="article-subtitle">
            The Gita doesn&apos;t say don&apos;t care about your work. It says don&apos;t make the outcome the reason you&apos;re working.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Karma Yoga · Chapters 2, 3, 4 &amp; 18</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~7 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter3.webp"
            alt="Krishna teaching Arjuna the principle of nishkama karma, acting without attachment to results"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Karma Yoga: act fully, want nothing</figcaption>
        </figure>

        <p className="lead">
          Most people hear &ldquo;don&apos;t desire results&rdquo; and conclude the Gita is telling them to be passive. To lower expectations. To stop trying hard. That reading is wrong, and the Gita corrects it in the very verse that introduces the teaching. In BG 2.47, Krishna says: you have a right to act, do not cling to fruits, do not make the fruit your motive, and do not use any of this as an excuse to not act. Four instructions in one verse. The last one is specifically there to prevent the misreading.
        </p>
        <p>
          Nishkama karma is not disengagement. It is a different quality of engagement. The distinction is internal. The action looks the same from outside. What changes is the pressure inside: whether you are doing your work because you care about the work, or whether you are doing it as an instrument for an outcome you are desperately hoping to produce. That difference, the Gita argues, determines whether you are free or in bondage while acting.
        </p>

        <h2>What Nishkama Means Literally</h2>
        <p>
          The compound breaks into two Sanskrit roots. Nish means without, or free from. Kama means desire, craving, or wanting. So nishkama is literally &ldquo;without craving.&rdquo; Karma means action. Nishkama karma is action performed without craving for its fruits.
        </p>
        <p>
          The key word is craving, not desire. The Gita is not saying arrive at work with no preferences about how things turn out. It is saying do not let the craving for a specific result be the motivating force behind your action. There is a difference between preferring success and being owned by the need for it. Nishkama karma asks you to give up the second, not the first.
        </p>
        <p>
          This matters because the popular version of the teaching collapses both into one prohibition, then people find the teaching absurd because it seems to require a kind of robotic indifference. But the Gita is describing something more specific. When the anticipated reward is what drives you, several things follow: you become vulnerable to anyone who can withhold or offer that reward, your integrity shifts depending on who is watching, your sense of self depends on whether the outcome arrives. Nishkama karma is the practice of cutting those particular chains.
        </p>

        <h2>The Foundation Verse</h2>
        <p>
          This is the verse the whole teaching rests on. It appears in Chapter 2, where Krishna has begun dismantling Arjuna&apos;s paralysis by reframing what action is for.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 2.47</div>
          <div className="sanskrit">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥</div>
          <div className="transliteration">karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo&apos;stvakarmaṇi ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">You have the right to do your actions, but not to control the results. Do not be attached to the fruits of your actions, and do not fall into inaction.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse builds viveka (discernment) and steadiness. It helps us practice detached effort, reducing anxiety, and empowering us to keep acting even in uncertainty. Notice the four distinct instructions packed here: act, do not claim the fruit, do not let the fruit be your motive, and crucially, do not use this teaching to justify inaction. All four are required together.</div>
          </div>
          <div className="essence">Focus on right action, let go of attachment to results.</div>
        </div>

        <p>
          The fourth instruction deserves attention. Krishna explicitly addresses the escape hatch: &ldquo;well, if I shouldn&apos;t care about results, why do anything at all?&rdquo; The Gita closes that door directly. Inaction is not an option. You are embodied, you have duties, you are in relationship with others and with the world. The question is not whether to act, but the internal quality you bring to acting.
        </p>

        <h2>Action as Yajna</h2>
        <p>
          Chapter 3 shifts the frame. Instead of talking about what you should not want, it talks about what the action can be for. The reframe is around yajna, which is usually translated as sacrifice or ritual offering.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 3.9</div>
          <div className="sanskrit">यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः । तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर ॥</div>
          <div className="transliteration">yajñārthātkarmaṇo&apos;nyatra loko&apos;yaṃ karmabandhanaḥ | tadarthaṃ karma kaunteya muktasaṃgaḥ samācara ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">When you do your duties only for yourself, you get trapped by their results. But if you do your duties for Yajna, with selflessness and for the larger order, you stay free. So, do what is right without being attached.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse nurtures the mental freedom that comes from selfless action. It encourages cultivating detachment and aligning your work with something beyond personal benefit, which is a tool for resilience and inner calm. The action itself does not change. What changes is what the action is for. When it is for you and your craving, it binds. When it is offered outward, it frees.</div>
          </div>
          <div className="essence">Selfless action, done as an offering, brings true freedom.</div>
        </div>

        <p>
          The yajna framing does something useful. It does not ask you to stop caring. It redirects what you care about. Instead of asking &ldquo;what will I get?&rdquo;, you ask &ldquo;what does this serve?&rdquo; The quality of your effort does not drop. In fact, many people find their work improves when the anxiety about personal outcome stops driving it. You are no longer managing the work through the filter of &ldquo;how does this look for me.&rdquo; You are just doing the work.
        </p>

        <div className="pull-quote">
          The same action, performed with craving, creates bondage. Performed as an offering, it creates freedom. The difference is internal, not external.
        </div>

        <h2>The Freedom This Creates</h2>
        <p>
          Two verses from Chapter 3 and 4 describe what the internal state of nishkama karma actually feels like when it is working.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 3.19</div>
          <div className="sanskrit">तस्मादसक्तः सततं कार्यं कर्म समाचर । असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥</div>
          <div className="transliteration">tasmādasaktaḥ satataṃ kāryaṃ karma samācara | asakto hyācarankarma paramāpnoti pūruṣaḥ ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Do your duties faithfully, but do not cling to their results. Acting without selfish attachment helps you connect with your true, highest Self.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">Practicing detachment from results creates equanimity. It trains you to stay balanced, direct your energy toward purposeful action, and avoid stress caused by obsessing over things beyond control. The verse does not promise you will get what you want. It promises something the Gita considers more valuable: you become free while acting.</div>
          </div>
          <div className="essence">Detached action leads to inner freedom and the ultimate realization.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 4.20</div>
          <div className="sanskrit">त्यक्त्वा कर्मफलासङ्गं नित्यतृप्तो निराश्रयः । कर्मण्यभिप्रवृत्तोऽपि नैव किञ्चित्करोति सः ॥</div>
          <div className="transliteration">tyaktvā karmaphalāsaṅgaṃ nityatṛpto nirāśrayaḥ | karmaṇyabhipravṛtto&apos;pi naiva kiñcitkaroti saḥ ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">When a person lets go of attachment to results, feels content always, and does not depend on anything, then even while acting, they are not truly &apos;doing&apos; anything.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse trains your discerning intellect to focus on the process, not just the results, cultivating inner contentment and resilience. Nityatripta means always content, not content after the good outcome arrives. The contentment precedes the result because it is not conditional on the result.</div>
          </div>
          <div className="essence">Freedom comes when you act without clinging to success or failure.</div>
        </div>

        <h2>What About Ambition? Is This Just Giving Up?</h2>
        <p>
          This is the objection most people have, and it deserves a real answer rather than a dismissal. The concern is that nishkama karma sounds like a sophisticated way to rationalize low effort. If you don&apos;t want the result, why push hard?
        </p>
        <p>
          The Gita&apos;s answer is that nishkama karma changes your internal relationship to the outcome, not the intensity of your effort. Consider two people doing identical work: one is working because they want to be seen as capable, to get the promotion, to prove something. The other is working because the work matters, because it is their duty to do it well, because it serves others. From the outside the effort looks the same or the second person works harder because anxiety is not consuming resources. From the inside they are completely different states.
        </p>
        <p>
          Ambition is compatible with nishkama karma. Wanting to build something significant, wanting to serve well, wanting to grow in skill, all of these can be genuine motivations that are not craving in the Gita&apos;s sense. What the Gita asks you to notice is whether your sense of self, your peace, your integrity, is dependent on the outcome arriving. If losing produces a collapse of identity rather than a recalibration, that dependency is what nishkama karma is asking you to examine.
        </p>

        <div className="highlight-box">
          <h3>The Distinction That Matters</h3>
          <p>
            Attachment to results means: if the outcome does not arrive, your sense of self is damaged. You feel that you are a failure, not that you have experienced a failure.
          </p>
          <p>
            Nishkama karma means: you work with full care and full effort, but your sense of self does not depend on the result arriving. You can lose and recalibrate without collapse. You can win without becoming dependent on winning again to feel okay.
          </p>
        </div>

        <h2>The Modern Problem It Addresses</h2>
        <p>
          A large fraction of contemporary anxiety traces to outcome-dependence. You work on something and the entire time your mind is running a parallel thread: will this work? What if it doesn&apos;t? What will people think? What does it say about me if it fails? That thread consumes attention, degrades the quality of the work, and delivers suffering regardless of whether the outcome arrives, because the anxiety is present before the result is known.
        </p>
        <p>
          BG 2.47&apos;s insight on this is precise: &ldquo;This teaching reminds us to give our best without letting anxiety about success or failure distract us from enjoying the present moment and learning from our journey.&rdquo; The modern framing around burnout usually identifies overwork as the cause. But many people who burn out are not overworked in hours. They are overworked by the cognitive and emotional load of outcome-craving. The actual labor was sustainable. The constant monitoring of whether the labor was going to produce the desired result was not.
        </p>
        <p>
          BG 3.9 addresses the same problem from the other direction: &ldquo;Today, it&apos;s easy to become stressed or anxious when we focus too much on personal gains or outcomes. This verse teaches us to align our actions with a higher purpose or shared good, and let go of constant worrying about results.&rdquo;
        </p>

        <h2>Offering the Action: BG 18.11</h2>
        <p>
          By Chapter 18, the Gita is completing its argument. Krishna makes a clarification that is easy to miss: you cannot actually stop acting. Renouncing action entirely is not an option for an embodied person.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 18.11</div>
          <div className="sanskrit">न हि देहभृता शक्यं त्यक्तुं कर्माण्यशेषतः । यस्तु कर्मफलत्यागी स त्यागीत्यभिधीयते ॥</div>
          <div className="transliteration">na hi dehabhṛtā śakyaṃ tyaktuṃ karmāṇyaśeṣataḥ | yastu karmaphalatyāgī sa tyāgītyabhidhīyate ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">A person living in a body cannot completely stop doing actions. Only giving up the desire for rewards from those actions makes someone a true tyagi (renunciate).</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse helps you develop detachment from outcomes and become more present and less burdened by expectations. The Gita is closing the renunciation escape hatch again. Real renunciation is not leaving your responsibilities. It is doing your responsibilities while releasing the craving for what you hope they will produce. The tyagi, the one who has given up, has given up outcome-craving, not action.</div>
          </div>
          <div className="essence">Letting go of the desire for results brings real freedom and peace.</div>
        </div>

        <p>
          This verse makes nishkama karma accessible to people who live ordinary lives. You do not have to be a monk. You do not have to withdraw from your work, your family, your responsibilities. You engage fully. The practice is in the quality of inner relationship to what you are doing, whether you are clinging to a specific result or whether you are genuinely willing to let the outcome be what it is.
        </p>

        <h2>How to Actually Practice This</h2>
        <p>
          The Gita describes nishkama karma across many chapters because it is a practice that develops gradually. Here are specific behavioral shifts that create the conditions for it.
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>Define success before the outcome arrives.</strong> Before starting a piece of work, decide what a full-effort version looks like. Make that the measure. When you know you did the work well, that becomes your metric, and whether it landed the way you hoped becomes secondary data rather than the verdict on your worth.</span>
          </li>
          <li>
            <span><strong>Notice when outcome-anxiety is degrading the work.</strong> The parallel thread running &ldquo;but will this work?&rdquo; during execution is a signal. The Gita&apos;s teaching is not to suppress it, but to observe it and redirect attention back to the action itself. This is a skill that develops with repetition.</span>
          </li>
          <li>
            <span><strong>Separate the setback from the self.</strong> &ldquo;This did not work&rdquo; is different from &ldquo;I am a failure.&rdquo; The Gita&apos;s nishkama frame allows the first statement while refusing the second. Outcomes give you information. They do not determine identity.</span>
          </li>
          <li>
            <span><strong>Ask what the action serves beyond personal gain.</strong> The yajna frame from BG 3.9 is practical: before starting, ask who this is actually for. Work that serves something beyond your own advancement tends to pull out more genuine effort and creates less of the brittle dependency on outcome that produces burnout.</span>
          </li>
          <li>
            <span><strong>Let the response to outcomes be proportionate.</strong> The goal is not to stop caring. It is to care in proportion. Wanting a project to succeed is appropriate. If the loss of a single project produces a weeks-long crisis of identity, that is a signal that outcome-attachment has grown outsized. The practice is calibrating the response over time.</span>
          </li>
        </ul>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is nishkama karma?</strong>
          <p>
            Nishkama karma is action performed without craving for the results. The word breaks down as nish (without) and kama (desire or craving). In the Bhagavad Gita, it is the practice described in verse 2.47: perform your duty fully, but do not let the anticipated fruit be the reason you act. It does not mean passive or half-hearted effort. It means complete effort with no internal demand on the outcome.
          </p>
        </div>

        <div className="faq-item">
          <strong>Is nishkama karma actually possible?</strong>
          <p>
            The Gita treats it as a practice, not a switch you flip. Krishna describes it across many verses and chapters because it takes time to develop. The starting point is becoming aware of when anxiety about results is driving your decisions. BG 6.35 confirms that the mind is genuinely hard to control, but can be trained through consistent practice and gradually loosening attachment to outcomes.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the difference between nishkama karma and karma yoga?</strong>
          <p>
            They are closely related. Karma yoga is the path of action as described in Chapter 3. Nishkama karma is the specific quality of action that karma yoga requires: acting without craving for results. You could say nishkama karma is the internal condition, and karma yoga is the overall path that requires that condition.
          </p>
        </div>

        <div className="faq-item">
          <strong>What are examples of nishkama karma in daily life?</strong>
          <p>
            Preparing well for a presentation without tying your self-worth to whether it lands. Caring for someone without expecting gratitude. Working at full intensity on a project while being genuinely willing to let the result be what it is. The external action stays the same. What changes is the internal relationship to whether things work out.
          </p>
        </div>

        <div className="faq-item">
          <strong>Did the Bhagavad Gita invent nishkama karma?</strong>
          <p>
            The term nishkama karma as a compound appears in later commentarial literature to summarize what the Gita teaches. The concept itself is clearly present in the Gita, especially in 2.47, 3.9, 3.19, 4.20, and 18.11. The Gita did not coin the phrase but it is the text that developed the idea most fully and systematically.
          </p>
        </div>
      </div>

      <div className="content" style={{ paddingTop: 0 }}>
        <div className="app-cta">
          <div className="app-cta-eyebrow">Free iOS App</div>
          <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
          <p className="app-cta-desc">
            The Wisdom app delivers one Bhagavad Gita verse each day: Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
          </p>
          <div className="app-cta-features">
            <span>✦ Daily shloka in Sanskrit</span>
            <span>✦ Meaning &amp; modern context</span>
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

      <BlogTracker pageName="Nishkama Karma Guide" />
    </>
  )
}

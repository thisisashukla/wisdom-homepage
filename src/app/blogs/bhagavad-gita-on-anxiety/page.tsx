import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'

export const metadata: Metadata = {
  title: "What the Bhagavad Gita Says About Anxiety: 9 Verses That Help | Wisdom",
  description: "The Bhagavad Gita opens with a panic attack. Arjuna shakes, his bow drops, his vision blurs. Krishna's answer spans 18 chapters. Here are 9 verses specifically about anxiety, fear, and the restless mind.",
  keywords: "bhagavad gita on anxiety, what does bhagavad gita say about anxiety, bhagavad gita verses for anxiety, bhagavad gita stress, bhagavad gita on fear, bhagavad gita mental health, bhagavad gita on worry, bhagavad gita restless mind, bhagavad gita depression",
  openGraph: {
    title: "What the Bhagavad Gita Says About Anxiety: 9 Verses That Help | Wisdom",
    description: "The Gita opens with a panic attack. Arjuna's hands shake, his bow drops. Krishna's answer spans 18 chapters. Here are 9 verses specifically about anxiety and the restless mind.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety" },
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
            content: "शान्ति";
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

        /* Chain sequence */
        .chain-sequence {
            background: var(--bg-alt);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.5rem 2rem;
            margin: 2rem 0;
        }
        .chain-sequence h3 {
            color: var(--gold);
            font-size: 0.85rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .chain-step {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 0.6rem;
        }
        .chain-step-label {
            color: var(--text-dim);
            font-size: 0.95rem;
        }
        .chain-arrow {
            color: var(--gold);
            font-size: 0.85rem;
            opacity: 0.6;
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
    "headline": "What the Bhagavad Gita Says About Anxiety: 9 Verses That Help",
    "description": "The Bhagavad Gita opens with a panic attack. Here are 9 verses specifically about anxiety, fear, and the restless mind.",
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
        "name": "Does the Bhagavad Gita help with anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita has more to say about anxiety than most people expect, because it begins with a detailed account of what anxiety feels like in the body and mind. Arjuna's collapse in Chapter 1 describes physical symptoms, cognitive distortion, and loss of purpose. Krishna's response across 18 chapters addresses the mechanics of how anxiety arises, specifically the chain from attachment to craving to anger to loss of discernment described in BG 2.62-2.66."
        }
      },
      {
        "@type": "Question",
        "name": "What does Krishna say about fear in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krishna addresses fear as something rooted in attachment and impermanence. In BG 2.14 he tells Arjuna that all experiences, painful and pleasant, are temporary and should be endured with patience. In BG 2.56 he describes the steady-minded person as one who is free from fear (veetarāga-bhaya-krodha). Fear, in the Gita's analysis, is not irrational; it arises because something you are attached to feels threatened. The practice is working on the attachment, not suppressing the fear."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best Bhagavad Gita verses for mental peace?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 2.65 for understanding what prasada (serenity) actually is and how it dissolves suffering. BG 6.5 for the recognition that you are your own source of support or distress. BG 6.35 for the practical acknowledgment that the mind is genuinely restless but can be trained. BG 12.15 for the description of a person who neither disturbs others nor is disturbed, free from agitation, fear, and restlessness."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Bhagavad Gita relevant for modern anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita's diagnosis of anxiety remains accurate regardless of era. The cascade from dwelling on objects of desire to attachment to craving to anger to loss of clear thinking described in BG 2.62-2.66 describes what clinical psychology now calls the anxiety-rumination cycle. The Gita does not offer techniques for symptom relief. It offers a structural analysis of why anxiety arises and what internal conditions are required to reduce it."
        }
      },
      {
        "@type": "Question",
        "name": "What is prasada in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prasada in BG 2.65 refers to an inner clarity or serenity that arises when the mind is no longer pulled between craving and aversion. It is not happiness. It is the absence of the specific suffering caused by wanting things to be other than they are. When prasada arises, the verse says all sorrow dissolves and the intellect becomes steady. It is a byproduct of self-restraint and balance, not something that can be directly produced."
        }
      }
    ]
  }
]

export default function GitaOnAnxietyPage() {
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
          Gita on Anxiety
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Mental Peace
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            The Bhagavad Gita on Anxiety:<br />
            <em>What Krishna Actually Says</em>
          </h1>
          <p className="article-subtitle">
            The text opens with a man who cannot breathe. Arjuna&apos;s hands shake, his bow drops, his voice breaks. The entire 700-verse Gita is Krishna&apos;s response to a person in acute psychological distress.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Mental Peace · Chapters 2, 6 &amp; 12</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~8 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter1.webp"
            alt="Arjuna and Krishna on the battlefield of Kurukshetra, the setting of the Bhagavad Gita's teaching on anxiety and the restless mind"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>The Gita begins with a crisis, not a sermon</figcaption>
        </figure>

        <p className="lead">
          The Bhagavad Gita does not begin with philosophy. It begins with a man who cannot function. Arjuna is on a battlefield, surrounded by people he has spent his life training with and loving. His limbs go heavy. His mouth dries. His skin burns. His bow falls from his hand. He sinks into his chariot and tells Krishna he cannot do this. He does not know what is right anymore. The Gita knows what anxiety feels like, because it begins there.
        </p>
        <p>
          What follows is 18 chapters of response. Not reassurance. Response. Krishna does not tell Arjuna that everything will be fine. He tells him where the feeling comes from, how the mind produces it, what conditions allow it to end, and what a person looks like on the other side of it. These are not separate from the philosophical teaching. They are the philosophical teaching, grounded in a real person&apos;s real collapse.
        </p>

        <h2>The Original Anxiety: Arjuna&apos;s Collapse</h2>
        <p>
          Chapter 1 of the Gita is one of the most honest accounts of psychological crisis in any classical text. Arjuna is not a weak person. He is described as one of the greatest warriors alive. The people arrayed against him are his teachers, his cousins, his friends. He can see their faces. He understands exactly what is about to happen.
        </p>
        <p>
          His symptoms are physical: limbs failing, body shaking, skin on fire, bow slipping. His cognition fractures: he cannot think clearly about duty, cannot weigh consequences, cannot access the reasoning that usually guides him. His sense of self collapses: he does not know who he is in this moment, what he should want, what victory would even mean. He sits down. He is done.
        </p>
        <p>
          This is the person Krishna responds to. Everything in the Gita is addressed to someone in this state. That context matters, because the Gita is sometimes read as an abstract philosophical text. It is not. It is a response to a person who is sitting on a chariot floor, not functioning, asking for help.
        </p>

        <h2>Verse 1: The Source of Fear</h2>
        <p>
          Krishna&apos;s first move is not reassurance. It is redirection of attention. He points to the nature of experience itself.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 2.14</div>
          <div className="sanskrit">मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः । आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥</div>
          <div className="transliteration">mātrāsparśāstu kaunteya śītoṣṇasukhaduḥkhadāḥ | āgamāpāyino&apos;nityāstāṃstitikṣasva bhārata ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">The things you feel through your senses, like hot and cold or comfort and discomfort, are just momentary and will pass. Arjuna, be patient and endure them.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">It inspires the practice of titiksha, patient endurance and equanimity, helping you stay stable no matter what sensations or feelings arise. This is not a command to suppress emotion. It is an observation about impermanence: the thing producing the fear, the discomfort, the dread, will not stay. Today, we often react to uncomfortable situations, whether a stressful meeting, an argument, or physical discomfort. This verse reminds us not to get carried away by these feelings but to patiently allow them to pass.</div>
          </div>
          <div className="essence">All experiences, pleasant or unpleasant, are fleeting. Develop titiksha, patient endurance.</div>
        </div>

        <p>
          The word titiksha is important here. It does not mean ignore or suppress. It means bear with patience, endure without being consumed. The Gita is not asking Arjuna to pretend the fear is not there. It is asking him to hold it without being dissolved by it.
        </p>

        <h2>The Cascade from Attachment to Ruin</h2>
        <p>
          One of the most clinically precise sequences in the Gita appears in Chapter 2, verses 62 through 66. Krishna describes exactly how the mind moves from ordinary dwelling on a problem to full cognitive and emotional collapse. Read this as a chain, each step following from the last.
        </p>

        <div className="chain-sequence">
          <h3>The Anxiety Cascade (BG 2.62-2.66)</h3>
          <div className="chain-step">
            <span className="chain-step-label">Dwelling on sense objects (ruminating on what you want or fear)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Attachment forms (you need things to go a specific way)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Desire intensifies (craving for that outcome)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Anger arises when desire is frustrated (or fear of frustration)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Delusion (you can no longer think clearly about the situation)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Memory fails (you cannot access what you know about yourself and your values)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Buddhi (discernment) is destroyed. You cannot reason your way out</span>
          </div>
        </div>

        <p>
          This is what happened to Arjuna in Chapter 1. He had been dwelling on the consequences of the battle. Attachment to his relatives, to his own identity as a good person who does not harm family, had hardened into a craving: I must not do this. When that craving met the reality that he was going to have to act anyway, the cascade followed. By the time Krishna speaks, Arjuna&apos;s discernment is gone. He cannot think. That is why a philosophical dialogue is necessary: he needs his buddhi restored before he can act.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 2.65</div>
          <div className="sanskrit">प्रसादे सर्वदुःखानां हानिरस्योपजायते । प्रसन्नचेतसो ह्याशु बुद्धिः पर्यवतिष्ठते ॥</div>
          <div className="transliteration">prasāde sarvaduḥkhānāṃ hānirasyopajāyate | prasannacetaso hyāśu buddhiḥ paryavatiṣṭhate ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">When the mind and heart are pure and steady, all sorrow disappears, and your intelligence naturally settles in the highest reality.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">Purifying your chitta through self-restraint and balance brings emotional resilience and sharpness of insight. When prasada arises, it dissolves all distress. When the mind is peaceful and free from agitation, your buddhi (discriminative intelligence) easily and quickly becomes steady. Today, when overwhelmed by stress, emotional ups and downs, or confusion, this teaching reminds us that by practicing self-mastery and keeping the mind calm, clarity and wise decision-making return.</div>
          </div>
          <div className="essence">Clarity within dissolves sorrow and brings lasting wisdom.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 2.66</div>
          <div className="sanskrit">नास्ति बुद्धिरयुक्तस्य न चायुक्तस्य भावना । न चाभावयतः शान्तिरशान्तस्य कुतः सुखम् ॥</div>
          <div className="transliteration">nāsti buddhirayuktasya na cāyuktasya bhāvanā | na cābhāvayataḥ śāntiraśāntasya kutaḥ sukham ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">If you do not have control over your senses and mind, your thinking is unclear, you cannot develop true intention, and without this, you will not find peace or lasting happiness.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">Building the ability to pause before reacting and keeping the senses in check leads to a clear mind, better decision-making, and inner harmony. The sequence here is exact: without inner discipline, no clarity. Without clarity, no shanti. Without shanti, no sukha. This is not a moral prescription. It is a causal description. In today&apos;s world, distractions are everywhere. This verse reminds us that happiness doesn&apos;t come from chasing every impulse but from inner discipline.</div>
          </div>
          <div className="essence">Sukha, true happiness, is born from a peaceful and disciplined inner world.</div>
        </div>

        <h2>You Are Your Own Friend and Enemy</h2>
        <p>
          Chapter 6 contains a verse that cuts directly against the usual way people relate to their anxiety. It is common to experience anxiety as something that happens to you, something external or at least involuntary. The Gita offers a different framing.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 6.5</div>
          <div className="sanskrit">उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥</div>
          <div className="transliteration">uddharedātmanā&apos;&apos;tmānaṃ nātmānamavasādayet | ātmaiva hyātmano bandhurātmaiva ripurātmanaḥ ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Uplift yourself through your own actions and thoughts. Do not let yourself fall, because you alone are your own friend and also your own enemy.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse teaches self-leadership and responsibility. Practicing self-awareness and positive self-dialogue can help us break past self-made barriers and uplift our own spirit. When facing stress, failure, or low confidence, we often blame others or external situations. This shloka reminds us to strengthen our mind, believe in our own efforts, and practice self-compassion. Our real progress depends on our own inner sankalpa (resolve) and actions.</div>
          </div>
          <div className="essence">You are your greatest mitra and your own shatru. Choose upliftment.</div>
        </div>

        <p>
          This is not a statement of blame. It is a statement of agency. The same mind that produces anxiety can produce steadiness. The question is what you do with it. Arjuna&apos;s mind collapsed because it was running a particular pattern. That pattern can be changed. You are, in the Gita&apos;s framing, capable of both the destruction and the rescue of your own clarity.
        </p>

        <h2>Prasada: What the Gita Calls Serenity</h2>
        <p>
          The word prasada appears in BG 2.65 and is often translated as serenity or grace. It is worth pausing on what it actually means. Prasada is not the feeling of happiness. It is a specific inner condition that arises when the mind stops being pulled between what it craves and what it fears. When craving and aversion both quiet down, what remains is prasada.
        </p>
        <p>
          This is why the Gita&apos;s response to anxiety is not &ldquo;think positive&rdquo; or &ldquo;be grateful.&rdquo; Those are surface operations. Prasada arises when the underlying structure changes: when the mind is no longer in the constant state of wanting things to be different from how they are.
        </p>
        <p>
          BG 12.15 describes what a person looks like when prasada is the operating condition.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 12.15</div>
          <div className="sanskrit">यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः । हर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः ॥</div>
          <div className="transliteration">yasmānnodvijate loko lokānnodvijate ca yaḥ | harṣāmarṣabhayodvegairmukto yaḥ sa ca me priyaḥ ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">A person who does not cause agitation to others, is not disturbed by others, and remains free from excitement, anger, envy, fear, and restlessness, is beloved to Bhagavan.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse guides us to develop emotional steadiness and a compassionate approach toward others, skills that enhance psychological resilience and deepen inner tranquility. The person described here is not emotionless. They are free from the specific torments: harsha (excessive excitement), amarsha (agitation), bhaya (fear), udvega (anxiety). Staying free from emotional turbulence preserves mental well-being and spreads a sense of peace.</div>
          </div>
          <div className="essence">Calmness toward all beings leads to inner harmony and endears us to the Divine.</div>
        </div>

        <h2>The Practice Verse: The Mind Is Genuinely Hard</h2>
        <p>
          This is the verse that earns trust, because Krishna admits the obvious. Arjuna, in Chapter 6, has complained that the mind is too restless to control. He is right. Krishna agrees.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 6.35</div>
          <div className="sanskrit">श्री भगवानुवाच असंशयं महाबाहो मनो दुर्निग्रहं चलं । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥</div>
          <div className="transliteration">śrī bhagavānuvāca asaṃśayaṃ mahābāho mano durnigrahaṃ calaṃ | abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Shri Krishna says: Yes, Arjuna, you are right. The mind is restless and hard to control. But it can be brought under control through regular practice (abhyasa) and detachment (vairagya).</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse builds patience and discipline. It encourages us to keep showing up, accepting that mastery over the mind is a gradual process, not an instant achievement. Through regular habits like meditation, mindful study, or focusing on duty without clinging to results, you can train your mind for focus and calm even in busy or difficult times. The reassurance here is not that it is easy. It is that it is possible.</div>
          </div>
          <div className="essence">With steady practice and detachment, even the restless mind becomes peaceful.</div>
        </div>

        <p>
          Abhyasa means regular practice, showing up again and again. Vairagya means detachment or non-attachment, loosening the grip of craving. The Gita does not promise quick results. It says these two things, practiced over time, work. That is a more honest claim than most systems make, and it is why the Gita has been read for this reason for a long time.
        </p>

        <h2>What the Gita Is Not Saying</h2>
        <p>
          A few misreadings are worth naming directly, because they make the teaching seem either impossible or useless.
        </p>

        <div className="highlight-box">
          <h3>The Gita Does Not Ask You to Stop Feeling</h3>
          <p>
            Arjuna is allowed to grieve. He grieves in Chapter 1 and Krishna does not tell him he should not feel what he is feeling. The teaching is about what to do with feeling, not about eliminating it. Titiksha means patient endurance, not suppression.
          </p>
          <p>
            The steady-minded person described in BG 2.56 is not disturbed by sorrow and does not crave pleasure. That is different from not feeling. The point is that the feeling does not own the person. It arises, it is acknowledged, it passes.
          </p>
          <p>
            The Gita does not offer a bypass. Arjuna does not skip the grief and go straight to action. Krishna engages the grief, works through it, and the grief transforms. That is the model.
          </p>
        </div>

        <h2>On the Specific Anxiety About Outcomes</h2>
        <p>
          A large portion of contemporary anxiety is specifically about outcomes. Will this work? What if it doesn&apos;t? What will people think of me if it fails? What does failure mean about who I am? This particular anxiety has a specific answer in the Gita.
        </p>
        <p>
          BG 2.47 addresses it directly: you have a right to act, but not to the fruits. The insight is not that outcomes do not matter. It is that making the anticipated outcome the reason you are acting, and the measure of your worth, creates a particular kind of suffering. You are now dependent on something you cannot fully control. Every moment of work becomes an anxious monitoring of whether the outcome is still on track. The quality of the work suffers, and the quality of your inner state suffers, regardless of whether the outcome arrives.
        </p>
        <p>
          BG 2.38 offers the direct instruction for this state. Treat gain and loss, success and failure, as equal, then act. That is not indifference. It is the specific internal condition that allows you to act without being owned by what might happen.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Bhagavad Gita 2.38</div>
          <div className="sanskrit">सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ । ततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि ॥</div>
          <div className="transliteration">sukhaduḥkhe same kṛtvā lābhālābhau jayājayau | tato yuddhāya yujyasva naivaṃ pāpamavāpsyasi ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Keep your mind steady in both good and bad times, whether you win or lose or gain or lose something. Then, do your duty without fear of wrongdoing.</div>
          </div>
          <div className="insight">
            <div className="insight-label">What This Teaches</div>
            <div className="insight-text">This verse builds the internal skill of samatva, cultivating emotional resilience, steady focus, and performing one&apos;s work without obsession over results. This leads to a calmer, steadier mind. In daily life, we often feel stressed by wins and losses at work or in relationships. This teaching encourages doing our best without getting overly affected by results or others&apos; opinions.</div>
          </div>
          <div className="essence">Do your kartavya with a balanced mind, unaffected by external outcomes.</div>
        </div>

        <p>
          Samatva, the equanimity described here, is not a destination. It is a practice. The Gita does not promise that Arjuna will feel fine immediately. It gives him a different way to hold the situation, and then, across 17 more chapters, fills in the reasoning that supports that way of holding it.
        </p>
        <p>
          The outcome of the Gita is not that Arjuna becomes unfeeling. He picks up his bow. He is the same person who moments earlier could not function. What changed was his relationship to what he was doing and what it meant. That is what the Gita offers for anxiety: not elimination of feeling, but a change in the structure of how you hold the situation.
        </p>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>Does the Bhagavad Gita help with anxiety?</strong>
          <p>
            The Gita has more to say about anxiety than most people expect, because it begins with a detailed account of what anxiety feels like in the body and mind. Arjuna&apos;s collapse in Chapter 1 describes physical symptoms, cognitive distortion, and loss of purpose. Krishna&apos;s response across 18 chapters addresses the mechanics of how anxiety arises, specifically the chain from attachment to craving to anger to loss of discernment described in BG 2.62-2.66.
          </p>
        </div>

        <div className="faq-item">
          <strong>What does Krishna say about fear in the Bhagavad Gita?</strong>
          <p>
            Krishna addresses fear as something rooted in attachment and impermanence. In BG 2.14 he tells Arjuna that all experiences, painful and pleasant, are temporary and should be endured with patience. In BG 2.56 he describes the steady-minded person as one who is free from fear. Fear, in the Gita&apos;s analysis, is not irrational; it arises because something you are attached to feels threatened. The practice is working on the attachment, not suppressing the fear.
          </p>
        </div>

        <div className="faq-item">
          <strong>What are the best Bhagavad Gita verses for mental peace?</strong>
          <p>
            BG 2.65 for understanding what prasada (serenity) actually is and how it dissolves suffering. BG 6.5 for the recognition that you are your own source of support or distress. BG 6.35 for the practical acknowledgment that the mind is genuinely restless but can be trained. BG 12.15 for the description of a person free from agitation, fear, and restlessness.
          </p>
        </div>

        <div className="faq-item">
          <strong>Is the Bhagavad Gita relevant for modern anxiety?</strong>
          <p>
            The Gita&apos;s diagnosis of anxiety remains accurate regardless of era. The cascade from dwelling on objects of desire to attachment to craving to anger to loss of clear thinking described in BG 2.62-2.66 describes what clinical psychology now calls the anxiety-rumination cycle. The Gita does not offer techniques for symptom relief. It offers a structural analysis of why anxiety arises and what internal conditions are required to reduce it.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is prasada in the Bhagavad Gita?</strong>
          <p>
            Prasada in BG 2.65 refers to an inner clarity or serenity that arises when the mind is no longer pulled between craving and aversion. It is not happiness. It is the absence of the specific suffering caused by wanting things to be other than they are. When prasada arises, the verse says all sorrow dissolves and the intellect becomes steady. It is a byproduct of self-restraint and balance, not something that can be directly manufactured.
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

      <BlogTracker pageName="Bhagavad Gita On Anxiety" />
    </>
  )
}

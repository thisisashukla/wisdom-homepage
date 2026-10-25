import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Karmanye Vadhikaraste Meaning: Bhagavad Gita 2.47 Explained",
  description: "Karmanye vadhikaraste ma phaleshu kadachana: you have a right to your actions, never to their fruits. Gita 2.47 word by word, and its 4 instructions.",
  keywords: "karmanye vadhikaraste meaning, bhagavad gita 2.47 meaning in english, bhagavad gita 2.47 meaning in hindi, karmanyevadhikaraste te ma phaleshu kadachana, bhagavad gita verse on action, karma yoga 2.47, action without attachment gita, bhagavad gita most famous verse",
  openGraph: {
    title: "Karmanye Vadhikaraste Meaning: Bhagavad Gita 2.47 Explained",
    description: "Karmanye vadhikaraste ma phaleshu kadachana: you have a right to your actions, never to their fruits. Gita 2.47 word by word, and its 4 instructions.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Karmanye Vadhikaraste Meaning: Bhagavad Gita 2.47 Explained",
    description: "Karmanye vadhikaraste ma phaleshu kadachana: you have a right to your actions, never to their fruits. Gita 2.47 word by word, and its 4 instructions.",
    images: ['https://wisdomquotes.in/og-image.jpg'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste",
    languages: {
      'en': "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste",
      'en-IN': "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste",
      'x-default': "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
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
    "description": "BG 2.47 gives four instructions in two lines: act, don't own the fruit, don't act for the fruit, and don't use this to justify inaction.",
    "datePublished": "2026-06-12",
    "dateModified": "2026-08-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste" },
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
      "name": "Wisdom",
      "url": "https://wisdomquotes.in",
      "logo": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/new-light-logo.webp" }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wisdom", "item": "https://wisdomquotes.in" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://wisdomquotes.in/blogs" },
      { "@type": "ListItem", "position": 3, "name": "Bhagavad Gita 2.47: Karmanye Vadhikaraste", "item": "https://wisdomquotes.in/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste" }
    ]
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
          "text": "The verse asks for action. Its fourth clause rules out using detachment as a reason for inaction. In full it says: act, claim no fruit, do not make the fruit your motive, and do not use any of this to justify not acting."
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
        "name": "Why is Bhagavad Gita 2.47 quoted so often?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 2.47 puts a central teaching of the Gita into two lines: act fully, and let go of the outcome. It applies to work, relationships, creative effort, and any situation where results are uncertain, and it is short enough to remember."
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
            BG 2.47, Karmanye Vadhikaraste:<br />
            <em>Meaning, Word by Word</em>
          </h1>
          <p className="article-subtitle">
            BG 2.47 is 32 syllables. Most people quote the first half, and the second half holds two of its four commands. Dropping any one of the four changes what the verse means.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Verse Deep Dive · Chapter 2</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~6 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
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
          BG 2.47 is 32 syllables in two lines, and it gives four separate instructions. You have seen the first half on motivational posters and in graduation speeches: &ldquo;You have the right to action, not to its fruits.&rdquo; Most people stop there. The second line keeps the first from turning into a platitude about letting go.
        </p>

        <h2>The Sanskrit, Word by Word</h2>
        <p>
          Here is the text itself. Read it slowly once.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="Your right is to the action alone, never to its fruits. Do not let the fruit be your motive, and do not be attached to inaction."
          insightLabel="What This Contains"
          insight="The verse lays out nishkama karma, action without craving for its fruit, in four instructions: act, claim no result, do not let the result be your motive, and do not use any of this as cover for not acting. Each clause corrects a different mistake."
          essence="Your right is to the work, never to its results."
        />

        <p>
          Krishna speaks the verse to Arjuna on the battlefield. Arjuna has sat down in his chariot and refused to fight (2.9). He has said the cost is too high, the grief too great, and that he cannot tell whether winning or losing would be better (2.6). Krishna has been answering since 2.11, and here he turns from the nature of the self to the question of action.
        </p>
        <p>
          That context matters. The listener is a man in the hardest situation of his life, using uncertainty about outcomes as a reason to stop. Krishna tells him how action works and why his relationship to results is the problem.
        </p>

        <h2>Four Instructions in One Line</h2>
        <p>
          The verse breaks into four clauses. Each is worth holding separately, because folding them into one vague idea of &ldquo;detachment&rdquo; loses most of what the verse says.
        </p>

        <div className="clause-grid">
          <div className="clause-item">
            <div className="clause-label">Instruction 1</div>
            <div className="clause-sanskrit">कर्मण्येवाधिकारस्ते</div>
            <div className="clause-roman">karmaṇyeva adhikāraste</div>
            <p>Your authority is in action. The particle eva, &ldquo;only&rdquo;, makes the act itself your domain and your proper territory. Krishna is affirming Arjuna&apos;s agency and telling him to use it.</p>
          </div>
          <div className="clause-item">
            <div className="clause-label">Instruction 2</div>
            <div className="clause-sanskrit">मा फलेषु कदाचन</div>
            <div className="clause-roman">mā phaleṣu kadācana</div>
            <p>Never in the fruits. The word kadachana, joined to mā, means &ldquo;never, at any time.&rdquo; Your authority stops at the act and does not reach into the result.</p>
          </div>
          <div className="clause-item">
            <div className="clause-label">Instruction 3</div>
            <div className="clause-sanskrit">मा कर्मफलहेतुर्भूः</div>
            <div className="clause-roman">mā karmaphalaheturbhūḥ</div>
            <p>Do not let the fruit be your motive for acting. People often miss this clause. It concerns what drives you before the act as well as how you take the result afterwards. If the anticipated reward is why you are doing it, the quality of your action changes. You will cut corners when no one is watching. You will stop when the reward seems unlikely. You will do different things for different audiences.</p>
          </div>
          <div className="clause-item">
            <div className="clause-label">Instruction 4</div>
            <div className="clause-sanskrit">मा ते सङ्गोऽस्त्वकर्मणि</div>
            <div className="clause-roman">mā te saṅgo&apos;stvakarmaṇi</div>
            <p>Have no attachment to inaction. This clause keeps the verse from becoming a philosophy of passivity: &ldquo;detachment from results&rdquo; cannot serve as a reason not to act.</p>
          </div>
        </div>

        <p>
          All four together describe the practice, and removing any one leaves a partial reading. A common one keeps instructions one and two and drops three and four, leaving something like &ldquo;act, and accept whatever happens.&rdquo; That reading keeps something useful and loses the two hardest parts.
        </p>

        <h2>What &ldquo;Don&apos;t Claim the Fruit&rdquo; Means</h2>
        <p>
          Instruction two needs the most unpacking, because it is easy to read as indifference to outcomes.
        </p>
        <p>
          The verse says your right does not extend to the fruit. You can still care whether your work is good. Caring about the quality of your work is different from claiming ownership of the outcome.
        </p>
        <p>
          Take a surgeon, who cares a great deal about whether the patient recovers. They prepare thoroughly, execute carefully, make adjustments in real time. But they cannot control every variable. The patient&apos;s underlying health, the rare complication, the unforeseen bleeding: these are not in the surgeon&apos;s domain. What is in their domain is the quality of their attention and their skill. That is where their authority lies.
        </p>
        <p>
          If the surgeon measures their professional worth by whether the patient survived, they have placed their identity inside territory they do not control. The outcome still matters; where the surgeon places the measure of success changes how they work.
        </p>

        <div className="pull-quote"> The verse teaches where to locate your standard: you measure yourself by the act, whatever result it produced. </div>

        <h2>Why the Fourth Instruction Is Usually Ignored</h2>
        <p>
          The fourth clause, ma te sango&apos;stvakarmaṇi, is rarely quoted, and it holds the verse together.
        </p>
        <p>
          Without it, &ldquo;detachment from results&rdquo; becomes an alibi. Someone who avoids effort, avoids commitment, avoids showing up for difficult things can dress all of that in the language of the Gita. &ldquo;I&apos;m not attached to outcomes. I am just being present. I am practicing nishkama karma.&rdquo; The verse rules this reading out with its last words, mā te saṅgo&apos;stv akarmaṇi.
        </p>
        <p>
          The Sanskrit word sanga means attachment or clinging. The verse treats inaction as a form of attachment too: you can cling to the comfortable position of doing nothing. Krishna asks for full action, free of attachment to results, without results as the motive, and without any of this becoming a reason to stop.
        </p>
        <p>
          That makes the verse demanding. It lets you off the hook in neither direction.
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
          The pattern this verse describes shows up everywhere. People have long worried about whether their work will land, whether their effort will be recognised, and whether what they built will succeed. Krishna&apos;s point is that two separate things have been confused: the quality of your effort and the fate of the result.
        </p>
        <p>
          At work, separating your identity from the outcome can make some decisions easier. You can try things that might fail, because failure does not define you. You are willing to give honest feedback, because your relationship with someone does not depend on whether they approve of what you say. You can do the unglamorous parts of a job, because you are doing what the work requires and not performing for an audience.
        </p>
        <p>
          After a failure, the teaching changes what the failure means. If you measure yourself by results, failure is evidence that you are insufficient. If you measure yourself by the quality of your action, failure becomes information. You did the work, the outcome failed to arrive, and now you have data about what to do differently. It is easier to read that data when you are not also defending your ego.
        </p>
        <p>
          Much worry about the future is worry about whether an outcome will confirm or deny a person&apos;s worth. Read through 2.47, that worth sits in the quality of present action, the part you control.
        </p>

        <h2>The Verses That Build on This</h2>
        <p>
          The Gita returns to this teaching several times, each time from a slightly different angle. Two verses that extend the same idea:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.19"
          sanskrit="तस्मादसक्तः सततं कार्यं कर्म समाचर । असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥"
          iast="tasmādasaktaḥ satataṃ kāryaṃ karma samācara | asakto hyācaran karma paramāpnoti pūruṣaḥ ||"
          meaningLabel="Translation"
          meaning="Therefore, always perform your required duties without attachment. By performing duty without attachment, a person attains the highest."
          insightLabel="What This Adds"
          insight="Chapter 3 picks up where 2.47 leaves off and makes the instruction continuous. The word satatam means always, constantly, so detached action becomes a way of working in every season."
          essence="Always do the work that must be done, without attachment, and reach the highest."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 4.20"
          sanskrit="त्यक्त्वा कर्मफलासङ्गं नित्यतृप्तो निराश्रयः । कर्मण्यभिप्रवृत्तोऽपि नैव किञ्चित्करोति सः ॥"
          iast="tyaktvā karmaphalāsaṅgaṃ nityatṛpto nirāśrayaḥ | karmaṇyabhipravṛtto'pi naiva kiñcitkaroti saḥ ||"
          meaningLabel="Translation"
          meaning="Having abandoned attachment to the fruits of actions, always content and self-sufficient, even while engaged in action, such a person does nothing at all."
          insightLabel="What This Adds"
          insight="This verse states the paradox of karma yoga. The person is fully engaged in the work, but having let go of attachment to results, they do nothing in the sense that binds. Chapter 4 carries the principle of 2.47 through: action without the weight of ownership."
          essence="Free of attachment to fruit and always content, the busy person does nothing."
        />

        <p>
          The three verses form an arc. 2.47 gives the instruction. 3.19 says to practise it always, under pressure or not. 4.20 describes what it looks like when the practice is complete: full engagement in work, with none of the ego-weight of ownership attached to it.
        </p>

        <div className="highlight-box">
          <h3>A Note on Translation</h3>
          <p>
            The word adhikara in the first clause is often translated as &ldquo;right,&rdquo; as in &ldquo;you have a right to action.&rdquo; It also means authority, domain, or proper sphere. Read that way, action is where you have power, and results lie outside it.</p> </div> <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the syllable count wording, the translation of 2.47, where Krishna&apos;s answer begins (2.11, not 2.47), and removed the Gita&apos;s age in years and an unsupported claim about measurable work effects; copy edited.</p>
      </div>


      <FeedbackWidget pageType="blog" />
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
            The full verse in transliteration is: karmaṇyevādhikāraste mā phaleṣu kadācana / mā karmaphalaheturbhūrmā te saṅgo&apos;stvakarmaṇi. It means: you have the right to perform your actions, but not to their fruits. Do not let the fruit be your motive for acting, and do not be attached to inaction. 
          </p>
        </div>

        <div className="faq-item">
          <strong>Is BG 2.47 saying to do nothing or be passive?</strong>
          <p>
            The verse asks for action. Its fourth clause rules out using detachment from results as a reason for inaction. The full instruction is: act, claim no result, do not make results your motive, and do not use any of this as a reason not to act.
          </p>
        </div>

        <div className="faq-item">
          <strong>What does karmanyevadhikaraste mean in Hindi?</strong>
          <p>
            Hindi rendering: कर्तव्यकर्म करने में ही तेरा अधिकार है, फलों में कभी नहीं। The verse continues: तू कर्मफल का हेतु भी मत बन, और अकर्मण्यता में भी आसक्त न हो। Meaning: your entitlement is in doing your duty, never in its results. Do not make the result your reason for acting. Do not fall into laziness.
          </p>
        </div>

        <div className="faq-item">
          <strong>Why is Bhagavad Gita 2.47 quoted so often?</strong>
          <p>
            BG 2.47 states the central teaching of karma yoga in two lines. Its principle applies to work, creative effort, relationships and competition: anywhere you put effort toward an outcome you cannot fully control. It is short, direct and practical, which makes it easy to remember.
          </p>
        </div>
      </div>

      <div className="content">
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"BG 2.47 Karmanye Vadhikaraste"} />
      </div>

      <SiteFooter />

      <BlogTracker pageName="BG 2.47 Karmanye Vadhikaraste" />
    </>
  )
}

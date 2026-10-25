import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Nishkama Karma Meaning: Krishna's Teaching on Selfless Action in the Bhagavad Gita",
  description: "Nishkama karma (निष्काम कर्म) means action without attachment to results, a central teaching of Bhagavad Gita Chapters 2 and 3. What it is, how it differs from passivity, and 5 verses that show how to practise it.",
  keywords: "nishkama karma meaning, nishkama karma bhagavad gita, nishkama karma in daily life, nishkama karma yoga, action without attachment gita, detached action bhagavad gita, karma yoga without desire, nishkama karma explained, yajna karma gita",
  openGraph: {
    title: "Nishkama Karma Meaning: Krishna's Teaching on Selfless Action in the Bhagavad Gita",
    description: "Nishkama karma (निष्काम कर्म): action without attachment to results. What it means in the Gita, and 5 verses that show how to practise it.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: 'https://wisdomquotes.in/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nishkama Karma: Krishna's Teaching on Selfless Action in the Bhagavad Gita",
    description: "Nishkama karma (निष्काम कर्म): action without attachment to results. What it means, and 5 verses that show how to practise it.",
    images: ['https://wisdomquotes.in/og-image.jpg'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita",
    languages: {
      'x-default': "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita",
      'en': "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita",
      'en-IN': "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita",
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
    "@type": ["Article", "LearningResource"],
    "headline": "Nishkama Karma: Acting Without Attachment (Bhagavad Gita)",
    "description": "Nishkama karma means action without craving for results, taught in Bhagavad Gita 2.47, 3.9, 3.19, 4.20 and 18.11.",
    "alternativeHeadline": "Nishkama Karma: Krishna's Teaching on Selfless Action",
    "datePublished": "2026-06-12",
    "dateModified": "2026-06-12",
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": ["https://x.com/sansearchapp"]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wisdom",
      "url": "https://wisdomquotes.in",
      "logo": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/new-light-logo.webp" }
    },
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/og-image.jpg", "width": 1200, "height": 630 },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita" },
    "mentions": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" }
    ],
    "keywords": "nishkama karma meaning, nishkama karma bhagavad gita, nishkama karma in daily life, nishkama karma yoga, action without attachment gita, detached action bhagavad gita, karma yoga without desire, nishkama karma explained, yajna karma gita",
    "articleSection": "Bhagavad Gita",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "learningResourceType": "Article",
    "educationalLevel": "General",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".lead", ".shloka-meaning", ".shloka-essence"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wisdom", "item": "https://wisdomquotes.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://wisdomquotes.in/blogs/" },
      { "@type": "ListItem", "position": 3, "name": "Nishkama Karma: Selfless Action in the Bhagavad Gita", "item": "https://wisdomquotes.in/blogs/nishkama-karma-bhagavad-gita" }
    ]
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
          "text": "Nishkama karma is action performed without craving for the results. The word breaks down as nish (without) and kama (desire or craving). In the Bhagavad Gita, it is the practice described in verse 2.47: perform your duty fully, but do not let the anticipated fruit be the reason you act. The verse also forbids inaction, so the effort stays complete while the inner demand on the outcome goes."
        }
      },
      {
        "@type": "Question",
        "name": "Is nishkama karma possible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita treats it as a practice that takes time, and Krishna returns to it across several chapters. Start by noticing when anxiety about results is driving your decisions. BG 6.35 grants that the mind is hard to control and says it can be trained through practice (abhyāsa) and detachment (vairāgya)."
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
          "text": "Preparing well for a presentation without tying your self-worth to whether it lands. Caring for someone without expecting gratitude. Working at full intensity on a project while being willing to let the result be what it is. The external action stays the same. What changes is the internal relationship to whether things work out."
        }
      },
      {
        "@type": "Question",
        "name": "Did the Bhagavad Gita invent nishkama karma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The term nishkama karma as a compound is used in later commentarial literature to summarize what the Gita teaches. The idea is in the Gita, especially in 2.47, 3.9, 3.19, 4.20, and 18.11, though the Gita does not use the compound itself."
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
            <em>Acting Without Craving the Result</em>
          </h1>
          <p className="article-subtitle">
            Care about your work, says the Gita, and don&apos;t make the outcome the reason you&apos;re working.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Karma Yoga · Chapters 2, 3, 4 &amp; 18</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~7 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
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
          Many people hear &ldquo;don&apos;t desire results&rdquo; and conclude the Gita wants them to be passive, lower their expectations and stop trying hard. The Gita corrects that in the verse that introduces the teaching. In BG 2.47, Krishna says: you have a right to act, do not cling to fruits, do not make the fruit your motive, and do not use any of this as an excuse to stop acting. The last of the four instructions is there to prevent the misreading.
        </p>
        <p>
          Nishkama karma keeps you engaged and changes how. The action looks the same from outside. What changes is the pressure inside: whether you are doing your work because you care about the work, or whether you are doing it as an instrument for an outcome you are desperately hoping to produce. That difference, the Gita argues, determines whether you are free or in bondage while acting.
        </p>

        <h2>What Nishkama Means Literally</h2>
        <p>
          The compound breaks into two Sanskrit roots. Nish means without, or free from. Kama means desire, craving, or wanting. So nishkama is literally &ldquo;without craving.&rdquo; Karma means action. Nishkama karma is action performed without craving for its fruits.
        </p>
        <p>
          The key word is craving. You can arrive at work with preferences about how things turn out; the Gita asks that craving for a specific result not be what drives the action. Preferring success is one thing and being owned by the need for it is another. Nishkama karma asks you to give up the second.
        </p>
        <p>
          The popular version collapses both into one prohibition, and then the teaching sounds absurd because it seems to require robotic indifference. The Gita is describing something narrower. When the anticipated reward is what drives you, several things follow: you become vulnerable to anyone who can withhold or offer that reward, your integrity shifts depending on who is watching, your sense of self depends on whether the outcome arrives. Nishkama karma is the practice of cutting those chains.
        </p>

        <h2>The Foundation Verse</h2>
        <p>
          This is the verse the whole teaching rests on. It appears in Chapter 2, where Krishna has begun dismantling Arjuna&apos;s paralysis by reframing what action is for.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have the right to do your actions, but not to control the results. Do not be attached to the fruits of your actions, and do not fall into inaction."
          insightLabel="What This Teaches"
          insight="The verse packs four instructions: act, do not claim the fruit, do not let the fruit be your motive, and do not use this teaching to justify inaction. They work together. Drop the last one and the teaching turns into an excuse for passivity."
          essence="Your right is to the work, never to its results."
        />

        <p>
          Look at the fourth instruction. Krishna anticipates the escape hatch: &ldquo;if I shouldn&apos;t care about results, why do anything at all?&rdquo; and closes it. You are embodied, you have duties, and you live among others, so you will act. What you can choose is the attitude you bring to acting.
        </p>

        <h2>Action as Yajna</h2>
        <p>
          Chapter 3 shifts the frame from what you should stop wanting to what the action can be for. The key word is yajna, usually translated as sacrifice or ritual offering.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.9"
          sanskrit="यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः । तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर ॥"
          iast="yajñārthātkarmaṇo'nyatra loko'yaṃ karmabandhanaḥ | tadarthaṃ karma kaunteya muktasaṃgaḥ samācara ||"
          meaningLabel="Translation"
          meaning="When you do your duties only for yourself, you get trapped by their results. But if you do your duties for Yajna, with selflessness and for the larger order, you stay free. So, do what is right without being attached."
          insightLabel="What This Teaches"
          insight="The action itself stays the same; what changes is what it is for. Done for yourself and your craving, it binds. Done as yajña, an offering to something beyond personal benefit, it does not."
          essence="Work not done as yajña binds; do your work as an offering, free of attachment."
        />

        <p>
          The yajna framing redirects what you care about. Instead of asking &ldquo;what will I get?&rdquo;, you ask &ldquo;what does this serve?&rdquo; The effort stays the same, and the work often improves once anxiety about personal outcome stops driving it, because you stop filtering it through &ldquo;how does this look for me.&rdquo;
        </p>

        <div className="pull-quote">
          The same action binds when done with craving and frees when done as an offering. The difference lies inside the person acting.
        </div>

        <h2>The Freedom This Creates</h2>
        <p>
          Two verses, from Chapters 3 and 4, describe the inner state of nishkama karma when it is working.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.19"
          sanskrit="तस्मादसक्तः सततं कार्यं कर्म समाचर । असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥"
          iast="tasmādasaktaḥ satataṃ kāryaṃ karma samācara | asakto hyācarankarma paramāpnoti pūruṣaḥ ||"
          meaningLabel="Translation"
          meaning="Therefore, always do the work that must be done, without attachment. Acting without attachment, a person reaches the highest."
          insightLabel="What This Teaches"
          insight="The verse makes no promise that you will get what you want. It promises the highest (param), reached by working without attachment, and the word satatam, always, makes this a daily discipline."
          essence="Always do your work without attachment; acting so, a person reaches the highest."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 4.20"
          sanskrit="त्यक्त्वा कर्मफलासङ्गं नित्यतृप्तो निराश्रयः । कर्मण्यभिप्रवृत्तोऽपि नैव किञ्चित्करोति सः ॥"
          iast="tyaktvā karmaphalāsaṅgaṃ nityatṛpto nirāśrayaḥ | karmaṇyabhipravṛtto'pi naiva kiñcitkaroti saḥ ||"
          meaningLabel="Translation"
          meaning="When a person lets go of attachment to results, feels content always, and does not depend on anything, then even while acting, they are not truly 'doing' anything."
          insightLabel="What This Teaches"
          insight="Nityatṛpta means always content, including before any good outcome arrives. Nirāśraya means depending on nothing. Such a person can be busy with action and, in the Gita's sense, does nothing that binds."
          essence="Free of attachment to results, always content, they act and yet do nothing that binds."
        />

        <h2>What About Ambition? Is This Just Giving Up?</h2>
        <p>
          This is the objection most people have, and it deserves a real answer rather than a dismissal. The concern is that nishkama karma sounds like a sophisticated way to rationalize low effort. If you don&apos;t want the result, why push hard?
        </p>
        <p>
          The Gita&apos;s answer is that nishkama karma changes your relationship to the outcome and leaves the intensity of your effort alone. Consider two people doing identical work: one is working because they want to be seen as capable, to get the promotion, to prove something. The other is working because the work matters, because it is their duty to do it well, because it serves others. From the outside the effort looks the same, or the second person works harder because anxiety is using up less of them. Inside, the two states differ.
        </p>
        <p>
          Ambition is compatible with nishkama karma. Wanting to build something significant, to serve well or to grow in skill can all be motives that fall short of craving in the Gita&apos;s sense. What the Gita asks you to notice is whether your sense of self, your peace, your integrity, is dependent on the outcome arriving. If losing produces a collapse of identity rather than a recalibration, that dependency is what nishkama karma is asking you to examine.
        </p>

        <div className="highlight-box">
          <h3>The Distinction That Matters</h3>
          <p>
            Attachment to results means: if the outcome does not arrive, your sense of self is damaged. You feel that you are a failure, instead of feeling that something you did failed.
          </p>
          <p>
            Nishkama karma means: you work with full care and full effort, but your sense of self does not depend on the result arriving. You can lose and recalibrate without collapse. You can win without becoming dependent on winning again to feel okay.
          </p>
        </div>

        <h2>The Modern Problem It Addresses</h2>
        <p>
          Much of the anxiety people describe at work comes from outcome-dependence. You work on something and the whole time your mind runs a parallel thread: will this work? What if it doesn&apos;t? What will people think? What does it say about me if it fails? That thread consumes attention, degrades the quality of the work, and delivers suffering regardless of whether the outcome arrives, because the anxiety is present before the result is known.
        </p>
        <p>
          BG 2.47 separates the work from its result: the work is yours, the result is not.
        </p>
        <p>
          BG 3.9 comes at it from the other side. Krishna says that work done as yajña, as an offering, does not bind; work done for any other purpose binds.
        </p>

        <h2>Offering the Action: BG 18.11</h2>
        <p>
          By Chapter 18, the Gita is completing its argument. Krishna makes a point that is easy to miss: an embodied person cannot give up action entirely.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 18.11"
          sanskrit="न हि देहभृता शक्यं त्यक्तुं कर्माण्यशेषतः । यस्तु कर्मफलत्यागी स त्यागीत्यभिधीयते ॥"
          iast="na hi dehabhṛtā śakyaṃ tyaktuṃ karmāṇyaśeṣataḥ | yastu karmaphalatyāgī sa tyāgītyabhidhīyate ||"
          meaningLabel="Translation"
          meaning="A person living in a body cannot completely stop doing actions. Only giving up the desire for rewards from those actions makes someone a true tyagi (renunciate)."
          insightLabel="What This Teaches"
          insight="The Gita closes the renunciation escape hatch again. Renunciation here means doing your responsibilities while releasing the craving for what you hope they will produce. The tyāgī, the one who has given up, has given up the fruits of action and kept the action."
          essence="No embodied person can drop all action; who gives up the fruits is the true renouncer."
        />

        <p>
          This verse opens nishkama karma to people who live ordinary lives. You can keep your work, your family and your responsibilities and engage fully. The practice lies in whether you cling to a specific result or are willing to let the outcome be what it is.
        </p>

        <h2>How to Practise It</h2>
        <p>
          The Gita returns to nishkama karma across several chapters because the practice develops slowly. These habits help.
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>Define success before the outcome arrives.</strong> Before starting a piece of work, decide what a full-effort version looks like. Make that the measure. When you know you did the work well, that becomes your metric, and whether it landed the way you hoped becomes secondary data rather than the verdict on your worth.</span>
          </li>
          <li>
            <span><strong>Notice when outcome-anxiety is degrading the work.</strong> The parallel thread running &ldquo;but will this work?&rdquo; during execution is a signal. Observe it and bring your attention back to the action. The skill grows with repetition.</span>
          </li>
          <li>
            <span><strong>Separate the setback from the self.</strong> &ldquo;This did not work&rdquo; is different from &ldquo;I am a failure.&rdquo; The Gita&apos;s nishkama frame allows the first statement while refusing the second. Outcomes give you information. They do not determine identity.</span>
          </li>
          <li>
            <span><strong>Ask what the action serves beyond personal gain.</strong> The yajna frame from BG 3.9 is practical: before starting, ask who this is for. Work that serves something beyond your own advancement tends to pull out more genuine effort and creates less of the brittle dependency on outcome that produces burnout.</span>
          </li>
          <li>
            <span><strong>Let the response to outcomes be proportionate.</strong> Keep caring, in proportion. Wanting a project to succeed is appropriate. If the loss of a single project produces a weeks-long crisis of identity, that is a signal that outcome-attachment has grown outsized. The practice is calibrating the response over time.</span>
          </li>
        </ul>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: removed app commentary that had been quoted as if it were the Gita; corrected the verse count in the description (5, not 7) and the 3.19 translation; removed the unsupported claim that the Gita calls this the highest form of work; copy edited.</p>
      </div>


      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is nishkama karma?</strong>
          <p>
            Nishkama karma is action performed without craving for the results. The word breaks down as nish (without) and kama (desire or craving). In the Bhagavad Gita, it is the practice described in verse 2.47: perform your duty fully, but do not let the anticipated fruit be the reason you act. The same verse forbids inaction, so the effort stays complete while the inner demand on the outcome goes.
          </p>
        </div>

        <div className="faq-item">
          <strong>Is nishkama karma possible?</strong>
          <p>
            The Gita treats it as a practice that takes time, and Krishna returns to it across several chapters. Start by noticing when anxiety about results is driving your decisions. BG 6.35 grants that the mind is hard to control and says it can be trained through practice (abhyāsa) and detachment (vairāgya).
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
            Preparing well for a presentation without tying your self-worth to whether it lands. Caring for someone without expecting gratitude. Working at full intensity on a project while being willing to let the result be what it is. The external action stays the same. What changes is the internal relationship to whether things work out.
          </p>
        </div>

        <div className="faq-item">
          <strong>Did the Bhagavad Gita invent nishkama karma?</strong>
          <p>
            The term nishkama karma as a compound appears in later commentarial literature to summarize what the Gita teaches. The idea is in the Gita, especially in 2.47, 3.9, 3.19, 4.20, and 18.11, though the Gita does not use the compound itself.
          </p>
        </div>
      </div>

      <div className="content" style={{ paddingTop: 0 }}>
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Nishkama Karma Guide"} />
      </div>

      <SiteFooter />

      <BlogTracker pageName="Nishkama Karma Guide" />
    </>
  )
}

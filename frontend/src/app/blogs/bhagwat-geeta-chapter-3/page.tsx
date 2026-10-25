import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 3 Summary \u2013 Key Verses & Meaning (Karma Yoga)",
  description: "Bhagavad Gita Chapter 3 (Karma Yoga) \u2014 43 verses on action as offering, your own dharma over a borrowed perfection, and why desire is the real enemy.",
  keywords: "bhagwat geeta chapter 3, bhagavad gita karma yoga, karma yoga chapter 3, bhagwat geeta adhyay 3, svadharma meaning, lokasamgraha gita, what gita says about duty, karma yoga meaning, yajna gita, desire is the enemy gita, your own dharma imperfectly, Karma Yoga summary, Bhagavad Gita 3.35 sva-dharme nidhanam shreyah, what is karma yoga in Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 3 Summary \u2013 Key Verses & Meaning (Karma Yoga)",
    description: "Forty-three verses on action, duty, desire \u2014 and why the desire to escape responsibility is often just desire in another form.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter3.webp", width: 1200, height: 675, alt: "A bullock-driver tilling the field at dawn, offered as the example \u2014 Chapter 3 of the Bhagavad Gita, Karma Yoga, argues that selfless action is itself the path." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 3 Summary \u2013 Key Verses & Meaning (Karma Yoga)",
    description: "All 43 verses of Bhagavad Gita Chapter 3 \u2014 action as offering, your own dharma over a borrowed perfection, and why desire is the real enemy.",
    images: ["https://wisdomquotes.in/assets/chapter3.webp"],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3",
    languages: {
      'x-default': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3",
      'en': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3",
      'en-IN': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4" },
}

const pageCSS = `

      :root {
        --maroon: #3d0c0c;
        --maroon-mid: #5c1a1a;
        --gold: #c8881e;
        --gold-light: #f5c96a;
        --gold-pale: #fdf3dc;
        --gold-border: #e8c97a;
        --gold-dim: rgba(200, 136, 30, 0.15);
        --text: #f5e8cc;
        --text-dim: rgba(245, 232, 204, 0.65);
        --text-dimmer: rgba(245, 232, 204, 0.35);
        --muted-2: rgba(245, 232, 204, 0.35);
        --border: rgba(200, 136, 30, 0.2);
        --bg: #120505;
        --bg-warm: #190707;
        --bg-alt: #0f0404;
        --bg-card: rgba(255, 255, 255, 0.04);
        --bg-card-hover: rgba(255, 255, 255, 0.07);
        --max: 780px;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 88px;
      }

      body {
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.7;
        -webkit-font-smoothing: antialiased;
      }

      a { color: inherit; text-decoration: none; }
      img { display: block; max-width: 100%; }

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
        content: "अध्याय ३";
        position: absolute;
        right: -10px;
        bottom: -20px;
        font-family: "Noto Sans Devanagari", serif;
        font-size: 180px;
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
      .article-title {
        font-family: "Playfair Display", Georgia, serif;
        font-size: clamp(28px, 4vw, 48px);
        font-weight: 700;
        color: var(--gold-light);
        line-height: 1.15;
        letter-spacing: -0.5px;
        margin-bottom: 12px;
      }
      .article-title em { font-style: italic; color: #fff; }
      .article-subtitle {
        font-size: 17px;
        color: var(--text-dim);
        font-weight: 300;
        margin-bottom: 32px;
        line-height: 1.65;
        max-width: 580px;
      }
      .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
      .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
      .meta-sep { color: var(--border); }

      /* ── ARTICLE BODY ── */
      .article-wrap { max-width: var(--max); margin: 0 auto; padding: 60px 28px 80px; }

      .chapter-image {
        margin: 0 0 36px;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid var(--border);
        background: var(--bg-warm);
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
      }
      .chapter-image img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }

      .prose h2 {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 26px;
        font-weight: 700;
        color: var(--gold-light);
        margin: 52px 0 16px;
        line-height: 1.25;
      }
      .prose h2[id],
      .faq-section[id] {
        scroll-margin-top: 88px;
      }
      .prose h2 em { font-style: italic; color: #fff; }

      .prose h3 {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 19px;
        font-weight: 700;
        color: var(--text);
        margin: 32px 0 12px;
      }

      .prose p {
        font-size: 16.5px;
        line-height: 1.78;
        color: var(--text-dim);
        margin-bottom: 20px;
      }
      .prose p:last-child { margin-bottom: 0; }
      .prose strong { font-weight: 600; color: var(--text); }
      .prose em { font-style: italic; }
      .lead {
        font-size: 19px;
        line-height: 1.7;
        color: var(--text);
        font-weight: 300;
        margin-bottom: 28px;
      }

      /* ── TOC ── */
      .toc {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-left: 3px solid var(--gold);
        border-radius: 0 12px 12px 0;
        padding: 20px 24px;
        margin: 36px 0 40px;
      }
      .toc-label {
        font-size: 9.5px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 700;
        color: var(--gold);
        margin-bottom: 12px;
      }
      .toc-list { list-style: none; display: flex; flex-direction: column; gap: 7px; counter-reset: toc-counter; }
      .toc-list li { counter-increment: toc-counter; display: flex; align-items: baseline; gap: 10px; }
      .toc-list li::before {
        content: counter(toc-counter);
        font-family: "Inter", sans-serif;
        font-size: 10px;
        font-variant-numeric: tabular-nums;
        color: var(--text-dimmer);
        min-width: 14px;
      }
      .toc-list a { font-size: 13.5px; color: var(--text-dim); line-height: 1.4; transition: color 0.15s; }
      .toc-list a:hover { color: var(--gold-light); }

      /* ── SHLOKA CARD ── */

      /* ── PULL QUOTE ── */
      .pull-quote {
        margin: 40px 0;
        padding: 28px 32px;
        border-left: 3px solid var(--gold);
        background: rgba(200, 136, 30, 0.05);
        border-radius: 0 12px 12px 0;
      }
      .pull-quote blockquote {
        font-family: "Playfair Display", serif;
        font-size: 21px;
        font-style: italic;
        color: var(--gold-light);
        line-height: 1.5;
        margin-bottom: 10px;
      }
      .pull-quote cite { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); font-style: normal; font-weight: 600; }

      /* ── SECTION DIVIDER ── */
      .section-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0 40px; }
      .section-divider-line { flex: 1; height: 1px; background: var(--border); }
      .section-divider-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-dimmer); white-space: nowrap; font-weight: 600; }

      /* ── HIGHLIGHT BOX ── */
      .highlight-box {
        background: rgba(200, 136, 30, 0.05);
        border: 1px solid var(--border);
        border-left: 3px solid var(--gold);
        border-radius: 0 10px 10px 0;
        padding: 20px 24px;
        margin: 28px 0;
      }
      .highlight-box p { font-size: 15px; line-height: 1.7; color: var(--text-dim); }
      .highlight-box strong { color: var(--gold-light); }

      /* ── KEY INSIGHTS ── */
      .insights-box {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-top: 2px solid var(--gold);
        border-radius: 14px;
        padding: 28px 32px;
        margin: 48px 0;
      }
      .insights-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 16px; }
                  .insights-list { list-style: none; display: flex; flex-direction: column; gap: 0; counter-reset: insight-counter; }
      .insights-list li {
        counter-increment: insight-counter;
        position: relative;
        padding: 22px 0 22px 52px;
        border-bottom: 1px solid var(--border);
        font-size: 14.5px;
        color: var(--text-dim);
        line-height: 1.7;
      }
      .insights-list li:last-child { border-bottom: none; padding-bottom: 0; }
      .insights-list li::before {
        content: counter(insight-counter);
        position: absolute;
        left: 0;
        top: 22px;
        width: 32px;
        height: 32px;
        font-size: 13px;
        font-weight: 700;
        background: rgba(200, 136, 30, 0.12);
        color: var(--gold);
        border: 1px solid rgba(200, 136, 30, 0.35);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .insights-list strong { color: var(--text); font-weight: 600; display: block; margin-bottom: 5px; font-size: 15px; }

      /* ── VERSE TABLE ── */
      .verse-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13.5px;
        margin: 28px 0 40px;
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;
      }
      .verse-table thead tr { background: rgba(200, 136, 30, 0.08); }
      .verse-table thead th {
        text-align: left;
        padding: 12px 16px;
        font-size: 9.5px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--gold);
        font-weight: 700;
      }
      .verse-table tbody td {
        padding: 10px 16px;
        border-bottom: 1px solid var(--border);
        vertical-align: top;
        line-height: 1.55;
        color: var(--text-dim);
      }
      .verse-table tbody tr:last-child td { border-bottom: none; }
      .verse-table tbody tr:hover { background: var(--bg-card); }
      .verse-table td:first-child { font-size: 12px; color: var(--gold); font-weight: 600; white-space: nowrap; }

      /* ── FAQ ── */
      .faq-section {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-top: 2px solid var(--gold);
        border-radius: 14px;
        overflow: hidden;
        margin: 48px 0;
      }
      .faq-header { padding: 28px 32px 20px; border-bottom: 1px solid var(--border); }
      .faq-header-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .faq-header h2 {
        font-family: "Playfair Display", serif;
        font-size: 22px;
        font-weight: 700;
        color: var(--gold-light);
        line-height: 1.3;
        margin: 0;
      }
      .faq-item { padding: 22px 32px; border-bottom: 1px solid var(--border); }
      .faq-item:last-child { border-bottom: none; }
      .faq-q { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 10px; line-height: 1.4; }
      .faq-a { font-size: 14.5px; line-height: 1.72; color: var(--text-dim); }

            /* ── APP CTA ── */
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

      /* ── CHAPTER NAV ── */
      .chapter-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 20px 0;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        margin: 0 0 40px;
      }
      .ch-nav-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dimmer); font-weight: 600; margin-bottom: 4px; }
      .ch-nav-title { font-size: 14px; font-weight: 600; color: var(--text); }

      /* ── FOOTER ── */
      footer {
        background: var(--bg-alt);
        border-top: 1px solid var(--border);
        padding: 32px 28px;
        text-align: center;
        font-size: 12px;
        letter-spacing: 0.06em;
        color: var(--text-dimmer);
      }
      footer a { color: var(--text-dimmer); transition: color 0.15s; }
      footer a:hover { color: var(--gold-light); }
      footer span { color: var(--gold); }

      /* ── RESPONSIVE ── */
      @media (max-width: 700px) {
        .article-hero { padding: 44px 20px 40px; }
        .article-wrap { padding: 40px 20px 60px; }
        .app-cta { padding: 32px 24px; }
        .pull-quote { padding: 22px 24px; }
        .faq-header, .faq-item { padding-left: 20px; padding-right: 20px; }
        .insights-box { padding: 20px; }
      }
    
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    "headline": "Bhagavad Gita Chapter 3 — Karma Yoga: Why You Cannot Run",
    "description": "Bhagavad Gita Chapter 3 — Karma Yoga. All 43 verses with Sanskrit, transliteration, meaning. Action as offering, your own dharma over a borrowed perfection, and why desire is the real enemy.",
    "alternativeHeadline": "Bhagavad Gita Chapter 3 (Karma Yoga) — Summary & Verses",
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": ["https://www.linkedin.com/in/thisisashukla/", "https://x.com/thisisashukla"]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wisdom",
      "url": "https://wisdomquotes.in",
      "logo": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/new-light-logo.webp" }
    },
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/chapter3.webp", "width": 1200, "height": 675 },
    "datePublished": "2026-05-05",
    "dateModified": "2026-05-24",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3" },
    "about": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" }
    ],
    "keywords": "bhagwat geeta chapter 3, bhagavad gita karma yoga, karma yoga chapter 3, bhagwat geeta adhyay 3, svadharma meaning, lokasamgraha gita, yajna gita, desire is the enemy gita, Bhagavad Gita 3.35 sva-dharme nidhanam shreyah, what is karma yoga in Bhagavad Gita",
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
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Wisdom",
      "item": "https://wisdomquotes.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://wisdomquotes.in/blogs/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Bhagavad Gita Chapter 3 — Karma Yoga",
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3"
    }
  ]
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Bhagavad Gita Chapter 3 about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 3, called Karma Yoga or the Yoga of Action, addresses the fundamental question: if spiritual wisdom is better than action, why should one act at all? Krishna argues that no one can avoid action — even for a moment — and that the key lies in performing action as a form of sacred service (yajna) without attachment to results. The chapter also introduces the concept of lokasamgraha — the responsibility of great people to act as examples for the world."
      }
    },
    {
      "@type": "Question",
      "name": "What is karma yoga in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karma yoga is the path of selfless action — performing one's duties without attachment to outcomes, treating every action as an offering. In Chapter 3 Krishna presents it as the path for those inclined to action (3.3) and says action is better than inaction (3.8). Renunciation withdraws from action; karma yoga makes the action itself the path."
      }
    },
    {
      "@type": "Question",
      "name": "What does svadharma mean in the Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Svadharma means your own duty, the work that fits your nature and station. In 3.35, Krishna says: better your own dharma, imperfectly done, than another's done well. The verse warns against taking up someone else's path, however well you might walk it, and gives no licence to stay comfortable."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Gita say about avoiding your responsibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Chapter 3, Krishna says no one can stop acting even for a moment (3.5), and that someone who holds the body still while the mind runs after sense objects is a hypocrite (3.6). He treats Arjuna's wish to renounce as confusion and asks him to act without attachment (3.19)."
      }
    },
    {
      "@type": "Question",
      "name": "What is lokasamgraha in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lokasamgraha means 'the holding together of the world' or 'the welfare of humanity.' It appears in Chapter 3 as the reason wise and great people must keep acting for the world's sake, since their actions set the standard for what others will do. To withdraw from engagement when one has influence is to abandon a responsibility to the larger good."
      }
    }
  ]
}
]

export default function ChapterThreePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}


    {/* ── BREADCRUMB ── */}
    <div className="breadcrumb">
      <div className="breadcrumb-inner">
        <a href="/">Wisdom</a>
        <span className="bc-sep">/</span>
        <a href="/blogs">Blog</a>
        <span className="bc-sep">/</span>
        Bhagavad Gita Chapter 3
      </div>
    </div>

    {/* ── HERO ── */}
    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · Adhyay 3 · 43 Verses
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Bhagavad Gita Chapter 3 (Adhyay 3):<br />
          <em>Karma Yoga: Why You Cannot Run</em>
        </h1>
        <p className="article-subtitle">
          Arjuna wants to step back from the battlefield and from action itself. In Chapter 3 Krishna answers that no one can stop acting, so the question is how to act. Forty-three verses on duty, desire and the example you set.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">43 verses · Karma Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~14 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 3 of 18</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>
    </div>

    {/* ── ARTICLE ── */}
    <div className="article-wrap">
      <article className="prose">
                <figure className="chapter-image">
          <img
            src="/assets/chapter3.webp"
            alt="Krishna guiding Arjuna toward selfless action, Bhagavad Gita Chapter 3"
            width="1200"
            height="675"
            loading="eager"
          />
        </figure>

        <p className="lead">
          Arjuna has set down his bow, and at the start of Chapter 3 he puts his case to Krishna: if understanding is better than action, why push him into this terrible deed (3.1)? Why not renounce the world and let others fight?
        </p>

        <p>
          It is a fair question, and Krishna&apos;s answer gives Arjuna no permission to withdraw. He explains why no one can stop acting, how action can be done without binding you, and what makes it go wrong.
        </p>

        

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#arjuna-question">Arjuna's question, why act if wisdom is higher?</a>
            </li>
            <li>
              <a href="#two-paths">Two paths, equally valid (3.3)</a>
            </li>
            <li>
              <a href="#you-cannot-not-act">You cannot not act, even for a moment (3.5)</a>
            </li>
            <li>
              <a href="#yajna">The logic of yajna, acting as sacred service (3.9–3.16)</a>
            </li>
            <li>
              <a href="#lokasamgraha">Lokasamgraha, the weight of your example (3.21–3.26)</a>
            </li>
            <li>
              <a href="#ego-claims">The ego's claim on action (3.27)</a>
            </li>
            <li>
              <a href="#svadharma">Your own dharma, imperfectly done, over another's done well (3.35)</a>
            </li>
            <li>
              <a href="#desire-anger">The real enemy, desire and anger (3.37)</a>
            </li>
            <li>
              <a href="#hierarchy">The hierarchy of the inner life (3.42–3.43)</a>
            </li>
            <li><a href="#all-verses">All 43 shlokas at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            The Central Problem of Chapter 3
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="arjuna-question">The Question That Cannot Be Dismissed</h2>

        <p>
          In Chapter 2 Arjuna heard Krishna teach that the Self is eternal, that the body dies and the atman does not, and that action without attachment leads to freedom. Now he asks Krishna directly:
        </p>

        <p>
          If wisdom is higher than action, why do you ask me to engage in this terrible war?
        </p>

        <p>
          If knowledge liberates, why not gain the knowledge and sit still?
        </p>

        <p>
          Krishna gives two reasons. First, Arjuna has misunderstood renunciation: a person does not reach freedom from action by never starting work, or by renouncing it alone (3.4). Second, no one can stop acting, since even keeping the body alive takes action (3.8). What remains is a choice between acting with attachment and acting without it.
        </p>

        <div className="highlight-box">
          <p>
            <strong>The deeper pattern:</strong> Arjuna's collapse in Chapter 1 and his question in Chapter 3 come from the same wish to get out, first out of the battle and then out of action itself. In 2.3 Krishna had already called that wish a petty weakness of heart, and in Chapter 3 he treats it as a misunderstanding of what freedom is.
          </p>
        </div>

        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 3.3 · The Two Paths
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="two-paths">Two Legitimate Paths</h2>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.3"
          speaker="Krishna"
          sanskrit="लोकेऽस्मिन्द्विविधा निष्ठा पुरा प्रोक्ता मयानघ । ज्ञानयोगेन सांख्यानां कर्मयोगेन योगिनाम् ॥"
          iast="loke'smindvividhā niṣṭhā purā proktā mayānagha | jñānayogena sāṃkhyānāṃ karmayogena yoginām ||"
          meaning="In this world, I have described two paths of spiritual practice: the path of knowledge for those inclined toward understanding, and the path of action (karma yoga) for those inclined toward doing."
          insightLabel="Two paths"
          insight="Krishna names two paths he taught long ago: jnana yoga for the contemplative (the Sankhyas) and karma yoga for the active (the yogis). He favours neither in this verse. What matters is that the path suits the person."
          essence="Krishna taught two paths: knowledge for the contemplative, action for the active."
        />

        <p>
          Krishna takes Arjuna's interest in knowledge seriously and grants that both paths exist. But Arjuna, a kshatriya by birth and training, has spent his life in action. For him, turning into a wandering ascetic in the middle of a battle would be escape dressed in spiritual language.
        </p>

        <p>
          Here the Gita treats a person's nature, their temperament, gifts and training, as the ground of their practice. Verse 3.33 makes the same point: even the wise act according to their nature.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 3.5 · The Inescapable Fact
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="you-cannot-not-act">You Cannot Avoid Action</h2>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.5"
          speaker="Krishna"
          sanskrit="न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत् । कार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः ॥"
          iast="na hi kaścitakṣaṇamapi jātu tiṣṭhatyakarmakṛt | kāryate hyavaśaḥ karma sarvaḥ prakṛtijairguṇaiḥ ||"
          meaning="No one can remain without performing some action even for a single moment. Everyone is made to act, helplessly, by the qualities born of material nature."
          insightLabel="The refutation of escape"
          insight="Complete inaction is impossible. The gunas of nature keep a person acting, and even sitting still involves breathing, thinking and wanting. The real choice is how to act."
          essence="No one can stay without acting even for a moment; nature makes everyone act."
        />

        <p>
          The person who sits in the forest with closed eyes and claims to have stopped acting is still breathing and thinking. In the next verse Krishna goes further: someone who holds the body still while the mind dwells on sense objects is a hypocrite (3.6).
        </p>

        <p>
          So the choice was never between action and inaction. It lies between acting with care and acting blindly while telling yourself you are doing nothing.
        </p>

        <div className="pull-quote">
          <blockquote>
            "Everyone is made to act, helplessly, by the qualities born of material nature."
          </blockquote>
          <cite>Bhagavad Gita 3.5</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.9–3.16 · Yajna and Sacred Service
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="yajna">When Action Becomes Offering</h2>

        <p>
          If you cannot avoid action, the question becomes: how do you prevent action from becoming bondage? How do you act without being trapped by the results?
        </p>

        <p>
          Krishna's answer is <em>yajna</em>, usually translated as sacrifice. In Chapter 3 it means the ritual offering and, more broadly, any action done as an offering instead of for private gain.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.9"
          speaker="Krishna"
          sanskrit="यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः । तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर ॥"
          iast="yajñārthātkarmaṇo'nyatra loko'yaṃ karmabandhanaḥ | tadarthaṃ karma kaunteya muktasaṃgaḥ samācara ||"
          meaning="Work done as a sacrifice (yajna) does not bind; but work done for selfish purposes is bondage. Perform your duties as an offering, free from attachment."
          insightLabel="Work as offering"
          insight="The same action binds you when it is done for yourself and leaves you free when it is done as an offering. So Krishna asks Arjuna to work for yajna and drop his attachment."
          essence="Work done as an offering does not bind; work done for yourself does."
        />

        

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.21–3.26 · Lokasamgraha
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="lokasamgraha">The Weight of What Others Will Do</h2>

        <p>
          Krishna then adds a social reason to act. In 3.20 he cites King Janaka, who reached perfection through action, and tells Arjuna to act for lokasamgraha, the holding together of the world. People with standing are watched, and what they do becomes the standard.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.21"
          speaker="Krishna"
          sanskrit="यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः । स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥"
          iast="yadyadācarati śreṣṭhastattadevetaro janaḥ | sa yatpramāṇaṃ kurute lokastadanuvartate ||"
          meaning="Whatever a great person does, ordinary people will follow. Whatever standards they set, the world will adopt."
          insightLabel="The responsibility"
          insight="What a respected person does, others copy, and the standard they set is the one the world follows. If someone with gifts or influence withdraws out of fear or a wish for peace, others lose a model for doing their own work."
          essence="Whatever a great person does, others follow, and the world adopts their standard."
        />

        <p>
          For Arjuna this has a sting. His wish to renounce affects more than himself. If a warrior of his standing puts down his bow and leaves for the forest, others will take it as a sign that withdrawal is acceptable and that the world's troubles belong to someone else.
        </p>

        <p>
          Krishna applies this to himself in 3.22–24. He has nothing to gain in the three worlds, yet he keeps working, because if he stopped, people would follow his example and the worlds would fall into ruin.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 3.27 · The Ego's Great Claim
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="ego-claims">Who Is the Doer?</h2>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.27"
          speaker="Krishna"
          sanskrit="प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः । अहङ्कारविमूढात्मा कर्ताऽहमिति मन्यते ॥"
          iast="prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ | ahaṅkāravimūḍhātmā kartā'hamiti manyate ||"
          meaning="All actions are performed by the qualities of material nature, but one who is deluded by ego thinks &quot;I am the doer.&quot;"
          insightLabel="The subtler freedom"
          insight="The one who thinks they alone authored their successes also carries their failures alone. Krishna gives a different account: the gunas of nature do the acting, and the confused ego says I am the doer."
          essence="Nature&apos;s qualities do all the acting; the deluded ego thinks it is the doer."
        />

        <p>
          The verse sits oddly beside 3.5: you cannot avoid action, yet you are never its sole author. Sattva, rajas and tamas, the qualities of nature, act through you all the time, and your body, mind, likes and dislikes are made of them.
        </p>

        <p>
          So where is the I that does things? The teaching points to the Self as the witness of all this action. You can act fully while knowing that the action happens through you.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 3.35 · Your Own Dharma
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="svadharma">Better Your Own Path Imperfectly</h2>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.35"
          speaker="Krishna"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ ||"
          meaning="Better your own dharma, imperfectly done, than another's done well. Even death in your own dharma is better; another's dharma brings fear."
          insightLabel="Your own dharma"
          insight="Arjuna is a kshatriya, and his dharma is to fight; the ascetic life he is reaching for belongs to someone else. Krishna says that following another's dharma, however well, brings fear, while even dying in your own is better."
          essence="Better your own dharma, imperfectly done, than another&apos;s done well."
        />

        <p>
          The verse gives comfort and a warning. Doing your own dharma clumsily still beats doing someone else's well.
        </p>

        <p>
          The warning is that another's dharma brings fear. It is worth asking why another path attracts you: because it looks easier from outside, because you admire how well someone else walks it, or because you are afraid of failing at your own.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 3.37 · The True Enemy
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="desire-anger">What Drives Us to Do Wrong</h2>

        <p>
          In 3.36 Arjuna asks what drives a person to do wrong, even against their will, as if by force. Krishna names desire and anger.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.37"
          speaker="Krishna (in response to Arjuna)"
          sanskrit="काम एष क्रोध एष रजोगुणसमुद्भवः । महाशनो महापाप्मा विद्ध्येनमिह वैरिणम् ॥"
          iast="kāma eṣa krodha eṣa rajoguṇasamudbhavaḥ | mahāśano mahāpāpmā viddhyenamiha vairiṇam ||"
          meaning="It is desire, it is anger, born of the rajo-guna, all-devouring and greatly harmful (mahāpāpmā), know this as the enemy in this world."
          insightLabel="The diagnosis"
          insight="Krishna traces wrongdoing to desire (kama) and its other face, anger (krodha), both born of rajas, the restless guna. He calls desire all-devouring and the enemy here, an enemy inside Arjuna as well as across the field."
          essence="Desire and anger, born of rajas, are the enemy to know and fight."
        />

        <p>
          So the enemy Krishna points to is inside: the restless wanting in the mind, the craving for what you lack and the anger that comes when it is blocked.
        </p>

        <p>
          In 3.39 Krishna calls desire a fire that is never satisfied, and in 3.40 he says it lives in the senses, the mind and the intellect.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.42–3.43 · The Hierarchy of Freedom
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="hierarchy">The Ladder from Body to Self</h2>

        <p>
          Chapter 3 ends by ranking the parts of a person, from the senses up to the Self.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.42–3.43"
          speaker="Krishna"
          sanskrit="इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः । मनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु सः ॥ एवं बुद्धेः परं बुद्ध्वा संस्तभ्यात्मानमात्मना । जहि शत्रुं महाबाहो कामरूपं दुरासदम् ॥"
          iast="indriyāṇi parāṇyāhurindriyebhyaḥ paraṃ manaḥ | manasastu parā buddhiryo buddheḥ paratastu saḥ || evaṃ buddheḥ paraṃ buddhvā saṃstabhyātmānamātmanā | jahi śatruṃ mahābāho kāmarūpaṃ durāsadam ||"
          meaning="The senses are higher than the body; the mind is higher than the senses; the intellect is higher than the mind. And higher than the intellect is the Self. Knowing the Self to be superior to the intellect, restrain your lower self with your higher Self, and slay this formidable enemy in the form of desire."
          insightLabel="The ladder"
          insight="The ladder is for steadying yourself. You keep the body and the senses and use each higher level to govern the one below: the intellect governs the mind, and knowing the Self steadies the intellect. Desire is strong, and the Self is stronger."
          essence="Master your senses through the mind, mind through intellect, intellect through Self."
        />

        <p>
          The chapter began with Arjuna's wish to escape and ends with mastery of the self. The senses seek, the mind desires and the intellect rationalizes, and beyond all of them is the Self, the witness.
        </p>

        <p>
          Reaching that freedom means staying in the body and the mind without being run by them. In this chapter, renunciation means giving up the belief that you are only the part of yourself that craves and reacts.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 43 Verses at a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Chapter</h2>

        <table className="verse-table">
          <thead>
            <tr>
              <th>Verse</th>
              <th>Speaker</th>
              <th>Core Teaching</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3.1</td>
              <td>Arjuna</td>
              <td>If knowledge is superior to action, why must I fight?</td>
            </tr>
            <tr>
              <td>3.2</td>
              <td>Arjuna</td>
              <td>Your words confuse me, teach me clearly.</td>
            </tr>
            <tr>
              <td>3.3</td>
              <td>Krishna</td>
              <td>Two paths: knowledge yoga for scholars, karma yoga for doers.</td>
            </tr>
            <tr>
              <td>3.4</td>
              <td>Krishna</td>
              <td>Not starting work does not free you from action, and renouncing it alone does not bring perfection.</td>
            </tr>
            <tr>
              <td>3.5</td>
              <td>Krishna</td>
              <td>You cannot avoid action, nature compels you.</td>
            </tr>
            <tr>
              <td>3.6</td>
              <td>Krishna</td>
              <td>Holding the body still while the mind dwells on sense objects is hypocrisy.</td>
            </tr>
            <tr>
              <td>3.7</td>
              <td>Krishna</td>
              <td>Better is one who governs the senses by the mind and works without attachment.</td>
            </tr>
            <tr>
              <td>3.8</td>
              <td>Krishna</td>
              <td>Do your prescribed work; action is better than inaction, and even the body needs it.</td>
            </tr>
            <tr>
              <td>3.9</td>
              <td>Krishna</td>
              <td>Work not done as yajna binds; work as an offering, free of attachment.</td>
            </tr>
            <tr>
              <td>3.10</td>
              <td>Krishna</td>
              <td>Prajapati created beings along with yajna and said: prosper by this.</td>
            </tr>
            <tr>
              <td>3.11</td>
              <td>Krishna</td>
              <td>Nourish the gods and they will nourish you; serving each other, you reach the highest good.</td>
            </tr>
            <tr>
              <td>3.12</td>
              <td>Krishna</td>
              <td>Whoever enjoys the gods' gifts without offering anything back is a thief.</td>
            </tr>
            <tr>
              <td>3.13</td>
              <td>Krishna</td>
              <td>Those who eat what remains of the offering are freed; those who cook only for themselves eat sin.</td>
            </tr>
            <tr>
              <td>3.14</td>
              <td>Krishna</td>
              <td>Beings come from food, food from rain, rain from yajna, and yajna from action.</td>
            </tr>
            <tr>
              <td>3.15</td>
              <td>Krishna</td>
              <td>Action comes from the Veda, the Veda from the Imperishable; so Brahman rests in yajna.</td>
            </tr>
            <tr>
              <td>3.16</td>
              <td>Krishna</td>
              <td>Whoever does not keep this wheel turning, living for the senses, lives in vain.</td>
            </tr>
            <tr>
              <td>3.17</td>
              <td>Krishna</td>
              <td>For one who delights and rests content in the self, no work remains to be done.</td>
            </tr>
            <tr>
              <td>3.18</td>
              <td>Krishna</td>
              <td>That person gains nothing by acting or not acting, and depends on no one.</td>
            </tr>
            <tr>
              <td>3.19</td>
              <td>Krishna</td>
              <td>So do the work that must be done, without attachment; that way one reaches the highest.</td>
            </tr>
            <tr>
              <td>3.20</td>
              <td>Krishna</td>
              <td>Janaka and others reached perfection through action; act for the welfare of the world too.</td>
            </tr>
            <tr>
              <td>3.21</td>
              <td>Krishna</td>
              <td>Great people set the standard; others follow their example.</td>
            </tr>
            <tr>
              <td>3.22</td>
              <td>Krishna</td>
              <td>Krishna has nothing to gain in the three worlds, yet he keeps acting.</td>
            </tr>
            <tr>
              <td>3.23</td>
              <td>Krishna</td>
              <td>If Krishna stopped working, people everywhere would follow his example.</td>
            </tr>
            <tr>
              <td>3.24</td>
              <td>Krishna</td>
              <td>If he stopped, the worlds would fall into ruin and confusion.</td>
            </tr>
            <tr>
              <td>3.25</td>
              <td>Krishna</td>
              <td>The wise should act as hard as the ignorant, but without attachment, for the world's welfare.</td>
            </tr>
            <tr>
              <td>3.26</td>
              <td>Krishna</td>
              <td>The wise should leave those attached to action undisturbed, act well themselves, and keep them working.</td>
            </tr>
            <tr>
              <td>3.27</td>
              <td>Krishna</td>
              <td>Nature acts through you, the ego claims the credit.</td>
            </tr>
            <tr>
              <td>3.28</td>
              <td>Krishna</td>
              <td>One who knows that qualities act on qualities stays unattached.</td>
            </tr>
            <tr>
              <td>3.29</td>
              <td>Krishna</td>
              <td>Those who know the whole should not unsettle those who know only part.</td>
            </tr>
            <tr>
              <td>3.30</td>
              <td>Krishna</td>
              <td>Offer all actions to Krishna and fight, free of hope, ownership and fever.</td>
            </tr>
            <tr>
              <td>3.31</td>
              <td>Krishna</td>
              <td>Those who follow this teaching with faith, without finding fault, are freed from karma.</td>
            </tr>
            <tr>
              <td>3.32</td>
              <td>Krishna</td>
              <td>Those who sneer at it and do not follow it are lost.</td>
            </tr>
            <tr>
              <td>3.33</td>
              <td>Krishna</td>
              <td>Even the wise act according to their nature; repression achieves little.</td>
            </tr>
            <tr>
              <td>3.34</td>
              <td>Krishna</td>
              <td>Attraction and aversion lie in wait in sense objects; do not fall under their sway.</td>
            </tr>
            <tr>
              <td>3.35</td>
              <td>Krishna</td>
              <td>Better your own dharma, imperfectly done, than another's done well.</td>
            </tr>
            <tr>
              <td>3.36</td>
              <td>Arjuna</td>
              <td>What drives a person to wrongdoing, even against their will?</td>
            </tr>
            <tr>
              <td>3.37</td>
              <td>Krishna</td>
              <td>Desire and anger are the real enemies, overcome them.</td>
            </tr>
            <tr>
              <td>3.38</td>
              <td>Krishna</td>
              <td>Desires obscure wisdom like smoke conceals fire.</td>
            </tr>
            <tr>
              <td>3.39</td>
              <td>Krishna</td>
              <td>Desire is a fire that is never satisfied.</td>
            </tr>
            <tr>
              <td>3.40</td>
              <td>Krishna</td>
              <td>The senses, mind and intellect are where desire lives.</td>
            </tr>
            <tr>
              <td>3.41</td>
              <td>Krishna</td>
              <td>So control the senses first and kill desire, the destroyer of knowledge.</td>
            </tr>
            <tr>
              <td>3.42</td>
              <td>Krishna</td>
              <td>The senses are higher than the body, the mind higher than the senses, the intellect higher still, and the Self beyond it.</td>
            </tr>
            <tr>
              <td>3.43</td>
              <td>Krishna</td>
              <td>Knowing the Self, steady yourself by the Self and kill desire, the hard-to-conquer enemy.</td>
            </tr>
          </tbody>
        </table>

        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the wording of 3.35, the verse-by-verse summaries in the table (several did not match their verses), and the description of Arjuna as a kshatriya by birth and training; removed an app plug; copy edited.</p>

        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 3"} />


        {/* CHAPTER NAV */}
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous Chapter</div>
            <div className="ch-nav-title"><a href="/blogs/bhagwat-geeta-chapter-2">Chapter 2, Sankhya Yoga</a></div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div className="ch-nav-label">Next Chapter</div>
            <div className="ch-nav-title"><a href="/blogs/bhagwat-geeta-chapter-4">Chapter 4, Jnana Yoga</a></div>
          </div>
        </div>

      <FeedbackWidget pageType="blog" />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Frequently Asked Questions
          </div>
          <div className="section-divider-line"></div>
        </div>

        {/* FAQ */}

        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common Questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 3 about?</div>
            <div className="faq-a">Chapter 3, called Karma Yoga or the Yoga of Action, addresses the fundamental question: if spiritual wisdom is better than action, why should one act at all? Krishna argues that no one can avoid action, even for a moment, and that the key lies in performing action as a form of sacred service (yajna) without attachment to results. The chapter also introduces the concept of lokasamgraha, the responsibility of great people to act as examples for the world.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is karma yoga in the Bhagavad Gita?</div>
            <div className="faq-a">Karma yoga is the path of selfless action, performing one's duties without attachment to outcomes, treating every action as an offering. In Chapter 3 Krishna presents it as the path for those inclined to action (3.3) and says action is better than inaction (3.8). Renunciation withdraws from action; karma yoga makes the action itself the path.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does svadharma mean in the Gita?</div>
            <div className="faq-a">Svadharma means your own duty, the work that fits your nature and station. In 3.35, Krishna says: better your own dharma, imperfectly done, than another's done well. The verse warns against taking up someone else's path, however well you might walk it, and gives no licence to stay comfortable.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does the Gita say about avoiding your responsibility?</div>
            <div className="faq-a">In Chapter 3, Krishna says no one can stop acting even for a moment (3.5), and that someone who holds the body still while the mind runs after sense objects is a hypocrite (3.6). He treats Arjuna's wish to renounce as confusion and asks him to act without attachment (3.19).</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is lokasamgraha in the Bhagavad Gita?</div>
            <div className="faq-a">Lokasamgraha means "the holding together of the world" or "the welfare of humanity." It appears in Chapter 3 as the reason wise and great people must keep acting for the world's sake, since their actions set the standard for what others will do. To withdraw from engagement when one has influence is to abandon a responsibility to the larger good.</div>
          </div>
        </div>
      </article>
    </div>

    {/* ── FOOTER ── */}
    <footer>
      <p>
        Wisdom · One Gita verse a day for 7 days, read aloud · Week 1 free on iPhone
      </p>
      <p style={{marginTop: '8px'}}>
        <a href="/">wisdomquotes.in</a>  ·
        <a href={appStoreUrl('web_blog_footer')} target="_blank" rel="noopener" data-mp-location="footer_app_store">App Store</a>  ·
        <a href="/privacy">Privacy</a>  ·
        <a href="/terms">Terms</a>  ·
        <a href="mailto:work.ankurshukla@gmail.com">Support</a>
      </p>
    </footer>
  
    

      <BlogTracker pageName="Bhagwat Geeta Chapter 3" />
    </>
  )
}
import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 4 Summary \u2013 Key Verses & Meaning (Jnana Karma Yoga)",
  description: "Bhagavad Gita Chapter 4 (Jnana Karma Sanyasa Yoga) \u2014 42 verses on 'yada yada hi dharmasya,' divine incarnation, the yoga of knowledge, and how wisdom burns karma.",
  keywords: "bhagwat geeta chapter 4, bhagavad gita jnana yoga, yada yada hi dharmasya meaning, gita 4.7 meaning, bhagavad gita knowledge yoga, jnana yajna meaning, bhagwat geeta adhyay 4, divine incarnation gita, jnana agni gita, how to learn from a teacher gita, Jnana Karma Sanyasa Yoga summary, Bhagavad Gita 4.7 meaning, Bhagavad Gita 4.34 tadviddhi pranipatena, knowledge as offering Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 4 Summary \u2013 Key Verses & Meaning (Jnana Karma Yoga)",
    description: "All 42 verses of Bhagavad Gita Chapter 4: yada yada hi dharmasya, knowledge as the greatest offering, and how knowledge burns away karma.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter4.webp", width: 1200, height: 675, alt: "Krishna teaching the eternal knowledge to Arjuna under the gaze of the sun \u2014 Chapter 4 of the Bhagavad Gita, Jnana Karma Sanyasa Yoga, on divine incarnation and the wisdom that burns karma." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 4 Summary \u2013 Key Verses & Meaning (Jnana Karma Yoga)",
    description: "All 42 verses of Bhagavad Gita Chapter 4 \u2014 the promise of divine renewal, the yoga of knowledge, and the model for learning from a real teacher.",
    images: ["https://wisdomquotes.in/assets/chapter4.webp"],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4",
    languages: {
      'x-default': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4",
      'en': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4",
      'en-IN': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5" },
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
        content: "अध्याय ४";
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

      /* ── WISDOM ENTITY ── */
      .wisdom-entity {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-top: 2px solid var(--gold);
        border-radius: 14px;
        padding: 28px 32px;
        margin: 48px 0;
      }
      .wisdom-entity-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 10px; }
      .wisdom-entity h3 { font-family: "Playfair Display", serif; font-size: 18px; font-weight: 700; color: var(--gold-light); margin-bottom: 10px; }
      .wisdom-entity p { font-size: 14px; line-height: 1.7; color: var(--text-dim); margin-bottom: 10px; }
      .wisdom-entity p:last-child { margin-bottom: 0; }
      .wisdom-entity strong { color: var(--text); font-weight: 600; }
      .wisdom-entity a { color: var(--gold); text-decoration: underline; text-underline-offset: 3px; }

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

      /* ── RELATED ── */
      .related-section { margin-bottom: 60px; }
      .related-section h3 { font-family: "Playfair Display", serif; font-size: 20px; font-weight: 700; color: var(--gold-light); margin-bottom: 20px; }
      .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
      .related-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 18px 20px;
        text-decoration: none;
        transition: border-color 0.15s, background 0.15s, transform 0.15s;
      }
      .related-card:hover { border-color: var(--gold); background: var(--bg-card-hover); transform: translateY(-2px); }
      .related-card-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-dimmer); font-weight: 600; margin-bottom: 6px; }
      .related-card-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; }

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
        .insights-box, .wisdom-entity { padding: 20px; }
      }
    
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    "headline": "Bhagavad Gita Chapter 4: Jnana Karma Sanyasa Yoga",
    "description": "Bhagavad Gita Chapter 4 — Jnana Karma Sanyasa Yoga. All 42 verses with Sanskrit, transliteration, meaning. Yada yada hi dharmasya, the yoga of knowledge, and how wisdom burns karma.",
    "alternativeHeadline": "Bhagavad Gita Chapter 4 (Jnana Karma Sanyasa Yoga) — Summary & Verses",
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
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/chapter4.webp", "width": 1200, "height": 675 },
    "datePublished": "2026-05-05",
    "dateModified": "2026-05-24",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4" },
    "about": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" }
    ],
    "keywords": "bhagwat geeta chapter 4, bhagavad gita jnana yoga, yada yada hi dharmasya meaning, gita 4.7 meaning, jnana yajna meaning, divine incarnation gita, Jnana Karma Sanyasa Yoga summary, Bhagavad Gita 4.34 tadviddhi pranipatena, knowledge as offering Bhagavad Gita",
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
      "name": "Bhagavad Gita Chapter 4 — Jnana Karma Sanyasa Yoga",
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4"
    }
  ]
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Bhagavad Gita Chapter 4 about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 4, called Jnana Karma Sanyasa Yoga, covers three major themes: Krishna's promise to return in every age to restore dharma (4.7–4.8), action without attachment, and knowledge — described as a fire that burns away all karma. It also says how to approach a teacher: with humility, questions and service (4.34)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the meaning of 'yada yada hi dharmasya'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is the opening of verse 4.7. The full verse: 'Whenever there is a decline in dharma (righteousness) and an increase in adharma (unrighteousness), O Arjuna, I manifest myself.' It is widely quoted and usually paired with 4.8: 'To protect the righteous, destroy the wicked, and re-establish dharma, I am born age after age.' Together they say that Krishna returns, age after age (yuge yuge), whenever dharma needs restoring."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Bhagavad Gita say about how to learn?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Verse 4.34 says to learn from those who have seen the truth by bowing to them, asking questions, and serving them. Those teachers, Krishna says, will then pass on the knowledge."
      }
    },
    {
      "@type": "Question",
      "name": "What is 'jnana yajna' in the Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jnana yajna means the sacrifice (offering) of knowledge or wisdom. In verse 4.33, Krishna says it is superior to material sacrifices because all actions find their completion in wisdom. So the best offering a person can make is understanding."
      }
    },
    {
      "@type": "Question",
      "name": "How many verses are in Chapter 4 of the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 4 has 42 verses. It is also known as Jnana Karma Sanyasa Yoga — the Yoga of Renunciation of Action through Knowledge."
      }
    }
  ]
}
]

export default function ChapterFourPage() {
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
        Bhagavad Gita Chapter 4
      </div>
    </div>

    {/* ── HERO ── */}
    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · Adhyay 4 · 42 Verses
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Bhagavad Gita Chapter 4 (Adhyay 4):<br />
          <em>Jnana Karma Sanyasa Yoga</em>
        </h1>
        <p className="article-subtitle">
          Krishna on why he takes birth (4.7–8), on action and inaction, on the many kinds of sacrifice, and on knowledge as a fire that burns karma (4.37).
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">42 verses · Jnana Karma Sanyasa Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~13 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 4 of 18</span>
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
            src="/assets/chapter4.webp"
            alt="Krishna on the lineage of yoga and wisdom of action, Bhagavad Gita Chapter 4"
            width="1200"
            height="675"
            loading="eager"
          />
        </figure>

        <p className="lead">
          Chapter 4 opens with the lineage of this yoga: Krishna taught it to Vivasvan, who taught Manu (4.1). A few verses later comes a widely quoted passage, Krishna&apos;s promise that whenever dharma declines, he appears to restore it (4.7–8). Most of the chapter, though, is about action: how to act without being bound, the many kinds of sacrifice, knowledge as the fire that burns karma (4.37), and how to learn from a teacher (4.34).
        </p>

        <p>
          This is also the first chapter where Krishna speaks openly about his own nature. In 4.9 he says that whoever understands his birth and action is not born again.
        </p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#divine-promise">The divine promise: 4.7 and 4.8</a>
            </li>
            <li>
              <a href="#divine-action">The nature of divine action: 4.9 to 4.14</a>
            </li>
            <li>
              <a href="#knowledge-highest">Knowledge as the greatest yajna: 4.33</a>
            </li>
            <li>
              <a href="#approach-teacher">How to approach a teacher: 4.34</a>
            </li>
            <li>
              <a href="#fire-wisdom">The fire of knowledge: 4.37 to 4.38</a>
            </li>
            <li>
              <a href="#arise">Arise: the chapter&apos;s last instruction</a>
            </li>
            <li><a href="#all-verses">All 42 shlokas at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 4.7–4.8 · The Divine Promise
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="divine-promise">The Divine Promise: Goodness Will Be Protected</h2>

        <p>
          These two verses are among the best known in the chapter, and they have been quoted in support of all kinds of causes. Read closely, they promise that dharma has a protector who comes back when it is in decline.
        </p>

        {/* SHLOKA 4.7 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.7"
          speaker="Krishna"
          sanskrit="यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदाऽऽत्मानं सृजाम्यहम् ॥"
          iast="yadā yadā hi dharmasya glānirbhavati bhārata | abhyutthānamadharmasya tadā''tmānaṃ sṛjāmyaham ||"
          essence="Whenever dharma declines and adharma rises, Krishna manifests himself."
        />

        {/* SHLOKA 4.8 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.8"
          speaker="Krishna"
          sanskrit="परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय संभवामि युगे युगे ॥"
          iast="paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharmasaṃsthāpanārthāya saṃbhavāmi yuge yuge ||"
          meaning="To protect the righteous, to destroy the wicked, and to re-establish dharma, I am born age after age."
          insightLabel="The deeper dimension"
          insight="This verse gives the three reasons Krishna takes birth: to protect the good, to destroy wrongdoers, and to re-establish dharma. In the Gita, protecting the good includes ending the harm done to them."
          essence="He is born age after age to protect the good, destroy the wicked and restore dharma."
        />

        <p>
          Krishna says this plainly. He doesn't treat Arjuna's moment as special; he describes how things go: when dharma declines, he comes back to set it right (4.7–8).
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 4.9–4.14 · The Nature of Divine Action
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="divine-action">What Does It Mean to Know the Divine?</h2>

        <p>
          In verses 9 to 14 Krishna moves from history to the listener: what happens to someone who understands him.
        </p>

        {/* SHLOKA 4.9 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.9"
          speaker="Krishna"
          sanskrit="जन्म कर्म च मे दिव्यमेवं यो वेत्ति तत्त्वतः । त्यक्त्वा देहं पुनर्जन्म नैति मामेति सोऽर्जुन ॥"
          iast="janma karma ca me divyamevaṃ yo vetti tattvataḥ | tyaktvā dehaṃ punarjanma naiti māmeti so'rjuna ||"
          meaning="One who truly knows the divine nature of my birth and activities does not take birth again after leaving this body but comes to me, O Arjuna."
          insightLabel="The core teaching"
          insight="The verse says that knowing (vetti tattvataḥ) Krishna&apos;s birth and action as divine is enough to end rebirth. The knowing it describes is a direct understanding of who Krishna is."
          essence="One who knows his divine birth and action escapes rebirth and comes to him."
        />

        <div className="highlight-box">
          <p>
            <strong>A structural note:</strong> Verses 7–8 say why Krishna takes birth. Verse 9 says that understanding this is itself freeing, and 4.10 adds that many have already reached his state this way.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 4.33 · Knowledge as Offering
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="knowledge-highest">Knowledge as the Greatest Yajna</h2>

        <p>
          Verses 4.25–32 list many kinds of yajna: offerings to the gods, restraint of the senses, gifts of wealth, breath control, study. Verse 33 ranks them.
        </p>

        {/* SHLOKA 4.33 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.33"
          speaker="Krishna"
          sanskrit="श्रेयान्द्रव्यमयाद्यज्ञाज्ज्ञानयज्ञः परन्तप । सर्वं कर्माखिलं पार्थ ज्ञाने परिसमाप्यते ॥"
          iast="śreyāndravyamayādyajñājjñānayajñaḥ parantapa | sarvaṃ karmākhilaṃ pārtha jñāne parisamāpyate ||"
          meaning="O destroyer of enemies, the sacrifice of knowledge is superior to the sacrifice of material things. All action in its entirety finds its culmination in wisdom, O Arjuna."
          insightLabel="What it adds"
          insight="All the offerings listed before this verse are actions. Krishna says every action reaches its end (parisamāpyate) in jnana, knowledge, so knowledge ranks above the rest."
          essence="The sacrifice of knowledge is greater than that of things; all action ends in knowledge."
        />

        <div className="pull-quote">
          <blockquote>
            "All action in its entirety finds its culmination in wisdom."
          </blockquote>
          <cite>Bhagavad Gita 4.33</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 4.34 · How to Approach a Teacher
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="approach-teacher">How to Learn From a Teacher</h2>

        <p>
          If knowledge is the greatest offering, how does one get it? Verse 4.34 answers with three things the student does.
        </p>

        {/* SHLOKA 4.34 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.34"
          speaker="Krishna"
          sanskrit="तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया । उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥"
          iast="tadviddhi praṇipātena paripraśnena sevayā | upadekṣyanti te jñānaṃ jñāninastattvadarśinaḥ ||"
          meaning="Know that wisdom by prostrating yourself (humility), by sincere questioning, and by service. The wise seers of truth will impart knowledge to you."
          insightLabel="The framework"
          insight="Three things: praṇipāta (bowing, humility), paripraśna (asking questions to understand, as opposed to scoring points), and sevā (service). The teachers named here are those who have seen the truth (tattva-darśinaḥ)."
          essence="Learn it by bowing, questioning and serving; those who have seen the truth will teach you."
        />

        <p>
          The verse is often cited as a model for the guru-disciple relationship. A teacher, on this reading, looks for a student who sets ego aside, asks to understand rather than to argue, and contributes to the place where they learn.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 4.37–4.38 · The Fire of Wisdom
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="fire-wisdom">Knowledge Is a Fire That Burns Karma</h2>

        <p>
          In verses 37 and 38 Krishna describes knowledge as a fire that burns.
        </p>

        {/* SHLOKA 4.37 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.37"
          speaker="Krishna"
          sanskrit="यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन । ज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा ॥"
          iast="yathaidhāṃsi samiddho'gnirbhasmasātkurute'rjuna | jñānāgniḥ sarvakarmāṇi bhasmasātkurute tathā ||"
          meaning="As a blazing fire reduces wood to ashes, O Arjuna, so the fire of knowledge reduces all karma to ashes."
          insightLabel="The claim"
          insight="The verse says all karma (sarva-karmāṇi) is burnt to ash, which goes further than reducing it. Most commentators read this as the stored karma from past actions losing its hold once the self is known."
          essence="As fire turns wood to ash, the fire of knowledge turns all karma to ash."
        />

        {/* SHLOKA 4.38 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.38"
          speaker="Krishna"
          sanskrit="न हि ज्ञानेन सदृशं पवित्रमिह विद्यते । तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥"
          iast="na hi jñānena sadṛśaṃ pavitramiha vidyate | tatsvayaṃ yogasaṃsiddhaḥ kālenātmani vindati ||"
          meaning="Nothing in this world is as purifying as wisdom. One who is perfected in yoga finds this wisdom within the self, in the course of time."
          insightLabel="The patience required"
          insight="The word kālena, &quot;in the course of time&quot;, matters. Knowledge comes to the person practising yoga over time; the verse doesn&apos;t promise it overnight."
          essence="Nothing here purifies like knowledge; one perfected in yoga finds it within in time."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 4.42 · The Final Word
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="arise">Arise: From Understanding to Action</h2>

        <p>
          Chapter 4 ends with an instruction to act:
        </p>

        {/* SHLOKA 4.42 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 4.42"
          speaker="Krishna"
          sanskrit="तस्मादज्ञानसंभूतं हृत्स्थं ज्ञानासिनाऽऽत्मनः । छित्त्वैनं संशयं योगमातिष्ठोत्तिष्ठ भारत ॥"
          iast="tasmādajñānasaṃbhūtaṃ hṛtsthaṃ jñānāsinā''tmanaḥ | chittvainaṃ saṃśayaṃ yogamātiṣṭhottiṣṭha bhārata ||"
          meaning="Therefore, with the sword of knowledge, cut asunder the doubt born of ignorance that has lodged in your heart. Take refuge in yoga, arise, O Arjuna."
          insightLabel="The pivot"
          insight="&quot;Arise&quot;, uttiṣṭha, is Krishna&apos;s last instruction in Chapter 4. It repeats his first one in 2.3. After the teaching on knowledge, he tells Arjuna to stand up and act."
          essence="Cut the doubt in your heart with the sword of knowledge, hold to yoga, and stand up."
        />

        <p>
          In the last verse (4.42) Krishna tells Arjuna to cut through his doubt with knowledge, hold to yoga, and stand up: uttiṣṭha.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 42 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr>
              <th>Verse</th>
              <th>Speaker</th>
              <th>Teaching Essence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4.1</td>
              <td>Krishna</td>
              <td>Krishna taught this lasting yoga to Vivasvan, who taught Manu, who taught Ikshvaku</td>
            </tr>
            <tr>
              <td>4.2</td>
              <td>Krishna</td>
              <td>Handed down from king to king, this yoga was lost over a long time</td>
            </tr>
            <tr>
              <td>4.3</td>
              <td>Krishna</td>
              <td>Krishna teaches this old secret to Arjuna because he is his devotee and friend</td>
            </tr>
            <tr>
              <td>4.4</td>
              <td>Arjuna</td>
              <td>Arjuna asks how Krishna, born recently, could have taught Vivasvan long ago</td>
            </tr>
            <tr>
              <td>4.5</td>
              <td>Krishna</td>
              <td>Both have had many births; Krishna remembers them all and Arjuna does not</td>
            </tr>
            <tr>
              <td>4.6</td>
              <td>Krishna</td>
              <td>Though unborn and lord of all beings, Krishna takes birth through his own maya</td>
            </tr>
            <tr>
              <td>4.7</td>
              <td>Krishna</td>
              <td>Whenever dharma declines and adharma rises, Krishna manifests himself</td>
            </tr>
            <tr>
              <td>4.8</td>
              <td>Krishna</td>
              <td>He is born age after age to protect the good, destroy the wicked and restore dharma</td>
            </tr>
            <tr>
              <td>4.9</td>
              <td>Krishna</td>
              <td>One who knows his divine birth and action escapes rebirth and comes to him</td>
            </tr>
            <tr>
              <td>4.10</td>
              <td>Krishna</td>
              <td>Many, freed of attachment, fear and anger and purified by knowledge, reached his state</td>
            </tr>
            <tr>
              <td>4.11</td>
              <td>Krishna</td>
              <td>As people approach Krishna, so he receives them; all follow his path</td>
            </tr>
            <tr>
              <td>4.12</td>
              <td>Krishna</td>
              <td>Wanting results, people worship the gods, since action brings results quickly here</td>
            </tr>
            <tr>
              <td>4.13</td>
              <td>Krishna</td>
              <td>Krishna created the four varnas by guna and karma, yet he is not the doer</td>
            </tr>
            <tr>
              <td>4.14</td>
              <td>Krishna</td>
              <td>Actions do not stain Krishna and he wants no results; one who knows this is not bound</td>
            </tr>
            <tr>
              <td>4.15</td>
              <td>Krishna</td>
              <td>Knowing this, people of old who wanted liberation acted; so act as they did</td>
            </tr>
            <tr>
              <td>4.16</td>
              <td>Krishna</td>
              <td>Even the wise are confused about what action and inaction are</td>
            </tr>
            <tr>
              <td>4.17</td>
              <td>Krishna</td>
              <td>Action, wrong action and inaction must all be understood; the way of action is hard to know</td>
            </tr>
            <tr>
              <td>4.18</td>
              <td>Krishna</td>
              <td>Whoever sees inaction in action and action in inaction is wise</td>
            </tr>
            <tr>
              <td>4.19</td>
              <td>Krishna</td>
              <td>One whose undertakings are free of desire, actions burnt in knowledge, is called wise</td>
            </tr>
            <tr>
              <td>4.20</td>
              <td>Krishna</td>
              <td>Unattached to results and always content, he does nothing even while acting</td>
            </tr>
            <tr>
              <td>4.21</td>
              <td>Krishna</td>
              <td>Without craving or possessiveness, doing only bodily action, one incurs no sin</td>
            </tr>
            <tr>
              <td>4.22</td>
              <td>Krishna</td>
              <td>Content with what comes, beyond pairs of opposites and envy, even in success and failure, he is not bound</td>
            </tr>
            <tr>
              <td>4.23</td>
              <td>Krishna</td>
              <td>For the free and unattached, mind set in knowledge, action done as sacrifice dissolves</td>
            </tr>
            <tr>
              <td>4.24</td>
              <td>Krishna</td>
              <td>The offering, the ladle, the fire and the one who offers are all Brahman</td>
            </tr>
            <tr>
              <td>4.25</td>
              <td>Krishna</td>
              <td>Some yogis offer sacrifice to the gods; others offer the self into the fire of Brahman</td>
            </tr>
            <tr>
              <td>4.26</td>
              <td>Krishna</td>
              <td>Some offer the senses into the fire of restraint; others offer sense objects into the senses</td>
            </tr>
            <tr>
              <td>4.27</td>
              <td>Krishna</td>
              <td>Some offer all actions of the senses and breath into the fire of self-control</td>
            </tr>
            <tr>
              <td>4.28</td>
              <td>Krishna</td>
              <td>Others offer wealth, austerity, yoga practice, or study and knowledge, under strict vows</td>
            </tr>
            <tr>
              <td>4.29</td>
              <td>Krishna</td>
              <td>Some offer in-breath into out-breath and out-breath into in-breath, practising pranayama</td>
            </tr>
            <tr>
              <td>4.30</td>
              <td>Krishna</td>
              <td>Others, regulating food, offer breaths into breaths; all of these know sacrifice</td>
            </tr>
            <tr>
              <td>4.31</td>
              <td>Krishna</td>
              <td>Those who eat what remains of sacrifice reach Brahman; without sacrifice even this world is lost</td>
            </tr>
            <tr>
              <td>4.32</td>
              <td>Krishna</td>
              <td>Many kinds of sacrifice are set out in the Vedas; know that all are born of action</td>
            </tr>
            <tr>
              <td>4.33</td>
              <td>Krishna</td>
              <td>The sacrifice of knowledge is greater than that of things; all action ends in knowledge</td>
            </tr>
            <tr>
              <td>4.34</td>
              <td>Krishna</td>
              <td>Learn it by bowing, questioning and serving; those who have seen the truth will teach you</td>
            </tr>
            <tr>
              <td>4.35</td>
              <td>Krishna</td>
              <td>Knowing it, you will not be deluded again and will see all beings in yourself and in Krishna</td>
            </tr>
            <tr>
              <td>4.36</td>
              <td>Krishna</td>
              <td>Even the worst sinner crosses all sin on the raft of knowledge</td>
            </tr>
            <tr>
              <td>4.37</td>
              <td>Krishna</td>
              <td>As fire turns wood to ash, the fire of knowledge turns all karma to ash</td>
            </tr>
            <tr>
              <td>4.38</td>
              <td>Krishna</td>
              <td>Nothing here purifies like knowledge; one perfected in yoga finds it within in time</td>
            </tr>
            <tr>
              <td>4.39</td>
              <td>Krishna</td>
              <td>One with faith, intent on it, senses controlled, gains knowledge and soon finds peace</td>
            </tr>
            <tr>
              <td>4.40</td>
              <td>Krishna</td>
              <td>The ignorant, faithless doubter is lost; he has neither this world nor the next</td>
            </tr>
            <tr>
              <td>4.41</td>
              <td>Krishna</td>
              <td>Actions do not bind one who renounces action through yoga and cuts doubt with knowledge</td>
            </tr>
            <tr>
              <td>4.42</td>
              <td>Krishna</td>
              <td>Cut the doubt in your heart with the sword of knowledge, hold to yoga, and stand up</td>
            </tr>
          </tbody>
        </table>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the chapter name in the title, the opening of the chapter (it begins with the lineage in 4.1), the last word of 4.42, the summaries of 4.7–8 and 4.34, the removed app plugs, and the verse summaries in the table; copy edited.</p>
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 4"} />


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
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 4 about?</div>
            <div className="faq-a">
              Chapter 4, called Jnana Karma Sanyasa Yoga, covers three major themes: Krishna's promise to return in every age to restore dharma (4.7–4.8), action without attachment, and knowledge, described as a fire that burns away all karma. It also says how to approach a teacher: with humility, questions and service (4.34).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the meaning of "yada yada hi dharmasya"?</div>
            <div className="faq-a">
              This is the opening of verse 4.7. The full verse: "Whenever there is a decline in dharma (righteousness) and an increase in adharma (unrighteousness), O Arjuna, I manifest myself." It is widely quoted and usually paired with 4.8: &quot;To protect the righteous, destroy the wicked, and re-establish dharma, I am born age after age.&quot; Together they say that Krishna returns, age after age (yuge yuge), whenever dharma needs restoring.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does the Bhagavad Gita say about how to learn?</div>
            <div className="faq-a">
              Verse 4.34 says to learn from those who have seen the truth by bowing to them, asking questions, and serving them. Those teachers, Krishna says, will then pass on the knowledge.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is "jnana yajna" in the Gita?</div>
            <div className="faq-a">
              Jnana yajna means the sacrifice (offering) of knowledge or wisdom. In verse 4.33, Krishna says it is superior to material sacrifices because all actions find their completion in wisdom. So the best offering a person can make is understanding.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How many verses are in Chapter 4 of the Bhagavad Gita?</div>
            <div className="faq-a">
              Chapter 4 has 42 verses. It is also known as Jnana Karma Sanyasa Yoga, the Yoga of Renunciation of Action through Knowledge.
            </div>
          </div>
        </div>

        {/* CHAPTER NAV */}
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-3" className="ch-nav-title">Chapter 3, Karma Yoga</a>
          </div>
          <div style={{textAlign: 'right'}}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-5" className="ch-nav-title">Chapter 5, Karma Sanyasa Yoga</a>
          </div>
        </div>

      </article>
    </div>

    {/* FOOTER */}
    <footer>
      <p>
        Wisdom © 2026. Part of a
        <a href={appStoreUrl('web_blog_footer')}
          target="_blank"
          rel="noopener"
          data-mp-location="footer"
          >free iPhone app</a
        >
        that tunes the Bhagavad Gita to your life, one verse a day.</p><p style={{ marginTop: '8px' }}><a href="/">wisdomquotes.in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:work.ankurshukla@gmail.com">Support</a>
      </p>
    </footer>
  
    

      <BlogTracker pageName="Bhagwat Geeta Chapter 4" />
    </>
  )
}
import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 5 Summary \u2013 Key Verses & Meaning (Karma Sanyasa Yoga)",
  description: "Bhagavad Gita Chapter 5 (Karma Sanyasa Yoga): 29 verses on renunciation and action, the lotus leaf (5.10), equal vision (5.18), and Krishna as friend of all beings (5.29).",
  keywords: "bhagwat geeta chapter 5, bhagavad gita karma sanyasa yoga, bhagwat geeta adhyay 5, lotus leaf gita teaching, sama-darshitvam meaning, inner peace gita, brahma nirvana gita, gita chapter 5 meaning, sanyasa vs karma yoga, equal vision Bhagavad Gita, padmapatra gita, Karma Sanyasa Yoga summary, Bhagavad Gita 5.29 suhridam sarva-bhutanam, what is renunciation in Bhagavad Gita, how to act without being touched",
  openGraph: {
    title: "Bhagavad Gita Chapter 5 Summary \u2013 Key Verses & Meaning (Karma Sanyasa Yoga)",
    description: "All 29 verses of Bhagavad Gita Chapter 5: the lotus leaf teaching, equal vision across all beings, and happiness found within (5.24).",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter5.webp", width: 1200, height: 675, alt: "A lotus leaf untouched by the water it rests on \u2014 Chapter 5 of the Bhagavad Gita, Karma Sanyasa Yoga, on acting without being stained by the action." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 5 Summary \u2013 Key Verses & Meaning (Karma Sanyasa Yoga)",
    description: "All 29 verses of Bhagavad Gita Chapter 5: the lotus leaf, equal vision, and the verse on knowing Krishna as the friend of all beings.",
    images: ["https://wisdomquotes.in/assets/chapter5.webp"],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5",
    languages: {
      'x-default': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5",
      'en': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5",
      'en-IN': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-4", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6" },
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
        content: "अध्याय ५";
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
        font-size: 11px;
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
        font-size: 11px;
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
      .section-divider-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-dimmer); white-space: nowrap; font-weight: 600; }

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
      .insights-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 16px; }
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
        font-size: 11px;
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
      .faq-header-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); font-weight: 700; margin-bottom: 6px; }
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
      .wisdom-entity-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 10px; }
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
      .related-card-label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-dimmer); font-weight: 600; margin-bottom: 6px; }
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
    "headline": "Bhagavad Gita Chapter 5: Karma Sanyasa Yoga",
    "description": "Bhagavad Gita Chapter 5 — Karma Sanyasa Yoga. All 29 verses with Sanskrit, transliteration, meaning. The lotus leaf teaching, equal vision across all beings, and 5.29.",
    "alternativeHeadline": "Bhagavad Gita Chapter 5 (Karma Sanyasa Yoga) — Summary & Verses",
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
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/chapter5.webp", "width": 1200, "height": 675 },
    "datePublished": "2026-05-05",
    "dateModified": "2026-05-24",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5" },
    "about": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" }
    ],
    "keywords": "bhagwat geeta chapter 5, bhagavad gita karma sanyasa yoga, bhagwat geeta adhyay 5, lotus leaf gita teaching, sama-darshitvam meaning, inner peace gita, brahma nirvana gita, padmapatra gita, Karma Sanyasa Yoga summary, Bhagavad Gita 5.29 suhridam sarva-bhutanam, how to act without being touched",
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
      "name": "Bhagavad Gita Chapter 5 — Karma Sanyasa Yoga",
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5"
    }
  ]
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Bhagavad Gita Chapter 5 about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 5, called Karma Sanyasa Yoga (the Yoga of Renunciation of Action), takes up the question of renunciation versus action that runs through Chapters 2, 3 and 4. Krishna says both lead to the highest good, but karma yoga, selfless action, is better (5.2). The chapter also has the teaching of equal vision (5.18) and the lotus leaf image (5.10), and it ends with 5.29, on knowing Krishna as the friend of all beings."
      }
    },
    {
      "@type": "Question",
      "name": "What is the lotus leaf teaching in the Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Found in verse 5.10. Krishna says that one who acts without attachment, offering the actions to Brahman, is not stained by sin, as a lotus leaf is not wetted by the water it sits in. The image is for living among work, family and conflict without being stained by them."
      }
    },
    {
      "@type": "Question",
      "name": "What is 'sama-darshitvam' in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sama-darshitvam means 'equal vision' or 'equal-sightedness.' In 5.18 the wise (paṇḍitāḥ) look with an equal eye on a learned brahmin, a cow, an elephant, a dog and an outcaste. They still see the differences, but those differences don't change how they regard each being."
      }
    },
    {
      "@type": "Question",
      "name": "What does Gita 5.29 mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Verse 5.29 is the closing verse of Chapter 5: 'One who knows me as the enjoyer of all sacrifices, the Lord of all worlds, and the friend of all beings—attains peace.' The key word is suhṛdam, well-wishing friend. Chapter 5 ends by saying that knowing Krishna this way brings peace."
      }
    },
    {
      "@type": "Question",
      "name": "How many verses are in Bhagavad Gita Chapter 5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 5 has 29 verses, making it one of the shorter chapters. It covers renunciation versus action, equal vision, and happiness that comes from within (5.21–24)."
      }
    }
  ]
}
]

export default function ChapterFivePage() {
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
        Bhagavad Gita Chapter 5
      </div>
    </div>

    {/* ── HERO ── */}
    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · Adhyay 5 · 29 Verses
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Bhagavad Gita Chapter 5 (Adhyay 5):<br />
          <em>Karma Sanyasa Yoga</em>
        </h1>
        <p className="article-subtitle">
          Krishna weighs renunciation against action, and describes the lotus leaf (5.10), equal vision (5.18) and the peace of knowing him as friend of all beings (5.29).
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">29 verses · Karma Sanyasa Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~12 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 5 of 18</span>
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
            src="/assets/chapter5.webp"
            alt="Krishna on action and renunciation as one path, Bhagavad Gita Chapter 5"
            width="1200"
            height="675"
            loading="eager"
          />
        </figure>

        <p className="lead">
          Chapter 5 opens with Arjuna asking the question again: should he act, or renounce action (5.1)? Krishna gives a direct answer. Both lead to the highest good, and karma yoga, selfless action, is better (5.2). The rest of the chapter describes someone who is free inside while still in the middle of things.
        </p>

        <p>
          Its 29 verses include the lotus leaf that water doesn't wet (5.10) and the sage who looks with an equal eye (sama-darśinaḥ) on a learned brahmin, a cow, an elephant, a dog and an outcaste (5.18).
        </p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#resolution">The answer: renunciation vs. action</a>
            </li>
            <li>
              <a href="#lotus-leaf">The lotus leaf: acting without being stained</a>
            </li>
            <li>
              <a href="#equal-vision">Equal vision: sama-darshitvam</a>
            </li>
            <li>
              <a href="#happiness-within">Happiness within</a>
            </li>
            <li>
              <a href="#quiet-ending">The ending: 5.29</a>
            </li>
            <li><a href="#all-verses">All 29 shlokas at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 5.2–5.3 · The Resolution
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="resolution">Both Paths Work, and One Is Better</h2>

        <p>
          By now Arjuna has heard that he should act without attachment, do his duty, offer everything to Krishna, and know the self. He has also heard teaching that sounds like renunciation. In 5.1 he asks which it is, and Krishna answers.
        </p>

        {/* SHLOKA 5.2 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 5.2"
          speaker="Krishna"
          sanskrit="संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥"
          iast="saṃnyāsaḥ karmayogaśca niḥśreyasakarāvubhau | tayostu karmasaṃnyāsātkarmayogo viśiṣyate ||"
          meaning="Both renunciation and the yoga of action lead to the highest good. But of the two, karma yoga is superior to renunciation of action."
          insightLabel="The practical answer"
          insight="This settles the either/or that has been building since Chapter 2. Both paths work, and karma yoga is called better (viśiṣyate). In 5.6 Krishna adds that renunciation is hard to reach without yoga."
          essence="Renunciation and karma yoga both lead to the highest good; karma yoga is better."
        />

        {/* SHLOKA 5.3 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 5.3"
          speaker="Krishna"
          sanskrit="ज्ञेयः स नित्यसंन्यासी यो न द्वेष्टि न काङ्क्षति । निर्द्वन्द्वो हि महाबाहो सुखं बन्धात्प्रमुच्यते ॥"
          iast="jñeyaḥ sa nityasaṃnyāsī yo na dveṣṭi na kāṅkṣati | nirdvandvo hi mahābāho sukhaṃ bandhātpramucyate ||"
          meaning="One who neither hates nor craves for anything is to be known as ever-renounced. Free from all dualities, O Arjuna, one is easily liberated from bondage."
          insightLabel="The deeper understanding"
          insight="Krishna defines the renouncer (nitya-sannyāsī) by what goes on inside: no hatred, no craving. A trader who neither craves gain nor resents loss counts as a renouncer by this test, whatever he wears."
          essence="One who neither hates nor craves is always a renouncer and is easily freed."
        />

        <p>
          So Arjuna doesn&apos;t have to leave the world; he has to let go of his grip on it. On this test a householder who acts without attachment is more of a renouncer than an ascetic who wants spiritual prestige.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 5.10 · The Lotus Leaf
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="lotus-leaf">The Lotus Leaf Metaphor: Being in Water Without Getting Wet</h2>

        <p>
          The lotus leaf sits on water and stays dry. Krishna uses it for a person who takes full part in life without being stained by it.
        </p>

        {/* SHLOKA 5.10 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 5.10"
          speaker="Krishna"
          sanskrit="ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः । लिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥"
          iast="brahmaṇyādhāya karmāṇi saṅgaṃ tyaktvā karoti yaḥ | lipyate na sa pāpena padmapatramivāmbhasā ||"
          meaning="One who acts, offering all actions to Brahman and abandoning attachment, is untouched by sin, like a lotus leaf untouched by water."
          insightLabel="The teaching within the metaphor"
          insight="The condition is in the first half of the verse: brahmaṇy ādhāya karmāṇi, placing the actions in Brahman, and saṅgaṃ tyaktvā, giving up attachment. With those two in place, work, family and conflict don&apos;t stick."
          essence="Offering actions to Brahman without attachment, one is untouched by sin, like a lotus leaf by water."
        />

        <div className="pull-quote">
          <blockquote>
            "He is not stained by sin, as a lotus leaf is not wetted by water."
          </blockquote>
          <cite>Bhagavad Gita 5.10</cite>
        </div>

        <p>
          Arjuna is still asked to act. He does the work and offers it to Brahman (brahmaṇy ādhāya, 5.10), and what follows from it doesn't stick to him, the way water runs off a lotus leaf.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 5.18 · Equal Vision
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="equal-vision">Equal Vision</h2>

        <p>
          In the middle of Chapter 5 comes a verse about how the wise regard others.
        </p>

        {/* SHLOKA 5.18 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 5.18"
          speaker="Krishna"
          sanskrit="विद्याविनयसंपन्ने ब्राह्मणे गवि हस्तिनि । शुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥"
          iast="vidyāvinayasaṃpanne brāhmaṇe gavi hastini | śuni caiva śvapāke ca paṇḍitāḥ samadarśinaḥ ||"
          meaning="The wise see with equal vision a learned and humble brahmin, a cow, an elephant, a dog, and even a dog-eater."
          insightLabel="What equal vision means"
          insight="Equal vision (sama-darśinaḥ) still sees difference. The wise person&apos;s regard for a being doesn&apos;t change with its status, species or looks. The list runs from a learned brahmin to the śvapāka, the dog-eater, an outcaste at the bottom of the social order of the time."
          essence="The wise look equally on a learned brahmin, a cow, an elephant, a dog and an outcaste."
        />

        <div className="highlight-box">
          <p>
            <strong>A note on social difference:</strong> The verse doesn&apos;t deny social difference, but it says social difference doesn&apos;t decide spiritual worth. In 5.19 Krishna adds that Brahman is flawless and even (nirdoṣaṃ hi samaṃ brahma).
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 5.24 · Happiness Within
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="happiness-within">The Source of Peace Is Internal</h2>

        <p>
          Verses 5.21–24 come back to one point: lasting happiness comes from within, and pleasures born of contact with objects end in pain (5.22).
        </p>

        {/* SHLOKA 5.24 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 5.24"
          speaker="Krishna"
          sanskrit="योऽन्तःसुखोऽन्तरारामस्तथान्तर्ज्योतिरेव यः । स योगी ब्रह्मनिर्वाणं ब्रह्मभूतोऽधिगच्छति ॥"
          iast="yo'ntaḥsukho'ntarārāmastathāntarjyotireva yaḥ | sa yogī brahmanirvāṇaṃ brahmabhūto'dhigacchati ||"
          meaning="One who finds happiness within, who is pleased within, who is illuminated within, that yogi attains Brahman-nirvana and becomes Brahman."
          insightLabel="The direction of attention"
          insight="Three &quot;within&quot; words in one verse: antaḥ-sukhaḥ (happiness within), antar-ārāmaḥ (delight within), antar-jyotiḥ (light within). Such a yogi, Krishna says, becomes Brahman."
          essence="One whose happiness, delight and light are within becomes Brahman and reaches brahma-nirvana."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 5.29 · The Final Word
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="quiet-ending">Knowing Krishna as Friend</h2>

        <p>
          Chapter 5 ends with a statement about Krishna himself: whoever knows him as the friend of all beings attains peace.
        </p>

        {/* SHLOKA 5.29 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 5.29"
          speaker="Krishna"
          sanskrit="भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् । सुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति ॥"
          iast="bhoktāraṃ yajñatapasāṃ sarvalokamaheśvaram | suhṛdaṃ sarvabhūtānāṃ jñātvā māṃ śāntimṛcchati ||"
          meaning="Having known me as the enjoyer of all sacrifices and austerities, the great Lord of all the worlds, and the sincere friend of all living beings, one attains peace."
          insightLabel="The key word"
          insight="The key word is suhṛdam, a well-wishing friend. The same Krishna who receives all sacrifices and rules all worlds is described as the friend of every being, and knowing (jñātvā) him this way brings peace (śāntim)."
          essence="Knowing Krishna as enjoyer of sacrifices, lord of all worlds and friend of all beings, one finds peace."
        />

        <p>
          Chapter 5 ends with a promise. In 5.29 Krishna calls himself suhṛdaṃ sarva-bhūtānām, the friend of every being, and says that whoever knows him this way finds peace.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 29 Verses At a Glance
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
              <td>5.1</td>
              <td>Arjuna</td>
              <td>Arjuna says Krishna praises both renouncing action and yoga, and asks which is better</td>
            </tr>
            <tr>
              <td>5.2</td>
              <td>Krishna</td>
              <td>Renunciation and karma yoga both lead to the highest good; karma yoga is better</td>
            </tr>
            <tr>
              <td>5.3</td>
              <td>Krishna</td>
              <td>One who neither hates nor craves is always a renouncer and is easily freed</td>
            </tr>
            <tr>
              <td>5.4</td>
              <td>Krishna</td>
              <td>Only the unwise say Sankhya and yoga differ; either, done fully, gives the fruit of both</td>
            </tr>
            <tr>
              <td>5.5</td>
              <td>Krishna</td>
              <td>The state reached by Sankhya is reached by yoga too; who sees them as one sees truly</td>
            </tr>
            <tr>
              <td>5.6</td>
              <td>Krishna</td>
              <td>Renunciation is hard to reach without yoga; the sage trained in yoga soon reaches Brahman</td>
            </tr>
            <tr>
              <td>5.7</td>
              <td>Krishna</td>
              <td>One trained in yoga, pure and self-controlled, who sees his self in all, is not stained by acting</td>
            </tr>
            <tr>
              <td>5.8</td>
              <td>Krishna</td>
              <td>The knower of truth thinks &quot;I do nothing&quot; while seeing, hearing, eating or breathing</td>
            </tr>
            <tr>
              <td>5.9</td>
              <td>Krishna</td>
              <td>Even while speaking or grasping, he knows the senses are moving among their objects</td>
            </tr>
            <tr>
              <td>5.10</td>
              <td>Krishna</td>
              <td>Offering actions to Brahman without attachment, one is untouched by sin, like a lotus leaf by water</td>
            </tr>
            <tr>
              <td>5.11</td>
              <td>Krishna</td>
              <td>Yogis act with body, mind, intellect and senses alone, without attachment, to purify themselves</td>
            </tr>
            <tr>
              <td>5.12</td>
              <td>Krishna</td>
              <td>Giving up the fruits, the yogi finds lasting peace; one driven by desire is bound</td>
            </tr>
            <tr>
              <td>5.13</td>
              <td>Krishna</td>
              <td>Renouncing all actions in the mind, the self-controlled dwells at ease in the city of nine gates</td>
            </tr>
            <tr>
              <td>5.14</td>
              <td>Krishna</td>
              <td>The Lord does not create doership, actions or their link to fruits; nature does this</td>
            </tr>
            <tr>
              <td>5.15</td>
              <td>Krishna</td>
              <td>The Lord takes on neither the sin nor the merit of anyone; ignorance covers knowledge</td>
            </tr>
            <tr>
              <td>5.16</td>
              <td>Krishna</td>
              <td>For those whose ignorance is destroyed by knowledge, it lights up the Supreme like the sun</td>
            </tr>
            <tr>
              <td>5.17</td>
              <td>Krishna</td>
              <td>Minds fixed on That, their faults washed off by knowledge, they are not born again</td>
            </tr>
            <tr>
              <td>5.18</td>
              <td>Krishna</td>
              <td>The wise look equally on a learned brahmin, a cow, an elephant, a dog and an outcaste</td>
            </tr>
            <tr>
              <td>5.19</td>
              <td>Krishna</td>
              <td>Those whose minds rest in equality have conquered rebirth here; Brahman is flawless and even</td>
            </tr>
            <tr>
              <td>5.20</td>
              <td>Krishna</td>
              <td>Not elated by the pleasant nor upset by the unpleasant, steady and clear, one rests in Brahman</td>
            </tr>
            <tr>
              <td>5.21</td>
              <td>Krishna</td>
              <td>Unattached to outer contacts, one finds happiness in the self, and lasting joy in Brahman</td>
            </tr>
            <tr>
              <td>5.22</td>
              <td>Krishna</td>
              <td>Pleasures born of contact are sources of pain, with a beginning and an end; the wise avoid them</td>
            </tr>
            <tr>
              <td>5.23</td>
              <td>Krishna</td>
              <td>One who can withstand the push of desire and anger before death is a yogi and is happy</td>
            </tr>
            <tr>
              <td>5.24</td>
              <td>Krishna</td>
              <td>One whose happiness, delight and light are within becomes Brahman and reaches brahma-nirvana</td>
            </tr>
            <tr>
              <td>5.25</td>
              <td>Krishna</td>
              <td>Sages free of sin and doubt, devoted to the good of all beings, reach brahma-nirvana</td>
            </tr>
            <tr>
              <td>5.26</td>
              <td>Krishna</td>
              <td>For ascetics free of desire and anger, with minds controlled, brahma-nirvana is near</td>
            </tr>
            <tr>
              <td>5.27</td>
              <td>Krishna</td>
              <td>Shut out outer contacts, fix the gaze between the brows, even out the breath</td>
            </tr>
            <tr>
              <td>5.28</td>
              <td>Krishna</td>
              <td>With senses, mind and intellect controlled, free of desire, fear and anger, such a sage is free</td>
            </tr>
            <tr>
              <td>5.29</td>
              <td>Krishna</td>
              <td>Knowing Krishna as enjoyer of sacrifices, lord of all worlds and friend of all beings, one finds peace</td>
            </tr>
          </tbody>
        </table>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the reading of 5.2 (it says karma yoga is better, without &quot;for most people&quot;), the 5.10 pull quote, the removed app plugs, and the verse summaries in the table; copy edited.</p>
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 5"} />


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
            <div className="faq-q">What is Bhagavad Gita Chapter 5 about?</div>
            <div className="faq-a">
              Chapter 5, called Karma Sanyasa Yoga (the Yoga of Renunciation of Action), takes up the question of renunciation versus action that runs through Chapters 2, 3 and 4. Krishna says both lead to the highest good, but karma yoga, selfless action, is better (5.2). The chapter also has the teaching of equal vision (5.18) and the lotus leaf image (5.10), and it ends with 5.29, on knowing Krishna as the friend of all beings.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the lotus leaf teaching in the Gita?</div>
            <div className="faq-a">
              Found in verse 5.10. Krishna says that one who acts without attachment, offering the actions to Brahman, is not stained by sin, as a lotus leaf is not wetted by the water it sits in. The image is for living among work, family and conflict without being stained by them.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is "sama-darshitvam" in the Bhagavad Gita?</div>
            <div className="faq-a">
              Sama-darshitvam means "equal vision" or "equal-sightedness." In 5.18 the wise (paṇḍitāḥ) look with an equal eye on a learned brahmin, a cow, an elephant, a dog and an outcaste. They still see the differences, but those differences don&apos;t change how they regard each being.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Gita 5.29 mean?</div>
            <div className="faq-a">
              Verse 5.29 is the closing verse of Chapter 5: "One who knows me as the enjoyer of all sacrifices, the Lord of all worlds, and the friend of all beings, attains peace." The key word is suhṛdam, well-wishing friend. Chapter 5 ends by saying that knowing Krishna this way brings peace.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How many verses are in Bhagavad Gita Chapter 5?</div>
            <div className="faq-a">
              Chapter 5 has 29 verses, making it one of the shorter chapters. It covers renunciation versus action, equal vision, and happiness that comes from within (5.21–24).
            </div>
          </div>
        </div>

        {/* CHAPTER NAV */}
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-4" className="ch-nav-title">Chapter 4, Jnana Karma Sanyasa Yoga</a>
          </div>
          <div style={{textAlign: 'right'}}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-6" className="ch-nav-title">Chapter 6, Dhyana Yoga</a>
          </div>
        </div>

      </article>
    </div>

    {/* FOOTER */}
    <SiteFooter />
  
    

      <BlogTracker pageName="Bhagwat Geeta Chapter 5" />
    </>
  )
}
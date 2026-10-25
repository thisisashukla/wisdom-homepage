import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 2 Summary \u2013 Key Verses & Meaning (Sankhya Yoga)",
  description: "Bhagavad Gita Chapter 2 (Sankhya Yoga) \u2014 72 verses on the eternal atman, action without attachment, the famous 2.47, and the steady mind of the sthitaprajna.",
  keywords: "bhagwat geeta chapter 2, bhagavad gita chapter 2 sankhya yoga, bhagavad gita 2.47, karma without attachment gita, bhagwat geeta adhyay 2, sthitaprajna meaning, nayam hanti na hanyate, karmanyevadhikaras te meaning, eternal atman gita, atman bhagavad gita, nishkama karma, Sankhya Yoga summary, Bhagavad Gita 2.47 meaning, sthitaprajna lakshana, the cascade from attachment to ruin",
  openGraph: {
    title: "Bhagavad Gita Chapter 2 Summary \u2013 Key Verses & Meaning (Sankhya Yoga)",
    description: "Chapter 2's 72 verses: Krishna's teaching on the atman, on action without attachment (2.47), and his portrait of the person of steady wisdom.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter2.webp", width: 1200, height: 675, alt: "Krishna lifting Arjuna out of grief on the chariot \u2014 Chapter 2 of the Bhagavad Gita, Sankhya Yoga, gives the philosophical heart of the text: the eternal atman, the science of action, and the steady mind." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 2 Summary \u2013 Key Verses & Meaning (Sankhya Yoga)",
    description: "All 72 verses of Bhagavad Gita Chapter 2: the eternal atman, action without attachment, and the person of steady wisdom.",
    images: ["https://wisdomquotes.in/assets/chapter2.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3" },
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
        content: "अध्याय २";
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
    "headline": "Bhagavad Gita Chapter 2: Sankhya Yoga",
    "description": "Bhagavad Gita Chapter 2 — Sankhya Yoga. All 72 verses with Sanskrit, transliteration, meaning. The eternal atman, action without attachment, and the portrait of the sthitaprajna.",
    "alternativeHeadline": "Bhagavad Gita Chapter 2 (Sankhya Yoga) — Summary & Verses",
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
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/chapter2.webp", "width": 1200, "height": 675 },
    "datePublished": "2026-05-05",
    "dateModified": "2026-05-24",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2" },
    "about": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" }
    ],
    "keywords": "bhagwat geeta chapter 2, bhagavad gita chapter 2 sankhya yoga, bhagavad gita 2.47, karma without attachment gita, bhagwat geeta adhyay 2, sthitaprajna meaning, nayam hanti na hanyate, karmanyevadhikaras te meaning, eternal atman gita, nishkama karma, Sankhya Yoga summary, the cascade from attachment to ruin",
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
      "name": "Bhagavad Gita Chapter 2 — Sankhya Yoga",
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2"
    }
  ]
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Bhagavad Gita Chapter 2 about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 2, called Sankhya Yoga or the Yoga of Knowledge, contains Krishna's first teachings to Arjuna: on the eternal atman, the dharma of a warrior, action without attachment to results, and the sthitaprajna, the person of steady wisdom. With 72 verses it is the longest chapter in the Gita's first half."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best-known verse in Chapter 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best known is 2.47, 'karmany evadhikaras te ma phaleshu kadachana' — often translated as 'you have a right to work, not to the fruits of work.' But 2.20 (the atman is unborn and eternal) and 2.56 (the description of the sthitaprajna) are equally central to the chapter's argument."
      }
    },
    {
      "@type": "Question",
      "name": "What is 'sthitaprajna' in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sthitaprajna literally means 'one of steady wisdom' — sthita means steady or stable, prajna means wisdom or intelligence. Arjuna asks Krishna in verse 2.54 what such a person looks like from the outside. Krishna answers across verses 2.55–2.72: they are not disturbed by sorrow, not elated by pleasure, free from attachment, fear, and anger, and their senses are under control like a tortoise withdrawing its limbs."
      }
    },
    {
      "@type": "Question",
      "name": "What does Bhagavad Gita 2.47 mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2.47 says: you have the right to act, but not to claim the fruits of your actions; do not let the fruits be your motive; and do not fall into the trap of inaction either. Most people quote only the first half. The fourth clause, about inaction, rules out reading the verse as permission to do nothing: Krishna wants action done with an even mind."
      }
    },
    {
      "@type": "Question",
      "name": "How many verses are in Bhagavad Gita Chapter 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 2 has 72 verses; only Chapter 18, with 78, is longer. It sets out the teachings on the atman, duty, action and wisdom that later chapters return to."
      }
    },
    {
      "@type": "Question",
      "name": "What is Sankhya Yoga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sankhya Yoga means the yoga of knowledge or the yoga of discriminative understanding. Sankhya refers to an ancient philosophical system that distinguishes between the eternal self (purusha) and material nature (prakriti). In Chapter 2, Krishna uses this framework to help Arjuna see that his grief is based on identifying with the temporary rather than the eternal."
      }
    }
  ]
}
]

export default function ChapterTwoPage() {
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
        Bhagavad Gita Chapter 2
      </div>
    </div>

    {/* ── HERO ── */}
    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · Adhyay 2 · 72 Verses
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Bhagavad Gita Chapter 2 (Adhyay 2):<br />
          <em>Sankhya Yoga</em>
        </h1>
        <p className="article-subtitle">
          A close reading of the 72 verses: Krishna on the atman, on action without attachment, and on the person of steady wisdom.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">72 verses · Sankhya Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~18 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 2 of 18</span>
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
            src="/assets/chapter2.webp"
            alt="Krishna teaching the eternal nature of the self, Bhagavad Gita Chapter 2"
            width="1200"
            height="675"
            loading="eager"
          />
        </figure>

        <p className="lead">
          Chapter 1 ends with Arjuna putting down his bow and sinking into his chariot (1.47). Early in Chapter 2 he refuses to fight (2.9). The rest of the chapter is Krishna&apos;s answer, covering death, the self, action and what a steady mind looks like.
        </p>

        <p>
          Krishna&apos;s first words to him are a rebuke (2.2–3).
        </p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#krishna-diagnosis">Krishna&apos;s diagnosis: what Arjuna got wrong (2.1–2.11)</a>
            </li>
            <li>
              <a href="#eternal-atman">The teaching on the eternal atman (2.12–2.30)</a>
            </li>
            <li>
              <a href="#dharma-argument">Why Arjuna must fight: the dharma argument (2.31–2.38)</a>
            </li>
            <li>
              <a href="#most-quoted">The verse everyone quotes: 2.47</a>
            </li>
            <li>
              <a href="#avoiding-duty">What avoiding your duty costs you</a>
            </li>
            <li>
              <a href="#cascade">From thought to ruin: the cascade (2.62–2.63)</a>
            </li>
            <li>
              <a href="#sthitaprajna">The portrait of a sthitaprajna (2.54–2.72)</a>
            </li>
            <li>
              <a href="#all-verses">All 72 shlokas at a glance</a>
            </li>
            <li>
              <a href="#faq">Frequently asked questions</a>
            </li>
          </ol>
        </nav>

        {/* SECTION 1: KRISHNA'S DIAGNOSIS */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.1–2.11 · The Diagnosis</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="krishna-diagnosis">Krishna's First Words: You Are Wrong</h2>

        <p>
          His teaching begins with verse 2.11.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.11"
          speaker="Krishna"
          sanskrit="श्री भगवानुवाच अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे । गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥"
          iast="śrī bhagavānuvāca aśocyānanvaśocastvaṃ prajñāvādāṃśca bhāṣase | gatāsūnagatāsūṃśca nānuśocanti paṇḍitāḥ ||"
          essence="You grieve for those who need no grief; the wise mourn neither dead nor living."
        />

        <p>
          Krishna doesn&apos;t offer sympathy here. He points out that Arjuna&apos;s words and his grief don&apos;t match: Arjuna talks like a wise man while grieving over what the wise don&apos;t grieve over.
        </p>

        {/* SECTION 2: ETERNAL SOUL */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.12–2.30 · The Eternal Atman</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="eternal-atman">The Foundation: What Cannot Die</h2>

        <p>
          Before any practical instruction, Krishna sets out what Arjuna is. The later teaching on action depends on this account of the self.
        </p>

        <p>
          The central verse of this section is 2.20.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.20"
          speaker="Krishna"
          sanskrit="न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥"
          iast="na jāyate mriyate vā kadācinnāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||"
          essence="The self is never born and never dies; it is not killed when the body is."
        />

        <p>
          If the atman is unborn and eternal, then birth and death happen to the body, and Krishna compares them to changing clothes.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.22"
          speaker="Krishna"
          sanskrit="वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि । तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥"
          iast="vāsāṃsi jīrṇāni yathā vihāya navāni gṛhṇāti naro'parāṇi | tathā śarīrāṇi vihāya jīrṇānyanyāni saṃyāti navāni dehī ||"
          meaning="Just as a person puts on new garments, giving up old ones, similarly, the atman accepts new material bodies, giving up the old and useless ones."
          insightLabel="The metaphor"
          insight="Nobody mourns an old shirt when they put on a new one, because the shirt was never them. Krishna asks Arjuna to think about what exactly he is grieving."
          essence="As we change worn-out clothes, the self leaves old bodies for new ones."
        />

        <p>
          Before these two verses, in 2.14, Krishna gives a practical instruction: pleasure and pain, heat and cold come and go, so endure them.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.14"
          speaker="Krishna"
          sanskrit="मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः । आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥"
          iast="mātrāsparśāstu kaunteya śītoṣṇasukhaduḥkhadāḥ | āgamāpāyino'nityāstāṃstitikṣasva bhārata ||"
          meaning="O Arjuna, the contacts of the senses with objects bring cold and heat, pleasure and pain. They come and go, they are impermanent. Endure them, O descendant of Bharata."
          insightLabel="The practice"
          insight="The practice is to watch what comes and goes without clinging to pleasure or shrinking from pain. In 2.15 Krishna says the person who stays even through both is fit for immortality."
          essence="Heat and cold, pleasure and pain come and go; endure them."
        />

        {/* SECTION 3: DHARMA ARGUMENT */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.31–2.38 · Dharma</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="dharma-argument">The Dharma Argument: Why Arjuna Must Act</h2>

        <p>
          Krishna now turns from the self to duty. His argument is specific: for Arjuna, in this war, refusing to fight is the wrong choice (2.31–33).
        </p>

        <div className="highlight-box">
          <p>
            <strong>Understanding dharma in the Gita:</strong> Here dharma means the duty that comes from who you are, your role, and what the moment asks. Arjuna is a kshatriya, trained as a warrior, with a just claim, facing an opponent who has refused every settlement. For him, here, the dharma is to fight. Krishna is telling Arjuna what his duty is in this war, and he is not saying everyone should always fight.
          </p>
        </div>

        {/* SECTION 4: THE MOST QUOTED VERSE */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verse 2.47–2.48 · Action Without Attachment</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="most-quoted">The Verse Everyone Quotes</h2>

        <p>
          2.47 is one of the Gita&apos;s best-known verses, usually quoted as a teaching on detachment. People tend to quote only the first half, but the verse has four parts.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          speaker="Krishna"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaning="You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty."
          insightLabel="The four parts"
          insight="This verse is often reduced to &quot;do your duty but don't claim the results.&quot; It has four parts: (1) your right is to the action; (2) never to its fruits; (3) don't make the fruit your motive; (4) don't cling to inaction. The fourth part is often left out, and it rules out doing nothing."
          essence="Your right is to the work, never to its results; do not cling to inaction."
        />

        <p>
          So you have a claim on the action and none on the outcome. Do the work with full effort; the results are outside your control. Using detachment as an excuse to do nothing is the opposite mistake, and the verse rules it out.
        </p>

        <p>
          The very next verse clarifies what this looks like in practice.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.48"
          speaker="Krishna"
          sanskrit="योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय । सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥"
          iast="yogasthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya | siddhyasiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate ||"
          meaning="Perform your duties established in yoga, abandoning attachment. Be even-minded in success and failure, for equanimity is called yoga."
          insightLabel="What yoga means"
          insight="Right after 2.47, Krishna defines yoga as evenness of mind in success and failure (samatvaṃ yoga ucyate). He means staying clear and able to act whichever way things go."
          essence="Act steady in yoga, the same in success and failure; that evenness is yoga."
        />

        {/* SECTION 5: AVOIDING YOUR DUTY */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">The Cost of Avoiding Your Responsibility</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="avoiding-duty">What Avoiding Your Duty Costs You</h2>

        <p>
          In Chapter 1 Arjuna gave serious reasons not to fight: killing kin would be a sin (1.36), destroying families would bring chaos (1.40–43), and it would be better to be killed unarmed (1.46). Krishna takes the worry seriously and shows where the reasoning fails.
        </p>

        <p>
          Krishna&apos;s point is that the wish to step back from a duty can pass itself off as moral sensitivity. He calls Arjuna&apos;s state weakness of heart (2.3), and Chapters 2 and 3 take apart his reasons one by one.
        </p>

        <p>
          Modern readings often keep only the general advice: don't be attached, don&apos;t grasp at outcomes. The chapter is just as much about a particular duty that comes from who you are, and about the cost of walking away from it (2.33–36).
        </p>

        {/* SECTION 6: CASCADE */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.62–2.63 · The Cascade of Downfall</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="cascade">From Thought to Ruin: The Cascade</h2>

        <p>
          Toward the end of Chapter 2, Krishna describes how a mind falls apart, step by step. Laying it out as a chain shows where it can be broken.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.62"
          speaker="Krishna"
          sanskrit="ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात् संजायते कामः कामात्क्रोधोऽभिजायते ॥"
          iast="dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate | saṅgāt saṃjāyate kāmaḥ kāmātkrodho'bhijāyate ||"
          meaning="From thinking about sense objects, attachment develops; from attachment, desire is born; from desire, anger arises."
          insightLabel="The first link"
          insight="The chain starts with thought (dhyāyataḥ, dwelling on). Attachment grows from repeatedly thinking about the object. If the dwelling stops, the rest of the chain doesn&apos;t start."
          essence="Dwelling on objects breeds attachment, then desire, and from desire comes anger."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 2.63"
          speaker="Krishna"
          sanskrit="क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः । स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥"
          iast="krodhādbhavati saṃmohaḥ saṃmohātsmṛtivibhramaḥ | smṛtibhraṃśād buddhināśo buddhināśātpraṇaśyati ||"
          meaning="From anger comes delusion; from delusion, loss of memory; from loss of memory, the destruction of intelligence; from the destruction of intelligence, one perishes."
          insightLabel="The full cascade"
          insight="Anger brings confusion, and confusion makes you forget what you knew. Then judgment (buddhi) goes, and with it the person. Each step follows from the one before, and breaking the chain at any point stops it."
          essence="Anger brings delusion, then lost memory, lost judgment, and ruin."
        />

        <p>
          The full sequence: dwelling on something → attachment → desire → anger (when the desire is blocked) → confusion → loss of memory → loss of judgment → ruin. The easiest place to break it is the first link, what you let your mind dwell on.
        </p>

        {/* SECTION 7: STHITAPRAJNA */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.54–2.72 · The Portrait of Steady Wisdom</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="sthitaprajna">The Portrait of a Sthitaprajna</h2>

        <p>
          The chapter closes with Arjuna asking a plain question.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.54"
          speaker="Arjuna"
          sanskrit="स्थितप्रज्ञस्य का भाषा समाधिस्थस्य केशव । स्थितधीः किं प्रभाषेत किमासीत व्रजेत किम् ॥"
          iast="sthitaprajñasya kā bhāṣā samādhisthasya keśava | sthitadhīḥ kiṃ prabhāṣeta kimāsīta vrajeta kim ||"
          meaning="O Krishna, what is the description of one whose wisdom is steady, one established in deep absorption? How does such a person speak, how does such a person sit, how does such a person walk?"
          insightLabel="The sincere question"
          insight="Arjuna asks what wisdom looks like from the outside: how such a person talks, sits and walks. He wants something he can recognise, in others and in himself."
          essence="Arjuna asks how a person of steady wisdom speaks, sits and walks."
        />

        <p>
          Krishna answers across verses 2.55 to 2.72, describing a person who stays clear and able to act in the middle of things.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.55"
          speaker="Krishna"
          sanskrit="प्रजहाति यदा कामान् सर्वान् पार्थ मनोगतान् । आत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥"
          iast="prajahāti yadā kāmān sarvān pārtha manogatān | ātmanyevātmanā tuṣṭaḥ sthitaprajñastadocyate ||"
          meaning="One is called a person of steady wisdom when they abandon all desires of the mind, O Arjuna, and remain satisfied in the self alone by the self."
          insightLabel="Freedom from desire"
          insight="The key phrase is &quot;satisfied in the self alone by the self&quot; (ātmany evātmanā tuṣṭaḥ). Such a person&apos;s contentment doesn&apos;t depend on getting things from the world."
          essence="One who gives up all desires and is content in the self has steady wisdom."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 2.56"
          speaker="Krishna"
          sanskrit="दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः । वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥"
          iast="duḥkheṣvanudvignamanāḥ sukheṣu vigataspṛhaḥ | vītarāgabhayakrodhaḥ sthitadhīrmunirucyate ||"
          meaning="One whose mind is not disturbed even in the threefold miseries, who is not elated when there is happiness, and who is free from attachment, fear and anger, is called a sage of steady mind."
          insightLabel="The three freedoms"
          insight="Three marks: undisturbed in suffering, not craving pleasure, and free of attachment, fear and anger. Such a person still feels what happens without being pulled around by it."
          essence="Undisturbed in sorrow, not craving pleasure, free of attachment, fear and anger."
        />

        <p>
          He gives this description to a warrior who still has to fight, so it fits someone in the middle of things whose steadiness no longer depends on what happens outside.
        </p>

        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the 2.10 speaker (Sanjaya), the gloss of 2.11, the chapter-length claim, and the verse summaries in the table; copy edited.</p>
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 2"} />


        {/* CHAPTER NAV */}
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">← Previous Chapter</div>
            <a href="/blogs/bhagwat-geeta-chapter-1" className="ch-nav-title">Chapter 1 · Arjuna Vishada Yoga</a>
          </div>
          <div style={{textAlign: 'right'}}>
            <div className="ch-nav-label">Next Chapter →</div>
            <a href="/blogs/bhagwat-geeta-chapter-3" className="ch-nav-title">Chapter 3 · Karma Yoga</a>
          </div>
        </div>

        {/* SECTION 8: ALL VERSES TABLE */}
        <h2 id="all-verses">All 72 Shlokas at a Glance</h2>

        <table className="verse-table">
          <thead>
            <tr>
              <th>Verse</th>
              <th>Speaker</th>
              <th>Essence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2.1</td>
              <td>Sanjaya</td>
              <td>Sanjaya describes Arjuna, eyes full of tears, as Krishna begins to speak</td>
            </tr>
            <tr>
              <td>2.2</td>
              <td>Krishna</td>
              <td>Krishna asks where this weakness has come from at such a moment</td>
            </tr>
            <tr>
              <td>2.3</td>
              <td>Krishna</td>
              <td>Krishna tells Arjuna not to give in to faint-heartedness and to stand up</td>
            </tr>
            <tr>
              <td>2.4</td>
              <td>Arjuna</td>
              <td>Arjuna asks how he can shoot arrows at Bhishma and Drona</td>
            </tr>
            <tr>
              <td>2.5</td>
              <td>Arjuna</td>
              <td>Arjuna says living on alms is better than killing his teachers</td>
            </tr>
            <tr>
              <td>2.6</td>
              <td>Arjuna</td>
              <td>Arjuna does not know whether winning or losing this war would be worse</td>
            </tr>
            <tr>
              <td>2.7</td>
              <td>Arjuna</td>
              <td>Confused about his dharma, Arjuna asks Krishna to teach him as a disciple</td>
            </tr>
            <tr>
              <td>2.8</td>
              <td>Arjuna</td>
              <td>Arjuna says no kingdom, even one over the gods, would end his grief</td>
            </tr>
            <tr>
              <td>2.9</td>
              <td>Sanjaya</td>
              <td>Arjuna tells Krishna he refuses to fight, then falls silent</td>
            </tr>
            <tr>
              <td>2.10</td>
              <td>Sanjaya</td>
              <td>Krishna, smiling, speaks to the grieving Arjuna between the two armies</td>
            </tr>
            <tr>
              <td>2.11</td>
              <td>Krishna</td>
              <td>You grieve for those who need no grief; the wise mourn neither dead nor living</td>
            </tr>
            <tr>
              <td>2.12</td>
              <td>Krishna</td>
              <td>There was never a time when you, I or these kings did not exist</td>
            </tr>
            <tr>
              <td>2.13</td>
              <td>Krishna</td>
              <td>As the self passes through childhood, youth and age, it passes to another body</td>
            </tr>
            <tr>
              <td>2.14</td>
              <td>Krishna</td>
              <td>Heat and cold, pleasure and pain come and go; endure them</td>
            </tr>
            <tr>
              <td>2.15</td>
              <td>Krishna</td>
              <td>One unshaken by pain and pleasure alike is fit for immortality</td>
            </tr>
            <tr>
              <td>2.16</td>
              <td>Krishna</td>
              <td>The unreal has no being, and the real never ceases to be</td>
            </tr>
            <tr>
              <td>2.17</td>
              <td>Krishna</td>
              <td>What pervades all this is indestructible; no one can destroy it</td>
            </tr>
            <tr>
              <td>2.18</td>
              <td>Krishna</td>
              <td>Bodies come to an end, but the embodied self is eternal, so fight</td>
            </tr>
            <tr>
              <td>2.19</td>
              <td>Krishna</td>
              <td>The self neither kills nor is killed</td>
            </tr>
            <tr>
              <td>2.20</td>
              <td>Krishna</td>
              <td>The self is never born and never dies; it is not killed when the body is</td>
            </tr>
            <tr>
              <td>2.21</td>
              <td>Krishna</td>
              <td>How can one who knows the self is indestructible kill anyone?</td>
            </tr>
            <tr>
              <td>2.22</td>
              <td>Krishna</td>
              <td>As we change worn-out clothes, the self leaves old bodies for new ones</td>
            </tr>
            <tr>
              <td>2.23</td>
              <td>Krishna</td>
              <td>Weapons do not cut the self, fire does not burn it, water does not wet it</td>
            </tr>
            <tr>
              <td>2.24</td>
              <td>Krishna</td>
              <td>The self cannot be cut, burnt, wetted or dried; it is eternal and unmoving</td>
            </tr>
            <tr>
              <td>2.25</td>
              <td>Krishna</td>
              <td>The self is unmanifest and unchanging; knowing this, do not grieve</td>
            </tr>
            <tr>
              <td>2.26</td>
              <td>Krishna</td>
              <td>Even if the self were born and died again and again, you should not grieve</td>
            </tr>
            <tr>
              <td>2.27</td>
              <td>Krishna</td>
              <td>Death is certain for the born and birth for the dead; do not grieve</td>
            </tr>
            <tr>
              <td>2.28</td>
              <td>Krishna</td>
              <td>Beings are unseen before birth and after death, seen only in between</td>
            </tr>
            <tr>
              <td>2.29</td>
              <td>Krishna</td>
              <td>Some see, speak or hear of the self as a wonder, yet none know it</td>
            </tr>
            <tr>
              <td>2.30</td>
              <td>Krishna</td>
              <td>The self in every body can never be killed; grieve for no being</td>
            </tr>
            <tr>
              <td>2.31</td>
              <td>Krishna</td>
              <td>Looking at your own dharma, do not waver; a righteous war suits a kshatriya</td>
            </tr>
            <tr>
              <td>2.32</td>
              <td>Krishna</td>
              <td>A war like this, come unsought, is an open door to heaven for a warrior</td>
            </tr>
            <tr>
              <td>2.33</td>
              <td>Krishna</td>
              <td>Refusing this righteous war means losing your dharma and honour, and incurring sin</td>
            </tr>
            <tr>
              <td>2.34</td>
              <td>Krishna</td>
              <td>People will speak of your disgrace, and for the honoured that is worse than death</td>
            </tr>
            <tr>
              <td>2.35</td>
              <td>Krishna</td>
              <td>The great warriors will think you fled the battle out of fear</td>
            </tr>
            <tr>
              <td>2.36</td>
              <td>Krishna</td>
              <td>Your enemies will mock your ability and say what should not be said</td>
            </tr>
            <tr>
              <td>2.37</td>
              <td>Krishna</td>
              <td>Killed, you gain heaven; victorious, you rule the earth; so stand and fight</td>
            </tr>
            <tr>
              <td>2.38</td>
              <td>Krishna</td>
              <td>Treat pleasure and pain, gain and loss, victory and defeat alike, and fight</td>
            </tr>
            <tr>
              <td>2.39</td>
              <td>Krishna</td>
              <td>That was Sankhya; now hear the yoga that frees you from the bonds of karma</td>
            </tr>
            <tr>
              <td>2.40</td>
              <td>Krishna</td>
              <td>On this path no effort is lost, and a little of it protects from great fear</td>
            </tr>
            <tr>
              <td>2.41</td>
              <td>Krishna</td>
              <td>A resolute mind is single-pointed; an irresolute one branches endlessly</td>
            </tr>
            <tr>
              <td>2.42</td>
              <td>Krishna</td>
              <td>The unwise, attached to the letter of the Vedas, say there is nothing more</td>
            </tr>
            <tr>
              <td>2.43</td>
              <td>Krishna</td>
              <td>Full of desire, they aim at heaven and perform rites for pleasure and power</td>
            </tr>
            <tr>
              <td>2.44</td>
              <td>Krishna</td>
              <td>Minds caught by pleasure and power cannot settle into steady concentration</td>
            </tr>
            <tr>
              <td>2.45</td>
              <td>Krishna</td>
              <td>The Vedas deal with the three gunas; rise above them and rest in the self</td>
            </tr>
            <tr>
              <td>2.46</td>
              <td>Krishna</td>
              <td>To one who knows Brahman, the Vedas are as useful as a pond in a flood</td>
            </tr>
            <tr>
              <td>2.47</td>
              <td>Krishna</td>
              <td>Your right is to the work, never to its results; do not cling to inaction</td>
            </tr>
            <tr>
              <td>2.48</td>
              <td>Krishna</td>
              <td>Act steady in yoga, the same in success and failure; that evenness is yoga</td>
            </tr>
            <tr>
              <td>2.49</td>
              <td>Krishna</td>
              <td>Acting for results is far below acting from wisdom; take refuge in wisdom</td>
            </tr>
            <tr>
              <td>2.50</td>
              <td>Krishna</td>
              <td>Joined to wisdom, one leaves behind good and bad deeds; yoga is skill in action</td>
            </tr>
            <tr>
              <td>2.51</td>
              <td>Krishna</td>
              <td>The wise who give up the fruits of action are freed from rebirth</td>
            </tr>
            <tr>
              <td>2.52</td>
              <td>Krishna</td>
              <td>When your mind crosses delusion, you will tire of what you have heard and will hear</td>
            </tr>
            <tr>
              <td>2.53</td>
              <td>Krishna</td>
              <td>When your mind, unsettled by conflicting scripture, stands still in samadhi, you reach yoga</td>
            </tr>
            <tr>
              <td>2.54</td>
              <td>Arjuna</td>
              <td>Arjuna asks how a person of steady wisdom speaks, sits and walks</td>
            </tr>
            <tr>
              <td>2.55</td>
              <td>Krishna</td>
              <td>One who gives up all desires and is content in the self has steady wisdom</td>
            </tr>
            <tr>
              <td>2.56</td>
              <td>Krishna</td>
              <td>Undisturbed in sorrow, not craving pleasure, free of attachment, fear and anger</td>
            </tr>
            <tr>
              <td>2.57</td>
              <td>Krishna</td>
              <td>Unattached everywhere, neither elated by good nor upset by bad: that is steady wisdom</td>
            </tr>
            <tr>
              <td>2.58</td>
              <td>Krishna</td>
              <td>The steady one withdraws the senses from objects as a tortoise draws in its limbs</td>
            </tr>
            <tr>
              <td>2.59</td>
              <td>Krishna</td>
              <td>Fasting keeps sense objects away while the taste for them stays; seeing the Supreme ends it</td>
            </tr>
            <tr>
              <td>2.60</td>
              <td>Krishna</td>
              <td>The restless senses can carry off the mind even of a wise man who strives</td>
            </tr>
            <tr>
              <td>2.61</td>
              <td>Krishna</td>
              <td>Restrain the senses and sit focused on me; then wisdom is steady</td>
            </tr>
            <tr>
              <td>2.62</td>
              <td>Krishna</td>
              <td>Dwelling on objects breeds attachment, then desire, and from desire comes anger</td>
            </tr>
            <tr>
              <td>2.63</td>
              <td>Krishna</td>
              <td>Anger brings delusion, then lost memory, lost judgment, and ruin</td>
            </tr>
            <tr>
              <td>2.64</td>
              <td>Krishna</td>
              <td>Moving among objects without attraction or aversion, the self-controlled finds clarity</td>
            </tr>
            <tr>
              <td>2.65</td>
              <td>Krishna</td>
              <td>In that clarity sorrows end, and the mind soon becomes steady</td>
            </tr>
            <tr>
              <td>2.66</td>
              <td>Krishna</td>
              <td>Without discipline there is no wisdom or peace, and without peace no happiness</td>
            </tr>
            <tr>
              <td>2.67</td>
              <td>Krishna</td>
              <td>A mind that follows the senses loses its wisdom, like a ship blown off course by wind</td>
            </tr>
            <tr>
              <td>2.68</td>
              <td>Krishna</td>
              <td>One whose senses are withdrawn from their objects has steady wisdom</td>
            </tr>
            <tr>
              <td>2.69</td>
              <td>Krishna</td>
              <td>The sage is awake in what is night for others, and their day is his night</td>
            </tr>
            <tr>
              <td>2.70</td>
              <td>Krishna</td>
              <td>Desires enter him like rivers into the full, still ocean, and he has peace</td>
            </tr>
            <tr>
              <td>2.71</td>
              <td>Krishna</td>
              <td>One who drops desire, longing, &quot;mine&quot; and &quot;I&quot; finds peace</td>
            </tr>
            <tr>
              <td>2.72</td>
              <td>Krishna</td>
              <td>This is the state of Brahman; holding it even at death, one reaches brahma-nirvana</td>
            </tr>
          </tbody>
        </table>

        {/* RELATED READING */}
        <div className="related-section">
          <h3>Continue Reading</h3>
          <div className="related-grid">
            <a href="/blogs/bhagwat-geeta-chapter-1" className="related-card">
              <div className="related-card-label">Previous</div>
              <div className="related-card-title">Chapter 1, Arjuna Vishada Yoga</div>
            </a>
            <a href="/blogs/bhagwat-geeta-chapter-3" className="related-card">
              <div className="related-card-label">Next</div>
              <div className="related-card-title">Chapter 3, Karma Yoga</div>
            </a>
            <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
              <div className="related-card-label">Deep Dive</div>
              <div className="related-card-title">Karma: What It Means in the Gita</div>
            </a>
          </div>
        </div>

        {/* FAQ SECTION */}

      <FeedbackWidget pageType="blog" />
        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Frequently Asked Questions</div>
            <h2>Questions About Chapter 2</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 2 about?</div>
            <div className="faq-a">
              Chapter 2, called Sankhya Yoga or the Yoga of Knowledge, contains Krishna&apos;s first teachings to Arjuna: on the eternal atman, the dharma of a warrior, action without attachment to results, and the sthitaprajna, the person of steady wisdom. With 72 verses it is the longest chapter in the Gita&apos;s first half.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the best-known verse in Chapter 2?</div>
            <div className="faq-a">
              The best known is 2.47, &quot;karmany evadhikaras te ma phaleshu kadachana&quot;, often translated as &quot;you have a right to work, not to the fruits of work.&quot; But 2.20 (the atman is unborn and eternal) and 2.56 (the description of the sthitaprajna) are equally central to the chapter's argument.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is "sthitaprajna" in the Bhagavad Gita?</div>
            <div className="faq-a">
              Sthitaprajna literally means "one of steady wisdom", sthita means steady or stable, prajna means wisdom or intelligence. Arjuna asks Krishna in verse 2.54 what such a person looks like from the outside. Krishna answers across verses 2.55–2.72: they are not disturbed by sorrow, not elated by pleasure, free from attachment, fear, and anger, and their senses are under control like a tortoise withdrawing its limbs.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 2.47 mean?</div>
            <div className="faq-a">
              2.47 says: you have the right to act, but not to claim the fruits of your actions; do not let the fruits be your motive; and do not fall into the trap of inaction either. Most people quote only the first half. The fourth clause, about inaction, rules out reading the verse as permission to do nothing: Krishna wants action done with an even mind.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How many verses are in Bhagavad Gita Chapter 2?</div>
            <div className="faq-a">
              Chapter 2 has 72 verses; only Chapter 18, with 78, is longer. It sets out the teachings on the atman, duty, action and wisdom that later chapters return to.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Sankhya Yoga?</div>
            <div className="faq-a">
              Sankhya Yoga means the yoga of knowledge or the yoga of discriminative understanding. Sankhya refers to an ancient philosophical system that distinguishes between the eternal self (purusha) and material nature (prakriti). In Chapter 2, Krishna uses this framework to help Arjuna see that his grief is based on identifying with the temporary rather than the eternal.
            </div>
          </div>
        </div>

      </article>
    </div>

    {/* ── FOOTER ── */}
    <SiteFooter />
  
    

      <BlogTracker pageName="Bhagwat Geeta Chapter 2" />
    </>
  )
}
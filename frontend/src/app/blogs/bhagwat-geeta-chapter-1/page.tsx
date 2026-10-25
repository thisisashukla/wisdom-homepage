import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 1 Summary \u2013 Key Verses & Meaning (Arjuna Vishada Yoga)",
  description: "Bhagavad Gita Chapter 1 (Arjuna Vishada Yoga) \u2014 47 verses on the despair of Arjuna at Kurukshetra, the moment the Pandavas' great archer put down his bow.",
  keywords: "bhagwat geeta chapter 1, bhagwat geeta adhyay 1, arjuna vishada yoga, bhagavad gita chapter 1 shlok, bhagwat geeta chapter 1 in hindi, arjuna grief bhagavad gita, kurukshetra battlefield, dhritarashtra uvacha, arjuna refuses to fight, gita chapter 1 summary, Arjuna Vishada Yoga meaning, Bhagavad Gita 1.1 dharmakshetre kurukshetre, why Arjuna put down his bow, moral crisis Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 1 Summary \u2013 Key Verses & Meaning (Arjuna Vishada Yoga)",
    description: "All 47 verses of Bhagavad Gita Chapter 1 \u2014 a great warrior stopped by grief and conscience before the battle begins.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter1.webp", width: 1200, height: 675, alt: "Arjuna collapsed on his chariot at Kurukshetra, bow lowered, gaze on his teachers and kin \u2014 Chapter 1 of the Bhagavad Gita, Arjuna Vishada Yoga, captures the moment grief and dharma collide." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 1 Summary \u2013 Key Verses & Meaning (Arjuna Vishada Yoga)",
    description: "All 47 verses of Bhagavad Gita Chapter 1 \u2014 a great warrior stopped by grief and conscience before the battle begins.",
    images: ["https://wisdomquotes.in/assets/chapter1.webp"],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1",
    languages: {
      'x-default': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1",
      'en': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1",
      'en-IN': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2" },
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
        content: "अध्याय १";
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
    "headline": "Bhagavad Gita Chapter 1 — Arjuna Vishada Yoga: When the Warrior Sat Down",
    "description": "Bhagavad Gita Chapter 1 — Arjuna Vishada Yoga. All 47 verses with Sanskrit, transliteration, meaning, and the moment Arjuna put down his bow.",
    "alternativeHeadline": "Bhagavad Gita Chapter 1 (Arjuna Vishada Yoga) — Summary & Verses",
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
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/chapter1.webp", "width": 1200, "height": 675 },
    "datePublished": "2026-04-08",
    "dateModified": "2026-05-24",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1" },
    "about": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" }
    ],
    "keywords": "bhagwat geeta chapter 1, bhagwat geeta adhyay 1, arjuna vishada yoga, bhagavad gita chapter 1 shlok, bhagwat geeta chapter 1 in hindi, arjuna grief bhagavad gita, kurukshetra battlefield, dhritarashtra uvacha, arjuna refuses to fight, gita chapter 1 summary, Bhagavad Gita 1.1 dharmakshetre kurukshetre, why Arjuna put down his bow",
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
      "name": "Bhagavad Gita Chapter 1 — Arjuna Vishada Yoga",
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-1"
    }
  ]
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Bhagavad Gita Chapter 1 about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bhagavad Gita Chapter 1, called Arjuna Vishada Yoga, describes the scene on the battlefield of Kurukshetra just before the great war begins. Arjuna sees his relatives and teachers arrayed on both sides, is overcome with grief and moral doubt, and ultimately sets down his bow and refuses to fight. The chapter sets up the ethical crisis that makes Krishna's teachings in the chapters that follow both necessary and meaningful."
      }
    },
    {
      "@type": "Question",
      "name": "What is Arjuna Vishada Yoga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arjuna Vishada Yoga means 'the yoga of Arjuna's grief' or 'the yoga of Arjuna's despondency.' In Sanskrit, vishada means deep sorrow, distress, or despondency. The word 'yoga' here means a path or a discipline. The implication is that Arjuna's grief itself becomes a doorway: his collapse is what opens the space for Krishna's teaching."
      }
    },
    {
      "@type": "Question",
      "name": "How many verses are in Chapter 1 of the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bhagavad Gita Chapter 1 has 47 verses (shlokas). None of Krishna's teaching appears yet, but the chapter sets up the situation that the remaining 17 chapters answer."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Arjuna refuse to fight in Chapter 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arjuna refuses to fight because he sees his own relatives — grandfathers, teachers, uncles, brothers, friends — arrayed on both sides of the battlefield. He argues that victory is meaningless if it requires killing the people he loves, that destroying families unravels the ethical fabric of society, and that dying unarmed would be preferable to this. His arguments are serious ones, though they are rooted in attachment to his roles as a son, student, and friend rather than to his duty as a warrior."
      }
    },
    {
      "@type": "Question",
      "name": "What are the physical symptoms Arjuna describes in Chapter 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In verses 29–30 (1.29–1.30), Arjuna describes his limbs going weak, his mouth drying up, his body trembling, his hair standing on end, his skin burning, his famous bow Gandiva slipping from his hands, and his mind reeling in confusion. He says the cause is pity for his own people (1.28)."
      }
    },
    {
      "@type": "Question",
      "name": "Who speaks first in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The very first words of the Bhagavad Gita are spoken by King Dhritarashtra, the blind father of the Kauravas. He asks his advisor Sanjaya: 'O Sanjaya, what did my sons and the sons of Pandu do after assembling on the holy field of Kurukshetra?' The Gita opens with a question, and the question already shows a blind king's attachment to his own sons."
      }
    },
    {
      "@type": "Question",
      "name": "What does 'dharma-kshetra kuru-kshetra' mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The opening line of the Bhagavad Gita describes Kurukshetra as 'dharma-kshetra' — the field of dharma, or the field of righteousness. Calling the battlefield a field of dharma frames what follows as an argument about duty, conscience and action as well as a war story."
      }
    },
    {
      "@type": "Question",
      "name": "Is Chapter 1 the most important in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 2 is typically considered the philosophical heart of the Gita, and later chapters go deeper into yoga, devotion, and metaphysics. Chapter 1 sets up the crisis the teaching answers, and Krishna's replies in later chapters respond to the specific doubts Arjuna raises here."
      }
    },
    {
      "@type": "Question",
      "name": "What is the main teaching of Bhagavad Gita Chapter 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 1 does not contain any explicit teaching from Krishna. It shows what happens when a person's sense of self rests on roles and relationships that come into conflict: Arjuna, grandson of Bhishma and student of Drona, collapses."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Bhagavad Gita say about grief and emotional crisis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Bhagavad Gita takes grief seriously — it opens with it. Arjuna's despondency in Chapter 1 is the starting point of the whole dialogue. The Sanskrit word vishada (grief/despondency) appears in the title of Chapter 1 itself, and Krishna's first teaching, in 2.11, answers that grief directly."
      }
    }
  ]
}
]

export default function ChapterOnePage() {
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
        Bhagavad Gita Chapter 1
      </div>
    </div>

    {/* ── HERO ── */}
    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · Adhyay 1 · 47 Verses
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Bhagavad Gita Chapter 1 (Adhyay 1):<br />
          <em>Arjuna Vishada Yoga</em>
        </h1>
        <p className="article-subtitle">
          The Gita begins with a collapse, before any teaching. Forty-seven verses on a great archer who cannot raise his bow.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">47 verses · Arjuna Vishada Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~16 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 1 of 18</span>
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
            src="/assets/chapter1.webp"
            alt="Arjuna's despair on the battlefield, Bhagavad Gita Chapter 1"
            width="1200"
            height="675"
            loading="eager"
          />
        </figure>

        <p className="lead">
          Chapter 1 often gets treated as backstory, the setup before the philosophy begins in Chapter 2. It deserves a slower reading, because it records a collapse in detail before any answer is given.
        </p>

        <p>
          Arjuna is unsure whether fighting is right at all.
        </p>

        <p>
          The setting is the battlefield of Kurukshetra, with two armies drawn up against each other. Between them stands Arjuna, trained since boyhood for this kind of moment and armed with the bow Gandiva. He finds he cannot fight.
        </p>

        <p>
          47 verses later, he sits down in his chariot and puts his bow down.
        </p>

        <p>The chapter that causes this is worth understanding in full.</p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#blind-king"
                >The blind king's opening question, Bhagavad Gita 1.1</a
              >
            </li>
            <li>
              <a href="#inventory">The inventory of warriors (1.2–1.19)</a>
            </li>
            <li><a href="#precipice">The pause at the precipice, 1.20</a></li>
            <li>
              <a href="#faces">When Arjuna sees their faces, 1.26–1.27</a>
            </li>
            <li>
              <a href="#body"
                >A body that doesn't lie, physical symptoms 1.29–1.30</a
              >
            </li>
            <li>
              <a href="#argument"
                >The ethical argument against victory, 1.32–1.44</a
              >
            </li>
            <li>
              <a href="#final"
                >The final choice, Arjuna sets down his bow, 1.46–1.47</a
              >
            </li>
            <li><a href="#why">Why Vyasa spent 47 verses on the crisis</a></li>
            <li><a href="#all-verses">All 47 shlokas at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 1.1 · The Opening Question
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="blind-king">The Blind King Asks First</h2>

        <p>
          The first words of the Bhagavad Gita belong to Dhritarashtra, the blind king, who sits far from the battlefield and asks his minister Sanjaya for a report.
        </p>

        <p>Listen carefully to how he asks it.</p>

        {/* SHLOKA 1.1 */}
                <ShlokaCard
          verseRef="Bhagavad Gita 1.1"
          speaker="Dhritarashtra"
          sanskrit="धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः । मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥"
          iast="dhṛtarāṣṭra uvāca dharmakṣetre kurukṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||"
          meaning="Dhritarashtra said: O Sanjaya, after assembling on the holy field of Kurukshetra, eager to fight, what did mine and Pandu's sons do?"
          insightLabel="What it reveals"
          insight="The first verse already holds the war's root cause. Dhritarashtra says māmakāḥ, mine, and sets his sons against Pandu&apos;s. The blind king has sorted the world into us and them before anything has happened."
          essence="Dhritarashtra asks what his sons and Pandu&apos;s sons did at Kurukshetra."
        />

        <p>
          The word <em>māmakāḥ</em> matters. Dhritarashtra calls his sons simply "mine", a possessive English cannot carry with the same weight. In the Mahabharata he is a man who confuses ownership with love, and many readers take his blindness as more than physical.
        </p>

        <p>
          The Gita also places this scene in <em>dharma-kshetra</em>, the field
          of righteousness. Kurukshetra was already a sacred site, and naming it the field of dharma frames the battle as a place where the question of what is right will be faced.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 1.2–1.19 · The Armies Array
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="inventory">The Inventory of Warriors</h2>

        <p>
          Verses 2 through 19 are often skimmed: Duryodhana surveys the Pandava
          army and reports to his teacher Dronacharya. Warriors are named on
          both sides. Conches are blown. The battlefield reverberates with the
          sound of war drums, trumpets, and the collective cry of two armies
          that have been building toward this moment for thirteen years of exile
          and betrayal.
        </p>

        <p>
          These verses set out what is at stake. When Arjuna's crisis comes, we understand its scale because we have been shown named people on both sides. Bhishma, grandsire to both sides. Dronacharya, who taught both armies. Karna, who, unknown to Arjuna, is his own elder brother. Every name is a relationship. Every
          warrior is someone's son, someone's teacher, someone's friend.
        </p>

        <div className="highlight-box">
          <p>
            <strong>A note on Duryodhana:</strong> In verses 3–11, Duryodhana lists the Pandava warriors at length before naming his own. In 1.10 he calls his army aparyāptam, which some translators read as unlimited and others as insufficient. Read the second way, he is reassuring himself as much as his teacher.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 1.20 · The Last Moment of Certainty
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="precipice">The Pause at the Precipice</h2>

        <p>
          In verse 20, with the conches blown and weapons about to clash, Arjuna, whose chariot flies the banner of Hanuman, raises his bow.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 1.20"
          sanskrit="अथ व्यवस्थितान् दृष्ट्वा धार्तराष्ट्रान्कपिध्वजः । प्रवृत्ते शस्त्रसंपाते धनुरुद्यम्य पाण्डवः ॥"
          iast="atha vyavasthitān dṛṣṭvā dhārtarāṣṭrānkapidhvajaḥ | pravṛtte śastrasaṃpāte dhanurudyamya pāṇḍavaḥ ||"
          meaning="Seeing the sons of Dhritarashtra arranged and ready for battle, as the weapons were about to clash, Arjuna, the son of Pandu, whose chariot bore the monkey banner, lifted his bow."
          insightLabel="The pivot"
          insight="The bow is up, and in verses 21–23 Arjuna asks Krishna to halt the chariot between the armies so he can see whom he must fight. A careful warrior looks before he commits."
          essence="Arjuna sees the Kauravas in battle order and raises his bow."
        />

        <p>
          Krishna drives the chariot between the two armies (1.24–25) and tells Arjuna to look at the assembled Kurus. What Arjuna sees there undoes him.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 1.26–1.27 · Recognition
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="faces">When You See <em>Their Faces</em></h2>

        <p>He looks, and sees people he knows.</p>

                <ShlokaCard
          verseRef="Bhagavad Gita 1.26–1.27"
          sanskrit="तत्रापश्यत्स्थितान्पार्थः पितृ़नथ पितामहान् । आचार्यान्मातुलान्भ्रातृ़न्पुत्रान्पौत्रान्सखींस्तथा ॥ श्वशुरान्सुहृदश्चैव सेनयोरुभयोरपि । तान्समीक्ष्य स कौन्तेयः सर्वान्बन्धूनवस्थितान् ॥"
          iast="tatrāpaśyatsthitānpārthaḥ pitṛ̈natha pitāmahān | ācāryānmātulānbhrātṛ̈nputrānpautrānsakhīṃstathā || śvaśurānsuhṛdaścaiva senayorubhayorapi | tānsamīkṣya sa kaunteyaḥ sarvānbandhūnavasthitān ||"
          meaning="There Arjuna saw, standing in both armies: fathers, grandfathers, teachers, maternal uncles, brothers, sons, grandsons, friends, fathers-in-law, and well-wishers. Seeing all these relatives arrayed on both sides, the son of Kunti was overwhelmed with great compassion."
          insightLabel="The human moment"
          insight="The list is personal: fathers, grandfathers, teachers, uncles, brothers, sons, grandsons, friends. An abstract enemy has turned into family, and Arjuna is overcome with pity (kṛpā)."
          essence="Arjuna sees family and teachers in both armies, and pity overwhelms him."
        />

        <p>
          Arjuna has faced death in battle before, so fear of dying is not what stops him. He can no longer tell which side he is on, because the people he loves stand in both armies: grandfathers, teachers and in-laws, about to kill each other.
        </p>

        <p>
          His identity has been built on a network of relationships. When those
          relationships are about to be severed, by his own hand, the self
          built on them begins to dissolve.
        </p>

        <div className="pull-quote">
          <blockquote>
            "Seeing all these relatives arrayed on both sides, the son of Kunti was overwhelmed with great compassion."
          </blockquote>
          <cite>Bhagavad Gita 1.26–27</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 1.28–1.30 · Physiological Grief
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="body">A Body That Doesn't Lie</h2>

        <p>Before he argues, his body gives way.</p>

                <ShlokaCard
          verseRef="Bhagavad Gita 1.29"
          speaker="Arjuna"
          sanskrit="सीदन्ति मम गात्राणि मुखं च परिशुष्यति । वेपथुश्च शरीरे मे रोमहर्षश्च जायते ॥"
          iast="sīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati | vepathuśca śarīre me romaharṣaśca jāyate ||"
          meaning="My limbs give way and fail. My mouth is drying up. My body trembles. My hair stands on end."
          insightLabel="What he lists"
          insight="Arjuna lists what is happening to his body: his limbs give way, his mouth goes dry, he trembles, his hair stands on end, his skin burns, and the bow slips from his hand (1.29–30). He says it comes from pity for his own people (1.28)."
          essence="Arjuna&apos;s limbs fail, his mouth dries, he trembles and his hair stands on end."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 1.30"
          speaker="Arjuna"
          sanskrit="गाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते । न च शक्नोम्यवस्थातुं भ्रमतीव च मे मनः ॥"
          iast="gāṇḍīvaṃ sraṃsate hastāttvakcaiva paridahyate | na ca śaknomyavasthātuṃ bhramatīva ca me manaḥ ||"
          meaning="The Gandiva slips from my hand. My skin burns all over. I cannot stand. My mind reels and spins."
          insightLabel="Significance"
          insight="Gandiva was Agni's gift to Arjuna, and it stands for his identity as a warrior. When it slips from his hand, that identity is slipping too."
          essence="Gandiva slips from his hand, his skin burns, and he cannot stand."
        />

        

        <p>
          Arjuna describes all this to Krishna plainly, without trying to push through it.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 1.31–1.44 · The Ethical Argument
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="argument">The Argument Against Victory</h2>

        <p>
          From verse 31 onward Arjuna makes a coherent ethical case against fighting, and it deserves to be read as one.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 1.32"
          speaker="Arjuna"
          sanskrit="न काङ्क्षे विजयं कृष्ण न च राज्यं सुखानि च । किं नो राज्येन गोविन्द किं भोगैर्जीवितेन वा ॥"
          iast="na kāṅkṣe vijayaṃ kṛṣṇa na ca rājyaṃ sukhāni ca | kiṃ no rājyena govinda kiṃ bhogairjīvitena vā ||"
          meaning="I do not want victory, Krishna. I do not want a kingdom or pleasures. Of what use is a kingdom to us, Govinda? Of what use are enjoyments or even life itself?"
          insightLabel="The inversion"
          insight="Arjuna gives up victory, kingdom and pleasure, the three things warriors fight for, in a single verse. He is rejecting the reason they came to fight."
          essence="Arjuna wants neither victory nor kingdom nor pleasure at this price."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 1.33"
          speaker="Arjuna"
          sanskrit="येषामर्थे काङ्क्षितं नो राज्यं भोगाः सुखानि च । त इमेऽवस्थिता युद्धे प्राणांस्त्यक्त्वा धनानि च ॥"
          iast="yeṣāmarthe kāṅkṣitaṃ no rājyaṃ bhogāḥ sukhāni ca | ta ime'vasthitā yuddhe prāṇāṃstyaktvā dhanāni ca ||"
          meaning="Those for whose sake we desire kingdoms, pleasures, and happiness, they themselves stand here on this battlefield, having given up their desire for life and wealth."
          insightLabel="The logic"
          insight="The argument is about consequences: the people a victory would benefit are the ones who will die winning it. The means would consume the ends."
          essence="The people they want the kingdom for are the ones standing ready to die."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 1.38–1.39"
          speaker="Arjuna"
          sanskrit="यद्यप्येते न पश्यन्ति लोभोपहतचेतसः । कुलक्षयकृतं दोषं मित्रद्रोहे च पातकम् ॥ कथं न ज्ञेयमस्माभिः पापादस्मान्निवर्तितुम् । कुलक्षयकृतं दोषं प्रपश्यद्भिर्जनार्दन ॥"
          iast="yadyapyete na paśyanti lobhopahatacetasaḥ | kulakṣayakṛtaṃ doṣaṃ mitradrohe ca pātakam || kathaṃ na jñeyamasmābhiḥ pāpādasmānnivartitum | kulakṣayakṛtaṃ doṣaṃ prapaśyadbhirjanārdana ||"
          meaning="Even if those whose minds are blinded by greed cannot see the papa in destroying families and betraying friends, how can we, who clearly see the consequences, fail to turn away from this papa, O Janardana?"
          insightLabel="The ethics"
          insight="Arjuna argues from duty: if you can see the harm and others cannot, you carry more responsibility for acting on what you see. The argument has force. Krishna's reply in Chapter 2 is about who Arjuna takes himself to be."
          essence="Those who see the wrong in destroying a family should turn away from it."
        />

        <p>
          Arjuna is right that destroying families has consequences for generations, that those who see harm more clearly bear more responsibility, and that a victory built on killing people you love would feel hollow.
        </p>

        <p>
          Krishna's answer is that the arguments are incomplete. They rest on what the Gita later calls <em>ahamkara</em>, the ego-self built around roles, relationships and outcomes, and the next 17 chapters are about the self beneath it.
        </p>

        

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 1.45–1.47 · The Final Position
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="final">
          The Final Choice, <em>Silence and a Bow Set Down</em>
        </h2>

                <ShlokaCard
          verseRef="Bhagavad Gita 1.46"
          speaker="Arjuna"
          sanskrit="यदि मामप्रतीकारमशस्त्रं शस्त्रपाणयः । धार्तराष्ट्रा रणे हन्युस्तन्मे क्षेमतरं भवेत् ॥"
          iast="yadi māmapratīkāramaśastraṃ śastrapāṇayaḥ | dhārtarāṣṭrā raṇe hanyustanme kṣemataraṃ bhavet ||"
          meaning="If the armed sons of Dhritarashtra were to kill me in battle, unresisting, unarmed, even that would be better for me."
          insightLabel="Choosing to die unarmed"
          insight="Arjuna would rather be killed unarmed and unresisting than fight his own family. It is a principled position, and Krishna spends the following chapters arguing that it comes from confusion."
          essence="Arjuna says he would rather die unarmed than fight his kinsmen."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 1.47"
          sanskrit="सञ्जय उवाच एवमुक्त्वाऽर्जुनः संख्ये रथोपस्थ उपाविशत् । विसृज्य सशरं चापं शोकसंविग्नमानसः ॥"
          iast="sañjaya uvāca evamuktvā'rjunaḥ saṃkhye rathopastha upāviśat | visṛjya saśaraṃ cāpaṃ śokasaṃvignamānasaḥ ||"
          meaning="Sanjaya said: Having spoken thus on the battlefield, Arjuna sat down upon the seat of his chariot, casting aside both bow and arrows, his mind overwhelmed with grief."
          insightLabel="The end of Chapter 1"
          insight="Sanjaya reports this to the blind king. Chapter 1 ends with Arjuna sitting down in the chariot, his bow and arrows set aside (1.47)."
          essence="Arjuna sits down in the chariot, drops bow and arrows, and gives way to grief."
        />

        <p>
          Sanjaya's narration ends here. Chapter 1's last image is Arjuna,
          seated, bow and arrows set aside, mind overwhelmed with grief, <em>śokasaṃvignamānasaḥ</em>. The compound word is worth sitting with:
          <em>shoka</em> (grief) + <em>samvigna</em> (agitated, disturbed) +
          <em>manasah</em> (of the mind): a mind shaken by grief.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            What This Chapter Is Really Doing
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="why">Why Vyasa Spent 47 Verses on the Crisis</h2>

        <p>
          The Gita could have begun at Chapter 2, with Krishna teaching from the first sign of doubt. Vyasa spends 47 verses on the collapse before any teaching appears.
        </p>

        

        <p>
          An answer that comes before the question has weight tends not to land. By the time Krishna begins, Arjuna is fully in his confusion, in body, mind, ethics and grief.
        </p>

        <p>
          Many readers find the same with their own questions. You can read about the self, detachment, duty and the atman and follow it all in your head, and it starts to matter when your sense of who you are has been shaken.
        </p>

        <p>
          In Krishna's reading, Arjuna's mistake is to confuse his roles with his self. He is a grandson, a student, a friend and a warrior, and when those roles collide he has nothing deeper to steer by. His grief belongs to a self built on circumstances, facing circumstances it cannot handle.
        </p>

        <p>
          What Krishna teaches from Chapter 2 onward is how to find the self
          that is not built on circumstances at all.
        </p>

        

        <div className="pull-quote">
          <blockquote>
            "My nature is overcome by pity and weakness, and my mind is confused about dharma. Tell me for certain what is better. I am your student; I take refuge in you. Teach me."
          </blockquote>
          <cite>Arjuna, Bhagavad Gita 2.7</cite>
        </div>

        {/* ── KEY INSIGHTS ── */}
        <div className="insights-box">
          <div className="insights-label">
            What Bhagavad Gita Chapter 1 teaches, 5 core insights
          </div>
          <ol className="insights-list">
            <li>
              <strong>Attachment distorts perception.</strong> The Gita's very
              first line, a blind king asking "what did mine do?", shows that
              attachment shapes the questions we ask before we even begin to
              act.
            </li>
            <li>
              <strong
                >In the Gita, grief comes before wisdom.</strong
              >
              Arjuna's vishada (despondency) names the chapter, and his breakdown is where the teaching starts.
            </li>
            <li>
              <strong
                >The body registers moral crisis before the mind does.</strong
              >
              In 1.29–1.30, Arjuna describes trembling, dry mouth, burning skin,
              and a bow slipping from his hand, all before he makes a single argument.
            </li>
            <li>
              <strong
                >A coherent ethical argument can still be rooted in the wrong
                identity.</strong
              >
              Arjuna's case against fighting is reasoned, and it is built on attachment to roles (son, student, friend) rather than on a
              deeper understanding of the self. That is what Krishna addresses
              in Chapter 2.
            </li>
            <li>
              <strong>The question matters as much as the answer.</strong> Vyasa spends 47 verses on the crisis before Krishna teaches anything.
            </li>
          </ol>
        </div>

        {/* ── ALL 47 VERSES SUMMARY ── */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 47 Verses, Quick Reference
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">
          Bhagwat Geeta Adhyay 1, All 47 Shlokas at a Glance
        </h2>

        <p>
          All 47 verses of Arjuna Vishada Yoga (Bhagavad Gita Chapter 1),
          organised by speaker and theme:
        </p>

        <table className="verse-table">
          <thead>
            <tr>
              <th>Verses</th>
              <th>Speaker</th>
              <th>What Happens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.1</td>
              <td>Dhritarashtra</td>
              <td>
                The blind king's opening question, "mine and Pandu's sons"
              </td>
            </tr>
            <tr>
              <td>1.2–11</td>
              <td>Duryodhana / Sanjaya</td>
              <td>
                Duryodhana surveys Pandava army, reports to Drona, assesses both
                forces
              </td>
            </tr>
            <tr>
              <td>1.12–19</td>
              <td>Sanjaya</td>
              <td>
                Bhishma blows his conch; both armies respond with war cries and
                instruments
              </td>
            </tr>
            <tr>
              <td>1.20–23</td>
              <td>Sanjaya / Arjuna</td>
              <td>
                Arjuna lifts his bow, then asks Krishna to place the chariot
                between the armies
              </td>
            </tr>
            <tr>
              <td>1.24–25</td>
              <td>Sanjaya</td>
              <td>
                Krishna positions the chariot; Arjuna sees the armies arrayed
              </td>
            </tr>
            <tr>
              <td>1.26–27</td>
              <td>Sanjaya</td>
              <td>
                Arjuna recognises relatives on both sides, overcome with
                compassion
              </td>
            </tr>
            <tr>
              <td>1.28–46</td>
              <td>Arjuna</td>
              <td>
                Arjuna's grief, physical symptoms, ethical arguments, final
                refusal
              </td>
            </tr>
            <tr>
              <td>1.47</td>
              <td>Sanjaya</td>
              <td>Arjuna sets down his bow. Chapter 1 ends.</td>
            </tr>
          </tbody>
        </table>

        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected Karna&apos;s relation to Arjuna (Arjuna does not know Karna is his brother), replaced a pseudo-medical reading of 1.29–30 with what the verses say, removed superlatives about Arjuna and the chapter, fixed verse taglines that did not match their verses (including 1.46), and updated the Chapter 2 link; copy edited.</p>
      </article>

      {/* ── FAQ ── */}
      {/* ── WISDOM ENTITY DESCRIPTION (for AI extraction) ── */}
      <div className="wisdom-entity">
        <div className="wisdom-entity-label">About the Wisdom App</div>
        <h3>What is the Wisdom app?</h3>
        <p>
          <strong>Wisdom</strong> is an iPhone app that tunes the Bhagavad Gita
          to your life. You say how you feel and what is going on, and it picks
          the verse that speaks to it, with the original Sanskrit, a plain
          English meaning and what it says for you. Then it builds a 7-day plan
          around your situation, read aloud, drawing on the Gita, the Ramayana
          and the Mahabharata. Today&apos;s shloka also sits on your Home Screen
          and Lock Screen.
        </p>
        <p>
          Wisdom is for people who want the Gita&apos;s answer to the week they are having. Week 1 is free on the
          <a
            href={appStoreUrl('web_blog_footer')}
            target="_blank"
            rel="noopener"
            data-mp-location="about_app"
            >Apple App Store</a>.
        </p>
      </div>


      <FeedbackWidget pageType="blog" />
      <div className="faq-section" id="faq">
        <div className="faq-header">
          <div className="faq-header-label">Frequently Asked Questions</div>
          <h2>Bhagavad Gita Chapter 1, Common Questions</h2>
        </div>

        <div className="faq-item">
          <div className="faq-q">What is Bhagavad Gita Chapter 1 about?</div>
          <div className="faq-a">
            Bhagavad Gita Chapter 1, called Arjuna Vishada Yoga, describes the
            scene on the battlefield of Kurukshetra just before the great war
            begins. Arjuna sees his relatives
            and teachers arrayed on both sides, is overcome with grief and moral
            doubt, and ultimately sets down his bow and refuses to fight. The chapter sets up the ethical crisis that makes Krishna's
            teachings in the chapters that follow both necessary and meaningful.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">What does "Arjuna Vishada Yoga" mean?</div>
          <div className="faq-a">
            Arjuna Vishada Yoga means the yoga of Arjuna's grief, or the yoga of
            Arjuna's despondency. In Sanskrit, vishada means deep sorrow or
            distress, and yoga here means a path or discipline.
            The title implies that Arjuna's grief itself is a doorway: his collapse is what opens the space for Krishna's teaching.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">
            How many verses are in Chapter 1 of the Bhagavad Gita?
          </div>
          <div className="faq-a">
            Bhagavad Gita Chapter 1 has 47 verses (shlokas). None of Krishna's teaching appears yet, but the chapter sets up the situation that the remaining 17 chapters answer.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">Why does Arjuna refuse to fight in Chapter 1?</div>
          <div className="faq-a">
            Arjuna refuses to fight because he sees his own relatives, grandfathers, teachers, uncles, brothers, friends, arrayed on both
            sides of the battlefield. He argues that victory is meaningless if
            it requires killing the people he loves, that destroying families
            unravels the ethical fabric of society, and that dying unarmed would
            be preferable to this. His arguments are serious ones, though they are rooted in attachment to his roles as a son, student, and friend rather than to his duty as a warrior.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">
            What physical symptoms does Arjuna describe in Chapter 1?
          </div>
          <div className="faq-a">
            In verses 1.29–1.30, Arjuna describes his limbs going weak, his
            mouth drying up, his body trembling, his hair standing on end, his
            skin burning all over, his famous bow Gandiva slipping from his
            hands, and his mind reeling in confusion. He says the cause is pity for his own people (1.28).
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">Who speaks first in the Bhagavad Gita?</div>
          <div className="faq-a">
            The very first words of the Bhagavad Gita are spoken by King
            Dhritarashtra, the blind father of the Kauravas. He asks his advisor
            Sanjaya what happened after both armies assembled on the battlefield
            of Kurukshetra. The Gita opens with a question, and the question already shows a father's attachment to his own sons.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">What does "dharma-kshetra kuru-kshetra" mean?</div>
          <div className="faq-a">
            The opening line of the Bhagavad Gita describes Kurukshetra as
            dharma-kshetra, the field of dharma, or the field of righteousness.
            Calling the battlefield a field of dharma frames what follows as an argument about duty, conscience and action as well as a war story.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">
            How important is Bhagavad Gita Chapter 1?
          </div>
          <div className="faq-a">
            Chapter 2 is typically considered the philosophical heart of the
            Gita, and later chapters go deeper into yoga, devotion, and
            metaphysics. Chapter 1 sets up the crisis the teaching answers, and Krishna's replies in later chapters respond to the specific doubts Arjuna raises here.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">What does the Bhagavad Gita say about grief?</div>
          <div className="faq-a">
            The Bhagavad Gita takes grief seriously, it opens with it. Arjuna's despondency in Chapter 1 is the starting point of the whole dialogue. The Sanskrit word vishada (grief or despondency) appears in the title of Chapter 1 itself, and Krishna's first teaching, in 2.11, answers that grief directly.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-q">
            What is the most famous shloka in Bhagavad Gita Chapter 1?
          </div>
          <div className="faq-a">
            Chapter 2 holds the verses people cite most often, such as 2.47. From Chapter 1, commonly quoted shlokas include 1.1 (the opening question), 1.29–1.30 (Arjuna's
            physical symptoms), and 1.32, "I do not desire victory, nor
            kingdom, nor pleasures." Verse 1.47, where Arjuna sets down his bow, closes the chapter and is often quoted too.
          </div>
        </div>
      </div>

        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 1"} />


      {/* ── CHAPTER NAV ── */}
      <div className="chapter-nav">
        <div>
          <div className="ch-nav-label">← Previous</div>
          <div
            className="ch-nav-title"
            style={{color: 'var(--muted-2)', fontSize: '13px'}}
          >
            Chapter 1 is the first
          </div>
        </div>
        <div style={{textAlign: 'right'}}>
          <div className="ch-nav-label">Next →</div>
          <div className="ch-nav-title"><a href="/blogs/bhagwat-geeta-chapter-2">Chapter 2, Sankhya Yoga</a></div>
        </div>
      </div>

      {/* ── RELATED ── */}
      <div className="related-section">
        <h3>More from the Bhagavad Gita</h3>
        <div className="related-grid">
          <a href="/blogs/20-famous-sanskrit-shlokas" className="related-card"> <div className="related-card-label">Shloka Collection</div> <div className="related-card-title"> Bhagwat Geeta Shlokas in Sanskrit, 20 Key Verses
            </div>
          </a>
          <a href="/blogs/karma-quotes-bhagavad-gita" className="related-card"> <div className="related-card-label">Teaching</div> <div className="related-card-title"> Karma Quotes from the Bhagavad Gita, What Krishna Said
            </div>
          </a>
          <a href="/blogs/bhagwat-geeta-saar" className="related-card"> <div className="related-card-label">Guide</div> <div className="related-card-title"> Bhagwat Geeta Saar, The Complete Essence in Plain Language
            </div>
          </a>
          <a href="/blogs" className="related-card">
            <div className="related-card-label">Blog</div>
            <div className="related-card-title">
              All Articles, Bhagavad Gita & Hindu Philosophy
            </div>
          </a>
        </div>
      </div>
    </div>
    {/* /article-wrap */}

    {/* ── FOOTER ── */}
    <footer>
      <p>
        Wisdom App ·
        <span>One Gita verse a day for 7 days, read aloud</span>
        · Week 1 free on iPhone
      </p>
      <p style={{marginTop: '8px'}}>
        <a href="/">wisdomquotes.in</a>  · 
        <a
          href={appStoreUrl('web_blog_footer')}
          target="_blank"
          rel="noopener"
          data-mp-location="footer_app_store"
          >App Store</a>
         ·  <a href="/privacy">Privacy</a>  ·  <a href="/terms">Terms</a>  ·  <a href="mailto:work.ankurshukla@gmail.com">Support</a>
      </p>
    </footer>

    

      <BlogTracker pageName="Bhagwat Geeta Chapter 1" />
    </>
  )
}
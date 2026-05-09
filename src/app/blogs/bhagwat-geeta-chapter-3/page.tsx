import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 3 \u2014 Karma Yoga: Why You Cannot Run | Wisdom",
  description: "A deep reading of Bhagavad Gita Chapter 3 (Adhyay 3) \u2014 all 43 verses of Karma Yoga. Why action is unavoidable, duty becomes liberation, and why your own dharma matters more than another's done perfectly. Sanskrit text, IAST, meaning, and modern relevance.",
  keywords: "bhagwat geeta chapter 3, bhagavad gita karma yoga, karma yoga chapter 3, bhagwat geeta adhyay 3, svadharma meaning, lokasamgraha gita, what gita says about duty, karma yoga meaning",
  openGraph: {
    title: "Bhagavad Gita Chapter 3 \u2014 Karma Yoga: Why You Cannot Run",
    description: "Forty-three verses on action, duty, desire, and why the desire to escape responsibility is often just desire in another form.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3",
    siteName: 'Wisdom',
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3" },
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

      /* ── NAV ── */
      body > nav {
        position: sticky;
        top: 0;
        z-index: 200;
        background: rgba(18, 5, 5, 0.92);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border-bottom: 1px solid var(--border);
      }
      .nav-inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 28px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .logo {
        display: flex;
        align-items: center;
        gap: 9px;
        font-family: "Playfair Display", Georgia, serif;
        font-size: 21px;
        font-weight: 700;
        color: var(--gold-light);
        text-decoration: none;
      }
      .logo-mark {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        border: 1.5px solid rgba(200, 136, 30, 0.4);
        flex-shrink: 0;
      }
      .logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
      .nav-links a { font-size: 14px; font-weight: 500; color: var(--text-dim); transition: color 0.18s; }
      .nav-links a:hover, .nav-links a.active { color: var(--gold-light); }
      .btn-nav {
        background: var(--gold) !important;
        color: #1a0606 !important;
        padding: 8px 18px;
        border-radius: 8px;
        font-weight: 700;
        transition: opacity 0.18s;
      }
      .btn-nav:hover { opacity: 0.88; }

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
      .shloka-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 14px;
        overflow: hidden;
        margin: 36px 0;
      }
      .shloka-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 22px;
        border-bottom: 1px solid var(--border);
        background: rgba(200, 136, 30, 0.05);
      }
      .shloka-ref { font-size: 11px; color: var(--gold); letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; }
      .shloka-speaker { font-size: 11px; color: var(--text-dimmer); letter-spacing: 0.06em; }
      .shloka-sanskrit {
        padding: 24px 22px 16px;
        font-family: "Noto Sans Devanagari", serif;
        font-size: 20px;
        line-height: 1.75;
        color: var(--gold-light);
        border-bottom: 1px solid var(--border);
      }
      .shloka-iast {
        padding: 12px 22px 16px;
        font-size: 12.5px;
        line-height: 1.7;
        color: var(--text-dimmer);
        border-bottom: 1px solid var(--border);
        font-style: italic;
      }
      .shloka-body { padding: 20px 22px 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .shloka-col-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: var(--text-dimmer); margin-bottom: 8px; }
      .shloka-meaning { font-size: 14px; line-height: 1.7; color: var(--text-dim); }
      .shloka-insight { font-size: 14px; line-height: 1.7; color: var(--gold-light); }
      .shloka-essence {
        padding: 14px 22px;
        background: rgba(200, 136, 30, 0.06);
        border-top: 1px solid var(--border);
        font-family: "Playfair Display", serif;
        font-style: italic;
        font-size: 15px;
        color: var(--text-dim);
      }

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
      .insights-list { list-style: none; display: flex; flex-direction: column; gap: 14px; counter-reset: insight-counter; }
      .insights-list li {
        counter-increment: insight-counter;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        font-size: 14.5px;
        color: var(--text-dim);
        line-height: 1.65;
      }
      .insights-list li::before {
        content: counter(insight-counter);
        font-size: 11px;
        font-weight: 700;
        background: rgba(200, 136, 30, 0.15);
        color: var(--gold);
        border: 1px solid rgba(200, 136, 30, 0.3);
        width: 22px;
        height: 22px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .insights-list strong { color: var(--text); font-weight: 600; }

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
        .nav-inner { padding: 0 20px; }
        .nav-links { gap: 16px; }
        .nav-links li:not(:last-child) { display: none; }
        .mobile-nav-toggle { display: flex; }
        .shloka-body { grid-template-columns: 1fr; }
        .app-cta { padding: 32px 24px; }
        .pull-quote { padding: 22px 24px; }
        .faq-header, .faq-item { padding-left: 20px; padding-right: 20px; }
        .insights-box { padding: 20px; }
      }
    
`

const schemas = [
  {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Bhagavad Gita Chapter 3 — Karma Yoga: Why You Cannot Run",
  "description": "A deep reading of Bhagavad Gita Chapter 3 (Bhagwat Geeta Adhyay 3) — all 43 verses of Karma Yoga with Sanskrit text, IAST transliteration, meaning, and modern relevance.",
  "author": {
    "@type": "Organization",
    "name": "Wisdom",
    "url": "https://wisdomquotes.in"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wisdom",
    "url": "https://wisdomquotes.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://wisdomquotes.in/assets/male-logo-dark.webp"
    }
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://wisdomquotes.in/og-image.webp",
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-05-05",
  "dateModified": "2026-05-05",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3.html"
  },
  "about": {
    "@type": "Book",
    "name": "Bhagavad Gita",
    "author": {
      "@type": "Person",
      "name": "Ved Vyasa"
    }
  },
  "keywords": "Bhagavad Gita Chapter 3, Bhagwat Geeta Adhyay 3, Karma Yoga, svadharma meaning, lokasamgraha gita"
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
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-3.html"
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
        "text": "Karma yoga is the path of selfless action — performing one's duties without attachment to outcomes, treating every action as an offering to something larger than the self. It is described in Chapter 3 as the appropriate path for most people who are active in the world. Unlike renunciation, which withdraws from action, karma yoga transforms action itself into the spiritual path."
      }
    },
    {
      "@type": "Question",
      "name": "What does svadharma mean in the Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Svadharma means your own duty, your own path, your own nature-driven calling. In 3.35, Krishna says it is better to perform your own dharma imperfectly than to perform another's dharma perfectly. This is not a defense of staying comfortable — it is a teaching about authenticity and the dangers of comparison and imitation."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Gita say about avoiding your responsibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Gita is extremely direct on this. In Chapter 3, Krishna argues that no one can avoid action — attempting to do so is itself an action, driven by desire and self-deception. The desire to escape from one's duties is identified not as wisdom or detachment but as a form of delusion (moha). Arjuna's wish to renounce at the start is diagnosed throughout the chapter as an escape mechanism, not a spiritual achievement."
      }
    },
    {
      "@type": "Question",
      "name": "What is lokasamgraha in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lokasamgraha means 'the holding together of the world' or 'the welfare of humanity.' It appears in Chapter 3 as the reason wise and great people must continue to act — not for personal gain, but because their actions set the standard for what others will do. To withdraw from engagement when one has influence is to abandon a responsibility to the larger good."
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

{/* ── NAV ── */}
    <nav>
      <div className="nav-inner">
        <a href="/" className="logo">
          <div className="logo-mark">
            <img src="/assets/male-logo-dark.webp" alt="Wisdom" />
          </div>
          Wisdom
        </a>
        <MobileNavToggle />
        <ul className="nav-links">
          <li><a href="../#features">Features</a></li>
          <li><a href="../#how-it-works">How it works</a></li>
          <li><a href="../#topics">Topics</a></li>
          <li><a href="/blogs" className="active">Blog</a></li>
          <li>
            <a
              href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
              target="_blank"
              rel="noopener"
              className="btn-nav"
              data-mp-location="nav"
              >Download Free</a
            >
          </li>
        </ul>
      </div>
    </nav>

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
          Bhagavad Gita Chapter 3 (Adhyay 3) —<br />
          <em>Karma Yoga: Why You Cannot Run</em>
        </h1>
        <p className="article-subtitle">
          Arjuna wants out. Not just from the battlefield — from action itself. Chapter 3 is Krishna's answer: action is inescapable. The question is never whether to act, only how. Forty-three verses on duty, desire, and the weight of the example you set.
        </p>
        <div className="article-meta">
          <span className="meta-item">43 verses · Karma Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~14 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 3 of 18</span>
        </div>
      </div>
    </div>

    {/* ── ARTICLE ── */}
    <div className="article-wrap">
      <article className="prose">
        <p className="lead">
          Arjuna wants out. He has set down his bow, and now he is making his case to Krishna: if knowledge is superior to action, why should he fight? Why not renounce the world, sit quiet in meditation, and let others wage war?
        </p>

        <p>
          The question is coherent. The logic is sound. And Chapter 3 is Krishna taking it apart, premise by premise, and rebuilding something harder in its place. Not permission to withdraw. Not validation of the desire to escape. But a teaching that restructures how we think about duty, action, and the spiritual life itself.
        </p>

        <p>
          This is where the Gita stops being a philosophical comfort and becomes a challenge.
        </p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#arjuna-question">Arjuna's question — why act if wisdom is higher?</a>
            </li>
            <li>
              <a href="#two-paths">Two paths, equally valid (3.3)</a>
            </li>
            <li>
              <a href="#you-cannot-not-act">You cannot not act — even for a moment (3.5)</a>
            </li>
            <li>
              <a href="#yajna">The logic of yajna — acting as sacred service (3.9–3.16)</a>
            </li>
            <li>
              <a href="#lokasamgraha">Lokasamgraha — the weight of your example (3.21–3.26)</a>
            </li>
            <li>
              <a href="#ego-claims">The ego's claim on action (3.27)</a>
            </li>
            <li>
              <a href="#svadharma">Your dharma, imperfectly — better than another's perfectly (3.35)</a>
            </li>
            <li>
              <a href="#desire-anger">The real enemy — desire and anger (3.37)</a>
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
          Arjuna has watched Chapter 2 with careful attention. He has heard Krishna teach that the Self is eternal, that the body dies but the soul does not, that action without attachment is the path to freedom. And he has listened to all of it. But now he asks Krishna directly:
        </p>

        <p>
          If wisdom is higher than action — why do you ask me to engage in this terrible war?
        </p>

        <p>
          The logic seems airtight. If knowledge liberates, why not just gain the knowledge and sit? Why all this slaughter?
        </p>

        <p>
          Chapter 3 is Krishna saying: because you're operating on a false premise about what renunciation means. And because action is not something you can opt out of. You're already acting. Even the desire to avoid acting is an action. Even sitting still is action. The only real choice is this: will you act with awareness, or act blindly?
        </p>

        <div className="highlight-box">
          <p>
            <strong>The deeper pattern:</strong> Notice that both Arjuna's collapse in Chapter 1 and his demand for escape in Chapter 3 follow the same impulse — a desire to get out. First out of the battle. Now out of action itself. The Gita is not gentle on this impulse. It names it directly: this is delusion. And what creates the delusion is not cowardice or weakness, but a fundamental misunderstanding of what freedom means.
          </p>
        </div>

        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.3 · The Two Paths
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="two-paths">Two Legitimate Paths</h2>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.3</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            लोकेऽस्मिन्द्विविधा निष्ठा पुरा प्रोक्ता मयानघ ।<br />ज्ञानयोगेन सांख्यानां कर्मयोगेन योगिनाम् ॥
          </div>
          <div className="shloka-iast">
            loke'smindvividhā niṣṭhā purā proktā mayānagha | jñānayogena sāṃkhyānāṃ karmayogena yoginām ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                In this world, I have described two paths of spiritual practice: the path of knowledge for those inclined toward understanding, and the path of action (karma yoga) for those inclined toward doing.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The opening truth</div>
              <div className="shloka-insight">
                Both are legitimate. The Gita doesn't favor mystics over activists or scholars over soldiers. What matters is that the path matches the nature of the person. You don't abandon your nature — you elevate it. This is the key to everything that follows.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Both knowledge and action are equally valid paths — choose the one that matches your nature."
          </div>
        </div>

        <p>
          This verse is Krishna's opening move. He's not dismissing Arjuna's interest in knowledge. He's saying: yes, both paths exist. But for you — someone born into the warrior caste, trained in action your whole life — attempting to forcibly transform yourself into a wandering ascetic is not spirituality. It's escape. It's using the language of spirituality to justify the desire to run away.
        </p>

        <p>
          The Gita's argument is sophisticated here. It's saying that your nature — your temperament, your gifts, your conditioning — is not an obstacle to overcome. It's the foundation of your spiritual path. The question is not: how do I become someone else? The question is: how do I fully become myself?
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.5 · The Inescapable Fact
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="you-cannot-not-act">You Cannot Avoid Action</h2>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.5</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत् ।<br />कार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः ॥
          </div>
          <div className="shloka-iast">
            na hi kaścitakṣaṇamapi jātu tiṣṭhatyakarmakṛt | kāryate hyavaśaḥ karma sarvaḥ prakṛtijairguṇaiḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                No one can remain without performing some action even for a single moment. Everyone is made to act, helplessly, by the qualities born of material nature.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The refutation of escape</div>
              <div className="shloka-insight">
                This is the Gita's decisive blow against the fantasy of complete inaction. You cannot opt out. Even sitting still involves the action of breathing, thinking, wanting. The body will act. The mind will act. The senses will seek. You are not choosing whether to act — you're choosing whether to act consciously.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "You cannot avoid action — embrace it with awareness instead of denial."
          </div>
        </div>

        <p>
          This verse is ruthless in its honesty. The person who sits in the forest with closed eyes, claiming non-action, is still breathing. Still thinking. Still experiencing. The breath is action. The thought is action. The experience is action. To claim that you are performing no action is not humility — it's self-deception.
        </p>

        <p>
          What Krishna is saying is: the choice has never been between action and inaction. That choice doesn't exist. The only real choice is this: will you perform your actions with consciousness, responsibility, and care? Or will you perform them blindly, in denial, telling yourself that you're not doing what you're obviously doing?
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
          Krishna's answer is <em>yajna</em> — often translated as "sacrifice," but meaning something more fundamental: the transformation of action into an offering. When you stop doing something for yourself and start doing it for something larger, the entire quality of the action changes.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.9</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः ।<br />तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर ॥
          </div>
          <div className="shloka-iast">
            yajñārthātkarmaṇo'nyatra loko'yaṃ karmabandhanaḥ | tadarthaṃ karma kaunteya muktasaṃgaḥ samācara ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Work done as a sacrifice (yajna) does not bind; but work done for selfish purposes is bondage. Perform your duties as an offering, free from attachment.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The transformation</div>
              <div className="shloka-insight">
                The same action, done for yourself, traps you in the results. Done as service, it frees you. This is not magical thinking — it's a precise description of what happens when the ego steps back and something larger becomes the purpose. You're the same person doing the same action, but the quality of your being has shifted.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Freedom comes from serving a purpose larger than yourself."
          </div>
        </div>

        <p>
          This is where the Wisdom app becomes relevant to understanding this teaching. Every day, the app sends a shloka — a verse from the Gita — not for the user to profit from or compete over, but to deepen their understanding of what freedom truly means. The same text, received as knowledge rather than as information. The shift from self-serving to service-oriented is everything.
        </p>

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
          Now Krishna introduces a concept that cuts deeper than personal liberation. It's not enough to act without attachment. You also have to accept that your actions become a standard. Great people, wise people, those with influence — their actions are watched. Their choices become permissions.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.21</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः ।<br />स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥
          </div>
          <div className="shloka-iast">
            yadyadācarati śreṣṭhastattadevetaro janaḥ | sa yatpramāṇaṃ kurute lokastadanuvartate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Whatever a great person does, ordinary people will follow. Whatever standards they set, the world will adopt.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The responsibility</div>
              <div className="shloka-insight">
                This is where personal freedom meets social reality. The desire to withdraw is not just a spiritual failure — it's an abandonment of lokasamgraha, the holding together of the world. If you have gifts, influence, or wisdom, and you choose to hide them out of fear or the desire for peace, the world feels that absence. Others lose a model. Others lose a permission to do their own work.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Your actions shape what others believe is possible — lead with awareness."
          </div>
        </div>

        <p>
          This verse has a sting in it. It means that Arjuna's desire to renounce is not just his own choice. If the greatest warrior of the age puts down his bow and runs to the forest, others will see that and think: renunciation is possible, withdrawal is permissible, the world's problems are not my concern. His refusal to act has ripple effects.
        </p>

        <p>
          Lokasamgraha — the welfare of the world — is not a burden you choose to take on. It's a fact that's already true. You're already setting an example. The only question is whether you'll do it consciously or unconsciously.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.27 · The Ego's Great Claim
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="ego-claims">Who Is the Doer?</h2>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.27</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः ।<br />अहङ्कारविमूढात्मा कर्ताऽहमिति मन्यते ॥
          </div>
          <div className="shloka-iast">
            prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ | ahaṅkāravimūḍhātmā kartā'hamiti manyate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                All actions are performed by the qualities of material nature, but one who is deluded by ego thinks "I am the doer."
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The subtler freedom</div>
              <div className="shloka-insight">
                The ego's claim on action is where suffering begins. The one who thinks they're the sole author of their successes also becomes the sole bearer of their failures. The Gita offers a different accounting: nature acts through us; we are instruments, not owners. This realization — not as belief, but as lived understanding — is freedom.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Freedom begins when you realize you are not the sole doer — nature acts through you."
          </div>
        </div>

        <p>
          This is one of the Gita's most paradoxical teachings. It's saying that while you cannot avoid action, you also cannot truly be the sole author of action. The qualities of nature — sattva, rajas, tamas — are constantly acting through you. Your body is made of these qualities. Your mind is made of these qualities. Your preferences and aversions are made of these qualities.
        </p>

        <p>
          So where is the "I" that is doing? The teaching suggests something much subtler: the true self is a witness to all this action, not a participant in it. You can act fully while knowing, at a deeper level, that the action is happening through you, not by you.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.35 · Your Own Dharma
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="svadharma">Better Your Own Path Imperfectly</h2>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.35</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।<br />स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥
          </div>
          <div className="shloka-iast">
            śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                It is better to perform your own dharma imperfectly than to perform another's dharma perfectly. Even death in one's own dharma is better; another's dharma is full of fear.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The radical teaching</div>
              <div className="shloka-insight">
                This is one of the Gita's most counter-cultural teachings for our age of endless comparison. The impulse to become someone else — to follow another path because it looks better from the outside — is described here as fearful and dangerous. Your path, however imperfect, is yours. It carries authenticity. Another's path, however polished, is a masquerade.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Stay true to your own path — your journey is sacred and unchallengeable."
          </div>
        </div>

        <p>
          This verse is a salve and a challenge simultaneously. It says: you don't need to be perfect at your own dharma. You can stumble. You can fail. You can be clumsy and uncertain. That's still better than being perfect at someone else's calling.
        </p>

        <p>
          But it also says: the temptation to abandon your path for another's is rooted in fear, not wisdom. Why do you want to follow another's path? Because it looks easier from the outside? Because you admire how well they do it? Because you're afraid you'll fail at your own? Those are the wrong reasons. Your dharma is the only authentic ground you have.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 3.37 · The True Enemy
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="desire-anger">What Actually Drives Us to Harm</h2>

        <p>
          Having established that you cannot avoid action and that your action matters, Krishna now identifies what actually corrupts action. It's not action itself. It's not engagement in the world. It's something more specific: desire and anger.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.37</span>
            <span className="shloka-speaker">Speaker: Krishna (in response to Arjuna)</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            काम एष क्रोध एष रजोगुणसमुद्भवः ।<br />महाशनो महापाप्मा विद्ध्येनमिह वैरिणम् ॥
          </div>
          <div className="shloka-iast">
            kāma eṣa krodha eṣa rajoguṇasamudbhavaḥ | mahāśano mahāpāpmā viddhyenamiha vairiṇam ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                It is desire, it is anger, born of the rajo-guna, all-devouring and greatly sinful — know this as the enemy in this world.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The diagnosis</div>
              <div className="shloka-insight">
                After being asked by Arjuna what forces drive a person to sin, Krishna doesn't say ignorance or circumstance. He says desire and anger — specifically, the restless quality of the mind that creates wanting and reaction. These are described as the real enemies: not the Kauravas across the field, but the forces within.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The true battle is within — overcoming desire and anger is the way to lasting peace."
          </div>
        </div>

        <p>
          Here is where Chapter 3 moves from philosophy to psychology. The enemy isn't external. You've been fighting the wrong fight if you think the problem is other people, circumstances, or even your own inaction. The real enemy is the restless wanting in the mind — the craving for what you don't have and the rejection of what you do.
        </p>

        <p>
          Desire is never satisfied. Anger is never resolved by getting what you want. They will consume you from the inside, using action as their tool.
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
          Chapter 3 ends with a structure. It describes the hierarchy of the inner life and shows how freedom is actually constructed.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 3.42–3.43</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः ।<br />मनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु सः ॥<br /><br />एवं बुद्धेः परं बुद्ध्वा संस्तभ्यात्मानमात्मना ।<br />जहि शत्रुं महाबाहो कामरूपं दुरासदम् ॥
          </div>
          <div className="shloka-iast">
            indriyāṇi parāṇyāhurindriyebhyaḥ paraṃ manaḥ | manasastu parā buddhiryo buddheḥ paratastu saḥ ||<br /><br />evaṃ buddheḥ paraṃ buddhvā saṃstabhyātmānamātmanā | jahi śatruṃ mahābāho kāmarūpaṃ durāsadam ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                The senses are higher than the body; the mind is higher than the senses; the intellect is higher than the mind. And higher than the intellect is the Self. Knowing the Self to be superior to the intellect, restrain your lower self with your higher Self, and slay this formidable enemy in the form of desire.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The architecture</div>
              <div className="shloka-insight">
                This is not an escape hierarchy. It's a ladder of control. You don't destroy the body or abandon the senses. You use each higher level to govern the lower. Use the intellect to govern the mind, the Self to govern the intellect. Desire is powerful — but you have something more powerful available to you.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Master your senses through the mind, mind through intellect, intellect through Self."
          </div>
        </div>

        <p>
          The chapter ends not with withdrawal but with mastery. Not with escape but with building a structure inside yourself where the higher can govern the lower. Your body wants. Your senses seek. Your mind desires. Your intellect rationalizes. And beyond all of this is the Self — the witness, the awareness that stands free of all of it.
        </p>

        <p>
          To access that freedom, you don't leave the body behind. You stop being run by it. You don't abandon the mind. You stop being unconscious within it. This is the real renunciation: not abandoning action, but abandoning the delusion that you are only the part of yourself that craves and reacts.
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
              <td>Your words confuse me — teach me clearly.</td>
            </tr>
            <tr>
              <td>3.3</td>
              <td>Krishna</td>
              <td>Two paths: knowledge yoga for scholars, karma yoga for doers.</td>
            </tr>
            <tr>
              <td>3.4</td>
              <td>Krishna</td>
              <td>Freedom comes through wise action, not escape.</td>
            </tr>
            <tr>
              <td>3.5</td>
              <td>Krishna</td>
              <td>You cannot avoid action — nature compels you.</td>
            </tr>
            <tr>
              <td>3.6</td>
              <td>Krishna</td>
              <td>True self-control means aligning thoughts and actions.</td>
            </tr>
            <tr>
              <td>3.7</td>
              <td>Krishna</td>
              <td>Master your senses; act without attachment.</td>
            </tr>
            <tr>
              <td>3.8</td>
              <td>Krishna</td>
              <td>Meaningful action matters — even for basic survival.</td>
            </tr>
            <tr>
              <td>3.9</td>
              <td>Krishna</td>
              <td>Act as an offering; freedom comes from selfless service.</td>
            </tr>
            <tr>
              <td>3.10</td>
              <td>Krishna</td>
              <td>Through selfless action, the world sustains itself.</td>
            </tr>
            <tr>
              <td>3.11</td>
              <td>Krishna</td>
              <td>Through mutual service, you create shared prosperity.</td>
            </tr>
            <tr>
              <td>3.12</td>
              <td>Krishna</td>
              <td>What you receive is meant to be shared.</td>
            </tr>
            <tr>
              <td>3.13</td>
              <td>Krishna</td>
              <td>Freedom comes from selfless giving, not hoarding.</td>
            </tr>
            <tr>
              <td>3.14</td>
              <td>Krishna</td>
              <td>Selfless action nourishes both self and world.</td>
            </tr>
            <tr>
              <td>3.15</td>
              <td>Krishna</td>
              <td>See every action as a sacred offering.</td>
            </tr>
            <tr>
              <td>3.16</td>
              <td>Krishna</td>
              <td>To live only for pleasure is to waste your life.</td>
            </tr>
            <tr>
              <td>3.17</td>
              <td>Krishna</td>
              <td>True contentment is found within, not in external achievement.</td>
            </tr>
            <tr>
              <td>3.18</td>
              <td>Krishna</td>
              <td>Fulfillment comes from selfless action, not results.</td>
            </tr>
            <tr>
              <td>3.19</td>
              <td>Krishna</td>
              <td>Perform your duty without attachment — this leads to freedom.</td>
            </tr>
            <tr>
              <td>3.20</td>
              <td>Krishna</td>
              <td>Selfless action uplifts both self and society.</td>
            </tr>
            <tr>
              <td>3.21</td>
              <td>Krishna</td>
              <td>Great people set the standard; others follow their example.</td>
            </tr>
            <tr>
              <td>3.22</td>
              <td>Krishna</td>
              <td>Do your duty regardless of gain or need.</td>
            </tr>
            <tr>
              <td>3.23</td>
              <td>Krishna</td>
              <td>Your actions shape what others believe is possible.</td>
            </tr>
            <tr>
              <td>3.24</td>
              <td>Krishna</td>
              <td>Your actions echo — lead with awareness.</td>
            </tr>
            <tr>
              <td>3.25</td>
              <td>Krishna</td>
              <td>True wisdom serves through action and humble example.</td>
            </tr>
            <tr>
              <td>3.26</td>
              <td>Krishna</td>
              <td>Lead by example with empathy — inspire, don't impose.</td>
            </tr>
            <tr>
              <td>3.27</td>
              <td>Krishna</td>
              <td>Nature acts through you — the ego claims the credit.</td>
            </tr>
            <tr>
              <td>3.28</td>
              <td>Krishna</td>
              <td>Understanding the nature of action leads to freedom.</td>
            </tr>
            <tr>
              <td>3.29</td>
              <td>Krishna</td>
              <td>True wisdom holds space for others' journeys.</td>
            </tr>
            <tr>
              <td>3.30</td>
              <td>Krishna</td>
              <td>Offer your actions; let go of attachment; find freedom.</td>
            </tr>
            <tr>
              <td>3.31</td>
              <td>Krishna</td>
              <td>Faithful, non-judgmental action leads to freedom.</td>
            </tr>
            <tr>
              <td>3.32</td>
              <td>Krishna</td>
              <td>Humility and openness to wisdom lead to progress.</td>
            </tr>
            <tr>
              <td>3.33</td>
              <td>Krishna</td>
              <td>True transformation comes from working with your nature.</td>
            </tr>
            <tr>
              <td>3.34</td>
              <td>Krishna</td>
              <td>Freedom comes from not letting likes and dislikes rule you.</td>
            </tr>
            <tr>
              <td>3.35</td>
              <td>Krishna</td>
              <td>Your dharma imperfectly is better than another's perfectly.</td>
            </tr>
            <tr>
              <td>3.36</td>
              <td>Arjuna</td>
              <td>What forces drive a person to sin?</td>
            </tr>
            <tr>
              <td>3.37</td>
              <td>Krishna</td>
              <td>Desire and anger are the real enemies — overcome them.</td>
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
              <td>Guard your senses, mind, and intellect — they're gateways of desire.</td>
            </tr>
            <tr>
              <td>3.41</td>
              <td>Krishna</td>
              <td>Mastery over senses is the foundation of wisdom.</td>
            </tr>
            <tr>
              <td>3.42</td>
              <td>Krishna</td>
              <td>The Self is subtler and more powerful than senses, mind, or intellect.</td>
            </tr>
            <tr>
              <td>3.43</td>
              <td>Krishna</td>
              <td>With self-mastery, overcome desire — the formidable inner enemy.</td>
            </tr>
          </tbody>
        </table>

        {/* ── APP CTA ── */}
        <div className="app-cta">
          <div className="app-cta-eyebrow">Free iOS App</div>
          <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
          <p className="app-cta-desc">
            The Wisdom app delivers one Bhagavad Gita verse each day — Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
          </p>
          <div className="app-cta-features">
            <span>✦ Daily shloka in Sanskrit</span>
            <span>✦ Meaning & modern context</span>
            <span>✦ Home screen widget</span>
          </div>
          <a
            href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
            target="_blank"
            rel="noopener"
            className="app-cta-btn"
            data-mp-location="cta"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download on the App Store
          </a>
          <div className="app-cta-sub">Free · iPhone · No account needed</div>
        </div>


        {/* CHAPTER NAV */}
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous Chapter</div>
            <div className="ch-nav-title"><a href="/blogs/bhagwat-geeta-chapter-2">Chapter 2 — Sankhya Yoga</a></div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div className="ch-nav-label">Next Chapter</div>
            <div className="ch-nav-title"><a href="/blogs/bhagwat-geeta-chapter-4">Chapter 4 — Jnana Yoga</a></div>
          </div>
        </div>

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
            <div className="faq-a">Chapter 3, called Karma Yoga or the Yoga of Action, addresses the fundamental question: if spiritual wisdom is better than action, why should one act at all? Krishna argues that no one can avoid action — even for a moment — and that the key lies in performing action as a form of sacred service (yajna) without attachment to results. The chapter also introduces the concept of lokasamgraha — the responsibility of great people to act as examples for the world.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is karma yoga in the Bhagavad Gita?</div>
            <div className="faq-a">Karma yoga is the path of selfless action — performing one's duties without attachment to outcomes, treating every action as an offering to something larger than the self. It is described in Chapter 3 as the appropriate path for most people who are active in the world. Unlike renunciation, which withdraws from action, karma yoga transforms action itself into the spiritual path.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does svadharma mean in the Gita?</div>
            <div className="faq-a">Svadharma means your own duty, your own path, your own nature-driven calling. In 3.35, Krishna says it is better to perform your own dharma imperfectly than to perform another's dharma perfectly. This is not a defense of staying comfortable — it is a teaching about authenticity and the dangers of comparison and imitation.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does the Gita say about avoiding your responsibility?</div>
            <div className="faq-a">The Gita is extremely direct on this. In Chapter 3, Krishna argues that no one can avoid action — attempting to do so is itself an action, driven by desire and self-deception. The desire to escape from one's duties is identified not as wisdom or detachment but as a form of delusion (moha). Arjuna's wish to renounce at the start is diagnosed throughout the chapter as an escape mechanism, not a spiritual achievement.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is lokasamgraha in the Bhagavad Gita?</div>
            <div className="faq-a">Lokasamgraha means "the holding together of the world" or "the welfare of humanity." It appears in Chapter 3 as the reason wise and great people must continue to act — not for personal gain, but because their actions set the standard for what others will do. To withdraw from engagement when one has influence is to abandon a responsibility to the larger good.</div>
          </div>
        </div>
      </article>
    </div>

    {/* ── FOOTER ── */}
    <footer>
      <p>
        Wisdom App · Bhagavad Gita learning for the modern mind · Free on iPhone
      </p>
      <p style={{marginTop: '8px'}}>
        <a href="/">wisdomquotes.in</a>  ·
        <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer_app_store">App Store</a>  ·
        <a href="/privacy">Privacy</a>  ·
        <a href="/terms">Terms</a>  ·
        <a href="mailto:work.ankurshukla@gmail.com">Support</a>
      </p>
    </footer>
  
    

      <BlogTracker pageName="Bhagwat Geeta Chapter 3" />
    </>
  )
}
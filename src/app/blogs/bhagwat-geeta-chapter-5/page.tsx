import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 5 \u2014 Karma Sanyasa Yoga: The Art of Not Being Touched | Wisdom",
  description: "A close reading of Bhagavad Gita Chapter 5 (Adhyay 5) \u2014 29 verses on renunciation, selfless action, equal vision, inner happiness, and the lotus leaf teaching. Sanskrit, IAST, meaning, modern relevance.",
  keywords: "bhagwat geeta chapter 5, bhagavad gita karma sanyasa yoga, bhagwat geeta adhyay 5, lotus leaf gita teaching, sama-darshitvam meaning, inner peace gita, brahma nirvana gita, gita chapter 5 meaning",
  openGraph: {
    title: "Bhagavad Gita Chapter 5 \u2014 Karma Sanyasa Yoga: The Art of Not Being Touched",
    description: "Chapter 5 settles the renunciation vs. action debate. The lotus leaf metaphor. Equal vision. And the quiet recognition that ends in peace.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5",
    siteName: 'Wisdom',
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5" },
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
        .nav-inner { padding: 0 20px; }
        .nav-links { gap: 16px; }
        .nav-links li:not(:last-child) { display: none; }
        .mobile-nav-toggle { display: flex; }
        .shloka-body { grid-template-columns: 1fr; }
        .app-cta { padding: 32px 24px; }
        .pull-quote { padding: 22px 24px; }
        .faq-header, .faq-item { padding-left: 20px; padding-right: 20px; }
        .insights-box, .wisdom-entity { padding: 20px; }
      }
    
`

const schemas = [
  {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Bhagavad Gita Chapter 5 — Karma Sanyasa Yoga: The Art of Not Being Touched",
  "description": "A deep reading of Bhagavad Gita Chapter 5 (Bhagwat Geeta Adhyay 5) — 29 verses on renunciation, selfless action, equal vision, inner happiness, and the lotus leaf teaching.",
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
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5.html"
  },
  "about": {
    "@type": "Book",
    "name": "Bhagavad Gita",
    "author": {
      "@type": "Person",
      "name": "Ved Vyasa"
    }
  },
  "keywords": "Bhagavad Gita Chapter 5, Karma Sanyasa Yoga, sama-darshitvam, lotus leaf gita, brahma nirvana"
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
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5.html"
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
        "text": "Chapter 5, called Karma Sanyasa Yoga (the Yoga of Renunciation of Action), resolves the tension between renunciation and action that has run through Chapters 2, 3, and 4. Krishna says both paths lead to liberation, but karma yoga—selfless action—is superior for most people. The chapter also contains the teaching of sama-darshitvam (equal vision), the lotus leaf metaphor, and ends with the quietly powerful verse 5.29 on knowing the Divine as the friend of all beings."
      }
    },
    {
      "@type": "Question",
      "name": "What is the lotus leaf teaching in the Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Found in verse 5.10. Krishna describes the person who acts with full engagement but without attachment as being like a lotus leaf in water—present in it, sustained by it, but never soaked by it. The leaf remains dry. This is the image for how to be fully in the world—relationships, work, conflict—without being contaminated or claimed by it."
      }
    },
    {
      "@type": "Question",
      "name": "What is 'sama-darshitvam' in the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sama-darshitvam means 'equal vision' or 'equal-sightedness.' Found in 5.18, it describes the state of the truly wise: they see the divine presence equally in a learned brahmin, a cow, an elephant, a dog, and even an outcast. This is not a refusal to notice difference—it is the refusal to let difference determine the fundamental regard you hold for each being."
      }
    },
    {
      "@type": "Question",
      "name": "What does Gita 5.29 mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Verse 5.29 is the closing verse of Chapter 5: 'One who knows me as the enjoyer of all sacrifices, the Lord of all worlds, and the friend of all beings—attains peace.' The key word is suhṛdam—sincere friend. The Gita ends Chapter 5 with the claim that the universe is not indifferent or hostile but fundamentally friendly. This recognition, not any technique, is what produces peace."
      }
    },
    {
      "@type": "Question",
      "name": "How many verses are in Bhagavad Gita Chapter 5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 5 has 29 verses, making it one of the shorter chapters. Despite its brevity, it is philosophically complete—resolving the renunciation-vs-action debate, establishing the standard of equal vision, and offering a theory of inner happiness that is independent of external conditions."
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
          Bhagavad Gita Chapter 5 (Adhyay 5) —<br />
          <em>Karma Sanyasa Yoga</em>
        </h1>
        <p className="article-subtitle">
          How to be fully in the world without being of the world. The lotus leaf. Equal vision. And the quiet recognition that ends in peace.
        </p>
        <div className="article-meta">
          <span className="meta-item">29 verses · Karma Sanyasa Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~12 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 5 of 18</span>
        </div>
      </div>
    </div>

    {/* ── ARTICLE ── */}
    <div className="article-wrap">
      <article className="prose">
        <p className="lead">
          By the time we reach Chapter 5, the question has been asked in every way possible: should I act, or should I renounce? Krishna has answered it in different registers—philosophically, practically, metaphysically. Chapter 5 gives the final direct answer. Both paths work. But karma yoga—the yoga of selfless action—is the better one for most people. And then it goes deeper, into what it looks like to be truly free from within, while still fully in the middle of things. This is perhaps the most practical chapter in the Gita, because it speaks directly to the confusion of anyone trying to live wisely while still living in the world.
        </p>

        <p>
          Chapter 5 is also the shortest complete teaching unit in the Gita—just 29 verses. But those 29 verses contain some of the tradition's most potent metaphors. The lotus leaf. The equal vision that sees the learned and the outcast as expressions of the same consciousness. And the final verse, so quiet in its power, that reframes everything: when you know the Divine as the friend of all beings, peace arrives not as an achievement but as recognition.
        </p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#resolution">The resolution—renunciation vs. action settled</a>
            </li>
            <li>
              <a href="#lotus-leaf">The lotus leaf—being in the world without being of it</a>
            </li>
            <li>
              <a href="#equal-vision">Equal vision—sama-darshitvam</a>
            </li>
            <li>
              <a href="#where-pleasure">Where pleasure leads</a>
            </li>
            <li>
              <a href="#happiness-within">Happiness within</a>
            </li>
            <li>
              <a href="#quiet-ending">The quiet ending—5.29</a>
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

        <h2 id="resolution">Both Paths Lead Home—But One Is Shorter</h2>

        <p>
          Chapter 5 opens with Krishna settling the debate that has animated the last four chapters. By now, Arjuna has heard that he should act without attachment, perform his duty, offer everything to the Divine, and understand the nature of the self. He has also heard teachings that sound like renunciation. So which is it? The answer comes clearly.
        </p>

        {/* SHLOKA 5.2 */}
        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 5.2</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ ।<br />तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥
          </div>
          <div className="shloka-iast">
            saṃnyāsaḥ karmayogaśca niḥśreyasakarāvubhau |<br />tayostu karmasaṃnyāsātkarmayogo viśiṣyate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Both renunciation and the yoga of action lead to the highest good. But of the two, karma yoga is superior to renunciation of action.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The practical answer</div>
              <div className="shloka-insight">
                The resolution of the either/or that has been building since Chapter 2. Both paths work. But for a person still engaged in the world—which most of us are—selfless action is more direct than renunciation. The Gita is saying: don't wait. Begin now, where you are, with what you have.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Selfless action is a greater path to growth than mere withdrawal."
          </div>
        </div>

        {/* SHLOKA 5.3 */}
        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 5.3</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            ज्ञेयः स नित्यसंन्यासी यो न द्वेष्टि न काङ्क्षति ।<br />निर्द्वन्द्वो हि महाबाहो सुखं बन्धात्प्रमुच्यते ॥
          </div>
          <div className="shloka-iast">
            jñeyaḥ sa nityasaṃnyāsī yo na dveṣṭi na kāṅkṣati |<br />nirdvandvo hi mahābāho sukhaṃ bandhātpramucyate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                One who neither hates nor craves for anything is to be known as ever-renounced. Free from all dualities, O Arjuna, one is easily liberated from bondage.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The deeper understanding</div>
              <div className="shloka-insight">
                True renunciation is an internal state, not an external status. A person in business clothes who neither craves for gain nor resents loss is more renounced than a monk who silently covets peace. The Gita is describing a state of mind, not a lifestyle choice.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Freedom is found by rising above desire and aversion."
          </div>
        </div>

        <p>
          This is the Gita's final word on the renunciation question, and it is liberating. You don't need to abandon the world. You need to abandon your desperate grip on it. A householder who acts with detachment is more renounced than an ascetic who secretly wants spiritual prestige. The distinction isn't external. It's the quality of your internal freedom.
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
          Chapter 5 contains one of the tradition's most beautiful and psychologically precise metaphors. The lotus leaf lives in water, draws nourishment from it, and is never wet. The image speaks to the deepest human desire: how to participate fully in life without being contaminated by it.
        </p>

        {/* SHLOKA 5.10 */}
        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 5.10</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः ।<br />लिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥
          </div>
          <div className="shloka-iast">
            brahmaṇyādhāya karmāṇi saṅgaṃ tyaktvā karoti yaḥ |<br />lipyate na sa pāpena padmapatramivāmbhasā ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                One who acts, offering all actions to Brahman and abandoning attachment, is untouched by sin, like a lotus leaf untouched by water.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The teaching within the metaphor</div>
              <div className="shloka-insight">
                The lotus leaf lives in water, draws nourishment from water, and is never wet. You can be fully engaged in the world—relationships, work, creativity, conflict—and remain untouched by its contamination if the attachment is absent. The key is offering—brahmaṇya ādhāya. When you recognize that your actions ultimately belong to something greater than your ego, you become free within them.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Act with surrender; let go of attachment—nothing negative can touch you."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "Like a lotus leaf untouched by water, the wise one acts fully engaged but never contaminated."
          </blockquote>
          <cite>Bhagavad Gita 5.10</cite>
        </div>

        <p>
          This verse is central to understanding how the Wisdom app works in practice. You're not being asked to withdraw. You're being asked to act with clarity about what you can and cannot control. You do the work. You show up. You engage fully. But you recognize that the outcome belongs to forces larger than your personal effort. That recognition, that surrender, is the lotus leaf's dry surface.
        </p>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 5.18 · Equal Vision
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="equal-vision">The Radical Teaching of Equal Sight</h2>

        <p>
          In the middle of Chapter 5 comes one of the Gita's most socially radical verses. It challenges not just spiritual understanding but the fundamental way most people organize their regard for others.
        </p>

        {/* SHLOKA 5.18 */}
        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 5.18</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            विद्याविनयसंपन्ने ब्राह्मणे गवि हस्तिनि ।<br />शुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥
          </div>
          <div className="shloka-iast">
            vidyāvinayasaṃpanne brāhmaṇe gavi hastini |<br />śuni caiva śvapāke ca paṇḍitāḥ samadarśinaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                The truly learned see with equal vision a learned and humble brahmin, a cow, an elephant, a dog, and even a dog-eater.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What equal vision means</div>
              <div className="shloka-insight">
                Equal vision (sama-darshitvam) is not the same as being blind to difference. It means the wise person's fundamental regard for each being is not affected by the being's social status, species, or appearance. This is one of the Gita's most radical social teachings. The dog-eater was the lowest caste in ancient society. To put that figure in the same sentence of regard as a brahmin was revolutionary.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "See the Divine in everyone, regardless of outer differences."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>A note on social consciousness:</strong> The Gita's teaching on equal vision is one of the most important contributions to ethical thought across traditions. It doesn't deny social difference. It refuses to let social difference determine spiritual worth. The divine presence isn't higher in a brahmin and lower in a dog-eater. It's equally present. The wise person sees this.
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
          Chapter 5 contains repeated teachings on one point: your real happiness is not in your circumstances. It is inside you. This isn't denial of external life. It's clarity about where your stability comes from.
        </p>

        {/* SHLOKA 5.24 */}
        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 5.24</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            योऽन्तःसुखोऽन्तरारामस्तथान्तर्ज्योतिरेव यः ।<br />स योगी ब्रह्मनिर्वाणं ब्रह्मभूतोऽधिगच्छति ॥
          </div>
          <div className="shloka-iast">
            yo'ntaḥsukho'ntarārāmastathāntarjyotireva yaḥ |<br />sa yogī brahmanirvāṇaṃ brahmabhūto'dhigacchati ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                One who finds happiness within, who is pleased within, who is illuminated within—that yogi attains Brahman-nirvana and becomes Brahman.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The direction of attention</div>
              <div className="shloka-insight">
                Three "within" words in a single verse: happiness within, delight within, light within. The Gita's consistent message: what you are looking for outside is located inside. This verse is its most concentrated statement of that teaching. You're not seeking something distant. You're recognizing what's already true.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Your truest peace and joy are always inside you, never outside."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 5.29 · The Final Word
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="quiet-ending">The Quiet Recognition That Ends in Peace</h2>

        <p>
          Chapter 5 does something remarkable. It doesn't end with a technique. It doesn't end with a discipline or a practice. It ends with a single fact: when you know the Divine as the friend of all beings, peace arrives. Not as a reward. As a natural consequence.
        </p>

        {/* SHLOKA 5.29 */}
        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 5.29</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् ।<br />सुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति ॥
          </div>
          <div className="shloka-iast">
            bhoktāraṃ yajñatapasāṃ sarvalokamaheśvaram |<br />suhṛdaṃ sarvabhūtānāṃ jñātvā māṃ śāntimṛcchati ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Having known me as the enjoyer of all sacrifices and austerities, the great Lord of all the worlds, and the sincere friend of all living beings—one attains peace.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The ultimate teaching</div>
              <div className="shloka-insight">
                The chapter ends not with a technique or a discipline but with recognition. When you truly know—not believe, not hope, but know—that the universe is friendly, that all effort is received and honored, and that you are not alone in it, peace arrives. Not as a reward. As the natural consequence of that knowledge. The key word is suhṛdam—sincere friend. Not indifferent universe. Not hostile force. Friend.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Trusting the Divine as the friend of all beings leads to true peace."
          </div>
        </div>

        <p>
          This is how Chapter 5 ends. Not with a command. With a promise. When you understand that you are held—that your efforts matter, that your suffering has meaning, that you belong to something larger than your fear—peace becomes inevitable. It's not something you achieve. It's something you recognize. The Wisdom app brings this teaching to you daily because it's the teaching that sustains practice when practice feels difficult. You're not earning salvation. You're remembering that you were never lost.
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
              <td>Confusion before clarity—asking the right question</td>
            </tr>
            <tr>
              <td>5.2</td>
              <td>Krishna</td>
              <td>Selfless action is greater than mere withdrawal</td>
            </tr>
            <tr>
              <td>5.3</td>
              <td>Krishna</td>
              <td>Freedom is found by rising above desire and aversion</td>
            </tr>
            <tr>
              <td>5.4</td>
              <td>Krishna</td>
              <td>Different sincere paths all lead to the same truth</td>
            </tr>
            <tr>
              <td>5.5</td>
              <td>Krishna</td>
              <td>Different paths, walked sincerely, arrive at the same goal</td>
            </tr>
            <tr>
              <td>5.6</td>
              <td>Krishna</td>
              <td>Engaging in duties with the right spirit brings peace—no need to run</td>
            </tr>
            <tr>
              <td>5.7</td>
              <td>Krishna</td>
              <td>Self-mastery and pure intentions free us from the burden of our actions</td>
            </tr>
            <tr>
              <td>5.8</td>
              <td>Krishna</td>
              <td>Your true self is a witness—not the sum of your actions</td>
            </tr>
            <tr>
              <td>5.9</td>
              <td>Krishna</td>
              <td>You are the witnessing Self, not the doer caught in activity</td>
            </tr>
            <tr>
              <td>5.10</td>
              <td>Krishna</td>
              <td>Act with surrender; let go of attachment—nothing negative can touch you</td>
            </tr>
            <tr>
              <td>5.11</td>
              <td>Krishna</td>
              <td>Act selflessly—let go of results, focus on purity of intent</td>
            </tr>
            <tr>
              <td>5.12</td>
              <td>Krishna</td>
              <td>Detach from results—find peace in the work itself</td>
            </tr>
            <tr>
              <td>5.13</td>
              <td>Krishna</td>
              <td>True happiness arises when senses are mastered and action is surrendered</td>
            </tr>
            <tr>
              <td>5.14</td>
              <td>Krishna</td>
              <td>You are not the sole doer—life naturally unfolds through you</td>
            </tr>
            <tr>
              <td>5.15</td>
              <td>Krishna</td>
              <td>Ignorance hides the truth; liberation comes from uncovering it</td>
            </tr>
            <tr>
              <td>5.16</td>
              <td>Krishna</td>
              <td>True knowledge lights up your life and uncovers the divine within</td>
            </tr>
            <tr>
              <td>5.17</td>
              <td>Krishna</td>
              <td>True focus anchored in wisdom leads to freedom from rebirth</td>
            </tr>
            <tr>
              <td>5.18</td>
              <td>Krishna</td>
              <td>See the Divine in everyone, regardless of outer differences</td>
            </tr>
            <tr>
              <td>5.19</td>
              <td>Krishna</td>
              <td>True victory is inner steadiness—equanimity connects you with the Divine</td>
            </tr>
            <tr>
              <td>5.20</td>
              <td>Krishna</td>
              <td>True wisdom is remaining steady no matter what life brings</td>
            </tr>
            <tr>
              <td>5.21</td>
              <td>Krishna</td>
              <td>True happiness is inner—not an external achievement</td>
            </tr>
            <tr>
              <td>5.22</td>
              <td>Krishna</td>
              <td>Short-term pleasures lead to long-term unhappiness—seek what lasts</td>
            </tr>
            <tr>
              <td>5.23</td>
              <td>Krishna</td>
              <td>Mastering desires and anger leads to true happiness</td>
            </tr>
            <tr>
              <td>5.24</td>
              <td>Krishna</td>
              <td>Your truest peace and joy are always inside you, not outside</td>
            </tr>
            <tr>
              <td>5.25</td>
              <td>Krishna</td>
              <td>Peace and liberation blossom when you master yourself and live for others</td>
            </tr>
            <tr>
              <td>5.26</td>
              <td>Krishna</td>
              <td>Lasting peace is found by mastering desire, anger, and the mind</td>
            </tr>
            <tr>
              <td>5.27</td>
              <td>Krishna</td>
              <td>True liberation begins with mastery over mind, senses, and breath</td>
            </tr>
            <tr>
              <td>5.28</td>
              <td>Krishna</td>
              <td>Self-mastery and absence of desire, fear, and anger are keys to freedom</td>
            </tr>
            <tr>
              <td>5.29</td>
              <td>Krishna</td>
              <td>Knowing the Divine as the friend of all beings leads to true peace</td>
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
              Chapter 5, called Karma Sanyasa Yoga (the Yoga of Renunciation of Action), resolves the tension between renunciation and action that has run through Chapters 2, 3, and 4. Krishna says both paths lead to liberation, but karma yoga—selfless action—is superior for most people. The chapter also contains the teaching of sama-darshitvam (equal vision), the lotus leaf metaphor, and ends with the quietly powerful verse 5.29 on knowing the Divine as the friend of all beings.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the lotus leaf teaching in the Gita?</div>
            <div className="faq-a">
              Found in verse 5.10. Krishna describes the person who acts with full engagement but without attachment as being like a lotus leaf in water—present in it, sustained by it, but never soaked by it. The leaf remains dry. This is the image for how to be fully in the world—relationships, work, conflict—without being contaminated or claimed by it.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is "sama-darshitvam" in the Bhagavad Gita?</div>
            <div className="faq-a">
              Sama-darshitvam means "equal vision" or "equal-sightedness." Found in 5.18, it describes the state of the truly wise: they see the divine presence equally in a learned brahmin, a cow, an elephant, a dog, and even an outcast. This is not a refusal to notice difference—it is the refusal to let difference determine the fundamental regard you hold for each being.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Gita 5.29 mean?</div>
            <div className="faq-a">
              Verse 5.29 is the closing verse of Chapter 5: "One who knows me as the enjoyer of all sacrifices, the Lord of all worlds, and the friend of all beings—attains peace." The key word is suhṛdam—sincere friend. The Gita ends Chapter 5 with the claim that the universe is not indifferent or hostile but fundamentally friendly. This recognition, not any technique, is what produces peace.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How many verses are in Bhagavad Gita Chapter 5?</div>
            <div className="faq-a">
              Chapter 5 has 29 verses, making it one of the shorter chapters. Despite its brevity, it is philosophically complete—resolving the renunciation-vs-action debate, establishing the standard of equal vision, and offering a theory of inner happiness that is independent of external conditions.
            </div>
          </div>
        </div>

        {/* CHAPTER NAV */}
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-4" className="ch-nav-title">Chapter 4 — Jnana Yoga</a>
          </div>
          <div style={{textAlign: 'right'}}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-6" className="ch-nav-title">Chapter 6 — Dhyana Yoga</a>
          </div>
        </div>

      </article>
    </div>

    {/* FOOTER */}
    <footer>
      <p>
        Wisdom © 2026. Part of a
        <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
          target="_blank"
          rel="noopener"
          data-mp-location="footer"
          >free iPhone app</a
        >
        that delivers daily Bhagavad Gita shlokas. Made with reverence.</p><p style={{ marginTop: '8px' }}><a href="/">wisdomquotes.in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:work.ankurshukla@gmail.com">Support</a>
      </p>
    </footer>
  
    

      <BlogTracker pageName="Bhagwat Geeta Chapter 5" />
    </>
  )
}
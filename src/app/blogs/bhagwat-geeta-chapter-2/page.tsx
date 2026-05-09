import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 2 \u2014 Sankhya Yoga: The Chapter That Changes Everything | Wisdom",
  description: "A deep reading of Bhagavad Gita Chapter 2 (Adhyay 2) \u2014 all 72 verses of Sankhya Yoga. The eternal soul, karma without attachment, the famous 2.47 verse, and the portrait of the sthitaprajna. Sanskrit, IAST, meaning, and modern relevance.",
  keywords: "bhagwat geeta chapter 2, bhagavad gita chapter 2 sankhya yoga, bhagavad gita 2.47, karma without attachment gita, bhagwat geeta adhyay 2, sthitaprajna meaning, nayam hanti na hanyate, karmanyevadhikaras te meaning",
  openGraph: {
    title: "Bhagavad Gita Chapter 2 \u2014 Sankhya Yoga: The Chapter That Changes Everything",
    description: "Seventy-two verses. One question about the soul. One teaching on action. One portrait of a mind that cannot be broken.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2",
    siteName: 'Wisdom',
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2" },
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
  "headline": "Bhagavad Gita Chapter 2 — Sankhya Yoga: The Chapter That Changes Everything",
  "description": "A deep reading of Bhagavad Gita Chapter 2 (Bhagwat Geeta Adhyay 2) — all 72 verses of Sankhya Yoga with Sanskrit text, IAST transliteration, meaning, and modern relevance.",
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
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2.html"
  },
  "about": {
    "@type": "Book",
    "name": "Bhagavad Gita",
    "author": {
      "@type": "Person",
      "name": "Ved Vyasa"
    }
  },
  "keywords": "Bhagavad Gita Chapter 2, Bhagwat Geeta Chapter 2, Sankhya Yoga, karmanyevadhikaras te, sthitaprajna"
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
      "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-2.html"
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
        "text": "Chapter 2, called Sankhya Yoga or the Yoga of Knowledge, is the philosophical foundation of the entire Gita. It contains Krishna's first direct teachings to Arjuna — on the eternal nature of the soul, the dharma of a warrior, action without attachment to results, and the portrait of the sthitaprajna or person of steady wisdom. It is the longest chapter of the Gita's first half and arguably its most dense."
      }
    },
    {
      "@type": "Question",
      "name": "What is the most important verse in Chapter 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most famous is 2.47 — 'karmany evadhikaras te ma phaleshu kadachana' — often translated as 'you have a right to work, not to the fruits of work.' But 2.20 (the soul is unborn and eternal) and 2.56 (the description of the sthitaprajna) are equally central to the chapter's argument."
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
        "text": "2.47 says: you have the right to act, but not to claim the fruits of your actions; do not let the fruits be your motive; and do not fall into the trap of inaction either. Most people quote only the first half. The verse's fourth clause — not being attached to inaction — is what gives it its full force. The Gita is not advocating detachment as passivity. It is advocating engaged action with equanimity."
      }
    },
    {
      "@type": "Question",
      "name": "How many verses are in Bhagavad Gita Chapter 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 2 has 72 verses, making it one of the longest chapters in the Gita. It is also philosophically the densest — containing the core teachings on the soul, duty, action, and wisdom that the remaining 16 chapters expand upon."
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
          Bhagavad Gita Chapter 2 (Adhyay 2) —<br />
          <em>Sankhya Yoga</em>
        </h1>
        <p className="article-subtitle">
          Seventy-two verses. One question about the soul. One teaching on action. One portrait of a mind that cannot be broken. A close reading.
        </p>
        <div className="article-meta">
          <span className="meta-item">72 verses · Sankhya Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~18 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 2 of 18</span>
        </div>
      </div>
    </div>

    {/* ── ARTICLE ── */}
    <div className="article-wrap">
      <article className="prose">
        <p className="lead">
          Chapter 1 ends in silence. Arjuna has put down his bow, sunk into his chariot, and told Krishna he will not fight. For the first and only time in the Gita, the great archer has surrendered — not to an enemy, but to his own grief. Chapter 2 is what happens next. And what happens is that the entire framework of how to think about life, action, death, and identity gets rebuilt from the ground up.
        </p>

        <p>
          Krishna speaks for the first time. And his opening words are not comforting. They are diagnostic.
        </p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li>
              <a href="#krishna-diagnosis">Krishna's diagnosis — what Arjuna got wrong (2.1–2.11)</a>
            </li>
            <li>
              <a href="#eternal-soul">The teaching on the eternal soul (2.12–2.30)</a>
            </li>
            <li>
              <a href="#dharma-argument">Why Arjuna must fight — the dharma argument (2.31–2.38)</a>
            </li>
            <li>
              <a href="#most-quoted">The most quoted verse in history — 2.47</a>
            </li>
            <li>
              <a href="#avoiding-duty">What avoiding your duty actually costs you</a>
            </li>
            <li>
              <a href="#cascade">From thought to ruin — the cascade (2.62–2.63)</a>
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
          Krishna doesn't begin with philosophy. He begins with a diagnosis. Look at verse 2.11.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.11</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            श्री भगवानुवाच<br />अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।<br />गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥
          </div>
          <div className="shloka-iast">
            śrī bhagavānuvāca<br />aśocyānanvaśocastvaṃ prajñāvādāṃśca bhāṣase |<br />gatāsūnagatāsūṃśca nānuśocanti paṇḍitāḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                The Blessed Lord said: You grieve for those who need not be grieved for, yet speak words of wisdom. The wise grieve neither for the living nor for the dead.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What it reveals</div>
              <div className="shloka-insight">
                Krishna is pointing out a contradiction in Arjuna. He's performing grief while claiming wisdom. He's speaking like a philosopher while acting like someone who has abandoned philosophy. Krishna will spend the next 71 verses resolving this contradiction.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            Wise people do not grieve for what is inevitable; they see beyond temporary changes.
          </div>
        </div>

        <p>
          This is crucial to understand. Krishna's first direct words are not "I understand your pain" or "Let me comfort you." He says, in effect: your grief and your words are in contradiction. You claim to speak wisdom but you're acting as though you believe something you've just said you don't believe. This isn't cruelty. This is clarity. The Gita is fundamentally a text about inconsistency — about seeing where we contradict ourselves.
        </p>

        {/* SECTION 2: ETERNAL SOUL */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.12–2.30 · The Eternal Soul</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="eternal-soul">The Foundation: What Cannot Die</h2>

        <p>
          Before Krishna gives Arjuna any practical instruction, he has to establish what kind of thing Arjuna actually is. This is not abstract philosophy. It is the foundation that makes everything else in the Gita make sense. If you don't understand what the self is, you can't understand why certain actions matter and others don't.
        </p>

        <p>
          Verse 2.20 is the bedrock of the entire Gita.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.20</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः ।<br />अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥
          </div>
          <div className="shloka-iast">
            na jāyate mriyate vā kadācinnāyaṃ bhūtvā bhavitā vā na bhūyaḥ |<br />ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                The soul is never born nor does it ever die. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The philosophical move</div>
              <div className="shloka-insight">
                This verse is the foundation of everything that follows. If the soul is eternal, then grief over death is a category error. If the Self cannot be harmed, then action — even violent action — takes on a completely different moral weight. Krishna is not saying "don't worry, they'll reincarnate." He's saying something more radical: what you think dies never existed to begin with.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            You are eternal — nothing can destroy your true self.
          </div>
        </div>

        <p>
          The logic is elegant. If the soul is unborn and eternal, then "birth" and "death" are not absolute events — they are transitions of the body, not the self. They are like changing clothes.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.22</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि ।<br />तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥
          </div>
          <div className="shloka-iast">
            vāsāṃsi jīrṇāni yathā vihāya navāni gṛhṇāti naro'parāṇi |<br />tathā śarīrāṇi vihāya jīrṇānyanyāni saṃyāti navāni dehī ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Just as a person puts on new garments, giving up old ones, similarly, the soul accepts new material bodies, giving up the old and useless ones.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The metaphor</div>
              <div className="shloka-insight">
                The garment metaphor is one of the Gita's most concrete images. You don't mourn the death of a shirt when you put on a new one. The shirt was never you. Why should you mourn the death of a body? This is not abstract — it's asking you to think about what you're actually grieving.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            You are the eternal soul, not the temporary body.
          </div>
        </div>

        <p>
          And between these two verses, Krishna gives a third piece of advice: endure what comes. Verse 2.14 speaks to the transient nature of sensation — pain and pleasure come and go, heat and cold come and go. Build the capacity to endure them without being destabilized. What you cannot control, you must outlast.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.14</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः ।<br />आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥
          </div>
          <div className="shloka-iast">
            mātrāsparśāstu kaunteya śītoṣṇasukhaduḥkhadāḥ |<br />āgamāpāyino'nityāstāṃstitikṣasva bhārata ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                O Arjuna, the contacts of the senses with objects bring cold and heat, pleasure and pain. They come and go, they are impermanent. Endure them, O descendant of Bharata.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The practice</div>
              <div className="shloka-insight">
                This is the practice: watch what comes and goes. Don't cling to pleasure, don't shrink from pain. Both are temporary. The person who can remain stable while everything changes is the person who has understood the difference between the self and the body.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            Endure life's changing experiences with patience — they are temporary.
          </div>
        </div>

        {/* SECTION 3: DHARMA ARGUMENT */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.31–2.38 · Dharma</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="dharma-argument">The Dharma Argument: Why Arjuna Must Act</h2>

        <p>
          Krishna now shifts from metaphysics to duty. He has established what the self is. Now he establishes what Arjuna's specific obligation is. And the argument is precise: for Arjuna, right now, in this situation, not fighting is the ethical failure.
        </p>

        <div className="highlight-box">
          <p>
            <strong>Understanding dharma in the Gita:</strong> Dharma is not a universal rule. It is the unique duty that arises from who you are, what your role is, and what the moment demands. For Arjuna, who was born as a kshatriya — a warrior — whose entire training has been in the martial arts, whose family has a righteous claim, and whose opponent is himself leading an unrighteous war — the dharma is to fight. This is not "always fight." This is "for you, now, in this exact moment, this is what duty demands."
          </p>
        </div>

        {/* SECTION 4: THE MOST QUOTED VERSE */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verse 2.47–2.48 · Action Without Attachment</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="most-quoted">The Verse Everyone Quotes (and Misunderstands)</h2>

        <p>
          2.47 is the most quoted verse of the Gita. In boardrooms, yoga studios, and self-help books, it shows up as a teaching on detachment. But people almost always quote only the first half and miss the verse's full force. The verse has four parts, and they're all equally important.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.47</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br />मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
          </div>
          <div className="shloka-iast">
            karmaṇyevādhikāraste mā phaleṣu kadācana |<br />mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The four parts</div>
              <div className="shloka-insight">
                This verse is often reduced to "do your duty but don't claim the results." But it has four distinct moves: (1) do your duty — this is positive; (2) don't claim ownership of outcomes — negative; (3) don't make the fruit your motive — negative; (4) don't use this teaching as an excuse for inaction — negative. The fourth part is almost always ignored. The verse is anti-nihilism as much as it is anti-ambition.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            Do your duty sincerely, and let go of expectations for the outcome.
          </div>
        </div>

        <p>
          The verse is saying: you must act. You have a right to action. But you have no right to demand the universe give you the outcome you want. Your job is to act with full effort and integrity. The results are not in your control — and trying to control them is the path to suffering. But not acting — using detachment as an excuse for inaction — is the opposite extreme, and the verse explicitly forbids it.
        </p>

        <p>
          The very next verse clarifies what this looks like in practice.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.48</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय ।<br />सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥
          </div>
          <div className="shloka-iast">
            yogasthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya |<br />siddhyasiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Perform your duties established in yoga, abandoning attachment. Be even-minded in success and failure, for equanimity is called yoga.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What yoga means</div>
              <div className="shloka-insight">
                The very next verse after the famous 2.47 defines yoga not as a physical practice but as equanimity of mind in success and failure. This is the operating system behind detachment. It's not numbness or resignation. It's the capacity to remain clear and functional regardless of whether things go your way or not.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            True yoga is remaining balanced and calm, regardless of success or failure.
          </div>
        </div>

        {/* SECTION 5: AVOIDING YOUR DUTY */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">The Cost of Avoiding Your Responsibility</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="avoiding-duty">What Avoiding Your Duty Actually Costs You</h2>

        <p>
          Arjuna made several sophisticated-sounding arguments for why he shouldn't fight. He said fighting would create sin. He said destroying families would cause chaos. He said it was better to die unarmed. These weren't simplistic objections — they came from a place of genuine moral concern. And Krishna addresses each one not by dismissing Arjuna's worry, but by showing where his logic fails.
        </p>

        <p>
          The Gita is extremely direct here: the desire to step back from your responsibility is often dressed up as moral sensitivity. It looks like wisdom. It sounds like wisdom. But it's a form of self-deception. You're protecting yourself from discomfort and calling it ethics. And the Gita spends all of Chapter 2 and 3 dismantling the specific rationalizations we use to avoid our duty.
        </p>

        <p>
          This is something most modern discussions of the Gita miss entirely. We want it to be about universal truths — don't be attached, don't grasp at outcomes. But it's equally about particularity: you have a specific duty, arising from who you are. And avoiding it is not noble. It's escape. The Gita doesn't let you off the hook.
        </p>

        {/* SECTION 6: CASCADE */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.62–2.63 · The Cascade of Downfall</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="cascade">From Thought to Ruin: The Cascade</h2>

        <p>
          Toward the end of Chapter 2, Krishna gives what is perhaps the Gita's most precise description of psychological collapse. It's a sequence, and understanding it is crucial because it shows you where the break in the chain can happen.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.62</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते ।<br />सङ्गात् संजायते कामः कामात्क्रोधोऽभिजायते ॥
          </div>
          <div className="shloka-iast">
            dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate |<br />saṅgāt saṃjāyate kāmaḥ kāmātkrodho'bhijāyate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                From thinking about sense objects, attachment develops; from attachment, desire is born; from desire, anger arises.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The first link</div>
              <div className="shloka-insight">
                Notice that the cascade begins with thought. You think about something — you dwell on it, replay it, fantasize about it. That dwelling creates attachment. Not the object itself creates attachment, but your repeated thinking about it. This is why the first link is the most important: if you can interrupt it here, the rest of the cascade never begins.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            Dwelling on desires creates attachment; attachment creates anger.
          </div>
        </div>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.63</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः ।<br />स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥
          </div>
          <div className="shloka-iast">
            krodhādbhavati saṃmohaḥ saṃmohātsmṛtivibhramaḥ |<br />smṛtibhraṃśād buddhināśo buddhināśātpraṇaśyati ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                From anger comes delusion; from delusion, loss of memory; from loss of memory, the destruction of intelligence; from the destruction of intelligence, one perishes.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The full cascade</div>
              <div className="shloka-insight">
                The Gita's description of collapse is precise: anger clouds the mind — delusion sets in. You start to forget what matters. Your judgment deteriorates. And finally, your self-destruction follows inevitably. Each step is necessary and flows from the previous one. But they're also preventable — if you can break the chain at any point, you stop the cascade.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            Anger clouds the mind; a clouded mind destroys intelligence.
          </div>
        </div>

        <p>
          This is the Gita's 2500-year-old theory of how the mind falls apart. The sequence is: dwelling on something → attachment → desire → anger (when blocked) → confusion → memory loss → loss of judgment → self-destruction. Each step is both inevitable and avoidable. The key insight is that the interruption point is always the first link: what you allow your mind to dwell on.
        </p>

        {/* SECTION 7: STHITAPRAJNA */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Verses 2.54–2.72 · The Portrait of Steady Wisdom</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="sthitaprajna">The Portrait of a Sthitaprajna</h2>

        <p>
          The chapter reaches its culmination in one of the Gita's most important passages. Arjuna asks Krishna a question that is both simple and profound.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.54</span>
            <span className="shloka-speaker">Speaker: Arjuna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            स्थितप्रज्ञस्य का भाषा समाधिस्थस्य केशव ।<br />स्थितधीः किं प्रभाषेत किमासीत व्रजेत किम् ॥
          </div>
          <div className="shloka-iast">
            sthitaprajñasya kā bhāṣā samādhisthasya keśava |<br />sthitadhīḥ kiṃ prabhāṣeta kimāsīta vrajeta kim ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                O Krishna, what is the description of one whose wisdom is steady, one established in deep absorption? How does such a person speak, how does such a person sit, how does such a person walk?
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The sincere question</div>
              <div className="shloka-insight">
                This is one of the best questions in the entire Gita. Arjuna doesn't ask how to become wise — he asks what it looks like. How can I recognize it? How can I recognize it in myself? He's asking for a portrait, a description of wisdom from the outside. Not an abstract principle, but observable characteristics.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            The sincere seeker asks: what does true inner balance look like?
          </div>
        </div>

        <p>
          And Krishna answers with a portrait that spans verses 2.55 through 2.72. It is not a portrait of a detached saint sitting in a cave. It is a portrait of a person who remains functional, clear, and present even when life is burning around them.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.55</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            प्रजहाति यदा कामान् सर्वान् पार्थ मनोगतान् ।<br />आत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥
          </div>
          <div className="shloka-iast">
            prajahāti yadā kāmān sarvān pārtha manogatān |<br />ātmanyevātmanā tuṣṭaḥ sthitaprajñastadocyate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                One is called a person of steady wisdom when they abandon all desires of the mind, O Arjuna, and remain satisfied in the self alone by the self.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Freedom from desire</div>
              <div className="shloka-insight">
                This is crucial: freedom from desire doesn't mean wanting nothing. It means your sense of wholeness, your sense of being complete, no longer depends on getting anything from the world. You are full without it. The key phrase is "satisfied in the self alone by the self" — your completeness comes from within, not from external acquisition.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            Freedom from desire brings deep contentment.
          </div>
        </div>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 2.56</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः ।<br />वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥
          </div>
          <div className="shloka-iast">
            duḥkheṣvanudvignamanāḥ sukheṣu vigataspṛhaḥ |<br />vītarāgabhayakrodhaḥ sthitadhīrmunirucyate ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                One whose mind is not disturbed even in the threefold miseries, who is not elated when there is happiness, and who is free from attachment, fear and anger, is called a sage of steady mind.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The three freedoms</div>
              <div className="shloka-insight">
                The sthitaprajna has three key characteristics: they are undisturbed in suffering, not overjoyed in pleasure, and free from attachment, fear, and anger. Notice that this is not numbness — it's steadiness. They're still experiencing what happens, but they're not being dragged around by it.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            Steadiness of mind comes from detachment and equanimity, not from the sway of outer circumstances.
          </div>
        </div>

        <p>
          This is the portrait. Not an ascetic. Not someone withdrawn from life. But someone who can remain clear, integrated, and functional regardless of what life brings. Someone who has broken the connection between what happens externally and their internal stability.
        </p>

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
              <td>Even heroes feel lost — help arrives at the darkest hour</td>
            </tr>
            <tr>
              <td>2.2</td>
              <td>Krishna</td>
              <td>In moments of challenge, choose courage over retreat</td>
            </tr>
            <tr>
              <td>2.3</td>
              <td>Krishna</td>
              <td>Do not let fear dictate your actions; rise with courage</td>
            </tr>
            <tr>
              <td>2.4</td>
              <td>Arjuna</td>
              <td>Facing duty can conflict with deep feelings — it's human</td>
            </tr>
            <tr>
              <td>2.5</td>
              <td>Arjuna</td>
              <td>Never achieve your goals at the cost of your principles</td>
            </tr>
            <tr>
              <td>2.6</td>
              <td>Arjuna</td>
              <td>Honest self-doubt is a step before clarity</td>
            </tr>
            <tr>
              <td>2.7</td>
              <td>Arjuna</td>
              <td>Wisdom begins with the willingness to ask for guidance</td>
            </tr>
            <tr>
              <td>2.8</td>
              <td>Arjuna</td>
              <td>Outer achievements cannot heal inner wounds</td>
            </tr>
            <tr>
              <td>2.9</td>
              <td>Sanjaya</td>
              <td>Even the wisest pause before acting; silence signals a search</td>
            </tr>
            <tr>
              <td>2.10</td>
              <td>Krishna</td>
              <td>In darkness, a calm guide restores hope</td>
            </tr>
            <tr>
              <td>2.11</td>
              <td>Krishna</td>
              <td>Wise people do not grieve for the inevitable</td>
            </tr>
            <tr>
              <td>2.12</td>
              <td>Krishna</td>
              <td>You are eternal; your true self never perishes</td>
            </tr>
            <tr>
              <td>2.13</td>
              <td>Krishna</td>
              <td>Our true nature is changeless and eternal</td>
            </tr>
            <tr>
              <td>2.14</td>
              <td>Krishna</td>
              <td>Endure life's changing experiences — they are temporary</td>
            </tr>
            <tr>
              <td>2.15</td>
              <td>Krishna</td>
              <td>Equanimity amidst all experiences brings true strength</td>
            </tr>
            <tr>
              <td>2.16</td>
              <td>Krishna</td>
              <td>The real endures; the unreal fades away</td>
            </tr>
            <tr>
              <td>2.17</td>
              <td>Krishna</td>
              <td>Your true self is eternal and cannot be destroyed</td>
            </tr>
            <tr>
              <td>2.18</td>
              <td>Krishna</td>
              <td>Your true self is beyond destruction — act with courage</td>
            </tr>
            <tr>
              <td>2.19</td>
              <td>Krishna</td>
              <td>Your real self is never harmed by what happens to the body</td>
            </tr>
            <tr>
              <td>2.20</td>
              <td>Krishna</td>
              <td>You are eternal — nothing can destroy your true self</td>
            </tr>
            <tr>
              <td>2.21</td>
              <td>Krishna</td>
              <td>You are the eternal soul; unaffected by change</td>
            </tr>
            <tr>
              <td>2.22</td>
              <td>Krishna</td>
              <td>You are the eternal soul, not the temporary body</td>
            </tr>
            <tr>
              <td>2.23</td>
              <td>Krishna</td>
              <td>Your spirit is unbreakable, beyond all external harm</td>
            </tr>
            <tr>
              <td>2.24</td>
              <td>Krishna</td>
              <td>The soul is indestructible — nothing can harm your innermost self</td>
            </tr>
            <tr>
              <td>2.25</td>
              <td>Krishna</td>
              <td>You are the unchanging soul; do not grieve for passing things</td>
            </tr>
            <tr>
              <td>2.26</td>
              <td>Krishna</td>
              <td>Let go of sorrow over the inevitable; peace lies in acceptance</td>
            </tr>
            <tr>
              <td>2.27</td>
              <td>Krishna</td>
              <td>All things change; acceptance brings peace</td>
            </tr>
            <tr>
              <td>2.28</td>
              <td>Krishna</td>
              <td>Life is a temporary appearance; the true self is beyond birth and death</td>
            </tr>
            <tr>
              <td>2.29</td>
              <td>Krishna</td>
              <td>The soul is a wondrous mystery, beyond easy understanding</td>
            </tr>
            <tr>
              <td>2.30</td>
              <td>Krishna</td>
              <td>The soul is eternal — do not grieve over temporary changes</td>
            </tr>
            <tr>
              <td>2.31</td>
              <td>Krishna</td>
              <td>Honoring your unique duty leads to true fulfillment</td>
            </tr>
            <tr>
              <td>2.32</td>
              <td>Krishna</td>
              <td>Life's unexpected duties can be your greatest opportunities</td>
            </tr>
            <tr>
              <td>2.33</td>
              <td>Krishna</td>
              <td>True peace comes from courageously walking your path</td>
            </tr>
            <tr>
              <td>2.34</td>
              <td>Krishna</td>
              <td>Honor and integrity are worth more than life itself</td>
            </tr>
            <tr>
              <td>2.35</td>
              <td>Krishna</td>
              <td>How you respond to fear determines your standing in life</td>
            </tr>
            <tr>
              <td>2.36</td>
              <td>Krishna</td>
              <td>Do not let harsh words deter you from your true path</td>
            </tr>
            <tr>
              <td>2.37</td>
              <td>Krishna</td>
              <td>Take decisive action — growth comes from commitment, not results</td>
            </tr>
            <tr>
              <td>2.38</td>
              <td>Krishna</td>
              <td>Act with inner balance; be free from anxiety</td>
            </tr>
            <tr>
              <td>2.39</td>
              <td>Krishna</td>
              <td>Act with inner balance; transcend the bonds of your actions</td>
            </tr>
            <tr>
              <td>2.40</td>
              <td>Krishna</td>
              <td>Every sincere effort, no matter how small, is never wasted</td>
            </tr>
            <tr>
              <td>2.41</td>
              <td>Krishna</td>
              <td>True success comes from a focused, unwavering mind</td>
            </tr>
            <tr>
              <td>2.42</td>
              <td>Krishna</td>
              <td>Look beyond outward pleasures; seek lasting wisdom within</td>
            </tr>
            <tr>
              <td>2.43</td>
              <td>Krishna</td>
              <td>Don't let desire for rewards distract you from deeper fulfillment</td>
            </tr>
            <tr>
              <td>2.44</td>
              <td>Krishna</td>
              <td>When the mind obsesses on pleasure, spiritual focus fades</td>
            </tr>
            <tr>
              <td>2.45</td>
              <td>Krishna</td>
              <td>Lasting peace comes from being rooted in your true Self</td>
            </tr>
            <tr>
              <td>2.46</td>
              <td>Krishna</td>
              <td>True wisdom transcends the need for lesser, fragmented knowledge</td>
            </tr>
            <tr>
              <td>2.47</td>
              <td>Krishna</td>
              <td>Do your duty; let go of the outcome</td>
            </tr>
            <tr>
              <td>2.48</td>
              <td>Krishna</td>
              <td>True yoga is remaining balanced in success and failure</td>
            </tr>
            <tr>
              <td>2.49</td>
              <td>Krishna</td>
              <td>Let go of attachment to results; act with wisdom</td>
            </tr>
            <tr>
              <td>2.50</td>
              <td>Krishna</td>
              <td>Find balance in action; let go of attachment to outcomes</td>
            </tr>
            <tr>
              <td>2.51</td>
              <td>Krishna</td>
              <td>Freedom blooms when you let go of demanding specific results</td>
            </tr>
            <tr>
              <td>2.52</td>
              <td>Krishna</td>
              <td>Clarity brings spontaneous peace and detachment</td>
            </tr>
            <tr>
              <td>2.53</td>
              <td>Krishna</td>
              <td>A steady mind leads to true spiritual union</td>
            </tr>
            <tr>
              <td>2.54</td>
              <td>Arjuna</td>
              <td>The sincere seeker asks: what does true inner balance look like?</td>
            </tr>
            <tr>
              <td>2.55</td>
              <td>Krishna</td>
              <td>Freedom from desire brings deep contentment</td>
            </tr>
            <tr>
              <td>2.56</td>
              <td>Krishna</td>
              <td>Steadiness in suffering and restraint in happiness — this is wisdom</td>
            </tr>
            <tr>
              <td>2.57</td>
              <td>Krishna</td>
              <td>A steady mind leads to true wisdom unaffected by life's changes</td>
            </tr>
            <tr>
              <td>2.58</td>
              <td>Krishna</td>
              <td>Withdraw from distractions; wisdom grows in self-control</td>
            </tr>
            <tr>
              <td>2.59</td>
              <td>Krishna</td>
              <td>Inner thirst fades only when quenched by something truly greater</td>
            </tr>
            <tr>
              <td>2.60</td>
              <td>Krishna</td>
              <td>Even the wise must guard their senses</td>
            </tr>
            <tr>
              <td>2.61</td>
              <td>Krishna</td>
              <td>Steady wisdom comes from controlling the senses</td>
            </tr>
            <tr>
              <td>2.62</td>
              <td>Krishna</td>
              <td>Dwelling on desires creates attachment; attachment creates anger</td>
            </tr>
            <tr>
              <td>2.63</td>
              <td>Krishna</td>
              <td>Anger clouds the mind; a clouded mind destroys intelligence</td>
            </tr>
            <tr>
              <td>2.64</td>
              <td>Krishna</td>
              <td>Self-mastery and freedom from attachment lead to lasting peace</td>
            </tr>
            <tr>
              <td>2.65</td>
              <td>Krishna</td>
              <td>A calm, purified mind is the foundation of peace and wisdom</td>
            </tr>
            <tr>
              <td>2.66</td>
              <td>Krishna</td>
              <td>A disciplined mind is the key to unwavering peace</td>
            </tr>
            <tr>
              <td>2.67</td>
              <td>Krishna</td>
              <td>Guarding the mind from the senses preserves wisdom</td>
            </tr>
            <tr>
              <td>2.68</td>
              <td>Krishna</td>
              <td>Master your senses and your mind finds peace</td>
            </tr>
            <tr>
              <td>2.69</td>
              <td>Krishna</td>
              <td>True wisdom means waking up to what the world overlooks</td>
            </tr>
            <tr>
              <td>2.70</td>
              <td>Krishna</td>
              <td>True peace comes from steadiness, not from fulfilling desires</td>
            </tr>
            <tr>
              <td>2.71</td>
              <td>Krishna</td>
              <td>Peace comes from letting go of desire, ownership, and ego</td>
            </tr>
            <tr>
              <td>2.72</td>
              <td>Krishna</td>
              <td>Unshakeable inner wisdom leads to enduring peace and ultimate freedom</td>
            </tr>
          </tbody>
        </table>

        {/* RELATED READING */}
        <div className="related-section">
          <h3>Continue Reading</h3>
          <div className="related-grid">
            <a href="/blogs/bhagwat-geeta-chapter-1" className="related-card">
              <div className="related-card-label">Previous</div>
              <div className="related-card-title">Chapter 1 — Arjuna Vishada Yoga</div>
            </a>
            <a href="/blogs/bhagwat-geeta-chapter-3" className="related-card">
              <div className="related-card-label">Next</div>
              <div className="related-card-title">Chapter 3 — Karma Yoga</div>
            </a>
            <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
              <div className="related-card-label">Deep Dive</div>
              <div className="related-card-title">Karma — What It Actually Means in the Gita</div>
            </a>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Frequently Asked Questions</div>
            <h2>Questions About Chapter 2</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 2 about?</div>
            <div className="faq-a">
              Chapter 2, called Sankhya Yoga or the Yoga of Knowledge, is the philosophical foundation of the entire Gita. It contains Krishna's first direct teachings to Arjuna — on the eternal nature of the soul, the dharma of a warrior, action without attachment to results, and the portrait of the sthitaprajna or person of steady wisdom. It is the longest chapter of the Gita's first half and arguably its most dense.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the most important verse in Chapter 2?</div>
            <div className="faq-a">
              The most famous is 2.47 — "karmany evadhikaras te ma phaleshu kadachana" — often translated as "you have a right to work, not to the fruits of work." But 2.20 (the soul is unborn and eternal) and 2.56 (the description of the sthitaprajna) are equally central to the chapter's argument.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is "sthitaprajna" in the Bhagavad Gita?</div>
            <div className="faq-a">
              Sthitaprajna literally means "one of steady wisdom" — sthita means steady or stable, prajna means wisdom or intelligence. Arjuna asks Krishna in verse 2.54 what such a person looks like from the outside. Krishna answers across verses 2.55–2.72: they are not disturbed by sorrow, not elated by pleasure, free from attachment, fear, and anger, and their senses are under control like a tortoise withdrawing its limbs.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 2.47 mean?</div>
            <div className="faq-a">
              2.47 says: you have the right to act, but not to claim the fruits of your actions; do not let the fruits be your motive; and do not fall into the trap of inaction either. Most people quote only the first half. The verse's fourth clause — not being attached to inaction — is what gives it its full force. The Gita is not advocating detachment as passivity. It is advocating engaged action with equanimity.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How many verses are in Bhagavad Gita Chapter 2?</div>
            <div className="faq-a">
              Chapter 2 has 72 verses, making it one of the longest chapters in the Gita. It is also philosophically the densest — containing the core teachings on the soul, duty, action, and wisdom that the remaining 16 chapters expand upon.
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
  
    

      <BlogTracker pageName="Bhagwat Geeta Chapter 2" />
    </>
  )
}
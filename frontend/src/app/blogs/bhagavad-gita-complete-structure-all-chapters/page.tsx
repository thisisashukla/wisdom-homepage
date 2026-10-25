import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Bhagavad Gita's 18 Chapters: How They Fit Together & How It Ends",
  description: "The Gita's 18 chapters (adhyays) in 3 parts of 6, from Arjuna's despair in Ch 1 to Krishna's last instruction, surrender, in 18.66.",
  keywords: "bhagavad gita structure, bhagavad gita all chapters summary, bhagavad gita 18 chapters, how is bhagavad gita organised, bhagavad gita complete guide, bhagavad gita story arc, bhagavad gita vishwarupa, bhagavad gita chapter summary, gita 18.66 meaning, bhagavad gita arc, bhagavad gita 18 chapters summary, bhagavad gita storyline, bhagavad gita 18.66 meaning, bhagavad gita plot, bhagavad gita overview",
  openGraph: {
    title: "Bhagavad Gita's 18 Chapters: How They Fit Together & How It Ends",
    description: "The Gita's 18 chapters (adhyays) in 3 parts of 6, from Arjuna's despair in Ch 1 to Krishna's last instruction, surrender, in 18.66.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-complete-structure-all-chapters",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/assets/gita-montage.webp', width: 1200, height: 675, alt: 'The Bhagavad Gita across 18 chapters' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Bhagavad Gita's 18 Chapters: How They Fit Together & How It Ends",
    description: "The Gita's 18 chapters (adhyays) in 3 parts of 6, from Arjuna's despair in Ch 1 to Krishna's last instruction, surrender, in 18.66.",
    images: ['https://wisdomquotes.in/assets/gita-montage.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-complete-structure-all-chapters",
    languages: {
      'en': "https://wisdomquotes.in/blogs/bhagavad-gita-complete-structure-all-chapters",
      'en-IN': "https://wisdomquotes.in/blogs/bhagavad-gita-complete-structure-all-chapters",
      'x-default': "https://wisdomquotes.in/blogs/bhagavad-gita-complete-structure-all-chapters",
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
      html { scroll-behavior: smooth; scroll-padding-top: 88px; }
      body {
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.7;
        -webkit-font-smoothing: antialiased;
      }
      a { color: inherit; text-decoration: none; }
      img { display: block; max-width: 100%; }

      /* BREADCRUMB */
      .breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
      .breadcrumb-inner {
        max-width: 1100px; margin: 0 auto; padding: 10px 28px;
        font-size: 12px; color: var(--text-dimmer);
        display: flex; gap: 8px; align-items: center;
      }
      .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
      .breadcrumb-inner a:hover { color: var(--gold-light); }
      .bc-sep { opacity: 0.4; }

      /* HERO */
      .article-hero {
        background: var(--bg-warm);
        padding: 64px 28px 56px;
        border-bottom: 1px solid var(--border);
        position: relative; overflow: hidden;
      }
      .article-hero::before {
        content: "गीता";
        position: absolute; right: -10px; bottom: -30px;
        font-family: "Noto Sans Devanagari", serif;
        font-size: 220px; color: rgba(200, 136, 30, 0.04);
        line-height: 1; pointer-events: none; user-select: none;
      }
      .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
      .chapter-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(200,136,30,0.1); border: 1px solid rgba(200,136,30,0.28);
        color: var(--gold-light); font-size: 11px; font-weight: 700;
        letter-spacing: 0.12em; text-transform: uppercase;
        padding: 5px 14px; border-radius: 100px; margin-bottom: 20px;
      }
      .chapter-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 6px var(--gold); flex-shrink: 0; }
      .article-title {
        font-family: "Playfair Display", Georgia, serif;
        font-size: clamp(28px, 4vw, 50px);
        font-weight: 700; color: var(--gold-light);
        line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 14px;
      }
      .article-title em { font-style: italic; color: #fff; }
      .article-subtitle {
        font-size: 17px; color: var(--text-dim); font-weight: 300;
        margin-bottom: 32px; line-height: 1.65; max-width: 620px;
      }
      .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
      .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
      .meta-sep { color: var(--border); }

      /* ARTICLE */
      .article-wrap { max-width: var(--max); margin: 0 auto; padding: 60px 28px 80px; }

      .prose h2 {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 26px; font-weight: 700; color: var(--gold-light);
        margin: 52px 0 16px; line-height: 1.25;
      }
      .prose h2[id] { scroll-margin-top: 88px; }
      .prose h2 em { font-style: italic; color: #fff; }
      .prose h3 {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 19px; font-weight: 700; color: var(--text);
        margin: 32px 0 12px;
      }
      .prose p { font-size: 16.5px; line-height: 1.78; color: var(--text-dim); margin-bottom: 20px; }
      .prose p:last-child { margin-bottom: 0; }
      .prose strong { font-weight: 600; color: var(--text); }
      .prose em { font-style: italic; }
      .lead { font-size: 19px; line-height: 1.7; color: var(--text); font-weight: 300; margin-bottom: 28px; }

      /* TOC */
      .toc {
        background: var(--bg-card); border: 1px solid var(--border);
        border-left: 3px solid var(--gold);
        border-radius: 0 12px 12px 0; padding: 20px 24px; margin: 36px 0 40px;
      }
      .toc-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 12px; }
      .toc-list { list-style: none; display: flex; flex-direction: column; gap: 7px; counter-reset: toc-counter; }
      .toc-list li { counter-increment: toc-counter; display: flex; align-items: baseline; gap: 10px; }
      .toc-list li::before { content: counter(toc-counter); font-family: "Inter", sans-serif; font-size: 10px; color: var(--text-dimmer); min-width: 14px; }
      .toc-list a { font-size: 13.5px; color: var(--text-dim); line-height: 1.4; transition: color 0.15s; }
      .toc-list a:hover { color: var(--gold-light); }

      /* SHLOKA CARD */

      /* PULL QUOTE */
      .pull-quote {
        margin: 40px 0; padding: 28px 32px;
        border-left: 3px solid var(--gold);
        background: rgba(200,136,30,0.05); border-radius: 0 12px 12px 0;
      }
      .pull-quote blockquote { font-family: "Playfair Display", serif; font-size: 21px; font-style: italic; color: var(--gold-light); line-height: 1.5; margin-bottom: 10px; }
      .pull-quote cite { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); font-style: normal; font-weight: 600; }

      /* CHAPTER IMAGE */
      .chapter-image {
        margin: 32px 0 36px; border-radius: 14px; overflow: hidden;
        border: 1px solid var(--border);
        box-shadow: 0 4px 32px rgba(0,0,0,0.4);
      }
      .chapter-image img {
        width: 100%; height: auto; display: block;
        object-fit: cover;
      }
      .chapter-image figcaption {
        padding: 10px 18px; background: var(--bg-card);
        font-size: 11.5px; color: var(--text-dimmer); letter-spacing: 0.04em;
        font-style: italic; border-top: 1px solid var(--border);
      }

      /* SECTION DIVIDER */
      .section-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0 40px; }
      .section-divider-line { flex: 1; height: 1px; background: var(--border); }
      .section-divider-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-dimmer); white-space: nowrap; font-weight: 600; }

      /* HIGHLIGHT BOX */
      .highlight-box {
        background: rgba(200,136,30,0.05); border: 1px solid var(--border);
        border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0;
        padding: 20px 24px; margin: 28px 0;
      }
      .highlight-box p { font-size: 15px; line-height: 1.7; color: var(--text-dim); }
      .highlight-box strong { color: var(--gold-light); }

      /* ACT HEADER — special component for this blog */
      .act-header {
        background: linear-gradient(135deg, var(--maroon-mid) 0%, var(--maroon) 100%);
        border: 1px solid rgba(200,136,30,0.3);
        border-radius: 14px; padding: 28px 32px; margin: 52px 0 8px;
        position: relative; overflow: hidden;
      }
      .act-header::before {
        font-family: "Noto Sans Devanagari", serif;
        font-size: 120px; color: rgba(200,136,30,0.06);
        position: absolute; right: 12px; bottom: -16px;
        line-height: 1; pointer-events: none; user-select: none;
      }
      .act-header.act1::before { content: "कर्म"; }
      .act-header.act2::before { content: "भक्ति"; }
      .act-header.act3::before { content: "ज्ञान"; }
      .act-number { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); font-weight: 700; margin-bottom: 8px; }
      .act-title { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700; color: var(--gold-light); line-height: 1.3; margin-bottom: 6px; }
      .act-title em { font-style: italic; color: #fff; }
      .act-chapters { font-size: 12.5px; color: var(--text-dimmer); }

      /* CHAPTER ROW — compact chapter summaries */
      .chapter-row {
        display: flex; gap: 16px; padding: 16px 0;
        border-bottom: 1px solid var(--border);
        align-items: flex-start;
      }
      .chapter-row:last-child { border-bottom: none; }
      .ch-num {
        font-size: 11px; font-weight: 700; color: var(--gold);
        letter-spacing: 0.08em; min-width: 28px; padding-top: 2px;
      }
      .ch-content {}
      .ch-name { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
      .ch-name span { font-size: 11.5px; color: var(--text-dimmer); font-weight: 400; margin-left: 6px; }
      .ch-desc { font-size: 13.5px; line-height: 1.65; color: var(--text-dim); }

      /* INSIGHTS BOX */
      .insights-box {
        background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px;
        padding: 28px 32px; margin: 48px 0;
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

      /* FAQ */
      .faq-section {
        background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px;
        overflow: hidden; margin: 48px 0;
      }
      .faq-section[id] { scroll-margin-top: 88px; }
      .faq-header { padding: 28px 32px 20px; border-bottom: 1px solid var(--border); }
      .faq-header-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .faq-header h2 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700; color: var(--gold-light); margin: 0; }
      .faq-item { padding: 22px 32px; border-bottom: 1px solid var(--border); }
      .faq-item:last-child { border-bottom: none; }
      .faq-q { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 10px; line-height: 1.4; }
      .faq-a { font-size: 14.5px; line-height: 1.72; color: var(--text-dim); }

      /* APP CTA */
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

      /* RELATED */
      .related-section { margin-bottom: 60px; }
      .related-section h3 { font-family: "Playfair Display", serif; font-size: 20px; font-weight: 700; color: var(--gold-light); margin-bottom: 20px; }
      .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
      .related-card {
        background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 10px; padding: 18px 20px; text-decoration: none;
        transition: border-color 0.15s, background 0.15s, transform 0.15s;
      }
      .related-card:hover { border-color: var(--gold); background: var(--bg-card-hover); transform: translateY(-2px); }
      .related-card-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-dimmer); font-weight: 600; margin-bottom: 6px; }
      .related-card-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; }

      /* FOOTER */
      footer {
        background: var(--bg-alt); border-top: 1px solid var(--border);
        padding: 32px 28px; text-align: center;
        font-size: 12px; letter-spacing: 0.06em; color: var(--text-dimmer);
      }
      footer a { color: var(--text-dimmer); transition: color 0.15s; }
      footer a:hover { color: var(--gold-light); }
      footer span { color: var(--gold); }

      /* RESPONSIVE */
      @media (max-width: 700px) {
        .article-hero { padding: 44px 20px 40px; }
        .article-wrap { padding: 40px 20px 60px; }
        .app-cta { padding: 32px 24px; }
        .pull-quote { padding: 22px 24px; }
        .faq-header, .faq-item { padding-left: 20px; padding-right: 20px; }
        .act-header { padding: 22px 20px; }
      }
    
`

const schemas = [
  {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How the Bhagavad Gita's 18 Chapters Fit Together",
  "description": "How Krishna's discourse is organised across 18 chapters, from Arjuna's crisis in Chapter 1 to the surrender of 18.66.",
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
    "logo": {
      "@type": "ImageObject",
      "url": "https://wisdomquotes.in/assets/new-light-logo.webp"
    }
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://wisdomquotes.in/assets/gita-montage.webp",
    "width": 1200,
    "height": 675
  },
  "datePublished": "2026-05-05",
  "dateModified": "2026-05-05",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://wisdomquotes.in/blogs/bhagavad-gita-complete-structure-all-chapters.html"
  },
  "about": {
    "@type": "Book",
    "name": "Bhagavad Gita",
    "author": {
      "@type": "Person",
      "name": "Ved Vyasa"
    }
  },
  "keywords": "Bhagavad Gita structure, all 18 chapters summary, bhagavad gita arc, gita 18.66, vishwarupa chapter 11"
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
      "name": "The Bhagavad Gita's Complete Structure",
      "item": "https://wisdomquotes.in/blogs/bhagavad-gita-complete-structure-all-chapters.html"
    }
  ]
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is the Bhagavad Gita structured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Bhagavad Gita's 18 chapters fall into three broad movements. Chapters 1–6 (often called the karma kanda) deal with action, duty and the self. In Chapters 7–12 (the bhakti kanda) Krishna describes his own nature, and in Chapter 11 he shows Arjuna the Vishwarupa, his cosmic form. Chapters 13–18 (the jnana kanda) go back over the earlier teachings: the field and its knower, the three gunas, the divine and demonic natures, and the summing-up of Chapter 18."
      }
    },
    {
      "@type": "Question",
      "name": "What is the climax of the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chapter 11 — the Vishwarupa Darshana Yoga — is the Gita's dramatic climax. Arjuna asks to see Krishna's universal form. He is given divine sight. He sees the entire cosmos — all gods, all beings, all time — within Krishna. He sees warriors already dead before the battle begins. He sees Krishna as Kala, time, devouring all (11.32). Arjuna is overwhelmed and begs Krishna to return to his human form. Krishna's last instruction, 18.66, comes seven chapters later."
      }
    },
    {
      "@type": "Question",
      "name": "What is the final teaching of the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The final teaching is 18.66: 'Abandon all dharmas and take refuge in me alone. I will free you from all sin. Do not grieve.' Krishna introduces it in 18.64 as sarva-guhyatamam, the secret of secrets. After 17 chapters of philosophy, yoga and the cosmic vision, his last instruction asks Arjuna to trust him."
      }
    },
    {
      "@type": "Question",
      "name": "What are the three sections of the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Gita is traditionally divided into three hexads: (1) Chapters 1–6, the Karma Kanda, on action, the self and meditation; (2) Chapters 7–12, the Bhakti Kanda, on devotion, Krishna's nature and the cosmic form; (3) Chapters 13–18, the Jnana Kanda, on the field and its knower, the gunas and the summing-up. The divisions overlap, but they track a move from practical ethics to devotion to philosophy."
      }
    },
    {
      "@type": "Question",
      "name": "Why does the Bhagavad Gita have 18 chapters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Mahabharata (of which the Gita is a part) is structured around the number 18 — 18 days of battle, 18 army divisions, 18 books. The Gita's 18 chapters match that pattern."
      }
    },
    {
      "@type": "Question",
      "name": "What does Arjuna say at the end of the Bhagavad Gita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arjuna's final words are verse 18.73: 'My delusion is destroyed. By your grace, my memory has returned. I am free of doubt. I am steady. I will act according to your word.' At the end of Chapter 1 Arjuna sits down in his chariot and drops his bow (1.47). In 18.73 he says he will do as Krishna says. The armies are the same ones."
      }
    }
  ]
}
]

export default function CompleteStructurePage() {
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
        The Gita's Complete Structure
      </div>
    </div>

    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          All 18 Chapters · The Complete Arc
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          How the Bhagavad Gita&apos;s <em>18 Chapters</em> Fit Together
        </h1>
        <p className="article-subtitle">
          How the 18 chapters fit together, from Arjuna sitting down in his chariot in Chapter 1 to Krishna&apos;s last instruction in 18.66 and Arjuna&apos;s answer in 18.73.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">All 18 Chapters</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~14 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Complete structural guide</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>
    </div>

    <div className="article-wrap">
      <article className="prose">

        <figure className="chapter-image">
          <img
            src="/assets/gita-montage.webp"
            alt="The Bhagavad Gita across 18 chapters, from Arjuna's collapse to the cosmic Vishwarupa to Krishna's last instruction"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>The Vishwarupa, the cosmic form at the heart of the Gita&apos;s argument</figcaption>
        </figure>

        <p className="lead">
          Many people read the Bhagavad Gita as a book of quotes: pick a verse, put it on a poster. Read in order, it is an argument with a setup, a buildup, a climax in Chapter 11 and a short final instruction in 18.66.
        </p>

        <p>
          Krishna saves his biggest claims for later. Over eighteen chapters he talks Arjuna, a sharp man who has fallen apart, through a new account of the self, action, death and the universe. At the start Arjuna sits in his chariot and won&apos;t lift his bow. At the end (18.73) he says: <em>my confusion is gone, I will do as you say.</em>
        </p>

        <p>
          Each step depends on the one before it, and knowing the order helps with any single verse.
        </p>

        {/* TOC */}
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#setup">The setup: why the conversation happens</a></li>
            <li><a href="#ch11">Chapter 11: the cosmic form</a></li>
            <li><a href="#patterns">Five things Krishna does across all 18 chapters</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
          </ol>
        </nav>

        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">The Setup</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="setup">Before Krishna Speaks a Single Word of Philosophy</h2>

        <p>
          The Bhagavad Gita&apos;s first verse is spoken by Dhritarashtra, the blind king, who sits far from the battlefield and asks his advisor Sanjaya for news.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 1.1"
          speaker="Dhritarashtra"
          sanskrit="धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः । मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥"
          iast="dharmakṣetre kurukṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||"
          essence="Dhritarashtra asks what his sons and the Pandavas did at Kurukshetra."
        />

        <p>
          Krishna&apos;s teaching in Chapter 2 starts with the atman, because what he later says about action, duty and attachment rests on it. If the self Arjuna grieves for is eternal, &quot;loss&quot; means something else. If the atman cannot be killed, Arjuna&apos;s arguments against the battle have to be looked at again.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.20"
          speaker="Krishna"
          sanskrit="न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥"
          iast="na jāyate mriyate vā kadācinnāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||"
          essence="The self is never born and never dies; it is not killed when the body is."
        />

        <p>
          With the metaphysical foundation in place, Krishna moves to the practical. Chapter 2 gives us 2.47, one of the Gita&apos;s best-known verses. It comes after the atman teaching, and it leans on it: if you are not the outcome, you can act without clinging to it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          speaker="Krishna"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          essence="Your right is to the work, never to its results, and don't cling to inaction."
        />

        <p>
          Chapter 8 says that what you hold in mind at death shapes what follows (8.5–6). Chapter 9 gives what Krishna calls the &quot;royal secret&quot; (9.2): <em>all beings rest in me, yet I am not in them</em> (9.4), and <em>I accept whatever is offered with love, a leaf, a flower, a fruit, some water</em> (9.26).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 9.26"
          speaker="Krishna"
          sanskrit="पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति । तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥"
          iast="patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati | tadahaṃ bhaktyupahṛtamaśnāmi prayatātmanaḥ ||"
          essence="Krishna accepts a leaf, flower, fruit or water offered to him with devotion."
        />

        <p>
          Chapter 10 is Krishna's catalogue of his own divine manifestations. He is the Ganga among rivers, the Himalaya among mountains, the lion among animals, the thunderbolt among weapons, the letter A among alphabets, the spring among seasons. Whatever has unusual glory, beauty or power, he says, comes from a spark of his splendour (10.41). The chapter trains the reader to look for him in what they see.
        </p>

        <div className="highlight-box">
          <p><strong>The narrative logic of Chapters 7–10:</strong> Krishna spends four chapters describing his own nature, each claim larger than the last. This prepares Arjuna for what he asks to see in Chapter 11.</p>
        </div>

        {/* CHAPTER 11 */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">The Climax · Chapter 11</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="ch11">Chapter 11: The Cosmic Form</h2>

        <figure className="chapter-image">
          <img
            src="/assets/chapter11.webp"
            alt="The Vishwarupa — Krishna's cosmic universal form as described in Bhagavad Gita Chapter 11"
            width="1200"
            height="675"
            loading="lazy"
          />
          <figcaption>The Vishwarupa, the cosmic form Krishna reveals to Arjuna in Chapter 11</figcaption>
        </figure>

        <p>
          After four chapters of description, Arjuna asks to see Krishna&apos;s universal form for himself (11.3–4).
        </p>

        <p>
          Krishna gives him divine sight (11.8). Arjuna sees the entire cosmos, every god, every being, every world, past and future, contained within one form. He sees the warriors arrayed on both sides of the battle already consumed, already dead. He sees time itself in the shape of his charioteer.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.12, Sanjaya Describes the Vision"
          speaker="Sanjaya (narrating)"
          sanskrit="दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता । यदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः ॥"
          iast="divi sūryasahasrasya bhavedyugapadutthitā | yadi bhāḥ sadṛśī sā syādbhāsastasya mahātmanaḥ ||"
          essence="If a thousand suns rose at once in the sky, that light might match his."
        />

        {/* PATTERNS SECTION */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">Structural Patterns</div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="patterns">Five Things Krishna Does Across All 18 Chapters</h2>

        <div className="insights-box">
          <div className="insights-label">How Krishna&apos;s discourse is built</div>
          <ul className="insights-list">
            <li><strong>He builds up to his largest claims.</strong> &quot;I am time, the destroyer of worlds&quot; (11.32) comes in Chapter 11, after ten chapters of teaching have prepared for it. The Vishwarupa arrives as the end point of an argument.</li>
            <li><strong>He answers the question behind the question.</strong> Arjuna asks: should I fight? Krishna answers that Arjuna has misunderstood death, the self and action, so the question itself is badly posed. He works on the questioner before he answers the question.</li>
            <li><strong>He moves between the cosmic and the personal.</strong> After the claims of 9.4–10 comes 9.26 (I accept even a leaf). After the philosophy of Chapters 13–17 comes 18.65 (you are dear to me). The teaching stays neither abstract nor sentimental for long.</li>
            <li><strong>He never removes Arjuna's choice.</strong> At the end of the entire discourse, Krishna explicitly says (18.63): &quot;I have told you wisdom more secret than any secret. Reflect on it fully, then do as you wish.&quot; Near the end of the discourse, the decision is handed back to Arjuna.</li>
            <li><strong>The ending is quieter than the climax.</strong> Chapter 11 is the Gita&apos;s big spectacle. Krishna&apos;s last instruction, 18.66, is one short verse of personal assurance, and the Gita itself closes with Sanjaya&apos;s words in 18.78.</li>
          </ul>
        </div>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the hexad names (karma, bhakti, jnana), 9.4 (all beings rest in Krishna, he is not in them), the 1.1 note, and the description of how the Gita ends (18.66 is Krishna&apos;s last instruction; 18.78 is the last verse); copy edited.</p>
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Gita Complete Structure"} />


        {/* FAQ */}

      <FeedbackWidget pageType="blog" />
        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Frequently Asked Questions</div>
            <h2>Questions About the Gita's Structure</h2>
          </div>

          <div className="faq-item">
            <div className="faq-q">How is the Bhagavad Gita structured?</div>
            <div className="faq-a">The Gita's 18 chapters fall into three broad movements. Chapters 1–6 deal with action, duty, and the self, the practical foundation. In Chapters 7–12 Krishna describes his own nature, and in Chapter 11 he shows Arjuna the Vishwarupa, his cosmic form. Chapters 13–18 go back over the earlier teachings: the field and its knower, the three gunas, the divine and demonic natures, and the summing-up of Chapter 18.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">What is the climax of the Bhagavad Gita?</div>
            <div className="faq-a">Chapter 11, the Vishwarupa Darshana Yoga, is the Gita's dramatic climax. Arjuna asks to see Krishna's universal form. He is given divine sight. He sees the entire cosmos, all gods, all beings, all time, within Krishna. He sees warriors already dead before the battle begins. He sees Krishna as Kala, time (11.32). Arjuna is overwhelmed and begs Krishna to return to his human form. Krishna&apos;s last instruction, 18.66, comes seven chapters later.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">What is the final teaching of the Bhagavad Gita?</div>
            <div className="faq-a">The final teaching is 18.66: &quot;Abandon all dharmas and take refuge in me alone. I will free you from all sin. Do not grieve.&quot; Krishna introduces it in 18.64 as sarva-guhyatamam, the secret of secrets. After 17 chapters of philosophy, yoga and the cosmic vision, his last instruction asks Arjuna to trust him.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">What are the three sections of the Bhagavad Gita?</div>
            <div className="faq-a">The Gita is traditionally divided into three hexads: (1) Chapters 1–6, the Karma Kanda, on action, the self and meditation; (2) Chapters 7–12, the Bhakti Kanda, on devotion, Krishna&apos;s nature and the cosmic form; (3) Chapters 13–18, the Jnana Kanda, on the field and its knower, the gunas and the summing-up. The divisions overlap, but they track a move from practical ethics to devotion to philosophy.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">What does Arjuna say at the end of the Bhagavad Gita?</div>
            <div className="faq-a">Arjuna's final words are verse 18.73: "My delusion is destroyed. By your grace, my memory has returned. I am free of doubt. I am steady. I will act according to your word." At the end of Chapter 1 Arjuna sits down in his chariot and drops his bow (1.47). In 18.73 he says he will do as Krishna says. The armies are the same ones.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">Why does the Gita keep going after Chapter 11?</div>
            <div className="faq-a">Arjuna has seen what Krishna is, but that doesn&apos;t tell him how to relate to Krishna or how to live. Chapter 12 opens with Arjuna asking which kind of devotee is better, and Chapters 13–18 go back over the earlier teachings before ending in the surrender of 18.66.</div>
          </div>
        </div>

        {/* RELATED */}
        <div className="related-section">
          <h3>Read Each Chapter In Depth</h3>
          <div className="related-grid">
            <a href="/blogs/bhagwat-geeta-chapter-1" className="related-card">
              <div className="related-card-label">Chapter 1 · 47 verses</div>
              <div className="related-card-title">Arjuna Vishada Yoga: When the Warrior Sat Down</div>
            </a>
            <a href="/blogs/bhagwat-geeta-chapter-2" className="related-card">
              <div className="related-card-label">Chapter 2 · 72 verses</div>
              <div className="related-card-title">Sankhya Yoga: The Self and Action</div>
            </a>
            <a href="/blogs/bhagwat-geeta-chapter-3" className="related-card">
              <div className="related-card-label">Chapter 3 · 43 verses</div>
              <div className="related-card-title">Karma Yoga: Why You Cannot Stop Acting</div>
            </a>
            <a href="/blogs/bhagwat-geeta-chapter-4" className="related-card">
              <div className="related-card-label">Chapter 4 · 42 verses</div>
              <div className="related-card-title">Jnana Karma Sanyasa Yoga: The Fire That Burns Karma</div>
            </a>
            <a href="/blogs/bhagwat-geeta-chapter-5" className="related-card">
              <div className="related-card-label">Chapter 5 · 29 verses</div>
              <div className="related-card-title">Karma Sanyasa Yoga: Acting Without Being Touched</div>
            </a>
            <a href="/blogs/bhagavad-gita-for-beginners" className="related-card">
              <div className="related-card-label">Beginner's Guide</div>
              <div className="related-card-title">Where to Start Reading the Bhagavad Gita</div>
            </a>
          </div>
        </div>

      </article>
    </div>

    <footer>
      <p>Wisdom App · <span>One Gita verse a day for 7 days, read aloud</span> · Week 1 free on iPhone</p>
      <p style={{marginTop: '8px'}}>
        <a href="/">wisdomquotes.in</a>  · 
        <a href="/blogs">Blog</a>  · 
        <a href={appStoreUrl('web_blog_footer')} target="_blank" rel="noopener" data-mp-location="footer">Get the app</a>
      </p>
    </footer>

    

      <BlogTracker pageName="Gita Complete Structure" />
    </>
  )
}
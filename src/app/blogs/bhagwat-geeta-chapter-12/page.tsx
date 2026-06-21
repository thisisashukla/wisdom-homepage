import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 12 Summary – Key Verses & Meaning (Bhakti Yoga)",
  description: "Bhagavad Gita Chapter 12 (Bhakti Yoga), 20 verses on devotion, the four-step ladder of practice, and the qualities of the devotee Krishna calls dear.",
  keywords: "bhagwat geeta chapter 12, bhagavad gita bhakti yoga, bhagwat geeta adhyay 12, form versus formless gita, 12.8 mind on me, qualities of a devotee gita, abhyasa yoga gita, renounce fruits of action, Bhakti Yoga meaning Bhagavad Gita, form vs formless worship Bhagavad Gita, Bhagavad Gita 12.13 qualities of a devotee, Bhagavad Gita 12.18 sama shatrau ca mitre ca, what is bhakti according to Bhagavad Gita, four-step practice ladder Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 12 Summary – Key Verses & Meaning (Bhakti Yoga)",
    description: "Bhagavad Gita Chapter 12, how a devotee actually lives. The four-step ladder. The qualities of the one Krishna calls dear.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter12.webp", width: 1200, height: 675, alt: "A devotee with hands folded, mind steady, surrounded by ordinary life, Chapter 12 of the Bhagavad Gita, Bhakti Yoga, defines the devotee not by belief but by character." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 12 Summary – Key Verses & Meaning (Bhakti Yoga)",
    description: "Bhagavad Gita Chapter 12, how a devotee actually lives. The four-step ladder. The qualities of the one Krishna calls dear.",
    images: ["https://wisdomquotes.in/assets/chapter12.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13" },
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

      .breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
      .breadcrumb-inner { max-width: 1100px; margin: 0 auto; padding: 10px 28px;
        font-size: 12px; color: var(--text-dimmer); display: flex; gap: 8px; align-items: center; }
      .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
      .breadcrumb-inner a:hover { color: var(--gold-light); }
      .bc-sep { opacity: 0.4; }

      .article-hero {
        background: var(--bg-warm); padding: 64px 28px 56px;
        border-bottom: 1px solid var(--border); position: relative; overflow: hidden;
      }
      .article-hero::before {
        content: "अध्याय १२";
        position: absolute; right: -10px; bottom: -20px;
        font-family: "Noto Sans Devanagari", serif; font-size: 180px;
        color: rgba(200, 136, 30, 0.04); line-height: 1; pointer-events: none; user-select: none;
      }
      .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

      .chapter-badge { display: inline-flex; align-items: center; gap: 8px;
        background: rgba(200, 136, 30, 0.1); border: 1px solid rgba(200, 136, 30, 0.28);
        color: var(--gold-light); font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
        text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 20px; }
      .chapter-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold);
        box-shadow: 0 0 6px var(--gold); flex-shrink: 0; }
      .article-title { font-family: "Playfair Display", Georgia, serif;
        font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: var(--gold-light);
        line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 12px; }
      .article-title em { font-style: italic; color: #fff; }
      .article-subtitle { font-size: 17px; color: var(--text-dim); font-weight: 300;
        margin-bottom: 32px; line-height: 1.65; max-width: 580px; }
      .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
      .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
      .meta-sep { color: var(--border); }

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

      .prose h2 { font-family: "Playfair Display", Georgia, serif; font-size: 26px; font-weight: 700;
        color: var(--gold-light); margin: 52px 0 16px; line-height: 1.25; }
      .prose h2[id], .faq-section[id], .related-reading[id] { scroll-margin-top: 88px; }
      .prose h2 em { font-style: italic; color: #fff; }

      .prose h3 { font-family: "Playfair Display", Georgia, serif; font-size: 19px; font-weight: 700;
        color: var(--text); margin: 32px 0 12px; }

      .prose p { font-size: 16.5px; line-height: 1.78; color: var(--text-dim); margin-bottom: 20px; }
      .prose p:last-child { margin-bottom: 0; }
      .prose strong { font-weight: 600; color: var(--text); }
      .prose em { font-style: italic; }
      .lead { font-size: 19px; line-height: 1.7; color: var(--text); font-weight: 300; margin-bottom: 28px; }

      .toc { background: var(--bg-card); border: 1px solid var(--border);
        border-left: 3px solid var(--gold); border-radius: 0 12px 12px 0;
        padding: 20px 24px; margin: 36px 0 40px; }
      .toc-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase;
        font-weight: 700; color: var(--gold); margin-bottom: 12px; }
      .toc-list { list-style: none; display: flex; flex-direction: column; gap: 7px; counter-reset: toc-counter; }
      .toc-list li { counter-increment: toc-counter; display: flex; align-items: baseline; gap: 10px; }
      .toc-list li::before { content: counter(toc-counter); font-family: "Inter", sans-serif;
        font-size: 10px; font-variant-numeric: tabular-nums; color: var(--text-dimmer); min-width: 14px; }
      .toc-list a { font-size: 13.5px; color: var(--text-dim); line-height: 1.4; transition: color 0.15s; }
      .toc-list a:hover { color: var(--gold-light); }

      .pull-quote { margin: 40px 0; padding: 28px 32px; border-left: 3px solid var(--gold);
        background: rgba(200, 136, 30, 0.05); border-radius: 0 12px 12px 0; }
      .pull-quote blockquote { font-family: "Playfair Display", serif; font-size: 21px;
        font-style: italic; color: var(--gold-light); line-height: 1.5; margin-bottom: 10px; }
      .pull-quote cite { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
        color: var(--gold); font-style: normal; font-weight: 600; }

      .section-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0 40px; }
      .section-divider-line { flex: 1; height: 1px; background: var(--border); }
      .section-divider-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
        color: var(--text-dimmer); white-space: nowrap; font-weight: 600; }

      .highlight-box { background: rgba(200, 136, 30, 0.05); border: 1px solid var(--border);
        border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0;
        padding: 20px 24px; margin: 28px 0; }
      .highlight-box p { font-size: 15px; line-height: 1.7; color: var(--text-dim); }
      .highlight-box strong { color: var(--gold-light); }

      .verse-table { width: 100%; border-collapse: collapse; font-size: 13.5px;
        margin: 28px 0 40px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
      .verse-table thead tr { background: rgba(200, 136, 30, 0.08); }
      .verse-table thead th { text-align: left; padding: 12px 16px; font-size: 9.5px;
        letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); font-weight: 700; }
      .verse-table tbody td { padding: 10px 16px; border-bottom: 1px solid var(--border);
        vertical-align: top; line-height: 1.55; color: var(--text-dim); }
      .verse-table tbody tr:last-child td { border-bottom: none; }
      .verse-table tbody tr:hover { background: var(--bg-card); }
      .verse-table td:first-child { font-size: 12px; color: var(--gold); font-weight: 600; white-space: nowrap; }

      .faq-section { background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px; overflow: hidden; margin: 48px 0; }
      .faq-header { padding: 28px 32px 20px; border-bottom: 1px solid var(--border); }
      .faq-header-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .faq-header h2 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700;
        color: var(--gold-light); line-height: 1.3; margin: 0; }
      .faq-item { padding: 22px 32px; border-bottom: 1px solid var(--border); }
      .faq-item:last-child { border-bottom: none; }
      .faq-q { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 10px; line-height: 1.4; }
      .faq-a { font-size: 14.5px; line-height: 1.72; color: var(--text-dim); }

      .related-reading { background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px; padding: 28px 32px;
        margin: 48px 0; }
      .related-reading-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .related-reading h2 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700;
        color: var(--gold-light); line-height: 1.3; margin: 0 0 18px; }
      .related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .related-card { display: block; background: var(--bg); border: 1px solid var(--border);
        border-radius: 10px; padding: 14px 18px; transition: border-color 0.15s, background 0.15s, transform 0.15s; }
      .related-card:hover { border-color: var(--gold); background: var(--bg-card-hover); transform: translateY(-2px); }
      .related-card-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
        color: var(--text-dimmer); font-weight: 600; margin-bottom: 4px; }
      .related-card-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; }

      .app-cta { background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
        border: 1px solid rgba(200, 136, 30, 0.25); border-top: 3px solid var(--gold);
        border-radius: 20px; padding: 44px 48px 40px; margin: 48px 0 60px;
        text-align: center; position: relative; overflow: hidden; }
      .app-cta::before { content: "भक्ति"; position: absolute; top: -14px; right: -8px;
        font-family: "Noto Sans Devanagari", sans-serif; font-size: 130px;
        color: rgba(200, 136, 30, 0.05); line-height: 1; pointer-events: none; user-select: none; }
      .app-cta-eyebrow { display: inline-flex; align-items: center; background: rgba(200, 136, 30, 0.12);
        border: 1px solid rgba(200, 136, 30, 0.35); color: var(--gold-light); font-size: 11px;
        font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 14px;
        border-radius: 20px; margin-bottom: 20px; }
      .app-cta-headline { font-family: "Playfair Display", serif;
        font-size: clamp(22px, 3vw, 30px); font-weight: 700; color: var(--text);
        line-height: 1.25; margin-bottom: 14px; }
      .app-cta-desc { font-size: 15px; color: var(--text-dim); line-height: 1.7;
        max-width: 480px; margin: 0 auto 22px; }
      .app-cta-features { display: flex; gap: 6px 18px; justify-content: center;
        flex-wrap: wrap; margin-bottom: 28px; }
      .app-cta-features span { font-size: 13px; color: var(--gold-light); opacity: 0.8; }
      .app-cta-btn { display: inline-flex; align-items: center; gap: 10px;
        background: var(--gold); color: #120505; text-decoration: none;
        padding: 15px 34px; border-radius: 12px; font-size: 16px; font-weight: 700;
        letter-spacing: -0.01em; transition: all 0.2s;
        box-shadow: 0 4px 22px rgba(200, 136, 30, 0.3); }
      .app-cta-btn:hover { background: var(--gold-light); transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(200, 136, 30, 0.5); }
      .app-cta-sub { font-size: 12px; color: rgba(245, 232, 204, 0.35); margin-top: 14px; letter-spacing: 0.04em; }

      .chapter-nav { display: flex; justify-content: space-between; align-items: center;
        gap: 16px; padding: 20px 0; border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border); margin: 0 0 40px; }
      .ch-nav-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
        color: var(--text-dimmer); font-weight: 600; margin-bottom: 4px; }
      .ch-nav-title { font-size: 14px; font-weight: 600; color: var(--text); }

      footer { background: var(--bg-alt); border-top: 1px solid var(--border);
        padding: 32px 28px; text-align: center; font-size: 12px;
        letter-spacing: 0.06em; color: var(--text-dimmer); }
      footer a { color: var(--text-dimmer); transition: color 0.15s; }
      footer a:hover { color: var(--gold-light); }
      footer span { color: var(--gold); }

      @media (max-width: 700px) {
        .article-hero { padding: 44px 20px 40px; }
        .article-wrap { padding: 40px 20px 60px; }
        .app-cta { padding: 32px 24px; }
        .pull-quote { padding: 22px 24px; }
        .faq-header, .faq-item { padding-left: 20px; padding-right: 20px; }
        .related-grid { grid-template-columns: 1fr; }
      }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": [
      "Article",
      "LearningResource"
    ],
    "headline": "Bhagavad Gita Chapter 12 — Bhakti Yoga: How a Devotee Actually Lives",
    "description": "Bhagavad Gita Chapter 12 — Bhakti Yoga. All 20 verses on devotion, the four-step ladder of practice, and the qualities of the devotee dear to Krishna.",
    "alternativeHeadline": "Bhagavad Gita Chapter 12 (Bhakti Yoga) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter12.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12"
    },
    "about": [
      {
        "@type": "Book",
        "name": "Bhagavad Gita",
        "author": {
          "@type": "Person",
          "name": "Ved Vyasa"
        },
        "url": "https://wisdomquotes.in/gita"
      },
      {
        "@type": "Person",
        "name": "Krishna",
        "url": "https://en.wikipedia.org/wiki/Krishna"
      },
      {
        "@type": "Person",
        "name": "Arjuna",
        "url": "https://en.wikipedia.org/wiki/Arjuna"
      }
    ],
    "keywords": "bhagwat geeta chapter 12, bhagavad gita bhakti yoga, bhagwat geeta adhyay 12, form versus formless gita, 12.8 mind on me, qualities of a devotee gita, abhyasa yoga gita, renounce fruits of action, Bhakti Yoga meaning Bhagavad Gita, form vs formless worship Bhagavad Gita, Bhagavad Gita 12.13 qualities of a devotee, Bhagavad Gita 12.18 sama shatrau ca mitre ca, what is bhakti according to Bhagavad Gita, four-step practice ladder Bhagavad Gita",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2636,
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "learningResourceType": "Article",
    "educationalLevel": "General",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".lead",
        ".shloka-meaning",
        ".shloka-essence"
      ]
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
        "item": "https://wisdomquotes.in/blogs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bhagavad Gita Chapter 12 — Bhakti Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 12 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 12, called Bhakti Yoga (the Yoga of Devotion), is the shortest chapter in the Gita — only 20 verses — and one of its most practical. Arjuna asks whether worship of the personal form or the formless absolute is higher. Krishna favours the personal form as more accessible for embodied beings, gives a four-step ladder for those who find devotion difficult (12.8-11), and devotes the last seven verses to a portrait of the kind of devotee he calls dear — measured by interpersonal qualities, not by external religiosity."
        }
      },
      {
        "@type": "Question",
        "name": "Is worship of form better than worship of the formless in the Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 12.2 Krishna says those who fix their minds on his personal form, full of trust, are 'the most united' in his view. In 12.5 he explains why: the unmanifest is harder for embodied beings to reach. The Gita does not deny the validity of the formless path — it acknowledges its difficulty. For most people, devotion to a form provides a workable handle that the formless absolute does not."
        }
      },
      {
        "@type": "Question",
        "name": "What is the four-step ladder of Bhagavad Gita Chapter 12?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 12.8 through 12.11 give a four-rung ladder for the seeker. (1) Fix the mind on Krishna directly. (2) If you cannot, practice — abhyāsa-yoga. (3) If practice is too hard, work for the sake of the Divine: offer your actions. (4) If even that is too hard, renounce the fruits of action. Each rung accepts that not everyone can stand on the rung above. The Gita is meeting the reader where they actually are."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 12.12 mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 12.12 says: knowledge is better than practice; meditation is better than knowledge; renunciation of the fruits of action is better than meditation — and peace follows immediately from such renunciation. The surprising line is the last one. The seemingly lowest rung — letting go of outcomes — turns out to be the most direct path to peace, because the clinging was itself the suffering."
        }
      },
      {
        "@type": "Question",
        "name": "What are the qualities of a devotee in Chapter 12?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 12.13-19 give a long portrait of the devotee Krishna calls dear. Hates no being. Friendly. Compassionate. Free of possessiveness. Equal in pleasure and pain. Forgiving. Disturbs no one, is disturbed by no one. Expects nothing. Equal to friend and enemy, honour and dishonour. The portrait is striking because it is entirely about character and interpersonal texture — not about external religiosity."
        }
      },
      {
        "@type": "Question",
        "name": "What does it mean to be 'equal to friend and enemy' in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 12.18, Krishna describes the devotee as equal to friend and enemy. The teaching is not about being cold or impartial. It is about being unhijacked. The devotee still cares about the friend and acts well toward the enemy — but neither the friend's affection nor the enemy's hostility takes over the inner life. Equanimity, in the Gita's sense, is the freedom to love deeply without being captured by what others are doing back."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.2",
    "text": "The Blessed One said: those who fix their minds on me, who worship me with constant union, filled with supreme trust — they, in my view, are the most united.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 12, Verse 2"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रीभगवानुवाच / मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते । / श्रद्धया परयोपेतास्ते मे युक्ततमा मताः ॥",
      "śrī bhagavān uvāca | / mayy āveśya mano ye māṃ nitya-yuktā upāsate | / śraddhayā parayopetās te me yuktatamā matāḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.2"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.8",
    "text": "Fix your mind on me alone. Place your discerning mind in me. You will then live in me, beyond doubt.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 12, Verse 8"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मय्येव मन आधत्स्व मयि बुद्धिं निवेशय । / निवसिष्यसि मय्येव अत ऊर्ध्वं न संशयः ॥",
      "mayy eva mana ādhatsva mayi buddhiṃ niveśaya | / nivasiṣyasi mayy eva ata ūrdhvaṃ na saṃśayaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.8"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.12",
    "text": "Knowledge is better than mere practice; meditation is better than knowledge; renouncing the fruits of action is better than meditation — and from such renunciation, peace follows at once.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 12, Verse 12"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रेयो हि ज्ञानमभ्यासाज्ज्ञानाद्ध्यानं विशिष्यते । / ध्यानात्कर्मफलत्यागस्त्यागाच्छान्तिरनन्तरम् ॥",
      "śreyo hi jñānam abhyāsāj jñānād dhyānaṃ viśiṣyate | / dhyānāt karma-phala-tyāgas tyāgāc chāntir anantaram ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.12"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.13",
    "text": "One who hates no being, who is friendly and compassionate, free of possessiveness and ego, equal in pain and pleasure, forgiving — always content, self-controlled, firm in resolve, with mind and discernment offered to me — that devotee is dear to me.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 12, Verse 13"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च । / निर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥ / सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः । / मय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः ॥",
      "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca | / nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī || / santuṣṭaḥ satataṃ yogī yatātmā dṛḍha-niścayaḥ | / mayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.13"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.15",
    "text": "The one who disturbs no one in the world, and is disturbed by no one — free of delight, envy, fear, agitation — that one is dear to me.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 12, Verse 15"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः । / हर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः ॥",
      "yasmān nodvijate loko lokān nodvijate ca yaḥ | / harṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.15"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.18",
    "text": "Equal to enemy and friend, equal in honour and dishonour, equal in heat and cold, in pleasure and pain — free of attachment.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 12, Verse 18"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "समः शत्रौ च मित्रे च तथा मानापमानयोः । / शीतोष्णसुखदुःखेषु समः सङ्गविवर्जितः ॥",
      "samaḥ śatrau ca mitre ca tathā mānāpamānayoḥ | / śītoṣṇa-sukha-duḥkheṣu samaḥ saṅga-vivarjitaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12#verse-12.18"
  }
]

export default function ChapterPage12() {
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
          Bhagavad Gita Chapter 12
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 12 · 20 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 12 (Adhyay 12):<br />
            <em>Bhakti Yoga</em>
          </h1>
          <p className="article-subtitle">
            After the cosmic vision, the shortest chapter in the Gita. The four-step ladder for when meditation is too hard. And the most surprising definition of devotion, measured not by how loudly you pray, but by how lightly you walk in other people's lives.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">20 verses · Bhakti Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~11 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 12 of 18</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <div className="article-wrap">
        <article className="prose">
          <figure className="chapter-image">
            <img
              src="/assets/chapter12.webp"
              alt="A devotee with hands folded, mind steady, surrounded by ordinary life — Chapter 12 of the Bhagavad Gita, Bhakti Yoga, defines the devotee not by belief but by character."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 12 follows the cosmic form of Chapter 11 the way silence follows a thunderclap. After 55 verses of overwhelming theophany, the Gita's next chapter is the shortest in the entire book, only 20 verses, and almost domestic in tone. Krishna stops describing his vast metaphysical body and starts describing what a person who loves him actually looks like, day to day. The chapter is, in a way, the Gita's quiet answer to the question Chapter 11 raised: now that you have seen the largeness, what does ordinary life look like?
        </p>

        <p>
          The chapter opens with a question Arjuna has been holding for some time. Which is better, to worship the Divine as a form, with all the warmth of relationship, or to worship the formless absolute? Krishna's answer is gentler and more practical than most readers expect. He says: the formless path is harder for embodied beings. Therefore, if you are in a body, devotion to a form is more accessible. Then he gives a four-step ladder for anyone who finds even devotion difficult. And then, for the last seven verses, he describes the character of the devotee he calls dear. The portrait is not what most religious traditions describe. It is quieter, more interpersonal, more about the texture of how you live than about the loudness of your belief.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#form-or-formless">Form or formless, Arjuna's old question</a></li>
            <li><a href="#ladder">The four-step ladder, 12.8 to 12.11</a></li>
            <li><a href="#renunciation-of-results">Peace follows immediately, 12.12</a></li>
            <li><a href="#character">What a devotee actually looks like, 12.13</a></li>
            <li><a href="#no-disturbance">The one who disturbs no one, 12.15</a></li>
            <li><a href="#equanimity">Equal to friend and enemy, 12.18</a></li>
            <li><a href="#nectar">The nectar-like teaching, 12.20</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 12.1–12.5 · The Old Question
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="form-or-formless">Form or Formless, Which Devotion Is Higher?</h2>

        <p>
          Arjuna opens Chapter 12 with a question that has been animating Indian philosophical debate for two and a half thousand years. Some devotees worship the personal form of the Divine, with attributes, with a name, with relationship. Others worship the imperishable, formless, unmanifest absolute. Which path is better? Which devotees are more accomplished in yoga?
        </p>

        <p>
          Krishna's answer might surprise readers who expect the formless path to be praised as more advanced. He says, instead, that those who fix their minds on him with supreme trust are, in his view, the most united. Then in 12.5, he adds the practical observation: the formless path is harder for embodied beings, because the unmanifest is, by definition, difficult for a mind that lives inside a body to reach. The verse does not say the formless path is wrong. It says it is harder. For most of us, in most lives, devotion to a form is the accessible door.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 12.2"
          speaker="Krishna"
          sanskrit="श्रीभगवानुवाच मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते । श्रद्धया परयोपेतास्ते मे युक्ततमा मताः ॥"
          iast="śrī bhagavān uvāca | mayy āveśya mano ye māṃ nitya-yuktā upāsate | śraddhayā parayopetās te me yuktatamā matāḥ ||"
          essence="Full trust and steady remembrance make devotion complete."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 12.5"
          speaker="Krishna"
          sanskrit="क्लेशोऽधिकतरस्तेषामव्यक्तासक्तचेतसाम् । अव्यक्ता हि गतिर्दुःखं देहवद्भिरवाप्यते ॥"
          iast="kleśo'dhikataras teṣām avyaktāsakta-cetasām | avyaktā hi gatir duḥkhaṃ dehavadbhir avāpyate ||"
          essence="The subtlest path is hardest for a body-bound mind."
        />

        <div className="highlight-box">
          <p>
            <strong>What this means for the modern reader:</strong> Equanimity is not coldness. It is the opposite. Coldness happens when your circuit is so overloaded by your own reactivity that you have nothing left for the other person. Equanimity is what lets you stay present, available, and unhijacked, even when the other person is doing their best to hijack you. That is the kind of presence Krishna calls dear.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 12.20 · The Closing Verse
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="nectar">The Nectar-Like Teaching</h2>

        <p>
          Chapter 12 closes with a verse that names the whole portrait as <em>dharmyāmṛtam idam</em>, this nectar of dharma. The teaching just given is described not as instruction but as nectar: something that nourishes, that heals, that you would want to drink. Those who live by it, with trust, take refuge in Krishna, and are exceedingly dear to him.
        </p>

        <p>
          Notice the word <em>śraddadhānāḥ</em>, those with śraddhā (trust). Trust is what makes the teaching nectar rather than just information. Without trust, the verse remains a description of a difficult kind of person. With trust, the description becomes a possibility, something one can move toward, slowly, over time. The chapter ends, in this way, the way many of the Gita's most important chapters end. Not with a command. With an invitation.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 12.20"
          speaker="Krishna"
          sanskrit="ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते । श्रद्दधाना मत्परमा भक्तास्तेऽतीव मे प्रियाः ॥"
          iast="ye tu dharmyāmṛtam idaṃ yathoktaṃ paryupāsate | śraddadhānā mat-paramā bhaktās te'tīva me priyāḥ ||"
          meaning="Those devotees who, full of trust, taking me as the supreme, live by this nectar-like dharma that I have spoken, they are exceedingly dear to me."
          insightLabel="Why the teaching is called nectar"
          insight="Nectar (amṛta) is the substance of immortality in Indian mythology. The Gita calls the qualities of devotion nectar-like because they produce, in the person who embodies them, a kind of inner deathlessness: a steadiness no event can finally undo. The chapter ends with the promise that this nectar is available to anyone willing to trust."
          essence="Faithful practice turns devotion into closeness."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 20 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>12.1</td><td>Arjuna</td><td>Devotion can face the divine as form or as formless reality</td></tr>
            <tr><td>12.2</td><td>Krishna</td><td>Full trust and steady remembrance make devotion complete</td></tr>
            <tr><td>12.3</td><td>Krishna</td><td>The deepest devotion reaches what never changes</td></tr>
            <tr><td>12.4</td><td>Krishna</td><td>Reach the divine by mastering yourself and caring for everyone</td></tr>
            <tr><td>12.5</td><td>Krishna</td><td>The subtlest path is hardest for a body-bound mind</td></tr>
            <tr><td>12.6</td><td>Krishna</td><td>Total devotion turns every action into worship</td></tr>
            <tr><td>12.7</td><td>Krishna</td><td>A mind fixed on Krishna is met by Krishna's saving presence</td></tr>
            <tr><td>12.8</td><td>Krishna</td><td>A divided mind settles when both thought and feeling rest in the divine</td></tr>
            <tr><td>12.9</td><td>Krishna</td><td>Practice can lead the mind where stillness cannot yet go</td></tr>
            <tr><td>12.10</td><td>Krishna</td><td>Offered action can succeed where practice still fails</td></tr>
            <tr><td>12.11</td><td>Krishna</td><td>Let go of the result; the action itself is the practice</td></tr>
            <tr><td>12.12</td><td>Krishna</td><td>Peace begins when you stop clinging to what your action produces</td></tr>
            <tr><td>12.13</td><td>Krishna</td><td>Devotion shows up as friendliness, forgiveness, and emotional steadiness</td></tr>
            <tr><td>12.14</td><td>Krishna</td><td>Real devotion is a steady mind already placed beyond itself</td></tr>
            <tr><td>12.15</td><td>Krishna</td><td>True devotion leaves no wake of disturbance</td></tr>
            <tr><td>12.16</td><td>Krishna</td><td>True closeness releases craving, anxiety, and compulsive beginning</td></tr>
            <tr><td>12.17</td><td>Krishna</td><td>Devotion becomes steady when liking and disliking no longer rule the heart</td></tr>
            <tr><td>12.18</td><td>Krishna</td><td>Real devotion stays even when life feels hostile or kind</td></tr>
            <tr><td>12.19</td><td>Krishna</td><td>Praise and blame lose power over the one who stands steady</td></tr>
            <tr><td>12.20</td><td>Krishna</td><td>Faithful practice turns devotion into closeness</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-11" className="ch-nav-title">Chapter 11, Vishwarupa Darshana Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-13" className="ch-nav-title">Chapter 13, Kshetra Kshetrajna Vibhaga Yoga</a>
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

        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 12 about?</div>
            <div className="faq-a">
              Chapter 12, called Bhakti Yoga (the Yoga of Devotion), is the shortest chapter in the Gita, only 20 verses, and one of its most practical. Arjuna asks whether worship of the personal form or the formless absolute is higher. Krishna favours the personal form as more accessible for embodied beings, gives a four-step ladder for those who find devotion difficult (12.8-11), and devotes the last seven verses to a portrait of the kind of devotee he calls dear, measured by interpersonal qualities, not by external religiosity.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Is worship of form better than worship of the formless in the Gita?</div>
            <div className="faq-a">
              In verse 12.2 Krishna says those who fix their minds on his personal form, full of trust, are 'the most united' in his view. In 12.5 he explains why: the unmanifest is harder for embodied beings to reach. The Gita does not deny the validity of the formless path, it acknowledges its difficulty. For most people, devotion to a form provides a workable handle that the formless absolute does not.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the four-step ladder of Bhagavad Gita Chapter 12?</div>
            <div className="faq-a">
              Verses 12.8 through 12.11 give a four-rung ladder for the seeker. (1) Fix the mind on Krishna directly. (2) If you cannot, practice (<em>abhyāsa-yoga</em>). (3) If practice is too hard, work for the sake of the Divine: offer your actions. (4) If even that is too hard, renounce the fruits of action. Each rung accepts that not everyone can stand on the rung above. The Gita is meeting the reader where they actually are.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 12.12 mean?</div>
            <div className="faq-a">
              Verse 12.12 says: knowledge is better than practice; meditation is better than knowledge; renunciation of the fruits of action is better than meditation, and peace follows immediately from such renunciation. The surprising line is the last one. The seemingly lowest rung, letting go of outcomes, turns out to be the most direct path to peace, because the clinging was itself the suffering.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are the qualities of a devotee in Chapter 12?</div>
            <div className="faq-a">
              Verses 12.13-19 give a long portrait of the devotee Krishna calls dear. Hates no being. Friendly. Compassionate. Free of possessiveness. Equal in pleasure and pain. Forgiving. Disturbs no one, is disturbed by no one. Expects nothing. Equal to friend and enemy, honour and dishonour. The portrait is striking because it is entirely about character and interpersonal texture, not about external religiosity.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does it mean to be 'equal to friend and enemy' in the Bhagavad Gita?</div>
            <div className="faq-a">
              In verse 12.18, Krishna describes the devotee as equal to friend and enemy. The teaching is not about being cold or impartial. It is about being unhijacked. The devotee still cares about the friend and acts well toward the enemy, but neither the friend's affection nor the enemy's hostility takes over the inner life. Equanimity, in the Gita's sense, is the freedom to love deeply without being captured by what others are doing back.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Karma, what it actually means in the Gita</div>
          </a>
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Mental peace through devotion</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-9" className="related-card">
            <div className="related-card-label">Chapter 9</div>
            <div className="related-card-title">Raja Vidya Raja Guhya Yoga, The Royal Secret</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-11" className="related-card">
            <div className="related-card-label">Chapter 11</div>
            <div className="related-card-title">Vishwarupa Darshana Yoga, The Cosmic Vision</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-13" className="related-card">
            <div className="related-card-label">Chapter 13</div>
            <div className="related-card-title">Kshetra Kshetrajna, The Field and the Knower</div>
          </a>
          </div>
        </div>

          {/* ── APP CTA ── */}
          <div className="app-cta">
            <div className="app-cta-eyebrow">Free iOS App</div>
            <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
            <p className="app-cta-desc">
              The Wisdom app delivers one Bhagavad Gita verse each day, Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
            </p>
            <div className="app-cta-features">
              <span>✦ Daily shloka in Sanskrit</span>
              <span>✦ Meaning &amp; modern context</span>
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

        </article>
      </div>

      {/* FOOTER */}
      <footer>
        <p>
          Wisdom © 2026. Part of a{' '}
          <a
            href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
            target="_blank"
            rel="noopener"
            data-mp-location="footer"
          >free iPhone app</a>{' '}
          that delivers daily Bhagavad Gita shlokas. Made with reverence.
        </p>
        <p style={{ marginTop: '8px' }}>
          <a href="/">wisdomquotes.in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:work.ankurshukla@gmail.com">Support</a>
        </p>
      </footer>

      <BlogTracker pageName="Bhagwat Geeta Chapter 12" />
    </>
  )
}

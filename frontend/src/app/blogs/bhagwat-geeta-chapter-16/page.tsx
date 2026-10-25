import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 16 Summary — The Divine and Demonic Natures Explained (Daivasura Sampad Yoga)",
  description: "Bhagavad Gita Chapter 16 in plain English: the divine (daivi) qualities that open a life vs the demonic (asuri) qualities that close it, and Krishna's three gates of hell — desire, anger, and greed (BG 16.21). All 24 verses summarised with modern examples.",
  keywords: "bhagwat geeta chapter 16, bhagavad gita daivi asuri sampad, bhagwat geeta adhyay 16, divine and demonic qualities, three gates of hell gita, kama krodha lobha, qualities of character gita, 16.21 trividham narakasyedam, Daivasura Sampad Vibhaga Yoga meaning, divine and demonic qualities Bhagavad Gita, Bhagavad Gita 16.21 three gates of hell, kama krodha lobha meaning, Bhagavad Gita on ego and character, 16 chapter qualities of devotion",
  openGraph: {
    title: "Bhagavad Gita Chapter 16 Summary — The Divine and Demonic Natures (Daivasura Sampad Yoga)",
    description: "Bhagavad Gita Chapter 16, qualities that open a life, qualities that close it, and the three gates of ruin (16.21).",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter16.webp", width: 1200, height: 675, alt: "Two divergent inner orientations, one leading toward freedom, one toward bondage. Chapter 16 of the Bhagavad Gita, Daivasura Sampad Vibhaga Yoga, names the qualities of each." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 16 Summary — The Divine and Demonic Natures (Daivasura Sampad Yoga)",
    description: "Bhagavad Gita Chapter 16, qualities that open a life, qualities that close it, and the three gates of ruin (16.21).",
    images: ["https://wisdomquotes.in/assets/chapter16.webp"],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16",
    languages: { 'x-default': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17" },
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
        content: "अध्याय १६";
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
      .toc-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
        font-weight: 700; color: var(--gold); margin-bottom: 12px; }
      .toc-list { list-style: none; display: flex; flex-direction: column; gap: 7px; counter-reset: toc-counter; }
      .toc-list li { counter-increment: toc-counter; display: flex; align-items: baseline; gap: 10px; }
      .toc-list li::before { content: counter(toc-counter); font-family: "Inter", sans-serif;
        font-size: 11px; font-variant-numeric: tabular-nums; color: var(--text-dimmer); min-width: 14px; }
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
      .section-divider-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
        color: var(--text-dimmer); white-space: nowrap; font-weight: 600; }

      .highlight-box { background: rgba(200, 136, 30, 0.05); border: 1px solid var(--border);
        border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0;
        padding: 20px 24px; margin: 28px 0; }
      .highlight-box p { font-size: 15px; line-height: 1.7; color: var(--text-dim); }
      .highlight-box strong { color: var(--gold-light); }

      .verse-table { width: 100%; border-collapse: collapse; font-size: 13.5px;
        margin: 28px 0 40px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
      .verse-table thead tr { background: rgba(200, 136, 30, 0.08); }
      .verse-table thead th { text-align: left; padding: 12px 16px; font-size: 11px;
        letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); font-weight: 700; }
      .verse-table tbody td { padding: 10px 16px; border-bottom: 1px solid var(--border);
        vertical-align: top; line-height: 1.55; color: var(--text-dim); }
      .verse-table tbody tr:last-child td { border-bottom: none; }
      .verse-table tbody tr:hover { background: var(--bg-card); }
      .verse-table td:first-child { font-size: 12px; color: var(--gold); font-weight: 600; white-space: nowrap; }

      .faq-section { background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px; overflow: hidden; margin: 48px 0; }
      .faq-header { padding: 28px 32px 20px; border-bottom: 1px solid var(--border); }
      .faq-header-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
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
      .related-reading-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .related-reading h2 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700;
        color: var(--gold-light); line-height: 1.3; margin: 0 0 18px; }
      .related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .related-card { display: block; background: var(--bg); border: 1px solid var(--border);
        border-radius: 10px; padding: 14px 18px; transition: border-color 0.15s, background 0.15s, transform 0.15s; }
      .related-card:hover { border-color: var(--gold); background: var(--bg-card-hover); transform: translateY(-2px); }
      .related-card-label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
        color: var(--text-dimmer); font-weight: 600; margin-bottom: 4px; }
      .related-card-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; }

      .app-cta { background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
        border: 1px solid rgba(200, 136, 30, 0.25); border-top: 3px solid var(--gold);
        border-radius: 20px; padding: 44px 48px 40px; margin: 48px 0 60px;
        text-align: center; position: relative; overflow: hidden; }
      .app-cta::before { content: "सम्पद्"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 16 — Daivasura Sampad Vibhaga Yoga: Two Kinds of Inner Wealth",
    "description": "Bhagavad Gita Chapter 16 — Daivasura Sampad Vibhaga Yoga. All 24 verses on divine and demonic natures, and the three gates of ruin: desire, anger, greed.",
    "alternativeHeadline": "Bhagavad Gita Chapter 16 (Two Inner Natures) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter16.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16"
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
    "keywords": "bhagwat geeta chapter 16, bhagavad gita daivi asuri sampad, bhagwat geeta adhyay 16, divine and demonic qualities, three gates of hell gita, kama krodha lobha, qualities of character gita, 16.21 trividham narakasyedam, Daivasura Sampad Vibhaga Yoga meaning, divine and demonic qualities Bhagavad Gita, Bhagavad Gita 16.21 three gates of hell, kama krodha lobha meaning, Bhagavad Gita on ego and character, 16 chapter qualities of devotion",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2831,
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
        "name": "Bhagavad Gita Chapter 16 — Daivasura Sampad Vibhaga Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 16 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 16, called Daivasura Sampad Vibhaga Yoga (the Yoga of the Distinction Between Divine and Demonic Natures), is the Gita's character-development chapter. Krishna lists about twenty-six qualities that make up the divine inner wealth (16.1-3), then describes the contrasting orientation that closes a life (16.4-16). The chapter ends with the famous prescription of 16.21: three gates of ruin — desire, anger, and greed — should be abandoned."
        }
      },
      {
        "@type": "Question",
        "name": "What are the divine qualities in Bhagavad Gita 16.1-3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 16.1 through 16.3 list the qualities of the daivī sampat, the divine inner wealth. Fearlessness, purity of being, steadiness in knowledge, generosity, self-control, sacrifice, study, austerity, straightforwardness, non-violence, truthfulness, freedom from anger, renunciation, calm, absence of slander, compassion, freedom from greed, gentleness, modesty, freedom from restlessness, splendour, forgiveness, steadiness, purity, absence of hostility, absence of pride. Most are about character and interpersonal texture, not about ritual."
        }
      },
      {
        "@type": "Question",
        "name": "What are the three gates of hell in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 16.21 names three forces as the gates of self-destruction: kāma (desire that cannot be filled), krodha (anger when that desire is blocked), and lobha (greed that wants more even when enough is at hand). The verse says: 'These three are the gates of ruin, the destroyers of the self; therefore abandon these three.' "
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 16.18 mean about ego?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 16.18 says that people captured by ego, force, arrogance, desire, and anger hate the Divine that dwells in their own bodies and in the bodies of others. The hostility is aimed at a presence that lives in the hater's own body, and the verse adds that such people find fault with Krishna's qualities."
        }
      },
      {
        "@type": "Question",
        "name": "Is Chapter 16 saying some people are demonic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Read carefully, no. The chapter describes two inner orientations — the opening qualities and the closing ones — not two kinds of people. Verse 16.5 makes this explicit: Krishna immediately reassures Arjuna, 'Do not grieve — you are born with the divine nature.' The orientations are tendencies that can be cultivated or starved. "
        }
      },
      {
        "@type": "Question",
        "name": "Why does the Gita say scripture should be the standard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 16.24 says that śāstra — the sacred teaching — should be the standard for deciding what should be done and what should not. The reason is given in 16.23: whoever sets scripture aside and acts on desire reaches neither perfection, nor happiness, nor the highest goal. The preceding verses have shown desire, anger and greed taking over a life, so Krishna points to scripture as a guide outside them."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.1",
    "text": "Fearlessness, purity of being, steadiness in the yoga of knowledge, generosity, self-control, sacrifice, study of sacred texts, austerity, straightforwardness — non-violence, truthfulness, freedom from anger, renunciation, inner calm, absence of slander, compassion for all beings, freedom from greed, gentleness, modesty, freedom from restlessness.",
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
      "name": "Bhagavad Gita, Chapter 16, Verse 1"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रीभगवानुवाच / अभयं सत्त्वसंशुद्धिः ज्ञानयोगव्यवस्थितिः । / दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥ / अहिंसा सत्यमक्रोधस्त्यागः शान्तिरपैशुनम् । / दया भूतेष्वलोलुप्त्वं मार्दवं ह्रीरचापलम् ॥",
      "śrī bhagavān uvāca | / abhayaṃ sattva-saṃśuddhir jñāna-yoga-vyavasthitiḥ | / dānaṃ damaś ca yajñaś ca svādhyāyas tapa ārjavam || / ahiṃsā satyam akrodhas tyāgaḥ śāntir apaiśunam | / dayā bhūteṣv aloluptvaṃ mārdavaṃ hrīr acāpalam ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.1"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.3",
    "text": "Splendour, forgiveness, steadiness, purity, absence of hostility, absence of pride — these belong to the one born into the divine wealth, Arjuna.",
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
      "name": "Bhagavad Gita, Chapter 16, Verse 3"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "तेजः क्षमा धृतिः शौचमद्रोहो नातिमानिता । / भवन्ति सम्पदं दैवीमभिजातस्य भारत ॥",
      "tejaḥ kṣamā dhṛtiḥ śaucam adroho nātimānitā | / bhavanti sampadaṃ daivīm abhijātasya bhārata ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.3"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.5",
    "text": "The divine wealth leads to liberation; the demonic to bondage. Do not grieve, Arjuna — you are born into the divine wealth.",
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
      "name": "Bhagavad Gita, Chapter 16, Verse 5"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "दैवी सम्पद्विमोक्षाय निबन्धायासुरी मता । / मा शुचः सम्पदं दैवीमभिजातोऽसि पाण्डव ॥",
      "daivī sampad vimokṣāya nibandhāyāsurī matā | / mā śucaḥ sampadaṃ daivīm abhijāto'si pāṇḍava ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.5"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.21",
    "text": "Three are the gates of ruin, the destroyers of the self: desire, anger, and greed. Therefore, abandon these three.",
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
      "name": "Bhagavad Gita, Chapter 16, Verse 21"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः । / कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥",
      "tri-vidhaṃ narakasyedaṃ dvāraṃ nāśanam ātmanaḥ | / kāmaḥ krodhas tathā lobhas tasmād etat trayaṃ tyajet ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16#verse-16.21"
  }
]

export default function ChapterPage16() {
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
          Bhagavad Gita Chapter 16
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 16 · 24 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 16 (Adhyay 16):<br />
            <em>Daivasura Sampad Vibhaga Yoga</em>
          </h1>
          <p className="article-subtitle">
            Krishna's chapter on character: the qualities that open a life, the ones that close it, and the three gates of ruin (desire, anger, greed) that 16.21 tells Arjuna to abandon.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">24 verses · Daivasura Sampad Vibhaga Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~11 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 16 of 18</span>
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
              src="/assets/chapter16.webp"
              alt="Two divergent inner orientations — one leading toward freedom, one toward bondage. Chapter 16 of the Bhagavad Gita, Daivasura Sampad Vibhaga Yoga, names the qualities of each."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 16 can sound dated to modern readers. Its talk of divine and demonic natures and gates of ruin reads like a split between good people and bad ones. Read closely, the chapter describes inner qualities, the ones that open a life and the ones that close it, and 16.5 tells Arjuna he already has the first kind. Verses 16.1–3 list the opening qualities. Verse 16.4 and verses 16.7–20 describe the closing ones. In 16.21 Krishna names three forces, desire, anger and greed, and tells Arjuna to drop them.
        </p>

        <p>
          What makes Chapter 16 useful is that it names qualities instead of telling you to be good. Verses 16.1–3 list fearlessness, purity, non-violence, truthfulness, freedom from anger, generosity, compassion, gentleness and modesty. Verse 16.4 lists the other side: hypocrisy, arrogance, conceit, anger, harshness and ignorance.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#opening-qualities">The qualities of the divine nature, 16.1 to 16.3</a></li>
            <li><a href="#two-orientations">Two orientations, two outcomes, 16.5</a></li>
            <li><a href="#no-discernment">What is lost when discernment is lost</a></li>
            <li><a href="#endless-desire">The spiral of insatiable desire, 16.10 to 16.16</a></li>
            <li><a href="#ego-and-divine">Why ego attacks the very thing it lives inside</a></li>
            <li><a href="#three-gates">The three gates of ruin, 16.21</a></li>
            <li><a href="#standard">The closing, a standard higher than impulse</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 16.1–16.3 · The Opening Qualities
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="opening-qualities">The Inner Wealth That Opens a Life</h2>

        <p>
          Chapter 16 begins with a list. Across three verses, Krishna names roughly twenty-six qualities that make up the <em>daivī sampat</em>, the divine inner wealth: fearlessness, purity of being, steadiness in the yoga of knowledge, generosity, self-restraint, sacrifice, study, austerity, honesty, non-violence, truthfulness, freedom from anger, renunciation, inner calm, absence of slander, compassion, freedom from greed, gentleness, modesty, absence of restlessness, splendour, forgiveness, steadiness, purity, absence of hostility and absence of pride.
        </p>

        <p>
          Many items on the list are the absence of a reaction: no anger, no slander, no pride, no hostility. Others, such as forgiveness, gentleness and modesty, are forms of restraint. A person with these qualities has no need to dominate, retaliate or put others down.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 16.1–16.2"
          speaker="Krishna"
          sanskrit="श्रीभगवानुवाच अभयं सत्त्वसंशुद्धिः ज्ञानयोगव्यवस्थितिः । दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥ अहिंसा सत्यमक्रोधस्त्यागः शान्तिरपैशुनम् । दया भूतेष्वलोलुप्त्वं मार्दवं ह्रीरचापलम् ॥"
          iast="śrī bhagavān uvāca | abhayaṃ sattva-saṃśuddhir jñāna-yoga-vyavasthitiḥ | dānaṃ damaś ca yajñaś ca svādhyāyas tapa ārjavam || ahiṃsā satyam akrodhas tyāgaḥ śāntir apaiśunam | dayā bhūteṣv aloluptvaṃ mārdavaṃ hrīr acāpalam ||"
          meaning="Fearlessness, purity of being, steadiness in the yoga of knowledge, generosity, self-control, sacrifice, study of sacred texts, austerity, straightforwardness, non-violence, truthfulness, freedom from anger, renunciation, inner calm, absence of slander, compassion for all beings, freedom from greed, gentleness, modesty, freedom from restlessness."
          insightLabel="What the list leaves out"
          insight="The list says nothing about belief or doctrine, and apart from sacrifice, study and austerity it says little about practice. Most of it is about character: how a person reacts when provoked, how they speak, how they handle ordinary friction."
          essence="Fearlessness, generosity, self-control, non-violence, truthfulness and compassion are among the divine qualities."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 16.3"
          speaker="Krishna"
          sanskrit="तेजः क्षमा धृतिः शौचमद्रोहो नातिमानिता । भवन्ति सम्पदं दैवीमभिजातस्य भारत ॥"
          iast="tejaḥ kṣamā dhṛtiḥ śaucam adroho nātimānitā | bhavanti sampadaṃ daivīm abhijātasya bhārata ||"
          meaning="Splendour, forgiveness, steadiness, purity, absence of hostility, absence of pride, these belong to the one born into the divine wealth, Arjuna."
          insightLabel="Forgiveness as splendour"
          insight="Tejas means splendour or radiance. The verse names kṣamā (forgiveness) right beside it, and counts both among the marks of the divine wealth, with steadiness, purity, and freedom from hostility and pride."
          essence="Splendour, forgiveness, steadiness, purity, no hostility and no pride mark the divine nature."
        />

        <div className="pull-quote">
          <blockquote>
            "Splendour, forgiveness, steadiness, purity, absence of hostility, absence of pride, these are the inner wealth of the noble life."
          </blockquote>
          <cite>Bhagavad Gita 16.3</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 16.5 · Two Orientations
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="two-orientations">One Nature Opens, the Other Closes, But You Are Not Trapped</h2>

        <p>
          Verse 16.5 makes the chapter's central claim explicit, and then immediately softens it. The divine nature leads to freedom, Krishna says. The demonic nature leads to bondage. Then he adds <em>mā śucaḥ</em>: do not grieve, Arjuna. You are born with the divine nature.
        </p>

        <p>
          Why does he say this? Because the chapter could easily produce despair. The list of demonic qualities is severe. Any honest reader will recognize at least some of those qualities in themselves. Verse 16.5 is the chapter's pre-emptive consolation. The orientations described are tendencies, and tendencies can be cultivated or starved. The verse is telling Arjuna, you are not condemned by what you currently are. You are inclined toward the opening qualities. The work of the chapter, and the life, is to cultivate those further.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 16.5"
          speaker="Krishna"
          sanskrit="दैवी सम्पद्विमोक्षाय निबन्धायासुरी मता । मा शुचः सम्पदं दैवीमभिजातोऽसि पाण्डव ॥"
          iast="daivī sampad vimokṣāya nibandhāyāsurī matā | mā śucaḥ sampadaṃ daivīm abhijāto'si pāṇḍava ||"
          meaning="The divine wealth leads to liberation; the demonic to bondage. Do not grieve, Arjuna, you are born into the divine wealth."
          insightLabel="Why this verse comes early"
          insight="The verses that follow describe the closing qualities, and the descriptions are unflattering. Because 16.5 comes first, the reader can take them as a list of what to subtract. Arjuna has already been told he has the divine nature."
          essence="The divine nature leads to freedom, the demonic to bondage; Arjuna, do not grieve."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 16.7 · Without Discernment
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="no-discernment">When Discernment Is Lost, Everything Else Goes With It</h2>

        <p>
          Verse 16.7 describes what is missing in the orientation Krishna calls demonic: such people do not know what to pursue and what to withdraw from (<em>pravṛtti</em> and <em>nivṛtti</em>). The verse then says that in them there is no purity, no good conduct and no truthfulness.
        </p>

        <p>
          One way to read the order of the verse: the ability to tell good from bad, or the important from the trivial, can be dulled by years of small compromises and repeated dishonesty. Once it is dulled, the other qualities on the list have nothing to steer them.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 16.7"
          speaker="Krishna"
          sanskrit="प्रवृत्तिं च निवृत्तिं च जना न विदुरासुराः । न शौचं नापि चाचारो न सत्यं तेषु विद्यते ॥"
          iast="pravṛttiṃ ca nivṛttiṃ ca janā na vidur āsurāḥ | na śaucaṃ nāpi cācāro na satyaṃ teṣu vidyate ||"
          meaning="Those of a shadowed nature do not know what should be pursued and what should be withdrawn from. In them, there is no purity, no noble conduct, no truthfulness."
          insightLabel="Discernment comes first"
          insight="In the verse, purity, conduct and truthfulness are missing in people who cannot tell what to pursue from what to avoid. Many wrong choices begin with misreading the situation."
          essence="They do not know what to pursue or avoid, and lack purity, good conduct and truth."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 16.10–16.16 · The Spiral
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="endless-desire">The Spiral of Endless Wanting</h2>

        <p>
          Verses 16.10 through 16.16 describe the spiral that the closing orientation produces.  The person captured by endless desire (<em>duṣpūram kāmam</em>, desire that can never be filled) gets pulled into hypocrisy, arrogance, intoxication. Then, deluded, they hold onto false beliefs and impure practices. They make plans around accumulation. Verses 16.13–14 give their inner speech: "This I have gained today, and this wish I will fulfil. This wealth is mine, and more will be mine. That enemy I have killed, and I will kill others too."
        </p>

        <p>
          In verse 16.16 the person is shaken by many thoughts, caught in a net of delusion and attached to pleasure, and falls into an impure lower realm. Verses 16.19–20 add that Krishna casts the cruel and hateful into demonic births again and again, and that they sink lower still.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 16.10"
          speaker="Krishna"
          sanskrit="काममाश्रित्य दुष्पूरं दम्भमानमदान्विताः । मोहाद्गृहीत्वासद्ग्राहान्प्रवर्तन्तेऽशुचिव्रताः ॥"
          iast="kāmam āśritya duṣpūraṃ dambha-māna-madānvitāḥ | mohād gṛhītvāsad-grāhān pravartante'śuci-vratāḥ ||"
          meaning="Taking refuge in desire that cannot be filled, full of hypocrisy, pride, and intoxication, they wander under delusion, clinging to false notions and impure practices."
          insightLabel="The Sanskrit word that anchors the verse"
          insight="Duṣpūram means that which cannot be filled. The verse puts the problem in the fact that this desire can never be satisfied. Anyone who has reached a goal and found it had already moved will recognize the word."
          essence="Relying on desire that cannot be filled, they act from hypocrisy, pride and delusion."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 16.16"
          speaker="Krishna"
          sanskrit="अनेकचित्तविभ्रान्ता मोहजालसमावृताः । प्रसक्ताः कामभोगेषु पतन्ति नरकेऽशुचौ ॥"
          iast="aneka-citta-vibhrāntā moha-jāla-samāvṛtāḥ | prasaktāḥ kāma-bhogeṣu patanti narake'śucau ||"
          meaning="Shaken by many conflicting thoughts, wrapped in the net of confusion, attached to the enjoyment of desires, they fall into an impure lower realm."
          insightLabel="How the fall happens"
          insight="In this verse the fall follows from attachment to desires that cannot be filled. Three verses later, in 16.19, Krishna says he himself casts the cruel and hateful into demonic births."
          essence="Confused, caught in delusion and attached to pleasure, they fall into an impure hell."
        />

        <div className="highlight-box">
          <p>
            <strong>In modern terms:</strong> a career can run on <em>duṣpūram kāmam</em>, with each promotion or purchase moving the bar a little higher. The Gita names this as an orientation and says where it leads. The remedy comes in 16.21.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 16.18 · Ego and the Divine Inside You
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="ego-and-divine">The Ego That Attacks the Very Thing It Lives Inside</h2>

        <p>
          Verse 16.18 makes an odd observation. The person captured by ego, force, arrogance, desire, and anger, Krishna says, hates him, who dwells in their own body and in the bodies of others. The hostility is directed, unwittingly, at the divine presence that is the very basis of the hostile person's existence.
        </p>

        <p>
          On this reading, arrogance toward another person is hostility toward the Divine present in that person, and self-aggrandisement turns the same hostility on the Divine present in oneself.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 16.18"
          speaker="Krishna"
          sanskrit="अहङ्कारं बलं दर्पं कामं क्रोधं च संश्रिताः । मामात्मपरदेहेषु प्रद्विषन्तोऽभ्यसूयकाः ॥"
          iast="ahaṅkāraṃ balaṃ darpaṃ kāmaṃ krodhaṃ ca saṃśritāḥ | mām ātma-para-deheṣu pradviṣanto'bhyasūyakāḥ ||"
          meaning="Taking refuge in ego, force, arrogance, desire, and anger, they hate me, who dwells in their own body and in the bodies of others, and they find fault with my qualities."
          insightLabel="Hating what lives in you"
          insight="The people this verse describes hate Krishna, and Krishna dwells in their own bodies as well as in others. Their hostility lands on a presence they carry."
          essence="Driven by ego and anger, they hate Krishna, who dwells in them and in others."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 16.21 · The Three Gates
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="three-gates">The Three Gates of Ruin, Drop These Three</h2>

        <p>
          After the long description, verse 16.21 names three forces, desire, anger and greed (<em>kāma, krodha, lobha</em>), calls them the gates of self-destruction, and tells Arjuna to abandon all three. Dropping them, the very next verse says, frees a person to act for their own highest good and reach the highest state.
        </p>

        <p>
          The list of opening qualities at the start of the chapter has about twenty-six items. The list in 16.21 has three. If the long list is too much to work on, these three are a place to start: desire that can never be filled, the anger that flares when desire is blocked, and the greed that wants more when there is already enough.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 16.21"
          speaker="Krishna"
          sanskrit="त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः । कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥"
          iast="tri-vidhaṃ narakasyedaṃ dvāraṃ nāśanam ātmanaḥ | kāmaḥ krodhas tathā lobhas tasmād etat trayaṃ tyajet ||"
          meaning="Three are the gates of ruin, the destroyers of the self: desire, anger, and greed. Therefore, abandon these three."
          insightLabel="Three forces, one instruction"
          insight="Kāma is desire that cannot be filled, krodha the anger that comes when desire is blocked, and lobha the greed that wants more after desire is met. The verse calls all three gates of ruin and asks for all three to be dropped."
          essence="Desire, anger and greed are the three gates of ruin; abandon all three."
        />

        <div className="pull-quote">
          <blockquote>
            "Three are the gates of ruin: desire, anger, greed. Abandon these three."
          </blockquote>
          <cite>Bhagavad Gita 16.21</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 16.23–16.24 · The Standard
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="standard">A Standard Higher Than Your Impulse</h2>

        <p>
          The chapter closes with verses 16.23 and 16.24. A person who sets aside the scriptural rule and acts on desire, 16.23 says, reaches neither perfection, nor happiness, nor the highest goal. So, 16.24 says, let the <em>śāstra</em>, scripture, be your standard for what should and should not be done.
        </p>

        <p>
          Modern readers sometimes balk at scripture as the standard. The chapter's reasoning is that desire is a poor judge of action, since the preceding verses showed desire, anger and greed taking over a life. Krishna's answer is a standard outside the person's own wants, and the standard he names is śāstra.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 16.24"
          speaker="Krishna"
          sanskrit="तस्माच्छास्त्रं प्रमाणं ते कार्याकार्यव्यवस्थितौ । ज्ञात्वा शास्त्रविधानोक्तं कर्म कर्तुमिहार्हसि ॥"
          iast="tasmāc chāstraṃ pramāṇaṃ te kāryākārya-vyavasthitau | jñātvā śāstra-vidhānoktaṃ karma kartum ihārhasi ||"
          meaning="Therefore, let the sacred teaching be your standard in deciding what should be done and what should not. Knowing what is prescribed in that teaching, perform your action here."
          insightLabel="Desire as a guide"
          insight="The preceding verses describe a life run by desire: wanting that cannot be filled, lost discernment, ego. Here Krishna names the guide that should replace it, the śāstra, and tells Arjuna to act once he knows what it prescribes."
          essence="Let scripture be your standard for what to do and what to avoid."
        />

        <div className="highlight-box">
          <p>
            <strong>Where this leads:</strong> Chapter 17 opens from 16.23–24. Arjuna asks about people who set the scriptural rules aside but still worship with faith, and Krishna answers by describing three kinds of faith.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 24 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>16.1</td><td>Krishna</td><td>Fearlessness, purity, steady knowledge, charity, self-control, sacrifice, study, austerity, straightforwardness</td></tr>
            <tr><td>16.2</td><td>Krishna</td><td>Non-violence, truth, no anger, renunciation, calm, no slander, compassion, no greed, gentleness, modesty, steadiness</td></tr>
            <tr><td>16.3</td><td>Krishna</td><td>Splendour, forgiveness, fortitude, purity, no hostility, no pride: these belong to the divine nature</td></tr>
            <tr><td>16.4</td><td>Krishna</td><td>Hypocrisy, arrogance, conceit, anger, harshness and ignorance belong to the demonic nature</td></tr>
            <tr><td>16.5</td><td>Krishna</td><td>The divine nature leads to freedom, the demonic to bondage; Arjuna, do not grieve</td></tr>
            <tr><td>16.6</td><td>Krishna</td><td>There are two kinds of beings in this world, the divine and the demonic</td></tr>
            <tr><td>16.7</td><td>Krishna</td><td>The demonic do not know what to pursue or avoid; they lack purity, conduct and truth</td></tr>
            <tr><td>16.8</td><td>Krishna</td><td>They say the world has no truth, no basis and no God, and arises from desire alone</td></tr>
            <tr><td>16.9</td><td>Krishna</td><td>Holding this view, they do cruel deeds that harm the world</td></tr>
            <tr><td>16.10</td><td>Krishna</td><td>Clinging to desire that cannot be filled, full of hypocrisy and pride, they hold false views</td></tr>
            <tr><td>16.11</td><td>Krishna</td><td>Bound by endless anxiety until death, they treat gratifying desire as the highest aim</td></tr>
            <tr><td>16.12</td><td>Krishna</td><td>Bound by hope, given to desire and anger, they seek wealth by unjust means</td></tr>
            <tr><td>16.13</td><td>Krishna</td><td>&quot;This I gained today, this wish I will fulfil; this wealth is mine, and more will be&quot;</td></tr>
            <tr><td>16.14</td><td>Krishna</td><td>&quot;I killed that enemy and will kill others; I am the lord, successful, strong and happy&quot;</td></tr>
            <tr><td>16.15</td><td>Krishna</td><td>&quot;I am rich and well-born; who is equal to me? I will sacrifice, give and rejoice&quot;</td></tr>
            <tr><td>16.16</td><td>Krishna</td><td>Confused and caught in delusion, attached to pleasure, they fall into an impure hell</td></tr>
            <tr><td>16.17</td><td>Krishna</td><td>Conceited and drunk with wealth, they perform sacrifices in name only, for show</td></tr>
            <tr><td>16.18</td><td>Krishna</td><td>Given to ego, force, pride, desire and anger, they hate Krishna in their own and others' bodies</td></tr>
            <tr><td>16.19</td><td>Krishna</td><td>Krishna casts the cruel and hateful again and again into demonic births</td></tr>
            <tr><td>16.20</td><td>Krishna</td><td>Born demonic life after life, they never reach Krishna and sink lower</td></tr>
            <tr><td>16.21</td><td>Krishna</td><td>Desire, anger and greed are the three gates of ruin; abandon all three</td></tr>
            <tr><td>16.22</td><td>Krishna</td><td>Freed from these three gates of darkness, a person does what is good for the self and reaches the highest goal</td></tr>
            <tr><td>16.23</td><td>Krishna</td><td>Whoever ignores scripture and follows desire gains neither perfection, happiness nor the highest goal</td></tr>
            <tr><td>16.24</td><td>Krishna</td><td>So let scripture be your standard for what to do and what to avoid</td></tr>
          </tbody>
        </table>

        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the 16.24 standard back to scripture (śāstra), removed an unsourced claim that desire, anger and greed feed each other, and noted that in 16.19 Krishna casts the cruel into demonic births; copy edited.</p>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-15" className="ch-nav-title">Chapter 15, Purushottama Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-17" className="ch-nav-title">Chapter 17, Shraddhatraya Vibhaga Yoga</a>
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


        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 16 about?</div>
            <div className="faq-a">
              Chapter 16, called Daivasura Sampad Vibhaga Yoga (the Yoga of the Distinction Between Divine and Demonic Natures), is the Gita's character-development chapter. Krishna lists about twenty-six qualities that make up the divine inner wealth (16.1-3), then describes the contrasting orientation that closes a life (16.4-16). The chapter ends with the famous prescription of 16.21: three gates of ruin, desire, anger, and greed, should be abandoned.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are the divine qualities in Bhagavad Gita 16.1-3?</div>
            <div className="faq-a">
              Verses 16.1 through 16.3 list the qualities of the <em>daivī sampat</em>, the divine inner wealth. Fearlessness, purity of being, steadiness in knowledge, generosity, self-control, sacrifice, study, austerity, straightforwardness, non-violence, truthfulness, freedom from anger, renunciation, calm, absence of slander, compassion, freedom from greed, gentleness, modesty, freedom from restlessness, splendour, forgiveness, steadiness, purity, absence of hostility, absence of pride. Most are about character and interpersonal texture, not about ritual.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are the three gates of hell in the Bhagavad Gita?</div>
            <div className="faq-a">
              Verse 16.21 names three forces as the gates of self-destruction: <em>kāma</em> (desire that cannot be filled), <em>krodha</em> (anger when that desire is blocked), and <em>lobha</em> (greed that wants more even when enough is at hand). The verse says: 'These three are the gates of ruin, the destroyers of the self; therefore abandon these three.' 
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 16.18 mean about ego?</div>
            <div className="faq-a">
              Verse 16.18 says that people captured by ego, force, arrogance, desire, and anger hate the Divine that dwells in their own bodies and in the bodies of others. The hostility is aimed at a presence that lives in the hater's own body, and the verse adds that such people find fault with Krishna's qualities.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Is Chapter 16 saying some people are demonic?</div>
            <div className="faq-a">
              Read carefully, no. The chapter describes two inner orientations, the opening qualities and the closing ones, not two kinds of people. Verse 16.5 makes this explicit: Krishna immediately reassures Arjuna, 'Do not grieve, you are born with the divine nature.' The orientations are tendencies that can be cultivated or starved. 
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Why does the Gita say scripture should be the standard?</div>
            <div className="faq-a">
              Verse 16.24 says that <em>śāstra</em> (the sacred teaching) should be the standard for deciding what should be done and what should not. The reason is given in 16.23: whoever sets scripture aside and acts on desire reaches neither perfection, nor happiness, nor the highest goal. The preceding verses have shown desire, anger and greed taking over a life, so Krishna points to scripture as a guide outside them.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about anger, fear and ego</div>
          </a>
          <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Karma, what it actually means in the Gita</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-14" className="related-card">
            <div className="related-card-label">Chapter 14</div>
            <div className="related-card-title">Gunatraya Vibhaga, The Three Forces</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-17" className="related-card">
            <div className="related-card-label">Chapter 17</div>
            <div className="related-card-title">Shraddhatraya Vibhaga, You Are What You Trust</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-6" className="related-card">
            <div className="related-card-label">Chapter 6</div>
            <div className="related-card-title">Dhyana Yoga, The Lamp That Does Not Flicker</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 16"} />

        </article>
      </div>

      {/* FOOTER */}
      <SiteFooter />

      <BlogTracker pageName="Bhagwat Geeta Chapter 16" />
    </>
  )
}

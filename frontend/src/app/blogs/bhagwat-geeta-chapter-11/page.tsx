import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Bhagavad Gita 11.32 (Oppenheimer) & Chapter 11: Cosmic Form",
  description: "11.32, \"I am Time, the destroyer of worlds\", is the line Oppenheimer said came to mind at the Trinity test. Read it and all 55 verses of Chapter 11 in Hindi and English.",
  keywords: "bhagwat geeta chapter 11, bhagavad gita vishwarupa darshana yoga, bhagwat geeta adhyay 11, kaloasmi loka kshaya krit pravriddho, thousand suns gita, cosmic form bhagavad gita, I am time the destroyer of worlds, nimitta matram bhava, Vishwarupa Darshana Yoga meaning, Bhagavad Gita 11.12 thousand suns, Bhagavad Gita 11.32 kalo asmi loka kshaya krit, I am Time the destroyer of worlds meaning, Bhagavad Gita 11.33 nimitta matram bhava, Krishna cosmic form Bhagavad Gita, Oppenheimer Bhagavad Gita quote, Oppenheimer bhagavad gita verse, I am time the destroyer of worlds full context",
  openGraph: {
    title: "Bhagavad Gita 11.32 (Oppenheimer) & Chapter 11: Cosmic Form",
    description: "11.32, \"I am Time, the destroyer of worlds\", is the line Oppenheimer said came to mind at the Trinity test. Read it and all 55 verses of Chapter 11 in Hindi and English.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter11.webp", width: 1200, height: 675, alt: "The cosmic form revealed, a vast, blinding vision that exceeds the human eye. Chapter 11 of the Bhagavad Gita, Vishwarupa Darshana Yoga, shows Krishna's cosmic form." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita 11.32 (Oppenheimer) & Chapter 11: Cosmic Form",
    description: "11.32, \"I am Time, the destroyer of worlds\", is the line Oppenheimer said came to mind at the Trinity test. Read it and all 55 verses of Chapter 11 in Hindi and English.",
    images: ["https://wisdomquotes.in/assets/chapter11.webp"],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11",
    languages: {
      'x-default': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11",
      'en': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11",
      'en-IN': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12" },
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
        content: "अध्याय ११";
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
      .app-cta::before { content: "विश्व"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 11 — Vishwarupa Darshana Yoga: The Vision That Cannot Be Looked At",
    "description": "Bhagavad Gita Chapter 11 — Vishwarupa Darshana Yoga. All 55 verses on the cosmic form, the thousand suns, and 'I am Time, the destroyer of worlds.'",
    "alternativeHeadline": "Bhagavad Gita Chapter 11 (Vishwarupa Darshana) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter11.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11"
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
    "keywords": "bhagwat geeta chapter 11, bhagavad gita vishwarupa darshana yoga, bhagwat geeta adhyay 11, kaloasmi loka kshaya krit pravriddho, thousand suns gita, cosmic form bhagavad gita, I am time the destroyer of worlds, nimitta matram bhava, Vishwarupa Darshana Yoga meaning, Bhagavad Gita 11.12 thousand suns, Bhagavad Gita 11.32 kalo asmi loka kshaya krit, I am Time the destroyer of worlds meaning, Bhagavad Gita 11.33 nimitta matram bhava, Krishna cosmic form Bhagavad Gita, Oppenheimer Bhagavad Gita quote",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2783,
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
        "name": "Bhagavad Gita Chapter 11 — Vishwarupa Darshana Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 11 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 11, called Vishwarupa Darshana Yoga (the Yoga of the Vision of the Cosmic Form), is the dramatic high point of the Bhagavad Gita. Arjuna asks to see Krishna's universal form. Krishna grants him divine sight and shows him the cosmic body — a vision of infinite arms, infinite mouths, beings being consumed by time. The chapter contains the famous 'thousand suns' verse (11.12), the line 'I am Time, the destroyer of worlds' (11.32), and the closing teaching that only undivided devotion can reach this vision (11.53-55)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the meaning of Bhagavad Gita 11.32?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 11.32 — kālo'smi loka-kṣaya-kṛt pravṛddhaḥ — translates as 'I am Time, grown mighty, the destroyer of worlds.' Krishna identifies himself as Time itself. The verse goes on to say that even without Arjuna, the warriors arrayed against him will not survive. Beyond the war, the verse says that whatever you fear losing is already loosening, because everything in time ends. Oppenheimer said in 1965 that this line came to him at the Trinity test."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 'thousand suns' verse in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 11.12 says, 'If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self.' Sanjaya speaks it, describing the cosmic form, and admits that even this comparison might only begin to match it. According to Robert Jungk's book Brighter than a Thousand Suns, Oppenheimer thought of this verse at the Trinity test in 1945."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'nimitta matram bhava' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 11.33, Krishna tells Arjuna, 'nimitta-mātraṃ bhava savya-sācin' — 'become only the instrument, Arjuna.' What unfolds on the battlefield was set in motion before Arjuna acts. Krishna says the warriors are already slain by him. Arjuna's task is to be a clean instrument: present, accountable, attentive. Read beyond the war: do the work, and leave the outcome to the larger order."
        }
      },
      {
        "@type": "Question",
        "name": "What is the universal form (Vishwarupa) in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The vishwarupa or universal form is Krishna's cosmic body: the form in which the entire universe is contained. Arjuna sees it in Chapter 11 after asking for direct vision. The form has infinite arms, infinite eyes, mouths like blazing fire, and contains all beings within it. It cannot be seen with ordinary eyes, so Krishna gives Arjuna divine sight (11.8)."
        }
      },
      {
        "@type": "Question",
        "name": "Why did Arjuna apologise to Krishna in Chapter 11?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After the cosmic vision, in verses 11.41-44, Arjuna apologises for having treated Krishna with casual familiarity — calling him by name, joking with him, eating with him — without realising who he truly was. He asks Krishna to forgive him as a father forgives a son, as a friend forgives a friend, as a lover forgives a beloved. The friendship survives the reverence: Krishna returns to his human form (11.51) and the two go on as before."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.12",
    "text": "If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Sanjaya"
    },
    "creator": {
      "@type": "Person",
      "name": "Sanjaya"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 11, Verse 12"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता । / यदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः ॥",
      "divi sūrya-sahasrasya bhaved yugapad-utthitā | / yadi bhāḥ sadṛśī sā syād bhāsas tasya mahātmanaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.12"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.32",
    "text": "The Blessed One said: I am Time, grown mighty, destroyer of worlds, here to consume beings. Even without you, none of these warriors arrayed against you will survive.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 32"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रीभगवानुवाच / कालोऽस्मि लोकक्षयकृत्प्रवृद्धोलोकान्समाहर्तुमिह प्रवृत्तः । / ऋतेऽपि त्वां न भविष्यन्ति सर्वेयेऽवस्थिताः प्रत्यनीकेषु योधाः ॥",
      "śrī bhagavān uvāca | / kālo'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ | / ṛte'pi tvāṃ na bhaviṣyanti sarve ye'vasthitāḥ pratyanīkeṣu yodhāḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.32"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.33",
    "text": "Therefore — rise. Win fame. Conquer the foes and enjoy a flourishing kingdom. They have already been slain by me. Become only the instrument, Arjuna.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 33"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "तस्मात्त्वमुत्तिष्ठ यशो लभस्वजित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम् । / मयैवैते निहताः पूर्वमेवनिमित्तमात्रं भव सव्यसाचिन् ॥",
      "tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṃ samṛddham | / mayaivaite nihatāḥ pūrvam eva nimitta-mātraṃ bhava savya-sācin ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.33"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.53",
    "text": "Not by the Vedas, not by austerity, not by charity, not by ritual sacrifice can I be seen in this form as you have just seen me.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 53"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "नाहं वेदैर्न तपसा न दानेन न चेज्यया । / शक्य एवंविधो द्रष्टुं दृष्टवानसि मां यथा ॥",
      "nāhaṃ vedair na tapasā na dānena na cejyayā | / śakya evaṃ-vidho draṣṭuṃ dṛṣṭavān asi māṃ yathā ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.53"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.55",
    "text": "The one who works for me, takes me as the supreme, is devoted to me, is free from attachment, and bears no hostility toward any being — that one comes to me, Pandava.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 55"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः । / निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥",
      "mat-karma-kṛn mat-paramo mad-bhaktaḥ saṅga-varjitaḥ | / nirvairaḥ sarva-bhūteṣu yaḥ sa mām eti pāṇḍava ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.55"
  }
]

export default function ChapterPage11() {
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
          Bhagavad Gita Chapter 11
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 11 · 55 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 11 (Adhyay 11):<br />
            <em>Vishwarupa Darshana Yoga</em>
          </h1>
          <p className="article-subtitle">
            Arjuna asks to see Krishna&apos;s cosmic form and gets what he asked for: a light like a thousand suns, mouths like fire, and Krishna saying &ldquo;I am Time, destroyer of worlds.&rdquo; Then he asks for the familiar friend back.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">55 verses · Vishwarupa Darshana Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~16 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 11 of 18</span>
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
              src="/assets/chapter11.webp"
              alt="The cosmic form revealed — a vast, blinding vision that exceeds the human eye. Chapter 11 of the Bhagavad Gita, Vishwarupa Darshana Yoga, shows Krishna's cosmic form."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 11 is the climax of the Gita. After ten chapters of teaching, after the catalogue of manifestations in Chapter 10 (among rivers I am the Ganga, among letters I am A): Arjuna does what many readers have wanted to do: he asks to see it with his own eyes. He says: I believe everything you have said, but show me. <em>Draṣṭum icchāmi te rūpam aiśvaram</em>: I want to see your sovereign form.
        </p>

        <p>
          Krishna agrees and gives Arjuna a divine eye, since ordinary eyes cannot take this in (11.8). Sanjaya, the narrator, describes the form first (11.9–14): a light like a thousand suns, a universe gathered in one body. Then Arjuna describes it himself, and what he sees includes the warriors of both armies rushing into blazing mouths. At the centre of the vision Krishna says <em>kālo'smi loka-kṣaya-kṛt pravṛddhaḥ</em>: I am Time, grown mighty, the destroyer of worlds (11.32).
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#ask-to-see">Arjuna asks for the vision, and what asking means</a></li>
            <li><a href="#thousand-suns">If a thousand suns rose at once, 11.12</a></li>
            <li><a href="#overwhelmed">The vision exceeds what Arjuna can hold</a></li>
            <li><a href="#time">I am Time, 11.32</a></li>
            <li><a href="#instrument">Become an instrument, 11.33</a></li>
            <li><a href="#forgiveness">Arjuna's humbling, and the request for forgiveness</a></li>
            <li><a href="#devotion">The chapter's gentle ending, only devotion sees this</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.3–11.4 · The Request
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="ask-to-see">Arjuna Asks to See, And What It Means to Ask</h2>

        <p>
          Chapter 11 opens with an honest request. Arjuna says: it is as you have described yourself. <em>And yet I want to see</em> (11.3). Belief in something enormous often works this way: you hold the proposition and still want to meet it directly. Krishna does not treat the request as a failure of faith; he grants it.
        </p>

        <p>
          Arjuna also asks softly: <em>if you think I am capable of seeing it, then show me</em> (11.4). He leaves the decision with Krishna, and Krishna later says the vision came by his grace (11.47).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.3"
          speaker="Arjuna"
          sanskrit="एवमेतद्यथात्थ त्वमात्मानं परमेश्वर । द्रष्टुमिच्छामि ते रूपमैश्वरं पुरुषोत्तम ॥"
          iast="evam etad yathāttha tvam ātmānaṃ parameśvara | draṣṭum icchāmi te rūpam aiśvaraṃ puruṣottama ||"
          essence="It is as you say, Supreme Lord; still, I want to see your sovereign form."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 11.12 · The Comparison That Fails
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="thousand-suns">If a Thousand Suns Rose at Once</h2>

        <p>
          Krishna gives Arjuna the divine eye and reveals the cosmic form. Sanjaya, narrating for the blind king Dhritarashtra, reaches for a comparison: if a thousand suns rose in the sky at the same moment, their light might begin to approach the radiance of this Great Being. The number matters less than the admission: even this comparison only &ldquo;might&rdquo; match it.
        </p>

        <p>
          The verse is widely quoted in English partly because of Robert Oppenheimer. According to Robert Jungk&apos;s book <em>Brighter than a Thousand Suns</em>, this verse came to Oppenheimer&apos;s mind at the Trinity test in July 1945. The other line he is known for, &ldquo;Now I am become Death, the destroyer of worlds,&rdquo; is from 11.32, discussed below.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.12"
          speaker="Sanjaya"
          sanskrit="दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता । यदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः ॥"
          iast="divi sūrya-sahasrasya bhaved yugapad-utthitā | yadi bhāḥ sadṛśī sā syād bhāsas tasya mahātmanaḥ ||"
          meaning="If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self."
          insightLabel="A comparison that falls short"
          insight="Sanjaya reaches for the biggest light he can imagine and still only says it might compare. When language runs out, the verse names the shortfall instead of hiding it."
          essence="If a thousand suns rose at once in the sky, that might match the Great Self's radiance."
        />

        <div className="pull-quote">
          <blockquote>
            "If a thousand suns rose at once in the sky, their light might begin to compare with the radiance of that Great Self."
          </blockquote>
          <cite>Bhagavad Gita 11.12</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.15–11.24 · Beyond What Can Be Held
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="overwhelmed">When the Vision Exceeds the One Who Asked For It</h2>

        <p>
          What follows is overwhelming. Arjuna sees countless arms and mouths, gods bowing in fear, the three worlds trembling (11.20). By verse 11.19 he is no longer a calm observer. He says: I see you scorching this world with your own radiance. By 11.24, he confesses, I cannot find composure. I have no peace. The vision he asked for has knocked him off his feet.
        </p>

        <p>
          The Gita is honest here about religious experience. Arjuna&apos;s encounter is frightening, far from the soft comfort contemporary spirituality often promises. He moves from wonder (11.14) to terror (11.24–25) to reverence (11.36–40).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.19"
          speaker="Arjuna"
          sanskrit="अनादिमध्यान्तमनन्तवीर्यमनन्तबाहुं शशिसूर्यनेत्रम् । पश्यामि त्वां दीप्तहुताशवक्त्रंस्वतेजसा विश्वमिदं तपन्तम् ॥"
          iast="anādi-madhyāntam ananta-vīryam ananta-bāhuṃ śaśi-sūrya-netram | paśyāmi tvāṃ dīpta-hutāśa-vaktraṃ sva-tejasā viśvam idaṃ tapantam ||"
          meaning="I see you, without beginning, middle, or end, of infinite power, with infinite arms, eyes like sun and moon, mouths like blazing fire, scorching this entire world with your own radiance."
          insightLabel="Without beginning, middle or end"
          insight="The verse uses negations, no beginning, no middle, no end, where positive description fails. By its end the world is being scorched by the radiance Arjuna is looking at."
          essence="Without beginning, middle or end, sun and moon your eyes, you scorch the world with your radiance."
        />

        <div className="highlight-box">
          <p>
            <strong>Why the chapter does not feel comforting:</strong> Chapter 11 shows Arjuna, and any reader who has wanted direct contact with the absolute, what that contact felt like for him. The calm comes later, when Krishna takes his gentle form again (11.50–51).
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 11.32 · Time, the Destroyer
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="time">I Am Time, the Destroyer of Worlds</h2>

        <p>
          Arjuna asks who this terrible form is (11.31), and Krishna answers. <em>Kālo'smi loka-kṣaya-kṛt pravṛddhaḥ</em>. I am Time, grown great, the destroyer of worlds. The verse continues: even without you, all these warriors arranged in hostile ranks will not survive. The war is already decided, and the destroyer Krishna names is Time. In a 1965 television documentary, Oppenheimer said this line came to his mind at the Trinity test, in the form &ldquo;Now I am become Death, the destroyer of worlds.&rdquo;
        </p>

        <p>
          Read outside the war, the verse widens: whatever you are gripping is already loosening, because everything that begins in time ends in it. The verse is unsparing. Some readers also find it freeing, because what you fear losing was never yours to keep, and seeing that clearly makes it easier to act.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.32"
          speaker="Krishna"
          sanskrit="श्रीभगवानुवाच कालोऽस्मि लोकक्षयकृत्प्रवृद्धोलोकान्समाहर्तुमिह प्रवृत्तः । ऋतेऽपि त्वां न भविष्यन्ति सर्वेयेऽवस्थिताः प्रत्यनीकेषु योधाः ॥"
          iast="śrī bhagavān uvāca | kālo'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ | ṛte'pi tvāṃ na bhaviṣyanti sarve ye'vasthitāḥ pratyanīkeṣu yodhāḥ ||"
          meaning="The Blessed One said: I am Time, grown mighty, destroyer of worlds, here to consume beings. Even without you, none of these warriors arrayed against you will survive."
          insightLabel="Naming Time"
          insight="Every person meets time eventually. Krishna names it here, at full volume, and uses it to tell Arjuna that the outcome of the battle does not rest on his grip."
          essence="I am Time, grown mighty, destroyer of worlds; even without you, these warriors will not survive."
        />

        <div className="pull-quote">
          <blockquote>
            "I am Time, grown great, destroyer of worlds. Even without you, they will not survive."
          </blockquote>
          <cite>Bhagavad Gita 11.32</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 11.33 · Become an Instrument
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="instrument">Nimitta-matram Bhava, Become the Instrument</h2>

        <p>
          Verse 11.33 turns the vision into an instruction. Krishna says: therefore rise, win fame, conquer your enemies and enjoy a flourishing kingdom. <em>They have already been slain by me. Become only the instrument, Arjuna.</em> The Sanskrit is <em>nimitta-mātraṃ bhava savya-sācin</em>: be only the instrument.
        </p>

        <p>
          Read this verse outside the immediate war context, and it becomes a working principle for every difficult act. You are the instrument, present, accountable, attentive, through which a larger pattern moves. The verse lifts a heavy assumption: that you are personally responsible for outcomes you do not control. The work is still yours to do.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.33"
          speaker="Krishna"
          sanskrit="तस्मात्त्वमुत्तिष्ठ यशो लभस्वजित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम् । मयैवैते निहताः पूर्वमेवनिमित्तमात्रं भव सव्यसाचिन् ॥"
          iast="tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṃ samṛddham | mayaivaite nihatāḥ pūrvam eva nimitta-mātraṃ bhava savya-sācin ||"
          meaning="Therefore, rise. Win fame. Conquer the foes and enjoy a flourishing kingdom. They have already been slain by me. Become only the instrument, Arjuna."
          insightLabel="Be only the instrument"
          insight="Nimitta-mātraṃ bhava: be only the instrument. That still leaves Arjuna real responsibility: the work, done cleanly and attentively, is his. The outcome belongs to the larger pattern, and he has to hold both at once."
          essence="So rise and win glory; they are already slain by me; be only the instrument, Arjuna."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.41–11.44 · The Humbling
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="forgiveness">Arjuna's Humbling, and the Request for Forgiveness</h2>

        <p>
          After the vision, Arjuna does something unusual. He apologises. In verses 11.41 to 11.44, he confesses that he had treated Krishna as a friend, calling him casually, joking with him, eating with him, without realizing who Krishna really was. He says: forgive what I have done, as a father forgives a son, as a friend forgives a friend, as a lover forgives a beloved.
        </p>

        <p>
          The Gita lets Arjuna feel embarrassed about the old familiarity, and then restores it. Krishna will, by the end of the chapter, take back his cosmic form and reappear as the human friend. The vision enlarges the friendship rather than replacing it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.44"
          speaker="Arjuna"
          sanskrit="तस्मात्प्रणम्य प्रणिधाय कायंप्रसादये त्वामहमीशमीड्यम् । पितेव पुत्रस्य सखेव सख्युःप्रियः प्रियायार्हसि देव सोढुम् ॥"
          iast="tasmāt praṇamya praṇidhāya kāyaṃ prasādaye tvām aham īśam īḍyam | piteva putrasya sakheva sakhyuḥ priyaḥ priyāyārhasi deva soḍhum ||"
          meaning="Therefore, bowing my body down, I seek to please you, the worthy Lord. As a father forgives a son, as a friend forgives a friend, as a lover the beloved, Lord, forgive me."
          insightLabel="Three close relationships"
          insight="The three analogies Arjuna reaches for (father, friend, lover) are all intimate. Having seen who Krishna is, Arjuna asks to be forgiven the way someone close would forgive him."
          essence="Bowing low, I ask your grace: bear with me as a father with a son, friend with friend, lover with beloved."
        />

        <div className="highlight-box">
          <p>
            <strong>What the apology models for any reader:</strong> When something you did looks worse in hindsight than it felt at the time, the move is the same: acknowledge it and ask forgiveness without inventing reasons. In the chapter, that leads to restoration. Krishna returns to the old familiarity instead of punishing it.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.53–11.55 · The Closing
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="devotion">The Close: Only Devotion Sees This</h2>

        <p>
          The chapter ends on a gentler note. Krishna says: this form, what you have just seen, cannot be reached by study of the Vedas, by austerity, by charity, or by ritual. It can be reached only by undivided devotion. Study, discipline and generosity, the paths that earn merit, do not earn this vision; only undivided love does (11.54).
        </p>

        <p>
          The chapter ends with 11.55. <em>The one who works for me, takes me as the supreme, is devoted to me, free from attachment, without hatred for any being: that one comes to me.</em> That makes five: work done for Krishna, holding him as the highest, devotion, no attachment, and no hostility toward any being.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.53"
          speaker="Krishna"
          sanskrit="नाहं वेदैर्न तपसा न दानेन न चेज्यया । शक्य एवंविधो द्रष्टुं दृष्टवानसि मां यथा ॥"
          iast="nāhaṃ vedair na tapasā na dānena na cejyayā | śakya evaṃ-vidho draṣṭuṃ dṛṣṭavān asi māṃ yathā ||"
          meaning="Not by the Vedas, not by austerity, not by charity, not by ritual sacrifice can I be seen in this form as you have just seen me."
          insightLabel="Merit has limits"
          insight="Study, austerity, charity and ritual are each named and each called insufficient for this vision. The Gita does not reject them elsewhere; here it ranks them below devotion, which Krishna names in the next verse."
          essence="Not by Vedas, austerity, charity or sacrifice can I be seen as you have seen me."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 11.55"
          speaker="Krishna"
          sanskrit="मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः । निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥"
          iast="mat-karma-kṛn mat-paramo mad-bhaktaḥ saṅga-varjitaḥ | nirvairaḥ sarva-bhūteṣu yaḥ sa mām eti pāṇḍava ||"
          meaning="The one who works for me, takes me as the supreme, is devoted to me, is free from attachment, and bears no hostility toward any being, that one comes to me, Pandava."
          insightLabel="Five conditions"
          insight="Work for the Divine, hold the Divine as highest, be devoted, drop attachment, and bear no enmity toward any being. None of the five is exotic; each can be lived inside an ordinary working life."
          essence="Whoever works for me, holds me highest, loves me, without attachment or enmity, comes to me."
        />

        <div className="pull-quote">
          <blockquote>
            "Whoever works for me, holds me as supreme, is devoted, free of attachment and of enmity toward all beings, comes to me."
          </blockquote>
          <cite>Bhagavad Gita 11.55</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 55 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>11.1</td><td>Arjuna</td><td>Out of grace you told me the secret about the Self, and my confusion is gone</td></tr>
            <tr><td>11.2</td><td>Arjuna</td><td>I have heard from you in detail how beings arise and end, and of your lasting greatness</td></tr>
            <tr><td>11.3</td><td>Arjuna</td><td>It is as you say, Supreme Lord; still, I want to see your sovereign form</td></tr>
            <tr><td>11.4</td><td>Arjuna</td><td>If you think I am able to see it, Lord of yoga, show me your imperishable Self</td></tr>
            <tr><td>11.5</td><td>Krishna</td><td>See my forms, Arjuna, by hundreds and thousands, divine, of many colours and shapes</td></tr>
            <tr><td>11.6</td><td>Krishna</td><td>See the Adityas, Vasus, Rudras, Ashvins and Maruts, and many wonders never seen before</td></tr>
            <tr><td>11.7</td><td>Krishna</td><td>See the whole universe, moving and unmoving, gathered here in my body, and whatever else you wish</td></tr>
            <tr><td>11.8</td><td>Krishna</td><td>You cannot see me with your own eyes; I give you divine sight. See my sovereign power</td></tr>
            <tr><td>11.9</td><td>Sanjaya</td><td>Saying this, Hari, the great Lord of yoga, showed Arjuna his supreme sovereign form</td></tr>
            <tr><td>11.10</td><td>Sanjaya</td><td>It had many mouths and eyes, many wondrous sights, divine ornaments and raised divine weapons</td></tr>
            <tr><td>11.11</td><td>Sanjaya</td><td>It wore divine garlands and robes and divine scents, endless, wondrous, facing every way</td></tr>
            <tr><td>11.12</td><td>Sanjaya</td><td>If a thousand suns rose at once in the sky, that might match the Great Self's radiance</td></tr>
            <tr><td>11.13</td><td>Sanjaya</td><td>Arjuna saw the universe, with its many divisions, gathered in Krishna's one body</td></tr>
            <tr><td>11.14</td><td>Sanjaya</td><td>Overcome with wonder, hair on end, Arjuna bowed his head and spoke with joined palms</td></tr>
            <tr><td>11.15</td><td>Arjuna</td><td>In your body I see all the gods, hosts of beings, Brahma on his lotus, sages and serpents</td></tr>
            <tr><td>11.16</td><td>Arjuna</td><td>I see you everywhere, with countless arms, bellies, mouths and eyes, without end, middle or beginning</td></tr>
            <tr><td>11.17</td><td>Arjuna</td><td>I see you with crown, mace and discus, a mass of light, blazing like fire and sun, hard to look at</td></tr>
            <tr><td>11.18</td><td>Arjuna</td><td>You are the imperishable, the highest to be known, the universe's resting place, guardian of dharma</td></tr>
            <tr><td>11.19</td><td>Arjuna</td><td>Without beginning, middle or end, sun and moon your eyes, you scorch the world with your radiance</td></tr>
            <tr><td>11.20</td><td>Arjuna</td><td>You alone fill the space between heaven and earth; the three worlds tremble at your form</td></tr>
            <tr><td>11.21</td><td>Arjuna</td><td>Hosts of gods enter you; some, afraid, praise you with joined palms; sages sing your hymns</td></tr>
            <tr><td>11.22</td><td>Arjuna</td><td>Rudras, Adityas, Vasus, Sadhyas and the other hosts of beings all gaze at you in amazement</td></tr>
            <tr><td>11.23</td><td>Arjuna</td><td>Seeing your vast form with its many mouths, eyes and terrible teeth, the worlds tremble, and so do I</td></tr>
            <tr><td>11.24</td><td>Arjuna</td><td>Seeing you touch the sky, blazing, mouths open wide, I tremble and find no steadiness or peace</td></tr>
            <tr><td>11.25</td><td>Arjuna</td><td>Seeing your mouths with tusks like the fire at the end of time, I lose my bearings; have mercy</td></tr>
            <tr><td>11.26</td><td>Arjuna</td><td>All of Dhritarashtra's sons, with Bhishma, Drona, Karna and our own chief warriors too</td></tr>
            <tr><td>11.27</td><td>Arjuna</td><td>rush into your fearsome mouths; some hang between your teeth with crushed heads</td></tr>
            <tr><td>11.28</td><td>Arjuna</td><td>As rivers rush toward the sea, these heroes of the world pour into your flaming mouths</td></tr>
            <tr><td>11.29</td><td>Arjuna</td><td>As moths rush into a blazing fire to die, these people rush into your mouths to their end</td></tr>
            <tr><td>11.30</td><td>Arjuna</td><td>You lick up the worlds on every side with flaming mouths; your fierce rays fill the universe</td></tr>
            <tr><td>11.31</td><td>Arjuna</td><td>Tell me who you are, in this terrible form; I bow to you, and I do not understand what you do</td></tr>
            <tr><td>11.32</td><td>Krishna</td><td>I am Time, grown mighty, destroyer of worlds; even without you, these warriors will not survive</td></tr>
            <tr><td>11.33</td><td>Krishna</td><td>So rise and win glory; they are already slain by me; be only the instrument, Arjuna</td></tr>
            <tr><td>11.34</td><td>Krishna</td><td>Kill Drona, Bhishma, Jayadratha, Karna and the rest, already slain by me; fight, and you will win</td></tr>
            <tr><td>11.35</td><td>Sanjaya</td><td>Hearing this, Arjuna, trembling, joined his palms, bowed, and spoke to Krishna in a choked voice</td></tr>
            <tr><td>11.36</td><td>Arjuna</td><td>Rightly the world rejoices in your praise; demons flee in fear and the perfected ones bow to you</td></tr>
            <tr><td>11.37</td><td>Arjuna</td><td>Why would they not bow to you, greater than Brahma himself, being and non-being and beyond both</td></tr>
            <tr><td>11.38</td><td>Arjuna</td><td>You are the first god, the ancient Purusha, the universe's resting place, the knower and the known</td></tr>
            <tr><td>11.39</td><td>Arjuna</td><td>You are Vayu, Yama, Agni, Varuna, the moon and the lord of creatures; I bow to you again and again</td></tr>
            <tr><td>11.40</td><td>Arjuna</td><td>I bow to you in front, behind and on every side; you pervade all, so you are all</td></tr>
            <tr><td>11.41</td><td>Arjuna</td><td>Thinking you a friend, I rashly called you Krishna, Yadava, friend, not knowing your greatness</td></tr>
            <tr><td>11.42</td><td>Arjuna</td><td>Whatever disrespect I showed you in jest, at play, at rest or at meals, alone or with others, forgive it</td></tr>
            <tr><td>11.43</td><td>Arjuna</td><td>You are the father of the world and its most honoured teacher; nothing in the three worlds equals you</td></tr>
            <tr><td>11.44</td><td>Arjuna</td><td>Bowing low, I ask your grace: bear with me as a father with a son, friend with friend, lover with beloved</td></tr>
            <tr><td>11.45</td><td>Arjuna</td><td>I rejoice at what was never seen before, yet my mind shakes with fear; show me your other form</td></tr>
            <tr><td>11.46</td><td>Arjuna</td><td>I want to see you as before, with crown, mace and discus; take your four-armed form</td></tr>
            <tr><td>11.47</td><td>Krishna</td><td>By my grace I showed you this supreme form, which no one but you has seen before</td></tr>
            <tr><td>11.48</td><td>Krishna</td><td>Not by Vedas, sacrifice, study, gifts, rituals or austerities can anyone but you see me in this form</td></tr>
            <tr><td>11.49</td><td>Krishna</td><td>Do not be afraid or bewildered at this terrible form; free of fear and glad at heart, see my other form</td></tr>
            <tr><td>11.50</td><td>Sanjaya</td><td>Saying this, Krishna showed his own form again and, gentle once more, consoled the frightened Arjuna</td></tr>
            <tr><td>11.51</td><td>Arjuna</td><td>Seeing your gentle human form, Janardana, I am composed and myself again</td></tr>
            <tr><td>11.52</td><td>Krishna</td><td>This form you have seen is very hard to see; even the gods always long to see it</td></tr>
            <tr><td>11.53</td><td>Krishna</td><td>Not by Vedas, austerity, charity or sacrifice can I be seen as you have seen me</td></tr>
            <tr><td>11.54</td><td>Krishna</td><td>Only by undivided devotion can I be known, seen and entered in this way</td></tr>
            <tr><td>11.55</td><td>Krishna</td><td>Whoever works for me, holds me highest, loves me, without attachment or enmity, comes to me</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-10" className="ch-nav-title">Chapter 10, Vibhuti Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-12" className="ch-nav-title">Chapter 12, Bhakti Yoga</a>
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


        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the count of conditions in 11.55 (five), the speaker of 11.11–14 (Sanjaya, not Arjuna), the claim that Arjuna falls silent during the vision, and which Oppenheimer quotation comes from which verse (11.12 and 11.32); copy edited.</p>

        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 11 about?</div>
            <div className="faq-a">
              Chapter 11, called Vishwarupa Darshana Yoga (the Yoga of the Vision of the Cosmic Form), is the dramatic high point of the Bhagavad Gita. Arjuna asks to see Krishna's universal form. Krishna grants him divine sight and shows him the cosmic body, a vision of infinite arms, infinite mouths, beings being consumed by time. The chapter contains the famous 'thousand suns' verse (11.12), the line 'I am Time, the destroyer of worlds' (11.32), and the closing teaching that only undivided devotion can reach this vision (11.53-55).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the meaning of Bhagavad Gita 11.32?</div>
            <div className="faq-a">
              Verse 11.32 (<em>kālo'smi loka-kṣaya-kṛt pravṛddhaḥ</em>), which translates as 'I am Time, grown mighty, the destroyer of worlds.' Krishna identifies himself as Time itself. The verse goes on to say that even without Arjuna, the warriors arrayed against him will not survive. Beyond the war, the verse says that whatever you fear losing is already loosening, because everything in time ends. Oppenheimer said in 1965 that this line came to him at the Trinity test.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the 'thousand suns' verse in the Bhagavad Gita?</div>
            <div className="faq-a">
              Verse 11.12 says, 'If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self.' Sanjaya speaks it, describing the cosmic form, and admits that even this comparison might only begin to match it. According to Robert Jungk's book Brighter than a Thousand Suns, Oppenheimer thought of this verse at the Trinity test in 1945.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'nimitta matram bhava' mean?</div>
            <div className="faq-a">
              In verse 11.33, Krishna tells Arjuna, '<em>nimitta-mātraṃ bhava savya-sācin</em>' ('become only the instrument, Arjuna'). What unfolds on the battlefield was set in motion before Arjuna acts. Krishna says the warriors are already slain by him. Arjuna's task is to be a clean instrument: present, accountable, attentive. Read beyond the war: do the work, and leave the outcome to the larger order.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the universal form (Vishwarupa) in the Bhagavad Gita?</div>
            <div className="faq-a">
              The <em>vishwarupa</em> or universal form is Krishna's cosmic body: the form in which the entire universe is contained. Arjuna sees it in Chapter 11 after asking for direct vision. The form has infinite arms, infinite eyes, mouths like blazing fire, and contains all beings within it. It cannot be seen with ordinary eyes, so Krishna gives Arjuna divine sight (11.8).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Why did Arjuna apologise to Krishna in Chapter 11?</div>
            <div className="faq-a">
              After the cosmic vision, in verses 11.41-44, Arjuna apologises for having treated Krishna with casual familiarity, calling him by name, joking with him, eating with him, without realising who he truly was. He asks Krishna to forgive him as a father forgives a son, as a friend forgives a friend, as a lover forgives a beloved. The friendship survives the reverence: Krishna returns to his human form (11.51) and the two go on as before.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about fear, death and impermanence</div>
          </a>
          <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">The Gita as a story, the climax</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-10" className="related-card">
            <div className="related-card-label">Chapter 10</div>
            <div className="related-card-title">Vibhuti Yoga, Sparks of the Divine</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-12" className="related-card">
            <div className="related-card-label">Chapter 12</div>
            <div className="related-card-title">Bhakti Yoga, How a Devotee Actually Lives</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-15" className="related-card">
            <div className="related-card-label">Chapter 15</div>
            <div className="related-card-title">Purushottama Yoga, Cut the Tree, Find the Source</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 11"} />

        </article>
      </div>

      {/* FOOTER */}
      <footer>
        <p>
          Wisdom © 2026. Part of a{' '}
          <a
            href={appStoreUrl('web_blog_footer')}
            target="_blank"
            rel="noopener"
            data-mp-location="footer"
          >free iPhone app</a>{' '}
          that tunes the Bhagavad Gita to your life, one verse a day. Made with reverence.
        </p>
        <p style={{ marginTop: '8px' }}>
          <a href="/">wisdomquotes.in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:work.ankurshukla@gmail.com">Support</a>
        </p>
      </footer>

      <BlogTracker pageName="Bhagwat Geeta Chapter 11" />
    </>
  )
}

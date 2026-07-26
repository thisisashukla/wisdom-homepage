---
name: wisdom-blog
description: >
  Use this skill whenever writing, updating, or publishing a blog post on the wisdom-homepage.
  Triggers include: "write a blog", "publish a blog", "add an article", "create a post for wisdom",
  "blog about X for wisdom-homepage", or any request to produce content for wisdomquotes.in.
  This skill covers the full lifecycle: Next.js page structure, design system, JSX conventions,
  SEO metadata, image handling, shloka card markup, and the two-file checklist that must be
  completed every time a new post is added. Do NOT skip this skill — missing the nav bar or
  forgetting to update the blog index are the most common and most visible mistakes.
---

# Wisdom Homepage — Blog Writing Guide

## 1. Project Architecture (read this first)

The wisdom-homepage is a **Next.js App Router** project. There are two parallel representations of every blog:

| File | Purpose | Authority |
|---|---|---|
| `src/app/blogs/<slug>/page.tsx` | Next.js route — what actually renders at wisdomquotes.in/blogs/<slug> | **Primary** |
| `blogs/<slug>.html` | Static HTML fallback | Secondary |

The **Next.js TSX file is authoritative**. The static HTML is a fallback. Always create/edit the TSX first; keep the HTML in sync as a secondary step.

## 2. New Blog Checklist (do every one, every time)

- [ ] Create `src/app/blogs/<slug>/page.tsx` using the template in §4
- [ ] Update `src/app/blogs/page.tsx` — increment article count, add new card
- [ ] Update `blogs/index.html` — same increment and card (static fallback)
- [ ] Create `blogs/<slug>.html` (static fallback, optional but preferred)
- [ ] Add hero image as `.webp` in `public/assets/` (see §6)

Missing any of these is what causes "I can only see 4 articles" or broken nav bugs.

## 3. Design System — CSS Variables

Always include these variables at the top of `pageCSS`. Never hardcode colours.

```css
:root {
  --maroon: #3d0c0c;
  --maroon-mid: #5c1a1a;
  --gold: #c8881e;
  --gold-light: #f5c96a;
  --gold-pale: #fdf3dc;
  --gold-dim: rgba(200,136,30,0.15);
  --gold-border: #e8c97a;
  --text: #f5e8cc;
  --text-dim: rgba(245,232,204,0.65);
  --text-dimmer: rgba(245,232,204,0.35);
  --muted-2: rgba(245,232,204,0.35);
  --border: rgba(200,136,30,0.2);
  --bg: #120505;
  --bg-warm: #190707;
  --bg-alt: #0f0404;
  --bg-card: rgba(255,255,255,0.04);
  --bg-card-hover: rgba(255,255,255,0.07);
  --max: 780px;
}
```

Key font families:
- Body: `'Inter', sans-serif`
- Headings / logo: `'Playfair Display', Georgia, serif`
- Sanskrit text: `'Noto Sans Devanagari', sans-serif`

## 4. Page TSX Template

Every blog page follows this exact skeleton. Do not deviate from it. The nav, breadcrumb, article-hero, content, faq-section, app-cta, and footer sections must ALL be present and in this order.

```tsx
import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Full SEO Title | Wisdom",
  description: "Meta description (140-160 chars).",
  keywords: "keyword1, keyword2, keyword3",
  openGraph: {
    title: "OG Title | Wisdom",
    description: "OG description.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/<slug>",
    siteName: 'Wisdom',
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/<slug>" },
}

const pageCSS = `
  /* paste full CSS here — see §3 for variables, §5 for required component styles */
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Full article title",
    "description": "Article description",
    "datePublished": "YYYY-MM-DD",
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
      "name": "Wisdom App",
      "url": "https://wisdomquotes.in"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FAQ question?",
        "acceptedAnswer": { "@type": "Answer", "text": "Answer text." }
      }
      // add 4-6 FAQ entries
    ]
  }
]

export default function BlogPageName() {
  return (
    <>
      {/* 1. Styles */}
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />

      {/* 2. JSON-LD schemas */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* 3. NAV — REQUIRED, do not skip */}
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
            <li><a href="/#features">Features</a></li>
            <li><a href="/#how-it-works">How it works</a></li>
            <li><a href="/#topics">Topics</a></li>
            <li><a href="/blogs" className="active">Blog</a></li>
            <li><a href="/about">About</a></li>
            <li>
              <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
                 target="_blank" rel="noopener" className="btn-nav" data-mp-location="nav">
                Download Free
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Wisdom</a>
          <span className="bc-sep">/</span>
          <a href="/blogs">Blog</a>
          <span className="bc-sep">/</span>
          Short Page Title
        </div>
      </div>

      {/* 5. ARTICLE HERO */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Badge text — e.g. Chapter 1 · The Yoga of Arjuna&apos;s Grief
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Main Headline —<br />
            <em>Subtitle in italics</em>
          </h1>
          <p className="article-subtitle">
            One to three sentence hook that sets up the article.
          </p>
          <div className="article-meta">
            <span className="meta-item">
              By <a href="/about" rel="author" data-mp-location="byline_author"
                   style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>
                Ankur Shukla
              </a>
            </span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Topic label</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~X min read</span>
          </div>
        </div>
      </div>

      {/* 6. MAIN CONTENT */}
      <div className="content">
        {/* Hero image — always first inside .content */}
        <figure className="chapter-image">
          <img
            src="/assets/your-image.webp"
            alt="Descriptive alt text"
            width={1200}
            height={800}
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Brief image caption.</figcaption>
        </figure>

        <p className="lead">Opening paragraph — the hook.</p>

        {/* ... article body ... */}

        {/* Closing CTA box */}
        <div className="highlight-box">
          <h3>One Verse Per Day</h3>
          <p>
            The Wisdom app delivers one verse from the Bhagavad Gita each morning — Sanskrit,
            transliteration, meaning, and modern relevance. Home screen widget. Free.
          </p>
        </div>
      </div>

      {/* 7. FAQ SECTION */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <strong>Question?</strong>
          <p>Answer.</p>
        </div>
        {/* 4-6 FAQ items */}
      </div>

      {/* 8. APP CTA */}
      <div className="content">
        <div className="app-cta">
          <div className="app-cta-eyebrow">Free iOS App</div>
          <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
          <p className="app-cta-desc">
            The Wisdom app delivers one verse each day — Devanagari script, transliteration,
            meaning, and how it applies right now. 700 verses from the Bhagavad Gita and growing.
            Home screen widget. Free.
          </p>
          <div className="app-cta-features">
            <span>✦ Daily shloka in Sanskrit</span>
            <span>✦ Meaning &amp; modern context</span>
            <span>✦ Home screen widget</span>
          </div>
          <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
             target="_blank" rel="noopener" className="app-cta-btn" data-mp-location="cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on the App Store
          </a>
          <div className="app-cta-sub">Free · iPhone · No account needed</div>
        </div>
      </div>

      {/* 9. FOOTER */}
      <footer>
        <p>© 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p>
          <a href="https://wisdomquotes.in">Home</a>
          {' — '}
          <a href="https://wisdomquotes.in/blogs">Blog</a>
          {' — '}
          <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
             target="_blank" rel="noopener" data-mp-location="footer">Download</a>
        </p>
      </footer>

      {/* 10. ANALYTICS — always last, use the actual page name */}
      <BlogTracker pageName="Human-Readable Page Name" />
    </>
  )
}
```

## 5. Required CSS Component Styles

Include all of these in `pageCSS`. Copy the full blocks from an existing blog page (e.g. `bhagavad-gita-anxiety-mental-peace/page.tsx`); the key sections are:

| CSS Class | Purpose |
|---|---|
| `body > nav`, `.nav-inner` | Sticky top nav bar |
| `.logo`, `.logo-mark` | Logo + circular avatar |
| `.nav-links`, `.btn-nav` | Nav items + CTA button |
| `.breadcrumb`, `.breadcrumb-inner`, `.bc-sep` | Breadcrumb bar |
| `.article-hero`, `.article-hero-inner` | Hero banner |
| `.chapter-badge`, `.chapter-badge-dot` | Gold pill badge in hero |
| `.article-title`, `.article-subtitle`, `.article-meta` | Hero typography |
| `.chapter-image` | Hero image figure |
| `.content` | Main text container (max-width: var(--max)) |
| `.lead` | First paragraph styling |
| `h2`, `h3`, `p` | Body typography |
| `.shloka-card` | Verse card (see §7) |
| `.faq-section`, `.faq-item` | FAQ block |
| `.app-cta` and sub-elements | App download CTA |
| `footer` | Page footer |
| `@media (max-width: 768px)` | Mobile overrides |

## 6. Image Guidelines

- **Format**: Always use `.webp`. Convert PNGs before using:
  ```bash
  cwebp -q 82 public/assets/image.png -o public/assets/image.webp
  # then delete the .png
  ```
  (Use `allow_cowork_file_delete` tool before running `rm` on macOS if needed.)
- **Location**: `public/assets/` in the repo
- **Path in JSX**: `/assets/filename.webp` — always absolute from root, never `../assets/`
- **Hero image attributes**: always include `width`, `height`, `loading="eager"`, `fetchPriority="high"`
- **Alt text**: descriptive, keyword-relevant, not generic

## 7. Shloka Card Markup

For posts featuring Sanskrit verses, use this card structure:

```tsx
<div className="shloka-card">
  <div className="verse-number">Source Text X.Y</div>
  <div className="sanskrit">Sanskrit text here</div>
  <div className="transliteration">IAST transliteration here</div>
  <div className="meaning">
    <div className="meaning-label">Translation</div>
    <div className="meaning-text">English translation.</div>
  </div>
  <div className="insight">
    <div className="insight-label">Why This Matters for Mental Health</div>
    <div className="insight-text">2-3 sentence practical commentary.</div>
  </div>
  <div className="essence">One-line distillation of the verse.</div>
</div>
```

Sanskrit text with line breaks: use `{'\n'}` (JSX string literal), not `<br>`.

## 8. JSX Conversion Rules

When converting HTML to TSX, or writing TSX from scratch:

| HTML | JSX |
|---|---|
| `class="foo"` | `className="foo"` |
| `<img src="...">` | `<img src="..." />` (self-close) |
| `<br>` | `<br />` |
| `<input>`, `<hr>`, `<meta>` | all must be self-closed |
| `style="color:red"` | `style={{ color: 'red' }}` |
| `&amp;`, `&ldquo;` etc. | HTML entities work fine in JSX |
| `'` in text | use `&apos;` or `{'\''}`  |
| `"` in text | use `&ldquo;&rdquo;` or `{'"'}` |
| `style="color:var(--gold)"` | `style={{ color: 'var(--gold-light)' }}` |
| `fetchpriority="high"` | `fetchPriority="high"` (camelCase) |
| `width="1200"` on `<img>` | `width={1200}` (numeric, no quotes) |
| HTML comments `<!-- -->` | `{/* */}` |

**Do not** use `<img>` from `next/image` unless you know what you're doing — the inline `<img>` with an explicit path works fine for blog pages.

## 9. Updating the Blog Index (Two Files, Every Time)

### `src/app/blogs/page.tsx` (primary — actually rendered)

1. Update the article count: `{N} articles` → `{N+1} articles`
2. Add a new article card in the cards grid, at the top (most recent first)

Card JSX pattern:
```tsx
<a href="/blogs/<slug>" className="article-card" data-mp-location="blog_listing">
  <div className="card-eyebrow">CATEGORY · TOPIC</div>
  <div className="card-title">Article Title</div>
  <div className="card-excerpt">One sentence teaser.</div>
  <div className="card-meta">
    <span>Author Name</span>
    <span className="card-meta-sep">·</span>
    <span>~X min read</span>
  </div>
</a>
```

### `blogs/index.html` (static fallback)

Mirror the same change in the static HTML. The card structure is identical but uses plain HTML attributes (`class=` not `className=`).

## 10. SEO & Metadata Guidelines

- **Title**: `{Keyword-rich title} | Wisdom` — keep under 60 characters
- **Description**: 140–160 characters, include primary keyword naturally
- **Keywords**: 8–12 comma-separated terms; primary, secondary, and long-tail
- **Canonical URL**: always set to `https://wisdomquotes.in/blogs/<slug>`
- **Article JSON-LD**: always include `datePublished` (use today's date YYYY-MM-DD)
- **FAQPage JSON-LD**: 4–6 questions that match the H2 questions in the FAQ section
- **Slug convention**: lowercase, hyphenated, keyword-rich (e.g. `bhagavad-gita-anxiety-mental-peace`)

## 11. Content Voice & Framing

The wisdom-homepage has a specific editorial voice:

- **Author position**: Ankur is a data scientist / engineer exploring these texts analytically. Write from that perspective — "we ran this corpus", "the data shows", "out of 700 verses" rather than "I have been reading the Gitas for years."
- **Tone**: intellectually curious, precise, not preachy or devotional. Treat ancient texts the way you'd treat an interesting dataset.
- **Length**: 1800–3000 words per post is the sweet spot. Long enough to be substantive, not padded.
- **Structure**: lead → context/background → main sections (one per gita / chapter / topic) → synthesis paragraph → FAQ → app CTA
- **Shloka sections**: each major section should have at least one shloka card, plus 2–3 paragraphs of commentary grounded in the verse
- **No first-person "I read this last night"** — position it as rigorous exploration of the corpus
- **App plug**: always end the content section with the `highlight-box` leading into the app CTA. Never omit the CTA.

## 12. Data Sources

Sanskrit verse data lives in the mounted `sanscripts` folder:
- `sanscripts/data/processed_data_v2/` — JSON files per text, one verse per object
- Each verse object typically has fields: `verse_number`, `devanagari`, `transliteration`, `meaning`, `chapter` (where applicable)
- Always pull actual verse data from these files rather than writing shlokas from memory

## 13. Final Pre-Publish Checklist

Before considering a blog complete:

- [ ] `page.tsx` has valid TypeScript — no unclosed JSX tags, all void elements self-closed
- [ ] `<img>` tags use `/assets/` paths (not `../assets/` or `../../`)
- [ ] `MobileNavToggle` is imported and placed inside `.nav-inner` (mobile nav won't work without it)
- [ ] `BlogTracker` is imported and is the last element before `</>`
- [ ] CSS includes all component styles listed in §5
- [ ] Both blog index files updated (§9)
- [ ] Hero image is `.webp` in `public/assets/`
- [ ] JSON-LD schemas match the page title and FAQ content
- [ ] `datePublished` uses today's actual date

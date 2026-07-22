/**
 * blogVerseLinks.ts
 *
 * Static mapping from Bhagavad Gita verse ("chapter-verse") to curated blog
 * posts that go deeper on that verse's theme. Used by verse pages to render
 * a "Go Deeper" section after the main commentary.
 *
 * Rules:
 *  - Max 2 links per verse to avoid clutter.
 *  - First link = most specific / dedicated essay on that verse or theme.
 *  - Second link = broader complementary read.
 *  - Chapter-summary blogs are NOT included here (too generic for every verse).
 *  - CTA copy must be specific and exciting — no "Read more" or "Learn more".
 */

export interface BlogLink {
  /** URL slug — page lives at /blog/[slug] */
  slug: string
  /** Short display title */
  title: string
  /** Exciting, specific call-to-action shown as the link text */
  cta: string
}

/** Map from "chapter-verse" to ordered BlogLink array (most specific first). */
const VERSE_BLOG_MAP: Record<string, BlogLink[]> = {

  // ── Chapter 2 ──────────────────────────────────────────────────────────────

  '2-13': [
    {
      slug: 'bhagavad-gita-on-death-and-the-soul',
      title: 'The Gita on Death and the Soul',
      cta: 'What the Gita really says about death — not comfort, just clarity →',
    },
  ],

  '2-14': [
    {
      slug: 'bhagavad-gita-anxiety-mental-peace',
      title: 'The Gita on Anxiety and Mental Peace',
      cta: 'How the Gita answers pain, restlessness, and the urge to escape →',
    },
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  '2-20': [
    {
      slug: 'bhagavad-gita-on-death-and-the-soul',
      title: 'The Gita on Death and the Soul',
      cta: 'What the Gita really says about death — not comfort, just clarity →',
    },
  ],

  '2-22': [
    {
      slug: 'bhagavad-gita-on-death-and-the-soul',
      title: 'The Gita on Death and the Soul',
      cta: 'What the Gita really says about death — not comfort, just clarity →',
    },
  ],

  '2-23': [
    {
      slug: 'bhagavad-gita-on-death-and-the-soul',
      title: 'The Gita on Death and the Soul',
      cta: 'What the Gita really says about death — not comfort, just clarity →',
    },
  ],

  '2-38': [
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  '2-47': [
    {
      slug: 'bhagavad-gita-2-47-karmanye-vadhikaraste',
      title: 'Karmanye Vadhikaraste — Full Essay',
      cta: 'Every word of this verse, unpacked — the dedicated deep-dive →',
    },
    {
      slug: 'nishkama-karma-bhagavad-gita',
      title: 'Nishkama Karma',
      cta: 'How to act without craving the result — the full argument →',
    },
  ],

  '2-55': [
    {
      slug: 'sthitaprajna-bhagavad-gita',
      title: 'Sthitaprajna — Portrait of the Wise',
      cta: "The Gita's 18-verse portrait of a mind nothing can shake →",
    },
  ],

  '2-56': [
    {
      slug: 'sthitaprajna-bhagavad-gita',
      title: 'Sthitaprajna — Portrait of the Wise',
      cta: "The Gita's 18-verse portrait of a mind nothing can shake →",
    },
    {
      slug: 'bhagavad-gita-anxiety-mental-peace',
      title: 'The Gita on Anxiety and Mental Peace',
      cta: 'How the Gita answers pain, restlessness, and the urge to escape →',
    },
  ],

  '2-58': [
    {
      slug: 'sthitaprajna-bhagavad-gita',
      title: 'Sthitaprajna — Portrait of the Wise',
      cta: "The Gita's 18-verse portrait of a mind nothing can shake →",
    },
  ],

  '2-62': [
    {
      slug: 'sthitaprajna-bhagavad-gita',
      title: 'Sthitaprajna — Portrait of the Wise',
      cta: "The Gita's 18-verse portrait of a mind nothing can shake →",
    },
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  '2-63': [
    {
      slug: 'sthitaprajna-bhagavad-gita',
      title: 'Sthitaprajna — Portrait of the Wise',
      cta: "The Gita's 18-verse portrait of a mind nothing can shake →",
    },
    {
      slug: 'bhagavad-gita-anxiety-mental-peace',
      title: 'The Gita on Anxiety and Mental Peace',
      cta: 'How the Gita answers pain, restlessness, and the urge to escape →',
    },
  ],

  '2-65': [
    {
      slug: 'sthitaprajna-bhagavad-gita',
      title: 'Sthitaprajna — Portrait of the Wise',
      cta: "The Gita's 18-verse portrait of a mind nothing can shake →",
    },
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  '2-66': [
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  '2-70': [
    {
      slug: 'sthitaprajna-bhagavad-gita',
      title: 'Sthitaprajna — Portrait of the Wise',
      cta: "The Gita's 18-verse portrait of a mind nothing can shake →",
    },
  ],

  // ── Chapter 3 ──────────────────────────────────────────────────────────────

  '3-9': [
    {
      slug: 'nishkama-karma-bhagavad-gita',
      title: 'Nishkama Karma',
      cta: 'How to act without craving the result — the full argument →',
    },
    {
      slug: 'bhagavad-gita-karma-meaning',
      title: 'What Karma Really Means',
      cta: 'What karma actually means in the Gita — not what you think →',
    },
  ],

  '3-19': [
    {
      slug: 'nishkama-karma-bhagavad-gita',
      title: 'Nishkama Karma',
      cta: 'How to act without craving the result — the full argument →',
    },
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  '3-27': [
    {
      slug: 'ahankara-meaning-bhagavad-gita',
      title: 'Ahankara — The Gita on Ego',
      cta: 'The Gita has a word for ego: ahankara. Here is what it actually means →',
    },
  ],

  '3-35': [
    {
      slug: 'dharma-meaning-bhagavad-gita',
      title: 'What Dharma Really Means',
      cta: 'Dharma is not just "duty" — the Gita\'s real meaning of the word →',
    },
  ],

  // ── Chapter 4 ──────────────────────────────────────────────────────────────

  '4-7': [
    {
      slug: 'dharma-meaning-bhagavad-gita',
      title: 'What Dharma Really Means',
      cta: 'Dharma is not just "duty" — the Gita\'s real meaning of the word →',
    },
    {
      slug: '20-famous-sanskrit-shlokas',
      title: '20 Famous Sanskrit Shlokas',
      cta: 'One of the 20 most quoted Sanskrit shlokas — the full collection →',
    },
  ],

  '4-8': [
    {
      slug: 'dharma-meaning-bhagavad-gita',
      title: 'What Dharma Really Means',
      cta: 'Dharma is not just "duty" — the Gita\'s real meaning of the word →',
    },
  ],

  '4-11': [
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  '4-34': [
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  '4-37': [
    {
      slug: 'bhagavad-gita-karma-meaning',
      title: 'What Karma Really Means',
      cta: 'What karma actually means in the Gita — not what you think →',
    },
  ],

  '4-38': [
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  // ── Chapter 6 ──────────────────────────────────────────────────────────────

  '6-5': [
    {
      slug: 'bhagavad-gita-for-students',
      title: 'Bhagavad Gita for Students',
      cta: 'What this verse means when you are facing pressure, exams, or doubt →',
    },
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  '6-6': [
    {
      slug: 'bhagavad-gita-for-students',
      title: 'Bhagavad Gita for Students',
      cta: 'What this verse means when you are facing pressure, exams, or doubt →',
    },
  ],

  '6-35': [
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  // ── Chapter 7 ──────────────────────────────────────────────────────────────

  '7-14': [
    {
      slug: 'maya-meaning-bhagavad-gita',
      title: 'What Maya Really Means',
      cta: 'Maya is not "everything is fake" — the Gita\'s much sharper claim →',
    },
  ],

  '7-15': [
    {
      slug: 'maya-meaning-bhagavad-gita',
      title: 'What Maya Really Means',
      cta: 'Maya is not "everything is fake" — the Gita\'s much sharper claim →',
    },
  ],

  // ── Chapter 9 ──────────────────────────────────────────────────────────────

  '9-14': [
    {
      slug: 'hare-krishna-mahamantra',
      title: 'The Hare Krishna Mahamantra',
      cta: 'The mantra that flows from this verse — its story and meaning →',
    },
  ],

  '9-22': [
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  '9-26': [
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  // ── Chapter 12 ─────────────────────────────────────────────────────────────

  '12-5': [
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  '12-8': [
    {
      slug: 'krishna-three-paths-bhagavad-gita',
      title: 'Three Paths: Karma, Jnana, Bhakti',
      cta: 'Three paths to liberation — which one is yours? →',
    },
  ],

  '12-15': [
    {
      slug: 'bhagavad-gita-on-anxiety',
      title: 'Bhagavad Gita on Anxiety',
      cta: '9 verses the Gita uses to answer anxiety — the full picture →',
    },
  ],

  // ── Chapter 14 ─────────────────────────────────────────────────────────────

  '14-5': [
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  '14-6': [
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  '14-7': [
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  '14-8': [
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  '14-10': [
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  '14-19': [
    {
      slug: 'maya-meaning-bhagavad-gita',
      title: 'What Maya Really Means',
      cta: 'Maya is not "everything is fake" — the Gita\'s much sharper claim →',
    },
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  '14-20': [
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  '14-26': [
    {
      slug: 'sattva-rajas-tamas-three-gunas-bhagavad-gita',
      title: 'Sattva, Rajas, Tamas — The Three Gunas',
      cta: 'The three forces shaping your every mood and decision →',
    },
  ],

  // ── Chapter 15 ─────────────────────────────────────────────────────────────

  '15-7': [
    {
      slug: 'bhagavad-gita-on-death-and-the-soul',
      title: 'The Gita on Death and the Soul',
      cta: 'What the Gita really says about death — not comfort, just clarity →',
    },
  ],

  '15-15': [
    {
      slug: '20-famous-sanskrit-shlokas',
      title: '20 Famous Sanskrit Shlokas',
      cta: 'One of the 20 most quoted Sanskrit shlokas — the full collection →',
    },
  ],

  // ── Chapter 16 ─────────────────────────────────────────────────────────────

  '16-1': [
    {
      slug: 'bhagavad-gita-for-students',
      title: 'Bhagavad Gita for Students',
      cta: 'What this verse means when you are facing pressure, exams, or doubt →',
    },
  ],

  '16-15': [
    {
      slug: 'ahankara-meaning-bhagavad-gita',
      title: 'Ahankara — The Gita on Ego',
      cta: 'The Gita has a word for ego: ahankara. Here is what it actually means →',
    },
  ],

  '16-18': [
    {
      slug: 'ahankara-meaning-bhagavad-gita',
      title: 'Ahankara — The Gita on Ego',
      cta: 'The Gita has a word for ego: ahankara. Here is what it actually means →',
    },
  ],

  // ── Chapter 18 ─────────────────────────────────────────────────────────────

  '18-11': [
    {
      slug: 'nishkama-karma-bhagavad-gita',
      title: 'Nishkama Karma',
      cta: 'How to act without craving the result — the full argument →',
    },
  ],

  '18-47': [
    {
      slug: 'dharma-meaning-bhagavad-gita',
      title: 'What Dharma Really Means',
      cta: 'Dharma is not just "duty" — the Gita\'s real meaning of the word →',
    },
  ],

  '18-58': [
    {
      slug: 'ahankara-meaning-bhagavad-gita',
      title: 'Ahankara — The Gita on Ego',
      cta: 'The Gita has a word for ego: ahankara. Here is what it actually means →',
    },
  ],

  '18-59': [
    {
      slug: 'ahankara-meaning-bhagavad-gita',
      title: 'Ahankara — The Gita on Ego',
      cta: 'The Gita has a word for ego: ahankara. Here is what it actually means →',
    },
  ],

  '18-61': [
    {
      slug: 'maya-meaning-bhagavad-gita',
      title: 'What Maya Really Means',
      cta: 'Maya is not "everything is fake" — the Gita\'s much sharper claim →',
    },
  ],

  '18-66': [
    {
      slug: 'dharma-meaning-bhagavad-gita',
      title: 'What Dharma Really Means',
      cta: 'Dharma is not just "duty" — the Gita\'s real meaning of the word →',
    },
    {
      slug: 'best-bhagavad-gita-translation',
      title: 'Best Bhagavad Gita Translation',
      cta: 'Which Gita translation should you actually read? An honest guide →',
    },
  ],

  '18-78': [
    {
      slug: 'bhagwat-geeta-saar',
      title: 'Bhagwat Geeta Saar',
      cta: "The Gita's entire 700-verse argument, distilled to its essence →",
    },
  ],
}

/**
 * Returns the curated blog links for a given verse.
 * Returns an empty array when no blogs are mapped to that verse.
 */
export function getBlogLinksForVerse(chapter: number, verse: number): BlogLink[] {
  return VERSE_BLOG_MAP[`${chapter}-${verse}`] ?? []
}

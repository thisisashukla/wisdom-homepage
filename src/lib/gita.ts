/**
 * Typed content layer for Bhagavad Gita pages.
 *
 * All data is generated at build time by `npm run gita:update` and committed
 * under `src/content/gita/`. This module is the only thing the routes touch —
 * if the data shape ever changes, only this file updates.
 *
 * V2 (May 2026): we now ship the rich commentary fields (simpleMeaning,
 * detailedMeaning, modernRelevance, translationLiteral) to the web. Earlier
 * versions held these back; with 1,604 thin verse pages producing near-zero
 * clicks, the SEO upside is far larger than any "moat" value left in keeping
 * the commentary app-only.
 *
 * Still held back (app-only): quote_variants, target_audience, tone, category,
 * requisite_concepts, nodeId, path, depth, is_standalone.
 */

import chaptersJson from '@/content/gita/chapters.json'
import indexJson from '@/content/gita/index.json'
import topicsJson from '@/content/gita/topics.json'

// ── Types ────────────────────────────────────────────────────────────────────

export type Verse = {
  chapter: number
  verse: number
  order: number
  sanskrit: string
  hindiTranslation: string
  englishTranslation: string
  essence: string
  speaker: string
  /** Deity context, if any (e.g. "Krishna", "Vishnu"). Optional. */
  deity?: string
  tags: string[]
  // ── V2 enrichment (optional — older verse files may omit these) ──
  /** One-sentence "what this verse is saying" — easy reading. */
  simpleMeaning?: string
  /** One-line takeaway, the practical insight a reader can carry. */
  simpleInsight?: string
  /** 2–3 sentence detailed context: who is speaking to whom, why, what's at stake. */
  detailedMeaning?: string
  /** A modern scenario where this verse lands — bridges 2,500 years for a reader. */
  modernRelevance?: string
  /** Word-by-word Sanskrit gloss, useful for study. */
  translationLiteral?: string
  /** Category: "philosophical", "narrative", "declaration", etc. Used for structuring. */
  verseType?: string
}

export type Chapter = {
  number: number
  enName: string
  enTitle: string
  hiName: string
  hiTitle: string
  totalVerses: number
  processedVerses: number
  verses: number[]
}

export type IndexEntry = {
  chapter: number
  verse: number
  order: number
  speaker: string
  essence: string
  snippet: string
  tags: string[]
}

export type TopicSummary = {
  slug: string
  label: string
  verseCount: number
}

export type Topic = TopicSummary & {
  verses: { chapter: number; verse: number }[]
}

// ── Loaders ──────────────────────────────────────────────────────────────────

const chapters = chaptersJson as Chapter[]
const indexEntries = indexJson as IndexEntry[]
const topicSummaries = topicsJson as TopicSummary[]

export const getAllChapters = (): Chapter[] => chapters

export const getChapter = (number: number): Chapter | undefined =>
  chapters.find((c) => c.number === number)

export const getAllVerseRefs = (): Array<{ chapter: number; verse: number }> =>
  indexEntries.map((e) => ({ chapter: e.chapter, verse: e.verse }))

export const getVerse = async (chapter: number, verse: number): Promise<Verse | null> => {
  try {
    const data = await import(`@/content/gita/verses/${chapter}-${verse}.json`)
    return data.default as Verse
  } catch {
    return null
  }
}

export const getChapterVerses = async (chapter: number): Promise<Verse[]> => {
  const ch = getChapter(chapter)
  if (!ch) return []
  const verses: Verse[] = []
  for (const v of ch.verses) {
    const verse = await getVerse(chapter, v)
    if (verse) verses.push(verse)
  }
  return verses
}

export const getAllTopics = (): TopicSummary[] => topicSummaries

export const getTopic = async (slug: string): Promise<Topic | null> => {
  try {
    const data = await import(`@/content/gita/topics/${slug}.json`)
    return data.default as Topic
  } catch {
    return null
  }
}

export const getTopicVerses = async (slug: string, limit = 50): Promise<Verse[]> => {
  const topic = await getTopic(slug)
  if (!topic) return []
  const verses: Verse[] = []
  for (const ref of topic.verses.slice(0, limit)) {
    const v = await getVerse(ref.chapter, ref.verse)
    if (v) verses.push(v)
  }
  return verses
}

// ── Navigation helpers ───────────────────────────────────────────────────────

/** Get prev/next verse refs for a given verse. Wraps across chapters. */
export const getVerseNeighbors = (
  chapter: number,
  verse: number,
): {
  prev: { chapter: number; verse: number } | null
  next: { chapter: number; verse: number } | null
} => {
  const sorted = [...indexEntries].sort((a, b) => a.order - b.order)
  const idx = sorted.findIndex((e) => e.chapter === chapter && e.verse === verse)
  if (idx === -1) return { prev: null, next: null }
  const prev = idx > 0 ? sorted[idx - 1] : null
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null
  return {
    prev: prev ? { chapter: prev.chapter, verse: prev.verse } : null,
    next: next ? { chapter: next.chapter, verse: next.verse } : null,
  }
}

/**
 * Related verses — tag overlap weighted higher than chapter proximity, but
 * deliberately picks a mix so the page links *across* the Gita rather than
 * to its immediate neighbours (which are already linked via prev/next).
 *
 * Returns up to `limit` entries: at most 2 from the same chapter, the rest
 * from other chapters. This spreads internal PageRank to thin verse pages.
 */
export const getRelatedVerses = (
  chapter: number,
  verse: number,
  tags: string[],
  limit = 6,
): IndexEntry[] => {
  const target = `${chapter}-${verse}`
  const tagSet = new Set(tags)

  const scored = indexEntries
    .filter((e) => `${e.chapter}-${e.verse}` !== target)
    .map((e) => {
      const overlap = e.tags.filter((t) => tagSet.has(t)).length
      // Heavier weight on tag overlap; small bonus for same chapter so we
      // still surface intra-chapter relations, but don't dominate the list.
      const sameChapter = e.chapter === chapter ? 1 : 0
      return { entry: e, score: overlap * 10 + sameChapter, sameChapter }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  // Quota: at most 2 same-chapter, rest cross-chapter — improves topical link
  // diversity, which helps thin pages get discovered through related-verse
  // crawls instead of relying only on the sitemap.
  const out: IndexEntry[] = []
  let sameChapterCount = 0
  const sameChapterCap = 2
  for (const x of scored) {
    if (x.sameChapter) {
      if (sameChapterCount >= sameChapterCap) continue
      sameChapterCount++
    }
    out.push(x.entry)
    if (out.length >= limit) break
  }
  return out
}

/**
 * Topical bridges — for a verse with tags, find the top-level topic hubs
 * (already-published /gita/topic/[slug] pages) it belongs to. This lets the
 * verse page link "up" into hub pages, which Google crawls more often and
 * which already have authority.
 */
export const getTopicBridgesForVerse = (tags: string[], limit = 3): TopicSummary[] => {
  const tagSet = new Set(tags)
  const bridges = topicSummaries
    .filter((t) => tagSet.has(t.slug))
    .sort((a, b) => b.verseCount - a.verseCount)
  return bridges.slice(0, limit)
}

// ── Chapter imagery ──────────────────────────────────────────────────────────

/**
 * Thematic mapping of each chapter to a Krishna/Arjuna illustration in /public/assets.
 * Drives chapter cards on /gita and hero art on /gita/chapter/[N].
 */
const CHAPTER_IMAGE: Record<number, { src: string; alt: string }> = {
  1:  { src: '/assets/chapter1.webp',  alt: "Arjuna's despair on the battlefield of Kurukshetra" },
  2:  { src: '/assets/chapter2.webp',  alt: 'Krishna teaching the Sankhya — the eternal nature of the self' },
  3:  { src: '/assets/chapter3.webp',  alt: 'Krishna guiding Arjuna toward selfless action — Karma Yoga' },
  4:  { src: '/assets/chapter4.webp',  alt: 'Krishna on the lineage of yoga and the wisdom of action' },
  5:  { src: '/assets/chapter5.webp',  alt: 'Krishna on action and renunciation as one path' },
  6:  { src: '/assets/chapter6.webp',  alt: 'Krishna on the inward path of meditation — Dhyana Yoga' },
  7:  { src: '/assets/chapter7.webp',  alt: 'Krishna revealing knowledge and wisdom — Jnana Vijnana Yoga' },
  8:  { src: '/assets/chapter8.webp',  alt: 'Krishna on the imperishable Brahman and what lies beyond' },
  9:  { src: '/assets/chapter9.webp',  alt: 'Krishna sharing the royal knowledge and royal secret' },
  10: { src: '/assets/chapter10.webp', alt: 'Krishna describing his divine glories — Vibhuti Yoga' },
  11: { src: '/assets/chapter11.webp', alt: 'The Vishwarupa — Krishna\'s cosmic universal form' },
  12: { src: '/assets/chapter12.webp', alt: 'Arjuna asking Krishna about the path of devotion — Bhakti Yoga' },
  13: { src: '/assets/chapter13.webp', alt: 'Krishna on the field and the knower of the field' },
  14: { src: '/assets/chapter14.webp', alt: 'Krishna on the three modes of nature — the Gunas' },
  15: { src: '/assets/chapter15.webp', alt: 'Krishna as the Supreme Person — Purushottama Yoga' },
  16: { src: '/assets/chapter16.webp', alt: 'Krishna on divine and demoniac qualities — the two natures' },
  17: { src: '/assets/chapter17.webp', alt: 'Krishna on the three kinds of faith — Shraddha' },
  18: { src: '/assets/chapter18.webp', alt: 'Krishna and Arjuna — the final teaching and complete surrender' },
}

export const chapterImage = (n: number): { src: string; alt: string } =>
  CHAPTER_IMAGE[n] ?? { src: '/assets/gita.webp', alt: 'Bhagavad Gita — Krishna and Arjuna' }

/** Hero image for the /gita index page itself. */
export const gitaHeroImage = (): { src: string; alt: string } => ({
  src: '/assets/gita.webp',
  alt: 'The Bhagavad Gita — Krishna speaking to Arjuna on the battlefield of Kurukshetra',
})

// ── Hand-crafted intros (overrides for templated copy) ──────────────────────

/**
 * For top-tier topics we write evocative one-paragraph intros by hand.
 * Falls back to a templated line for everything else.
 */
const TOPIC_INTRO_EN: Record<string, string> = {
  karma:
    "What you do, you become. Karma is the Gita's word for action — and its central question is whether action enslaves you or sets you free. These are the verses where Krishna answers.",
  dharma:
    "Dharma is what holds the world together — your role, your duty, the path that is yours to walk. The Gita doesn't hand dharma to Arjuna. It helps him recognise his own.",
  bhakti:
    "Devotion is not something you feel. It is something you live — every act, every breath, offered. These are the verses where the Gita teaches the path of remembering.",
  vairagya:
    "Detachment is not coldness. It is the steadiness that lets you act fully and let go cleanly. Vairagya is the Gita's medicine for a mind tossed by gain and loss.",
  krishna:
    "Wherever the speaker is named, it is here. Verses where Krishna himself takes the voice — revealing, instructing, declaring.",
  arjuna:
    "Arjuna's questions are humanity's questions. Doubt, despair, confusion. The Gita opens with him collapsing on the field. These are the verses where he speaks.",
  manas:
    "The mind is harder to subdue than the wind. Manas is the seat of restless thought — and the Gita's most practical teaching is how to steady it.",
  buddhi:
    "Buddhi is intelligence — not cleverness, but discernment. The faculty that sees what is real beneath what is changing. These verses speak to it directly.",
  kurukshetra:
    "The field of duty. The battlefield where the Gita is spoken. These are the verses that ground the entire conversation in the place it was held.",
  brahman:
    "The unchanging substrate of all that changes. Brahman is the Gita's word for ultimate reality — that which is, before anything appears.",
  nishkama:
    "Action without craving for its fruit. Nishkama karma is the Gita's hardest teaching and its most freeing — the verses where Krishna shows the way.",
  battlefield:
    "Verses set on Kurukshetra. The conch shells, the armies, the silence before the first arrow. The Gita lives in this place.",
  sanjaya:
    "Sanjaya is the witness. Through him, the blind king Dhritarashtra hears the conversation he could not see. These are the verses he reports.",
  dhritarashtra:
    "The blind king who asks. Dhritarashtra's question opens the Gita — and his fear shapes everything that follows.",
}

const TOPIC_INTRO_HI: Record<string, string> = {
  karma:
    "जो आप करते हैं, वही आप बनते हैं। कर्म गीता का केंद्रीय प्रश्न है — क्या कर्म बंधन है या मुक्ति? ये वे श्लोक हैं जहाँ कृष्ण इसका उत्तर देते हैं।",
  dharma:
    "धर्म वह है जो संसार को धारण करता है — आपकी भूमिका, आपका कर्तव्य, आपका मार्ग। गीता अर्जुन को धर्म थमाती नहीं — उसे पहचानने में मदद करती है।",
  bhakti:
    "भक्ति अनुभव नहीं — जीवन है। हर कर्म, हर साँस, समर्पित। ये वे श्लोक हैं जहाँ गीता स्मरण का मार्ग सिखाती है।",
  vairagya:
    "वैराग्य उदासीनता नहीं — स्थिरता है। पूरी तरह कर्म करना और शांत हृदय से छोड़ देना। यही गीता की औषधि है।",
  krishna: "जहाँ वक्ता का नाम लिया गया है, वे श्लोक यहाँ हैं — जहाँ कृष्ण स्वयं बोलते हैं।",
  arjuna: "अर्जुन के प्रश्न हम सबके प्रश्न हैं। संशय, विषाद, उलझन। ये वे श्लोक हैं जहाँ अर्जुन बोलते हैं।",
  manas:
    "मन को वश में करना वायु से भी कठिन है। मनस् चंचल विचार का स्थान है — और गीता की सबसे व्यावहारिक शिक्षा है इसे स्थिर करना।",
  buddhi:
    "बुद्धि चतुराई नहीं — विवेक है। जो बदलते हुए के पीछे अपरिवर्तनीय को देखती है। ये श्लोक उसी से बात करते हैं।",
  kurukshetra:
    "कर्तव्य का क्षेत्र। वह भूमि जहाँ गीता कही गई। ये वे श्लोक हैं जो पूरे संवाद को उसके स्थान में बाँधते हैं।",
  brahman: "अपरिवर्तनीय का अपरिवर्तनीय। ब्रह्म गीता का अंतिम सत्य है — जो किसी प्रकट होने से पहले है।",
  nishkama: "फल की कामना के बिना कर्म। निष्काम कर्म गीता की सबसे कठिन और सबसे मुक्त शिक्षा है।",
  battlefield: "कुरुक्षेत्र में स्थापित श्लोक। शंख, सेनाएँ, और प्रथम बाण से पहले की चुप्पी।",
  sanjaya: "संजय साक्षी हैं। उन्हीं के माध्यम से अंधे राजा धृतराष्ट्र वह संवाद सुनते हैं जो वे देख नहीं सके।",
  dhritarashtra: "अंधे राजा का प्रश्न गीता खोलता है — और उनका भय उसे आकार देता है।",
}

export const topicIntro = (slug: string, locale: 'en' | 'hi' = 'en'): string | null =>
  (locale === 'hi' ? TOPIC_INTRO_HI : TOPIC_INTRO_EN)[slug] ?? null

/**
 * Per-chapter evocative lede. Falls back to chapter.enTitle if absent.
 */
const CHAPTER_LEDE_EN: Record<number, string> = {
  1: "Two armies face each other on Kurukshetra. Arjuna sees his own kin across the field, and his bow falls. The Gita begins with a man unable to act.",
  2: "Krishna begins the real teaching. The eternal soul, the steady mind, action without attachment. The chapter that holds the Gita's most quoted verse: 2.47.",
  3: "You must act. That isn't a choice. The question Karma yoga answers is how to act without becoming enslaved to what the action produces.",
  4: "Knowledge as a sacrifice. Action as offering. Krishna names his own incarnations and the lineage of yoga that came before.",
  5: "Action and renunciation are not two paths. They are one. The yogi acts in the world while remaining unshaken by it.",
  6: "Meditation as the slow work of steadying the mind. The seat, the breath, the gradual narrowing of attention until only the self remains.",
  7: "Knowledge of the divine comes in two forms: the manifest and the unmanifest. Why few seek, fewer find, and rarer still understand.",
  8: "What happens at the moment of death. The imperishable Brahman. The path of light and the path of smoke.",
  9: "The royal knowledge, the king of secrets. Krishna names his presence in everything that exists, and the simple offering that reaches him.",
  10: "The divine glories. Wherever you find excellence, strength, beauty, wisdom, Krishna is its seed. A chapter to read slowly and look around.",
  11: "Arjuna asks to see. Krishna shows him. The universal form: terrifying, vast, the cosmos with its mouths open. The Gita's most overwhelming chapter.",
  12: "The path of devotion. Of all paths, Krishna says, this one is dearest to him, and most accessible to those who love.",
  13: "The field and the knower of the field. The body, the world, and the awareness that watches both. Where the inquiry into self begins.",
  14: "The three modes of nature: sattva, rajas, tamas. Everything that arises is some weave of these three. The yogi's task is to see them at work.",
  15: "The world as an upside-down tree, rooted above and branching below. Cut it with the axe of detachment, says Krishna. Find the root.",
  16: "Two natures, not as cosmic factions but as tendencies inside every person. The chapter is a mirror, and not always a comfortable one.",
  17: "Three kinds of faith. Three kinds of food. Three kinds of sacrifice and giving. The Gita on what your daily choices reveal about you.",
  18: "The final chapter. Renunciation, action, knowledge, devotion, woven together into a single teaching. Arjuna at last says: I will do as you say.",
}

const CHAPTER_LEDE_HI: Record<number, string> = {
  1: "कुरुक्षेत्र में दो सेनाएँ आमने-सामने। अर्जुन अपनों को देखकर धनुष गिरा देते हैं। गीता एक न-कर सकने वाले मनुष्य से शुरू होती है।",
  2: "वास्तविक उपदेश यहीं से। अविनाशी आत्मा, स्थिर बुद्धि, फल की कामना के बिना कर्म। 2.47 इसी अध्याय में है।",
  3: "कर्म करना ही पड़ेगा। यह चुनाव नहीं है। प्रश्न यह है कि उसमें बँधे बिना कैसे करें। कर्म योग का उत्तर यही है।",
  4: "ज्ञान यज्ञ। कर्म समर्पण। कृष्ण अपने अवतारों और योग की परंपरा का स्मरण कराते हैं।",
  5: "कर्म और संन्यास दो मार्ग नहीं, एक हैं। योगी संसार में कर्म करता है, अडिग रहकर।",
  6: "ध्यान: मन को धीरे-धीरे स्थिर करने का अभ्यास। आसन, श्वास, और अंत में केवल आत्मा।",
  7: "ईश्वर के दो रूप: व्यक्त और अव्यक्त। बिरले खोजते हैं, और भी बिरले समझते हैं।",
  8: "मृत्यु के क्षण में क्या होता है। अक्षर ब्रह्म। प्रकाश का मार्ग, धूम का मार्ग।",
  9: "राजविद्या, सर्वोच्च रहस्य। हर वस्तु में कृष्ण की उपस्थिति। और प्रेम से किया गया छोटा सा अर्पण।",
  10: "विभूतियाँ। जहाँ भी उत्कृष्टता है, बल, सौंदर्य, ज्ञान, कृष्ण उसका बीज हैं।",
  11: "अर्जुन देखना चाहते हैं। कृष्ण दिखाते हैं। विश्वरूप: विराट, भयावह, मुख खोले ब्रह्मांड।",
  12: "भक्ति का मार्ग। कृष्ण कहते हैं: सबसे प्रिय, सबसे सुगम।",
  13: "क्षेत्र और क्षेत्रज्ञ। शरीर, संसार, और दोनों को देखती चेतना। आत्म-विचार यहीं से।",
  14: "प्रकृति के तीन गुण: सत्त्व, रजस्, तमस्। हर उत्पन्न होने वाली वस्तु इन्हीं से बुनी।",
  15: "संसार उल्टा वृक्ष, मूल ऊपर, शाखाएँ नीचे। वैराग्य की कुल्हाड़ी से काटो, मूल खोजो।",
  16: "दो प्रकृतियाँ, दैवी और आसुरी। ये दूर के पात्र नहीं, हर मनुष्य के भीतर की प्रवृत्तियाँ हैं।",
  17: "तीन प्रकार की श्रद्धा। तीन प्रकार का अन्न, यज्ञ, दान। आपकी रोज़मर्रा की पसंद आपके बारे में क्या कहती है।",
  18: "अंतिम अध्याय। संन्यास, कर्म, ज्ञान, भक्ति, सब एक सूत्र में बँधे। अर्जुन अंत में कहते हैं: जैसा आप कहते हैं, वैसा करूँगा।",
}

export const chapterLede = (n: number, locale: 'en' | 'hi' = 'en'): string | null =>
  (locale === 'hi' ? CHAPTER_LEDE_HI : CHAPTER_LEDE_EN)[n] ?? null

// ── URL helpers ──────────────────────────────────────────────────────────────

export const verseUrl = (chapter: number, verse: number, lang: 'en' | 'hi' = 'en') =>
  lang === 'hi' ? `/hi/gita/chapter/${chapter}/verse/${verse}` : `/gita/chapter/${chapter}/verse/${verse}`

export const chapterUrl = (chapter: number, lang: 'en' | 'hi' = 'en') =>
  lang === 'hi' ? `/hi/gita/chapter/${chapter}` : `/gita/chapter/${chapter}`

export const topicUrl = (slug: string, lang: 'en' | 'hi' = 'en') =>
  lang === 'hi' ? `/hi/gita/topic/${slug}` : `/gita/topic/${slug}`

#!/usr/bin/env node
/**
 * Build Gita content from sanscripts processed data into Next.js content folder.
 *
 * Reads:   ../sanscripts/data/processed_data_v2/bhagwad_gita/verse_*.json
 * Writes:  src/content/gita/
 *            ├── index.json          ← all verses, minimal fields (for search/lists)
 *            ├── chapters.json       ← 18 chapters w/ EN+HI names + verse counts
 *            ├── verses/{ch}-{vs}.json   ← per-verse V1 web fields
 *            └── topics/{slug}.json  ← topic hubs (only tags appearing ≥10 times)
 *
 * V1 web fields (the "moat-preserving minimal" set):
 *   sanskrit, hindiTranslation, englishTranslation, essence,
 *   speaker, tags (top 3), chapter, verse, order
 *
 * Held back for V2 (still in raw data, never written to web content):
 *   simple_meaning, detailed_meaning, modern_relevance, translation_literal,
 *   quote_variants, target_audience, tone, category, requisite_concepts,
 *   nodeId, path, depth, is_standalone, model, schema_version, etc.
 *
 * Run with: npm run gita:update
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// ── Source / destination paths ────────────────────────────────────────────────

const SOURCE_DIR = path.resolve(
  ROOT,
  '..',
  'sanscripts',
  'data',
  'processed_data_v2',
  'bhagwad_gita',
)

const OUT_DIR = path.join(ROOT, 'src', 'content', 'gita')
const OUT_VERSES = path.join(OUT_DIR, 'verses')
const OUT_TOPICS = path.join(OUT_DIR, 'topics')

// ── Chapter metadata (canonical names; baked in because not present in source) ─

const CHAPTERS = [
  { number: 1,  enName: "Arjuna Vishada Yoga",          enTitle: "The Yoga of Arjuna's Despair",          hiName: "अर्जुन विषाद योग",        hiTitle: "अर्जुन का विषाद",                totalVerses: 47 },
  { number: 2,  enName: "Sankhya Yoga",                 enTitle: "The Yoga of Knowledge",                 hiName: "सांख्य योग",              hiTitle: "ज्ञान का योग",                  totalVerses: 72 },
  { number: 3,  enName: "Karma Yoga",                   enTitle: "The Yoga of Action",                    hiName: "कर्म योग",                 hiTitle: "कर्म का योग",                  totalVerses: 43 },
  { number: 4,  enName: "Jnana Karma Sanyasa Yoga",     enTitle: "Knowledge and Renunciation of Action",  hiName: "ज्ञान कर्म संन्यास योग",   hiTitle: "ज्ञान और कर्म-संन्यास का योग",  totalVerses: 42 },
  { number: 5,  enName: "Karma Sanyasa Yoga",           enTitle: "The Yoga of Renunciation",              hiName: "कर्म संन्यास योग",         hiTitle: "संन्यास का योग",                totalVerses: 29 },
  { number: 6,  enName: "Dhyana Yoga",                  enTitle: "The Yoga of Meditation",                hiName: "ध्यान योग",                hiTitle: "ध्यान का योग",                  totalVerses: 47 },
  { number: 7,  enName: "Jnana Vijnana Yoga",           enTitle: "Knowledge and Wisdom",                  hiName: "ज्ञान विज्ञान योग",        hiTitle: "ज्ञान-विज्ञान का योग",         totalVerses: 30 },
  { number: 8,  enName: "Akshara Brahma Yoga",          enTitle: "The Imperishable Absolute",             hiName: "अक्षर ब्रह्म योग",         hiTitle: "अक्षर ब्रह्म का योग",          totalVerses: 28 },
  { number: 9,  enName: "Raja Vidya Raja Guhya Yoga",   enTitle: "The Royal Knowledge",                   hiName: "राजविद्या राजगुह्य योग",   hiTitle: "राजविद्या और राजगुह्य का योग", totalVerses: 34 },
  { number: 10, enName: "Vibhuti Yoga",                 enTitle: "The Yoga of Divine Glories",            hiName: "विभूति योग",               hiTitle: "ईश्वर की विभूतियों का योग",     totalVerses: 42 },
  { number: 11, enName: "Vishvarupa Darshana Yoga",     enTitle: "The Universal Form",                    hiName: "विश्वरूप दर्शन योग",       hiTitle: "विश्वरूप दर्शन का योग",        totalVerses: 55 },
  { number: 12, enName: "Bhakti Yoga",                  enTitle: "The Yoga of Devotion",                  hiName: "भक्ति योग",                hiTitle: "भक्ति का योग",                 totalVerses: 20 },
  { number: 13, enName: "Kshetra Kshetrajna Vibhaga",   enTitle: "Field and Knower of the Field",         hiName: "क्षेत्र क्षेत्रज्ञ विभाग योग", hiTitle: "क्षेत्र और क्षेत्रज्ञ का योग",  totalVerses: 35 },
  { number: 14, enName: "Gunatraya Vibhaga Yoga",       enTitle: "The Three Modes of Material Nature",    hiName: "गुणत्रय विभाग योग",        hiTitle: "त्रिगुण-विभाग का योग",          totalVerses: 27 },
  { number: 15, enName: "Purushottama Yoga",            enTitle: "The Yoga of the Supreme Person",        hiName: "पुरुषोत्तम योग",           hiTitle: "पुरुषोत्तम का योग",            totalVerses: 20 },
  { number: 16, enName: "Daivasura Sampad Vibhaga",     enTitle: "The Divine and Demoniac Natures",       hiName: "दैवासुर संपद् विभाग योग",  hiTitle: "दैवी और आसुरी संपदा का योग",   totalVerses: 24 },
  { number: 17, enName: "Shraddhatraya Vibhaga Yoga",   enTitle: "The Three Kinds of Faith",              hiName: "श्रद्धात्रय विभाग योग",    hiTitle: "त्रिविध श्रद्धा का योग",       totalVerses: 28 },
  { number: 18, enName: "Moksha Sanyasa Yoga",          enTitle: "Liberation through Renunciation",       hiName: "मोक्ष संन्यास योग",        hiTitle: "मोक्ष-संन्यास का योग",         totalVerses: 78 },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ऀ-ॿ]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Topic hub minimum verse count to avoid thin-content pages */
const TOPIC_MIN_VERSES = 10

/** Topics whose slug we hand-canonicalize (so /gita/topic/karma not /gita/topic/karm) */
const TOPIC_SLUG_OVERRIDES = {
  karm: 'karma',
  dharm: 'dharma',
  bhagwan: 'krishna',
  bhagvan: 'krishna',
}

/** Some tags should never become public topic hubs */
const TOPIC_BLACKLIST = new Set([
  'narrative',
  'declaration',
  'general',
  'students',
  'professionals',
])

const canonicalTopic = (raw) => {
  const s = slugify(raw)
  return TOPIC_SLUG_OVERRIDES[s] ?? s
}

const ensureDir = async (d) => fs.mkdir(d, { recursive: true })

/** Parse the GPT response text into a clean object. Defensive against malformed JSON. */
const parseGptResponse = (raw) => {
  try {
    return JSON.parse(raw)
  } catch {
    // Some responses arrive with markdown fences or trailing whitespace
    const stripped = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/i, '')
      .trim()
    try {
      return JSON.parse(stripped)
    } catch (e) {
      return null
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`📖  Reading from: ${SOURCE_DIR}`)

  let files
  try {
    files = (await fs.readdir(SOURCE_DIR))
      .filter((f) => f.startsWith('verse_') && f.endsWith('.json'))
  } catch (e) {
    console.log(`ℹ️   Sanscripts source not found at ${SOURCE_DIR}`)
    console.log(`    Skipping content rebuild — using already-committed src/content/gita/.`)
    console.log(`    (This is expected on CI/Vercel; only matters locally when refreshing data.)`)
    process.exit(0)
  }

  if (files.length === 0) {
    console.log('ℹ️   No verse_*.json files found — skipping rebuild, using committed content.')
    process.exit(0)
  }

  console.log(`    Found ${files.length} source files\n`)

  // Reset output dirs (verse + topic files only — keep parent for git)
  await ensureDir(OUT_VERSES)
  await ensureDir(OUT_TOPICS)
  for (const f of await fs.readdir(OUT_VERSES)) {
    await fs.unlink(path.join(OUT_VERSES, f)).catch(() => {})
  }
  for (const f of await fs.readdir(OUT_TOPICS)) {
    await fs.unlink(path.join(OUT_TOPICS, f)).catch(() => {})
  }

  const indexEntries = []
  const tagCounts = new Map()
  const tagToVerses = new Map()
  const verseByChapter = new Map()
  let skipped = 0

  for (const file of files) {
    const fullPath = path.join(SOURCE_DIR, file)
    let raw
    try {
      raw = JSON.parse(await fs.readFile(fullPath, 'utf-8'))
    } catch (e) {
      console.warn(`⚠️   Could not parse ${file} — skipping`)
      skipped++
      continue
    }

    const meta = raw?.input?.meta
    if (!meta?.index || typeof meta.index !== 'string') {
      console.warn(`⚠️   ${file} missing meta.index — skipping`)
      skipped++
      continue
    }

    const [chStr, vsStr] = meta.index.split(',')
    const chapter = Number(chStr)
    const verse = Number(vsStr)
    if (!chapter || !verse) {
      console.warn(`⚠️   ${file} has invalid index "${meta.index}" — skipping`)
      skipped++
      continue
    }

    // Pull GPT response payload.
    // v2 format: raw.parsed is already a plain object (no wrapping needed).
    // Legacy batch format: raw.response.output[0].content[0].text is a JSON string.
    const gptText = raw?.response?.output?.[0]?.content?.[0]?.text
    const gpt = raw?.parsed ?? (gptText ? parseGptResponse(gptText) : null)

    if (!gpt || typeof gpt !== 'object') {
      console.warn(`⚠️   ${file} (${chapter}.${verse}) has no parseable GPT response — skipping`)
      skipped++
      continue
    }

    // ─── V1 web-safe fields only ───
    const englishTranslation = String(gpt.english_translation ?? '').trim()
    const essence = String(gpt.essence ?? gpt.insight ?? '').trim()
    const speaker = String(gpt.speaker ?? 'Narrator').trim()
    const allTags = Array.isArray(gpt.tags) ? gpt.tags.map((t) => String(t).trim()).filter(Boolean) : []
    const topTags = allTags.slice(0, 3) // shown on page; full list never serialized

    const sanskrit = String(raw.input.verse ?? '').trim()
    const hindiTranslation = String(raw.input.translation ?? '').trim()
    const order = Number(meta.order ?? 0)

    // Skip if we don't have the bare minimum
    if (!sanskrit || !englishTranslation) {
      console.warn(`⚠️   ${chapter}.${verse} missing core fields — skipping`)
      skipped++
      continue
    }

    const verseDoc = {
      chapter,
      verse,
      order,
      sanskrit,
      hindiTranslation,
      englishTranslation,
      essence,
      speaker,
      tags: topTags,
    }

    await fs.writeFile(
      path.join(OUT_VERSES, `${chapter}-${verse}.json`),
      JSON.stringify(verseDoc, null, 2),
    )

    // Index entry — even more minimal, for client-side search and listing
    indexEntries.push({
      chapter,
      verse,
      order,
      speaker,
      essence,
      snippet: englishTranslation.length > 140 ? englishTranslation.slice(0, 137) + '…' : englishTranslation,
      tags: topTags,
    })

    // Chapter aggregation
    if (!verseByChapter.has(chapter)) verseByChapter.set(chapter, [])
    verseByChapter.get(chapter).push({ verse, snippet: indexEntries[indexEntries.length - 1].snippet, speaker })

    // Tag aggregation — use ALL tags (not just top 3) to find topic hubs
    for (const t of allTags) {
      const slug = canonicalTopic(t)
      if (!slug || TOPIC_BLACKLIST.has(slug)) continue
      tagCounts.set(slug, (tagCounts.get(slug) ?? 0) + 1)
      if (!tagToVerses.has(slug)) tagToVerses.set(slug, new Set())
      tagToVerses.get(slug).add(`${chapter}-${verse}`)
    }
  }

  // ─── chapters.json ───
  const chaptersOut = CHAPTERS.map((ch) => {
    const processed = verseByChapter.get(ch.number) ?? []
    processed.sort((a, b) => a.verse - b.verse)
    return {
      number: ch.number,
      enName: ch.enName,
      enTitle: ch.enTitle,
      hiName: ch.hiName,
      hiTitle: ch.hiTitle,
      totalVerses: ch.totalVerses,
      processedVerses: processed.length,
      verses: processed.map((v) => v.verse),
    }
  })
  await fs.writeFile(path.join(OUT_DIR, 'chapters.json'), JSON.stringify(chaptersOut, null, 2))

  // ─── index.json ───
  indexEntries.sort((a, b) => a.order - b.order)
  await fs.writeFile(path.join(OUT_DIR, 'index.json'), JSON.stringify(indexEntries, null, 2))

  // ─── topics/*.json (only tags appearing ≥ TOPIC_MIN_VERSES times) ───
  const topicsManifest = []
  for (const [slug, count] of [...tagCounts.entries()].sort((a, b) => b[1] - a[1])) {
    if (count < TOPIC_MIN_VERSES) continue
    const verseRefs = [...tagToVerses.get(slug)]
      .map((s) => {
        const [c, v] = s.split('-').map(Number)
        return { chapter: c, verse: v }
      })
      .sort((a, b) => a.chapter - b.chapter || a.verse - b.verse)

    const topic = {
      slug,
      label: slug.replace(/-/g, ' '),
      verseCount: count,
      verses: verseRefs,
    }
    await fs.writeFile(path.join(OUT_TOPICS, `${slug}.json`), JSON.stringify(topic, null, 2))
    topicsManifest.push({ slug, label: topic.label, verseCount: count })
  }
  await fs.writeFile(path.join(OUT_DIR, 'topics.json'), JSON.stringify(topicsManifest, null, 2))

  // ─── Summary ───
  console.log(`✅  Wrote ${indexEntries.length} verses to ${OUT_VERSES}`)
  console.log(`✅  Wrote ${chaptersOut.length} chapters to chapters.json`)
  console.log(`✅  Wrote ${topicsManifest.length} topic hubs to ${OUT_TOPICS}`)
  if (skipped > 0) console.log(`⚠️   Skipped ${skipped} files (see warnings above)`)
  console.log(`\n   Top 10 topics by verse count:`)
  for (const t of topicsManifest.slice(0, 10)) {
    console.log(`   • ${t.slug.padEnd(20)} ${t.verseCount} verses`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

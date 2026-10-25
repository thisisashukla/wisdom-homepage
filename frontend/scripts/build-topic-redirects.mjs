#!/usr/bin/env node
/**
 * Build src/content/gita/topic-redirects.json: every verse tag that has no
 * /gita/topic hub page → the surviving hub it should 308 to ("" = the /gita hub).
 *
 * Why: verse pages used to link every tag, and ~1,400 of those tags never had
 * a hub, so Google holds hundreds of 404 topic URLs. src/middleware.ts reads
 * this map. Runs at prebuild, after build-gita-content.mjs.
 *
 * Choice per retired slug: hand alias → else the surviving hub that co-occurs
 * most often on verses carrying the tag (ties → the smaller, more specific hub)
 * → else "" (the /gita hub).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(ROOT, 'src', 'content', 'gita')
const index = JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'))
const topics = JSON.parse(fs.readFileSync(path.join(DIR, 'topics.json'), 'utf8'))
const hubs = new Set(topics.map((t) => t.slug))
const size = Object.fromEntries(topics.map((t) => [t.slug, t.verseCount]))

const ALIASES = {
  ego: 'ahankara',
  ahamkara: 'ahankara',
  'bhakti-yoga': 'bhakti',
  'ananya-bhakti': 'bhakti',
  ananyabhakti: 'bhakti',
  'avyabhichari-bhakti': 'bhakti',
  madbhakti: 'bhakti',
  devotee: 'bhakti',
  kirtana: 'bhakti',
  bhajan: 'bhakti',
  meditation: 'dhyana',
  'sense-control': 'indriya-nigraha',
  'sense-restraint': 'indriya-nigraha',
  'sense-withdrawal': 'indriya-nigraha',
  'indriya-samyama': 'indriya-nigraha',
  'self-restraint': 'self-mastery',
  'mind-control': 'manas',
  'restless-mind': 'manas',
  'steady-mind': 'equanimity',
  'equal-vision': 'samatva',
  'honor-dishonor': 'samatva',
  'honor-disgrace': 'samatva',
  dvandva: 'samatva',
  desire: 'kama',
  greed: 'kama',
  'raga-dvesha': 'attachment',
  'raaga-dvesha': 'attachment',
  akrodha: 'krodha',
  fear: 'grief',
  lamentation: 'grief',
  'arjuna-grief': 'grief',
  karmaphala: 'karma-phala',
  'phala-tyaga': 'karma-phala',
  'result-attachment': 'karma-phala',
  'kamya-phala': 'karma-phala',
  'action-without-attachment': 'nishkama-karma',
  akarma: 'karma',
  'niyata-karma': 'duty',
  kartavya: 'duty',
  'natural-duty': 'duty',
  svabhava: 'duty',
  paradharma: 'dharma',
  kuladharma: 'dharma',
  'family-duty': 'dharma',
  'sannyasa-yoga': 'sannyasa',
  ignorance: 'delusion',
  moha: 'delusion',
  'tattva-jnana': 'jnana',
  vijnana: 'jnana',
  discernment: 'viveka',
  'sattva-rajas-tamas': 'gunas',
  'guna-triad': 'gunas',
  gunatita: 'gunas',
  tamasic: 'tamas',
  'krishna-avatar': 'bhagavan',
  'krishna-incarnation': 'bhagavan',
  avatar: 'bhagavan',
  'universal-vision': 'vishwarupa',
  'four-armed-form': 'vishwarupa',
  chaturbhuja: 'vishwarupa',
  'limitless-form': 'vishwarupa',
  anantarupa: 'vishwarupa',
  'krishna-omnipresence': 'omnipresence',
  sarvavyapi: 'omnipresence',
  sarvatraga: 'omnipresence',
  vyapti: 'omnipresence',
  'kaurava-army': 'kurukshetra',
  'opening-scene': 'kurukshetra',
  'conch-blast': 'battlefield',
  panchajanya: 'battlefield',
  'final-teaching': 'sharanagati',
  'krishna-shelter': 'sharanagati',
  'self-harm': 'grief',
}

export const normalise = (s) => String(s).toLowerCase().trim().replace(/[_\s]+/g, '-')

const retired = new Map() // normalised slug -> Map(hub -> co-occurrence count)
for (const e of index) {
  const tags = (e.tags || []).map(normalise)
  for (const t of tags) {
    if (hubs.has(t)) continue
    if (!retired.has(t)) retired.set(t, new Map())
    const m = retired.get(t)
    for (const h of tags) if (hubs.has(h)) m.set(h, (m.get(h) || 0) + 1)
  }
}
// Slugs Google reported as 404 that no longer appear as tags at all.
for (const s of Object.keys(ALIASES)) if (!retired.has(s) && !hubs.has(s)) retired.set(s, new Map())

const out = {}
for (const [slug, counts] of [...retired.entries()].sort()) {
  const alias = ALIASES[slug]
  if (alias && hubs.has(alias)) { out[slug] = alias; continue }
  const best = [...counts.entries()].sort((a, b) => b[1] - a[1] || size[a[0]] - size[b[0]])[0]
  out[slug] = best ? best[0] : ''
}
fs.writeFileSync(path.join(DIR, 'topic-redirects.json'), JSON.stringify(out, null, 0))
const toHub = Object.values(out).filter((v) => !v).length
console.log(`✅  topic-redirects.json: ${Object.keys(out).length} retired slugs (${toHub} → /gita hub)`)

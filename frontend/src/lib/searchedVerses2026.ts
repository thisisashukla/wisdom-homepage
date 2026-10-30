/**
 * Data for /most-searched-gita-verses-2026.
 *
 * Sources (all read 29 Oct 2026):
 * - Google Trends, web search, 1 Jan to 28 Oct 2026. Each verse is one Trends
 *   item that ORs its common spellings (romanised + Devanagari; English too for
 *   11.32 and 11.12). Batches of four verses plus 2.47 as the anchor; score = sum of weekly
 *   values / 2.47's sum x 100. Verses under 2.5 were re-run against a mid anchor
 *   (worldwide 18.66, India 2.23) and chained. Raw notes: <repo root>/tools/search-data-2026/.
 * - Ahrefs free Keyword Generator (bucketed monthly volume estimates).
 * - Google Search Console for wisdomquotes.in, 1 Jan to 26 Oct 2026.
 * - Mixpanel for wisdomquotes.in, 4 May to 28 Oct 2026.
 */

export const STUDY = {
  window: '1 January to 28 October 2026',
  published: '2026-10-29',
  verses: 42,
}

export type SearchedVerse = {
  ref: string
  chapter: number
  verse: number
  /** How people type it. */
  line: string
  /** Index, 2.47 = 100. */
  world: number
  india: number
  /** Spellings OR-ed together in Trends. */
  terms: string
}

/** All 42 verses measured, sorted by the worldwide index. */
export const VERSES: SearchedVerse[] = [
  { ref: '4.7', chapter: 4, verse: 7, line: 'Yada yada hi dharmasya', world: 119.98, india: 128.57, terms: 'yada yada hi dharmasya + यदा यदा हि धर्मस्य' },
  { ref: '2.47', chapter: 2, verse: 47, line: 'Karmanye vadhikaraste', world: 100, india: 100, terms: 'karmanye vadhikaraste + karmanyevadhikaraste + karmanye wadhikaraste + कर्मण्येवाधिकारस्ते' },
  { ref: '11.32', chapter: 11, verse: 32, line: 'Kalo ’smi / Now I am become death', world: 87.58, india: 1.32, terms: 'i am become death + kalo smi loka + कालोऽस्मि लोकक्षयकृत्' },
  { ref: '4.8', chapter: 4, verse: 8, line: 'Paritranaya sadhunam / Sambhavami yuge yuge', world: 24.19, india: 22.28, terms: 'paritranaya sadhunam + sambhavami yuge yuge + dharma samsthapanarthaya + संभवामि युगे युगे' },
  { ref: '2.23', chapter: 2, verse: 23, line: 'Nainam chindanti shastrani', world: 6.35, india: 3.8, terms: 'nainam chindanti shastrani + nainam chindanti + नैनं छिन्दन्ति' },
  { ref: '18.66', chapter: 18, verse: 66, line: 'Sarva dharman parityajya', world: 5.97, india: 1.701, terms: 'sarva dharman parityajya + sarvadharman parityajya + mam ekam sharanam vraja + सर्वधर्मान्परित्यज्य' },
  { ref: '4.24', chapter: 4, verse: 24, line: 'Brahmarpanam brahma havir', world: 3.05, india: 0.256, terms: 'brahmarpanam brahma havir + brahmarpanam + ब्रह्मार्पणं ब्रह्म हविः' },
  { ref: '2.50', chapter: 2, verse: 50, line: 'Yogah karmasu kaushalam', world: 2.57, india: 1.018, terms: 'yogah karmasu kaushalam + yoga karmasu kaushalam + योगः कर्मसु कौशलम्' },
  { ref: '6.5', chapter: 6, verse: 5, line: 'Uddhared atmanatmanam', world: 2.129, india: 0.199, terms: 'uddhared atmanatmanam + उद्धरेदात्मनात्मानं' },
  { ref: '2.20', chapter: 2, verse: 20, line: 'Na jayate mriyate va', world: 2.095, india: 0.774, terms: 'na jayate mriyate + न जायते म्रियते' },
  { ref: '9.22', chapter: 9, verse: 22, line: 'Ananyas chintayanto mam / Yogakshemam vahamyaham', world: 1.32, india: 1.075, terms: 'ananyas chintayanto + ananyashchintayanto + yogakshemam vahamyaham + योगक्षेमं वहाम्यहम्' },
  { ref: '2.48', chapter: 2, verse: 48, line: 'Yogasthah kuru karmani / Samatvam yoga uchyate', world: 1.039, india: 1.007, terms: 'yogasthah kuru karmani + samatvam yoga uchyate + समत्वं योग उच्यते' },
  { ref: '9.26', chapter: 9, verse: 26, line: 'Patram pushpam phalam toyam', world: 0.681, india: 0.165, terms: 'patram pushpam phalam toyam + पत्रं पुष्पं फलं तोयं' },
  { ref: '7.19', chapter: 7, verse: 19, line: 'Vasudevah sarvam iti', world: 0.578, india: 0, terms: 'vasudevah sarvam + वासुदेवः सर्वम्' },
  { ref: '2.22', chapter: 2, verse: 22, line: 'Vasamsi jirnani', world: 0.507, india: 0.068, terms: 'vasamsi jirnani + वासांसि जीर्णानि' },
  { ref: '4.39', chapter: 4, verse: 39, line: 'Shraddhavan labhate jnanam', world: 0.4, india: 0.467, terms: 'shraddhavan labhate + श्रद्धावान् लभते' },
  { ref: '16.21', chapter: 16, verse: 21, line: 'Trividham narakasyedam', world: 0.396, india: 0.42, terms: 'trividham narakasyedam + त्रिविधं नरकस्येदं' },
  { ref: '2.27', chapter: 2, verse: 27, line: 'Jatasya hi dhruvo mrityur', world: 0.319, india: 0.08, terms: 'jatasya hi dhruvo + जातस्य हि ध्रुवो' },
  { ref: '1.1', chapter: 1, verse: 1, line: 'Dharmakshetre kurukshetre', world: 0.294, india: 0.028, terms: 'dharmakshetre kurukshetre + धर्मक्षेत्रे कुरुक्षेत्रे' },
  { ref: '2.14', chapter: 2, verse: 14, line: 'Matra sparshas tu', world: 0.281, india: 0.529, terms: 'matra sparshas + मात्रास्पर्शास्तु' },
  { ref: '2.11', chapter: 2, verse: 11, line: 'Ashochyan anvashochas tvam', world: 0.277, india: 0.017, terms: 'ashochyan anvashochas + अशोच्यानन्वशोचस्त्वं' },
  { ref: '3.21', chapter: 3, verse: 21, line: 'Yad yad acharati shreshthas', world: 0.247, india: 0.017, terms: 'yad yad acharati + yadyad acharati + यद्यदाचरति' },
  { ref: '9.34', chapter: 9, verse: 34, line: 'Man mana bhava mad bhakto', world: 0.098, india: 0.063, terms: 'man mana bhava + manmana bhava + मन्मना भव' },
  { ref: '3.35', chapter: 3, verse: 35, line: 'Shreyan svadharmo vigunah', world: 0.068, india: 0.057, terms: 'shreyan svadharmo + श्रेयान्स्वधर्मो' },
  { ref: '18.78', chapter: 18, verse: 78, line: 'Yatra yogeshvarah krishno', world: 0.06, india: 0.051, terms: 'yatra yogeshwarah krishno + यत्र योगेश्वरः कृष्णो' },
  { ref: '2.63', chapter: 2, verse: 63, line: 'Krodhad bhavati sammohah', world: 0.056, india: 0.023, terms: 'krodhad bhavati sammohah + क्रोधाद्भवति सम्मोहः' },
  { ref: '2.3', chapter: 2, verse: 3, line: 'Klaibyam ma sma gamah', world: 0.056, india: 0.439, terms: 'klaibyam ma sma gamah + क्लैब्यं मा स्म गमः' },
  { ref: '4.38', chapter: 4, verse: 38, line: 'Na hi jnanena sadrisham', world: 0.051, india: 0.028, terms: 'na hi jnanena sadrisham + na hi gyanena sadrisham + न हि ज्ञानेन सदृशं' },
  { ref: '12.13', chapter: 12, verse: 13, line: 'Adveshta sarva bhutanam', world: 0.047, india: 0, terms: 'adveshta sarva bhutanam + अद्वेष्टा सर्वभूतानां' },
  { ref: '2.62', chapter: 2, verse: 62, line: 'Dhyayato vishayan pumsah', world: 0.042, india: 0.023, terms: 'dhyayato vishayan + ध्यायतो विषयान्' },
  { ref: '15.14', chapter: 15, verse: 14, line: 'Aham vaishvanaro bhutva', world: 0.03, india: 0.028, terms: 'aham vaishvanaro bhutva + अहं वैश्वानरो भूत्वा' },
  { ref: '6.6', chapter: 6, verse: 6, line: 'Bandhur atmatmanas tasya', world: 0.026, india: 0.291, terms: 'bandhur atmatmanas + बन्धुरात्मात्मनस्तस्य' },
  { ref: '15.7', chapter: 15, verse: 7, line: 'Mamaivamsho jiva-loke', world: 0.021, india: 0.023, terms: 'mamaivamsho + ममैवांशो' },
  { ref: '6.35', chapter: 6, verse: 35, line: 'Asamshayam mahabaho', world: 0.017, india: 0, terms: 'asamshayam mahabaho + asanshayam mahabaho + असंशयं महाबाहो' },
  { ref: '5.18', chapter: 5, verse: 18, line: 'Vidya vinaya sampanne', world: 0.017, india: 0.046, terms: 'vidya vinaya sampanne + विद्याविनयसम्पन्ने' },
  { ref: '6.26', chapter: 6, verse: 26, line: 'Yato yato nishcharati', world: 0.017, india: 0.399, terms: 'yato yato nishcharati + यतो यतो निश्चरति' },
  { ref: '11.12', chapter: 11, verse: 12, line: 'Divi surya sahasrasya', world: 0, india: 0, terms: 'radiance of a thousand suns + divi surya sahasrasya + दिवि सूर्यसहस्रस्य' },
  { ref: '3.27', chapter: 3, verse: 27, line: 'Prakriteh kriyamanani', world: 0, india: 0, terms: 'prakriteh kriyamanani + प्रकृतेः क्रियमाणानि' },
  { ref: '10.20', chapter: 10, verse: 20, line: 'Aham atma gudakesha', world: 0, india: 0, terms: 'aham atma gudakesha + अहमात्मा गुडाकेश' },
  { ref: '2.38', chapter: 2, verse: 38, line: 'Sukha duhkhe same kritva', world: 0, india: 0.017, terms: 'sukha dukhe same kritva + सुखदुःखे समे कृत्वा' },
  { ref: '4.40', chapter: 4, verse: 40, line: 'Samshayatma vinashyati', world: 0, india: 0, terms: 'sanshayatma vinashyati + samshayatma vinashyati + संशयात्मा विनश्यति' },
  { ref: '8.7', chapter: 8, verse: 7, line: 'Mam anusmara yudhya cha', world: 0, india: 0, terms: 'mam anusmara yudhya cha + मामनुस्मर युध्य च' },
]

/** Index rounding used everywhere on the page. */
export const fmtIndex = (n: number) =>
  n >= 10 ? String(Math.round(n)) : n >= 1 ? (Math.round(n * 10) / 10).toFixed(1) : n > 0 ? (Math.round(n * 100) / 100).toFixed(2) : '0'

/** Share of the 42-verse total held by the top two (computed, not typed). */
export const shareOfTop = (key: 'world' | 'india', k: number) => {
  const sorted = [...VERSES].sort((a, b) => b[key] - a[key])
  const total = sorted.reduce((s, v) => s + v[key], 0)
  return Math.round((sorted.slice(0, k).reduce((s, v) => s + v[key], 0) / total) * 100)
}

/**
 * Google Trends, India, weekly, same request (so the two lines share a scale).
 * Week starting date. 4 Jan to 18 Oct 2026; the partial weeks at either end are left out.
 */
export const WEEKLY_INDIA: { week: string; v247: number; v47: number }[] = [
  ['2026-01-04', 46, 58], ['2026-01-11', 47, 55], ['2026-01-18', 39, 56], ['2026-01-25', 44, 45],
  ['2026-02-01', 34, 52], ['2026-02-08', 30, 46], ['2026-02-15', 38, 43], ['2026-02-22', 42, 40],
  ['2026-03-01', 32, 46], ['2026-03-08', 37, 40], ['2026-03-15', 39, 48], ['2026-03-22', 42, 46],
  ['2026-03-29', 38, 40], ['2026-04-05', 35, 45], ['2026-04-12', 36, 38], ['2026-04-19', 41, 44],
  ['2026-04-26', 27, 37], ['2026-05-03', 27, 58], ['2026-05-10', 32, 42], ['2026-05-17', 32, 38],
  ['2026-05-24', 32, 45], ['2026-05-31', 29, 33], ['2026-06-07', 31, 30], ['2026-06-14', 37, 39],
  ['2026-06-21', 33, 42], ['2026-06-28', 32, 39], ['2026-07-05', 33, 32], ['2026-07-12', 32, 55],
  ['2026-07-19', 33, 58], ['2026-07-26', 32, 41], ['2026-08-02', 28, 45], ['2026-08-09', 34, 33],
  ['2026-08-16', 34, 48], ['2026-08-23', 36, 45], ['2026-08-30', 46, 100], ['2026-09-06', 33, 49],
  ['2026-09-13', 31, 37], ['2026-09-20', 28, 44], ['2026-09-27', 30, 38], ['2026-10-04', 33, 38],
  ['2026-10-11', 29, 34], ['2026-10-18', 25, 33],
].map(([week, v247, v47]) => ({ week: week as string, v247: v247 as number, v47: v47 as number }))

const avg = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length
const monthAvg = (prefix: string, key: 'v247' | 'v47') => avg(WEEKLY_INDIA.filter((w) => w.week.startsWith(prefix)).map((w) => w[key]))

/** January vs October, % change (negative = fewer searches). */
export const JAN_TO_OCT = {
  v247: Math.round((monthAvg('2026-10', 'v247') / monthAvg('2026-01', 'v247') - 1) * 100),
  v47: Math.round((monthAvg('2026-10', 'v47') / monthAvg('2026-01', 'v47') - 1) * 100),
}

/** Janmashtami week (30 Aug to 5 Sep) vs the median week, for 4.7. */
export const JANMASHTAMI = (() => {
  const vals = WEEKLY_INDIA.map((w) => w.v47).sort((a, b) => a - b)
  const median = vals[Math.floor(vals.length / 2)]
  const peak = WEEKLY_INDIA.find((w) => w.week === '2026-08-30')!.v47
  return { date: 'Friday, 4 September 2026', week: '2026-08-30', peak, median, ratio: Math.round((peak / median) * 10) / 10 }
})()

/** Direct four-term Trends requests, 1 Jan to 28 Oct 2026 (sums of weekly values). */
export const ENGLISH_LINE = {
  us: { death: 344, karmanye: 6, yada: 1, gita: 2610 },
  uk: { death: 122, karmanye: 1, yada: 0, gita: 2536 },
}

/** Ahrefs free Keyword Generator, read 29 Oct 2026 (volume buckets, monthly). */
export const AHREFS = {
  india: [
    { phrase: 'karmanye vadhikaraste ma phaleshu kadachana', volume: '10,000+' },
    { phrase: 'yada yada hi dharmasya', volume: '10,000+' },
    { phrase: 'yada yada hi dharmasya sloka', volume: '10,000+' },
  ],
  indiaIdeas: { karmanye: 478, yada: 1070 },
  us: [
    { phrase: 'i am become death', volume: '1,000+' },
    { phrase: 'i am become death destroyer of worlds', volume: '1,000+' },
    { phrase: 'karmanye vadhikaraste', volume: '100+' },
    { phrase: 'yada yada hi dharmasya', volume: '100+' },
  ],
}

/** Search Console, wisdomquotes.in, 1 Jan to 26 Oct 2026: queries that name one verse. */
export const GSC = {
  window: '1 January to 26 October 2026',
  queries: 295,
  verses: 98,
  impressions: 2220,
  numericImpressions: 1735,
  phraseImpressions: 480,
  indiaShare: 85,
  karmanye: { impressions: 491, byWords: 431 },
  /** Most looked-up by number (impressions from "bg c.v" style queries). */
  byNumber: [
    { ref: '6.35', chapter: 6, verse: 35, impressions: 185, example: 'bg 6.35' },
    { ref: '9.31', chapter: 9, verse: 31, impressions: 177, example: 'bg 9.31' },
    { ref: '18.66', chapter: 18, verse: 66, impressions: 180, example: 'bg 18.66' },
    { ref: '1.1', chapter: 1, verse: 1, impressions: 131, example: 'bg 1.1' },
    { ref: '17.3', chapter: 17, verse: 3, impressions: 128, example: 'bg 17.3' },
    { ref: '9.26', chapter: 9, verse: 26, impressions: 84, example: 'bg9.26' },
    { ref: '2.58', chapter: 2, verse: 58, impressions: 75, example: 'bg 2.58' },
    { ref: '12.5', chapter: 12, verse: 5, impressions: 58, example: '12.5 bg' },
  ].sort((a, b) => b.impressions - a.impressions),
}

/** Mixpanel, wisdomquotes.in, 4 May to 28 Oct 2026 (browsers, bots excluded). */
export const READERS = {
  window: '4 May to 28 October 2026',
  opened11: 552,
  opened12: 201,
  opened21: 72,
  externalEntryTop: { ref: '2.47', users: 47, next: { ref: '1.1', users: 26 } },
}

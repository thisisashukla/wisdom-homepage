# Wisdom funnel: the Upanishads (2026-10-30)

Funnel research and capture design for wisdomquotes.in + Wisdom iOS. Numbers carry their source; anything marked *est.* is my estimate.

**Bottom line.** The Upanishads are a small funnel by volume but the best ICP fit we have outside the Gita: proportionally twice as strong in the US as in India (Trends, given), and the US query set has Easy keywords Wikipedia does not fully own (named Upanishads, *tat tvam asi*). Lead with **famous-line pages** and **short complete Upanishads (Isha, Mandukya, Katha)** in a distinct "forest dawn" sub-brand with a teacher/student dialogue view, and bridge into the app with a "Who am I" 7-verse plan. Before any page ships, the data needs fixing: Kena is missing, shanti mantras are missing, refs are flattened in the KB, and some Hindi follows an Arya Samaj reading that contradicts Shankara.

GSC baseline (wisdomquotes.in, 1 Jul to 28 Oct 2026): **zero** impressions for any query containing "upanish"; 7 impressions for "atman vs soul", 4 for "brahman" queries. We start from nothing.

---

## 1. ICP research

| Segment | What they want | Device / where | Evidence | Fit |
|---|---|---|---|---|
| **Diaspora second-gen asking "what do we actually believe"** | A short, trustworthy answer to "what is Hinduism's core idea", lines they half-remember from family pujas (asato ma, purnamadah, sahana vavatu), something to tell their kids | iPhone heavy; Instagram, YouTube, r/hinduism, Bal Vihar / HSS Balagokulam | Pew: 48% of Indian Americans identify as Hindu and two-thirds have some connection to Hinduism; only one-third of Asian American Hindus call religion "very important" while 79% keep a home altar (practice > doctrine, so "what does this line mean" is the gap). HSS Balagokulam runs a Satyameva Jayate lesson for US kids. | **Highest** (pays) |
| **Advaita / nonduality readers** | Mandukya, Katha, mahavakyas; "which Upanishad first"; Shankara's reading; a calm daily line | Desktop + iPhone; r/AdvaitaVedanta (~28k, +44.5%/yr), r/nonduality (~47k, +24%/yr); Vedanta Society of New York YouTube (Sarvapriyananda) 307k subs, 39M views | GummySearch, Playboard | **High** (engaged, US/UK, buys books and apps) |
| **US/UK yoga practitioners and teachers** | Philosophy for class themes, a quotable line to open a class, "Om / shanti" chant meanings | iPhone; Instagram, YTT cohorts | 36.7M US practitioners, 72% women (Yoga in America 2016); RYT-200 requires 30 hrs Yoga Humanities (history, philosophy, ethics) | Medium-high (big pool, shallow intent) |
| **People who met a famous line** | Source + meaning of *satyameva jayate*, *asato ma*, *tat tvam asi*, *matru devo bhava*; often tattoo/calligraphy intent in the US | Mobile Google | Ahrefs US: "tat tvam asi" >1K (Easy) with a long tail of *tattoo, calligraphy, devanagari, chandogya source*; "asato ma sadgamaya" tail includes *calligraphy, tattoo, lyrics* | High for traffic; medium for pay |
| **Indian students (UPSC, school)** | "Upanishad kitne hain", "oldest Upanishad", "satyameva jayate kis upanishad se" | Android, Hindi | Ahrefs India buckets (given); Satyameva Jayate source was a UPSC Prelims 2014 PYQ (PMF IAS); US questions like "who wrote / when were the upanishads written" read as world-religions homework | Low pay, decent volume; serve via WhatsApp/email |

What they share: they arrive with **one line or one name**, not a study plan. Translation trust matters to the Advaita and diaspora segments (Advaita-l readers recommend Gambhirananda's Shankara-bhashya translations and Gita Press; colonial renderings are a known turn-off).

## 2. Query landscape

**US (Ahrefs free tool, 30 Oct, buckets):**
- Head: upanishads >1K Hard; the upanishads >1K Hard; upanishad >1K Medium; upanishads definition >1K Medium.
- What/meaning: what are the upanishads >100 Easy; what is the upanishads >100 Easy; upanishads meaning >100 Medium; vedas and upanishads >100 Easy.
- **By name:** chandogya >100 Easy; isha >100 Easy; mundaka >100 Easy; brihadaranyaka >100 Medium; katha, kena, mandukya, ishavasya <100 Easy; taittiriya, prashna, isa <100.
- PDF: upanishads pdf >100 Easy.
- Questions (all <100): how many upanishads are there (Easy), who wrote, when written, main teachings (Easy), are the upanishads part of the vedas.
- **Famous lines:** tat tvam asi >1K Easy (plus tattoo/calligraphy/source tail); asato ma sadgamaya <100 Easy (meaning, lyrics, calligraphy tail).

**India (Ahrefs, given):** upanishad and "what is upanishad" >1K Hard; mundaka, brihadaranyaka, chandogya, taittiriya >1K each; mandukya, isha, katha, ishavasya, narayana (+pdf, telugu), jabala, oldest upanishad, upanishad kya hai, kitne hain >100 each.

**Clusters and who ranks** (WebSearch SERPs, approximations of Google):
| Cluster | Ranks today | Gap |
|---|---|---|
| What is / how many / 108 list | Wikipedia (Upanishads, Muktika), hinduwebsite.com, hindutone.com, GeeksforGeeks | Hard; one clear explainer + Hindi twin is enough, it is a hub, not a traffic bet |
| By name (Isha, Katha, Mundaka…) | Wikipedia, publisher stores (Chennai Math iStore), archive.org PDFs, shlokam.org | **No page combines full Sanskrit + faithful modern English + traditional commentary + mobile reading.** shlokam.org has the structure but no named translator and no app path |
| Famous lines | shlokam.org, Wikipedia, satyori, amitray, Christianity Today (asato ma) | Pages are thin on source context and none give a print-quality Devanagari card |
| Mahavakyas | swami-krishnananda.org, hindupedia, advaita-vedanta.org, Wikipedia | Old, desktop-era pages; no "one sentence, one page" treatment |
| Which to read first / best translation | advaita-vision.org Q&A, hinduwebsite, goodnovel spam, Advaita-l threads | **Wide open**, high ICP intent, very linkable from Reddit |
| PDF | archive.org | Offer our own clean PDF as an email magnet |

**AI-search patterns** (est., from the question tail): "what does tat tvam asi mean", "difference between Vedas, Upanishads and Gita", "which Upanishad should I read first", "what Upanishad is satyameva jayate from", "best Upanishad for meditation". Answers get cited when a page has one canonical ref, Sanskrit, a plain translation and a short commentary note near the top.

## 3. Data plan

### What the local data actually holds (checked on disk)
- 71 `*_upanishad_source.json` files; 6,478 records in `verses.jsonl`; Hindi for all (`license: VERIFY`, source unnamed); English (`llm`, own) for 22 only (Katha 10, Isha 7, Mandukya 5).
- **Kena is missing entirely.** For a "10 principal" funnel this is a blocker.
- **Shanti mantras missing:** no *sahana vavatu* anywhere; *purnamadah* only as BU 5.1.1, not as Isha's invocation.
- **Gaps inside texts:** Taittiriya 2.1 starts at *tasmad va etasmad atmanah*, so *satyam jnanam anantam brahma* is absent.
- **Records are not verses for prose texts:** raw files carry proper indices (e.g. Mundaka `3,1,6`), but prose sections are split into several records with the same index (BU 700 records / 434 unique; Taittiriya 174 / 48; Chandogya 664 / 629; Prashna 81 / 67). The KB lost structure for these (ids like `up_brihadaranyak.56`-`.59` are all BU 1.3.28; `ref` is `{"n": …}`).
- **Hindi is mixed in lineage.** Mundaka, Mandukya, Shvetashvatara read Gita Press-like ("परब्रह्म परमात्मा"). Isha and Katha carry Arya Samaj glosses: Katha 1.3.14 adds "श्रेष्ठ आर्य जनों के सत् सङ्ग से ईश्वर को समझो"; Isha 9-11 reads vidya/avidya as "knowledge and karma together", which contradicts Shankara (he reads vidya there as upasana, never jnana combined with karma). Hindi is usable as a cross-check, not as the base. Its source and license are unknown; do not publish it until identified.

### Anchor refs verified in the data
| Line | Ref | KB id |
|---|---|---|
| satyameva jayate | Mundaka 3.1.6 | up_mundaka.3.1.6 |
| bhidyate hridaya-granthih | Mundaka 2.2.8 | up_mundaka.2.2.8 |
| asato ma sad gamaya | Brihadaranyaka 1.3.28 | up_brihadaranyak.56 (to 59) |
| aham brahmasmi | Brihadaranyaka 1.4.10 | up_brihadaranyak.78 (to 80) |
| neti neti | Brihadaranyaka 2.3.6 | up_brihadaranyak.185-186 |
| purnamadah | Brihadaranyaka 5.1.1 (also Isha invocation) | up_brihadaranyak.533 |
| uttishthata jagrata | Katha 1.3.14 | up_kath.1.3.14 |
| na jayate mriyate va | Katha 1.2.18 (≈ BG 2.20) | up_kath.1.2.18 |
| ishavasyam idam sarvam | Isha 1 | up_isha.1 |
| hiranmayena patrena | Isha 15 | up_isha.15 |
| ayam atma brahma | Mandukya 2 | up_mandukya.2 |
| turiya ("nantahprajnam…") | Mandukya 7 | up_mandukya.7 |
| tat tvam asi | Chandogya 6.8.7 (refrain to 6.16) | up_chhandogya.498 |
| sarvam khalv idam brahma | Chandogya 3.14.1 | up_chhandogya.247 |
| matru devo bhava | Taittiriya 1.11.2 | up_taittiriya.52-53 |
| prajnanam brahma | Aitareya 3.1.3 (= 5.3 in the older numbering) | up_aitareya.40-42 |
| vedaham etam purusham | Shvetashvatara 3.8 | up_shwetashwetar.3.8 |

### Translation route
1. **Sanskrit base:** reconcile our Devanagari against GRETIL / sanskritdocuments.org editions; import Kena, the shanti mantras and the Taittiriya 2.1 opening; merge split prose records into one verse with sub-parts; restore `adhyaya.khanda.verse` refs in the KB.
2. **Commentary spine (public domain, Hindu):** S. Sitarama Sastri's English of Shankara's bhashya (Isa, Kena, Mundaka; Katha, Prasna; 1898-1905, on archive.org and wisdomlib). Swami Paramananda's *The Upanishads* (1919; Isa, Katha, Kena; Ramakrishna order; public domain in the US per Project Gutenberg) as a tone reference.
3. **Avoid as base:** Max Müller (SBE, 1879/1884) and R. E. Hume (1921). They are public domain but carry colonial or missionary framing. Gambhirananda, Nikhilananda, Easwaran and Olivelle are copyrighted: readers may consult them for meaning, never copy wording.
4. **Draft:** LLM pass per verse with inputs = Sanskrit + padaccheda + Shankara bhashya (PD English) + our Hindi flagged as "lineage unknown". Output: a literal line, a plain English line in our voice, and a 1-2 sentence "how the acharyas read it" note. Where Ramanuja or Madhva read it differently (e.g. *tat tvam asi*), say so in one line.
5. **Verify:** (a) automatic: word-coverage check against padaccheda, n-gram overlap check against the copyrighted translations (block any shared run of more than 6 words); (b) the owner reads every verse; (c) a paid Sanskrit reviewer (shastri / MA Sanskrit, est. ₹15-25 per verse) checks the principal-6 batch; (d) store `translations.en = {source: "own", basis: "shankara_bhashya", reviewed_by, reviewed_at}`.

### First batch (est. ~380 verses)
| Text | Verses | Why first | Showcase |
|---|---|---|---|
| Isha | 18 + invocation | Shortest complete text; Isha >100 US, >100 IN | up_isha.1, .15 |
| Mandukya | 12 | Advaita favourite; completes in one sitting | up_mandukya.2, .7 |
| Katha | 119 | Nachiketa story, best dialogue; Gita bridge | up_kath.1.3.14, 1.2.18, 2.1.1 |
| Mundaka | 64 | Satyameva jayate; >1K IN, >100 US | up_mundaka.3.1.6, 2.2.8 |
| Kena | 35 (import) | Principal and short; missing today | to import |
| Chandogya ch. 6 | 69 sections | Uddalaka and Shvetaketu, *tat tvam asi* | up_chhandogya.498 |
| Taittiriya 1.11, 2.1, 3.1-3.6 | ~30 | Matru devo bhava, sheaths, ananda | up_taittiriya.52 |
| Brihadaranyaka selections | ~40 | Asato ma, aham brahmasmi, Maitreyi, neti neti | up_brihadaranyak.56, 78, 185 |
Later: Prashna (67), Aitareya (33), Shvetashvatara (113), Kaivalya (25).

## 4. Capture ideas, ranked

Score = traffic × ICP fit × (1/effort), 1-5 each (est.).

| # | Idea | Traffic | ICP | Effort | Notes |
|---|---|---|---|---|---|
| 1 | **Famous-line pages** (10): tat tvam asi, satyameva jayate, asato ma, uttishthata jagrata, ishavasyam, aham brahmasmi, purnamadah, sahana vavatu, matru devo bhava, bhidyate hridayagranthi | 4 | 4 | 1 | Only ~10 verses to translate. Each: Sanskrit, IAST/Devanagari toggle, meaning, source context, how the acharyas read it, **print-quality Devanagari card** (tattoo/calligraphy intent in US data). Hindi twins for satyameva jayate and asato ma. |
| 2 | **Complete short Upanishads** as reading pages: Isha, Mandukya, then Katha, Mundaka, Kena | 3 | 5 | 3 | One URL per Upanishad (not per verse, to avoid thin pages), anchors per verse; Easy named terms in US. |
| 3 | **"Who am I" 7-verse plan** (Katha 1.2.18, Mundaka 3.1.1 two birds, Chandogya 6.8.7, BU 1.4.10, Mandukya 2, Kena 1.1, Isha 6) on /reading-plans | 2 | 5 | 2 | Direct bridge into the app's plan model; also the in-app Upanishad plan. |
| 4 | **"Which Upanishad first" guide** + "best English translations" (honest, names the copyrighted ones as buy links) | 2 | 5 | 1 | Reddit-linkable, AI-citable, owns an open SERP. |
| 5 | **Mahavakya hub** (4 lines, 4 Upanishads, 4 Vedas) | 2 | 4 | 1 | Re-uses #1 pages. |
| 6 | **Upanishads PDF** (our Isha + Kena + Katha English, Sanskrit facing) as email magnet | 2 | 3 | 2 | "upanishads pdf" >100 Easy US; "narayana upanishad pdf" IN. |
| 7 | **Upanishad to Gita bridges**: Katha 1.2.18-19 ↔ BG 2.20/2.19; Gita Dhyanam "sarvopanishado gavo"; Gita colophons call it an Upanishad | 1 | 5 | 1 | Internal links into the Gita pages that already get traffic. |
| 8 | **What are the Upanishads / how many (108, 10 principal)** pillar + Hindi "upanishad kitne hain" | 2 | 2 | 2 | Hub for internal links; do not expect to beat Wikipedia. |
| 9 | **Shanti mantra pages with audio** (purnamadah, sahana vavatu, asato ma) | 2 | 4 | 3 | Yoga teachers open class with these; reuse /tts. |
| 10 | **Reddit series** in r/AdvaitaVedanta and r/hinduism: "Reading the Katha in 7 posts", each ending with the site page | 2 | 5 | 2 | Owner already posts there. |
| 11 | **YouTube Shorts / Reels**: one line, Sanskrit on screen, 20 s of context | 2 | 4 | 3 | Reuse share cards. |

**Bridge into the app:** every page ends with the Upanishad line on a Lock Screen mockup; the app gets an "Upanishads" plan (#3), and the widget can show a line from the plan the person chose on the web.

## 5. UI/UX direction: "Aranya" (forest dawn)

**Mood:** the Upanishads were taught in the forest, at dawn, sitting close. Birch-bark paper, lamp light, quiet green. Light theme by default, deliberately different from the maroon-black Gita site, so the diaspora/yoga reader feels a softer, study-like room. Dark mode = pre-dawn indigo.

**Tokens**
| Token | Hex | Use |
|---|---|---|
| `--bark` | #F3EBDD | page background (birch-bark paper) |
| `--ink` | #1F2A2E | body text, Devanagari |
| `--dusk` | #2E3A59 | dark-mode background, card backs |
| `--lamp` | #C8862A | accent, the reveal glow, CTA |
| `--sal` | #5E7A5A | links, progress, "sit closer" thread |
| `--ash` | #8C877D | refs, secondary text |

**Type:** Tiro Devanagari Sanskrit (built for Sanskrit, full IAST diacritics in its Latin) for verse lines; Spectral for headings and English verse; Inter for UI. Keep Noto Sans Devanagari only as fallback.

**Page anatomy (mobile first)**
1. Line in Sanskrit (Devanagari or IAST per toggle), large, nothing else above the fold except the ref ("Katha 1.3.14").
2. One plain English line.
3. "Who said it, to whom": two names and one sentence of scene.
4. "How the acharyas read it": 2-3 sentences, Shankara first, other acharyas where they differ.
5. Share card (Devanagari, print-ready, 4:5 and 9:16).
6. Next step by device.
7. Related: the next line in the dialogue, the Gita bridge, the 7-verse plan.

**Signature interaction: "Sit closer."** *Upa-ni-shad* means to sit down near. Dialogue texts (Katha, Chandogya 6, BU Maitreyi, Mundaka 1.1.3, Kena) render as a conversation: the student's question appears; the reader taps **Sit closer** and the teacher's answer rises in, one exchange at a time, with a thin `--sal` thread linking them. Progress is the number of exchanges heard, never a streak. One-off variant for Mandukya 7 and BU 2.3.6: **neti, neti**, where each descriptor fades as you tap, leaving *shantam shivam advaitam*.

**Sample copy (copy rules respected)**
- Hero: "Sit with the oldest questions anyone has asked. One line at a time."
- Katha intro: "A boy walks to Death's door and waits three nights for an answer."
- Tat tvam asi: "A father pours salt into water and asks his son to find it."
- Which first: "Start with eighteen verses. Finish them tonight."
- Plan CTA: "Seven lines on who you are. One each morning."

**Next step by device**
- iPhone: "Keep tonight's line on your Lock Screen" → App Store (campaign token `upanishads`).
- Android: "Get one Upanishad line each morning on WhatsApp" → channel.
- Desktop: "Start the Who am I plan. Day 1 is free" → /start?plan=who-am-i (Google sign-in, plan by email).

## 6. Traffic estimate, metrics, risks, build order

**Estimate (clicks/mo, est.)**
| | Month 3 | Month 6 | Main drivers |
|---|---|---|---|
| India | 60-150 | 180-450 | satyameva jayate source, asato ma meaning, matru devo bhava, Mundaka/Chandogya named pages, Hindi twins |
| US + UK + CA | 30-90 | 100-280 | tat tvam asi cluster, named Upanishads (Easy), which-first guide, PDF |
| Reddit / AI referrals | 50-150 visits | 100-300 visits | series posts; ChatGPT/Perplexity citations |

Assumptions: Easy terms reach positions 5-15 by month 6 with CTR 2-6%; Hard heads (upanishads, what is upanishad) do not rank; pages index within 2-4 weeks; ~20 pages live by month 3, ~40 by month 6. Ahrefs buckets read as >1K ≈ 1-3K, >100 ≈ 100-500. On ~380 clicks/mo today, this funnel adds roughly 50-100% in six months; its value is the share of US/UK iPhone visitors, not raw volume.

**Metrics:** GSC clicks/impressions for `/upanishads/*` by country; position for "tat tvam asi", "isha upanishad", "mundaka upanishad"; device CTA click rate; App Store page views and installs on the `upanishads` campaign token; WhatsApp joins and /start sign-ups tagged by source; Sit closer depth (exchanges per session); Reddit and AI referrers.

**Risks**
- *Translation errors or sectarian pushback* (Advaita vs Dvaita readers on Reddit). Mitigate with the review step and the one-line "other acharyas" note.
- *Hindi source of unknown license and lineage.* Do not publish it until identified; never present the Arya Samaj glosses as Shankara's reading.
- *Thin content:* do not mass-publish 6,478 verse pages; publish curated texts and lines.
- *Wikipedia dominance* on heads; *low pay intent* among students; *scope creep* for a nights-and-weekends build.

**Build order**
1. Week 1: data fixes (Kena, shanti mantras, Taittiriya 2.1, merge prose records, restore refs); translate and verify the 10 famous lines; ship 10 famous-line pages + share cards.
2. Week 2: Upanishads hub + "which first" guide + Isha and Mandukya complete pages; Reddit post 1.
3. Weeks 3-4: Katha with Sit closer + "Who am I" plan on web and in app.
4. Weeks 5-6: Mundaka, Kena, Chandogya 6, mahavakya hub, Gita bridges; PDF magnet.
5. Weeks 7-8: shanti mantra audio pages, Taittiriya/BU selections, Hindi twins; review GSC and cut what isn't moving.

## Sources
- Ahrefs Free Keyword Generator, US, seeds "upanishads", "upanishad", "tat tvam asi", "asato ma sadgamaya" (30 Oct 2026): https://ahrefs.com/keyword-generator/
- Google Search Console, sc-domain:wisdomquotes.in, 1 Jul to 28 Oct 2026 (local MCP)
- Local data: `$HOME/mnt/sanscripts/data/raw_json/*_upanishad_source.json`, `wisdom_kb/out/verses.jsonl`
- Pew Research, Hinduism among Asian Americans (2023): https://www.pewresearch.org/religion/2023/10/11/hinduism-among-asian-americans/
- Yoga Alliance, 2016 Yoga in America highlights: https://yogaalliance.org/highlights-from-the-2016-yoga-in-america-study/
- Online Yoga School, Yoga Alliance topics (30 hrs Yoga Humanities): https://courses.onlineyoga.school/pages/what-topics-does-a-yoga-alliance-training-teach
- GummySearch r/AdvaitaVedanta: https://gummysearch.com/r/AdvaitaVedanta ; r/nonduality: https://gummysearch.com/r/nonduality
- Playboard, Vedanta Society of New York: https://playboard.co/en/channel/UCZOKv_xnTzyLD9RJmbBUV9Q
- Project Gutenberg, Paramananda, The Upanishads: https://www.gutenberg.org/ebooks/3283
- Sitarama Sastri, Upanishads and Sri Sankara's commentary: https://archive.org/details/upanishadssrisan00sita ; wisdomlib Mundaka bhashya: https://www.wisdomlib.org/hinduism/book/mundaka-upanishad-shankara-bhashya
- Advaita-l, English translations thread (Apr 2025): https://advaita-vedanta.org/archives/advaita-l/2025-April/063429.html
- shlokam.org Mundaka 3.1.6: https://shlokam.org/?p=109005
- PMF IAS, Satyameva Jayate source PYQ 2014: https://www.pmfias.com/satyameva-jayate-source-mundaka-upanishad-pyq-2014/
- HSS Balagokulam, Satyameva Jayate: https://balagokulam.hssus.org/course/satyameva-jayate/
- Wikipedia: Upanishads, Muktika, Satyameva Jayate; hinduwebsite.com 108 list; Christianity Today on asato ma (SERP observations)

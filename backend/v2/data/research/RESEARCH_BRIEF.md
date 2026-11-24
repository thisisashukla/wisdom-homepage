# Verse research brief (Wisdom v2 reading plans)

## Why
Wisdom's v2 engine matches a user to one of 30 prebuilt 7-day reading plans, then a smaller LLM (Sarvam) writes a short
personal reading for each day's verse from the user's age, life stage, feeling word and note. Today that LLM sees only
our own short translation, a one-line paraphrase and a terse setting. Your job is to research what traditional
commentaries (bhashya, tika) and reliable modern sources say about each verse, so the writer has faithful, rich
context, and to QA our own data while you are there.

## Input
`/home/claude/research/in/<group>.json`: a list of verses. Each has our `id`, `ref`, `speaker`, `listener`, `setting`,
`sanskrit`, `translation`, `line` (our plain one-line paraphrase), `misuse` (what it must not be read as), the story
(`prasang`) it belongs to, and `used_in` (which plan and day use it, e.g. `grief:day1:see`; jobs are
see = name what they feel, why = where it comes from, steady = ground to stand on, act = something to do today).

## Output
Write `/home/claude/research/out/<group>.json`: a JSON list with one object per input verse, same order, this shape:

```json
{
  "id": "bg.2.47",
  "verified_ref": "Bhagavad Gita 2.47 (same in all editions checked)",
  "attribution_ok": true,
  "attribution_note": "",
  "translation_ok": true,
  "translation_note": "",
  "context": "2-3 sentences, your words: what is happening around this verse, what came just before, what follows.",
  "key_terms": [{"term": "karmaṇy evādhikāras te", "sense": "your right/claim is to the action itself"}],
  "core_teaching": "1-2 plain sentences: what the verse proposes, as the commentaries read it.",
  "commentaries": [
    {"who": "Shankara (Advaita)", "gist": "<= 40 words, your paraphrase", "source": "https://..."},
    {"who": "Ramanuja (Vishishtadvaita)", "gist": "...", "source": "https://..."}
  ],
  "practical_reading": "1-2 sentences: how teachers apply it to everyday life today (your paraphrase).",
  "misreadings": ["readings to avoid, e.g. 'not an argument for passivity'"],
  "cautions": ["sensitivities for a reader in distress, e.g. mentions death; rebirth doctrine can feel dismissive to fresh grief"],
  "speaks_to": ["situations or feelings it genuinely speaks to"],
  "not_for": ["situations where it would land badly"],
  "sources": ["every URL you actually read for this verse"],
  "research_note": "only if something is missing or uncertain"
}
```

- 2 to 4 commentaries per verse where they exist, from different traditions or teachers. For texts without a classical
  commentary (Vivekananda's letters, Kabir, Surdas, Bhartrihari, Yoga Vasishtha), use the best scholarly notes,
  introductions, or the surrounding text itself, and say so in `who` (e.g. "Context of the letter (Complete Works vol. 5)").
- `key_terms`: 2 to 5 Sanskrit/Awadhi/Braj words that carry the meaning, with their sense.
- Save the file after every few verses so partial work survives. Every input verse must have an entry, even if thin.
- At the end also write `/home/claude/research/out/<group>_notes.md`: data errors you found (wrong reference, wrong
  speaker or setting, translation that misstates the verse), verses with weak or no sources, and cautions an editor
  should see (e.g. a verse used on Day 1 of a grief plan that tells the reader not to grieve).

## Rules
- **Paraphrase everything in your own words.** Never copy a translation or commentary sentence. If a few words are
  essential, quote at most 12 words, at most once per source, in quotation marks. Many translations are under copyright
  (Gambhirananda, Prabhupada, Mukundananda, Venkatesananda, Easwaran, Chinmayananda, Gita Press English).
- **Only claim what a page you read says.** Nothing from memory presented as sourced. If you couldn't find commentary,
  leave `commentaries` empty and explain in `research_note`.
- Prefer traditional and established scholarly sources. Avoid blogs, Quora, Medium, and AI-generated content farms.
- QA our data: flag a wrong reference, speaker, listener, setting, or a translation/line that says something the verse
  doesn't. Check verse numbering differences between editions (BORI vs Kumbakonam for the Mahabharata, Gita Press vs
  critical edition for the Ramayana).
- Breadth first: every verse gets an entry before you go deep on any one. Use WebSearch to find pages and WebFetch to
  read them. A good per-verse page often carries several commentaries at once.
- Work only in `/home/claude/research/`. Do not touch the user's computer or any other files.

## Sites not to use
- **gitasupersite.iitk.ac.in / heritage.iitk.ac.in (Gita Supersite):** its robots.txt blocks AI agents (ClaudeBot,
  anthropic-ai) and its pages carry a `noai` tag. Do not fetch it. Use archive.org full texts of public-domain
  editions instead (e.g. A. Mahadeva Sastri's Shankara bhashya, 1897/1901; A. Govindacharya's Ramanuja, 1898;
  K. T. Telang's Gita in Sacred Books of the East; S. Sitarama Sastri / Max Müller for Upanishads with Shankara).
- **kavitakosh.org** also blocks AI agents in robots.txt: don't use it.
- Respect any site that blocks AI agents in robots.txt or shows a bot challenge (e.g. wisdomlib's Cloudflare check):
  don't try to get around it; find another source.

## Good sources by text
- Bhagavad Gita: archive.org full texts (Mahadeva Sastri's Shankara, Govindacharya's Ramanuja, Telang); vedabase.io;
  holy-bhagavad-gita.org; sacred-texts.com.
- Upanishads: archive.org (Shankara's bhashya in public-domain translations); wisdomlib.org where reachable;
  sacred-texts.com (Max Müller).
- Yoga Vasishtha: wisdomlib.org (Vihari-Lala Mitra's translation); Ashtavakra Gita and other gitas: wisdomlib.org,
  sacred-texts.com, sanskritdocuments.org.
- Mahabharata: sacred-texts.com (K. M. Ganguli), wisdomlib.org, BORI critical edition references.
- Valmiki Ramayana: **itihasa.io** (per-śloka pages for all 7 kāṇḍas with Baroda critical-edition citations, variants,
  and syntheses of three classical commentaries: Govindarāja's Bhūṣaṇa, Rāma Varmā's Tilaka, Śivasahāya's Śiromaṇi).
  Its translation and syntheses are AI-generated (Gemini) and not yet peer-reviewed, so use it to locate verses,
  numbering and what each commentator says, cross-check against a second source where you can, and name it as
  "itihasa.io synthesis of <commentator>" in `who`. Don't fetch its /api/ paths (disallowed in robots.txt).
  Also valmikiramayan.net (word by word, notes drawing on Govindaraja and other commentators),
  wisdomlib.org, sacred-texts.com (Griffith).
- Ramcharitmanas: IIT Kanpur's Ramcharitmanas site, wisdomlib.org, Gita Press references.
- Bhartrihari: wisdomlib.org, sanskritdocuments.org, Telang (1874) and Wortham (1886) translations.
- Vivekananda: Complete Works (wisdomlib.org, ramakrishnavivekananda.info): find the letter or lecture and its context.
- Surdas, Kabir: scholarly editions and reputable translation sites; say how confident the attribution is.

## Corpus batches (`corpus_*` groups)
These verses are in the library but not yet in a reading plan (`used_in` is empty). The research will be used to write
readings for them and to build new plans from them, so give special care to `speaks_to` and `not_for` (who in today's
life this verse genuinely helps, and when it would land badly). `our_note` is the short note we already hold; check it.
Work in source order: one chapter, sarga or section page often covers several of your verses, so read it once and
fill all of them. Extra sources for these texts:
- Tulsidas's other works (tulsi_vp = Vinaya Patrika, tulsi_dv = Dohavali, tulsi_kv = Kavitavali, tulsi_hb = Hanuman
  Bahuk, tulsi_gv = Gitavali): wisdomlib.org, Gita Press references, scholarly translations (F. R. Allchin's Vinaya
  Patrika is under copyright: paraphrase only).
- Meera, Rahim, Kabir: reputable editions and translation sites; say how confident the attribution is.
- Avadhuta, Hamsa, Rama, Shakti, Dheesh gitas: wisdomlib.org, sacred-texts.com, sanskritdocuments.org; say what you
  could and couldn't verify.

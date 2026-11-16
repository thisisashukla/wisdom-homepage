# Listen mode pipeline

Narration for every Bhagavad Gita verse (English and Hindi), voiced with Sarvam, grouped into 10 to 15 minute sessions for `/gita/listen` and `/hi/gita/listen`.

Keys come from `backend/.env` (SARVAM_API_KEY) and `backend/.env.supabase.local` (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).

```
pip install sarvamai httpx
python3 tools/listen/gen_scripts.py            # scripts/{c}-{v}.json for every verse (skips existing)
python3 tools/listen/gen_scripts.py 2.47 2.48  # only these verses (delete their files first to redo)
python3 tools/listen/tts_upload.py             # voices every script part, uploads to Supabase, updates audio-index.json
python3 tools/listen/build_listen.py           # sessions + titles -> frontend/src/content/gita/listen/sessions.json, frontend/public/listen/v1/{en,hi}/*.json
```

## How a verse is narrated
1. **Intro** (Sarvam writes): sets the listener up to hear one thing. Never gives away the meaning.
2. **Recitation**: the existing recitation file (`public/audio/gita/manifest.json`).
3. **Body**: the meaning, then one noticing, then a lead into the next verse.
   - English meaning is the site's own translation, read as is. Hindi meaning is a spoken rewording of the Hindi translation.
   - The noticing is grounded: the model must cite an exact phrase from the verse data (usually a word meaning) and the code checks it.
4. A reviewer pass (Sarvam, no reasoning) flags meaning changes, content borrowed from the previous/next verse, wrong facts and invented claims. Up to 4 attempts; then the failing fields are replaced from the verse data (`source: sarvam+repair`) or the whole verse uses a template (`source: template`).
5. Rule checks: no dashes, no contrast templates, no verse numbers, no English in Hindi, no Devanagari in English, length limits.

`review` in each script file keeps every attempt's findings. To review a verse, read its file; to redo it, delete the file and re-run the three steps.

Audio: Bulbul v4-flash, `girish_en_devotional` (en-IN) and `girish_hi_devotional` (hi-IN), pace 0.92, 24 kHz MP3, at `wisdom-homepage/audio/gita-listen/v1/{lang}/{c}-{v}-{part}-{hash}.mp3`. The hash covers the text and voice, so a changed script gets a new file and old URLs keep working.

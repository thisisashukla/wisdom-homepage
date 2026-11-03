# Gita PDF (`public/downloads/bhagavad-gita-700-shlok-hindi.pdf`)

`build-gita-pdf.mjs` turns `src/content/gita` (Sanskrit + `hindiTranslation`) into an A5 PDF through Chromium. It uses the OFL fonts in `fonts/`, and the data fixes (18.2 split, 13.1 meaning, joint meanings) are documented at the top of the script.
Regenerate from `frontend/` (run `npm run gita:update` first if the content changed):
`npm i --no-save playwright pdf-lib && npx playwright install chromium && node scripts/pdf/build-gita-pdf.mjs`
The build fails rather than print a verse whose Hindi is empty or broken; add a `HINDI_OVERRIDES` entry for it.

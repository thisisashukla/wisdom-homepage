# Homepage design and conversion implementation — 2 October 2026

Implemented locally. No commit, push, deployment or hosting-setting change was made.

## Delivered

- Rebuilt the homepage with warm paper, maroon typography, real app screenshots, a daily verse/audio sample, compact crawlable links to all 18 chapters, thematic reading links and an editorial-methodology section.
- Preserved homepage search metadata. The FAQ visible on the homepage is rendered from the same data as its structured data.
- Kept reading and app download actions visible together in the hero. Added a prominent persistent navigation link to the iPhone app.
- Desktop offers now include the official App Store badge and an accessible QR disclosure. Android retains a web-reading action; iPhone/iPad get the direct App Store offer. Server HTML includes a usable App Store link if JavaScript is unavailable.
- QR is a local SVG generated with qrcode 8.2. It contains https://apps.apple.com/app/apple-store/id6747684125?ct=desktop-qr&mt=8. This is a shared QR campaign, not per-page install attribution; no external QR service or runtime dependency is used.
- Moved the single offer on the Hindi hub before the chapter directory, on the karma article after the second verse, and on the translation guide after the comparison example. Article and hub copy/metadata remain unchanged.
- Removed the cursor glow. Replaced the homepage stylesheet with scoped rules. The existing app landing page retains its own stylesheet so the homepage redesign does not restyle that page.
- Replaced blanket 340px CTA minimum heights with compact layouts. Preserved saved reading position and the existing audio player.
- Added CTA Placement Shown, deduplicated by offer and placement within a page visit; kept CTA Shown as the distinct page-offer metric. Explicit hero/footer placements are used on home and app pages.
- Host redirects are opt-in using WISDOM_CANONICAL_HOST. With no setting, middleware only normalises trailing slashes and does not oppose the hosting redirect. Chapter Smart App Banners now point to the first verse, covered by the association file.

## Validation performed

- Production build and TypeScript checks passed; 1,647 static pages generated.
- 26 unit/API tests passed, including device offer policy, both-language chapter banners, safe redirect defaults, explicit host normalisation, query preservation and local-preview behaviour.
- git diff --check passed.
- Read-only HTTP checks against the production preview confirmed 200 on both host headers, slash redirects preserving each host and ?web=1, association JSON with the web fallback exclusion, and server-rendered homepage links.
- Browser checked at desktop and 390px mobile width: no homepage horizontal overflow or broken loaded images; mobile menu opens/closes with Escape; desktop QR disclosure opens; app landing page retains download offers; reading a verse and returning restores Continue at 10.13.
- Hindi hub, karma article and translation guide checked at mobile width: one correctly positioned offer on each and no horizontal overflow.
- Homepage Sanskrit audio advanced to 8.8 seconds with an active highlighted word and no audio error.
- Compared each priority page with the pre-change working copy after removing CTA markup: all other content and metadata match.
- Existing browser regression scripts updated for desktop offers, distinct placements and default host behaviour; those scripts were not executed in this turn. The browser checks above were performed through the in-app browser.

Screenshots: [Desktop](qa/homepage-redesign-desktop.jpg), [Mobile](qa/homepage-redesign-mobile.jpg).

## Release notes and limits

1. Deploy only the intended frontend change set and its prerequisite funnel files. The repository already contains unrelated backend edits, deleted migrations and untracked environment backups/virtual environments. Do not stage the entire working tree.
2. Leave WISDOM_CANONICAL_HOST unset with the current hosting setup. Metadata continues to use the existing apex canonical URLs. A later host migration must align hosting redirects, canonical URLs and association-domain configuration before enabling a host redirect. That SEO migration is not complete here.
3. Real iPhone Safari, installed/absent app opening, QR scanning on a physical phone and app-version compatibility remain release checks. Mobile-width browser checks are not physical-device evidence.
4. Provider ID, App Store campaign reporting, installs, payments and retained-user lift are not verified. QR uses a shared campaign; do not claim source-page install attribution from it.
5. App screenshots are existing repository assets, not newly captured from the current App Store build. Confirm feature and pricing copy against the released app before promotion. The app landing page’s existing ratings/testimonials were not independently verified in this work.
6. Pre-change copies of modified existing files are in /tmp/wisdom-before-redesign for this session. No unrelated backend code or scripture content files were edited.

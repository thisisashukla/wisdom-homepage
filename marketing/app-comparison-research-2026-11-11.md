# App comparison research, 11 Nov 2026

Raw research behind /best-apps, /best-bhagavad-gita-apps, /best-hindu-prayer-apps, /best-hanuman-chalisa-apps and /bhagavad-gita-widget-iphone. Data file: `frontend/src/lib/app-compare/apps.ts` (generated from these notes; update both together).

## Method

- Checked on 2026-11-11 (UTC).
- Discovery: iTunes Search API, US storefront, limit 50, for: "bhagavad gita", "gita", "bhagavad gita audio", "gita widget", "hindu prayer", "hindu meditation", "hindu daily prayers", "hanuman chalisa", "hanuman chalisa audio", "hindu devotional", "puja", "mantra chanting", "gita press", "iskcon", "sanatan", "krishna", "hindu", "aarti", "bhakti", "daily gita", "gita 365", "dharmam", "diya hindu"; plus name searches for GitaVardhan, Dharmam, Saachi, Hindu Prayer Companion, Dharmik Mind, Ghar, Sadhguru, Gita Press, and the India storefront for "hanuman chalisa". 708 unique apps scanned; Hindu/Gita apps sorted by rating count.
- Ratings: iTunes Lookup API `https://itunes.apple.com/lookup?id=<id>&country=us` and `&country=in` (averageUserRating, userRatingCount, currentVersionReleaseDate, version).
- Price, in-app purchases, privacy label, compatibility, languages and description: the live App Store web page `https://apps.apple.com/us/app/id<id>` (fetched with curl, text extracted).
- Android: Google Play search and details pages (`https://play.google.com/store/apps/details?id=<pkg>&hl=en&gl=us`), matched by developer name. "Not found" means no listing from the same developer turned up in Play search.
- Features are marked only when stated on the store page or developer site. Anything else is "not stated".
- Not included: Hindu Prayer Companion (only an Android app, "Blue King Code", 100+ installs; no iOS app found), Dharmik Mind (no iOS app found under that name), Bhagavad Gita - Daily Shlokas (JDB), Vedas AI, Bhagavad Gita Audio (Ankur Dhameliya), Dharmayana (mostly astrology and paid puja), Naam Jap counters, Deva & Miten Gayatri Sangha: checked, data below, left out of the pages as off-topic or thin. Hundreds of very small apps (fewer than ~15 ratings and no developer site) were skipped unless they had a feature no larger app has (widgets).

## Wisdom: live store page vs owner facts

- Live name: "Wisdom: Bhagavad Gita Journal", subtitle "Karma Yoga, Hindu & Daily Soul" (the brief said "Wisdom: Gita, Yoga & Journal"). The v3 line "Bhagavad Gita tuned to your life · one verse a day" appears only in What's New, not in the name or subtitle.
- The description still describes v2 (Paths, Nodes, journaling curriculum, "Wisdom offers a free tier. Full access ... requires a premium subscription"). What's New (3.0.0, Nov 3) describes v3: 7-day plan from what is on your mind, Sanskrit, listen to every verse, Home and Lock Screen, first week free, Pro for weeks 2 and 3.
- In-app purchases listed: Wisdom Yearly Plan $9.99, Wisdom Pro $39.99, Wisdom Pro $4.99, Wisdom Monthly $1.99, Wisdom Monthly $0.99 (older plans still listed). The page uses the owner's figures, $4.99/month and $39.99/year; the 7-day trial is not stated on the store page.
- Compatibility lists iPhone, iPad and iPod touch. Apple Watch is NOT listed under Compatibility, although the description says "Apple Watch complications". The page says exactly that.
- Privacy: Data Not Collected. Languages: English. Ratings: US 0; India 16 at 5.0.

## Apps on the pages

### Wisdom: Bhagavad Gita Journal (wisdom)

- App Store: https://apps.apple.com/us/app/id6747684125 (US). Developer: Ankur Shukla. Seller URL: https://www.wisdomquotes.in
- Price (US): Free. In-app purchases: Wisdom Yearly Plan $9.99, Wisdom Pro $39.99, Wisdom Pro $4.99, Wisdom Monthly $1.99, Wisdom Monthly $0.99
- Ratings: US 0 from 0; India 5 from 16 (iTunes Lookup API)
- Last update: 2026-11-03 (v3.0.0); first released 2026-03-11
- Compatibility: iPhone, iPad, iPod touch. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: no (iPhone only; on Android the web version is at wisdomquotes.in/start)
- Our summary: price "Free first week, then Pro $4.99 a month or $39.99 a year"; languages "English"; ads "No ads"; account "Not stated on the store page"
  - sanskrit: yes (Every verse shows its Sanskrit line)
  - translit: ns
  - meanings: ns (Plain English meaning; word by word not stated)
  - commentary: part (A short note on what the verse means for you, written by AI)
  - audio: yes (Every verse explained aloud; stories from the Ramayana, Mahabharata and Gita)
  - offline: ns
  - widgets: yes (Home and Lock Screen, every size)
  - watch: part (Apple Watch complications are in the description; Apple Watch is not listed under Compatibility)
  - plans: yes (A 7-day plan built from what you tell it)
  - widget: home yes, lock yes, shows: Today's verse from your plan, in every widget size, light and dark
- Developer source: https://wisdomquotes.in/app
- Store description (excerpt, verbatim): "Tell Wisdom what's weighing on you. Each morning, one verse from the Bhagavad Gita chosen for your life, explained aloud, with the Sanskrit. Your first week is free. / One verse a day. One question to sit with. One step deeper into five thousand years of Hindu philosophy. / Wisdom brings the Bhagavad Gita, Ramayana, Ramcharitmanas and Upanishads to your phone — not as a textbook, but as a living practice you can actually walk. / THREE PATHS. THREE WAYS TO GROW. / Karma Yog — Path of Action / Act without attachment to results. The philosophy of purposeful, dharmic living drawn directly from Krishna's teachings in the Gita. Do what is right, not what is rewarded. / Gyan Yog — Path of Wisdom / Know the self. The path of knowledge and liberation, drawn from the Upanishads, Adi Shankaracharya, and the Vedantic tradition. / Bhakti Yog — Path of Devotion / Surrender to something larger than yourself. The path of love and service, drawn from the Ramcharitmanas and the great bhakti poets of India. / HOW THE JOURNEY WORKS / Each Path is made of Nodes — philosophical concepts that build on each other like rungs of a ladder. Each Node holds curated shlokas and teachings. Complete your Practice to unlock the next Node: read a verse, sit with it, and journal your reflection. The prompt asks the exact question the shloka is pointing at. Your answer is your practice. Your progression is real. / A LIBRARY OF SANATAN DHARMA / • Bhagavad Gita — all 18 chapters, every shloka with meaning / • Ramcharitmanas — Tulsidas's devotional masterwork / • Ramayana — the epic as lived philosophy / • Upani"

### Bhagavad Gita - Krishna Bhakti (jkyog)

- App Store: https://apps.apple.com/us/app/id6463116386 (US). Developer: Jagadguru Kripaluji Yog. Seller URL: https://www.jkyog.org/
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.9 from 803; India 4.9 from 347 (iTunes Lookup API)
- Last update: 2026-11-05 (v2.0.72); first released 2023-09-08
- Compatibility: iPhone, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Linked to You; categories: Contact Info, Diagnostics, Identifiers, Usage Data
- Android: yes https://play.google.com/store/apps/details?id=org.jkyog.radhakrishnabhakti
- Our summary: price "Free"; languages "Commentary in English, Hindi, Tamil, Telugu, Gujarati and Odia"; ads "No ads"; account "Not stated (sync across devices is offered)"
  - sanskrit: yes
  - translit: ns
  - meanings: ns
  - commentary: yes (Swami Mukundananda, verse by verse)
  - audio: yes (Sanskrit pronunciation audio, bhajans, kirtans, 24/7 radio)
  - offline: yes
  - widgets: ns
  - watch: ns
  - plans: part (Challenges, quizzes, reminders)
- Store description (excerpt, verbatim): "Bhagavad Gita & Sacred Texts - Read Bhagwat Geeta with Commentary, Krishna Bhakti Meditation, Spiritual Guide & Devotional App / #1 app for Bhagavad Gita study, Krishna devotion, and spiritual growth. Read complete Bhagwat Geeta with Swami Mukundananda's verse-by-verse commentary, now available in English, Hindi, Tamil, Telugu, Gujarati, and Odiya. Experience spiritual wisdom through the innovative Radha Krishna Bhakti app by JKYog. / Perfect for both beginners and advanced seekers on the path of Krishna Bhakti and Vedic wisdom. Access the most comprehensive Bhagavad Gita app with intelligent features designed for modern spiritual study. / REVOLUTIONARY SPIRITUAL TECHNOLOGY / World's First Spiritual AI - Ask Swamiji chatbot, powered by ChatGPT technology, provides instant guidance on spirituality, mind management, and personal growth through Swami Mukundananda's teachings. / Interactive Virtual Temple for traditional worship - perform aarti, offer flowers, and light diyas in a serene digital space dedicated to Radha Krishna devotion. / COMPLETE SPIRITUAL FEATURES / Sacred Text Study: / * Complete Bhagwat Geeta with expert commentary / * Perfect Sanskrit pronunciation audio / * Multi-language support / * Reading progress tracker / * Personalized bookmarks / * Study notes / * Verse sharing / Devotional Content: / * Extensive bhajans and kirtans library / * Trending spiritual short videos / * 24/7 JKYog radio / * Guided Krishna meditation / * Live temple events / * Daily inspirational quotes / Modern Spiritual Tools: / * AI Chatbot for spiritual guidance / * Virtual temple wor"

### Bhagavad Gita The Song of God (songofgod)

- App Store: https://apps.apple.com/us/app/id1568483426 (US). Developer: Jagadguru Kripalu Yog Trust. Seller URL: none listed
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.5 from 25; India 4.7 from 28 (iTunes Lookup API)
- Last update: 2026-10-03 (v2.0.2); first released 2021-05-23
- Compatibility: iPhone, iPad, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: yes https://play.google.com/store/apps/details?id=in.jkyog.bhagavadgita (Published as JKYog India)
- Our summary: price "Free"; languages "English, Hindi, Tamil, Telugu, Gujarati, Odia"; ads "No ads"; account "Optional (for syncing bookmarks)"
  - sanskrit: yes
  - translit: yes
  - meanings: yes
  - commentary: yes (Swami Mukundananda)
  - audio: yes (Each shloka recited, also offline)
  - offline: yes (Per language download)
  - widgets: ns
  - watch: ns
  - plans: part (A verse of the day notification)
- Developer source: https://www.holy-bhagavad-gita.org
- Store description (excerpt, verbatim): "Every line of every shloka, now shown in full at any text size. Read the Bhagavad Gita verse by verse and hear each shloka recited, even offline. / Your first four paragraphs were strong and are all still true, so I kept them nearly verbatim and rebuilt only the feature lists. / Bhagavad Gita — The Song of God is a comprehensive commentary by Swami Mukundananda on the timeless wisdom given to Arjun by Shree Krishna on the battlefield of Kurukshetra. / Unable to deal with the immediate problem at hand, Arjun approached Shree Krishna for a palliative to overcome the anguish he was experiencing. Shree Krishna did not just advise him on his immediate problem but digressed to give a profound discourse on the philosophy of life. / In this authoritative commentary, Swami Mukundananda reveals the original meanings of the verses with crystal clear explanations and perfect logic. Adopting a comprehensive and holistic approach not attempted hitherto, he intersperses his purports with illustrative stories and real-life examples to make the teachings easy to comprehend and implement in everyday living. He masterly quotes from all the Vedic scriptures and many other sacred texts, opening up a panoramic view to help us see through the window of the Bhagavad Gita, the whole Absolute Truth. / This is the most popular commentary on the Bhagavad Gita ever. Read by millions on https://www.holy-bhagavad-gita.org, it has now been completely rebuilt as an app. / Every verse is presented in five layers: the original Sanskrit shloka, Transliteration, Word Meanings, Translation, and Commentary. / KE"

### Bhagavad-gita As It Is (bbt)

- App Store: https://apps.apple.com/us/app/id1080562426 (US). Developer: The Bhaktivedanta Book Trust (Bbt). Seller URL: none listed
- Price (US): $4.99. In-app purchases: none listed
- Ratings: US 4.9 from 565; India 4.9 from 177 (iTunes Lookup API)
- Last update: 2026-09-13 (v2.0.1); first released 2017-06-23
- Compatibility: iPhone, iPad, Mac, Apple Vision. Store languages: English and 7 more / English, Danish, French, German, Hungarian, Lithuanian, Polish, Russian
- Privacy label: Data Not Collected; categories: 
- Android: new https://play.google.com/store/apps/details?id=com.bbt.com.bbt.bg (A BBT listing exists on Google Play with very few installs)
- Our summary: price "$4.99 once"; languages "English, German, French, Hungarian, Russian (text)"; ads "None mentioned"; account "Not stated"
  - sanskrit: yes (Devanagari)
  - translit: yes
  - meanings: yes (Word for word)
  - commentary: yes (Prabhupada's purports)
  - audio: ns
  - offline: ns
  - widgets: ns (Has a Verse of the Day inside the app)
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "• Contains the full text in English, German, French, Hungarian and Russian. / • Customize what you see as you read – devanagari, transliterated verses, word for- word translations, verse translations, purports … each element can be turned on and off globally. / • Read the text in two languages at once by pinching in or out on a paragraph (just place two thumbs on a paragraph and pull them away from each other). / • An extensive image gallery, including paintings from the first and second editions of the Bhagavad-gita As It Is. / • The text is fully searchable and the search tool can be customized to check the entire text or only verses, translations or purports. / • Create bookmarks, notes, and highlights, and customize the look by changing the typeface, text size, and line spacing. / • A full Sanskrit pronunciation guide and dynamic glossary. / • Wake up (or go to sleep) to a Gita verse with the Verse of the Day feature on the home screen. Each app user’s daily verse is unique to his or her phone. / • Day/night color modes and multiple daytime color palettes personalize the app. / • Resume reading from where you left off. Easily access the menu for when you want to go elsewhere in the app. / more"

### GitaVardhan (gitavardhan)

- App Store: https://apps.apple.com/us/app/id6759822634 (US). Developer: Deepak Raja. Seller URL: https://www.gitavardhan.in
- Price (US): Free. In-app purchases: none listed
- Ratings: US 5 from 6; India 5 from 18 (iTunes Lookup API)
- Last update: 2026-11-09 (v2.7.2); first released 2026-03-09
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: yes https://play.google.com/store/apps/details?id=app.emergent.bhagavadreader73b997d5
- Our summary: price "Free"; languages "13 languages in 11+ scripts, including Hindi, Sanskrit, Marathi, Bengali, Gujarati, Kannada, Malayalam, Odia, Punjabi, Tamil, Telugu, English"; ads "No ads"; account "No account"
  - sanskrit: yes
  - translit: ns
  - meanings: yes (Word meanings and grammar)
  - commentary: yes (Adi Shankaracharya and Ramanuja)
  - audio: yes (Verse-by-verse chanting, the full Gita parayan, a learn-to-chant module)
  - offline: yes (100% offline after download)
  - widgets: ns
  - watch: ns
  - plans: part (11 hand-picked verses for students, professionals, kids, seekers or stress)
- Developer source: https://www.gitavardhan.in
- Store description (excerpt, verbatim): "Multilingual Bhagwad Gita, no ads, no data collection, no account, authentic shlokas, commentaries, audio, grammar, learn. Developed by the boy who memorised Gita at 5. / GitaVardhan: Your Daily Spiritual Companion / GitaVardhan is more than just a reading app; it is a bridge between ancient wisdom and your modern lifestyle. Designed for children, students, adults and seekers alike, this app makes the 700 verses of the Bhagavad Gita accessible in 11+ regional scripts (13 Languages) with high-quality audio and personalised guidance, meaning and commentaries of Adi Shankaracharya and Ramanuja in 13 languages, / Master Your Habits: Daily Streaks & Progress / Transform your spiritual study into a powerful daily habit with our built-in progress tracking. GitaVardhan is designed to keep you consistent and motivated: / Build Your Streak: Visualize your dedication with the Daily Streak Counter. Every day you spend 5 minutes, your streak grows. Can you reach a 108-day milestone or 365+ to reach the highest Level of Savyasachi? / Verse Counter: Every shloka you complete is added to your lifetime Verse Count. Watch your progress move from your first verse to completing all 18 chapters. / Key Features / Multi-Script Support: Read the Gita in your mother tongue. Switch instantly between Hindi, English, Sanskrit, Marathi, Bengali, Gujarati, Kannada, Malayalam, Odia, Punjabi, Tamil, and Telugu. / Verse-by-Verse Audio: Listen to precise chanting for every shloka within the verse card / Complete Audio - Complete Gita Parayan (from Dhyanam to Mahatmyam) with verses displayed in your language"

### 10 Minute Gita (tenmin)

- App Store: https://apps.apple.com/us/app/id6758332047 (US). Developer: Anish Moonka. Seller URL: https://am1403x.github.io/ten-minute-gita/
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.8 from 80; India 4.8 from 102 (iTunes Lookup API)
- Last update: 2026-02-20 (v1.1.0); first released 2026-02-03
- Compatibility: iPhone, iPad, iPod touch. Store languages: English
- Privacy label: Data Linked to You, Data Not Linked to You; categories: Contact Info, Diagnostics, Identifiers, Usage Data
- Android: no
- Our summary: price "Free"; languages "English or Hindi"; ads "No ads"; account "Optional (Sign in with Apple or Google to sync)"
  - sanskrit: yes
  - translit: yes
  - meanings: ns (Verse-by-verse translation)
  - commentary: yes (Commentary is included; the author is not named on the store page)
  - audio: yes (Narration with word-by-word highlighting)
  - offline: yes (After download)
  - widgets: ns
  - watch: ns
  - plans: yes (One reading unlocks each day, 239 days)
- Developer source: https://am1403x.github.io/ten-minute-gita/
- Store description (excerpt, verbatim): "Now with audio narration. Listen along with word-by-word highlighting. Sign in to sync your journey across devices. Download readings to listen offline. / Discover the eternal wisdom of the Bhagavad Gita through a simple daily practice. / 10 Minute Gita breaks down all 18 chapters and 700 verses of the Shrimad Bhagavad Gita into 239 sacred daily readings, each designed to take just 10 minutes. Whether you're beginning your first paath or deepening your understanding, this app makes the divine teachings of Shri Krishna accessible and consistent. / WHAT YOU RECEIVE EACH DAY: / • Original Sanskrit shlokas in Devanagari / • Transliteration for correct pronunciation / • Verse-by-verse translations / • Thoughtful commentary to illuminate deeper meaning / • A personal reflection to carry into daily life / • Full audio narration with word-by-word highlighting / FEATURES: / • One new reading unlocks each day to build a steady practice / • Listen, read, or do both at the same time / • Sign in with Apple or Google to sync across all your devices / • Track your streak and reading history on a visual calendar / • Share beautiful verse cards on WhatsApp, Instagram, and more / • Full Bilingual support: English or हिन्दी / • Search across all your completed readings instantly / • Light and dark mode with adjustable font size / • Show or hide Sanskrit, transliteration, and translation / • Streak freezes to protect progress on busy days / • Milestone celebrations at sacred points in your journey / • Swipe between readings effortlessly / • Completely offline after download / YOUR 239-DAY YATR"

### Gita 365 (gita365)

- App Store: https://apps.apple.com/us/app/id1480211584 (US). Developer: Chinmaya Mission Houston. Seller URL: https://www.youtube.com/watch?v=mYoux4edrQE&feature=youtu.be
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.9 from 2340; India 4.9 from 960 (iTunes Lookup API)
- Last update: 2020-10-24 (v2.0); first released 2019-09-21
- Compatibility: iPhone, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: No Details Provided; categories: 
- Android: yes https://play.google.com/store/apps/details?id=com.chinmaya.gita365 (The Android version was updated in October 2026)
- Our summary: price "Free"; languages "English"; ads "Not stated"; account "Not stated"
  - sanskrit: ns
  - translit: ns
  - meanings: ns
  - commentary: yes (Swami Chinmayananda, in his own voice)
  - audio: yes (A 2 to 4 minute message a day, with chanting of the verses)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: yes (365 days, chapter 1 to 18)
- Store description (excerpt, verbatim): ""Gita 365" app is an inspirational yearlong feature that brings the invaluable and practical insight of Pujya Swami Chinmayananda’s lifelong Gita Jnana Yajna into every seeker’s day.  Every day the user will receive a two to four minutes message from the Bhagavad Gita in the unforgettable words and voice of Pujya Swami Chinmayananda himself.  Just those few personal minutes with this inimitable Teacher and listening to the melodious chanting of the selected verses can uplift and beautify everyday experience throughout the year. Watching and listening to the App will attune a user to the Lord’s Song as gifted by our beloved Pujya Gurudeva for 365 days of the year, covering the message of entire Bhagavad Gita from Chapter 1 through Chapter 18. / more"

### Shrimad Bhagavad Gita English (banaka)

- App Store: https://apps.apple.com/us/app/id1302874308 (US). Developer: Mohit Agarwal. Seller URL: https://banaka.in
- Price (US): Free. In-app purchases: Premium Plan - Remove Ads $1.99, Premium Plan - Remove Ads $14.99, Premium Plan - Remove Ads $9.99
- Ratings: US 4.8 from 1543; India 4.8 from 1735 (iTunes Lookup API)
- Last update: 2025-09-08 (v1.8.5); first released 2017-10-30
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Linked to You, Data Used to Track You; categories: Diagnostics, Identifiers, Other Data, Usage Data
- Android: yes https://play.google.com/store/apps/details?id=in.banaka.mohit.bhagwadgita.english
- Our summary: price "Free with ads; remove ads from $1.99"; languages "English (Hindi translation also mentioned)"; ads "Yes, removable with a purchase"; account "Not stated"
  - sanskrit: yes (All 700 shlokas)
  - translit: ns
  - meanings: ns
  - commentary: part (A description with each verse)
  - audio: ns
  - offline: yes
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "Bhagavad Gita is knowledge of five basic truths and the relationship of each truth to the other: These five truths are Krishna, or God, the individual soul, the material world, action in this world, and time. The Gita lucidly explains the nature of consciousness, the self, and the universe. It is the essence of India's spiritual wisdom. / Bhagavad Gita, is a part of the 5th Veda (written by Vedavyasa - ancient Indian saint) and Indian Epic - Mahabharata. It was narrated for the first time in the battle of Kurukshetra, by Lord Krishna to Arjun. / The Bhagavad Gita also referred to as Gita, is a 700–verse Dharmic scripture that is part of the ancient Sanskrit epic Mahabharata. This scripture contains a conversation between Pandava prince Arjuna and his guide Krishna on a variety of philosophical issues. / Faced with a fratricidal war, a despondent Arjuna turns to his charioteer Krishna for counsel on the battlefield. Krishna, through the course of the Bhagavad Gita, imparts to Arjuna wisdom, the path to devotion, and the doctrine of selfless action. The Bhagavad Gita upholds the essence and the philosophical tradition of the Upanishads. However, unlike the rigorous monism of the Upanishads, the Bhagavad Gita also integrates dualism and theism. / Numerous commentaries have been written on the Bhagavad Gita with widely differing views on the essentials, beginning with Adi Sankara's commentary on the Bhagavad Gita in the eighth century CE. Commentators see the setting of the Bhagavad Gita in a battlefield as an allegory for the ethical and moral struggles of the human life. The "

### Bhagavad Gita: Hindi & English (vedvyas)

- App Store: https://apps.apple.com/us/app/id1602895635 (US). Developer: Ved Vyas Foundation. Seller URL: https://bhagavadgita.io
- Price (US): Free. In-app purchases: none listed
- Ratings: US 2 from 3; India 3.5 from 8 (iTunes Lookup API)
- Last update: 2026-07-21 (v2.2.3); first released 2023-03-19
- Compatibility: iPhone, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: yes https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita (Far more used on Android (500K+ installs))
- Our summary: price "Free"; languages "Hindi and English"; ads "Not stated"; account "Not stated"
  - sanskrit: yes
  - translit: yes
  - meanings: yes
  - commentary: yes (20+ authors and translations)
  - audio: no (Pronunciation is described as coming soon)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: part (A verse of the day)
- Developer source: https://bhagavadgita.io
- Store description (excerpt, verbatim): "Do you want to learn from the holy Shreemad Bhagavat Geeta book? Want to carry Bhagwat Gita in your pocket? / Start using this amazing app with a beautiful and easy-to-use interface that has complete translations of the Bhagavat Geeta in Hindi and English. Your search for the perfect Bhagvat Geeta app ends here with Bhagavad Gita: Hindi & English. / This Bhagavad Geeta app provides you with an austere experience to help make your reading extremely convenient. / Verse of the Day / Use the Verse of the Day feature to memorize and practice Bhagavad Geeta's learnings with a new verse every day. / Reading Tracker / You can also continue reading from where you left off on the app. The app keeps track of your reading history to help you get the best experience from this Bhagwad Geeta learning app. / Multi-language Support / Whether you're looking for bhagavad gita hindi or bhagavad gita english, your search ends with this single app that has Bhagavad Gita in both English & Hindi on a single app. / You will also get the shlokas or verses in the Sanskrit language, soon introducing pronunciation support. / Bookmark / In the Bhagavad Gita app, you can add multiple bookmarks so you can access those shlokas later on when you need them, which makes your reading experience incredibly convenient. / Notes / Add Notes to different verses to practice better and keep a summary of your learnings. Access all your notes seamlessly from a single place. / -- / What is the Bhagavad Geeta / The Shrimad Bhagavad Gita (श्रीमद्भगवद्गीता) The Song by God, often referred to as the Gita, is a 700-verse Hin"

### Gita Seva (gitaseva)

- App Store: https://apps.apple.com/us/app/id1418594830 (US). Developer: Gita Seva Trust. Seller URL: none listed
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.9 from 95; India 4.8 from 869 (iTunes Lookup API)
- Last update: 2026-08-11 (v6.3); first released 2018-09-24
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You, Data Not Linked to You; categories: Contact Info, Identifiers, Usage Data, User Content
- Android: yes https://play.google.com/store/apps/details?id=ct.android.gitasevakotlin
- Our summary: price "Free"; languages "Hindi and English"; ads "Not stated"; account "Not stated"
  - sanskrit: ns
  - translit: ns
  - meanings: ns
  - commentary: yes (Gita Press texts and pravachan by Swami Ramsukhdas and Jayadayal Goyandka)
  - audio: yes (Geeta path, Ramayan path, Hanuman Chalisa, Sunderkand, aarti, bhajan, with synced lyrics)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "You will get totally free access to below content - / 1. eBooks (ई - पुस्तकें) - / * Bhagavad Gita (Bhagwat Geeta) (भगवद्गीता) / * Ramayana (Ramcharitmanas) (रामायण, रामचरितमानस) / * Literature of Tulsidas ji and Surdas ji (तुलसीदास जी तथा सूरदास जी साहित्य) / * Mahabharat (महाभारत) / * Puranas and Upanishads (पुराण तथा उपनिषद्) / * Worship पूजा - [Aarti (Arti) (आरती), Hanuman chalisa हनुमान चालीसा, Shiv Chalisa शिव चालीसा, Durga Chalisa दुर्गा चालीसा ] / * Health (आरोग्यम्) / * Other Religious books (अन्य धार्मिक पुस्तकें) / 2. Audio (ऑडियो) - / * गीता पाठ (Geeta Path), रामायण पाठ (Ramayan Path), हनुमान चालीसा (Hanuman Chalisa), सुन्दरकाण्ड (Sunder kand), विष्णु सहस्रनाम स्तोत्रम् (Vishnu Sahasranama Stotram), आरती (Aarti), भजन (Bhajan), इत्यादि । / 3. Pravachan (प्रवचन) - / * Gita Press Gorakhpur founder Honourable Sethji Shri Jayadayal Ji Goyandka (गाीता प्रेस गोरखपुर के संस्थापक श्रद्धेय श्रीजयदयालजी गोयन्दका) / * Honourable Shri Hanuman Prasad Ji Poddar (श्रद्धेय श्रीहनुमानप्रसादजी पोद्दार) / * Honourable Swami Shri RamsukhdasJi Maharaj (श्रद्धेय स्वामी श्रीरामसुखदासजी महाराज) / 4. Videos (वीडियो) - / * श्रीमद्भागवत, महाभारत, अध्यात्म रामायण, देवी भागवत कथा, इत्यादि । / 5. Legendary articles (महापुरुषों के लेख) / 6. Divine Quotes (अमृत वचन) / Gita Seva (गीता सेवा) is a project which is built with an intent to enhance the awareness among the people in respect to the concepts and knowledge regarding spirituality. / With the rapid increase in the use of smartphones and the Internet services, the most efficient option is to provide the users with an option to get instant a"

### Bhagavad Gita For All | Video (bgfa)

- App Store: https://apps.apple.com/us/app/id6504813763 (US). Developer: Faith Tech Labs Private Limited. Seller URL: https://www.bhagavadgitaforall.com
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.5 from 84; India 4.7 from 3574 (iTunes Lookup API)
- Last update: 2026-11-04 (v8.1); first released 2024-09-26
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Linked to You, Data Used to Track You; categories: Contact Info, Identifiers, Purchases
- Android: yes https://play.google.com/store/apps/details?id=com.bgfa (1M+ installs on Android)
- Our summary: price "Free download with a free trial; no in-app prices are listed on the US store page"; languages "Hindi and English"; ads "Not stated"; account "Not stated"
  - sanskrit: yes
  - translit: ns
  - meanings: ns
  - commentary: yes (Six layers per shloka, from context to work life)
  - audio: part (Video explanations; audio notes in the AI chat)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: part (Browse by topic, such as anxiety or grief)
- Store description (excerpt, verbatim): "The festive season is here. This year, don't just observe the rituals. Understand them. Watch the Gita, one shlock a day, in Hindi or English. / World's First & Only Video-Based Bhagavad Gita / In Hindi & English | #1 Bhagavad Gita App - Books Category / Experience the Bhagavad Gita like never before. / Bhagavad Gita For All brings every Shloka to life through cinematic video explanations - in Hindi & English - making Krishna's timeless wisdom accessible to every generation, everywhere. / START YOUR FREE TRIAL / Explore the full app completely. / No commitment. Pure wisdom. / ------------------------------------------------ / APP FEATURES / ------------------------------------------------ / EXPLORE THE GITA - YOUR WAY / Navigate by Shloka - chapter by chapter, verse by verse, in the order Krishna intended. / Or navigate by Topic - find guidance for exactly what you're feeling right now: / * Anxiety • Anger • Grief • Ego • Failure / * Purpose • Leadership • Self-Control / * Overthinking • Why Good People Suffer …and many more / ------------------------------------------------ / 6 UNIQUE LAYERS OF WISDOM PER SHLOKA / Every verse goes far beyond translation. / Each Shloka is explored through: / 1. Sanskrit Shloka - the original sacred text / 2. Context - the background, emotional & psychological context in which the Shloka (verse) takes place / 3. Explanation - what Shri Krishna truly means / 4. Personal Life - how it applies to you / 5. Family & Social Life - How it applies to your family & social life / 6. Professional Life - how it applies to your career & leadership / ----"

### Bhagavad Gita - Text & Audio (datta)

- App Store: https://apps.apple.com/us/app/id879311089 (US). Developer: Datta Yoga Center. Seller URL: none listed
- Price (US): $4.99. In-app purchases: none listed
- Ratings: US 4.3 from 37; India 4.5 from 12 (iTunes Lookup API)
- Last update: 2023-11-22 (v4.0.4); first released 2014-05-25
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: no
- Our summary: price "$4.99 once"; languages "Text in 10 scripts; meanings in English and Telugu"; ads "None mentioned"; account "Not stated"
  - sanskrit: yes (In 10 scripts)
  - translit: part (Romanised script with hard letters marked)
  - meanings: part (English and Telugu)
  - commentary: no
  - audio: yes (All shlokas chanted by Sri Ganapathy Sachchidananda Swamiji, synced to the text)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "This app provides an easy way to listen, read, learn, and chant *all* shlokas of Bhagavad Gita, as narrated by His Holiness Sri Ganapathy Sachchidananda Swamiji -- with meanings! / You can choose to view text in ten languages (English, Telugu, Kannada, Tamil, Hindi, Malayalam, Oriya, Bengali, Punjabi, Gujarati). The script is perfectly synchronized with the audio so that it is easy to follow along. Meanings are provided in English and Telugu. / Some languages (e.g. English) have mahapranas and tricky letters visually distinguished for easier learning and pronounciation. / A passionate proponent of universal harmony, / A bridge between the orient and occident, / May this kindle divine light in every home, / And divine vibration in every heart... / more"

### Diya - Daily Hindu Practice (diya)

- App Store: https://apps.apple.com/us/app/id6774474282 (US). Developer: Houdini Apps, LLC. Seller URL: https://www.trydiya.com/
- Price (US): Free. In-app purchases: Diya - Daily Hindu Practice $34.99, Diya - Daily Hindu Practice $6.99, Diya Monthly (Trial) $4.99, Diya Yearly (Trial) $24.99, Diya - Daily Hindu Practice $24.99, Diya - Daily Hindu Practice $44.99, Diya - Daily Hindu Practice $59.99, Diya - Daily Hindu Practice $34.99, Diya Monthly (Trial) $6.99
- Ratings: US 4.8 from 575; India 5 from 3 (iTunes Lookup API)
- Last update: 2026-09-28 (v1.1.1); first released 2026-06-02
- Compatibility: iPhone, iPod touch. Store languages: English
- Privacy label: Data Linked to You, Data Not Linked to You, Data Used to Track You; categories: Contact Info, Identifiers, Purchases, Sensitive Info, Usage Data, User Content
- Android: new https://play.google.com/store/apps/details?id=com.houdiniapps.diya (A Google Play listing exists, with no install count shown yet)
- Our summary: price "Free trial, then a subscription (in-app purchases listed from $4.99 to $59.99)"; languages "English"; ads "Not stated"; account "Not stated"
  - sanskrit: yes
  - translit: yes
  - meanings: yes (English meaning)
  - commentary: part (Five-minute audio lessons; AI answers)
  - audio: yes (Mantras, aartis, bhajans, Hanuman Chalisa, guided lessons)
  - offline: ns
  - widgets: yes (Lock and Home Screen, daily or hourly verse)
  - watch: ns
  - plans: part (Daily routine with a streak)
  - widget: home yes, lock yes, shows: A Gita verse, daily or hourly, and a Gita affirmation
- Developer source: https://www.trydiya.com/
- Store description (excerpt, verbatim): "Try our hourly Bhagavad Gita verse lock-screen widget & more! Deepen your connection with God daily through consistent Hindu practice / Diya is your daily Hindu practice companion for reading scripture, listening to prayers, and building a meaningful routine that you can actually keep up with. Join thousands of Hindus who are practicing and reconnecting with Bhagwan using Diya. / Add our signature Bhagavad Gita verse widgets to your lock screen & home screen to deepen your connection with God throughout your day. / Start each day by lighting your Diya. Read the Bhagavad Gita, do daily darshan in our digital altar, and keep your daily practice streak alive. / READ AND UNDERSTAND HINDU SCRIPTURE / • Read all 700 verses from the Bhagavad Gita, chapter by chapter with English transliterations & meaning. / • Listen to five-minute guided audio lessons about the Gita and how its teachings connect with everyday life / • Explore teachings about dharma, devotion, clarity, and daily living / PRAYERS AND DEVOTIONAL AUDIO / • Listen to mantras, prayers, aartis, bhajans, and devotional recordings / • Find the Gayatri Mantra, Om Namah Shivaya, Hanuman Chalisa, Shanti Mantra, and more / • Choose something for a quiet morning, an evening return, or a few meaningful minutes during the day / LOCK-SCREEN & HOME-SCREEN WIDGETS / • Keep a daily or hourly verse visible straight on your lock screen or home screen with our beautiful widgets / • Stay connected to the word of Bhagwan through our daily Gita affirmation widget / ASK DIYA / • Ask questions about Hindu scripture, concepts, prayers, and p"

### Sattva (sattva)

- App Store: https://apps.apple.com/us/app/id6746705264 (US). Developer: Snehal Mulchandani. Seller URL: none listed
- Price (US): Free. In-app purchases: none listed
- Ratings: US 5 from 17; India 0 from 0 (iTunes Lookup API)
- Last update: 2025-10-15 (v3.2); first released 2025-09-02
- Compatibility: iPhone, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: no
- Our summary: price "Free"; languages "English"; ads "Not stated"; account "Not stated (nothing leaves your device, per the developer)"
  - sanskrit: ns
  - translit: ns
  - meanings: ns
  - commentary: no
  - audio: ns
  - offline: ns
  - widgets: yes (Home and Lock Screen)
  - watch: ns
  - plans: part (Weekly lessons; verses matched to an emotion wheel or a journal entry)
  - widget: home yes, lock yes, shows: Daily quotes and weekly lessons from the Gita
- Store description (excerpt, verbatim): "SATTVA – BHAGAVAD GITA DAILY WISDOM / Ancient wisdom meets modern clarity. Discover verses, lessons, and reflections from the Bhagavad Gita—personalized to your emotions, choices, and daily life. Stay immersed with quotes, find mindfulness, and live aligned. / WHY SATTVA? / ⊕ Universal Wisdom, Always With You / Carry the timeless teachings of the Bhagavad Gita wherever you go—whether you need clarity, comfort, or courage. / ⊕ Drill Into Emotions, Step by Step / Use the interactive emotion wheel to identify what you’re really feeling, layer by layer, and receive personalized guidance. / ⊕ Guidance When You Need It Most / Not sure how to explain what you’re going through? Journal freely, drill down with the emotion wheel, or just pick a color—Sattva translates your experience back into verses from the Bhagavad Gita. / ⊕ Stay Immersed / See daily quotes and weekly lessons from the Bhagavad Gita right on your homescreen and lockscreen with elegant widgets. / ⊕ Your Guiding Verses, Just a Tap Away / Save your favorite verses as bookmarks, and return to them whenever you need grounding or inspiration. / ⊕ Designed for Privacy / No data leaves your device. Your reflections, emotions, and journey remain entirely yours. / ⊕ Grounded in the Source / All verses are drawn directly from Bhagavadgita by Swami Sivananda, The Divine Life Society, Rishikesh, India. / FEATURES YOU’LL LOVE / • Emotion Wheel – Drill down into specific feelings step by step. / • Color Picker – Express yourself when words don’t come easily. / • Circumstance Journal – Write freely, reflect, and unlock personalize"

### Bhagavad Gita English & Hindi (ancient)

- App Store: https://apps.apple.com/us/app/id6810337544 (US). Developer: Ameya Labs LLC. Seller URL: none listed
- Price (US): Free. In-app purchases: Ancient Wisdom Premium - Annual $29.99, Ancient Wisdom Lifetime $59.99, Ancient Wisdom Premium - Monthly $4.99
- Ratings: US 5 from 6; India 4.8 from 4 (iTunes Lookup API)
- Last update: 2026-11-04 (vv1.1.0); first released 2026-09-18
- Compatibility: iPhone, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You; categories: Identifiers, Location, Purchases, Usage Data
- Android: no
- Our summary: price "Free; Premium $4.99 a month, $29.99 a year or $59.99 once"; languages "Hindi and English"; ads "Not stated"; account "Not stated"
  - sanskrit: yes
  - translit: ns
  - meanings: ns
  - commentary: part (Deeper explanations with Premium)
  - audio: part (Meditation music and breathing (Premium))
  - offline: yes (Downloaded readings)
  - widgets: yes (Home or Lock Screen)
  - watch: ns
  - plans: part (Readings shaped by the topics you pick)
  - widget: home yes, lock yes, shows: Today's wisdom reading
- Store description (excerpt, verbatim): "Ancient wisdom for modern life. Find clarity in the Bhagavad Gita, Upanishads, Yoga Sutras and many more. Unwind with guided meditation breathing and calming music. / Discover a fresh perspective each day with wisdom from the Bhagavad Gita, Upanishads, Yoga Sutras, and other Indian classics in both Hindi/English. Read original Sanskrit alongside clear English translations, with thoughtful explanations that help you understand the meaning. / A MOMENT THAT STAYS WITH YOU / A short daily reading can give you something worth carrying into your day: a different way to think about patience, a reminder to focus on what you can influence, or a reason to appreciate what you already have. / WISDOM THAT SPEAKS TO YOU / Choose the topics that matter to you, from relationships and focus to contentment and purpose. Prefer everyday wisdom, spiritual reflection, or a little of both? Shape your daily readings around your interests and the approach you enjoy. / START SMALL. GO DEEPER. / Read today's verse and its translation in a quiet moment. When a thought speaks to you, explore its deeper meaning with Premium. Each deeper dive offers context and room for reflection, without requiring you to know philosophical terms. / BREATHE. LISTEN. SETTLE IN. / Make time for stillness with Premium guided breathing and timed meditation. Follow gentle breathing cues, choose relaxing instrumental music, or sit in silence. Set your session length and finish with an optional gentle bell. Separate meditation reminders help you make time at a moment that suits you. / FIND WISDOM FOR WHAT MATTERS / Explore the"

### My Chalisa : Aarti Bhajan Japa (mychalisa)

- App Store: https://apps.apple.com/us/app/id1362178166 (US). Developer: NileshKumar Rathod. Seller URL: https://www.nilapps.com/chalisa/
- Price (US): Free. In-app purchases: Remove Ads $5.99
- Ratings: US 4.8 from 178; India 4.7 from 1342 (iTunes Lookup API)
- Last update: 2026-10-15 (v4.0.3); first released 2018-03-30
- Compatibility: iPhone, iPad, iPod touch, Mac. Store languages: English
- Privacy label: Data Linked to You, Data Not Linked to You, Data Used to Track You; categories: Diagnostics, Identifiers, Location, Other Data, Usage Data
- Android: ns (We could not confirm an Android version)
- Our summary: price "Free with ads; remove ads once for $5.99"; languages "Hindi and English"; ads "Yes, removable with one purchase"; account "Not stated"
  - sanskrit: ns
  - translit: ns
  - meanings: part (Gita verses with Hindi and English meaning)
  - commentary: no
  - audio: yes (Chalisas and aartis with synced lyrics; Gita in 11 languages)
  - offline: yes (Offline play)
  - widgets: yes (Home Screen)
  - watch: ns
  - plans: part (Devotional journeys, reminders)
  - widget: home yes, lock ns, shows: Today's Chalisa and aarti with a streak, a daily Gita verse, japa beads, tithi and festivals
- Developer source: https://www.nilapps.com/chalisa/
- Store description (excerpt, verbatim): "Chalisa, Aarti, Bhajan, Bhagavad Gita, Ramayan and Mantra Japa in one peaceful app. Listen, read and chant in Hindi or English. Includes Today's Bhakti and Offline Play. / My Chalisa is your daily devotional companion. Listen to chalisas and aartis with synchronized lyrics, read the Bhagavad Gita in your language, follow the Ramayan, chant mantras with a Japa counter and keep your daily prayer habit — all in one calm, beautifully simple app, in English and Hindi. / WHAT YOU GET / • CHALISA — Ganesh, Hanuman, Ram, Krishna, Shiv, Sai Baba, Vishnu, Durga and more. Audio with lyrics, text-only reading or YouTube videos. / • AARTI — Popular aartis for every deity with audio, lyrics and YouTube videos, so you can sing along at home or at the temple. / • BHAGAVAD GITA — Listen to all 18 chapters in 11 languages. Gita Shlok brings every verse with Hindi and English meaning, plus a Today's Shloka. / • RAMAYAN — Listen to and watch the story of Shri Ram episode by episode. / • BHAJAN & KATHA — Devotional bhajans and sacred stories for each deity. / • MANTRA & JAPA — A library of mantras with audio and meaning. The Japa Counter gives you mala beads, targets, completion and your progress history. Record or import your own voice. / • LIVE DARSHAN — Watch temple darshan from sacred places. / • TODAY'S BHAKTI — Your daily prayer on Home with the day's tithi, nakshatra and festival details, plus Panchang for your city. / • DEVOTIONAL JOURNEYS — Guided paths of daily prayer to follow at your own pace. / • SEARCH & DISCOVER — Find any chalisa, aarti, bhajan, katha or mantra by deity or name."

### Bhagavad Gita Interpretation (kavisha)

- App Store: https://apps.apple.com/us/app/id1488898377 (US). Developer: Kavisha Sonaal. Seller URL: https://theteenyapps.home.blog/bhagavad-gita/
- Price (US): Free. In-app purchases: A generous tip $2.99, A small tip $0.99, A big tip $4.99
- Ratings: US 4.9 from 209; India 4.8 from 120 (iTunes Lookup API)
- Last update: 2021-11-08 (v1.1.3); first released 2019-12-09
- Compatibility: iPhone, iPod touch, Apple Vision. Store languages: English
- Privacy label: Data Not Linked to You; categories: Diagnostics
- Android: no
- Our summary: price "Free (optional tips)"; languages "English"; ads "Not stated"; account "Not stated"
  - sanskrit: ns
  - translit: ns
  - meanings: no
  - commentary: no (A simple English interpretation)
  - audio: ns
  - offline: ns
  - widgets: yes (Home Screen bookmark widget)
  - watch: ns
  - plans: no
  - widget: home yes, lock ns, shows: Your last saved bookmark, as a nudge to keep reading
- Developer source: https://theteenyapps.home.blog/bhagavad-gita/
- Store description (excerpt, verbatim): "This Bhagavad Gita app provides a simple English interpretation of the Bhagavad Gita Book. / It provides a clean and beautiful reading experience with an option to highlight and share your favorite sections from the chapters. / You can also bookmark any chapter at any point while reading so that you can resume from wherever you left off. / The app also provides the ability to increase font size or screen brightness. Dark mode is also supported based on your iOS settings so that you read comfortably without straining your eyes. / Supports a Bookmark Widget in iOS 14. This widget shows you your last saved bookmark. This, we believe, would be a nice way to remind you to continue reading the book. / If you like the overall app experience - please add your ratings and reviews so that other people can discover it too. / Thank you. / more"

### Sadhana: Mantra & Puja (sadhana)

- App Store: https://apps.apple.com/us/app/id1584307762 (US). Developer: Vedic Sadhana Foundation. Seller URL: http://sadhana.app
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.9 from 1407; India 4.9 from 4591 (iTunes Lookup API)
- Last update: 2026-10-28 (v2.0.0); first released 2022-02-27
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You; categories: Contact Info, Diagnostics, Identifiers, Location, User Content
- Android: yes https://play.google.com/store/apps/details?id=net.vsf.sadhana (1M+ installs on Android)
- Our summary: price "Free"; languages "English and Hindi"; ads "No ads"; account "Not stated"
  - audio: yes (Chanting and deity-specific music)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: yes (Self-guided or fully guided daily practice)
- Store description (excerpt, verbatim): "Welcome to Sadhana, a virtual world of ancient Vedic glory. / Learn, practice and experience the power of Vedic rituals with guided mantra japa, nitya puja, yajnas, abhishekam or mystical sadhanas. / Set in the mystical land of Siddhashrma, hidden deep in the Himalayas, the Sadhana App recreates the sacred place where some of the greatest sages, transcendental rishis invoked such deities as Lord Shiva, Lord Vishnu, and Mother Goddess with the most sublime Vedic rituals. / EXPERIENCE THE SACRED WORLD OF SADHANA. / Sadhana is not just an app. It's an entire ancient world in your hands so you may reap the immeasurable rewards of daily Vedic practice. / Choose self-guided or fully guided daily practices in English or Hindi, and discover perfect inner balance and harmony through Mantra Sadhana. / HERE’S HOW IT WORKS / Follow the path of the Vedas through these 5 interactive rituals: / JAPA / Chant mantra, count your rounds or use the timer. / YAJNA / Perform guided fire offerings to the deity of your choice in the beautiful ancient Himalayas. / ABHISHEKAM / Anoint the deity of your choice with the purest ingredients and Vedic chants. / NITYA PUJA / Do daily worship at your own personal shrine dedicated to the god of your choice. Fully guided and interactive. / SADHANA / Awaken the power of any mantra with this ancient Vedic practice. Fully guided with the ability to select the deity of your choice. / PLUS ENJOY THESE KEY FEATURES / * Enjoy custom music across the 5 elements that is specific to deity and location / * Achievements board to record your progress across the 5 rituals"

### Karana: Hinduism Made Easy (karana)

- App Store: https://apps.apple.com/us/app/id6804298246 (US). Developer: Gridbits LLC. Seller URL: https://www.getkarana.org
- Price (US): Free. In-app purchases: Karana Plus Monthly $4.99, Karana Plus Yearly $44.99
- Ratings: US 4.9 from 52; India 5 from 7 (iTunes Lookup API)
- Last update: 2026-09-11 (v1.0.2); first released 2026-09-06
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You; categories: Contact Info, Identifiers, Purchases, Usage Data, User Content
- Android: yes https://play.google.com/store/apps/details?id=org.getkarana.app
- Our summary: price "Free daily practice; Karana Plus $4.99 a month or $44.99 a year"; languages "English plus ten Indian languages"; ads "Not stated"; account "Not stated"
  - audio: yes (58 prayers and mantras with recorded audio; 404 narrated episodes)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: yes (Thirteen guided journeys through whole texts)
- Developer source: https://www.getkarana.org
- Store description (excerpt, verbatim): "Karana is a daily Hindu practice you can actually keep. / Light a lamp. Read a verse. Learn why the festival on Thursday is a festival. / THE COMPLETE TEXTS / The Bhagavad Gita verse by verse, with meaning, plus the Upanishads, the Ramayana, the Mahabharata, the Puranas and the Rig Veda. Not summaries. The verses. / THIRTEEN GUIDED JOURNEYS / 404 narrated episodes that take a whole text one short sitting at a time, so a scripture becomes something you finish rather than something you mean to start. / YOUR OWN CALENDAR / Ekadashi, Pradosham, Sankashti and the rest, worked out from the sun and moon at your own latitude rather than looked up in a table. The day the moon returns to your birth nakshatra. Your region's new year. Family remembrances on their lunar tithi, which moves against the western calendar by eleven days a year. / AND ALSO / Seventy festivals, each with the story, the reason and what to actually do. / Fifty-eight prayers and mantras with real recorded audio. / Ten guided meditations, five to fifteen minutes. / A puzzle a day, drawn from what you are learning. / In ten Indian languages, plus English. / The daily practice is free. Karana Plus opens every journey, every chapter, the meditations and your personal calendar. / Terms of Use: https://www.getkarana.org/terms / Privacy Policy: https://www.getkarana.org/privacy / more"

### Yangra: Hinduism Simplified (yangra)

- App Store: https://apps.apple.com/us/app/id6758106677 (US). Developer: Yangra LLC. Seller URL: https://yangra.com
- Price (US): Free. In-app purchases: Yearly Subscription $24.00, Monthly Subscription $4.00, Gift 1 Year of Yangra $24.00
- Ratings: US 5 from 53; India 3 from 2 (iTunes Lookup API)
- Last update: 2026-10-12 (v1.0.3); first released 2026-07-06
- Compatibility: iPhone, iPad, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You, Data Used to Track You; categories: Contact Info, Diagnostics, Identifiers, Location, Sensitive Info, Usage Data
- Android: yes https://play.google.com/store/apps/details?id=com.yangra.app
- Our summary: price "$24 a year or $4 a month for full access"; languages "English"; ads "Not stated"; account "Not stated"
  - audio: ns
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: part (Festival guides with shopping lists)
- Developer source: https://yangra.com
- Store description (excerpt, verbatim): "Learn it. Live it. Pass it on. / Connecting with Hindu tradition shouldn't mean piecing it together from scattered blogs, old family stories, and half-remembered explanations. / Yangra makes it easier to understand Hindu philosophy, perform daily prayers, prepare for festivals, and navigate life's most meaningful ceremonies. / Read your daily prayers with full English translations, prepare for upcoming festivals with step-by-step puja guides and shopping lists, plan life rituals like weddings and baby ceremonies, explore Hindu philosophy and scripture in the Academy, or ask Rishi, your AI guide, whenever a question comes up. No more switching between YouTube videos, forum threads, and half-remembered explanations just to figure out how a ritual is actually done. / DAILY PRAYERS & TRANSLATIONS / Read and understand your daily prayers with full English translations, so you connect with the meaning as well as the ritual. / FESTIVAL GUIDES / Every major Hindu festival, explained. Understand the story behind the celebration and the appropriate puja.  Get exact calendar dates and shopping lists. / LIFE RITUALS / Navigate weddings, baby showers, and other life milestones with guidance rooted in tradition and built for how families celebrate today. / THE ACADEMY / Go deeper into Hindu philosophy, scripture, and the stories behind the deities and temples that shape Hindu tradition, all reviewed by an academic Advisory Board. / ASK RISHI / Get instant, judgment-free answers to any question about Hindu practice, from an AI guide trained on real scripture and tradition. / Yangra is bui"

### Bhagavan: Hindu Daily Practice (bhagavan)

- App Store: https://apps.apple.com/us/app/id6741321101 (US). Developer: Bhagavan Ltd. Seller URL: https://www.bhagavan.io
- Price (US): Free. In-app purchases: Bhagavan Premium - Weekly $5.99, Bhagavan Premium - Annual $49.99, Bhagavan Premium - Annual $49.99
- Ratings: US 4.8 from 48; India 5 from 2 (iTunes Lookup API)
- Last update: 2026-10-30 (v2.5.5); first released 2025-06-04
- Compatibility: iPhone, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You, Data Not Linked to You, Data Used to Track You; categories: Contact Info, Diagnostics, Identifiers, Purchases, Usage Data
- Android: yes https://play.google.com/store/apps/details?id=bhagavan.id
- Our summary: price "Free; Premium $5.99 a week or $49.99 a year"; languages "English"; ads "Not stated"; account "Not stated"
  - audio: yes (Prayers with audio and translation)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: part (Daily shloka, reflection, meditation, challenge)
- Developer source: https://www.bhagavan.io
- Store description (excerpt, verbatim): "Five thousand years of wisdom. One beautifully designed app. / Hinduism is one of the world's oldest and richest traditions. Billions of stories. Centuries of philosophy. Rituals that turn an ordinary morning into something sacred. Bhagavan brings all of it into your daily life. / Not a textbook. Not a religious obligation. A daily companion for the spiritual life you actually want to live. / Start every morning with intention. A fresh shloka, a reflection prompt, a meditation and a challenge, all waiting for you. Build a streak. Make it ritual. Make it yours. / Discover at your pace. Hindu deities and their stories. The Bhagavad Gita. The Ramayana. The Upanishads. Vedic philosophy. Yoga. Ancient ideas that have guided billions of lives, all simplified, beautifully illustrated and brought to life. Two minutes or two hours, there is always more to find. / Your practice. Your pace. Prayers with audio and translation. Japa with virtual mala beads. Yoga philosophy. Pranayama. A festival calendar keeping you close to every auspicious date and full moon. / Ask anything. Ask Bhagavan, our AI rooted in Hindu philosophy, whatever you have always been afraid to ask. Curious about karma? Confused about a ritual? Wondering what the Gita says about grief? Ask. No judgement. No lecture. Just thoughtful, faithful guidance. / Know your stars. Daily horoscope insights grounded in Vedic tradition, personalised to you. / Ancient wisdom. Your life. Right now. / Terms of Service: https://www.bhagavan.io/terms-of-service / Privacy Policy: https://www.bhagavan.io/privacy-policy / more"

### Saachi: Hindu Prayer, Practice (saachi)

- App Store: https://apps.apple.com/us/app/id6781557128 (US). Developer: Leo Apps LLC. Seller URL: https://www.theleoapps.com/portfolio/saachi
- Price (US): Free. In-app purchases: none listed
- Ratings: US 5 from 3; India 0 from 0 (iTunes Lookup API)
- Last update: 2026-07-30 (v1.1.0); first released 2026-06-19
- Compatibility: iPhone, Mac, Apple Vision. Store languages: English and 2 more / English, Gujarati, Hindi
- Privacy label: Data Not Linked to You; categories: Diagnostics, Identifiers, Usage Data
- Android: no
- Our summary: price "Free"; languages "English, Hindi, Gujarati"; ads "Not stated"; account "No account required"
  - audio: yes (Listen to the verse, virtue stories and prayers)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: part (A virtue from Gita chapter 16 each day)
- Developer source: https://www.theleoapps.com/portfolio/saachi
- Store description (excerpt, verbatim): "Listen to the verse, virtue stories and prayers now! / Saachi is a daily Hindu spiritual practice rooted in the Bhagavad Gita and other Hindu scriptures. It's made for those who grew up around the tradition and want to engage with it thoughtfully, on their own terms. / You know the names. The Gita. The Mahabharata. The Ramayana. But somewhere along the way, the practice became something you meant to come back to. Saachi is a quiet way back. / THREE WAYS TO SIT WITH SAACHI EACH DAY / Daily Verse / Open the app to a verse from the Bhagavad Gita, paired with a short reflection or story that brings it into your day. Not a quote-of-the-day. A considered piece of writing meant to be read slowly. / Moment / Bring whatever is on your mind. A difficult conversation, a decision you're avoiding, a feeling you can't name. Saachi will sit with it, responding with wisdom drawn from Hindu scripture rather than generic advice. / Practice a Virtue / Choose from the 26 virtues of the Daivi Sampad in Chapter 16 of the Gita. Fearlessness. Compassion. Forgiveness. For each, you'll find a story from scripture showing the virtue in practice, a teaching, a small action for today, and a prayer. / WHAT YOU'LL FIND / Verses from all 18 chapters of the Bhagavad Gita / Stories drawn from the Mahabharata, Ramayana, Upanishads, and Puranas / A daily streak if you want one. No pressure if you don't. / Sanskrit terms used with care, not as decoration / Privacy by default. No account required. / WHAT YOU WON'T FIND / Generic mindfulness content with Sanskrit sprinkled on top / 'Ancient wisdom' framing. The "

### Ghar: Hindu Home Rituals (ghar)

- App Store: https://apps.apple.com/us/app/id6760098094 (US). Developer: Colorblast LLC. Seller URL: https://www.getghar.com/
- Price (US): Free. In-app purchases: Ghar Family Annual $89.99, Ghar Premium Monthly $7.99, Ghar Premium Annual $59.99
- Ratings: US 4.1 from 7; India 5 from 3 (iTunes Lookup API)
- Last update: 2026-10-20 (v1.1.14); first released 2026-03-29
- Compatibility: iPhone, iPad. Store languages: English and Hindi
- Privacy label: Data Linked to You; categories: Identifiers
- Android: new https://play.google.com/store/apps/details?id=com.colorblast.ghar (Listed on Google Play, with no installs shown yet)
- Our summary: price "Free features; Premium $7.99 a month, $59.99 a year, or $89.99 a year for a family"; languages "English and Hindi"; ads "Not stated"; account "Optional (Sign in with Apple)"
  - audio: ns
  - offline: ns
  - widgets: yes (Home Screen)
  - watch: ns
  - plans: part (Choose a practice depth)
  - widget: home yes, lock ns, shows: Illustrated shortcuts to your practice
- Developer source: https://www.getghar.com/
- Store description (excerpt, verbatim): "Your home is your temple. / Ghar is a calm companion for Hindu practice at home. Follow puja, mantra, diya, aarti and recitation guidance one clear step at a time, with preparation notes and meanings that help you understand the practice. / Make space for a daily rhythm. Explore 90 distinct readings, including shlokas, mantras and prayers, with source references and English and Hindi meanings. Save practices you want to return to, learn about the traditions behind them, and begin without creating an account. / DAILY PRACTICE / • Follow step-by-step puja, mantra, diya, aarti, and recitation guidance. / • Choose a practice depth and save favorites. / • Explore 90 distinct daily readings, including shlokas, mantras, and prayers, with source references and English and Hindi meanings. / • Browse learning articles and home-practice guides in English and Hindi. / MADE FOR IPHONE AND IPAD / • Enjoy illustrated shortcuts, Home Screen widgets, and adaptive iPad layouts for portrait and landscape. / • Browse practice cards, follow readable step-by-step guidance, and return to your saved practices. / • On iPhone Duo, use the folded view for daily practice and the open view for guidance with your practice outline alongside. / PANCHANG AND OBSERVANCES / • See approximate daily Panchang guidance, including tithi and nakshatra. / • If you choose to share a location, see local sunrise and sunset when available. / • View selected festival dates from published references for Los Angeles, London, Sydney, Bengaluru, and Chennai, within each reference's supported dates and location coverage. / •"

### Dharma Lock: Hindu Prayer App (dharmalock)

- App Store: https://apps.apple.com/us/app/id6761774189 (US). Developer: AAP TECH LLC. Seller URL: https://www.dharmalock.com/
- Price (US): Free. In-app purchases: Dharma Lock Yearly $29.99, Dharma Lock Weekly $9.99
- Ratings: US 4.9 from 47; India 5 from 2 (iTunes Lookup API)
- Last update: 2026-08-21 (v3.0.8); first released 2026-05-20
- Compatibility: iPhone. Store languages: English
- Privacy label: Data Not Linked to You, Data Used to Track You; categories: Usage Data
- Android: no
- Our summary: price "3-day trial, then $9.99 a week or $29.99 a year"; languages "English"; ads "Not stated"; account "Not stated"
  - audio: ns
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: part (A mantra matched to your deity and mood)
- Developer source: https://www.dharmalock.com/
- Store description (excerpt, verbatim): "Turn distraction into devotion. Block apps like Instagram, TikTok, & Games until you complete a Hindu Prayer matched to your deity and mood. / Pray first. Then scroll. / Pray. Pause. Then unlock your phone. / Dharma Lock turns the apps that distract you into a daily call to devotion — built for Hindus who want a simple, beautiful way to come back to prayer every single day. / Before you scroll Instagram, open TikTok, or jump into a game, Dharma Lock invites you to pause for a guided prayer session. Choose your Ishta Devata, check in with how you're feeling, and receive a Sanskrit mantra matched to your mood. Breathe. Read scripture. Then continue your day, grounded. / KEY FEATURES / Mindful App Lock — Block social media, games, and any app you choose until you've completed a prayer session, powered by Apple Screen Time. / Personalized Sanskrit Mantras — Receive a mantra chosen for your deity and your mood today, with transliteration and clear English meaning. / Choose Your Ishta Devata — Pray with Ganesh, Shiva, Vishnu, Krishna, Lakshmi, Durga, Hanuman, Saraswati, Swaminarayan, or all deities together. / Guided Breathing — A short pranayama practice to settle the mind before mantra and scripture. / Daily Scripture — Verses from the Bhagavad Gita, Upanishads, Hanuman Chalisa, Swaminarayan Vachanamrut, and many more sacred texts — with deity-specific prayers for Ganesh, Shiva, Krishna, Lakshmi, Durga, Hanuman, Saraswati, and Swaminarayan. All presented with Sanskrit, transliteration, and clear English meaning. / Prayer Journey Dashboard — Watch your sadhana grow with streaks,"

### Vignanam (vignanam)

- App Store: https://apps.apple.com/us/app/id1557728556 (US). Developer: Vaidika Vignanam. Seller URL: https://vignanam.org/vignanam-app.html
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.9 from 5335; India 4.9 from 6631 (iTunes Lookup API)
- Last update: 2026-10-25 (v5.5.0); first released 2021-10-15
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You; categories: Contact Info
- Android: yes https://play.google.com/store/apps/details?id=com.gennie.vaidikavignanam
- Our summary: price "Free"; languages "20+ Indian languages"; ads "Not stated"; account "Not stated"
  - audio: part (Audio and meanings for selected stotras)
  - offline: yes (Offline favourites)
  - widgets: yes (Festival widgets)
  - watch: ns
  - plans: part (Siksha learning series for chanting)
  - widget: home yes, lock ns, shows: Upcoming festivals
- Developer source: https://vignanam.org/vignanam-app.html
- Store description (excerpt, verbatim): "Welcome to Vignanam, the official app for vignanam.org—your comprehensive guide to the beauty and depth of Sanātana Dharma. Brought to you by Vaidika Vignanam, our app offers an enriched experience of Indian cultural knowledge and devotional literature, now presented in a beautifully redesigned and intuitive interface. / Available in 20+ Indian languages. / Your Daily Spiritual and Devotional Companion / • Start your day on a positive note with Subhāṣhitams and share with your friends - quotes, and excerpts from large bodies of Indian texts, with their translations. / • View the daily Panchāñga featuring auspicious times and daily Sankalpa for your city, anywhere in the world. / • Take your favorite collection anywhere with Offline Favorite access that is available without an Internet connection. / Stay up to date with Indian Festivals / • Never miss an Indian festival with push notifications for all festivals, and with upcoming festivals within the app and with widgets. / • Learn more about the Indian festival with detailed information about Indian Festivals, with easier access to related stōtras for each festival. / • Tailor your notification preferences to receive daily Panchāñga summaries, reminders for important festivals, or set custom personal events, with alerts for tithi and nakshastra and masa. / Discover and Search with Ease / • Smart Global Search: Search across all documents, Subhāṣitams, festivals, articles, and categories with our powerful search tool. / • Simply type in a phrase like “ayigiri nandini” or a title such as “mahishasura mardini” to quickly locat"

### Stotra Lahari (stotralahari)

- App Store: https://apps.apple.com/us/app/id578476402 (US). Developer: ram mohan kanuganti. Seller URL: none listed
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.8 from 1458; India 4.8 from 1198 (iTunes Lookup API)
- Last update: 2026-10-15 (v241.0.0); first released 2012-11-14
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: yes https://play.google.com/store/apps/details?id=com.vishista.com
- Our summary: price "Free"; languages "English, Telugu, Devanagari, Kannada scripts"; ads "Not stated"; account "Not stated"
  - audio: yes (Slokas, learning sessions, bhajans, discourses)
  - offline: yes
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "An All In One Gateway To Sanathana Dharma / Car play feature, / Added Sankshepa Ramayan in Learning session slokas, / Fixed the order of the divyaprabandham, / Minor enhancements / Added Language Selection for Slokas / Crash Fix / added new panchangam calendar / added new discourses / Added Calendar panchangam / notifications added / Enhancements / Divya Prabandam 4th Ayram / Bhagavad Geeta script updated / Added Bhajnas / Divya Prabandam / Valmiki Ramayanam all slokas ( 24,000) script / Vishnu puranam / added script for many slokas. kannada script. / The Stotra Lahari app is intended for everyone to make their lives more peaceful, joyful, be a good person in life, and increase well-being of people. Learn/listen to character-developing Slokas(Prayer is the panacea of all the good, it enriches the inner divine qualities and elevates them to higher altitudes and makes man more perfect in all his endeavors. It removes inner problems like strain, stress, ego and so on.)/Sloka Learning Sessions/(To develop love towards God and everyone)/Bhajans, and so much more while in commute or at home. You are always a 'click ' away from divine spiritual world. / Online/Offline - All files are compressed and available online/offline. We have a offline feature that easily shows downloaded files and filesizes. / The slokas are in English, Telugu, Devanagari(Hindi), and Kannada.  We have slokas such as the bhagavad gita, aditya hrudayam, sundarakanda, tiruppavai, etc. / The discourses  . Discourses such as the Bhagavad Gita, About Vedas, Sri Ramayanam, Upanaishads, / Core Features - Trackplaye"

### Hindu Daily Prayers (hindudaily)

- App Store: https://apps.apple.com/us/app/id1020671561 (US). Developer: Vipin Nair. Seller URL: https://mobilemateapps.blogspot.com/2021/02/hindu-daily-prayers-feedback.html
- Price (US): Free. In-app purchases: Remove Ads $1.99
- Ratings: US 4.9 from 66; India 4.7 from 13 (iTunes Lookup API)
- Last update: 2026-10-04 (v4.7); first released 2015-08-18
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You, Data Not Linked to You, Data Used to Track You; categories: Identifiers, Usage Data
- Android: ns (We could not confirm an Android version from the same developer)
- Our summary: price "Free with ads; remove ads $1.99"; languages "English"; ads "Yes, removable with a purchase"; account "Not stated"
  - audio: ns
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "The prayers that all Hindus should pray everyday. / Most of the prayers has their meanings too.. / Save your favorite prayers and read them later. / Share the Prayers with your loved ones.. / Download the app and please leave your valuable comments below. / more"

### Sri Mandir - Puja & Chadhava (srimandir)

- App Store: https://apps.apple.com/us/app/id1637621461 (US). Developer: FirstPrinciple AppsForBharat Private Limited. Seller URL: none listed
- Price (US): Free. In-app purchases: Annual Subscription $29.99, One Month Subscription $4.99, 3 Month Subscription $12.99
- Ratings: US 4.3 from 294; India 4.6 from 3225 (iTunes Lookup API)
- Last update: 2026-10-27 (v3.2.2); first released 2022-12-08
- Compatibility: iPhone, iPod touch, Apple Vision. Store languages: English and Hindi
- Privacy label: Data Linked to You, Data Not Linked to You, Data Used to Track You; categories: Contact Info, Diagnostics, Usage Data
- Android: yes https://play.google.com/store/apps/details?id=com.mandir (10M+ installs on Android)
- Our summary: price "Free; subscriptions from $4.99 a month; puja and chadhava are paid services"; languages "English and Hindi"; ads "Not stated"; account "Not stated"
  - audio: yes (Chalisa, bhajans, aartis)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "Welcome to Sri Mandir – India’s Largest Devotional Platform! / Sri Mandir App is the most trusted destination that serves the devotional needs of millions of devotees in India and abroad. Connect with over 100 temples across India, participate in pujas, offer goods (Chadhava) as part of the rituals, and access a wealth of free devotional content - all in one place from the comfort and convenience of your home. / With the Sri Mandir App, you can: / - Set up your own temple and receive blessings anytime, anywhere / - Offer online Chadhava to 100+ famous temples in your name / - Participate in online pujas performed through Vedic Rituals in your name and gotra / - Listen to the melodies of Chalisa, Bhajans, Aartis, and more / Key Features: / Participate in Online Pujas for Peace, Prosperity & Overall Well-Being. / Sri Mandir Puja Seva connects devotees to top sacred temples across India, allowing them to participate in pujas online in their name and gotra and providing the access they have always wanted. / After booking a Puja with Sri Mandir: / - You will receive mantras to chant during the Puja / - Panditji will perform the Puja in your name and Gotra according to Vedic rituals / - A video of the Puja will be shared with you / - Sacred tirth prasad will be delivered to your doorstep. / Top Pujas on Sri Mandir: / - Hanuman Chalisa Path / - Bagalamukhi Puja / - Mahalakshmi Puja / - 10 Mahavidya Puja / - Omkareshwar Jyotirlinga Puja / - Manglik Dosha Nivaran Puja / - Kaal Sarp Dosha Shanti Puja / - Pitru Dosha Nivaran Puja / - Shani Saade Sati Peeda Shanti Mahapuja / - Rahu-Ket"

### Sadhguru- Yoga & Meditation (sadhguru)

- App Store: https://apps.apple.com/us/app/id537568757 (US). Developer: Isha Foundation, Inc.. Seller URL: http://isha.sadhguru.org/
- Price (US): Free. In-app purchases: Sadhguru Exclusive (Monthly) $9.49, Sadhguru Exclusive (Annual) $94.90, Inner Engineering Online $209.99, IEO access for spanish language $153.99
- Ratings: US 4.9 from 21646; India 4.9 from 32349 (iTunes Lookup API)
- Last update: 2026-11-06 (v9.6.5); first released 2012-06-28
- Compatibility: iPhone, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You, Data Not Linked to You, Data Used to Track You; categories: Contact Info, Diagnostics, Health & Fitness, Identifiers, Location, Search History, Usage Data, User Content
- Android: yes https://play.google.com/store/apps/details?id=com.ishafoundation.app
- Our summary: price "Free practices; Exclusive $9.49 a month; Inner Engineering $209.99"; languages "English plus 12 languages"; ads "Not stated"; account "Not stated"
  - audio: yes (Guided meditations, chants, podcasts)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: part (Daily quotes and videos)
- Store description (excerpt, verbatim): "Connect with Sadhguru and practice Isha Yoga on the official Sadhguru App! Discover Yoga for beginners and benefit from free Yoga and meditation practices that can help you overcome stress and anxiety, and establish lasting calm and joy, in just a few minutes a day. / Sadhguru App is available in 12 languages – Russian, French, Spanish, German, Hindi, Telugu, Gujarati, Kannada, Marathi, Malayalam, Bengali and Tamil. / Start your day with Sadhguru’s daily quotes, stay up to date with his latest articles, listen to his podcasts, and watch videos on a wide range of topics including spirituality, success, Yoga, meditation, relationships, health, fitness, and living a joyful and stress-free life. / Sadhguru’s Guidance and Wisdom / Start your day with Sadhguru – Quotes for your daily dose of insight and inspiration / Daily Sadhguru Wisdom Videos – Short daily wisdom bites from Sadhguru to help you start your spiritual life / Sadhguru Videos, Articles, and Podcasts – Latest videos and articles on a wide range of intriguing topics, and podcasts, so you can access Sadhguru’s wisdom wherever you are. / Free Yoga Practices / Yoga for Health – A simple way to activate the energy nodules in your joints and exercise your muscles, bringing ease to the whole system. / Yoga for Immunity – Practices to help enhance your immunity and lung capacity / Yoga for Success – A vertical spine corresponds to a leap in capability in evolution. This simple practice keeps the spine healthy and active, naturally leading to success. / Yoga for Overall Wellbeing – Yoga Namaskar is a simple and powerful proc"

### bliss by Gurudev (bliss)

- App Store: https://apps.apple.com/us/app/id930904592 (US). Developer: SHANKARA INC. Seller URL: https://blissbygurudev.com
- Price (US): Free. In-app purchases: Sattva Monthly Subscription $12.99, Sattva Yearly Subscription $49.99, Sattva Yearly $49.99, Sattva Digital $5.99, Calm your mind - Guided Meditation $1.99, Relax and let go with sri sri - Guided Meditation $1.99, Happiness with sri sri - Guided Meditation $1.99, Om - Guided Meditation $0.99, Sattva Daily Meditation $1.99, Relax and rejuvenate with sri sri - Guided Meditation $1.99
- Ratings: US 4.8 from 13077; India 4.8 from 20000 (iTunes Lookup API)
- Last update: 2026-10-31 (v9.9.5); first released 2014-12-21
- Compatibility: iPhone, iPod touch, Mac, Apple Vision, Apple Watch. Store languages: English and 6 more / English, French, German, Hindi, Portuguese, Russian, Spanish
- Privacy label: Data Linked to You, Data Not Linked to You, Data Used to Track You; categories: Contact Info, Health & Fitness, Identifiers, Location, Purchases, User Content
- Android: yes https://play.google.com/store/apps/details?id=com.meditation.tracker.android (Published as Sattva.Life)
- Our summary: price "Free; Sattva subscription $12.99 a month or $49.99 a year"; languages "English, French, German, Hindi, Portuguese, Russian, Spanish"; ads "Not stated"; account "Not stated"
  - audio: yes (300+ guided meditations, Vedic chants and mantras)
  - offline: ns
  - widgets: ns
  - watch: yes (Listed under Compatibility)
  - plans: yes (Routines, goals and reminders)
- Store description (excerpt, verbatim): "Meditation has ancient roots – and so does bliss. / Authentic, deeply profound, and rooted in Vedic principles of meditation that millions of people have benefitted from for thousands of years, bliss brings together meditation, sacred sounds, music, breathwork, and wisdom to support your inner journey. / At the heart of bliss is renowned humanitarian and spiritual teacher Gurudev Sri Sri Ravi Shankar, a thought leader in yoga and meditation who has guided millions of people around the world toward effortless meditation and deeper self-awareness. / If you’re new to meditation, you’ll find simple yet profound practices starting from just six minutes, along with routines, goals, and reminders to help you build a consistent practice. / For seasoned meditators, explore 300+ Guided Meditations, Sacred Sounds, Vedic chants and mantras, meditation music, breathwork, binaural beats, and powerful tools to deepen your practice. Set challenges, reach milestones, earn trophies, and track your meditation journey with in-depth stats. / bliss offers curated collections and playlists to take the guesswork out of meditation, so you can simply close your eyes and practice according to your mood, feeling, or time of day. / Explore the Wisdom Library from Gurudev, featuring videos, transcripts, and timeless insights to help you learn, reflect, and grow. You can also Ask Gurudev, connect with others through Circles, join live events, and discover new ways to bring meditation into your everyday life. / Discover, explore, immerse, and unwind with bliss - where ancient wisdom meets modern technolog"

### Dharmam (dharmam)

- App Store: https://apps.apple.com/us/app/id6772612628 (US). Developer: Chinmoy Anand Patra. Seller URL: https://dharmamapp.in
- Price (US): $0.99. In-app purchases: Dharmam Pro $0.99
- Ratings: US 0 from 0; India 0 from 0 (iTunes Lookup API)
- Last update: 2026-09-26 (v1.3); first released 2026-06-14
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: ns
- Our summary: price "$0.99 to download; Pro $0.99"; languages "English"; ads "Not stated"; account "Not stated"
  - audio: part (Sacred chants and ambient sounds)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: yes (The Gita one verse a day, in order)
- Developer source: https://dharmamapp.in
- Store description (excerpt, verbatim): "Daily Hindu Prayer and Sadhana / Dharmam is a daily Hindu spiritual practice app — It helps you improve spiritually and tracks your progress. / Whether you are a lifelong devotee or finding your way back to your roots, Dharmam helps you build a consistent sādhanā around the four pillars of daily practice: prayer, meditation, scripture, and chanting. / — / PRARTHANA · DAILY PRAYER / Every day begins with a guided 4-step prayer flow designed to take you from distraction to devotion in under 3 minutes. / Set your sankalpa — your intention for the day. Choose from शान्ति (peace), भक्ति (devotion), कृतज्ञता (gratitude), ज्ञान (wisdom), सेवा (service), or मोक्ष (liberation). / Receive today's verse from the Bhagavad Gita — not a random insight, but the very next verse in your sequential journey through the scripture. Sanskrit in Devanagari, transliteration, and meaning, all in one place. / Chant your deity's mantra. Krishna devotees chant Hare Krishna. Shiva devotees chant Om Namah Shivaya. Dharmam honors your path and never pushes you into a sect. / Complete the ritual with your streak, a gratitude moment, and an invitation to read today's verse in full context. / Missing the morning is not a failure. The prayer card adjusts its tone through the day — midday grace, evening compassion — meeting you wherever you are. / — / DHYANA · MEDITATION / Timed sessions for both beginners and experienced practitioners. / Choose your duration: 5, 15, or 30 minutes, or set a custom length up to 3 hours. Select Guided Breathing or Silent Sitting. A breathing orb leads inhale (4s), hold (2s), an"

### Hanuman Chalisa Bajrang Baan (hcbajrang)

- App Store: https://apps.apple.com/us/app/id1590981205 (US). Developer: Arun Sharma. Seller URL: none listed
- Price (US): Free. In-app purchases: Weekly Subscription $4.99, One Time Payment Remove Ads $18.99, Paid Monthly All Ads Remove $1.99, Yearly Bhakt Membership $11.99
- Ratings: US 4.8 from 74; India 4.7 from 1543 (iTunes Lookup API)
- Last update: 2026-01-29 (v1.0.49); first released 2021-10-24
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: ns
- Our summary: price "Free; ad removal and memberships from $1.99"; languages "Hindi, English, Bangla, Gujarati"; ads "Yes, removable with a purchase"; account "Not stated"
  - audio: yes (Hariharan's Hanuman Chalisa, repeat as many times as you like)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "Hanuman Chalisa with Bajrang baan , hanuman ashaak, ram stuit, mantra aarti and sundarkand, Bajrang baan etc. / Hanuman Chalisa application for read and play Hanuman Chalisa, Bajrang Ban, Hanuman AArti, Sankat Mochan Hanuman Ashtak, Ram Stuti, Hanuman Mantra. / Shri Hanuman Ji is lord Hanuman of The Hindus. and called shri Bajrang bali Ji. / Jai Hanuman Chalisa is one of the most popular devotional chant written by Goswami Tulsidas. / Hariharan shree Hanuman Chalisa Lyrics and audio both are provided by this Hanuman Chalisa app. / A Hanuman app with simple user interface and full of functionality. / Shri Hanuman Chalisa audio for playable chalisa path according to user as many chanty he wants to play(1,100,1000,100000) No limits. / Features:- / Hanuman Chalisa, Bajrang Ban, Hanuman Ashtak, Ram Stuti, Hanuman Aarti, Hanuman Mantra. / Text size can be increased or decrease as user needs. / Simple and easy to use Bal Hanuman Chalisa app. / Hanuman mandir with Aarti and flower shower. / Hanuman Chalisa in hindi. / Hanuman Chalisa with Sunderkand. / Hanuman Chalisa in English. / Hanuman Chalisa in Bangla. / Hanuman Chalisa in Gujarati. / hanuman chalisa gujarati / Bajrang Ban in hindi. / Bajrang Ban in English. / Bajrang Ban in Bangla. / Bajrang Ban in Gujarati. / Hanuman Ashtak in Hindi, English, Bangla, Gujrati. / Ram Sturi in Hindi, English, Bangla, Gujrati. / Hanuma Aarti in Hindi, English, Bangla, Gujrati. / Hanuman Mantra(Chants) in Hindi, English, Bangla, Gujrati. / Will update more with Hanuman Bhajans and Hanuman Kavach. / Regular updates with new features. / Terms of U"

### Hanuman Chalisa Text And Audio (hcninder)

- App Store: https://apps.apple.com/us/app/id1488596951 (US). Developer: Ninder Singh. Seller URL: https://www.punjabidharti.com/contact-us/
- Price (US): Free. In-app purchases: Ad-Free Experience $0.99, Ad-Free Experience $5.99
- Ratings: US 4.7 from 71; India 4.8 from 4435 (iTunes Lookup API)
- Last update: 2024-10-15 (v2.1); first released 2019-11-27
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Linked to You, Data Used to Track You; categories: Usage Data
- Android: ns
- Our summary: price "Free with ads; ad-free from $0.99"; languages "Hindi"; ads "Yes, removable with a purchase"; account "Not stated"
  - audio: yes
  - offline: yes
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "Aarti / *Salasar Arti / *Hanuman Bahuk / *Chalisa / *Chalisa With Meaning / *Hanuman Kavach / *Shabar Mantra / *Chamatkari Mantra / *Gayatri Mantra / *Bajrang Baan / *Maruti Strote / *SundarKaand / *Sankat Mochan / Hanuman Chalisa In Hindi / Fetures: / *Change Text Size / *Play And Pause Audio While Reading / *No requirement of internet during use of app. / Terms of Use: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/ / more"

### Hanuman Chalisa Audio & Alarm (hcdotzoo)

- App Store: https://apps.apple.com/us/app/id520756810 (US). Developer: Dotzoo Inc.. Seller URL: none listed
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.7 from 196; India 4.6 from 461 (iTunes Lookup API)
- Last update: 2024-11-11 (v4.0.6); first released 2012-07-03
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: ns
- Our summary: price "Free"; languages "English"; ads "Not stated"; account "Not stated"
  - audio: yes
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "minor bug fixed / Hanuman Chalisa (Prayer) is recited by Hindus in honor of Lord Hanuman - a Hindu God representing Strength, Devotion and Perseverence! It is believed that recital of Hanuman Chalisa, written by Tulsidas (1497/1532-1623) - a Hindu Poet-Saint-Sage, invokes divine intervention in dealing with grave problems and challenges in a believers life. / In this version, wake up to the calming and inspiring words of Hanuman Chalisa. Set an alarm to get your morning started with words that offer you courage and inspiration or play the App Audio to listen to the melodious and calming words written in praise of Hanuman Ji! / If you enjoy this offering from DzoApps, a division of Dotzoo Inc, we hope you will decide to tell your friends and family about this offering! If you encounter problems using the App - please do let us know via email or via our website - so that we can rectify the problems ASAP. / more"

### Shri Hanuman Chalisa app (hcdotzooold)

- App Store: https://apps.apple.com/us/app/id491629823 (US). Developer: Dotzoo Inc.. Seller URL: none listed
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.9 from 203; India 4.8 from 136 (iTunes Lookup API)
- Last update: 2017-04-19 (v1.0.4); first released 2012-01-04
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: No Details Provided; categories: 
- Android: ns
- Our summary: price "Free"; languages "English script"; ads "Not stated"; account "Not stated"
  - audio: yes (Background playback)
  - offline: ns
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "The iPhone, iPod & iPad version of the Hanuman Chalisa (Prayer) is recited by followers of Hinduism globally in honor of Lord Hanuman (Hindu God representing Strength, Devotion and Perseverance!) / It is believed that recital of Hanuman Chalisa, written by Tulsidas (1497/1532–1623 – a Hindu Poet-Saint) invokes divine intervention in combatting grave problems & challenges. / Reciting these elegant words written in Glory of Lord Hanuman has a calming effect on people, and per folklore offers inner strength to believers. / This version has both Chalisa and Aarti in English Language Script (for reading) and Audio (background playback.) We hope that if you like the App, you will tell your friends and family about the same. / more"

### Hanuman Chalisa (HD audio) (hchd)

- App Store: https://apps.apple.com/us/app/id899028143 (US). Developer: Nirav Patel. Seller URL: http://geekapps.in
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.6 from 35; India 4.4 from 247 (iTunes Lookup API)
- Last update: 2026-03-11 (v5.0); first released 2014-07-26
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Linked to You, Data Used to Track You; categories: Diagnostics, Identifiers, Location, Usage Data
- Android: ns
- Our summary: price "Free"; languages "Not stated"; ads "Not stated"; account "Not stated"
  - audio: yes
  - offline: yes
  - widgets: ns
  - watch: ns
  - plans: no
- Store description (excerpt, verbatim): "Hanuman Chalisa and Hanuman Chants with HD Audio. / Hanuman Chalisa is a devotional song based on Lord Hanuman as the model devotee. The word "chālisā" is derived from "chālis" in Hindi, which means 40, as the Hanuman Chalisa has 40 verses. / Features: / Repeat Chlaisa for 1, 3, 7 or 11 times. / No requirement of internet during use of app. / Smooth transitions & full of animations. / Can use Bell , Shankh & Flowers. / Shri Hanuman is regarded as the God of power, strength and knowledge. He is known as the ‘param bhakt’ of lord Rama and is the incarnation of Lord Shiva. He was born to Kesari and Anjani on the Chaitra Shukla Purnima (Chaitra Shukla Purnima is the Full Moon Day on the Hindu Calendar Month of Chaitra) that is why, he is known as ‘KESERI NANDAN’ and ‘ANJANEYA’. / more"

### Hanuman Chalisa Audio & Text (hcintus)

- App Store: https://apps.apple.com/us/app/id1156172008 (US). Developer: INTUS SOFTWARE SOLUTION PRIVATE LIMITED. Seller URL: https://chalisa.intus.co.in
- Price (US): Free. In-app purchases: none listed
- Ratings: US 4.9 from 14; India 4.2 from 81 (iTunes Lookup API)
- Last update: 2026-09-28 (v2.1); first released 2016-09-23
- Compatibility: iPhone, iPad, iPod touch, Mac, Apple Vision. Store languages: English
- Privacy label: Data Not Linked to You, Data Used to Track You; categories: Identifiers, Usage Data
- Android: ns
- Our summary: price "Free"; languages "Hindi, English, Gujarati, Sanskrit, Gurmukhi, Bengali, Kannada, Malayalam, Oriya, Telugu"; ads "Not stated"; account "Not stated"
  - audio: yes
  - offline: yes (Reading and listening)
  - widgets: ns
  - watch: ns
  - plans: no
- Developer source: https://chalisa.intus.co.in
- Store description (excerpt, verbatim): "This Application is Completly Devoted to Lord Shree Hanuman contains Hanuman Chalisa in Hindi Language with Audio. / Features of this App: / 1. 10 Difference language (Hindi,English,Gujarati,Sanskrit,Gurumukhi,Bangali,Kannada,Malayalam,Oriya,Telgu). / 2. Support All Screen Size. / 4. User Friendly & Quality Graphics. / 5. Play, Pause, Stop Button for easy usage. / 6. Offline Reading & Listening. / 7. On Screen Volume Up/Down Feature / 8. Feature to Repeat the Chalisa as many times as you want. / Just play and Listen Chalisa. / more"

### Hanuman Chalisa – Daily Path (hcdailypath)

- App Store: https://apps.apple.com/us/app/id6824612088 (US). Developer: Venkatesh Akkara. Seller URL: none listed
- Price (US): Free. In-app purchases: none listed
- Ratings: US 5 from 2; India 0 from 0 (iTunes Lookup API)
- Last update: 2026-11-06 (v1.0); first released 2026-11-06
- Compatibility: iPhone, iPad, Mac. Store languages: English
- Privacy label: Data Not Collected; categories: 
- Android: ns
- Our summary: price "Free"; languages "Hindi, Sanskrit, Marathi, Telugu, Tamil, Kannada, English transliteration"; ads "No ads"; account "No account"
  - audio: yes (A full 10-minute recording)
  - offline: yes
  - widgets: ns
  - watch: ns
  - plans: part (Counts 11, 21 or 108 paaths)
- Store description (excerpt, verbatim): "Listen to our own recording of the Hanuman Chalisa, follow every verse in Hindi, Telugu, Tamil, Kannada, Marathi, Sanskrit or English, and explore 40 illustrated verses. / Hanuman Chalisa – a peaceful companion for your daily devotion. / Read, listen to and sing the Hanuman Chalisa of Goswami Tulsidas in the language you are most comfortable with. Every screen switches instantly between eight languages, so the whole family can pray together. / LISTEN / • Our own complete recording of the Hanuman Chalisa (about 10 minutes) for calm, devotional listening. / • Drag to any point, skip 15 seconds forward or back, and keep listening while you use other apps or lock your phone. / JAPA MALA / • Count your chants on a beautiful mala: choose 11, 21 or 108 beads. / • The ring of beads turns with every tap, like a real mala moving through your fingers, with a gentle vibration for each chant. / • The Meru bead marks each completed mala. See today's chants, malas completed and your all-time total. / • Count "Shri Ram Jai Ram Jai Jai Ram", "Om Hanumate Namah" or Hanuman Chalisa recitations, written in your language. / SING ALONG / • The current verse glows in gold and scrolls to the centre, one verse at a time. / • A Chalisa paath mala at the top counts each full recitation automatically, for 11, 21 or 108 paaths. / • Choose your own pace with a simple speed control, and tap any verse to jump to it. / • The screen stays awake while you sing. / READ IN 8 LANGUAGES / • Hindi, Sanskrit, Marathi, Telugu, Tamil, Kannada and English transliteration. / • All 40 chaupais with the opening and clos"

## Android-only apps mentioned (Hanuman Chalisa page)

- Hanuman Chalisa - Apps on Google Play by Sai Soft: https://play.google.com/store/apps/details?id=com.pricefull.hanumanchalisa; updated Oct 19, 2026; rating ('4.869999885559082', '49155'); installs 1M+
- Hanuman Chalisa - Apps on Google Play by Spiritual Studio: https://play.google.com/store/apps/details?id=spiritualstudio.hanumanchalisa; updated Jul 21, 2024; rating ('4.864197731018066', '26910'); installs 1M+
- Sai Soft description: 14 tracks that play offline, lyrics in 11 Indian languages, 108 names, Panchang, devotional alarm.
- Spiritual Studio description: repeat 1, 3, 7 or 11 times, no internet needed, Hindi and English lyrics in sync with audio, alarm and ringtone, "No push ads".

## Widget search

Grep of all 708 search results for "widget" in Gita/Hindu apps. Larger apps with a Gita verse widget: Diya (575 US ratings), My Chalisa (178), Bhagavad Gita Interpretation (209, bookmark widget, last updated 2021), Sattva (17), Bhagavad Gita English & Hindi by Ameya Labs (6), Wisdom (0). Many apps with 0 to 3 ratings also mention a verse widget (Nitya, GitaPearls, AntarGita, Sarathi, Gita Bhakti, Bhagavad Gita - Updesh Daily, Daily Gita, Shrimad Bhagavad Gita Gyan, Gita - Bhagavad Gita by Varun pant, Shrimad Bhagavad Gita Offline). Vignanam and several Panchang apps have festival/tithi widgets.
Apps checked whose store pages do not mention a widget: Bhagavad Gita - Krishna Bhakti, The Song of God, GitaVardhan, Bhagavad-gita As It Is (has an in-app Verse of the Day), 10 Minute Gita, Gita 365, Shrimad Bhagavad Gita English, Gita Seva.
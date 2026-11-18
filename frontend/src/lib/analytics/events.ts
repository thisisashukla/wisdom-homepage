/**
 * Every Mixpanel event the site sends. Names come from this registry only:
 * trackEvent / trackEventBeacon in lib/mixpanel.ts take an EventName, so a typo
 * or a new ad-hoc name fails the type check.
 *
 * Naming standard (the convention the original Gita / onboarding / theme-plan
 * funnels already use):
 *   - "Object Verb", Title Case, verb in the past tense: "Page Viewed", "Link Clicked",
 *     "Onboarding Step Completed".
 *   - Verbs: Viewed (something came into view or a page loaded), Clicked (any tap or
 *     click on a control), Opened (a disclosure, drawer, sheet or item page opened),
 *     Toggled (a two-way switch; send `to`), Switched (language), Selected (a choice
 *     from options), Started / Completed / Failed / Cancelled (multi-step flows),
 *     Copied / Shared / Saved / Played (content actions).
 *     Not used for new events: Tapped (use Clicked), Shown / Seen (use Viewed), Picked (use Selected).
 *   - Name the object, never the funnel. The funnel is the `funnel` property, added
 *     automatically from the URL. "Script Toggled" on every funnel, not "Shalaka Script Toggled".
 *     A feature-specific object is fine when the interaction exists in one place only
 *     ("Mala Bead Clicked", "Yaksha Quiz Answered").
 *
 * Standard properties (lib/mixpanel.ts adds the first four to every event):
 *   page      Title Case page name set by <PageTracker pageName> ("Hanuman Chalisa Line")
 *   funnel    funnel slug from the URL (funnelForPath)
 *   locale    'en' | 'hi'
 *   path      URL path
 *   item_id   the thing acted on (verse/line/quote/doha/scene id)
 *   item_type 'verse' | 'line' | 'doha' | 'chaupai' | 'quote' | 'scene' | 'shalaka' | ...
 *   location  where on the page the control sits ("hero", "next_step", "nav_more")
 *   position  index in a list, 1-based
 *   to        new state of a toggle
 *   method    share/copy channel: 'copy' | 'whatsapp' | 'native' | 'image_post' | 'image_status'
 */

export const EVENTS = {
  // ── Site-wide, every page ────────────────────────────────────────────────
  PageViewed: 'Page Viewed',
  ScrollDepth: 'Scroll Depth',
  SectionViewed: 'Section Viewed',
  LinkClicked: 'Link Clicked',
  AppStoreButtonClicked: 'App Store Button Clicked',
  NavMenuOpened: 'Nav Menu Opened',
  FaqOpened: 'FAQ Opened',
  DisclosureOpened: 'Disclosure Opened',
  FeedbackSubmitted: 'Feedback Submitted',
  FeedbackContentRated: 'Feedback Content Rated',
  /** Visible, active time on a page crossed 15 / 60 / 180 s: { engaged_sec, max_scroll_pct }. */
  PageEngaged: 'Page Engaged',
  /** Sent once when the page is hidden or closed, with the visible active time: { engaged_sec, max_scroll_pct }. */
  PageLeft: 'Page Left',

  // ── Scripture content, shared by every funnel and the quote pages ───────
  ScriptToggled: 'Script Toggled',
  LanguageSwitched: 'Language Switched',
  LineOpened: 'Line Opened',
  QuoteCopied: 'Quote Copied',
  QuoteShared: 'Quote Shared',
  QuoteImageSaved: 'Quote Image Saved',
  QuoteImageSaveFailed: 'Quote Image Save Failed',
  QuoteImageSaveCancelled: 'Quote Image Save Cancelled',
  QuoteAudioPlayed: 'Quote Audio Played',
  MomentChipClicked: 'Moment Chip Clicked',
  LineBarClicked: 'Line Bar Clicked',
  WordMeaningClicked: 'Word Meaning Clicked',
  SourceDrawerOpened: 'Source Drawer Opened',
  FactCheckViewed: 'Fact Check Viewed',
  SituationSelected: 'Situation Selected',
  PlanDayOpened: 'Plan Day Opened',
  // The saved web plan (/plan, opened from the morning emails): page seen, "helped / not for me", emails stopped.
  PlanPageViewed: 'Plan Page Viewed',
  PlanDayFeedback: 'Plan Day Feedback',
  PlanUnsubscribed: 'Plan Unsubscribed',
  // /start for someone who already has a plan: the fork shown (day, complete, situation) and what they chose.
  PlanForkViewed: 'Plan Fork Viewed',
  PlanForkChosen: 'Plan Fork Chosen',
  // Length plans (30 days, 7 days, a verse a day): a day picked on the verse map or list, a day marked read, a month started.
  PlanDaySelected: 'Plan Day Selected',
  PlanDayCompleted: 'Plan Day Completed',
  DailyPlanStarted: 'Daily Plan Started',
  SheetPrinted: 'Sheet Printed',
  PrintCardOpened: 'Print Card Opened',
  NextStepViewed: 'Next Step Viewed',
  NextStepClicked: 'Next Step Clicked',
  DownloadClicked: 'Download Clicked',
  GitaBridgeClicked: 'Gita Bridge Clicked',
  VideoPlayed: 'Video Played',

  // ── Funnel-specific interactions (one place each) ────────────────────────
  // Hanuman Chalisa
  MalaBeadClicked: 'Mala Bead Clicked',
  CounterGoalSet: 'Counter Goal Set',
  CounterGoalReached: 'Counter Goal Reached',
  RecitationCounted: 'Recitation Counted',
  LearnLineMarked: 'Learn Line Marked',
  LearnDayCompleted: 'Learn Day Completed',
  // Mahabharata
  FamilyNodeClicked: 'Family Node Clicked',
  ArmyViewToggled: 'Army View Toggled',
  CharacterChoiceOpened: 'Character Choice Opened',
  YakshaQuizAnswered: 'Yaksha Quiz Answered',
  YakshaQuizCompleted: 'Yaksha Quiz Completed',
  // Ramayana
  SceneViewed: 'Scene Viewed',
  SceneLampClicked: 'Scene Lamp Clicked',
  DiyaLit: 'Diya Lit',
  // Upanishads
  NetiStepClicked: 'Neti Step Clicked',
  SitCloserClicked: 'Sit Closer Clicked',
  SitCloserCompleted: 'Sit Closer Completed',
  // Other Gitas
  HoldStillStarted: 'Hold Still Started',
  HoldStillCompleted: 'Hold Still Completed',
  // Ram Shalaka
  ShalakaOpened: 'Shalaka Opened',
  ShalakaExampleSelected: 'Shalaka Example Selected',
  SankalpSet: 'Sankalp Set',
  ShalakaGridViewed: 'Shalaka Grid Viewed',
  ShalakaPlaced: 'Shalaka Placed',
  ChaupaiRevealed: 'Chaupai Revealed',
  PrasangOpened: 'Prasang Opened',
  ShalakaAgainClicked: 'Shalaka Again Clicked',
  ShalakaSoundToggled: 'Shalaka Sound Toggled',
  ShalakaMalaOpened: 'Shalaka Mala Opened',
  ShalakaGateViewed: 'Shalaka Gate Viewed',
  ShalakaGateDismissed: 'Shalaka Gate Dismissed',
  ShalakaSigninStarted: 'Shalaka Signin Started',
  ShalakaSigninCompleted: 'Shalaka Signin Completed',
  ShalakaSigninFailed: 'Shalaka Signin Failed',
  ShalakaSigninCancelled: 'Shalaka Signin Cancelled',
  PlanFromChaupaiClicked: 'Plan From Chaupai Clicked',
  RepeatQuestionBlocked: 'Repeat Question Blocked',

  // ── Original funnels: Gita reader, onboarding (/start), plans, theme plans, app page.
  //    Names unchanged; they carry history in Mixpanel. ───────────────────
  OnboardingViewed: 'Onboarding Viewed',
  OnboardingStepCompleted: 'Onboarding Step Completed',
  OnboardingCompleted: 'Onboarding Completed',
  OnboardingSigninStarted: 'Onboarding Signin Started',
  OnboardingSigninCompleted: 'Onboarding Signin Completed',
  OnboardingSigninFailed: 'Onboarding Signin Failed',
  HookStarted: 'Hook Started',
  HookRequested: 'Hook Requested',
  HookRevealed: 'Hook Revealed',
  HookLineRevealed: 'Hook Line Revealed',
  HookAnother: 'Hook Another',
  HookFeelingPicked: 'Hook Feeling Picked',
  HookSituationPicked: 'Hook Situation Picked',
  HookSigninShown: 'Hook Signin Shown',
  HookSigninCompleted: 'Hook Signin Completed',
  WebPlanGenerated: 'Web Plan Generated',
  VersesGenerated: 'Verses Generated',
  // The same names as the app (wisdom/app/services/Analytics.ts), so app and web onboarding read alike.
  // Option Selected: every tap on an onboarding answer (question, option, selected); Plan Built: week 1 back.
  // Both, with Verses Generated, carry request_id and onboarding_id to join Supabase plan_runs.
  OptionSelected: 'Option Selected',
  PlanBuilt: 'Plan Built',
  DailyLimitReached: 'Daily Limit Reached',
  DevicePlanSwitch: 'Device Plan Switch',
  PlanPreviewTab: 'Plan Preview Tab',
  PaywallViewed: 'Paywall Viewed',
  PurchaseStarted: 'Purchase Started',
  PurchaseCompleted: 'Purchase Completed',
  PurchaseFailed: 'Purchase Failed',
  PurchaseCancelled: 'Purchase Cancelled',
  SubscriptionCancelled: 'Subscription Cancelled',
  PathSelected: 'Path Selected',
  SavedVerseOpened: 'Saved Verse Opened',
  ShlokaPlayed: 'Shloka Played',
  VerseShared: 'Verse Shared',
  VerseBookmarked: 'Verse Bookmarked',
  VerseUnbookmarked: 'Verse Unbookmarked',
  VerseNavClicked: 'Verse Nav Clicked',
  ShareClicked: 'Share Clicked',
  MantraCopied: 'Mantra Copied',
  CustomiseOpened: 'Customise Opened',
  ShlokaCardReadMoreClicked: 'Shloka Card Read More Clicked',
  HindiVerseHeroNextClicked: 'Hindi Verse Hero Next Clicked',
  HindiVerseHeroPrevClicked: 'Hindi Verse Hero Prev Clicked',
  TodayVerseCtaClicked: 'Today Verse CTA Clicked',
  TopicCascadeClicked: 'Topic Cascade Clicked',
  BlogDeepDiveClicked: 'Blog Deep Dive Clicked',
  StoicBlogHandoffClicked: 'Stoic Blog 2.47 Hand-off Clicked',
  ReadingPlansViewed: 'Reading Plans Viewed',
  ReadingPlansFilter: 'Reading Plans Filter',
  ReadingPlanCardSeen: 'Reading Plan Card Seen',
  ReadingPlanCardClicked: 'Reading Plan Card Clicked',
  ThemePlanViewed: 'Theme Plan Viewed',
  ThemePlanProgress: 'Theme Plan Progress',
  ThemePlanCompleted: 'Theme Plan Completed',
  ThemePlanExit: 'Theme Plan Exit',
  ThemeVerseSeen: 'Theme Verse Seen',
  ThemeVerseRead: 'Theme Verse Read',
  ThemeVersePageOpened: 'Theme Verse Page Opened',
  ThemeTranslationOpened: 'Theme Translation Opened',
  ThemeAudioPlayed: 'Theme Audio Played',
  ThemeCtaSeen: 'Theme CTA Seen',
  ThemeCtaClicked: 'Theme CTA Clicked',
  ThemeContinueClicked: 'Theme Continue Clicked',
  ThemeFaqOpened: 'Theme FAQ Opened',
  ThemeFurtherReadingClicked: 'Theme Further Reading Clicked',
  ThemeRelatedClicked: 'Theme Related Clicked',
  ThemeStripClicked: 'Theme Strip Clicked',
  ThemeDaySeen: 'Theme Day Seen',
  DailyVerseWaitlistAttempt: 'Daily Verse Waitlist Attempt',
  DailyVerseWaitlistJoined: 'Daily Verse Waitlist Joined',
  DailyVerseWaitlistError: 'Daily Verse Waitlist Error',
  DailyVerseWaitlistValidationFailed: 'Daily Verse Waitlist Validation Failed',
  ScriptureAiInterestToggled: 'Scripture AI Interest Toggled',
  ScriptureAiWaitlistOpened: 'Scripture AI Waitlist Opened',
  ScriptureAiWaitlistDismissed: 'Scripture AI Waitlist Dismissed',
  ScriptureAiWaitlistSubmitted: 'Scripture AI Waitlist Submitted',
  ScriptureAiWaitlistSubmitFailed: 'Scripture AI Waitlist Submit Failed',
  ScriptureAiWaitlistValidationFailed: 'Scripture AI Waitlist Validation Failed',
  ResourcesLinkSnippetCopied: 'Resources Link Snippet Copied',
  AppQrShown: 'App QR Shown',
  CtaShown: 'CTA Shown',
  CtaPlacementShown: 'CTA Placement Shown',
  PlanPreviewCreate: 'Plan Preview Create',
  // Dhyaan waitlist site (dhyaan.wisdomquotes.in)
  DhyaanWaitlistSubmitted: 'Dhyaan Waitlist Submitted',
  DhyaanWaitlistJoined: 'Dhyaan Waitlist Joined',
  DhyaanWaitlistFailed: 'Dhyaan Waitlist Failed',
  DhyaanReferralCopied: 'Dhyaan Referral Copied',
  DhyaanReferralShared: 'Dhyaan Referral Shared',
  NivataTestStarted: 'Nivata Test Started',
  NivataTestCompleted: 'Nivata Test Completed',
  NivataTestFailed: 'Nivata Test Failed',
  NivataCardShared: 'Nivata Card Shared',
  NivataCardSaved: 'Nivata Card Saved',
  // Reader features (Nov 2026): continue reading, chapter read mode, search, daily, install
  ResumeCardViewed: 'Resume Card Viewed',
  ResumeCardClicked: 'Resume Card Clicked',
  VerseRead: 'Verse Read',
  // ── Listen mode (lib/listen.ts) ─────────────────────────────────────────
  /** First play of a session or a single verse: { session_id, mode, scope: 'session'|'single', source, item_id }. */
  ListenStarted: 'Listen Started',
  /** A verse heard to the end: { session_id, item_id, index, mode, scope }. */
  ListenVerseCompleted: 'Listen Verse Completed',
  /** The last verse of a session heard: { session_id, verses_heard, mode }. */
  ListenSessionCompleted: 'Listen Session Completed',
  /** Rolled into the next session without leaving the page: { from, to, auto }. */
  ListenNextSessionStarted: 'Listen Next Session Started',
  /** Dock and page controls: { control, session_id, item_id, to }. */
  ListenControlClicked: 'Listen Control Clicked',
  /** The "from your list" bar on a verse page: { trail_from, trail_index, trail_total }. */
  TrailBarViewed: 'Trail Bar Viewed',
  ChapterReadModeOpened: 'Chapter Read Mode Opened',
  PlayAllStarted: 'Play All Started',
  PlayAllCompleted: 'Play All Completed',
  /** Play-All controls: { control: 'pause' | 'resume' | 'next' | 'prev' | 'restart' | 'listen_from_here', item_id: 'bg-ch-N', position, location } */
  PlayerControlClicked: 'Player Control Clicked',
  ExplanationLanguageToggled: 'Explanation Language Toggled',
  /** { query, result: 'verse' | 'chapter' | 'invalid' | 'search', item_id?, location } */
  VerseJumpCompleted: 'Verse Jump Completed',
  /** Sent from the page the reader is on, the moment they submit the nav search: { query, script, location: 'nav' } (path = that page). */
  SearchSubmitted: 'Search Submitted',
  /**
   * The reader paused on a query and saw results: { query, results, script, location, entry_path,
   * top_results (first 5 item ids), top_result, top_result_ref, top_match }. entry_path is the page the search started on.
   */
  SearchCompleted: 'Search Completed',
  /**
   * What the reader picked: { item_id, item_type, item_ref, item_source, match, position, results, query,
   * location: 'results' | 'suggestion' | 'chapter', entry: where the search box was, entry_path }
   */
  SearchResultClicked: 'Search Result Clicked',
  WhatsAppJoinViewed: 'WhatsApp Join Viewed',
  WhatsAppJoinClicked: 'WhatsApp Join Clicked',
  InstallPromptViewed: 'Install Prompt Viewed',
  InstallPromptClicked: 'Install Prompt Clicked',
  AppInstalled: 'App Installed',
  /** Keep / रखें on a quote line: { item_id, item_type, to: 'kept' | 'released', location } */
  QuoteKeepToggled: 'Quote Keep Toggled',
  TodayLineViewed: 'Today Line Viewed',
  LearningPathStepClicked: 'Learning Path Step Clicked',
  // Map of the mind (/explore): a node opened on the map { item_id, item_type: 'state' | 'verse' | 'story', method: 'tap' | 'search' | 'link' | 'url' },
  // a text family filter { to }, the reflect box matched { words, states, results } (never the text typed),
  // a state page opened from the map or the reflect box { item_id, location }, a link followed in the panel { from, to, rel }.
  MapNodeOpened: 'Map Node Opened',
  MapFilterSelected: 'Map Filter Selected',
  ReflectionSubmitted: 'Reflection Submitted',
  StateOpened: 'State Opened',
  PathFollowed: 'Path Followed',
} as const

export type EventKey = keyof typeof EVENTS
export type EventName = (typeof EVENTS)[EventKey]

const NAMES = new Set<string>(Object.values(EVENTS))
export const isEventName = (s: string): s is EventName => NAMES.has(s)

/**
 * Renames made when the new funnels moved onto this standard (31 Oct 2026).
 * Old name -> new name. Merge these in Mixpanel Lexicon so history carries over.
 */
export const RENAMED: Record<string, EventName> = {
  'Next Step Shown': EVENTS.NextStepViewed,
  'Next Step Tapped': EVENTS.NextStepClicked,
  'Moment Chip Tapped': EVENTS.MomentChipClicked,
  'Line Bar Tapped': EVENTS.LineBarClicked,
  'Word Meaning Tapped': EVENTS.WordMeaningClicked,
  'Situation Picked': EVENTS.SituationSelected,
  'Gita Bridge Tapped': EVENTS.GitaBridgeClicked,
  'Chalisa Line Opened': EVENTS.LineOpened,
  'Shalaka Line Opened': EVENTS.LineOpened,
  'Chalisa Sheet Printed': EVENTS.SheetPrinted,
  'Mala Bead Tapped': EVENTS.MalaBeadClicked,
  'Family Node Tapped': EVENTS.FamilyNodeClicked,
  'Scene Lamp Tapped': EVENTS.SceneLampClicked,
  'Neti Step Tapped': EVENTS.NetiStepClicked,
  'Sit Closer Tapped': EVENTS.SitCloserClicked,
  'Sit Closer Read All': EVENTS.SitCloserCompleted,
  'Shalaka Script Toggled': EVENTS.ScriptToggled,
  'Shalaka Language Switched': EVENTS.LanguageSwitched,
  'Shalaka Shared': EVENTS.QuoteShared,
  'Shalaka Example Picked': EVENTS.ShalakaExampleSelected,
  'Shalaka Grid Shown': EVENTS.ShalakaGridViewed,
  'Shalaka Gate Shown': EVENTS.ShalakaGateViewed,
  'Shalaka Next Shown': EVENTS.NextStepViewed,
  'Shalaka Again Tapped': EVENTS.ShalakaAgainClicked,
  'Shalaka App Tapped': EVENTS.AppStoreButtonClicked,
  'Plan From Chaupai': EVENTS.PlanFromChaupaiClicked,
}

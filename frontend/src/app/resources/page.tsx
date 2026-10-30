import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BlogTracker from '@/components/BlogTracker'
import SiteFooter from '@/components/SiteFooter'
import CopySnippet from './CopySnippet'

const PAGE_URL = 'https://wisdomquotes.in/resources'
const CHECKED = '29 October 2026'

type Site = { name: string; url: string; note: string }
type Section = { id: string; title: string; intro?: string; sites: Site[] }

/*
 * Editorial list. Add a site only if it is free to read, shows the original
 * text or names its translator, and is still maintained. Nobody pays to be
 * listed and listing is never conditional on a link back.
 */
const SECTIONS: Section[] = [
  {
    id: 'gita',
    title: 'The Bhagavad Gita with commentaries',
    sites: [
      {
        name: 'Gita Supersite, IIT Kanpur',
        url: 'https://heritage.iitk.ac.in/gitasupersite',
        note: 'The verse with classical commentaries side by side: Shankara, Ramanuja, Madhva and others, in Sanskrit, Hindi and English. Open it when you want to see how the acharyas read a line.',
      },
      {
        name: 'Bhagavad Gita, Vande Mataram Library Trust',
        url: 'https://bhagavadgita.org.in/',
        note: 'Word meanings and grammar for every verse, with Sanskrit grammar tools alongside. For anyone reading the Sanskrit itself.',
      },
      {
        name: 'Vedabase',
        url: 'https://vedabase.io/en/library/bg/',
        note: 'Bhagavad-gita As It Is by A.C. Bhaktivedanta Swami Prabhupada, with word-for-word Sanskrit and purports in the Gaudiya Vaishnava tradition.',
      },
      {
        name: 'Holy Bhagavad Gita',
        url: 'https://www.holy-bhagavad-gita.org/',
        note: 'Swami Mukundananda’s verse-by-verse translation and commentary, with each shloka recited.',
      },
    ],
  },
  {
    id: 'library',
    title: 'Upanishads, Ramayana and the wider library',
    sites: [
      {
        name: 'Upanishads, Vande Mataram Library Trust',
        url: 'https://upanishads.org.in/',
        note: 'Major and minor Upanishads with word meanings, a glossary, stories and characters, and Sri Aurobindo’s commentaries on the Isha and Kena.',
      },
      {
        name: 'Heritage IIT Kanpur',
        url: 'https://heritage.iitk.ac.in/',
        note: 'The same IIT Kanpur library beyond the Gita: Valmiki Ramayana, Yoga Sutras and Yoga Vasishtha, with translations and commentaries.',
      },
      {
        name: 'Internet Sacred Text Archive',
        url: 'https://sacred-texts.com/hin/index.htm',
        note: 'Complete public-domain English translations: Griffith’s Vedas, Ganguli’s Mahabharata, Max Müller’s Upanishads. The English is old, the texts are whole.',
      },
      {
        name: 'Swami Krishnananda',
        url: 'https://www.swami-krishnananda.org/',
        note: 'Long, careful talks on the Upanishads and the Gita by a Divine Life Society monk, free as ebooks and audio.',
      },
    ],
  },
  {
    id: 'sanskrit',
    title: 'Sanskrit dictionaries and text archives',
    sites: [
      {
        name: 'Cologne Digital Sanskrit Dictionaries',
        url: 'https://www.sanskrit-lexicon.uni-koeln.de/',
        note: 'Monier-Williams, Apte and other dictionaries, searchable from Sanskrit or English.',
      },
      {
        name: 'Wisdom Library',
        url: 'https://www.wisdomlib.org/',
        note: 'What a Sanskrit term means across Hindu, Buddhist and Jain texts, with the passages it comes from.',
      },
      {
        name: 'Sanskrit Documents',
        url: 'https://sanskritdocuments.org/',
        note: 'Stotras, Gitas and texts in Devanagari and transliteration, kept up by volunteers.',
      },
      {
        name: 'GRETIL, University of Göttingen',
        url: 'https://gretil.sub.uni-goettingen.de/',
        note: 'The scholarly register of Sanskrit e-texts. Plain files, very wide coverage.',
      },
      {
        name: 'Sanskrit Resources Hub',
        url: 'https://hub.sanskrit.today/',
        note: 'A maintained directory of Sanskrit courses, dictionaries and text sites.',
      },
    ],
  },
  {
    id: 'teachers',
    title: 'Teachers and study',
    sites: [
      {
        name: 'Arsha Bodha Center',
        url: 'https://arshabodha.org/',
        note: 'Swami Tadatmananda’s free classes on the Gita, the Upanishads and Sanskrit, in the Advaita Vedanta tradition of Swami Dayananda.',
      },
      {
        name: 'Chinmaya Mission',
        url: 'https://www.chinmayamission.com/',
        note: 'Gita study groups and classes in many cities, in India and abroad, started by Swami Chinmayananda.',
      },
      {
        name: 'The Divine Life Society',
        url: 'https://www.dlshq.org/',
        note: 'Swami Sivananda’s ashram in Rishikesh, with many of his books on the Gita and yoga online.',
      },
      {
        name: 'Advaita Vision',
        url: 'https://www.advaita-vision.org/',
        note: 'Dennis Waite’s site on traditional Advaita: articles, questions and answers, and book reviews.',
      },
      {
        name: 'Hinduwebsite.com',
        url: 'https://www.hinduwebsite.com/',
        note: 'Jayaram V’s essays on Hindu philosophy, written since 1999, and his own translation of the Gita.',
      },
    ],
  },
  {
    id: 'new',
    title: 'If you are new to Hindu thought',
    sites: [
      {
        name: 'Hindu Dharma 101s, Hindu American Foundation',
        url: 'https://www.hinduamerican.org/learn/hindu-dharmas-101s',
        note: 'Short, plain introductions to ideas, practices and festivals, written for students and teachers.',
      },
    ],
  },
]

export function generateMetadata(): Metadata {
  const count = SECTIONS.reduce((n, s) => n + s.sites.length, 0)
  return {
    title: `Where to Read the Bhagavad Gita Online: ${count} Free Sites`,
    description:
      'Free sites for the Bhagavad Gita, Upanishads and Ramayana with the Sanskrit, translations and classical commentaries, plus Sanskrit dictionaries and teachers worth hearing. Every link checked by hand.',
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: 'Where to read the Gita and other scriptures online',
      description:
        'The sites we open for the Sanskrit, a classical commentary or a teacher’s voice. All free to read.',
      type: 'website',
      url: PAGE_URL,
      siteName: 'Wisdom',
    },
  }
}

const OUR_PAGES = [
  { label: 'The Bhagavad Gita, all 700 verses', path: '/gita', note: 'One page per verse: Sanskrit, word-by-word meaning, Hindi and English.' },
  { label: 'भगवद गीता हिंदी में', path: '/hi/gita', note: 'The same verses with Hindi meaning.' },
  { label: 'Read the Gita in 18 days', path: '/read-gita-in-18-days', note: 'One chapter a day, finishing on Gita Jayanti.' },
  { label: '7-verse reading plans', path: '/reading-plans', note: 'Short plans for overthinking, grief, comparison, living far from home and more.' },
  { label: 'Most searched Gita verses in 2026', path: '/most-searched-gita-verses-2026', note: 'Google Trends and Search Console data. The dataset is CC BY 4.0.' },
]

const SNIPPET =
  '<a href="https://wisdomquotes.in/gita">Bhagavad Gita in Sanskrit, Hindi and English, verse by verse (Wisdom)</a>'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Where to read the Gita and other scriptures online',
      dateModified: '2026-10-29',
      isPartOf: { '@type': 'WebSite', name: 'Wisdom', url: 'https://wisdomquotes.in' },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: SECTIONS.flatMap((s) => s.sites).map((site, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: site.name,
          url: site.url,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wisdomquotes.in/' },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: PAGE_URL },
      ],
    },
  ],
}

const pageCSS = `
  .res { --gold:#c8881e; --gold-light:#f5c96a; --text:#f5e8cc; --text-dim:rgba(245,232,204,.68); --text-dimmer:rgba(245,232,204,.4); --border:rgba(200,136,30,.2); --card:rgba(255,255,255,.04); --max:780px; background:#120505; color:var(--text); }
  .res a { color: var(--gold-light); }
  .res-crumb { background:#0f0404; border-bottom:1px solid var(--border); }
  .res-crumb div { max-width:1100px; margin:0 auto; padding:10px 28px; font-size:12px; color:var(--text-dimmer); display:flex; gap:8px; }
  .res-crumb a { color: var(--text-dimmer); text-decoration:none; }
  .res-hero { background:#190707; padding:60px 28px 48px; border-bottom:1px solid var(--border); }
  .res-hero-inner, .res-body { max-width: var(--max); margin: 0 auto; }
  .res-label { font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold-light); font-weight:600; margin-bottom:14px; }
  .res h1 { font-family:"Playfair Display",Georgia,serif; font-size:clamp(28px,3.6vw,42px); line-height:1.2; color:var(--gold-light); margin:0 0 14px; }
  .res-sub { font-size:16.5px; line-height:1.65; color:var(--text-dim); max-width:600px; margin:0; }
  .res-body { padding:48px 28px 96px; }
  .res-lead { font-size:16px; line-height:1.75; color:var(--text-dim); margin:0 0 12px; }
  .res-toc { display:flex; flex-wrap:wrap; gap:8px; margin:24px 0 8px; padding:0; list-style:none; }
  .res-toc a { display:inline-block; font-size:13px; padding:6px 12px; border:1px solid var(--border); border-radius:999px; text-decoration:none; color:var(--text-dim); }
  .res-toc a:hover { border-color: var(--gold); color: var(--gold-light); }
  .res h2 { font-family:"Playfair Display",Georgia,serif; font-size:24px; color:var(--gold-light); margin:52px 0 16px; line-height:1.25; scroll-margin-top:80px; }
  .res-list { list-style:none; margin:0; padding:0; display:grid; gap:12px; }
  .res-item { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:16px 18px; }
  .res-item a { font-weight:600; font-size:16px; text-decoration:none; }
  .res-item a:hover { text-decoration:underline; }
  .res-host { font-size:12px; color:var(--text-dimmer); margin-left:8px; }
  .res-item p { margin:6px 0 0; font-size:14.5px; line-height:1.65; color:var(--text-dim); }
  .res-rule { border:none; border-top:1px solid var(--border); margin:56px 0 0; }
  .res-p { font-size:15.5px; line-height:1.75; color:var(--text-dim); margin:0 0 16px; }
  .res-checks { margin:0 0 16px; padding-left:20px; color:var(--text-dim); font-size:15px; line-height:1.8; }
  .res-box { background:var(--card); border:1px solid var(--border); border-left:3px solid var(--gold); border-radius:0 12px 12px 0; padding:20px 22px; margin:20px 0; }
  .res-box p { margin:0; font-size:15px; line-height:1.7; color:var(--text-dim); }
  .res-ours { list-style:none; padding:0; margin:0 0 20px; display:grid; gap:10px; }
  .res-ours li { font-size:15px; line-height:1.6; color:var(--text-dim); }
  .res-ours a { font-weight:600; }
  .res-snippet { display:flex; gap:10px; align-items:stretch; margin:8px 0 18px; }
  .res-snippet code { flex:1; display:block; overflow-x:auto; white-space:nowrap; background:#0b0303; border:1px solid var(--border); border-radius:8px; padding:12px 14px; font-size:12.5px; color:var(--text); }
  .res-snippet button { flex:none; background:var(--gold); color:#1a0606; border:none; border-radius:8px; padding:0 16px; font-weight:600; font-size:13px; cursor:pointer; }
  .res-mail { display:inline-block; margin-top:6px; padding:10px 20px; background:var(--gold); color:#1a0606 !important; border-radius:8px; font-weight:600; font-size:14px; text-decoration:none; }
  @media (max-width:600px) {
    .res-hero { padding:44px 20px 38px; }
    .res-body { padding:36px 20px 80px; }
    .res-snippet { flex-direction:column; }
    .res-snippet button { padding:10px 16px; }
    .res-host { display:block; margin:2px 0 0; }
  }
`

function host(url: string) {
  return new URL(url).hostname.replace(/^www\./, '')
}

export default function ResourcesPage() {
  return (
    <>
      <BlogTracker pageName="resources" />
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <main className="res">
        <nav className="res-crumb" aria-label="Breadcrumb">
          <div><a href="/">Home</a><span>/</span><span>Resources</span></div>
        </nav>

        <header className="res-hero">
          <div className="res-hero-inner">
            <div className="res-label">Resources</div>
            <h1>Where to read the Gita and other scriptures online</h1>
            <p className="res-sub">
              Wisdom is one way in. These are the other sites we open when we want the
              Sanskrit, a classical commentary or a teacher’s voice. All of them are free to read.
            </p>
          </div>
        </header>

        <div className="res-body">
          <p className="res-lead">
            Every site here shows the original text or names its translator, and none of
            them charges you to read scripture. We checked each link on {CHECKED}.
            Nobody pays to be listed.
          </p>

          <ul className="res-toc">
            {SECTIONS.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
            <li><a href="#suggest">Suggest a site</a></li>
            <li><a href="#link">Link to Wisdom</a></li>
          </ul>

          {SECTIONS.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>{s.title}</h2>
              <ul className="res-list">
                {s.sites.map((site) => (
                  <li key={site.url} className="res-item">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener"
                      data-mp-location={`resources_${s.id}_${host(site.url)}`}
                    >
                      {site.name}
                    </a>
                    <span className="res-host">{host(site.url)}</span>
                    <p>{site.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <hr className="res-rule" />

          <h2 id="how">How we choose</h2>
          <ul className="res-checks">
            <li>You can read the scripture free, without signing up.</li>
            <li>It shows the Sanskrit, or names the translator and edition it uses.</li>
            <li>Someone still looks after it, and the links work.</li>
            <li>It helps you read the text closely, whatever school it comes from.</li>
          </ul>
          <p className="res-p">
            We don’t list sites for payment or in return for a link. If a site here stops
            meeting these, we take it off.
          </p>

          <h2 id="suggest">Suggest a site</h2>
          <div className="res-box">
            <p>
              Know a site that belongs here, or run one? Send the link and one line on
              what it does best. We read every message and add sites that meet the four
              checks above.
            </p>
          </div>
          <a
            className="res-mail"
            href="mailto:work.ankurshukla@gmail.com?subject=Site%20for%20the%20Wisdom%20resources%20page"
            data-mp-location="resources_suggest_email"
          >
            Suggest a site
          </a>

          <h2 id="link">Link to Wisdom</h2>
          <p className="res-p">
            If you keep a list like this one for your students, sangha or readers, these
            are the Wisdom pages people find most useful:
          </p>
          <ul className="res-ours">
            {OUR_PAGES.map((p) => (
              <li key={p.path}>
                <a href={p.path} data-mp-location={`resources_ours_${p.path.replace(/\//g, '_')}`}>{p.label}</a>
                {' · '}{p.note}
              </li>
            ))}
          </ul>
          <p className="res-p">Copy this to link to the verse-by-verse Gita:</p>
          <CopySnippet text={SNIPPET} />
          <p className="res-p">
            The translations are the Wisdom edition, edited by Ankur Shukla. The commentary
            on verse pages is drafted with a language model and reviewed by hand. The{' '}
            <a href="/methodology">methodology page</a> explains how, and how to report a mistake.
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}

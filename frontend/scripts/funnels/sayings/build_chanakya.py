"""Builds src/content/funnels/sayings/chanakya.json.
Run from frontend/: python3 scripts/funnels/sayings/build_chanakya.py (needs pyarrow: pip install --user pyarrow).
Source: ~/mnt/sanscripts/data/raw_data/Chanakya_Neeti.parquet (1).gzip, 342 verses (the Vriddha-Chanakya / Chanakya Niti Darpana, 17 chapters).
The parquet's english_translation is misaligned with the Sanskrit in several chapters, so meanings are written from the Sanskrit."""
import json, os, re, sys
import pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from chanakya_picks import C, SITUATIONS, CARD_REFS
from translit import roman
FE = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
SRC = os.path.expanduser('~/mnt/sanscripts/data/raw_data/Chanakya_Neeti.parquet (1).gzip')
OUT = os.path.join(FE, 'src', 'content', 'funnels', 'sayings', 'chanakya.json')
df = pd.read_parquet(SRC)
BY = {f"{int(r.chapter)}.{int(r.sloka_no)}": r for r in df.itertuples()}

def clean(s):
    s = s.replace('‍', '').replace('‌', '')
    s = re.sub(r'[ \t]+', ' ', s)
    return [l.strip() for l in s.strip().split('\n') if l.strip()]

WOMEN_RE = re.compile(r'स्त्री|नारी|नार्य|भार्या|कान्ता|वेश्या|कन्या|कुलटा|युवती|प्रमदा|कामिनी|पत्नी|वधू|भगिनी|रमणी|गृहिणी|पतिव्रता|दार[ाः]|दारेषु|दाराः|कलत्र|योषित|वनिता|अङ्गना|अंगना|ललना|सुन्दरी|मातृ|माता|जननी|स्त्रिय|परांगना|विधवा')
EXCLUDE = {
 '1.15': 'Tells men never to trust women, grouped with rivers, armed men and horned beasts.',
 '1.17': 'Claims women have double the appetite and eight times the lust of men.',
 '2.1': 'Lists lying, rashness, deceit, stupidity, greed, uncleanliness and cruelty as women\'s "natural" flaws.',
 '2.15': 'Says a woman in another\'s house is quickly ruined.',
 '4.16': 'Tells a man to abandon a wife with an angry face.',
 '4.17': 'Reduces women\'s ageing to a lack of sex.',
 '5.21': 'Names the flower-seller woman the most cunning among women.',
 '6.3': 'Says a woman is purified by her menses.',
 '6.4': 'A wandering king, priest or yogi is honoured; a wandering woman is "ruined".',
 '6.11': 'Calls a beautiful wife an enemy in the house.',
 '8.21': 'Repeats 6.11.',
 '7.11': 'Reduces women\'s strength to beauty, youth and sweetness.',
 '8.9': 'Says women without husbands are lost.',
 '9.11': 'Puts talk about women alongside gambling and theft.',
 '9.12': 'Lists a wife among things improved by being pressed or beaten.',
 '10.4': 'Asks what women would not do, implying they are capable of anything bad.',
 '12.3': 'Recommends cunning toward women.',
 '12.18': 'Says deceit is to be learned from women.',
 '14.11': 'Groups women with kings and fire as things to keep at a calculated distance.',
 '14.12': 'Groups women with fire, snakes and fools as things that can take life.',
 '14.16': 'Describes a woman as a corpse, an object of lust or meat.',
 '16.2': 'Says no woman\'s heart is faithful to one man.',
 '16.3': 'Mocks a man who believes a woman loves him.',
 '16.4': 'Asks whose mind has not been broken by women.',
 '16.12': 'Compares wealth used by all to a prostitute.',
 '17.1': 'Uses women who conceive by lovers as a simile for shame.',
 '17.9': 'Says a wife who fasts without her husband\'s leave shortens his life and goes to hell.',
 '17.10': 'Says a woman is purified only by her husband\'s foot-water.',
 '17.14': 'Says a woman robs a man of strength at once.',
 '17.19': 'Lists the prostitute among those who cannot feel another\'s pain.',
 '2.17': 'Uses the prostitute leaving a poor man as a model of who abandons whom.',
 '5.14': 'Calls a woman a straw to the man who has conquered desire.',
 '4.8': 'Lists a widowed daughter among things that burn a man.',
 '1.14': 'Advises marrying a girl for her family, beauty aside, framed as a man\'s acquisition.',
}
verses = []
for c in C:
    r = BY.get(c['ref'])
    if r is None: sys.exit('missing ' + c['ref'])
    lines = clean(r.sanskrit_sloka)
    full = ' '.join(lines)
    if WOMEN_RE.search(full) and c['ref'] not in ('12.14', '5.15', '4.5', '12.11'):
        sys.exit('women verse picked without review: ' + c['ref'])
    assert c['ref'] not in EXCLUDE
    verses.append({'id': 'chk-' + c['ref'].replace('.', '-'), 'ref': c['ref'], 'chapter': int(r.chapter), 'verse': int(r.sloka_no),
                   'section': c['sec'], 'lines': lines, 'roman': [roman(l, 'sa') for l in lines],
                   'meaning': {'hi': c['hi'], **({'en': c['en']} if c.get('en') else {})}, 'card': c['ref'] in CARD_REFS, 'reviewed': False})
refs = {v['ref'] for v in verses}
for s in SITUATIONS:
    for ref in s['refs']: assert ref in refs, ref
women_all = []
for key, r in BY.items():
    if WOMEN_RE.search(r.sanskrit_sloka):
        women_all.append({'ref': key, 'decision': 'exclude' if key in EXCLUDE else ('featured' if key in refs else 'not-featured'),
                          **({'reason': EXCLUDE[key]} if key in EXCLUDE else {})})
for k in EXCLUDE: assert k in BY, k
data = {
 'generated': '2026-10-30',
 'edition': 'Chanakya Niti (Vriddha-Chanakya), 17 chapters, 342 verses, Sanskrit from the Chanakya_Neeti parquet in the Wisdom corpus. Verse numbers follow this text; other printed editions number some chapters differently.',
 'verses': verses, 'situations': SITUATIONS,
 'notSaid': [
  {'slug': 'opposition-unites', 'line': {'en': 'When the entire opposition unites, understand that the king is honest.', 'hi': 'जब पूरा विपक्ष एक हो जाए, तो समझ लेना कि राजा ईमानदार है।'},
   'finding': {'hi': 'चाणक्य नीति के 342 श्लोकों में ऐसा कुछ नहीं है। Factly ने भी जाँचकर इसे गलत तरीके से चाणक्य के नाम बताया। अर्थशास्त्र एकजुट विरोधियों से निपटने की बात करता है, राजा की ईमानदारी साबित करने की नहीं।',
               'en': 'Not in the 342 verses of the Chanakya Niti. Factly also found it misattributed.'},
   'source': {'label': 'Factly fact check', 'url': 'https://factly.in/this-quote-endorsing-the-kings-honesty-in-the-face-of-united-opposition-is-misattributed-to-chanakya'}},
  {'slug': 'three-questions', 'line': {'en': 'Before you start some work, always ask yourself three questions: why am I doing it, what the results might be, and will I be successful.', 'hi': 'कोई भी काम शुरू करने से पहले खुद से तीन सवाल पूछो: मैं यह क्यों कर रहा हूँ, इसका नतीजा क्या होगा, और क्या मैं सफल होऊँगा।'},
   'finding': {'hi': 'यह पंक्ति चाणक्य नीति में नहीं है। सबसे करीबी असली श्लोक 4.18 है, जो समय, मित्र, जगह, आमदनी-खर्च और अपनी ताकत पर बार-बार सोचने को कहता है।',
               'en': 'Not in the text. The nearest real verse is 4.18.'},
   'realRef': '4.18'},
  {'slug': 'straight-trees', 'line': {'en': 'A person should not be too honest. Straight trees are cut first and honest people are screwed first.', 'hi': 'ज़्यादा ईमानदार मत बनो। सीधे पेड़ पहले काटे जाते हैं।'},
   'finding': {'hi': 'पहला आधा हिस्सा सच में है: श्लोक 7.12 कहता है कि बहुत सीधे मत बनो, जंगल में सीधे पेड़ कटते हैं। "ईमानदार" शब्द और आखिरी हिस्सा बाद में जोड़ा गया है। मूल में "सरल" है, यानी सीधा, भोला।',
               'en': 'Half true. 7.12 says do not be too straight. "Honest" and the second half were added.'},
   'realRef': '7.12'},
 ],
 'womenReview': {'mentions': len(women_all), 'excluded': sum(w['decision'] == 'exclude' for w in women_all), 'items': women_all},
 'notes': {'englishColumnMisaligned': True},
}
json.dump(data, open(OUT, 'w'), ensure_ascii=False, indent=1)
print('verses', len(verses), 'cards', sum(v['card'] for v in verses), 'women mentions', len(women_all), 'excluded', data['womenReview']['excluded'])

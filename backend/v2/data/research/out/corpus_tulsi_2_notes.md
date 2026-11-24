# corpus_tulsi_2 (Vinaya Patrika, 47 passages): research notes

## Sources used
All 47 entries rest on archive.org scans, read through their OCR full text:
- **Hanuman Prasad Poddar, Gita Press Vinay Patrika with bhavartha (2001 ed.)**: https://archive.org/details/HLBB_vinay-patrika-by-goswami-tulasi-das-with-commentary-by-hanumad-prasad-podhar-200
- **Viyogi Hari, Haritoshini tika (Sahitya Seva Sadan, Kashi)**: word glosses, bhavartha and tippani with variant readings. https://archive.org/details/BNtj_vinay-patrika-of-tulasidas-with-haritoshini-tika-by-viyogi-hari-sahitya-seva-sadan-kashi
- **M. M. Thakur, The Vinaya Patrika: An English Rendering**: an English translation, not a commentary. I used it to check numbering and how each line reads. https://archive.org/details/the-vinaya-patrika-an-english-rendering-by-murari-madhusudan

All three are probably still under copyright, so everything in the entries is paraphrased. I did not use kavitakosh, Gita Supersite or wisdomlib. Other commentaries are on archive.org but I did not mine them: Baijnath's 1916 sateek, Anjani Nandan Sharan's *Vinay Piyush* (6 volumes) and Rameshwar Bhatt's 1931 edition. They could add a third tradition to the thinner entries later.

The work files are in /home/claude/research/vp2_work/. ex/all_<pada>.txt holds the extracted pages and ent/ holds the per-verse JSON.

## Data errors (fix in our data)
1. **tulsi_vp.128: wrong pada number.** The passage 'कबहुँ सो कर-सरोज रघुनायक...' is **pada 138**. Haritoshini prints (१३८), Thakur numbers it 138, and in Gita Press it comes right after 137. Thakur's pada 128 is a different song. Fix the id and ref.
2. **tulsi_vp.150: translation of stanza 2 is wrong.** 'नातो बड़े समर्थ सों इक ओर किधौं हूँ' is a question: is my bond with so great a lord only one-sided? Poddar, Viyogi Hari and Thakur all read it this way. Our "On one side is my bond..., and on the other, I" does not make sense.
3. **tulsi_vp.76: wrong subject in the last clause.** In 'बोलि सेबक-सुखद, सदा बिरद बहत हौं', both commentators make Tulsidas the subject: ever since, *he* has worn the devotee's badge. Our text says Ram "carries that name".
4. **tulsi_vp.257: line 2 is misread.** It means "everyone looks after themselves, and only a rare one looks after his own people". Ours reads "everyone is good to their own people".
5. **tulsi_vp.227: the mango image is assigned to the wrong thing.** The line means "I now get mangoes from babul and bahera trees": the same thorny trees, or by Viyogi Hari's reading the people who once scorned him, now give sweetness. Our translation makes Tulsi the babul. Our `line` field ("I now bear sweet fruit") changes the image too.
6. **tulsi_vp.240: two softer issues.** 'कासी' is a variant of 'करसी' (a dung-cake fire, meaning austerities). Also, 'जल की चिकनाई' is the slick film water leaves on the skin before it dries, not "oil on water".
7. **tulsi_vp.254: the setting is not in the text.** "Orphaned as a child" is biography taken from padas 227 and 275, not something this pada says.
8. **Refs.** 22 of the 47 refs read just "Vinay Patrika" with no pada number. Every number checked out against Gita Press, Haritoshini and Thakur except 128 (above). Please add the numbers, and use one spelling throughout (Vinay vs Vinaya).
9. **Typos in the Devanagari field** (worth a proofread):
   - 76: 'हाौं'
   - 172: stanza marker '॥ ९॥' should be '१'; also 'चहांगो/दहांगो/कहाँगो'
   - 266: 'चहं' should be 'चहौं'
   - 267: 'उठिहाँ' should be 'उठिहौं', and 'निरयो' should be 'निबर्‍यो'
10. **Excerpts, not whole padas.** Most of our texts are pieces of longer padas, which is fine. But several settings describe content that sits only in the parts we left out: 102 (the fish-and-hook request), 103 (motiveless love), 165 (the closing complaint), 221 (the drying paddy field). The reading writer should see the full-pada context. Each entry's `context` field gives it.

## Weak or thin sourcing
- **221:** only one commentary (Poddar). The Haritoshini page was illegible in the OCR and Thakur was not checked.
- **Two sources only:**
  - 78 and 232: Gita Press page not found in the OCR.
  - 137: Haritoshini bhavartha illegible.
  - 177: Thakur not checked.
  - 191#2: Gita Press commentary on this doha not legible.
  - 270 and 271: the Haritoshini OCR mixes in neighbouring padas.
- Haritoshini's own pada numbers are often misread in the OCR (१६० for १९०, २६६ for १६६ and so on). I located each pada by matching its text, not by the printed number.

## Cautions for editors (corpus readings and new plans)
- **137:** the full pada has lines about retribution (whoever plots a saint's death dies by it; the wish-tree bears poison for those who hate saints). For someone who has been harmed, "not a hair is bent" can sound like they lacked grace. Keep the existing misuse note.
- **166:** the full pada uses caste and gender labels of its time (Shabari described as a low-born, dull woman). It also pardons Jayanta, who assaulted Sita: do not use that to counsel forgiving an abuser.
- **217:** stanza 4 is Draupadi's public disrobing. Avoid it for survivors of sexual violence.
- **227 and 275:** explicit parental abandonment at birth ("like a snake leaves its young") and untouchability ("people shrank from my shadow"). These may be raw for adoptees and for people rejected by caste or family.
- **229:** a self-curse (a worm in hell for aeons). Avoid for scrupulous or anxious readers.
- **273:** ends "the end of life is very near". Avoid for people who are seriously ill and afraid of death, unless chosen on purpose.
- **101 and 250:** these say other gods are bound by maya, call other supports "poison", and say he serves no other deity. They can read as dismissive in interfaith or mixed-faith settings.
- **165:** stanza 4 cites the washerman who slandered Sita and Sita's abandonment. Avoid for readers wronged by a partner.
- **182:** uses a dice and gambling image ("a losing throw becomes a winning one").
- **102:** "the one who tied the knot unties it" can be heard as "God did this to you".
- **Harsh self-accusation in 150, 177, 201, 261, 266.** "Bad son", "bad dog-like servant", "never did good even by mistake", and similar. This is a devotional convention, but keep it away from readers with low self-worth or depression. The opening lines of these padas, which we quote, are mostly gentle. The harsh material is in the stanzas we left out.
- **172 ("not burning at harsh words"):** must not become advice to put up with verbal abuse.
- **Strong candidates for loneliness, abandonment and shame plans:** 79, 160, 177, 179, 191#2, 253, 254, 257, 268, 270, 271, 274. Of these:
  - 271: the image of the broken arm kept in a sling.
  - 191#2: the coin tied into his cloth and never weighed again.

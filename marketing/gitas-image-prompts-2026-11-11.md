# /gitas card images: prompts (11 Nov 2026)

One image per Gita, matching the blog chapter images (public/assets/chapter1.webp to chapter18.webp).
Save each as `frontend/public/assets/gitas/<slug>.webp`, 1200 x 800 (3:2), WebP quality about 80.
A card shows its image as soon as the file exists; the Bhagavad Gita card already uses chapter1.webp.

## House style (prepend to every prompt)

Richly detailed Indian epic illustration in a semi-realistic painted style, like a classic Amar Chitra Katha cover repainted with fine detail. Ornate traditional clothing and gold jewellery, expressive calm faces, warm natural light, deep blues, maroons and golds, a sense of a real place. Landscape 3:2. Figures in the middle of the frame with room around them. No text, no letters, no captions, no borders, no watermark, no modern objects.

## Prompts

| slug | Gita | Scene |
|---|---|---|
| ashtavakra | Ashtavakra Gita | The young sage Ashtavakra, his thin body visibly bent in eight places, stands with quiet authority in the royal court of Mithila, speaking to King Janaka, who listens from his throne leaning forward; courtiers watch in surprise. |
| avadhuta | Avadhuta Gita | Dattatreya as a wandering ascetic with ash-smeared skin and matted hair, sitting serenely beneath a large fig tree at the edge of a forest, a white cow and four dogs resting around him, soft evening light. |
| anu | Anu Gita | After the Kurukshetra war, Krishna and Arjuna sit together in a vast pillared assembly hall at Indraprastha, Arjuna turned towards Krishna asking to hear the teaching again, quiet and reflective mood, light through tall doorways. |
| brahmana | Brahmana Gita | A Brahmin and his wife sit facing each other in a simple thatched hermitage at dusk, an oil lamp between them, the wife asking and the husband explaining with an open hand. |
| vyadha | Vyadha Gita | In a modest home in the city of Mithila, a kind middle-aged man in simple clothes, the righteous meat-seller, welcomes a proud young ascetic with a water pot; behind him he tends his aged mother and father seated on a cot. No meat or blood shown. |
| hamsa-mbh | Hamsa Gita (Mahabharata) | A luminous golden swan floating on a still celestial lake speaks to a group of radiant sages, the Sadhyas, seated on the shore, mist and lotus flowers, dawn light. |
| uddhava | Uddhava Gita | Krishna, blue-skinned, peacock feather in his crown, seated beneath a great banyan tree near the sea at Prabhasa, speaking gently to his devoted friend Uddhava who kneels with folded hands, late afternoon light. |
| hamsa-bhag | Hamsa Gita (Bhagavata) | Krishna in the form of a radiant white swan appearing in a burst of light before four young child-sages (Sanaka and his brothers) and the four-headed Brahma, in a heavenly assembly among clouds. |
| bhikshu | Bhikshu Gita | An elderly mendicant from Avanti in worn saffron cloth walks calmly through a village street with a staff and an empty bowl, while a few villagers jeer and throw dust; his face is peaceful. |
| kapila | Kapila Gita | The young sage Kapila sits in meditation posture, teaching his mother Devahuti who listens attentively, at a hermitage beside a lake full of lotuses (Bindu Sarovara), gentle morning light. |
| gopi | Gopi Gita | The gopis of Vrindavan in colourful lehengas, searching and singing among trees on the bank of the Yamuna on a full-moon autumn night, longing on their faces, Krishna absent from the scene. |
| guru | Guru Gita | Shiva, with crescent moon and Ganga in his hair, seated on a tiger skin on the snowy heights of Mount Kailasa, teaching Parvati who sits beside him with folded hands. |
| ribhu | Ribhu Gita | The elder sage Ribhu with a white beard teaching his disciple Nidagha on a green Himalayan slope near the Kedara peaks, a small fire and a water pot beside them. |
| devi | Devi Gita | The Goddess appearing in radiant, compassionate form in the sky above Himalayan peaks, Himavan, king of the mountains, standing below in royal dress with palms joined in awe. |
| ganesha | Ganesha Gita | Ganesha, seated on a low throne in a pillared palace hall, one hand raised in blessing, teaching King Varenya who sits before him listening intently. |
| shiva | Shiva Gita | Shiva appearing in a soft glow at a forest hermitage, speaking to Rama in his exile (bark garments, bow set down beside him), Lakshmana standing respectfully behind. |
| ishvara | Ishvara Gita | Shiva seated on a rock at Badarikashrama in the Himalaya, a fast mountain river below, teaching a gathering of rishis seated in rows before him. |
| rama | Rama Gita | Rama, crowned and seated in the palace at Ayodhya after his coronation, teaching his brother Lakshmana who sits at his side listening with folded hands. |
| pandava | Pandava Gita | The five Pandava brothers with Draupadi, Kunti and Vidura standing together in prayer before a shrine of Vishnu, lamps and flowers, their faces calm and devoted. |
| mahamandal | Vishnu, Shambhu, Shakti, Surya and Dhish Gitas | A young seeker seated before a teacher beneath a tree at dawn, an open palm-leaf book between them, five small lamps lit in a row. |

## Generated 11 Nov 2026

All 20 made with Grok Imagine (Quality 2.0, 3:2, two variants each), the better variant cropped in the browser to the centre 95% width from the top (removes the Grok mark) and saved as 1200 x 800 WebP, quality 0.82, about 170 to 265 KB each. Prompts were softened where Grok refused: Vyadha (no butcher's stall, "humble householder"), Hamsa Bhagavata ("four serene sages, the Kumaras"), Bhikshu ("point and laugh" instead of throwing dust).

## Convert and place

Drop the generated files, named by slug (e.g. `ashtavakra.png`), into `marketing/gitas-raw/`. Claude converts them to 1200 x 800 WebP in `frontend/public/assets/gitas/` (centre-cropped to 3:2, quality 80) with Pillow.

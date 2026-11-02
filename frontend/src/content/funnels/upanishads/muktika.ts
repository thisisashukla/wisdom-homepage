/**
 * The 108 Upanishads as the Muktika Upanishad lists them (Shri Ram to Hanuman), grouped by Veda.
 * Counts: Rig 10, Shukla Yajur 19, Krishna Yajur 32, Sama 16, Atharva 31. reviewed: false.
 */
export type MuktikaGroup = { id: string; veda: { en: string; hi: string }; names: { en: string; hi: string }[] }

const n = (en: string, hi: string) => ({ en, hi })

export const MUKTIKA: MuktikaGroup[] = [
  {
    id: 'rig',
    veda: { en: 'Rig Veda', hi: 'ऋग्वेद' },
    names: [
      n('Aitareya', 'ऐतरेय'), n('Kaushitaki', 'कौषीतकि'), n('Nadabindu', 'नादबिन्दु'), n('Atmabodha', 'आत्मबोध'), n('Nirvana', 'निर्वाण'),
      n('Mudgala', 'मुद्गल'), n('Akshamalika', 'अक्षमालिका'), n('Tripura', 'त्रिपुरा'), n('Saubhagya Lakshmi', 'सौभाग्यलक्ष्मी'), n('Bahvricha', 'बह्वृच'),
    ],
  },
  {
    id: 'shukla-yajur',
    veda: { en: 'Shukla Yajur Veda', hi: 'शुक्ल यजुर्वेद' },
    names: [
      n('Isha', 'ईश'), n('Brihadaranyaka', 'बृहदारण्यक'), n('Jabala', 'जाबाल'), n('Hamsa', 'हंस'), n('Paramahamsa', 'परमहंस'),
      n('Subala', 'सुबाल'), n('Mantrika', 'मन्त्रिका'), n('Niralamba', 'निरालम्ब'), n('Trishikhi Brahmana', 'त्रिशिखिब्राह्मण'), n('Mandala Brahmana', 'मण्डलब्राह्मण'),
      n('Advaya Taraka', 'अद्वयतारक'), n('Paingala', 'पैङ्गल'), n('Bhikshuka', 'भिक्षुक'), n('Turiyatita', 'तुरीयातीत'), n('Adhyatma', 'अध्यात्म'),
      n('Tarasara', 'तारसार'), n('Yajnavalkya', 'याज्ञवल्क्य'), n('Shatyayaniya', 'शाट्यायनीय'), n('Muktika', 'मुक्तिका'),
    ],
  },
  {
    id: 'krishna-yajur',
    veda: { en: 'Krishna Yajur Veda', hi: 'कृष्ण यजुर्वेद' },
    names: [
      n('Katha', 'कठ'), n('Taittiriya', 'तैत्तिरीय'), n('Brahma', 'ब्रह्म'), n('Kaivalya', 'कैवल्य'), n('Shvetashvatara', 'श्वेताश्वतर'),
      n('Garbha', 'गर्भ'), n('Narayana', 'नारायण'), n('Amritabindu', 'अमृतबिन्दु'), n('Amritanada', 'अमृतनाद'), n('Kalagnirudra', 'कालाग्निरुद्र'),
      n('Kshurika', 'क्षुरिका'), n('Sarvasara', 'सर्वसार'), n('Shukarahasya', 'शुकरहस्य'), n('Tejobindu', 'तेजोबिन्दु'), n('Dhyanabindu', 'ध्यानबिन्दु'),
      n('Brahmavidya', 'ब्रह्मविद्या'), n('Yogatattva', 'योगतत्त्व'), n('Dakshinamurti', 'दक्षिणामूर्ति'), n('Skanda', 'स्कन्द'), n('Shariraka', 'शारीरक'),
      n('Yogashikha', 'योगशिखा'), n('Ekakshara', 'एकाक्षर'), n('Akshi', 'अक्षि'), n('Avadhuta', 'अवधूत'), n('Katharudra', 'कठरुद्र'),
      n('Rudrahridaya', 'रुद्रहृदय'), n('Yogakundalini', 'योगकुण्डलिनी'), n('Panchabrahma', 'पञ्चब्रह्म'), n('Pranagnihotra', 'प्राणाग्निहोत्र'), n('Varaha', 'वराह'),
      n('Kalisantarana', 'कलिसन्तरण'), n('Sarasvatirahasya', 'सरस्वतीरहस्य'),
    ],
  },
  {
    id: 'sama',
    veda: { en: 'Sama Veda', hi: 'सामवेद' },
    names: [
      n('Kena', 'केन'), n('Chandogya', 'छान्दोग्य'), n('Aruni', 'आरुणि'), n('Maitrayani', 'मैत्रायणी'), n('Maitreyi', 'मैत्रेयी'),
      n('Vajrasuchika', 'वज्रसूचिका'), n('Yogachudamani', 'योगचूडामणि'), n('Vasudeva', 'वासुदेव'), n('Maha', 'महा'), n('Sannyasa', 'संन्यास'),
      n('Avyakta', 'अव्यक्त'), n('Kundika', 'कुण्डिका'), n('Savitri', 'सावित्री'), n('Rudrakshajabala', 'रुद्राक्षजाबाल'), n('Darshana', 'दर्शन'),
      n('Jabali', 'जाबालि'),
    ],
  },
  {
    id: 'atharva',
    veda: { en: 'Atharva Veda', hi: 'अथर्ववेद' },
    names: [
      n('Prashna', 'प्रश्न'), n('Mundaka', 'मुण्डक'), n('Mandukya', 'माण्डूक्य'), n('Atharvashira', 'अथर्वशिर'), n('Atharvashikha', 'अथर्वशिखा'),
      n('Brihajjabala', 'बृहज्जाबाल'), n('Nrisimhatapani', 'नृसिंहतापनी'), n('Naradaparivrajaka', 'नारदपरिव्राजक'), n('Sita', 'सीता'), n('Sharabha', 'शरभ'),
      n('Tripadvibhuti Mahanarayana', 'त्रिपाद्विभूतिमहानारायण'), n('Ramarahasya', 'रामरहस्य'), n('Ramatapani', 'रामतापनी'), n('Shandilya', 'शाण्डिल्य'), n('Paramahamsa Parivrajaka', 'परमहंसपरिव्राजक'),
      n('Annapurna', 'अन्नपूर्णा'), n('Surya', 'सूर्य'), n('Atma', 'आत्मा'), n('Pashupata Brahma', 'पाशुपतब्रह्म'), n('Parabrahma', 'परब्रह्म'),
      n('Tripuratapini', 'त्रिपुरातापिनी'), n('Devi', 'देवी'), n('Bhavana', 'भावना'), n('Bhasmajabala', 'भस्मजाबाल'), n('Ganapati', 'गणपति'),
      n('Mahavakya', 'महावाक्य'), n('Gopalatapani', 'गोपालतापनी'), n('Krishna', 'कृष्ण'), n('Hayagriva', 'हयग्रीव'), n('Dattatreya', 'दत्तात्रेय'),
      n('Garuda', 'गरुड'),
    ],
  },
]

export const MUKTIKA_TOTAL = MUKTIKA.reduce((a, g) => a + g.names.length, 0)

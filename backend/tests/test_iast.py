from ai.iast import to_iast, card_ref_iast


def test_gita():
    assert to_iast("Bhagavad Gita 12.12") == "Bhagavad Gītā 12.12"
    assert to_iast("BG 18.16") == "Bhagavad Gītā 18.16"


def test_manas_drops_editor_notes():
    assert to_iast("Ramcharitmanas, Uttar Kand 117 (chaupai 17)") == "Rāmcaritmānas, Uttar Kāṇḍ 117"
    assert to_iast("Ramcharitmanas, Uttar Kand 40 (chaupai 4) + doha 1") == "Rāmcaritmānas, Uttar Kāṇḍ 40"


def test_books_named():
    assert to_iast("Mahabharata, Shanti 104.16") == "Mahābhārata, Śānti Parva 104.16"
    assert to_iast("Valmiki Ramayana, Ayodhya 1.11") == "Vālmīki Rāmāyaṇa, Ayodhyā Kāṇḍa 1.11"


def test_upanishads_and_others():
    assert to_iast("Brihadaranyaka Upanishad 2.4.2") == "Bṛhadāraṇyaka Upaniṣad 2.4.2"
    assert to_iast("Ashtavakra Gita 18.3") == "Aṣṭāvakra Gītā 18.3"
    assert to_iast("Bhartrihari, Nitishatakam 4 (Kosambi 9)") == "Bhartṛhari, Nītiśatakam 4"
    assert to_iast("Complete Works, Vol. 1, Karma-Yoga: Freedom, p. 101") == "Svāmī Vivekānanda, Complete Works, Vol. 1"


def test_card_prefers_precise_label():
    v = {"ref_label": "Ramcharitmanas, Bal Kand 127 (chaupai 1)", "display_ref": "Ramcharitmanas · Bal Kand"}
    assert card_ref_iast(v) == "Rāmcaritmānas, Bāl Kāṇḍ 127"
    assert to_iast(None) is None

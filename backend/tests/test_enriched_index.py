import json
import tempfile
import unittest
from pathlib import Path

import numpy as np

from ai.index import NumpyScriptureIndex


class EnrichedIndexTests(unittest.TestCase):
    def test_prefers_saved_enriched_index_and_normalises_metadata(self):
        with tempfile.TemporaryDirectory() as directory:
            data = Path(directory)
            np.save(data / "bge_m3_enriched.npy", np.eye(2, dtype=np.float32))
            (data / "bge_m3_enriched_uids.json").write_text(json.dumps(["gita::2_47", "gita::2_48"]))
            (data / "verse_meta.json").write_text(json.dumps({
                "gita::2_47": {"scripture_slug": "bhagwad_gita", "verse_id": "2.47", "order": 47, "verse_sanskrit": "कर्मण्येव", "simple_meaning": "Act with care."},
                "gita::2_48": {"scripture_slug": "bhagwad_gita", "verse_id": "2.48", "order": 48, "verse_sanskrit": "योगस्थः", "simple_meaning": "Remain steady."},
            }))
            np.save(data / "embeddings.npy", np.zeros((1, 2), dtype=np.float32))
            (data / "verses.json").write_text(json.dumps([{"script_ref": "legacy", "scripture": "legacy"}]))

            index = NumpyScriptureIndex.from_data_dir(data)

            self.assertEqual(index.size, 2)
            self.assertEqual(index.get_verse("gita::2_47")["orig_ref"], "2.47")
            self.assertEqual(index.get_verse("gita::2_47")["verse_text"], "कर्मण्येव")
            np.testing.assert_array_equal(index.get_embedding("gita::2_47"), np.array([1.0, 0.0], dtype=np.float32))
            self.assertIsNone(index.get_embedding("missing"))
            self.assertIsNone(index.get_verse("legacy"))

    def test_ordinal_references_restore_only_after_matching_source_text(self):
        with tempfile.TemporaryDirectory() as directory:
            data = Path(directory)
            np.save(data / "bge_m3_enriched.npy", np.eye(2, dtype=np.float32))
            (data / "bge_m3_enriched_uids.json").write_text(json.dumps(["bhagwad_gita::267", "bhagwad_gita::268"]))
            (data / "verse_meta.json").write_text(json.dumps({
                "bhagwad_gita::267": {"scripture_slug":"bhagwad_gita","verse_id":"267","order":267,"verse_sanskrit":"चञ्चलं हि"},
                "bhagwad_gita::268": {"scripture_slug":"bhagwad_gita","verse_id":"268","order":268,"verse_sanskrit":"DIFFERENT"},
            }))
            (data / "verses.json").write_text(json.dumps([
                {"scripture":"bhagwad_gita","order":267,"orig_ref":"6,34","script_ref":"bhagwad_gita:6,34","verse_text":"चञ्चलं\nहि"},
                {"scripture":"bhagwad_gita","order":268,"orig_ref":"6,35","script_ref":"bhagwad_gita:6,35","verse_text":"OTHER"},
            ]))
            index = NumpyScriptureIndex.from_data_dir(data)
            self.assertEqual(index.get_verse("bhagwad_gita:6,34")["script_ref"], "bhagwad_gita::267")
            self.assertEqual(index.get_verse("bhagwad_gita::267")["orig_ref"], "6,34")
            self.assertIsNone(index.get_verse("bhagwad_gita:6,35"))
            self.assertEqual(index.get_verse("bhagwad_gita::268")["orig_ref"], "")

    def test_rejects_duplicate_enriched_ids(self):
        with tempfile.TemporaryDirectory() as directory:
            data = Path(directory)
            np.save(data / "bge_m3_enriched.npy", np.eye(2, dtype=np.float32))
            (data / "bge_m3_enriched_uids.json").write_text(json.dumps(["same", "same"]))
            (data / "verse_meta.json").write_text(json.dumps({"same": {"scripture_slug": "gita"}}))

            with self.assertRaisesRegex(ValueError, "duplicate verse IDs"):
                NumpyScriptureIndex.from_data_dir(data)


if __name__ == "__main__":
    unittest.main()

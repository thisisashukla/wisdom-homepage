import unittest
from unittest.mock import patch

from ai.reranker import BgeReranker, init_reranker


class RerankerStartupTests(unittest.TestCase):
    def test_configured_reranker_loads_during_initialisation(self):
        with patch.object(BgeReranker, "load", autospec=True, return_value=None) as load:
            reranker = init_reranker("test-model")

        load.assert_called_once_with(reranker)

    def test_startup_propagates_reranker_load_failure(self):
        with patch.object(BgeReranker, "load", side_effect=RuntimeError("weights unavailable")):
            with self.assertRaisesRegex(RuntimeError, "weights unavailable"):
                init_reranker("test-model")

    def test_empty_configuration_disables_reranker_without_loading(self):
        with patch.object(BgeReranker, "load") as load:
            self.assertIsNone(init_reranker(""))
        load.assert_not_called()


if __name__ == "__main__":
    unittest.main()

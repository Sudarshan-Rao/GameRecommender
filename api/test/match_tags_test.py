import unittest
from api.utils import match_tags
import sys

sys.path.append('../api/utils')


class MyTestCase(unittest.TestCase):
    def test_load_tags(self):
        all_tags = match_tags.load_all_tags()
        test_starting_tag = all_tags[0][0]
        expected_starting_tag = 'Indie'
        self.assertEqual(expected_starting_tag, test_starting_tag)

    def test_load_tags_unhappy_flow(self):
        all_tags = match_tags.load_all_tags()
        test_starting_tag = all_tags[0][0]
        expected_starting_tag = 'Action'
        self.assertNotEqual(expected_starting_tag, test_starting_tag)

    def test_match_tags(self):
        matched_tags = match_tags.get_matching_tags("Indie")
        expected_matched_tag = 1
        self.assertEqual(expected_matched_tag, matched_tags.pop())

    def test_match_tags_empty_search(self):
        matched_tags = match_tags.get_matching_tags("")
        expected_matched_tag = []
        self.assertEqual(expected_matched_tag, matched_tags)


if __name__ == '__main__':
    unittest.main()

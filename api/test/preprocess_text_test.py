import unittest
from api.utils import preprocess_text


class MyTestCase(unittest.TestCase):
    def test_remove_punctuation(self):
        test_string = "Hello!!!"
        removed_punctuation_string = preprocess_text.remove_punctuation(test_string)
        test_string_without_punctuation = "Hello"
        self.assertEqual(test_string_without_punctuation, removed_punctuation_string)

    def test_remove_tokenization(self):
        test_string = "Hello World"
        tokenized_string = preprocess_text.tokenization(test_string)
        test_string_tokenized = ["Hello", "World"]
        self.assertEqual(test_string_tokenized, tokenized_string)

    def test_remove_stopwords(self):
        test_string = ["the", "world", "with", "a", "hero"]
        string_without_stop_words = preprocess_text.remove_stopwords(test_string)
        test_string_without_stop_words = ["world", "hero"]
        self.assertEqual(test_string_without_stop_words, string_without_stop_words)

    def test_lemmatizer(self):
        test_string = ["children", "love", "apples"]
        lemmatized_strings = preprocess_text.lemmatizer(test_string)
        test_string_lemmas = ["child", "love", "apple"]
        self.assertEqual(test_string_lemmas, lemmatized_strings)

    def test_ngrams(self):
        test_string = ["first", "player", "shooter"]
        ngrams = preprocess_text.generate_ngrams(test_string, 2)
        test_string_ngrams = [('first', 'player'), ('player', 'shooter')]
        self.assertEqual(test_string_ngrams, ngrams)


if __name__ == '__main__':
    unittest.main()

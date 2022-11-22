import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.util import ngrams

# Stop words present in the library
stopwords = nltk.corpus.stopwords.words('english')

# defining the object for stemming
porter_stemmer = PorterStemmer()

# defining the object for Lemmatization
wordnet_lemmatizer = WordNetLemmatizer()


# defining the function to remove punctuation
def remove_punctuation(text):
    punctuation_free = "".join([i for i in text if i not in string.punctuation])
    return punctuation_free


def tokenization(text):
    return word_tokenize(text)


def remove_stopwords(text):
    output = [i for i in text if i not in stopwords]
    return output


def lemmatizer(text):
    lemm_text = [wordnet_lemmatizer.lemmatize(word) for word in text]
    return lemm_text


def generate_ngrams(tokens, n):
    output = list(ngrams(tokens, n))
    return output


def preprocess_text(search_string):
    # remove all punctuations
    search_string_without_punctuation = remove_punctuation(search_string)

    # convert to lower case
    search_string_lower_case = search_string_without_punctuation.lower()

    # tokenization
    search_string_tokens = tokenization(search_string_lower_case)

    # remove all stop words in search string
    search_string_without_stop_words = remove_stopwords(search_string_tokens)

    # summarizer
    search_string_processed = lemmatizer(search_string_without_stop_words)

    # get the n_grams
    one_gram = search_string_processed
    bi_grams = generate_ngrams(one_gram, 2)

    return one_gram, bi_grams


if __name__ == '__main__':
    preprocess_text("Story rich game with the hero!!!")

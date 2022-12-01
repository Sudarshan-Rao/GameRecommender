from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


def remove_stop_words(user_input):
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(user_input)

    filtered_sentence = [w for w in word_tokens if not w.lower() in stop_words]

    filtered_sentence = []

    for w in word_tokens:
        if w not in stop_words:
            filtered_sentence.append(w)

    return filtered_sentence


if __name__ == '__main__':
    user_input = "The sentence has stop words"
    list = remove_stop_words(user_input)

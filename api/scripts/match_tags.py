import sqlite3

from fuzzywuzzy import fuzz

from api.scripts import preprocess_text


# get the one_gram and bi_grams
def get_ngrams(search_string):
    one_gram, bi_gram = preprocess_text.preprocess_text(search_string)
    return one_gram, bi_gram


# get all tags
def load_all_tags():
    db_connection = sqlite3.connect("../resources/preprocess.db")
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT * FROM TAGS")
    tags_table = db_cursor.fetchall()
    all_tags = []
    for tags in tags_table:
        all_tags.append(tags[1])
    return all_tags


# fuzzy match with all tags and get corresponding tag
def get_matching_tags(search_string):
    all_tags = load_all_tags()
    one_gram, bi_grams = get_ngrams(search_string)
    match_ratio = []
    matched_tags = set()
    for key_word in one_gram:
        for tag in all_tags:
            ratio = fuzz.token_set_ratio(tag, key_word)
            if ratio > 75:
                matched_tags.add(tag)
                match_ratio.append(ratio)

    for key_bi_grams in bi_grams:
        two_word_key = key_bi_grams[0] + " " + key_bi_grams[1]
        for tag in all_tags:
            ratio = fuzz.token_set_ratio(two_word_key, tag)
            if ratio > 75:
                matched_tags.add(tag)
                match_ratio.append(ratio)

    print(matched_tags)
    print(match_ratio)


if __name__ == '__main__':
    get_matching_tags("sports with some action")

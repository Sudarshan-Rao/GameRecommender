import sqlite3
from fuzzywuzzy import fuzz
import os.path as pt
import sys
import preprocess_text

db_path = pt.join(pt.split(pt.dirname(pt.abspath(__file__)))[0], 'resources/preprocess.db')
sys.path.insert(1, pt.dirname(pt.abspath(__file__)))


# get the one_gram and bi_grams
def get_ngrams(search_string):
    one_gram, bi_gram = preprocess_text.preprocess_text(search_string)
    return one_gram, bi_gram


# get all tags
def load_all_tags():
    all_tags = []
    tag_ids = []
    db_connection = sqlite3.connect(db_path)
    db_cursor = db_connection.cursor()
    db_cursor.execute("SELECT * FROM TAGS")
    tags_table = db_cursor.fetchall()

    for tags in tags_table:
        all_tags.append(tags[1])
        tag_ids.append(tags[0])
    return all_tags, tag_ids


# fuzzy match with all tags and get corresponding tag
def get_matching_tags(search_string):
    if search_string == "":
        return []
    all_tags, tag_ids = load_all_tags()
    one_gram, bi_grams = get_ngrams(search_string)
    match_ratio = []
    matched_tags_id = set()

    for key_word in one_gram:
        for i in range(len(all_tags)):
            ratio = fuzz.token_set_ratio(all_tags[i], key_word)
            if ratio > 95:
                matched_tags_id.add(tag_ids[i])
                match_ratio.append(ratio)

    for key_bi_grams in bi_grams:
        two_word_key = key_bi_grams[0] + " " + key_bi_grams[1]
        for i in range(len(all_tags)):
            ratio = fuzz.token_set_ratio(two_word_key, all_tags[i])
            if ratio > 95:
                matched_tags_id.add(tag_ids[i])
                match_ratio.append(ratio)

    return matched_tags_id


if __name__ == '__main__':
    get_matching_tags("sports with some action")

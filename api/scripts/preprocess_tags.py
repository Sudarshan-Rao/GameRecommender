from fuzzywuzzy import fuzz
from nltk.util import ngrams
import sqlite3

game_desc = """Diamond is a fast paced puzzle game demanding quick reflexes as you control a ball with perpetual vertical momentum through a wealth of various levels. With over 30 individual puzzle components, the goal of destroying gems is rarely ever as simple as matching your color and hitting them.

You'll dodge homing bombs and direct them into explosives, ignite or destroy generators which supply power to force fields, lasers, hazard bricks and color switches, guide spiked bombs to open paths or destroy falling fuses, unleash tornado gems to rip apart whole sections of levels, and far more, all with the ultimate goal of clearing the diamonds and moving on. Feeling competitive? See how you compare to others with leaderboards for every level or level package both official and player created from the workshop.

In addition to over a hundred levels is the same fully featured editor used to create them, complete with integrated Steam Workshop support support so you can seamlessly build levels or even mini-campaigns and share them with people looking for a new or creative challenge.
"""

# ratio = fuzz.token_set_ratio(game_desc, "quick")

# print(ratio)

# with open("../resources/preset_keywords.txt") as file:
#     lines = [line.rstrip() for line in file]

db_connection = sqlite3.connect("../resources/preprocess.db")
db_connection.row_factory = sqlite3.Row 
db_cursor = db_connection.cursor()

# for tagId in range(len(lines)):
#     db_cursor.execute("INSERT INTO Phrases VALUES (?, ?, ?, ?)", (None, tagId + 1, lines[tagId], 0))
# db_connection.commit()


def calculateNgramMatch(n_grams, phrase):
    for n_gram in n_grams:
        joint_candidate_word = " ".join(n_gram)
        ratio = fuzz.token_sort_ratio(joint_candidate_word, phrase)
        if ratio > 89:
            return ratio
    return 0


# db_cursor.execute("select * from GameData WHERE steamId ="+ str(324090))

db_cursor.execute("select * from GameData")

game_data = db_cursor.fetchall()

db_cursor.execute("select * from Phrases where Processed = 0")

phrases = db_cursor.fetchall()


print(len(game_data))
for game_index in range(len(game_data)):
    print(game_index)
    for phrase in phrases:
        game = game_data[game_index]

        phrase_words = phrase["phrase"].split()
        about_game_words = game["about"].split()
        game_review_words = game["reviews"].split()
        about_n_gram_ratio = 0
        review_n_gram_ratio = 0
        about_ratio = 0
        review_ratio = 0
        # print(phrase["phrase"])
        if (len(phrase_words) > 1):
            about_n_grams = list(ngrams(about_game_words, len(phrase_words)))
            review_n_grams = list(ngrams(game_review_words, len(phrase_words)))
            about_n_gram_ratio = calculateNgramMatch(about_n_grams, phrase["phrase"])
            review_n_gram_ratio = calculateNgramMatch(review_n_grams, phrase["phrase"])
            
        else:
            about_ratio  = fuzz.token_set_ratio(game["about"], phrase["phrase"])
            review_ratio = fuzz.token_set_ratio(game["reviews"], phrase["phrase"])
        
        # print(about_n_gram_ratio)
        # print(review_n_gram_ratio)

        # print(about_ratio)
        # print(review_ratio)
        # print("----------")
        if ((about_ratio > 89 or review_ratio > 89) and len(phrase_words) == 1) or ((review_n_gram_ratio > 89  or about_n_gram_ratio > 89) and len(phrase_words) > 1):
            db_cursor.execute("INSERT INTO TaggedGames VALUES (?, ?, ?, ?)", (None, game["steamId"], phrase["tagId"], phrase["id"]))
        db_cursor.execute("UPDATE Phrases SET Processed = 1 WHERE id = "+ str(phrase["id"]))


db_connection.commit()

# make a table with matching phrase for tags, each tag wll have itself as a matching phrase, column preprocessed?t/f

# tags will have an id, which the phrases will be linked with.

# table with game ids
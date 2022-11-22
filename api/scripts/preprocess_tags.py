from fuzzywuzzy import fuzz
import sqlite3

game_desc = """Diamond is a fast paced puzzle game demanding quick reflexes as you control a ball with perpetual vertical momentum through a wealth of various levels. With over 30 individual puzzle components, the goal of destroying gems is rarely ever as simple as matching your color and hitting them.

You'll dodge homing bombs and direct them into explosives, ignite or destroy generators which supply power to force fields, lasers, hazard bricks and color switches, guide spiked bombs to open paths or destroy falling fuses, unleash tornado gems to rip apart whole sections of levels, and far more, all with the ultimate goal of clearing the diamonds and moving on. Feeling competitive? See how you compare to others with leaderboards for every level or level package both official and player created from the workshop.

In addition to over a hundred levels is the same fully featured editor used to create them, complete with integrated Steam Workshop support support so you can seamlessly build levels or even mini-campaigns and share them with people looking for a new or creative challenge.
"""

ratio = fuzz.token_set_ratio(game_desc, "quick")

print(ratio)

with open("../resources/preset_keywords.txt") as file:
    lines = [line.rstrip() for line in file]

db_connection = sqlite3.connect("../resources/preprocess.db")
db_cursor = db_connection.cursor()

for line in lines:
    db_cursor.execute("INSERT INTO Tags VALUES (?, ?)", (None, line))
db_connection.commit()


# make a table with matching phrase for tags, each tag wll have itself as a matching phrase, column preprocessed?t/f

# tags will have an id, which the phrases will be linked with.

# table with game ids
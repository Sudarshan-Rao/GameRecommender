import sqlite3
import json
import re

db_connection = sqlite3.connect("../resources/preprocess.db")
db_cursor = db_connection.cursor()

game_list = []
with open('../resources/game-list.json') as game_list_file:
    game_list = json.load(game_list_file)["applist"]["apps"]

for game in game_list:
    app_id = game["appid"]
    name = game["name"]
    name = re.sub('\W+',' ', name)
    print("UPDATE GameData SET name ='" + name + "' WHERE steamId = "+ str(app_id))
    db_cursor.execute("UPDATE GameData SET name ='" + name + "' WHERE steamId = "+ str(app_id))
    db_connection.commit()

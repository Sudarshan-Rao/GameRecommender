# ../resources/game-list.json holds the list of all games on steam
# The json structure is {"appList": {"apps": [{"appid": int, "name": ""}]}}
# The purpose of this script is to pick up an appid then hit https://store.steampowered.com/api/appdetails?appids=<>
# There is a limit of 200 requests per 5 minutes
# After retrieving the necessary data we will store in a sqlite3 (or csv?) file
# "detailed_description" and "about_the_game" will provide the game data under {"<appid>":{"data":{...}}}

import requests
import json
import sqlite3
from time import sleep
from bs4 import BeautifulSoup

game_list = []
with open('../resources/game-list.json') as game_list_file:
    game_list = json.load(game_list_file)["applist"]["apps"]

db_connection = sqlite3.connect("../resources/preprocess.db")
db_cursor = db_connection.cursor()

url = "https://store.steampowered.com/api/appdetails?key=D0ACA5A3654DEC695239E8B4F18F137D&appids="
headers = {"Accept-Language": "en-US,en;q=0.9"}

data_tuple_list = []

for index in range(1000, 2000):
    appid = str(game_list[index]["appid"])
    responseObject = requests.get(url + appid, headers=headers)

    if "data" not in responseObject.json()[appid]:
        print(responseObject.json())
        continue
    about_the_game_raw = responseObject.json()[appid]["data"]["about_the_game"]
    about_the_game = BeautifulSoup(about_the_game_raw, "lxml").text

    reviews = ""
    if "reviews" in responseObject.json()[appid]["data"]:
        reviews_raw = responseObject.json()[appid]["data"]["reviews"]
        reviews = BeautifulSoup(reviews_raw, "lxml").text

    header_image = responseObject.json()[appid]["data"]["header_image"]

    data_tuple = (appid, about_the_game, reviews, header_image)
    data_tuple_list.append(data_tuple)
    print(index)
    print(appid)
    print(" - sleeping \n")
    sleep(3)

db_cursor.executemany("INSERT INTO GameData VALUES (?,?,?,?)", data_tuple_list)
db_connection.commit()



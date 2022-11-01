# ../resources/game-list.json holds the list of all games on steam
# The json structure is {"appList": {"apps": [{"appid": int, "name": ""}]}}
# The purpose of this script is to pick up an appid then hit https://store.steampowered.com/api/appdetails?appids=<>
# There is a limit of 200 requests per 5 minutes
# After retrieving the necessary datas we will store in a sqlite3 file


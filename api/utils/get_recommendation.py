import sqlite3
import match_tags


class Game_Data:
    app_id: int
    game_desc: str
    image_url: str
    name: str
    error_code: str

    def __init__(self, app_id, game_desc, image_url, name, error_code):
        self.app_id = app_id
        self.game_desc = game_desc
        self.image_url = image_url
        self.name = name
        self.error_code = error_code


class Game_Recommendation_Resp:
    game_recommendation: list


def get_game_with_tags(search_string):
    db_connection = sqlite3.connect("./resources/preprocess.db")
    db_cursor = db_connection.cursor()

    matched_tags = match_tags.get_matching_tags(search_string)
    game_recommendations_ids = []
    for tag_id in matched_tags:
        db_cursor.execute("SELECT appId FROM TaggedGames WHERE tagId = " + str(tag_id))
        game_recommendations_ids.append(db_cursor.fetchone())

    game_recommendations = []
    for app_id in game_recommendations_ids:
        db_cursor.execute("SELECT * FROM GameData WHERE steamId = " + str(app_id[0]))
        game_recommendations.append(db_cursor.fetchone())

    db_cursor.close()
    game_recommendation_resp = Game_Recommendation_Resp()
    game_data_list = []
    for game in game_recommendations:
        game_obj = Game_Data(game[0], game[1], game[3], game[4], '200')
        game_data_list.append(game_obj)

    game_recommendation_resp.game_recommendation = game_data_list
    return game_recommendation_resp


if __name__ == '__main__':
    get_game_with_tags('sports with some action')

import sqlite3
import match_tags
import os.path as pt
import sys
import itertools

db_path = pt.join(pt.split(pt.dirname(pt.abspath(__file__)))[0], 'resources/preprocess.db')
sys.path.insert(1, pt.dirname(pt.abspath(__file__)))


class Game_Data:
    app_id: int
    game_link: str
    image_url: str
    name: str
    error_code: str

    def __init__(self, app_id, game_link, image_url, name, error_code):
        self.app_id = app_id
        self.game_link = game_link
        self.image_url = image_url
        self.name = name
        self.error_code = error_code


class Game_Recommendation_Resp:
    game_recommendation: list
    game_tags: list


def rank_games_based_on_max_matches(all_ids, game_list):
    rank_map = {}
    for game_id in all_ids:
        rank_map[game_id] = 1

    for game_id in all_ids:
        for tags in game_list:
            if game_id in tags:
                rank_map[game_id] = rank_map[game_id] + 1
    rank_map = dict(sorted(rank_map.items(), key=lambda item: item[1]))
    rank_map = dict(reversed(list(rank_map.items())))
    top_fifty = dict(itertools.islice(rank_map.items(), 50))
    return list(top_fifty.keys())


def get_game_with_tags(search_string, debug):
    db_connection = sqlite3.connect(db_path)
    db_cursor = db_connection.cursor()

    matched_tags = match_tags.get_matching_tags(search_string)

    game_recommendations_lists = []
    for tag_id in matched_tags:
        db_cursor.execute("SELECT appId FROM TaggedGames WHERE tagId = " + str(tag_id))
        game_recommendations_lists.append(db_cursor.fetchall())
    game_recommendations_ids = set()
    for game_list in game_recommendations_lists:
        for game_id in game_list:
            game_recommendations_ids.add(game_id)

    ranked_games = rank_games_based_on_max_matches(game_recommendations_ids, game_recommendations_lists)

    game_recommendations = []
    for app_id in ranked_games:
        db_cursor.execute("SELECT * FROM GameData WHERE steamId = " + str(app_id[0]))
        game_recommendations.append(db_cursor.fetchone())

    db_cursor.close()
    game_recommendation_resp = Game_Recommendation_Resp()
    game_data_list = []
    for game in game_recommendations:
        game_link = "https://store.steampowered.com/app/" + str(game[0])
        game_obj = Game_Data(game[0], game_link, game[3], game[4], '200')
        game_data_list.append(game_obj)

    game_recommendation_resp.game_recommendation = game_data_list[:50]
    if debug:
        game_recommendation_resp.game_tags = matched_tags
    return game_recommendation_resp


if __name__ == '__main__':
    get_game_with_tags('open world fps with some action', False)

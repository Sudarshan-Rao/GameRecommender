import steamspypi


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


def get_top10():
    app_ids = ['1938090', '1286580', '1817190', '1063660', '730', '1091500', '570', '1517290']
    game_details = []
    for game in app_ids:
        data_request = dict()
        data_request['request'] = 'appdetails'
        data_request['appid'] = game
        data = steamspypi.download(data_request)
        game_details.append(data)

    top10games = []
    for game in game_details:
        game_obj = Game_Data(game.get('appid'), game.get(''), game.get())

    print(game_details)


if __name__ == '__main__':
    get_top10()

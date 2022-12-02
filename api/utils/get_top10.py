import requests


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


def get_game_details(app_id):
    url = "https://store.steampowered.com/api/appdetails?key=D0ACA5A3654DEC695239E8B4F18F137D&appids=" + app_id

    payload = {}
    headers = {
        'Cookie': 'browserid=3046151904837193756; steamCountry=US%7Cdea22081b619eb0a6da2aa77e0302ce1'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    # print(response.text)
    return response.json()


def get_top10():
    app_ids = ['1938090', '1286580', '1817190', '1063660', '730', '1091500', '570', '1517290', '1811260', '1593500']
    top10 = []
    for app_id in app_ids:
        game = get_game_details(app_id)
        name = game[app_id]['data']['name']
        image_url = game[app_id]['data']['header_image']
        game_link = "https://store.steampowered.com/app/" + str(app_id)
        game_obj = Game_Data(app_id, game_link, image_url, name, 200)
        top10.append(game_obj)
    return top10


if __name__ == '__main__':
    print(get_top10())

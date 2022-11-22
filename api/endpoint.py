from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys

sys.path.append('/Users/sachinvm/Desktop/Purdue Study/Fall 2022/Web Dev/Project/GameRecV2/GameRecommender/api/utils')

from utils import get_recommendation

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8090",
    "http://localhost:8000",
    "http://localhost:8000/login.html?",
    "http://18.188.61.131/ui/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class get_recommendation_req(BaseModel):
    search_string: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/get-recommendation", status_code=200)
def get_recommendations(req: get_recommendation_req):
    search_string = req.search_string
    game_rec_resp = get_recommendation.get_game_with_tags(search_string)
    print(game_rec_resp)
    return game_rec_resp

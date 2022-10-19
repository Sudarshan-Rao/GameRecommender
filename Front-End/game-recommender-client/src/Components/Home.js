import React from 'react'
import { useState } from 'react'

const Home = () => {
    const [search, setSearch] = useState('')
    const [games, setGames] = useState([])
    const [game, setGame] = useState({})
    const [recommendations, setRecommendations] = useState([])
    const [recommendation, setRecommendation] = useState({})
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [userGames, setUserGames] = useState([])
    const [userGame, setUserGame] = useState({})
    const [userRecommendations, setUserRecommendations] = useState([])
    const [userRecommendation, setUserRecommendation] = useState({})
    const [userSearches, setUserSearches] = useState([])
    const [userSearch, setUserSearch] = useState({})

    const handleSearch = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/api/games/search/${search}`)
            .then(res => res.json())
            .then(data => {
                setGames(data)
            })
    }

    const handleGame = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/api/games/${e.target.id}`)
            .then(res => res.json())
            .then(data => {
                setGame(data)
            })
    }

    const handleRecommendation = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/api/recommendations/${e.target.id}`)
            .then(res => res.json())
            .then(data => {
                setRecommendation(data)
            })
    }

    const handleUser = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/api/users/${e.target.id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
    }

    const handleUserGame = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/api/user_games/${e.target.id}`)
            .then(res => res.json())
            .then(data => {
                setUserGame(data)
            })
    }

    const handleUserRecommendation = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/api/user_recommendations/${e.target.id}`)
            .then(res => res.json())
            .then(data => {
                setUserRecommendation(data)
            })
    }

    const handleUserSearch = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/api/user_searches/${e.target.id}`)
            .then(res => res.json())
            .then(data => {
                setUserSearch(data)
            })
    }

    return (
        <div>
            <h1>Home</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
            <div>
                {games.map(game => {
                    return (
                        <div key={game.id}>
                            <h3>{game.name}</h3>
                            <img src={game.image_url} alt={game.name} />
                            <p>{game.description}</p>
                            <button id={game.id} onClick={handleGame}>More Info</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>{game.name}</h3>
                <img src={game.image_url} alt={game.name} />
                <p>{game.description}</p>
                <p>Released: {game.released}</p>
                <p>Rating: {game.rating}</p>
                <p>Playtime: {game.playtime}</p>
                <p>Metacritic: {game.metacritic}</p>
                <p>Website: <a href={game.website}>{game.website}</a></p>
                <p>Genres: {game.genres}</p>
                <p>Platforms: {game.platforms}</p>
                <p>Developers: {game.developers}</p>
                <p>Publishers: {game.publishers}</p>
                <p>Tags: {game.tags}</p>
                <p>Stores: {game.stores}</p>
                <p>Similar Games: {game.similar_games}</p>
                <p>Recommendations: {game.recommendations}</p>
                <p>Added By: {game.added_by}</p>
                <p>Added On: {game.added_on}</p>
                <p>Updated By: {game.updated_by}</p>
                <p>Updated On: {game.updated_on}</p>
            </div>
            <div>
                {recommendations.map(recommendation => {
                    return (
                        <div key={recommendation.id}>
                            <h3>{recommendation.name}</h3>
                            <img src={recommendation.image_url} alt={recommendation.name} />
                            <p>{recommendation.description}</p>
                            <button id={recommendation.id} onClick={handleRecommendation}>More Info</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>{recommendation.name}</h3>
                <img src={recommendation.image_url} alt={recommendation.name} />
                <p>{recommendation.description}</p>
                <p>Released: {recommendation.released}</p>
                <p>Rating: {recommendation.rating}</p>
                <p>Playtime: {recommendation.playtime}</p>
                <p>Metacritic: {recommendation.metacritic}</p>
                <p>Website: <a href={recommendation.website}>{recommendation.website}</a></p>
                <p>Genres: {recommendation.genres}</p>
                <p>Platforms: {recommendation.platforms}</p>
                <p>Developers: {recommendation.developers}</p>
                <p>Publishers: {recommendation.publishers}</p>
                <p>Tags: {recommendation.tags}</p>
                <p>Stores: {recommendation.stores}</p>
                <p>Similar Games: {recommendation.similar_games}</p>
                <p>Recommendations: {recommendation.recommendations}</p>
                <p>Added By: {recommendation.added_by}</p>
                <p>Added On: {recommendation.added_on}</p>
                <p>Updated By: {recommendation.updated_by}</p>
                <p>Updated On: {recommendation.updated_on}</p>
            </div>
            <div>
                {users.map(user => {
                    return (
                        <div key={user.id}>
                            <h3>{user.username}</h3>
                            <p>{user.email}</p>
                            <button id={user.id} onClick={handleUser}>More Info</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <p>Added By: {user.added_by}</p>
                <p>Added On: {user.added_on}</p>
                <p>Updated By: {user.updated_by}</p>
                <p>Updated On: {user.updated_on}</p>
            </div>
            <div>
                {userGames.map(userGame => {
                    return (
                        <div key={userGame.id}>
                            <h3>{userGame.name}</h3>
                            <img src={userGame.image_url} alt={userGame.name} />
                            <p>{userGame.description}</p>
                            <button id={userGame.id} onClick={handleUserGame}>More Info</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>{userGame.name}</h3>
                <img src={userGame.image_url} alt={userGame.name} />
                <p>{userGame.description}</p>
                <p>Released: {userGame.released}</p>
                <p>Rating: {userGame.rating}</p>
                <p>Playtime: {userGame.playtime}</p>
                <p>Metacritic: {userGame.metacritic}</p>
                <p>Website: <a href={userGame.website}>{userGame.website}</a></p>
                <p>Genres: {userGame.genres}</p>
                <p>Platforms: {userGame.platforms}</p>
                <p>Developers: {userGame.developers}</p>
                <p>Publishers: {userGame.publishers}</p>
                <p>Tags: {userGame.tags}</p>
                <p>Stores: {userGame.stores}</p>
                <p>Similar Games: {userGame.similar_games}</p>
                <p>Recommendations: {userGame.recommendations}</p>
                <p>Added By: {userGame.added_by}</p>
                <p>Added On: {userGame.added_on}</p>
                <p>Updated By: {userGame.updated_by}</p>
                <p>Updated On: {userGame.updated_on}</p>
            </div>
            <div>
                {userRecommendations.map(userRecommendation => {
                    return (
                        <div key={userRecommendation.id}>
                            <h3>{userRecommendation.name}</h3>
                            <img src={userRecommendation.image_url} alt={userRecommendation.name} />
                            <p>{userRecommendation.description}</p>
                            <button id={userRecommendation.id} onClick={handleUserRecommendation}>More Info</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>{userRecommendation.name}</h3>
                <img src={userRecommendation.image_url} alt={userRecommendation.name} />
                <p>{userRecommendation.description}</p>
                <p>Released: {userRecommendation.released}</p>
                <p>Rating: {userRecommendation.rating}</p>
                <p>Playtime: {userRecommendation.playtime}</p>
                <p>Metacritic: {userRecommendation.metacritic}</p>
                <p>Website: <a href={userRecommendation.website}>{userRecommendation.website}</a></p>
                <p>Genres: {userRecommendation.genres}</p>
                <p>Platforms: {userRecommendation.platforms}</p>
                <p>Developers: {userRecommendation.developers}</p>
                <p>Publishers: {userRecommendation.publishers}</p>
                <p>Tags: {userRecommendation.tags}</p>
                <p>Stores: {userRecommendation.stores}</p>
                <p>Similar Games: {userRecommendation.similar_games}</p>
                <p>Recommendations: {userRecommendation.recommendations}</p>
                <p>Added By: {userRecommendation.added_by}</p>
                <p>Added On: {userRecommendation.added_on}</p>
                <p>Updated By: {userRecommendation.updated_by}</p>
                <p>Updated On: {userRecommendation.updated_on}</p>
            </div>
        </div>
    )
}

export default Home

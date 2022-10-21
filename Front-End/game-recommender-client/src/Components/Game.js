import React from 'react'
import { useState } from 'react'

const Game = () => {
    const [game, setGame] = useState({
        name: '',
        description: '',
        image: '',
        rating: '',
        genre: '',
        platform: '',
        release_date: '',
        developer: '',
        publisher: '',
        website: '',
        id: ''
    })

    const handleChange = (event) => {
        setGame({...game, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:5000/api/games', {
            method: 'POST',
            body: JSON.stringify(game),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    }
  return (
    <div>
        <h1>Game</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={game.name} onChange={handleChange} />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={game.description} onChange={handleChange} />
            <label htmlFor="image">Image</label>
            <input type="text" name="image" value={game.image} onChange={handleChange} />
            <label htmlFor="rating">Rating</label>
            <input type="text" name="rating" value={game.rating} onChange={handleChange} />
            <label htmlFor="genre">Genre</label>
            <input type="text" name="genre" value={game.genre} onChange={handleChange} />
            <label htmlFor="platform">Platform</label>
            <input type="text" name="platform" value={game.platform} onChange={handleChange} />
            <label htmlFor="release_date">Release Date</label>
            <input type="text" name="release_date" value={game.release_date} onChange={handleChange} />
            <label htmlFor="developer">Developer</label>
            <input type="text" name="developer" value={game.developer} onChange={handleChange} />
            <label htmlFor="publisher">Publisher</label>
            <input type="text" name="publisher" value={game.publisher} onChange={handleChange} />
            <label htmlFor="website">Website</label>
            <input type="text" name="website" value={game.website} onChange={handleChange} />
            <label htmlFor="id">ID</label>
            <input type="text" name="id" value={game.id} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Game

import React from 'react'
import { useState } from 'react'

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([])
    const [search, setSearch] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://api.rawg.io/api/games?search=${search}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                setError(true)
            } else {
                setRecommendations(data.results)
                setError(false)
            }
        })
        .catch(error => console.error(error))
    }

    return (
        <div>
            <h1>Recommendations</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" value={search} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            {error && <p>No results found</p>}
            {recommendations.map(recommendation => (
                <div key={recommendation.id}>
                    <h2>{recommendation.name}</h2>
                    <img src={recommendation.background_image} alt={recommendation.name} />
                    <p>Rating: {recommendation.rating}</p>
                    <p>Released: {recommendation.released}</p>
                </div>
            ))}
        </div>
    )
}

export default Recommendations

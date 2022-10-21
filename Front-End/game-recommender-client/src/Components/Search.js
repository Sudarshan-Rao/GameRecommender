import React from 'react'

import { useState } from 'react'

const Search = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
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
                setResults(data.results)
                setError(false)
            }
        })
        .catch(error => console.error(error))
    }

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" value={search} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            {error && <p>No results found</p>}
            {results.map(result => (
                <div key={result.id}>
                    <h2>{result.name}</h2>
                    <img src={result.background_image} alt={result.name} />
                    <p>Rating: {result.rating}</p>
                    <p>Released: {result.released}</p>
                </div>
            ))}
        </div>
    )
}

export default Search

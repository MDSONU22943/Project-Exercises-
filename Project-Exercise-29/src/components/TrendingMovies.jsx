import { useState, useEffect } from 'react'
import MovieGrid from './MovieGrid'
import { fetchTrendingMovies } from '../utils/tmdbApi'

function TrendingMovies({ onSelectMovie }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true)
        const data = await fetchTrendingMovies()
        setMovies(data)
        setError(null)
      } catch (err) {
        setError('Failed to load trending movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadTrendingMovies()
  }, [])

  if (loading) {
    return <div className="loading">Loading trending movies...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="trending-container">
      <h2>Trending Now</h2>
      <MovieGrid movies={movies} onSelectMovie={onSelectMovie} />
    </div>
  )
}

export default TrendingMovies

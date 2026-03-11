import { useState, useEffect, useMemo } from 'react'
import MovieGrid from './MovieGrid'
import { searchMovies } from '../utils/tmdbApi'

function MovieListAdvanced({ movies, onSelectMovie }) {
  const [filters, setFilters] = useState({
    sortBy: 'popularity',
    genres: [],
    yearFrom: 2015,
    yearTo: 2024
  })

  const [filteredMovies, setFilteredMovies] = useState(movies)

  // Memoize the filtering logic
  const applyFilters = useMemo(() => {
    return (moviesToFilter) => {
      return moviesToFilter.filter((movie) => {
        const year = new Date(movie.releaseDate).getFullYear()
        return year >= filters.yearFrom && year <= filters.yearTo
      })
    }
  }, [filters.yearFrom, filters.yearTo])

  useEffect(() => {
    const filtered = applyFilters(movies)
    setFilteredMovies(filtered)
  }, [movies, applyFilters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="advanced-search-container">
      <div className="filters-section">
        <h3>Advanced Filters</h3>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="release-date">Release Date</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="yearFrom">Year From:</label>
          <input
            id="yearFrom"
            type="number"
            min="1900"
            max="2024"
            value={filters.yearFrom}
            onChange={(e) => handleFilterChange('yearFrom', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="yearTo">Year To:</label>
          <input
            id="yearTo"
            type="number"
            min="1900"
            max="2024"
            value={filters.yearTo}
            onChange={(e) => handleFilterChange('yearTo', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="movies-section">
        <h3>Results ({filteredMovies.length})</h3>
        <MovieGrid movies={filteredMovies} onSelectMovie={onSelectMovie} />
      </div>
    </div>
  )
}

export default MovieListAdvanced

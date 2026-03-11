import { memo } from 'react'
import MovieCard from './MovieCard'

const MovieGrid = memo(({ movies, onSelectMovie }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-grid">
        <p>No movies to display</p>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={() => onSelectMovie(movie)}
        />
      ))}
    </div>
  )
})

MovieGrid.displayName = 'MovieGrid'

export default MovieGrid

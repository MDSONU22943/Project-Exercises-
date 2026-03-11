import { memo } from 'react'

const MovieCard = memo(({ movie, onSelect }) => {
  // Memoized callback to prevent inline function creation
  const handleClick = () => onSelect()

  return (
    <div className="movie-card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="movie-poster">
        {movie.posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
            alt={movie.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="poster-placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-metadata">
          <span className="rating">⭐ {movie.rating?.toFixed(1) || 'N/A'}</span>
          <span className="year">
            {new Date(movie.releaseDate).getFullYear() || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard

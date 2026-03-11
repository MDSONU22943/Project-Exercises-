import { memo } from 'react'

const MovieDetails = memo(({ movie, onClose }) => {
  if (!movie) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-body">
          <div className="modal-poster">
            {movie.posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
              />
            ) : (
              <div className="poster-placeholder-large">No Image</div>
            )}
          </div>

          <div className="modal-info">
            <h2>{movie.title}</h2>
            
            <div className="details-grid">
              <div className="detail-item">
                <strong>Rating:</strong>
                <span>⭐ {movie.rating?.toFixed(1) || 'N/A'}/10</span>
              </div>
              <div className="detail-item">
                <strong>Release Date:</strong>
                <span>{movie.releaseDate || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <strong>Popularity:</strong>
                <span>{movie.popularity?.toFixed(0) || 'N/A'}</span>
              </div>
            </div>

            <div className="description">
              <strong>Overview:</strong>
              <p>{movie.overview || 'No description available.'}</p>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="genres">
                <strong>Genres:</strong>
                <div className="genre-tags">
                  {movie.genres.map((genre) => (
                    <span key={genre} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

MovieDetails.displayName = 'MovieDetails'

export default MovieDetails

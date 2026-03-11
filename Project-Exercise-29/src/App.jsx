import { lazy, Suspense, useMemo, useCallback, useState } from 'react'
import './App.css'
import './components/components.css'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'
import MovieDetails from './components/MovieDetails'
import PerformanceMetrics from './components/PerformanceMetrics'

// Code splitting: Lazy load heavy components
const MovieListAdvanced = lazy(() => import('./components/MovieListAdvanced'))
const TrendingMovies = lazy(() => import('./components/TrendingMovies'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>Loading component...</p>
  </div>
)

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState('trending')
  const [showMetrics, setShowMetrics] = useState(false)

  // Memoize the search callback to prevent unnecessary re-renders
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      // Simulate API call - replace with actual TMDB API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setSearchResults([])
      setActiveTab('search')
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Memoize the movie selection handler
  const handleSelectMovie = useCallback((movie) => {
    setSelectedMovie(movie)
  }, [])

  // Memoize the close handler
  const handleCloseDetails = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  // Memoize component props to prevent unnecessary re-renders
  const searchBarProps = useMemo(() => ({
    onSearch: handleSearch,
    isLoading: isSearching
  }), [handleSearch, isSearching])

  const movieGridProps = useMemo(() => ({
    movies: searchResults,
    onSelectMovie: handleSelectMovie
  }), [searchResults, handleSelectMovie])

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🎬 TMDB Movie Discovery</h1>
          <p>Performance Optimized with Code Splitting & Memoization</p>
        </div>
        <button
          className="metrics-btn"
          onClick={() => setShowMetrics(!showMetrics)}
          title="Toggle performance metrics"
        >
          📊 Metrics
        </button>
      </header>

      {showMetrics && <PerformanceMetrics />}

      <div className="search-section">
        <SearchBar {...searchBarProps} />
      </div>

      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </button>
        <button
          className={`tab-btn ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced Search
        </button>
      </nav>

      <main className="main-content">
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={handleCloseDetails}
          />
        )}

        {activeTab === 'trending' && (
          <Suspense fallback={<LoadingFallback />}>
            <TrendingMovies onSelectMovie={handleSelectMovie} />
          </Suspense>
        )}

        {activeTab === 'advanced' && (
          <Suspense fallback={<LoadingFallback />}>
            <MovieListAdvanced {...movieGridProps} />
          </Suspense>
        )}

        {activeTab === 'search' && searchResults.length > 0 && (
          <MovieGrid {...movieGridProps} />
        )}

        {activeTab === 'search' && searchResults.length === 0 && !isSearching && (
          <div className="empty-state">
            <p>No movies found. Try searching for your favorite movie!</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

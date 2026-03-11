// Mock TMDB API functions
// Replace API_KEY and BASE_URL with your actual TMDB credentials
// Get your free API key from: https://www.themoviedb.org/settings/api
// Add your API key to the .env file: VITE_TMDB_API_KEY=your_key_here

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE'
const BASE_URL = 'https://api.themoviedb.org/3/authentication

// Cache for API responses
const apiCache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getCacheKey(endpoint, params) {
  return `${endpoint}?${new URLSearchParams(params).toString()}`
}

function isCacheValid(timestamp) {
  return Date.now() - timestamp < CACHE_DURATION
}

async function fetchAPI(endpoint, params = {}) {
  const cacheKey = getCacheKey(endpoint, params)

  // Check cache first
  if (apiCache.has(cacheKey)) {
    const cached = apiCache.get(cacheKey)
    if (isCacheValid(cached.timestamp)) {
      return cached.data
    }
  }

  // Check if API key is configured
  if (!API_KEY || API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
    throw new Error('TMDB API key not configured. Please add your API key to the .env file.')
  }

  try {
    const queryParams = new URLSearchParams({
      api_key: API_KEY,
      ...params
    })

    const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`)

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText} (Status: ${response.status})`)
    }

    const data = await response.json()

    // Store in cache
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

// Get trending movies
export async function fetchTrendingMovies() {
  try {
    const data = await fetchAPI('/trending/movie/week', {
      language: 'en-US'
    })

    return mapMovieData(data.results || [])
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    return getMockMovies()
  }
}

// Search movies
export async function searchMovies(query) {
  if (!query) return []

  try {
    const data = await fetchAPI('/search/movie', {
      query,
      language: 'en-US',
      page: 1
    })

    return mapMovieData(data.results || [])
  } catch (error) {
    console.error('Error searching movies:', error)
    return getMockMovies()
  }
}

// Get movie details
export async function fetchMovieDetails(movieId) {
  try {
    const data = await fetchAPI(`/movie/${movieId}`, {
      language: 'en-US'
    })

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      posterPath: data.poster_path,
      backdroppPath: data.backdrop_path,
      rating: data.vote_average,
      releaseDate: data.release_date,
      popularity: data.popularity,
      genres: data.genres?.map(g => g.name) || [],
      runtime: data.runtime,
      budget: data.budget,
      revenue: data.revenue,
      status: data.status
    }
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

// Helper function to map API response to our data structure
function mapMovieData(movies) {
  return movies.map(movie => ({
    id: movie.id,
    title: movie.title || movie.name,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdroppPath: movie.backdrop_path,
    rating: movie.vote_average,
    releaseDate: movie.release_date || movie.first_air_date,
    popularity: movie.popularity
  }))
}

// Mock data for demonstration (when API key is not configured)
function getMockMovies() {
  return [
    {
      id: 1,
      title: 'Inception',
      overview: 'A skilled thief who steals corporate secrets through the use of dream-sharing technology.',
      posterPath: '/9gk7adHYeDMwZC0L91d7LswusTa.jpg',
      rating: 8.8,
      releaseDate: '2010-07-16',
      popularity: 23.5
    },
    {
      id: 2,
      title: 'The Matrix',
      overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
      posterPath: '/f89U3ADr1oMo5c6JF8D3xfBk9S1.jpg',
      rating: 8.7,
      releaseDate: '1999-03-31',
      popularity: 22.1
    },
    {
      id: 3,
      title: 'Interstellar',
      overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      rating: 8.7,
      releaseDate: '2014-11-07',
      popularity: 24.8
    },
    {
      id: 4,
      title: 'The Dark Knight',
      overview: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc on Gotham.',
      posterPath: '/1hqwGsggAfhr7l3f6xenf8Z0qNZ.jpg',
      rating: 9.0,
      releaseDate: '2008-07-18',
      popularity: 25.3
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence.',
      posterPath: '/3auQmYAYxvl6LFBZ8q0Z8tM0Hsb.jpg',
      rating: 8.9,
      releaseDate: '1994-10-14',
      popularity: 21.7
    },
    {
      id: 6,
      title: 'Fight Club',
      overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.',
      posterPath: '/pB8BM7pdSp2xfuychbRlkLkeVrh.jpg',
      rating: 8.8,
      releaseDate: '1999-10-15',
      popularity: 23.2
    }
  ]
}

// Clear cache function
export function clearAPICache() {
  apiCache.clear()
}

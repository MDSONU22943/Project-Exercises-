# Project Exercise 29: TMDB Movie Discovery App - Performance Optimization

## 🎯 Project Overview

A comprehensive React application built with Vite that demonstrates advanced performance optimization techniques. The app fetches movie data from the TMDB (The Movie Database) API and showcases best practices for building high-performance React applications.

## 📚 Key Features & Performance Optimizations

### 1. **Code Splitting with React.lazy & Suspense**
- `TrendingMovies` component lazy-loaded
- `MovieListAdvanced` component lazy-loaded
- Components only loaded when accessed via tab navigation
- Reduces initial bundle size significantly

```jsx
const MovieListAdvanced = lazy(() => import('./components/MovieListAdvanced'))
const TrendingMovies = lazy(() => import('./components/TrendingMovies'))

<Suspense fallback={<LoadingFallback />}>
  <TrendingMovies onSelectMovie={handleSelectMovie} />
</Suspense>
```

### 2. **Memoization with React.memo**
- `MovieCard`, `SearchBar`, `MovieGrid`, `MovieDetails` wrapped with `React.memo`
- Prevents unnecessary re-renders when props haven't changed
- Significant performance boost for lists with many items

```jsx
const MovieCard = memo(({ movie, onSelect }) => {
  // Component only re-renders if movie or onSelect changes
})
```

### 3. **Callback Optimization with useCallback**
- `handleSearch`, `handleSelectMovie`, `handleCloseDetails` memoized
- Prevents child components from re-rendering due to function reference changes
- Maintains callback stability across renders

```jsx
const handleSearch = useCallback(async (query) => {
  // API call logic
}, [])
```

### 4. **Caching with useMemo**
- Component props memoized to prevent object recreation
- Filter logic memoized
- Heavy computations cached and only recalculated when dependencies change

```jsx
const movieGridProps = useMemo(() => ({
  movies: searchResults,
  onSelectMovie: handleSelectMovie
}), [searchResults, handleSelectMovie])
```

### 5. **API Caching System**
- Response caching with 5-minute TTL
- Prevents redundant network requests
- Cache key generation based on endpoint and parameters
- Fallback to mock data for demonstration

```javascript
const apiCache = new Map()
const CACHE_DURATION = 5 * 60 * 1000

if (apiCache.has(cacheKey) && isCacheValid(cached.timestamp)) {
  return cached.data
}
```

### 6. **Performance Monitoring**
- Core Web Vitals tracking:
  - **FCP** (First Contentful Paint)
  - **LCP** (Largest Contentful Paint)
  - **TTFB** (Time to First Byte)
  - **CLS** (Cumulative Layout Shift)
- Real-time performance metrics display
- PerformanceObserver API integration

### 7. **Image Optimization**
- Lazy loading with `loading="lazy"` attribute
- Async decoding with `decoding="async"`
- Responsive image sizing from TMDB
- WebP format support

```jsx
<img
  src={imageUrl}
  loading="lazy"
  decoding="async"
  alt={title}
/>
```

### 8. **Build Optimization (Vite Config)**
- Manual code splitting for vendor chunks
- React and DOM bundled together
- Axios in separate chunk
- ES2020 build target
- Terser minification with console removal

```javascript
rollupOptions: {
  output: {
    manualChunks: {
      'react-vendor': ['react', 'react-dom'],
      'api': ['axios']
    }
  }
}
```

## 🏗️ Project Structure

```
Project-Exercise-29/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          (memo optimized)
│   │   ├── MovieGrid.jsx          (memo optimized)
│   │   ├── MovieCard.jsx          (memo optimized)
│   │   ├── MovieDetails.jsx       (memo optimized)
│   │   ├── TrendingMovies.jsx     (lazy loaded)
│   │   ├── MovieListAdvanced.jsx  (lazy loaded)
│   │   ├── PerformanceMetrics.jsx (Core Web Vitals)
│   │   └── components.css         (all component styles)
│   ├── hooks/
│   │   └── useMovieData.js        (custom data hooks)
│   ├── utils/
│   │   └── tmdbApi.js             (API calls with caching)
│   ├── App.jsx                     (main app with code splitting)
│   ├── App.css                     (global styles)
│   ├── index.css                   (base styles)
│   └── main.jsx                    (entry point)
├── package.json
├── vite.config.js                  (build optimization)
├── eslint.config.js
├── index.html
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- TMDB API key (free from https://www.themoviedb.org/settings/api)

### Installation

```bash
cd Project-Exercise-29
npm install
```

### Configuration

1. Get your free TMDB API key from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Update `src/utils/tmdbApi.js`:

```javascript
const API_KEY = 'YOUR_ACTUAL_API_KEY_HERE'
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔍 Performance Analysis Tools

### Chrome DevTools

1. **Performance Tab:**
   - Record page load
   - Analyze frame rate and rendering
   - Identify bottlenecks in components

2. **Lighthouse:**
   - Run audit for performance, accessibility, SEO
   - Get optimization suggestions
   - Track Core Web Vitals

3. **Coverage Tab:**
   - Identify unused JavaScript and CSS
   - Optimize bundle size
   - Remove unused dependencies

4. **React DevTools:**
   - Enable Highlight Updates When Components Render
   - Use Profiler to measure component render times
   - Identify unnecessary re-renders

### Built-in Performance Metrics

Click the "📊 Metrics" button in the app header to see real-time Core Web Vitals:
- **FCP**: When first text/content paints
- **LCP**: When largest content element paints
- **TTFB**: Server response time
- **CLS**: Unexpected layout shifts

## 📊 Performance Optimization Techniques Used

| Technique | Benefit | Implementation |
|-----------|---------|-----------------|
| Code Splitting | Reduces initial bundle | React.lazy + Suspense |
| Memoization | Prevents re-renders | React.memo |
| useCallback | Stable references | Callback optimization |
| useMemo | Caches computation | Props & filter memoization |
| API Caching | Reduces server requests | Map-based cache with TTL |
| Image Lazy Loading | Faster initial load | loading="lazy" attribute |
| Vite Bundling | Faster builds | Manual code splitting |
| Tree Shaking | Smaller bundle | ES modules + Terser |

## 🎓 Learning Outcomes

By working through this project, you'll understand:

1. **Advanced React Patterns:**
   - When and how to use React.memo
   - useCallback for preventing re-renders
   - useMemo for computational efficiency

2. **Code Splitting Strategies:**
   - Route-based code splitting
   - Feature-based lazy loading
   - Suspense boundaries and fallbacks

3. **API Integration:**
   - Async/await patterns
   - Error handling and fallbacks
   - Response caching strategies

4. **Performance Monitoring:**
   - Core Web Vitals tracking
   - PerformanceObserver API
   - Real-time metrics visualization

5. **Build Optimization:**
   - Vite configuration
   - Manual code splitting
   - Production build optimization

## 🔧 Customization Ideas

1. **Add Filters:**
   - Genre filtering with API integration
   - Rating range filter
   - Release year filter

2. **Enhance Caching:**
   - IndexedDB for persistent storage
   - Service Worker for offline support
   - Automatic cache invalidation

3. **Advanced Features:**
   - Infinite scroll pagination
   - Favorites/watchlist (localStorage)
   - Movie recommendations
   - Cast and crew information

4. **Performance Improvements:**
   - Virtual scrolling for large lists
   - Image preloading strategy
   - Progressive loading with skeleton screens
   - Web Worker for heavy calculations

## 📚 TMDB API Resources

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Image Configuration](https://developer.themoviedb.org/docs/image-configuration)
- [Trending Endpoint](https://developer.themoviedb.org/reference/trending-movies)
- [Search Movies](https://developer.themoviedb.org/reference/search-movie)

## 🎯 Performance Targets

Aim for these metrics with optimizations:

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to Interactive (TTI):** < 3.8s
- **Bundle Size:** < 150KB (gzipped)

## 📝 Notes

- The app includes mock data for demonstration when TMDB API key is not configured
- All API responses are cached for 5 minutes to reduce network requests
- Components use lazy loading to improve initial page load
- Memoization prevents unnecessary re-renders of expensive components

## 🏆 Challenge Tasks

1. Implement infinite scroll for movie lists
2. Add a watchlist feature with localStorage persistence
3. Create a dark/light theme toggle with performance considerations
4. Implement virtual scrolling for large lists
5. Add search debouncing (hint: custom hook in useMovieData.js)
6. Create a performance comparison report before/after optimizations
7. Implement Service Worker for offline support

Enjoy building and optimizing! 🚀

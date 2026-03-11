# TMDB API Integration Guide

## Getting Your Free TMDB API Key

### Step 1: Visit TMDB Website
Go to https://www.themoviedb.org/

### Step 2: Create an Account
- Click "Join the Community"
- Fill in your details (email, password, username)
- Verify your email address

### Step 3: Request an API Key
- Go to Settings > API Settings
- Agree to the terms
- Accept the API License Agreement
- Select "Developer" as your application type
- Fill in the API Application Form

### Step 4: Copy Your API Key
- After approval, you'll see your API key
- Copy it carefully

### Step 5: Add to Project
Update `src/utils/tmdbApi.js`:

```javascript
// Before:
const API_KEY = 'YOUR_TMDB_API_KEY_HERE'

// After:
const API_KEY = 'your_actual_api_key_here'
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## API Endpoints Used

### Trending Movies
```
GET /trending/movie/week
```
Returns trending movies for the current week

### Search Movies
```
GET /search/movie?query={query}
```
Search for movies by title

### Movie Details
```
GET /movie/{movie_id}
```
Get detailed information about a specific movie

## Performance Testing

### Using Lighthouse
1. Open DevTools (F12)
2. Click the "Lighthouse" tab
3. Click "Analyze page load"
4. Review the report

### Using Performance Tab
1. Open DevTools (F12)
2. Click "Performance" tab
3. Click record button
4. Interact with the app
5. Click stop to view the recording
6. Analyze the flame chart

### Check Core Web Vitals in App
- Click "📊 Metrics" button in header
- View real-time Core Web Vitals measurements

## Troubleshooting

### "API Error: Invalid API key"
- Verify your API key is correct in `src/utils/tmdbApi.js`
- Check that your API key is activated
- Ensure you're not rate limited (10 requests per second limit)

### Images Not Loading
- The app falls back to mock data if images can't load
- Check TMDB image CDN status
- Use the poster placeholder feature

### Slow Load Times
- Check your internet connection
- Clear browser cache
- Try the mock data feature
- Use Chrome DevTools to identify bottlenecks

## Performance Optimization Tips

### Local Development
- Use Chrome DevTools Performance tab
- React Developer Tools for profiling
- Check Console for warnings

### Production Build
- Run `npm run build`
- Check bundle size: `npm ls`
- Use `npm run preview` to test production build

### Monitoring
- Use Lighthouse regularly
- Track Core Web Vitals
- Monitor API response times
- Check memory usage

## Next Steps

After getting the app running:
1. Try filtering movies by year
2. Search for your favorite movies
3. Click on a movie to see details
4. Check the performance metrics
5. Use DevTools to profile components
6. Try the advanced filters
7. Experiment with the code splitting by checking Network tab

Good luck! 🎬

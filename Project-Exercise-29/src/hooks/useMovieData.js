import { useState, useEffect, useCallback, useRef } from 'react'

// Custom hook for fetching data with caching
export function useFetchMovies(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const cacheRef = useRef({})

  const fetchData = useCallback(async () => {
    // Check cache first
    if (cacheRef.current[url]) {
      setData(cacheRef.current[url])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(url, {
        method: 'GET',
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      cacheRef.current[url] = result
      setData(result)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error }
}

// Custom hook for debounced search
export function useDebouncedSearch(searchFn, delay = 500) {
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])
  const timeoutRef = useRef(null)

  const handleSearch = useCallback((query) => {
    setValue(query)

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (query.trim()) {
        searchFn(query).then(setResults)
      } else {
        setResults([])
      }
    }, delay)
  }, [searchFn, delay])

  return { value, results, handleSearch }
}

// Custom hook for persisting component state to localStorage
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

// Custom hook for infinite scroll
export function useInfiniteScroll(fetchMore, options = {}) {
  const { threshold = 0.1 } = options
  const observerTarget = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore()
        }
      },
      { threshold }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [fetchMore, threshold])

  return observerTarget
}

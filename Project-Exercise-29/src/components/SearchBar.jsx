import { memo, useState } from 'react'

const SearchBar = memo(({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={handleChange}
          disabled={isLoading}
          className="search-input"
        />
        {query && (
          <button
            className="clear-btn"
            onClick={handleClear}
            disabled={isLoading}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {isLoading && <p className="searching">Searching...</p>}
    </div>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar

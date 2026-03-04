import { useState } from "react"
import MovieList from "./components/MovieList"
function App() {

    const [movies, setMovies] = useState([
       { title: "Inception", rating: 8.8 },
    { title: "Interstellar", rating: 8.6 },
    { title: "The Dark Knight", rating: 9.0 }
    ])

    
    const addMovie = () => {
    const newMovie = {
      title: "New Movie " + (movies.length + 1),
      rating: (Math.random() * 10).toFixed(1)
    };

    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };
    
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <button
        onClick={addMovie}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add Movie
      </button>
      <MovieList movies={movies} deleteMovie={deleteMovie} />
    </div>
  )
}

export default App

import MovieCard from "./components/MovieCard";

function App() {

  const movie = {
    title: "Inception",
    image: "https://picsum.photos/400/300",
    description: "A mind-bending thriller about dream invasion.",
    rating: 8.8
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MovieCard movie={movie} />
    </div>
  );
}

export default App;
import MovieCard from "./MovieCard";

function MovieList({movies, deleteMovie}){
   return (
    <div>
        {movies.map((movie,index)=>{
            return <MovieCard key={index} title={movie.title} rating={movie.rating} onDelete={()=>deleteMovie(index)}/>
        })}
    </div>
   )
}

export default MovieList;
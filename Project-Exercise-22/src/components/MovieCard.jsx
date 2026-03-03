import { motion } from "framer-motion";
import styles from "./MovieCard.module.css";

function MovieCard({movie}){
    const isHighRated = movie.rating >=8;

    return (
        <motion.div
        className={`${styles.card} shadow-lg`}
        whileHover={{ scale: 1.05 }}
        transition={{type:"spring", stiffness: 200}}
        >
        <img 
        src={movie.image} 
        alt={movie.title} 
        className="w-full h-60 object-cover rounded-t-lg"
      />

      <div className="p-4">

        <h2 className="text-xl font-bold mb-2">
          {movie.title}
        </h2>

        <p className="text-gray-600 text-sm mb-3">
          {movie.description}
        </p>

        <div className="flex justify-between items-center">

          <span 
            className={`px-3 py-1 rounded-full text-white text-sm ${
              isHighRated ? "bg-green-500" : "bg-red-500"
            }`}
          >
            ⭐ {movie.rating}
          </span>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            Watch Now
          </button>

        </div>

      </div>
    </motion.div>
    )
}

export default MovieCard;

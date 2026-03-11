import axios from "axios";

const API_KEY = "08c26dd019f72e93ebc66942f24adb74";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query) => {
  try {

    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    const res = await axios.get(url);
    console.log("TMDB API Response:", res.data);

    return res.data.results;

  } catch (err) {
    console.error("TMDB API Error:", err.message);
    return [];
  }
};

fetchMovies("Inception");
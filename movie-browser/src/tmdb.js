// import axios from 'axios';

// const API_KEY = '7bf17664e0354c76d47958bcbc54d9b1';
// const BASE_URL = 'https://api.themoviedb.org/3';

// const tmdb = axios.create({
//   baseURL: BASE_URL,
//   params: {
//     api_key: API_KEY,
//   },
// });

// export const searchMovie = (query) => {
//   return tmdb.get('/search/movie', {
//     params: {
//       query,
//     },
//   });
// };
import axios from "axios";

const API_KEY = "7bf17664e0354c76d47958bcbc54d9b1";
// process.env.REACT_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovie = (query, page = 1) => {
  return tmdb.get("/search/movie", {
    params: { query, page },
  });
};

export const fetchGenres = () => {
  return tmdb.get("/genre/movie/list");
};

export const fetchPopularMovies = (page = 1) => {
  return tmdb.get("/movie/popular", {
    params: { page },
  });
};

export const discoverMovie = (page = 1, filters = {}) => {
  return tmdb.get("/discover/movie", {
    params: { page, ...filters },
  });
};

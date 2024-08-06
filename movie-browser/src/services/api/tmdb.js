import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const REACT_API_KEY = "YOUR_KEY";

const tmdb = axios.create({
  baseURL: process.env.BASE_URL || BASE_URL,
  params: {
    api_key: process.env.REACT_API_KEY || REACT_API_KEY,
  },
});

export const searchMovie = (query, page = 1, filters = {}) => {
  return tmdb.get("/search/movie", {
    params: { query, page, ...filters },
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

export const fetchTopRatedMovies = () => {
  return tmdb.get("/movie/top_rated", {
    params: { page: 1 },
  });
};

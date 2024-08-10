import axios from "axios";

// Base URL for The Movie Database API
const BASE_URL = "https://api.themoviedb.org/3";
// Your API key (keep it secure and replace with your actual key)
const REACT_API_KEY = "YOUR_KEY";

// Create an Axios instance for The Movie Database API with default configuration
const tmdb = axios.create({
  baseURL: process.env.BASE_URL || BASE_URL,
  params: {
    api_key: process.env.REACT_API_KEY || REACT_API_KEY,
  },
});

/**
 * Search for movies based on query, page, and filters.
 * 
 * @param {string} query - The search query string.
 * @param {number} [page=1] - The page number for pagination.
 * @param {object} [filters={}] - Additional filters to apply to the search.
 * @returns {Promise} - Axios promise with the search results.
 */
export const searchMovie = (query, page = 1, filters = {}) => {
  return tmdb.get("/search/movie", {
    params: { query, page, ...filters },
  });
};

/**
 * Fetch the list of movie genres.
 * 
 * @returns {Promise} - Axios promise with the list of genres.
 */
export const fetchGenres = () => {
  return tmdb.get("/genre/movie/list");
};

/**
 * Fetch popular movies for a specific page.
 * 
 * @param {number} [page=1] - The page number for pagination.
 * @returns {Promise} - Axios promise with the list of popular movies.
 */
export const fetchPopularMovies = (page = 1) => {
  return tmdb.get("/movie/popular", {
    params: { page },
  });
};

/**
 * Discover movies based on page and filters.
 * 
 * @param {number} [page=1] - The page number for pagination.
 * @param {object} [filters={}] - Additional filters to apply to the discovery.
 * @returns {Promise} - Axios promise with the list of discovered movies.
 */
export const discoverMovie = (page = 1, filters = {}) => {
  return tmdb.get("/discover/movie", {
    params: { page, ...filters },
  });
};

/**
 * Fetch the top-rated movies.
 * 
 * @returns {Promise} - Axios promise with the list of top-rated movies.
 */
export const fetchTopRatedMovies = () => {
  return tmdb.get("/movie/top_rated", {
    params: { page: 1 },
  });
};

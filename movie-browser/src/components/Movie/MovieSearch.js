import React, { useState, useEffect } from "react";
import { discoverMovie, searchMovie } from "../../services/api/tmdb";
import Filters from "./Filters";
import RegularList from "../common/Lists/RegularList";
import LargeMovieList from "../common/Lists/LargeMovieList";
import useDebounce from "../../hooks/useDebounce";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Debounce filters to optimize API calls
  const debouncedFilters = useDebounce(filters, 500); // 500ms debounce delay

  // Fetch movies when query, filters, or page changes
  useEffect(() => {
    if (query) {
      searchMovies();
    } else {
      discoverMovies();
    }
  }, [query, debouncedFilters, page]);

  // Function to search for movies based on the query
  const searchMovies = async () => {
    try {
      const response = await searchMovie(query, page, debouncedFilters);
      if (response.data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setHasMore(response.data.results.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Function to discover movies with current filters
  const discoverMovies = async () => {
    try {
      const response = await discoverMovie(page, debouncedFilters);
      if (response.data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setHasMore(response.data.results.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Update query state and reset pagination when search input changes
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setMovies([]); // Clear current movies
    setPage(1); // Reset page to first page
    setHasMore(true); // Reset hasMore to true
  };

  // Update filters and reset pagination when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setMovies([]); // Clear current movies
    setPage(1); // Reset page to first page
    setHasMore(true); // Reset hasMore to true
  };

  // Handle scroll events to show "Back to Top" button and load more movies
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Show "Back to Top" button when scrolled down 300px
    setShowBackToTop(scrollTop > 300);

    // Load more movies when scrolled near bottom
    if (scrollTop + windowHeight >= documentHeight - 200 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // Scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mb-3 text-light bg-dark p-4 rounded">
      <div className="row mb-3 justify-content-center">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={handleSearch}
            placeholder="Search for a movie"
            aria-label="Search for a movie"
            aria-describedby="search-addon"
          />
        </div>
        <div className="col-auto d-flex align-items-center">
          <Filters onChange={handleFilterChange} />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        <RegularList
          items={movies}
          resourceName="movie"
          itemComponent={LargeMovieList}
        />
      </div>
      {showBackToTop && (
        <button
          className="btn btn-outline-light position-fixed bottom-50 w-auto end-0 m-3"
          onClick={scrollToTop}
          aria-label="Scroll up"
        >
          ^
        </button>
      )}
    </div>
  );
};

export default MovieSearch;

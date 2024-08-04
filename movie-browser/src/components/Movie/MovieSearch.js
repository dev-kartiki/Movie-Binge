import React, { useState, useEffect, useCallback } from "react";
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

  const debouncedFilters = useDebounce(filters, 500); // 500ms debounce delay

  useEffect(() => {
    if (query) {
      searchMovies();
    } else {
      discoverMovies();
    }
  }, [query, debouncedFilters, page]);

  const searchMovies = async () => {
    try {
      const response = await searchMovie(query, page);
      if (response.data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const discoverMovies = async () => {
    try {
      const response = await discoverMovie(page, debouncedFilters);
      if (response.data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Show "Back to Top" button when scrolled down 300px
    setShowBackToTop(scrollTop > 300);

    if (scrollTop + windowHeight >= documentHeight - 200 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!movies) {
    return (
      <div className="text-center">
        <div
          className="spinner-border text-bg-dark"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
            aria-describedby="basic-addon1"
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
      <div className="text-center">
        {hasMore && <div>Loading more movies...</div>}
      </div>
      {showBackToTop && (
        <button
          className="btn btn-outline-light position-fixed bottom-50 end-0 m-3"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          Scroll up
        </button>
      )}
    </div>
  );
};

export default MovieSearch;

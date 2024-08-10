import React, { useEffect, useState } from "react";
import Card from "../components/common/Cards/Card";
import Banner from "../components/Banner/Banner";
import { fetchTopRatedMovies } from "../services/api/tmdb";
import MovieSearch from "../components/Movie/MovieSearch";

const Home = () => {
  const [poster, setPoster] = useState([]); // State to store top-rated movie posters

  useEffect(() => {
    searchTopMovies(); // Fetch top-rated movies when the component mounts
  }, []);

  // Function to fetch top-rated movies from the API
  const searchTopMovies = async () => {
    try {
      const response = await fetchTopRatedMovies();
      if (response.data.results.length > 0) {
        setPoster(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div>
      <h1 className="text-light text-center">Movie Binge</h1>
      <Banner poster={poster} /> {/* Display movie posters in the Banner component */}
      <MovieSearch /> {/* Render movie search functionality */}
    </div>
  );
};

export default Home;

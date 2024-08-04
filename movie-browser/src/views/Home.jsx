import React, { useEffect, useState } from "react";
import Card from "../components/common/Cards/Card";
import Banner from "../components/Banner/Banner";
import { fetchTopRatedMovies } from "../services/api/tmdb";
import MovieSearch from "../components/Movie/MovieSearch";

const Home = () => {
  const [poster, setPoster] = useState([]);
  useEffect(() => {
    searchTopMovies();
  }, []);

  const searchTopMovies = async () => {
    try {
      const response = await fetchTopRatedMovies();
      if (response.data.results.length > 0) {
        setPoster((prevPoster) => [...prevPoster, ...response.data.results]);
      } else {
        // setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  return (
    <div>
      <h1 className="text-light text-center">Movie Binge</h1>
      <Banner poster={poster} />
      <MovieSearch />
    </div>
  );
};

export default Home;

import React from "react";
import MovieCard from "../../Movie/MovieCard";

const LargeMovieList = ({ movie, favorite, removeFavorite }) => {
  // Determine which movie data to display: either from the movie prop or the favorite prop
  const movieData = movie || favorite;

  return (
    <>
      {/* 
        Render the MovieCard component, passing the movie data, 
        a flag to indicate it's a large card, and a function to remove the favorite 
      */}
      <MovieCard 
        key={movieData?.id} 
        movie={movieData} 
        large={true} 
        removeFavorite={removeFavorite} 
      />
    </>
  );
};

export default LargeMovieList;

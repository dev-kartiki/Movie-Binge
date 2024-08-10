import React from "react";
import MovieCard from "../../Movie/MovieCard";

const SmallMovieList = ({ movie, favorite, removeFavorite }) => {
  // Determine which movie data to display: either from the movie prop or the favorite prop
  const movieData = movie || favorite;

  return (
    <div role="listitem">
      {/* 
        Render the MovieCard component, passing the movie data, 
        a flag to indicate it's a small card, and a function to remove the favorite 
      */}
      <MovieCard 
        key={movieData?.id} 
        movie={movieData} 
        small={true} 
        removeFavorite={removeFavorite} 
      />
    </div>
  );
};

export default SmallMovieList;

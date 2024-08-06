import React from "react";
import MovieCard from "../../Movie/MovieCard";

const LargeMovieList = ({ movie, favorite, removeFavorite }) => {
  return (
    <>
      <MovieCard 
        key={movie?.id || favorite?.id} 
        movie={movie || favorite} 
        large={true} 
        removeFavorite={removeFavorite} 
      />
    </>
  );
};

export default LargeMovieList;

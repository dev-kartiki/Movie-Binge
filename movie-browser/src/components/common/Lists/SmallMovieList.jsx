import React from "react";
import MovieCard from "../../Movie/MovieCard";
const SmallMovieList = ({ movie, favorite, removeFavorite }) => {
  return (
    <div>
      <MovieCard 
        key={movie?.id || favorite?.id} 
        movie={movie || favorite} 
        small={true} 
        removeFavorite={removeFavorite} 
      />
    </div>
  );
};

export default SmallMovieList;

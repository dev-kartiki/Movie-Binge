import React from "react";
import MovieCard from "../../MovieCard";
const SmallMovieList = ({ movie }) => {
  return (
    <div>
      <MovieCard key={movie.id} movie={movie} small={true} />
    </div>
  );
};

export default SmallMovieList;

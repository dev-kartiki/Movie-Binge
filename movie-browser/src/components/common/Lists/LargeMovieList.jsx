import React from "react";
import MovieCard from "../../Movie/MovieCard";

const LargeMovieList = ({ movie }) => {
  return (
    <>
      <MovieCard key={movie.id} movie={movie} large={true} />
    </>
  );
};

export default LargeMovieList;

import React from "react";
import MovieCard from "../../MovieCard";

const LargeMovieList = ({ movie }) => {
  return (
    <div style={{ margin: "20px" }}>
      <MovieCard key={movie.id} movie={movie} large={true} />
    </div>
  );
};

export default LargeMovieList;

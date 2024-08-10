import React, { useState } from "react";
import AddToFavorites from "./AddToFavorites";

const MovieCard = ({ movie, removeFavorite, small }) => {
  const [showMore, setShowMore] = useState(false);

  // Toggle between showing more or less of the movie overview
  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <div className="col m-2 d-flex">
      <div
        className="card bg-dark text-light shadow-lg border-light d-flex flex-column"
        style={{ height: "100%" }}
        role="region"  // Indicates this section is a separate region
        aria-labelledby={`movie-title-${movie.id}`} // Associates the card with the title for screen readers
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          className="card-img-top p-2"
          alt={movie.title}
          style={{ height: "300px", objectFit: "fill", width: "100%" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 id={`movie-title-${movie.id}`} className="card-title text-white">
            {movie.title}
          </h5>
          {!small && (
            <div className="position-relative">
              <p
                className={`card-text pb-2 text-light ${showMore ? "" : "text-truncate"}`}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: showMore ? "normal" : "nowrap",
                }}
                aria-expanded={showMore} // Indicates whether the overview is expanded or collapsed
              >
                {movie.overview}
              </p>
              <button
                onClick={toggleShowMore}
                className="btn btn-link text-light p-0 position-absolute bottom-0 mt-4 end-0"
                style={{ marginTop: "10px" }}
                aria-controls={`overview-${movie.id}`} // Associates the button with the content it controls
                aria-expanded={showMore}
              >
                {showMore ? "Show less" : "View more"}
              </button>
            </div>
          )}
          <p className="card-text text-light mt-auto">
            Rating: {movie.vote_average}
          </p>
        </div>
        <div className="card-footer bg-dark border-top border-light">
          <small className="text-light">
            {new Date(movie.release_date).toDateString()}
            <AddToFavorites movie={movie} onRemoveFavorite={removeFavorite} />
            {movie.genres?.join(', ')} {/* Display genres as a comma-separated list */}
          </small>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

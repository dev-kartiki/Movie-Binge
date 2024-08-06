import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddToFavorites from "./AddToFavorites";

const MovieCard = ({ movie, removeFavorite, small }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <div className="col m-2 d-flex">
      <div
        className="card bg-dark text-light shadow-lg border-light d-flex flex-column"
        style={{ height: "100%" }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          className="card-img-top p-2"
          alt={movie.title}
          style={{ height: "300px", objectFit: "fill", width: "100%" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-white">{movie.title}</h5>
          {!small && <div className="position-relative">
            <p
              className={`card-text pb-2 text-light ${showMore ? "" : "text-truncate"}`}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: showMore ? "normal" : "nowrap",
              }}
            >
              {movie.overview}
            </p>
            {!showMore && (
              <button
                onClick={toggleShowMore}
                className="btn btn-link text-light p-0 position-absolute bottom-0 mt-4 end-0"
                style={{ marginTop: "10px" }}
              >
                View more
              </button>
            )}
            {showMore && (
              <button
                onClick={toggleShowMore}
                className="btn btn-link text-light p-0 mt-4 position-absolute bottom-0 end-0"
                style={{ marginTop: "10px" }}
              >
                Show less
              </button>
            )}
          </div>}
          <p className="card-text text-light mt-auto">
            Rating: {movie.vote_average}
          </p>
        </div>
        <div className="card-footer bg-dark border-top border-light">
          <small className="text-light">
            {new Date(movie.release_date).toDateString()}
            <AddToFavorites movie={movie} onRemoveFavorite={removeFavorite}/>
            {movie.genres}
          </small>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

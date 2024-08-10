import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Banner = ({ poster }) => {

  // Shows top rated movie posters in a slider carousal.
  return (
    <div className="w-100 h-75 mt-4">
      <div id="carouselExampleCaptions" className="carousel slide" aria-label="Movie Carousel">
        <div className="carousel-indicators">
          {poster.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner" role="listbox">
          {poster.map((p, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={p.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${p.backdrop_path}`}
                className="d-block w-100"
                alt={p.title}
                style={{ height: "60vh", objectFit: "fill" }}
              />
              <div
                className="carousel-caption d-none d-md-block bg-dark rounded p-2"
                style={{ color: "white", opacity: 0.85 }}
                role="region"
                aria-label={`${p.title} Overview`}
              >
                <h5>{p.title}</h5>
                <p>
                  {p.overview
                    ? p.overview.slice(0, 100) + "..."
                    : "No overview available"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
          aria-label="Previous slide"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
          aria-label="Next slide"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;

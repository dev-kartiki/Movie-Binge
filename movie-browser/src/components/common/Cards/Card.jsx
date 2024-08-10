import React from "react";

const Card = ({ image, card_text, alt_text }) => {
  // Shows movie details in a card format.
  return (
    <div>
      <div className="card" style={{ width: "18rem" }} role="region" aria-label={alt_text}>
        <img src={image} className="card-img-top" alt={alt_text} />
        <div className="card-body">
          <p className="card-text">{card_text}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";

const Card = (props) => {
  const { image, card_text, alt_text } = props;
  return (
    <div>
      <div class="card" style={{ width: " 18rem" }}>
        <img src={image} class="card-img-top" alt={alt_text} />
        <div class="card-body">
          <p class="card-text">{card_text}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

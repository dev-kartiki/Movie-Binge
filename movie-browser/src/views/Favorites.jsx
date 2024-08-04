import React, { useEffect, useState } from "react";
import RegularList from "../components/common/Lists/RegularList";
import LargeMovieList from "../components/common/Lists/LargeMovieList";
const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <RegularList movies={favorites} itemComponent={LargeMovieList} />
    </div>
  );
};

export default FavoritesList;

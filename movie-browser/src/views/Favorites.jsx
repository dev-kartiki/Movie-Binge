import React, { useEffect, useState } from "react";
import RegularList from "../components/common/Lists/RegularList";
import LargeMovieList from "../components/common/Lists/LargeMovieList";
import SmallMovieList from "../components/common/Lists/SmallMovieList";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user information from session storage
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(loggedInUser);

    if (loggedInUser) {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      // Find the user's favorites list
      const userFavorites = savedFavorites.find(fav => fav.userId === loggedInUser.id);
      if (userFavorites) {
        setFavorites(userFavorites.movies || []);
      }
    }
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);

    // Update local storage
    if (user) {
      let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let userFavorites = savedFavorites.find(fav => fav.userId === user.id);

      if (userFavorites) {
        userFavorites.movies = updatedFavorites;
      } else {
        userFavorites = { userId: user.id, movies: updatedFavorites };
        savedFavorites.push(userFavorites);
      }

      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    }
  };

  return (
    <div className="container vh-100 bg-dark">
      <h1 className="text-white text-center">Favorites List</h1>
      <RegularList items={favorites} resourceName="favorite" itemComponent={(props) => <SmallMovieList  {...props} removeFavorite={removeFavorite} />} />
    </div>
  );
};

export default FavoritesList;

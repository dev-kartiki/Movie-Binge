import React, { useEffect, useState } from "react";
import RegularList from "../components/common/Lists/RegularList";
import SmallMovieList from "../components/common/Lists/SmallMovieList";
import SEO from "../components/common/SEO/SEO";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]); // State to store favorite movies
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    // Retrieve logged-in user information from session storage
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(loggedInUser);

    if (loggedInUser) {
      // Retrieve and filter favorites from local storage
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const userFavorites = savedFavorites.find(fav => fav.userId === loggedInUser.id);
      if (userFavorites) {
        setFavorites(userFavorites.movies || []);
      }
    }
  }, []);

  // Function to remove a movie from favorites
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
      <SEO
        title="Movie Browser - My Favorites"
        description="Find your favorite movies here."
      />
      <h1 className="text-white text-center">Favorites List</h1>
      <RegularList
        items={favorites}
        resourceName="favorite"
        itemComponent={(props) => <SmallMovieList {...props} removeFavorite={removeFavorite} />}
      />
    </div>
  );
};

export default FavoritesList;

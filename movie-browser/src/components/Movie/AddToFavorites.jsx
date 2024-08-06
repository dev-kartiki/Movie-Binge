import React, { useState, useEffect } from 'react';
import { ReactComponent as Heart } from 'bootstrap-icons/icons/heart.svg';
import { ReactComponent as HeartFill } from 'bootstrap-icons/icons/heart-fill.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; // Import SweetAlert2 CSS

const AddToFavorites = ({ movie, onRemoveFavorite }) => {
  const [message, setMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const userFavorites = favorites.find(fav => fav.userId === user.id);
      if (userFavorites && userFavorites.movies.some(fav => fav.id === movie.id)) {
        setIsFavorite(true);
      }
    }
  }, [movie.id]);

  const handleAddToFavorites = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
      setMessage('No user is logged in.');
      Swal.fire({
        title: 'You are not logged in!',
        text: 'Login to continue adding to favorites',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel',
        confirmButtonColor: 'green',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let userFavorites = favorites.find(fav => fav.userId === user.id);

    if (!userFavorites) {
      userFavorites = { userId: user.id, movies: [] };
      favorites.push(userFavorites);
    }

    if (!isFavorite) {
      // Add the movie to favorites
      userFavorites.movies.push(movie);
      setMessage('Movie added to favorites!');
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      // Confirm removal
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove this movie from favorites?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // Remove the movie from favorites
          userFavorites.movies = userFavorites.movies.filter(fav => fav.id !== movie.id);
          setMessage('Movie removed from favorites!');
          localStorage.setItem('favorites', JSON.stringify(favorites));
          setIsFavorite(false);

          if (onRemoveFavorite) {
            onRemoveFavorite(movie.id);
          }
        }
      });
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="add-to-favorites">
      <button className="btn btn-outline-danger border-0" onClick={handleAddToFavorites}>
        {isFavorite ? <HeartFill /> : <Heart />}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddToFavorites;

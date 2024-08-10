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

  // Check if the movie is already in the user's favorites when the component mounts
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

  // Handle adding/removing the movie from favorites
  const handleAddToFavorites = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
      setMessage('No user is logged in.');
      // Show a SweetAlert2 modal if the user is not logged in
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
          navigate('/login'); // Navigate to the login page if the user confirms
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
      // Add the movie to the user's favorites
      userFavorites.movies.push(movie);
      setMessage('Movie added to favorites!');
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      // Confirm removal with a SweetAlert2 modal
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
          // Remove the movie from the user's favorites
          userFavorites.movies = userFavorites.movies.filter(fav => fav.id !== movie.id);
          setMessage('Movie removed from favorites!');
          localStorage.setItem('favorites', JSON.stringify(favorites));
          setIsFavorite(false);

          if (onRemoveFavorite) {
            onRemoveFavorite(movie.id); // Trigger the callback if the movie is removed from favorites
          }
        }
      });
    }

    // Clear the message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="add-to-favorites">
      {/* 
        The button is used to add or remove the movie from favorites. 
        It has an accessible label that changes based on the state.
      */}
      <button
        className="btn btn-outline-danger border-0"
        onClick={handleAddToFavorites}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isFavorite}
      >
        {isFavorite ? <HeartFill aria-hidden="true" /> : <Heart aria-hidden="true" />}
      </button>

      {/* Display a message to the user after an action is taken */}
      {message && <p role="alert" aria-live="assertive">{message}</p>}
    </div>
  );
};

export default AddToFavorites;

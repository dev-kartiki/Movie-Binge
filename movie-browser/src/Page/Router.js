import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../views/Index";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import FavoritesList from "../views/Favorites";
import CreateAccount from "../views/CreateAccount";
import PrivateRoute from "../components/AuthContext/PrivateRoute";

/**
 * Router component that defines the application's route configuration.
 * It includes routes for the homepage, login page, account creation, 
 * favorites list (protected), and a catch-all for undefined routes.
 * 
 * @returns {JSX.Element} The Routes component defining application routes.
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* Route for the home page */}
      <Route path="/" element={<Index />} />
      
      {/* Route for the login page */}
      <Route path="/login" element={<Login />} />
      
      {/* Route for creating a new account */}
      <Route path="/create-account" element={<CreateAccount />} />
      
      {/* Protected route for favorites list, accessible only if authenticated */}
      <Route
        path="/favorites-list"
        element={<PrivateRoute element={FavoritesList} />}
      />
      
      {/* Route for handling undefined routes (404 Not Found) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../views/Index";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import FavoritesList from "../views/Favorites";
import CreateAccount from "../views/CreateAccount";
import PrivateRoute from "../components/AuthContext/PrivateRoute";

export default () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route
        path="/favorites-list"
        element={<PrivateRoute element={FavoritesList} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

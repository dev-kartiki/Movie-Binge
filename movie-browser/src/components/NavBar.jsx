import React from "react";
import { useAuth } from "../components/AuthContext/AuthContext"; // Adjust the import path as necessary
import logo from "../assets/icons/film.svg";
import Logout from "../views/Logout";

const NavBar = () => {
  const { isAuthenticated } = useAuth(); // Use AuthContext to get authentication status
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Movie Binge Logo"
            width="30"
            height="24"
            className="d-inline-block bg-light text-white align-text-top m-1 px-1"
          />
          Movie Binge
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/favorites-list">
                Favorites
              </a>
            </li>
          </ul>
          <ul>
            {!isAuthenticated ? (
              <li className="nav-item">
                <a className="btn btn-outline-light" href="/login">
                  Login
                </a>
              </li>
            ) : (
              <Logout />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

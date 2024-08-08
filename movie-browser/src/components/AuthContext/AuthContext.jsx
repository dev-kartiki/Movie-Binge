import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create an authentication context to provide authentication-related data and functions
const AuthContext = createContext();

// AuthProvider component to wrap the part of the app that needs access to authentication state
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isLoggedIn"),
  );

  // State to store the user's role, if applicable (can be expanded as needed)
  const [role, setRole] = useState("");

  // General state for any additional data you might need to manage globally
  const [state, setState] = useState();

  // Function to update the general state
  const updateState = (newValue) => {
    setState(newValue);
  };

  // Function to handle user login
  const login = (user) => {
    // Store login status and user information in sessionStorage
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("user", JSON.stringify(user));

    // Update local state to reflect the user is authenticated
    setIsAuthenticated(true);

    // Focus on a hidden element to announce the login status to screen readers
    document.getElementById("auth-status")?.focus();
  };

  // Function to handle user logout
  const logout = () => {
    // Remove user information and login status from sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isLoggedIn");

    // Update local state to reflect the user is no longer authenticated
    setIsAuthenticated(false);

    // Redirect the user to the homepage
    navigate("/");

    // Focus on a hidden element to announce the logout status to screen readers
    document.getElementById("auth-status")?.focus();
  };

  // Sync the authentication state with sessionStorage when the component mounts
  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    // Provide the authentication state and functions to all children components
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, role, state, updateState }}
    >
      {/* 
        Hidden element to announce authentication status changes.
        This helps screen readers inform users when they log in or out.
      */}
      <div
        id="auth-status"
        tabIndex="-1"
        aria-live="assertive"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        {isAuthenticated ? "You are logged in" : "You are logged out"}
      </div>

      {/* Render child components */}
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);

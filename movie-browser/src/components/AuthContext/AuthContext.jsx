import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn"),
  );
  const [role, setRole] = useState("");
  const [state, setState] = useState();

  const updateState = (newValue) => {
    setState(newValue);
  };

  const login = (user) => {
    localStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(localStorage.getItem("isLoggedIn"));
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, role, state, updateState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

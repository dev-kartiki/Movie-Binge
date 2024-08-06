import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isLoggedIn"),
  );
  const [role, setRole] = useState("");
  const [state, setState] = useState();

  const updateState = (newValue) => {
    setState(newValue);
  };

  const login = (user) => {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(JSON.parse(sessionStorage.getItem('isLoggedIn'))||true);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isLoggedIn");
    navigate('/')
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

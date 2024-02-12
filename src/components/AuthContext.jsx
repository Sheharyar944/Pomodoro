// src/context/AuthContext.js
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const [user, setUser] = useState(token ? { token, refresh_token } : null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    username: localStorage.getItem("username") || "",
    id: localStorage.getItem("id") || null,
  });

  // Placeholder for login logic
  const setLoggedUser = (user) => {
    setUser(user);
  };

  // Placeholder for logout logic
  const logout = () => {
    // Implement your logout logic here
    // After logout, reset the user state
    setUser(null);
    setUserDetails(null);
  };

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    // If yes, set the user state accordingly
    // setUser({ ... });

    setLoading(false);
  }, []);

  const getDetails = (username, id) => {
    setUserDetails({ username, id });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoggedUser,
        logout,
        userDetails,
        getDetails,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

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
    email: localStorage.getItem("email") || "",
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

  const getDetails = (username, id, email) => {
    setUserDetails({ username, id, email });
  };

  const updateToken = async () => {
    console.log("update token called");
    console.log(refresh_token);
    try {
      let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ refresh: refresh_token }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        setLoggedUser(data);
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      }
    } catch (error) {
      console.log("Error while refreshing token", error);
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let intervalId = setInterval(() => {
      if (user) {
        updateToken();
      }
    }, 14000 * 60);
    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoggedUser,
        logout,
        userDetails,
        getDetails,
        updateToken,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

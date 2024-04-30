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

  const setLoggedUser = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    setUserDetails(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("pomodoro");
    localStorage.removeItem("shortBreak");
    localStorage.removeItem("longBreak");
    localStorage.removeItem("long_break_delay");
    localStorage.removeItem("isPomodoro");
    localStorage.removeItem("count");
    localStorage.removeItem("isLongBreak");
    localStorage.removeItem("isBreak");
    localStorage.removeItem("daily_goal");
    localStorage.removeItem("auto_start_pomodoro");
    localStorage.removeItem("auto_start_break");
    localStorage.removeItem("initialPomodoro");
    localStorage.removeItem("initialShortBreak");
    localStorage.removeItem("initialLongBreak");
    localStorage.removeItem("isDisabled");
    localStorage.removeItem("isActive");
    localStorage.removeItem("mode");
    localStorage.removeItem("pomodoroTime");
    localStorage.removeItem("shortBreakTime");
    localStorage.removeItem("longBreakTime");
    localStorage.removeItem("playAlarmSound");
    localStorage.removeItem("playClockSound");
    localStorage.removeItem("playClockDuringBreak");
    localStorage.removeItem("notify");
    localStorage.removeItem("playSound");
  };

  useEffect(() => {
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
      } else {
        logout();
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
    if (loading && user) {
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

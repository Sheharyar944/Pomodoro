import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const useLogout = () => {
  const { logout: contextLogout } = useContext(AuthContext);

  const logout = () => {
    contextLogout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("pomodoroTime");
    localStorage.removeItem("shortBreakTime");
    localStorage.removeItem("longBreakTime");
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
  };

  return logout;
};

export default useLogout;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { TimerContext } from "../components/TimerContext";
import axios from "axios";

const useGetSettings = () => {
  const { userDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const {
    pomodoro,
    shortBreak,
    longBreak,
    longBreakDelay,
    isPomodoro,
    isLongBreak,
    isBreak,
    dailyGoal,
    isAutoPomodoroChecked,
    isAutoBreakChecked,
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    setInitialPomodoro,
    setInitialShortBreak,
    setInitialLongBreak,
    setPomodoro,
    setShortBreak,
    setLongBreak,
    setIsBreak,
    setIsPomodoro,
    setIsLongBreak,
    setIsAutoPomodoroChecked,
    setIsAutoBreakChecked,
    setLongBreakDelay,
    setDailyGoal,
  } = useContext(TimerContext);

  const saveSettings = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/?settings_name=classic`,
        {
          pomodoro_duration: pomodoro,
          short_break_duration: shortBreak,
          long_break_duration: longBreak,
          long_break_delay: longBreakDelay,
          is_pomodoro: isPomodoro,
          pomodoro_count: isLongBreak.count,
          is_long_break: isLongBreak.state,
          is_break: isBreak,
          daily_goal: dailyGoal,
          auto_start_pomodoro: isAutoPomodoroChecked,
          auto_start_break: isAutoBreakChecked,
        }
      );
      console.log("SaveSettings invoked", response);
    } catch (error) {
      console.log("error updating settings", error);
    }
  };

  const getSettings = async () => {
    try {
      //   setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/?settings_name=classic`
      );

      localStorage.setItem("pomodoroTime", response.data.pomodoro_duration);
      localStorage.setItem(
        "shortBreakTime",
        response.data.short_break_duration
      );
      localStorage.setItem("longBreakTime", response.data.long_break_duration);
      localStorage.setItem("long_break_delay", response.data.long_break_delay);
      localStorage.setItem("isPomodoro", response.data.is_pomodoro);
      localStorage.setItem("count", response.data.pomodoro_count);
      localStorage.setItem("isLongBreak", response.data.is_long_break);
      localStorage.setItem("isBreak", response.data.is_break);
      localStorage.setItem("daily_goal", response.data.daily_goal);
      localStorage.setItem(
        "auto_start_pomodoro",
        response.data.auto_start_pomodoro
      );
      localStorage.setItem("auto_start_break", response.data.auto_start_break);

      setPomodoroTime(response.data.pomodoro_duration);
      setShortBreakTime(response.data.short_break_duration);
      setLongBreakTime(response.data.long_break_duration);
      setInitialPomodoro(response.data.pomodoro_duration);
      setInitialShortBreak(response.data.short_break_duration);
      setInitialLongBreak(response.data.long_break_duration);
      setPomodoro(response.data.pomodoro_duration);
      setShortBreak(response.data.short_break_duration);
      setLongBreak(response.data.long_break_duration);
      setIsBreak(response.data.is_break);
      setIsPomodoro(response.data.is_pomodoro);
      setLongBreakDelay(response.data.long_break_delay);
      setIsLongBreak((prevState) => ({
        ...prevState,
        count: response.data.pomodoro_count,
        state: response.data.is_long_break,
      }));
      setDailyGoal(response.data.daily_goal);
      setIsAutoBreakChecked(response.data.auto_start_break);
      setIsAutoPomodoroChecked(response.data.auto_start_pomodoro);

      console.log("Response of getting settings", response.data);
      return response;
    } catch (error) {
      console.log("error updating settings", error);
    } finally {
      setLoading(false);
    }
  };

  const getModes = async () => {
    try {
      //   setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/`
      );

      console.log("Response of Modes", response.data);
      return response;
    } catch (error) {
      console.log("error getting response", error);
    }
  };

  return { saveSettings, getSettings, getModes, loading };
};

export default useGetSettings;

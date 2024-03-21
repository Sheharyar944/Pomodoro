import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { TimerContext } from "../components/TimerContext";
import axios from "axios";

const useGetSettings = () => {
  const { userDetails, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [modes, setModes] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

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

  const saveSettings = async (
    alignment,
    prevAlignment = alignment,
    prevPomodoro = pomodoro,
    prevShortBreak = shortBreak,
    prevLongBreak = longBreak,
    prevLongBreakDelay = longBreakDelay
  ) => {
    try {
      const selected = prevAlignment !== alignment ? false : true;
      const response = await axios.post(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/?settings_name=${prevAlignment}`,
        {
          pomodoro_duration: prevPomodoro,
          short_break_duration: prevShortBreak,
          long_break_duration: prevLongBreak,
          long_break_delay: prevLongBreakDelay,
          is_pomodoro: isPomodoro,
          pomodoro_count: isLongBreak.count,
          is_long_break: isLongBreak.state,
          is_break: isBreak,
          daily_goal: dailyGoal,
          auto_start_pomodoro: isAutoPomodoroChecked,
          auto_start_break: isAutoBreakChecked,
          is_selected: selected,
        }
      );
      setModes((prevModes) => {
        const index = prevModes.findIndex(
          (mode) => mode.settings_name === response.data.settings_name
        );
        if (index !== -1) {
          const newModes = [...prevModes];
          newModes[index] = response.data;
          return newModes;
        }
        return prevModes;
      });
      console.log("SaveSettings invoked", response.data);
    } catch (error) {
      console.log("error updating settings", error);
    }

    try {
      const response2 = await axios.post(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/?settings_name=${alignment}`,
        {
          is_selected: true,
        }
      );
      console.log("SaveSettings2 invoked", response2);
    } catch (error) {
      console.log("error updating settings2", error);
    }
  };

  const getSettings = async () => {
    try {
      //   setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/?settings_name=classic`
      );

      localStorage.setItem("pomodoro", response.data.pomodoro_duration);
      localStorage.setItem("shortBreak", response.data.short_break_duration);
      localStorage.setItem("longBreak", response.data.long_break_duration);
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

      setModes(response.data);

      const selectedMode = response.data.find((mode) => mode.is_selected);

      setSelectedMode(selectedMode);
      localStorage.setItem("pomodoro", selectedMode.pomodoro_duration);
      localStorage.setItem("shortBreak", selectedMode.short_break_duration);
      localStorage.setItem("longBreak", selectedMode.long_break_duration);
      localStorage.setItem("long_break_delay", selectedMode.long_break_delay);
      localStorage.setItem("isPomodoro", selectedMode.is_pomodoro);
      localStorage.setItem("count", selectedMode.pomodoro_count);
      localStorage.setItem("isLongBreak", selectedMode.is_long_break);
      localStorage.setItem("isBreak", selectedMode.is_break);
      localStorage.setItem("daily_goal", selectedMode.daily_goal);
      localStorage.setItem(
        "auto_start_pomodoro",
        selectedMode.auto_start_pomodoro
      );
      localStorage.setItem("auto_start_break", selectedMode.auto_start_break);

      setPomodoroTime(selectedMode.pomodoro_duration);
      setShortBreakTime(selectedMode.short_break_duration);
      setLongBreakTime(selectedMode.long_break_duration);
      setInitialPomodoro(selectedMode.pomodoro_duration);
      setInitialShortBreak(selectedMode.short_break_duration);
      setInitialLongBreak(selectedMode.long_break_duration);
      setPomodoro(selectedMode.pomodoro_duration);
      setShortBreak(selectedMode.short_break_duration);
      setLongBreak(selectedMode.long_break_duration);
      setIsBreak(selectedMode.is_break);
      setIsPomodoro(selectedMode.is_pomodoro);
      setLongBreakDelay(selectedMode.long_break_delay);
      setIsLongBreak((prevState) => ({
        ...prevState,
        count: selectedMode.pomodoro_count,
        state: selectedMode.is_long_break,
      }));
      setDailyGoal(selectedMode.daily_goal);
      setIsAutoBreakChecked(selectedMode.auto_start_break);
      setIsAutoPomodoroChecked(selectedMode.auto_start_pomodoro);

      return response;
    } catch (error) {
      console.log("error getting response", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getModes();
    }
  }, []);

  return {
    saveSettings,
    getSettings,
    getModes,
    modes,
    selectedMode,
    loading,
  };
};

export default useGetSettings;

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
    pomodoroTime,
    longBreakTime,
    shortBreakTime,
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
    setIsDisabled,
    isDisabled,
    playAlarmSound,
    setPlayAlarmSound,
    playClockSound,
    setPlayClockSound,
    playClockDuringBreak,
    setPlayClockDuringBreak,
    notify,
    setNotify,
  } = useContext(TimerContext);

  const saveSettings = async (
    alignment,
    prevAlignment = alignment,
    prevPomodoro = pomodoro,
    prevShortBreak = shortBreak,
    prevLongBreak = longBreak,
    prevLongBreakDelay = longBreakDelay,
    prevDailyGoal = dailyGoal
  ) => {
    const currentTime = () => {
      if (isPomodoro) return pomodoroTime;
      else if (isLongBreak.state) return longBreakTime;
      else return shortBreakTime;
    };
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
          daily_goal: prevDailyGoal,
          auto_start_pomodoro: isAutoPomodoroChecked,
          auto_start_break: isAutoBreakChecked,
          is_selected: selected,
          current_time: currentTime(),
          is_disabled: isDisabled,
          alarm_sound: playAlarmSound,
          ticking_sound: playClockSound,
          ticking_sound_break: playClockDuringBreak,
          one_min_notify: notify,
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
  };

  const saveSelectedMode = async (alignment) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/?settings_name=${alignment}`,
        {
          is_selected: true,
        }
      );
      console.log("Save selected mode invoked", response);
    } catch (error) {
      console.log("error updating mode", error);
    }
  };

  const getModes = async (userID = userDetails.id) => {
    const pomodoroTime = localStorage.getItem("pomodoroTime");
    const shortBreakTime = localStorage.getItem("shortBreakTime");
    const longBreakTime = localStorage.getItem("longBreakTime");

    try {
      //   setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/pomodoro/${userID}/`
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
      localStorage.setItem("isDisabled", selectedMode.is_disabled);
      localStorage.setItem("playAlarmSound", selectedMode.alarm_sound);
      localStorage.setItem("playClockSound", selectedMode.ticking_sound);
      localStorage.setItem(
        "playClockDuringBreak",
        selectedMode.ticking_sound_break
      );
      localStorage.setItem("notify", selectedMode.one_min_notify);

      if (pomodoroTime) {
        setPomodoroTime(pomodoroTime);
      }
      if (shortBreakTime) {
        setShortBreakTime(shortBreakTime);
      }
      if (longBreakTime) {
        setLongBreakTime(longBreakTime);
      }

      //   setPomodoroTime(selectedMode.pomodoro_duration);
      //   setShortBreakTime(selectedMode.short_break_duration);
      //   setLongBreakTime(selectedMode.long_break_duration);
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
      setIsDisabled(selectedMode.is_disabled);
      setPlayAlarmSound(selectedMode.alarm_sound);
      setPlayClockSound(selectedMode.ticking_sound);
      setPlayClockDuringBreak(selectedMode.ticking_sound_break);
      setNotify(selectedMode.one_min_notify);

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
    saveSelectedMode,
    // getSettings,
    getModes,
    modes,
    selectedMode,
    loading,
  };
};

export default useGetSettings;

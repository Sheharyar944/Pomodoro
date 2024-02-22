import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsModal1 from "./SettingsModal1";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "./ToolTip";
import soundUrl from "../assets/sounds/bell1.wav";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useLocation } from "react-router-dom";
import { TimerContext } from "./TimerContext";
//////////////////////////////////////////////////////////////////////////////////////////////////
const Timer = () => {
  const {
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    isActive,
    setIsActive,
    isBreak,
    setIsBreak,
    isPomodoro,
    setIsPomodoro,
    isDisabled,
    setIsDisabled,
    longBreakDelay,
    setLongBreakDelay,
    isLongBreak,
    setIsLongBreak,
    dailyGoal,
    setDailyGoal,
    isAutoPomodoroChecked,
    setIsAutoPomodoroChecked,
    isAutoBreakChecked,
    setIsAutoBreakChecked,
    pomodoro,
    setPomodoro,
    initialPomodoro,
    setInitialPomodoro,
    initialShortBreak,
    setInitialShortBreak,
    initialLongBreak,
    setInitialLongBreak,
    updateQueue,
    setUpdateQueue,
    updateShortBreakQueue,
    setUpdateShortBreakQueue,
    updateLongBreakQueue,
    setUpdateLongBreakQueue,
    playAlarmSound,
    setPlayAlarmSound,

    queueUpdate,
    autoPomodoro,
    autoOffPomodoro,
    toggle,
    reset,
    longBreakCount,
    skip,
    forward,
    add,
    isDailyGoalReached,
    playBell,
    formatTime,
  } = useContext(TimerContext);

  return (
    <Box
      marginTop={10}
      marginBottom={5}
      sx={{ width: "80%", margin: "50px auto" }}
    >
      <SettingsModal1
        pomodoroTime={pomodoroTime}
        setPomodoroTime={setPomodoroTime}
        shortBreakTime={shortBreakTime}
        setShortBreakTime={setShortBreakTime}
        longBreakTime={longBreakTime}
        setLongBreakTime={setLongBreakTime}
        longBreakDelay={longBreakDelay}
        setLongBreakDelay={setLongBreakDelay}
        setDailyGoal={setDailyGoal}
        isAutoPomodoroChecked={isAutoPomodoroChecked}
        setIsAutoPomodoroChecked={setIsAutoPomodoroChecked}
        isAutoBreakChecked={isAutoBreakChecked}
        setIsAutoBreakChecked={setIsAutoBreakChecked}
        isActive={isActive}
        pomodoro={pomodoro}
        setPomodoro={setPomodoro}
        initialPomodoro={initialPomodoro}
        setInitialPomodoro={setInitialPomodoro}
        initialShortBreak={initialShortBreak}
        setInitialShortBreak={setInitialShortBreak}
        initialLongBreak={initialLongBreak}
        setInitialLongBreak={setInitialLongBreak}
        queueUpdate={queueUpdate}
        isDisabled={isDisabled}
        isPomodoro={isPomodoro}
        isBreak={isBreak}
        playAlarmSound={playAlarmSound}
        setPlayAlarmSound={setPlayAlarmSound}
      />
    </Box>
  );
};

export default Timer;

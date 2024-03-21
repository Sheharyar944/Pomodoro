import React, { createContext, useState, useEffect, useContext } from "react";
import soundUrl from "../assets/sounds/bell1.wav";
import { AuthContext } from "./AuthContext";

export const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [pomodoroTime, setPomodoroTime] = useState(50);
  const [shortBreakTime, setShortBreakTime] = useState(30);
  const [longBreakTime, setLongBreakTime] = useState(50);
  const [isActive, setIsActive] = useState(
    localStorage.getItem("isActive") === "true"
  );
  const [isBreak, setIsBreak] = useState(
    localStorage.getItem("isBreak") === "true"
  );
  const [isPomodoro, setIsPomodoro] = useState(
    localStorage.getItem("isPomodoro") === "true" ||
      localStorage.getItem("isPomodoro") === null
  );
  const [isDisabled, setIsDisabled] = useState(
    localStorage.getItem("isDisabled") === "true" ||
      localStorage.getItem("isDisabled") === null
  );
  const [longBreakDelay, setLongBreakDelay] = useState(4);
  const [isLongBreak, setIsLongBreak] = useState({
    count: parseInt(localStorage.getItem("count")) || 0,
    state: localStorage.getItem("isLongBreak") === "true",
  });
  const [dailyGoal, setDailyGoal] = useState(1);
  const [isAutoPomodoroChecked, setIsAutoPomodoroChecked] = useState(
    localStorage.getItem("auto_start_pomodoro") === "true"
  );
  const [isAutoBreakChecked, setIsAutoBreakChecked] = useState(
    localStorage.getItem("auto_start_break") === "true"
  );
  const [pomodoro, setPomodoro] = useState(0);
  const [shortBreak, setShortBreak] = useState(0);
  const [longBreak, setLongBreak] = useState(0);
  const [initialPomodoro, setInitialPomodoro] = useState(
    parseInt(localStorage.getItem("initialPomodoro")) || 5
  );
  const [initialShortBreak, setInitialShortBreak] = useState(
    parseInt(localStorage.getItem("initialShortBreak")) || 3
  );
  const [initialLongBreak, setInitialLongBreak] = useState(
    parseInt(localStorage.getItem("initialLongBreak")) || 5
  );
  const [updateQueue, setUpdateQueue] = useState([]);
  const [updateShortBreakQueue, setUpdateShortBreakQueue] = useState([]);
  const [updateLongBreakQueue, setUpdateLongBreakQueue] = useState([]);
  const [playAlarmSound, setPlayAlarmSound] = useState(true);
  const [alignment, setAlignment] = React.useState("classic");

  // useEffect(() => {
  //   const storedPomodoroTime = localStorage.getItem("pomodoro");
  //   if (storedPomodoroTime) {
  //     setPomodoroTime(parseInt(storedPomodoroTime));
  //   }
  //   const storedShortBreakTime = localStorage.getItem("shortBreak");

  //   if (storedShortBreakTime) {
  //     setShortBreakTime(parseInt(storedShortBreakTime));
  //   }

  //   const storedLongBreakTime = localStorage.getItem("longBreak");
  //   if (storedLongBreakTime) {
  //     setLongBreakTime(parseInt(storedLongBreakTime));
  //   }
  // }, []);

  useEffect(() => {
    // Exit early when we reach 0
    let intervalId = null;
    // Save intervalId to clear the interval when the component re-renders
    if (isActive) {
      if (isPomodoro) {
        console.log("pomodoroTime", pomodoroTime);
        intervalId = setInterval(() => {
          setPomodoroTime((prevTime) => {
            if (prevTime > 1) {
              return prevTime - 1;
            } else {
              clearInterval(intervalId);
              if (isAutoBreakChecked) {
                if (playAlarmSound) playBell();
                autoPomodoro();
                return initialPomodoro;
              }
              if (playAlarmSound) playBell();
              autoOffPomodoro();
              return initialPomodoro;
            }
          });
        }, 1000);
      } else if (isLongBreak.state) {
        intervalId = setInterval(() => {
          setLongBreakTime((prevTime) => {
            if (prevTime > 1) {
              return prevTime - 1;
            } else {
              clearInterval(intervalId);
              if (isAutoPomodoroChecked) {
                if (playAlarmSound) playBell();
                autoPomodoro();
                return initialLongBreak;
              }
              if (playAlarmSound) playBell();
              autoOffPomodoro();
              return initialLongBreak;
            }
          });
        }, 1000);
      } else {
        intervalId = setInterval(() => {
          setShortBreakTime((prevTime) => {
            if (prevTime > 1) {
              return prevTime - 1;
            } else {
              clearInterval(intervalId);
              if (isAutoPomodoroChecked) {
                if (playAlarmSound) playBell();
                autoPomodoro();
                return initialShortBreak;
              }
              if (playAlarmSound) playBell();
              autoOffPomodoro();
              return initialShortBreak;
            }
          });
        }, 1000);
      }
    } else {
      clearInterval(intervalId);
    }
    // Clear interval on re-render to avoid memory leaks

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, isPomodoro, isAutoPomodoroChecked, isAutoBreakChecked]);

  useEffect(() => {
    {
      localStorage.setItem("isActive", isActive);
    }
  }, [isActive]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("pomodoroTime", pomodoroTime);
    }
  }, [pomodoroTime]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("shortBreakTime", shortBreakTime);
    }
  }, [shortBreakTime]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("longBreakTime", longBreakTime);
    }
  }, [longBreakTime]);

  useEffect(() => {
    {
      localStorage.setItem("pomodoro", pomodoro);
      localStorage.setItem("isDisabled", isDisabled);
    }
  }, [pomodoro, isDisabled]);

  useEffect(() => {
    {
      localStorage.setItem("shortBreak", shortBreak);
      localStorage.setItem("isDisabled", isDisabled);
    }
  }, [shortBreak, isDisabled]);

  useEffect(() => {
    {
      localStorage.setItem("longBreak", longBreak);
      localStorage.setItem("isDisabled", isDisabled);
    }
  }, [longBreak, isDisabled]);

  useEffect(() => {
    {
      localStorage.setItem("initialPomodoro", pomodoro);
      localStorage.setItem("initialShortBreak", shortBreak);
      localStorage.setItem("initialLongBreak", longBreak);
    }
  }, [pomodoro, shortBreak, longBreak]);

  useEffect(() => {
    {
      localStorage.setItem("isPomodoro", isPomodoro);
      localStorage.setItem("isBreak", isBreak);
      localStorage.setItem("isLongBreak", isLongBreak.state);
      localStorage.setItem("count", isLongBreak.count);
    }
  }, [isPomodoro]);

  useEffect(() => {
    {
      localStorage.setItem("auto_start_pomodoro", isAutoPomodoroChecked);
    }
  }, [isAutoPomodoroChecked]);

  useEffect(() => {
    {
      localStorage.setItem("auto_start_break", isAutoBreakChecked);
    }
  }, [isAutoBreakChecked]);

  useEffect(() => {
    applyQueuedUpdates();
  }, [isPomodoro]);

  const queueUpdate = (pomodoro, shortBreak, longBreak) => {
    setUpdateQueue((prevQueue) => [...prevQueue, pomodoro]);
    setUpdateShortBreakQueue((prevQueue) => [...prevQueue, shortBreak]);
    setUpdateLongBreakQueue((prevQueue) => [...prevQueue, longBreak]);
  };

  const applyQueuedUpdates = () => {
    if (updateQueue.length > 0) {
      setPomodoroTime(updateQueue[updateQueue.length - 1]);
      setInitialPomodoro(updateQueue[updateQueue.length - 1]);
      setUpdateQueue([]);
    }
    if (updateShortBreakQueue.length > 0) {
      setShortBreakTime(
        updateShortBreakQueue[updateShortBreakQueue.length - 1]
      );
      setInitialShortBreak(
        updateShortBreakQueue[updateShortBreakQueue.length - 1]
      );
      setUpdateShortBreakQueue([]);
    }
    if (updateLongBreakQueue.length > 0) {
      setLongBreakTime(updateLongBreakQueue[updateLongBreakQueue.length - 1]);
      setInitialLongBreak(
        updateLongBreakQueue[updateLongBreakQueue.length - 1]
      );
      setUpdateLongBreakQueue([]);
    }
  };

  const autoPomodoro = () => {
    setIsPomodoro(!isPomodoro);
    setIsBreak(!isBreak);
    longBreakCount();
    setIsDisabled(true);
    if (playAlarmSound) playBell();
  };

  const autoOffPomodoro = () => {
    setIsPomodoro(!isPomodoro);
    setIsActive(false);
    longBreakCount();
    setIsBreak(!isBreak);
    setIsDisabled(true);
  };

  const toggle = () => {
    setIsActive(!isActive);
    setIsDisabled(false);
  };

  const reset = () => {
    setPomodoroTime(initialPomodoro);
    setIsDisabled(true);
    setIsActive(false);
  };

  const longBreakCount = () => {
    setIsLongBreak((prevState) => ({
      ...prevState,
      state: false,
    }));
    if (isPomodoro) {
      setIsLongBreak((prevState) => ({
        ...prevState,
        count: prevState.count + 1,
      }));
      const i = isLongBreak.count + 1;

      if (i >= longBreakDelay) {
        setIsLongBreak((prevState) => ({
          ...prevState,
          state: true,
          count: 0,
        }));
      }
    }
  };

  const skip = () => {
    setPomodoroTime(initialPomodoro);
    setLongBreakTime(initialLongBreak);
    setShortBreakTime(initialShortBreak);
    autoOffPomodoro();
  };

  const forward = () => {
    setIsPomodoro(!isPomodoro);
    setIsBreak(!isBreak);
    longBreakCount();
  };

  const add = () => {
    if (isPomodoro) {
      setPomodoroTime(pomodoroTime + 60);
    } else if (isLongBreak) {
      setLongBreakTime(longBreakTime + 60);
    } else {
      setShortBreakTime(shortBreakTime + 60);
    }
  };

  const isDailyGoalReached = () => {
    if (dailyGoal == isLongBreak) {
      return true;
    }
  };

  const playBell = () => {
    const bell = new Audio(soundUrl);
    bell.play();
  };

  const formatTime = (pomodoroTime, shortBreakTime, longBreakTime) => {
    let time;
    if (isPomodoro) {
      time = pomodoroTime;
    } else if (isLongBreak.state) {
      time = longBreakTime;
    } else {
      time = shortBreakTime;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TimerContext.Provider
      value={{
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
        shortBreak,
        setShortBreak,
        longBreak,
        setLongBreak,
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
        alignment,
        setAlignment,

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
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

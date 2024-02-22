import React, { createContext, useState, useEffect } from "react";
import soundUrl from "../assets/sounds/bell1.wav";

export const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
  const [pomodoroTime, setPomodoroTime] = useState(5);
  const [shortBreakTime, setShortBreakTime] = useState(3);
  const [longBreakTime, setLongBreakTime] = useState(5);
  const [isActive, setIsActive] = useState(false);
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
  const [dailyGoal, setDailyGoal] = useState(null);
  const [isAutoPomodoroChecked, setIsAutoPomodoroChecked] = useState(false);
  const [isAutoBreakChecked, setIsAutoBreakChecked] = useState(false);
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const storedPomodoroTime = localStorage.getItem("pomodoroTime");
    if (storedPomodoroTime) {
      setPomodoroTime(parseInt(storedPomodoroTime));
    }
    const storedShortBreakTime = localStorage.getItem("shortBreakTime");

    if (storedShortBreakTime) {
      setShortBreakTime(parseInt(storedShortBreakTime));
    }
    const storedLongBreakTime = localStorage.getItem("longBreakTime");
    if (storedLongBreakTime) {
      setLongBreakTime(parseInt(storedLongBreakTime));
    }
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // Exit early when we reach 0
    console.log("Component mounted");

    // if (pomodoroTime == 0) {
    //   console.log("pomodoroTime", pomodoroTime);
    //   autoPomodoro();
    // }

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
      // setMounted(false);
      console.log("Component will unmount");
    };
  }, [isActive, isPomodoro, isAutoPomodoroChecked, isAutoBreakChecked]);

  useEffect(() => {
    localStorage.setItem("pomodoroTime", pomodoroTime);
    localStorage.setItem("isDisabled", isDisabled);
  }, [pomodoroTime, isDisabled]);

  useEffect(() => {
    localStorage.setItem("shortBreakTime", shortBreakTime);
    localStorage.setItem("isDisabled", isDisabled);
  }, [shortBreakTime, isDisabled]);

  useEffect(() => {
    localStorage.setItem("longBreakTime", longBreakTime);
    localStorage.setItem("isDisabled", isDisabled);
  }, [longBreakTime, isDisabled]);

  useEffect(() => {
    localStorage.setItem("initialPomodoro", pomodoro);
    localStorage.setItem("initialShortBreak", shortBreak);
    localStorage.setItem("initialLongBreak", longBreak);
  }, [pomodoro, shortBreak, longBreak]);

  useEffect(() => {
    localStorage.setItem("isPomodoro", isPomodoro);
    localStorage.setItem("isBreak", isBreak);
    localStorage.setItem("isLongBreak", isLongBreak.state);
    localStorage.setItem("count", isLongBreak.count);
  }, [isPomodoro]);

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
  //   if (isLongBreak.state) {
  //     content = "Take a long break";
  //   } else if (isBreak) {
  //     content = "Take a short break";
  //   } else {
  //     content = "Pomodoro";
  //   }

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

      if (i == longBreakDelay) {
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

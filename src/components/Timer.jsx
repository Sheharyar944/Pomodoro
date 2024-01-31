import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "./ToolTip";

const Timer = () => {
  const [pomodoroTime, setPomodoroTime] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(null);
  const [shortBreakTime, setShortBreakTime] = useState(3 * 60);
  const [longBreakTime, setLongBreakTime] = useState(5 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [longBreakDelay, setLongBreakDelay] = useState(4);
  const [isLongBreak, setIsLongBreak] = useState({ count: 0, state: false });
  const [dailyGoal, setDailyGoal] = useState(null);
  const [isAutoPomodoroChecked, setIsAutoPomodoroChecked] = useState(false);
  const [isAutoBreakChecked, setIsAutoBreakChecked] = useState(false);
  const [pomodoro, setPomodoro] = useState(0);
  const [initialPomodoro, setInitialPomodoro] = useState(pomodoroTime);
  const [initialShortBreak, setInitialShortBreak] = useState(shortBreakTime);
  const [initialLongBreak, setInitialLongBreak] = useState(longBreakTime);
  const [updateQueue, setUpdateQueue] = useState([]);
  const [updateShortBreakQueue, setUpdateShortBreakQueue] = useState([]);
  const [updateLongBreakQueue, setUpdateLongBreakQueue] = useState([]);

  let content;

  const navigate = useNavigate();

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
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(intervalId);
              if (isAutoBreakChecked) {
                autoPomodoro();
                return initialPomodoro;
              }
              autoOffPomodoro();
              return initialPomodoro;
            }
          });
        }, 1000);
      } else if (isLongBreak.state) {
        intervalId = setInterval(() => {
          setLongBreakTime((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(intervalId);
              if (isAutoPomodoroChecked) {
                autoPomodoro();
                return initialLongBreak;
              }
              autoOffPomodoro();
              return initialLongBreak;
            }
          });
        }, 1000);
      } else {
        intervalId = setInterval(() => {
          setShortBreakTime((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(intervalId);
              if (isAutoPomodoroChecked) {
                autoPomodoro();
                return initialShortBreak;
              }
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

      console.log("Component will unmount");
    };
    // Add timeLeft as a dependency to re-run the effect when we update it
  }, [isActive, isPomodoro, isAutoPomodoroChecked, isAutoBreakChecked]);

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
      setPomodoroTime(updateQueue[updateQueue.length - 1]); // Apply the latest update
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
  };
  const autoOffPomodoro = () => {
    setIsPomodoro(!isPomodoro);
    setIsActive(false);
    longBreakCount();
    setIsBreak(!isBreak);
    setIsDisabled(true);
  };
  if (isLongBreak.state) {
    content = "Take a long break";
  } else if (isBreak) {
    content = "Take a short break";
  } else {
    content = "Pomodoro";
  }

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

  const add = () => {
    setTimeLeft(pomodoroTime + 60);
  };

  const isDailyGoalReached = () => {
    if (dailyGoal == isLongBreak) {
      return true;
    }
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
    <Box width={750} border={1} marginTop={5} marginBottom={5}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SettingsModal
          pomodoroTime={pomodoroTime}
          setPomodoroTime={setPomodoroTime}
          shortBreakTime={shortBreakTime}
          setShortBreakTime={setShortBreakTime}
          longBreakTime={longBreakTime}
          setLongBreakTime={setLongBreakTime}
          setTimeLeft={setTimeLeft}
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
          setInitialPomodoro={setInitialPomodoro}
          setInitialShortBreak={setInitialShortBreak}
          setInitialLongBreak={setInitialLongBreak}
          queueUpdate={queueUpdate}
          isDisabled={isDisabled}
          isPomodoro={isPomodoro}
          isBreak={isBreak}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography className="unselectable" variant="body1" color="initial">
            {content} {!isBreak && isLongBreak.count + 1}
          </Typography>
          <ToolTip title={"prolong time"} placement={"right-start"}>
            <IconButton onClick={add} sx={{ color: "black" }}>
              <AddIcon />
            </IconButton>
          </ToolTip>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        height={100}
        alignItems={"center"}
        border={0}
      >
        <Typography
          className="unselectable"
          fontSize={100}
          sx={{ color: "black" }}
        >
          {formatTime(pomodoroTime, shortBreakTime, longBreakTime)}
        </Typography>
      </Box>
      <Box
        border={0}
        sx={{
          display: "flex",
          marginTop: 3,
          marginBottom: 5,
          justifyContent: "center",
        }}
      >
        {isActive ? (
          <Button
            onClick={toggle}
            style={{
              color: "#232946",
              paddingLeft: 50,
              paddingRight: 50,
              borderWidth: 1,
              marginRight: 15,
              marginLeft: 15,

              borderColor: "black",
            }}
            variant="outlined"
          >
            PAUSE
          </Button>
        ) : (
          <Button
            onClick={toggle}
            style={{
              color: "#232946",
              paddingLeft: 50,
              paddingRight: 50,
              borderWidth: 1,
              marginRight: 15,
              marginLeft: 15,

              borderColor: "black",
            }}
            variant="outlined"
          >
            Start
          </Button>
        )}

        {(() => {
          if (isBreak) {
            return (
              <Button
                onClick={skip}
                style={{
                  color: "#232946",
                  paddingLeft: 50,
                  paddingRight: 50,
                  borderWidth: 1,
                  marginRight: 15,
                  marginLeft: 75,
                  borderColor: "black",
                }}
                variant="outlined"
              >
                SKIP
              </Button>
            );
          } else if (isActive) {
            return (
              <Button
                onClick={reset}
                style={{
                  color: "#232946",
                  paddingLeft: 50,
                  paddingRight: 50,
                  borderWidth: 1,
                  marginRight: 15,
                  marginLeft: 75,
                  borderColor: "black",
                }}
                variant="outlined"
              >
                STOP
              </Button>
            );
          } else {
            return (
              <Button
                // aria-disabled={isDisabled}
                disabled={isDisabled}
                onClick={autoPomodoro}
                sx={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                style={{
                  color: "black",
                  paddingLeft: 50,
                  paddingRight: 50,
                  borderWidth: 1,
                  marginRight: 15,
                  marginLeft: 75,
                  borderColor: "black",
                }}
                variant="outlined"
              >
                DONE
              </Button>
            );
          }
        })()}
      </Box>
      <Box>
        {isDailyGoalReached && (
          <Typography variant="body1" color="initial">
            success
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Timer;

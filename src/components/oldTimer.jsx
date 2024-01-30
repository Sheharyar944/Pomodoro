import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "./ToolTip";
import { FlashAutoRounded } from "@mui/icons-material";

const Timer = () => {
  const [pomodoroTime, setPomodoroTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [shortBreakTime, setShortBreakTime] = useState(3);
  const [longBreakTime, setLongBreakTime] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [longBreakDelay, setLongBreakDelay] = useState(2);
  const [isLongBreak, setIsLongBreak] = useState({ count: 0, state: false });
  const [dailyGoal, setDailyGoal] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  let content;
  let count = 0;

  const navigate = useNavigate();

  useEffect(() => {
    // Exit early when we reach 0

    if (timeLeft === 0) return;

    let intervalId = null;

    // Save intervalId to clear the interval when the component re-renders
    if (isActive) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            console.log("created interval", intervalId, timeLeft);
            return prevTime - 1;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // Add timeLeft as a dependency to re-run the effect when we update it
  }, [isActive]);

  //   useEffect(() => {
  //     setTimeLeft(pomodoroTime);
  //   }, [pomodoroTime]);
  //   useEffect(() => {
  //     setTimeLeft(shortBreakTime);
  //   }, [shortBreakTime]);
  //   useEffect(() => {
  //     setTimeLeft();
  //   }, [pomodoroTime]);

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
    setTimeLeft(pomodoroTime);
    setIsActive(false);
    setIsDisabled(true);
  };

  //   const done = () => {
  //     if (isPomodoro) {
  //       setTimeLeft(pomodoroTime);
  //       setIsLongBreak((prevState) => ({
  //         ...prevState,
  //         count: prevState.count + 1,
  //       }));
  //     } else if (isLongBreak.count == longBreakDelay) {
  //       setTimeLeft(longBreakTime);
  //       setIsLongBreak((prevState) => ({
  //         ...prevState,
  //         count: 1,
  //         state: true,
  //       }));
  //     } else {
  //       setTimeLeft(shortBreakTime);
  //     }
  //     setIsActive(false);
  //     setIsBreak(!isBreak);
  //   };

  //   const autoPomodoro = () => {
  //     setIsPomodoro(!isPomodoro);
  //     setIsBreak(!isBreak);
  //     if (isPomodoro) {
  //       if (isLongBreak.state) {
  //         setIsLongBreak((prevState) => ({
  //           ...prevState,
  //           count: 0,
  //           state: false,
  //         }));
  //       }
  //       setTimeLeft(pomodoroTime);
  //       setIsLongBreak((prevState) => ({
  //         ...prevState,
  //         count: prevState.count + 1,
  //       }));
  //     } else if (isLongBreak.count === longBreakDelay) {
  //       setTimeLeft(longBreakTime);
  //       setIsLongBreak((prevState) => ({
  //         ...prevState,
  //         count: 1,
  //         state: true,
  //       }));
  //     } else {
  //       setTimeLeft(shortBreakTime);
  //       setIsBreak(true);
  //     }
  //   };

  //   const autoPomodoro = () => {
  //     // longBreak();
  //     const newBreak = !isBreak;
  //     const newPomodoro = !isPomodoro;
  //     setIsBreak(newBreak);
  //     setIsPomodoro(newPomodoro);
  //     if (newPomodoro) {
  //       setTimeLeft(pomodoroTime);
  //     } else if (isLongBreak.state) {
  //       setTimeLeft(longBreakTime);
  //     } else {
  //       setTimeLeft(shortBreakTime);
  //     }
  //   };

  //   const longBreak = () => {
  //     if (isPomodoro) {
  //       setIsLongBreak((prevState) => ({
  //         ...prevState,
  //         count: prevState.count + 1,
  //         state: false,
  //       }));
  //     }

  //     if (isLongBreak.count == longBreakDelay) {
  //       setIsLongBreak((prevState) => ({
  //         ...prevState,
  //         state: true,
  //         count: 0,
  //       }));
  //     }
  //   };

  //   if (timeLeft == 0 && isChecked) {
  //     // setIsPomodoro(!isPomodoro);
  //     // setIsBreak(!isBreak);
  //     autoPomodoro();
  //   } else if (timeLeft == 0 && !isChecked) {
  //     // setIsPomodoro(!isPomodoro);
  //     // setIsBreak(!isBreak);
  //     setIsActive(!isActive);
  //     autoPomodoro();
  //   }

  const skip = () => {
    setTimeLeft(pomodoroTime);
    setIsActive(false);
    setIsBreak(false);
    setIsDisabled(true);
    setIsLongBreak((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
    if (isLongBreak.state) {
      setIsLongBreak((prevState) => ({
        ...prevState,
        count: 1,
        state: false,
      }));
    }
  };

  const add = () => {
    setTimeLeft(pomodoroTime + 60);
  };

  const isDailyGoalReached = () => {
    if (dailyGoal == isLongBreak) {
      return true;
    }
  };

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box width={750} color={orange} border={1} marginTop={5} marginBottom={5}>
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
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography className="unselectable" variant="body1" color="initial">
            {content} {!isBreak && isLongBreak.count}
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
          {formatTime(timeLeft)}
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
                aria-disabled={isDisabled}
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

import React, { useRef, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, CircularProgress, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import MyToggle from "./MyToggle";
import MyToggleButton from "./MyToggleButton";
import { TimerContext } from "./TimerContext";
import useGetSettings from "../hooks/useGetSettings";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const TimerSettings = ({ handleClose }) => {
  const {
    longBreakDelay,
    setLongBreakDelay,
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
    setInitialPomodoro,
    setInitialShortBreak,
    setInitialLongBreak,
    dailyGoal,
    setDailyGoal,
    alignment,
    setAlignment,
  } = useContext(TimerContext);

  const {
    saveSettings,
    selectedMode,
    modes,
    loading: modesLoading,
  } = useGetSettings();
  const mode = localStorage.getItem("mode");
  const inputRef = useRef(null);
  const [prevPomodoro, setPrevPomodoro] = useState(pomodoro);
  const [prevShortBreak, setPrevShortBreak] = useState(shortBreak);
  const [prevLongBreak, setPrevLongBreak] = useState(longBreak);
  const [prevLongBreakDelay, setPrevLongBreakDelay] = useState(longBreakDelay);
  const [prevMode, setPrevMode] = useState(alignment);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    setPrevPomodoro(pomodoro);
  }, [pomodoro]);

  useEffect(() => {
    setPrevShortBreak(shortBreak);
  }, [shortBreak]);

  useEffect(() => {
    setPrevLongBreak(longBreak);
  }, [longBreak]);

  useEffect(() => {
    setPrevLongBreakDelay(longBreakDelay);
  }, [longBreakDelay]);

  useEffect(() => {
    setPrevMode(alignment);
  }, [alignment]);

  useEffect(() => {
    if (mode) {
      setAlignment(mode);
    } else {
      setAlignment(selectedMode?.settings_name);
    }
  }, [selectedMode]);

  useEffect(() => {
    if (!modesLoading) {
      saveSettings(
        alignment,
        prevMode,
        prevPomodoro,
        prevShortBreak,
        prevLongBreak,
        prevLongBreakDelay
      );
    }
  }, [alignment]);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      localStorage.setItem("mode", newAlignment);
      const currentMode =
        modes &&
        modes.find((mode) => {
          return mode.settings_name == newAlignment;
        });

      setPomodoro(currentMode?.pomodoro_duration);
      setShortBreak(currentMode?.short_break_duration);
      setLongBreak(currentMode?.long_break_duration);
      setLongBreakDelay(currentMode?.long_break_delay);
    }
  };

  const handlePomodoroChange = (e) => {
    setPomodoro(e.target.value * 60);
  };
  const handleShortBreakTimeChange = (e) => {
    setShortBreak(e.target.value * 60);
  };
  const handleLongBreakTimeChange = (e) => {
    setLongBreak(e.target.value * 60);
  };
  const handleLongBreakDelayChange = (e) => {
    setLongBreakDelay(e.target.value);
  };
  const handleDailyGoalChange = (e) => {
    setDailyGoal(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleAutoPomodoro = (event) => {
    setIsAutoPomodoroChecked(event.target.checked);
  };
  const handleAutoBreak = (event) => {
    setIsAutoBreakChecked(event.target.checked);
  };

  // console.log(isInputFocused);
  // useEffect(() => {
  //   console.log("isInputFocused", isInputFocused);
  //   if (!modesLoading && !isInputFocused) {
  //     saveSettings(alignment);
  //   }
  //   const handleClickOutside = (event) => {
  //     console.log("handleClickOutside is called");
  //     if (inputRef.current && !inputRef.current.contains(event.target)) {
  //       setIsInputFocused(false);
  //     }
  //   };
  //   document.body.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.body.removeEventListener("click", handleClickOutside);
  //   };
  // }, [isInputFocused]);

  const Modes = () => (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {Array.isArray(modes) &&
          modes.map((mode) => (
            <ToggleButton
              // onClick={handleButtonClick}
              onMouseDown={handleButtonMouseDown}
              // onMouseUp={handleButtonClick}
              value={mode.settings_name}
              key={mode.id}
            >
              {mode.settings_name} - {mode.pomodoro_duration / 60}{" "}
              {mode.short_break_duration / 60} {mode.long_break_duration / 60}{" "}
              {mode.long_break_delay}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </Box>
  );

  const handleButtonMouseDown = (e) => {
    if (isInputFocused) {
      e.preventDefault(); // Prevent button from losing focus
    }
  };

  useEffect(() => {
    if (!modesLoading && !isInputFocused) {
      saveSettings(alignment);
    }
  }, [isInputFocused]);

  return (
    <Box>
      <Box display="flex" justifyContent="center" width="100%" p={2}>
        {modesLoading ? <CircularProgress /> : <Modes />}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" color="initial">
              Pomodoro duration:
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            marginRight={2}
            sx={{
              "& > :not(style)": { m: 1 },
              flex: 1,
              p: 0,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={pomodoro / 60}
              onChange={handlePomodoroChange}
              onFocus={() => {
                setIsInputFocused(true);
              }}
              onBlur={() => {
                setIsInputFocused(false);
              }}
              variant="outlined"
              fullWidth={true}
              sx={{
                "& input": {
                  padding: "5px",
                  margin: 0,
                },
              }}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="initial"
            fontSize={12}
            marginLeft={34}
          >
            in minutes
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" color="initial">
              Short break duration:
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            marginRight={2}
            sx={{
              "& > :not(style)": { m: 1 },
              flex: 1,
              p: 0,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={shortBreak / 60}
              onChange={handleShortBreakTimeChange}
              onFocus={() => {
                setIsInputFocused(true);
              }}
              onBlur={() => {
                setIsInputFocused(false);
              }}
              variant="outlined"
              fullWidth={true}
              sx={{
                "& input": {
                  padding: "5px",
                  margin: 0,
                },
              }}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="initial"
            fontSize={12}
            marginLeft={34}
          >
            in minutes
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" color="initial">
              Long break duration:
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            marginRight={2}
            sx={{
              "& > :not(style)": { m: 1 },
              flex: 1,
              p: 0,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={longBreak / 60}
              onChange={handleLongBreakTimeChange}
              onFocus={() => {
                setIsInputFocused(true);
              }}
              onBlur={() => {
                setIsInputFocused(false);
              }}
              variant="outlined"
              fullWidth={true}
              sx={{
                "& input": {
                  padding: "5px",
                  margin: 0,
                },
              }}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="initial"
            fontSize={12}
            marginLeft={34}
          >
            in minutes
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" color="initial">
              Long break delay:
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            marginRight={2}
            sx={{
              "& > :not(style)": { m: 1 },
              flex: 1,
              p: 0,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={longBreakDelay}
              onChange={handleLongBreakDelayChange}
              onFocus={() => {
                setIsInputFocused(true);
              }}
              onBlur={() => {
                setIsInputFocused(false);
              }}
              variant="outlined"
              fullWidth={true}
              sx={{
                "& input": {
                  padding: "5px",
                  margin: 0,
                },
              }}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="initial"
            fontSize={12}
            marginLeft={34}
          >
            in pomodoros
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" color="initial">
              Daily goal:
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            marginRight={2}
            sx={{
              "& > :not(style)": { m: 1 },
              flex: 1,
              p: 0,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={dailyGoal}
              onChange={handleDailyGoalChange}
              onBlur={handleClose}
              variant="outlined"
              fullWidth={true}
              sx={{
                "& input": {
                  padding: "5px",
                  margin: 0,
                },
              }}
            />
          </Box>
        </Box>
        {/* <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={12}
                    marginLeft={34}
                  >
                    in minutes
                  </Typography>
                </Box> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" color="initial">
            Auto start pomodoros:
          </Typography>
        </Box>
        <Box sx={{ flex: 1, width: "400px" }}>
          <MyToggle
            label={""}
            isChecked={isAutoPomodoroChecked}
            handleChange={handleAutoPomodoro}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" color="initial">
            Auto start breaks:
          </Typography>
        </Box>
        <Box sx={{ flex: 1, width: "400px" }}>
          <MyToggle
            label={""}
            isChecked={isAutoBreakChecked}
            handleChange={handleAutoBreak}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TimerSettings;

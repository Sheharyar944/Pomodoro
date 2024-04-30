import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import MyToggle from "./MyToggle";
import { TimerContext } from "./TimerContext";
import useGetSettings from "../hooks/useGetSettings";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import ToolTip from "./ToolTip";
import { AuthContext } from "./AuthContext";
import { grey } from "@mui/material/colors";

const TimerSettings = ({ handleClick }) => {
  const {
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    isActive,
    isBreak,
    isPomodoro,
    isDisabled,
    pomodoro,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    setInitialPomodoro,
    setInitialShortBreak,
    setInitialLongBreak,
    queueUpdate,

    longBreakDelay,
    setLongBreakDelay,
    isAutoPomodoroChecked,
    setIsAutoPomodoroChecked,
    isAutoBreakChecked,
    setIsAutoBreakChecked,
    setPomodoro,
    dailyGoal,
    setDailyGoal,
    alignment,
    setAlignment,
    isInputFocused,
    setIsInputFocused,
    setIsDisabled,
    isFieldChanged,
    setIsFieldChanged,
  } = useContext(TimerContext);

  const {
    saveSettings,
    saveSelectedMode,
    selectedMode,
    modes,
    loading: modesLoading,
    deleteSelectedMode,
    createNewMode,
  } = useGetSettings();
  const { user } = useContext(AuthContext);
  const mode = localStorage.getItem("mode");
  const [prevPomodoro, setPrevPomodoro] = useState(pomodoro);
  const [prevShortBreak, setPrevShortBreak] = useState(shortBreak);
  const [prevLongBreak, setPrevLongBreak] = useState(longBreak);
  const [prevLongBreakDelay, setPrevLongBreakDelay] = useState(longBreakDelay);
  const [prevDailyGoal, setPrevDailyGoal] = useState(dailyGoal);
  const [prevMode, setPrevMode] = useState(alignment);
  const [addMode, setAddMode] = useState(false);
  const [newMode, setNewMode] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [clearMode, setClearMode] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

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
    setPrevDailyGoal(dailyGoal);
  }, [dailyGoal]);

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
    const saveData = async () => {
      if (isFieldChanged || isInputFocused) {
        await saveSettings(
          alignment,
          prevMode,
          prevPomodoro,
          prevShortBreak,
          prevLongBreak,
          prevLongBreakDelay,
          prevDailyGoal
        );
      }
      await saveSelectedMode(alignment);
    };
    if (!modesLoading) {
      saveData();
    }
  }, [alignment]);

  useEffect(() => {
    if (!modesLoading) {
      saveSettings(alignment);
    }
  }, [isAutoPomodoroChecked, isAutoBreakChecked]);

  useEffect(() => {
    if (!modesLoading && !isInputFocused && isFieldChanged) {
      saveSettings(alignment);
    }
  }, [isInputFocused]);

  const handleChange = (event, newAlignment) => {
    setClearMode(false);
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      handleClick("Mode has been changed: " + newAlignment);
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
      setDailyGoal(currentMode?.daily_goal);
      setIsDisabled(currentMode?.is_disabled);

      queueUpdate(
        parseInt(pomodoro),
        parseInt(shortBreak),
        parseInt(longBreak)
      );

      if (!isActive && isDisabled) {
        setPomodoroTime(currentMode?.pomodoro_duration);
        setShortBreakTime(currentMode?.short_break_duration);
        setLongBreakTime(currentMode?.long_break_duration);
      }

      if (!isPomodoro) {
        setPomodoroTime(currentMode?.pomodoro_duration);
      }
      if (!isBreak) {
        setShortBreakTime(currentMode?.short_break_duration);
        setLongBreakTime(currentMode?.long_break_duration);
      }

      setInitialPomodoro(currentMode?.pomodoro_duration);
      setInitialShortBreak(currentMode?.short_break_duration);
      setInitialLongBreak(currentMode?.long_break_duration);
    }
  };

  const handlePomodoroChange = (e) => {
    setPomodoro(e.target.value * 60);
    setIsFieldChanged(true);
  };
  const handleShortBreakTimeChange = (e) => {
    setShortBreak(e.target.value * 60);
    setIsFieldChanged(true);
  };
  const handleLongBreakTimeChange = (e) => {
    setLongBreak(e.target.value * 60);
    setIsFieldChanged(true);
  };
  const handleLongBreakDelayChange = (e) => {
    setLongBreakDelay(e.target.value);
    setIsFieldChanged(true);
  };
  const handleDailyGoalChange = (e) => {
    setDailyGoal(e.target.value);
    setIsFieldChanged(true);
  };

  const handleNewModeChange = (event) => {
    setNewMode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleAutoPomodoro = (event) => {
    setIsAutoPomodoroChecked(event.target.checked);
    handleClick("Settings: Changes saved");
  };
  const handleAutoBreak = (event) => {
    setIsAutoBreakChecked(event.target.checked);
    handleClick("Settings: Changes saved");
  };

  const handleDelete = () => {
    setClearMode(false);
    deleteSelectedMode();
  };

  const handleClearMode = () => {
    setClearMode(true);
  };

  const handleIsCancelled = () => {
    setIsCancelled(true);
    setAddMode(false);
  };

  const handleCreateNewMode = (event) => {
    const alreadyExists = modes.some(
      (mode) => mode.settings_name === event.target.value
    );
    if (!alreadyExists && event.target.value !== "") {
      createNewMode(newMode);
      setAddMode(false);
    }
    setIsInputFocused(false);
    setAddMode(false);
  };

  const handleButtonMouseDown = (e) => {
    if (isInputFocused) {
      e.preventDefault();
    }
  };

  const Modes = () => (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <Box
          // border={1}
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end" }}
        >
          {Array.isArray(modes) &&
            modes.map((mode) => (
              <Box
                // border={1}
                sx={{
                  display: "flex",
                  margin: "5px",
                  alignItems: "center",
                  height: "35px",
                  borderColor: "darkgrey",
                  borderRadius: "5px",
                }}
                key={`1-${mode.id}`}
              >
                <ToggleButton
                  sx={{
                    height: "35px",
                    fontSize: "12px",
                    borderRadius: "5px",
                  }}
                  onMouseDown={handleButtonMouseDown}
                  value={mode.settings_name}
                  key={mode.id}
                >
                  {mode.settings_name} - {mode.pomodoro_duration / 60}{" "}
                  {mode.short_break_duration / 60}{" "}
                  {mode.long_break_duration / 60} {mode.long_break_delay}
                </ToggleButton>

                {mode.settings_name === alignment ? (
                  clearMode ? (
                    <ToolTip title={"Are you sure?"} placement={"top-end"}>
                      <IconButton
                        sx={{
                          border: "1px solid #000",
                          borderRadius: "5px",
                          height: "35px",
                          borderColor: "lightgray",
                        }}
                        onClick={handleDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ToolTip>
                  ) : (
                    <ToolTip title={"Delete"} placement={"top-end"}>
                      <IconButton
                        sx={{
                          border: "1px solid #000",
                          borderRadius: "5px",
                          height: "35px",
                          borderColor: "lightgray",
                        }}
                        onClick={handleClearMode}
                      >
                        <ClearIcon />
                      </IconButton>
                    </ToolTip>
                  )
                ) : null}
              </Box>
            ))}
          {!addMode ? (
            <Box
              borderColor={grey}
              sx={{
                display: "flex",
                height: "35px",
                // marginTop: "5px",
              }}
            >
              <ToolTip title={"Add mode"} placement={"right-start"}>
                <IconButton
                  sx={{
                    border: "1px solid #000",
                    height: "35px",
                    borderRadius: "5px",
                    borderColor: "lightgray",
                    margin: "5px",
                  }}
                  onClick={() => {
                    setAddMode(true);
                    setIsInputFocused(true);
                  }}
                  onMouseDown={handleButtonMouseDown}
                >
                  <AddIcon fontSize="medium" />
                </IconButton>
              </ToolTip>
            </Box>
          ) : null}
        </Box>
      </ToggleButtonGroup>
    </Box>
  );

  const Text = ({ text }) => {
    if (pathname === "/settings") {
      return (
        <Box>
          <Typography
            variant="body1"
            color="initial"
            fontSize={12}
            marginLeft={64.5}
          >
            {text}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography
            variant="body1"
            color="initial"
            fontSize={12}
            marginLeft={40}
          >
            {text}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box>
      {user ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          paddingBottom={2}
        >
          <Typography variant="body1" color="initial">
            Modes:
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {modesLoading ? <CircularProgress /> : <Modes />}
          </Box>
        </Box>
      ) : (
        <Button type="text" onClick={() => navigate("/login")}>
          {`Click to Sign in for more settings`}
        </Button>
      )}

      {addMode ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            autoFocus
            value={newMode}
            autoComplete="off"
            inputProps={{ maxLength: 20 }}
            onChange={handleNewModeChange}
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={handleCreateNewMode}
            variant="outlined"
            // fullWidth={true}
            sx={{
              "& input": {
                padding: "5px",
                margin: 0,
              },
            }}
          />
          <ToolTip title={"Cancel"} placement={"right-start"}>
            <IconButton
              sx={{
                border: "1px solid #000",
                borderRadius: "5px",
                height: "35px",
                borderColor: "lightgray",
              }}
              onClick={handleIsCancelled}
              onMouseDown={handleButtonMouseDown}
            >
              <RemoveIcon fontSize="medium" />
            </IconButton>
          </ToolTip>
        </Box>
      ) : null}

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
      </Box>
      <Text text="in minutes" />
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
        <Text text="in minutes" />
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
        <Text text="in minutes" />
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
        <Text text="in pomodoros" />
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

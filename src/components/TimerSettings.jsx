import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import MyToggle from "./MyToggle";
import MyToggleButton from "./MyToggleButton";
import { TimerContext } from "./TimerContext";
import useGetSettings from "../hooks/useGetSettings";

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
  } = useContext(TimerContext);
  const [isClassicChecked, setIsClassicChecked] = useState(false);
  const { getModes } = useGetSettings();

  useEffect(() => {
    if (isClassicChecked) {
      setPomodoro(25 * 60);
      setShortBreak(5 * 60);
      setLongBreak(15 * 60);
      setLongBreakDelay(4);
    }
  }, [isClassicChecked]);

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

  const handleSchemeClassic = (event) => {
    setIsClassicChecked(!isClassicChecked);
    setInitialPomodoro(25 * 60);
    setInitialShortBreak(5 * 60);
    setInitialLongBreak(15 * 60);
    setLongBreakDelay(4);
  };

  return (
    <div>
      <Box>
        <MyToggleButton
          selected={isClassicChecked}
          onChange={handleSchemeClassic}
        >
          classic - 25 5 15 4
        </MyToggleButton>
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
    </div>
  );
};

export default TimerSettings;

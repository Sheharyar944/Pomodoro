import React, { useContext } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "./ToolTip";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { TimerContext } from "./TimerContext";
import useGetSettings from "../hooks/useGetSettings";

const Timer = () => {
  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    isActive,
    isBreak,
    isDisabled,
    isLongBreak,
    autoPomodoro,
    toggle,
    reset,
    skip,
    forward,
    add,
    isDailyGoalReached,
    formatTime,
    alignment,
  } = useContext(TimerContext);
  let content;
  const { saveSettings } = useGetSettings();
  const navigate = useNavigate();

  if (isLongBreak.state) {
    content = "Take a long break";
  } else if (isBreak) {
    content = "Take a short break";
  } else {
    content = "Pomodoro";
  }
  const handleClick = () => {
    toggle();
    saveSettings(alignment);
  };
  return (
    <Box width={750} border={1} marginTop={10} marginBottom={5}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SettingsModal />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography className="unselectable" variant="body1" color="initial">
            {content} {!isBreak && isLongBreak.count + 1}
          </Typography>
          {isDisabled ? (
            <ToolTip title={"forward"} placement={"right-start"}>
              <IconButton onClick={forward} sx={{ color: "black" }}>
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
            </ToolTip>
          ) : (
            <ToolTip title={"prolong time"} placement={"right-start"}>
              <IconButton onClick={add} sx={{ color: "black" }}>
                <AddIcon />
              </IconButton>
            </ToolTip>
          )}
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
        sx={{
          display: "flex",
          marginTop: 3,
          marginBottom: 5,
          justifyContent: "center",
        }}
      >
        {isActive ? (
          <Button
            onClick={handleClick}
            style={{
              width: "150px",
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
              width: "150px",
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
                  width: "150px",
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
                  width: "150px",
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
                sx={{
                  width: "150px",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
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
        {isDailyGoalReached === true && (
          <Typography variant="body1" color="initial">
            success
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Timer;

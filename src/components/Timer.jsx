import React from "react";
import { useRef, useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isActive, setIsActive] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const intervalIdRef = useRef(null);

  // useEffect(() => {
  //     // Only set up the interval once, when the component mounts
  //     if (isActive){

  //     intervalIdRef.current = setInterval(() => {
  //         console.log("created interval", intervalIdRef.current)
  //         setTimeLeft((prevTime) => prevTime - 1);
  //     }, 1000);}

  //     // Clear the interval when the component unmounts
  //     return () => {
  //         console.log("cleared interval", intervalIdRef.current)
  //         clearInterval(intervalIdRef.current);
  //     }
  // }, [isActive]);

  // Update to stop the timer when it reaches zero
  // useEffect(() => {

  //     if (timeLeft === 0) {
  //         clearInterval(intervalIdRef.current);
  //     }
  // }, [timeLeft]);

  useEffect(() => {
    // Exit early when we reach 0

    if (timeLeft === 0) return;

    let intervalId = null;

    // Save intervalId to clear the interval when the component re-renders
    if (isActive) {
      intervalId = setInterval(() => {
        setTimeLeft((pT) => pT - 1);

        console.log("created interval", intervalId, timeLeft);
      }, 1000);
    } else if (!isActive && timeLeft !== 1500) {
      clearInterval(intervalId);
    }

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // Add timeLeft as a dependency to re-run the effect when we update it
  }, [isActive]);

  const toggle = () => {
    setIsActive(!isActive);
    setIsDisabled(false);
  };

  const reset = () => {
    setTimeLeft(1500);
    setIsActive(false);
  };

  const done = () => {
    setTimeLeft(300);
    setIsActive(false);
    setIsBreak(!isBreak);
  };

  const skip = () => {
    setTimeLeft(1500);
    setIsActive(false);
    setIsBreak(false);
    setIsDisabled(true);
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
      <SettingsModal />

      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        height={100}
        alignItems={"center"}
        border={0}
      >
        <Typography fontSize={100} sx={{ color: "black" }}>
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
                disabled={isDisabled}
                onClick={done}
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
                DONE
              </Button>
            );
          }
        })()}
      </Box>
    </Box>
  );
};

export default Timer;

import React, { useContext, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import MyToggle from "./MyToggle";
import { TimerContext } from "./TimerContext";
import useGetSettings from "../hooks/useGetSettings";

const NotificationSettings = ({ handleClick }) => {
  const {
    playAlarmSound,
    setPlayAlarmSound,
    playClockSound,
    setPlayClockSound,
    playClockDuringBreak,
    setPlayClockDuringBreak,
    notify,
    setNotify,
    alignment,
  } = useContext(TimerContext);
  const { saveSettings, loading } = useGetSettings();
  const handlePlayAlarmSound = (e) => {
    setPlayAlarmSound(e.target.checked);
    handleClick("Settings: Changes saved");
  };
  const handlePlayClockSound = (e) => {
    setPlayClockSound(e.target.checked);
    handleClick("Settings: Changes saved");
  };
  const handlePlayClockDuringBreak = (e) => {
    setPlayClockDuringBreak(e.target.checked);
    handleClick("Settings: Changes saved");
  };

  const handleNotify = (e) => {
    setNotify(e.target.checked);
    handleClick("Settings: Changes saved");
  };

  useEffect(() => {
    if (!loading) {
      saveSettings(alignment);
    }
  }, [playAlarmSound, playClockSound, playClockDuringBreak, notify]);

  const Settings = ({ text, isChecked, handleChange }) => (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" color="initial">
          {text}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <MyToggle
          label={""}
          isChecked={isChecked}
          handleChange={handleChange}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ height: "300px" }}>
      <Settings
        text="Play alarm sound:"
        isChecked={playAlarmSound}
        handleChange={handlePlayAlarmSound}
      />
      <Settings
        text="Play ticking sound:"
        isChecked={playClockSound}
        handleChange={handlePlayClockSound}
      />
      <Settings
        text="Play ticking sound while breaks:"
        isChecked={playClockDuringBreak}
        handleChange={handlePlayClockDuringBreak}
      />
      <Settings
        text="Notify when there is one minute left:"
        isChecked={notify}
        handleChange={handleNotify}
      />
    </Box>
  );
};

export default NotificationSettings;

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
    handleClick("Settings. Changes saved");
  };
  const handlePlayClockSound = (e) => {
    setPlayClockSound(e.target.checked);
    handleClick("Settings. Changes saved");
  };
  const handlePlayClockDuringBreak = (e) => {
    setPlayClockDuringBreak(e.target.checked);
    handleClick("Settings. Changes saved");
  };

  const handleNotify = (e) => {
    setNotify(e.target.checked);
    handleClick("Settings. Changes saved");
  };

  useEffect(() => {
    if (!loading) {
      saveSettings(alignment);
    }
  }, [playAlarmSound, playClockSound, playClockDuringBreak, notify]);

  return (
    <div>
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
            Play alarm sound:
          </Typography>
        </Box>
        <Box sx={{ flex: 1, width: "400px" }}>
          <MyToggle
            label={""}
            isChecked={playAlarmSound}
            handleChange={handlePlayAlarmSound}
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
            Play ticking sound:
          </Typography>
        </Box>
        <Box sx={{ flex: 1, width: "400px" }}>
          <MyToggle
            label={""}
            isChecked={playClockSound}
            handleChange={handlePlayClockSound}
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
            Play ticking sound while breaks:
          </Typography>
        </Box>
        <Box sx={{ flex: 1, width: "400px" }}>
          <MyToggle
            label={""}
            isChecked={playClockDuringBreak}
            handleChange={handlePlayClockDuringBreak}
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
            Notify when there is one minute left:
          </Typography>
        </Box>
        <Box sx={{ flex: 1, width: "400px" }}>
          <MyToggle label={""} isChecked={notify} handleChange={handleNotify} />
        </Box>
      </Box>
    </div>
  );
};

export default NotificationSettings;

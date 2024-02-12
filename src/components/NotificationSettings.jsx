import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import MyToggle from "./MyToggle";

const NotificationSettings = ({ playAlarmSound, setPlayAlarmSound }) => {
  const handlePlayAlarmSound = (e) => {
    setPlayAlarmSound(e.target.checked);
  };
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
          <MyToggle label={""} isChecked={true} handleChange={() => true} />
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
          <MyToggle label={""} isChecked={true} handleChange={() => true} />
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
          <MyToggle label={""} isChecked={true} handleChange={() => true} />
        </Box>
      </Box>
    </div>
  );
};

export default NotificationSettings;

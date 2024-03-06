import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      className="header-logo"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer" }}
      color="black"
    >
      <EventAvailableIcon
        sx={{ marginLeft: "10px", marginTop: "5px", marginRight: "10px" }}
      />

      <Typography variant="h5" color="initial">
        Pomodoro Tracker
      </Typography>
    </Box>
  );
};

export default Header;

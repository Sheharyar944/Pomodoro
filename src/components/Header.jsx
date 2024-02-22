import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      className="header-logo"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer" }}
      color="black"
    >
      <Typography variant="h5" color="initial">
        Pomodoro Tracker
      </Typography>
    </Box>
  );
};

export default Header;

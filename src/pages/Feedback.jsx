import { Box, Typography } from "@mui/material";
import React from "react";

const Feedback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "600px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" color="initial">
        Feedback
      </Typography>
    </Box>
  );
};

export default Feedback;

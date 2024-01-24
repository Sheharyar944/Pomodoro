import { Box } from "@mui/material";
import React from "react";

const Test = () => {
  return (
    <Box sx={{ width: "100%", height: 200, position: "relative" }}>
      <Box sx={{ width: "100%", height: "50%", backgroundColor: "lightblue" }}>
        {/* Top Content */}
      </Box>
      <Box
        borderTop={1}
        sx={{ width: "100%", height: "50%", backgroundColor: "lightgreen" }}
      >
        {/* Bottom Content */}
      </Box>
    </Box>
  );
};

export default Test;

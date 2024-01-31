import React from "react";
import ToggleButton from "@mui/material/ToggleButton";

const MyToggleButton = ({ selected, onChange }) => {
  return (
    <ToggleButton value="" selected={selected} onChange={onChange}>
      pomodoro
    </ToggleButton>
  );
};

export default MyToggleButton;

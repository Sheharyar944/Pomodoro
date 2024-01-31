import React from "react";
import ToggleButton from "@mui/material/ToggleButton";

const MyToggleButton = ({ selected, onChange, children }) => {
  return (
    <ToggleButton value="" selected={selected} onChange={onChange}>
      {children}
    </ToggleButton>
  );
};

export default MyToggleButton;

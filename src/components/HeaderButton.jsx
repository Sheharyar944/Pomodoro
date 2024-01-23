import React from "react";

import Button from "@mui/material/Button";

import LoginIcon from "@mui/icons-material/Login";

export default function IconLabelButtons() {
  return (
    <Button variant="text" endIcon={<LoginIcon />}>
      Login
    </Button>
  );
}
